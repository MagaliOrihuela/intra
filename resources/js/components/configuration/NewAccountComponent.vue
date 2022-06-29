<template>
   <div>
        <v-card
            class="mx-auto rounded-0 border-0 card-general"
            max-width="99%"
            :elevation="0"
        >
            <v-container fluid style="max-width: 100%;">
                <v-row>
                    <v-col 
                        xs="12"
                        sm="12"
                        md="4"
                        lg="4"
                        xl="4"
                        class="new-header"
                    >
                        <v-icon left size="28px"> mdi-account-plus-outline </v-icon>
                        <div class="h4 mb-0 color-header"> Cuenta nueva </div>
                    </v-col>
                    <v-col 
                        xs="12"
                        sm="12"
                        md="6"
                        lg="6"
                        xl="6"
                        class="new-header"
                    >

                    </v-col>
                    <v-col 
                        xs="12"
                        sm="12"
                        md="2"
                        lg="2"
                        xl="2"
                        class="new-header"
                    >
                        <v-btn 
                            depressed 
                            block
                            @click="$router.push('/configuracion/cuentas')"
                        >
                            <v-icon left> mdi-clipboard-arrow-left-outline </v-icon>
                            Regresar
                        </v-btn>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-stepper
                            v-model="steepAcount"
                            vertical
                            :elevation="0"
                        >
                            <v-stepper-step
                                :complete="completeSteep1"
                                step="1"
                                @click="steepAcount = sa1"
                                style="cursor:pointer"
                                :color="colorStep1"
                            >
                                Credenciales de acceso
                                <small>Estas credenciales permiten tener acceso al sistema.</small>

                            </v-stepper-step>

                            <v-stepper-content step="1">
                                <v-container>
                                    <v-row >
                                        <v-col 
                                            xs="12"
                                            sm="12"
                                            md="4"
                                            lg="4"
                                            xl="4"
                                        >
                                            <v-form
                                                ref="form"
                                                v-model="valid"
                                                lazy-validation
                                            >
                                                <v-text-field
                                                    v-model="userName"
                                                    outlined
                                                    dense
                                                    label="Nombre de usuario"
                                                    :rules="userNameRules"
                                                    required
                                                    :disabled="userCreated"
                                                ></v-text-field>
                                            </v-form>
                                        </v-col>
                                        <v-col 
                                            xs="12"
                                            sm="12"
                                            md="4"
                                            lg="4"
                                            xl="4"
                                        >
                                            <v-form
                                                ref="formPass"
                                                v-model="valid"
                                                lazy-validation
                                            >
                                                <v-text-field
                                                    v-model="iNewPass"
                                                    label="Nueva Contraseña*"
                                                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                                    :type="show1 ? 'text' : 'password'"
                                                    @click:append="show1 = !show1"
                                                    counter
                                                    dense
                                                    autocomplete="nope"
                                                    :rules="passRules"
                                                    outlined
                                                    :disabled="userCreated"
                                                ></v-text-field>
                                            </v-form>
                                        </v-col>
                                        <v-col 
                                            xs="12"
                                            sm="12"
                                            md="4"
                                            lg="4"
                                            xl="4"
                                        >
                                            <v-form
                                                ref="formPassRe"
                                                v-model="valid"
                                                lazy-validation
                                            >
                                                <v-text-field
                                                    v-model="iNewPassRe"
                                                    label="Repite la nueva contraseña*"
                                                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                                                    :type="show2 ? 'text' : 'password'"
                                                    @click:append="show2 = !show2"
                                                    counter
                                                    dense
                                                    autocomplete="nope"
                                                    :rules="[passReRules.required, passReRules.min, passwordConfirmationRule]"
                                                    outlined
                                                    :disabled="userCreated"
                                                ></v-text-field>
                                            </v-form>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-btn
                                                @click="saveCredentials()"
                                                :disabled="userCreated"
                                            >
                                                <v-icon left>mdi-content-save-outline</v-icon>
                                                Crear Usuario
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-container>

                            </v-stepper-content>

                            <v-stepper-step
                                :complete="completeSteep2"
                                step="2"
                                @click="steepAcount = sa2"
                                style="cursor:pointer"
                                :color="colorStep2"
                            >
                                Permisos
                                <small>Aqui se encuentran los modulos y submodulos que se asiganar para otorgar el permiso.</small>
                            </v-stepper-step>

                            <v-stepper-content step="2">
                                <v-container>
                                    <v-row>
                                        <v-col 
                                            xs="12"
                                            sm="12"
                                            md="6"
                                            lg="6"
                                            xl="6"
                                        >
                                            <v-autocomplete
                                                v-model="ModulesData"
                                                :items="ModulesItems"
                                                chips
                                                color="blue-grey lighten-2"
                                                label="Modulos"
                                                item-text="module"
                                                item-value="id"
                                                multiple
                                                outlined
                                                @change="dataSubmoduleChange()"
                                                :disabled="userPremisions"
                                            >

                                                <template v-slot:selection="data">
                                                    <v-chip
                                                        v-bind="data.attrs"
                                                        :input-value="data.selected"
                                                        @click="data.select"
                                                    >
                                                        <v-avatar left>
                                                            <v-icon > {{ data.item.icon }}</v-icon>
                                                        </v-avatar>
                                                        {{ data.item.module }}
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
                                                            <v-list-item-title v-html="data.item.module"></v-list-item-title>
                                                        </v-list-item-content>
                                                    </template>
                                                </template>
                                            </v-autocomplete>
                                        </v-col>
                                        <v-col 
                                            xs="12"
                                            sm="12"
                                            md="6"
                                            lg="6"
                                            xl="6"
                                        >
                                            <v-autocomplete
                                                v-model="SubModulesData"
                                                :items="SubModulesItems"
                                                outlined
                                                chips
                                                color="blue-grey lighten-2"
                                                label="Sub Modulos"
                                                item-text="sub_module"
                                                item-value="id"
                                                multiple
                                                :disabled="userPremisions"
                                            >

                                                <template v-slot:selection="data">
                                                    <v-chip
                                                        v-bind="data.attrs"
                                                        :input-value="data.selected"
                                                        @click="data.select"
                                                    >
                                                        <v-avatar left>
                                                            <v-icon > {{ data.item.icon }}</v-icon>
                                                        </v-avatar>
                                                        {{ data.item.sub_module }}
                                                    </v-chip>
                                                </template>    

                                                
                                                <template v-slot:item="data">
                                                    <template v-if= " typeof data.item !== 'object' ">
                                                        <v-list-item-content v-text="data.item"></v-list-item-content>
                                                    </template>
                                                    <template v-else>
                                                        <v-icon class="pr-2">
                                                            {{ data.item.icon }}
                                                        </v-icon>
                                                        <v-list-item-content>
                                                            <v-list-item-title v-html="data.item.sub_module"></v-list-item-title>
                                                        </v-list-item-content>
                                                    </template>
                                                </template>
                                            </v-autocomplete>
                                        </v-col>
                                    </v-row>
                                </v-container>
                                <v-btn
                                    @click="savePermissions()"
                                    :disabled="userPremisions"
                                >
                                    <v-icon left>mdi-content-save-outline</v-icon>
                                    Guardar Permisos
                                </v-btn>
                            </v-stepper-content>

                            <v-stepper-step
                                :complete="completeSteep3"
                                step="3"
                                @click="steepAcount = sa3"
                                style="cursor:pointer"
                                :color="colorStep3"
                            >
                                Datos generales
                                <small>Datos generales del cliente para uso del sistema</small>
                            </v-stepper-step>

                            <v-stepper-content step="3">

                                <v-container>
                                    <v-row>
                                        <v-col 
                                            xs="12"
                                            sm="12"
                                            md="4"
                                            lg="4"
                                            xl="4"
                                        >
                                            <v-text-field
                                                v-model="clientId"
                                                label="Numero de cliente"
                                                hint="ID sistema de facturación"
                                                persistent-hint
                                                outlined
                                                dense
                                                :error-messages="clientIdErrors"
                                                @input="$v.clientId.$touch()"
                                                :disabled="userGeneralData"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col 
                                            xs="12"
                                            sm="12"
                                            md="8"
                                            lg="8"
                                            xl="8"
                                        >
                                            <v-text-field
                                                v-model="companyName"
                                                label="Compañía"
                                                hint="Compañía o empresa del cliente"
                                                persistent-hint
                                                outlined
                                                dense
                                                :disabled="userGeneralData"
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col 
                                            xs="12"
                                            sm="12"
                                            md="4"
                                            lg="4"
                                            xl="4"
                                        >
                                            <v-text-field
                                                v-model="shortName"
                                                label="Nombre Corto"
                                                hint="Nombre Primer Apellidos"
                                                persistent-hint
                                                outlined
                                                dense
                                                :error-messages="shortNameErrors"
                                                @input="$v.shortName.$touch()"
                                                :disabled="userGeneralData"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col 
                                            xs="12"
                                            sm="12"
                                            md="8"
                                            lg="8"
                                            xl="8"
                                        >
                                            
                                            <v-text-field
                                                v-model="fullName"
                                                label="Nombre Completo"
                                                hint="Nombre y Apellidos"
                                                persistent-hint
                                                outlined
                                                dense
                                                :disabled="userGeneralData"
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col 
                                            xs="12"
                                            sm="12"
                                            md="4"
                                            lg="4"
                                            xl="4"
                                        >
                                            
                                            <v-autocomplete
                                                v-model="agentClient"
                                                :items="agents"
                                                item-text="name_agent"
                                                item-value="id"
                                                outlined
                                                label="Agentes"
                                                hint="Nombre del agente asignado"
                                                dense
                                                :error-messages="agentClientErrors"
                                                @input="$v.agentClient.$touch()"
                                                :disabled="userGeneralData"
                                            ></v-autocomplete>
                                        </v-col>
                                        <v-col 
                                            xs="12"
                                            sm="12"
                                            md="5"
                                            lg="5"
                                            xl="5"
                                        >

                                            <v-text-field
                                                v-model="clientEMail"
                                                label="Correo Electrónico"
                                                hint="Correo electrónico para envíos de sistema"
                                                persistent-hint
                                                outlined
                                                dense
                                                :error-messages="clientEMailErrors"
                                                @input="$v.clientEMail.$touch()"
                                                :disabled="userGeneralData"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col 
                                            xs="12"
                                            sm="12"
                                            md="3"
                                            lg="3"
                                            xl="3"
                                        >
                                            <v-select
                                                v-model="isPartnerSelect"
                                                :items="isPartner"
                                                item-text="identify"
                                                item-value="id"
                                                label="Es Partner"
                                                hint="¿Forma parte de Shades?"
                                                outlined
                                                dense
                                                :error-messages="isPartnerSelectErrors"
                                                @input="$v.isPartnerSelect.$touch()"
                                                :disabled="userGeneralData"
                                            ></v-select>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col 
                                            xs="12"
                                            sm="12"
                                            md="4"
                                            lg="4"
                                            xl="4"
                                        >
                                            <v-text-field
                                                v-model="clientDiscount"
                                                label="Descuento"
                                                hint="Descuento otorgado para el cliente"
                                                persistent-hint
                                                outlined
                                                dense
                                                :error-messages="clientDiscountErrors"
                                                @input="$v.clientDiscount.$touch()"
                                                :disabled="userGeneralData"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col 
                                            xs="12"
                                            sm="12"
                                            md="5"
                                            lg="5"
                                            xl="5"
                                        >
                                            <v-text-field
                                                v-model="clientPhone"
                                                label="Telefono"
                                                hint="Teléfono para contacto"
                                                persistent-hint
                                                outlined
                                                dense
                                                :disabled="userGeneralData"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col 
                                            xs="12"
                                            sm="12"
                                            md="3"
                                            lg="3"
                                            xl="3"
                                        >
                                            <v-select
                                                v-model="isfacturaSelect"
                                                :items="isFactura"
                                                item-text="identifyFact"
                                                item-value="id"
                                                label="Facturar"
                                                hint="Saber si el cliente puede elegir entre facturar o no"
                                                outlined
                                                dense
                                                :error-messages="isfacturaSelectErrors"
                                                @input="$v.isfacturaSelect.$touch()"
                                                :disabled="userGeneralData"
                                            ></v-select>
                                        </v-col>
                                    </v-row>
                                </v-container>
                                <v-btn
                                    @click="saveDataGeneral()"
                                    :disabled="userGeneralData"
                                >
                                    <v-icon left>mdi-content-save-outline</v-icon>
                                    Guardar datos y activar usuario
                                </v-btn>

                            </v-stepper-content>

                        </v-stepper>

                    </v-col>
                </v-row>
            </v-container>
        </v-card>
   </div>
