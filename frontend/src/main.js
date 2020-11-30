// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import axios from 'axios'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueGoogleCharts from 'vue-google-charts'

Vue.config.productionTip = false
Vue.config.devtools = true
Vue.prototype.$http=axios
import {store} from './store/store';
Vue.use(Vuex)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(VueGoogleCharts)
Vue.use(require('vue-moment'))


new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})


