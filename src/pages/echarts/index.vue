<template>
  <view class="echarts-page">
    <view class="pie-chart">
      <e-canvas ref="ecCanvasRef" canvas-id="pieCanvas" :ec="ec"></e-canvas>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import ECanvas from '@/components/ec-canvas/index.vue';
import * as echarts from '@/components/ec-canvas/echarts';

let chart;

const ecCanvasRef = ref();

const initChart = (canvas, width, height, dpr) => {
  chart = echarts.init(canvas, null, {
    width,
    height,
    devicePixelRatio: dpr,
  });
  canvas.setChart(chart);
  refresh();
  return chart;
}

const ec: {
  lazyLoad?: boolean,
  onInit: (canvas, width, height, dpr) => void,
} = {
  // lazyLoad: true,
  onInit: initChart,
}

const refresh = () => {
  const option = {
    title: {
      text: "某站点用户访问来源",
      subtext: "纯属虚构",
      left: "center",
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} \n{b} : {c} ({d}%)",
    },
    legend: {
      orient: "vertical",
      left: "left",
      data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"],
    },
    series: [
      {
        name: "访问来源",
        type: "pie",
        radius: "55%",
        center: ["50%", "60%"],
        data: [
          { value: 335, name: "直接访问" },
          { value: 310, name: "邮件营销" },
          { value: 234, name: "联盟广告" },
          { value: 135, name: "视频广告" },
          { value: 1548, name: "搜索引擎" },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };
  chart?.setOption(option);
}

const init = () => {
  ecCanvasRef.value.init((canvas, width, height, dpr) => {
    chart = echarts.init(canvas, null, {
      width,
      height,
      devicePixelRatio: dpr,
    });
    canvas.setChart(chart);
    refresh();
    return chart;
  })
}

onMounted(() => {
  setTimeout(() => {
    ec.lazyLoad && init();
  }, 300);
})
</script>
<style lang="less">
.pie-chart {
  width: 100%;
  height: 100vh;
}
</style>
