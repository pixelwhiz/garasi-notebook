<script>
import axios from "axios";
import Config from "../../../config.js";
import { v4 as uuidv4 } from "uuid";
import {QuillEditor} from "@vueup/vue-quill";
import UploadImage from "../../layouts/UploadImage.vue";

export default {
  name: "ProductCreateLayout",
  components: {QuillEditor, UploadImage},
  data() {
    return {
      imagePreviews: [],
      imagePreview: [],
      category_data: [],
      showSuccessAlert: false,
      showErrorAlert: false,
      error_response: '',
      categoryname: '',
      addProduct: {
        id: uuidv4(),
        name: '',
        price: '',
        condition: '',
        description: '',
      },
      isInputFocused: true,
      imageurls: '',
    }
  },

  async mounted() {
    await this.getNameById();
    await this.fetchAllCategory();
  },

  async created() {
    await this.getNameById();
    await this.fetchAllCategory();
  },

  computed: {
    formattedPrice: {
      get() {
        return this.addProduct.price;
      },
      set(value) {
        const cleanedValue = value.replace(/[^\d]/g, '');
        const numberValue = parseInt(cleanedValue);
        if (!isNaN(numberValue) && numberValue > 100000000) {
          this.addProduct.price = '100000000';
        } else {
          this.addProduct.price = numberValue.toLocaleString();
        }
      }
    },

    isAddProductValid() {
      return (
          this.addProduct.name.trim() !== '' &&
          this.addProduct.price.trim() !== '' && this.addProduct.price.trim() !== 'NaN' &&
          this.addProduct.description.trim() !== '' &&
          this.addProduct.condition.trim() !== ''
      );
    },
  },

  methods: {
    async getNameById() {
      try {
        const response = await axios.post(Config.POST_GET_CATEGORYNAME_BY_ID, {
          id: this.$route.params.categoryId,
        });
        this.addProduct.category = response.data.name;
        this.categoryname = response.data.name;
      } catch (err) {
        console.log("Internal Server Error: ", err.message);
      }
    },

    async CreateItem() {
      try {
        if (!/^[0-9.,]+$/.test(this.addProduct.price)) {
          return;
        }

        const formData = new FormData();
        formData.append("id", this.addProduct.id);
        formData.append("name", this.addProduct.name);
        formData.append("price", this.addProduct.price);
        formData.append("category", this.categoryname);
        formData.append("condition", this.addProduct.condition);
        formData.append("description", this.addProduct.description);
        formData.append('image', this.imagePreviews[0].filename);
        for (let i = 0; i < this.imagePreviews.length; i++) {
          formData.append('images', this.imagePreviews[i]);
        }

        const response = await axios.post(Config.POST_CREATE_NEW_PRODUCT, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.status === 200) {
          this.showSuccessAlert = true;
          setTimeout(() => {
            window.location.href = `${Config.ROUTE_TO_PRODUCTSETUP_LAYOUT}${this.$route.params.categoryId}`;
          }, 2500);
        } else {
          this.error_response = err.message;
        }
      } catch (err) {
        console.log("Internal Server Error: ", err.message);
        this.error_response = err.message;
      }
    },


    Cancel(){
      this.addProduct.name = '';
      this.addProduct.price = '';
      this.addProduct.category = '';
      this.addProduct.description = '';
      this.addProduct.condition = '';
      this.routeToProductSetup();
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

    showImage(imageurls) {
      this.imageurls = imageurls;
      document.getElementById('image').showModal();
    },

    handleInput() {
      this.addProduct.price = this.addProduct.price.replace(/[^0-9]/g, '');
      if (this.addProduct.price.startsWith('.')) {
        this.addProduct.price = this.addProduct.price.slice(1);
      }

      const dotCount = this.addProduct.price.split('.').length - 1;
      if (dotCount > 1) {
        this.addProduct.price = this.addProduct.price.slice(0, -1);
      }
      const indexOfDot = this.addProduct.price.indexOf('.');
      if (indexOfDot !== -1) {
        const afterDot = this.addProduct.price.substring(indexOfDot + 1);
        if (afterDot.indexOf('.') !== -1) {
          this.addProduct.price = this.addProduct.price.slice(0, indexOfDot) + afterDot.slice(0, -1);
        }
      }

      const numberValue = parseFloat(this.addProduct.price);
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
      this.addProduct.description = '';
    },

    handleFileChange(event) {
      const files = event.target.files;
      const totalFiles = this.imagePreviews.length + files.length;

      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imagePreviews.push(files[i]);
          this.imagePreview.push(e.target.result);
        };
        reader.readAsDataURL(files[i]);
      }
    },

    removeImage(index) {
      this.imagePreviews.splice(index, 1);
      this.imagePreview.splice(index, 1);
    },
  },
}

</script>

