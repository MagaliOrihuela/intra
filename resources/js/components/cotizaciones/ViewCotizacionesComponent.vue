<template>
   <div>
         <v-card
            class="mx-auto rounded-0 border-0 cotizaciones-shades"
            max-width="99%"
            elevation="0"
            transition="scale-transition"
         >

            <v-progress-linear
            :active="loading"
            :indeterminate="loading"
            absolute
            top
            color="red darken-4"
            ></v-progress-linear>


            <v-card-title
               class="headline mb-1"
            >
               <v-icon
                  color="red darken-1"
                  class="pr-2"
               > 
                  mdi-clipboard-outline
               </v-icon>Cotizaciones

            </v-card-title>

            <v-card-subtitle
               class="ma-0 pa-0 pr-14 pl-5"
            >
               Contenido de las cotizaciones realizadas, ordenadas por ID de cotización, en la cual tienes diferentes funcionalidades en el panel para su acceso rápido. En la sección de búsqueda, puedes localizar una cotización rápidamente poniendo solo una palabra o numero clave que defina dicha cotización.
            </v-card-subtitle>
            <v-container 
               fluid
               class="mr-2 pa-2 "
               style="max-width: 100%;"
            >
               <v-row class="ma-0">
                  <v-col 
                     lg="4"
                     md="4"
                     sm="12"
                     class="ma-0 pa-0"
                  >
                     <v-tabs
                        v-model="tab"
                        background-color="transparent"
                        color="basil"
                        grow
                     >
                        <v-tab>
                           <v-icon left>mdi-clipboard-file-outline</v-icon> Cotizaciones
                        </v-tab>
                        <v-tab>
                           <v-icon left>mdi-clipboard-remove-outline</v-icon> Cancelados
                        </v-tab>
                     </v-tabs>
                  </v-col>
                  <v-col 
                     lg="4"
                     md="4"
                     sm="12"
                     class="ma-0 pa-0"
                  >

                  </v-col>

                  <v-col 
                     lg="4"
                     md="4"
                     sm="12"
                     class="ma-0 pa-0"
                  >
                     <v-text-field
                        v-model="search"
                        dense
                        append-icon="mdi-magnify"
                        label="Buscar Cotización"
                        hide-details
                        outlined
                        class="ma-0 pa-0"
                     ></v-text-field>
                  </v-col>
               </v-row>

            </v-container>
            <!-- <a href="https://api.whatsapp.com/send?phone=523326717221&text=mensaje" target="_blank">whatsapp</a> -->
            <v-tooltip bottom>
               <template v-slot:activator="{ on, attrs }">
                  <v-btn
                     color="red darken-4"
                     dark
                     absolute
                     top
                     right
                     fab
                     style="top: 15px;"
                     v-bind="attrs"
                     v-on="on"
                     @click="openNewCotModal"
                     elevation="3"
                  >
                     <v-icon>mdi-plus</v-icon>
                  </v-btn>
               </template>
               <span>Nueva Cotización </span>
            </v-tooltip>

            <div v-if="skeletorTable">
               <v-skeleton-loader
                  class="mx-auto"
                  type="table-thead, table-tbody"
               ></v-skeleton-loader>
            </div>

            <div v-else>

               
               <v-tabs-items v-model="tab">
                  <v-tab-item>
                     <v-data-table
                        :v-model="dataCot"
                        :headers="headers"
                        :items="dataCot"
                        :page.sync="page"
                        :items-per-page="itemsPerPage"
                        sort-by="id" 
                        :sort-desc="true"
                        :search="search"
                        hide-default-footer
                        class="elevation-0 overflow-y-auto"
                        @page-count="pageCount = $event"
                        scroll.sync="scrollSync"
                     >
                        <template #[`item.id`]="{ item }">
                              <v-chip
                                 class="ma-2 ml-0"
                                 :color="getUserColor(item.agent_performed_id)"
                                 text-color="blue-grey darken-4"
                              >
                                 {{ item.id }}
                              </v-chip>
                        </template>
                        <template #[`item.total`]="{ item }" >
                           <div style="display:flex;"> <v-icon  color="green" size="18px"> mdi-currency-usd </v-icon> <div class="total-cotizacion">{{ item.total }} </div> </div>
                        </template>
                        <template #[`item.options`]="{ item }">
                           
                           <v-tooltip bottom>
                              <template v-slot:activator="{ on, attrs }">
                                 <v-btn 
                                    color="blue-grey darken-3" 
                                    :to=item.view
                                    @click="detailCotizacion(item.id)"
                                    fab 
                                    dark
                                    v-bind="attrs"
                                    v-on="on"
                                    :elevation="3"
                                    max-width="25px"
                                    max-height="25px"
                                 >
                                    <v-icon size="15px">mdi-clipboard-search-outline</v-icon>
                                 </v-btn>
                              </template>
                              <span>Revisar Cotización </span>
                           </v-tooltip>
                           <v-tooltip bottom>
                              <template v-slot:activator="{ on, attrs }">
                                 <v-btn 
                                    color="blue-grey darken-3" 
                                    :to=item.edit
                                    @click="viewCotizacion(item.id)"
                                    fab 
                                    dark
                                    v-bind="attrs"
                                    v-on="on"
                                    elevation="3"
                                    max-width="25px"
                                    max-height="25px"
                                 >
                                    <v-icon size="15px">mdi-clipboard-edit-outline</v-icon>
                                 </v-btn>
                              </template>
                              <span>Editar Cotización </span>
                           </v-tooltip>
                           <v-tooltip bottom>
                              <template v-slot:activator="{ on, attrs }">
                                 <v-btn 
                                    color="blue-grey darken-3"
                                    v-on:click="dialogcancel = true, cancel_id = item.id, status_id = item.status_id " 
                                    fab 
                                    dark 
                                    v-bind="attrs"
                                    v-on="on"
                                    elevation="3"
                                    max-width="25px"
                                    max-height="25px"
                                 >
                                    <v-icon size="15px">mdi-cancel</v-icon>
                                 </v-btn>
                              </template>
                              <span>Cancelar Cotización </span>
                           </v-tooltip>

                        </template>
                        
                     </v-data-table>

                     <div class="text-center pt-2">
                        <v-pagination 
                           v-model="page" 
                           :length="pageCount" 
                           total-visible="7"
                           circle 
                           color="blue-grey darken-3" 
                        ></v-pagination>
                     </div>
                  </v-tab-item>

               <!-- CANCELADOS -->

                  <v-tab-item>
                     <v-data-table
                        :v-model="dataCotCancel"
                        :headers="headers"
                        :items="dataCotCancel"
                        :page.sync="page"
                        :items-per-page="itemsPerPage"
                        sort-by="id" 
                        :sort-desc="true"
                        :search="search"
                        hide-default-footer
                        class="elevation-0 overflow-y-auto"
                        @page-count="pageCount = $event"
                        scroll.sync="scrollSync"
                     >
                        <template #[`item.id`]="{ item }">
                              <v-chip
                                 class="ma-2 ml-0"
                                 :color="getUserColor(item.agent_performed_id)"
                                 text-color="blue-grey darken-4"
                              >
                                 {{ item.id }}
                              </v-chip>
                        </template>
                        <template #[`item.total`]="{ item }" >
                           <div style="display:flex;"> <v-icon  color="green" size="18px"> mdi-currency-usd </v-icon> <div class="total-cotizacion">{{ item.total }} </div> </div>
                        </template>
                        <template #[`item.options`]="{ item }">
                           
                           <v-tooltip bottom  v-if="isPartner">
                              <template v-slot:activator="{ on, attrs }">
                                 <v-btn 
                                    color="blue-grey darken-3" 
                                    @click="recoverCotizacion(item.id,item.status_id)"
                                    fab 
                                    dark
                                    v-bind="attrs"
                                    v-on="on"
                                    elevation="3"
                                    max-width="25px"
                                    max-height="25px"
                                 >
                                    <v-icon size="15px">mdi-progress-download</v-icon>
                                 </v-btn>
                              </template>
                              <span>Recuperar cotizacion</span>
                           </v-tooltip>
                           <v-tooltip bottom>
                              <template v-slot:activator="{ on, attrs }">
                                 <v-btn 
                                    color="blue-grey darken-3" 
                                    @click="reviewCotizacion(item.id)"
                                    fab 
                                    dark
                                    v-bind="attrs"
                                    v-on="on"
                                    elevation="3"
                                    max-width="25px"
                                    max-height="25px"
                                 >
                                    <v-icon size="15px">mdi-comment-search-outline</v-icon>
                                 </v-btn>
                              </template>
                              <span>Revisar Comentario</span>
                           </v-tooltip>

                        </template>
                        
                     </v-data-table>

                     <div class="text-center pt-2">
                        <v-pagination 
                           v-model="page" 
                           :length="pageCount" 
                           total-visible="7"
                           circle 
                           color="blue-grey darken-3" 
                        ></v-pagination>
                     </div>
                  </v-tab-item>
               </v-tabs-items>

            </div>

         </v-card>

         <!-- Dialog Canceled  -->

         <v-dialog
            v-model="dialogcancel"
            max-width="290"
         >
            <v-card>
               <v-card-title class="text-h5">
                  <v-icon left color="red">mdi-cancel</v-icon> CANCELAR: {{ cancel_id }} 
               </v-card-title>
               <v-card-text>
                  ¿Deseas guardar un motivo de cancelación? (no indispensable)
               </v-card-text>
               <v-card-text class="pb-0">
                  
                  <v-textarea
                     v-model="commentCancel"
                     outlined
                     name="input-7-4"
                     label="Motivo de cancelación"
                     value=" "
                  ></v-textarea>
               </v-card-text>
               <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn
                     depressed
                     color="blue-grey darken-4"
                     dark
                     dense
                     @click="dialogcancel = false"
                  >
                     Cerrar
                  </v-btn>

                  <v-btn
                     depressed
                     color="blue-grey darken-4"
                     dark
                     dense
                     @click="canceledCot(cancel_id,status_id)"
                  >
                     Aceptar
                  </v-btn>
               </v-card-actions>
            </v-card>
         </v-dialog>
   </div>
