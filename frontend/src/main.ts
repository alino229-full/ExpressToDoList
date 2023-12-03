import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import BaseInput from '@/components/BaseInput.vue';
import BaseTextarea from '@/components/BaseTextarea.vue';
import BaseButton from '@/components/BaseButton.vue';
import AppNotification from "@/components/AppNotification.vue";
import App from './App.vue'
import router from './router'



const app = createApp(App)
app.component('BaseInput', BaseInput);
app.component('BaseTextarea', BaseTextarea);
app.component('BaseButton', BaseButton);
//provide global variable

app.provide("Notifier", AppNotification);
app.use(createPinia())
app.use(router)

app.mount('#app')
