<template>
  <div>
    <ModalLoginComponent />
    <NewsToolsComponent />
  </div>
</template>

<script>
import ModalLoginComponent from "../../components/ModalLoginComponent";
import NewsToolsComponent from "../../components/tools/NewsToolsComponent";
export default {
  name: "Cotizaciones",
  components: {
      ModalLoginComponent,
      NewsToolsComponent,
  }
};
</script>

<style></style>