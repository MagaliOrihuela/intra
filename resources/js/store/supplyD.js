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
            // const { data } = await axios.post('/API/supply/gridsModal',payload )
            const { data } = await axios.post(`/API/supply/gridsModal`, payload, { headers: { Authorization: "Bearer " + payload.token } })
            let arrGrids = data.gridSupplyModal[0]
            commit("DATA_GRIDS_MODAL",arrGrids)
            return Promise.resolve(arrGrids)
        },
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