
import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

import "./config/app.config"
// import "./config/datatable.config"
import configFormKit from  "@/config/formKit.config"
import { plugin as pluginFormKit, defaultConfig, plugin} from "@formkit/vue"
// import { plugin as pluginFormKit, defaultConfig} from "@formkit/vue"

import "./assets/scss/app.scss"

import { auth } from '@/config/firebase.config'

import Spinner from './components/loaders/Spinner.vue'
import FormBackendError from './components/form/BackendError.vue'


let app: null = null

auth.onAuthStateChanged(() => {
    if(!app) {
        createApp(App)
            .use(router)
            .use(pluginFormKit, defaultConfig(configFormKit))
            .component('LoaderSpinner', Spinner)
            .component('BackendError', FormBackendError)
            .mount('#app')
    }
})