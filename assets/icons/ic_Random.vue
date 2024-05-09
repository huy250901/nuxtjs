<template>
  <svg
    viewBox="0 0 24 24"
    class="w-12 h-12 p-2 rounded-full text-white"
  >
    <defs>
      <linearGradient
        id="grad"
        x1="0%"
        y1="0%"
        x2="100%"
        y2="100%"
      >
        <stop
          offset="0%"
          style="
            stop-color: rgb(255, 205, 227);
            stop-opacity: 1;
          "
        />
        <stop
          offset="54%"
          style="
            stop-color: rgb(255, 180, 248);
            stop-opacity: 1;
          "
        />
        <stop
          offset="100%"
          style="
            stop-color: rgb(237, 127, 245);
            stop-opacity: 1;
          "
        />
      </linearGradient>
    </defs>

    <path
      :fill="isRandom ? 'red' : 'url(#grad)'"
      fill-rule="evenodd"
      d="M4 17a1 1 0 0 1 0-2h2l3-3l-3-3H4a1.001 1.001 0 0 1 0-2h3l4 4l4-4h2V5l4 3.001L17 11V9h-1l-3 3l3 3h1v-2l4 3l-4 3v-2h-2l-4-4l-4 4H4Z"
    ></path>
  </svg>
</template>

<script>
export default {
  props: {
    isRandom: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
