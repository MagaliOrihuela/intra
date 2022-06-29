<template>
    <div>
        <v-card
            max-width="100%"
            class="mb-10"
            elevation="0"
        >
            <v-card-title style="position:relative">
                <div>
                    <v-icon color="red">mdi-menu-right</v-icon>
                    Facturas por liberar
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
                <v-data-table
                    :headers="headers"
                    :items="invoices"
                    :items-per-page="5"
                    class="elevation-0 "
                    style="width: 100%;"
                    hide-default-footer
                    :search="search"
                >
                    <template #[`item.total_fac`]="{ item }">
                            $ {{ item.total_fac }}
                    </template>
                    <template #[`item.options`]="{ item }">
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                    color="shades_four"
                                    :to=item.view
                                    icon
                                    v-bind="attrs"
                                    v-on="on"
                                    @click="releaseInvoiceData(item.invoice_id)"
                                >
                                    <v-icon>mdi-file-check-outline</v-icon>
                                </v-btn>
                            </template>
                            <span>Liberar {{ item.invoice }}</span>
                        </v-tooltip>
                        <v-tooltip bottom v-if="item.file">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn 
                                    color="red"
                                    icon
                                    v-bind="attrs"
                                    v-on="on"
                                    @click="viewInvoice(item.invoice_id)"
                                >
                                    <v-icon>mdi-file-search-outline</v-icon>
                                </v-btn>
                            </template>
                            <span>Ver {{ item.invoice }}</span>
                        </v-tooltip>
                    </template>
                </v-data-table>
            </v-card-actions>
        </v-card>

        <!-- MODAL LIBERAR FACTURA -->

        <v-row justify="center">
            <v-dialog
                v-model="dialogReleaseInvoice"
                persistent
                max-width="500"
            >
                <v-card>
                    <v-toolbar
                        dark
                        color="shades_three"
                        dense
                    >
                        <v-toolbar-title class="invoice-dialog-title">Liberación de factura - {{ invoiceSelected.invoice }}</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn
                            icon
                            dark
                            @click="dialogReleaseInvoice = false"
                        >
                            <v-icon size="18px">mdi-close</v-icon>
                        </v-btn>
                    </v-toolbar>
                    <v-card-text class="px-2 pt-2">
                        <v-container fluid>
                            <v-row dense class="row-info">
                                <v-col cols="2" class="card-text-header">Status: </v-col>
                                <v-col cols="2">{{ invoiceSelected.status_fac }}</v-col>
                                <v-col cols="2" class="card-text-header">Agente: </v-col>
                                <v-col cols="1">{{ invoiceSelected.nom_age }}</v-col>
                                <v-col cols="2" class="card-text-header">Total: </v-col>
                                <v-col cols="3">$ {{ invoiceSelected.total_fac }}</v-col>
                            </v-row>
                            <v-row dense class="row-info">
                                <v-col cols="2" class="card-text-header">ID Cliente: </v-col>
                                <v-col cols="1">{{ invoiceSelected.cve_cte }}</v-col>
                                <v-col cols="2" class="card-text-header">Nombre: </v-col>
                                <v-col cols="7">{{ invoiceSelected.nom_cte }}</v-col>
                            </v-row>
                            <v-row class="pt-6" dense>
                                <v-col cols="4" class="card-text-header pt-3">
                                    Tipo de entrega:
                                </v-col>
                                <v-col cols="8">
                                    <v-select
                                        v-model="DdeliveryTypes"
                                        :items="deliveryTypes"
                                        @change="deliveryTypesSelected()"
                                        item-value="id"
                                        item-text="delivery_type"
                                        no-data-text="datos no disponibles"
                                        solo
                                        :error-messages="deliveryTypeErrors"
                                        @input="$v.DdeliveryTypes.$touch()"
                                        dense
                                    ></v-select>
                                </v-col>
                            </v-row>
                            <v-row dense v-if="validShipping">
                                <v-col cols="4" class="card-text-header pt-3">
                                    Dirección de entrega:
                                    <!-- <v-btn
                                        icon
                                        small
                                        color="green"
                                    >
                                        <v-icon>mdi-plus</v-icon>
                                    </v-btn> -->
                                </v-col>
                                <v-col cols="8">
                                    <v-select
                                        v-model="DshippingAddress"
                                        :items="shippingAddress"
                                        item-value="id"
                                        item-text="label"
                                        no-data-text="No contiene direcciones"
                                        solo
                                        @change="getshippingAddress()"
                                        :error-messages="shippingAddressErrors"
                                        @input="$v.DshippingAddress.$touch()"
                                        dense
                                    ></v-select> 
                                </v-col>
                                <v-col cols="12" class="sa-text-header pb-4" v-if="resultSA">
                                    <b class="card-text-header">Dirección:</b> {{ resultSA }}
                                </v-col>
                            </v-row>
                            <v-row dense v-if="validReception">
                                <v-col cols="4" class="card-text-header pt-3">Tipo de embarque: </v-col>
                                <v-col cols="8">
                                    <v-select
                                        v-model="DboardingType"
                                        :items="boardingType"
                                        item-value="id"
                                        item-text="boarding_type"
                                        no-data-text="datos no disponibles"
                                        solo
                                        :error-messages="boardingTypeErrors"
                                        @input="$v.DboardingType.$touch()"
                                        dense
                                    ></v-select>
                                </v-col>
                            </v-row>
                            <v-row dense v-if="validReception">
                                <v-col cols="4" class="card-text-header pt-3">Paquetería: </v-col>
                                <v-col cols="8">
                                    <v-select
                                        v-model="DdeliveryServiceCompany"
                                        :items="deliveryServiceCompany"
                                        item-value="id"
                                        item-text="companie"
                                        no-data-text="datos no disponibles"
                                        solo
                                        :error-messages="deliveryServiceCompanyErrors"
                                        @input="$v.DdeliveryServiceCompany.$touch()"
                                        dense
                                    ></v-select>
                                </v-col>
                            </v-row>
                            <v-row dense>
                                <v-col cols="12">
                                    <v-btn 
                                        block
                                        @click="releaseInvoice(invoiceSelected.invoice_id)"
                                    >
                                        <v-icon left color="green">mdi-check-circle-outline</v-icon>
                                        Liberar
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-dialog>
        </v-row>
    </div>
