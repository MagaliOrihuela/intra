import axios from "axios"
import { ER_SLAVE_CONVERSION_FAILED } from "../../../node_modules/mysql/lib/protocol/constants/errors"
import store from '../store/store'

const dord = {
   namespaced:true,
   state: {
      dataOrder: [],
      detOrder: [],
      cateFree: [],
      selCate: [],

      sub: 0,
      iva: 0,
      total: 0,

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
         state.dataOrder = data.dataOrder
         state.detOrder = data.detOrder
         state.sub = data.sub
         state.iva = data.iva
         state.total = data.total
      },
      DATA_CATE_MODAL (state,data) {
         state.cateFree = data.gridCate
         state.selCate = data.selCate
      }
   },
   actions: {
      async getPartOrder({commit},payload) {
         const { data } = await axios.post(`/API/orders/getPartOrder`, payload, { headers: { Authorization: "Bearer " + payload.token } })
         const arrData = data.dataOrdPart[0]
         commit("DATA_ORDPARTS",arrData)
         return Promise.resolve(data)
      },
      async getDeliBoard({commit},payload){
         const { data } = await axios.post(`/order/deliBoard`, payload, { headers: { Authorization: "Bearer " + payload.token } })
         // const arrData = data.dataOrdPart[0]
         // commit("DATA_DETAIL_MODAL",data)
         return Promise.resolve(data)
      },
      async getCate({commit},payload){
         const { data } = await axios.post(`/order/cateFree`, payload, { headers: { Authorization: "Bearer " + payload.token } })
         commit("DATA_CATE_MODAL",data)
      },
      async address({commit},payload){
         const { data } = await axios.post(`/order/address`, payload, { headers: { Authorization: "Bearer " + payload.token } })
         return Promise.resolve(data)
      }
   },
   getters: {
      getDataOrder: state => state.dataOrder,
      getDetOrder: state => state.detOrder,
      getSubOrd: state => state.sub,
      getIvaOrd: state => state.iva,
      getTotOrd: state => state.total,
      getcateFree: state => state.cateFree, 
      getSelCate: state => state.selCate
   }
}

export default dord