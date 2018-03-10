/* global AppOptions:true */
/* eslint-disable no-new */

// import 'font-awesome/css/font-awesome.css'

import App from './App'
import { WPApi } from '@/services'
import router from './router'
import store from './store'

import merge from 'webpack-merge'

import Vue from 'vue'
import Buefy from 'buefy'
import Axios from 'axios'
import lodash from 'lodash'
import firebase from 'firebase'

var config = AppOptions
// config.firebase = null // disabled firebase
Vue.config.productionTip = false

Vue.prototype._ = lodash
Vue.prototype.$config = config
Vue.prototype.$http = Axios
Vue.prototype.$firebase = firebase
Vue.prototype.$wp = WPApi

Vue.use(Buefy, { defaultIconPack: 'fa' })

let vueInstance
const initialState = JSON.stringify(store.state)

function runVue () {
  /* eslint-disable no-new */
  return new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
  })
}

function bootstrap () {
  if (!config.firebase) {
    runVue()
    return
  }

  // -------------------------
  // setup router (auth gate)
  // -------------------------
  router.beforeEach((to, from, next) => {
    if (!firebase.auth().currentUser && to.matched.some(record => record.meta.requiresAuth)) {
      next('Login')
      return
    }
    next()
  })

  // -------------------------
  // setup firebase
  // -------------------------
  firebase.initializeApp(config.firebase)

  firebase.auth().onAuthStateChanged((user) => {
    // -------------------------
    // cleanup on new user
    // -------------------------
    store.replaceState(merge(store.state, JSON.parse(initialState)))

    // react on user login
    if (user) {
      firebase.auth().currentUser.getIdToken().then((idToken) => {
        console.log(idToken)
        Axios.defaults.headers.common['Authorization'] = `Bearer ${idToken}`
        WPApi.getUserProfile()
        WPApi.getVendors()
      })

      // store.commit('user/SET_USER', user)

      if (router.path === '/login') {
        router.push('/')
      }
    }

    // -------------------------
    // ..only then we run Vue
    // -------------------------
    if (!vueInstance) {
      WPApi.$config = config
      WPApi.$firebase = firebase
      WPApi.$http = Axios
      WPApi.$router = router
      WPApi.$store = store
      WPApi.$app = runVue()

      vueInstance = WPApi.$app
    }
  })
}

/* walk before we run with firebase */
bootstrap()
