<script>

export default {
  name: "Navbar"
}
</script>

<template>
  <div class="flex bg-base-content/10 shadow-gray-700 shadow-sm p-4">
    <div class="flex ms-3 me-1 w-full justify-between">
      <div class="flex w-96">
        <input type="text" placeholder="Search for ..." class="searchbar input input-bordered w-full border-0 bg-base-content/5 max-w-xs" />
        <button class="btn hover:bg-primary searchbar bg-primary">
          <svg xmlns="http://www.w3.org/2000/svg" fill="white" height="2rem" width="1.5rem" font-weight="bold" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
        </button>
      </div>
      <div class="flex gap-10 mt-3">
        <div class="flex gap-1 mt-1">
          <div tabindex="0" role="button" class="btn -mt-4 btn-ghost btn-circle">
            <div class="indicator">
              <svg xmlns="http://www.w3.org/2000/svg" height="1.25rem" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" fill="white"/></svg>
              <span class="badge badge-sm bg-primary text-white indicator-item">0</span>
            </div>
          </div>
          <div tabindex="0" role="button" class="btn -mt-4 btn-ghost btn-circle">
            <div class="indicator">
              <svg xmlns="http://www.w3.org/2000/svg" height="1.25rem" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z" fill="white"/></svg>
              <span class="badge badge-sm bg-primary text-white indicator-item">0</span>
            </div>
          </div>
        </div>
        <div class="flex gap-2">
          <label>garasinotebook@gmail.com</label>
          <div class="avatar -translate-y-1">
            <div class="w-8 rounded-full">
              <img src="../../assets/img/logo_rog.png" />
            </div>
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

.badge {
  border-radius: 0.5rem;
  font-size: 0.75rem;
}

.searchbar {
  border-radius: 0rem;
}

</style>