<template>
  <svg
    class="text-white w-10 h-10 p-2 rounded-full"
    viewBox="0 0 512 512"
  >
    <defs>
      <linearGradient
        id="grad3"
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
      :fill="isLoop ? 'red' : 'url(#grad3)'"
      fill-rule="evenodd"
      d="M48.5 224H40c-13.3 0-24-10.7-24-24V72c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2L98.6 96.6c87.6-86.5 228.7-86.2 315.8 1c87.5 87.5 87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3c-62.2-62.2-162.7-62.5-225.3-1L185 183c6.9 6.9 8.9 17.2 5.2 26.2s-12.5 14.8-22.2 14.8H48.5z"
    />
  </svg>
</template>

<script>
export default {
  props: {
    isLoop: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
