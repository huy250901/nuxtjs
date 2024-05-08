<template>
  <div class="card text-center">
    <img
      :src="product.image"
      alt="product thumb"
      class="thumb"
    />
    <!-- <p
      class="font-bold text-gray-300 m-4 truncate"
    >
      {{ product.title }}
    </p> -->
  </div>
</template>

<script setup>
const { product } = defineProps(["product"]);
</script>

<style scoped></style>
