<template >
   <div>
      <v-card
         class="mx-auto rounded-0 border-0  cotizacion-shades"
         max-width="99%"
         :elevation="0"
      >
         <v-progress-linear
            :active="loading"
            :indeterminate="loading"
            absolute
            top
            color="red darken-4"
         ></v-progress-linear>
         <v-card-subtitle  class="pa-2 ma-0 ">
            <v-container class="pa-0 ma-0" fluid style="max-width: 100%;" >
               <v-row class="pa-0 ma-0" >
                  <v-col 
                     class="pa-0 pt-4 ma-0"
                     xs="12"
                     sm="12"
                     md="3"
                     lg="3"
                     xl="3"
                     style="font-size: 16px;"
                  >
                     <v-icon color="red darken-1"> mdi-clipboard-text-outline </v-icon> &nbsp;&nbsp;Pedido: <b class="font-weight-regular">{{ $route.params.no_ped }}</b>
                  </v-col>
                  <v-col 
                     class="pa-0 pt-4 ma-0"
                     xs="12"
                     sm="12"
                     md="3"
                     lg="3"
                     xl="3" 
                     style="font-size: 16px;"
                  > <!--  Agente  -->
                     <v-icon left> mdi-account-tie </v-icon> Agente: <b class="font-weight-regular"> {{ detOrder.nom_age }} </b>
                  </v-col>
                  <v-col 
                     class="pa-0 pt-4 ma-0" 
                     xs="12"
                     sm="12"
                     md="3"
                     lg="3"
                     xl="3"
                     style="font-size: 16px;"
                  > <!--  Cliente  -->
                     <v-icon left> mdi-briefcase-account-outline </v-icon> Cliente: <b class="font-weight-regular"> {{ detOrder.nom_cte }} </b>
                  </v-col>
               </v-row>
               <v-row class="pa-0 ma-0" >
                  <v-col 
                     class="pa-0 pt-4 ma-0" 
                     xs="12"
                     sm="12"
                     md="3"
                     lg="3"
                     xl="3"
                     style="font-size: 16px;"
                  > 
                     <v-icon left>mdi-chart-timeline-variant</v-icon>Estatus: &nbsp;
                     <v-chip
                           close-icon="mdi-close-outline"
                           :color = "detOrder.color"
                           outlined
                     >
                           {{ detOrder.status }}
                     </v-chip>
                  </v-col>
                  <v-col
                     class="pa-0 pt-4 ma-0" 
                     xs="12"
                     sm="12"
                     md="6"
                     lg="6"
                     xl="6"
                     style="font-size: 16px;"
                  > 
                     <v-icon left>mdi-lock-open-outline</v-icon>Liberado: 
                     <v-icon v-if="detOrder.free == 1"
                        left
                        :color="detOrder.colorF"  
                     >
                        mdi-checkbox-marked-circle-outline 
                     </v-icon>
                     <v-chip v-else-if="detOrder.free == 2"
                           :color="detOrder.colorF"  
                           outlined
                     >
                           {{ detOrder.statusF }}
                     </v-chip>
                  </v-col> 
                  <v-col
                     xs="12"
                     sm="12"
                     md="1"
                     lg="1"
                     xl="1" 
                  >
                     <v-btn 
                        small 
                        depressed 
                        :elevation="2"
                        @click="viewAllOrders()"
                        block
                     >
                        <v-icon
                           left
                           dark
                           color="blue-grey darken-4"
                        >
                           mdi-arrow-left-bold-circle-outline
                        </v-icon>
                        Atrás
                     </v-btn>
                  </v-col>
                  <v-col
                      xs="12"
                     sm="12"
                     md="1"
                     lg="1"
                     xl="1" 
                  >
                     <v-btn 
                        small 
                        block 
                        depressed 
                        :elevation="2" 
                        @click="deleteCotA($route.params.cotizacion_id)"
                     >
                        <!-- :disabled='disCot' -->
                        <v-icon
                           left
                           dark
                           color="red darken-4"
                        >
                           mdi-close-circle-outline
                        </v-icon>
                        CANCELAR
                     </v-btn>
                  </v-col>
               </v-row>
            </v-container>
         </v-card-subtitle>
         <v-divider class="mt-1 mb-1"></v-divider>
      </v-card>
      <v-card
         class="mx-auto rounded-0 border-0 "
         max-width="99%"
         :elevation="0"
      >
         <v-card-subtitle  class="pa-2 ma-0 ">
            <v-container class="pa-0 ma-0" fluid style="max-width: 100%;" >
               <v-row class="pa-0 ma-0" >
                  <v-col
                     xs="12"
                     sm="12"
                     md="3"
                     lg="3"
                     xl="3" 
                  >
                     <div style="display:flex;" class="totE_order">Subtotal: <div class="tot_order">&nbsp;$ {{ sub.toLocaleString('en-US') }}</div> </div>
                  </v-col>
                  <v-col
                     xs="12"
                     sm="12"
                     md="3"
                     lg="3"
                     xl="3" 
                  >
                     <div style="display:flex;" class="totE_order">Iva: <div class="tot_order">&nbsp;$ {{ iva.toLocaleString('en-US') }} </div> </div>
                  </v-col>
                  <v-col
                     xs="12"
                     sm="12"
                     md="3"
                     lg="3"
                     xl="3" 
                  >
                     <div style="display:flex;" class="totE_order">Total: <div class="tot_order">&nbsp;$ {{ total.toLocaleString('en-US') }} </div> </div>
                  </v-col>
                  <v-col
                      xs="12"
                     sm="12"
                     md="1"
                     lg="1"
                     xl="1" 
                  >
                     <v-btn 
                        small 
                        block 
                        depressed 
                        :elevation="2" 
                        @click="freeModal($route.params.no_ped)"
                     >
                        <!-- :disabled='disCot' -->
                        <v-icon
                           left
                           dark
                           color="#008000"
                        >
                           mdi-lock-open-outline
                        </v-icon>
                        Liberar
                     </v-btn>
                  </v-col>
               </v-row>
            </v-container>
         </v-card-subtitle>
      </v-card>
      <v-card
         class="mx-auto rounded-0 border-0 cot-card-info "
         max-width="99%"
         elevation="0"
      >
         <!-- partidas de cotizacion -->
         <div>
            <v-data-table
               :headers="headers"
               :items="datadord"
               :page.sync="page"
               :items-per-page="itemsPerPage"
               hide-default-footer
               class="elevation-0 overflow-y-auto"
               @page-count="pageCount = $event"
               :loading="loadingTable"
               loading-text="Cargando Articulos ..."
               sort-by="part"
            >
               <!-- scroll.sync="scrollSync" -->
               <v-progress-linear 
                  v-show="loadingTable" 
                  slot="progress" 
                  color="red darken-4" 
                  indeterminate>
               </v-progress-linear>
               <template #[`item.category`]="{ item }">
                     <v-chip
                        class="ma-2"
                        :color="item.color"
                        text-color="blue-grey darken-4"
                        label
                        style="width: 100%;"
                     >
                        <v-icon left>
                           {{ item.icon }}
                        </v-icon>
                        {{ item.category }}
                     </v-chip>
               </template>
               <template #[`item.price`]="{ item }">
                  <div style="display:flex;">$ {{ formatPrice(item.price) }} </div>
               </template>
               <template #[`item.subtot`]="{ item }">
                  <div style="display:flex;"><div class="total-cotizacion">$ {{ formatPrice(item.subtot) }} </div></div>
               </template>
               <template #[`item.status`]="{ item }">
                  <v-icon 
                     left
                     color="#008000"  
                      v-if="item.status"
                  >
                     mdi-archive-arrow-up-outline
                  </v-icon>
               </template>
               <template #[`item.free`]="{ item }">
                  <v-icon v-if="item.free"
                     left
                     color="#008000"  
                  >
                     mdi-checkbox-marked-circle-outline 
                  </v-icon>
               </template>
            </v-data-table>
            <div class="text-center pt-2">
               <v-pagination
                  v-model="page"
                  :length="pageCount"
                  :total-visible="7"
                  circle 
                  color="blue-grey darken-3" 
               ></v-pagination>
            </div>
         </div>
      </v-card>
   </div>
