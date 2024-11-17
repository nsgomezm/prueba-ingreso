import Home from '@v/Index.vue' 

import ProductsIndex from '@v/products/Index.vue'
import ProductsForm from '@v/products/Form.vue'

import OrdersIndex from '@v/orders/Index.vue'
import OrdersForm from '@v/orders/Form.vue'

export default [
    { path: '', name:'home', component: Home, meta: {label: "Inicio"}},

    { path: '/productos', name: 'products', component: ProductsIndex, meta:{ group: 'products', label: "Productos" } },
    { path: '/productos/nuevo', name: 'products.new', component: ProductsForm, meta:{ group:'products', label: "Nuevo" } },
    { path: '/productos/:id', props: true, name: 'products.update', component: ProductsForm, meta:{ group:'products', label: "Actualizar" } },

    { path: '/pedidos', name: 'orders', component: OrdersIndex, meta: {group: 'orders', label: 'Pedidos'}},
    { path: '/pedidos/nuevo', name: 'orders.new', component: OrdersForm, meta:{ group:'orders', label: "Nuevo" } },
    { path: '/pedidos/:id', props: true,  name: 'orders.update', component: OrdersForm, meta:{ group:'orders', label: "Actualizar" } },

    // { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
] 