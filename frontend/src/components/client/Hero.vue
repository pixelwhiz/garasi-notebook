<script>
export default {
  name: "Hero"
}
</script>

<template>
  <div class="hero px-16 pe-12 min-h-screen bg-base-200">
    <div class="hero-content flex-col px-10 lg:flex-row-reverse">
      <img src="../../assets/img/logo_rog.png" class="max-w-sm rounded-lg shadow-2xl " />
      <div class="me-72">
        <h1 class="text-5xl font-bold text-white">Garasi Notebook</h1>
        <p class="py-6">Kami adalah penyedia layanan lengkap untuk perbaikan dan pemeliharaan laptop, penjualan spare part berkualitas, dan solusi perangkat lunak terkini. Dengan tim ahli yang berpengalaman, kami siap membantu Anda mengatasi semua kebutuhan komputer Anda.</p>
        <button class="btn bg-success/75 hover:bg-success/75 text-white">Get Started</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@100;200;300;400;500;600;700;800&display=swap');

img {
  border-radius: 2rem;
  height: 25rem;
  width: 20rem;
}

h1 {
  font-family: 'Bebas Neue', sans-serif;
  font-weight: bold;
}

button {
  border-radius: 0rem;
}

p {
  font-family: 'Sora', sans-serif;
  font-weight: normal;
}

button {
  font-family: 'Sora', sans-serif;
}

</style>