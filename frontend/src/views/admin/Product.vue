<script>
import Sidebar from "../../components/admin/Sidebar.vue";
import Navbar from "../../components/admin/Navbar.vue";
import ProductLayout from "../../components/admin/layouts/ProductLayout.vue";
import DashboardLayout from "../../components/admin/layouts/DashboardLayout.vue";
import Footer from "../../components/admin/Footer.vue";

export default {
  name: "Product",
  components: {Footer, ProductLayout, Navbar, Sidebar}
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
        <ProductLayout />
      </div>
      <div class="ms-60">
        <Footer />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>