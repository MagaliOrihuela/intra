import axios from "axios"
import store from '../store/store'

const defree = {
    namespaced:true,
    state: {
        dataSuppD:[],
        dataSuppM:[],
    },
    mutations: {
        DATA_SUPPD (state,data) {
            state.dataSuppD = data
            state.dataSuppM = data
        },
        
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
    },
    getters: {
        getDataSuppD: state => state.dataSuppD,
        getDataSuppM: state => state.dataSuppM,
    }
}

export default defree