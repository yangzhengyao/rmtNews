<template>
  <div id="noData">
    <!-- 头部 -->
    <header class="headerNavFixed"  v-if="apis.getTheme() == 'qingtongxia' || apis.getTheme() == 'haicang'" style="border-bottom: 1px solid rgb(240, 240, 240);">
      <div class="nvbt iback" style="flex: 1;" @click="apis.iback()"></div>
      <div class="nvtt" style="width:70%"></div>
    </header>
      <header class="headerNavFixed"  style="border-bottom: 1px solid rgb(240, 240, 240);" v-else>
      <div class="nvbt iback iBlackBack" style="flex: 1;" @click="apis.iback()"></div>
      <div class="nvtt" style="width:70%"></div>
    </header>
    <!-- 正文 -->
    <div class="container communityNavFixed">
      <div class="wrapper">
           <img src="../assets/img/nodata.png" alt="">
           <div>
               <p>温馨提示</p>
               <p>此功能正在建设中...</p>
           </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "html",
  data() {
    return {
     
    };
  },
  methods: {
    
  },
  mounted() {
  }
};
</script>
<style lang='less' scoped>
.back-white {
  position: fixed;
  width: 1.335rem;
  height: 1.335rem;
  background-size: 20px;
  left: 0;
}

.login {
  -ms-flex: 1;
  flex: 1;
  font-weight: 700;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

#head {
  width: 100%;
  height: 50px;
  background-color: rgb(190, 44, 31);
  font-size: 19px;
  font-weight: bold;
  color: rgb(250, 250, 250);
  line-height: 50px;
  text-align: center;
}

#noData {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .wrapper {
    width: 100%;
    padding-top: 0.88rem;
    height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    img{
        width: 3.56rem;
        height: 2.08rem;
    }
    >div{
      text-align: center;
        p:nth-child(1){
            color: @dominantColor;
            font-size: .3rem;
            margin-top: .6rem;
            font-weight: 700;
        }
        p:nth-child(2){
            font-size: .26rem;
            margin-top: .1rem;
        }
    }
  }

  .container {
    background: #fff;
  }
}
</style>
