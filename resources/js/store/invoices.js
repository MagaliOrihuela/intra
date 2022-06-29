
const invoices = {
    namespaced:true,
    state: {
        invoicesData: []
    },
    mutations: {
        ROW_DATA_INVOICES (state,payload) {
            console.log(payload)
            state.invoicesData = payload
        },
    },
    actions: {
        async getInvoices({commit},payload) {
            let payloadToken = {
                token: payload.token,
                user_id: payload.user_id
            }
            await axios.post(`API/invoices/getAll`,payloadToken )
            .then( response => {
                commit("ROW_DATA_INVOICES",response.data.invoiceData)
            })
            .catch( (error) => {
                console.log(error.response)
            })
        },
        async getConfigInvoice({commit},payload) {
            const response = await axios.post(`/invoice/get_config`, payload, { headers: { Authorization: "Bearer " + payload.token } })
            .then( response => {
                return response.data
            })
            .catch( (error) => {
                return error.response
            })
            return Promise.resolve(response)
        },
        async releaseInvoice({commit},payload) {
            const response = await axios.post(`/API/invoices/release`, payload, { headers: { Authorization: "Bearer " + payload.token } })
            .then( response => {
                return response.data
            })
            .catch( (error) => {
                return error.response
            })
            return Promise.resolve(response)
        },
    },
    getters: {
        getInvoicesData: state => state.invoicesData,
    }
}
export default invoices
