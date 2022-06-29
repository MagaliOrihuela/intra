import store from '../store/store'

export default async function checkClientCot(to , from, next) {

   const { cid , token, ip } = store.getters['auth/getUserApi']
   let client_id = cid
   let is_partner = ip
   const cotizacion_id = Number.parseInt(to.params.cotizacion_id)
   let headers = { 'Authorization': token }

   try {

      const { data } = await axios.post('/verify/verifyClientCotizacion', { client_id, is_partner, token, cotizacion_id }, headers) 
         if (data.success) {
            
            sessionStorage.setItem('date_log', data.date_log) // re escribimos el tiempo de login por actividad
            document.title = to.meta.title;
            next();
   
         } else if (data.success === false ||  data.message == 'The token has been blacklisted' || data.message == 'Token has expired' || data.message == 'Token not provided' || data.message == 'CSRF token mismatch.' || data.message == 'CSRF token mismatch' ) 
         {
            next('/401');
         }
   
   } catch(error) {
      next('/401');
   }

}