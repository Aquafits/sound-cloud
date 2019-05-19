<template>
  <div class="search">
    <div style="padding-top: 8em; padding-bottom: 8em">
      <br />
      <el-input
        placeholder="你想听的"
        v-model="keyword"
        size="large"
        style="width: 50%"
      >
        <el-button
          slot="append"
          type="primary"
          icon="el-icon-search"
          @click="getSearchResults()"
        ></el-button>
      </el-input>
    </div>
  </div>
</template>

<script>
export default {
  name: "search",
  data() {
    return {
      keyword: ""
    };
  },
  methods: {
    getSearchResults() {
      console.log("!");
    }
  }
};
</script>

<style scoped>
.search {
  text-align: center;
  background: url("../assets/search.jpg") no-repeat center;
  background-size: cover;
}
</style>
