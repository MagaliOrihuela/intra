<template>
    <div>
        <v-card
            class="mx-auto rounded-0 border-0 facturacion-shades"
            max-width="99%"
            elevation="0"
            transition="scale-transition"
        >
            <v-card-title class="h4 invoice-header-text">
                <v-icon color="red" left>
                    mdi-archive-outline
                </v-icon>
                Facturas
            </v-card-title>
            <v-tabs
                color="shades_five"
                centered
                height="40px"
            >
                <v-tab
                    @click="tabInvoice = 'tab1'"
                >
                    Facturas
                    <v-icon right>
                        mdi-archive-outline
                    </v-icon>
                </v-tab>
                <v-tab
                    @click="tabInvoice = 'tab2'"
                >
                    Liberadas
                    <v-icon right>
                        mdi-lock-open-variant-outline
                    </v-icon>
                </v-tab>
                <v-tab
                    @click="tabInvoice = 'tab3'"
                >
                    Procesadas
                    <v-icon right>
                        mdi-check
                    </v-icon>
                </v-tab>
            </v-tabs>
            
            <v-tabs-items v-model="tabInvoice">

                <v-tab-item
                    value="tab1"
                >
                    <InvoicesReleased />
                </v-tab-item>
                <v-tab-item
                    value="tab2"
                >
                    <ReleaseInvoice />
                </v-tab-item>
                <v-tab-item
                    value="tab3"
                >
                    <ProcessedInvoices />
                </v-tab-item>
            </v-tabs-items>
        </v-card>
    </div>
</template>
<script>

    import { mapGetters } from 'vuex';
    import ProcessedInvoices from '../invoice/ProcessedInvoicesComponent.vue';
    import ReleaseInvoice from '../invoice/ReleaseInvoiceComponent.vue';
    import InvoicesReleased from '../invoice/InvoicesReleasedComponent.vue';

    export default {
        data () {
            return {
                tabInvoice:'tab1',
            }
        },
        methods: {
        },
        components: {
            InvoicesReleased,
            ProcessedInvoices,
            ReleaseInvoice,
        },
        computed: {
            ...mapGetters({
                getUserApi: 'auth/getUserApi',
            }),

        },
        created(){
            this.$store.dispatch('modals/loaderfull',false); // desactivamos el overlay cargando
        },
    }
</script>
<style scoped>

    .facturacion-shades {
        margin-top: 40px;
    }

    .invoice-header-text {
        color: #838383;
    }
</style>
