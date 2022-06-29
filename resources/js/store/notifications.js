import store from './store'
import SAToasts from '../services/SweetAlertToast'
const optionsDate = {weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric", hour24:"false"};

const notifications = {
    namespaced:true,
    state: {
        DataNotifications: [],
        NumberNotifications: 0,
    },
    mutations: {

        ROW_DATA_NOTIFICATIONS (state,data) {
            for( let i in data ) {
                const isFind = state.DataNotifications.find( notifications => notifications.id === data[i].id )
                if(typeof isFind === 'undefined') {
                    var date = new Date(data[i].created_at);
                    data[i].created_at = date.toLocaleDateString("es-ES",optionsDate)
                    state.DataNotifications.push(data[i]);
                }
            }

            state.NumberNotifications = Number.parseInt(data.length)
        },
        CREATE_DATA_NOTIFICATIONS (state,data) {
            
            var date = new Date(data.created_at);
            data.created_at = date.toLocaleDateString("es-ES",optionsDate)
            state.DataNotifications.push(data);
            state.NumberNotifications = state.DataNotifications.length
        },
        DELETE_DATA_NOTIFICATIONS (state,data) {
            var notificationsFinal = state.DataNotifications.filter(function(notification) {
                return notification.id !== data.id; 
            });
            state.DataNotifications = notificationsFinal
            state.NumberNotifications = state.DataNotifications.length
        },
        UPDATE_DATA_NOTIFICATIONS (state,data) {
            state.DataNotifications.map(function(item){
                if(item.id == data.id){
                    item.title = data.title;
                    item.description = data.description;
                }
                return item;
            });
            state.NumberNotifications = state.DataNotifications.length
        },
        INDIVIDUAL_DATA_NOTIFICATIONS (state,data) {
            data.forEach(item => {
                var date = new Date(item.created_at);
                item.created_at = date.toLocaleDateString("es-ES",optionsDate)
            });

            state.DataNotifications = data
            state.NumberNotifications = data.length
        },
    },
    actions: {
        async DataRowsNotifications({commit},payload) {
            // const { data } = await axios.get(`/notifications/get_rows_notifications/${payload.user_id}`,  { headers: { Authorization: "Bearer " + payload.token } })
            commit("ROW_DATA_NOTIFICATIONS",payload)
        },
        createNotification({commit},payload) {
            commit('CREATE_DATA_NOTIFICATIONS',payload[0]) 
        },
        deleteNotification({commit},payload) {
            commit('DELETE_DATA_NOTIFICATIONS',payload[0]) 
        },
        updateNotification({commit},payload) {
            commit('UPDATE_DATA_NOTIFICATIONS',payload[0]) 
        },
        async InvalidNotification({commit},{payload}) {
            try {
                const { data } = await axios.post('/notifications/invalid_notifications',payload)
                commit("INDIVIDUAL_DATA_NOTIFICATIONS", data.EViewsNotification)
            } catch (error) {
                return error
            }
        },

    },
    getters: {
      getNotifications: state => state.DataNotifications,
      getNumberNotifications: state => state.NumberNotifications,
    }
 }
 
 export default notifications