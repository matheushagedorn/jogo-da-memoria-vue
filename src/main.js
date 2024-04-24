import { createApp } from 'vue'
import { createModal } from '@kolirt/vue-modal'
import App from './App.vue'
import router from './router'

import './assets/css/reset.css'
import './assets/css/main.css'

const app = createApp(App)

app.use(router)
app.mount('#app')
