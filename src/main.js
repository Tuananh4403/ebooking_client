import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';
import 'bootstrap';
import { createApp } from 'vue'
import App from '../src/pages/AppPage.vue'
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
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.css';
import VueAwesomePaginate from "vue-awesome-paginate";
import "vue-awesome-paginate/dist/style.css";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
async function bootstrap() {
    const app = createApp(App)
    library.add(fas, far, fab,faAngleRight, faAngleLeft,faUser);
    store.dispatch('checkAuth');
    app.component('font-awesome-icon', FontAwesomeIcon);
    app.component('vue-multiselect', Multiselect);
    app.use(VueAwesomePaginate)
    app.component('vue-loading', Loading);
    app.use(router);
    app.use(store)
    app.mount('#app')
}
bootstrap();

