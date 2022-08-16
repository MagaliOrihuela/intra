import axios from "axios"
import store from '../store/store'

const efree = {
   namespaced:true,
   state: {
      dataSupp:[],
   },
   mutations: {
    DATA_SUPP (state,data) {
         state.dataSupp = data
      },
   },
   actions: {
        async getSupp({commit},payload) {
            await axios.post('supply/supplyWait',payload )
            .then( response => {
                commit("DATA_SUPP",response.data.dataF)
            })
            .catch( (error) => {
                console.log(error.response)
            })
        },
   },
   getters: {
      getDataSupp: state => state.dataSupp,
   }
}

export default efree