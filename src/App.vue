<template>
  <div id="app">
    <!-- <keep-alive v-if="$route.name == 'index'">
        <router-view></router-view>
    </keep-alive>-->
    <!-- <div class="loadding" v-show="loadding" :class=" loadding ? '':'loaddingFadeIn'">
      <span @click="clickIndex">{{ loaddingNum }} s自动跳转</span>
      <img :src="banner" alt />
    </div> -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // loadding: true,
      // loaddingNum: 5,
      // timer: null,
      // banner:''
      // banner:require('./'+localStorage.getItem('banner')+'.png')
    };
  },
  methods: {
    // tiemoutLoadding() {
    //   let that = this;
    //   that.timer = setInterval(() => {
    //     if (that.loaddingNum > 0) {
    //       that.loaddingNum--;
    //     } else {
    //       clearInterval(that.timer);
    //       that.timer = null;
    //       that.loadding = false;
    //     }
    //   }, 1000);
    // },
    // clickIndex() {
    //   let that = this;
    //   clearInterval(that.timer);
    //   this.loadding = false;
    // }
  },
  mounted() {
    // this.tiemoutLoadding();
    // this.banner = localStorage.getItem('banner');
    // alert( this.banner )
  }
};
</script>
<style lang="less" scoped>
#app {
  // .loadding {
  //   display: flex;
  //   width: 100%;
  //   height: 100vh;
  //   img {
  //     width: 100%;
  //     z-index: 111111;
  //   }
  //   span {
  //     position: absolute;
  //     z-index: 111112;
  //     right: 0.5rem;
  //     top: 0.5rem;
  //     color: #fff;
  //     font-size: 0.26rem;
  //   }
  // }
  // .loaddingFadeIn {
  //   background: red;
  // }
}
</style>

