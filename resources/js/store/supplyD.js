import axios from "axios"
import store from '../store/store'

const defree = {
    namespaced:true,
    state: {
        dataSuppD:[],
        dataSuppT:[],
        dataSuppT2:[],
        dataSuppC:[],
        dataSuppP:[],
        dataSuppM:[],
        dataSuppTol:[],
        dataModal:[],
        gridScan:[],
        gridSug:[],
        foul:0,
        surt:1
    },
    mutations: {
        DATA_SUPPD (state,data) {
            state.dataSuppD = data.dataF
            state.dataSuppT = data.gridT
            state.dataSuppT2 = data.gridT2
            state.dataSuppC = data.gridC
            state.dataSuppP = data.gridP
            state.dataSuppM = data.gridM
            state.dataSuppTol = data.gridTol
        },
        DATA_MODAL(state,data){
            state.dataModal = data.detModal
            state.foul = data.foul
        },
        DATA_GRIDS_MODAL(state,data){
            state.gridScan = data.dataScan
            state.gridSug = data.dataSug
        },
        DATA_SCAN(state,data){
            state.gridScan.push(data.row)
            state.gridSug = data.gridSug
            state.foul = data.foul
            state.dataModal.status = data.surt
        },
        DATA_SCAN_GEN(state,data){
            var dataScan = []
            switch(data.catId){
                case '1': dataScan = data.unitId == 2 ? store.getters['defree/getDataSuppT2'] : store.getters['defree/getDataSuppT']
                    break;
                case '2': dataScan = store.getters['defree/getDataSuppC']
                    break;
                case '3': dataScan = store.getters['defree/getDataSuppP']
                    break;
                case '4': dataScan = store.getters['defree/getDataSuppM']
                    break;
                case '5': dataScan = store.getters['defree/getDataSuppTol']
                    break;
            }
            for(let i = 0; i < dataScan.length; i++){
                if(Number.parseInt(dataScan[i].dord_id) === Number.parseInt(data.dord_id)){
                    switch(data.catId){
                        case '1': 
                            data.unitId == 2 ? state.dataSuppT2[i].surt = data.surt : state.dataSuppT[i].surt = data.surt
                            break;
                        case '2': state.dataSuppC[i].surt = data.surt
                            break;
                        case '3': state.dataSuppP[i].surt = data.surt
                            break;
                        case '4': state.dataSuppM[i].surt = data.surt2
                            break;
                        case '5': state.dataSuppTol[i].surt = data.surt
                            break;
                    }
                    break;                   
                }
            }
        },
        DATA_DEL_SCAN(state,data){
            let dataScan = store.getters['defree/getGridScanModal']
            let flag = false
            let x = 0
            for(let i = 0; i < dataScan.length; i++){
                if(dataScan[i].id === data.dordLot){
                    state.gridScan.splice(i,1)
                    flag = true
                    x = i                    
                }
                if(flag){
                    x++
                    if(state.gridScan[i]){
                        state.gridScan[i].num = x
                    }
                }
            }
            state.gridSug = data.gridSug
            state.foul = data.foul
        }
    },
    actions: {
        async getFreeD({commit},payload) {
            const { data } = await axios.post('supply/supplyD',payload )
            commit("DATA_SUPPD",data)
            return Promise.resolve(data)
        },
        async getFreeM({commit},payload) {
            const { data } = await axios.post('supply/supplyM',payload )
            commit("DATA_SUPPD",data)
            return Promise.resolve(data)
        },
        async getSupplyModal({commit},payload) {
            const { data } = await axios.post('supply/supplyModal',payload )
            commit("DATA_MODAL",data)
            return Promise.resolve(data)
        },
        async gridsSupplyModal({commit},payload) {
            const { data } = await axios.post('/API/supply/gridsModal',payload )
            // const { data } = await axios.post(`/API/supply/gridsModal`, payload, { headers: { Authorization: "Bearer " + payload.token } })
            let arrGrids = data.gridSupplyModal[0]
            commit("DATA_GRIDS_MODAL",arrGrids)
            return Promise.resolve(arrGrids)
        },
        async modalScan({commit},data) {
            let dataModal = store.getters['defree/getDataSuppModal']
            let dataSuppD = store.getters['defree/getDataSuppD']
            if(data.dord_id == dataModal.id){
                commit("DATA_SCAN",data)
            }
            if(data.freeId == dataSuppD.id){
                commit("DATA_SCAN_GEN",data)
            }
        },
        async modalDelScan({commit},data) {
            let dataModal = store.getters['defree/getDataSuppModal']
            if(data.dord_id == dataModal.id){
                commit("DATA_DEL_SCAN",data)
            }
        }
    },
    getters: {
        getDataSuppD: state => state.dataSuppD,
        getDataSuppT: state => state.dataSuppT,
        getDataSuppT2: state => state.dataSuppT2,
        getDataSuppC: state => state.dataSuppC,
        getDataSuppP: state => state.dataSuppP,
        getDataSuppM: state => state.dataSuppM,
        getDataSuppTol: state => state.dataSuppTol,
        getDataSuppModal: state => state.dataModal,
        getGridScanModal: state => state.gridScan,
        getGridSugModal: state => state.gridSug,
        getFoul: state => state.foul,
    }
}

export default defree