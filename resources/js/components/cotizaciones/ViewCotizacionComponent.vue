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
                     md="2"
                     lg="2"
                     xl="2"
                     style="font-size: 16px;"
                  >
                     <v-icon color="red darken-1"> mdi-clipboard-text-outline </v-icon> &nbsp;&nbsp;Cotizacion: <b class="font-weight-regular">{{ $route.params.cotizacion_id }}</b>
                  </v-col>
                  <v-col 
                     class="pa-0 pt-4 ma-0"
                     xs="12"
                     sm="12"
                     md="2"
                     lg="2"
                     xl="2"
                     v-model="CDesc1"
                     id= 'scrollInto'
                     style="font-size: 16px;"
                  > <!--  descuento  -->
                     <v-icon left> mdi-label-percent-outline </v-icon> Descuento: <b class="font-weight-regular" > {{ CDesc1 }}%</b>
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
                     v-if="isPartner" 
                     v-model="isPartner" 
                     style="font-size: 16px;"
                  > <!--  Cliente  -->
                     <v-icon left> mdi-briefcase-account-outline </v-icon> Cliente: <b class="font-weight-regular"> {{ nameClient }} </b>
                  </v-col>
                  <v-col 
                     class="pa-0 ma-0"
                     xs="12"
                     sm="12"
                     md="3"
                     lg="3"
                     xl="3" 
                     v-else 
                  >

                  </v-col> <!--  Cliente  else -->
                  <v-col 
                     xs="12"
                     sm="12"
                     md="1"
                     lg="1"
                     xl="1" 
                     align-self="end"
                  >
                     <v-btn 
                        small  
                        depressed 
                        :elevation="2" 
                        @click="openEditCotModal()"
                        block
                        :disabled="disCot"
                     >
                        <v-icon
                        left
                        dark
                        color="blue-grey darken-4"
                        >
                           mdi-clipboard-edit-outline
                        </v-icon>
                        Detalle
                     </v-btn>
                  </v-col>
                  <v-col 
                     xs="12"
                     sm="12"
                     md="1"
                     lg="1"
                     xl="1" 
                     align-self="end"
                  >
                     <v-btn 
                        small 
                        depressed 
                        :elevation="2"
                        @click="viewAllCotizaciones()"
                        block
                     >
                        <v-icon
                        left
                        dark
                        color="blue-grey darken-4"
                        >
                           mdi-clipboard-arrow-left-outline
                        </v-icon>
                        Atrás
                     </v-btn>
                  </v-col>
               </v-row>
            </v-container>
         </v-card-subtitle>
         
         <v-divider class="mt-1 mb-1"></v-divider>
         
         <v-container fluid style="max-width: 100%;" >
            <v-row class="pa-0 ma-0" >
               <v-col 
                  class="pa-1 ma-0"
                  cols="12"
                  sm="8"  
                  align-self="end"
                  v-model="msgStatus"
                  
               >
                  <v-chip
                     v-if="msgStatus"
                     class="ma-2"
                     close
                     :color="colorMsg"
                     label
                     outlined
                     @click:close="clearPanel(0)"
                  >
                     <div class="font-weight-regular" > <v-icon left>{{ iconMsg }}</v-icon> {{ msgStatus }}</div>
                     <div class="pl-2 font-weight-black"> {{ noEditPart }}</div>

                  </v-chip>    

               </v-col>
               <v-col 
                  class="pa-1 ma-0"
                  cols="12"
                  sm="3"  
                  align-self="end"
               >
                  <v-btn 
                     small 
                     block 
                     depressed 
                     :elevation="1" 
                     @click="proccessOrder()"
                     :disabled='disCot'
                  >
                     <v-icon
                        left
                        dark
                        color="blue-grey darken-4"
                     >
                        mdi-plus-circle-outline
                     </v-icon>
                     Solicitar Pedido
                  </v-btn>
               </v-col>
               <v-col 
                  class="pa-1 ma-0"
                  cols="12"
                  sm="1"  
                  align-self="end"
               >
                  <v-btn 
                     small 
                     block 
                     depressed 
                     :elevation="1" 
                     @click="deleteCotA($route.params.cotizacion_id)"
                     :disabled='disCot'
                  >
                     <v-icon
                        left
                        dark
                        color="red darken-4"
                     >
                        mdi-cancel
                     </v-icon>
                     CANCELAR
                  </v-btn>
               </v-col>
            </v-row>
         </v-container>

