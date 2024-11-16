import Home from '@v/Index.vue' 

import ProductsIndex from '@v/products/Index.vue'
import ProductsForm from '@v/products/Form.vue'

export default [
    { path: '/', component: Home, label: "Inicio"},

    { path: '/productos', name: 'products', component: ProductsIndex, meta:{ group: 'products', label: "Productos" } },
    { path: '/productos/nuevo', name: 'products.new', component: ProductsForm, meta:{ group:'products', label: "Nuevo" } },
    { path: '/productos/:id', props: true, name: 'products.update', component: ProductsForm, meta:{ group:'products', label: "Actualizar" } }

    // { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
] 