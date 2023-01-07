<template>
    <v-row justify="center">
        <v-dialog
            v-model="valModal"
            persistent
            width="90%"
        >
            <v-card>
                <v-card-text class="cot-text-info">
                    <v-row class="mt-5">
                        <v-col 
                            cols="8"
                            sm="8"
                            md="3"
                            lg="3"
                            xl="3"
                            style="font-size: 16px;"
                        >
                            <v-tabs
                                v-model="tab"
                                background-color="transparent"
                                color="basil"
                                grow
                            >
                                <v-tab v-if = "validate == 1">
                                    <v-icon left>mdi-checkbox-multiple-marked-outline</v-icon> Validar Escaneo
                                </v-tab>
                                <v-tab v-else-if = "validate == 2">
                                    <v-icon left>mdi-checkbox-multiple-marked-outline</v-icon> Validar Empaque
                                </v-tab>
                            </v-tabs>
                        </v-col>
                        <v-col 
                            cols="3"
                            sm="3"
                            md="9"
                            lg="9"
                            xl="9"
                            style="font-size: 16px;"
                        >
                            <v-btn
                                color="green darken-1"
                                text
                                @click="closeModal()"
                                class="float-right"
                            >
                            <!-- class="float-right" -->
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
                                    cols="12"
                                    sm="12"
                                    md="3"
                                    lg="3"
                                    xl="3"
                                    class="pa-1 ma-0"
                                    style="text-align: center;"
                                >
                                    <v-chip
                                        :color="supplyModal.color"
                                        text-color="blue-grey darken-4"
                                        label
                                        style="width: 100%;justify-content: center;"
                                    >
                                        <v-icon left>
                                            {{ supplyModal.icon }}
                                        </v-icon>
                                        {{ supplyModal.category }}
                                    </v-chip>
                                </v-col>
                                <v-col 
                                    md="1"
                                    lg="1"
                                    xl="1"
                                ></v-col> 
                                <v-col 
                                    class="pa-0 pt-4 ma-0" 
                                    cols="12"
                                    sm="12"
                                    md="3"
                                    lg="3"
                                    xl="3"
                                > 
                                    Validación:
                                    <v-chip
                                        close-icon="mdi-close-outline"
                                        color = "#008000"
                                        outlined
                                        v-if="supplyModal.wait == 0"
                                    >
                                        Completada
                                    </v-chip>
                                </v-col>
                            </v-row>
                            <v-row class="pl-5">
                                <v-col 
                                    cols="12"
                                    sm="12"
                                    md="3"
                                    lg="3"
                                    xl="3"
                                    class="pa-1 ma-0"
                                    style="text-align: center;"
                                >
                                    <v-chip
                                        text-color="blue-grey darken-4"
                                        label
                                        style="width: 100%;justify-content: center;"
                                        v-if="supplyModal.rec == 1"
                                    >
                                        <v-icon left>
                                            mdi-scissors-cutting
                                        </v-icon>
                                        Recortes
                                    </v-chip>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col 
                                    cols="12"
                                    sm="12"
                                    md="12"
                                    lg="12"
                                    xl="12"
                                >
                                    <v-card>
                                        <v-card-text class="cot-text-info">
                                            <v-container class="pa-0 ma-0" fluid style="max-width: 100%;" >
                                                <v-row class="pa-0 ma-0">
                                                    <v-col 
                                                        cols="12"
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
                                                            hint="Aquí escanea el lote"
                                                            persistent-hint
                                                            dense
                                                            autocomplete="off"
                                                            outlined
                                                            :disabled="disLot"
                                                            v-on:keyup="upperCase(lot)"
                                                            v-on:keyup.enter="scan(supplyModal.rec,validate)"
                                                        ></v-text-field>
                                                    </v-col>
                                                    <v-col 
                                                        class="pa-0 pt-4 ma-0" 
                                                        cols="12"
                                                        sm="12"
                                                        md="3"
                                                        lg="3"
                                                        xl="3"
                                                        style="text-align: center; font-size: 16px; color:red"
                                                        
                                                    >
                                                        Faltan:<b > {{ supplyModal.wait }} </b>
                                                    </v-col>
                                                </v-row>
                                                <v-data-table
                                                    v-model="selected"
                                                    :headers="headersV"
                                                    :items="gridScan"
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
                                                    <template #[`item.num`]="{ item }" v-if="validate == 2">
                                                        {{ item.num }} <v-icon color="#008000">mdi-package-variant-closed</v-icon>
                                                    </template>
                                                    <template #[`item.status_val1`]="{ item }">
                                                        <v-row>
                                                            <v-col 
                                                                md="2"
                                                                lg="2"
                                                                xl="2"
                                                                class="pa-0 ma-0"
                                                            >
                                                                <v-btn
                                                                    icon
                                                                    color="#008000"
                                                                    v-if="(item.status_val1 > 0 && validate == 1) || (item.status_val1 > 3 && validate == 2)"
                                                                >
                                                                    <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
                                                                </v-btn>
                                                            </v-col>
                                                        </v-row>
                                                    </template>
                                                </v-data-table>
                                                <div class="text-center pt-2">
                                                    <v-pagination 
                                                        v-model="page" 
                                                        :length="pageCount" 
                                                        total-visible="5"
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
                </v-tabs-items>
            </v-card>
        </v-dialog>
    </v-row>
