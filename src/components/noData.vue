<template>
  <div class="noData">
    <!-- <img :src='"~@/assets/img/"+apis.getTheme()+"/noData.png"' alt> -->
    <span>暂无数据</span>
  </div>
</template>
<script>
export default {
  name: "noData",
  data() {
    return {};
  }
};
</script>
<style scoped lang="less">
.noData {
  display: flex;
  flex-direction: column;
  // margin: 50% auto;
  padding-top: 50%;
  align-items: center;
  height: 100%;
  background: #fff;
  img {
    height: 1.59rem;
    // width: 1.23rem;
  }
  span {
    font-size: 0.35rem;
    color: #e6e6e6;
    margin-top: 0.1rem;
  }
}
</style>

