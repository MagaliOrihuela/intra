<template>
  <div>
    <SupplyDComponent />
    <SupplyModal />
    <PackModal />
    <ValModal />
  </div>
</template>

<script>
import SupplyDComponent from "../components/warehouse/SupplyDComponent";
import SupplyModal from "../components/warehouse/SupplyModal";
import PackModal from "../components/warehouse/PackModal";
import ValModal from "../components/warehouse/ValidateModal";

export default {
  name: "supplyD",
  components: {
      SupplyDComponent,
      SupplyModal,
      PackModal,
      ValModal
  },
};
</script>

<style></style>