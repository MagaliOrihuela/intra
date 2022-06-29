<template>
   
   <!-- MODAL asignar nueva cotizacion -->

      <v-row justify="center">
         <v-dialog v-model="newCotModal" fullscreen hide-overlay transition="dialog-bottom-transition" scrollable >
            
            <v-progress-linear
            :active="loadNewCotModal"
            :indeterminate="loadNewCotModal"
            absolute
            top
            color="red darken-4"
            ></v-progress-linear>
            <v-card >
               <v-toolbar 
                     dark 
                     color="blue-grey lighten-3"
                     dense
                     style="z-index:99"
                  >
                  <v-toolbar-items>
                     <v-btn
                        dark
                        text
                        @click="submitNewCot()"
                        outlined
                     >
                        <v-icon> mdi-cloud-upload-outline </v-icon> &nbsp;&nbsp;Guardar-Iniciar Cotización 
                     </v-btn>
                  </v-toolbar-items>
                  <v-spacer></v-spacer>
                  <v-toolbar-title class="cotform-title-text">Nueva cotización</v-toolbar-title>
                  <v-btn icon dark @click="closeNewCotModal">
                     <v-icon size="18px">mdi-close</v-icon>
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
                              <v-col v-if="isFactura" cols="12" sm="8" md="8" class="d-flex">
                                 Al no requerir factura automáticamente pasa a una compra de mostrador.
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
                                    small
                                    @click="submitNewCot()"
                                 >
                                    <v-icon> mdi-cloud-upload-outline </v-icon> &nbsp;&nbsp;Guardar-Iniciar Cotización 
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
import { required, requiredIf, maxLength, minLength, email } from 'vuelidate/lib/validators'
import { mapActions, mapState, mapGetters } from 'vuex'
import store from '../../store/store'
import SAToasts from '../../services/SweetAlertToast'
import socketClientEmit from '../../shared/socketEmit'

  export default {
      data () {
         return {

            loadNewCotModal: false, 
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
            newCotModal:'modals/getShowNewCotModal' 
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
         GetIsData() { // obtenemos los booleanos de diferentes estancias

            if( Number.parseInt(this.getUserApi.ip) === 1 ) { // is partner
               this.isPartner = true
               this.RClients = true
               this.RIdNameClients = true
               this.isDeliveriType = true
            } else {
               this.RClients = false
               this.RIdNameClients = false
               this.isDeliveriType = false
            }
            this.isFactura = false 
         }, 
         changeClient(opt) {

            this.FmodShippingAddressData = ''
            this.FmodShippingAddressContact = ''
            this.isDeliveriType = false
            switch (opt) {
               case 1: // id cliente -> nombre cliente
                  var resultClient       = this.clients.find( client => client.id === this.FmodClients);
                  this.FmodIdNameClients = resultClient.id
                  this.isFactura         = resultClient.is_factura
                  this.shippingAddress = this.shippingAddressfull.filter( shipAd => shipAd.client_id === this.FmodClients)
               break;
               case 2: // nombre cliente -> id cliente
                  var resultClient = this.clients.find( client => client.id === this.FmodIdNameClients);
                  this.FmodClients = resultClient.id
                  this.isFactura   = resultClient.is_factura
                  this.shippingAddress = this.shippingAddressfull.filter( shipAd => shipAd.client_id === this.FmodIdNameClients)
               break;
            }
         },
         changePayment() {

            var resultPaymentethods = this.paymentMethods.find( deltype => deltype.id === this.FmodpaymentMethods);
            // console.log(resultPaymentethods)
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
         },
        async GetConfigNewCot() { // obtenemos las cotizaciones

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
                  .then( response => {
                  })
                  .catch( error => {
                  });
            } else {
            }
         },
         async submitNewCot() { // submit para nueva cotizacion

            this.$v.$touch()
            if (!this.$v.$invalid) {

                  this.loadNewCotModal = true
               // Definimos el cliente
               var idClientForm = 0
               if(Number.parseInt(this.getUserApi.ip) === 1) { idClientForm = this.FmodClients; } else { idClientForm = this.getUserApi.cid; }

               let payload = {
                  token: this.getUserApi.token,
                  reference: this.FmodReference,
                  idClient: idClientForm,
                  paymentMethods: this.FmodpaymentMethods,
                  deliveryType: this.FmoddeliveryType,
                  ShippingAddress: this.FmodShippingAddress,
                  CFDI: this.FmodCFDI,
                  boardingType: this.FmodboardingType,
                  deliveryServiceCompanies: this.FmodDeliveryServiceCompanies,
                  noAccount: this.FmodNoAccount,
                  isFactura: this.FmodFactura,
                  isPartner: this.getUserApi.ip,
               }

               const data = await socketClientEmit.createCotizacionesEmit(payload)
               
               if(data.success) {


                  let payload = {
                     user_id: this.getUserApi.uid,
                     token: this.getUserApi.token,
                     title: 'Nueva Cotización', // titulo de la notificacion
                     description: 'Se creo una nueva cotizacion del cliente no.'+data.eCot.short_name+' ...', // minimo 100 caracteres para que no se sature la notificacion
                     route: '/cotizaciones/'+data.eCot.id, // ruta la cual abrira la notificacion, si no contiene ruta dejarlo en blanco 
                     is_partner: 1, // registro 0 para mostrar notificacion en general - 1 para mostrar solo a partners de Shades
                     icon: 'mdi-clipboard-alert-outline', // icono que llevara la notificacion
                     module: 'cotizacion',
                     relation_id: data.eCot.id,
                     department_id: 10 // deparamento para el que va dirigido este ticket - 0 es para todos 
                  }

                  await socketClientEmit.createNotificationEmit(payload)

                  this.loadNewCotModal = false
                  
                  this.FmodClients = '',
                  this.FmodIdNameClients = '',
                  this.FmodpaymentMethods = '',
                  this.FmoddeliveryType = '',
                  this.FmodShippingAddress = '',
                  this.FmodShippingAddressData = '',
                  this.FmodShippingAddressContact = '',
                  this.FmodReference = '',
                  this.FmodCFDI = '',
                  this.FmodboardingType = '',
                  this.FmodDeliveryServiceCompanies = '',
                  this.FmodNoAccount = '',
                  this.FmodFactura = 1,


                  this.closeNewCotModal()
                  this.$store.dispatch('modals/loaderfull',true); // activamos el overlay cargando
                  this.$v.$reset()

                  var iconToast = 'success'
                  var msjToast = '¡Cotización creada con éxito...! '
                  var positionToast = 'top'
                  var timerToast = 4000
                  const SAToastsVar = new SAToasts(iconToast,msjToast,positionToast,timerToast)
                  SAToastsVar.getToast()
                  
                  this.$router.push(`/cotizaciones/${data.cotizacion_id}`)

               } else {

                  var iconToast = 'warning'
                  var msjToast = '¡No se pudo crear tu cotización, favor de contactar con tu agente de venta...! '
                  var positionToast = 'bottom-end'
                  var timerToast = 4000
                  const SAToastsVar = new SAToasts(iconToast,msjToast,positionToast,timerToast)
                  SAToastsVar.getToast()

               }
            }
         },
         closeNewCotModal() {
            var payload = {
               name_modal:  'newCotizacion', // modal 
               state_modal: false
            }
            this.$store.dispatch('modals/IdentifyModal',payload );
         }
      },
      mounted(){
         this.GetConfigNewCot()
         this.GetIsData()
         if( Number.parseInt(this.getUserApi.ip) === 1 ) {
            this.GetClients()
         }
      },
      catch: {

      }
  }
</script>
<style scoped>
   .cotform-title-text {
      font-size: 18px;
   }
</style>