</template>
<script>
    import Vue from 'vue'
    import { validationMixin } from 'vuelidate'
    import { required, requiredIf, maxLength, minLength, email } from 'vuelidate/lib/validators'
    
    import SAQuestions from '../../services/SweetAlertQuestion'
    import SAToasts from '../../services/SweetAlertToast'
    import ImportCot  from '../../services/importCotizacion'
    import ProductZoomer from 'vue-product-zoomer'

    import { mapActions, mapState, mapGetters } from 'vuex'
    import store from '../../store/store'

    export default {
        data () {
            return {
                userIdNew: 0,
                userCreated: false,
                userPremisions: false,
                userGeneralData: false,
                
                show1: false,
                show2: false,

                valid: true,

                steepAcount: 1,
                userName: '',
                iNewPass: '',
                iNewPassRe: '',
                
                colorStep1: 'blue-grey darken-1',
                colorStep2: 'blue-grey darken-1',
                colorStep3: 'blue-grey darken-1',
                
                userNameRules: [
                    v => !!v || 'el nombre de usuario es requerido',
                ],
                passRules: [
                    v => !!v || 'Contraseña requerida',
                    v => (v && v.length >= 8) || 'Es necesario mínimo 8 caracteres',
                ],
                passReRules: {
                    required: value => !!value || 'Contraseña requerida',
                    min: v => v.length >= 8 || 'Es necesario mínimo 8 caracteres',
                },

                sa1: 1,
                sa2: 0,
                sa3: 0,

                completeSteep1: false,
                completeSteep2: false,
                completeSteep3: false,

                ModulesItems: [],
                SubModulesItems: [],
                ModulesData: [],
                SubModulesData: [],
                staticSubModulesData: [],


                // stepp 3

                agentClient: '',
                agents: [],

                isPartnerClient: 0,
                isPartner: [
                    { id:0,identify:'No' },
                    { id:1,identify:'Si' }
                ],

                isFacturaClient: 0,
                isFactura: [
                    { id:0,identifyFact:'No' },
                    { id:1,identifyFact:'Si' }
                ],

                shortName: '',
                fullName: '',
                agentClient: '',
                clientEMail: '',
                isPartnerSelect: '',
                clientId: '',
                clientPhone: '',
                isfacturaSelect: '',
                companyName: '',
                clientDiscount: '',

                RshortName: true,
                RagentClient: true,
                RclientEMail: true,
                RclientId: true,
                RclientDiscount: true,
                RisPartner: true,
                RisFactura: true,
            }
        },
        mixins: [validationMixin],
        validations: {
            shortName: {
                required: requiredIf(function() {
                    return this.RshortName;
                })
            },
            agentClient: {
                required: requiredIf(function() {
                    return this.RagentClient;
                })
            },
            clientEMail: {
                required: requiredIf(function() {
                    return this.RclientEMail;
                })
            },
            clientId: {
                required: requiredIf(function() {
                    return this.RclientId;
                })
            },
            clientDiscount: {
                required: requiredIf(function() {
                    return this.RclientDiscount
                })
            },
            isPartnerSelect: {
                required: requiredIf(function() {
                    return this.RisPartner;
                })
            },
            isfacturaSelect: {
                required: requiredIf(function() {
                    return this.RisFactura
                })
            },
        },
        methods: {

            async saveCredentials() {

                if(!this.$refs.form.validate()) return
                if(!this.$refs.formPass.validate()) return
                if(!this.$refs.formPassRe.validate()) return
                if(this.iNewPass != this.iNewPassRe) return
                
                this.$refs.form.resetValidation()
                this.$refs.formPass.resetValidation()
                this.$refs.formPassRe.resetValidation()

                let payload = {
                    token: this.getUserApi.token,
                    user_name: this.userName,
                    password_user: this.iNewPass,
                }
                const { data } = await axios.post('/accounts/saveNewCredentials', payload,  { headers: { Authorization: "Bearer " + payload.token } }) 

                if(data.success) {

                    this.completeSteep1 = true
                    this.sa2 = 2;
                    this.steepAcount = 2
                    this.userCreated = true
                    this.colorStep1 = 'light-green accent-2'
                    this.userIdNew = data.user_id

                } else {
                    
                }

            },

            async savePermissions() {


                let payload = {
                    token: this.getUserApi.token,
                    user_id: this.userIdNew,
                    modules: this.ModulesData,
                    submodules: this.SubModulesData,
                }
                const { data } = await axios.post('/accounts/savePermissions', payload,  { headers: { Authorization: "Bearer " + payload.token } }) 

                if(data.success) {


                    this.userPremisions = true
                    this.completeSteep2 = true
                    this.colorStep2 = 'light-green accent-2'
                    this.steepAcount = 3
                    this.sa3 = 3;

                } else {
                    
                }

            },

            async saveDataGeneral() {

                this.$v.$touch()
                if (!this.$v.$invalid) {

                    let payload = {
                        token: this.getUserApi.token,
                        user_id: this.userIdNew,
                        short_name: this.shortName,
                        full_name: this.fullName,
                        agent_client: this.agentClient,
                        clien_email: this.clientEMail,
                        is_Partner: this.isPartnerSelect,
                        client_id: this.clientId,
                        client_phone: this.clientPhone,
                        is_factura: this.isfacturaSelect,
                        company_name: this.companyName,
                        client_discount: this.clientDiscount,
                    }

                    const { data } = await axios.post('/accounts/saveNewDataGeneral', payload,  { headers: { Authorization: "Bearer " + payload.token } })

                    if(data.success) {

                        this.userGeneralData = true
                        this.completeSteep3 = true
                        this.colorStep3 = 'light-green accent-2'

                        this.activteUser()

                        this.$v.$reset()
                        

                    } else {
                        
                        var iconToast = 'warning'
                        var msjToast = 'No se pudo gardar el registro, favor de contactar a el área de sistemas.'
                        var positionToast = 'bottom-end'
                        var timerToast = 4000
                        const SAToastsVar = new SAToasts(iconToast,msjToast,positionToast,timerToast)
                        SAToastsVar.getToast()
                    }
                }

                
            },

            async activteUser() {

                let payload = {
                    token: this.getUserApi.token,
                    user_id: this.userIdNew,
                    is_active: 1,
                }

                const { data } = await axios.post('/accounts/activeordeactiveClient', payload,  { headers: { Authorization: "Bearer " + payload.token } })

                if(data.success) {

                    var iconToast = 'success'
                    var msjToast = 'Usuario creado y activado con éxito.'
                    var positionToast = 'bottom-end'
                    var timerToast = 4000
                    const SAToastsVar = new SAToasts(iconToast,msjToast,positionToast,timerToast)
                    SAToastsVar.getToast()

                }
            },

            async showDataNewAccount() {
                
                this.$store.dispatch('modals/loaderfull',true); // activamos el overlay cargando

                let payload = {
                    token: this.getUserApi.token,
                    user_id: this.ClientFound
                }

                const { data } = await axios.post('/accounts/searchDataNewAccount', payload,  { headers: { Authorization: "Bearer " + payload.token } }) 

                if(data.success) {


                    this.agents = data.agents
                    this.UserData = data.user
                    this.ModulesItems = data.modules
                    this.staticSubModulesData = data.submodules

                    this.$store.dispatch('modals/loaderfull',false); // desactivamos el overlay cargando
                    
                } 
            },

            
            dataSubmoduleChange() {

                this.SubModulesItems = []
                this.staticSubModulesData.forEach(item => {

                    let found = this.ModulesData.find(sub => sub === item.module_id)
                    if(typeof(found) != "undefined") { 
                        this.SubModulesItems.push(item)
                    }

                })

            },

        },
        computed: {
         ...mapGetters({ getUserApi: 'auth/getUserApi'}),

            passwordConfirmationRule() {
                return () => (this.iNewPass === this.iNewPassRe) || 'Las contraseñas no coinciden.'
            },

            shortNameErrors(){
                const errors = []
                if (!this.$v.shortName.$dirty) return errors
                !this.$v.shortName.required && errors.push('Es necesario su nombre corto.')
                return errors
            },
            agentClientErrors(){
                const errors = []
                if (!this.$v.agentClient.$dirty) return errors
                !this.$v.agentClient.required && errors.push('Es necesario un id de cliente.')
                return errors
            },
            clientEMailErrors(){
                const errors = []
                if (!this.$v.clientEMail.$dirty) return errors
                !this.$v.clientEMail.required && errors.push('Es necesario una cuenta de correo.')
                return errors
            },
            clientIdErrors(){
                const errors = []
                if (!this.$v.clientId.$dirty) return errors
                !this.$v.clientId.required && errors.push('Es necesario asignarle un id de cliente.')
                return errors
            },
            clientDiscountErrors(){
                const errors = []
                if (!this.$v.clientDiscount.$dirty) return errors
                !this.$v.clientDiscount.required && errors.push('Es necesario asignarle un descuento.')
                return errors
            },
            isPartnerSelectErrors(){
                const errors = []
                if (!this.$v.isPartnerSelect.$dirty) return errors
                !this.$v.isPartnerSelect.required && errors.push('Es necesario definir esta parte.')
                return errors
            },
            isfacturaSelectErrors(){
                const errors = []
                if (!this.$v.isfacturaSelect.$dirty) return errors
                !this.$v.isfacturaSelect.required && errors.push('Es necesario definir esta parte.')
                return errors
            },
                
        },
        created() {
            this.showDataNewAccount()
            this.$store.dispatch('modals/loaderfull',false); // desactivamos el overlay cargando
        },
    }
</script>
<style scoped>
    .search-header   {
        font-size: 18px;
        font-weight: 500;
    }

    .card-general {
        margin-top: 15px;
    }

    .new-header {
        display: flex;
    }

    .color-header {
        padding-top: 5px;
        color: grey;
    }
</style>