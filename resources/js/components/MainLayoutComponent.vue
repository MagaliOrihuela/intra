<template>
   <div>
      <!-- Header Menu -->
      <v-toolbar
         dense
         flat
         color:="blue-grey lighten-5"
         class="toolbar-shades"
      >
         <v-app-bar-nav-icon
            @click.stop="drawer = !drawer"
            v-if="getUserApi != ''"
         ></v-app-bar-nav-icon>
         <v-spacer></v-spacer>
         <v-btn
            fab
            dark
            small
            class="mr-2"
            color="white"
            :elevation="1"
            @click="openNewCotModal"
            v-if="getUserApi != ''"
         >
            <v-icon
               color="grey darken-1"
            >mdi-note-plus-outline</v-icon>
         </v-btn>
         <v-menu
            bottom
            offset-y
            transition="slide-y-reverse-transition"
            v-if="getUserApi != ''"
         >
            <template v-slot:activator="{ on, attrs }">
               <v-btn
                  fab
                  dark
                  small
                  class="mr-2"
                  color="white"
                  :elevation="1"
                  v-bind="attrs"
                  v-on="on"
               >
                  <v-badge
                     :v-model="NumberNotifications"
                     :content="NumberNotifications"
                     :value="NumberNotifications"
                     color="red"
                     overlap
                  >
                     <v-icon
                        color="grey darken-1"
                     >
                        mdi-bell-outline
                     </v-icon>
                  </v-badge>
               </v-btn>
            </template>

            <div v-if="notifications != '' ">
               <v-card
                  elevation="0"
                  max-width="400"
                  class="mx-auto"
               >
                  <v-virtual-scroll
                     v-model="notifications"
                     :item-height="70"
                     height="300"
                     width="400"
                     :items="notifications"
                  >
                     <template v-slot:default="{ item }">
                        <v-list-item
                           :key="item.id"
                           @click="invalidNotification(item.route,item.id)"
                        >
                           <v-list-item-avatar>
                              <v-avatar color="blue-grey darken-3">
                                 <v-icon color="blue-grey lighten-5">{{ item.icon }} </v-icon>
                              </v-avatar>
                           </v-list-item-avatar>
                           <v-list-item-content>
                              <v-list-item-title class="Notific-title"  v-text="item.title"></v-list-item-title>
                              <v-list-item-subtitle class="Notific-desc" v-text="item.description"></v-list-item-subtitle>
                              <v-list-item-subtitle class="Notific-desc" v-text="item.created_at"></v-list-item-subtitle>
                           </v-list-item-content>

                        </v-list-item>
                     </template>
                  </v-virtual-scroll>
               </v-card>
            </div>
            <div v-else>
               <v-card
                  elevation="2"
                  max-width="344"
               >
                  <v-card-text>
                     <v-icon color="grey darken-1" left > mdi-bell-cancel-outline</v-icon> Sin Notificaciones
                  </v-card-text>
               </v-card>
            </div>
         </v-menu>


         <v-divider
            class="mx-4"
            vertical
            inset
            v-if="getUserApi != ''"
         ></v-divider>
         <v-menu
            bottom
            offset-y
            transition="slide-y-reverse-transition"
            v-if="getUserApi != ''"
         >
            <template v-slot:activator="{ on, attrs }">
               <v-btn  
                  icon
                  v-show="avatarImg"
                  v-bind="attrs"
                  v-on="on"
               >
                  <v-avatar>
                     <v-img :src="urlImgUsr" ></v-img> 
                  </v-avatar>
               </v-btn >
               <v-btn   
                  v-show="avatarLtr"
                  v-bind="attrs"
                  v-on="on"
                  class="mr-2" 
                  fab 
                  dark 
                  small
                  color="blue-grey darken-4"
                  :elevation="3"
               >
                     <span class="white--text headline" >{{ getInitials }}</span>
               </v-btn >
            </template>
               <v-list>
                  <v-list-item>
                     <v-list-item-content>
                        <v-list-item-title class="title">
                        {{ userInfo.userName }}
                        </v-list-item-title>
                        <v-list-item-subtitle>{{ userInfo.userEmail }}</v-list-item-subtitle>
                     </v-list-item-content>
                  </v-list-item>
                  <v-divider></v-divider>
                  <v-list-item @click="viewAccount()" >
                     <v-list-item-title>
                        <v-icon>mdi-account-box-outline</v-icon> 
                        Mi cuenta
                     </v-list-item-title>
                  </v-list-item>
                  <v-list-item @click.stop="dialog=true"  >
                     <v-list-item-title>
                        <v-icon
                           color="red darken-1"
                        >
                           mdi-power
                        </v-icon> Cerrar Sesión</v-list-item-title>
                  </v-list-item>
               </v-list>
         </v-menu>
         <v-btn
            text
            color="shades_four"
            @click="loginInit = !loginInit"
            v-else
         >
            <v-icon>mdi-login-variant</v-icon>
            Iniciar Sesión
         </v-btn>

      </v-toolbar>
      <!-- MODAL LOGIN -->

      <v-dialog
         v-model="loginInit"
         persistent
         transition="dialog-bottom-transition"
         max-width="400px"
      >
         <v-card
            class="LogiDialog"
         >
            <Loginform />
            <v-card-action class="py-4">
               <v-btn
                  @click="loginInit = !loginInit"
                  block
                  text
               >
                  cerrar
               </v-btn>
            </v-card-action>
         </v-card>
      </v-dialog>

      <!-- Navigation Menu -->
      <v-navigation-drawer
         v-model="drawer"
         absolute
         temporary
      >
         <v-list-item>
            <a  v-show="avatarImg">
               <v-list-item-avatar>
                  <v-img :src="urlImgUsr" ></v-img> 
               </v-list-item-avatar>
            </a>
            <a  v-show="avatarLtr">
               <v-list-item-avatar color="red darken-2">
                  <span class="white--text headline" >{{ getInitials }}</span>
               </v-list-item-avatar>
            </a>
            <v-list-item-content>
               <v-list-item-title>{{ userInfo.userName }}</v-list-item-title>
               <v-list-item-subtitle>Shades de México</v-list-item-subtitle>
            </v-list-item-content>
         </v-list-item>
         
         <v-list-item>
            
            <v-list-item-avatar >
               <img src="/images/logo_uni.png"> 
            </v-list-item-avatar>
            <v-list-item-content>
               <v-list-item-subtitle class="header-shades">
                  Shades de México
               </v-list-item-subtitle>
            </v-list-item-content>
         </v-list-item>

         <v-divider></v-divider>

         <v-list 
            v-for="accModule in accessModules"
            :key="accModule.module" 
            dense
         >

            <v-list-item 
               v-if="accModule.if_submodulo == 0"
               @click="loadClickMenu(1)"
               :to="accModule.route"
            >
               <v-list-item-icon>
                  <v-icon>{{ accModule.icon }}</v-icon>
               </v-list-item-icon>

               <v-list-item-title>{{ accModule.module }}</v-list-item-title>
            </v-list-item>

            <v-list-group
               v-else
               :to="accModule.route"
               :key="accModule.module_id"
               :prepend-icon="accModule.icon"
               link
            >

            <template v-slot:activator>
               <v-list-item-content>
                  <v-list-item-title v-text="accModule.module"></v-list-item-title>
               </v-list-item-content>
            </template>


            <v-list-item
               v-for="accSubmodule in accModule.access_submoduls"
               :key="accSubmodule.submodule_id"
               :to="accSubmodule.route"
               @click="loadClickMenu(1)"
                  class="pl-8"
            >
               <v-list-item-icon>
                  <v-icon class="md-18">{{ accSubmodule.icon }}</v-icon>
               </v-list-item-icon>
               <v-list-item-title>
                  {{ accSubmodule.submodule }}
               </v-list-item-title>
            </v-list-item>



            </v-list-group>
         </v-list>

            <v-divider class="margin: 10px 0px"></v-divider>

         <v-list dense>
            <v-list-item  @click.stop="dialog=true">
               <v-list-item-icon>
                  <v-icon color="red">mdi-power</v-icon>
               </v-list-item-icon>
               <v-list-item-content>
                  <v-list-item-title>Cerrar Sesión</v-list-item-title>
               </v-list-item-content>
            </v-list-item>
         </v-list>

      </v-navigation-drawer>

      <!-- Modal LOGOUT -->

       <v-row justify="center">
         <v-dialog
            v-model="dialog"
            persistent 
            max-width="290"
         >
            <v-card>
            <v-card-title class="headline">
               <v-icon  
                  x-large 
                  color="yellow darken-2"
               >
                  mdi-sync-alert
               </v-icon>
                &nbsp;&nbsp; Cerrar Sesión 
            </v-card-title>

            <v-card-text>
               <b class="font-weight-black" >Al cerrar la sesión se perderá cualquier cambio realizado con anterioridad. ¿ Deseas continuar… ?</b>
            </v-card-text>
            <v-card-actions>
               <v-spacer></v-spacer>
               <v-btn
                  color="green darken-1"
                  text
                  @click="dialog = false"
               >
                  Cancelar
               </v-btn>

               <v-btn
                  color="green darken-1"
                  text
                  @click="logout"
               >
                  Aceptar
               </v-btn>
            </v-card-actions>
            </v-card>
         </v-dialog>
      </v-row>
   </div>
