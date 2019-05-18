<template>
  <div>
    <aplayer autoplay :music="audio" />
  </div>
</template>

<script>
import Aplayer from "vue-aplayer";
export default {
  name: "player",
  data() {
    return {
      audio: {
        title: "东西（Cover：林俊呈）",
        artist: "纳豆",
        src: "https://cdn.moefe.org/music/mp3/thing.mp3",
        pic: "https://p1.music.126.net/5zs7IvmLv7KahY3BFzUmrg==/109951163635241613.jpg?param=300y300" //prettier-ignore
      }
    };
  },
  components: {
    Aplayer
  }
};
</script>

<style scoped></style>
