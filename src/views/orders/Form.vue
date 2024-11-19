<template>
    <div class="card card-body mx-3 position-reative">
        <LoaderSection type="scaling-squares-spinner" :settings="{size: 80}" v-if="isLoadingInformation" ></LoaderSection>
        <FormKit type="form" id="form-order" :actions="false" #default="{state: {valid}}" @submit.prevent="store">
            <h3 class="fz-big fw-bold">Creación de pedido </h3>
            <hr>
            
            <BackendError :backend-errors="errors" v-if="errors"></BackendError>
            <div class="row">
                <div class="col-12 col-xl-5 me-xl-auto">
                    <FormOrder/>
                </div>
                <div class="col-xl-5 order-3">
                    <div class="d-flex gap-3 align-items-center flex-wrap justify-content-center">
                        <router-link :to="{name: 'orders'}" type="button" class="btn btn-outline-secondary">Regresar</router-link>
                        <button type="button" class="btn btn-danger" @click.prevent="ordersStore.confirmDelete(form.id)">
                            Eliminar
                        </button>
                        <button type="submit" class="btn btn-success" @click.prevent="store" :disabled="isLoading"> <!-- !valid ||  -->
                            <LoaderSpinner  v-if="isLoading" class="me-2"></LoaderSpinner>
                            {{ form.id !== undefined ? 
                                isLoading ? "Actualizando": "Actualizar" : 
                                isLoading ? 'Creando': 'Crear' }} pedido
                        </button>
                    </div>
                </div>
                <div class="col-12 col-xl-6">
                    <FormDetailOrder/>
                </div>
            </div>
        </FormKit>
    </div>
</template>

<script setup lang="ts">
    import { provide, ref, defineProps, onBeforeMount, toRef, watch, computed } from 'vue';
    import { useOrdersStore } from '@/store/ordersStore.js';
    import { useRouter } from 'vue-router';
    import FormOrder from './components/FormOrder.vue';
    import FormDetailOrder from './components/FormDetailOrder.vue';

    const props = defineProps({
        id: {
            required: false,
            default: null
        }
    })
    
    const router = useRouter()
    const ordersStore = useOrdersStore()
    const isLoading = ref(<boolean>false)
    const isLoadingInformation = ref(<boolean>false)
    const errors = ref(null)
    
    const form = ref({
        customer_id: null,
        payment_type: null,
        address: null,
        date: null,
        comments: null,
        status: null,
        products:[],
        total: null,
    })

    provide('order', form )

    watch(() => form.value.products, (allProductsSelected) => {        
        /* Con esto aseguramos que no se repitan los productos, para posteriormente sumarlos */
        const filteredProducts = allProductsSelected.reduce((acc, item) => {
            if(item){
                acc[item.product_id] = item.total_cost
                return acc
            }
        }, {})
        
        /* Se saca el total de los costos de todos los productos */
        form.value.total = Object.values(filteredProducts).reduce((total, value) => total + Number(value), 0);
        
    }, {deep: true})

    onBeforeMount(async () => {
        isLoadingInformation.value = true
        if(ordersStore.orders == null) await ordersStore.getAllOrders()
        
        if(props.id){
            const res = await ordersStore.findOrder(props.id)
            if(!res){
                Swal.fire('Ops', 'Este pedido no existe', 'warning')
                router.push({name: 'orders'})
                return
            } 
            form.value = {...res}
        }


        isLoadingInformation.value = false
    })
    
    async function store(): Promise<void>{
        if(isLoading.value || isLoadingInformation.value) return

        try{
            isLoading.value = true
            errors.value = null
            
            if(form.value.id){
                const res = await ordersStore.update(form.value)
                notify.success({ message: 'Pedido actualizado' })

                router.push({name: 'orders'})
                return
            }

            await ordersStore.store(form.value)
            notify.success({ message: 'Pedido creado' })

            router.push({name: 'orders'})

        } catch (error){
            errors.value = error
        } finally{
            isLoading.value = false
        }

    }



</script>