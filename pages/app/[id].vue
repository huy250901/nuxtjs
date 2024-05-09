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
    class="flex bg-gradient-to-br from-blue-300 via-green-400 to-purple-400 justify-center items-center h-screen"
  >
    <div
      class="bg-gradient-to-br from-orange-500 via-teal-500 to-purple-500 h-[90%] rounded-2xl w-1/3 flex justify-center items-center flex-col"
    >
      <div class="h-auto w-full px-4">
        <h2
          class="text-center font-fm text-blue-700 font-bold my-2"
        >
          Now Playing
        </h2>

        <h3
          class="text-center font-fm text-blue-700 font-bold mb-2"
        >
          {{
            currentSong
              ? `${currentSong}`
              : "Không có bài nào đang phát"
          }}
        </h3>
        <div
          ref="cdElement"
          class="flex w-52 m-auto"
        >
          <img
            ref="imgRef"
            id="img"
            class="rounded-full m-auto"
            :src="currentSongImage"
            :class="{ rotate: isPlaying }"
          />
        </div>

        <div
          class="flex justify-between mt-6 items-center mb-4"
        >
          <div
            class="relative cursor-pointer"
            id="volumeControlWrapper"
          >
            <IcVolume />
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
            <IcRe :isLoop="isLoop" />
          </div>
          <div
            @click="playPreviousAudio"
            class="cursor-pointer"
          >
            <IcPrev />
          </div>

          <div
            @click="toggleAudio"
            class="cursor-pointer"
          >
            <div
              class="rounded-full bg-gradient-to-br from-purple-400 to-pink-500 w-10 h-10 p-2 flex items-center justify-center"
            >
              <svg
                fill="#fff"
                width="1.6em"
                height="1.6em"
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
          </div>

          <div
            @click="playNextAudio"
            class="cursor-pointer"
          >
            <IcNext />
          </div>
          <div
            class="cursor-pointer"
            @click="toggleRandom"
          >
            <IcRandom :isRandom="isRandom" />
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
              <defs>
                <linearGradient
                  id="grad4"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    style="
                      stop-color: rgb(
                        255,
                        205,
                        227
                      );
                      stop-opacity: 1;
                    "
                  />
                  <stop
                    offset="54%"
                    style="
                      stop-color: rgb(
                        255,
                        180,
                        248
                      );
                      stop-opacity: 1;
                    "
                  />
                  <stop
                    offset="100%"
                    style="
                      stop-color: rgb(
                        237,
                        127,
                        245
                      );
                      stop-opacity: 1;
                    "
                  />
                </linearGradient>
              </defs>

              <path
                fill="url(#grad4)"
                d="M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7l7-7z"
              ></path>
            </svg>
          </div>
        </div>
        <div class="mb-4">
          <div>
            <div class="relative h-1 bg-white">
              <div
                class="absolute top-0 left-0 h-full bg-purple-500"
                :style="{
                  width:
                    currentTimePercentage + '%',
                }"
              ></div>

              <input
                id="progress"
                type="range"
                class="absolute appearance-none w-full h-1 bg-transparent outline-none cursor-pointer focus:outline-none focus:ring-coral focus:border-coral"
                v-model="currentTimePercentage"
                step="1"
                min="0"
                max="100"
                @click="seekAudio"
              />
            </div>
          </div>
          <div class="flex justify-between mt-4">
            <p class="text-blue-200">
              {{ formatTime(currentTime) }}
            </p>
            <p class="text-blue-200">
              {{ formatTime(totalTime) }}
            </p>
          </div>
        </div>
      </div>
      <div
        ref="scrollElement"
        class="scroll h-full w-full p-2"
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
          ref="songItems"
          v-for="p in list"
          :key="p.id"
          :class="{
            playing: currentSongId === p.id,
            'w-480px h-20 p-3 bg-red-300 rounded-xl mb-1 cursor-pointer':
              currentSongId !== p.id,
          }"
          class="min-h-20 flex"
        >
          <audio
            ref="audioPlayer"
            :src="p.audioFile"
          ></audio>
          <div
            class="flex items-center w-full justify-between gap-6"
          >
            <div>
              <img
                :src="p.avatar"
                alt=""
                class="rounded-full w-12 h-12 items-center"
              />
            </div>
            <div class="flex flex-col flex-1">
              <h1
                class="text-xl font-sans overflow-hidden whitespace-nowrap inline-block max-w-56 truncate ..."
                :class="{
                  red: currentSongId == p.id,
                }"
                style="
                  margin-block-start: 0;
                  margin-block-end: 0;
                "
              >
                {{ p.name }}
              </h1>
              <span
                class="text-sm overflow-hidden whitespace-nowrap inline-block max-w-48 truncate ..."
                :class="{
                  caret: currentSongId == p.id,
                }"
              >
                {{ p.artist }}
              </span>
            </div>
            <div
              @click="() => console.log('more')"
            >
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
import { ref, onMounted, nextTick } from "vue";
import IcNext from "../../assets/icons/ic_Next.vue";
import IcRandom from "../../assets/icons/ic_Random.vue";
import IcPrev from "../../assets/icons/ic_Prev.vue";
import IcRe from "../../assets/icons/ic_Re.vue";
import IcVolume from "../../assets/icons/ic_Volume.vue";

