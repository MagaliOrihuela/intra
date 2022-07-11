<template>
  <div>
    <ModalLoginComponent />
    <OrderComponent />
  </div>
</template>

<script>
import ModalLoginComponent from "../components/ModalLoginComponent";
import OrderComponent from "../components/orders/OrderComponent";

export default {
  name: "Orders",
  components: {
      ModalLoginComponent,
      OrderComponent,
  },
};
</script>

<style></style>