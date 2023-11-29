<script>
export default {
  name: "NotFound"
}
</script>

<template>
  <div class="w-screen">
    <div class="card card-body sm:mt-20 md:mt-20 lg:mt-20 lg:mx-96 text-center grid">
      <label class="font-bold sm:-mb-10 text-white md:-mb-10 lg:-mb-10">404</label>
      <span class="font-normal text-base-content text-2xl">Page Not Found</span>
      <div class="divider sm:mx-44 md:mx-60 lg:mx-14"></div>
      <button @click="this.$router.push('/')" class="btn sm:mx-44 md:mx-60 text-white bg-error/50 border-0 hover:bg-error/50">Go Home</button>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Langar&display=swap');

.card, .card-body {
  border-radius: 0rem;
  text-align: center;
}

div, label {
  font-family: 'Exo 2', sans-serif;
  font-size: 10rem;
}

button {
  border-radius: 0rem;
}

</style>