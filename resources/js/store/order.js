import axios from "axios"
import store from '../store/store'

const dord = {
   namespaced:true,
   state: {
    dataOrder:[],

    optionsDate: { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric", hour24:"false"}
   },
   mutations: {
      DATA_ORDPARTS (state,data) {
        //  for( let i in data ) {
        //     const isFind = state.gridCot.find( cotizaciones => cotizaciones.id === data[i].id )
        //     var date = new Date(data[i].created_at);
        //     data[i].created_at = date.toLocaleDateString("es-ES",state.optionsDate)  
        //     if(typeof isFind === 'undefined') {
        //         state.gridCot.push(data[i]);
        //     }
        // }
         state.dataOrder = data
      },
   },
   actions: {
      async getPartOrder({commit},payload) {
         const { data } = await axios.post(`/API/orders/getPartOrder`, payload, { headers: { Authorization: "Bearer " + payload.token } })
         const arr = data.dataOrdPart[0]
         commit("DATA_ORDPARTS",arr.dataOrder)
         return Promise.resolve(data)
      },

   },
   getters: {
      getDataOrder: state => state.dataOrder,
    
   }
}

export default dord