import Vue from 'vue';
import App from './App.vue';
import AsyncComputed from 'vue-async-computed';
import store from './store';

import 'bootstrap/dist/css/bootstrap.min.css';

require('jquery');
require('bootstrap');

Vue.use(AsyncComputed);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  store
}).$mount('#app');
