<template>
  <div>
    <ModalLoginComponent />
    <EditCotFormComponent/>
    <br>
    <br>
    <br>
    <br>
    <br>
    hola
  </div>
</template>

<script>
import ModalLoginComponent from "../components/ModalLoginComponent";
import EditCotFormComponent from "../components/cotizaciones/EditCotFormComponent";
export default {
  name: "Cotizaciones",
  components: {
    ModalLoginComponent,
    EditCotFormComponent,
  }
};
</script>

<style></style>