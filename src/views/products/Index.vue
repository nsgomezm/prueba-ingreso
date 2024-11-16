<template>
    <div class="px-3">
        <div class="d-flex align-items-center gap-3 flex-wrap mb-3">
            <h3 class="fz-biger me-auto">Lista de productos</h3>
            <router-link :to="{name: 'products.new'}" class="btn btn-secondary">
                Agregar
            </router-link>

        </div>

        <div class="card card-body border-0">
            <TableProducts></TableProducts>
        </div>

    </div>
</template>

<script setup lang="ts">
    import TableProducts from './Table.vue'
</script>