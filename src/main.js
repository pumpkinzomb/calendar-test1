import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import axios from "axios";
import 'reset-css';

Vue.config.productionTip = false;
Vue.prototype.$http = axios;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');
