<template>
    <div class="layout-dashboard">
        <Sidebar></Sidebar>
        <Navbar></Navbar>
        <div class="wrapper" >
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
    defineOptions({
        name: 'LayoutDashboard'
    })


    import Navbar from './navbar.vue'
    import Sidebar from './sidebar.vue'
</script>