</template>
<script>

import SAQuestions from '../../services/SweetAlertQuestion'
import SAToasts from '../../services/SweetAlertToast'
import { mapActions, mapGetters } from 'vuex'
import socketClientEmit from '../../shared/socketEmit'
import randomColor from 'randomcolor';

  export default {
      data () {
         return { 
            tab: null,
            isPartner:false,
            search: '',
            page: 1,
            pageCount: 0,
            itemsPerPage: 10,
            loading: false,

            scrollSync : {
               top: 0,
               left: 0
            },
            headers: [
               {
                  text: 'ID',
                  align: 'start',
                  value: 'id',
               },
               { text: 'Cliente', value: 'client_id' },
               { text: 'Nombre Cliente', value: 'short_name' },
               { text: 'Factura', value: 'factura_id' },
               { text: 'Referencia', value: 'reference' },
               { text: 'Agente', value: 'name_agent' },
               { text: 'Creación', value: 'created_at' },
               { text: 'Total', value: 'total' },
               { text: 'Status', value: 'status_name' },
               { 
                  text: 'Acciones', 
                  sortable: false,
                  value: 'options',
               },
            ],
            skeletorTable: true,

            dialogcancel:false,
            commentCancel: '',
            cancel_id: 0,
            status_id: 0,
         }
      },
      computed: {
         ...mapGetters({ 
               getUserApi: 'auth/getUserApi', 
               newCotModal:'modals/getShowNewCotModal',
               dataCot:'ecot/getDataCotizacion',
               dataCotCancel:'ecot/getDataCotizacionCancel'
            }),
      },
      methods: {
         ...mapActions(['login']),
         onScroll (e) {
            this.scrollSync.top = e.target.scrollTop
            this.scrollSync.left = e.target.scrollLeft
         },
         async GetCotizaciones() { // obtenemos las cotizaciones

            if(Number.parseInt(this.getUserApi.ip) == 1) {
               this.isPartner = true
            }

            var payload = {
               token: this.getUserApi.token,
               partner: this.getUserApi.ip,
               client_id: this.getUserApi.cid
            }
            
            // await socketClientEmit.dataCotizacionesEmit(payload)
            await this.$store.dispatch('ecot/getCotizaciones',payload);
            await this.$store.dispatch('ecot/getCotizacionesCanceled',payload);
            this.skeletorTable = false

         },
         
         async canceledCot(cotID,statusID) {

            this.dialogcancel = false
            this.$store.dispatch('modals/loaderfull',true); // overlay cargando

            var payload = {
               token: this.getUserApi.token,
               user_id: this.getUserApi.uid,
               process: 'Cancelación de cotización', // dato para bitacora de procesos
               status_id: statusID,
               comment_cancel: this.commentCancel,
               cotizacion_id: cotID
            }

            
            this.commentCancel = '';
            
            const data = await socketClientEmit.canceledCotizacionesEmit(payload)

            if(data.success) {

               await this.$store.dispatch('modals/loaderfull',false); // overlay cargando

               var iconToast = 'success'
               var msjToast = 'Cancelada con éxito'
               var positionToast = 'top-end'
               var timerToast = 4000
               const SAToastsVar = new SAToasts(iconToast,msjToast,positionToast,timerToast)
               await SAToastsVar.getToast()

            }
         },

         viewCotizacion(id) {
            this.loading=true
            this.$store.dispatch('modals/loaderfull',true); // activamos el overlay cargando
            this.$router.push(`/cotizaciones/${id}`)
         },

         async detailCotizacion(id) {


            this.$store.dispatch('modals/loaderfull',true); // activamos el overlay cargando

            // obtenemos las partidas de la cotizacion 
            var payload = {
               token: this.getUserApi.token,
               cotizacion_id: id,
            }
            await this.$store.dispatch('ecot/ItemPartsCotizacion',payload);

            
            var payload = {
               token: this.getUserApi.token,
               id: id,
            }
            await this.$store.dispatch('ecot/DetailsCotizacion',payload);

            
            await this.$store.dispatch('modals/loaderfull',false); // desactivamos el overlay cargando

            var payload = {
               name_modal:  'detailCotizacion', // modal 
               state_modal: true,
               id: id
            }
            await this.$store.dispatch('modals/IdentifyModal',payload);
            
         },

         async openNewCotModal() {
            var payload = {
               name_modal:  'newCotizacion', // modal 
               state_modal: true
            }
            await this.$store.dispatch('modals/IdentifyModal',payload);
         },
         async recoverCotizacion(id,StatusID) {

            var icon_alrt = 'warning'
            var title_alrt = 'REACTIVAR'
            var text_alrt = '¿Estas seguro de reactivar esta cotización?'
            var confirmBtn = 'REACTIVAR'
            var cancelBtn = '<template><b-icon icon="arrow-up"></b-icon></template> CANCELAR'

            const alert_obj = new SAQuestions(icon_alrt,title_alrt,text_alrt,confirmBtn,cancelBtn)
            var resAlert = await alert_obj.getQuestionRoute()
            if(resAlert){

               await this.$store.dispatch('modals/loaderfull',true); // overlay cargando

               var payload = {
                  token: this.getUserApi.token,
                  id: id,
                  status_id: StatusID,
                  user_id: this.getUserApi.uid,
                  process: 'Reactivación de cotización', // dato para bitacora de procesos

               }



               await socketClientEmit.recoverCotizacionesEmit(payload)

               var iconToast = 'success'
               var msjToast = 'Reactivada con éxito'
               var positionToast = 'top-end'
               var timerToast = 4000
               const SAToastsVar = new SAToasts(iconToast,msjToast,positionToast,timerToast)
               SAToastsVar.getToast()

               
               await this.$store.dispatch('modals/loaderfull',false); // overlay cargando

            }

         },
         getUserColor(agent_performed_id) {
            
            if (Number.parseInt(this.getUserApi.ip)  === 1 ) {
               if(Number.parseInt(agent_performed_id) === 1000 ) {
                  return  '#DAFDC2'
               } else {
                  return  '#FDCCC2'
               }
            } else {

                  return '#F7F7F7';
            }
         },
      },
      mounted(){
         this.GetCotizaciones()
         this.$store.dispatch('modals/loaderfull',false); // desactivamos el overlay cargando

      },
      catch: {

      }
  }
</script>

<style scoped>


   .cotizaciones-shades {
      margin-top: 15px;
   }

   .total-cotizacion {
      font-size: 15px;
      font-weight: 400;
      padding-top: 3px;
      color: green;
   }

</style>