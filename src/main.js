import './assets/main.css'
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';
import { createApp } from 'vue'
import App from '../src/pages/HomePage.vue'
import store from '@/store/store';
import router from '@/router/router';
import './assets/multivue.css';
import './assets/style.css';
// import 'toastr/build/toastr.min.css';

const app = createApp(App)

app.use(router);
app.use(store)

app.mount('#app')
