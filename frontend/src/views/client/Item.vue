<script>
import Footer from "../../components/client/Footer.vue";
import Navbar from "../../components/client/Navbar.vue";
import ItemLayout from "../../components/client/layouts/ItemLayout.vue";

export default {
  name: "Item",
  components: {ItemLayout, Navbar, Footer}
}
</script>

<template>
  <Navbar />
  <div class="pt-16">
    <div class="grid">
      <div class="">
        <ItemLayout />
      </div>
      <Footer />
    </div>
  </div>
</template>

<style scoped>


div {
  font-family: 'Exo 2', sans-serif;
}
</style>