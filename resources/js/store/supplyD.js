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
            state.dataModal = data
        },
        DATA_GRIDS_MODAL(state,data){
            state.gridScan = data.dataScan
            state.gridSug = data.dataSug
        },
        DATA_SCAN(state,data){
            state.gridScan.push(data.row)
            state.gridSug = data.gridSug
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
                    // error por no existir la posición i, urge correción 
                    state.gridScan[i].num = x
                }
            }
            state.gridSug = data.gridSug
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
            commit("DATA_MODAL",data.detModal)
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
            if(data.dord_id == dataModal.id){
                commit("DATA_SCAN",data)
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
    }
}

export default defree