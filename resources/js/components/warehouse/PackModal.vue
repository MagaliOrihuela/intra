<template>
    <v-row justify="center">
        <v-dialog
            v-model="packM"
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
                                <v-icon left>mdi-package-variant</v-icon> Empacar
                            </v-tab>
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
                                    :color="dataModal.color"
                                    text-color="blue-grey darken-4"
                                    label
                                    style="width: 100%;justify-content: center;"
                                >
                                    <v-icon left>
                                        {{ dataModal.icon }}
                                    </v-icon>
                                    {{ dataModal.category }}
                                </v-chip>
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
                                    v-if="dataModal.rec == 1"
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
                                xs="12"
                                sm="12"
                                md="6"
                                lg="6"
                                xl="6"
                            >
                                <v-card elevation="5">
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
                                                    class="pa-0 ma-0" 
                                                    xs="12"
                                                    sm="12"
                                                    md="9"
                                                    lg="9"
                                                    xl="9"
                                                    align="right">
                                                    <v-btn
                                                        icon
                                                        color="#008000"
                                                        @click="packAll()"
                                                    >
                                                        <v-icon>mdi-chevron-triple-right</v-icon>
                                                    </v-btn>
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
                                                :sort-desc="false"
                                            >
                                            <template #[`item.package`]="{ item }">
                                                <v-row>
                                                    <v-col v-if="item.package == null">
                                                        <v-btn
                                                            icon
                                                            color="#008000"
                                                            @click="itemPack(item.id)"
                                                        >
                                                            <v-icon>mdi-arrow-right-thin-circle-outline</v-icon>
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
                                md="6"
                                lg="6"
                                xl="6"
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
                                                    Empaque
                                                </v-col>
                                                <v-col
                                                    class="pa-0 ma-0" 
                                                    xs="12"
                                                    sm="12"
                                                    md="9"
                                                    lg="9"
                                                    xl="9"
                                                    align="right">
                                                    <v-btn
                                                        icon
                                                        color="red"
                                                        @click="delGridPack()"
                                                    >
                                                        <v-icon>mdi-close-circle</v-icon>
                                                    </v-btn>
                                                    <v-btn
                                                        icon
                                                        color="#008000"
                                                        @click="packing()"
                                                    >
                                                        <v-icon>mdi-check-circle</v-icon>
                                                    </v-btn>
                                                </v-col>
                                            </v-row>
                                            <v-data-table
                                                v-model="selected"
                                                :headers="headers"
                                                :items="arrPack"
                                                :page.sync="pageP"
                                                :items-per-page="itemsPerPageP"
                                                hide-default-footer
                                                class="elevation-0 overflow-y-auto"
                                                @page-count="pageCountP = $event"
                                                :loading="loadingTable"
                                                :sort-desc="false"
                                                @click:row="packReturn"
                                            >
                                                <v-progress-linear 
                                                    v-show="loadingTable" 
                                                    slot="progress" 
                                                    color="red darken-4" 
                                                    indeterminate>
                                                </v-progress-linear>
                                            </v-data-table>
                                            <div class="text-center pt-2">
                                                <v-pagination 
                                                    v-model="pageP" 
                                                    :length="pageCountP" 
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
                        <v-row>
                            <v-col 
                                xs="12"
                                sm="12"
                                md="12"
                                lg="12"
                                xl="12"
                            >
                                <v-card elevation="5">
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
                                                    Empacados
                                                </v-col>
                                                <v-col
                                                    class="pa-0 ma-0" 
                                                    xs="12"
                                                    sm="12"
                                                    md="9"
                                                    lg="9"
                                                    xl="9"
                                                    align="right">
                                                    <v-btn
                                                        icon
                                                        color="#01C0D2"
                                                        @click="createPDF()"
                                                    >
                                                    <!-- @click="returnPack(dataModal.id)" -->
                                                        <v-icon>mdi-tag-text-outline</v-icon>
                                                    </v-btn>
                                                </v-col>
                                            </v-row>
                                            <v-data-table
                                                v-model="selected"
                                                :headers="headers2"
                                                :items="gridPack"
                                                :page.sync="pagePD"
                                                :items-per-page="itemsPerPagePD"
                                                hide-default-footer
                                                class="elevation-0 overflow-y-auto"
                                                @page-count="pageCountPD = $event"
                                                :sort-desc="false"
                                            >
                                                <template #[`item.package`]="{ item }">
                                                    {{ item.package }}
                                                    <v-icon size="150%" color="#008000">mdi-package-variant-closed</v-icon>
                                                </template>
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
                                                                    @click="delPack(item.id)"
                                                                >
                                                                    <v-icon>mdi-close-circle-outline</v-icon>
                                                                </v-btn>
                                                            </v-col>
                                                        </v-row>
                                                    </template>
                                            </v-data-table>
                                            <div class="text-center pt-2">
                                                <v-pagination 
                                                    v-model="pagePD" 
                                                    :length="pageCountPD" 
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
                pageP: 1,
                pageCountP: 0,
                itemsPerPageP: 5,
                pagePD: 1,
                pageCountPD: 0,
                itemsPerPagePD: 5,
                headers: [
                    {
                        text: '#',
                        align: 'start',
                        value: 'num',
                    },
                    { text: 'Lote', value: 'lot' },
                    { text: 'Metraje', value: 'quantity' },
                    { text: 'Ubicación', value: 'location' },
                    { text: 'Empaque', align:'center' ,value: 'package' },
                ],
                headers2: [
                    {
                        text: '#',
                        align: 'start',
                        value: 'package',
                    },
                    { text: 'Lote', value: 'lot' },
                    { text: 'Metraje', value: 'quantity' },
                    { text: 'Ubicación', value: 'location' },
                    { text: '', value: 'id' },
                ],
                lot: '',
                disLot: false,
                loadingTable: false,
                selected: [],
                qty:1,
            }
        },
        computed: {
            ...mapGetters({
                getUserApi: 'auth/getUserApi',
                packM: 'modals/getPackModal',
                gridScan: 'defree/getGridScanModal',
                gridPack: 'defree/getDataGridPack',
                dataModal: 'defree/getDataSuppModal',
                arrPack: 'defree/getGridSugModal',
                dataSuppD: 'defree/getDataSuppD',

            }),
        },
        // beforeCreate(){
        // },
        created(){
        },
        methods: {
            async closeModal() {
                var payload = {
                    name_modal:  'supplyPack', // modal 
                    state_modal: false,
                    id: 0
                }
                await this.$store.dispatch('modals/IdentifyModal',payload);
            },
            packReturn(row){
                let indexItem = this.arrPack.findIndex(({id}) => id === row.id)
                let row2 = this.arrPack.splice(indexItem,1)
                let n = row2[0].num
                for(let i = indexItem; i < this.arrPack.length; i++){
                    this.arrPack[i].num = n
                    n++
                }
                let m = this.gridScan.length + 1
                row2[0].num = m
                this.gridScan.push(row2[0])
            },
            itemPack(dlotId){   // busqueda index array
                let indexItem = this.gridScan.findIndex(({id}) => id === dlotId)
                let row = this.gridScan.splice(indexItem,1)
                let n = row[0].num
                for(let i = indexItem; i < this.gridScan.length; i++){
                    this.gridScan[i].num = n
                    n++
                }
                let m = this.arrPack.length + 1
                row[0].num = m
                this.arrPack.push(row[0])
            },
            delGridPack(){
                let row = []; 
                let n = this.gridScan.length + 1
                for(let i = 0; i < this.arrPack.length; i++){
                    row = this.arrPack[i]
                    row.num = n
                    this.gridScan.push(row)
                    n++
                }
                this.arrPack.splice(0,this.arrPack.length)
            },
            packAll(){
                let row = []; 
                let n = this.arrPack.length + 1
                for(let i = 0; i < this.gridScan.length; i++){
                    row = this.gridScan[i]
                    row.num = n
                    this.arrPack.push(row)
                    n++
                }
                this.gridScan.splice(0,this.gridScan.length)
            },
            async packing(){
                var payload = {
                    token: this.getUserApi.token,
                    user_id: this.getUserApi.uid,
                    catId: this.dataModal.id,
                    rec: this.dataModal.rec,
                    freeId: this.dataSuppD.id,
                    arrPack: this.arrPack
                }
                if(this.arrPack.length === 0){
                    Swal.fire({
                        icon: 'error',
                        title: 'Ups...',
                        text: 'No se han seleccionado productos para empacar.',
                    })
                } else{
                    // const res = await this.$store.dispatch('defree/getFreeD',payload);
                    const data = await socketClientEmit.supplyPackEmit(payload);
                    if(data.success){
                        Swal.fire({
                            icon: 'success',
                            title: '¡Agregado!',
                            text: 'El empaque fue generado.',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                }
            },
            returnPack(dordLId){

            },   
            async delPack(doLId){
                var payload = {
                    token: this.getUserApi.token,
                    user_id: this.getUserApi.uid,
                    catId: this.dataModal.id,
                    rec: this.dataModal.rec,
                    freeId: this.dataSuppD.id,
                    doLId: doLId
                }
                const data = await socketClientEmit.supplyDelPackEmit(payload);
                if(data.success){
                    Swal.fire({
                        icon: 'success',
                        title: '¡Eliminado!',
                        text: 'El empaque fue eliminado.',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            },
            createPDF () {
                let pdfName = 'testPdf'; 
                var doc = new jsPDF('L','mm',[103,153]);
                doc.setTextColor(0)
                doc.text(10,10,"Esta es la pruba")

                doc.setTextColor("#42d254")
                doc.setDrawColor(150,150,150)
                doc.cell(40,40,50,20,"prub")










                doc.output('pdfobjectnewwindow');
                // doc.text("Aló esta es una pruba", 10, 10);
                // let header = ["id","name"];
                // let headerConfig = header.map(key=>({ 
                //     'name': key,
                //     'prompt': key,
                //     'width':50,
                //     'align':'center',
                //     'padding':0}));
                // let tbl1 = [{id: 1, name: "Prubas"},
                //             {id: 2, name: "Otra"},
                //             {id: 3, name: "De nuv"}
                // ]
                // doc.table(20,30,tbl1,headerConfig);
                // doc.save(pdfName + '.pdf');
            }     
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