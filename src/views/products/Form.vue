<template>
    <div class="card card-body border-0 mx-3 position-relative">
        <LoaderSection type="scaling-squares-spinner" :settings="{size: 80}" v-if="isLoadingInformation"></LoaderSection>

        <FormKit type="form" id="form-products" :actions="false" #default="{state: {valid}}" @submit.prevent="store"  >
            <BackendError :backend-errors="errors" v-if="errors"></BackendError>
            <div class="row">
                <div class="col-12 col-md-6 col-lg-4 mb-3">
                    <FormKit type="text" label="Nombre" name="name" validation="required|string" v-model="form.name"></FormKit>
                </div>
                <div class="col-12 col-md-6 col-lg-4 mb-3">
                    <FormKit type="number" label="Cantidad" name="stock" validation="required|number" v-model="form.stock"></FormKit>
                </div>
                <div class="col-12 col-md-6 col-lg-4 mb-3">
                    <FormKit type="number" label="Cantidad mínima"  help="Cantidad minima en stock" name="stock_min" validation="required|number" v-model="form.min_stock"></FormKit>
                </div>
                <div class="col-12 col-md-6 col-lg-4 mb-3">
                    <label class="form-label" required>Precio unidad</label>
                    <VueNumberFormat v-model:value="form.unit_cost" class="form-control" :class="{'is-valid': form.unit_cost >= 0, 'is-invalid': form.unit_cost === 0}"></VueNumberFormat>
                </div>
                <div class="col-12 col-md-6 col-lg-4 mb-3">
                    <label class="form-label" required>Precio mayoreo</label>
                    <VueNumberFormat v-model:value="form.wholesale_cost" class="form-control" :class="{'is-valid': form.wholesale_cost >= 0, 'is-invalid': form.wholesale_cost === 0}"></VueNumberFormat>
                </div>
                <div class="col-12 col-md-6 col-lg-4 mb-3">
                    <FormKit type="number" label="Cantidad minima para mayoreo" help="Cantidad minima acceder al precio mayoreo" name="min_wholesale_cost" validation="required|number" v-model="form.min_wholesale_cost"></FormKit>
                </div>

                <div class="col-12 mb-3">
                    <FormKit type="textarea" auto-height label="Comentarios"  v-model="form.description"></FormKit>
                </div>
            </div>

            <div class="d-flex gap-3 align-items-center flex-wrap justify-content-center ">
                <router-link :to="{name: 'products'}"  class="btn btn-outline-secondary">Regresar</router-link>
                <button type="submit" class="btn btn-success" @click.prevent="store" :disabled="!valid || isLoading">
                    <LoaderSpinner  v-if="isLoading" class="me-2"></LoaderSpinner>
                    {{  id ? "Actualizar" : "Crear" }}
                </button>
            </div>

            {{ id }}

        </FormKit>
    </div>
    
</template>

<script setup lang="ts">
    import { ref, defineProps, onBeforeMount } from 'vue';
    import { useRouter } from 'vue-router';
    import { reset } from '@formkit/vue';
    import { useProductsStore } from '@/store/productsStore.js';
    import Swal from 'sweetalert2';

    
    defineOptions({
        name: 'AuthLogin'
    })

    const props = defineProps({
        id:{
            required: false, 
            type: String
        }
    })
    

    const router = useRouter()
    const isLoading = ref(<boolean>false)
    const isLoadingInformation = ref(<boolean>false)
    const errors = ref(null)
    const productsStore = useProductsStore()

    
    const form = ref(<Record<string, string|number|null>>{
        name:null,
        stock:null,
        min_stock:null,
        unit_cost:null,
        wholesale_cost:null,
        min_wholesale_cost:null,
        description:null,
    })

    onBeforeMount(async() => {
        if(props.id && props.id !== null) {
            isLoadingInformation.value = true
            
            const product = await productsStore.findProduct(props.id)

            if(product) form.value = {...product}
            else {
                Swal.fire('Ops', 'No existe este producto', 'warning')
                router.push({name: 'products'})
            }
            
            isLoadingInformation.value = false
        }
    })



    async function store(): Promise<void>{
        if(isLoading.value) return

        try{
            isLoading.value = true 
            errors.value = null

            if(!props.id){
                const res = await productsStore.store(form.value)
                
                notify.success({ message: 'Producto creado' })
            } else {
                const res = await productsStore.update(form.value)

                notify.success({ message: 'Producto actualizado' })
            }
            
            reset('form-products')
            router.push({name:'products'})
            
        } catch (error) {
            errors.value = error
        } finally {
            isLoading.value = false
        }
    }
    
</script>
