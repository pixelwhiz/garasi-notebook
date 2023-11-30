<script>
import Sidebar from "../../components/admin/Sidebar.vue";
import Navbar from "../../components/admin/Navbar.vue";
import Footer from "../../components/admin/Footer.vue";
import ProductCreateLayout from "../../components/admin/layouts/ProductCreateLayout.vue";
import ProductEditLayout from "../../components/admin/layouts/ProductEditLayout.vue";

export default {
  name: "ProductEdit",
  components: {ProductEditLayout, Footer, Navbar, Sidebar}
}
</script>

<template>
  <div class="flex">
    <div class=""><Sidebar /></div>
    <div class="grid w-full">
      <div class="ms-60" :class="{  }">
        <Navbar />
      </div>
      <div class="ms-64 me-5" :class="{  }">
        <ProductEditLayout />
      </div>
      <div class="ms-60">
        <Footer />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>