<script>
import Footer from "../../components/client/Footer.vue";
import Navbar from "../../components/client/Navbar.vue";
import ItemListLayout from "../../components/client/layouts/ItemListLayout.vue";

export default {
  name: "ItemList",
  components: {ItemListLayout, Navbar, Footer}
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