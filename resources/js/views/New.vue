<template>
  <div>
    <ModalLoginComponent />
    <EditCotFormComponent />
    <NewComponent />
  </div>
</template>

<script>
import ModalLoginComponent from "../components/ModalLoginComponent";
import EditCotFormComponent from "../components/cotizaciones/EditCotFormComponent";
import NewComponent from "../components/news/NewComponent.vue";
export default {
  name: "Cotizaciones",
  components: {
    ModalLoginComponent,
    EditCotFormComponent,
    NewComponent,
  }
};
</script>

<style></style>