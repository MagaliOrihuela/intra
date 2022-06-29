import store from '../store/store'

export default async function checkToken(to , from, next) {

   try {
      const { token } = store.getters['auth/getUserApi']
      let headers = { 'Authorization': token }

      await axios.post('/verify/token', { token }, headers)
      .then( response => {
         document.title = to.meta.title;
         next();
      })
      .catch( (error) => {
         console.log(error.response.data.message)
         sessionStorage.clear()
         store.dispatch({type:'auth/webExpired'})
         next('/');
      })
   } catch(error) {
      next('/');
   }
}
