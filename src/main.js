/* global AppOptions:true */
/* eslint-disable no-new */

import 'font-awesome/css/font-awesome.css'

import App from './App'
import router from './router'
import store from './store'

import merge from 'webpack-merge'

import Vue from 'vue'
import Buefy from 'buefy'
import Axios from 'axios'
import lodash from 'lodash'
import firebase from 'firebase'

// config.firebase = null // disabled firebase
Vue.config.productionTip = false

Vue.prototype._ = lodash
Vue.prototype.$http = Axios
Vue.prototype.$firebase = firebase
Vue.use(Buefy)

var config = AppOptions

let currentUID
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
    if (user && currentUID === user.uid) {
      return
    }

    // -------------------------
    // cleanup on new user
    // -------------------------
    store.replaceState(merge(store.state, JSON.parse(initialState)))

    // react on user login
    if (user) {
      store.commit('user/SET_USER', user)

      firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function (idToken) {
        currentUID = user.uid

        // make a request to trigger google keys fetch
        Axios({ method: 'GET', 'url': '/wp-json/firebase-auth/v1/fetch_keys' })
          .catch(err => {
            console.log(err)
          })

        var params = { 'token': idToken }
        Axios({ method: 'POST', 'url': '/wp-json/firebase-auth/v1/verify', params })
          .then(res => {
            // console.log(res)
            // unable to verify
            // if (res.data.status !== 'ok') {
            // return router.push('/login')
            // }
          })
          .catch(() => {
            // unable to verify
            // return router.push('/login')
          })
      }).catch(function (error) {
        console.log(error)
      })

      if (router.path === '/login') {
        router.push('/')
      }
    }

    // -------------------------
    // ..only then we run Vue
    // -------------------------
    if (!vueInstance) {
      vueInstance = runVue()
    }
  })
}

/* walk before we run with firebase */
bootstrap()
