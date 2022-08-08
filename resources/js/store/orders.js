import axios from "axios"
import store from '../store/store'

const eord = {
   namespaced:true,
   state: {
      dataOrders:[],
      dataOrdersF:[],
      dataOrdersS:[],
      dataOrdersC:[],
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
      DATA_ORDERS_F (state,data) {
         state.dataOrdersF = data
      },
      DATA_ORDERS_S (state,data) {
         state.dataOrdersS = data
      },
      DATA_ORDERS_C (state,data) {
         state.dataOrdersC = data
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
      async getOrdersF({commit},payload) {
        await axios.post('orders/freeOrders',payload )
        .then( response => {
            commit("DATA_ORDERS_F",response.data.dataOrders)
        })
        .catch( (error) => {
            console.log(error.response)
        })
      },
      async getOrdersS({commit},payload) {
        await axios.post('API/orders/getOrdersS',payload )
        .then( response => {
            commit("DATA_ORDERS_S",response.data.dataOrders)
        })
        .catch( (error) => {
            console.log(error.response)
        })
      },
      async getOrdersC({commit},payload) {
        await axios.post('API/orders/getOrdersC',payload )
        .then( response => {
            commit("DATA_ORDERS_C",response.data.dataOrders)
        })
        .catch( (error) => {
            console.log(error.response)
        })
      },
   },
   getters: {
      getDataOrders: state => state.dataOrders,
      getDataOrdersF: state => state.dataOrdersF,
      getDataOrdersS: state => state.dataOrdersS,
      getDataOrdersC: state => state.dataOrdersC,
   }
}

export default eord