import store from '../store/store'

const timerLogin = {
   namespaced:true,
   state: {
      seconds: 0,
      finalTime: 7200, // tiempo finalizacion en segundos
      timeLogin: 0, // variable con el intervalo almacenado
      dialogModal: false, 
   },
   mutations: {
      TIMER_LOGIN: (state) => {

         if( state.timeLogin > 0 ) {
            clearInterval(state.timeLogin)
            state.seconds = 0
            sessionStorage.clear()
         }

         if(state.dialogModal)  {
            state.dialogModal = false
            state.seconds = 0
            sessionStorage.clear()
         }

         state.timeLogin =  setInterval( async function(){ // dalimitamos el tiempo de conexion de una persona

            state.seconds++
            if( Number.parseInt(state.seconds) === Number.parseInt(state.finalTime) ) {
               clearInterval(state.timeLogin)
               state.dialogModal = true
               this.getUserApi = store.getters['auth/getUserApi']

               var payload = {
                  token: getUserApi.token,
                  user_id: getUserApi.user_id
               }
               await store.dispatch({ type:'socketIO/socket_logout',payload}); // desconectamos el socket
               await store.dispatch({ type:'auth/logout',payload});
            }

         }, 1000);
      }
   },
   actions: {
      startTimerLogin({commit}) {
         commit('TIMER_LOGIN')
      }
   },
   getters: {
      getTimerLogin: state => state.timeLogin,
      getShowDialogModal: state => state.dialogModal
   }
}

export default timerLogin