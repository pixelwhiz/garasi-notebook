<template>
  <router-view />
</template>

<style>

</style>

<script>
import axios from "axios";
import Config from "./config.js";
import store from "./store/index.js";

export default {
  name: "App",

  data() {
    return {
      user_data: [],
    }
  },

  mounted() {
    this.check();
    this.getUser();
  },

  created() {
    this.check();
    this.getUser();
  },

  methods: {
    async getUser() {
      try {
        const response = await axios.get(Config.GET_ADMIN_LOGIN_DATA_URL);
        if (response.status === 200) {
          this.user_data = response.data.user;
          store.dispatch("setLoginStatusAdmin", true);
        } else {
          console.log(response.data.message);
          store.dispatch("setLoginStatusAdmin", false);
        }
      } catch (error) {
        if (error.response) {
          store.dispatch("setLoginStatusAdmin", false);
        } else {
          store.dispatch("setLoginStatusAdmin", false);
        }
      }
    },
    check() {
      const isLoggedInAdmin = sessionStorage.getItem(`${Config.LOGIN_TOKENS}`);
      if (isLoggedInAdmin) {
        store.dispatch("setLoginStatusAdmin", isLoggedInAdmin === true);
      }
    },
  },

}
</script>