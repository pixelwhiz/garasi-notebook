<template>
  <div class="bg-base-300 ps-7 pe-3.5 sm:ps-16 sm:pe-12 lg:ps-28 min-h-screen lg:pe-24 pb-96 pt-10">
    <div class="flex pb-4">
      <label class="font-normal animate-slide-in-down mt-4 flex gap-2 text-xl md:text-2xl lg:text-3xl text-white">
        <svg class="fill-white mt-1.5" xmlns="http://www.w3.org/2000/svg" height="1.5rem" width="1.5rem" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path d="M234.5 5.7c13.9-5 29.1-5 43.1 0l192 68.6C495 83.4 512 107.5 512 134.6V377.4c0 27-17 51.2-42.5 60.3l-192 68.6c-13.9 5-29.1 5-43.1 0l-192-68.6C17 428.6 0 404.5 0 377.4V134.6c0-27 17-51.2 42.5-60.3l192-68.6zM256 66L82.3 128 256 190l173.7-62L256 66zm32 368.6l160-57.1v-188L288 246.6v188z"/></svg>
        List Items of <span class="text-primary font-bold">{{ this.categoryname }}</span>
      </label>
    </div>
    <div class="divider mb-4"></div>
    <div>
      <div v-if="product_data.length === 0">
        <label class="text-lg md:text-2xl lg:text-3xl">There are no items here!</label>
      </div>
      <div class="flex flex-wrap justify-start sm:gap-0 lg:gap-3" v-else>
        <div v-for="product in product_data" :key="product.id" class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 mb-4">
          <div class="card px-3 pt-3 bg-base-200 animate-slide-in-down card-compact border-transparent w-full bg-base-100">
            <figure><img class="w-full h-full object-cover" :src="product.image" alt="Shoes" /></figure>
            <div class="px-3 py-3">
              <h1 class="card-title text-white text-start font-normal clamp-2" style="font-size: 1rem;">{{ product.name }}</h1>
              <div class="badge flex justify-start my-3 badge-ghost badge-outline">{{ product.condition }}</div>
              <div class="flex justify-between">
                <label class="text-primary/75 font-semibold flex gap-1">
                  <span style="font-size: 0.75rem" class="mt-1">Rp</span>
                  <span style="font-size: 1rem;">{{ product.price }}</span>
                </label>
              </div>
              <button @click="routeToItem(product.id)" class="bg-primary/100 hover:shadow-primary shadow-inner hover:shadow-primary shadow-md hover:bg-primary/100 hover:brightness-125 hover:contrast-125 text-white justify-center w-full btn-sm btn flex gap-1 mt-5" style="font-size: 0.75rem;">
                <svg class="h-3 w-3 fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path d="M253.3 35.1c6.1-11.8 1.5-26.3-10.2-32.4s-26.3-1.5-32.4 10.2L117.6 192H32c-17.7 0-32 14.3-32 32s14.3 32 32 32L83.9 463.5C91 492 116.6 512 146 512H430c29.4 0 55-20 62.1-48.5L544 256c17.7 0 32-14.3 32-32s-14.3-32-32-32H458.4L365.3 12.9C359.2 1.2 344.7-3.4 332.9 2.7s-16.3 20.6-10.2 32.4L404.3 192H171.7L253.3 35.1zM192 304v96c0 8.8-7.2 16-16 16s-16-7.2-16-16V304c0-8.8 7.2-16 16-16s16 7.2 16 16zm96-16c8.8 0 16 7.2 16 16v96c0 8.8-7.2 16-16 16s-16-7.2-16-16V304c0-8.8 7.2-16 16-16zm128 16v96c0 8.8-7.2 16-16 16s-16-7.2-16-16V304c0-8.8 7.2-16 16-16s16 7.2 16 16z"/></svg>
                CHECK
              </button>
            </div>
          </div>
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
      product: {
        name: '',
        price: '',
        condition: '',
      },
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
        this.product_data = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).reverse();
      } catch (err) {
        console.log("Internal Server Error: ",err.message);
      }
    },

  },

};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Langar&display=swap');

.clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 2; /* Jumlah baris yang ingin ditampilkan */
}

div {
  font-family: 'Exo 2', sans-serif;
}

.card, .card-body, .badge {
  border-radius: 0rem;
}

.card:hover .lanyard {
  display: block;
}

</style>
