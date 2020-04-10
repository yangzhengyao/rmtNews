<template>
  <div class="community">
    <!-- 头部 -->
    <header class="com_header headerNavFixed">
      <!--  userID 暂时写死 iback  -->
      <div class="nvbt iback" style="flex: none;" @click="apis.iback()"></div>
      <!-- <div class="nvbt" style="flex: none;" @click="apis.iback()"></div> -->
    </header>

    <div class="com_content main-body communityNavFixed" style="padding-top:.8rem">
      <div>
        <img style="width:100%;" src="./deteil.png" alt>
      </div>
      <!--
      :style="{'-webkit-overflow-scrolling': scrollMode}"
      v-infinite-scroll="loadBottomAjax"
      infinite-scroll-disabled="bottomLock"
      infinite-scroll-distance="10"
      infinite-scroll-immediate-check="true"
      -->
      <mt-loadmore :auto-fill="true" ref="loadmore" :bottom-all-loaded="false">
        <!--   :top-method="loadTop"  @top-status-change="handleTopChange"-->
        <div slot="top" class="mint-loadmore-top">
          <span v-show="topStatus === 'pull'">
            <img class="pullLoading" src="~@/assets/img/loading.png"> 下拉刷新↓
          </span>
          <span v-show="topStatus === 'drop'">
            <img class="pullLoading" src="~@/assets/img/loading.png"> 释放更新↑
          </span>
          <span v-show="topStatus ==='loading'">
            <img class="pullLoading" src="~@/assets/img/loading.gif"> 加载中...
          </span>
        </div>
        <div class="item border_1px_b">
          <img src="./tongzhi.png" alt style="width:100%">
          <mt-navbar v-model="selected">
            <mt-tab-item id="1">最新评论</mt-tab-item>
            <mt-tab-item id="2">热门评论</mt-tab-item>
          </mt-navbar>
          <!-- tab-container -->
          <mt-tab-container v-model="selected">
            <mt-tab-container-item id="1">
                <img src="./tab1.png" alt style="width:100%">
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                <img src="./tab1.png" alt style="width:100%">
            </mt-tab-container-item>
          </mt-tab-container>
        </div>
      </mt-loadmore>
    </div>
  </div>
</template>
<script>
import { Loadmore, Toast, Indicator, Field, MessageBox } from "mint-ui";
import axios from "axios";
import qs from "qs";
import { Actionsheet } from "mint-ui";
import { mapGetters, mapMutations, mapActions } from "vuex";
import { close } from "fs";
// import { json } from "./data.js";
const root = process.env.API_ROOT;
export default {
  name: "community",
  data() {
    return {
      bottomLock: true, // 上滑开关
      json: [], //mock数据
      pageNo: 1,
      pageNoFollow: 1,
      pageSize: 10,
      pageSizeFollow: 10,
      scrollMode: "auto", //移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
      topStatus: "",
      topStatusFollow: "",
      selected: "1"
    };
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.community {
  width: 100%;
  box-sizing: border-box;
  position: relative;
  background: #f0f0f0;
  .myCommunity {
    background: #fff;
    border-radius: 50%;
    -webkit-box-shadow: 0px 0px 9px 1px @dominantColor;
    box-shadow: 0px 0px 9px 1px @dominantColor;
    position: fixed;
    bottom: 12vh;
    right: 2vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.4rem 0.37rem;
    background: @dominantColor;
    img {
      width: 0.42rem;
      height: 0.324rem;
    }
  }
  header {
    // height: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .com_header {
    width: 100%;
    // height: 1rem;
    // height: 50px;
    background: @dominantColor;
    // display: flex;
    // align-items: center;
    // position: relative;
    // position: fixed;
    // z-index: 111;
    // justify-content: space-between;
    // align-items: center;
    // padding: 0.17rem 0;
    // box-sizing: border-box;
    .com_photo_left {
      width: 0.47rem;
      height: 0.47rem;
      img {
        width: 100%;
        margin-left: 0.333rem;
      }
    }
  }
  .item {
     padding: .3rem;
  }
}
</style>
<style>
.mint-navbar .mint-tab-item.is-selected{
  border-bottom:.09rem solid #26a2ff;
}
.mint-tab-item-label{
   font-size: .3rem;
}
</style>


