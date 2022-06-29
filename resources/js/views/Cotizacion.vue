<template>
  <div>
    <ViewCotizacionComponent/>
    <EditCotFormComponent/>
  </div>
</template>

<script>
import ViewCotizacionComponent from "../components/cotizaciones/ViewCotizacionComponent";
import EditCotFormComponent from "../components/cotizaciones/EditCotFormComponent";
export default {
  name: "Cotizaciones",
  components: {
   ViewCotizacionComponent,
   EditCotFormComponent,
  }
};
</script>

<style></style>