<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { SONG_UPDATE_EVENT } from "../data/bsaber";
import { Song } from "../data/song";
import { generateTextImage } from "../data/bplist";

const { playlistSize, title } = defineProps<{
  playlistSize: number;
  title: string;
}>();

const timeString = ref("00:00");
const downloadedSongs = ref(0);
const src = generateTextImage(title);

let id = -1;

const handleSongUpdate = (event: Event) => {
  const songs = (event as CustomEvent).detail as Song[];

  downloadedSongs.value = Math.min(
    playlistSize || Number.POSITIVE_INFINITY,
    songs.length
  );

  if (playlistSize && songs.length >= playlistSize) {
    window.clearInterval(id);
  }
};

onMounted(() => {
  const start = Date.now();

  id = window.setInterval(() => {
    const time = (Date.now() - start) / 1000;
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time) % 60;

    timeString.value = `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }, 1000);

  window.addEventListener(SONG_UPDATE_EVENT, handleSongUpdate);
});

onUnmounted(() => {
  window.clearInterval(id);
  window.removeEventListener(SONG_UPDATE_EVENT, handleSongUpdate);
});
</script>

<template>
  <div class="loader">
    <img :src="src" />
    <div class="text">
      <span>
        <h3>Building playlist</h3>
        <p>This might take a while</p>
      </span>
      <div class="info">
        <span class="timer">{{ timeString }}</span>
        <span class="amount"
          >{{ downloadedSongs }} / {{ playlistSize || `??` }} songs</span
        >
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.loader {
  position: relative;

  img {
    filter: blur(2px) brightness(0.5) opacity(0.5);
  }

  .text {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    h3,
    span {
      font-size: 1em;
    }

    p {
      font-size: 0.7em;
    }

    .info {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
