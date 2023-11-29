<script>
import ItemListLayout from "../../components/client/layouts/ItemListLayout.vue";
import Footer from "../../components/client/Footer.vue";
import Navbar from "../../components/client/Navbar.vue";

export default {
  name: "Item",
  components: {Navbar, Footer, ItemListLayout}
}
</script>

<template>
  <Navbar />
  <div class="pt-16">
    <div class="grid">
      <div class="">
        <ItemListLayout />
      </div>
      <Footer />
    </div>
  </div>
</template>

<style scoped>

</style>