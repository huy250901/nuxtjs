<template>
  <div
    class="flex justify-center items-center h-screen"
  >
    <div
      class="bg-emerald-500 h-full w-1/3 flex justify-center items-center flex-col"
    >
      <div class="h-full w-full border-2 px-4">
        <h2
          class="text-center text-blue-700 font-bold mb-4"
        >
          Now Playing
        </h2>

        <h3
          class="text-center text-blue-700 font-bold mb-4"
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
          />
        </div>
        <div
          class="flex relative justify-center space-x-5 mt-6 items-center"
        >
          <div v-if="hover">
            <input
              class="absolute top-0 -rotate-90"
              type="range"
              min="0"
              max="100"
            />
          </div>
          <div
            @mouseover="hover = true"
            @mouseleave="hover = false"
            class="flex flex-col justify-center cursor-pointer"
          >
            <svg
              width="1rem"
              height="1rem"
              viewBox="0 0 24 24"
              class="p-2 rounded-full text-white w-10 h-10"
            >
              <path
                fill="currentColor"
                d="M15.35 20.3q-.5.2-.925-.125q-.425-.325-.425-.9q0-.275.163-.487q.162-.213.412-.313q2-.8 3.213-2.55Q19 14.175 19 11.975t-1.212-3.95q-1.213-1.75-3.213-2.55q-.275-.1-.425-.325q-.15-.225-.15-.5q0-.55.425-.875q.425-.325.925-.125q2.55 1.025 4.1 3.275Q21 9.175 21 11.975t-1.55 5.05q-1.55 2.25-4.1 3.275ZM4 15q-.425 0-.712-.288Q3 14.425 3 14v-4q0-.425.288-.713Q3.575 9 4 9h3l3.3-3.3q.475-.475 1.087-.213q.613.263.613.938v11.15q0 .675-.613.937q-.612.263-1.087-.212L7 15Zm10 1V7.95q1.125.525 1.812 1.625q.688 1.1.688 2.425q0 1.325-.688 2.4Q15.125 15.475 14 16Z"
              ></path>
            </svg>
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
              viewBox="0 0 20 20"
              class="w-10 h-10 p-2 rounded-full text-white"
            >
              <path
                fill="currentColor"
                d="m4 10l9 9l1.4-1.5L7 10l7.4-7.5L13 1z"
              ></path>
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
              viewBox="0 0 20 20"
              class="w-10 h-10 p-2 rounded-full text-white"
            >
              <path
                fill="currentColor"
                d="M7 1L5.6 2.5L13 10l-7.4 7.5L7 19l9-9z"
              ></path>
            </svg>
          </div>
          <div
            class="cursor-pointer"
            @click="toggleRandom"
          >
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              class="w-10 h-10 p-2 rounded-full text-white"
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
        <div>
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
            'w-480px p-3 bg-red-500 rounded mb-1 cursor-pointer':
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
              <h1 class="text-lg font-sans">
                {{ p.name }}
              </h1>
              <span class="text-xs">{{
                p.artist
              }}</span>
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

// definePageMeta({ layout: "list" });

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

const showFirstPath = ref(true);

let currentAudio = null;

let durationRef = ref("");

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
  background-color: #ccc;
  border-radius: 0.375rem;
  margin-bottom: 0.25rem;
  cursor: pointer;
}

.active {
  fill: red;
}
</style>
