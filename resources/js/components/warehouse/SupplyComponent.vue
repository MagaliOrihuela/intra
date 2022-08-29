<template>
   <div>
      <v-card
         class="mx-auto rounded-0 border-0 facturacion-shades"
         max-width="99%"
         elevation="0"
         transition="scale-transition"
      >
         <v-card-title
            class="headline mb-1"
         >
            <v-icon
               color="red darken-1"
               class="pr-2"
            > 
               mdi-dolly
            </v-icon>Surtir

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
                  mdi-clipboard-clock-outline
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
         </v-tabs>
         <v-tabs-items v-model="tabOrder">
            <v-tab-item
               value="tab1"
            >
               <Supplies />
            </v-tab-item>
            <v-tab-item
               value="tab2"
            >
               <SupplyChk />
            </v-tab-item>
         </v-tabs-items>
      </v-card>
   </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import Supplies from "../warehouse/SuppliesComponent.vue"
import SupplyChk from "../warehouse/SupplyChkComponent.vue"

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
         Supplies,
         SupplyChk
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