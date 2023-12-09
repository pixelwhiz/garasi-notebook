<script>
import axios from "axios";
import Config from "../../../config.js";
import {v4 as uuidv4} from "uuid";

export default {
  name: "ProductEditLayout",

  data() {
    return {
      imagePreviews: [],
      category_data: [],
      categoryname: '',
      productname: '',
      product: {
        name: '',
        category: '',
        price: '',
        condition: '',
        description: '',
      },
      isInputFocused: true,
    }
  },

  async beforeMount() {
    await this.getCategoryNameById();
    await this.getProductNameById();
    await this.getProductByCategory();
  },

  async beforeRouteEnter() {
    await this.getCategoryNameById();
    await this.getProductNameById();
    await this.getProductByCategory();
  },

  async created() {
    await this.fetchProductById();
  },

  async mounted() {
    await this.fetchProductById();
  },

  computed: {
    formattedPrice: {
      get() {
        return this.product.price;
      },
      set(value) {
        const cleanedValue = value.replace(/[^\d]/g, '');
        const numberValue = parseInt(cleanedValue);
        if (!isNaN(numberValue) && numberValue > 100000000) {
          this.product.price = '100000000';
        } else {
          this.product.price = numberValue.toLocaleString();
        }
      }
    },

    isproductValid() {
      return (
          this.product.name.trim() !== '' &&
          this.product.price.trim() !== '' && this.product.price.trim() !== 'NaN' &&
          this.product.description.trim() !== '' &&
          this.product.condition.trim() !== ''
      );
    },
  },

  methods: {
    async fetchProductById() {
      try {
        const response = await axios.post(Config.POST_GET_PRODUCT_BY_ID, {
          id: this.$route.params.productId,
        });
        this.product.name = response.data.name;
        this.product.condition = response.data.condition;
        this.product.description = response.data.description;
        this.product.price = response.data.price;
      } catch (err) {
        console.log("Internal Server Error: ", err.message);
      }
    },

    routeToProductSetup() {
      this.$router.push(`/admin/product/setup/${this.$route.params.categoryId}`);
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

    Cancel(){
      this.product.name = '';
      this.product.price = '';
      this.product.category = '';
      this.product.description = '';
      this.product.condition = '';
      this.routeToProductSetup();
    },

    handleInput() {
      this.product.price = this.product.price.replace(/[^0-9]/g, '');
      if (this.product.price.startsWith('.')) {
        this.product.price = this.product.price.slice(1);
      }

      const dotCount = this.product.price.split('.').length - 1;
      if (dotCount > 1) {
        this.product.price = this.product.price.slice(0, -1);
      }
      const indexOfDot = this.product.price.indexOf('.');
      if (indexOfDot !== -1) {
        const afterDot = this.product.price.substring(indexOfDot + 1);
        if (afterDot.indexOf('.') !== -1) {
          this.product.price = this.product.price.slice(0, indexOfDot) + afterDot.slice(0, -1);
        }
      }

      const numberValue = parseFloat(this.product.price);
      if (!isNaN(numberValue)) {
        this.formattedPrice = numberValue.toLocaleString();
      }
    },

    setInputFocus(value) {
      this.isInputFocused = true;
    },

    setDescription() {
      document.getElementById("setDescription").showModal();
    },

    resetDescription(){
      this.product.description = '';
    },

    handleFileChange(event) {
      const files = event.target.files;
      const totalFiles = this.imagePreviews.length + files.length;

      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imagePreviews.push(e.target.result);
        };
        reader.readAsDataURL(files[i]);
      }
    },
    removeImage(index) {
      this.imagePreviews.splice(index, 1);
    },

    async EditItem() {
      try {
        if (!/^[0-9.,]+$/.test(this.product.price)) {
          return;
        }

        const response = await axios.post(Config.POST_EDIT_PRODUCT, {
          id: this.$route.params.productId,
          name: this.product.name,
          price: this.product.price,
          category: this.product.category,
          condition: this.product.condition,
          description: this.product.description,
        });

        if (response.status === 200) {
          alert("success");
          window.location.href = `${Config.ROUTE_TO_PRODUCTSETUP_LAYOUT}${this.$route.params.categoryId}`;
        }

      } catch (err) {
        console.log("Internal Server Error: ", err.message);
      }
    },

  },
}
</script>

