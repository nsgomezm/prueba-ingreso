<template>
    <FormKit type="form" id="form-order" :actions="false" #default="{state: {valid}}" @submit.prevent="addProduct">
        <div class="alert alert-warning" v-if="selectedProduct" v-show="parseInt(selectedProduct.min_stock) >= parseInt(selectedProduct.stock)">
            Producto en escases. Solo te quedan {{ selectedProduct.stock }}
        </div>
        <div class="row">
            <div class="col-12" :class="{'col-lg-6 col-xl-8   mb-3': selectedProduct}">
                <label class="form-label" required>Producto</label>
                <v-select :options="products.productsAvailable" label="name" :reduce="item => item.id" v-model="form.product_id" v-if="products.products"> </v-select>
            </div>
            <div class="col-12 col-lg-6 col-xl-4 mb-3" v-if="selectedProduct">
                <FormKit autocomplete="off" type="number" label="Cantidad" name="count" :validation="`required|number|min:1|max:${selectedProduct.stock}`" min="0" v-model="form.count" ></FormKit>
            </div>
            <div class="col-12 col-lg-6 mb-3" v-if="selectedProduct">
                <label>Precio unitario</label>
                <input type="text" class="form-control" :value="currency(selectedProductCostUnit)" disabled>
            </div>
            <div class="col-12 col-lg-6" v-if="selectedProduct">
                <label>Total</label> <!--  (con impuestos) -->
                <input type="text" class="form-control" :value="currency(totalCost)" disabled>
            </div>
            <div class="col-12 mb-3" v-if="selectedProduct">
                <small v-if="selectedProduct.min_wholesale_cost < form.count" class="fw-bold text-success">Cliente mayorista</small>

                <!-- :disabled="!valid" -->
                <button type="button" class="btn btn-primary mt-3 w-100"  @click.prevent="addProduct">
                    Agregar Producto
                </button>
            </div>
        </div>
    </FormKit>
    <hr>
    <div class="alert alert-info" v-if="order.products.length == 0">
        Debes agregar un producto
    </div>
    <div class="row mb-4" v-else>
        <div class="table-responsive" data-simplebar style="max-height: 200px;">
            <table class="table table-bordered table-light border-gray">
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Costo unidad</th>
                        <th>Total</th>
                        <td><i class="fa-solid fa-trash"></i></td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="product in order.products">
                        <td>{{  product.name }}<span class="badge bg-info text-white ms-2">x {{ product.count }}</span></td>
                        <td>{{ currency(parseInt(product.unit_cost))  }}</td>
                        <td>{{ currency(parseInt(product.total_cost))  }}</td>
                        <td>
                            <button type="button" class="btn btn-sm" @click.prevent="removeProduct(product.id)">
                                <i class="fa-solid fa-delete-left text-danger"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { currency } from '@/helpers/formatter';
import { useProductsStore } from '@/store/productsStore.js';
import { reset } from '@formkit/vue';
    import { reactive,computed , ref, watch } from 'vue';
    import { inject, onBeforeMount } from 'vue';

    const order = inject('order')

    const products = useProductsStore()
    const selectedProduct = ref(null)

    const form = ref({
        product_id: null,
        count: 1
    })

    watch(() => form.value.product_id, async (idProduct) => {
        if(idProduct) selectedProduct.value = await products.findProduct(idProduct)    
        else selectedProduct.value = null
    })

    const selectedProductCostUnit = computed(() => {
        if(selectedProduct.value == null) return 0
        if(form.value.count > selectedProduct.value.min_wholesale_cost) return selectedProduct.value.wholesale_cost
        return selectedProduct.value.unit_cost
    })

    const totalCost = computed(() => {
        return selectedProductCostUnit.value * form.value.count
    })

    function addProduct(){
        const indexExistsProduct =  order.value.products.findIndex(item => item.product_id == form.value.product_id)

        if(indexExistsProduct == -1){
            order.value.products[order.value.products.length] = getProductToPush()
            notify.success({message: 'Producto agregado'})
            return 
        }
        Swal.fire({
            title:'Producto repetido!!',
            html: 'Este producto ya lo tienes registrado, ¿deseas actualziarlo?',
            showDenyButton: true,
            confirmButtonText: 'Actualizar',
            denyButtonText: "Cancelar",
            icon: 'question',
            customClass:{
                confirmButton: 'btn btn-success me-2',
                denyButton: 'btn btn-outline-danger'
            }
        }).then(res => {
            if(res.isConfirmed) {
                order.value.products[indexExistsProduct] = getProductToPush()
                notify.success({message: 'Producto modificado'})
                return
            }

        })

    }

    function removeProduct(id){
        const products = order.value.products
        const indexExistsProduct = products.findIndex(product => product.id == id)

        order.value.products.splice(indexExistsProduct, 1)
    }


    function getProductToPush(){
        const prodcutToPush = {
            ...form.value,
            name: selectedProduct.value.name,
            unit_cost: selectedProductCostUnit.value,
            total_cost: totalCost.value,
            isWholesale: form.value.count > selectedProduct.value.min_wholesale_cost
        }

        form.value ={ product_id: null, count: 1 }

        return prodcutToPush
    }

</script>