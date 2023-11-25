<template>
  <div class="login">
    <div class="bg-blue-500 text-center grid py-10">
      <label>PLANET IT CENTER</label>
    </div>
    <div class="card xl:mx-96 lg:mx-60 md:mx-24 mx-0 card-sider">
      <div class="card-body xl:px-10 lg:px-10 md:px-10 px-5 shadow-lg py-10 my-10 bg-base-100" style="border-radius: 0rem;">
        <div class="form-control w-full">
          <label class="label-text label uppercase font-extralight">Email address</label>
          <div class="flex">
            <input type="text" placeholder="" class="input input-md font-bold text-base-content/100 bg-base-300 w-full" />
          </div>
        </div>
        <div class="form-control w-full">
          <label class="label-text label uppercase font-extralight">Password</label>
          <div class="flex gap-2">
            <input v-model="password" :type="showpassword ? 'text' : 'password' " placeholder="" class="input input-md font-bold text-base-content/100 bg-base-300 w-full" />
            <button @click="togglePasswordVisibility" class="btn hover:bg-base-300 focus:bg-base-300 bg-base-300" ><EyeIcon class="w-6 h-6 text-accent-focus/100" /></button>
          </div>
        </div>
        <div class="flex">
          <a style="font-size: 0.9rem;" href="/login" class="text-accent-focus/100">Forgot your password?</a>
        </div>
        <div class="grid gap-3 my-3">
          <a href="/.gitignore" class="btn btn-md btn-accent font-extrabold text-white normal-case">LOG IN</a>
          <label class="text-base-content/50">Dont have account? <a href="register" class="text-accent-focus/100">Register</a></label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { EyeIcon } from "@heroicons/vue/20/solid/index.js";

export default {
  components: {
    EyeIcon
  },

  data() {
    return {
      showpassword: false,
    }
  },

  methods: {
    togglePasswordVisibility() {
      this.showpassword = !this.showpassword;
    },
  },

};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@100;200;300;400;500;600;700;800&display=swap');
.login {
  background-color: rgba(25, 25, 25, 25);
  background-position: center;
  background-size: cover;
  height: 100vh;
}

.card {
  font-family: 'Sora', sans-serif;
}

</style>