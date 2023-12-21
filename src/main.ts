import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import * as Icons from '@element-plus/icons-vue'

import App from './App.vue'
import router from './router'

import './styles/main.less'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)

app.mount('#app')

Object.entries(Icons).forEach(([key, comp]) => {
  app.component(key, comp)
})
