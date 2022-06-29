<template>
   <div>
        <v-card
            class="mx-auto rounded-0 border-0 card-general"
            max-width="99%"
            :elevation="0"
        >
            <v-container fluid>
                <v-row>
                    <v-col
                        xs="12"
                        sm="12"
                        md="4"
                        lg="4"
                        xl="4"
                    >
                        <v-card
                            class="mx-auto"
                            max-width="100%"
                            outlined
                        >
                            <v-list-item three-line>
                                <v-list-item-content>
                                    <v-list-item-title class="text-h5 mb-1">
                                        Crear cuenta nueva
                                    </v-list-item-title>
                                    <v-list-item-subtitle>al crear una cuenta nueva das acceso al sistema del cotizador</v-list-item-subtitle>
                                </v-list-item-content>

                                <v-list-item-avatar
                                    tile
                                    size="80"
                                >
                                    <v-icon size="70px" color="blue-grey darken-1" right>
                                        mdi-account-plus-outline
                                    </v-icon>
                                </v-list-item-avatar>
                            </v-list-item>

                            <v-card-actions>
                            <v-btn
                                outlined
                                text
                                dense
                                block
                                to="nueva_cuenta"
                            >
                                Ingresar
                            </v-btn>
                            </v-card-actions>
                        </v-card>

                    </v-col>
                    <v-col
                        xs="12"
                        sm="12"
                        md="4"
                        lg="4"
                        xl="4"
                    >

                        <v-card
                            class="mx-auto"
                            max-width="100%"
                            outlined
                        >
                            <v-list-item three-line>
                                <v-list-item-content>
                                    <v-list-item-title class="text-h5 mb-1">
                                        Editar cuenta
                                    </v-list-item-title>
                                    <v-list-item-subtitle>Edita una cuenta ya creada, habilita o quita accesos, deshabilita cuentas...</v-list-item-subtitle>
                                </v-list-item-content>

                                <v-list-item-avatar
                                    tile
                                    size="80"
                                >
                                    <v-icon size="70px" color="blue-grey darken-1" right>
                                        mdi-card-account-details-outline
                                    </v-icon>
                                </v-list-item-avatar>
                            </v-list-item>

                            <v-card-actions>
                            <v-btn
                                outlined
                                text
                                dense
                                block
                                to="editar_cuenta"
                            >
                                Ingresar
                            </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                    <v-col
                        xs="12"
                        sm="12"
                        md="4"
                        lg="4"
                        xl="4"
                    >

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

            }
        },
        methods: {

        },
        created() {
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
</style>