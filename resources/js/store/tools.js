const tools = {
    namespaced:true,
    state: {
       rows_news: [],
    },
    mutations: {
        ROWS_NEWS (state,data) {
            state.cotizacionTotal = data
        },
    },
    actions: {

        async DataRowsNews({commit},payload) {
            
            try {
                const { data } = await axios.post('/news/getRowsNews', payload, { headers: { Authorization: "Bearer " + payload.token } })
                commit("ROWS_NEWS",data)
                return Promise.resolve(data)
            } catch (error) {

            }


        }
        
    },
    getters: {

    }
 }
 
 export default tools