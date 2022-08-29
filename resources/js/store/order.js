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

      disFree: true,
      sub: 0,
      iva: 0,
      total: 0,

      optionsDate: { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric", hour24:"false"}
   },
   mutations: {
      DATA_ORDPARTS (state,data) {
         state.dataOrder = data.dataOrder
         state.detOrder = data.detOrder
         state.sub = data.sub
         state.iva = data.iva
         state.total = data.total
      },
      DATA_CATE_MODAL (state,data) {
         state.cateFree = data.gridCate
         state.selCate = data.selCate
         state.disFree = data.disFree
      },
      DATA_FREE(state,data){
         const gDataOrder = store.getters['dord/getDataOrder']
         let arrCat = data.catLib
         for( let i in  arrCat) {
            for(let j in gDataOrder){
               if(arrCat[i] == gDataOrder[j].catId){
                  let tmp = gDataOrder[j]
                  tmp.free = 1
                  state.dataOrder.splice(j,1,tmp)
               }
           }
         }
      },
      DATA_FREE_STAT(state,data){
         state.detOrder.free = data.free
         state.detOrder.statusF = data.statusF
         state.detOrder.colorF = data.colorF
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
         if(data.flg == 0){
            commit("DATA_CATE_MODAL",data)
         }
         return Promise.resolve(data)
      },
      async address({commit},payload){
         const { data } = await axios.post(`/order/address`, payload, { headers: { Authorization: "Bearer " + payload.token } })
         return Promise.resolve(data)
      },
      async freeDetail({commit},payload){
         const { data } = await axios.post('/order/freeDetail', payload, { headers: { Authorization: "Bearer " + payload.token } })
         return Promise.resolve(data)
      },
      async freeDOrders({commit},data){ // a medias RT
         let detOrder = store.getters['dord/getDetOrder']
         if(detOrder.no_ped == data.no_ped){
            commit("DATA_FREE",data)
         }
      },
      async free_status({commit},data){ // a medias RT
         let detOrder = store.getters['dord/getDetOrder']
         let dat = data.dataOrdPart
         if(detOrder.no_ped == dat.no_ped){
            commit("DATA_FREE_STAT",dat)
         }
      },
   },
   getters: {
      getDataOrder: state => state.dataOrder,
      getDetOrder: state => state.detOrder,
      getSubOrd: state => state.sub,
      getIvaOrd: state => state.iva,
      getTotOrd: state => state.total,
      getcateFree: state => state.cateFree, 
      getSelCate: state => state.selCate,
      getDisFree: state => state.disFree
   }
}

export default dord