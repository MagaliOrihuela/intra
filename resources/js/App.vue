<template>
  <div>
    <v-app class="l">
       <v-overlay 
         :value="loaderFull"
         color="white"
         opacity="0.98"
         class="app-overlay"
      >
         <div>
            <v-img
               src="/images/loading.gif"
               max-width="120px"
            ></v-img>
         </div>
      </v-overlay>
      <MainLayoutApp/>
      <router-view />
    </v-app>
  </div>
</template>

<script>

   import { mapGetters } from 'vuex'
   import MainLayoutApp from './components/MainLayoutComponent.vue'

export default {
  name: "App",
   components: { MainLayoutApp},
  computed: {
      ...mapGetters({ 
         loaderFull: 'modals/getLoaderfull' 
      }),
  },
  created() {
   
  },
};
</script>

<style scoped>
   .l {
      background-color: #f7f7f7;
   }

   .dt_info {
      text-decoration: none;
      font-weight: 400;
   }

   .app-overlay {
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 99999;
   }

   .app-overlay-text {
      display: flex;
      justify-content: center;
      color: #ABABAB;
   }

   
  .thumb-list {
     display: none !important;
  }
</style>