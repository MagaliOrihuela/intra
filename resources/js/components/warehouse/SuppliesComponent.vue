<template>
   <div>
        <v-card
            max-width="100%"
            class="mb-10"
            elevation="0"
        >   
            <v-container 
               fluid
               class="mr-2 pa-2 "
               style="max-width: 100%;"
            >
                <v-row class="ma-0">
                    <v-col 
                        lg="9"
                        md="9"
                        sm="12"
                        cols="12"
                        class="ma-0 pa-0 pt-2"
                    >
                        <v-card-text class="pt-1 pb-1 ">
                            Estatus por color: 
                            <v-chip text-color="#878787" >
                                <v-avatar color="#FE0303"></v-avatar>
                                &nbsp;Escaneo
                            </v-chip>
                            <v-chip text-color="#878787">
                                <v-avatar color="#FE8803"></v-avatar>
                                &nbsp;Validación escaneo
                            </v-chip>
                            <v-chip text-color="#878787">
                                <v-avatar color="#E8E800"></v-avatar>
                                &nbsp;Empaque
                            </v-chip>
                            <v-chip text-color="#878787">
                                <v-avatar color="#6BB2A4"></v-avatar>
                                &nbsp;Validación empaque
                            </v-chip>
                            <v-chip text-color="#878787">
                                <v-avatar color="#75D40A"></v-avatar>
                                &nbsp;Terminado
                            </v-chip>
                        </v-card-text>
                    </v-col>
                    <v-col 
                        lg="2"
                        md="2"
                        sm="12"
                        cols="12"
                        class="ma-0 pa-0 pb-2 "
                    >
                        <v-text-field
                            v-model="search"
                            append-icon="mdi-magnify"
                            label="Search"
                            single-line
                            hide-details
                        ></v-text-field>
                    </v-col>
                </v-row>
            </v-container>
            <v-card-actions class="px-12">
                <v-progress-linear
                    :active="loading"
                    :indeterminate="loading"
                    absolute
                    top
                    color="red darken-4"
                ></v-progress-linear>
                <v-data-table
                    :v-model="free"
                    :headers="headers"
                    :items="free"
                    :page.sync="page"
                    :items-per-page="itemsPerPage"
                    sort-by="id" 
                    :sort-desc="false"
                    :search="search"
                    hide-default-footer
                    style="width: 100%;"
                    class="elevation-0 overflow-y-auto"
                    @page-count="pageCount = $event"

                >
                    <template #[`item.no_ped`]="{ item }">
                        <div class="orders-color">{{ item.no_ped }}</div>
                    </template>
                    <template #[`item.created_at`]="{ item }" >
                        {{ formatDate(item.created_at) }}
                    </template>
                    <template #[`item.status_id`]="{ item }" >
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }"
                                v-if="item.tela > 0">
                                <v-btn 
                                    :color="item.telaC" 
                                    :to=item.view
                                    fab 
                                    dark
                                    v-bind="attrs"
                                    v-on="on"
                                    :elevation="3"
                                    max-width="25px"
                                    max-height="25px"
                                >
                                    <v-icon size="15px">mdi-view-parallel-outline</v-icon>
                                </v-btn>
                            </template>
                            <span>Telas</span>
                        </v-tooltip>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }"
                                v-if="item.telaR > 0">
                                <v-btn 
                                    :color="item.telaRC"
                                    :to=item.view
                                    fab 
                                    dark
                                    v-bind="attrs"
                                    v-on="on"
                                    :elevation="3"
                                    max-width="25px"
                                    max-height="25px"
                                >
                                    <v-icon size="15px">mdi-scissors-cutting</v-icon>
                                </v-btn>
                            </template>
                            <span>Recortes</span>
                        </v-tooltip>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }"
                                v-if="item.comp > 0">
                                <v-btn 
                                    :color="item.compC" 
                                    :to=item.view
                                    fab 
                                    dark
                                    v-bind="attrs"
                                    v-on="on"
                                    :elevation="3"
                                    max-width="25px"
                                    max-height="25px"
                                >
                                    <v-icon size="15px">mdi-chart-donut</v-icon>
                                </v-btn>
                            </template>
                            <span>Componentes</span>
                        </v-tooltip>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }"
                                v-if="item.perf > 0">
                                <v-btn 
                                    :color="item.perfC" 
                                    :to=item.view
                                    fab 
                                    dark
                                    v-bind="attrs"
                                    v-on="on"
                                    :elevation="3"
                                    max-width="25px"
                                    max-height="25px"
                                >
                                    <v-icon size="15px">mdi-cube-outline</v-icon>
                                </v-btn>
                            </template>
                            <span>Perfiles</span>
                        </v-tooltip>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }"
                                v-if="item.mot > 0">
                                <v-btn 
                                    :color="item.motC" 
                                    :to=item.view
                                    fab 
                                    dark
                                    v-bind="attrs"
                                    v-on="on"
                                    :elevation="3"
                                    max-width="25px"
                                    max-height="25px"
                                >
                                    <v-icon size="15px">mdi-remote</v-icon>
                                </v-btn>
                            </template>
                            <span>Motores</span>
                        </v-tooltip>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }"
                                v-if="item.told > 0">
                                <v-btn 
                                    :color="item.toldC" 
                                    :to=item.view
                                    fab 
                                    dark
                                    v-bind="attrs"
                                    v-on="on"
                                    :elevation="3"
                                    max-width="25px"
                                    max-height="25px"
                                >
                                    <v-icon size="15px">mdi-remote</v-icon>
                                </v-btn>
                            </template>
                            <span>Motores</span>
                        </v-tooltip>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }"
                                v-if="item.told > 0">
                                <v-btn 
                                    :color="item.toldC" 
                                    :to=item.view
                                    fab 
                                    dark
                                    v-bind="attrs"
                                    v-on="on"
                                    :elevation="3"
                                    max-width="25px"
                                    max-height="25px"
                                >
                                    <v-icon size="15px">mdi-remote</v-icon>
                                </v-btn>
                            </template>
                            <span>Motores</span>
                        </v-tooltip>
                    </template>
                    <template #[`item.options`]="{ item }">
                        <!-- <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn 
                                    color="blue-grey darken-3" 
                                    :to=item.view
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
                            <span>Revisar pedido</span>
                        </v-tooltip> -->
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn 
                                    color="blue-grey darken-3" 
                                    :to=item.edit
                                    @click="viewFree(item.id)"
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
                            <span>Editar pedido</span>
                        </v-tooltip>
                        <!-- <v-tooltip bottom>
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
                            <span>Cancelar pedido</span>
                        </v-tooltip> -->
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

    export default {
        data () {
            return { 
                tab: null,
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
                    { text: 'Libera', width:'5%', align: 'start', value: 'id', },
                    { text: 'Pedido', width:'5%',align: 'center', value: 'no_ped'},
                    { text: 'Cliente', width:'5%',align: 'center',align: 'center', value: 'client_id' },
                    { text: 'Nombre cliente', width:'18%',align: 'center', value: 'short_name' },
                    // { text: 'Agente', value: 'agent' },
                    // { text: 'Usuario', value: 'user_name' },
                    { text: 'Entrega', width:'8%',align: 'center', value: 'delivery_type' },
                    { text: 'Embarque', width:'8%',align: 'center', value: 'boarding_type' },
                    { text: 'Fletera', width:'8%',align: 'center', value: 'companie' },
                    { text: 'Creación', width:'8%',align: 'center', value: 'created_at' },
                    // { text: 'Avance', width:'12%',align: 'center', align: 'center', value: 'porc' },
                    { text: 'Status', width:'15%',align: 'center', align: 'center', value: 'status_id' },
                    { text: 'Acciones', width:'8%', sortable: false, value: 'options' },
                ],

                dialogcancel:false,
                cancel_id: 0,
                status_id: 0,
            }
        },
        computed: {
            ...mapGetters({ 
                getUserApi: 'auth/getUserApi', 
                free: 'efree/getDataSupp',

            }),
        },
        methods: {
            ...mapActions(['login']),
            onScroll (e) {
                this.scrollSync.top = e.target.scrollTop
                this.scrollSync.left = e.target.scrollLeft
            },
            async getSupp(){
                let payload = { 
                    token: this.getUserApi.token,
                    user_id: this.getUserApi.uid
                }
                await this.$store.dispatch('efree/getSupp',payload);

            },
            formatDate(date){
                let yy = date.substring(2,4)
                let mm = date.substring(5,7)
                let dd = date.substring(8,10)
                let time = date.substring(11,16)
                let cDate = dd + '/' + mm + '/' + yy + ' ' + time
                return cDate
            },
            viewFree(id){
                this.loading=true
               this.$store.dispatch('modals/loaderfull',true); // activamos el overlay cargando
               this.$router.push(`/almacen/surtir/${id}`)
            }
 
        },
        mounted(){
            this.getSupp();
            this.$store.dispatch('modals/loaderfull',false); // desactivamos el overlay cargando
        },
        catch: {
        }
    }
</script>
<style>
    .orders-color {
        font-size: 15px;
        font-weight: 400;
        padding-top: 3px;
        color: green;
    }

</style>