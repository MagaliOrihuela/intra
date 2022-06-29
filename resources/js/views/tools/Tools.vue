<template>
  <div>
    <ModalLoginComponent />
    <MenuToolsComponents />

  </div>
</template>

<script>
import ModalLoginComponent from "../../components/ModalLoginComponent";
import MenuToolsComponents from "../../components/tools/MenuToolsComponents";
export default {
  name: "Cotizaciones",
  components: {
      ModalLoginComponent,
      MenuToolsComponents,
  }
};
</script>

<style></style>