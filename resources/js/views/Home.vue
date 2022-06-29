<template>
  <div>
    <CarouselComponent />
    <TopNewsComponent />
    <ModalLoginComponent />
    <NewCotFormComponent/>
  </div>
</template>

<script>
import ExampleComponent from "../components/ExampleComponent";
import CarouselComponent from "../components/home/CarouselComponent";
import TopNewsComponent from "../components/home/TopNewsComponent";
import ModalLoginComponent from "../components/ModalLoginComponent";
import NewCotFormComponent from "../components/cotizaciones/NewCotFormComponent";

export default {
   name: "Home",
   components: {
      ExampleComponent,
      CarouselComponent,
      TopNewsComponent,
      ModalLoginComponent,
      NewCotFormComponent,
   }
};
</script>

<style></style>