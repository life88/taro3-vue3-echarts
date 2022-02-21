<template>
  <canvas
    type="2d"
    class="ec-canvas"
    ref="canvasRef"
    :canvas-id="canvasId"
    @touchStart="touchStart"
    @touchMove="touchMove"
    @touchEnd="touchEnd"
  ></canvas>
</template>
<script lang="ts" setup>
import Taro from '@tarojs/taro';
import { onMounted, ref } from 'vue';
import WxCanvas from './wx-canvas';
import * as echarts from './echarts';

const props = defineProps<{ canvasId?: string; ec: any }>();

const canvasRef = ref();
const chart = ref();
const canvasNode = ref();

function wrapTouch(event) {
  for (let i = 0; i < event.touches.length; ++i) {
    const touch = event.touches[i];
    touch.offsetX = touch.x;
    touch.offsetY = touch.y;
  }
  return event;
}

const initByNewWay = callback => {
  const query = Taro.createSelectorQuery();
  const { ec, canvasId } = props;

  query
    .select('.ec-canvas')
    .fields({
      node: true,
      size: true,
    })
    .exec(res => {
      const cNode = res[0].node;
      canvasNode.value = cNode;
      const canvasDpr = Taro.getSystemInfoSync().pixelRatio;
      const canvasWidth = res[0].width;
      const canvasHeight = res[0].height;
      const ctx = cNode.getContext('2d');

      const canvas = new WxCanvas(ctx, canvasId, true, cNode);
      echarts.setCanvasCreator(() => {
        return canvas;
      });

      if (typeof callback === 'function') {
        chart.value = callback(canvas, canvasWidth, canvasHeight, canvasDpr);
      } else if (typeof ec.onInit === 'function') {
        chart.value = ec.onInit(canvas, canvasWidth, canvasHeight, canvasDpr);
      }
    });
};

const init = (callback?) => {
  setTimeout(() => {
    initByNewWay(callback);
  }, 100);
};

const touchStart = e => {
  if (chart.value && e.touches.length > 0) {
    const touch = e.touches[0];
    const handler = chart.value.getZr().handler;
    handler.dispatch('mousedown', {
      zrX: touch.x,
      zrY: touch.y,
    });
    handler.dispatch('mousemove', {
      zrX: touch.x,
      zrY: touch.y,
    });
    handler.processGesture(wrapTouch(e), 'start');
  }
};

const touchMove = e => {
  if (chart.value && e.touches.length > 0) {
    const touch = e.touches[0];
    const handler = chart.value.getZr().handler;
    handler.dispatch('mousemove', {
      zrX: touch.x,
      zrY: touch.y,
    });
    handler.processGesture(wrapTouch(e), 'change');
  }
};

const touchEnd = e => {
  if (chart.value) {
    const touch = e.changedTouches ? e.changedTouches[0] : {};
    const handler = chart.value.getZr().handler;
    handler.dispatch('mouseup', {
      zrX: touch.x,
      zrY: touch.y,
    });
    handler.dispatch('click', {
      zrX: touch.x,
      zrY: touch.y,
    });
    handler.processGesture(wrapTouch(e), 'end');
  }
};

defineExpose({
  init,
});

onMounted(() => {
  echarts.registerPreprocessor(option => {
    if (option && option.series) {
      if (option.series.length > 0) {
        option.series.forEach(series => {
          series.progressive = 0;
        });
      } else if (typeof option.series === 'object') {
        option.series.progressive = 0;
      }
    }
  });

  if (!props.ec) {
    console.warn(
      '组件需绑定 ec 变量，例：<ec-canvas id="mychart-dom-bar" ' + 'canvas-id="mychart-bar" ec="{{ ec }}"></ec-canvas>',
    );
    return;
  }

  if (!props.ec.lazyLoad) {
    init();
  }
});
</script>
<style>
.ec-canvas {
  width: 100%;
  height: 100%;
}
</style>
