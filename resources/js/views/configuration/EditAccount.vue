<template>
  <div>
    <EditAccountComponent/>
    <EditCotFormComponent/>
  </div>
</template>

<script>
import EditAccountComponent from "../../components/configuration/EditAccountComponent.vue";
import EditCotFormComponent from "../../components/cotizaciones/EditCotFormComponent";
export default {
  name: "Accounts",
  components: {
   EditAccountComponent,
   EditCotFormComponent,
  }
};
</script>

<style></style>