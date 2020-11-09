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
Vue.prototype.$API_BASE_URL =  'http://172.104.129.123:8000'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
