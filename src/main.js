/*!
 * IOTA Transaction Stream Front End
 * Copyright(c) 2018 Peter Ryszkiewicz
 * MIT Licensed
 */

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'
import AsyncComputed from 'vue-async-computed'
import 'font-awesome/css/font-awesome.css'

Vue.config.productionTip = false

Vue.use(Buefy)
Vue.use(require('vue-moment'))
Vue.use(AsyncComputed)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
