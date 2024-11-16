import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import Index from '@v/Index.vue'
import AuthLogin from '@v/auth/Login.vue'
import AuthRegister from '@v/auth/Register.vue'
import { auth } from '@/config/firebase.config'
import Swal from 'sweetalert2'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    meta:{
      requiresAuth: true,
    },
    component: Index
  },
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

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  
  if(to.matched.some(route => route.meta.requiresAuth)){
    if(auth.currentUser) {
      next()
    } else {
      Swal.fire('ops', 'Necesitas autenticarte', 'warning')
      next({ name:'auth.login' })
    }

  } else if (to.matched.some(route => route.meta.requiresGuest) && auth.currentUser){
    if(to.name == 'auth.login' || to.name == 'auth.register'){
      next({name: 'home'})
    }

  } else {
    next()
  }

})


export default router
