<script>
import {Dialog} from "@headlessui/vue";
import Config from "../../../config.js";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export default {
  name: "Product",
  components: {Dialog},

  data() {
    return {
      error_response: "",
      category_new_name: "",
      category_delete_name: "",
      data_category: [],
      showSuccessAlert: false,
      showErrorAlert: false,
      showDeleteAlert: false,
      currentPage: 1,
      itemsPerPage: 5,
      form: {
        category_selected_id: '',
      }
    }
  },

  async created() {
    await this.fetchAllCategory();
  },

  async mounted() {
    await this.fetchAllCategory();
  },

  methods: {

    resetAlertStates() {
      this.showDeleteAlert = false;
      this.showSuccessAlert = false;
      this.showErrorAlert = false;
    },

    async fetchAllCategory() {
      try {
        const response = await axios.get(Config.GET_ALL_CATEGORY_DATA);
        this.data_category = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).reverse();
      } catch (err) {
        console.log("Internal Server Error: ", err);
      }
    },

    deleteCategoryForm(category_id, category_name) {
      this.form.category_selected_id = category_id;
      this.category_delete_name = category_name;
      document.getElementById('deleteCategory').showModal();
    },

    createCategoryForm() {
      document.getElementById("createCategory").showModal();
      this.category_new_name = "";
      this.resetAlertStates();
    },

    setupCategory(category_id) {
      this.$router.push(`/admin/product/setup/${category_id}`);
    },


    async deleteCategory(category_id, category_name) {
      try {
        const response = await axios.post(Config.POST_DELETE_CATEGORY, {
          id: category_id,
        });

        if (response.status === 200) {
          this.showDeleteAlert = true;
          this.showErrorAlert = false;
          this.showSuccessAlert = false;
          this.fetchAllCategory();
        } else {
          this.showErrorAlert = true;
          this.showSuccessAlert = false;
          this.showDeleteAlert = false;
          this.error_response = `${response.data.message} ${response.status}`;
        }
      } catch (err) {
        console.log("Internal Server Error: ", err);
        this.showErrorAlert = true;
        this.showSuccessAlert = false;
        this.showDeleteAlert = false;
        this.error_response = `${err.response.data.message} ${err.message}`;
      }
    },

    async createCategory() {
      try {
        const response = await axios.post(Config.POST_CREATE_NEW_CATEGORY, {
          id: uuidv4(),
          name: this.category_new_name,
        });

        if (response.status === 200) {
          this.showSuccessAlert = true;
          this.showDeleteAlert = false;
          this.showErrorAlert = false;
          this.fetchAllCategory();
        } else {
          this.showErrorAlert = true;
          this.showSuccessAlert = false;
          this.showDeleteAlert = false;
          this.error_response = `${response.data.message} ${response.status}`;
        }
      } catch (err) {
        console.log("Internal Server Error: ", err);
        this.showErrorAlert = true;
        this.showSuccessAlert = false;
        this.showDeleteAlert = false;
        this.error_response = `${err.response.data.message} ${err.message}`;
      }
    },

  }
}

