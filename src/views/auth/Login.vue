<template>
    <LayoutAuth>
        <div class="card card-body bg-white shadow rounded-4 min-w-300 min-w-lg-400" >
            <FormKit type="form" id="form-login" :actions="false" #default="{state: {valid}}" @submit.prevent="store"  >
                <img src="@/assets/img/logo.svg" class="d-block mx-auto mb-4 mb-lg-5" alt="Logo Linktick" width="200">

                <BackendError :backend-errors="errors" v-if="errors"></BackendError>

                <div class="mb-3">
                    <FormKit type="email" label="Correo electronico" name="name" validation="required|email" v-model="form.email"></FormKit>
                </div>
                <div class="mb-3">
                    <FormKit type="password" label="Contraseña" name="password" validation="required|length:6,12" autocomplete="off" v-model="form.password"></FormKit>
                </div>
                <div class="d-flex gap-3 align-items-center flex-wrap justify-content-around ">
                    <router-link :to="{name: 'auth.register'}" type="submit" class="btn btn-outline-primary">Registrarse</router-link>
                    <button type="submit" class="btn btn-primary" @click.prevent="store" :disabled="!valid || isLoading">
                        <LoaderSpinner :is-loading="isLoading" class="me-2"></LoaderSpinner>
                        Iniciar sesión
                    </button>
                </div>
            </FormKit>
        </div>
    </LayoutAuth>
</template>

<script setup lang="ts">
    import LayoutAuth from '@layouts/auth/template.vue'
    import Swal from 'sweetalert2';
    import { ref } from 'vue';
    import { auth } from '@/config/firebase.config';
    import { signInWithEmailAndPassword } from 'firebase/auth';
    import BackendError from '@/components/form/BackendError.vue';
    import { useRouter } from 'vue-router';

    defineOptions({
        name: 'AuthLogin'
    })

    const router = useRouter()
    const isLoading = ref(<boolean>false)
    const errors = ref(null)

    const form = ref(<Record<string, string | null>>{
        email: null,
        password: null
    })

    async function store(): Promise<void>{
        if(isLoading.value || !form.value.email || !form.value.password) return

        try{
            isLoading.value = true 
            errors.value = null

            const userCredential = await signInWithEmailAndPassword(auth, form.value.email, form.value.password)
            Swal.fire('Hola!', 'Has iniciado sesión de forma exitosa', 'success')
            .then(() => router.push({name: 'home'}))


            // console.log('usuario autenticado', userCredential.user)

        } catch (error: any) {
            errors.value = error
        } finally {
            isLoading.value = false
        }
        
    }
    
    
</script>