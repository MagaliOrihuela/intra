import axios from '../../../node_modules/axios/index';
import store from '../store/store'
class socketEmit {

    // LOGIN
    async loginEmit(payload) {
        socket.emit('login:init',payload)
    }

    // NEWS

    async createNewsEmit(payload) {
        let headers = { 'Authorization': payload.token }
        console.log('maga-->b');
        const { data } = await axios.post('/news/create', payload, headers)
        if(data.success) {
            console.log('maga-->c');
            socket.emit('news:create',data.dNew)
            return Promise.resolve(data) 
        }
    }

    async deleteNewsEmit(payload) {
        const { data } = await axios.get(`/news/delete/${payload.id}`,  { headers: { Authorization: "Bearer " + payload.token } })
        socket.emit('news:delete',data.dNew)
        return Promise.resolve(data)
    }

    async updateNewsEmit(payload) {
        const { data } = await axios.post('/news/update',payload)
        socket.emit('news:update',data.dNew)
        return Promise.resolve(data)
    }

    imgsNewsEmit(payload) {
        socket.emit('news:imgs',payload)
    }

    // NOTIFICATIONS

    async dataNotificationEmit(payload) {
        const { data } = await axios.get(`/notifications/get_rows_notifications/${payload.user_id}`,  { headers: { Authorization: "Bearer " + payload.token } })
        socket.emit('notification:join',data)
    }
    async createNotificationEmit(payload) {
        const { data } = await axios.post('/notifications/create',payload)
        socket.emit('notification:create',data.EViewsNotification)
    }
    async deleteNotificationEmit(payload) {
        const { data } = await axios.get(`/notifications/delete/${payload.module}/${payload.relation_id}/${payload.user_id}`,  { headers: { Authorization: "Bearer " + payload.token } })
        socket.emit('notification:delete',data.EViewsNotification)
    }
    async updateNotificationEmit(payload) {
        const { data }  = await axios.post('/notifications/update',payload)
        socket.emit('notification:update',data.EViewsNotification)
    }


    //COTIZACIONES

    async createCotizacionesEmit(payload) {
        const { data } = await axios.post('/cotizaciones/create', payload,  { headers: { Authorization: "Bearer " + payload.token } }) 
        socket.emit('cotizaciones:create',data.eCot)
        return Promise.resolve(data)
    }

    async canceledCotizacionesEmit(payload) {

        const { data } = await axios.post('/cotizaciones/canceledCot', payload, { headers: { Authorization: "Bearer " + payload.token } })
        socket.emit('cotizaciones:delete',data.datacot)
        return Promise.resolve(data)
    }
    
    async recoverCotizacionesEmit(payload) {
        const { data } = await axios.post('/cotizaciones/recover', payload,  { headers: { Authorization: "Bearer " + payload.token } }) 
        socket.emit('cotizaciones:recover',data.datacot)
        return Promise.resolve(data)
    }

    async proccessOrderEmit(payload) {

        const { data } = await axios.post('/cotizaciones/proccessOrder', payload,  { headers: { Authorization: "Bearer " + payload.token } }) 
        if(data.success) {
            socket.emit('cotizaciones:order',payload.id) 

            // crear archivo SAI
            data.eCot
            data.dCot 
        }
        return Promise.resolve(data)
    }

    // DCotizacion
    async createDCotizacionEmit(payload){
        const { data } = await axios.post('/cotizacion/create', payload, { headers: { Authorization: "Bearer" + payload.token } } )
        if(data.success){
            socket.emit('dcotizacion:create',data)
            return Promise.resolve(data)
        }
    }
 
 }

 const socketClientEmit = new socketEmit()
export default socketClientEmit
