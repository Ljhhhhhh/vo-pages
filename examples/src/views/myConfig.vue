<template>
  <div id="app">
    <vo-pages
      :data="list"
      @pullingUp="pullingUp"
      @pullingDown="pullingDown"
      :config="config"
      :loadedAll="loadedAll"
    >
      <ul class="article-list">
        <li class="article" v-for="article in list" :key="article.id">
          <slot></slot>
          <div class="left">
            <img :src="article.image_uri" alt="thumb" />
          </div>
          <div class="right">
            <p>{{ article.title }}</p>
            <p>{{ article.author }}</p>
          </div>
        </li>
      </ul>
    </vo-pages>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import { ArticleParams } from "@/mock/article";
// import TurnPage from "vo-turn-page";

@Component({
  // components: {
  //   TurnPage
  // }
})
export default class App extends Vue {
  list: ArticleParams[] = [];

  total: number = 0;

  page: number = 1;

  loadedAll: boolean = false;

  beforePullDown: boolean = true;

  config: object = {
    loading: "自定义加载中……",
    loadedAllMsg: "自定义已加载全部",
    pullUpMsg: "自定义上拉加载更多",
    pullDownMsg: "自定义下拉刷新",
    touchLeaveMsg: "自定义释放立即刷新"
  };

  created() {
    this.getList(false);
  }

  pullingDown() {
    this.beforePullDown = false;
    this.page = 1;
    this.getList(false);
  }

  pullingUp() {
    this.page += 1;
    this.getList();
  }

  async getList(loadMore = true) {
    const result = await axios.get("/article/list", {
      params: {
        page: this.page
      }
    });

    this.total = result.data.total;

    if (loadMore) {
      this.list = this.list.concat(result.data.items);
    } else {
      this.list = result.data.items;
    }

    if (!this.beforePullDown) {
      this.beforePullDown = true;
    }

    this.loadedAll = this.total === this.list.length;
  }
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  /*
     * 必须给固定高度，overflow: hidden;
     */
  height: 100vh;
  overflow: hidden;
}

.article-list {
  width: 100%;
  height: auto;

  .article {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    .left {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
      }
    }

    .right {
      flex: 3;
      display: flex;
      flex-direction: column;

      p {
        width: 100%;
        line-height: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
