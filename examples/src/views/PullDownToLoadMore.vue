<template>
  <div id="app">
    <vo-pages
      :data="list"
      @pullingDown="pullingDown"
      :pullDownToLoadmore="true"
      :pullUpHandle="false"
      :loadedAll="loadedAll"
    >
      <ul class="article-list">
        <li class="article" v-for="article in list" :key="article.id" @click="showDetail(article)">
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
  // components: {
  //   VoPages
  // }
})
export default class pullDownToLoadMore extends Vue {
  list: ArticleParams[] = [];

  total: number = 0;

  page: number = 1;

  loadedAll: boolean = false;

  beforePullDown: boolean = true;

  // config: object = {
  //   refresh: '加载中……',
  //   refreshed: '已加载',
  //   pullDownMsg: '下拉加载更多',
  //   touchLeaveMsg: '释放加载更多',
  // }

  created() {
    this.getList();
  }

  showDetail(t: any) {
    // eslint-disable-next-line
    console.log(t);
  }

  pullingDown() {
    this.page += 1;
    this.getList();
  }

  async getList() {
    const result = await axios.get("/article/list", {
      params: {
        page: this.page
      }
    });

    this.total = result.data.total;
    this.list.unshift(...result.data.items);

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

.lds-reload {
  position: absolute;
  top: 0;
  left: 0;
  width: 200px;
  height: 200px;
  stroke-dasharray: 180%;
  stroke-dashoffset: 0%;
  stroke: #ed6e5c;
  /*stroke-linecap:round;*/
  fill: none;
  -webkit-transform: rotate(-90deg);
  -moz-transform: rotate(-90deg);
  -ms-transform: rotate(-90deg);
  -o-transform: rotate(-90deg);
  transform: rotate(-90deg);
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
