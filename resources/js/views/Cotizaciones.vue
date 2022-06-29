<template>
  <div>
    <ViewCotizacionesComponent />
    <ViewDetailCotizacionesComponent />
  </div>
</template>

<script>
import ViewCotizacionesComponent from "../components/cotizaciones/ViewCotizacionesComponent";
import ViewDetailCotizacionesComponent from "../components/cotizaciones/ViewDetailCotizacionesComponent";

export default {
  name: "Cotizaciones",
  components: {
   ViewCotizacionesComponent,
   ViewDetailCotizacionesComponent,
  }
};
</script>

<style>
</style>