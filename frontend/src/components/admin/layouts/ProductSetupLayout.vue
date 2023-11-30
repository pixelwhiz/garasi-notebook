<template>
  <div class="mt-5 flex justify-between ms-3">
    <button @click="routeToProduct" class="text-white mt-1 flex gap-3">
      <svg class="fill-white mt-1" xmlns="http://www.w3.org/2000/svg" height="1rem" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
      Back
    </button>
    <div class="text-sm breadcrumbs bg-transparent">
      <ul>
        <li><a>
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 288A144 144 0 1 0 256 0a144 144 0 1 0 0 288zm-94.7 32C72.2 320 0 392.2 0 481.3c0 17 13.8 30.7 30.7 30.7H481.3c17 0 30.7-13.8 30.7-30.7C512 392.2 439.8 320 350.7 320H161.3z" fill="white"/></svg>
        </a></li>
        <li><a href="/admin/product">Product</a></li>
        <li><a href="">Setup</a></li>
        <li><a class="text-success" href="">{{ this.categoryname }}</a></li>
      </ul>
    </div>
  </div>
  <div class="ms-3 flex my-5 justify-between">
    <label class="product text-white flex gap-3">
      <span class="mt-2">
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" fill="white"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M234.5 5.7c13.9-5 29.1-5 43.1 0l192 68.6C495 83.4 512 107.5 512 134.6V377.4c0 27-17 51.2-42.5 60.3l-192 68.6c-13.9 5-29.1 5-43.1 0l-192-68.6C17 428.6 0 404.5 0 377.4V134.6c0-27 17-51.2 42.5-60.3l192-68.6zM256 66L82.3 128 256 190l173.7-62L256 66zm32 368.6l160-57.1v-188L288 246.6v188z" fill="white"/></svg>
      </span>
      <span class="font-light text-gray-300">All Product from</span> <span class="text-success font-bold">{{ this.categoryname }}</span>
    </label>
    <div class="flex mt-3 gap-5">
      <button @click="addNewItem(1)" class="btn bg-success/75 normal-case text-white font-normal border-0 btn-sm hover:bg-success/75" style="border-radius: 0rem;">
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM200 344V280H136c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H248v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" fill="white"/></svg>
        Add New Item
      </button>
    </div>
  </div>
  <div class="productlayout ms-3 mt-5 card bg-base-content/10">
    <div class="flex justify-between">
      <label class="font-bold">Product of <span class="">{{ this.categoryname }}</span></label>
    </div>
  </div>
  <div class="ms-3 mb-5 h-96 overflow-y-auto shadow-base-content/50 shadow-md">
    <table class="table table-md bg-base-content/20">
      <thead>
      <tr class="border-0">
        <td class="font-normal">Image</td>
        <th class="font-normal">Product Name</th>
        <th class="font-normal">Price</th>
        <th class="font-normal">Last Update</th>
        <th class="font-normal">Actions</th>
      </tr>
      </thead>
      <tbody class="">
      <tr v-for="(product, index) in product_data" :key="product_data.id" class="border-0">
        <td>{{ product.name }}</td>
        <td>{{ product.name }}</td>
        <td>Rp {{ product.price }}</td>
        <td>{{ product.updatedAt }}</td>
        <td class="flex gap-2">
          <button @click="routeToEditProduct(product.id)" class="border-0 btn btn-sm hover:bg-primary/50 font-normal text-white normal-case bg-primary/50" style="border-radius: 0rem;">
            <svg class="fill-white" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/></svg>
            Edit
          </button>
          <button @click="deleteProduct(product.id)" class="border-0 btn btn-sm hover:bg-error/50 font-normal text-white normal-case bg-error/50" style="border-radius: 0rem;">
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" fill="white"/></svg>
            Delete
          </button>
        </td>
      </tr>
      </tbody>
    </table>
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

table {
  border-radius: 0rem;
}

</style>

<script>
import Config from "../../../config.js";
import axios from "axios";

export default {
  name: "ProductSetupLayout",

  data() {
    return {
      categoryname: '',
      product_data: [],
    }
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

    routeToEditProduct(product_id) {
      this.$router.push(`/admin/product/setup/${this.$route.params.categoryId}/edit/${product_id}`);
    },

    async deleteProduct(product_id) {
      try {
        const confirmation = confirm("Are you sure?");
        if (confirmation) {
          const response = await axios.post(Config.POST_DELETE_PRODUCT, {
            id: product_id,
          });
          if (response.status === 200) {
            this.getProductByCategory();
            alert("Success Deleted Product");
          } else {
            alert("Failed to Delete");
          }

          if (response.status === 301) {
            alert("Please input Menu in below!");
          }
        }
      } catch (err) {
        console.log("Internal Server Error: ", err.message);
        alert(err.message);
      }
    },

    async getProductByCategory() {
      try {
        const response = await axios.post(Config.POST_GET_ALL_PRODUCT_BY_CATEGORY, {
          category: this.categoryname,
        });
        this.product_data = response.data;
      } catch (err) {
        console.log("Internal Server Error: ", err.message);
      }
    },

    addNewItem(category_id) {
      this.$router.push(`/admin/product/setup/${this.$route.params.categoryId}/create`);
    },

    routeToProduct() {
      this.$router.push("/admin/product");
    },
  },
}
</script>