<template>
    <LayoutAuth>
        <div class="card card-body bg-white shadow rounded-4 min-w-300 min-w-lg-400" >
            <FormKit type="form" id="form-register" :actions="false" #default="{state: {valid}}" @submit.prevent="store" >
                <img src="@/assets/img/logo.svg" class="d-block mx-auto mb-4 mb-lg-5" alt="Logo Linktick" width="200">

                <div class="mb-3">
                    <FormKit type="email" label="Correo electronico" name="email" validation="required|email" v-model="form.email"></FormKit>
                </div>
                <div class="mb-3">
                    <FormKit type="password" label="Contraseña" name="password" validation="required|length:6,12" v-model="form.password"></FormKit>
                </div>
                <div class="mb-3">
                    <FormKit type="password" label="Contraseña" name="confirm_password" validation="required|confirm:password" v-model="form.confirm_password"></FormKit>
                </div>
                <div class="d-flex gap-3 align-items-center flex-wrap justify-content-around">
                    <router-link :to="{name: 'auth.login'}" class="btn btn-outline-primary">Tengo una cuenta</router-link>
                    <button type="submit" class="btn btn-primary" @click.prevent="store" :disabled="!valid || isLoading">
                        <LoaderSpinner :is-loading="isLoading" class="me-2"></LoaderSpinner>
                        {{  isLoading ? 'Registrando': 'Registrarme' }}
                    </button>  
                </div>
            </FormKit>
        </div>
    </LayoutAuth>
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    import LayoutAuth from '@layouts/auth/template.vue'
    import { auth } from '@/config/firebase.config'
    import { createUserWithEmailAndPassword } from 'firebase/auth';
    import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

    defineOptions({
        name: 'AuthRegister'
    })

    const isLoading = ref(<Boolean>false)
    const router = useRouter()

    const form = ref(<Record<string, string|null>>{
        email: null,
        password: null,
        confirm_password: null,
    })

    async function store(): Promise<void>{
        if(isLoading.value || !form.value.email || !form.value.password ) return 

        try {
            isLoading.value = true
            const userCredential = await createUserWithEmailAndPassword(auth, form.value.email, form.value.password);
            
            Swal.fire('Excelente', 'Nuevo usuario creado y autenticado.', 'success')
                .then(() => router.push({name: 'home'}) )

        } catch (error: any) {
            Swal.fire('Ops', 'Ocurrió un error, por favor intentalo otra vez.', 'error')
            console.error('Error al crear usuario:', error);
        } finally{
            isLoading.value = false
        }
    }

</script>