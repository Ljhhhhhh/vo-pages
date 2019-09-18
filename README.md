# 移动端翻页组件(基于[BetterScroll2.0](https://better-scroll.github.io/docs/zh-CN/guide/)开发)
---
### 使用方式
vo-pages组件父元素必须设置固定高度并填写属性overflow: hidden;
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

TODO: 下拉图标、css自动加载