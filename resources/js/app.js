require('./bootstrap');

import Vue from 'vue'
import vuetify from "../plugins/vuetify"

/* icons Material Desing */
import '@mdi/font/css/materialdesignicons.css'

import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css' 

import 'sweetalert2/dist/sweetalert2.min.css';
import './services/SweetAlertToast'
import './services/SweetAlertQuestion'

import router from "./routes"
import App from './App.vue'
import store from './store/store'
// import vuehtml2pdf from 'vue-html2pdf'

Vue.component('example-component', require('./components/ExampleComponent.vue').default);

const app = new Vue({
    el: '#app',
    vuetify,
    router,
    BootstrapVue,
    BootstrapVueIcons,
    components: {
       App
    },
    icons: {
      iconfont: 'md',
    },
    store,
    // vuehtml2pdf
});

export { app }

