import pages from './.temp/pages';

export default defineAppConfig({
  pages,
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
  usingComponents: {
    'ec-canvas': 'components/ec-canvas2/ec-canvas'
  }
});
