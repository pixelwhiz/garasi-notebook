<script setup>

</script>

<template>
  <div class="navbar pe-5 sm:px-5 md:px-12 lg:px-24 fixed bg-black z-[1]">
    <div class="navbar-start">
      <div class="dropdown">
        <label tabindex="0" class="btn btn-ghost lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
        </label>
        <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
          <li><a>Home</a></li>
          <li>
            <a>Parent</a>
            <ul class="p-2">
              <li><a>Submenu 1</a></li>
              <li><a>Submenu 2</a></li>
            </ul>
          </li>
          <li><a>Item 3</a></li>
        </ul>
      </div>
      <a class="btn btn-ghost normal-case text-xl">Garasi Notebook</a>
    </div>
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1">
        <li><a href="/" :class="{ 'bg-base-100': this.$route.path === '/' }">Home</a></li>
        <li><a href="/laptop" :class="{ 'bg-base-100': this.$route.path === '/laptop' }">Laptop</a></li>
        <li><a href="/sparepart" :class="{ 'bg-base-100': this.$route.path === '/sparepart' }">Sparepart</a></li>
        <li><a href="/accessories" :class="{ 'bg-base-100': this.$route.path === '/accessories' }">Accessories</a></li>
      </ul>
    </div>
    <div class="navbar-end">
      <a class="btn">Button</a>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

.menu {
  font-family: 'Poppins', sans-serif;
}

</style>


<script>

export default {
  name: "Navbar",

  mounted() {

  },

  methods: {

  },

}

</script>