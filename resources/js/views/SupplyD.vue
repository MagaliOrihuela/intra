<template>
  <div>
    <SupplyDComponent />
    <SupplyModal />
    <PackModal />
  </div>
</template>

<script>
import SupplyDComponent from "../components/warehouse/SupplyDComponent";
import SupplyModal from "../components/warehouse/SupplyModal";
import PackModal from "../components/warehouse/PackModal";

export default {
  name: "supplyD",
  components: {
      SupplyDComponent,
      SupplyModal,
      PackModal
  },
};
</script>

<style></style>