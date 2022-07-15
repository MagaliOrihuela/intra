import axios from "../../../node_modules/axios/index"

const auth = {
   namespaced:true,
   state: {
      userApi: [],
      accessModule: [],
   },
   mutations: {
      USER_API (state,data) {

         state.userApi= {
            cid: data.client_id,
            uid: data.user_id,
            email: data.email,
            ip: data.is_partner,
            message: data.message,
            short_name: data.short_name,
            success: data.success,
            user_img: data.user_img,
            user_name: data.user_name,
            token: data.token 
         }
         state.accessModule = data.access_module 
      },
      USER_API_DEL (state) {
         state.userApi = []
         state.accessModule = []
      },
      CHANGE_IMG_USER (state,data) {
         state.userApi.user_img = data
      },
      CHANGE_USER_DATA_API (state,data) {
         state.userApi =  []
      },
   },
   actions: {
      async login({commit},payload) {
         // try {
            const data = await axios.post('/auth/login',payload.credentials)
            .then( response => {
               return response.data
            })
            .catch( (error) => {
               return error.response.data
            })
            if(data.success) {
               let payloadToken = {
                  user_id: data.user_id,
                  token: data.token
               }
               await axios.post(`API/createToken`,payloadToken )
               sessionStorage.clear()
               commit("USER_API",data)
               return Promise.resolve(data)

            } else if (data.success === false ||  data.message == 'The token has been blacklisted' || data.message == 'Token has expired' || data.message == 'Token not provided' || data.message == 'CSRF token mismatch.' || data.message == 'CSRF token mismatch' ) 
            {
               sessionStorage.clear()
               // next('/');
               return Promise.resolve(data)
            }
         // } catch (error) {
         //    console.log('error')
         // }

      },
      async logout({commit},{payload}) {
         let headers = { 'Authorization': payload.token }
         const {data} = await axios.get(`/auth/logout/${payload.user_id}`,  { headers: { Authorization: "Bearer " + payload.token } })
         if(data.success) {
            sessionStorage.clear();
            commit("USER_API_DEL")
         }
         return Promise.resolve(data.success)
      },
      changeImgUser({commit},payload) {
         commit("CHANGE_IMG_USER",payload)
      },
      webExpired({commit}) {
         commit("CHANGE_USER_DATA_API")
      },
   },
   getters: {
      getUserApi: state => state.userApi,
      getAccessModule: state => state.accessModule,
   }
}

export default auth