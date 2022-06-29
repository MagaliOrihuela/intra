import axios from "axios"
import store from '../store/store'

const ecot = {
   namespaced:true,
   state: {
      dataCotizaciones: [],
      dataPartidas: [],
      dataElementos: [],
      dataArticlesVlook: [],
      dataConfigNewCot: [],
      dataConfigEditCot: [],
      deleted:false, 
      
      idEditCot: null,
      itemPartsCotizacion: [],
      itemDetailsCotizacion: [],

      // store socket
      gridCot:[],
      gridCotCanceled:[],
      optionsDate: { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric", hour24:"false"}
   },
   mutations: {
      DATA_COTIZACIONES (state,data) {
         for( let i in data ) {

            const isFind = state.gridCot.find( cotizaciones => cotizaciones.id === data[i].id )

            var date = new Date(data[i].created_at);
            data[i].created_at = date.toLocaleDateString("es-ES",state.optionsDate)
            
            if(typeof isFind === 'undefined') {
                state.gridCot.push(data[i]);
            }
        }

         state.gridCot = data
      },
      DATA_COTIZACIONES_CANCELED (state,data) {

         for( let i in data ) {

            const isFind = state.gridCotCanceled.find( cotizaciones => cotizaciones.id === data[i].id )
            if(typeof isFind === 'undefined') {
                var date = new Date(data[i].created_at);
                data[i].created_at = date.toLocaleDateString("es-ES",state.optionsDate)
                state.gridCotCanceled.push(data[i]);
            }
        }

         state.gridCotCanceled = data
      },
      CREATE_COTIZACIONES (state,data) {
         // verificamos que sea partner, si no lo es verificamos si el client_id de la cotizacion creada es igual al id_client del entorno que esta abierto

         const { ip, cid } = store.getters['auth/getUserApi']
         if(Number.parseInt(ip) === 1 || Number.parseInt(cid) ===  data.client_id) {

            var date = new Date(data.created_at);
            data.created_at = date.toLocaleDateString("es-ES",state.optionsDate)
            state.gridCot.push(data);
         }

      },
      DELETE_COTIZACIONES (state,data) {

         var idFnd = state.gridCot.map(x => x.id).indexOf(data.id)
         state.gridCot.splice(idFnd,1)

         var date = new Date(data.created_at);
         data.created_at = date.toLocaleDateString("es-ES",state.optionsDate)

         state.gridCotCanceled.push(data)

      },
      RECOVER_COTIZACION (state,data) {

         var idFnd = state.gridCotCanceled.map(x => x.id).indexOf(data.id)
         state.gridCotCanceled.splice(idFnd,1)
         var date = new Date(data.created_at);
         data.created_at = date.toLocaleDateString("es-ES",state.optionsDate)
         state.gridCot.push(data)
      },
      DATA_ID_EDIT_COT(state,data){
         state.idEditCot = data;
      },
      DATA_PARTIDAS (state,dataPart) {
         state.dataPartidas = dataPart
      },
      DATA_ITEMPARTS(state,dataPart) {
         state.itemPartsCotizacion = dataPart
      },
      DATA_COTELEMENTS (state,dataElem) {
         state.dataElementos = dataElem
      },
      DATA_CONFIGNEWCOT (state,dataConfig) {
         state.dataConfigNewCot = dataConfig
      },
      DATA_CONFIGEDITCOT (state,dataConfigEdit) {
         state.dataConfigEditCot = dataConfigEdit
      },
      SET_DETELED_VALUE(state, payload) {
         state.deleted = payload.deleted;
      },
      
      
      DATA_DETAILS_COTIZACION(state, data) {
         state.itemDetailsCotizacion = data.datacotizacion;
      },
      DATA_PRUBA (state,dataPart) {
         state.dataPartidas = dataPart
      },
   },
   actions: {
      async getCotizaciones({commit},payload) {
         const { data } = await axios.post(`/cotizaciones/v`, payload,  { headers: { Authorization: "Bearer " + payload.token } }) 
         commit("DATA_COTIZACIONES",data.eCot)
      },
      async getCotizacionesCanceled({commit},payload) {
         const { data } = await axios.post(`/cotizaciones/v/canceled`, payload,  { headers: { Authorization: "Bearer " + payload.token } }) 
         commit("DATA_COTIZACIONES_CANCELED",data.eCotCanceled)
      },
      createCotizaciones({commit},payload) {
         commit("CREATE_COTIZACIONES",payload[0])
      },
      deleteCotizaciones({commit},payload) {
         commit("DELETE_COTIZACIONES",payload[0])
      },
      recoverCotizacion({commit},payload) {
         commit("RECOVER_COTIZACION",payload[0])
      },
      // async getDirClient({commit},payload) {
      //    const {data} = await axios.get(`/cotizaciones/v/${payload.is_partner}/${payload.client_id}`,  { headers: { Authorization: "Bearer " + payload.token } }) 
      //    commit("DATA_COTIZACIONES",data)
      //    return Promise.resolve(data)
      // },
      async getPartidasCot({commit},payload) {
         const {data} = await axios.post(`/cotizacion/partidas`, payload, { headers: { Authorization: "Bearer " + payload.token } }) 
         commit("DATA_PARTIDAS",data)
         return Promise.resolve(data)
      },
      
      async ItemPartsCotizacion({commit},payload) {
         const {data} = await axios.post(`/cotizacion/partidas`, payload, { headers: { Authorization: "Bearer " + payload.token } }) 
         commit("DATA_ITEMPARTS",data)
      },
      

      async getElementsCot({commit},payload) {
         const {data} = await axios.post(`/cotizacion/elements`, payload,  { headers: { Authorization: "Bearer " + payload.token } }) 
         commit("DATA_COTELEMENTS",data)
         return Promise.resolve(data)
      },
      async getArticlesVlook({commit},payload) {
         const {data} = await axios.post('/articles/a',payload,  { headers: { Authorization: "Bearer " + payload.token } }) 
         commit("DATA_COTELEMENTS",data)
         return Promise.resolve(data)
      },
      async getConfignewCot({commit},payload) {
         const {data} = await axios.get(`/cotizaciones/confignewcot/${payload.is_partner}/${payload.client_id}`,  { headers: { Authorization: "Bearer " + payload.token } }) 
         commit("DATA_CONFIGNEWCOT",data)
         return Promise.resolve(data)
      },
      async getConfigeditCot({commit},payload) {
         const {data} = await axios.get(`/cotizaciones/configeditcot/${payload.is_partner}/${payload.cotizacion_id}`,  { headers: { Authorization: "Bearer " + payload.token } }) 
         commit("DATA_CONFIGEDITCOT",data)
         return Promise.resolve(data)
      },
      
      async deletedCot({commit},payload){
         const {data} = await axios.post('/cotizaciones/deletedCot', payload, { headers: { Authorization: "Bearer " + payload.token } })
         commit('DATA_DELETEPCOT',data)
         return Promise.resolve(data)
      },
      
      async getDataCot({commit},payload) {
         const {data} = await axios.post(`/cotizaciones/dataCotizacion`, payload, { headers: { Authorization: "Bearer " + payload.token } }) 
         return Promise.resolve(data)
      },
      async DetailsCotizacion({commit},payload) {
         const {data} = await axios.post(`/cotizaciones/dataCotizacion`, payload, { headers: { Authorization: "Bearer " + payload.token } })
         commit("DATA_DETAILS_COTIZACION",data)
      },
      idEditCotSelect({commit},data) {
         commit('DATA_ID_EDIT_COT',data)
      },
      async pruba({commit},payload) {
         const {data} = await axios.post(`/cotizacion/pruba`, payload, { headers: { Authorization: "Bearer " + payload.token } }) 
         commit("DATA_PRUBA",data)
         return Promise.resolve(data)
      },

   },
   getters: {
      getDataconfigCot: state => state.dataConfigNewCot,
      getDataCotizacion: state => state.gridCot,
      getDataCotizacionCancel: state => state.gridCotCanceled,
      getIdEditCotSelect: state => state.idEditCot,
      getItemPartsCotizacion: state => state.itemPartsCotizacion,
      getDetailsCotizacion: state => state.itemDetailsCotizacion,
   }
}

export default ecot