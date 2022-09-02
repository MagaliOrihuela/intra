import store from '../store/store'
class socketOn{

    dataLoginOn() {
        socket.on('USER_JOINED', response => {
            console.log(response)
            store.dispatch('socketIO/socket_login',response);
        })
    }

    dataNewsOn() {
        socket.on('CREATE_NEWS', response => {
            console.log('maga-->e');
            store.dispatch('news/createNews',response);
        })
        socket.on('DELETE_NEWS', response => {
            store.dispatch('news/deleteNews',response);
        })
        socket.on('UPDATE_NEWS', response => {
            store.dispatch('news/updateNews',response);
        })
        socket.on('UPDATE_NEWS', response => {
            store.dispatch('news/updateNews',response);
        })
        socket.on('IMGS_NEWS', response => {
            store.dispatch('news/displayImgNews',response);
        })
    }

    dataNotificationOn() {
        socket.on('JOIN_NOTIFICATION', response => {
            store.dispatch('notifications/DataRowsNotifications',response);
        })
        socket.on('CREATE_NOTIFICATION', response => {
            store.dispatch('notifications/createNotification',response);
        })
        socket.on('DELETE_NOTIFICATION', response => {
            store.dispatch('notifications/deleteNotification',response);
        })
        socket.on('UPDATE_NOTIFICATION', response => {
            store.dispatch('notifications/updateNotification',response);
        })
    }

    dataCotizacionesOn() {

        socket.on('CREATE_COTIZACIONES', response => {
            store.dispatch('ecot/createCotizaciones',response);
        })

        socket.on('DELETE_COTIZACIONES', response => {
            store.dispatch('ecot/deleteCotizaciones',response);
        })
        socket.on('RECOVER_COTIZACIONES', response => {
            store.dispatch('ecot/recoverCotizacion',response);
        })

        socket.on('ORDER_COTIZACIONES', response => {
            store.dispatch('dcot/disabledOrder',response);
        })
    }

    dataInvoicesOn()  {
        socket.on('JOIN_INVOICES', response => {
            store.dispatch('invoices/DataRowsInvoices',response);
        })
    }

    dataCotizacionOn(){ //modificar
        socket.on('CREATE_COTIZACION', response => {
            store.dispatch('dcot/createDCotizacion',response);
        })
        socket.on('DELETE_COTIZACION', response => {
            store.dispatch('dcot/delPartCot',response);
        })
    }

    dataOrdersOn(){
        socket.on('FREE_DORDERS', response => {
            store.dispatch('dord/freeDOrders',response);
        })
        socket.on('FREE_MODAL', response => {
            store.dispatch('modals/IdentifyModal',response);
        })
        socket.on('FREE_STATUS', response => {
            store.dispatch('dord/free_status',response);
        })
    }
    
    dataSupplyOn(){
        socket.on('MODAL_SCAN', response => {
            store.dispatch('defree/modalScan',response);
        })
        socket.on('MODAL_DEL_SCAN', response => {
            store.dispatch('defree/modalDelScan',response);
        })
    }

}

const socketClientOn = new socketOn()
export default socketClientOn
