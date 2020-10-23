<template>
  <div class="player">
    <NormalPlayer></NormalPlayer>
    <MiniPlayer></MiniPlayer>
  </div>
</template>
<script>
import NormalPlayer from "../components/Player/NormalPlayer";
import MiniPlayer from "../components/Player/MiniPlayer";
export default {
  name: "Player",
  components: {
    NormalPlayer,
    MiniPlayer
  }
};
</script>
<style scoped lang="scss"></style>
