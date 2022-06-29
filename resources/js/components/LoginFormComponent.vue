<template>
   <div>
      <v-card
         elevation="0"
         outlined="0"
         class="LoginCard"
         rounded="0"
      >
         <div class="imgLogo">
            <img src="images/logos_black.png" width="50%"> 
         </div>
         <form>
            <v-text-field
               outlined
               v-model="name"
               :error-messages="nameErrors"
               label="Usuario"
               name="us-10-2"
               required
               dense
               @input="$v.name.$touch()"
               prepend-inner-icon="mdi-account-outline"
               @keyup.enter="submit()"
            ></v-text-field>

            <v-text-field
               outlined
               v-model="password"
               :error-messages="passErrors"
               :append-icon="showpss ? 'mdi-eye' : 'mdi-eye-off'"
               :type="showpss ? 'text' : 'password'"
               name="input-10-1"
               required
               dense
               label="Contraseña"
               @click:append="showpss = !showpss"
               @input="$v.password.$touch()"
               prepend-inner-icon="mdi-lock-outline"
               @keyup.enter="submit()"
            ></v-text-field>
            <v-alert
               text
               prominent
               type="error"
               icon="mdi-cloud-alert"
               v-show="msjerr"
               transition="scale-transition"
            >
               {{ msj_error }}
            </v-alert>

            <v-btn 
               block
               class="mr-4" 
               color="secondary" 
               @click="submit"
               style="margin-bottom:20px"
            >
               <v-icon left>mdi-login</v-icon> Ingresar
            </v-btn>
         </form>

         <v-progress-linear
         :active="loading"
         :indeterminate="loading"
         absolute
         bottom
         color="red darken-4"
         ></v-progress-linear>

      </v-card>
   </div>
</template>
<script>
   import { validationMixin } from 'vuelidate'
   import { required, minLength } from 'vuelidate/lib/validators'
   import { mapActions, mapState, mapGetters } from 'vuex'
   import socketClientEmit from '../shared/socketEmit'

   export default {

      mixins: [validationMixin],

      validations: {
         name: { 
            required
         },
         password: { 
            required,
            minLength: minLength(6)
         },
      },

      data () {
         return {

            name: '',
            password: '',
            showpss: false,
            msjerr: false,
            alignmentsAvailable: [
               'start',
               'center',
               'end',
               'baseline',
               'stretch',
            ],
            alignment: 'center',
            dense: false,
            justifyAvailable: [
               'start',
               'center',
               'end',
               'space-around',
               'space-between',
            ],
            justify: 'center',
            loading: false,
            isLogin:true,

            timeRedirect: 8,
            timeLogin:'',

            msj_error: '',
         }
      },


      computed: {

         ...mapState(['userApi','msjerrorLogin']),
         ...mapGetters({ getUserApi: 'auth/getUserApi' }),

         nameErrors () {
            const errors = []
            if (!this.$v.name.$dirty) return errors
            !this.$v.name.required && errors.push('El nombre es requerido.')
            return errors
         },
         passErrors () {
            const errors = []
            if (!this.$v.password.$dirty) return errors
            !this.$v.password.required && errors.push('La contraseña es requerida.')
            !this.$v.password.minLength && errors.push('mínimo 6 caracteres.')
            return errors
         },
      },

      methods: {

         ...mapActions(['login']),
         async submit() {

            this.loading = true
            this.$v.$touch()
            if (!this.$v.$invalid) {
               await this.$store.dispatch('modals/loaderfull',true); // overlay cargando
               var credentials = {
                  user_name: this.name,
                  password: this.password
               }
               const data = await this.$store.dispatch({ type:'auth/login',credentials});
               await this.$store.dispatch({ type:'timerLogin/startTimerLogin'});
               if(data.success) {
                  this.msj_error = ''
                  this.loading = false
                  let payload = {
                     userName: data.short_name,
                     isPartner: data.is_partner
                  }
                  await socketClientEmit.loginEmit(payload) // desconectamos el socket
                  await this.$router.go('/')
               } else {
                  await this.$store.dispatch('modals/loaderfull',false); // overlay cargando
                  this.loading = false
                  this.msj_error = data.message
                  this.msjerr = true
               }
            }
         },
         async redirectOption(opt) {
            clearInterval(this.timeLogin)
            this.loading = true
            switch (Number.parseInt(opt)) {
               case 1: // inicio
                  this.loading = false
                  this.isLogin = false 
                  this.$router.push('/inicio')
               break;
               case 2: // logout
                  var token = { token: this.getUserApi.token }
                  await this.$store.dispatch({ type:'socketIO/socket_logout',token}); // desconectamos el socket
                  const res = await this.$store.dispatch({ type:'auth/logout',token});
                  if(res){ 
                     this.isLogin = true 
                     this.loading = false
                  }
               break;
            }
         },
      },
      watch: {
         loading (val) {
         if (!val) return
            setTimeout(() => (this.loading = false), 3000)
         },
      },
      async mounted() {
         this.$store.dispatch('modals/loaderfull', false); // desactivamos el overlay cargando
         const token  = this.getUserApi.token
         // validamos que el token aun sigue vigente
         if(typeof token  != 'undefined' ) {
            this.isLogin = false
            try {
               let headers = { 'Authorization': token }
               const { data } = await axios.post('/verify/token',{ token } , headers) 
               if (data.success) {
                  this.$router.push('/inicio')
               } else if (data.success === false ||  data.message == 'The token has been blacklisted' || data.message == 'Token has expired' || data.message == 'Token not provided' || data.message == 'CSRF token mismatch.' || data.message == 'CSRF token mismatch' ) 
               {
                  sessionStorage.clear()
                  this.$router.push('/')
               }
            } catch (error) {
               sessionStorage.clear()
               this.isLogin = true
               this.$router.push('/')
            }
         }
      },
   }
</script>
<style scoped>

   .LoginCard {
      width: 400px;
      padding: 0px 10px 0px 20px;
   }

   .LoginForm {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 60px;
}

   .imgLogo {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
   }

   .timerCount{
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 50px;
      font-size: 28px;
   }

   .msjAction {
      width: 100%;
      padding: 20px;
      text-align: center;
   }

   .div-redirection {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 400px;
      height: 200px;
   }

   .col-redirection {
      display: flex;
      justify-content: center;
      align-items: center;
   }

   .text-redirecting {
      color: #777777;
      font-size: 16px;
      font-weight: 500;
   }


   @media (max-width: 640px) {


      .LoginForm {
         margin-top: 60px;
      }

      .LoginCard {
         width: 100%;
         padding: 0px 10px 0px 20px;
      }
      
   }
</style>