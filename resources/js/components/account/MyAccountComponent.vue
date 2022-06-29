<template>

    <div>    
        <v-card
            class="mx-auto"
            max-width="70%"
            outlined
        >
            <v-list-item three-line>
                <v-list-item-content>
                    <v-list-item-title class="text-h5 mb-1 pb-4">
                        Mi Cuenta
                    </v-list-item-title>
                    <v-list-item-subtitle class="pb-4" v-model="emailUser">
                        <div class="myaccount-subtitle pb-2" > <v-icon>mdi-email-outline</v-icon> Correo Registrado: </div>
                        <div class="pl-7">{{ emailUser }}</div>
                    </v-list-item-subtitle> 
                    <v-list-item-subtitle class="pb-4" v-model="idClientUser">
                        <div class="myaccount-subtitle pb-2" ><v-icon>mdi-account-outline</v-icon> Número de Cliente: </div>
                        <div class="pl-7">{{ idClientUser }}</div>
                    </v-list-item-subtitle> 
                    <v-list-item-subtitle class="pb-4" v-model="MyNumber">
                        <div class="myaccount-subtitle pb-2" ><v-icon>mdi-cellphone</v-icon> Telefono Registrado: </div>
                        <div class="pl-7">{{ MyNumber }}</div>
                    </v-list-item-subtitle> 
                    <v-list-item-subtitle class="pb-4">
                        <div class="myaccount-subtitle pb-2" ><v-icon>mdi-lock-outline</v-icon> Password: </div>
                        <div class="pl-7">*********** <a class="myaccount-passreset pl-10" @click="activePassReset=true">editar</a></div>
                    </v-list-item-subtitle> 
                </v-list-item-content>

                <v-list-item-avatar
                    tile
                    size="180"
                >
                    <v-avatar size="180">
                        <v-img :src="urlImgUsr" ></v-img> 
                    </v-avatar>
                </v-list-item-avatar>
                
                    <v-btn
                        color="blue-grey lighten-4"
                        fab
                        small
                        dark
                        class="v-btn--example"
                        @click="activeImgChange = true"
                    >
                        <v-icon color="blue-grey darken-4">mdi-camera-outline</v-icon>
                    </v-btn>
            </v-list-item>

        </v-card>

        <!-- Modal para password resset -->

        <v-dialog
            v-model="activePassReset"
            persistent
            max-width="400px"
        >
            <v-card>
                <v-card-title>
                    <span class="text-h5"> <v-icon size="35" left>mdi-lock-reset</v-icon> Password Reset</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col
                                cols="12"
                            >
                                <v-text-field
                                    v-model="iOldPass"
                                    label="Contraseña actual*"
                                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                    :type="show1 ? 'text' : 'password'"
                                    @click:append="show1 = !show1"
                                    :error-messages="OldPassErrors"
                                    @input="$v.iOldPass.$touch()"
                                    dense
                                >
                                </v-text-field>
                            </v-col>
                            <v-col
                                cols="12"
                            >
                                    <v-text-field
                                        v-model="iNewPass"
                                        label="Nueva Contraseña*"
                                        :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                                        :type="show2 ? 'text' : 'password'"
                                        @click:append="show2 = !show2"
                                        :error-messages="NewPassErrors"
                                        @input="$v.iNewPass.$touch()"
                                        :rules="[rules.min]"
                                        counter
                                        dense
                                        autocomplete="nope"
                                    ></v-text-field>
                            </v-col>
                            <v-col
                                cols="12"
                            >
                                <v-text-field
                                    v-model="iNewPassRe"
                                    label="Repite la nueva contraseña*"
                                    :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                                    :type="show3 ? 'text' : 'password'"
                                    @click:append="show3 = !show3"
                                    :error-messages="NewPassReErrors"
                                    @input="$v.iNewPassRe.$touch()"
                                    :rules="[rules.min]"
                                    counter
                                    dense
                                    autocomplete="nope"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                    <small style="color:red">* Indica campo requerido </small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="blue-grey darken-4"
                        text
                        @click="cancelPassReset()"
                    >
                        <v-icon left>mdi-close</v-icon> Cancelar
                    </v-btn>
                    <v-btn
                        color="blue-grey darken-4"
                        text
                        @click="savePassReset()"
                    >
                        <v-icon left>mdi-content-save-outline</v-icon> Guardar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- Modal para password resset -->

        <v-dialog
            v-model="activeImgChange"
            persistent
            max-width="400px"
        >
            <v-card>
                <v-card-title>
                    <span class="text-h5"> <v-icon size="35" left>mdi-camera-flip-outline</v-icon> Cambiar foto de perfil</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col
                                cols="12"
                            >
                                <v-file-input
                                    v-model="imgNew"
                                    prepend-icon="mdi-camera"
                                    label="foto de perfil "
                                ></v-file-input>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="blue-grey darken-4"
                        text
                        @click="cancelImgChange()"
                    >
                        <v-icon left>mdi-close</v-icon> Cancelar
                    </v-btn>
                    <v-btn
                        color="blue-grey darken-4"
                        text
                        @click="saveImgChange()"
                    >
                        <v-icon left>mdi-content-save-outline</v-icon> Guardar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>


    </div>    
