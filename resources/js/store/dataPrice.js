
const dataPrice = {
    namespaced:true,
    state: {
       cotizacionTotal: [],
    },
    mutations: {
        PRICE_TOTAL (state,data) {
            state.cotizacionTotal = data
        },
    },
    actions: {

        async DataPriceTotal({commit},payload) {
            //console.log('primer pruba vue');
            
            try {
                const { data } = await axios.post('/cotizacion/getpricetotal', payload, { headers: { Authorization: "Bearer " + payload.token } })
                //console.log(data);
                commit("PRICE_TOTAL",data)
                return Promise.resolve(data)
            } catch (error) {

            }

           // commit("PRICE_TOTAL",payload)

        }
        
    },
    getters: {

    }
 }
 
 export default dataPrice
