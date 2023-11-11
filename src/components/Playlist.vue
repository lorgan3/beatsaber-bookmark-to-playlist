<script setup lang="ts">
import { BpList } from "../data/bplist";

const { playlist } = defineProps<{
  playlist: BpList;
}>();
</script>

<template>
  <a
    class="playlist"
    :download="`${playlist.playlistTitle}.bplist`"
    :href="`data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(playlist)
    )}`"
    title="Download"
  >
    <img :src="playlist.image" />
  </a>
</template>

<style scoped lang="scss">
.playlist {
  cursor: pointer;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.05);
  }
}
</style>
