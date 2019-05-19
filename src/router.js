import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/search",
      name: "search",
      component: () => import("./components/search.vue")
    },
    {
      path: "/hot",
      name: "hot",
      component: () => import("./components/hot.vue"),
      props: true
    }
  ]
});
