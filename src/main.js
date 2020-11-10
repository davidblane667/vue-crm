import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from './filters/date.filter'
import currencyFilter from './filters/currency.filter'
import messagePlugin from '@/utils/message.plugin'
import Loader from './components/app/Loader'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(Vuelidate)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.component('Loader', Loader)

firebase.initializeApp({
  apiKey: 'AIzaSyAKnRb-CvxYG4oUJpiBmFHaaFstl_GJXak',
  authDomain: 'vue-crm-79eca.firebaseapp.com',
  databaseURL: 'https://vue-crm-79eca.firebaseio.com',
  projectId: 'vue-crm-79eca',
  storageBucket: 'vue-crm-79eca.appspot.com',
  messagingSenderId: '310335616401',
  appId: '1:310335616401:web:bbc4a8508cbb505a2f1630',
  measurementId: 'G-5EMNSYVJW8'
})

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
