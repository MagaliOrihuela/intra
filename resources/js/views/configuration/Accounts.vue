<template>
  <div>
    <AccountComponent/>
    <EditCotFormComponent/>
  </div>
</template>

<script>
import AccountComponent from "../../components/configuration/AccountComponent.vue";
import EditCotFormComponent from "../../components/cotizaciones/EditCotFormComponent";
export default {
  name: "Accounts",
  components: {
   AccountComponent,
   EditCotFormComponent,
  }
};
</script>

<style></style>