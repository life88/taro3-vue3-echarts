<template>
  <view class="index-page">
    <nut-cell-group title="echarts 图标">
      <nut-cell title="echarts" is-link @click="goToPage('/pages/echarts/index')"></nut-cell>
      <nut-cell title="echarts2" is-link @click="goToPage('/pages/echarts2/index')"></nut-cell>
    </nut-cell-group>
  </view>
</template>
<script lang="ts" setup>
import Taro from "@tarojs/taro";

const goToPage = (url) => {
  Taro.navigateTo({
    url,
  })
}
</script>
<style lang="scss">
page {
  background-color: #f2f2f2;
}
</style>
