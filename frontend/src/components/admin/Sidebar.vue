<template>
  <div class="bg-primary fixed z-[1] h-full" style="background: linear-gradient(to bottom, #5a89d5, #5b89d4);">
    <div class="flex h-14 mt-1">
      <label class="px-5 title pt-4 font-bold text-white uppercase">Garasi Notebook</label>
      <a href="" class="pt-1">
        <label href="" class="btn">
        <span class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" class="text-white" width="1.5rem" height="1.5rem" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
        </span>
          <!--          <span class="text-gray-600 font-semibold">Dashboard</span>-->
        </label>
      </a>
    </div>
    <div class="grid subtitle gap-0">
      <a href="/admin/dashboard" class="py-2 text-base-content hover:bg-base-100/80" :class="{ 'bg-base-100/40': this.$route.path === '/admin/dashboard' }">
        <label class="btn">
        <span class="me-2 ms-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512" stroke="currentColor" class="text-white">
            <path d="M32 32c17.7 0 32 14.3 32 32V400c0 8.8 7.2 16 16 16H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H80c-44.2 0-80-35.8-80-80V64C0 46.3 14.3 32 32 32zM160 224c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32s-32-14.3-32-32V256c0-17.7 14.3-32 32-32zm128-64V320c0 17.7-14.3 32-32 32s-32-14.3-32-32V160c0-17.7 14.3-32 32-32s32 14.3 32 32zm64 32c17.7 0 32 14.3 32 32v96c0 17.7-14.3 32-32 32s-32-14.3-32-32V224c0-17.7 14.3-32 32-32zM480 96V320c0 17.7-14.3 32-32 32s-32-14.3-32-32V96c0-17.7 14.3-32 32-32s32 14.3 32 32z" fill="white"/>
          </svg>
        </span>
          <span class="text-gray-300 font-medium subtitle">Dashboard</span>
        </label>
      </a>
      <a href="/admin/product" class="py-2 text-base-content hover:bg-base-100/80" :class="{ 'bg-base-100/40': this.$route.path === '/admin/product' }">
        <label href="" class="btn">
        <span class="me-2 ms-1">
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" fill="white"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M234.5 5.7c13.9-5 29.1-5 43.1 0l192 68.6C495 83.4 512 107.5 512 134.6V377.4c0 27-17 51.2-42.5 60.3l-192 68.6c-13.9 5-29.1 5-43.1 0l-192-68.6C17 428.6 0 404.5 0 377.4V134.6c0-27 17-51.2 42.5-60.3l192-68.6zM256 66L82.3 128 256 190l173.7-62L256 66zm32 368.6l160-57.1v-188L288 246.6v188z"/></svg>
        </span>
          <span class="text-gray-300 font-medium subtitle">Product</span>
        </label>
      </a>
      <a @click="handleLogout" class="py-2 text-base-content hover:bg-base-100/80" :class="{ 'bg-base-100/40': this.$route.path === '/admin/logout' }">
        <label href="" class="btn">
        <span class="me-2 ms-1">
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" fill="white"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"/></svg>
        </span>
          <span class="text-gray-300 font-medium subtitle">Logout</span>
        </label>
      </a>
    </div>
  </div>
</template>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Langar&display=swap');

.icon {
  font-size: 1.26rem;
}

.title {
  font-family: 'Exo 2', sans-serif;
  font-size: 1.02rem;
}

.subtitle {
  font-family: 'Langar', sans-serif;
  font-size: 1em;
}

.btn {
  border-radius: 0rem;
  background-color: transparent;
  border-color: transparent;
}

</style>

<script>
import Store from "../../store/index.js";
import axios from "axios";
import Config from "../../config.js";

export default {
  name: "Sidebar",

  methods: {
    async handleLogout() {
      try {
        const response = await axios.post(Config.POST_ADMIN_LOGOUT);
        if (response.status === 200) {
          Store.dispatch("setLoginStatusAdmin", false);
          this.$router.push('/admin/login');
          sessionStorage.removeItem("jwt");
        }
      } catch (err) {
      }
    },
  },
}
</script>
