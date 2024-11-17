<template>
    <div class="px-3">
        <div class="d-flex align-items-center gap-3 flex-wrap mb-3">
            <h3 class="fz-biger me-auto">Lista de productos</h3>
            <div class="btn-group">
                <button class="btn btn-success" v-tooltip="'Actualizar información'" @click="reloadTable"> 
                    <i class="fa-solid fa-rotate" :class="{' fa-spin': isLoading}"></i>
                </button>
                <router-link :to="{name: 'orders.new'}" class="btn btn-secondary">
                    Agregar
                </router-link>
            </div>
        </div>

        <div class="card card-body border-0">
            <TableOrders></TableOrders>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { useOrdersStore } from '@/store/ordersStore.js';
    import TableOrders from './Table.vue'

    const ordersStore = useOrdersStore()
    const isLoading = ref(<Boolean>false)

    async function reloadTable(){
        try{
            if(isLoading.value) return

            isLoading.value = true
            await ordersStore.getAllOrders()
            notify.success({message: 'Información actualizada'})
        } catch (error){
            console.log(error)
        } finally{
            isLoading.value = false
        }
    }

</script>