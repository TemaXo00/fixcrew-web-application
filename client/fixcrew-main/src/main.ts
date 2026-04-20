import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { install as VueMarkedPlugin } from '@hackingzhang/vue-marked'

import App from './App.vue'
import router from './router'

import "./assets/main.css"
import '@hackingzhang/vue-marked/lib/vue-marked.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueMarkedPlugin)

app.mount('#app')
