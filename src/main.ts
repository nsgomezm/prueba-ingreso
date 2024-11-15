import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

import "./config/app.config"
import "./assets/scss/app.scss"

createApp(App).use(router).mount('#app')
