<template>
    <div class="px-3">
        <div class="d-flex align-items-center gap-3 flex-wrap mb-3">
            <h3 class="fz-biger me-auto">Lista de productos</h3>
            <div class="btn-group">
                <button class="btn btn-success" v-tooltip="'Actualizar información'" @click="reloadTable"> 
                    <i class="fa-solid fa-rotate" :class="{' fa-spin': isLoading}"></i>
                </button>
                <router-link :to="{name: 'products.new'}" class="btn btn-secondary">
                    Agregar
                </router-link>
            </div>
        </div>

        <div class="card card-body border-0">
            <TableProducts></TableProducts>
        </div>

    </div>
</template>

<script setup lang="ts">
    import TableProducts from './Table.vue'
    import { ref } from 'vue';
    import { useProductsStore } from '@/store/productsStore.js';

    const products = useProductsStore()
    const isLoading = ref(<boolean>false)

    async function reloadTable(){
        try{
            if(isLoading.value) return

            isLoading.value = true
            await products.getAllProducts()
            notify.success({message: 'Información actualizada'})
        } catch (error){
            console.log(error)
        } finally{
            isLoading.value = false
        }
    }
</script>