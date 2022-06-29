<template>
   <div>
     <vue-html2pdf
        :show-layout="false"
        :float-layout="true"
        :enable-download="true"
        :preview-modal="true"
        :paginate-elements-by-height="1400"
        :filename="name_file"
        :pdf-quality="2"
        :manual-pagination="false"
        pdf-format="Letter"
        pdf-orientation="portrait"
        pdf-content-width="800px"

        @progress="onProgress($event)"
        @hasStartedGeneration="hasStartedGeneration()"
        @hasGenerated="hasGenerated($event)"
        ref="html2Pdf"
    >
        <section slot="pdf-content">
            <v-container>
                <v-row>
                    <v-col> hola </v-col>
                    <v-col> mundo </v-col>
                    <v-col> buenas </v-col>
                    <v-col> tardes </v-col>
                </v-row>
            </v-container>
        </section>
    </vue-html2pdf>
    <v-btn depressed @click="generateReport()">
        descargar
    </v-btn>
   </div>
</template>

<script>
import VueHtml2pdf from 'vue-html2pdf'

    export default {
        data () {
            return {
                name_file: 'FCT-202120',
            }
        },
        components: {
        VueHtml2pdf
        },

        methods: {
            generateReport () {
                this.$refs.html2Pdf.generatePdf()
            }
        },
    }

</script> 