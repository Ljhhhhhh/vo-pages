<template>
  <div class="home">
    <ul>
      <li>
        <router-link to="/PullDownToLoadMore">
          <span>下拉加载</span>
          <em></em>
        </router-link>
      </li>
      <li>
        <router-link to="/PullUpToLoadMore">
          <span>上拉加载与下拉刷新</span>
          <em></em>
        </router-link>
      </li>
      <li>
        <router-link to="/myConfig">
          <span>自定义提示</span>
          <em></em>
        </router-link>
      </li>
      <li>
        <router-link to="/myConfig2">
          <span>自定义样式</span>
          <em></em>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Home extends Vue {}
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  height: auto;
  ul {
    width: 100%;
    height: auto;
    margin-block-start: 0;
    margin-block-end: 0;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 0;
    li {
      list-style-type: none;
      line-height: 40px;
      border-bottom: 1px solid #e5e5e5;
      a {
        padding: 0 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #333;
        text-decoration: none;
        em {
          display: block;
          width: 10px;
          height: 10px;
          border-right: 1px solid #333;
          border-bottom: 1px solid #333;
          transform: rotate(-45deg);
        }
      }
    }
  }
}
</style>
