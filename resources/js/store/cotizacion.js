import axios from "../../../node_modules/axios/index"
import store from '../store/store'

const dcot = {
    namespaced:true,
    state: {
        DataDCot: [],
        idCot:0,
        sumSubt:'',
        Iva:'',
        sumTotal:'',
        deletePcot: [],
        disCot:false,
        dPanelCPM:false,
        isDCArticles:false,
        isDUnit:false,
        isDCant:false,
        isDDesc:false,
        isDPrice:false,
        isDBtnSave:false,
    },
    mutations: {
        ID_COT(state,data){
            state.idCot = data
        },
        DATA_PARTIDAS(state,data){
            for(let i in data){
                state.DataDCot.push(data[i])
            }
        },
        DATA_TOT(state,data){
            state.sumSubt = data.sumSubt
            state.Iva = data.Iva
            state.sumTotal = data.sumTotal
        },
        UPDATE_DATA_PARTIDAS(state,data){
            const dataGrid = store.getters['dcot/getDataDCot']
            for(let i in data){
                for(let j in dataGrid){
                    if(data[i].id == dataGrid[j].id){
                        state.DataDCot.splice(j,1,data[i])
                    }
                }
            }
        },
        DELETE_DATA_PARTIDAS(state,data){
            const dataGrid = store.getters['dcot/getDataDCot']
            let long = dataGrid.length;
            let flag = false
            for(let i in data){
                for(let j in dataGrid){
                    if(dataGrid[j].entry_id >= data[i].entry_id && flag == false){
                        let del = long - j
                        state.DataDCot.splice(j,del)
                        flag = true
                        break
                    }
                }
                if(flag){
                    state.DataDCot.push(data[i])
                }
            }
        },
        DATA_DELETEPCOT(state,dataPCot){
            state.deletePcot = dataPCot;
        },
        DISABLED_ORDER_DATA(state,id) {

                const idUsed = store.getters['ecot/getIdEditCotSelect']
                console.log(id+' === '+idUsed)
                if(Number.parseInt(id) === Number.parseInt(idUsed)) {
                    state.disCot = true
                    state.dPanelCPM = true
                    state.isDCArticles = true
                    state.isDUnit = true
                    state.isDCant = true
                    state.isDDesc = true
                    state.isDPrice = true
                    state.isDBtnSave = true
                }
        },
        SET_VALUE_ARTICLES(state,payload) {
            state.isDCArticles = payload
        },
        SET_VALUE_UNITS(state,payload) {
            state.isDUnit = payload
        },
        SET_VALUE_CANT(state,payload) {
            state.isDCant = payload
        },
        SET_VALUE_DESC(state,payload) {
            state.isDDesc = payload
        },
        SET_VALUE_PRICE(state,payload) {
            state.isDPrice = payload
        },
        SET_VALUE_BTNSAVE(state,payload) {
            state.isDBtnSave = payload
        },
        SET_VALUE_PANELCPM(state,payload) {
            state.dPanelCPM = payload
        },
        SET_VALUE_DISCOT(state,payload) {
            state.disCot = payload
        },
    },
    actions: {
        // cuando de click a pedido y finalice llamar a esta funcion y deshabilitar todo panel
        disabledOrder({commit},id) {
            commit("DISABLED_ORDER_DATA",id)
        },
        async getPartidasCot({commit},payload) {
            const { data } = await axios.post(`/cotizacion/partidas`, payload, { headers: { Authorization: "Bearer " + payload.token } })
            commit("DATA_PARTIDAS",data.gridpCot)
            commit("ID_COT",data.id_cot)
            commit("DATA_TOT",data)
            return Promise.resolve(data)
         },

        async createDCotizacion({commit},data){
            const idCotAct = store.getters['dcot/getIdCot']
            if(idCotAct == data.cotizacion_id){
                if(data.upd){
                    commit('UPDATE_DATA_PARTIDAS',data.gridpCot)
                }else{
                    commit('DATA_PARTIDAS',data.gridpCot)
                }
                commit("DATA_TOT",data)
            }
        },
        async updatePCot({commit},payload){
            const {data} = await axios.post('/cotizacion/updatedCot', payload, { headers: { Authorization: "Bearer " + payload.token } })
            return Promise.resolve(data)         
        },
        async delPartCot({commit},data){
            const idCotAct = store.getters['dcot/getIdCot']
            if(idCotAct == data.cotizacion_id){
                commit('DELETE_DATA_PARTIDAS',data.gridpCot)
                commit("DATA_TOT",data)
            }
            // const {data} = await axios.post('/cotizacion/deletePart', payload, { headers: { Authorization: "Bearer " + payload.token } })
            // commit("DATA_DELETEPCOT",data)
            // return Promise.resolve(data)

        },
        
    },
    getters: {
        getIdCot: state => state.idCot,
        getDataDCot: state => state.DataDCot,
        getsumSubt: state => state.sumSubt,
        getIva: state => state.Iva,
        getsumTotal: state => state.sumTotal,
        getDisabledCot: state => state.disCot,
        getDisabledPanleCPM: state => state.dPanelCPM,
        getDisabledArticles: state => state.isDCArticles,
        getDisabledUnit: state => state.isDUnit,
        getDisabledCant: state => state.isDCant,
        getDisablededDesc: state => state.isDDesc,
        getDisabledPrice: state => state.isDPrice,
        getDisabledBtnSave: state => state.isDBtnSave,
    }
}

export default dcot