<template>
    <div class="sidebar" id="sidebar">
        <a href="#" class="sidebar__link sidebar--logo">
            <i class="fa-solid fa-bars-staggered"></i>
            <span>LINKTIC.COM</span>
        </a> 
        <div class="sidebar__wrapper"  data-simplebar>
            <div>
                <div class="sidebar__item">
                    <h3 class="sidebar__subtitle">Profile</h3>
                    <a href="#" class="sidebar__link">
                        <i class="fa-solid fa-user"></i>
                        <span class="sidebar__label">item profile</span>    
                    </a>
                    <div class="sidebar__dropdown" v-for="i in 2" >
                        <a href="#" class="sidebar__link">
                            <i class="fa-solid fa-user"></i>
                            <span class="sidebar__label">extras</span>    
                            <i class="fa-solid fa-chevron-down"></i>
                        </a>
                        <div class="sidebar__dropdown-collapse">
                            <a href="#" class="sidebar__dropdown-item sidebar__link">
                                <i class="fa-solid fa-user"></i>
                                <span class="sidebar__label">Password</span>
                            </a>
                            <a href="#" class="sidebar__dropdown-item sidebar__link">
                                <i class="fa-solid fa-user"></i>
                                <span class="sidebar__label">Mail</span>
                            </a>
                            <a href="#" class="sidebar__dropdown-item sidebar__link">
                                <i class="fa-solid fa-user"></i>
                                <span class="sidebar__label">Accounts</span>
                            </a>
                        </div>
                    </div>
                    <a href="#" class="sidebar__link">
                        <i class="fa-solid fa-user"></i>
                        <span class="sidebar__label">item profile</span>    
                    </a>
                    <a href="#" class="sidebar__link">
                        <i class="fa-solid fa-user"></i>
                        <span class="sidebar__label">item profile</span>    
                    </a>
                </div>
                <div class="sidebar__item">
                    <h3 class="sidebar__subtitle">menu</h3>
                    <a href="#" class="sidebar__link">
                        <i class="fa-solid fa-user"></i>
                        <span class="sidebar__label">item menu</span>    
                    </a>
                    <a href="#" class="sidebar__link">
                        <i class="fa-solid fa-user"></i>
                        <span class="sidebar__label">item menu</span>    
                    </a>
                    <a href="#" class="sidebar__link">
                        <i class="fa-solid fa-user"></i>
                        <span class="sidebar__label">item menu</span>    
                    </a>
                </div>
            </div>   
        </div>
        <label class="sidebar__link" disabled>
            <span class="sidebar__label">copyright © | v1.0.0</span>    
        </label> 
    </div>
</template>
<script setup lang="ts">
    defineOptions({
        name: 'layout-sidebar'
    })

    import { onMounted, ref } from 'vue';

    const dropdowns = ref<NodeListOf<HTMLElement> | null>(null)

        
    onMounted(() => {
        dropdowns.value = document.querySelectorAll('.sidebar__dropdown > .sidebar__link')
        dropdowns.value.forEach((dropdown: HTMLElement) => dropdown.addEventListener('click', toggleDropdown))

        const sidebar: HTMLElement | null = document.querySelector('#sidebar')
        document.addEventListener('click', function(event){
            if(sidebar && !sidebar.contains(event.target)){
                sidebar.classList.remove('show-sidebar')
                toggleDropdown()
            }
        })
        
    })

    function toggleDropdown(event: Event | null= null): void {
        const currentDropdown:HTMLElement | null = document.querySelector('.sidebar__dropdown > .sidebar__link.active')

        if(!event){
            currentDropdown?.classList.remove('active')
            return
        }

        const dropdown = event.target as HTMLElement

        currentDropdown?.classList.remove('active')

        if(dropdown === currentDropdown) dropdown.classList.remove('active')
        else dropdown.classList.add('active')
    }

    
</script>