import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import './helpers'
import './filters'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import axios from 'axios'
Vue.prototype.$http = axios
// http://172.104.129.123
Vue.prototype.$API_BASE_URL =  'http://127.0.0.1:8000'
console.log(Vue.prototype.$API_BASE_URL)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
