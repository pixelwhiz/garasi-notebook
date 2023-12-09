<script>
import Config from "../../../config.js";
import axios from "axios";

export default {
  name: "ItemLayout",

  data() {
    return {
      categoryname: '',
      productname: '',
      product: {
        description: '',
        condition: '',
        price: '',
      },
    }
  },

  async mounted() {
    await this.getProductNameById();
    await this.getCategoryNameById();
    await this.fetchProductById();
    await this.fetchAllImageByProductId();
  },

  async created() {
    await this.getProductNameById();
    await this.getCategoryNameById();
    await this.fetchProductById();
    await this.fetchAllImageByProductId();
  },

  methods: {
    async fetchAllImageByProductId() {
      try {
        const response = await axios.post(Config.POST_GET_IMAGE_BY_PRODUCT_ID, {
          id: this.$route.params.productId,
        });
      } catch (err) {
        console.log("Internal Server Error: ", err.message);
      }
    },

    routeToCategory(){
      window.location.href = `${Config.SERVER_ADDRESS}/p/${this.$route.params.categoryId}`;
    },

    async fetchProductById() {
      try {
        const response = await axios.post(Config.POST_GET_PRODUCT_BY_ID, {
          id: this.$route.params.productId,
        });
        this.product.description = response.data.description;
        this.product.price = response.data.price;
        this.product.condition = response.data.condition;
      } catch (err) {
        console.log("Internal Server Error: ", err.message);
      }
    },

    async getProductNameById() {
      try {
        const response = await axios.post(Config.POST_GET_PRODUCTNAME_BY_ID, {
          id: this.$route.params.productId,
        });
        this.productname = response.data.name;
      } catch (err) {
        console.log("Internal Server Error: ", err.message);
      }
    },

    async getCategoryNameById() {
      try {
        const response = await axios.post(Config.POST_GET_CATEGORYNAME_BY_ID, {
          id: this.$route.params.categoryId,
        });
        this.categoryname = response.data.name;
      } catch (err) {
        console.log("Internal Server Error: ", err.message);
      }
    },

    handleFocus() {
      this.$refs.myTextarea.style.border = "none";
    }
  },
}
</script>

<template>
  <div class="bg-base-300 px-4 sm:px-6 md:px-8 lg:px-20 xl:px-28 pb-72">
    <div class="lg:flex mb-5 justify-between">
      <div class="text-sm breadcrumbs animate-slide-in-down pt-5 bg-transparent">
        <ul>
          <li class="text-primary"><a href="/">Garasi Notebook</a></li>
          <li class="text-primary" @click="routeToCategory"><a>{{ this.categoryname }}</a></li>
          <li><label class="text-base-content cursor-text">{{ this.productname }}</label></li>
        </ul>
      </div>
    </div>
    <div class="flex flex-col gap-5 pb-5 lg:flex-row">
      <div class="card-body animate-slide-in-down hover:shadow-white shadow card justify-center bg-base-200/100 lg:flex lg:w-1/3">
        <div class="grid">
          <button class="hover:-translate-y-2.5">
            <img src="../../../assets/img/upload.png" class="max-w-full w-96 h-96 rounded-lg shadow-2xl" />
          </button>
        </div>
      </div>
      <div class="card-body animate-slide-in-down hover:shadow-white shadow card justify-start bg-base-200/50 lg:w-2/3">
        <div class="grid gap-0">
          <div class="flex justify-between">
            <label class="text-success/75 font-extrabold uppercase" style="font-size: 0.75rem;">{{ this.categoryname }}</label>
            <div v-if="product.condition !== 'No Condition'" class="badge badge-ghost badge-outline">{{ this.product.condition }}</div>
          </div>
          <label class="text-5xl text-white font-bold">{{ this.productname }}</label>
        </div>
        <textarea class="mt-5 py-3 px-5 w-full h-full bg-transparent shadow shadow-base-content/50" :value="product.description" readonly @focus="handleFocus"></textarea>
        <label class="text-white py-6 flex gap-2"><span class="font-light pt-1">Rp</span> <span class="font-bold text-2xl">{{ this.product.price }}</span></label>
        <div class="justify-start flex">
          <button onclick="window.location.href='https://wa.me/6281334193457'" class="btn bg-success/100 hover:shadow-success shadow-inner hover:shadow-success shadow-md text-white hover:bg-success/100 hover:brightness-125 hover:contrast-125 px-5">
            <svg class="h-3 w-3 fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path d="M253.3 35.1c6.1-11.8 1.5-26.3-10.2-32.4s-26.3-1.5-32.4 10.2L117.6 192H32c-17.7 0-32 14.3-32 32s14.3 32 32 32L83.9 463.5C91 492 116.6 512 146 512H430c29.4 0 55-20 62.1-48.5L544 256c17.7 0 32-14.3 32-32s-14.3-32-32-32H458.4L365.3 12.9C359.2 1.2 344.7-3.4 332.9 2.7s-16.3 20.6-10.2 32.4L404.3 192H171.7L253.3 35.1zM192 304v96c0 8.8-7.2 16-16 16s-16-7.2-16-16V304c0-8.8 7.2-16 16-16s16 7.2 16 16zm96-16c8.8 0 16 7.2 16 16v96c0 8.8-7.2 16-16 16s-16-7.2-16-16V304c0-8.8 7.2-16 16-16zm128 16v96c0 8.8-7.2 16-16 16s-16-7.2-16-16V304c0-8.8 7.2-16 16-16s16 7.2 16 16z"/></svg>
            CHECKOUT
          </button>
        </div>
      </div>
    </div>
    <div class="card-body animate-slide-in-down hover:shadow-white flex gap-10 shadow card px-10 py-5 bg-base-200/50 lg:flex-row">
      <div class="flex">
        <h1 class="text-base-content my-auto font-extrabold uppercase">Preview</h1>
      </div>
      <div class="flex justify-center w-full gap-5">
        <button @click="" class="hover:-translate-y-1 hover:shadow-base-content shadow hover:rotate-6"><img width="100" src="../../../assets/bg.jpg"></button>
      </div>
    </div>
  </div>

  <dialog id="image" class="modal bg-base-content/25">
    <div class="modal-box flex justify-center w-96 max-w5xl">
      <div class="h-96 carousel carousel-vertical rounded-box">
        <!-- Isi carousel item sesuai kebutuhan -->
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

.card, .card-body, .badge, .modal-box {
  border-radius: 0rem;
}

textarea {
  width: 40rem;
  height: 10rem;
  border: none;
  transition: border 0.3s;
}

textarea:focus {
  outline: none;
}

textarea:focus {
  border-color: #28a745;
}

.title {
  font-size: 1rem;
}
</style>