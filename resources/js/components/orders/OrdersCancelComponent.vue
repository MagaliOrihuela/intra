<template>
   <div>
        <v-card
            max-width="100%"
            class="mb-10"
            elevation="0"
        >
            <v-card-title style="position:relative">
                <div>
                    <v-icon color="red">mdi-clipboard-remove-outline</v-icon>
                    Pedidos cancelados
                </div>
                <div class="float-right" style="position:absolute;right:50px">
                    <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Search"
                        single-line
                        hide-details
                    ></v-text-field>
                </div>
            </v-card-title>
            <v-card-actions class="px-12">
                <v-progress-linear
                    :active="loading"
                    :indeterminate="loading"
                    absolute
                    top
                    color="red darken-4"
                ></v-progress-linear>
                <v-data-table
                    :v-model="orders"
                    :headers="headers"
                    :items="orders"
                    :page.sync="page"
                    :items-per-page="itemsPerPage"
                    sort-by="id" 
                    :sort-desc="true"
                    :search="search"
                    hide-default-footer
                    style="width: 100%;"
                    class="elevation-0 overflow-y-auto"
                    @page-count="pageCount = $event"
                >
                    <!-- scroll.sync="scrollSync" -->
                    <template #[`item.total_ord`]="{ item }" >
                        <div style="display:flex;"> <v-icon  color="green" size="18px"> mdi-currency-usd </v-icon> <div class="total-cotizacion">{{ item.total_ord }} </div> </div>
                    </template>
                    <template #[`item.status`]="{ item }" >
                        <!-- <div style="display:flex;"><div class="status-cotizacion">{{ item.status }} </div></div> -->
                        <v-chip
                            close-icon="mdi-close-outline"
                            :color = "item.color"
                            outlined
                        >
                            {{ item.status }}
                        </v-chip>
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
                                    @click="viewOrder(item.order_id)"
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
            </v-card-actions>
            <div class="text-center pt-2">
                <v-pagination 
                    v-model="page" 
                    :length="pageCount" 
                    total-visible="7"
                    circle 
                    color="blue-grey darken-3" 
                ></v-pagination>
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
                  text: 'Pedido',
                  align: 'start',
                  value: 'order_id',
               },
               { text: 'Cliente', value: 'client_id' },
               { text: 'Nombre Cliente', value: 'name_cte' },
               { text: 'Agente', value: 'name_agent' },
               { text: 'Creación', value: 'register' },
               { text: 'Total', value: 'total_ord' },
               { text: 'Status', value: 'status' },
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
               orders: 'eord/getDataOrdersC',
            }),
      },
      methods: {
         ...mapActions(['login']),
         onScroll (e) {
            this.scrollSync.top = e.target.scrollTop
            this.scrollSync.left = e.target.scrollLeft
         },
         async GetOrdersC() { // obtenemos los pedidos cancelados
            if(Number.parseInt(this.getUserApi.ip) == 1) {
               this.isPartner = true
            }
            let payload = { 
               token: this.getUserApi.token,
               user_id: this.getUserApi.uid
            }
            await this.$store.dispatch('eord/getOrdersC',payload);
            this.skeletorTable = false
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
         viewOrder(id) {
            this.loading=true
            this.$store.dispatch('modals/loaderfull',true); // activamos el overlay cargando
            this.$router.push(`/pedidos/${id}`)
        },
      },
      mounted(){
         this.GetOrdersC()
         this.$store.dispatch('modals/loaderfull',false); // desactivamos el overlay cargando

      },
      catch: {

      }
  }
</script>
<style scoped>
    .total-cotizacion {
        font-size: 15px;
        font-weight: 400;
        padding-top: 3px;
        color: green;
    }
    .status-cotizacion {
        font-size: 15px;
        font-weight: 400;
        padding-top: 3px;
        color: rgb(162, 2, 2);
    }
</style>