<template>
  <div class="mt-5 animate-slide-in-down ms-3 flex justify-between">
    <button @click="routeToProductSetup" class="text-white mt-1 flex gap-3">
      <svg class="fill-white mt-1" xmlns="http://www.w3.org/2000/svg" height="1rem" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
      Back
    </button>
    <div class="text-sm breadcrumbs">
      <ul>
        <li><a>
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 288A144 144 0 1 0 256 0a144 144 0 1 0 0 288zm-94.7 32C72.2 320 0 392.2 0 481.3c0 17 13.8 30.7 30.7 30.7H481.3c17 0 30.7-13.8 30.7-30.7C512 392.2 439.8 320 350.7 320H161.3z" fill="white"/></svg>
        </a></li>
        <li><a href="/admin/product">Product</a></li>
        <li><a @click="routeToProductSetup">Setup</a></li>
        <li><a @click="routeToProductSetup">{{ this.categoryname }}</a></li>
        <li><a href="">Edit</a></li>
        <li><a class="text-success" href="">{{ this.productname }}</a></li>
      </ul>
    </div>
  </div>
  <div class="ms-3 animate-slide-in-down flex my-5 justify-between">
    <label class="product text-white flex gap-3">
      <span class="mt-2">
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" fill="white"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M234.5 5.7c13.9-5 29.1-5 43.1 0l192 68.6C495 83.4 512 107.5 512 134.6V377.4c0 27-17 51.2-42.5 60.3l-192 68.6c-13.9 5-29.1 5-43.1 0l-192-68.6C17 428.6 0 404.5 0 377.4V134.6c0-27 17-51.2 42.5-60.3l192-68.6zM256 66L82.3 128 256 190l173.7-62L256 66zm32 368.6l160-57.1v-188L288 246.6v188z" fill="white"/></svg>
      </span>
      Edit <span class="text-success font-bold">{{ this.productname }}</span>
    </label>
  </div>

  <div class="bg-base-content/5 animate-slide-in-down layouts shadow-base-content/50 shadow-md ms-3 h-96 overflow-y-auto">
    <div class="card card-body -mt-6 -ms-4 h-full">
      <div class="flex flex-col lg:flex-row gap-10 p-2">
        <div class="grid gap-3 w-full lg:w-96">
          <div class="grid gap-3">
            <label class="text-base-content/100 font-normal">Product Name</label>
            <input v-model="product.name" type="text" placeholder="" class="input text-white bg-base-content/5 input-bordered w-full" />
          </div>

          <div class="grid gap-3">
            <label class="text-base-content/100 font-normal">Product Price</label>
            <div class="flex gap-3">
              <div class="input-container w-96">
                <div class="currency-symbol text-white absolute mt-2.5 ms-3" :class="{ 'visible': isInputFocused || product.price !== '' }">Rp</div>
                <input v-model="formattedPrice"
                       type="text"
                       placeholder="54,500"
                       class="input text-white ps-10 bg-base-content/5 input-bordered w-full"
                       @input="handleInput"
                       @focus="setInputFocus(true)"
                       @blur="setInputFocus(false)"/>
              </div>
            </div>
          </div>

          <div class="grid gap-3">
            <label class="text-base-content/100 font-normal">Product Condition</label>
            <select class="bg-base-content/5 py-3 px-4 border-base-content/25 border" v-model="product.condition">
              <option selected disabled>Select Condition</option>
              <option class="flex justify-space-between">
                New
              </option>
              <option>Second</option>
              <option>No Condition</option>
            </select>
          </div>
        </div>

        <div class="grid gap-5 w-full">
          <div class="grid">
            <label class="text-base-content/100 font-normal">Product Image</label>
            <div class="container mx-auto">
              <input
                  type="file"
                  id="upload"
                  ref="fileInput"
                  class="mt-5 mb-4 p-2 border border-gray-300 rounded-md"
                  @change="handleFileChange"
                  multiple
              />
              <div class="mx-auto bg-base-content/5 p-3 shadow-md">
                <div v-if="imagePreviews.length > 0" class="flex flex-wrap">
                  <div
                      v-for="(preview, index) in imagePreviews"
                      :key="index"
                      class="relative mr-4"
                  >
                    <img :src="preview" alt="Preview" class="w-20 h-20 object-cover" />
                    <button
                        @click="removeImage(index)"
                        class="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"
                    >
                      <i class="fas fa-times"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="bg-base-content/5 animate-slide-in-down layouts shadow-base-content/50 shadow-md ms-3 h-96 mt-10">
    <div class="card-body card">
      <div class="grid gap-3">
        <label class="text-base-content/100 font-normal">Product Description</label>
        <textarea v-model="product.description" placeholder="" class="textarea h-72 bg-base-content/5 text-white px-5 py-2 textarea-bordered textarea-lg w-full" style="white-space: pre-line;"></textarea>
      </div>
    </div>
  </div>

  <div class="mt-10 animate-slide-in-down mb-20">
    <div class="flex gap-3 justify-end">
      <button @click="Cancel" class="bg-base-content/5 btn hover:bg-base-content/5 normal-case border-0 text-white font-normal" style="font-size: 1rem;">Cancel</button>
      <button @click="EditItem" :class="{ 'bg-success hover:bg-success text-white': isproductValid }" class="no-animation bg-base-content/5 hover:bg-base-content/5 btn normal-case border-0 text-base-content font-normal" style="font-size: 1rem;">Save Changes</button>
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

.currency-symbol {
  margin-right: 8px; /* Sesuaikan sesuai kebutuhan tata letak */
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

.currency-symbol.visible {
  opacity: 1;
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