<template>
  <div id="app">
    <vo-pages
      :data="list"
      @pullingUp="pullingUp"
      @pullingDown="pullingDown"
      :loadedAll="loadedAll"
      :pullDownNoTransform="true"
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
// import VoPages from "vo-pages";

@Component({
  components: {
    // VoPages
  }
})
export default class pullUpToLoadMore extends Vue {
  list: ArticleParams[] = [];

  total: number = 0;

  page: number = 1;

  loadedAll: boolean = false;

  beforePullDown: boolean = true;

  // config: object = {
  //   loadedAll: "已加载全部1",
  //   pullUpMsg: "上拉加载更多1",
  //   pullDownMsg: "下拉刷新1",
  //   touchLeaveMsg: "释放立即刷新1"
  // };

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
        page: this.page,
        limit: 3
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
