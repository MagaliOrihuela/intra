<template>
   <div>
      <v-card
         class="mx-auto rounded-0 border-0 facturacion-shades"
         max-width="99%"
         elevation="0"
         transition="scale-transition"
      >
         <!-- <v-progress-linear
            :active="loading"
            :indeterminate="loading"
            absolute
            top
            color="red darken-4"
         ></v-progress-linear> -->
         <v-card-title class="h4 invoice-header-text">
            <v-icon color="red" left>
               mdi-clipboard-edit-outline
            </v-icon>
            Pedidos
         </v-card-title>
         <v-tabs
            color="shades_five"
            centered
            height="40px"
         >
            <v-tab
               @click="tabOrder = 'tab1'"
            >
               Por surtir
               <v-icon right>
                  mdi-clipboard-alert-outline
               </v-icon>
            </v-tab>
            <v-tab
               @click="tabOrder = 'tab2'"
            >
               Surtidos
               <v-icon right>
                  mdi-clipboard-check-outline
               </v-icon>
            </v-tab>
            <v-tab
               @click="tabOrder = 'tab3'"
            >
               Cancelados
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
               <ordersSurt />
            </v-tab-item>
            <v-tab-item
               value="tab3"
            >
            </v-tab-item>
         </v-tabs-items>
      </v-card>
   </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import orderStock from "../orders/OrderStockComponent.vue"
import ordersSurt from "../orders/OrdersSurtComponent.vue"

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
         ordersSurt,

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