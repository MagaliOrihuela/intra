<template>
    <div>
        <v-card
            max-width="100%"
        >
            <v-card-title>
                <v-icon color="red">mdi-menu-right</v-icon>
                Liberadas
            </v-card-title>
            <v-card-actions class="px-12">
                <v-data-table
                    :headers="headers"
                    :items="invoices"
                    :items-per-page="5"
                    class="elevation-0 "
                    dense
                    style="width: 100%;"
                    hide-default-footer
                >
                    <template #[`item.options`]="{ item }">
                        <v-btn 
                            color="shades_four" 
                            :to=item.view
                            small
                            @click="releaseInvoice(item.invoice_id)"
                            text
                            dark
                            v-bind="attrs"
                            v-on="on"
                        >
                            <v-icon left>mdi-clipboard-search-outline</v-icon>
                            Liberar factura
                        </v-btn>
                    </template>
                </v-data-table>
            </v-card-actions>
        </v-card>
    </div>
</template>
<script>
    import SAQuestions from '../../services/SweetAlertQuestion'
    import SAToasts from '../../services/SweetAlertToast'

    export default {
        data () {
            return {
                headers:
                [
                    {
                        text: 'Factura',
                        align: 'start',
                        value: 'invoice_id',
                    },
                    { text: 'cliente', value: 'client' },
                    { text: 'Nombre', value: 'client_id' },
                    { text: 'Nombre Cliente', value: 'name_client' },
                    { text: 'Agente', value: 'agent' },
                    { text: 'Total', value: 'total' },
                    { text: 'Status', value: 'status' },
                    { text: 'Fecha de registro', value: 'created_at' },
                    {
                        text: '',
                        sortable: false,
                        value: 'options'
                    }
                ],
                invoices:
                [
                    {
                        invoice_id: 124587,
                        client: 159,
                        name_client: 6.0,
                        agent: 24,
                        total: 4.0,
                        status: '1%',
                        created_at: '1%',
                        actions: '1%',
                    },
                ],
            }
        },
        methods: {

        },
    }
</script>
<style scoped>

</style>