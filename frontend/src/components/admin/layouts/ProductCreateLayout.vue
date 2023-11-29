<script>
import axios from "axios";
import Config from "../../../config.js";
import { v4 as uuidv4 } from "uuid";

export default {
  name: "ProductCreateLayout",
  data() {
    return {
      category_data: [],
      addProduct: {
        name: '',
        category: '',
        price: '',
        description: '',
      },
    }
  },

  mounted() {
    this.fetchAllCategory();
  },

  created() {
    this.fetchAllCategory();
  },

  methods: {
    async CreateItem() {
      try {
        const response = await axios.post(Config.POST_CREATE_NEW_PRODUCT, {
          id: uuidv4(),
          name: this.addProduct.name,
          price: this.addProduct.price,
          category: this.addProduct.category,
          description: this.addProduct.description,
        });

        if (response.status === 200) {
          alert("success");
          window.location.href=`${Config.ROUTE_TO_PRODUCTSETUP_LAYOUT}${this.$route.params.categoryId}`;
        }
      } catch (err) {
        console.log("Internal Server Error: ", err.message);
      }
    },

    resetAllInput(){
      this.addProduct.name = '';
      this.addProduct.price = '';
      this.addProduct.category = '';
      this.addProduct.description = '';
    },

    async fetchAllCategory() {
      try {
        const response = await axios.get(Config.GET_ALL_CATEGORY_DATA);
        this.category_data = response.data;
      } catch (err) {
        console.log("Internal Server Error: ", err.message);
      }
    },

    routeToProductSetup() {
      this.$router.push(`/admin/product/setup/${this.$route.params.categoryId}`);
    },
  },
}

</script>

<template>
  <div class="mt-5 ms-3">
    <button @click="routeToProductSetup" class="text-white flex gap-3">
      <svg class="fill-white mt-1" xmlns="http://www.w3.org/2000/svg" height="1rem" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
      Back
    </button>
  </div>
  <div class="ms-3 flex my-5 justify-between">
    <label class="product text-white flex gap-3">
      <span class="mt-2">
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" fill="white"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M234.5 5.7c13.9-5 29.1-5 43.1 0l192 68.6C495 83.4 512 107.5 512 134.6V377.4c0 27-17 51.2-42.5 60.3l-192 68.6c-13.9 5-29.1 5-43.1 0l-192-68.6C17 428.6 0 404.5 0 377.4V134.6c0-27 17-51.2 42.5-60.3l192-68.6zM256 66L82.3 128 256 190l173.7-62L256 66zm32 368.6l160-57.1v-188L288 246.6v188z" fill="white"/></svg>
      </span>
      Add Product
    </label>
    <div class="text-sm breadcrumbs mt-1.5">
      <ul>
        <li><a>
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 288A144 144 0 1 0 256 0a144 144 0 1 0 0 288zm-94.7 32C72.2 320 0 392.2 0 481.3c0 17 13.8 30.7 30.7 30.7H481.3c17 0 30.7-13.8 30.7-30.7C512 392.2 439.8 320 350.7 320H161.3z" fill="white"/></svg>
        </a></li>
        <li><a href="">Product</a></li>
        <li><a href="">Setup</a></li>
        <li><a href="">{{ this.$route.params.categoryId }}</a></li>
        <li><a href="">Create</a></li>
      </ul>
    </div>
  </div>

  <div class="ms-3 mb-0 h-96 overflow-y-auto">
    <div class="card card-body -mt-6 -ms-4 h-full bg-base-content/20">
      <div class="flex gap-10 p-2">
        <div class="grid gap-3 w-96">
          <div class="grid gap-3">
            <label class="text-base-content/100 font-normal">Product Name</label>
            <input v-model="addProduct.name" type="text" placeholder="" class="input text-white bg-base-content/5 input-bordered w-full max-w-xs" />
          </div>

          <div class="grid gap-3">
            <label class="text-base-content/100 font-normal">Category</label>
            <select v-model="addProduct.category" class="w-80 bg-base-content/5 p-4 bordered">
              <option selected disabled>Select Category</option>
              <option v-for="(category, index) in category_data" :key="category.id" :value="category.name">{{ category.name }}</option>
            </select>
          </div>
          <div class="grid gap-3">
            <label class="text-base-content/100 font-normal">Description</label>
            <textarea v-model="addProduct.description" class="textarea w-80 text-white bg-base-content/5 textarea-bordered" placeholder=""></textarea>
          </div>
        </div>
        <div class="grid gap-3 w-96">
          <div class="grid gap-3">
            <label class="text-base-content/100 font-normal">Price</label>
            <input v-model="addProduct.price" type="text" placeholder="" class="input text-white bg-base-content/5 input-bordered w-full max-w-xs" />
          </div>
          <div class="grid gap-3">
            <label class="text-base-content/100 font-normal"></label>
<!--            <input v-model="addProduct.name" type="text" placeholder="" class="input text-white bg-base-content/5 input-bordered w-full max-w-xs" />-->
          </div>
          <div class="grid gap-3">
<!--            <label class="text-base-content/100 font-normal">Image</label>-->
<!--            <input type="text" placeholder="" class="input text-white bg-base-content/5 input-bordered w-full max-w-xs" />-->
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="ms-3 divider divider-end">
    <div class="flex gap-3">
      <button @click="resetAllInput" class="bg-base-content/5 py-2 btn px-5 hover:bg-base-content/5 normal-case border-0 text-white" style="font-size: 1rem;">Reset</button>
      <button @click="CreateItem" class="bg-success/75 py-2 btn px-5 hover:bg-success/75 normal-case border-0 text-black" style="font-size: 1rem;">Create</button>
    </div>
  </div>

</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Langar&display=swap');

.input {
  border-radius: 0rem;
}

.modal-box {
  border-radius: 0rem;
}

button {
  border-radius: 0rem;
}

div {
  font-family: 'Exo 2', sans-serif;
}

th {
  font-size: 1rem;
}

td {
  font-size: 1rem;
}

.product {
  font-size: 2rem;
}

.productlayout {
  border-radius: 0rem;
  padding: 1rem;
  font-size: 1rem;
}

.card, .card-body, textarea {
  border-radius: 0rem;
}

</style>