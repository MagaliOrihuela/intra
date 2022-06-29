<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialogDetailCotizaciones"
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
                        style="font-size: 20px;"
                    >
                        <v-tabs
                        v-model="tab"
                        background-color="transparent"
                        color="basil"
                        grow
                        >
                            <v-tab>
                                <v-icon left>mdi-clipboard-text-outline</v-icon> Cotizacion
                            </v-tab>
                            <v-tab>
                                <v-icon left>mdi-clipboard-text-search-outline</v-icon> Detalle Cotizacion
                            </v-tab>
                        </v-tabs>
                    </v-col>
                    <v-col 
                        xs="12"
                        sm="12"
                        md="6"
                        lg="6"
                        xl="6"
                        style="font-size: 20px;"
                    >
                        <v-btn
                            color="green darken-1"
                            text
                            @click="closeDetailCotizacion()"
                            class="float-right"
                        >
                            <v-icon left>mdi-close</v-icon> Cerrar
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card-text>

            <v-tabs-items v-model="tab">
                <v-tab-item>

                    <v-card-text class="cot-text-info">
                        <v-row>
                            <v-col 
                                xs="12"
                                sm="12"
                                md="3"
                                lg="3"
                                xl="3"
                                style="font-size: 20px;"
                                class="pl-3 pr-0 pb-3 pt-3 ma-0  "
                            >
                                <v-icon left> mdi-clipboard-text-search-outline </v-icon> Cotizacion No: {{ cotizacion_id }}
                            </v-col>
                            <v-col 
                                xs="12"
                                sm="12"
                                md="3"
                                lg="3"
                                xl="3"
                                style="font-size: 20px;"
                                class="pl-0 pr-0 pb-3 pt-3 ma-0  "
                            >
                                <v-icon left> mdi-briefcase-account-outline </v-icon> Cliente:  {{ itemparts.cNameClient }}
                            </v-col>
                            <v-col 
                                xs="12"
                                sm="12"
                                md="4"
                                lg="4"
                                xl="4"
                                style="font-size: 20px;"
                                class="pl-0 pr-0 pb-3 pt-3 ma-0  "
                            >
                                <v-icon left> mdi-account-tie </v-icon> Agente:  {{ itemparts.cNameAgent }}
                            </v-col>
                            <v-col 
                                xs="12"
                                sm="12"
                                md="2"
                                lg="2"
                                xl="2"
                                style="font-size: 20px;"
                                class="pl-0 pr-0 pb-3 pt-3 ma-0  "
                            >
                                <v-icon left> mdi-label-percent-outline </v-icon> Descuento:  {{ itemparts.cDesc1 }}%
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <!-- <div ref='pruba'>
                        <p>Esta es una prueba de impresion</p>
                    </div> -->
                    <!-- cot-text-info backgrond-info -->
                    <v-card-text class="text-success bg-light mb-5">
                        <v-row>
                            <v-col cols="3" class="col-days">
                                    <div class="info_price_cot">Dias de vida de la cotizacion:</div> <div class="data_price_cot">{{ itemparts.days }}</div>
                            </v-col>
                            <v-col cols="3">
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn
                                            fab 
                                            :elevation="3"
                                            max-width="28px"
                                            max-height="28px"
                                            v-bind="attrs"
                                            v-on="on"
                                            @click="PDFexport()">
                                            <v-icon size="28px" color="red">mdi-file-pdf-outline</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>PDF</span>
                                </v-tooltip>
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn
                                            fab 
                                            :elevation="3"
                                            max-width="28px"
                                            max-height="28px"
                                            v-bind="attrs"
                                            v-on="on" 
                                            @click = "emailPDF()">
                                            <v-icon size="25px" >mdi-email-send-outline</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>enviar</span>
                                </v-tooltip>
                            </v-col>
                            <v-col cols="6" class="col-price">
                                    <div class="info_price_cot"> Subtotal: </div>
                                    <div class="data_price_cot"> $ {{ itemparts.sumSubt }} </div>
                                    <div class="info_price_cot"> Iva: </div>
                                    <div class="data_price_cot"> $ {{ itemparts.sumDesc }} </div>
                                    <div class="info_price_cot"> Total: </div>
                                    <div class="data_price_cot"> $ {{ itemparts.totIva }} </div>
                        </v-col>
                        </v-row>
                    </v-card-text>

                    <!-- sort-by="entry_id" -->
                    <div ref="pruba">
                        <v-data-table
                        :headers="headers"
                        :items="itemparts.gridpCot"
                        :page.sync="page"
                        :items-per-page="itemsPerPage"
                        hide-default-footer
                        class="elevation-0 overflow-y-auto"
                        @page-count="pageCount = $event"
                        scroll.sync="scrollSync"
                        loading-text="Cargando Articulos ..."
                        >
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
                </v-tab-item>
                
                <v-tab-item>

                    <v-container class="backgrond-detail">
                        <v-row>
                            <v-col
                                xs="12"
                                sm="12"
                                md="4"
                                lg="4"
                                xl="4"
                            >
                                <div class="header-detail-cotizacion"> <v-icon> mdi-image-filter-center-focus-weak </v-icon> Referencia: </div><div class="pl-7"> {{ dataCotizacion.reference }} </div>
                            </v-col>
                            <v-col
                                xs="12"
                                sm="12"
                                md="4"
                                lg="4"
                                xl="4"
                            >
                                <div class="header-detail-cotizacion"><v-icon> mdi-credit-card-outline </v-icon> Forma de pago:</div><div class="pl-7"> {{ dataCotizacion.payment_method }} </div>
                            </v-col>
                            <v-col
                                xs="12"
                                sm="12"
                                md="4"
                                lg="4"
                                xl="4"
                            >
                                <div class="header-detail-cotizacion"><v-icon> mdi-numeric </v-icon> Numero de Cuenta:</div><div class="pl-7"> {{ dataCotizacion.account_number }} </div>
                            </v-col>
                            <v-col
                                xs="12"
                                sm="12"
                                md="4"
                                lg="4"
                                xl="4"
                            >
                                <div class="header-detail-cotizacion"><v-icon> mdi-unfold-more-vertical </v-icon> CFDI:</div><div class="pl-7"> {{ dataCotizacion.cfdi_name }} </div>
                            </v-col>
                            <v-col
                                xs="12"
                                sm="12"
                                md="4"
                                lg="4"
                                xl="4"
                            >
                                <div class="header-detail-cotizacion"><v-icon> mdi-truck-delivery-outline </v-icon> Tipo de entrega:</div><div class="pl-7"> {{ dataCotizacion.delivery_type }} </div>
                            </v-col>
                            <v-col
                                v-if="dataCotizacion.delivery_type_id == 1"
                                xs="12"
                                sm="12"
                                md="4"
                                lg="4"
                                xl="4"
                            >
                                <div class="header-detail-cotizacion"><v-icon> mdi-wallet-membership </v-icon> Tipo de embarque:</div><div class="pl-7"> {{ dataCotizacion.boarding_type }} </div>
                            </v-col>
                            <v-col
                                v-if="dataCotizacion.delivery_type_id == 1"
                                xs="12"
                                sm="12"
                                md="4"
                                lg="4"
                                xl="4"
                            >
                                <div class="header-detail-cotizacion"><v-icon> mdi-truck-fast-outline </v-icon> Paqueteria:</div> <div class="pl-7"> {{ dataCotizacion.companie }} </div>
                            </v-col>
                            <v-col
                                v-if="dataCotizacion.delivery_type_id == 1 || dataCotizacion.delivery_type_id == 3"
                                xs="12"
                                sm="12"
                                md="4"
                                lg="4"
                                xl="4"
                            >
                                <div class="header-detail-cotizacion"><v-icon> mdi-send-outline </v-icon> Envío:</div><div class="pl-7"> {{ dataCotizacion.label }} </div>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col
                                v-if="dataCotizacion.delivery_type_id == 1 || dataCotizacion.delivery_type_id == 3"
                                xs="12"
                                sm="12"
                                md="12"
                                lg="12"
                                xl="12"
                            >
                                <div class="header-detail-cotizacion"><v-icon> mdi-map-marker-outline </v-icon> Dirección:</div><div class="pl-7"> {{ dataCotizacion.address_line }}, {{ dataCotizacion.n_ext }}, {{ dataCotizacion.n_int }}, CP: {{ dataCotizacion.cp }}, Colonia: {{ dataCotizacion.suburb }}, {{ dataCotizacion.city }}, {{ dataCotizacion.state }}, {{ dataCotizacion.city }}  </div>
                            </v-col>
                        </v-row>
                    </v-container>
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
                        value: 'entry_id',
                    },
                    { text: 'Articulo', value: 'article' },
                    { text: 'Categoria', value: 'category' },
                    { text: 'Cantidad', value: 'quantity' },
                    { text: 'Unidad', value: 'unit' },
                    { text: 'Precio', value: 'price' },
                    { text: 'Subtotal', value: 'subt' },
                    { text: 'Desc', value: 'desc' },
                ],
                
            }
        },
        methods: {

            async closeDetailCotizacion() {

                var payload = {
                    name_modal:  'detailCotizacion', // modal 
                    state_modal: false,
                    id: 0
                }
                await this.$store.dispatch('modals/IdentifyModal',payload);
            },
            
            // genera el pdf para su visualización
            PDFexport(){
                let pdfRef = this.$refs.pruba;

                html2canvas(pdfRef,{imageTimeout: 5000, useCORS: true}).then(canvas => {
                    let pdf = canvas.toDataURL("image/jpeg");
                    let doc = new jsPDF("p", "mm", "a4");
                    var width = doc.internal.pageSize.getWidth();
                    var height = doc.internal.pageSize.getHeight();
                    doc.setProperties({
                        title: 'Cotizacion'
                    });
                    doc.addImage(pdf, 'PNG', 10, 10, width-20, height-100);
                    window.open(doc.output('bloburl'))
                })
                                

                // var canvasElement = document.createElement('canvas');
                // html2canvas(this.$refs.pruba, { canvas: canvasElement 
                // }).then(function (canvas) {
                // const img = canvas.toDataURL("image/jpeg", 0.8);
                // doc.addImage(img,'JPEG',10,10);
                // doc.save("sample.pdf");
                // });

                // window.open(doc.output('bloburl'))
            },

            async emailPDF(){
                const doc = new jsPDF();
                doc.text('Definir el formato del PDF...',10,10);
                doc.setProperties({
                    title: 'Cotizacion'
                });
                var prub = doc.output('datauristring');
                var payload={
                    token: this.getUserApi.token,
                    pdf: prub 
                }
                const pruba = await this.$store.dispatch('ecot/pruba',payload); 
            }

        },
        computed: {
            ...mapGetters({
                getUserApi: 'auth/getUserApi',
                dialogDetailCotizaciones: 'modals/getDetailCotModal',
                cotizacion_id: 'modals/getCotIdModal',
                itemparts: 'ecot/getItemPartsCotizacion',
                dataCotizacion: 'ecot/getDetailsCotizacion',
            }),
        },
    }
</script>
<style scoped>

    .col-price {
        display:flex;
        justify-content:flex-end;
        align-items:center;
    }

    .col-days {
        display:flex;
        justify-content:flex-start;
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

    .header-detail-cotizacion {
        font-weight: 500;
        font-size: 20px;
    }

    .backgrond-info {
        background-color: #d2ffb9;
    }

    .backgrond-detail {
        background-color: #d2ffb9;
        margin-bottom: 40px;
    }

</style>