<template>
  <div>
    <AccountComponent />
    <ModalLoginComponent />
    <NewCotFormComponent/>
  </div>
</template>

<script>
import AccountComponent from "../../components/account/AccountComponet"; 
import ModalLoginComponent from "../../components/ModalLoginComponent";
import NewCotFormComponent from "../../components/cotizaciones/NewCotFormComponent"; 

export default {
   name: "Account",
   components: { 
      AccountComponent,
      ModalLoginComponent,
      NewCotFormComponent,
   }
};
</script>

<style></style>