const currentSongId = ref(null);
const currentSong = ref(null);
const isPlaying = ref(false);
const isRandom = ref(false);
const isLoop = ref(false);
const imgRef = ref(null);
const cdElement = ref(null);
const scrollElement = ref(null);
const playingSong = ref(null);

let imgAnimated = null;

const currentTime = ref(0);
const totalTime = ref(0);
let initialCdWidth = 0;

const { data: list } = await useFetch(
  "https://663887544253a866a24e1d48.mockapi.io/list"
);

const currentSongImage = ref(
  "https://photo-resize-zmp3.zmdcdn.me/w600_r1x1_jpeg/cover/e/d/2/5/ed251cf560be4747e7737b535c357f07.jpg"
);

const getPlayingElement = () => {
  nextTick(() => {
    const playingElement =
      document.querySelector(".playing");
    console.log(
      "Playing Element:",
      playingElement
    );

    setTimeout(() => {
      playingElement.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }, 200);
  });
};

watch(
  () => currentSongId.value,
  () => {
    getPlayingElement();
  }
);

onMounted(() => {
  initialCdWidth = cdElement.value.offsetWidth;

  scrollElement.value.addEventListener(
    "scroll",
    () => {
      const scrollTop =
        scrollElement.value.scrollTop;
      const cdWidth = cdElement.value.offsetWidth;
      let newCdWidth = initialCdWidth - scrollTop;

      cdElement.value.style.width =
        newCdWidth > 0 ? newCdWidth + "px" : 0;
    }
  );
});

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(
    seconds % 60
  );
  return `${minutes}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
};

onMounted(() => {
  nextTick(() => {
    const rotateRef = imgRef.value;
    imgAnimated = rotateRef.animate(
      [{ transform: "rotate(360deg)" }],
      {
        duration: 10000,
        iterations: Infinity,
      }
    );
    imgAnimated.pause();
  });
});

watch(isLoop, (newValue) => {
  if (currentAudio) {
    currentAudio.loop = newValue;
  }
});

const toggleAudio = () => {
  if (!currentAudio) {
    const firstAudio = list.value[0];
    playAudio(
      firstAudio.audioFile,
      firstAudio.name,
      0,
      firstAudio.avatar,
      firstAudio.id
    );

    isPlaying.value = true;
    return;
  }

  if (currentAudio.paused) {
    imgAnimated.play();

    currentAudio.play();
    isPlaying.value = true;
  } else {
    currentAudio.pause();
    isPlaying.value = false;
    imgAnimated.pause();
  }
};
const randomIntInRange = (min, max) => {
  return (
    Math.floor(Math.random() * (max - min + 1)) +
    min
  );
};

const toggleRandom = () => {
  console.log("Toggle random", isRandom);
  isRandom.value = !isRandom.value;
};

const restartAudio = () => {
  isLoop.value = !isLoop.value;
};

watch(currentSong, (newValue, oldValue) => {
  console.log(currentAudio, currentSong);
});

let currentAudio = null;

const currentTimePercentage = ref(0);
let currentVolume = 1;

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
    currentVolume = volumeControl.value / 100;
    audio.volume = currentVolume;
  });

  watch(
    () => currentVolume,
    (newValue) => {
      if (currentAudio) {
        currentAudio.volume = newValue;
      }
    }
  );

  if (isLoop.value) {
    console.log("lap");
    audio.play();
    audio.loop = true;
    isPlaying.value = true;
  }
  audio.volume = currentVolume;
  audio.play();
  imgAnimated.play();
  currentAudio = audio;
  isPlaying.value = true;
  currentSong.value = songName;
  audio.addEventListener("ended", () => {
    playNextAudio();
  });

  audio.addEventListener("loadedmetadata", () => {
    totalTime.value = audio.duration;
  });

  audio.addEventListener("timeupdate", () => {
    const currentTimeValue = audio.currentTime;
    const percentage =
      (currentTimeValue / audio.duration) * 100;
    currentTime.value = currentTimeValue;
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
  width: 100%;
  height: 5px;
  border: none;
  background: linear-gradient(
    to right,
    #00ff00 0%,
    #00ff00 var(--percentage),
    #d3d3d3 var(--percentage),
    #d3d3d3 100%
  );
}

input[type="range"] {
  accent-color: rgb(168, 85, 247);
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
