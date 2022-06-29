<template>
  <div>
    <router-view />
    <ModalLoginComponent />
    <NewCotFormComponent/>
  </div>
</template>

<script>
import ModalLoginComponent from "../components/ModalLoginComponent";
import NewCotFormComponent from "../components/cotizaciones/NewCotFormComponent";

export default {
  name: "Cotizaciones",
  components: {
   ModalLoginComponent,
   NewCotFormComponent,
  }
};
</script>

<style>
</style>