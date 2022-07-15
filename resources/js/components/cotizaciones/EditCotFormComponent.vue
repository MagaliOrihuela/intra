<template>
   <!-- MODAL asignar nueva cotizacion -->
      <v-row justify="center">
         <v-dialog v-model="editCotModal" fullscreen hide-overlay transition="dialog-bottom-transition" scrollable >
            <v-progress-linear
            :active="loadEditCotModal"
            :indeterminate="loadEditCotModal"
            absolute
            top
            color="red darken-4"
            ></v-progress-linear>
            <v-card >
               <v-toolbar 
                     dark 
                     color="red darken-4">
                     
                  <v-toolbar-items>
                     <v-btn
                        dark
                        text
                        @click="updateCot()"
                        outlined
                     >
                        <v-icon> mdi-swap-vertical-bold </v-icon> &nbsp;&nbsp;Actualizar Cotización 
                     </v-btn>
                  </v-toolbar-items>
                  <v-spacer></v-spacer>
                  <v-toolbar-title>Editar cotización</v-toolbar-title>
                  <v-btn icon dark @click="closeEditCotModal">
                     <v-icon>mdi-close</v-icon>
                  </v-btn>
               </v-toolbar>

               <v-card-text>
                  <v-container fluid>
                  <v-row>
                     <v-col cols="12" sm="7" md="7" class="d-flex">
                        <v-container fluid>
                           <v-row>
                              <v-col cols="12" sm="12" md="12" class="d-flex">
                                 <v-text-field 
                                    v-model="FmodReference"
                                    label="Referencia de cotización *" 
                                    dense
                                    :error-messages="referenceErrors"
                                    @input="$v.FmodReference.$touch()"
                                 ></v-text-field>
                              </v-col>
                              <v-col v-if="isPartner" v-model="isPartner" cols="12" sm="8" md="8" class="d-flex">
                                 <v-autocomplete
                                    v-model="FmodIdNameClients"
                                    :items="clients"
                                    @change="changeClient(2)"
                                    item-value="id"
                                    item-text="full_name"
                                    dense
                                    label="Nombre del cliente"
                                    :error-messages="idNameClientsErrors"
                                    @input="$v.FmodIdNameClients.$touch()"
                                 ></v-autocomplete>
                              </v-col>
                              <v-col v-if="isPartner" v-model="isPartner" cols="12" sm="4" md="4" class="d-flex">
                                 <v-autocomplete
                                    v-model="FmodClients"
                                    :items="clients"
                                    @change="changeClient(1)"
                                    item-value="id"
                                    item-text="id"
                                    dense
                                    label="ID Cliente"
                                    :error-messages="clientsErrors"
                                    @input="$v.FmodClients.$touch()"
                                 ></v-autocomplete>
                              </v-col>
                              <v-col cols="12" sm="8" md="8" class="d-flex">
                                 <v-select
                                    v-model="FmodpaymentMethods"
                                    :items="paymentMethods"
                                    @change="changePayment()"
                                    label="Forma de pago * "
                                    item-value="id"
                                    item-text="payment_method"
                                    no-data-text="datos no disponibles"
                                    dense
                                    :error-messages="paymentMethodsErrors"
                                    @input="$v.FmodpaymentMethods.$touch()"
                                 ></v-select>
                              </v-col>
                              <v-col cols="12" sm="4" md="4" class="d-flex">
                                 <v-text-field
                                    v-model="FmodNoAccount"
                                    label="No. Cuenta *"
                                    hint="Ultimos 4 digitos"
                                    dense
                                    :error-messages="noAccountErrors"
                                    @input="$v.FmodNoAccount.$touch()"
                                    :disabled="isNoAccount"
                                 ></v-text-field>
                              </v-col>
                              <v-col v-if="isFactura" cols="12" sm="8" md="8" class="d-flex pt-0 pb-0">
                                 <v-alert
                                    dense
                                    outlined
                                    type="warning"
                                    style="font-size:12px"
                                 >
                                    Al no requerir factura automáticamente pasa a una compra de mostrador.
                                 </v-alert>
                              </v-col>
                              <v-col v-if="isFactura" v-show="isFactura" cols="12" sm="4" md="4">
                                 <v-select
                                    v-model="FmodFactura"
                                    :items="itemsFact"
                                    label="¿Requieres factura? "
                                    item-value="id"
                                    item-text="text"
                                    dense
                                 ></v-select>
                              </v-col>
                              <v-col cols="12" sm="8" md="8" class="d-flex">
                                 <v-select
                                    v-model="FmodCFDI"
                                    :items="CFDI"
                                    label="Uso de CFDI *"
                                    item-value="id"
                                    item-text="cfdi_name"
                                    no-data-text="datos no disponibles"
                                    dense
                                    :error-messages="cfdiErrors"
                                    @input="$v.FmodCFDI.$touch()"
                                 ></v-select>
                              </v-col>
                              <v-col cols="12" sm="4" md="4" class="d-flex">
                                 <v-select
                                    v-model="FmoddeliveryType"
                                    :items="deliveryType"
                                    label="¿Como entregamos? *"
                                    @change="changeDeliveryTypes()"
                                    item-value="id"
                                    item-text="delivery_type"
                                    no-data-text="datos no disponibles"
                                    dense
                                    :error-messages="deliveryTypeErrors"
                                    @input="$v.FmoddeliveryType.$touch()"
                                    :disabled="isDeliveriType"
                                 ></v-select>
                              </v-col>
                              <v-col cols="12" sm="12" md="12" class="d-flex">
                                 <v-divider></v-divider>
                              </v-col>
                              <v-col cols="12" sm="6" md="6" v-if="isBoarding" v-model="isBoarding" class="d-flex">
                                 <v-select
                                    v-model="FmodboardingType"
                                    :items="boardingType"
                                    label="Tipo de embarque *"
                                    item-value="id"
                                    item-text="boarding_type"
                                    no-data-text="datos no disponibles"
                                    dense
                                    :error-messages="boardingTypeErrors"
                                    @input="$v.FmodboardingType.$touch()"
                                    red
                                 ></v-select>
                              </v-col>
                              <v-col cols="12" sm="6" md="6" v-if="isBoarding" v-model="isBoarding" class="d-flex">
                                 <v-select
                                    v-model="FmodDeliveryServiceCompanies"
                                    :items="deliveryServiceCompanies"
                                    label="Paqueteria *"
                                    item-value="id"
                                    item-text="companie"
                                    no-data-text="datos no disponibles"
                                    dense
                                    :error-messages="deliveryServiceCompaniesErrors"
                                    @input="$v.FmodDeliveryServiceCompanies.$touch()"
                                 ></v-select>
                              </v-col>
                              <v-col cols="12" sm="6" md="6" v-if="isAddress" v-model="isAddress" class="d-flex">
                                 <v-select
                                    v-model="FmodShippingAddress"
                                    :items="shippingAddress"
                                    @change="getshippingAddress()"
                                    label="Dirección de envío *"
                                    item-value="id"
                                    item-text="label"
                                    no-data-text="datos no disponibles"
                                    dense
                                    :error-messages="shippingAddressErrors"
                                    @input="$v.FmodShippingAddress.$touch()"
                                 ></v-select>
                              </v-col>
                              <v-col cols="12" sm="6" md="6" v-if="isAddress" v-model="isAddress" class="d-flex">
                                 <!-- <v-btn block outlined large color="blue lighten-2" dark>
                                    <span class="material-icons"> add_photo_alternate</span>&nbsp;&nbsp;
                                       Nueva Dirección
                                 </v-btn> -->

                                 <v-list
                                    two-line
                                    subheader
                                 >
                                    <v-list-item  three-line>
                                       <v-list-item-content>
                                          <v-list-item-title>Dirección</v-list-item-title>
                                          <v-list-item-subtitle v-model="FmodShippingAddressData">{{ FmodShippingAddressData }}</v-list-item-subtitle>
                                       </v-list-item-content>
                                    </v-list-item>

                                    <v-list-item two-line>
                                       <v-list-item-content class="px-0">
                                          <v-list-item-title>Contacto</v-list-item-title>
                                          <v-list-item-subtitle v-model="FmodShippingAddressContact">{{ FmodShippingAddressContact }}</v-list-item-subtitle>
                                       </v-list-item-content>
                                    </v-list-item>
                                 </v-list>


                              </v-col>
                              <v-col cols="12" sm="12" md="12" class="d-flex">
                                 <v-divider></v-divider>
                              </v-col>
                              <v-col cols="12" sm="12" md="12" class="d-flex">
                                 <v-btn 
                                    block 
                                    large 
                                    color="red darken-4" 
                                    dark
                                    @click="updateCot()"
                                 >
                                    <v-icon> mdi-swap-vertical-bold </v-icon> &nbsp;&nbsp;Actualizar Cotización 
                                 </v-btn>
                              </v-col>
                           </v-row>
                        </v-container>
                     </v-col>
                     <!-- TEXTO DE ESPICIFICACIONES DE PEDIDO -->
                     <v-col cols="12" sm="5" md="5" style="background-color: #f7f7f7;">
                        <v-container>
                           <v-row>
                              <v-col cols="12">
                                 <v-list-item-content>
                                    <p class="font-weight-black text-lg-h6">¿Como entregamos tu pedido?</p>
                                 </v-list-item-content>
                              </v-col>
                              <v-col cols="12">
                                 <v-list-item two-line>
                                    <v-list-item-content>
                                       <v-list-item-title>Por embarque:</v-list-item-title>
                                       <p>  Embarcamos su pedido una vez se termine en producción y el pago sea reflejado, en cualquiera de las paqueterías disponibles. Si el costo del pedido es mayor a $2,500.00 antes de IVA él envió es gratis. De lo contrario hay que agregar un servicio de embarque dependiendo de tu zona. </p>
                                    </v-list-item-content>
                                 </v-list-item>
                                 <v-list-item two-line>
                                    <v-list-item-content>
                                       <v-list-item-title>Recepción (Guadalajara):</v-list-item-title>
                                       <p>  Si eres de Guadalajara y se encuentra cercas de oficinas puedes pasar por tu pedido de lunes a viernes de 9 AM a 6 PM. y sábados de 9 a 1 PM  </p>
                                    </v-list-item-content>
                                 </v-list-item>
                                 <v-list-item two-line>
                                    <v-list-item-content>
                                       <v-list-item-title>Entrega local (Guadalajara):</v-list-item-title>
                                       <p>  Si se encuentra dentro de Guadalajara, contamos con entregas locales en horario de Lunes a viernes de 9 AM a 2 PM. </p>
                                       
                                    </v-list-item-content>
                                 </v-list-item>
                              </v-col>
                              <v-col cols="12">
                                 <v-list-item-content>
                                    <p class="font-weight-black text-lg-h6">Tipos de embarques</p>
                                 </v-list-item-content>
                              </v-col>
                           </v-row>
                        </v-container>
                     </v-col>
                  </v-row>
               </v-container>
               </v-card-text>
         </v-card>
      </v-dialog>
   </v-row>
 
