import axios from 'axios'
import Vue from 'vue'
import VueCookies from 'vue-cookies'
import { sync } from 'vuex-router-sync'

import { isProduction } from '~config'
import { createRouter } from './router'
import { createStore } from '~store'
import ElementUI from '~plugins/element-ui'
import logger from '~plugins/logger'

import App from './App.vue'

export function createApp () {
  const store = createStore()
  const router = createRouter(store)

  sync(store, router)

  // set http client
  Vue.prototype.$http = axios.create()

  // set application logger
  Vue.use(logger, isProduction)

  // plugins
  Vue.use(VueCookies)
  Vue.use(ElementUI)

  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })

  return { app, router, store }
}
