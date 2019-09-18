## 在线体验与源码

- 在线体验：[pages.cixi518.com](http://pages.cixi518.com/)
- 扫码体验：<br />
  <img src="https://user-gold-cdn.xitu.io/2019/9/18/16d437fbfa9f78f2?w=260&h=260&f=png&s=4129" width="200px" height="200px" />
- [项目源码](https://github.com/Ljhhhhhh/vo-pages)

## 易用？高可定制？
* 易用： 基础使用只需要列表数据、上拉事件、下拉事件就完成了翻页、刷新功能的开发
* 高可定制： 提供了各种配置项，用于提示语配置、样式修改、上拉下拉事件切换等等功能

## 使用

- npm i vo-pages --save
- vo-pages组件父元素必须设置固定高度并填写属性overflow: hidden;如：

```css
height: 100vh;
overflow: hidden;
```

全局引入 

```js
// mian.js
import VoPages from "vo-pages";
import "vo-pages/lib/vo-pages.css";
Vue.component('VoPages', VoPages)
```

局部引入

```js
import VoPages from 'vo-pages';
import "vo-pages/lib/vo-pages.css";
components: {
  VoPages
}
```

常规使用

```vue template
<vo-pages :data="list" @pullingUp="pullingUp" @pullingDown="pullingDown" :loadedAll="loadedAll">
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
```

更多案例参考：[vo-pages/examples](https://github.com/Ljhhhhhh/vo-pages/tree/master/examples)

## API

| 参数               | 说明                                                  |       类型        |          默认值          |
| :----------------- | ----------------------------------------------------- | :---------------: | :----------------------: |
| data               | 数据列表                                              |       array       |           必填           |
| click              | 是否可响应用户点击事件                                |      boolean      |           true           |
| loadedAll          | 是否已加载所有数据                                    |      boolean      |          false           |
| pullUpHandle       | 是否开启上拉事件，如果不需要上拉事件，必须设置为false | object \| boolean |           true           |
| pullDownHandle     | 是否开启下拉事件，如果不需要下拉事件，必须设置为false | object \| boolean | {threshold: 50,stop: 30} |
| pullDownToLoadmore | 是否下拉加载更多                                      |      boolean      |          false           |
| noDataHint         | 初始化/无数据时是否提示                               |      boolean      |           true           |
| config             | 自定义设置                                            |      object       |            {}            |

> 点击[pullUpHandle](https://better-scroll.github.io/docs/zh-CN/plugins/pullup.html)和[pullDownHandle](https://better-scroll.github.io/docs/zh-CN/plugins/pulldown.html)查看详细介绍

#### config配置项

> 管道符后面的值是`pullDownToLoadmore`为ture时(下拉加载更多)的默认值

| 参数             | 说明                   | 类型   | 默认值                       |
| ---------------- | ---------------------- | ------ | ---------------------------- |
| pullDownMsgDelay | 下拉提示语展示时长(ms) | number | 800                          |
| loading          |                        |        | 加载中……                     |
| refresh          |                        |        | 刷新中……  \|加载中……         |
| refreshed        |                        |        | 刷新成功 \| 已加载           |
| loadedAllMsg     |                        |        | 已加载全部                   |
| pullUpMsg        |                        |        | 上拉加载更多                 |
| pullDownMsg      |                        |        | 下拉刷新 \| 下拉加载更多     |
| touchLeaveMsg    |                        |        | 释放立即刷新 \| 释放加载更多 |
| noData           |                        |        | 暂无数据                     |
| pullDownStyle    | 下拉提示样式           |        | {}                           |
| pullUpStyle      | 上拉提示样式           |        | {}                           |
| endLineStyle     | 底线样式               |        | {}                           |

## Events

- pullingUp：上拉超过`pullUpHandle`的`threshold`触发
- pullingDown： 下拉超过`pullDownHandle`的`threshold`触发

## Slot

只有一个默认插槽，用来展示用户数据

## 注意

- 数据不足一屏时且有下一页时会自动请求下一页数据

## TODO

- [ ] 下拉图标（掘金下拉效果）
- [ ] css自动加载

------

如果各位大佬使用中遇到bug或不爽的点，还希望可以给提[issue](https://github.com/Ljhhhhhh/vo-pages/issues)，您的反馈使我进步，非常感谢。

再次奉上[项目源码](https://github.com/Ljhhhhhh/vo-pages)



