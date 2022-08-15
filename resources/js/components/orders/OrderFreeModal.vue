<template>
    <v-row justify="center">
        <v-dialog
            v-model="orderFreeM"
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
                        style="font-size: 20px;"
                    >
                        <v-tabs
                        v-model="tab"
                        background-color="transparent"
                        color="basil"
                        grow
                        >
                            <v-tab>
                                <v-icon left>mdi-lock-open-outline</v-icon> Libera pedido
                            </v-tab>
                            <v-tab v-on:click="freeDetail">
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
                        style="font-size: 20px;"
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
                    <v-card-text class="cot-text-info">
                        <v-row>
                            <v-col 
                                xs="12"
                                sm="12"
                                md="4"
                                lg="4"
                                xl="4"
                                style="font-size: 16px;"
                                class="pl-3 pr-0 pb-3 pt-3 ma-0  "
                            >
                                <v-icon left>mdi-clipboard-text-outline</v-icon> Pedido: {{ detOrder.no_ped }}
                            </v-col>
                            <v-col 
                                xs="12"
                                sm="12"
                                md="4"
                                lg="4"
                                xl="4"
                                style="font-size: 16px;"
                                class="pl-0 pr-0 pb-3 pt-3 ma-0  "
                            >
                                <v-icon left>mdi-briefcase-account-outline</v-icon> Cliente: {{ detOrder.nom_cte }}
                            </v-col>
                            <v-col 
                                xs="12"
                                sm="12"
                                md="4"
                                lg="4"
                                xl="4"
                                style="font-size: 16px;"
                                class="pl-0 pr-0 pb-3 pt-3 ma-0  "
                            >
                                <v-icon left>mdi-account-tie</v-icon> Agente: {{ detOrder.nom_age }}
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col 
                                xs="12"
                                sm="12"
                                md="4"
                                lg="4"
                                xl="4"
                                style="font-size: 16px;"
                                class="pl-3 pr-0 pb-3 pt-3 ma-0 "
                            >
                                <v-icon left>mdi-chart-timeline-variant</v-icon>Estatus: &nbsp;
                                <v-chip
                                    close-icon="mdi-close-outline"
                                    color = "red"
                                    outlined
                                >
                                    {{ detOrder.status }}
                                </v-chip>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-text class="text-success bg-light mb-5">
                        <v-row>
                            <v-col cols="12" class="col-price">
                                <div class="total-cotizacion"> Subtotal: </div>
                                <div class="data_price_cot"> $ {{ subOrd.toLocaleString('en-US') }} </div>
                                <div class="total-cotizacion"> Iva: </div>
                                <div class="data_price_cot"> $ {{ ivaOrd.toLocaleString('en-US') }}  </div>
                                <div class="total-cotizacion"> Total: </div>
                                <div class="data_price_cot"> $ {{ totOrd.toLocaleString('en-US') }} </div>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-text class="cot-text-info">
                        <v-row>
                            <v-col 
                                xs="12"
                                sm="12"
                                md="3"
                                lg="3"
                                xl="3"
                            >
                                <v-select
                                    v-model="selParcial"
                                    :items="idParcial"
                                    item-text="identify"
                                    item-value="id"
                                    label="Parcial"
                                    hint="¿Deseas parcializarlo?"
                                    @change="chgParcial()"
                                    outlined
                                    dense
                                    :disabled="disFree"
                                ></v-select>
                            </v-col>
                            <v-col 
                                xs="12"
                                sm="12"
                                md="8"
                                lg="8"
                                xl="8"
                            >
                                <v-autocomplete
                                    v-model="selectC"
                                    :items="gridCate"
                                    chips
                                    color="blue-grey lighten-2"
                                    label="Grupos"
                                    item-text="module"
                                    item-value="id"
                                    multiple
                                    outlined
                                    :disabled="disParcial"
                                >
                                    <template v-slot:selection="data">
                                        <v-chip
                                            v-bind="data.attrs"
                                            :input-value="data.selected"
                                            @click="data.select"
                                            :color="data.item.color"
                                        >
                                            <v-avatar left>
                                                <v-icon > {{ data.item.icon }}</v-icon>
                                            </v-avatar>
                                            {{ data.item.category }}
                                        </v-chip>
                                    </template>    
                                    <template v-slot:item="data" @click="Selectec">
                                        <template v-if= " typeof data.item !== 'object' ">
                                            <v-list-item-content v-text="data.item"></v-list-item-content>
                                        </template>
                                        <template v-else>
                                            <v-icon class="pr-2">
                                                {{ data.item.icon }}
                                            </v-icon>
                                            <v-list-item-content>
                                                <v-list-item-title v-html="data.item.category"></v-list-item-title>
                                            </v-list-item-content>
                                        </template>
                                    </template>
                                </v-autocomplete>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col 
                                xs="12"
                                sm="12"
                                md="3"
                                lg="3"
                                xl="3"
                            >
                                <v-select
                                    v-model="selDelivery"
                                    :items="deliOrder"
                                    item-text="delivery_type"
                                    item-value="id"
                                    label="Tipo entrega"
                                    hint="¿Cómo deseas que sea la entrega?"
                                    @change="chgDeli()"
                                    outlined
                                    dense
                                    :disabled="disFree"
                                ></v-select>
                            </v-col>
                            <v-col  
                                xs="12" 
                                sm="12" 
                                md="8"
                                lg="8"
                                xl="8"
                                v-if="disDeli"
                            >
                                <v-text-field
                                    v-model="contact"
                                    label="Nombre completo"
                                    hint="Quien recibe el paquete"
                                    persistent-hint
                                    dense
                                    autocomplete="off"
                                    outlined
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col 
                                xs="12"
                                sm="12"
                                md="11"
                                lg="11"
                                xl="11"
                                v-if="disDeli"
                            >
                                <v-select
                                    v-model="selDestiny"
                                    :items="destiny"
                                    item-text="adrss"
                                    item-value="id"
                                    label="Destino"
                                    hint="Dirección a donde se enviará el pedido"
                                    persistent-hint
                                    outlined
                                    dense
                                    @change="chgDestiny()"
                                ></v-select>
                            </v-col>
                        </v-row>
                        <v-card
                            v-if="disDestiny"
                            elevation="10"
                            class="mb-4"
                        >
                            <v-row
                                class="p-4" 
                            >
                                <!-- 
                                    :error-messages="quantityErrors"
                                    @input="$v.FQuantity.$touch()"
                                -->
                                <v-col  
                                    xs="12" 
                                    sm="12" 
                                    md="3"
                                    lg="3"
                                    xl="3" 
                                >
                                    <v-text-field
                                        v-model="street"
                                        label="Calle"
                                        dense
                                        autocomplete="off"
                                        outlined
                                    ></v-text-field>
                                </v-col>
                                <v-col  
                                    xs="12" 
                                    sm="12" 
                                    md="3"
                                    lg="3"
                                    xl="3" 
                                >
                                    <v-text-field
                                        v-model="extNum"
                                        label="Número exterior"
                                        dense
                                        autocomplete="off"
                                        outlined
                                    ></v-text-field>
                                </v-col>
                                <v-col  
                                    xs="12" 
                                    sm="12" 
                                    md="3"
                                    lg="3"
                                    xl="3" 
                                >
                                    <v-text-field
                                        v-model="intNum"
                                        label="Número interior"
                                        dense
                                        autocomplete="off"
                                        outlined
                                    ></v-text-field>
                                </v-col>
                                <v-col  
                                    xs="12" 
                                    sm="12" 
                                    md="3"
                                    lg="3"
                                    xl="3" 
                                >
                                    <v-text-field
                                        v-model="cp"
                                        label="CP"
                                        hint="Código postal"
                                        persistent-hint
                                        dense
                                        autocomplete="off"
                                        outlined
                                    ></v-text-field>
                                </v-col>
                            </v-row> 
                            <v-row
                                class="p-4" 
                            >
                                <v-col  
                                    xs="12" 
                                    sm="12" 
                                    md="3"
                                    lg="3"
                                    xl="3" 
                                >
                                    <v-text-field
                                        v-model="suburb"
                                        label="Colonia"
                                        dense
                                        autocomplete="off"
                                        outlined
                                    ></v-text-field>
                                </v-col>
                                <v-col  
                                    xs="12" 
                                    sm="12" 
                                    md="3"
                                    lg="3"
                                    xl="3" 
                                >
                                    <v-text-field
                                        v-model="city"
                                        label="Ciudad"
                                        dense
                                        autocomplete="off"
                                        outlined
                                    ></v-text-field>
                                </v-col>
                                <v-col  
                                    xs="12" 
                                    sm="12" 
                                    md="3"
                                    lg="3"
                                    xl="3" 
                                >
                                    <v-text-field
                                        v-model="state"
                                        label="Estado"
                                        dense
                                        autocomplete="off"
                                        outlined
                                    ></v-text-field>
                                </v-col>
                                <v-col  
                                    xs="12" 
                                    sm="12" 
                                    md="3"
                                    lg="3"
                                    xl="3" 
                                >
                                    <v-text-field
                                        v-model="phone"
                                        label="Teléfono"
                                        dense
                                        autocomplete="off"
                                        outlined
                                    ></v-text-field>
                                </v-col>
                            </v-row> 
                        </v-card>
                        <v-row v-if="disDeli2">
                            <v-col 
                                xs="12"
                                sm="12"
                                md="3"
                                lg="3"
                                xl="3"
                            >
                                <v-select
                                    v-model="selBoard"
                                    :items="boardOrder"
                                    item-text="boarding_type"
                                    item-value="id"
                                    label="Tipo embarque"
                                    hint="Elige el tipo de embarque"
                                    outlined
                                    dense
                                ></v-select>
                            </v-col>
                            <v-col 
                                xs="12"
                                sm="12"
                                md="3"
                                lg="3"
                                xl="3"
                            >
                                <v-select
                                    v-model="selDeliCo"
                                    :items="deliCo"
                                    item-text="companie"
                                    item-value="id"
                                    label="Fletera"
                                    hint="Elige la fletera deseada"
                                    outlined
                                    dense
                                ></v-select>
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
                                <v-textarea
                                    v-model="coment"
                                    name="input-7-1"
                                    label="Comentario"
                                    hint="Información adicional del pedido"
                                ></v-textarea>
                                    <!-- :error-messages="descriptionErrors" -->
                            </v-col>
                            <v-col
                                xs="12"
                                sm="12"
                                md="4"
                                lg="4"
                                xl="4" 
                                class="pa-1 ma-0 align-self-center"
                            >
                                <v-btn 
                                    block 
                                    @click="libera()"
                                    :disabled='disFree'
                                >
                                    <v-icon
                                    left
                                    dark
                                    color="green darken-1"
                                    >
                                        mdi-lock-open-outline
                                    </v-icon>
                                    Liberar
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-tab-item>
                <v-tab-item>
                    <v-card-text class="cot-text-info" 
                        v-for="detf in freedet"
                        :key="detf.id"
                    >
                        <v-row>
                            <v-col 
                                xs="12"
                                sm="12"
                                md="3"
                                lg="3"
                                xl="3"
                                style="font-size: 16px;"
                                class="pl-3 pr-0 pb-3 pt-3 ma-0  "
                            >
                                <v-icon left>mdi-clipboard-check-multiple-outline</v-icon> Liberación: {{ detf.id }}
                            </v-col>
                            <v-col 
                                xs="12"
                                sm="12"
                                md="9"
                                lg="9"
                                xl="9"
                                style="font-size: 13px;"
                                class="pl-0 pr-0 pb-3 pt-3 ma-0  "
                            >
                                <v-icon left>mdi-ballot-outline</v-icon> Grupos: 
                                <v-chip
                                    v-for="group in detf.arrGroups"
                                    :key="group.id"
                                    :color = "group.color"
                                    class="ma-2"
                                    text-color="blue-grey darken-4"
                                >
                                    <v-icon left>
                                        {{ group.icon }}
                                    </v-icon>
                                    {{ group.category }}
                                </v-chip>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col 
                                md="3"
                                lg="3"
                                xl="3"
                                style="font-size: 13px;"
                                class="pl-3 pr-0 pb-3 pt-3 ma-0  "
                            ></v-col>
                            <v-col 
                                xs="12"
                                sm="12"
                                md="3"
                                lg="3"
                                xl="3"
                                style="font-size: 13px;"
                                class="pl-0 pr-0 pb-3 pt-3 ma-0  "
                            >
                            <!-- dolly  mdi-share-outline    -->
                            <!-- map-marker-radius-outline  map-marker-account-outline-->
                            <!-- truck-cargo-container  truck-fast-outline -->
                                <v-icon left>mdi-dolly</v-icon> Tipo entrega: {{ detf.deli }}
                            </v-col>
                            <v-col 
                                xs="12"
                                sm="12"
                                md="6"
                                lg="6"
                                xl="6"
                                style="font-size: 13px;"
                                class="pl-0 pr-0 pb-3 pt-3 ma-0  "
                            >
                                <v-icon left>mdi-map-marker-radius-outline</v-icon> Destino: {{ detf.destiny }}
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col 
                                md="3"
                                lg="3"
                                xl="3"
                                style="font-size: 13px;"
                                class="pl-3 pr-0 pb-3 pt-3 ma-0  "
                            ></v-col>
                            <v-col 
                                xs="12"
                                sm="12"
                                md="3"
                                lg="3"
                                xl="3"
                                style="font-size: 13px;"
                                class="pl-0 pr-0 pb-3 pt-3 ma-0  "
                            >
                                <v-icon left>mdi-card-bulleted-outline</v-icon> Tipo embarque: {{ detf.board }}
                            </v-col>
                            <v-col 
                                xs="12"
                                sm="12"
                                md="3"
                                lg="3"
                                xl="3"
                                style="font-size: 13px;"
                                class="pl-0 pr-0 pb-3 pt-3 ma-0  "
                            >
                                <v-icon left>mdi-truck-fast-outline</v-icon> fletera: {{ detf.deliserv }}
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col 
                                md="3"
                                lg="3"
                                xl="3"
                                style="font-size: 13px;"
                                class="pl-3 pr-0 pb-3 pt-3 ma-0  "
                            ></v-col>
                            <v-col 
                                xs="12"
                                sm="12"
                                md="6"
                                lg="6"
                                xl="6"
                                style="font-size: 13px;"
                                class="pl-0 pr-0 pb-3 pt-3 ma-0  "
                            >
                                <v-icon left>mdi-comment-processing-outline</v-icon> Comentario: {{ detf.coment }}
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-divider></v-divider>
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
                idParcial: [
                    { id:0,identify:'No' },
                    { id:1,identify:'Si' }
                ],
                selectParcial:0,
                disParcial: true,
                disDeli: false,
                disDeli2: false,
                disDestiny: false,
                chkClient: true,
                selParcial: '',
                selDelivery: '',
                selBoard: '',
                selDeliCo: '',
                selDestiny: '',
                contact: '',
                street: '',
                extNum: '',
                intNum: '',
                cp: '',
                suburb: '',
                city: '',
                state: '',
                phone: '',
                boardOrder:[],
                deliOrder: [],
                deliCo: [],
                destiny: [],
                selectC: '',
                coment: '',
                freedet: [],
                checked: true,
                label: "On",
                active: 1,
                dataOn: "On",
                dataOff: "Off"
            }
        },
        computed: {
            ...mapGetters({
                getUserApi: 'auth/getUserApi',
                orderFreeM: 'modals/getOrderFreeModal',
                detOrder: 'dord/getDetOrder',
                subOrd: 'dord/getSubOrd',
                ivaOrd: 'dord/getIvaOrd',
                totOrd: 'dord/getTotOrd',
                gridCate: 'dord/getcateFree',
                selCate: 'dord/getSelCate',
                dataOrder:'dord/getDataOrder',
                disFree: 'dord/getDisFree'
            }),
        },
        // beforeCreate(){
        // },
        created(){
        },
        methods: {

            async closeModal() {
                var payload = {
                    name_modal:  'orderFree', // modal 
                    state_modal: false,
                    id: 0
                }
                await this.$store.dispatch('modals/IdentifyModal',payload);
            },

            chgParcial(){
                if(this.selParcial == 1){
                    this.disParcial = false
                } else{
                    this.disParcial = true
                    this.selectC = this.selCate
                }
            },

            async chgDeli(){
                if(this.selDelivery !== 3){
                    this.disDeli = true
                    this.disDeli2 = false
                    this.contact = this.detOrder.nom_cte
                    var payload = {
                        token: this.getUserApi.token,
                        cveCte: this.detOrder.cve_cte
                    }
                    const res = await this.$store.dispatch('dord/address',payload); 
                    if(res.success){
                        if(res.flg == 0){
                            if(res.address.length == 1){
                                this.selDestiny = res.address[0].id
                            }
                            this.destiny = res.address
                        } else{
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Cliente no dado de alta en la web.',
                            })
                        }
                    }
                    if(this.selDelivery == 1){
                        this.disDeli2 = true                         
                    }
                } else{
                    this.disDeli = false
                    this.disDeli2 = false 
                    this.disDestiny = false
                    this.selDestiny = ''
                }
            },

            async deliBoard(){
                var payload = {
                    token: this.getUserApi.token
                }
                const data = await this.$store.dispatch('dord/getDeliBoard',payload);
                this.deliOrder = data.deliveryType
                this.deliCo = data.deliveryComp
                this.boardOrder = data.boardType
            },

            async libera(){
                let payload = {
                    token: this.getUserApi.token,
                    user_id: this.getUserApi.uid,
                    no_ped: this.detOrder.no_ped,
                    clientId: this.detOrder.cve_cte,
                    agentId: this.detOrder.cve_age,
                    tot: this.totOrd,
                    subtot: this.subOrd,
                    iva: this.ivaOrd,
                    gridDO: this.dataOrder,
                    selectC: this.selectC,
                    selDelivery: this.selDelivery,
                    selDestiny: this.selDestiny,
                    selBoard: this.selBoard,
                    selDeliCo: this.selDeliCo,
                    coment: this.coment,
                    contact: this.contact,
                    street: this.street,
                    extNum: this.extNum,
                    intNum: this.intNum,
                    cp: this.cp,
                    suburb: this.suburb,
                    city: this.city,
                    state: this.state,
                    phone: this.phone
                }
                const res = await socketClientEmit.freeOrderEmit(payload)
                if(res.success){
                    let payload2 = {
                        token: this.getUserApi.token,
                        user_id: this.getUserApi.uid,
                        no_ped: res.no_ped
                    }
                    const res2 = await socketClientEmit.valFreeOrderEmit(payload2)




                    let iconToast = 'success'
                    let msjToast = '¡El pedido ha sido liberado!'
                    let positionToast = 'bottom-end'
                    let timerToast = 3000
                    const SAToastsVar = new SAToasts(iconToast,msjToast,positionToast,timerToast)
                    SAToastsVar.getToast()
                }
            },

            async freeDetail(){
                let payload = {
                    token: this.getUserApi.token,
                    user_id: this.getUserApi.uid,
                    orderId: this.detOrder.orderId
                }
                const res = await this.$store.dispatch('dord/freeDetail',payload);
                if(res.success){
                    this.freedet = res.arrFree
                }
            },

            chgDestiny(){
                var arr = this.destiny.find(this.findDestiny)
                if(this.selDestiny == 0){
                    this.disDestiny = true
                } else{
                    this.disDestiny = false
                    this.contact = arr.contact
                }
            },
            findDestiny(dest){
                return dest.id === this.selDestiny
            },
        },
        mounted(){
            this.deliBoard()
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
    .total-cotizacion {
        font-size: 15px;
        font-weight: 400;
        padding-top: 3px;
        color: green;
    }

</style>