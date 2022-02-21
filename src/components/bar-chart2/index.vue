<template>
  <view class="bar-chart">
    <ec-canvas :canvas-id="canvasId" :ec="ec"></ec-canvas>
  </view>
</template>
<script lang="ts" setup>
import * as echarts from '../ec-canvas2/echarts';

defineProps<{ canvasId: string }>();

let chart;

const initChart = (canvas, width, height, dpr) => {
  chart = echarts.init(canvas, null, {
    width,
    height,
    devicePixelRatio: dpr,
  });
  canvas.setChart(chart);
  return chart;
}

const ec = {
  onInit: initChart,
}

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
  chart?.setOption(option);
};

defineExpose({
  refresh,
});
</script>
<style lang="less">
.bar-chart {
  width: 100%;
  height: 500px;
}
</style>
