<template>
  <link
    rel="preconnect"
    href="https://fonts.googleapis.com"
  />
  <link
    rel="preconnect"
    href="https://fonts.gstatic.com"
    crossorigin
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
    rel="stylesheet"
  />

  <div
    class="flex justify-center items-center h-screen"
  >
    <div
      class="bg-gradient-to-br from-orange-500 via-teal-500 to-purple-500 h-full w-1/3 flex justify-center items-center flex-col"
    >
      <div class="h-3/4 w-full border-2 px-4">
        <h2
          class="text-center font-fm text-blue-700 font-bold mt-4 mb-4"
        >
          Now Playing
        </h2>

        <h3
          class="text-center font-fm text-blue-700 font-bold mb-4"
        >
          {{
            currentSong
              ? `Đang phát: ${currentSong}`
              : "Không có bài nào đang phát"
          }}
        </h3>
        <div class="flex">
          <img
            id="img"
            class="rotate-infinite rounded-full m-auto w-40 h-40 items-center"
            :src="currentSongImage"
            :class="{ rotate: isPlaying }"
          />
        </div>
        <div
          class="flex justify-between mt-6 items-center"
        >
          <div
            class="relative cursor-pointer"
            id="volumeControlWrapper"
          >
            <svg
              width="1.4rem"
              height="1.4rem"
              fill="#fff"
              class="p-2 rounded-full text-white w-10 h-10"
              viewBox="0 0 640 512"
            >
              <path
                d="M533.6 32.5C598.5 85.2 640 165.8 640 256s-41.5 170.7-106.4 223.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C557.5 398.2 592 331.2 592 256s-34.5-142.2-88.7-186.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM473.1 107c43.2 35.2 70.9 88.9 70.9 149s-27.7 113.8-70.9 149c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C475.3 341.3 496 301.1 496 256s-20.7-85.3-53.2-111.8c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zm-60.5 74.5C434.1 199.1 448 225.9 448 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C393.1 284.4 400 271 400 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3z"
              />
            </svg>
            <input
              type="range"
              id="volumeControl"
              class="slider absolute"
              min="0"
              max="100"
              step="1"
            />
          </div>

          <div
            class="cursor-pointer"
            @click="restartAudio"
          >
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              class="text-white w-10 h-10 p-2 rounded-full"
            >
              <path
                fill="currentColor"
                d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6s-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8s-3.58-8-8-8z"
              ></path>
            </svg>
          </div>
          <div
            @click="playPreviousAudio"
            class="cursor-pointer"
          >
            <svg
              width="1em"
              height="1em"
              fill="#fff"
              class="w-10 h-10 p-2 rounded-full text-white"
              viewBox="0 0 512 512"
            >
              <path
                d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160zm352-160l-160 160c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L301.3 256 438.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0z"
              />
            </svg>
          </div>

          <div
            @click="toggleAudio"
            class="cursor-pointer"
          >
            <svg
              fill="#fff"
              width="2em"
              height="2em"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
              <path
                v-if="isPlaying"
                d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"
              />
              <path
                v-else
                d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"
              />
            </svg>
          </div>

          <div
            @click="playNextAudio"
            class="cursor-pointer"
          >
            <svg
              width="1em"
              height="1em"
              fill="#fff"
              class="w-10 h-10 p-2 rounded-full text-white"
              viewBox="0 0 512 512"
            >
              <path
                d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z"
              />
            </svg>
          </div>
          <div
            class="cursor-pointer"
            @click="toggleRandom"
          >
            <svg
              viewBox="0 0 24 24"
              class="w-12 h-12 p-2 rounded-full text-white"
            >
              <path
                v-if="isRandom"
                fill="red"
                fillRule="evenodd"
                d="M4 17a1 1 0 0 1 0-2h2l3-3l-3-3H4a1.001 1.001 0 0 1 0-2h3l4 4l4-4h2V5l4 3.001L17 11V9h-1l-3 3l3 3h1v-2l4 3l-4 3v-2h-2l-4-4l-4 4H4Z"
              ></path>
              <path
                v-else
                fill="currentColor"
                fillRule="evenodd"
                d="M4 17a1 1 0 0 1 0-2h2l3-3l-3-3H4a1.001 1.001 0 0 1 0-2h3l4 4l4-4h2V5l4 3.001L17 11V9h-1l-3 3l3 3h1v-2l4 3l-4 3v-2h-2l-4-4l-4 4H4Z"
              ></path>
            </svg>
          </div>
          <div
            class="cursor-pointer"
            @click="downloadSong"
          >
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              class="w-10 h-10 p-2 rounded-full text-white"
            >
              <path
                fill="currentColor"
                d="M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7l7-7z"
              ></path>
            </svg>
          </div>
        </div>
        <div class="mb-4">
          <div>
            <input
              id="progress"
              type="range"
              class="slider"
              v-model="currentTimePercentage"
              step="1"
              min="0"
              max="100"
              @click="seekAudio"
            />
          </div>
        </div>
      </div>
      <div
        class="scroll h-full w-full border-2 p-2"
      >
        <div
          @click="
            playAudio(
              p.audioFile,
              p.name,
              p.duration,
              p.avatar,
              p.id
            )
          "
          v-for="p in list"
          :key="p.id"
          :class="{
            playing: currentSongId === p.id,
            'w-480px p-3 bg-red-300 rounded-xl mb-1 cursor-pointer':
              currentSongId !== p.id,
          }"
        >
          <audio
            ref="audioPlayer"
            :src="p.audioFile"
          ></audio>
          <div
            class="flex items-center w-full justify-between"
          >
            <div>
              <img
                :src="p.avatar"
                alt=""
                class="rounded-full w-12 h-12 items-center"
              />
            </div>
            <div class="flex-row gap-3">
              <h1
                class="text-xl font-sans"
                :class="{
                  red: currentSongId == p.id,
                }"
              >
                {{ p.name }}
              </h1>
              <span
                class="text-sm"
                :class="{
                  caret: currentSongId == p.id,
                }"
                >{{ p.artist }}</span
              >
            </div>
            <div>
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                class="w-20px h-20px"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M2 12a2 2 0 1 1 4 0a2 2 0 0 1-4 0Zm8 0a2 2 0 1 1 4 0a2 2 0 0 1-4 0Zm8 0a2 2 0 1 1 4 0a2 2 0 0 1-4 0Z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";

