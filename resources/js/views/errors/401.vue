<template>
   <v-container fill-height>
      <v-row justify="center" align="center">
         <v-col cols="4" class="text-center">
               <v-img
                  :src="getHeaderImg()"
                  width="100%"
               ></v-img>
               <p class="font-weight-medium text--colordef"> 401 | Not Authorize</p>
               
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

         getHeaderImg() {
            return require('../../../assets/logos_grey.png') 
         },

      },
  }
</script>
<style scoped>
  .text--colordef {
    color:#5F5F5F;
  }

</style>