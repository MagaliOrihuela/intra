<template>
   <div>
        <v-card
            class="mx-auto rounded-0 border-0 card-general"
            max-width="99%"
            :elevation="0"
        >
            <v-container fluid style="max-width: 100%;" class="ma-0">
                <v-row>
                    <v-col
                        xs="12"
                        sm="12"
                        md="4"
                        lg="4"
                        xl="4"
                    >
                        <v-container class="client-container-info">
                            <v-row dense>
                                <v-col cols="12" class="pa-0 pb-3">
                                    <v-icon left style="padding-bottom: 5px;">
                                        mdi-account-search-outline
                                    </v-icon>
                                    <b class="search-header">Buscar Cuenta de usuario</b>
                                </v-col>
                                <v-col cols="12" class="pa-0" >
                                    <v-autocomplete
                                        v-model="ClientFound"
                                        :items="ClientList"
                                        item-value="user_id"
                                        item-text="full_name"
                                        dense
                                        outlined
                                        label="buscar por nombre o numero de cliente"
                                        @change="showDataClient()"
                                    ></v-autocomplete>
                                </v-col>
                                <v-col cols="12" class="pa-0">
                                    <v-container
                                        v-model="ClientData"
                                        v-if="ClientData != ''"
                                    >
                                        <v-row
                                            class="pa-0"
                                            dense
                                        >
                                            <v-col  cols="12" class="content-account">
                                                <v-icon left size="20px">
                                                    mdi-clipboard-account-outline
                                                </v-icon>
                                                <div>ID Cliente:</div> <div class="pl-2 account-info-subtitle">{{ ClientData.client_id }}</div>
                                            </v-col>

                                            <v-col cols="12" class="content-account">
                                                <v-icon left size="20px">
                                                    mdi-domain
                                                </v-icon>
                                                <div>Empresa:</div> <div class="pl-2 account-info-subtitle">{{ ClientData.company }}</div>
                                            </v-col>
                                            
                                            <v-col cols="12" class="content-account">
                                                <v-icon left size="20px">
                                                    mdi-email-outline
                                                </v-icon>
                                                <div>Correo:</div> <div class="pl-2 account-info-subtitle">{{ ClientData.email }}</div>
                                            </v-col>
                                            
                                            <v-col cols="12" class="content-account">
                                                <v-icon left size="20px">
                                                    mdi-handshake-outline
                                                </v-icon>
                                                <div>Es Partner:</div> <div class="pl-2 account-info-subtitle">{{ changeDataIs(ClientData.is_partner) }}</div>
                                            </v-col>
                                            
                                            <v-col v-model="userActive" cols="12" class="content-account">
                                                <v-icon left size="20px">
                                                    mdi-account-arrow-right-outline
                                                </v-icon>
                                                <div>Activo:</div> 
                                                <div v-if="userActive" class="pl-2 account-info-subtitle">
                                                    No
                                                </div>
                                                <div v-else class="pl-2 account-info-subtitle">
                                                    Si
                                                </div>
                                            </v-col>

                                        </v-row>
                                    </v-container>
                                </v-col>
                            </v-row>
                            <v-row >
                                <v-col>
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
                        </v-container>
                    </v-col>
                    <v-col
                        xs="12"
                        sm="12"
                        md="8"
                        lg="8"
                        xl="8"
                    >
                        <div class="account-no-info" v-if="ClientData == ''">
                            <v-icon left color="#f2f2f2"> mdi-folder-information-outline </v-icon>  Información del cliente
                        </div>
                        <div v-else>

                            <v-card
                                elevation="1"
                            >
                                <v-container fluid >
                                    <v-row>
                                        <v-col cols="4" style="display:flex;">
                                            <v-icon left style="padding-bottom: 8px;"> mdi-shield-edit-outline </v-icon> <div class="account-header-edit"> Editar Credenciales </div>
                                        </v-col>
                                        <v-col cols="8" >
                                            <div class="account-subheader-edit">La contraseña por cuestiones de seguridad no se podrá ver, la opción es generar una nueva contraseña y proporcionarla al usuario mediante un correo o WhatsApp</div>
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
                                            <!-- <v-btn depressed block>
                                                <v-icon left color="yellow"> mdi-email-outline </v-icon>
                                                Enviar credenciales
                                            </v-btn> -->
                                        </v-col>
                                        <v-col 
                                            xs="12"
                                            sm="12"
                                            md="4"
                                            lg="4"
                                            xl="4"
                                        >
                                            <v-btn 
                                                depressed 
                                                block
                                                @click="saveCredentials()"
                                                :disabled="userActive"
                                            >
                                                <v-icon left color="green"> mdi-content-save-outline </v-icon>
                                                Guardar credenciales
                                            </v-btn>
                                        </v-col>
                                        <v-col 
                                            v-model="userActive"
                                            xs="12"
                                            sm="12"
                                            md="4"
                                            lg="4"
                                            xl="4"
                                        >
                                            <div  v-if="userActive">
                                                <v-btn 
                                                    depressed 
                                                    block
                                                    @click="activeordeactivateClient(1)"
                                                >
                                                    <v-icon left color="green"> mdi-account-check-outline </v-icon>
                                                    Activar cliente
                                                </v-btn>
                                            </div>
                                            <div v-else>
                                                <v-btn 
                                                    depressed 
                                                    block
                                                    @click="activeordeactivateClient(0)"
                                                >
                                                    <v-icon left color="red"> mdi-account-cancel-outline </v-icon>
                                                    desactivar cliente
                                                </v-btn>
                                            </div>
                                        </v-col>
                                    </v-row>
                                    <v-row v-model="UserData">
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
                                                    :value="UserData.user_name"
                                                    label="Nombre de usuario"
                                                    :rules="userNameRules"
                                                    required
                                                    :disabled="userActive"
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
                                                v-model="valid2"
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
                                                    :disabled="userActive"
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
                                                v-model="valid3"
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
                                                    :disabled="userActive"
                                                ></v-text-field>
                                            </v-form>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>
                                            <v-divider></v-divider>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="4" style="display:flex;">
                                            <v-icon left style="padding-bottom: 22px;"> mdi-folder-edit-outline </v-icon> <div class="account-header-edit"> Editar Permisos </div>
                                        </v-col>
                                        <v-col cols="8" >
                                            <div class="account-subheader-edit">Los permisos son accesos determinados para cada módulo, según la cuenta son los accesos que se le otorgaran al usuario, indispensable cerrar sesión y volver a iniciar cuando se realicen cambios.</div>
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
                                        </v-col>
                                        <v-col 
                                            xs="12"
                                            sm="12"
                                            md="4"
                                            lg="4"
                                            xl="4"
                                        >
                                            
                                            <v-btn 
                                                depressed 
                                                block
                                                @click="savePermissions()"
                                                :disabled="userActive"
                                            >
                                                <v-icon left color="green"> mdi-content-save-outline </v-icon>
                                                Guardar Permisos
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                    <v-row v-model="UserData">
                                        <v-col 
                                            xs="12"
                                            sm="12"
                                            md="5"
                                            lg="5"
                                            xl="5"
                                        >
                                            <v-autocomplete
                                                v-model="SelectModulesData"
                                                :items="ModulesData"
                                                chips
                                                color="blue-grey lighten-2"
                                                label="Modulos"
                                                item-text="module"
                                                item-value="id"
                                                multiple
                                                outlined
                                                @change="dataSubmoduleChange()"
                                                :disabled="userActive"
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
                                        <v-col cols="6">
                                            <v-autocomplete
                                                v-model="SelectSubModulesData"
                                                :items="SubModulesData"
                                                outlined
                                                chips
                                                color="blue-grey lighten-2"
                                                label="Sub Modulos"
                                                item-text="sub_module"
                                                item-value="id"
                                                multiple
                                                :disabled="userActive"
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
                                    <v-row>
                                        <v-col>
                                            <v-divider></v-divider>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="5" style="display:flex;">
                                            <v-icon left style="padding-bottom: 22px;"> mdi-account-edit-outline </v-icon> <div class="account-header-edit"> Editar Datos Generales </div>
                                        </v-col>
                                        <v-col cols="7" style="display:flex;">
                                            <div class="account-subheader-edit">Los datos generales son indispensables para cualquier información o configuración que tenga el sitio web, indispensable cerrar sesión y volver a iniciar cuando se realicen cambios.</div>
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
                                        </v-col>
                                        <v-col 
                                            xs="12"
                                            sm="12"
                                            md="4"
                                            lg="4"
                                            xl="4"
                                        >
                                            
                                            <v-btn 
                                                depressed 
                                                block
                                                @click="saveDataGeneral()"
                                                :disabled="userActive"
                                            >
                                                <v-icon left color="green"> mdi-content-save-outline </v-icon>
                                                Guardar Datos Generales
                                            </v-btn>
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
                                                v-model="clientId"
                                                label="Numero de cliente"
                                                hint="ID sistema de facturación"
                                                persistent-hint
                                                outlined
                                                dense
                                                :error-messages="clientIdErrors"
                                                @input="$v.clientId.$touch()"
                                                :disabled="isClientDisabled"
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
                                                :disabled="userActive"
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
                                                :disabled="userActive"
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
                                                :disabled="userActive"
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
                                                :disabled="userActive"
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
                                                :disabled="userActive"
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
                                                :disabled="userActive"
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
                                                :disabled="isDiscountDisabled"
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
                                                :disabled="userActive"
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
                                                :disabled="isFacturaDisabled"
                                            ></v-select>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card>
                        </div>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
   </div>
