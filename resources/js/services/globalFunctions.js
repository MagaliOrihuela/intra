import { io } from 'socket.io-client'

export default class globalFunctions {

   socketConnection() {
      var options = { transports: ['websocket','polling'],secure: true }
      const socket = io(process.env.MIX_SHADES_URI_WEB_SOCKETS, options); 
      return socket
   }

   socketDesConnection(socket) {
      socket.disconnect()
   }


}
