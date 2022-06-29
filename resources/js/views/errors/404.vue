<template>
   <v-container fill-height>
      <v-row justify="center" align="center">
         <v-col cols="4" class="text-center">
               <div >
                  <v-img
                     src="/images/404.png"
                     width="50%"
                     class="img-not-found"
                  ></v-img>
               </div>
               <p class="font-weight-medium text--colordef"> 404 | Not found</p>
               <v-btn 
                  block 
                  small 
                  class="mt-4"
                  @click="$router.go(-1)"
               >
                  <v-icon color="grey darken-1">
                     mdi-keyboard-return
                  </v-icon>
                  <a  class="text--colordef">Regresar</a>
               </v-btn>
               
         </v-col>
      </v-row>
   </v-container>
</template><script>
   export default {
      data () {
         return {
         }
      },
      methods: {


      },
      created() {
         setTimeout(() => this.$store.dispatch('modals/loaderfull',false), 2000); // desactivamos el overlay cargando
      }
  }
</script>
<style scoped>
  .text--colordef {
    color:#5F5F5F;
  }

.img-not-found {
   display: flex;
   justify-content: center;
   margin-left: 25%;
   margin-bottom: 50px;
}
</style>