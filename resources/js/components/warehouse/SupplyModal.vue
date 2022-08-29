<template>
    <v-row justify="center">
        <v-dialog
            v-model="supplyM"
            persistent
            width="90%"
        >
        <v-card>
            <v-card-text class="cot-text-info">
                <v-row class="mt-5">
                    <v-col 
                        xs="12"
                        sm="12"
                        md="6"
                        lg="6"
                        xl="6"
                        style="font-size: 16px;"
                    >
                        <v-tabs
                            v-model="tab"
                            background-color="transparent"
                            color="basil"
                            grow
                        >
                            <v-tab>
                                <v-icon left>mdi-barcode-scan</v-icon> Escaneo
                            </v-tab>
                            <!-- <v-tab v-on:click="freeDetail"> -->
                            <v-tab>
                                <v-icon left>mdi-clipboard-text-outline</v-icon> Detalle libera
                            </v-tab>
                        </v-tabs>
                    </v-col>
                    <v-col 
                        xs="12"
                        sm="12"
                        md="6"
                        lg="6"
                        xl="6"
                        style="font-size: 16px;"
                    >
                        <v-btn
                            color="green darken-1"
                            text
                            @click="closeModal()"
                            class="float-right"
                        >
                            <v-icon left>mdi-close</v-icon> Cerrar
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-tabs-items v-model="tab">
                <v-tab-item>
                    <v-card-text>
                        <v-row class="pl-5">
                            <v-col 
                                xs="12"
                                sm="12"
                                md="3"
                                lg="3"
                                xl="3"
                                class="pa-1 ma-0"
                                style="text-align: center;"
                            >
                                <v-chip
                                    color="blue lighten-3"
                                    text-color="blue-grey darken-4"
                                    label
                                    style="width: 35%;"
                                >
                                    <v-icon left>
                                        mdi-view-parallel-outline
                                    </v-icon>
                                    Telas
                                </v-chip>
                            </v-col>
                            <v-col 
                                xs="12"
                                sm="12"
                                md="3"
                                lg="3"
                                xl="3"
                                class="pa-1 ma-0"
                            >
                                Clave sai:<b class="info-free"> DUODB-082-98 </b>
                            </v-col>
                            <v-col 
                                xs="12"
                                sm="12"
                                md="4"
                                lg="4"
                                xl="4"
                                class="pa-1 ma-0"
                            >
                                Artículo:<b class="info-free"> DUOLINE BASIC DARK GREY 2.50M </b>
                            </v-col>
                        </v-row>
                        <v-row class="pl-5">
                            <v-col 
                                xs="12"
                                sm="12"
                                md="3"
                                lg="3"
                                xl="3"
                                class="pa-1 ma-0"
                                style="font-size: 20px; text-align: center;"
                            >
                                #<b class="info-free"> 1 </b>
                            </v-col>
                            <v-col 
                                xs="12"
                                sm="12"
                                md="3"
                                lg="3"
                                xl="3"
                                class="pa-1 ma-0"
                            >
                                Cantidad:<b class="info-free"> 4 </b>
                            </v-col>
                            <v-col 
                                xs="12"
                                sm="12"
                                md="3"
                                lg="3"
                                xl="3"
                                class="pa-1 ma-0"
                            >
                                Unidad:<b class="info-free"> rollo </b>
                            </v-col>
                            <v-col 
                                xs="12"
                                sm="12"
                                md="3"
                                lg="3"
                                xl="3"
                                class="pa-1 ma-0"
                            >
                                Metraje:<b class="info-free"> 50 </b>
                            </v-col>
                        </v-row>
                        <v-row class="pl-5">
                            <v-col 
                                xs="12"
                                sm="12"
                                md="3"
                                lg="3"
                                xl="3"
                                class="pa-1 ma-0"
                            >
                            </v-col>
                            <v-col 
                                xs="12"
                                sm="12"
                                md="3"
                                lg="3"
                                xl="3"
                                class="pa-1 ma-0"
                            >
                                Estatus:<b class="info-free">  </b>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col 
                                xs="12"
                                sm="12"
                                md="8"
                                lg="8"
                                xl="8"
                            >
                                <v-card>
                                    <v-card-text class="cot-text-info">
                                        <v-container class="pa-0 ma-0" fluid style="max-width: 100%;" >
                                            <v-row class="pa-0 ma-0">
                                                <v-col 
                                                    class="pa-0 pt-4 ma-0" 
                                                    xs="12"
                                                    sm="12"
                                                    md="4"
                                                    lg="4"
                                                    xl="4"
                                                > 
                                                    Escaneados
                                                </v-col>
                                                <v-col 
                                                    xs="12"
                                                    sm="12"
                                                    md="3"
                                                    lg="3"
                                                    xl="3"
                                                    class="pa-1 ma-0"
                                                    style="text-align: center;"
                                                >
                                                    <v-text-field
                                                        v-model="lot"
                                                        label="Lote"
                                                        hint="Aquí escanea los lotes"
                                                        persistent-hint
                                                        dense
                                                        autocomplete="off"
                                                        outlined
                                                        :disabled="disLot"
                                                        v-on:keyup.enter="scan()"
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col 
                                                    class="pa-0 pt-4 ma-0" 
                                                    xs="12"
                                                    sm="12"
                                                    md="4"
                                                    lg="4"
                                                    xl="4"
                                                    style="text-align: center; font-size: 16px; color:red"
                                                    
                                                >
                                                    Faltan:<b > 4 </b>
                                                </v-col>
                                            </v-row>
                                            <v-data-table
                                                v-model="selected"
                                                :headers="headers"
                                                :items="gridModal"
                                                :page.sync="page"
                                                :items-per-page="itemsPerPage"
                                                hide-default-footer
                                                class="elevation-0 overflow-y-auto"
                                                @page-count="pageCount = $event"
                                                :loading="loadingTable"
                                                :sort-desc="false"
                                            >
                                                <v-progress-linear 
                                                    v-show="loadingTable" 
                                                    slot="progress" 
                                                    color="red darken-4" 
                                                    indeterminate>
                                                </v-progress-linear>
                                                <template #[`item.id`]="{ item }">
                                                    <v-row>
                                                        <v-col 
                                                            md="2"
                                                            lg="2"
                                                            xl="2"
                                                            class="pa-0 ma-0"
                                                        >
                                                            <v-btn
                                                                icon
                                                                color="#EAA20A"
                                                                
                                                            >
                                                                <v-icon>mdi-barcode-scan</v-icon>
                                                            </v-btn>
                                                        </v-col>
                                                    </v-row>
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
                                        </v-container>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                            <v-col 
                                xs="12"
                                sm="12"
                                md="4"
                                lg="4"
                                xl="4"
                            >
                                <v-card elevation="5">
                                    <v-card-text class="cot-text-info">
                                        <v-container class="pa-0 ma-0" fluid style="max-width: 100%;" >
                                            <v-row class="pa-0 ma-0">
                                                <v-col 
                                                    class="pa-0 pt-4 ma-0" 
                                                    xs="12"
                                                    sm="12"
                                                    md="4"
                                                    lg="4"
                                                    xl="4"
                                                > 
                                                    Sugeridos
                                                </v-col>
                                            </v-row>
                                            <v-data-table
                                                v-model="selected"
                                                :headers="headers2"
                                                :items="gridModal"
                                                :page.sync="page"
                                                :items-per-page="itemsPerPage"
                                                hide-default-footer
                                                class="elevation-0 overflow-y-auto"
                                                @page-count="pageCount = $event"
                                                :loading="loadingTable"
                                                :sort-desc="false"
                                            >
                                                <v-progress-linear 
                                                    v-show="loadingTable" 
                                                    slot="progress" 
                                                    color="red darken-4" 
                                                    indeterminate>
                                                </v-progress-linear>
                                                <template #[`item.id`]="{ item }">
                                                    <v-row>
                                                        <v-col 
                                                            md="2"
                                                            lg="2"
                                                            xl="2"
                                                            class="pa-0 ma-0"
                                                        >
                                                            <v-btn
                                                                icon
                                                                color="#EAA20A"
                                                                
                                                            >
                                                                <v-icon>mdi-barcode-scan</v-icon>
                                                            </v-btn>
                                                        </v-col>
                                                    </v-row>
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
                                        </v-container>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-tab-item>
                <v-tab-item>
                    <v-card-text class="cot-text-info" >
                        Esta parte no se contempla
                    </v-card-text>
                </v-tab-item>
            </v-tabs-items>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>

    import { mapActions, mapGetters } from 'vuex'
    import { jsPDF } from 'jspdf';
    import html2canvas from 'html2canvas';//
    import socketClientEmit from '../../shared/socketEmit';
    import SAToasts from '../../services/SweetAlertToast'
    // import store from '../store/store'


    export default {
        data () {
            return {
                tab: null,
                dialog: false,
                page: 1,
                pageCount: 0,
                itemsPerPage: 10,
                headers: [
                    {
                        text: '#',
                        align: 'start',
                        value: 'id',
                    },
                    { text: 'Lote', value: 'lot' },
                    { text: 'Metraje', value: 'metraje' },
                    { text: 'Registro', value: 'date' },
                ],
                headers2: [
                    { text: 'Lote', value: 'lot' },
                    { text: 'Metraje', value: 'metraje' },
                    { text: 'Registro', value: 'date' },
                ],
                lot: '',
                disLot: false,
                loadingTable: false,
                selected: [],
                gridModal: [],
                gridSug: [],
                page: 1,
                pageCount: 0,
                itemsPerPage: 5,

            }
        },
        computed: {
            ...mapGetters({
                getUserApi: 'auth/getUserApi',
                supplyM: 'modals/getSupplyModal',
            }),
        },
        // beforeCreate(){
        // },
        created(){
        },
        methods: {

            async closeModal() {
                var payload = {
                    name_modal:  'supplyFree', // modal 
                    state_modal: false,
                    id: 0
                }
                await this.$store.dispatch('modals/IdentifyModal',payload);
            },

            scan(){
                console.log('olo')
            },
        },
        mounted(){
        },
    }
</script>
<style scoped>
    .info-free{
        font-weight: 590;
    }
</style>