const hover = ref(false);
const currentSongId = ref(null);
const currentSong = ref(null);
const isPlaying = ref(false);
const isRotating = ref(false);
const isRandom = ref(false);

const toggleAudio = () => {
  if (currentAudio) {
    if (currentAudio.paused) {
      currentAudio.play();
      isPlaying.value = true;
    } else {
      currentAudio.pause();
      isPlaying.value = false;
    }
  }
};

const randomIntInRange = (min, max) => {
  return (
    Math.floor(Math.random() * (max - min + 1)) +
    min
  );
};

const toggleRandom = () => {
  isRandom.value = !isRandom.value;
};

const { data: list } = await useFetch(
  "https://663887544253a866a24e1d48.mockapi.io/list"
);

const currentSongImage = ref(
  "https://thumbs.dreamstime.com/z/error-page-not-found-vector-vinyl-music-broken-graphic-error-page-not-found-vector-vinyl-music-broken-graphic-background-156624909.jpg"
);

watch(currentSong, (newValue, oldValue) => {
  console.log(currentAudio, currentSong);
});

let currentAudio = null;

let currentVolume = 1;

const currentTimePercentage = ref(0);

const fileDownloadUrl = ref(null);
const playAudio = (
  audioFile,
  songName,
  duration,
  songImage,
  songId
) => {
  if (currentAudio) {
    currentAudio.pause();
    isPlaying.value = false;
  }
  currentSongId.value = songId;

  const audio = new Audio(audioFile);

  fileDownloadUrl.value = audioFile;
  currentSongImage.value = songImage;

  volumeControl.addEventListener("input", () => {
    console.log(
      "volume change",
      volumeControl.value
    );
    const volume = volumeControl.value;

    audio.volume = volume / 100;
  });

  audio.play();
  currentAudio = audio;
  isPlaying.value = true;
  currentSong.value = songName;
  audio.addEventListener("ended", () => {
    playNextAudio();
  });
  audio.addEventListener("timeupdate", () => {
    const currentTime = audio.currentTime;
    const percentage =
      (currentTime / audio.duration) * 100;
    currentTimePercentage.value = percentage;
  });
};

const playNextAudio = () => {
  const currentIndex = getCurrentSongIndex();
  const nextIndex = currentIndex + 1;

  if (isRandom.value) {
    const currentSongIndex =
      getCurrentSongIndex();
    const maxIndex = list.value.length - 1;
    let randomIndex;
    do {
      randomIndex = randomIntInRange(0, maxIndex);
    } while (randomIndex === currentSongIndex);

    const randomSong = list.value[randomIndex];
    playAudio(
      randomSong.audioFile,
      randomSong.name,
      randomSong.duration,
      randomSong.avatar,
      randomSong.id
    );
  } else {
    if (nextIndex < list.value.length) {
      const nextAudio = list.value[nextIndex];
      playAudio(
        nextAudio.audioFile,
        nextAudio.name,
        nextIndex,
        nextAudio.avatar,
        nextAudio.id
      );
      currentSongId = nextAudio.id;
    } else {
      const firstAudio = list.value[0];

      playAudio(
        firstAudio.audioFile,
        firstAudio.name,
        0,
        firstAudio.avatar,
        firstAudio.id
      );
      currentSongId = firstAudio.id;
    }
  }
};
const playNewSong = (audioFile) => {
  const newAudio = new Audio(audioFile);

  if (volumeControl.value === "0") {
    newAudio.volume = 0;
  }
  currentAudio = newAudio;
  currentAudio.play();
};

