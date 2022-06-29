<template>
    <div>
        <ModalLoginComponent />
        <InvoiceComponent/>
        <NewCotFormComponent/>
    </div>
</template>

<script>
import ModalLoginComponent from "../../components/ModalLoginComponent";
import NewCotFormComponent from "../../components/cotizaciones/NewCotFormComponent";
import InvoiceComponent from "../../components/invoice/InvoiceComponent";

export default {
    name: "Liberar",
    components: {
        ModalLoginComponent,
        NewCotFormComponent,
        InvoiceComponent,
    }
};
</script>
<style scoped>

</style>