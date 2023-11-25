<script>
import Navbar from "../../components/client/Navbar.vue";
import Hero from "../../components/client/Hero.vue";
import Footer from "../../components/client/Footer.vue";

export default {
  name: "Home",
  components: {Footer, Hero, Navbar}
}
</script>

<template>
  <Navbar />
  <Hero />
  <Footer />
</template>

<style scoped>

</style>