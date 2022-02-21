import { createApp } from 'vue';
import { Button, Toast, Cell, CellGroup, Icon } from '@nutui/nutui-taro';
import '@nutui/nutui-taro/dist/styles/themes/default.scss';

import './app.less';

const app = createApp({
  onShow(options) {},
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
});

const components = [Button, Toast, Cell, CellGroup, Icon];
components.forEach(comp => app.use(comp));

export default app;
