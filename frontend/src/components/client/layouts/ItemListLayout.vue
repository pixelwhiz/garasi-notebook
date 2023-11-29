<template>
  <div class="bg-base-300 ps-28 h-screen pe-24 pb-96 pt-10">
    <div class="flex justify-between pb-0">
      <label class="font-normal mt-4 flex gap-2 text-2xl text-white">
        <svg class="fill-white mt-1" xmlns="http://www.w3.org/2000/svg" height="1.5rem" width="1.5rem" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path d="M234.5 5.7c13.9-5 29.1-5 43.1 0l192 68.6C495 83.4 512 107.5 512 134.6V377.4c0 27-17 51.2-42.5 60.3l-192 68.6c-13.9 5-29.1 5-43.1 0l-192-68.6C17 428.6 0 404.5 0 377.4V134.6c0-27 17-51.2 42.5-60.3l192-68.6zM256 66L82.3 128 256 190l173.7-62L256 66zm32 368.6l160-57.1v-188L288 246.6v188z"/></svg>
        List Items of <span class="text-success font-bold">{{ this.categoryname }}</span>
      </label>
    </div>
    <div class="divider"></div>
    <div class="flex flex-wrap gap-5 ps-2.5">
      <div v-if="product_data.length === 0">
        <label class="text-2xl">There are no items here!</label>
      </div>
      <div v-else>
        <div v-for="product in product_data" :key="product.id">
          <button @click="routeToItem(product.id)" class="card bg-base-200 hover:shadow-warning card-compact hover:border hover:animate-pulse hover:-translate-y-0.5 border-success w-52 bg-base-100 shadow-xl">
            <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
            <div class="card-body">
              <h1 class="card-title text-white font-normal" style="font-size: 1rem;">{{ product.name }}</h1>
              <label class="text-white"></label>
              <div class="flex justify-between">
                <label class="text-base-content flex gap-1">
                  <span style="font-size: 0.75rem">Rp</span>
                  <span style="font-size: 1rem;">{{ product.price }}</span>
                </label>
              </div>
            </div>
            <div class="lanyard hidden bg-success py-2 text-center">
              <span class="text-white font-normal">Klik untuk Membuka</span>
            </div>
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from "axios";
import Config from "../../../config.js";

export default {
  name: "ItemListLayout",
  data() {
    return {
      product_data: [],
      categoryname: '',
    };
  },

  async mounted() {
    await this.getNameById();
    await this.getProductByCategory();
  },

  async created() {
    await this.getNameById();
    await this.getProductByCategory();
  },

  methods: {
    async getNameById() {
      try {
        const response = await axios.post(Config.POST_GET_CATEGORYNAME_BY_ID, {
          id: this.$route.params.categoryId,
        });
        this.categoryname = response.data.name;
      } catch (err) {
        console.log("Internal Server Error: ", err.message);
      }
    },

    routeToItem(product_id){
      this.$router.push(`/p/${this.$route.params.categoryId}/q/${product_id}`);
    },

    async getProductByCategory() {
      try {
        const response = await axios.post(Config.POST_GET_ALL_PRODUCT_BY_CATEGORY, {
          category: this.categoryname,
        });
        this.product_data = response.data;
      } catch (err) {
        console.log("Internal Server Error: ",err.message);
      }
    },

  },

};
</script>

<style scoped>

.card, .card-body {
  border-radius: 0rem;
}

.card:hover .lanyard {
  display: block;
}

</style>
