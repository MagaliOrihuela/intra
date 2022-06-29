
// import { app } from '../app'
import store from './store'
import SAToasts from '../services/SweetAlertToast'
import PushMsj from '../services/PushMsj'

const socketIO = {
   namespaced:true,
   state: {
      conections: 0,
      socket_id: '',
      userExist:false
   },
   mutations: {

      LOGIN_CONECTED (state,payload) {

         const { ip } = store.getters['auth/getUserApi']
         if(Number.parseInt(ip) === 1 ) {

            var bodyPM = payload.clientName+' ha iniciado sesion.'
            var timeoutPM = 6000
            const PushMsjVar = new PushMsj(bodyPM,timeoutPM)
            PushMsjVar.getPushJs()

         }

      }

      // SOCKET_USERS (state,payload) {

      //    socket.on('USER_JOINED', response => {
      //       const { is_partner } = store.getters['auth/getUserApi']
      //       if(Number.parseInt(is_partner) === 1 ) {
      //          var iconToast = 'info'
      //          var msjToast = '<a>¡El usuario '+response.clientName+' ha iniciado sesion ... !</a><br><a style="font-size:10px">Connect session | Shades de México</a>'
      //          var positionToast = 'bottom-end'
      //          var timerToast = 6000
      //          const SAToastsVar = new SAToasts(iconToast,msjToast,positionToast,timerToast)
      //          SAToastsVar.getToast()
      //       }
      //    })

      //    socket.on('USER_EXIST', response => {

      //       var iconToast = 'warning'
      //       var msjToast = '<a>¡Iniciaron con tu sesion desde otro navegador ... !</a><br><a style="font-size:10px">Connect session | Shades de México</a>'
      //       var positionToast = 'bottom-end'
      //       var timerToast = 6000
      //       const SAToastsVar = new SAToasts(iconToast,msjToast,positionToast,timerToast)
      //       SAToastsVar.getToast()

      //    })

      // }, 
   },

   actions: {
      socket_refresh({commit},{ payload }) {
         socket = socket.socketConnection()
         socket.emit('refresh',payload)
         commit('SOCKET_USERS') 
      },
      async socket_login({commit},payload) {
         commit('LOGIN_CONECTED',payload)
      },
      socket_logout({commit}) {
         socket.emit('delete_socket')
         commit('SOCKET_USERS')
      },
      socket_connection_client({commit}) {

      }
   }

}

export default socketIO
