<template>
    <LayoutAuth>
        <div class="card card-body bg-white shadow rounded-4 min-w-300 min-w-lg-400" >
            <form>
                <h2 class="fw-bold text-center">LINKTIC.COM</h2>
                <hr>
                <div class="mb-3">
                    <label for="name" class="form-label">Nombre</label>
                    <input type="email" class="form-control" id="name">
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Correo electronico</label>
                    <input type="email" class="form-control" id="email">
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Contraseña</label>
                    <input type="password" class="form-control" id="password">
                </div>
                <div class="mb-3">
                    <label for="password_confirm" class="form-label">Confirmar contraseña</label>
                    <input type="password" class="form-control" id="password_confirm">
                </div>
                <div class="d-flex gap-3 align-items-center flex-wrap justify-content-around">
                    <router-link :to="{name: 'auth.login'}" type="submit" class="btn btn-outline-primary">ya tengo una cuenta</router-link>
                    <router-link to="/" type="submit" class="btn btn-primary">Registrarme</router-link>
                </div>
            </form>
        </div>
    </LayoutAuth>
</template>

<script setup lang="ts">
    defineOptions({
        name: 'AuthRegister'
    })

    import LayoutAuth from '@layouts/auth/template.vue'
</script>