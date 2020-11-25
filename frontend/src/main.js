import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueGoogleCharts from 'vue-google-charts'
Vue.use(VueGoogleCharts)

// import { library } from "@fortawesome/fontawesome-svg-core";
// import {faAngleDown} from "@fortawesome/free-solid-svg-icons";
// import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

// library.add(faAngleDown)
// Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(BootstrapVue)
Vue.prototype.$http=axios
Vue.config.productionTip = false
Vue.use(require('vue-moment'))


new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})


