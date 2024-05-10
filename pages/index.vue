import { NuxtLink } from '../.nuxt/components';
<template>
  <div class="container">
    <div>
      <h2
        :style="{ color }"
        @click="toggleColor"
        :title="message"
      >
        Home
      </h2>
    </div>
  </div>
  <div class="mb-6">
    <router-link to="/about" class="link mr-6"
      >Go to About Page</router-link
    >
    <router-link
      class="link text-indigo-700 mr-6"
      to="/app/musicApp"
      >Go to Music Player</router-link
    >
    <!-- <router-link
      class="link text-indigo-700"
      to="/app/dashBoard"
      >Go to dash board</router-link
    > -->
  </div>
  <header>
    <nav>
      <ul>
        <li class="link">
          <NuxtLink to="/about">About</NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>
<script setup>
import { ref } from "vue";
const message = ref("hello");
const color = ref("blue");
function toggleColor() {
  color.value =
    color.value === "black" ? "red" : "black";
}

import "~/assets/index.css";
</script>
<style scoped>
/* 
.container {
  padding: 20px;
}

.link {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 6px 4px;
}

.link:hover {
  cusor: poiter;
  color: red;
} */
</style>
