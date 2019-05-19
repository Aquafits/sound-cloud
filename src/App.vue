<template>
  <div id="app" class="app">
    <home style="height: 100%" />
  </div>
</template>

<script>
import Home from "./views/Home.vue";

export default {
  name: "app",
  components: {
    Home
  }
};
</script>

<style>
body {
  margin: 0;
}
</style>
