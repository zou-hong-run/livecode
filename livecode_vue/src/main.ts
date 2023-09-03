import { createApp } from 'vue'
import './assets/css/index.scss';
import 'vant/lib/index.css';
import App from './App.vue';
import router from './router/index';
const app = createApp(App);
app.use(router)
app.mount('#app')
