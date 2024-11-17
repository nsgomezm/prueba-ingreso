<template>
    <div style="min-height: 200px;" v-if="isLoading">
        <LoaderSection :settings="{'dots-num': 3}"></LoaderSection>
    </div>
    <div class="table-responsive" v-else-if="ordersStore.orders && !isLoading">
        <DataTable :columns="columns" :data="ordersStore.orders" >
            <template #status="{ rowData }">
                <span v-tooltip="rowData.status">
                    <i class="fa-solid fa-tag" :class="{'text-success': rowData.status == 'Entregado', 'text-warning': rowData.status == 'Activo', 'text-primary': rowData.status == 'Inactivo' }"></i>
                </span>
           </template>
            <template #date="{ rowData }">
                {{ getFormatDate(rowData.date) }}
           </template>
            <template #porducts="{ rowData }">
                {{ rowData.products?.length ?? 0 }}
           </template>
            <template #total="{ rowData }">
                {{ vueNumberFormat(rowData.total) }}
           </template>
            <template #address="{ rowData }">
                <p v-text-truncate:20="rowData.address"></p>
           </template>
            <template #comments="{ rowData }">
                <p v-text-truncate:20="rowData.comments">N/A</p>
           </template>
            <template #action="{ rowData }">
                <div class="d-flex justify-content-center gap-2">
                    <button class="btn btn-sm border-0" @click.prevent="$router.push({name: 'orders.update', params:{id: rowData.id}})">
                        <i class="fa-solid fa-pen text-primary"></i>
                    </button>
                    <button class="btn btn-sm border-0" type="button" @click.prevent="ordersStore.confirmDelete(rowData.id)" >
                        <i class="fa-solid fa-trash text-danger"></i>
                    </button>
                </div>
            </template>
        </DataTable>
    </div>
</template>

<script setup lang="ts">

    import { onBeforeMount, ref } from 'vue'
    import { useOrdersStore } from '@/store/ordersStore.js'
    import { format } from '@formkit/tempo'

    const isLoading = ref(<boolean>false)
    const ordersStore = useOrdersStore()

    onBeforeMount(async () => {
        if(ordersStore.orders == null){
            isLoading.value = true
            await ordersStore.getAllOrders()
            .then(() => isLoading.value = false)
        }
    })

    const columns = ref([
        {data: null, render:'#status', title: '#'},
        {data: null, render:'#date', title: 'Fecha'},
        {data: 'customer_id', title: 'Nombre'},
        {data: 'payment_type', title: 'Tipo de pago'},
        {data: null, render: '#porducts', title: 'Productos'},
        {data: null, render:'#total', title: 'Total'},
        {data: null, render:'#address', title: 'Dirección'},        
        {data: null, render:'#comments', title: 'Comments'},

        {data: null, title: 'Acciones', render: '#action', orderable: false}
    ])

    const getFormatDate = (date) =>{
        return format(new Date(date.seconds * 1000), 'D/MMM/YYYY h:mm a')
    }




</script>