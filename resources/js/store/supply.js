import axios from "axios"
import store from '../store/store'

const efree = {
   namespaced:true,
   state: {
      dataSupp:[],
      dataSuppChk:[],
   },
   mutations: {
      DATA_SUPP (state,data) {
         state.dataSupp = data
      },
      DATA_SUPPCHK (state,data) {
         state.dataSuppChk = data
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
      async getSuppChk({commit},payload) {
            await axios.post('supply/supplyChk',payload )
            .then( response => {
               commit("DATA_SUPPCHK",response.data.dataFChk)
            })
            .catch( (error) => {
               console.log(error.response)
            })
      },
   },
   getters: {
      getDataSupp: state => state.dataSupp,
      getDataSuppChk: state => state.dataSuppChk,
   }
}

export default efree