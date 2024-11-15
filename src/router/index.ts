import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import Index from '@v/Index.vue'
import AuthLogin from '@v/auth/Login.vue'
import AuthRegister from '@v/auth/Register.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Index
  },
  {
    path: '/Iniciar-sesion',
    name: 'auth.login',
    component: AuthLogin
  },
  {
    path: '/Registrarme',
    name: 'auth.register',
    component: AuthRegister
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