</template>
<script>

    import { validationMixin } from 'vuelidate'
    import { minLength, requiredIf } from 'vuelidate/lib/validators'
    import { mapGetters } from 'vuex'
    import { storage } from '../../utils/firebase'
    import SAToasts from '../../services/SweetAlertToast'
    const refFB = storage.ref()

    export default {
        data () {
            return {
                emailUser: '',
                idClientUser: '',
                MyNumber: '',
                urlImgUsr: '',
                activePassReset: false,
                activeImgChange: false,
                show1: false,
                show2: false,
                show3: false,

                
                iOldPass: '',
                iNewPass: '',
                iNewPassRe: '',
                imgNew: [],

                rOldPasss: true,
                rNewPass: true,
                rNewPassRe: true,

                isBanOldPass: 0,
                isBanChkPass: 0,
                rules: {
                    min: v => v.length >= 8 || 'Min 8 characters',
                },
            }
        },mixins: [validationMixin],
        validations: {
            iOldPass: {
                required: requiredIf(function() {
                    return this.rOldPasss;
                })
            },
            iNewPass: { 
                required: requiredIf(function() {
                    return this.rNewPass;
                }),
                minLength: minLength(8)
            },
            iNewPassRe: { 
                required: requiredIf(function() {
                    return this.rNewPassRe;
                })
                ,minLength: minLength(8)
            },
        },
        methods: {
            async getDataMyAccount () {

                this.emailUser = this.getUserApi.email
                this.idClientUser = this.getUserApi.cid
                this.MyNumber = '00000000'

               if( this.getUserApi.user_img != '' ) {
                    var imgNewsCrsFB = storage.ref('/usr/'+this.getUserApi.user_img)
                    imgNewsCrsFB.getDownloadURL().then((url) => { this.urlImgUsr = url })
               }
        
            },
            async savePassReset() {

                this.isBanOldPass = 1
                this.isBanChkPass = 1
                this.$v.$touch()
                if (!this.$v.$invalid) {

                    let payload = {
                        token: this.getUserApi.token,
                        user_id: this.getUserApi.uid,
                        password: this.iOldPass
                    }

                    // primero validamos que la contraseña sea la correcta 
                    const { data } = await axios.post('/auth/validate_password',payload)
                    this.isBanOldPass = 2 
                    if(data.success) {

                        if(this.iNewPass == this.iNewPassRe) {

                            let payload = {
                                token: this.getUserApi.token,
                                user_id: this.getUserApi.uid,
                                passwordNew: this.iNewPass,
                            }

                            const { data } = await axios.post('/auth/renew_password',payload)
                            if(data.success) {
                                this.activePassReset = false

                                var iconToast = 'success'
                                var msjToast = '¡Contraseña ingresada con éxito!'
                                var positionToast = 'bottom-end'
                                var timerToast = 4000
                                const SAToastsVar = new SAToasts(iconToast,msjToast,positionToast,timerToast)
                                SAToastsVar.getToast()
                                
                                this.iOldPass = ''
                                this.iNewPass = ''
                                this.iNewPassRe = ''
                                this.$v.$reset()
                            }

                        } else {

                            this.isBanChkPass = 2
                            this.iNewPassRe = ''
                            !this.$v.iNewPassRe.$dirty
                            this.$v.$touch()
                        }

                        

                    } else {

                        this.iOldPass = ''
                        !this.$v.iOldPass.$dirty
                        this.$v.$touch()
                    }


                }

            },
            cancelPassReset() {
                this.activePassReset = false
                    
                this.iOldPass = ''
                this.iNewPass = ''
                this.iNewPassRe = ''
                this.$v.$reset()
            },
            async saveImgChange() {

                // creamos el nombre que llevara la imagen

                var nameImg = this.imgNew.name 
                const img_news_ext = nameImg.split('.').pop();
                const nameImgNew = 'user_'+this.getUserApi.uid+'.'+img_news_ext

                let payload = {
                    token: this.getUserApi.token,
                    user_id: this.getUserApi.uid,
                    nameImg: nameImgNew
                }

                const { data } = await axios.post('/auth/save_img_profile',payload)
                if(data.success) {


                    // borramos la imagen anterior
                    if(data.name_img_old != null) {
                        const refDel = refFB.child('usr/'+data.name_img_old)
                        refDel.delete().then( )
                    }
                    
                    const refNews = refFB.child('usr/'+nameImgNew)
                    var metadata = { contentType: 'image/'+img_news_ext }
                    refNews.put(this.imgNew,metadata).then( )

                    // cambiamos el user_img del store para que lo visualice el usuario
                    this.$store.dispatch('auth/changeImgUser',nameImgNew);
                    
                    this.activeImgChange = false

                    var iconToast = 'success'
                    var msjToast = '¡Imagen guardada con éxito!'
                    var positionToast = 'bottom-end'
                    var timerToast = 4000
                    const SAToastsVar = new SAToasts(iconToast,msjToast,positionToast,timerToast)
                    SAToastsVar.getToast()

                    
                    var imgNewsCrsFB = storage.ref('/usr/'+nameImgNew)
                    imgNewsCrsFB.getDownloadURL().then((url) => { this.urlImgUsr = url })
                    
                    this.imgNew = []
                }
                              
            },
            cancelImgChange() {
                this.activeImgChange = false
                this.imgNew = []
            },
        },
        computed: {
        ...mapGetters({ 
                getUserApi: 'auth/getUserApi', 
            }),
            OldPassErrors() {
                const errors = []
                if (!this.$v.iOldPass.$dirty) return errors
                if(Number.parseInt(this.isBanOldPass) === 1) {
                    !this.$v.iOldPass.required && errors.push('Necesitas ingresar la contraseña. ')
                } 
                if(Number.parseInt(this.isBanOldPass) === 2) {
                    !this.$v.iOldPass.required && errors.push('La contraseña que proporcionaste no es la correcta. ')
                }
                return errors
            },
            NewPassErrors(){
                const errors = []
                if (!this.$v.iNewPass.$dirty) return errors
                !this.$v.iNewPass.required && errors.push('Necesitas ingresar la contraseña. ')
                return errors
            },
            NewPassReErrors(){
                const errors = []
                if (!this.$v.iNewPassRe.$dirty) return errors
                if(Number.parseInt(this.isBanChkPass) === 1) {
                    !this.$v.iNewPassRe.required && errors.push('Necesitas ingresar la contraseña. ')
                } 
                if(Number.parseInt(this.isBanChkPass) === 2) {
                    !this.$v.iNewPassRe.required && errors.push('Las contraseñas no coinciden. ')
                }
                return errors
            },

        },
        created(){
            this.getDataMyAccount()
        },
    }
</script>
<style scoped>
    .myaccount-subtitle {
        font-size: 17px;
        font-weight: 500;
    }

    .myaccount-passreset {
        color: blue;
        font-weight: 500;
    }

    .v-btn--example {
        top: 150px;
        right: 20px;
        position: absolute;
        margin: 0 0 16px 16px;
    }

</style>