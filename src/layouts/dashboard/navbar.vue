<template>
    <nav class="navbar">
        <div class="navbar__logo">
            <button type="button" class="btn btn-navbar me-3 d-md-none" @click="toggleSidebar">
                <i class="text-primary fa-solid fa-bars fa-lg"></i>
            </button>
            <img src="@/assets/img/logo.svg" alt="logo linktic" loading="lazy" width="80">
        </div>
        <div class="navbar__menu">
            <div class="vr text-white"></div>
            <div class="dropdown"> 
                <div class="cursor-pointer" data-bs-toggle="dropdown">
                    <span class="navbar--title-avatar">Juanito perez</span>
                    <img src="https://ui-avatars.com/api/?name=John+Doe&rounded=true" alt="Avatar" class="navbar--avatar">
                </div>
                <div class="dropdown-menu dropdown-menu-end">
                    <a href="#" class="dropdown-item"><i class="fa-solid fa-user me-2"></i> Perfil</a>
                    <a href="#" class="dropdown-item"><i class="fa-solid fa-gear me-2"></i>Configuraciones</a>
                    <div class="dropdown-divider"></div>
                    <a href="#" class="dropdown-item"><i class="fa-solid fa-lock me-2"></i> Bloquear pantalla</a>
                    <a href="#" class="dropdown-item text-danger" @click.prevent="logout"> <i class="fa-solid fa-arrow-right-from-bracket me-2"></i> Cerrar sesión</a>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
    defineOptions({
        name: 'layout-navbar'
    })

    import { signOut } from 'firebase/auth';
    import Swal from 'sweetalert2';
    import { useRouter } from 'vue-router';
    import { auth } from '@/config/firebase.config';

    const router = useRouter()
    
    async function logout(): Promise<void>{
        try{
            await signOut(auth)
            .then(() => {
                router.push({name:'auth.login'})
            })
            
        } catch (e){
            Swal.fire('ops', 'Ocurrió un error incesperado, por favor vuelve a intentarlo', 'error')
            console.error(e)
        }
    }


    function toggleSidebar(event: Event): void{
        event.stopPropagation()
        const sidebar:HTMLElement | null = document.querySelector('#sidebar')
        sidebar?.classList.toggle('show-sidebar')

        if(sidebar?.classList.contains('show-sidebar')){
            const dropdowns:NodeListOf<HTMLElement> = document.querySelectorAll('.dropdown-menu.show')
            
            dropdowns.forEach( (dropdown:HTMLElement):void => dropdown.classList.remove('show') )
        
        }

    }

</script>