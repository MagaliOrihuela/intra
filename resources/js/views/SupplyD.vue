<template>
  <div>
    <SupplyDComponent />
    <SupplyModal />
  </div>
</template>

<script>
import SupplyDComponent from "../components/warehouse/SupplyDComponent";
import SupplyModal from "../components/warehouse/SupplyModal";

export default {
  name: "supplyD",
  components: {
      SupplyDComponent,
      SupplyModal,
  },
};
</script>

<style></style>