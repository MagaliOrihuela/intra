import axios from "axios"
import store from '../store/store'

const eord = {
   namespaced:true,
   state: {
    dataOrders:[],

    optionsDate: { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric", hour24:"false"}
   },
   mutations: {
    DATA_ORDERS (state,data) {
        //  for( let i in data ) {
        //     const isFind = state.gridCot.find( cotizaciones => cotizaciones.id === data[i].id )
        //     var date = new Date(data[i].created_at);
        //     data[i].created_at = date.toLocaleDateString("es-ES",state.optionsDate)  
        //     if(typeof isFind === 'undefined') {
        //         state.gridCot.push(data[i]);
        //     }
        // }
        state.dataOrders = data
      },
   },
   actions: {
      async getOrders({commit},payload) {
        await axios.post('API/orders/getOrders',payload )
        .then( response => {
            commit("DATA_ORDERS",response.data.dataOrders)
        })
        .catch( (error) => {
            console.log(error.response)
        })
      },
   },
   getters: {
      getDataOrders: state => state.dataOrders,
   }
}

export default eord