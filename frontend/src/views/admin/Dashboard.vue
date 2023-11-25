<script>

import Sidebar from "../../components/admin/Sidebar.vue";
import Navbar from "../../components/admin/Navbar.vue";
import DashboardLayout from "../../components/admin/layouts/DashboardLayout.vue";
import Footer from "../../components/admin/Footer.vue";

export default {
  name: "Dashboard",
  components: {Footer, DashboardLayout, Navbar, Sidebar},

  methods: {

  },

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
        <DashboardLayout />
      </div>
      <div class="ms-60">
        <Footer />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>