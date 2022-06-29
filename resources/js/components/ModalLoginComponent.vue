<template>
  <v-row justify="center">
    <v-dialog 
      v-model="dialogModal" 
      persistent 
      max-width="350"
   >
      <v-card>
         <v-card-title>
            
            <span class="headline pb-5">
               <v-icon>
                  mdi-timer-off-outline
               </v-icon>
               Inactivad agotada
            </span>
         </v-card-title>
         <v-card-subtitle>
            <span class="">Pasaron 2 horas de inactividad, favor de iniciar sesión para continuar con su actividad normal</span>
         </v-card-subtitle>
         <v-card-text>
            <v-container 
               fluid 
               style="padding:0px"
            >
               <v-row>
                  <v-card
                     class="LoginCard"
                     outlined
                  >
                     <v-col cols="12" sm="12" md="12" class="LoginForm">
                        <form>
                           <v-text-field
                              outlined
                              v-model="name"
                              :error-messages="nameErrors"
                              label="Usuario"
                              name="us-10-2"
                              required
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
                              Usuario o contraseña incorrectos 
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


                     </v-col>
                     
                  <v-progress-linear
                  :active="loading"
                  :indeterminate="loading"
                  absolute
                  bottom
                  color="red darken-4"
                  ></v-progress-linear>

                  </v-card>
                  
               </v-row>
            </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>


   import { validationMixin } from 'vuelidate'
   import { required, maxLength, minLength, email } from 'vuelidate/lib/validators'
   import { mapActions, mapState, mapGetters } from 'vuex'
   import store from '../store/store'

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

      data: () => ({
         dialog: false,
         loading: false,
         name: '',
         password: '',
         showpss: false,
         msjerr: false,
         alignment: 'center',
         justify: 'center',
         timeLogin: '',
      }),

      computed: {
         ...mapState(['userApi','msjerrorLogin']),
         ...mapGetters({ dialogModal:'timerLogin/getShowDialogModal' }),
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
            !this.$v.password.minLength && errors.push('mínimo 8 caracteres.')
            return errors
         },
      },

      methods: {
         ...mapActions(['login']),
         async submit() {
            this.loading = true
            this.$v.$touch()
            if (!this.$v.$invalid) {

               var credentials = {
                  user_name: this.name,
                  password: this.password
               }

               const res = await this.$store.dispatch({ type:'auth/login',credentials});
               if(res){
                  this.msjerr = false
                  this.loading = false
                  this.$store.dispatch({ type:'timerLogin/startTimerLogin'});

               }else{
                  this.loading = false
                  this.msjerr = true
               }
            }
         },

         // loadModal() {
         //    this.dialog = true
         //    sessionStorage.clear()
           
         // },

      },
      created: function () {
         
      }
   }
</script>
<style scoped>


.LoginCard {
   width: 100%;
   padding: 0px 10px 0px 20px;
}

</style>