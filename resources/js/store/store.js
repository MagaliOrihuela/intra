import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

// modules Store
import auth from '../store/auth'
import ecot from '../store/cotizaciones'
import dcot from '../store/cotizacion'
import eord from '../store/orders'
import timerLogin from '../store/timerLogin'
import modals from '../store/modals'
import clientsIO from '../store/ClientsIO'
import dataPrice from '../store/dataPrice'
// import tools from '../store/tools'
import notifications from '../store/notifications'
import news from '../store/news'
import socketIO from '../store/socketIO'
import invoices from '../store/invoices'


Vue.use(Vuex)

const vuexPersist = new VuexPersist({
   key: 'data',
   storage: window.sessionStorage,
   modules: ['auth'],
 })

const store = new Vuex.Store({
   modules: {
      auth,
      ecot,
      dcot,
      eord,
      timerLogin,
      modals,
      socketIO,
      clientsIO,
      dataPrice,
      // tools,
      notifications,
      news,
      invoices,
   },
   //...initialization
   plugins: [vuexPersist.plugin]
})


export default store
