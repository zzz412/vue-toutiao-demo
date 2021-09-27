<template>
  <div id="app">
    <!-- 所有vant组件 都是以  van开头 -->
    <van-button type="primary" plain>按钮1</van-button>
    <van-button type="info" round size="mini">按钮2</van-button>
    <van-button type="warning" icon="plus">123</van-button>
    <van-button type="danger" color="blue">123</van-button>
    <van-button type="default" block>123</van-button>
    <div class="face"></div>
  </div>
</template>

<style lang="scss">
.face {
  width: 132px;
  height: 132px;
  background: red;
  border-radius: 50%;
}
</style>
