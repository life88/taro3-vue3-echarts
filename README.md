# taro3-vue3-echarts
`taro3 + vue3 + echarts` demo，参考中几个链接在 `vue2` 中可以正常运行，换到 `vue3` 就会报错。查阅网上资料以便后续可以查阅

## 运行
```
// 安装依赖
yarn

// 调试
yarn dev:weapp
```

## 问题
* 加载会报错，在 `wx-canvas.js` 中添加 `addEventListener() {}` 即可
* `vue` 组件模式 `tooltip` 不能正常显示，`vue3` 中事件名改为全小写修复
* 原生组件模式通过 `ref` 调用 `init` 会找不到，直接通过 `ec` 参数传入 `onInit` 初始化来获取 `chart` 实例
* 原生组件模式会出现 `canvas` 层级过高，通过转换为图片来切换显示，`vue` 组件模式开发工具有问题，但真机则正常

## 参考
* [Taro Vue 中 echarts 的使用](https://mp.weixin.qq.com/s/xDXf0KRVC5FCa35O_ZEa_g)
* [echarts-taro3-vue](https://github.com/Cecilxx/echarts-taro3-vue)
* [echarts4taro3](https://github.com/beezen/echarts4taro3)
