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
        statusValT: false,
        statusValT2: false,
        statusValC: false,
        statusValP: false,
        statusValM: false,
        statusValTol: false,
        packT: false,
        packT2: false,
        packC: false,
        packP: false,
        packM: false,
        packTol: false,
        gridPack:[],
        foulPack:0,
        foul:0,
        surt:1,
        scanPack: 0,     //  Pendiente, reciclar variables para no saturar el storage
        phaseSupp: 1,
        validate: 0
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
            state.statusValT = data.statusT
            state.statusValT2 = data.statusT2
            state.statusValC = data.statusC
            state.statusValP = data.statusP
            state.statusValM = data.statusM
            state.statusValTol = data.statusTol
        },
        DATA_STATUS(state,data){
            state.statusValT = data.statusT
            state.statusValT2 = data.statusT2
            state.statusValC = data.statusC
            state.statusValP = data.statusP
            state.statusValM = data.statusM
            state.statusValTol = data.statusTol
            state.packT = data.packT
            state.packT2 = data.packT2
            state.packC = data.packC
            state.packP = data.packP
            state.packM = data.packM
            state.packTol = data.packTol
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
            state.validate = data.validate
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
                state.foulPack = data.foulPack
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
            // checar cambio de método, buscar directo en el array y no reccorrer todo*
            for(let i = 0; i < dataScan.length; i++){
                if(Number.parseInt(dataScan[i].dord_id) === Number.parseInt(data.dord_id)){
                    switch(Number.parseInt(data.catId)){
                        case 1: 
                            if(data.unitId == 2){
                                state.dataSuppT2[i].surt = data.surt
                                state.statusValT2 = data.status
                            } else{
                                state.dataSuppT[i].surt = data.surt
                                state.statusValT = data.status
                            }
                            break;
                        case 2: 
                            state.dataSuppC[i].surt = data.surt
                            state.statusValC = data.status
                            break;
                        case 3: 
                            state.dataSuppP[i].surt = data.surt
                            state.statusValP = data.status
                            break;
                        case 4: 
                            state.dataSuppM[i].surt = data.surt
                            state.statusValM = data.status
                            break;
                        case 5: 
                            state.dataSuppTol[i].surt = data.surt
                            state.statusValTol = data.status
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
            state.foulPack = data.foulPack
            state.dataModal.status = data.surt
        },
        DATA_VAL_SCAN(state,data){
            let dataScan = store.getters['defree/getGridScanModal']
            let stat = data.phase == 4 ? 3 : 1
            let flag = false
            state.dataModal.wait = data.wait
            if(data.phase == 4){
                for(let j = 0; j < dataScan.length; j++){
                    if(dataScan[j].num == data.package){
                        state.gridScan[j].status_val1 = stat
                        flag = true
                    } else if(flag){
                        break
                    }
                }
            } else{
                let i = dataScan.findIndex(({id}) => id === data.dordLot)
                state.gridScan[i].status_val1 = stat
            } 
            switch(Number.parseInt(data.catId)){
                case 1:
                    if(Number.parseInt(data.rec) == 1){
                        state.statusValT2 = data.status
                    } else{
                        state.statusValT = data.status
                    }
                    break;
                case 2: 
                    state.statusValC = data.status
                    break;
                case 3: 
                    state.statusValP = data.status
                    break;
                case 4:
                    state.statusValM = data.status
                    break;
                case 5: 
                    state.statusValTol = data.status
                    break;
            }
        },
        DATA_PACKAGE(state,data){
            for(let i = 0; i < data.arrPack.length; i++){
                state.gridPack.push(data.arrPack[i])
            }
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
                        dataPack = store.getters['defree/getDataSuppT2']
                        arrPack = dataPack.concat(data.arrPack)
                        state.dataSuppT2 = arrPack
                        state.statusValT2 = data.status
                    } else{
                        dataPack = store.getters['defree/getDataSuppT']
                        arrPack = dataPack.concat(data.arrPack)
                        state.dataSuppT = arrPack
                        state.statusValT = data.status
                    }
                    break;
                case 2: 
                    dataPack = store.getters['defree/getDataSuppC']
                    arrPack = dataPack.concat(data.arrPack)
                    state.dataSuppC = arrPack
                    state.statusValC = data.status
                    break;
                case 3: 
                    dataPack = store.getters['defree/getDataSuppP']
                    arrPack = dataPack.concat(data.arrPack)
                    state.dataSuppP = arrPack
                    state.statusValP = data.status
                    break;
                case 4:
                    dataPack = store.getters['defree/getDataSuppM']
                    arrPack = dataPack.concat(data.arrPack)
                    state.dataSuppM = arrPack
                    state.statusValM = data.status
                    break;
                case 5: 
                    dataPack = store.getters['defree/getDataSuppTol']
                    arrPack = dataPack.concat(data.arrPack)
                    state.dataSuppTol = arrPack
                    state.statusValTol = data.status
                    break;
            }
        },
        DATA_DELPACKAGE_G(state,data){
            let dataPack = []
            let index = 0
            switch(Number.parseInt(data.catId)){
                case 1:
                    if(Number.parseInt(data.rec) == 1){
                        dataPack = store.getters['defree/getDataSuppT2']
                        index = dataPack.findIndex(({id}) => id === data.arrPack.id)
                        state.dataSuppT2.splice(index,1)
                        state.statusValT2 = data.status
                    } else{
                        dataPack = store.getters['defree/getDataSuppT']
                        index = dataPack.findIndex(({id}) => id === data.arrPack.id)
                        state.dataSuppT.splice(index,1)
                        state.statusValT = data.status
                    }
                    break;
                case 2: 
                    dataPack = store.getters['defree/getDataSuppC']
                    index = dataPack.findIndex(({id}) => id === data.arrPack.id)
                    state.dataSuppC.splice(index,1)
                    state.statusValC = data.status
                    break;
                case 3: 
                    dataPack = store.getters['defree/getDataSuppP']
                    index = dataPack.findIndex(({id}) => id === data.arrPack.id)
                    state.dataSuppP.splice(index,1)
                    state.statusValP = data.status
                    break;
                case 4:
                    dataPack = store.getters['defree/getDataSuppM']
                    index = dataPack.findIndex(({id}) => id === data.arrPack.id)
                    state.dataSuppM.splice(index,1)
                    state.statusValM = data.status
                    break;
                case 5: 
                    dataPack = store.getters['defree/getDataSuppTol']
                    index = dataPack.findIndex(({id}) => id === data.arrPack.id)
                    state.dataSuppTol.splice(index,1)
                    state.statusValTol = data.status
                    break;
            }
        },
        DATA_VAL_GEN(state,data){
            var dataScan = []
            let index = 0
            let stat;
            let flag = false
            if(data.phase == 4){
                stat = 3;
                switch(Number.parseInt(data.catId)){
                    case 1: 
                        if(data.rec == 1){
                            dataScan = store.getters['defree/getDataSuppT2']
                            for(let j = 0; j < dataScan.length; j++){
                                if(dataScan[j].num == data.package){
                                    state.dataSuppT2[j].check = stat
                                    flag = true
                                } else if(flag){
                                    break
                                }
                            }
                            state.statusValT2 = data.status  
                        } else{
                            dataScan = store.getters['defree/getDataSuppT']
                            for(let j = 0; j < dataScan.length; j++){
                                if(dataScan[j].num == data.package){
                                    state.dataSuppT[j].check = stat
                                    flag = true
                                } else if(flag){
                                    break
                                }
                            }
                            state.statusValT = data.status 
                        }
                        break;
                    case 2: 
                        dataScan = store.getters['defree/getDataSuppC']
                        for(let j = 0; j < dataScan.length; j++){
                            if(dataScan[j].num == data.package){
                                state.dataSuppC[j].check = stat
                                flag = true
                            } else if(flag){
                                break
                            }
                        }
                        state.statusValC = data.status 
                        break;
                    case 3: 
                        dataScan = store.getters['defree/getDataSuppP']
                        for(let j = 0; j < dataScan.length; j++){
                            if(dataScan[j].num == data.package){
                                state.dataSuppP[j].check = stat
                                flag = true
                            } else if(flag){
                                break
                            }
                        }
                        state.statusValP = data.status 
                        break;
                    case 4: 
                        dataScan = store.getters['defree/getDataSuppM']
                        for(let j = 0; j < dataScan.length; j++){
                            if(dataScan[j].num == data.package){
                                state.dataSuppM[j].check = stat
                                flag = true
                            } else if(flag){
                                break
                            }
                        }
                        state.statusValM = data.status  
                        break;
                    case 5: 
                        dataScan = store.getters['defree/getDataSuppTol']
                        for(let j = 0; j < dataScan.length; j++){
                            if(dataScan[j].num == data.package){
                                state.dataSuppTol[j].check = stat
                                flag = true
                            } else if(flag){
                                break
                            }
                        }
                        state.statusValTol = data.status  
                        break;
                }
            } else{
                stat = 1;
                switch(Number.parseInt(data.catId)){
                    case 1: 
                        if(data.rec == 1){
                            dataScan = store.getters['defree/getDataSuppT2']
                            index = dataScan.findIndex(({id}) => id === data.dordLot)
                            state.dataSuppT2[index].check = stat
                            state.statusValT2 = data.status  
                        } else{
                            dataScan = store.getters['defree/getDataSuppT']
                            index = dataScan.findIndex(({id}) => id === data.dordLot)
                            state.dataSuppT[index].check = stat
                            state.statusValT = data.status
                        }
                        break;
                    case 2: 
                        dataScan = store.getters['defree/getDataSuppC']
                        index = dataScan.findIndex(({id}) => id === data.dordLot)
                        state.dataSuppC[index].check = stat
                        state.statusValC = data.status  
                        break;
                    case 3: 
                        dataScan = store.getters['defree/getDataSuppP']
                        index = dataScan.findIndex(({id}) => id === data.dordLot)
                        state.dataSuppP[index].check = stat
                        state.statusValP = data.status 
                        break;
                    case 4: 
                        dataScan = store.getters['defree/getDataSuppM']
                        index = dataScan.findIndex(({id}) => id === data.dordLot)
                        state.dataSuppM[index].check = stat
                        state.statusValM = data.status 
                        break;
                    case 5: 
                        dataScan = store.getters['defree/getDataSuppTol']
                        index = dataScan.findIndex(({id}) => id === data.dordLot)
                        state.dataSuppTol[index].check = stat
                        state.statusValTol = data.status  
                        break;
                }
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
            if(Number.parseInt(data.freeId) == Number.parseInt(dataSuppD.id)){
                commit("DATA_SCAN_GEN",data)
            }
        },
        async modalDelScan({commit},data) {
            let dataModal = store.getters['defree/getDataSuppModal']
            let dataSuppD = store.getters['defree/getDataSuppD']
            if(data.dord_id == dataModal.id){
                commit("DATA_DEL_SCAN",data)
            }
            if(Number.parseInt(data.freeId) == Number.parseInt(dataSuppD.id)){
                commit("DATA_SCAN_GEN",data)
            }
        },
        async modalPackage({commit},data) {
            let dataSD = store.getters['defree/getDataSuppD']
            let dataModal = store.getters['defree/getDataSuppModal']
            let dataPhase = store.getters['defree/getPhaseSupp']
            if(data.freeId == dataSD.id && data.phase == dataPhase){
                if(data.catId == dataModal.id && data.rec == dataModal.rec ){
                    commit("DATA_PACKAGE",data)
                } 
                commit("DATA_PACKAGE_G",data)
            }
        },
        async modalDelPackage({commit},data) {
            let dataSD = store.getters['defree/getDataSuppD']
            let dataModal = store.getters['defree/getDataSuppModal']
            let dataPhase = store.getters['defree/getPhaseSupp']
            if(data.freeId == dataSD.id && data.phase == dataPhase){
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
                if(data.catId == dataModal.id && data.rec == dataModal.rec && dataPhase == data.phase){
                    commit("DATA_VAL_SCAN",data)
                }
                if(dataSD.id == data.freeId && dataPhase == data.phase){
                    commit("DATA_VAL_GEN",data)
                }
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
        async getVal2Modal({commit},payload){
            const { data } = await axios.post('supply/val2GridSupply',payload )
            commit("DATA_VGRIDS_MODAL",data)
            return Promise.resolve(data)
        },
        async getPdf({commit},payload){
            const { data } = await axios.post('supply/pdfPrub',payload, {responseType: 'arraybuffer'})
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
        getPackT: state => state.packT,
        getPackT2: state => state.packT2,
        getPackC: state => state.packC,
        getPackP: state => state.packP,
        getPackM: state => state.packM,
        getPackTol: state => state.packTol,
        // getDataPackScan: state => state.packScan,
        getDataGridPack: state => state.gridPack,
        getPhaseSupp: state => state.phaseSupp,
        getValidate: state => state.validate,

    }
}

export default defree