</script>
<template>
  <div class="ms-3 flex animate-slide-in-down my-5 justify-between">
    <label class="product text-white flex gap-3">
      <span class="mt-2">
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" fill="white"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M234.5 5.7c13.9-5 29.1-5 43.1 0l192 68.6C495 83.4 512 107.5 512 134.6V377.4c0 27-17 51.2-42.5 60.3l-192 68.6c-13.9 5-29.1 5-43.1 0l-192-68.6C17 428.6 0 404.5 0 377.4V134.6c0-27 17-51.2 42.5-60.3l192-68.6zM256 66L82.3 128 256 190l173.7-62L256 66zm32 368.6l160-57.1v-188L288 246.6v188z" fill="white"/></svg>
      </span>
      Product
    </label>
    <button @click="createCategoryForm" class="btn mt-3 bg-success/75 normal-case text-white font-normal border-0 btn-sm hover:bg-success/75" style="border-radius: 0rem;">
      <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM200 344V280H136c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H248v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" fill="white"/></svg>
      Add New Category
    </button>
  </div>
  <div v-if="showSuccessAlert" role="alert" class="alert alert-success text-white border-0  py-3" style="border-radius: 0rem;">
    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <span>Category '{{ this.category_new_name }}' was created successfully</span>

    <!-- Button to close the success alert -->
    <button @click="this.showSuccessAlert = false;" class="ml-4 animate-pulse text-white font-bold">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </button>
  </div>
  <div v-if="showErrorAlert" role="alert" class="alert alert-error text-white border-0  py-3" style="border-radius: 0rem;">
    <svg class="stroke-current shrink-0 fill-white h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>
    <span>Error: '{{ this.error_response }}'</span>

    <!-- Button to close the success alert -->
    <button @click="this.showErrorAlert = false;" class="ml-4 animate-pulse text-white font-bold">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </button>
  </div>
  <div v-if="showDeleteAlert" role="alert" class="alert alert-success text-white border-0  py-3" style="border-radius: 0rem;">
    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <span>Category '{{ this.category_delete_name }}' was deleted successfully</span>

    <!-- Button to close the success alert -->
    <button @click="this.showDeleteAlert = false;" class="ml-4 animate-pulse text-white font-bold">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </button>
  </div>
  <div class="productlayout animate-slide-in-down ms-3 mt-5 card bg-base-content/10">
    <div class="flex justify-between">
      <label class="font-bold">Manage Category</label>
    </div>
  </div>
  <div class="ms-3 animate-slide-in-down mb-5 h-96 overflow-y-auto shadow-base-content/50 shadow-md">
    <table class="table table-md bg-base-content/20">
      <thead>
      <tr class="border-0">
        <td class="font-normal">No</td>
        <th class="font-normal">Category Name</th>
        <th class="font-normal">Total Product</th>
        <th class="font-normal">Crated At</th>
        <th class="font-normal">Latest Update</th>
        <th class="font-normal">Actions</th>
      </tr>
      </thead>
      <tbody class="">
      <tr v-for="(category, index) in data_category" :key="category.id" class="border-0">
        <td>{{ index + 1 }}</td>
        <td>{{ category.name }}</td>
        <td>{{ category.total }}</td>
        <td>{{ category.createdAt }}</td>
        <td>{{ category.updatedAt }}</td>
        <td class="flex gap-2">
          <button @click="setupCategory(category.id)" class="border-0 btn btn-sm hover:bg-primary/50 font-normal text-white normal-case bg-primary/50" style="border-radius: 0rem;">
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z" fill="white"/></svg>
            Setup
          </button>
          <button @click="deleteCategoryForm(category.id, category.name)" class="border-0 btn btn-sm hover:bg-error/50 font-normal text-white normal-case bg-error/50" style="border-radius: 0rem;">
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" fill="white"/></svg>
            Delete
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>

  <dialog id="createCategory" class="modal modal-bottom sm:modal-middle bg-base-content/25">
    <div class="modal-box shadow-xl -mt-96 bg-base-100/100 card card-body border-white">
      <label class="font-bold text-xl text-white flex gap-3">
        <svg class="mt-1.5" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M64 480H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H288c-10.1 0-19.6-4.7-25.6-12.8L243.2 57.6C231.1 41.5 212.1 32 192 32H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64z" fill="white"/></svg>
        Create New Category</label>
      <p class="py-4">Category must be 6 - 12 Characters</p>
      <input v-model="category_new_name" type="text" placeholder="Type Here" class="input bg-transparent text-base-content/100 input-bordered w-full" />
      <div class="modal-action">
        <form method="dialog">
          <div class="flex gap-3 -mt-5">
            <button class="btn btn-neutral bg-base-content/10 border-0 hover:bg-base-content/10 normal-case text-white">Cancel</button>
            <button @click="createCategory" class="btn btn-success bg-success/75 border-0 text-white hover:bg-success/75 normal-case">
              <svg fill="white" xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM200 344V280H136c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H248v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/></svg>
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  </dialog>

  <dialog id="deleteCategory" class="modal modal-bottom sm:modal-middle bg-base-content/25">
    <div class="modal-box shadow-xl -mt-96 bg-base-100/100 card card-body border-white">
      <label class="font-bold text-xl text-white flex gap-3">
        <svg class="fill-white mt-1 w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>
        Are you sure?</label>
      <p class="py-4">Are you sure want to delete this category?</p>
      <div class="modal-action">
        <form method="dialog">
          <div class="flex gap-3 -mt-5">
            <button class="btn btn-neutral bg-base-content/10 border-0 hover:bg-base-content/10 normal-case text-white">Cancel</button>
            <button @click="deleteCategory(this.form.category_selected_id)" class="btn btn-error bg-error/75 border-0 text-white hover:bg-error/75 normal-case">
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" fill="white"/></svg>
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  </dialog>

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

table {
  border-radius: 0rem;
}

</style>