</template>
<script>

   import Vue from 'vue'
   import { validationMixin } from 'vuelidate'
   import { required, requiredIf, maxLength, minLength, email, maxValue, minValue } from 'vuelidate/lib/validators'
   import SAQuestions from '../../services/SweetAlertQuestion'
   import SAToasts from '../../services/SweetAlertToast'
   import { mapActions, mapState, mapGetters } from 'vuex'
   import store from '../../store/store'
   import socketClientEmit from '../../shared/socketEmit'
   
   export default {
      data () {
         return {
            no_ped: Number.parseInt(this.$route.params.no_ped),
            status: '',
            // colorStat: '',
            loading: false,
            loadingTable: true,
            isPartner: false,
            free: 0,
            color: '',
            status: '',

            // totales order
            sub: 0,
            iva: 0,
            total: 0,

            // data Table
            page: 1,
            pageCount: 0,
            itemsPerPage: 10,
            headers: [
               {
                  text: '#',
                  align: 'start',
                  value: 'part',
               },
               { text: 'Clave Sai', width:'10%', value: 'cve_sai' },
               { text: 'Articulo', width:'30%', value: 'name_prod' },
               { text: 'Grupo', value: 'category' },
               { text: 'Cantidad', value: 'qty' },
               { text: 'Unidad', value: 'unidad' },
               { text: 'Precio', width:'10%', value: 'price' },
               { text: 'Subtotal', width:'10%', value: 'subtot' },
               { text: 'Saldo', value: 'total_ord' },
               { text: 'Surtida', value: 'status' },
               { text: 'Liberada', value: 'free' },
            ],
         }
      },
      mixins: [validationMixin],
      validations: {
      },
      computed: {
         ...mapGetters({ 
            datadord: 'dord/getDataOrder',
            getUserApi: 'auth/getUserApi',
            detOrder: 'dord/getDetOrder',
         }),        
      },
      methods: {
         ...mapActions(['login']),

         onScroll (e) {
            this.scrollSync.top = e.target.scrollTop
            this.scrollSync.left = e.target.scrollLeft
         },
         //transición al panel de artículos
         scrollInto(elementId) {
            const section = document.querySelector(`#${elementId}`);
            section.scrollIntoView({
            behavior: 'smooth'
            });
         },

         async getOrder() { // obtenemos las partidas del pedido
            var payload = {
               token: this.getUserApi.token,
               no_ped: this.no_ped,
               user_id: this.getUserApi.uid,
            }
            const res = await this.$store.dispatch('dord/getPartOrder',payload);
            if(res.success) {
               var arrPartOrd = res.dataOrdPart[0]
               this.sub = arrPartOrd.sub
               this.iva = arrPartOrd.iva
               this.total = arrPartOrd.total
               this.loadingTable = false
            }
         },

         formatPrice(value) {
            let val = (value/1).toFixed(2)
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
         },

         async freeModal(noPed){
            var payload = {
               token: this.getUserApi.token,
               name_modal:  'orderFree', // modal 
               state_modal: true,
               noPed: noPed,
               cveCte: this.detOrder.cve_cte,
               grid: this.datadord
            }
            const res = await this.$store.dispatch('dord/getCate',payload);
            if(res.success){
               if(res.flg == 1){
                  Swal.fire({
                     icon: 'error',
                     title: 'Ups...',
                     text: 'Cliente no dado de alta en la web.',
                  })
               } else{
                  await this.$store.dispatch('modals/IdentifyModal',payload);
               }
            } 
         },
         
         disabledInputs() {
            this.$store.commit('dcot/SET_VALUE_ARTICLES',true)
            this.$store.commit('dcot/SET_VALUE_UNITS',true)
            this.$store.commit('dcot/SET_VALUE_CANT',true)
            this.$store.commit('dcot/SET_VALUE_DESC',true)
            this.$store.commit('dcot/SET_VALUE_PRICE',true)
            this.$store.commit('dcot/SET_VALUE_BTNSAVE',true)
         },

         async deleteCotA(idCot){
            var icon_alrt = 'warning'
            var title_alrt = 'CANCELAR'
            var text_alrt = 'Se cancelara la cotización ' + idCot + '. ¿Estas seguro?'
            var confirmBtn = 'Cancelar'
            var cancelBtn = '<template><b-icon icon="arrow-up"></b-icon></template> Cerrar'

            const alert_obj = new SAQuestions(icon_alrt,title_alrt,text_alrt,confirmBtn,cancelBtn)
            var resAlert = await alert_obj.getQuestionRoute()
            if(resAlert){
               this.deleteCot(idCot)
            }
         },

         viewAllOrders() {
            store.dispatch('modals/loaderfull',true)
            this.$router.push('/pedidos')
         },

         async proccessOrder() {
             var payload = {  
               token: this.getUserApi.token,
            }
            const data = await socketClientEmit.proccessOrderEmit(payload);
         }
      },
      mounted(){
         this.getOrder();
         setTimeout(() => { this.$store.dispatch('modals/loaderfull',false) }, 2000); // desactivamos el overlay cargando
      },
   }

</script>


<style scoped>

   .center-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 80px 80px;
   }

   .cot-res-menu {
      font-size:12px;
      font-weight:500;
      padding-left: 20px;
   }

  .cotizacion-shades {
     margin-top: 15px;
  }

  .cot-card-info {
     margin-top: 8px;
  }

  .cot-text-info {
     padding:2px
  }

   .pruba {
     color:#307E85;
     font-size:15px
  }
  .totE_order {
      font-size: 15px;
      font-weight: 400;
      padding-top: 3px;
      color: green;
   }
   .info_price_cot {
     color:#307E85;
     font-size:15px
  }

  .tot_order {
      color: #2C4244;
      font-size: 18px;
      /* padding-right: 20px;
      padding-left: 5px; */
  }

  .cotizacion-action-buttom {
     padding: 0%;
  }

  .cotizacion-msj-header {
     display: flex;
  }

   .scroller-at-bottom .thumb-list {
      display: none !important;
   }
   .total-cotizacion {
        font-size: 15px;
        font-weight: 400;
        padding-top: 3px;
        color: green;
    }

</style>
