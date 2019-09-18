<template>
  <div class="box-wrapper" ref="wrapper">
    <div class="wrapper-child">
      <div
        class="pulldown-wrapper"
        v-if="pullDownHandle"
        :style="defaultSetting.pullDownStyle"
      >
        <i :class="pullDownIcon"></i><span>{{pullDownMsg}}</span>
      </div>
      <div ref="listSlot">
        <slot></slot>
        <p
          class="end-line"
          :style="defaultSetting.endLineStyle"
          v-if="defaultSetting.endLine && pullDownToLoadmore && data.length">
          {{defaultSetting.endLine}}
        </p>
        <p
          class="no-data_hint"
          v-if="!data.length && noDataHint">
          <i class="iconfont icon-loading" v-if="!hasInit" />
          {{hasInit ? defaultSetting.noData : defaultSetting.loading}}
        </p>
      </div>
      <div class="pullup-wrapper" :style="defaultSetting.pullUpStyle" v-if="pullUpHandle">
        <div v-show="!isPullUp" class="before-trigger">
          <span class="pullup-txt" v-show="hasInit">
            {{loadedAll ? defaultSetting.loadedAllMsg : defaultSetting.pullUpMsg}}
          </span>
        </div>
        <div v-show="isPullUp" class="after-trigger">
          <div class="pullup-txt">
            <i class="iconfont icon-loading" />
            <span>{{defaultSetting.loading}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {
  Component,
  Prop,
  Ref,
  Emit,
  Watch,
  Vue,
} from 'vue-property-decorator';
import BScroll from '@better-scroll/core';
import Pullup from '@better-scroll/pull-up';
import PullDown from '@better-scroll/pull-down';
import '@/assets/fonticon/iconfont.css';

BScroll.use(Pullup);
BScroll.use(PullDown);

  interface configParams {
    pullDownMsgDelay ? : number, // 下拉提示显示时长 单位毫秒
    loading ? : string,
    refresh ? : string,
    refreshed ? : string,
    loadedAllMsg ? : string,
    pullUpMsg ? : string,
    pullDownMsg ? : string,
    touchLeaveMsg ? : string,
    noData ? : string,
    // 自定义下拉样式
    pullDownStyle ? : object,
    // 自定义上拉样式
    pullUpStyle ? : object,
    endLine ? : string | boolean,
    // 自定义列表末尾提示语样式
    endLineStyle ? : object,
  }

  @Component({
    name: 'VoPages',
  })
export default class TurnPage extends Vue {
    // Bscroll的Ref引用
    @Ref() readonly wrapper!: any;

    @Ref() readonly listSlot!: any;

    // 数据
    @Prop() private data!: any[];

    // 是否已加载全部
    @Prop() private loadedAll!: boolean;

    // 监听等级
    // @Prop({
    //   default: 1,
    // }) private probeType!: 1 | 2 | 3;

    // 是否可点击
    @Prop({
      default: true,
    }) private click!: boolean;

    // 是否开启上拉事件
    @Prop({
      default: true,
    }) private pullUpHandle!: object | boolean;

    // 是否开启下拉事件
    @Prop({
      default: () => ({
        threshold: 50,
        stop: 30,
      }),
    }) private pullDownHandle!: {
      threshold ? : number,
      stop ? : number
    } | boolean;

    // 是否下拉加载更多
    @Prop({
      default: false,
    }) private pullDownToLoadmore!: boolean;

    // 初始化/无数据 默认提示
    @Prop({
      default: true,
    }) private noDataHint!: boolean;

    // 自定义设置 默认为 defaultSetting
    @Prop({
      default: () => {},
    }) private config!: object

    // BScroll示例
    scroll: any = null

    // 是否上拉中
    isPullUp: boolean = false

    // 是否下拉请求中
    isPullDown: boolean = false

    // 是否下拉中
    beforePullDown: boolean = true

    // 释放执行下拉事件
    overThreshold: boolean = false

    // 初始化标记
    hasInit: boolean = false

    // 默认配置
    defaultSetting: configParams = {
      pullDownMsgDelay: 800,
      loading: '加载中……',
      refresh: '刷新中……',
      refreshed: '刷新成功',
      loadedAllMsg: '已加载全部',
      pullUpMsg: '上拉加载更多',
      pullDownMsg: '下拉刷新',
      touchLeaveMsg: '释放立即刷新',
      noData: '暂无数据',
      endLine: '我是有底线的',
      pullDownStyle: {},
      pullUpStyle: {},
      endLineStyle: {},
    }

    @Watch('data')
    dataChange(val: any) {
      if (!this.hasInit) {
        this.hasInit = true;
      }
      this.$nextTick(async () => {
        if (this.listSlot.clientHeight <= this.wrapper.clientHeight && !this.loadedAll) {
          if (this.pullDownToLoadmore) {
            this.$emit('pullingDown');
          } else {
            this.$emit('pullingUp');
          }
        }
        if (this.isPullUp) {
          this.isPullUp = false;
          this.scroll.finishPullUp();
          this.scroll.refresh();
        } else if (this.isPullDown) {
          this.isPullDown = false;
          this.overThreshold = false;
          await new Promise((resolve) => {
            setTimeout(() => {
              this.scroll.finishPullDown();
              resolve();
            }, this.defaultSetting.pullDownMsgDelay);
          });
          setTimeout(() => {
            this.beforePullDown = true;
            this.scroll.refresh();
          }, 500);
        } else {
          this.scroll.refresh();
        }
      });
    }

    mounted() {
      this.$nextTick(() => {
        if (this.pullDownToLoadmore) {
          Object.assign(
            this.defaultSetting, {
              refresh: '加载中……',
              refreshed: '已加载',
              pullDownMsg: '下拉加载更多',
              touchLeaveMsg: '释放加载更多',
            },
          );
        }
        Object.assign(
          this.defaultSetting,
          this.config,
        );
        this.initScroll();
      });

      // window.addEventListener('resize', () => {
      //   this.$nextTick(() => {
      //     this.initScroll();
      //   });
      // });
    }

    initScroll() {
      if (!this.wrapper) return false;
      this.scroll = new BScroll(this.wrapper, {
        probeType: 1,
        click: this.click,
        pullUpLoad: this.pullUpHandle,
        pullDownRefresh: this.pullDownHandle,
      });

      if (this.pullUpHandle) {
        this.scroll.on('pullingUp', this.pullingUpHandler);
      }

      if (this.pullDownHandle) {
        this.scroll.on('pullingDown', this.pullingDownHandler);
        this.scroll.on('scroll', this.scrollHandler);
      }
    }

    pullingUpHandler() {
      if (this.loadedAll) return;
      this.isPullUp = true;
      this.$emit('pullingUp');
    }

    pullingDownHandler() {
      if (this.pullDownToLoadmore && this.loadedAll) {
        setTimeout(() => {
          this.scroll.finishPullDown();
        }, this.defaultSetting.pullDownMsgDelay);
        return;
      }
      this.isPullDown = true;
      this.beforePullDown = false;
      this.$emit('pullingDown');
    }

    scrollHandler(pos: any) {
      const flagY = (typeof this.pullDownHandle === 'boolean') ? 90 : this.pullDownHandle
        .threshold || 90;
      if (pos.y > flagY && !this.isPullDown) {
        this.overThreshold = true;
      } else {
        this.overThreshold = false;
      }
    }

    // 设置下拉时的提示语
    get pullDownMsg(): string {
      if (this.beforePullDown) {
        if (this.loadedAll && this.pullDownToLoadmore) {
          return this.defaultSetting.loadedAllMsg!;
        }
        if (this.overThreshold) {
          return this.defaultSetting.touchLeaveMsg!;
        }
        return this.defaultSetting.pullDownMsg!;
      }
      if (this.isPullDown) {
        return this.defaultSetting.refresh!;
      }
      return this.defaultSetting.refreshed!;
    }

    // 设置下拉时的icon
    get pullDownIcon(): string[] {
      if (this.beforePullDown) {
        if (!(this.loadedAll && this.pullDownToLoadmore)) {
          if (this.overThreshold) {
            return ['icon-handle iconfont icon-up', 'icon-handle_up'];
          }
          return ['icon-handle iconfont icon-up', 'icon-handle_down'];
        }
      } else {
        if (this.isPullDown) {
          return ['iconfont', 'icon-loading'];
        }
        return ['iconfont', 'icon-success'];
      }
      return [];
    }
}

</script>
<style lang="scss" scoped>
  @keyframes loading {
    from {
      transform: rotate(0deg)
    }

    to {
      transform: rotate(360deg)
    }
  }

  .box-wrapper {
    width: 100%;
    height: 100%;
    max-height: 100%;
    overflow: hidden;
  }

  .wrapper-child {
    width: 100%;
    height: auto;
    position: relative;
  }

  .pulldown-wrapper {
    width: 100%;
    position: absolute;
    line-height: 30px;
    top: -30px;
    text-align: center;

    .icon-loading,
    .icon-success {
      vertical-align: middle;
      margin-right: 5px;
    }

    .icon-loading {
      animation: loading 1s ease-in infinite;
    }

    .icon-handle {
      transition: all 0.2s;
      margin-right: 5px;
      vertical-align: middle;

      &_down {
        transform: rotate(180deg);
      }
    }
  }


  .pullup-wrapper, .no-data_hint{
    width: 100%;
    line-height: 30px;
    text-align: center;

    .icon-loading {
      vertical-align: middle;
      margin-right: 5px;
      animation: loading 1s linear infinite;
    }
  }

  .end-line{
    text-align: center;
    line-height: 30px;
    border-bottom: 15px solid transparent;
  }

</style>
