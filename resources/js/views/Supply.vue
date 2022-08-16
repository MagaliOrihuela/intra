<template>
  <div>
    <ModalLoginComponent />
    <SupplyComponent/>
  </div>
</template>

<script>
import ModalLoginComponent from "../components/ModalLoginComponent";
import SupplyComponent from "../components/warehouse/SupplyComponent.vue";
export default {
  name: "supply",
  components: {
    ModalLoginComponent,
    SupplyComponent,
  }
};
</script>

<style></style>