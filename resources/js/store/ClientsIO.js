
const clientsIO = {
   namespaced:true,
   actions: {
      async SocketClients({commit},payload) {
         const {data} = await axios.get(`/socket`,  { headers: { Authorization: "Bearer " + payload.token } }) 
         return Promise.resolve(data)
      },
      // async InsertSocketClient({commit},payload) {
      //    const {data} = await axios.get(`/socket/insert/${payload.client.userID}/${payload.client.isPartner}/${payload.client.socketID}`,  { headers: { Authorization: "Bearer " + payload.token } }) 
      //    return Promise.resolve(data)
      // },
      // async DeleteSocketClient({commit},payload) {
      //    const {data} = await axios.get(`/socket/delete/${payload.socket_id}`,  { headers: { Authorization: "Bearer " + payload.token } }) 
      //    return Promise.resolve(data)
      // },
      // async RefreshSocketClient({commit},payload) {
      //    console.log(payload)
      //    const {data} = await axios.get(`/socket/update/${payload.socket_id_new}/${payload.socket_id_old}/${payload.user_id}`,  { headers: { Authorization: "Bearer " + payload.token } }) 
      //    return Promise.resolve(data)
      // }

   },
}

export default clientsIO