<template>
  <div v-if="showSuccessAlert" role="alert" class="fixed top-0 z-10 animate-slide-in-down alert alert-success text-white border-0  py-3" style="border-radius: 0rem; width: 74rem;">
    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <span>Product '{{ this.addProduct.name }}' was created successfully</span>
    <button @click="this.showSuccessAlert = false;" class="ml-4 animate-pulse text-white font-bold">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </button>
  </div>
  <div v-if="showErrorAlert" role="alert" class="fixed top-0 z-10 animate-slide-in-down alert alert-error text-white border-0  py-3" style="border-radius: 0rem; width: 74rem;">
    <svg class="stroke-current shrink-0 fill-white h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>
    <span>Error: '{{ this.error_response }}'</span>
    <button @click="this.showErrorAlert = false;" class="ml-4 animate-pulse text-white font-bold">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </button>
  </div>
  <div class="mt-5 animate-slide-in-down flex justify-between ms-3">
    <button @click="routeToProductSetup" class="text-white mt-1 flex gap-3">
      <svg class="fill-white mt-1" xmlns="http://www.w3.org/2000/svg" height="1rem" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
      Back
    </button>
    <div class="text-sm breadcrumbs bg-transparent">
      <ul>
        <li><a>
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 288A144 144 0 1 0 256 0a144 144 0 1 0 0 288zm-94.7 32C72.2 320 0 392.2 0 481.3c0 17 13.8 30.7 30.7 30.7H481.3c17 0 30.7-13.8 30.7-30.7C512 392.2 439.8 320 350.7 320H161.3z" fill="white"/></svg>
        </a></li>
        <li><a href="/admin/product">Product</a></li>
        <li><a @click="routeToProductSetup">Setup</a></li>
        <li><a @click="routeToProductSetup">{{ this.categoryname }}</a></li>
        <li><a class="text-success" href="">Create</a></li>
      </ul>
    </div>
  </div>
  <div class="ms-3 animate-slide-in-down flex my-5 justify-between">
    <label class="product text-white flex gap-3">
      <span class="mt-2">
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" fill="white"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M234.5 5.7c13.9-5 29.1-5 43.1 0l192 68.6C495 83.4 512 107.5 512 134.6V377.4c0 27-17 51.2-42.5 60.3l-192 68.6c-13.9 5-29.1 5-43.1 0l-192-68.6C17 428.6 0 404.5 0 377.4V134.6c0-27 17-51.2 42.5-60.3l192-68.6zM256 66L82.3 128 256 190l173.7-62L256 66zm32 368.6l160-57.1v-188L288 246.6v188z" fill="white"/></svg>
      </span>
      Add Product
    </label>
  </div>
  <div class="bg-base-content/5 animate-slide-in-down layouts shadow-base-content/50 shadow-md ms-3 h-96 overflow-y-auto">
    <div class="card card-body -mt-6 -ms-4 h-full">
      <div class="flex flex-col lg:flex-row gap-10 p-2">
        <div class="grid gap-3 w-full lg:w-96">
          <div class="grid gap-3">
            <label class="text-base-content/100 font-normal">Product Name</label>
            <input v-model="addProduct.name" type="text" placeholder="Mouse Logitech B100" class="input text-white bg-base-content/5 input-bordered w-full" />
          </div>

          <div class="grid gap-3">
            <label class="text-base-content/100 font-normal">Price</label>
            <div class="flex gap-3">
              <div class="input-container w-96">
                <div class="currency-symbol text-white -mt-1 absolute ms-3" :class="{ 'visible': isInputFocused || addProduct.price !== '' }">Rp</div>
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
            <label class="text-base-content/100 font-normal">Condition</label>
            <select class="bg-base-content/5 py-3 px-4 border-base-content/25 border" v-model="addProduct.condition">
              <option selected disabled>Select Condition</option>
              <option class="flex justify-space-between">
                New
              </option>
              <option>Second</option>
              <option>Normal</option>
            </select>
          </div>
        </div>

        <div class="grid w-full">
          <div class="grid gap-3" >
            <label class="text-base-content/100 font-normal">Add Image</label>
            <input
                type="file"
                id="upload"
                ref="fileInput"
                class="border-base-content/25 bg-base-content/5 border py-2 px-3"
                @change="handleFileChange"
                multiple
            /><div class="mx-auto bg-base-content/5 border-base-content/25 overflow-y-auto border w-full h-52 py-3 px-3 shadow-md">
              <div v-if="imagePreview.length > 0" class="flex flex-wrap">
                <div v-for="(preview, index) in imagePreview" :key="index" class="relative mr-4">
                  <button @click="showImage(preview)">
                    <img :src="preview" alt="Preview" class="w-20 h-20 object-cover" />
                  </button>
                  <button @click="removeImage(index)" class="absolute bg-transparent top-0 right-0 p-1 text-white rounded-full">
                    <svg class="fill-red-500" xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>
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
  <div class="bg-base-content/5 animate-slide-in-down layouts shadow-base-content/50 shadow-md ms-3 h-96 mt-10">
    <div class="card-body card">
      <div class="grid gap-3">
        <label class="text-base-content/100 font-normal">Description</label>
        <textarea v-model="addProduct.description" placeholder="" class="textarea h-72 bg-base-content/5 text-white px-5 py-2 textarea-bordered textarea-lg w-full" style="white-space: pre-line;"></textarea>
      </div>
    </div>
  </div>

  <dialog id="image" class="modal">
    <div class="modal-box modal-middle bg-transparent w-11/12 max-w-5xl">
      <img class="w-full h-full" :src="this.imageurls">
    </div>
    <form method="dialog" class="modal-backdrop bg-black">
      <button>close</button>
    </form>
  </dialog>

  <div class="mt-10">
    <div class="flex gap-3 justify-end">
      <button @click="Cancel" class="bg-base-content/5 btn hover:bg-base-content/5 normal-case border-0 text-white font-normal" style="font-size: 1rem;">Cancel</button>
      <button @click="CreateItem" :class="{ 'bg-success hover:bg-success text-white fill-white': isAddProductValid }" class="bg-base-content/5 hover:bg-base-content/5 btn normal-case border-0 text-base-content font-normal flex gap-3" style="font-size: 1rem;">
        Add Product
      </button>
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

.layouts {
  border-radius: 0rem;
}

.card, .card-body, textarea {
  border-radius: 0rem;
}

.input-container {
  display: flex;
  align-items: center;
  position: relative;
}

.currency-symbol {
  margin-right: 8px; /* Sesuaikan sesuai kebutuhan tata letak */
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

.currency-symbol.visible {
  opacity: 1;
}

</style>