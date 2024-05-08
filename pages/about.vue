<template>
  <div class="container">
    <h2>About Vuejs</h2>
  </div>
  <router-link to="/"
    >Go to Home Page</router-link
  >
  <div><h1>Hi fetch api</h1></div>
  <div class="grid grid-cols-6 gap-5">
    <div v-for="p in products">
      <div>
        <ProductCard class="img" :product="p" />
      </div>
      <div>
        <NuxtLink
          class="name-product"
          :to="`/app/productDetail/${p.id}`"
          >{{ p.title }}</NuxtLink
        >
      </div>
    </div>
  </div>
</template>
<script setup>
definePageMeta({ layout: "products" });

const { data: products } = await useFetch(
  "https://fakestoreapi.com/products"
);
</script>
<style scoped>
h2 {
  font-size: 20px;
  color: green;
}
.img {
  margin-bottom: 20px;
  width: 100px;
  height: 100px;
}
.name-product {
  margin-top: 20px;
}
.container {
  padding: 20px;
}
</style>
<!-- :class="{
            playing: currentSong === p.id,
            'w-480px p-3 bg-red-500 rounded mb-1 cursor-pointer':
              currentSong !== p.id,
          }" -->
