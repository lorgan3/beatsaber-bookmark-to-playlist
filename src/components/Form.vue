<script setup lang="ts">
import { ref } from "vue";
import Loader from "./Loader.vue";
import Playlist from "./Playlist.vue";
import { BpList, createBpList } from "../data/bplist";
import { SONG_UPDATE_EVENT } from "../data/bsaber";

const USERNAME_KEY = "bsaber-username";
const PLAYLIST_SIZE_KEY = "bsaber-playlist-size";
const DEFAULT_PLAYLIST_SIZES = [0, 10, 25, 50, 100, 250];

const localStorageUsername = window.localStorage.getItem(USERNAME_KEY) || "";
const localStoragePlaylistSize =
  Number(window.localStorage.getItem(PLAYLIST_SIZE_KEY)) ?? 0;

const username = ref(localStorageUsername);
const playlistSize = ref(
  isNaN(localStoragePlaylistSize) ? 0 : localStoragePlaylistSize
);
const customPlaylistSize = ref(
  !DEFAULT_PLAYLIST_SIZES.includes(playlistSize.value)
);
const creatingPlaylist = ref(false);
const playlist = ref<BpList | null>(null);

const handleSearch = async () => {
  creatingPlaylist.value = true;

  createBpList(username.value, playlistSize.value || undefined)
    .then((bpList) => {
      playlist.value = bpList;
      creatingPlaylist.value = false;
    })
    .catch((error) => {
      console.error(error);
      window.dispatchEvent(new CustomEvent(SONG_UPDATE_EVENT, { detail: [] }));
    });

  window.localStorage.setItem(USERNAME_KEY, username.value);
  window.localStorage.setItem(PLAYLIST_SIZE_KEY, playlistSize.value.toString());
};
</script>

<template>
  <div class="wrapper">
    <div>
      <h3>BeastSaber username</h3>
      <input
        name="username"
        type="text"
        placeholder="BeastSaber username"
        v-model="username"
        autofocus
      />
    </div>

    <div>
      <h3>Playlist size</h3>
      <div class="playlist-size" v-if="!customPlaylistSize">
        <button
          :class="{ 'btn--selected': playlistSize === 0 }"
          @click="() => (playlistSize = 0)"
        >
          All
        </button>
        <button
          :class="{ 'btn--selected': playlistSize === 10 }"
          @click="() => (playlistSize = 10)"
        >
          10
        </button>
        <button
          :class="{ 'btn--selected': playlistSize === 25 }"
          @click="() => (playlistSize = 25)"
        >
          25
        </button>
        <button
          :class="{ 'btn--selected': playlistSize === 50 }"
          @click="() => (playlistSize = 50)"
        >
          50
        </button>
        <button
          :class="{ 'btn--selected': playlistSize === 100 }"
          @click="() => (playlistSize = 100)"
        >
          100
        </button>
        <button
          :class="{ 'btn--selected': playlistSize === 250 }"
          @click="() => (playlistSize = 250)"
        >
          250
        </button>
        <button @click="() => (customPlaylistSize = true)">Custom</button>
      </div>
      <div class="playlist-size" v-else>
        <input
          name="playlistSize"
          @input="(value) => (playlistSize = (value.target as HTMLInputElement).valueAsNumber)"
          type="number"
          placeholder="Playlist size"
          :value="playlistSize"
          autofocus
        />
      </div>
    </div>

    <button @click="handleSearch" :disabled="!username">Create playlist</button>
    <Loader
      v-if="creatingPlaylist"
      :playlist-size="playlistSize"
      :title="`${username}'s bookmarks`"
    />
    <Playlist v-if="playlist" :playlist="playlist" />
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1em;
  align-items: center;

  h3 {
    margin-bottom: 0.3em;
  }

  input {
    padding: 10px;
    font-size: 16px;
    width: 300px;
    margin-right: 10px;
  }

  button {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #007bff;
    color: #fff;
    border: none;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }

  .btn--selected {
    background-color: #0056b3;
  }
}
</style>
