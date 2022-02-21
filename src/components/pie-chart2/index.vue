<template>
  <view class="pie-chart">
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
      trigger: 'item',
      formatter: '{a} \n{b} : {c} ({d}%)',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: data.map(({ name }) => name),
    },
    ...params,
  };
  setTimeout(() => {
    chart?.setOption(option);
  }, 100);
};

defineExpose({
  refresh,
});
</script>
<style lang="less">
.pie-chart {
  width: 100%;
  height: 500px;
}
</style>
