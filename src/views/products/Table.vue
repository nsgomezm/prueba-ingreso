<template>
    <div style="min-height: 200px;" v-if="isLoading">
        <LoaderSection :settings="{'dots-num': 3}"></LoaderSection>
    </div>
    <div class="table-responsive" v-else-if="productsStore.products && !isLoading">
        <DataTable :columns="columns" :data="productsStore.products" >
            <template #name="{rowData}">
                <span v-tooltip="rowData.stock === 0 ? 'Se acabo' : rowData.min_stock > rowData.stock ? 'Se esta agotando' : 'Disponible'">
                    <i class="fa-solid fa-tag" :class="{'text-danger': rowData.stock == 0, 'text-warning': rowData.min_stock >= rowData.stock, 'text-success': rowData.min_stock < rowData.stock }"></i>
                    {{  rowData.name }}
                </span>
            </template>
            <template #unit_cost="{rowData}">
                {{  vueNumberFormat(rowData.unit_cost) }}
            </template>
            <template #wholesale_cost="{rowData}">
                {{  vueNumberFormat(rowData.wholesale_cost) }}
            </template>
            <template #description="{rowData}">
                <p v-text-truncate:20="rowData.description">N/A</p>
            </template>
            <template #action="{ rowData }">
                <div class="d-flex justify-content-center gap-2">
                    <button class="btn btn-sm border-0" @click.prevent="$router.push({name: 'products.update', params:{id: rowData.id}})">
                        <i class="fa-solid fa-pen text-primary"></i>
                    </button>
                    <button class="btn btn-sm border-0" type="button" @click.prevent="productsStore.confirmDelete(rowData.id)" >
                        <i class="fa-solid fa-trash text-danger"></i>
                    </button>
                </div>
            </template>
        </DataTable>
    </div>
</template>

<script setup lang="ts">

    import { onBeforeMount, ref } from 'vue'
    import { useProductsStore } from '@/store/productsStore.js'

    const isLoading = ref(<boolean>false)
    const productsStore = useProductsStore()

    onBeforeMount(async () => {
        if(productsStore.products == null){
            isLoading.value = true
            await productsStore.getAllProducts()
            .then(() => isLoading.value = false)
        }
    })

    const columns = ref([
        {data: null, render:'#name', title: 'Nombre'},
        {data: 'stock', title: 'Stock'},
        {data: 'min_stock', title: 'Min. Stock'},
        {data: null, render:'#unit_cost', title: 'Costo unid.'},
        {data: null, render:'#wholesale_cost', title: 'Mayoreo unid.'},
        {data: 'min_wholesale_cost', title: 'Min. mayoreo'},
        {data: null, render: '#description', title: 'Comentarios'},
        {data: null, title: 'Acciones', render: '#action', orderable: false}

    ])
</script>
