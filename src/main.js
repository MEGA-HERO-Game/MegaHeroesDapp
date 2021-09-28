import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Vant from "vant";
import "vant/lib/index.css";

import '@/styles/index.scss' // global css

Vue.use(Vant);

import "lib-flexible/flexible.js";

import * as filters from './filters' // global filters

import './permission'

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
