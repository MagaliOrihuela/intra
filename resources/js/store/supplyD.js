import axios from "axios"
import { ER_EMPTY_QUERY } from "../../../node_modules/mysql/lib/protocol/constants/errors"
import store from '../store/store'

const defree = {
    namespaced:true,
    state: {
        dataSuppD:[],
        dataCat: [],
        dataSuppT:[],
        dataSuppT2:[],
        dataSuppC:[],
        dataSuppP:[],
        dataSuppM:[],
        dataSuppTol:[],
        dataModal:[],
        gridScan:[],
        gridSug:[],
        statusValT: 1,
        statusValT2: 1,
        statusValC: 1,
        statusValP: 1,
        statusValM: 1,
        statusValTol: 1,
        dataPackT:[],
        dataPackT2:[],
        dataPackC:[],
        dataPackP:[],
        dataPackM:[],
        dataPackTol:[],
        // packScan:[],
        gridPack:[],
        foulPack:0,
        foul:0,
        surt:1,
        scanPack: 0,     //  Pendiente, reciclar variables para no saturar el storage
        phaseSupp: 1
    },
    mutations: {
        DATA_SUPPD (state,data) {
            state.dataSuppD = data.dataF
            state.dataCat = data.arrCat
        },
        DATA_GRIDS(state,data){
            state.phaseSupp = data.tab
            state.dataSuppT = data.gridT
            state.dataSuppT2 = data.gridT2
            state.dataSuppC = data.gridC
            state.dataSuppP = data.gridP
            state.dataSuppM = data.gridM
            state.dataSuppTol = data.gridTol
        },
        DATA_STATUS(state,data){
            state.statusValT = data.statusT
            state.statusValT2 = data.statusT2
            state.statusValC = data.statusC
            state.statusValP = data.statusP
            state.statusValM = data.statusM
            state.statusValTol = data.statusTol
        },
        DATA_MODAL(state,data){
            state.dataModal = data.detModal
            state.foulPack = data.foulPack
            state.foul = data.foul
        },
        DATA_SGRIDS_MODAL(state,data){
            state.gridScan = data.dataScan
            state.gridSug = data.dataSug
            state.scanPack = data.scanPack
        },
        DATA_VGRIDS_MODAL(state,data){
            state.gridScan = data.arrVal
            state.dataModal = data.dataModal
        },
        DATA_PACK_MODAL(state,data){
            state.gridScan = data.gridScan
            state.gridPack = data.gridPack
            state.dataModal = data.dataCat
            state.scanPack = data.scanPack
            state.gridSug = []
        },
        DATA_SCAN(state,data){
            if(data.row){
                state.gridScan.push(data.row)
                state.foul = data.foul
                state.dataModal.status = data.surt
            }
            state.gridSug = data.gridSug
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
        DATA_VAL_SCAN(state,data){
            let dataScan = store.getters['defree/getGridScanModal']
            for(let i = 0; i < dataScan.length; i++){
                if(dataScan[i].id === data.dordLot){
                    state.gridScan[i].status_val1 = 1
                    state.dataModal.wait = data.wait
                    switch(data.catId){
                        case 1: 
                        data.rec == 1 ? state.statusValT = data.wait : state.statusValT2 = data.wait
                        break;
                    case 2: state.statusValC = data.wait
                        break;
                    case 3: state.statusValP = data.wait
                        break;
                    case 4: state.statusValM = data.wait
                        break;
                    case 5: state.statusValTol = data.wait
                        break;
                    }
                }
            }
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
        DATA_DELPACKAGE(state,data){
            let scan = store.getters['defree/getGridScanModal']
            let pack = store.getters['defree/getDataGridPack']
            let index = pack.findIndex(({id}) => id === data.arrPack.id)
            let n = scan.length
            data.arrPack.num = n + 1;
            state.gridScan.push(data.arrPack)
            state.gridPack.splice(index,1)
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
        DATA_DELPACKAGE_G(state,data){
            let dataPack = []
            let index = 0
            switch(Number.parseInt(data.catId)){
                case 1:
                    if(Number.parseInt(data.rec) == 1){
                        dataPack = store.getters['defree/getDataPackT2']
                        index = dataPack.findIndex(({id}) => id === data.arrPack.id)
                        state.dataPackT2.splice(index,1)
                    } else{
                        dataPack = store.getters['defree/getDataPackT']
                        index = dataPack.findIndex(({id}) => id === data.arrPack.id)
                        state.dataPackT.splice(index,1)
                    }
                    break;
                case 2: 
                    dataPack = store.getters['defree/getDataPackC']
                    index = dataPack.findIndex(({id}) => id === data.arrPack.id)
                    state.dataPackC.splice(index,1)
                    break;
                case 3: 
                    dataPack = store.getters['defree/getDataPackP']
                    index = dataPack.findIndex(({id}) => id === data.arrPack.id)
                    state.dataPackC.splice(index,1)
                    break;
                case 4:
                    dataPack = store.getters['defree/getDataPackM']
                    index = dataPack.findIndex(({id}) => id === data.arrPack.id)
                    state.dataPackM.splice(index,1)
                    break;
                case 5: 
                    dataPack = store.getters['defree/getDataPackTol']
                    index = dataPack.findIndex(({id}) => id === data.arrPack.id)
                    state.dataPackTol.splice(index,1)
                    break;
            }
        },
    },
    actions: {
        async getFreeD({commit},payload) {
            const { data } = await axios.post('supply/supplyD',payload )
            commit("DATA_SUPPD",data)
            commit("DATA_GRIDS",data)
            return Promise.resolve(data)
        },
        async getGridsG({commit},payload) {
            const { data } = await axios.post('supply/supplyGrids',payload )
            commit("DATA_GRIDS",data)
            commit("DATA_STATUS",data)
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
            commit("DATA_SGRIDS_MODAL",arrGrids)
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
        async modalDelPackage({commit},data) {
            let dataSD = store.getters['defree/getDataSuppD']
            let dataModal = store.getters['defree/getDataSuppModal']
            if(data.freeId == dataSD.id){
                if(data.catId == dataModal.id && data.rec == dataModal.rec){
                    commit("DATA_DELPACKAGE",data)
                }
                commit("DATA_DELPACKAGE_G",data)
            }
        },
        async modalValSupp({commit},data) {
            let dataSD = store.getters['defree/getDataSuppD']
            let dataModal = store.getters['defree/getDataSuppModal']
            let dataPhase = store.getters['defree/getPhaseSupp']
            if(data.freeId == dataSD.id){
                if(data.catId == dataModal.id && data.rec == dataModal.rec){
                    commit("DATA_VAL_SCAN",data)
                }
                // commit("DATA_DELPACKAGE_G",data)
            }
        },
        async remGenerate({commit},payload){
            const { data } = await axios.post('supply/remGenerate',payload )
            return Promise.resolve(data)
        },
        async valida({commit},payload){     // valida la ubicación en almacén
            const { data } = await axios.post('/API/supply/valida',payload )
            return Promise.resolve(data)
        },
        async getValModal({commit},payload){
            const { data } = await axios.post('supply/valGridSupply',payload )
            commit("DATA_VGRIDS_MODAL",data)
            return Promise.resolve(data)
        },
    },
    getters: {
        getDataSuppD: state => state.dataSuppD,
        getDataCat: state => state.dataCat,
        getDataSuppT: state => state.dataSuppT,
        getDataSuppT2: state => state.dataSuppT2,
        getDataSuppC: state => state.dataSuppC,
        getDataSuppP: state => state.dataSuppP,
        getDataSuppM: state => state.dataSuppM,
        getDataSuppTol: state => state.dataSuppTol,
        getDataSuppModal: state => state.dataModal,
        getGridScanModal: state => state.gridScan,
        getGridSugModal: state => state.gridSug,
        getFoulPack: state => state.foulPack,
        getFoul: state => state.foul,
        getStatusValT: state => state.statusValT,
        getStatusValT2: state => state.statusValT2,
        getStatusValC: state => state.statusValC,
        getStatusValP: state => state.statusValP,
        getStatusValM: state => state.statusValM,
        getStatusValTol: state => state.statusValTol,
        getScanPack: state => state.scanPack,
        getDataPackT: state => state.dataPackT,
        getDataPackT2: state => state.dataPackT2,
        getDataPackC: state => state.dataPackC,
        getDataPackP: state => state.dataPackP,
        getDataPackM: state => state.dataPackM,
        getDataPackTol: state => state.dataPackTol,
        // getDataPackScan: state => state.packScan,
        getDataGridPack: state => state.gridPack,
        getPhaseSupp: state => state.phaseSupp,

    }
}

export default defree