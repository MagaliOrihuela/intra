<template>
   <div>
      <v-card
         class="mx-auto rounded-0 border-0 facturacion-shades"
         max-width="99%"
         elevation="0"
         transition="scale-transition"
      >
         <v-card-title 
            class="h4 invoice-header-text mb-0 pb-1 pt-2"
         >
            <v-icon color="red" left>
               mdi-clipboard-edit-outline
            </v-icon>
            Pedidos
         </v-card-title>
         <v-tabs
            color="shades_five"
            centered
            height="30px"
         >
            <v-tab
               @click="tabOrder = 'tab1'"
            >
               Por liberar    <!-- Por surtir (Sai)-->
               <v-icon right>
                  mdi-clipboard-alert-outline
               </v-icon>
            </v-tab>
            <v-tab
               @click="tabOrder = 'tab2'"
            >
               Por surtir     <!-- Por surtir (interno) -->
               <v-icon right>
                  mdi-clipboard-clock-outline
               </v-icon>
            </v-tab>
            <v-tab
               @click="tabOrder = 'tab3'"
            >
               Remisionados   <!-- Surtido interno -->
               <v-icon right>
                  mdi-clipboard-check-outline
               </v-icon>
            </v-tab>
            <v-tab
               @click="tabOrder = 'tab4'"
            >
               Facturados     <!-- Surtido (Sai) -->
               <v-icon right>
                  mdi-clipboard-file-outline
               </v-icon>
            </v-tab>
            <v-tab
               @click="tabOrder = 'tab4'"
            >
               Por liquidar   <!-- Parcial  (Sai) -->
               <v-icon right>
                  mdi-clipboard-file-outline
               </v-icon>
            </v-tab>
            <v-tab
               @click="tabOrder = 'tab5'"
            >
               Cancelados     <!-- Cancelados  (Sai) -->
               <v-icon right>
                  mdi-clipboard-remove-outline
               </v-icon>
            </v-tab>
         </v-tabs>
         <v-tabs-items v-model="tabOrder">
            <v-tab-item
               value="tab1"
            >
               <orderStock />
            </v-tab-item>
            <v-tab-item
               value="tab2"
            >
               <ordersFree />
            </v-tab-item>
            <v-tab-item
               value="tab3"
            >
               <ordersSurt />
            </v-tab-item>
            <v-tab-item
               value="tab4"
            >
               <ordersSurt />
            </v-tab-item>
            <v-tab-item
               value="tab5"
            >
               <ordersCanc />
            </v-tab-item>
         </v-tabs-items>
      </v-card>
   </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import orderStock from "../orders/OrderStockComponent.vue"
import ordersFree from "../orders/OrdersFreeComponent.vue"
import ordersSurt from "../orders/OrdersSurtComponent.vue"
import ordersCanc from "../orders/OrdersCancelComponent.vue"

  export default {
      data () {
         return { 
            tabOrder: 'tab1',
         }
      },
      computed: {
         ...mapGetters({ 
               getUserApi: 'auth/getUserApi', 
            }),
      },
      components:{
         orderStock,
         ordersFree,
         ordersSurt,
         ordersCanc,
      },
      methods: {
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