</template>
<script>
    import Vue from 'vue'
    import { validationMixin } from 'vuelidate'
    import { requiredIf,  minLength } from 'vuelidate/lib/validators'
    
    import SAQuestions from '../../services/SweetAlertQuestion'
    import SAToasts from '../../services/SweetAlertToast'
    import ImportCot  from '../../services/importCotizacion'
    import ProductZoomer from 'vue-product-zoomer'

    import { mapActions, mapState, mapGetters } from 'vuex'
    import store from '../../store/store'

    export default {
        data () {
            return {
                valid: true,
                valid2: true,
                valid3: true,
                userActive: true,
                userIdselected: 0,
                ClientFound: '',
                ClientData: '',
                UserData: '',
                ModulesData: [],
                selectModules: [],
                SubModulesData: [],
                selectSubModules: [],
                ClientList: [],
                SelectModulesData: [],
                SelectSubModulesData: [],

                agentClient: '',
                agents: [],

                isPartnerClient: '',
                isPartner: [
                    { id:0,identify:'No' },
                    { id:1,identify:'Si' }
                ],

                isFacturaClient: '',
                isFactura: [
                    { id:0,identifyFact:'No' },
                    { id:1,identifyFact:'Si' }
                ],

                userName: '',
                iNewPass: '',
                iNewPassRe: '',
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

                RuserName: true,
                RiNewPass: false,
                RiNewPassRe: false,
                RshortName: true,
                RagentClient: true,
                RclientEMail: true,
                RclientId: true,
                RclientDiscount: true,

                isClientDisabled: false,
                isDiscountDisabled: false,
                isFacturaDisabled: false,

                show1: false,
                show2: false,

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
        },
        methods: {
            async dataClients() {

                let payload = {
                    token: this.getUserApi.token
                }
                const { data } = await axios.post('/accounts/clients', payload,  { headers: { Authorization: "Bearer " + payload.token } }) 
                if(data.success) {
                    this.ClientList = data.cClients
                    this.agents = data.agents
                }     
            },

            async showDataClient() {

                this.SubModulesData = []
                this.SelectModulesData = []
                this.SelectSubModulesData = []

                this.$store.dispatch('modals/loaderfull',true); // activamos el overlay cargando
                let payload = {
                    token: this.getUserApi.token,
                    user_id: this.ClientFound
                }

                const { data } = await axios.post('/accounts/v', payload,  { headers: { Authorization: "Bearer " + payload.token } }) 

                if(data.success) {

                    if(Number.parseInt(data.client.is_active) === 0 ){ this.userActive = true } else { this.userActive = false }

                    this.userName = data.user.user_name
                    this.iNewPass = ''
                    this.iNewPassRe = ''
                    this.ClientData = data.client
                    this.userIdselected = data.client.user_id
                    this.UserData = data.user
                    this.ModulesData = data.modules
                    this.SelectModulesData = data.selectModules
                    this.staticSubModulesData = data.submodules
                    this.SelectSubModulesData = data.selectSubModules

                    // data formulario

                    this.shortName = data.client.short_name
                    this.fullName = data.client.full_name
                    this.agentClient = data.client.agent_id
                    this.clientEMail = data.client.email
                    this.isPartnerSelect = data.client.is_partner
                    this.clientId = data.client.client_id
                    this.companyName = data.client.company
                    this.clientDiscount = data.client.desc1

                    // verificamos si es partner
                    if(Number.parseInt(data.client.is_partner) === 1){
                        this.RclientId = false
                        this.isClientDisabled = true
                        this.RclientDiscount = false
                        this.isDiscountDisabled = true
                        this.isFacturaDisabled = true

                    } else {
                        this.RclientId = true
                        this.isClientDisabled = false
                        this.RclientDiscount = true
                        this.isDiscountDisabled = false
                        this.isFacturaDisabled = false

                    }

                    this.clientPhone = data.client.phone
                    this.isfacturaSelect = data.client.is_factura

                    this.staticSubModulesData.forEach(item => {
                        let found = this.SelectModulesData.find(sub => sub === item.module_id);
                        if(typeof(found) != "undefined") { 
                            this.SubModulesData.push(item)
                         } 
                    })
                    this.$store.dispatch('modals/loaderfull',false); // desactivamos el overlay cargando
                    
                } 
            },

            dataSubmoduleChange() {

                this.SubModulesData = []
                this.staticSubModulesData.forEach(item => {

                    let found = this.SelectModulesData.find(sub => sub === item.module_id)
                    if(typeof(found) != "undefined") { 
                        this.SubModulesData.push(item)
                    }

                })

            },

            async saveCredentials() {

                if(!this.$refs.form.validate()) {
                    return
                }

                if(this.iNewPass != '') {
                    if(!this.$refs.formPass.validate()) {
                        return
                    }
                    if(!this.$refs.formPassRe.validate()) {
                        return
                    }
                }

                if(this.iNewPassRe != '') {
                    if(!this.$refs.formPass.validate()) {
                        return
                    }
                    if(!this.$refs.formPassRe.validate()) {
                        return
                    }
                }

                //comparamos que las cadenas sean correctas
                if(this.iNewPass != this.iNewPassRe) {
                    
                    console.log('cadenas incorrectas')
                    return
                }
                
                this.$refs.form.resetValidation()
                this.$refs.formPass.resetValidation()
                this.$refs.formPassRe.resetValidation()

                let payload = {
                    token: this.getUserApi.token,
                    user_id: this.userIdselected,
                    user_name: this.userName,
                    password_user: this.iNewPass,
                }
                const { data } = await axios.post('/accounts/saveCredentials', payload,  { headers: { Authorization: "Bearer " + payload.token } }) 

                if(data.success) {

                    var iconToast = 'success'
                    var msjToast = '¡Credenciales guardados con éxito!'
                    var positionToast = 'bottom-end'
                    var timerToast = 4000
                    const SAToastsVar = new SAToasts(iconToast,msjToast,positionToast,timerToast)
                    SAToastsVar.getToast()

                } else {
                    
                    var iconToast = 'warning'
                    var msjToast = 'No se pudo gardar el registro, favor de contactar a el área de sistemas.'
                    var positionToast = 'bottom-end'
                    var timerToast = 4000
                    const SAToastsVar = new SAToasts(iconToast,msjToast,positionToast,timerToast)
                    SAToastsVar.getToast()
                }

            },

            async savePermissions() {

                let payload = {
                    token: this.getUserApi.token,
                    user_id: this.userIdselected,
                    modules: this.SelectModulesData,
                    submodules: this.SelectSubModulesData,
                }
                const { data } = await axios.post('/accounts/savePermissions', payload,  { headers: { Authorization: "Bearer " + payload.token } }) 

                if(data.success) {

                    var iconToast = 'success'
                    var msjToast = '¡Permisos guardados con éxito!'
                    var positionToast = 'bottom-end'
                    var timerToast = 4000
                    const SAToastsVar = new SAToasts(iconToast,msjToast,positionToast,timerToast)
                    SAToastsVar.getToast()

                } else {
                    
                    var iconToast = 'warning'
                    var msjToast = 'No se pudo gardar el registro, favor de contactar a el área de sistemas.'
                    var positionToast = 'bottom-end'
                    var timerToast = 4000
                    const SAToastsVar = new SAToasts(iconToast,msjToast,positionToast,timerToast)
                    SAToastsVar.getToast()
                }

            },
            async saveDataGeneral() {

                this.$v.$touch()
                if (!this.$v.$invalid) {

                    let payload = {
                        token: this.getUserApi.token,
                        user_id: this.userIdselected,
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

                    const { data } = await axios.post('/accounts/saveDataGeneral', payload,  { headers: { Authorization: "Bearer " + payload.token } })

                    if(data.success) {


                        this.$v.$reset()
                        var iconToast = 'success'
                        var msjToast = 'Datos generales guardados con éxito!'
                        var positionToast = 'bottom-end'
                        var timerToast = 4000
                        const SAToastsVar = new SAToasts(iconToast,msjToast,positionToast,timerToast)
                        SAToastsVar.getToast()

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
            async activeordeactivateClient(is_active) {

                if(Number.parseInt(is_active) === 1 ) { 
                    var titleQuestion = 'Activar a '+this.userName
                    var textQuestion = '¿Deseas activar a este usuario?'
                    var confirmBtnQuestion = 'Activar usuario'
                } else { 
                    var titleQuestion = 'Desactivar a '+this.userName
                    var textQuestion = '¿Deseas desactivar a este usuario?'
                    var confirmBtnQuestion = 'Desactivar usuario'
                }

                var iconQuestion = ''
                var cancelBtnQuestion = '<template><b-icon icon="arrow-up"></b-icon></template> Cancelar'

                const SAQQuestionVar = new SAQuestions(iconQuestion,titleQuestion,textQuestion,confirmBtnQuestion,cancelBtnQuestion)
                var resQuestion = await SAQQuestionVar.getQuestionRoute()
                if(resQuestion) {

                    let payload = {
                        token: this.getUserApi.token,
                        user_id: this.userIdselected,
                        user_id: this.userIdselected,
                        is_active: is_active,
                    }
                    const { data } = await axios.post('/accounts/activeordeactiveClient', payload,  { headers: { Authorization: "Bearer " + payload.token } }) 

                    if(data.success) {

                        if(Number.parseInt(is_active) === 1 ) { 
                            var msjToast = 'Cliente activado exitosamente.'
                            this.userActive = false 
                        } else { 
                            var msjToast = 'Cliente desactivado exitosamente.'
                            this.userActive = true 
                        }

                        var iconToast = 'success'
                        var positionToast = 'bottom-end'
                        var timerToast = 4000
                        const SAToastsVar = new SAToasts(iconToast,msjToast,positionToast,timerToast)
                        SAToastsVar.getToast()

                    } else {
                        
                        if(Number.parseInt(is_active) === 1 ) { this.userActive = false } else { this.userActive = true }
                        var iconToast = 'warning'
                        var msjToast = 'No se pudo gardar el registro, favor de contactar a el área de sistemas.'
                        var positionToast = 'bottom-end'
                        var timerToast = 4000
                        const SAToastsVar = new SAToasts(iconToast,msjToast,positionToast,timerToast)
                        SAToastsVar.getToast()

                    }
                }

            },
            changeDataIs(dataIs) {
                if(Number.parseInt(dataIs) === 1){
                        return 'Si'
                    } else {
                        return 'No'
                    }
            },

        },
        computed: {
         ...mapGetters({ getUserApi: 'auth/getUserApi'}),

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
            passwordConfirmationRule() {
                return () => (this.iNewPass === this.iNewPassRe) || 'Las contraseñas no coinciden.'
            }
        },
        created() {
            this.dataClients()
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

    .content-account {
        display: flex;
    }

    .account-info-subtitle {
        font-size: 14px;
        color: grey;
        padding-top: 2px;
    }

    .account-no-info {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        color: #f2f2f2;
        font-size: 25px;
    }

    .account-header-edit {
        font-size: 20px;
    }

    .account-subheader-edit {
        font-size: 12px;
        color: #4b4b4b;
    }

    .account-sub-item-access {
        display: flex;
    }

    .client-container-info {
        position: sticky;
        top:10px;
    }

</style>