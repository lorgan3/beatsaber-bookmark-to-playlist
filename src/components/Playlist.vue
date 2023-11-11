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
  >
    <img :src="playlist.image" />
  </a>
</template>

<style scoped lang="scss">
.playlist {
  cursor: pointer;
}
</style>
