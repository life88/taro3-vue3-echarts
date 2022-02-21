<template>
  <view class="pie-chart">
    <e-canvas :canvas-id="canvasId" :ec="ec"></e-canvas>
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
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
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
<style lang="less">
.pie-chart {
  width: 100%;
  height: 500px;
}
</style>
