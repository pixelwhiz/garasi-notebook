<script>
import Navbar from "../../components/admin/Navbar.vue";
import ProductSetupLayout from "../../components/admin/layouts/ProductSetupLayout.vue";
import Footer from "../../components/admin/Footer.vue";
import Sidebar from "../../components/admin/Sidebar.vue";

export default {
  name: "ProductSetup",
  components: {Sidebar, Footer, ProductSetupLayout, Navbar}
}
</script>

<template>
  <div class="flex">
    <div class=""><Sidebar /></div>
    <div class="grid w-full">
      <div class="ms-60" :class="{  }">
        <Navbar />
      </div>
      <div class="ms-64 me-5 h-screen" :class="{  }">
        <ProductSetupLayout />
      </div>
      <div class="ms-60">
        <Footer />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>