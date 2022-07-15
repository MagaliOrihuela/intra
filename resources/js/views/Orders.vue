<template>
  <div>
    <ModalLoginComponent />
    <OrdersComponent />
  </div>
</template>

<script>
import ModalLoginComponent from "../components/ModalLoginComponent";
import OrdersComponent from "../components/orders/OrdersComponent";

export default {
  name: "Orders",
  components: {
      ModalLoginComponent,
      OrdersComponent,
  },
};
</script>

<style></style>