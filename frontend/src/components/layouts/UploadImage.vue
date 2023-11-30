<template>
  <div class="container mx-auto">
    <input
        type="file"
        id="upload"
        ref="fileInput"
        class="mt-5 mb-4 p-2 border border-gray-300 rounded-md"
        @change="handleFileChange"
        multiple
    />
    <div class="mx-auto bg-base-content/5 p-3 shadow-md">
      <div v-if="imagePreviews.length > 0" class="flex flex-wrap">
        <div
            v-for="(preview, index) in imagePreviews"
            :key="index"
            class="relative mr-4"
        >
          <img :src="preview" alt="Preview" class="w-20 h-20 object-cover" />
          <button
              @click="removeImage(index)"
              class="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imagePreviews: [],
    };
  },
  methods: {
    handleFileChange(event) {
      const files = event.target.files;
      const totalFiles = this.imagePreviews.length + files.length;

      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imagePreviews.push(e.target.result);
        };
        reader.readAsDataURL(files[i]);
      }
    },
    removeImage(index) {
      this.imagePreviews.splice(index, 1);
      // Anda dapat menambahkan logika di sini untuk menghapus gambar di server jika diperlukan.
    },
  },
};
</script>

<style scoped>
div {
  border-radius: 0rem;
}
</style>