</template>
<script>
  
import { validationMixin } from 'vuelidate'
import { requiredIf } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'
import store from '../../store/store'

  export default {
      data () {
         return {

            loadEditCotModal: false, 
            dialog: false,
            isFactura: false,
            isPartner: false,
            isBoarding: false,
            isAddress: false,
            isNoAccount: true,
            isDeliveriType: true,
            
            paymentMethods: [ ],              // forma de pago
            CFDI: [ ],                        // cfdi
            deliveryType: [ ],                // tipos de entrega
            boardingType: [ ],                // tipos de embarque
            deliveryServiceCompanies: [ ],    // paqueterias
            shippingAddress: [ ],             // direcciones de envio dependiendo del cliente o partner
            shippingAddressfull: [ ],         // Todas las direcciones existentes
            clients: [ ],                     // lista de clientes unicamente patners
            itemsFact: [{id:0,text:'No'},{id:1,text:'Si'}],
            // Module
            FmodClients: '',
            FmodIdNameClients: '',
            FmodpaymentMethods: '',
            FmoddeliveryType: '',
            FmodShippingAddress: '',
            FmodShippingAddressData: '',
            FmodShippingAddressContact: '',
            FmodReference: '',
            FmodCFDI: '',
            FmodboardingType: '',
            FmodDeliveryServiceCompanies: '',
            FmodNoAccount: '',
            FmodFactura: 1,
            // Require
            
            RClients: true,
            RIdNameClients: true,
            RPaymentMethods: true,
            RReference: true,
            RCFDI: true,
            RNoAccount: false,
            RDeliveryType: true,
            RBoardingType: false,
            RDeliveryServiceCompanies: false,
            RShippingAddress: false,
         }
      },
      mixins: [validationMixin],
      validations: {
         FmodClients: {
            required: requiredIf(function() {
                return this.RClients;
            })
         },
         FmodIdNameClients: { 
            required: requiredIf(function() {
                return this.RIdNameClients;
            })
         },
         FmodpaymentMethods: { 
            required: requiredIf(function() {
                return this.RPaymentMethods;
            })
         },
         FmoddeliveryType: { 
            required: requiredIf(function() {
                return this.RDeliveryType;
            })
         },
         FmodShippingAddress: { 
            required: requiredIf(function() {
                return this.RShippingAddress;
            })
         },
         FmodReference: { 
            required: requiredIf(function() {
                return this.RReference;
            })
         },
         FmodCFDI: { 
            required: requiredIf(function() {
                return this.RCFDI;
            })
         },
         FmodboardingType: { 
            required: requiredIf(function() {
                return this.RBoardingType;
            })
         },
         FmodDeliveryServiceCompanies: { 
            required: requiredIf(function() {
                return this.RDeliveryServiceCompanies;
            })
         },
         FmodNoAccount: { 
            required: requiredIf(function() {
                return this.RNoAccount;
            })
         },
      },
      computed: {
         ...mapGetters({
            getUserApi: 'auth/getUserApi' ,
            editCotModal:'modals/getShowEditCotModal',
            idEditCot:'ecot/getIdEditCotSelect',
         }),
         currentRouteName() {
            return this.$route.name;
         },
         referenceErrors () {
            const errors = []
            if (!this.$v.FmodReference.$dirty) return errors
            !this.$v.FmodReference.required && errors.push('Necesitas identificar la cotización.')
            return errors
         },
         idNameClientsErrors(){
            const errors = []
            if (!this.$v.FmodIdNameClients.$dirty) return errors
            !this.$v.FmodIdNameClients.required && errors.push('Necesitas seleccionar un cliente.')
            return errors
         },
         clientsErrors(){
            const errors = []
            if (!this.$v.FmodClients.$dirty) return errors
            !this.$v.FmodClients.required && errors.push('Necesitas un ID de cliente.')
            return errors
         },
         paymentMethodsErrors(){
            const errors = []
            if (!this.$v.FmodpaymentMethods.$dirty) return errors
            !this.$v.FmodpaymentMethods.required && errors.push('Necesitas un método de pago.')
            return errors
         },
         noAccountErrors(){
            const errors = []
            if (!this.$v.FmodNoAccount.$dirty) return errors
            !this.$v.FmodNoAccount.required && errors.push('Necesitas un número de cuenta.')
            return errors
         },
         cfdiErrors(){
            const errors = []
            if (!this.$v.FmodCFDI.$dirty) return errors
            !this.$v.FmodCFDI.required && errors.push('Necesitas un CFDI.')
            return errors
         },
         deliveryTypeErrors(){
            const errors = []
            if (!this.$v.FmoddeliveryType.$dirty) return errors
            !this.$v.FmoddeliveryType.required && errors.push('Necesitas un tipo de entrega.')
            return errors
         },
         boardingTypeErrors(){
            const errors = []
            if (!this.$v.FmodboardingType.$dirty) return errors
            !this.$v.FmodboardingType.required && errors.push('Necesitas un tipo de embarque.')
            return errors
         },
         deliveryServiceCompaniesErrors(){
            const errors = []
            if (!this.$v.FmodDeliveryServiceCompanies.$dirty) return errors
            !this.$v.FmodDeliveryServiceCompanies.required && errors.push('Necesitas una paquetería .')
            return errors
         },
         shippingAddressErrors(){
            const errors = []
            if (!this.$v.FmodShippingAddress.$dirty) return errors
            !this.$v.FmodShippingAddress.required && errors.push('Necesitas una dirección de envío .')
            return errors
         },
      },
      methods: {
         async GetIsData() { // obtenemos los booleanos de diferentes estancias

            var payload = {
               token: this.getUserApi.token,
               id: this.idEditCot,
            }
            const data = await this.$store.dispatch('ecot/getDataCot',payload);
            if(data.success) {

               // obtenemos la informacion de la cotizacion

               this.clients= [
                  {
                     id: data.datacotizacion.client_id,
                     full_name: data.datacotizacion.full_name
                  }],
               this.FmodIdNameClients = data.datacotizacion.client_id
               this.FmodClients = data.datacotizacion.client_id
               this.FmodpaymentMethods = data.datacotizacion.payment_method_id
               this.FmoddeliveryType = data.datacotizacion.delivery_type_id
               this.FmodShippingAddress = data.datacotizacion.shipping_address_id
               // this.FmodShippingAddressData = datacotizacion.
               // this.FmodShippingAddressContact = datacotizacion.
               this.FmodReference = data.datacotizacion.reference
               this.FmodCFDI = data.datacotizacion.cfdi_id
               this.FmodboardingType = data.datacotizacion.boarding_type_id
               this.FmodDeliveryServiceCompanies = data.datacotizacion.delivery_service_compani_id

               if(data.datacotizacion.account_number != null) {
                     this.isNoAccount = false
                     this.FmodNoAccount = data.datacotizacion.account_number
               }

               this.isDeliveriType = false

               if(Number.parseInt(data.datacotizacion.delivery_type_id) === 1 ) { // 1 es embarque por lo que se activa la parte inferior de opciones referente a embarque
                  this.isBoarding = true
                  this.isAddress = true
                  this.getshippingAddress()
               }

               if(Number.parseInt(data.datacotizacion.delivery_type_id) ===3 ) { // 3 es ntrega por lo que se activa la parte inferior de opciones referente a entrega
                  this.isAddress = true
                  this.getshippingAddress()
               }

               if(Number.parseInt(data.datacotizacion.is_factura) === 1) {
                  this.isFactura = true
                  this.FmodFactura = data.datacotizacion.is_facturado
               }

               // this.FmodFactura = datacotizacion.
               

               console.log(this.getUserApi.ip)
               if( Number.parseInt(this.getUserApi.ip) === 1 ) { // is partner
                  this.isPartner = true
                  this.RClients = true
                  this.RIdNameClients = true
               } else {
                  this.RClients = false
                  this.RIdNameClients = false
                  this.isPartner = false
               }



               
            }

           

            
         }, 
         changePayment() {

            var resultPaymentethods = this.paymentMethods.find( deltype => deltype.id === this.FmodpaymentMethods);
            if(Number.parseInt(resultPaymentethods.is_account) === 1 ) {
               this.isNoAccount = false
               this.RNoAccount = true
            } else {
               this.isNoAccount = true
               this.RNoAccount = false
            }
         },
         changeDeliveryTypes() {

            this.FmodboardingType = ''
            this.FmodDeliveryServiceCompanies = ''
            this.FmodShippingAddress = ''
            this.FmodShippingAddressData = ''
            this.FmodShippingAddressContact = ''

            
            if(this.FmodClients == '' && Number.parseInt(this.getUserApi.ip) === 1) {

               var iconToast = 'warning'
               var msjToast = '¡Necesitas seleccionar un cliente para continuar... ! '
               var positionToast = 'bottom-end'
               var timerToast = 4000
               const SAToastsVar = new SAToasts(iconToast,msjToast,positionToast,timerToast)
               SAToastsVar.getToast()
               // deshabilitamos el required
               this.RBoardingType = false
               this.RDeliveryServiceCompanies = false
               this.RShippingAddress = false
               this.deliveryType

            } else {

               var resulDeliveryType = this.deliveryType.find( deltype => deltype.id === this.FmoddeliveryType);
               if(Number.parseInt(resulDeliveryType.is_boarding) === 1 ) {
                  this.isBoarding = true
                  // Habilitamos el required
                  this.RBoardingType = true
                  this.RDeliveryServiceCompanies = true
               } else {
                  this.isBoarding = false
                  // Deshabilitamos el required
                  this.RBoardingType = false
                  this.RDeliveryServiceCompanies = false
               }
               if(Number.parseInt(resulDeliveryType.is_address) === 1 ) {
                  this.isAddress = true
                  // Habilitamos el required
                  this.RShippingAddress = true
               } else {
                  this.isAddress = false
                  // Deshabilitamos el required
                  this.RShippingAddress = false
               }

            } 

         },
         getshippingAddress() {
            

            var resulShippingAddresse = this.shippingAddress.find( shipadd => shipadd.id === this.FmodShippingAddress);
            this.FmodShippingAddressData = resulShippingAddresse.address_line+' #'+resulShippingAddresse.n_ext+' '+resulShippingAddresse.n_ext+', '+resulShippingAddresse.suburb+', '+resulShippingAddresse.city+', '+resulShippingAddresse.state
            this.FmodShippingAddressContact = resulShippingAddresse.contact_name
            // ponemos solo las direcciones del cliente
            this.shippingAddress = this.shippingAddressfull.filter( shipAd => shipAd.client_id === this.FmodClients)

         },
        async GetConfigEditCot() { // obtenemos las cotizaciones

             let payload = { 
               is_partner: this.getUserApi.ip, 
               token: this.getUserApi.token, 
               client_id: this.getUserApi.cid
            } 
            const response = await this.$store.dispatch('ecot/getConfignewCot',payload);

            this.paymentMethods = response.PM
            this.CFDI = response.CFDI
            this.deliveryType = response.DT
            this.shippingAddress = response.SA
            this.shippingAddressfull = response.SA
            this.deliveryServiceCompanies = response.DSC
            this.boardingType = response.BT

            this.GetIsData()

         },
         async GetClients() {
            try {
               
               const { data } = await axios.get(`/cotizaciones/clients`, { headers: { Authorization: "Bearer " + this.getUserApi.token } })
               // obtenemos los clientes
               this.clients = data.cClients

            } catch (error) {
               
            }
         },
         requestReturn(request,cotRoute){
            if(request) {

               axios.post(cotRoute, {
                  user_name: this.name,
                  password: this.password
               },
               {
                  'Authorization': token
               })
                  // .then( response => {
                  // })
                  // .catch( error => {
                  // });
            } else {
            }
         },
         async updateCot() { // submit para nueva cotizacion

            this.$v.$touch()
            if (!this.$v.$invalid) {

               let dataForm = {
                  token:this.getUserApi.token,
                  id:this.idEditCot,
                  reference: this.FmodReference,
                  paymentMethods: this.FmodpaymentMethods,
                  deliveryType: this.FmoddeliveryType,
                  ShippingAddress: this.FmodShippingAddress,
                  CFDI: this.FmodCFDI,
                  boardingType: this.FmodboardingType,
                  deliveryServiceCompanies: this.FmodDeliveryServiceCompanies,
                  noAccount: this.FmodNoAccount,
                  isFactura: this.FmodFactura,   
               }

               const { data } = await axios.post('/cotizaciones/updateDetails', dataForm)

               if(data.success) {

                  this.closeEditCotModal()
                  var iconToast = 'success'
                  var msjToast = '¡Cotización actualizada con éxito!'
                  var positionToast = 'bottom-end'
                  var timerToast = 4000
                  const SAToastsVar = new SAToasts(iconToast,msjToast,positionToast,timerToast)
                  SAToastsVar.getToast()
                  
               }else {

                  var iconToast = 'warning'
                  var msjToast = '¡No se pudo crear tu cotización, favor de contactar con tu agente de venta...! '
                  var positionToast = 'bottom-end'
                  var timerToast = 4000
                  const SAToastsVar = new SAToasts(iconToast,msjToast,positionToast,timerToast)
                  SAToastsVar.getToast()

               }


            }
         },
         closeEditCotModal() {
            var payload = {
               name_modal:  'editCotizacion', // modal 
               state_modal: false
            }
            this.$store.dispatch('modals/IdentifyModal',payload );
         }
      },
      mounted(){
         this.GetConfigEditCot()
         if( Number.parseInt(this.getUserApi.is_partner) === 1 ) {
            this.GetClients()
         }
      },
      catch: {

      }
  }
</script>
