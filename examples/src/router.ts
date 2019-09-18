import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import(/* webpackChunkName: "about" */ "./views/Home.vue")
    },
    {
      path: "/PullDownToLoadMore",
      name: "PullDownToLoadMore",
      component: () => import("./views/PullDownToLoadMore.vue")
    },
    {
      path: "/PullUpToLoadMore",
      name: "PullUpToLoadMore",
      component: () => import(/* webpackChunkName: "about" */ "./views/PullUpToLoadMore.vue")
    },
    {
      path: "/myConfig",
      name: "myConfig",
      component: () => import(/* webpackChunkName: "about" */ "./views/myConfig.vue")
    },
    {
      path: "/myConfig2",
      name: "myConfig2",
      component: () => import(/* webpackChunkName: "about" */ "./views/myConfig2.vue")
    }
  ]
});
