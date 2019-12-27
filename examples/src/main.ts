import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Mock from "./mock";
import VoPages from "vo-pages";
import "vo-pages/lib/vo-pages.css";

Mock.start();

// Vue.use(VoPages);

Vue.config.productionTip = false;

Vue.component("VoPages", VoPages);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
