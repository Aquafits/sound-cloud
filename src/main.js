import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import APlayer from "@moefe/vue-aplayer";
import VueAplyr from "vue-aplyr";
import "./plugins/element.js";

Vue.use(APlayer);
Vue.use(VueAplyr, {
  controls: ["button", "progress", "time"]
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
