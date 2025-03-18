import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';
import 'bootstrap';
import { createApp } from 'vue'
import App from '../src/pages/HomePage.vue'
import store from '@/store/store';
import router from '@/router/router.js';
import mitt from 'mitt';
import 'toastr/build/toastr.min.css'
import "vue-toastification/dist/index.css";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
async function bootstrap() {
    const app = createApp(App)
    library.add(fas, far, fab,faAngleRight, faAngleLeft,faUser);
    store.dispatch('checkAuth');
    app.use(router);
    app.use(store)
    app.mount('#app')
}
bootstrap();