const playPreviousAudio = () => {
  const currentIndex = getCurrentSongIndex();
  const prevIndex = currentIndex - 1;

  if (isRandom.value) {
    const currentSongIndex =
      getCurrentSongIndex();
    const maxIndex = list.value.length - 1;
    let randomIndex;
    do {
      randomIndex = randomIntInRange(0, maxIndex);
    } while (randomIndex === currentSongIndex);

    console.log("randomIndex: " + randomIndex);
    const randomSong = list.value[randomIndex];
    playAudio(
      randomSong.audioFile,
      randomSong.name,
      randomSong.duration,
      randomSong.avatar,
      randomSong.id
    );
  } else {
    if (prevIndex >= 0) {
      const prevAudio = list.value[prevIndex];
      playAudio(
        prevAudio.audioFile,
        prevAudio.name,
        prevIndex,
        prevAudio.avatar,
        prevAudio.id
      );
      currentSongId = prevAudio.id;
    } else {
      const lastAudioIndex =
        list.value.length - 1;
      const lastAudio =
        list.value[lastAudioIndex];
      playAudio(
        lastAudio.audioFile,
        lastAudio.name,
        lastAudioIndex,
        lastAudio.avatar,
        lastAudio.id
      );
      currentSongId = lastAudio.id;
    }
  }
};

const seekAudio = (event) => {
  const newValue = event.target.value;
  const totalDurationInSeconds =
    currentAudio.duration;
  const seekTimeInSeconds =
    (newValue / 100) * totalDurationInSeconds;
  currentAudio.currentTime = seekTimeInSeconds;
};

const getCurrentSongIndex = () => {
  if (!currentAudio) return 0;

  const currentAudioSrc = currentAudio.src;
  for (let i = 0; i < list.value.length; i++) {
    if (
      list.value[i].audioFile === currentAudioSrc
    ) {
      return i;
    }
  }
  return 0;
};

const restartAudio = () => {
  if (currentAudio) {
    currentAudio.currentTime = 0;
    currentAudio.play();
    isPlaying.value = true;
  }
};

const downloadSong = async () => {
  try {
    const response = await fetch(
      fileDownloadUrl.value
    );
    const blob = await response.blob();
    const urlObject =
      window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = urlObject;
    a.download = `song.mp3`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(urlObject);
    document.body.removeChild(a);
  } catch (error) {
    console.error(
      "Error downloading the song:",
      error
    );
  }
};
</script>

<style scoped>
.rotate-infinite {
  /* animation: rotateInfinite 5s linear infinite; */
}

.rotate-infinite {
  animation: none;
}

.rotate {
  animation: rotateInfinite 5s linear infinite;
}

@keyframes rotateInfinite {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.containerr {
  background-color: green;
  height: 100px;
  width: 100px;
}

#volumeControl {
  display: none;
  position: absolute;
  top: -50px;
  left: -30px;
  rotate: -90deg;
  width: 100px;
}

#volumeControlWrapper:hover #volumeControl {
  display: block;
}

.scroll {
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.slider {
  -webkit-appearance: none;
  width: 100%;
  height: 7px;
  background: #eadfdf;
  outline: none;
  opacity: 0.7;
  transition: opacity 0.2s;
  cursor: pointer;
  border-radius: 4px;
}

.volume-slider {
  -webkit-appearance: none;
  width: 100%;
  height: 5px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  transition: opacity 0.2s;
  cursor: pointer;
  border-radius: 5px;
}

.volume-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 15px;
  height: 15px;
  background: #ffffff;
  border-radius: 50%;
  cursor: pointer;
}

.playing {
  padding: 0.75rem;
  background-color: #cdc2fd;
  border-radius: 0.375rem;
  margin-bottom: 0.25rem;
  cursor: pointer;
}

.active {
  fill: red;
}

.font-fm {
  font-family: "Montserrat", sans-serif;
}

.red {
  color: red;
}

.caret {
  color: rgb(56, 32, 5);
}
</style>
