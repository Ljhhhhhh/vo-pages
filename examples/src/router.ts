import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import(/* webpackChunkName: "about" */ "./views/home.vue")
    },
    {
      path: "/pullDownToLoadMore",
      name: "pullDownToLoadMore",
      component: () => import("./views/pullDownToLoadMore.vue")
    },
    {
      path: "/pullUpToLoadMore",
      name: "pullUpToLoadMore",
      component: () => import(/* webpackChunkName: "about" */ "./views/pullUpToLoadMore.vue")
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
    },
    {
      path: "/noData",
      name: "noData",
      component: () => import(/* webpackChunkName: "about" */ "./views/noData.vue")
    },
    {
      path: "/autoLoadMore",
      name: "autoLoadMore",
      component: () => import(/* webpackChunkName: "about" */ "./views/autoLoadMore.vue")
    }
  ]
});
