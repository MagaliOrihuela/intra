import store from '../store/store'

const modals = {
   namespaced:true,
   state: {
      newCotModal: false, 
      detailCotModal: false, 
      editCotModal: false, 
      orderFreeModal: false,
      supplyModal: false,
      packModal: false,
      editCotId:0,
      loaderFull: false, 
   },
   mutations: {
      MODAL_NEW_COTIZACION(state,stateModal){ 
         state.newCotModal = stateModal 
      },
      async MODAL_DETAIL_COTIZACION(state,data){ 
         state.editCotId = data.id
         state.detailCotModal = data.state_modal 
      },
      MODAL_EDIT_COTIZACION(state,stateModal){ 
         state.editCotModal = stateModal 
      },
      LOAD_FULL_EDIT(state,data){ 
         state.loaderFull = data 
      },
      ORDER_FREE_MODAL(state,data){ 
         state.orderFreeModal = data 
      },
      SUPPLY_MODAL(state,data){ 
         state.supplyModal = data 
      },
      PACK_MODAL(state,data){ 
         state.packModal = data 
      },
   },
   actions: {
      IdentifyModal({commit},payload) {

         switch (payload.name_modal) {
            case 'newCotizacion':
               commit('MODAL_NEW_COTIZACION',payload.state_modal)
            break;
            case 'detailCotizacion':
               commit('MODAL_DETAIL_COTIZACION',payload)
            break;
            case 'editCotizacion':
               commit('MODAL_EDIT_COTIZACION',payload.state_modal)
            break;
            case 'orderFree':
               
               commit('ORDER_FREE_MODAL',payload.state_modal)
            break;
            case 'supplyFree':
               commit('SUPPLY_MODAL',payload.state_modal)
            break;
            case 'supplyPack':
               commit('PACK_MODAL',payload.state_modal)
            break;
         }
      },
      loaderfull({commit},payload) {
         commit('LOAD_FULL_EDIT',payload)
      }
   },
   getters: {
      getShowNewCotModal: state => state.newCotModal,
      getShowEditCotModal: state => state.editCotModal,
      getLoaderfull: state => state.loaderFull,
      getDetailCotModal: state => state.detailCotModal,
      getCotIdModal: state => state.editCotId,
      getOrderFreeModal: state => state.orderFreeModal,
      getSupplyModal: state => state.supplyModal,
      getPackModal: state => state.packModal,
   }
}

export default modals