</template>
<script>
    import { mapActions, mapGetters } from 'vuex'
    import { jsPDF } from 'jspdf';
    import socketClientEmit from '../../shared/socketEmit';
    import SAToasts from '../../services/SweetAlertToast'
    export default {
        data () {
            return {
                tab: null,
                dialog: false,
                page: 1,
                pageCount: 0,
                itemsPerPage: 5,
                page2: 1,
                pageCount2: 0,
                itemsPerPage2: 5,
                headersV: [
                    { text: '#', align: 'start', width:'5%', value: 'num' },
                    { text: 'Lote', width:'5%', value: 'lot' },
                    { text: 'Articulo', width:'15%', value: 'article' },
                    { text: 'Cantidad', width:'5%', value: 'standar' },
                    { text: 'Unidad', width:'5%', value: 'unit' },
                    { text: 'Contenido(pzas)', width:'5%', value: 'quantity' },
                    { text: 'Validado', width:'5%', value: 'status_val1' },
                ],
                lot: '',
                disLot: false,
                loadingTable: false,
                selected: [],
                qty:1,
                movLot:false,
                locOld: '',
                locNew: '',
                lotComp: '',
                saveDel: 0,
                dordLot: 0,
                valLot: false,
                colorTrash: '#000000',
                flagTrash: 1,
                disTrash: false
            }
        },
        computed: {
            ...mapGetters({
                getUserApi: 'auth/getUserApi',
                valModal: 'modals/getValModal',
                dataSuppD: 'defree/getDataSuppD',
                supplyModal: 'defree/getDataSuppModal',
                gridScan: 'defree/getGridScanModal',
                validate: 'defree/getValidate',
            }),
        },
        // beforeCreate(){
        // },
        created(){
        },
        methods: {
            async closeModal() {
                var payload = {
                    name_modal:  'supplyVal', // modal 
                    state_modal: false,
                    id: 0
                }
                await this.$store.dispatch('modals/IdentifyModal',payload);
            },
            async scan(rec,validate){
                var payload = {
                    token: this.getUserApi.token,
                    user_id: this.getUserApi.uid,
                    freeId: this.dataSuppD.id,
                    catId: this.supplyModal.id,
                    lot: this.lot,
                    rec: rec
                }
                this.loadingTable = true
                if(validate == 1){
                    const res = await socketClientEmit.supplyValEmit(payload)
                    if(res.success){
                        this.loadingTable = false
                        this.lot = ''
                        if(res.error == 1){
                            Swal.fire({
                                icon: 'success',
                                title: 'Validado!',
                                text: 'Lote validado correctamente.',
                                showConfirmButton: false,
                                timer: 1500
                            })
                        } else{
                            Swal.fire({
                                icon: 'error',
                                title: 'Ups...',
                                text: res.comment,
                            })
                        }
                    }
                } else{
                    const res = await socketClientEmit.supplyVal2Emit(payload)
                    if(res.success){
                        this.loadingTable = false
                        this.lot = ''
                        if(res.error == 1){
                            Swal.fire({
                                icon: 'success',
                                title: 'Validado!',
                                text: 'Lote validado correctamente.',
                                showConfirmButton: false,
                                timer: 1500
                            })
                        } else{
                            Swal.fire({
                                icon: 'error',
                                title: 'Ups...',
                                text: res.comment,
                            })
                        }
                    }
                }
            },
            closeMoveLot(){
                this.lot = ''
                this.lotComp = ''
                this.locOld = ''
                this.locNew = ''
                this.movLot = false
                this.flagTrash = 1
                this.colorTrash = '#000000'
                this.disTrash = false
            },
            upperCase(strg){    // buscar la manera de hacer la función genérica
                this.lot = strg.toUpperCase()
            },
        },
        mounted(){
        },
    }
</script>
<style scoped>
    .cotizacion-shades {
        margin-top: 15px;
    }
    .divider-w{
        border-width: 1px !important;
    }
    .info-free{
        font-weight: 590;
    }
    .lot{
        color: #9DBD32;
    }
</style>
