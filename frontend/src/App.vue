<template>
  <router-view />
</template>

<style>

</style>

<script>
import Config from "./config.js";
import Store from "./store/index.js";
import axios from "axios";

export default {
  name: "App",

  data() {
    return {
      user_data: [],
    }
  },

  mounted() {
    this.check();
  },

  created() {
    this.check();
  },

  methods: {

    async addVisitor() {
      try {
        const response = await axios.post(Config.POST_ADD_VISITOR);
      } catch (err) {
        console.log("Internal Server Error: ", err.message);
      }
    },

    check() {
      const isLoggedInAdmin = sessionStorage.getItem("jwt");
      if (isLoggedInAdmin) {
        Store.dispatch("setLoginStatusAdmin", 'true');
      }
    },
  },

}
</script>