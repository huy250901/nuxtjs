<template>
  <svg
    class="text-white w-10 h-10 p-2 rounded-full"
    viewBox="0 0 320 512"
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
      d="M52.5 440.6c-9.5 7.9-22.8 9.7-34.1 4.4S0 428.4 0 416V96C0 83.6 7.2 72.3 18.4 67s24.5-3.6 34.1 4.4l192 160L256 241V96c0-17.7 14.3-32 32-32s32 14.3 32 32V416c0 17.7-14.3 32-32 32s-32-14.3-32-32V271l-11.5 9.6-192 160z"
    />
  </svg>
</template>

<script>
export default {
  name: "MdiSkipNextOutline",
};
</script>
