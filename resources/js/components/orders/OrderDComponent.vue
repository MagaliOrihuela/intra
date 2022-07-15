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
                     <v-icon color="red darken-1"> mdi-clipboard-text-outline </v-icon> &nbsp;&nbsp;Pedido: <b class="font-weight-regular">{{ $route.params.order_id }}</b>
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
                     <v-icon left> mdi-account-tie </v-icon> Agente: <b class="font-weight-regular"> {{ nameAgent }} </b>
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
                     <v-icon left> mdi-briefcase-account-outline </v-icon> Cliente: <b class="font-weight-regular"> {{ nameClient }} </b>
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
                     <!-- <v-icon left> mdi-briefcase-account-outline </v-icon> Estatus: <b class="font-weight-regular"> {{ status }} </b> -->
                     <v-icon left> mdi-briefcase-account-outline </v-icon> Estatus: &nbsp;
                        <v-chip
                            close-icon="mdi-close-outline"
                            :color = "colorStat"
                            outlined
                        >
                            {{ status }}
                        </v-chip>
                  </v-col>
               </v-row>
               <!-- <v-row class="pa-0 ma-0" >
                  <v-col
                     xs="12"
                     sm="12"
                     md="9"
                     lg="9"
                     xl="9"  -->
                  <!-- > -->
                     <!-- poner informacion de algo -->
                  <!-- </v-col>
                  
               </v-row> -->
            </v-container>
         </v-card-subtitle>
         <v-divider class="mt-1 mb-1"></v-divider>
      </v-card>
      <!-- Panel de datos Cotizacion -->
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
                     <div style="display:flex;" class="totE_order">Subtotal: <div class="tot_order">&nbsp;$ 9999999 </div> </div>
                  </v-col>
                  <v-col
                     xs="12"
                     sm="12"
                     md="3"
                     lg="3"
                     xl="3" 
                  >
                     <div style="display:flex;" class="totE_order">Iva: <div class="tot_order">&nbsp;$ 55555 </div> </div>
                  </v-col>
                  <v-col
                     xs="12"
                     sm="12"
                     md="3"
                     lg="3"
                     xl="3" 
                  >
                     <div style="display:flex;" class="totE_order">Total: <div class="tot_order">&nbsp;$ 00000000 </div> </div>
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
               sort-by="fol_prod"
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
                     style="width: 62%;"
                  >
                     <v-icon left>
                        {{ item.icon }}
                     </v-icon>
                     {{ item.category }}
                  </v-chip>
            </template>
            <template #[`item.options`]="{ item }" class="cotizacion-action-buttom"  >
                  <v-tooltip bottom>
                     <template v-slot:activator="{ on, attrs }" v-if="item.category != 'Servicios'">
                        <v-btn 
                           color="blue-grey darken-3" 
                           @click="updatePCot(item.id)"
                           fab 
                           dark
                           v-bind="attrs"
                           v-on="on"
                           :elevation="3"
                           max-width="25px"
                           max-height="25px"
                           :disabled='disCot'
                        >
                           <v-icon size="15px">mdi-square-edit-outline</v-icon>
                        </v-btn>
                     </template>
                     <span>Editar Partida </span>
                  </v-tooltip>
                  <v-tooltip bottom>
                     <template v-slot:activator="{ on, attrs }" v-if="item.category != 'Servicios'">
                        <v-btn 
                           color="blue-grey darken-3"
                           v-on:click="deletedPCot(item.id,item.entry_id)" 
                           fab 
                           dark 
                           v-bind="attrs"
                           v-on="on"
                           :elevation="3"
                           max-width="25px"
                           max-height="25px"
                           :disabled='disCot'
                        >
                           <v-icon size="15px">mdi-trash-can-outline</v-icon>
                        </v-btn>
                     </template>
                     <span>Eliminar Partida </span>
                  </v-tooltip>
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
   import ProductZoomer from 'vue-product-zoomer'
   import { mapActions, mapState, mapGetters } from 'vuex'
   import store from '../../store/store'
   import socketClientEmit from '../../shared/socketEmit'
   
   Vue.use(ProductZoomer)
   export default {
      data () {
         return {
            order_id: Number.parseInt(this.$route.params.order_id),
            nameAgent: '',
            nameClient: '',
            status: '',
            colorStat: '',
            loading: false,
            loadingTable: true,
            isPartner: false,

            idCategory: 0,
            idProduct: 0,
            idModel: 0,

            // totales cotizacion
            subtotalQuote: 0,
            discountQuote: 0,
            quoteAmount: 0,

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
               { text: 'Clave Sai', value: 'cve_sai' },
               { text: 'Articulo', value: 'name_prod' },
               { text: 'Grupo', value: 'class' },
               { text: 'Cantidad', value: 'qty' },
               { text: 'Unidad', value: 'unidad' },
               { text: 'Precio', value: 'price' },
               { text: 'Subtotal', value: 'price' },
               { text: 'Saldo', value: 'total_ord' },
               { text: 'Estatus', value: 'status' },
            ],
            // itemparts: [],

            // imagenes 

            images: {
               thumbs: [
                  {
                     id: 1,
                     url: '/images/sin-imagen_mini.png'
                  },
               ],
               normal_size: [
                  {
                     id: 1,
                     url: '/images/sin-imagen_mini_web.png'
                  },
               ],
               large_size: [
                  {
                     id: 1,
                     url: '/images/sin-imagen.png'
                  }, 
               ]
            },

            // Elements

            labelPrice: 'Precio',
            labelCant: 'Cantidad',
            hintCant: '',

            // results
            result_data: [ ],                     // lista del resultado obtenido por las opciones elejidas en el panel para busqueda de articulo
            dataUnit: [ ],
            dataArticleRes: [],
            dataPrice: 0.0,
            dataPrice1: 0.0,
            dataPrice2: 0.0,
            dataPaking1: 0,
            dataPaking2: 0,
            dataDesc: '',
            units: [],

            // colors
            color1: 'green',
            color2: '',
            color3: '',
            categoInfo: '',
            productInfo: '',
            modelInfo: '',

            // Boolean require
            RArticles: true,
            RUnit: true,
            RQuantity: true,

            result: 0,
            updCot: 0,
            msgStatus: '',
            msgColor:'',
            submit:'',
            dbtnCancel: false,
            noEditPart: '',
            colorMsg: '',
            iconMsg: '',
            cantid: 0,
            flagVal: true

         }
      },
      mixins: [validationMixin],
      validations: {
      },
      computed: {
         ...mapGetters({ 
            datadord: 'dord/getDataOrder',
            getUserApi: 'auth/getUserApi',
            
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
            console.log('a')
            var payload = {
               token: this.getUserApi.token,
               order_id: this.order_id,
               user_id: this.getUserApi.uid,
            }
            const res = await this.$store.dispatch('dord/getPartOrder',payload);
            if(res.success) {
               var arrPartOrd = res.dataOrdPart[0]
               var prodCte = arrPartOrd.prodCte
               var agent = arrPartOrd.agent
            //    var days = res.days
            //    this.CDesc1 = res.cDesc1
            //    this.CDesc2 = res.cDesc2
               this.nameAgent = agent.nom_age
               this.nameClient = prodCte.nom_cte
               this.status = prodCte.status
               switch(this.status.trim()){
                  case 'Parcial':
                     this.colorStat = '#EAA20A';
                     break;
                  case 'Por Surtir':
                     this.colorStat = '#007DD6';
                     break;
                  case 'Surtido':
                     this.colorStat = '#008000';
                     break;
                  case 'Cancelado':
                     this.colorStat = '#D70000';
                     break;
                  default:
               }
               // this.itemparts = res.gridpCot
               // this.import_cot = res.sumSubt
               // this.desc_cot = res.sumDesc
               // this.tot_iva_cot = res.totIva
            //    this.submit = 'GUARDAR REGISTRO'

            //    if(Number.parseInt(days) >= 3){
            //       this.$store.commit('dcot/SET_VALUE_DISCOT',true)
            //       this.$store.commit('dcot/SET_VALUE_PANELCPM',true)
            //       this.iconMsg = 'mdi-alert-outline' 
            //       this.colorMsg = '#F9D73B'    
            //       this.msgStatus = 'NOTA: La cotización ya no se encuentra vigente (Límite 3 días).'
            //    } 
               this.loadingTable = false

            }
         },
         
         enabledInputs() {
            this.$store.commit('dcot/SET_VALUE_ARTICLES',false)
            this.$store.commit('dcot/SET_VALUE_CANT',false)
            this.$store.commit('dcot/SET_VALUE_DESC',false)
            this.$store.commit('dcot/SET_VALUE_PRICE',false)
            this.$store.commit('dcot/SET_VALUE_BTNSAVE',false)
         },

         disabledInputs() {
            this.$store.commit('dcot/SET_VALUE_ARTICLES',true)
            this.$store.commit('dcot/SET_VALUE_UNITS',true)
            this.$store.commit('dcot/SET_VALUE_CANT',true)
            this.$store.commit('dcot/SET_VALUE_DESC',true)
            this.$store.commit('dcot/SET_VALUE_PRICE',true)
            this.$store.commit('dcot/SET_VALUE_BTNSAVE',true)
         },

         dataChangeArticle() {
            this.FUnit = ''
            this.hintCant = ''
            this.dataPrice = ''
            this.$store.commit('dcot/SET_VALUE_UNITS',false)
            this.$v.$reset()
            this.dataUnit = []
            this.dataArticleRes = this.result_data.find( article => article.id === this.FArticles);
            Object.values(this.dataArticleRes['units']).forEach(val => { 
                  this.dataUnit.push( {'id':val.id,'unit':val.unit } )
               });
         },

         openEditCotModal() {
            var payload = {
               name_modal:  'editCotizacion', // modal 
               state_modal: true
            }
            this.$store.dispatch('modals/IdentifyModal',payload);
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

         async deleteCot(cotid){
            var payload = {
               token: this.getUserApi.token,
               idCot: cotid
            }
            const res = await this.$store.dispatch('ecot/canceledCot',payload);
            if(res.success){
               this.$router.push('/cotizaciones')
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

</style>
