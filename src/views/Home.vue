<template>
  <div class="home">
    <el-menu
      :default-active="active"
      mode="horizontal"
      style="position: fixed; z-index: 2; width: 100%"
    >
      <el-menu-item style="font-weight: bold; color: #303133;">
        <template>
          <span style="margin-left: 10px">Sound Cloud</span>
        </template>
      </el-menu-item>

      <el-menu-item index="search">
        <i class="el-icon-search"></i>
        <span slot="title">搜索</span>
      </el-menu-item>
    </el-menu>

    <search @playNow="playNow" @seeHotComments="seeHotComments"></search>

    <aplayer
      v-if="playlist.length > 0"
      ref="player"
      :audio="playlist"
      :lrcType="3"
      fixed
    />

    <el-dialog title="热门评论" :visible.sync="dialog_visible" width="75%">
      <el-card
        v-for="c in comments"
        :key="c.time"
        shadow="hover"
        style="margin-bottom: 2em"
      >
        <el-row :gutter="20">
          <el-col :span="2">
            <img :src="c.avatar" class="avatar" alt="avatar" />
          </el-col>

          <el-col :span="22">
            <h3>{{ c.nickname }}</h3>
            <p>{{ c.content }}</p>
            <el-card shadow="hover" v-if="c.replied_comment_content">
              <p style="color: #606266">
                {{ c.replied_comment_content }}
              </p>
            </el-card>
            <p>
              <i class="el-icon-caret-top"></i>
              {{ c.liked_count }}
            </p>
            <p style="color: #909399; font-size: 13px">
              {{ formatDate(new Date(c.time)) }}
            </p>
          </el-col>
        </el-row>
      </el-card>
    </el-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
import Search from "../components/search";
import {
  get_qq_hot_comments,
  get_netease_hot_comments_head,
  get_netease_hot_comments_tail
} from "../api/comment";
import {
  compare_comment,
  get_netease_normalized_hot_comments_head,
  get_netease_normalized_hot_comments_tail,
  get_qq_normalized_hot_comments
} from "../middleware/comment_integration";

export default {
  name: "home",
  components: { Search },
  data() {
    return {
      active: "search",
      result: {},
      playlist: [],
      comments: [],
      dialog_visible: false
    };
  },
  methods: {
    playNow(music) {
      this.playlist.push(music);
      let l = this.playlist.length;
      this.$refs.player.switch(l - 1);
      this.$refs.player.play();
    },
    seeHotComments(ids) {
      console.log(ids);
      this.comments = [];
      this.dialog_visible = true;

      if (ids.qq_id !== "") {
        get_qq_hot_comments(ids.qq_id).then(res => {
          this.comments = this.comments.concat(
            get_qq_normalized_hot_comments(res)
          );
          this.comments.sort(compare_comment);
        });
      }

      if (ids.netease_id !== "") {
        get_netease_hot_comments_head(ids.netease_id).then(res => {
          this.comments = this.comments.concat(
            get_netease_normalized_hot_comments_head(res)
          );
          this.comments.sort(compare_comment);
        });
        get_netease_hot_comments_tail(ids.netease_id).then(res => {
          this.comments = this.comments.concat(
            get_netease_normalized_hot_comments_tail(res)
          );
          this.comments.sort(compare_comment);
        });
      }
    },
    formatDate(time) {
      let y = time.getFullYear();
      let m = time.getMonth() + 1;
      let d = time.getDate();
      let h = time.getHours();
      let min = time.getMinutes();

      if (m < 10) {
        m = " " + m;
      }
      if (h < 10) {
        h = " " + h;
      }
      if (d < 10) {
        d = "" + 0 + d;
      }
      if (min < 10) {
        min = "" + 0 + min;
      }
      return y + "年" + m + "月" + d + "日 " + h + ":" + min;
    }
  }
};
</script>

<style scoped>
.avatar {
  border-radius: 2em;
  margin-top: 1em;
  width: 4em;
}
</style>
