<template>
  <div class="login bg-base-content/10 h-screen">
    <div class="card xl:mx-96 lg:mx-52 md:mx-24 mx-0 card-sider">
      <div class="card-body xl:px-10 lg:px-10 md:px-10 px-5 shadow-success/50 shadow shadow-lg py-10 pt-10 mt-20 mb-32 bg-base-100" style="border-radius: 0rem;">
        <div class="form-control w-full">
          <label class="label-text text-base-content/100 label uppercase font-bold">Email Address</label>
          <div class="w-full flex gap-1">
            <span class="btn bg-base-300 no-animation cursor-default">
              <svg class="fill-success/75" xmlns="http://www.w3.org/2000/svg" height="1.25rem" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 64C150 64 64 150 64 256s86 192 192 192c17.7 0 32 14.3 32 32s-14.3 32-32 32C114.6 512 0 397.4 0 256S114.6 0 256 0S512 114.6 512 256v32c0 53-43 96-96 96c-29.3 0-55.6-13.2-73.2-33.9C320 371.1 289.5 384 256 384c-70.7 0-128-57.3-128-128s57.3-128 128-128c27.9 0 53.7 8.9 74.7 24.1c5.7-5 13.1-8.1 21.3-8.1c17.7 0 32 14.3 32 32v80 32c0 17.7 14.3 32 32 32s32-14.3 32-32V256c0-106-86-192-192-192zm64 192a64 64 0 1 0 -128 0 64 64 0 1 0 128 0z"/></svg>
            </span>
            <input v-model="email" type="text" placeholder="" class="input input-md font-normal text-base-content/100 bg-base-300 w-full" />
          </div>
        </div>
        <div class="form-control w-full">
          <label class="label-text text-base-content/100 label uppercase font-bold">Password</label>
          <div class="flex gap-2">
            <div class="w-full flex gap-1">
              <span class="btn bg-base-300 no-animation cursor-default">
                <svg class="fill-success/75" xmlns="http://www.w3.org/2000/svg" height="1.25rem" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z"/></svg>
              </span>
              <input v-model="password" :type="showpassword ? 'text' : 'password' " placeholder="" class="input input-md font-normal text-base-content/100 bg-base-300 w-full" />
            </div>
            <button @click="togglePasswordVisibility" class="btn hover:bg-base-300 focus:bg-base-300 bg-base-300">
              <component :is="showpassword ? 'EyeIcon' : 'EyeSlashIcon'" class="w-6 h-6 fill-success/75" />
            </button>
          </div>
        </div>
        <br>
        <div class="grid gap-3 my-3">
          <button @click="login" class="btn btn-md bg-success/75 hover:bg-success/75 border-0 font-extrabold text-base-100 normal-case">
            {{ this.loginLabel }}
            <span :class="isLoading ? '' : 'hidden'" class=" loading loading-spinner"></span>
          </button>
        </div>
      </div>
    </div>
  </div>

  <dialog id="failedModal" class="modal modal-bottom sm:modal-middle bg-base-content/25">
    <div class="modal-box shadow-xl -mt-52 bg-base-100/100 card card-body border-white">
      <div class="font-bold fill-error px-36 text-xl text-white pt-0 animate-pulse flex gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" height="10rem" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"/></svg>
      </div>
      <div class="grid text-center">
        <label class="font-extrabold text-white text-5xl">Oops!</label>
        <label class="py-4 text-gray-200 text-2xl">Invalid Credentials</label>
      </div>
      <form method="dialog"><button class="btn w-full border-0 bg-base-content/5 font-bold hover:bg-base-content/5 border-0 no-animation">Confirm</button></form>
    </div>
  </dialog>

  <dialog id="successModal" class="modal modal-bottom sm:modal-middle bg-base-content/25">
    <div class="modal-box shadow-xl -mt-52 bg-base-100/100 card card-body border-white">
      <div class="font-bold fill-success px-36 text-xl text-white pt-0 animate-pulse flex gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" height="10rem" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"/></svg>
      </div>
      <div class="grid text-center">
        <label class="font-extrabold text-white text-5xl">Success!</label>
        <label class="py-4 text-gray-200 text-2xl">Login Berhasil</label>
      </div>
      <form method="dialog"><button @click="this.$router.push('/admin/dashboard')" class="btn w-full border-0 bg-base-content/5 font-bold hover:bg-base-content/5 border-0 no-animation">Confirm</button></form>
    </div>
  </dialog>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Langar&display=swap');

div {
  font-family: 'Exo 2', sans-serif;
}

input, button, svg, span, a {
  border-radius: 0rem;
}

.card {
  padding-left: 2.5rem;
  padding-right: 2.5rem;
}

.modal-box {
  border-radius: 0rem;
}

</style>

<script>
import {EyeIcon} from "@heroicons/vue/20/solid/index.js";
import {EyeSlashIcon} from "@heroicons/vue/20/solid/index.js";
import {UsersIcon} from "@heroicons/vue/20/solid/index.js";
import Footer from "../../components/client/Footer.vue";
import axios from "axios";
import {Dialog} from "@headlessui/vue";
import Config from "../../config.js";
import Store from "../../store/index.js";
import {mapActions} from "vuex";
import {tr} from "vuetify/locale";

export default {
  name: "Authentication",
  components: {Dialog, Footer, EyeIcon, EyeSlashIcon, UsersIcon},
  data() {
    return {
      showpassword: false,
      passwordIcon: '',
      email: '',
      password: '',
      loginLabel: 'LOG IN',
      isLoading: false,

      success_modal_content: '',
      failed_modal_content: '',
    }
  },

  methods: {
    async login() {
      this.loginLabel = '';
      this.isLoading = true;
      try {
        const response = await axios.post("http://localhost:3000/api/admin/login", {
          email: this.email,
          password: this.password
        });

        if (response.status === 200) {
          Store.dispatch('setLoginStatusAdmin', true);
          sessionStorage.setItem("jwt", response.data.token);
          document.getElementById("successModal").showModal();
        } else {
          document.getElementById("failedModal").showModal();
        }
      } catch (err) {
        document.getElementById("failedModal").showModal();
      } finally {
        this.isLoading = false;
        this.loginLabel = 'LOG IN';
      }
    },

    togglePasswordVisibility() {
      this.showpassword = !this.showpassword;
    },
    passwordIcon() {

    },
  },
}

</script>