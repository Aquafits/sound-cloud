<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <player />
    <el-button @click="getComment()">获得评论</el-button>
    <p>{{ result }}</p>
  </div>
</template>

<script>
// @ is an alias to /src
import Player from "../components/player/player";
import { get_qq_hot_comment } from "../api/comment";

export default {
  name: "home",
  components: { Player },
  data() {
    return {
      result: {}
    };
  },
  methods: {
    getComment() {
      this.result = get_qq_hot_comment("231729922", 20);
    }
  }
};
</script>