</template>
<script>

    import { validationMixin } from 'vuelidate'
    import { required,requiredIf } from 'vuelidate/lib/validators'
    import SAQuestions from '../../services/SweetAlertQuestion'
    import SAToasts from '../../services/SweetAlertToast'
    import { mapActions, mapGetters } from 'vuex'

    export default {
        data () {
            return {
                search: '',
                dialogReleaseInvoice: false,
                invoiceSelected: [],
                validShipping:false,
                validReception:false,
                headers:
                [
                    {
                        text: 'Factura',
                        align: 'start',
                        value: 'invoice',
                    },
                    { text: 'cliente', value: 'cve_cte' },
                    { text: 'Nombre Cliente', value: 'nom_cte' },
                    { text: 'Agente', value: 'nom_age' },
                    { text: 'Total', value: 'total_fac' },
                    { text: 'Status', value: 'status_fac' },
                    { text: 'Fecha de registro', value: 'registro' },
                    {
                        text: '',
                        sortable: false,
                        value: 'options'
                    }
                ],
                resultSA: '',
                /* INPUTS */
                deliveryTypes: [],
                shippingAddress: [],
                boardingType: [],
                deliveryServiceCompany: [],

                DdeliveryTypes: '',
                DshippingAddress: '',
                DboardingType: '',
                DdeliveryServiceCompany: '',

                FdeliveryTypes: true,
                FshippingAddress: false,
                FboardingType: false,
                FdeliveryServiceCompany: false,


            }
        },
        mixins: [validationMixin],
        validations: {
            DdeliveryTypes: {
                required: requiredIf(function() {
                    return this.FdeliveryTypes;
                })
            },
            DshippingAddress: {
                required: requiredIf(function() {
                    return this.FshippingAddress;
                })
            },
            DboardingType: {
                required: requiredIf(function() {
                    return this.FboardingType;
                })
            },
            DdeliveryServiceCompany: {
                required: requiredIf(function() {
                    return this.FdeliveryServiceCompany;
                })
            },
        },
        methods: {
            async getInvoices() {
                let payload = { 
                    token: this.getUserApi.token,
                    user_id: this.getUserApi.uid
                }
                await this.$store.dispatch('invoices/getInvoices',payload);
            },
            async releaseInvoiceData(invoice_id) {

                this.$v.$reset()
                // Reset Inputs
                this.DdeliveryTypes = ''
                this.DshippingAddress = ''
                this.DboardingType = ''
                this.DdeliveryServiceCompany = ''
                this.resultSA = ''
                this.validShipping = false
                this.validReception = false
                this.FshippingAddress = false
                this.FboardingType = false
                this.FdeliveryServiceCompany = false

                this.invoiceSelected =  this.invoices.find( item => item.invoice_id === invoice_id );
                let payload = { 
                    token: this.getUserApi.token,
                    client_id: this.invoiceSelected.cve_cte,
                }
                const res = await this.$store.dispatch('invoices/getConfigInvoice',payload);
                this.deliveryTypes = res.delivery_type
                this.shippingAddress = res.shipping_address
                this.boardingType = res.boarding_type
                this.deliveryServiceCompany = res.delivery_service_company
                this.dialogReleaseInvoice= true
            },
            deliveryTypesSelected() {
                switch (this.DdeliveryTypes) {
                    case 1:
                        this.validShipping = true
                        this.validReception = true
                        this.FshippingAddress = true
                        this.FboardingType = true
                        this.FdeliveryServiceCompany = true
                    break;
                    case 2:
                        this.validShipping = false
                        this.validReception = false
                        this.FshippingAddress = false
                        this.FboardingType = false
                        this.FdeliveryServiceCompany = false
                    break;
                    case 3:
                        this.validShipping = true
                        this.validReception = false
                        this.FshippingAddress = true
                        this.FboardingType = false
                        this.FdeliveryServiceCompany = false
                    break;
                }
                this.$v.$reset()
            },
            getshippingAddress() {
                var result = this.shippingAddress.find( shipadd => shipadd.id === this.DshippingAddress);
                this.resultSA = result.address_line+' #'+result.n_ext+' '+result.n_ext+', '+result.suburb+', '+result.city+', '+result.state
            },
            async releaseInvoice(invoice_id) {
                this.$v.$touch()
                if (!this.$v.$invalid) {
                    let payload = {
                        token: this.getUserApi.token,
                        invoiceId: invoice_id
                    }
                    await this.$store.dispatch('invoices/releaseInvoice',payload);
                }
            },
            formatPrice(value) {
                let val = (value/1).toFixed(2).replace(',', '.')
                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            },
        },
        computed: {
            ...mapGetters({
                invoices: 'invoices/getInvoicesData',
                getUserApi: 'auth/getUserApi',
            }),
            deliveryTypeErrors(){
                const errors = []
                if (!this.$v.DdeliveryTypes.$dirty) return errors
                !this.$v.DdeliveryTypes.required && errors.push('Necesitas un tipo de entrega.')
                return errors
            },
            shippingAddressErrors(){
                const errors = []
                if (!this.$v.DshippingAddress.$dirty) return errors
                !this.$v.DshippingAddress.required && errors.push('Necesitas una dirección de envío .')
            },
            boardingTypeErrors(){
                const errors = []
                if (!this.$v.DboardingType.$dirty) return errors
                !this.$v.DboardingType.required && errors.push('Necesitas un tipo de embarque.')
                return errors
            },
            deliveryServiceCompanyErrors(){
                const errors = []
                if (!this.$v.DdeliveryServiceCompany.$dirty) return errors
                !this.$v.DdeliveryServiceCompany.required && errors.push('Necesitas una paquetería .')
                return errors
            },
        },
        created() {
            this.getInvoices()
        }
    }
</script>
<style scoped>
    .invoice-dialog-title {
        font-size: 16px;
    }
    .card-text-header {
        text-align: end;
        font-weight: 500;
    }
    .list-header {
        font-size: 12px;
    }
    .list-text {
        font-size: 12px;
    }
    .sa-text-header {
        background-color: #e9e9e9;
        color: black;
        font-size: 12px;
        text-align: center;
        padding: 10px 0px;
        margin-bottom: 10px;
    }
    .row-info {
        background-color: #e9e9e9;
        color: black;
    }
</style>