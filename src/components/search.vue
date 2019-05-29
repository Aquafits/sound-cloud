<template>
  <div>
    <div class="search">
      <el-row type="flex" justify="center" :gutter="20">
        <el-col :span="12">
          <el-input
            placeholder="你想听的"
            v-model="keyword"
            size="large"
            class="input-with-select"
          >
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button-group>
            <el-button
              type="primary"
              @click="getQQSearchResults()"
              :disabled="search_disabled"
              >QQ</el-button
            >
            <el-button
              type="primary"
              @click="getNeteaseSearchResults()"
              :disabled="search_disabled"
              >网易云</el-button
            >
          </el-button-group>
        </el-col>
      </el-row>
    </div>

    <div v-if="have_result">
      <el-row type="flex" justify="center">
        <el-col :span="20">
          <el-table :data="songs" :show-header="true">
            <el-table-column prop="name" label="歌曲"> </el-table-column>
            <el-table-column prop="artist" label="歌手"> </el-table-column>
            <el-table-column prop="album" label="专辑"> </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                  circle
                  icon="el-icon-headset"
                  type="primary"
                  size="mini"
                  @click="playNow(scope.$index, scope.row)"
                ></el-button>
                <el-button
                  circle
                  icon="el-icon-chat-dot-round"
                  type="primary"
                  size="mini"
                  @click="seeHotComments(scope.$index, scope.row)"
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import {
  get_netease_search_results,
  get_qq_search_results
} from "../api/search";
import {
  get_normalized_netease_search_results,
  get_normalized_qq_search_results
} from "../middleware/search_integration";

export default {
  name: "search",

  data() {
    return {
      keyword: "",
      vendor: "netease",
      have_result: false,
      songs: [
        // {
        //   name: "",
        //   id: "",
        //   artist: "",
        //   album: "",
        //   url: "",
        //   cover: ""
        // }
      ]
    };
  },
  computed: {
    search_disabled() {
      return this.keyword.trim() === "";
    }
  },
  methods: {
    getNeteaseSearchResults() {
      this.vendor = "netease";
      if (this.keyword.trim() === "") {
        return;
      }
      get_netease_search_results(this.keyword).then(res => {
        this.songs = get_normalized_netease_search_results(res);
        if (this.songs.length > 0) {
          this.have_result = true;
        }
      });
    },
    getQQSearchResults() {
      this.vendor = "qq";
      if (this.keyword.trim() === "") {
        return;
      }
      get_qq_search_results(this.keyword).then(res => {
        this.songs = get_normalized_qq_search_results(res);
        if (this.songs.length > 0) {
          this.have_result = true;
        }
      });
    },
    playNow(index, music) {
      this.$emit("playNow", music);
    },
    seeHotComments(index, music) {
      let ids = {};
      ids.qq_id = "";
      ids.netease_id = "";
      if (this.vendor === "qq") {
        ids.qq_id = music.id;
        get_netease_search_results(music.name).then(res => {
          let results = get_normalized_netease_search_results(res);
          console.log(results);

          for (let result of results) {
            if (result.album === music.album) {
              ids.netease_id = result.id;
              break;
            }
          }
          this.$emit("seeHotComments", ids);
        });
      }
      if (this.vendor === "netease") {
        ids.netease_id = music.id;
        get_qq_search_results(music.name).then(res => {
          let results = get_normalized_qq_search_results(res);
          console.log(results);

          for (let result of results) {
            if (result.album === music.album) {
              ids.qq_id = result.id;
              break;
            }
          }
          this.$emit("seeHotComments", ids);
        });
      }
    }
  }
};
</script>

<style scoped>
.search {
  background: url("../assets/search.jpg") no-repeat center;
  background-size: cover;
  padding-top: 8em;
  padding-bottom: 8em;
}
</style>