<!-- Panel de articulos -->

         <v-container fluid class="pa-0 ma-0" style="max-width: 100%; margin-bottom: 10px" >


            <v-row class="pa-0 ma-0" >
               <v-col 
                  class=" ma-0"
                  cols="12"
                  sm="2"
               >
                  <v-sheet 
                     v-if="isSkeleton"
                     height="100%"
                     width="100%"
                  >
                     <v-skeleton-loader
                        class="mx-auto"
                        type="image"
                     >
                     
                     </v-skeleton-loader>
                  </v-sheet>
                  <v-sheet v-else>
                     
                     <ProductZoomer
                        :base-images="images"
                        :base-zoomer-options="zoomerOptions" 
                     />   
                  </v-sheet>
               </v-col>

                  <!-- Seleccion de categoria -->

               <v-col 
                  class="pa-0 ma-0"
                  cols="12"
                  sm="2"
               >
                  <v-sheet 
                     v-if="isSkeleton"
                     height="100%"
                     width="100%"
                  >
                     <v-skeleton-loader
                        class="mx-auto"
                        type="list-item,list-item,list-item,list-item,list-item"
                     >
                     </v-skeleton-loader>
                  </v-sheet>
                  <v-sheet v-else>
                     <v-container class="pa-0 ma-0" fluid style="max-width: 100%;" >
                        <v-row class="pa-0 ma-0" >
                           <v-col
                              class="pa-0 pb-5 ma-0"
                              cols="12"
                              v-model="categoInfo"
                           >
                              <v-icon
                                 medium
                                 :color="color1"
                              >
                                 mdi-numeric-1-box-outline
                              </v-icon>
                              Clase: <br><b class="cot-res-menu">{{ categoInfo }}</b>
                           </v-col>
                           <v-col 
                              class="pa-0 ma-0"
                              cols="12"
                              sm="12"
                           >
                           </v-col>
                        </v-row>
                        <v-row class="pa-0 ma-0" >
                           <v-col 
                              class="pa-0 ma-0"
                              cols="12"
                              sm="12"
                           >
                              <v-list
                                 nav
                                 dense
                              >
                                 <v-list-item-group
                                    v-model="selectedItem"
                                    color="blue-grey darken-2"
                                 >
                                    <v-list-item
                                       v-for="(categorie, i) in categories"
                                       :key="i"
                                       :disabled='dPanelCPM'
                                    >
                                       <v-list-item-icon>
                                          <v-icon 
                                             v-text="categorie.icon"
                                          ></v-icon>
                                       </v-list-item-icon>
                                       <v-list-item-content @click="selectCategorie(categorie.id)">
                                          <v-list-item-title 
                                             v-text="categorie.text"
                                          ></v-list-item-title>
                                       </v-list-item-content>
                                    </v-list-item>
                                 </v-list-item-group>
                              </v-list>
                           </v-col>
                        </v-row>
                     </v-container>
                     
                  </v-sheet>
               </v-col>

               <!-- Seleccion de Productos -->

               <v-col 
                  class="ma-0"
                  cols="12"
                  sm="2"
               >

               
                  <v-sheet 
                     v-if="isSkeleton"
                     height="100%"
                     width="100%"
                  >
                     <v-skeleton-loader
                        class="mx-auto"
                        type="list-item,list-item,list-item,list-item,list-item"
                     >
                     </v-skeleton-loader>
                  </v-sheet>
                  <v-sheet v-else>
                     <v-container class="pa-0 ma-0">
                        <v-row>
                           
                           <v-col
                              class="pa-0 pb-5 ma-0"
                              v-model="productInfo"
                           >
                              
                              <v-icon
                                 medium
                                 :color="color2"
                              >
                                 mdi-numeric-2-box-outline
                              </v-icon>
                              Grupo: <br><b class="cot-res-menu">{{ productInfo }}</b>
                           </v-col>
                           
                        </v-row>
                        <v-row class="pa-0 ma-0" >
                           <v-col 
                              class="pa-0 ma-0"
                              cols="12"
                              sm="12"
                           >
                              <v-list-item-group
                                 v-model="selectedItemP"
                                 color="blue-grey darken-2"
                              >
                                 <v-virtual-scroll
                                    :bench="benched"
                                    :items="products"
                                    height="223"
                                    item-height="40"
                                 >
                                    <template v-slot:default="{ item }">
                                       <v-list-item 
                                          :key="item.key" 
                                          :disabled='dPanelCPM'
                                          @click="selectProduct(item.key,item.if_models)">
                                          <v-list-item-content>
                                          <v-list-item-title >
                                             <v-icon>
                                                mdi-chevron-right
                                             </v-icon>
                                                <a style="font-size:12px;font-weight: 500;"> {{ item.product }}</a>
                                          </v-list-item-title>
                                          </v-list-item-content>
                                       </v-list-item>
                                    </template>
                                 </v-virtual-scroll>
                              </v-list-item-group>
                           </v-col>
                        </v-row>
                     </v-container>
                  </v-sheet>
               </v-col>

               <!-- Seleccion Modelos -->
               <v-col 
                  class="ma-0"
                  cols="12"
                  sm="2"
               >
                  <v-sheet 
                     v-if="isSkeleton"
                     height="100%"
                     width="100%"
                  >
                     <v-skeleton-loader
                        class="mx-auto"
                        type="list-item,list-item,list-item,list-item,list-item"
                     >
                     </v-skeleton-loader>
                  </v-sheet>
                  <v-sheet v-else>
                     <v-container class="pa-0 ma-0">
                        <v-row>
                           <v-col
                              class="pa-0 pb-5 ma-0"
                              v-model="modelInfo"
                           >
                              
                              <v-icon
                                 medium
                                 :color="color3"
                              >
                                mdi-numeric-3-box-outline
                              </v-icon>
                              Subgrupo: <br><b class="cot-res-menu">{{ modelInfo }}</b>
                           </v-col>
                        </v-row>
                        <v-row class="pa-0 ma-0" >
                           <v-col 
                              class="pa-0 ma-0"
                              v-if="ifModels"
                           >
                              <v-list-item-group
                                 v-model="selectedItemM"
                                 color="blue-grey darken-2"
                              >
                                 <v-virtual-scroll
                                    :bench="benched"
                                    :items="models"
                                    height="223"
                                    item-height="40"
                                 >
                                    <template v-slot:default="{ item }">
                                       <v-list-item 
                                          :key="item.key" 
                                          :disabled='dPanelCPM'
                                          @click="selectModel(item.key)">
                                          <v-list-item-content>
                                             <v-list-item-title >
                                                <v-icon>
                                                   mdi-chevron-right
                                                </v-icon>
                                                   <a style="font-size:12px;font-weight: 500;"> {{ item.model }}</a>
                                             </v-list-item-title>
                                          </v-list-item-content>
                                       </v-list-item>
                                    </template>
                                 </v-virtual-scroll>
                              </v-list-item-group>
                           </v-col>
                           <v-col 
                              class="pa-0 ma-0"
                              cols="12"
                              sm="2"
                              v-else
                           >
                              <div class="center-icon">
                                 <v-icon
                                    x-large
                                 >
                                       mdi-cancel
                                 </v-icon> 
                              </div>
                           </v-col>
                        </v-row>
                     </v-container>
                  </v-sheet>
               </v-col>

               <!-- INPUTS COTIZACION  -->
               <v-col 
                  class="pa-0 ma-0"
                  cols="12"
                  sm="4"
               >
                  <v-sheet 
                     v-if="isSkeleton"
                  >
                     <v-skeleton-loader
                        class="mx-auto"
                        type="list-item,list-item,list-item,list-item,list-item"
                     >
                     </v-skeleton-loader>
                  </v-sheet>
                  <v-sheet v-else>

                     <v-container>
                        <v-row>

                           <v-col  cols="12" class="d-flex">
                              <v-autocomplete
                                 v-model="FArticles"
                                 :items="result_data"
                                 item-value="id"
                                 item-text="article"
                                 dense
                                 label="Buscar Articulo"
                                 :disabled="isDCArticles"
                                 @change="dataChangeArticle()"
                                 :error-messages="articlesErrors"
                                 @input="$v.FArticles.$touch()"
                              ></v-autocomplete>
                           </v-col>

                        </v-row>
                        <v-row>
                           <v-col  cols="12" sm="6" md="6" class="d-flex">
                              <v-select
                                 v-model="FUnit"
                                 :items="dataUnit"
                                 item-text="unit"
                                 item-value="id"
                                 label="Unidad"
                                 dense
                                 :disabled='isDUnit'
                                 @change="dataChangeUnit()"
                                 :error-messages="unitErrors"
                                 @input="$v.FUnit.$touch()"
                              ></v-select>
                           </v-col>
                           <v-col  cols="12" sm="6" md="6" class="d-flex">
                              <v-text-field
                                 v-model="FQuantity"
                                 :label="labelCant"
                                 :hint="hintCant"
                                 persistent-hint
                                 dense
                                 :disabled='isDCant'
                                 :error-messages="quantityErrors"
                                 @keypress="onlyNumber"
                                 @input="$v.FQuantity.$touch()"
                                 autocomplete="off"
                              ></v-text-field>
                           </v-col>
                        </v-row>
                        <v-row>
                           <v-col  cols="12" sm="6" md="6" class="d-flex">
                              <v-text-field
                                 v-model="dataDesc"
                                 label="Descuento"
                                 dense
                                 :disabled='isDDesc'
                                 :readonly='true'
                              ></v-text-field>

                           </v-col>
                           <v-col  cols="12" sm="6" md="6" class="d-flex">
                              <v-text-field
                                 v-model="dataPrice"
                                 :label="labelPrice"
                                 dense
                                 :disabled='isDPrice'
                                 :readonly='true'
                              ></v-text-field>
                           </v-col>

                        </v-row>
                        <v-row>
                           <v-col  class="pa-1 ma-0"
                              cols="12"
                              sm="6"  
                              align-self="end">
                              <v-btn 
                                 small 
                                 block 
                                 depressed 
                                 :elevation="1" 
                                 :disabled='$v.$invalid'
                                 @click="submitArticle()"
                              >
                              <!-- isDBtnSave                               -->
                                 <v-icon
                                    left
                                    dark
                                    color="light-green darken-2"
                                 >
                                    mdi-content-save-outline
                                 </v-icon>
                                 {{submit}}
                              </v-btn>
                           </v-col>
                           <v-col 
                              class="pa-1 ma-0"
                              cols="12"
                              sm="6"  
                              align-self="end"
                              v-if="dbtnCancel"
                           >
                              <v-btn 
                                 small 
                                 block 
                                 depressed 
                                 :elevation="1" 
                                 @click="clearPanel(0)"
                              >
                                 <v-icon
                                    left
                                    dark
                                    color="red darken-4"
                                 >
                                    mdi-close-outline
                                 </v-icon>
                                 Cancelar
                              </v-btn>
                           </v-col>
                        </v-row>
                     </v-container>
                  </v-sheet>
               </v-col>

            </v-row>
         </v-container>
      </v-card>

      <!-- Panel de datos Cotizacion -->
      <v-card
         class="mx-auto rounded-0 border-0 cot-card-info "
         elevation="0">
         <v-card-text class="cot-text-info">
            <v-row>
               <v-col>
                     <!-- poner informacion de algo -->
               </v-col>
               <v-col class="col-price">
                     <div class="info_price_cot"> Subtotal: </div>
                      <!-- $ {{ import_cot }}  -->
                     <div class="data_price_cot">$ {{ sumSubt }}</div>
                     <div class="info_price_cot"> Iva: </div>
                     <!-- $ {{ desc_cot }}  -->
                     <div class="data_price_cot">$ {{ Iva }}</div>
                     <div class="info_price_cot"> Total: </div>
                     <!--  $ {{ tot_iva_cot }}  -->
                     <div class="data_price_cot">$ {{ sumTotal }}</div>
               </v-col>
            </v-row>
          </v-card-text>
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
               :items="datadcot"
               :page.sync="page"
               :items-per-page="itemsPerPage"
               hide-default-footer
               class="elevation-0 overflow-y-auto"
               @page-count="pageCount = $event"
               scroll.sync="scrollSync"
               :loading="loadingTable"
               loading-text="Cargando Articulos ..."
            >
            <!-- sort-by="entry_id"  -->
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
   import ImportCot  from '../../services/importCotizacion'
   import ProductZoomer from 'vue-product-zoomer'

   import { mapActions, mapState, mapGetters } from 'vuex'
   import store from '../../store/store'

   import socketClientEmit from '../../shared/socketEmit'


   Vue.use(ProductZoomer)

   export default {
      data () {
         return {
            cotizacion_id: Number.parseInt(this.$route.params.cotizacion_id),
            nameAgent: '',
            nameClient: '',
            CDesc1: '',
            CDesc2: '',
            loading: false,
            loadingTable: true,
            isPartner: false,
            ifModels: true,
            isSkeleton: true,

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
                  value: 'entry_id',
               },
               { text: 'Articulo', value: 'article' },
               { text: 'Grupo', value: 'category' },
               { text: 'Cantidad', value: 'quantity' },
               { text: 'Unidad', value: 'unit' },
               { text: 'Precio', value: 'price' },
               { text: 'Subtotal', value: 'subt' },
               { text: 'Desc', value: 'desc' },
               { 
                  text: 'Acciones', 
                  sortable: false,
                  value: 'options',
               },
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

            zoomerOptions: {
               zoomFactor: 3, // scale for zoomer
               pane: 'container-round', // three type of pane ['pane', 'container-round', 'container']
               hoverDelay: 300, // how long after the zoomer take effect
               namespace: 'zoomer', // add a namespace for zoomer component, useful when on page have mutiple zoomer
               move_by_click: false, // move image by click thumb image or by mouseover
               scroll_items: 0, // thumbs for scroll
               choosed_thumb_border_color: "#bbdefb", // choosed thumb border color
               scroller_button_style: "line",
               scroller_position: "right",
               zoomer_pane_position: "left"
            }, 

            // Elements

            labelPrice: 'Precio',
            labelCant: 'Cantidad',
            hintCant: '',

            // Categories
            elementsCot: [],
            selectedItem: 0,
            selectedItemP: 0,
            selectedItemM: 0,
            categories: [],
            selectCategory: [],

            // subcategorias

            benched: 0,
            selectedprod: 0,
            products: [],
            selectProducts: [],

            //models

            models: [],

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

            // validations

            FArticles: '',
            FUnit: '',
            FQuantity: '',
            flagUnit: '',
            flagQty: '',

            // Boolean require
            RArticles: true,
            RUnit: true,
            RQuantity: true,


            // import_cot: 0,
            // desc_cot: 0,
            // tot_iva_cot: 0,
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
         FArticles: {
            required: requiredIf(function() {
               return this.RArticles;
            })
         },
         FUnit: {
            required: requiredIf(function() {
               return this.RUnit;
            })
         },
         FQuantity: {
            required: requiredIf(function() {
               return this.RQuantity;
            }),
            minValue: minValue(1)
            // maxValue: maxValue(function() {
            //    return this.cantid;
            // }),
         },
      },
      computed: {
         ...mapGetters({ 
            idCot: 'dcot/getIdCot',
            datadcot: 'dcot/getDataDCot',
            getUserApi: 'auth/getUserApi',
            sumSubt: 'dcot/getsumSubt',
            Iva: 'dcot/getIva',
            sumTotal: 'dcot/getsumTotal',
            idEditCot: 'ecot/getIdEditCotSelect', 
            deleted: 'cotizaciones/deleted',
            disCot: 'dcot/getDisabledCot',
            dPanelCPM: 'dcot/getDisabledPanleCPM',
            isDCArticles: 'dcot/getDisabledArticles',
            isDUnit: 'dcot/getDisabledUnit',
            isDCant: 'dcot/getDisabledCant',
            isDDesc: 'dcot/getDisablededDesc',
            isDPrice: 'dcot/getDisabledPrice',
            isDBtnSave: 'dcot/getDisabledBtnSave',
         }),
         
         articlesErrors(){
            const errors = []
            if (!this.$v.FArticles.$dirty) return errors
            !this.$v.FArticles.required && errors.push('Necesitas seleccionar un articulos.')
            return errors
         },
         unitErrors(){
            const errors = []
            if (!this.$v.FArticles.$dirty) return errors
            !this.$v.FArticles.required && errors.push('Necesitas seleccionar una Unidad.')
            return errors
         },
         quantityErrors(){
            const errors = []
            this.flagVal = true
            if (!this.$v.FQuantity.$dirty) return errors
            // !this.$v.FQuantity.maxValue && errors.push('Supera el metraje del rollo(' + this.cantid + ')') 
            !this.$v.FQuantity.minValue && errors.push('No puede ser 0')
            !this.$v.FQuantity.required && errors.push('Necesitas indicar una cantidad.')
            if(this.FUnit === 2){
               if(this.FQuantity >= this.dataArticleRes.packing2){
                  this.flagVal = false
                  errors.push('Supera el metraje del rollo('+this.dataArticleRes.packing2+'m).')
               }
            }
            return errors
            
         },
         
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



         async getCotizacion() { // obtenemos las partidas de la cotización
            if( Number.parseInt(this.getUserApi.ip) === 1 ) {
               this.isPartner = true
            }
            //Guardamos el id de la cotizacion para otros controladores
            this.$store.dispatch('ecot/idEditCotSelect',this.cotizacion_id);  //no funciona, revisar

            // obtenemos las partidas de la cotizacion 
            var payload = {
               token: this.getUserApi.token,
               cotizacion_id: this.cotizacion_id,
            }
            const res = await this.$store.dispatch('dcot/getPartidasCot',payload);

            if(res.success) {
               var days = res.days
               this.CDesc1 = res.cDesc1
               this.CDesc2 = res.cDesc2
               this.nameAgent = res.cNameAgent
               this.nameClient = res.cNameClient
               this.loadingTable = false
               // this.itemparts = res.gridpCot
               // this.import_cot = res.sumSubt
               // this.desc_cot = res.sumDesc
               // this.tot_iva_cot = res.totIva
               this.submit = 'GUARDAR REGISTRO'

               if(Number.parseInt(days) >= 3){
                  this.$store.commit('dcot/SET_VALUE_DISCOT',true)
                  this.$store.commit('dcot/SET_VALUE_PANELCPM',true)
                  this.iconMsg = 'mdi-alert-outline' 
                  this.colorMsg = '#F9D73B'    
                  this.msgStatus = 'NOTA: La cotización ya no se encuentra vigente (Límite 3 días).'
               } 
   
            }
         },

         async getCategory() {
            var payload = {
               token: this.getUserApi.token,
            }
            try {
               const res = await this.$store.dispatch('ecot/getElementsCot',payload);
               this.elementsCot = res.elements
               Object.values(res.elements).forEach(val => {
                  this.categories.push( {'id':val.id,'text':val.category,'icon':val.icon } )
               });
               this.isSkeleton = false
               this.selectCategorie(1);
            } catch (error) {
               
            }
         },

         selectCategorie (i) { // click en una categoria
            //this.clearPanel(1)
            this.idCategory = i
            this.idProduct = 0
            this.idModel = 0
            this.products = []
            this.ifModels = true
            var resProdElem = this.elementsCot.find( elemet => elemet.id === i);
            this.categoInfo = '» '+resProdElem.category
            this.color1 = 'green'
            this.productInfo = ''
            this.color2 = ''
            this.modelInfo = ''
            this.color3 = ''
            this.$store.commit('dcot/SET_VALUE_BTNSAVE',true)
            this.result_data = [ ]
            this.dataUnit = [ ]
            this.FUnit = ''
            this.dataPrice = ''
            this.FQuantity = ''
            this.dataDesc = ''
            this.labelPrice = 'Precio'
            this.labelCant = 'Cantidad'
            this.hintCant = ''
            this.selectedItemP = ''
            this.selectedItemM = ''
            this.models = []
            this.units = []
            this.disabledInputs()
            if(resProdElem.products.length > 1){
               this.products.push( { 'key':0,'product':'Todos' ,'if_models':0 } )
            }
            for(const product of resProdElem.products){
               this.products.push( { 'key':product.id,'product':product.product ,'if_models':product.if_models } )
            }          
         },

         selectProduct(i,ifm){
            this.idProduct = i
            this.idModel = 0
            this.models = []
            this.color2 = 'green'
            this.modelInfo = ''
            this.color3 = ''
            this.result_data = [ ]
            this.dataUnit = [ ]
            this.FUnit = ''
            this.dataPrice = ''
            this.FQuantity = ''
            this.dataDesc = ''
            this.labelPrice = 'Precio'
            this.labelCant = 'Cantidad'
            this.hintCant = ''
            this.disabledInputs()
            
            if(i == 0){
               this.productInfo = '» Todos'
               this.dataDesc = this.CDesc1 // por el momento le asignamos el descuento que tiene por default, lugo se asignaran descuentos especiales.
               this.vLookResultData(this.idCategory,this.idProduct,0)
            } else{
               var resProdElem = this.elementsCot.find( elemet => elemet.id === this.idCategory);
               var resModElem = resProdElem.products.find( prduct => prduct.id === i);
               this.productInfo = '» '+resModElem.product

               if(Number,parseInt(ifm) === 1){
                  if(resModElem.models.length > 1){
                      this.models.push( { 'key':0,'model':'Todos' } )
                  }
                  for(const el of resModElem.models){
                     this.models.push( { 'key':el.id,'model':el.model  } )
                  }
               } else{
                  this.modelInfo = '» Sin Modelos'
                  this.dataDesc = this.CDesc1 // por el momento le asignamos el descuento que tiene por default, lugo se asignaran descuentos especiales.
                  this.vLookResultData(this.idCategory,this.idProduct,0)
               }
            }
         },
         selectModel (i) { // click en un modelo
            this.idModel = i
            this.result_data = [ ]
            this.dataUnit = [ ]
            this.FUnit = ''
            this.dataPrice = ''
            this.FQuantity = ''
            this.dataDesc = ''
            this.labelPrice = 'Precio'
            this.labelCant = 'Cantidad'
            this.hintCant = ''
            this.disabledInputs()
            this.dataDesc = this.CDesc1 // por el momento le asignamos el descuento que tiene por default, lugo se asignaran descuentos especiales.
            this.color3 = 'green'            
            if(i == 0){
               this.modelInfo = '» Todos'
               this.vLookResultData(this.idCategory,this.idProduct,0)
            } else{
               var resCatgElem = this.elementsCot.find( elemet => elemet.id === this.idCategory);
               var resProdElem = resCatgElem.products.find( prduct => prduct.id === this.idProduct);
               var resModElem = resProdElem.models.find( modl => modl.id === i);
               this.modelInfo = '» '+ resModElem.model 
               this.vLookResultData(this.idCategory,this.idProduct,this.idModel)
               
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

         async vLookResultData(categoryId,productId,modelId) {
            this.loading = true
            var payload = {
               token: this.getUserApi.token, 
               categoryId: categoryId,
               productId: productId,
               modelId: modelId,
               // productIsAll: productIsAll,
               // ifModel: ifModel,
               // modelIsAll: modelIsAll,
            }  
            this.$v.$reset()
            const res = await this.$store.dispatch('ecot/getArticlesVlook',payload);
            this.result_data = res.articles
            
            this.loading = false
            this.enabledInputs()
            
            //funciones a ejecutar al modificar una partida
            if(this.updCot !== 0){
               this.dataChangeArticle();
               this.FUnit = this.flagUnit
               this.dataChangeUnit();
               this.FQuantity = this.flagQty
            }
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

         dataChangeUnit() {
            this.$v.$reset()
            this.cantid = 0
            var compl = 'pzas'
            this.labelCant = 'Cantidad'
            this.hintCant = ''
            this.dataArticleRes = this.result_data.find( article => article.id === this.FArticles);
            var dataUnit = this.dataUnit.find( unit => unit.id === this.FUnit);
            this.FQuantity = ''
            if(this.FUnit == 3 || this.FUnit == 6){
               this.cantid = this.dataArticleRes.packing2
            } else if(this.FUnit !== 1) {
               this.cantid = this.dataArticleRes.packing1
            } else{
               this.cantid = 1
            }

            if(this.FUnit == 3){
               this.dataPrice = this.dataArticleRes.price2
               compl = 'm'
               this.labelPrice = 'Precio por m'
            } else{
               this.dataPrice = this.dataArticleRes.price1
            }

            if(this.FUnit == 2){
               this.labelCant = 'Cantidad en m'
               this.labelPrice = 'Precio por m'
            } else if(this.FUnit !== 1 ){
               this.hintCant = dataUnit.unit + ' con ' + this.cantid + ' ' + compl
            }
         },

         async submitArticle() {
            this.$v.$touch()
            if (!this.$v.$invalid && this.flagVal === true) {

               this.loading = true
               this.loadingTable = true
               // this.itemparts = [ ]
               var msjToast = ''
               var msg = 0
               // obtenemos la unidad
               var findResUnit = this.dataUnit.find( unitFound => unitFound.id === this.FUnit);
               let payload = {
                  token: this.getUserApi.token,
                  cotizacionId: this.cotizacion_id,
                  articleId: this.FArticles,
                  unit: findResUnit.unit,
                  unitId: findResUnit.id,
                  quantity: this.FQuantity,
                  desc1: this.dataDesc,
                  price: this.dataPrice,
                  dCot: this.updCot,
                  categoryId: this.idCategory,
                  range: 2,
                  service: 1
               }
               const data = await socketClientEmit.createDCotizacionEmit(payload)
               if(data.success) {
                  // this.itemparts = data.gridpCot
                  // this.import_cot = data.sumSubt
                  // this.desc_cot = data.sumDesc
                  // this.tot_iva_cot = data.totIva
                  var iconToast = 'success'
                  msg = data.msg
                  if(msg == 1){
                     msjToast = '¡Articulo Agregado!'
                  } else{
                     msjToast = '¡Partida Actializada!'
                  }
                  var positionToast = 'top'
                  var timerToast = 3000
                  const SAToastsVar = new SAToasts(iconToast,msjToast,positionToast,timerToast)
                  SAToastsVar.getToast()
                  
                  this.$v.$reset()
                  this.clearPanel(0)
                  
               }else {
                  var iconToast = 'warning'
                  var msjToast = '¡No se pudo crear tu cotización, favor de contactar con tu agente de venta...! '
                  var positionToast = 'bottom-end'
                  var timerToast = 4000
                  const SAToastsVar = new SAToasts(iconToast,msjToast,positionToast,timerToast)
                  SAToastsVar.getToast()
                  this.loading = false
                  this.loadingTable = false
               }
            }
         },

         openEditCotModal() {
            var payload = {
               name_modal:  'editCotizacion', // modal 
               state_modal: true
            }
            this.$store.dispatch('modals/IdentifyModal',payload);
         },         
         //extrae info de la partida para su modificación, asigna los datos y bloquea el panel de artículo
         async updatePCot(idDCot){
            var payload = {  
               token: this.getUserApi.token,
               idDcot: idDCot
            }
            var arrDcot = []
            var arrAdcot = []
            var ifmodel = 0
            this.updCot = 0
            console.log('--> ' + idDCot)
            const res = await this.$store.dispatch('dcot/updatePCot',payload);
            if(res.success){
               this.scrollInto('scrollInto')
               arrDcot = res.dCot[0]
               arrAdcot = arrDcot.article
               this.updCot = arrDcot.id
               this.selectedItem = arrAdcot.category_id - 1
               var contP = 0
               var contM = 0
               this.selectCategorie(arrAdcot.category_id)
               Object.values(this.products).forEach(val => { 
                  contP += 1
                  if(val.key == arrAdcot.product_id){
                     this.productInfo = val.product
                     ifmodel = val.if_models
                     this.selectedItemP = contP -1
                  }
               });
               this.selectProduct(arrAdcot.product_id,ifmodel)
               Object.values(this.models).forEach(val => { 
                  contM += 1
                  if(val.key == arrAdcot.model_id){
                     this.selectModel(val.key)
                     this.selectedItemM = contM -1
                  }
               });
               this.$store.commit('dcot/SET_VALUE_PANELCPM',true)
               this.FArticles = arrAdcot.id
               this.flagUnit = arrDcot.unit_id
               this.iconMsg = 'mdi-clipboard-edit-outline'   
               this.msgStatus = 'Edición de la partida: '   
               this.noEditPart = arrDcot.entry_id    
               this.colorMsg = 'shades_four'    
               this.submit = 'ACTUALIZAR PARTIDA'  
               this.dbtnCancel = true
               // this.FQuantity = arrDcot.quantity
               this.flagQty = arrDcot.quantity  
               
            }
         },
         //genera la confirmación para eliminar la partida
         async deletedPCot(idDCot,idPDCot){
            var title_alrt = 'Eliminar'
            var text_alrt = 'Se elimiará la partida '+ idPDCot +'. ¿Está seguro?'
            var icon_alrt = 'warning'
            var confirmBtn = 'Eliminar'
            var cancelBtn = '<template><b-icon icon="arrow-up"></b-icon></template> Cancelar'
            
            const alert_obj = new SAQuestions(icon_alrt,title_alrt,text_alrt,confirmBtn,cancelBtn)
            var resAlert = await alert_obj.getQuestionRoute()
            if(resAlert){
               this.deletedCotP(idDCot)
            } 
         },
         //elimina la partida de la cotización
         async deletedCotP(idDCot){
            var payload = {  
               token: this.getUserApi.token,
               idDcot: idDCot
            }
            this.loadingTable = true
            const res = await this.$store.dispatch('dcot/delPartCot',payload);
            if(res.success){
               // this.itemparts = res.gridpCot
               // this.import_cot = res.sumSubt
               // this.desc_cot = res.sumDesc
               // this.tot_iva_cot = res.totIva
               this.loadingTable = false
               this.clearPanel(0)
               this.selectCategorie(1)
            }

         },
         
         onlyNumber ($event) { //validacion de enteros y decimales en cantidad. Detalle con indexOf
            let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
            if(this.FUnit === 2 && this.FQuantity.indexOf !== undefined){ // unidad de corte en cantidad con un decimal
               if ((keyCode < 48 || keyCode > 57) && (keyCode !== 46 || this.FQuantity.indexOf('.') != -1)) { // 46 is dot
               $event.preventDefault();
               }
               // restrict to 1 decimal places
               if(this.FQuantity != null && this.FQuantity.indexOf(".") > -1 && (this.FQuantity.split('.')[1].length > 0)){
                  $event.preventDefault();
               }
            } else{  //unidades enteras en cantidad
               if (keyCode < 48 || keyCode > 57 || this.FQuantity.indexOf == undefined) { 
               $event.preventDefault();
               }
            }            
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

         viewAllCotizaciones() {
            store.dispatch('modals/loaderfull',true)
            this.$router.push('/cotizaciones')
         },

         clearPanel(c){
            this.loading = false
            this.loadingTable = false
            this.$store.commit('dcot/SET_VALUE_PANELCPM',false)
            this.updCot = 0
            this.flagUnit = ''
            this.flagQty = ''
            this.color1 = 'green'
            this.productInfo = ''
            this.color2 = ''
            this.modelInfo = ''
            this.color3 = ''
            this.$store.commit('dcot/SET_VALUE_BTNSAVE',true)
            this.result_data = [ ]
            this.dataUnit = [ ]
            this.FUnit = ''
            this.dataPrice = ''
            this.FQuantity = ''
            this.dataDesc = ''
            this.labelPrice = 'Precio'
            this.labelCant = 'Cantidad'
            this.submit = 'GUARDAR REGISTRO'
            this.hintCant = ''
            this.msgStatus = ''
            this.dbtnCancel = false
            this.noEditPart = '' 
            this.iconMsg = '' 
            this.disabledInputs()
            this.selectedItemP = ''
            this.selectedItemM = ''
            this.FArticles = ''
            this.updCot = 0
            this.submit = 'GUARDAR REGISTRO'
            this.selectedItem = 0
            if(c == 0){
               this.selectCategorie(1)
               this.selectedItem = 0
            }
            this.dbtnCancel = false
            this.selectedItemP = ''
            this.selectedItemM = ''
            this.models = []
         },
         async proccessOrder() {

             var payload = {  
               token: this.getUserApi.token,
               id: this.idEditCot
            }

            const data = await socketClientEmit.proccessOrderEmit(payload);

            // if(data.success) {
            //    // crear una notificacion que el cliente paso a pedido

            //       console.log('pedido cambio status')


            // }



         }
      },
      mounted(){
         this.getCotizacion()
         this.getCategory() 
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

  .col-price {
    display:flex;
    justify-content:flex-end;
    align-items:center;
  }

  .info_price_cot {
     color:#307E85;
     font-size:15px
  }

  .data_price_cot {
      color: #2C4244;
      font-size: 18px;
      padding-right: 20px;
      padding-left: 5px;
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
