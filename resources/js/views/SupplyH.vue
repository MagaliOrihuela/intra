<template>
  <div>
    <OrderDComponent />
    <OrderFreeModal />
  </div>
</template>

<script>
import OrderDComponent from "../components/orders/OrderDComponent";
import OrderFreeModal from "../components/orders/OrderFreeModal";

export default {
  name: "SupplyH",
  components: {
      OrderDComponent,
      OrderFreeModal,
  },
};
</script>

<style></style>