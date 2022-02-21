<template>
  <view class="bar-chart">
    <e-canvas ref="ecCanvasRef" :canvas-id="canvasId" :ec="ec"></e-canvas>
  </view>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import * as echarts from '../ec-canvas/echarts';
import ECanvas from '../ec-canvas/index.vue';

defineProps<{ canvasId: string }>();

const ec = ref({
  lazyLoad: true,
});
const ecCanvasRef = ref();

const initChart = options => {
  ecCanvasRef.value.init((canvas, width, height, dpr) => {
    const chart = echarts.init(canvas, null, {
      width,
      height,
      devicePixelRatio: dpr,
    });
    canvas.setChart(chart);
    chart.setOption(options);
    return chart;
  });
};

const refresh = (data = [], params = {}) => {
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    grid: {
      top: 80,
      left: 50,
      bottom: 30,
    },
    xAxis: {
      type: 'value',
      position: 'top',
    },
    yAxis: {
      type: 'category',
      data: data.map(({ name }) => name),
    },
    ...params,
  };
  initChart(option);
};

defineExpose({
  refresh,
});
</script>
<style lang="less"></style>
