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
                                <v-tab>
                                    <v-icon left>mdi-barcode-scan</v-icon> Escaneo
                                </v-tab>
                                <!-- <v-tab v-on:click="freeDetail"> -->
                                <!-- <v-tab>
                                    <v-icon left>mdi-package-variant-closed</v-icon> Detalle libera
                                </v-tab> -->
                            </v-tabs>
                        </v-col>
                        <v-col 
                            xs="12"
                            sm="12"
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
                                    xs="12"
                                    sm="12"
                                    md="3"
                                    lg="3"
                                    xl="3"
                                    class="pa-1 ma-0"
                                >
                                    Clave sai:<b class="info-free"> {{ supplyModal.sai_id }} </b>
                                </v-col>
                                <v-col 
                                    xs="12"
                                    sm="12"
                                    md="4"
                                    lg="4"
                                    xl="4"
                                    class="pa-1 ma-0"
                                >
                                    Artículo:<b class="info-free"> {{ supplyModal.article }} </b>
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
                                    style="text-align: center;"
                                >
                                    <v-chip
                                        text-color="blue-grey darken-4"
                                        label
                                        style="width: 100%;justify-content: center;"
                                        v-if="supplyModal.unit_id == 2"
                                    >
                                        <v-icon left>
                                            mdi-scissors-cutting
                                        </v-icon>
                                        Recortes
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
                                    Cantidad:<b class="info-free"> {{ supplyModal.quantity }} </b>
                                </v-col>
                                <v-col 
                                    xs="12"
                                    sm="12"
                                    md="3"
                                    lg="3"
                                    xl="3"
                                    class="pa-1 ma-0"
                                >
                                    Unidad:<b class="info-free"> {{ supplyModal.unit }} </b>
                                </v-col>
                                <v-col 
                                    xs="12"
                                    sm="12"
                                    md="3"
                                    lg="3"
                                    xl="3"
                                    class="pa-1 ma-0"
                                >
                                    Contenido:<b class="info-free"> {{ supplyModal.pzas }} </b>
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
                                    Surtido:
                                    <v-icon color="#008000" v-if="supplyModal.status == 2">mdi-archive-arrow-up-outline</v-icon>
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
                                                        md="3"
                                                        lg="3"
                                                        xl="3"
                                                    > 
                                                        Escaneados
                                                    </v-col>
                                                    <v-col 
                                                        xs="12"
                                                        sm="12"
                                                        md="2"
                                                        lg="2"
                                                        xl="2"
                                                        class="pa-1 ma-0"
                                                        style="text-align: center;"
                                                        v-if="supplyModal.unit_id == 1 || supplyModal.unit_id == 5 || supplyModal.unit_id == 7"
                                                    >
                                                        <v-text-field
                                                            v-model="qty"
                                                            label="Cantidad"
                                                            hint="Agrupar piezas"
                                                            persistent-hint
                                                            dense
                                                            autocomplete="off"
                                                            outlined
                                                            :disabled="disLot"
                                                        ></v-text-field>
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
                                                            hint="Aquí escanea el lote"
                                                            persistent-hint
                                                            dense
                                                            autocomplete="off"
                                                            outlined
                                                            :disabled="disLot"
                                                            v-on:keyup="upperCase(lot)"
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
                                                        v-if="supplyModal.unit_id == 1 || supplyModal.unit_id == 5 || supplyModal.unit_id == 6 || supplyModal.unit_id == 7"
                                                    >
                                                        Faltan:<b > {{ foulPack+' '+supplyModal.unit+'s /'+ foul }} </b>
                                                    </v-col>
                                                    <v-col 
                                                        class="pa-0 pt-4 ma-0" 
                                                        xs="12"
                                                        sm="12"
                                                        md="4"
                                                        lg="4"
                                                        xl="4"
                                                        style="text-align: center; font-size: 16px; color:red"
                                                        v-else
                                                    >
                                                        Faltan:<b > {{ foul }} </b>
                                                    </v-col>
                                                </v-row>
                                                <v-data-table
                                                    v-model="selected"
                                                    :headers="headers"
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
                                                                    color="red"
                                                                    @click="delSupp(item.id,item.lot)"
                                                                >
                                                                    <v-icon>mdi-close-circle-outline</v-icon>
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
                                                    :items="gridSug"
                                                    :page.sync="page2"
                                                    :items-per-page="itemsPerPage2"
                                                    hide-default-footer
                                                    class="elevation-0 overflow-y-auto"
                                                    @page-count="pageCount2 = $event"
                                                    :sort-desc="false"
                                                >
                                                </v-data-table>
                                                <div class="text-center pt-2">
                                                    <v-pagination 
                                                        v-model="page2" 
                                                        :length="pageCount2" 
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
                    <v-tab-item>
                        <v-card-text class="cot-text-info" >
                            Esta parte no se contempla
                        </v-card-text>
                    </v-tab-item>
                </v-tabs-items>
            </v-card>
        </v-dialog>
        <v-dialog
            v-model="this.movLot"
            max-width="500px"
            persistent
        >
            <v-card>
                <v-card-title v-if="saveDel == 1">
                    Lote en movimiento (devolver)
                </v-card-title>
                <v-card-title v-else>
                    Lote en movimiento 
                </v-card-title>
                <v-card-text>
                    <v-text-field
                        v-model="lot"
                        label="Lote"
                        hint="Lote en movimiento"
                        persistent-hint
                        dense
                        autocomplete="off"
                        outlined
                        disabled
                    ></v-text-field>
                    <v-text-field
                        v-model="locOld"
                        label="Ubicación"
                        hint="Ubicación donde se tomó el lote"
                        persistent-hint
                        dense
                        autocomplete="off"
                        outlined
                        autofocus
                        ref="locOld"
                        v-on:keyup.enter="valida(locOld,1)"
                    ></v-text-field>
                    <v-btn
                        color="#EAA20A"
                        text
                        @click="trashRec()"
                        v-if="supplyModal.unit_id == 2"
                        :disabled="disTrash"
                    >
                        Desperdicio
                    </v-btn>
                </v-card-text>
                <v-divider class="divider-w mt-1 mb-1"></v-divider>
                <v-card-title :style="{color:colorTrash}"> 
                    Depositar lote
                </v-card-title>
                <v-card-text>
                        <v-text-field
                            v-model="lotComp"
                            label="Lote"
                            hint="Vuelve a escanear el lote"
                            persistent-hint
                            dense
                            autocomplete="off"
                            outlined
                            ref="lotComp"
                            v-on:keyup.enter="compareLot"
                        ></v-text-field>
                        <v-text-field
                            v-model="locNew"
                            label="Ubicación"
                            hint="Ubicación donde se deposita el lote"
                            persistent-hint
                            dense
                            autocomplete="off"
                            outlined
                            ref="locNew"
                            v-on:keyup.enter="valida(locNew,2)"
                        ></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-btn
                        color="red"
                        text
                        @click="closeMoveLot"
                    >
                    Cancelar
                    </v-btn>
                </v-card-actions>
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
                itemsPerPage: 5,
                page2: 1,
                pageCount2: 0,
                itemsPerPage2: 5,
                headers: [
                    {
                        text: '#',
                        align: 'start',
                        value: 'num',
                    },
                    { text: 'Lote', value: 'lot' },
                    { text: 'Contenido', value: 'quantity' },
                    { text: 'Ubicación', value: 'location' },
                    { text: '', value: 'id' },
                ],
                headers2: [
                    { text: 'Lote', value: 'lote' },
                    { text: 'Contenido', value: 'existencia' },
                    { text: 'Ubicación', value: 'location' },
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
                supplyM: 'modals/getSupplyModal',
                supplyModal: 'defree/getDataSuppModal',
                gridScan: 'defree/getGridScanModal',
                gridSug: 'defree/getGridSugModal',
                foulPack: 'defree/getFoulPack',
                foul: 'defree/getFoul',
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
            async scan(){
                this.disTrash = false
                this.saveDel = 0
                this.dordLot = 0
                var payload = {
                    token: this.getUserApi.token,
                    user_id: this.getUserApi.uid,
                    dord_id: this.supplyModal.id,
                    cat_id: this.supplyModal.catId,
                    lot: this.lot,
                    qty: this.qty,
                    pick: 1
                }
                this.loadingTable = true
                const res = await socketClientEmit.supplyScanEmit(payload)
                if(res.success){
                    this.loadingTable = false
                    if(res.dataSuppScan[0].error == 1){
                        this.movLot = true
                    } else{
                        Swal.fire({
                            icon: 'error',
                            title: 'Ups...',
                            text: res.dataSuppScan[0].comment,
                        })
                    }
                }
            },
            delSupp(id,lot){
                this.saveDel = 1
                this.dordLot = id
                this.lot = lot
                this.movLot = true
                this.disTrash = true
                // var payload = {
                //     token: this.getUserApi.token,
                //     user_id: this.getUserApi.uid,
                //     dord_id: this.supplyModal.id,
                //     cat_id: this.supplyModal.catId,
                //     dordLot: id
                // }
                // this.loadingTable = true
                // const res = await socketClientEmit.supplyDelScanEmit(payload)
                // if(res.success){
                //     this.loadingTable = false
                // }
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
            compareLot(){
                this.lotComp = this.lotComp.toUpperCase() 
                if(this.lot == this.lotComp){
                    this.$refs.locNew.focus()
                    this.valLot = true
                } else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Ups...',
                        text: 'El lote no coincide con el seleccionado',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.lotComp = ''
                }
            },
            async scanSave(){
                this.locOld = this.locOld.toUpperCase()
                this.locNew = this.locNew.toUpperCase() 
                this.loadingTable = true
                if(this.valLot){
                    if(this.saveDel == 0){
                        var payload = {
                            token: this.getUserApi.token,
                            user_id: this.getUserApi.uid,
                            dord_id: this.supplyModal.id,
                            cat_id: this.supplyModal.catId,
                            lot: this.lot,
                            qty: this.qty,
                            pick: 0,
                            locOld: this.locOld,
                            locNew: this.locNew,
                            flagTrash: this.flagTrash
                        }
                        const res = await socketClientEmit.supplyScanEmit(payload)
                        if(res.success){
                            this.loadingTable = false
                            if(Number.parseInt(res.dataSuppScan[0].error) == 1){
                                this.closeMoveLot()
                                Swal.fire({
                                    icon: 'success',
                                    title: '¡Agregado!',
                                    text: res.dataSuppScan[0].comment,
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                                this.qty = 1
                            } else{
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Ups...',
                                    text: res.dataSuppScan[0].comment,
                                })
                            }
                        }
                    } else{
                        var payload = {
                            token: this.getUserApi.token,
                            user_id: this.getUserApi.uid,
                            dord_id: this.supplyModal.id,
                            cat_id: this.supplyModal.catId,
                            dordLot: this.dordLot,
                            locOld: this.locOld,
                            locNew: this.locNew
                        }
                        const res = await socketClientEmit.supplyDelScanEmit(payload)
                        if(res.success){
                            this.loadingTable = false
                            if(Number.parseInt(res.gridSupplyModal[0].error) == 1){
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Eliminado!',
                                    text: 'El lote fue eliminado',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                                this.closeMoveLot()
                            } else{
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Ups...',
                                    text: res.gridSupplyModal[0].comment,
                                })
                            }
                        } 
                    }
                } else{
                    this.loadingTable = false
                    Swal.fire({
                        icon: 'error',
                        title: 'Ups...',
                        text: 'El lote no coincide con el seleccionado',
                    })
                }
            },
            upperCase(strg){    // buscar la manera de hacer la función genérica
                this.lot = strg.toUpperCase()
            },
            async valida(location,opt){
                var payload = {
                    token: this.getUserApi.token,
                    user_id: this.getUserApi.uid,
                    location: location
                }
                const res = await this.$store.dispatch('defree/valida',payload);
                if(res.success){
                    if(res.valida[0].location){
                        if(opt == 1){
                            this.$refs.lotComp.focus()
                        } else{
                            this.scanSave()
                        }
                    } else{
                        this.locOld = ''
                        let iconToast = 'error'
                        let msjToast = 'La ubicación no existe'
                        let positionToast = 'bottom-end'
                        let timerToast = 1500
                        const SAToastsVar = new SAToasts(iconToast,msjToast,positionToast,timerToast)
                        SAToastsVar.getToast()
                        if(opt == 1){
                            this.$refs.locOld.focus()
                        } else{
                            this.$refs.locNew.focus()
                            this.locNew = ''
                        }
                    }
                }
            },
            trashRec(){
                if(this.flagTrash == 1){
                    this.colorTrash = '#EAA20A'
                    this.flagTrash = 2
                } else{
                    this.colorTrash = '#000000'
                    this.flagTrash = 1
                }
            }
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
