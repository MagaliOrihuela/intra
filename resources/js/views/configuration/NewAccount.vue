<template>
  <div>
    <NewAccountComponent/>
    <EditCotFormComponent/>
  </div>
</template>

<script>
import NewAccountComponent from "../../components/configuration/NewAccountComponent.vue";
import EditCotFormComponent from "../../components/cotizaciones/EditCotFormComponent";
export default {
  name: "Accounts",
  components: {
   NewAccountComponent,
   EditCotFormComponent,
  }
};
</script>

<style></style>