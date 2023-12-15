<template>

  <div class="navbar sm:px-5 md:px-12 lg:px-24 fixed bg-black z-[1]">
    <div class="navbar-start lg:ms-3 flex gap-10 left-0">
      <div class="dropdown -me-10">
        <button onclick="document.getElementById('navbar').showModal();" tabindex="0" class="btn btn-ghost hover:bg-transparent lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-base-content" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
        </button>
      </div>
      <div class="no-animation font-extrabold flex gap-2 text-lg text-white">
        <label>Garasi</label>
        <label>Notebook</label>
      </div>
    </div>
    <div class="lg:navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal flex gap-3 px-1">
        <li><a href="/" :class="{ 'bg-base-100': this.$route.path === '/', 'text-white': this.$route.path === '/' }">Home</a></li>
        <li v-for="category in category_data" :key="category.id"><button @click="routeToCategory(category.id)" :class="{ 'bg-base-100': this.$route.path === `/p/${category.id}`, 'text-white': this.$route.path === `/p/${category.id}` }">{{ category.name }}</button></li>
      </ul>
    </div>
    <div class="navbar-end pe-1.5">
      <a href="https://wa.me/6281334193457" class="btn bg-transparent normal-case hover:bg-base-200/100 text-white flex gap-1">
        <svg class="fill-success" xmlns="http://www.w3.org/2000/svg" height="1.25rem" width="1.25rem" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>
        <span class="hidden lg:block">Hubungi Kami</span>
      </a>
    </div>
  </div>

  <dialog id="navbar" class="modal bg-base-content/25">
    <div class="card bg-base-200 overflow-y-auto h-screen w-80 top-0 left-0 fixed">
      <div class="mb-4 pt-5 pb-4 px-10 text-xl bg-base-content/5 font-extrabold text-success uppercase animate-pulse">
        Garasi Notebook
      </div>
      <div class="grid mx-5 gap-1">
        <button :class="{ 'bg-base-100 fill-white text-white': this.$route.path === `/`, 'fill-gray-500': this.$route.path !== `/` }" @click="this.$router.push('/')" class="flex font-normal btn hover:bg-base-content/10 border-0 justify-start gap-3">
          <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg>
          <span class="" style="font-size: 1rem;">Home</span>
        </button>

        <ul tabindex="0" class="menu menu-sm dropdown-content w-full z-[1] -mt-5 p-2 shadow rounded-box">
          <li>
            <ul class="p-2.5">
              <li class="my-2.5" v-for="category in category_data" :key="category.id">
                <button @click="routeToCategory(category.id)" class="btn ps-5 font-normal btn-sm flex justify-start gap-3" :class="{ 'bg-base-100 fill-white text-white': this.$route.path === `/p/${category.id}`, 'fill-gray-500': this.$route.path !== `/p/${category.id}` }">
                  <svg class="w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path d="M234.5 5.7c13.9-5 29.1-5 43.1 0l192 68.6C495 83.4 512 107.5 512 134.6V377.4c0 27-17 51.2-42.5 60.3l-192 68.6c-13.9 5-29.1 5-43.1 0l-192-68.6C17 428.6 0 404.5 0 377.4V134.6c0-27 17-51.2 42.5-60.3l192-68.6zM256 66L82.3 128 256 190l173.7-62L256 66zm32 368.6l160-57.1v-188L288 246.6v188z"/></svg>
                  {{ category.name }}
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>

</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Langar&display=swap');

.menu {
  font-family: 'Exo 2', sans-serif;
}

div, a, ul, li, button {
  border-radius: 0rem;
}

</style>


<script>
import Config from "../../config.js";
import axios from "axios";
import navbar from "../admin/Navbar.vue";

export default {
  name: "Navbar",
  computed: {
    navbar() {
      return navbar
    },
  },

  data() {
    return {
      category_data: [],
      isDropdownOpen: false,
    }
  },

  mounted() {
    this.fetchAllCategory();
  },

  created() {
    this.fetchAllCategory();
  },

  methods: {

    routeToCategory(category_id) {
      window.location.href = `${Config.SERVER_ADDRESS}/p/${category_id}`;
    },

    async fetchAllCategory() {
      try {
        const response = await axios.get(Config.GET_ALL_CATEGORY_DATA, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });

        this.category_data = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).reverse();
      } catch (err) {
        console.log("Internal Server Error: ", err.message);
      }
    },


  },

}

</script>