<template>
  <div class="home">
    <el-menu :default-active="active" :router="true" mode="horizontal">
      <el-menu-item style="font-weight: bold; color: #303133;">
        <template>
          <span style="margin-left: 10px">Sound Cloud</span>
        </template>
      </el-menu-item>

      <el-menu-item index="search">
        <i class="el-icon-search"></i>
        <span slot="title">搜索</span>
      </el-menu-item>

      <el-menu-item index="hot">
        <i class="el-icon-chat-dot-round"></i>
        <span slot="title">热评</span>
      </el-menu-item>
    </el-menu>

    <router-view />

    <c-player
      :playlist="playlist"
      :drop-down-menu-mode="'top'"
      style="position: fixed; bottom: 8px; right: 8px;"
    ></c-player>
  </div>
</template>

<script>
// @ is an alias to /src
import { get_qq_hot_comment } from "../api/comment";
import CPlayer from "vue-cplayer";

export default {
  name: "home",
  components: { CPlayer },
  data() {
    return {
      active: "search",
      result: {},
      playlist: [
        {
          src: "https://cdn.moefe.org/music/mp3/kyoukiranbu.mp3",
          poster:
            "https://p1.music.126.net/AUGVPQ_rVrngDH9ocQrn3Q==/109951163613037822.jpg?param=300y300",
          name: "チルドレンレコード",
          artist: "96猫,伊東歌詞太郎",
          album: "アイリス"
        }
      ]
    };
  },
  methods: {
    getComment() {
      this.result = get_qq_hot_comment("231729922", 20);
    }
  }
};
</script>

<style scoped></style>
