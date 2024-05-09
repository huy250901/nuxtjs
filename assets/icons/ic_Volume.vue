<template>
  <svg
    class="text-white w-10 h-10 p-2 rounded-full"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
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
      fill="url(#grad)"
      d="M3 9h4l5-5v16l-5-5H3V9zm18 3a9.003 9.003 0 0 1-7 8.777V18.71a7.003 7.003 0 0 0 0-13.42V3.223c4.008.91 7 4.494 7 8.777zm-4 0a5.001 5.001 0 0 1-3 4.584V7.416c1.766.772 3 2.534 3 4.584z"
    ></path>
  </svg>
</template>

<script>
export default {
  name: "VolumeIcon",
};
</script>
