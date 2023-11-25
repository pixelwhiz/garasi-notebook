<script>
import {EyeIcon} from "@heroicons/vue/20/solid/index.js";
import {EyeSlashIcon} from "@heroicons/vue/20/solid/index.js";
import {UsersIcon} from "@heroicons/vue/20/solid/index.js";
import Footer from "../../components/client/Footer.vue";

export default {
  name: "Authentication",
  components: {Footer, EyeIcon, EyeSlashIcon, UsersIcon},
  data() {
    return {
      showpassword: false,
      passwordIcon: '',
    }
  },

  mounted() {

  },

  methods: {
    togglePasswordVisibility() {
      this.showpassword = !this.showpassword;
    },
    passwordIcon() {

    },
  },
}

</script>

<template>
  <div class="login bg-primary py-28">
    <div class="card xl:mx-96 lg:mx-52 md:mx-24 mx-0 card-sider">
      <div class="card-body xl:px-10 lg:px-10 md:px-10 px-5 shadow-lg py-10 mt-20 mb-32 bg-base-100" style="border-radius: 0rem;">
        <div class="form-control w-full">
          <label class="label-text label uppercase font-normal">Username </label>
          <div class="flex">
            <input type="text" placeholder="" class="input input-md font-normal text-base-content/100 bg-base-300 w-full" />
          </div>
        </div>
        <div class="form-control w-full">
          <label class="label-text label uppercase font-normal">Password</label>
          <div class="flex gap-2">
            <input v-model="password" :type="showpassword ? 'text' : 'password' " placeholder="" class="input input-md font-normal text-base-content/100 bg-base-300 w-full" />
            <button @click="togglePasswordVisibility" class="btn hover:bg-base-300 focus:bg-base-300 bg-base-300">
              <component :is="showpassword ? 'EyeIcon' : 'EyeSlashIcon'" class="w-6 h-6 text-accent-focus/100" />
            </button>
          </div>
        </div>
        <br>
        <div class="grid gap-3 my-3">
          <a href="/.gitignore" class="btn btn-md bg-success/100 hover:bg-success/100 border-0 font-extrabold text-white normal-case">LOG IN</a>
<!--          <label class="text-base-content/50">Dont have account? <a href="register" class="text-accent-focus/100">Register</a></label>-->
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


.card {
  padding-left: 2.5rem;
  padding-right: 2.5rem;
}

</style>