<script>
import axios from "axios";
import Config from "../../../config.js";
import BarChart from "../../BarChart.vue";

export default {
  name: "Dashboard",
  components: {BarChart},
  data() {
    return {
      totalProduct: '',
      totalVisitor: '',
      totalOrder: '',
    }
  },

  created() {
    this.fetchAllData();
  },

  mounted() {
    this.fetchAllData();
  },

  methods: {
    async fetchAllData() {
      const response = await axios.get(Config.GET_ALL_DASHBOARD_DATA);
      this.totalProduct = response.data.totalProduct.count;
      this.totalVisitor = response.data.totalVisitor.count;
      this.totalOrder = response.data.totalOrder.count;
    },
  },

}
</script>

<template>
  <div class="ms-3 animate-slide-in-down flex my-5 justify-between">
    <label class="dashboard text-white flex gap-3">
      <span class="mt-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512" stroke="currentColor" class="text-white">
          <path d="M32 32c17.7 0 32 14.3 32 32V400c0 8.8 7.2 16 16 16H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H80c-44.2 0-80-35.8-80-80V64C0 46.3 14.3 32 32 32zM160 224c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32s-32-14.3-32-32V256c0-17.7 14.3-32 32-32zm128-64V320c0 17.7-14.3 32-32 32s-32-14.3-32-32V160c0-17.7 14.3-32 32-32s32 14.3 32 32zm64 32c17.7 0 32 14.3 32 32v96c0 17.7-14.3 32-32 32s-32-14.3-32-32V224c0-17.7 14.3-32 32-32zM480 96V320c0 17.7-14.3 32-32 32s-32-14.3-32-32V96c0-17.7 14.3-32 32-32s32 14.3 32 32z" fill="white"/>
        </svg>
      </span>
      Dashboard
    </label>
    <div class="text-sm breadcrumbs mt-1.5">
      <ul>
        <li><a>
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 288A144 144 0 1 0 256 0a144 144 0 1 0 0 288zm-94.7 32C72.2 320 0 392.2 0 481.3c0 17 13.8 30.7 30.7 30.7H481.3c17 0 30.7-13.8 30.7-30.7C512 392.2 439.8 320 350.7 320H161.3z" fill="white"/></svg>
        </a></li>
        <li><a href="">Dashboard</a></li>
      </ul>
    </div>
  </div>
  <div class="grid animate-slide-in-down gap-5">
    <div class="ms-3 flex justify-between gap-5">

      <div class="card dashboardlayout border-0">
        <div class="flex justify-between">
          <div class="grid w-72 py-3 bg-base-content/10">
            <label class="fontlight text-center text-white">Total</label>
            <label class="text-2xl text-center font-normal text-base-content">Visitors</label>
          </div>
          <div class="grid w-20">
            <label class="text-center py-5 bg-primary text-white font-bold text-3xl">{{ this.totalVisitor }}</label>
          </div>
        </div>
      </div>
      <div class="card dashboardlayout border-0">
        <div class="flex justify-between">
          <div class="grid w-72 py-3 bg-base-content/10">
            <label class="fontlight text-center text-white">Total</label>
            <label class="text-2xl text-center font-normal text-base-content">Orders</label>
          </div>
          <div class="grid w-20">
            <label class="text-center py-5 bg-primary text-white font-bold text-3xl">{{ this.totalOrder }}</label>
          </div>
        </div>
      </div>
      <div class="card dashboardlayout border-0">
        <div class="flex justify-between">
          <div class="grid w-72 py-3 bg-base-content/10">
            <label class="fontlight text-center text-white">Total</label>
            <label class="text-2xl text-center font-normal text-base-content">Product</label>
          </div>
          <div class="grid w-20">
            <label class="text-center bg-primary py-5 text-white font-bold text-3xl">{{ this.totalProduct }}</label>
          </div>
        </div>
      </div>
    </div>

    <div class="ms-3 justify-between productchartlayout bg-base-content/10">
      <div class="grid">
        <div class="flex mx-3 my-5">
          <label class="font-bold text-white uppercase">Product Yearly Sales</label>
        </div>
        <div class="flex h-80 bg-base-content/20">
          <div class="mx-3 my-3">
          </div>
        </div>
      </div>
    </div>
  </div>


</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Langar&display=swap');

div {
  font-family: 'Exo 2', sans-serif;
}

.dashboard {
  font-size: 2rem;
}

.dashboardlayout {
  border-radius: 0rem;
}

.container {
  margin: 0 auto;
  width: 91.666667%;
  display: grid;
  gap: 2rem;
}

@media (min-width: 1024px) {
  .container {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.chart-container {
  background-color: #eee8d5;
  border-radius: 0.5rem;
}

</style>