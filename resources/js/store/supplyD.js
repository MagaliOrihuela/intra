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
        dataPackT:[],
        dataPackT2:[],
        dataPackC:[],
        dataPackP:[],
        dataPackM:[],
        dataPackTol:[],
        // packScan:[],
        gridPack:[],
        foul:0,
        surt:1,
        scanPack: 0     //  Pemdiente, reciclar variables para no saturar el storage
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
            state.dataPackT = data.gridPT
            state.dataPackT2 = data.gridPT2
            state.dataPackC = data.gridPC
            state.dataPackP = data.gridPP
            state.dataPackM = data.gridPM
            state.dataPackTol = data.gridPTol
        },
        DATA_MODAL(state,data){
            state.dataModal = data.detModal
            state.foul = data.foul
        },
        DATA_GRIDS_MODAL(state,data){
            state.gridScan = data.dataScan
            state.gridSug = data.dataSug
            state.scanPack = data.scanPack
        },
        DATA_PACK_MODAL(state,data){
            state.gridScan = data.gridScan
            state.gridPack = data.gridPack
            state.dataModal = data.dataCat
            state.scanPack = data.scanPack
            state.gridSug = []
        },
        DATA_SCAN(state,data){
            state.gridScan.push(data.row)
            state.gridSug = data.gridSug
            state.foul = data.foul
            state.dataModal.status = data.surt
        },
        DATA_SCAN_GEN(state,data){
            var dataScan = []
            switch(Number.parseInt(data.catId)){
                case 1: dataScan = data.unitId == 2 ? store.getters['defree/getDataSuppT2'] : store.getters['defree/getDataSuppT']
                    break;
                case 2: dataScan = store.getters['defree/getDataSuppC']
                    break;
                case 3: dataScan = store.getters['defree/getDataSuppP']
                    break;
                case 4: dataScan = store.getters['defree/getDataSuppM']
                    break;
                case 5: dataScan = store.getters['defree/getDataSuppTol']
                    break;
            }
            for(let i = 0; i < dataScan.length; i++){
                if(Number.parseInt(dataScan[i].dord_id) === Number.parseInt(data.dord_id)){
                    switch(Number.parseInt(data.catId)){
                        case 1: 
                            data.unitId == 2 ? state.dataSuppT2[i].surt = data.surt : state.dataSuppT[i].surt = data.surt
                            break;
                        case 2: state.dataSuppC[i].surt = data.surt
                            break;
                        case 3: state.dataSuppP[i].surt = data.surt
                            break;
                        case 4: state.dataSuppM[i].surt = data.surt2
                            break;
                        case 5: state.dataSuppTol[i].surt = data.surt
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
        },
        DATA_PACKAGE(state,data){
            for(let i = 0; i < data.arrPack.length; i++){
                state.gridPack.push(data.arrPack[i])
            }
            // let gridPack = store.getters['defree/getDataGridPack']
            // let arrPack = gridPack.concat(data.arrPack)
            // state.gridPack = arrPack
            state.gridSug = []
            state.gridScan = data.arrScan
        },
        DATA_PACKAGE_G(state,data){
            let dataPack = []
            let arrPack = []
            switch(Number.parseInt(data.catId)){
                case 1:
                    if(Number.parseInt(data.rec) == 1){
                        dataPack = store.getters['defree/getDataPackT2']
                        arrPack = dataPack.concat(data.arrPack)
                        state.dataPackT2 = arrPack
                    } else{
                        dataPack = store.getters['defree/getDataPackT']
                        arrPack = dataPack.concat(data.arrPack)
                        state.dataPackT = arrPack
                    }
                    break;
                case 2: 
                    dataPack = store.getters['defree/getDataPackC']
                    arrPack = dataPack.concat(data.arrPack)
                    state.dataPackC = arrPack
                    break;
                case 3: 
                    dataPack = store.getters['defree/getDataPackP']
                    arrPack = dataPack.concat(data.arrPack)
                    state.dataPackP = arrPack
                    break;
                case 4:
                    dataPack = store.getters['defree/getDataPackM']
                    arrPack = dataPack.concat(data.arrPack)
                    state.dataPackM = arrPack
                    break;
                case 5: 
                    dataPack = store.getters['defree/getDataPackTol']
                    arrPack = dataPack.concat(data.arrPack)
                    state.dataPackTol = arrPack
                    break;
            }
        },
    },
    actions: {
        async getFreeD({commit},payload) {
            const { data } = await axios.post('supply/supplyD',payload )
            commit("DATA_SUPPD",data)
            return Promise.resolve(data)
        },
        // async getFreeM({commit},payload) {
        //     const { data } = await axios.post('supply/supplyM',payload )
        //     commit("DATA_SUPPD",data)
        //     return Promise.resolve(data)
        // },
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
        async gridsPackModal({commit},payload) {
            const { data } = await axios.post('supply/packModal',payload)
            commit("DATA_PACK_MODAL",data)
            return Promise.resolve(data)
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
        },
        async modalPackage({commit},data) {
            let dataSD = store.getters['defree/getDataSuppD']
            let dataModal = store.getters['defree/getDataSuppModal']
            if(data.freeId == dataSD.id){
                if(data.catId == dataModal.id && data.rec == dataModal.rec){
                    commit("DATA_PACKAGE",data)
                }
                commit("DATA_PACKAGE_G",data)
            }
        },
        async remGenerate({commit},payload){
            const { data } = await axios.post('supply/remGenerate',payload )
            return Promise.resolve(data)
        },
        async valida({commit},payload){
            const { data } = await axios.post('/API/supply/valida',payload )
            return Promise.resolve(data)
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
        getFoul: state => state.foul,
        getScanPack: state => state.scanPack,
        getDataPackT: state => state.dataPackT,
        getDataPackT2: state => state.dataPackT2,
        getDataPackC: state => state.dataPackC,
        getDataPackP: state => state.dataPackP,
        getDataPackM: state => state.dataPackM,
        getDataPackTol: state => state.dataPackTol,
        // getDataPackScan: state => state.packScan,
        getDataGridPack: state => state.gridPack,

    }
}

export default defree