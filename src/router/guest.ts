import AuthLogin from '@v/auth/Login.vue'
import AuthRegister from '@v/auth/Register.vue'


export default [
    {
        path: '/Iniciar-sesion',
        name: 'auth.login',
        meta:{
            requiresGuest: true,
        },
        component: AuthLogin
    },
    {
        path: '/Registrarme',
        name: 'auth.register',
        meta:{
            requiresGuest: true,
        },
        component: AuthRegister
    },
]