</template>

<script>

   import { mapActions, mapState, mapGetters } from 'vuex'
   import store from '../store/store'
   import socketClientOn from '../shared/socketOn'
   import socketClientEmit from '../shared/socketEmit'
   import { storage } from '../utils/firebase'
   import Loginform from '../components/LoginFormComponent.vue'

   export default {
      data () {
         return {
            drawer: null,
            accessModules: [],
            userInfo: {
               userName: '',
               userImg: '',
               userIniciales: '',
               userEmail: ''
            },
            titlePage: this.$router.name,
            bottomNav: 'recent',
            dialog: false,
            avatarImg: false,
            avatarLtr: false,
            urlImgUsr: '',
            loginInit:false,
         }
      },
      components: {
         Loginform
      },
      methods: {
         async logout() {
            var payload = {
               token: this.getUserApi.token,
               user_id: this.getUserApi.uid
            }
            await this.$store.dispatch({ type:'socketIO/socket_logout',payload}); // desconectamos el socket
            const res = await this.$store.dispatch({ type:'auth/logout',payload});
            if(res){
               this.$router.go('/')
            }
         },
         getAvatarUrl() {
            if(this.getUserApi.user_img != '') {
               this.avatarImg = true
               this.avatarLtr = false
               var imgNewsCrsFB = storage.ref('/usr/'+this.getUserApi.user_img)
               imgNewsCrsFB.getDownloadURL().then((url) => { this.urlImgUsr = url })
            } else {
               this.avatarLtr = true
               this.avatarImg = false
            }
         },
         loadFinish() {
            this.accessModules = store.getters['auth/getAccessModule']
            this.userInfo.userName = this.getUserApi.short_name
            this.userInfo.userEmail = this.getUserApi.email 
         },
         async invalidNotification(route,id,user_id) {
            var payload = {
               token: this.getUserApi.token,
               user_id: this.getUserApi.uid,
               id: id,
            }
            await this.$store.dispatch({ type:'notifications/InvalidNotification', payload }); // buscamos las notificaciones
            this.$router.push(route)
         },
         loadClickMenu(opt) {
            switch (opt) {
               case 1:
                  this.drawer = false 
                  this.$store.dispatch('modals/loaderfull', true)
               break;
               case 2:
                  this.drawer = true 
                  this.$store.dispatch('modals/loaderfull', false)
               break;
            }
         },
         isSubMenu(opt) {
            switch (opt) {
               case 0:
                  return false
               break;
               case 1:
                  return true
               break;
            }
         },
         openNewCotModal() {
            var payload = {
               name_modal:  'newCotizacion', // modal
               state_modal: true
            }
            this.$store.dispatch('modals/IdentifyModal',payload);
         },
         async loadIndividualNotifications() {
            var payload = {
               token: this.getUserApi.token,
               user_id: this.getUserApi.uid
            }
            // await this.$store.dispatch('notifications/DataRowsNotifications',payload);
            await socketClientEmit.dataNotificationEmit(payload)
         },
         viewAccount() {
            this.$store.dispatch('modals/loaderfull',true); // activamos el overlay cargando
            this.$router.push('/cuenta')
         },
      },
      computed: {
         ...mapGetters({
            getUserApi: 'auth/getUserApi',
            getAccessModule: 'auth/getAccessModule',
            notifications: 'notifications/getNotifications',
            NumberNotifications: 'notifications/getNumberNotifications',
         }),
         getInitials() {
            if(this.userInfo.userName) {
               var array = this.userInfo.userName.split(' ');
               switch (array.length) {
                  case 1:
                  return array[0].charAt(0).toUpperCase();
                  break;
                  default:
                  return array[0].charAt(0).toUpperCase() + array[ array.length -1 ].charAt(0).toUpperCase();
               }
            }
            return false;
         },
      },
      created() {
         socketClientOn.dataLoginOn()
         socketClientOn.dataNewsOn()
         socketClientOn.dataNotificationOn()
         socketClientOn.dataCotizacionesOn()
         socketClientOn.dataInvoicesOn()
         socketClientOn.dataCotizacionOn()

         this.loadFinish()
         this.loadIndividualNotifications()
         this.getAvatarUrl()
      },

   }
</script>

<style scoped>

   .version-font {
      font-size: 9px;
   }

   .toolbar-shades {
      margin-bottom: 15px;
      z-index: 2;
   }

   .Notific-title {
      font-size: 14px;
   }

   .Notific-desc {
      font-size: 12px;
   }

   .header-shades {
      font-size: 12px;
   }

   .LogiDialog {
      width: 400px;
   }

   @media (max-width: 640px) {


      .LogiDialog {
         width: 100%;
      }
   }

</style>