<template>
  <div id="Serarch">
    <header class="com_header headerNavFixed" style="background:#fff">
      <div class="nvbt iback ibackBack" @click="apis.iback()"></div>
      <div class="nvtt">
        <input class="form_input" type="search" placeholder="搜索您感兴趣的内容" v-model.trim="key" />
      </div>
      <div class="nvbt idoc" style="font-size:.33rem;color:#1a1a1a;" @click="Serarch">搜索</div>
    </header>
    <div class="historySerarch" v-if="findserarchHistory.length > 0" v-show="!serarchHistoryShow" :class="iphonexPadding ? 'iphonexPaddingClass':'androidPaddingClass' ">
        <div v-for="(item,index) in findserarchHistory" :key="index" >
            <div @click="serarchHistoryClick(item.keywords)">
                 <img src="./serarch.png" alt="">
                 <span>{{ item.keywords }}</span>
            </div>
            <img src="./delete.png" alt="" @click="clickItem(index)">
        </div>
        <div class="clear" @click="clear">
             清除搜索历史
        </div>
    </div>
    <div
      class="container swiper-box-special serarch"
      v-infinite-scroll="loadBottomAjax"
      infinite-scroll-disabled="bottomLock"
      infinite-scroll-distance="10"
      infinite-scroll-immediate-check="false"
      v-if="contentJson.length > 0"
      :class="iphonexPadding ? 'iphonexPaddingClass':'androidPaddingClass' "
    >
      <!-- 请求提示 -->
      <my-loading :visible="loading"></my-loading>
      <my-error :visible="error"></my-error>

      <!-- 顶部提示 -->
      <div class="globalTip">
        <!-- <div class="dataCount">已为你推荐{{dataCount}}条新内容</div> -->
        <div class="dataCount">已加载最新内容</div>
        <div class="noNewData">没有最新的内容了</div>
        <div class="requestFail">网络请求失败,请检查网络</div>
      </div>
      <!-- 下拉加载 -->
      <mt-loadmore
        :top-method="loadTopAjax"
        @translate-change="translateChange"
        @top-status-change="handleTopChange"
        ref="loadmore"
        :auto-fill="false"
      >
        <!-- 下拉提示 -->
        <div slot="top" class="mint-loadmore-top">
          <span v-show="topStatus === 'pull'">
            <img class="pullLoading" src="~@/assets/img/loading.png" /> 下拉刷新↓
          </span>
          <span v-show="topStatus === 'drop'">
            <img class="pullLoading" src="~@/assets/img/loading.png" /> 释放更新↑
          </span>
          <span v-show="topStatus ==='loading'">
            <img class="pullLoading" src="~@/assets/img/loading.gif" /> 加载中...
          </span>
        </div>
        <!-- listItem -->
        <news-list :itemJson="contentJson" v-if=" contentJson.length > 0 "></news-list>
        <!-- 底部提示 -->
        <div class="bottomLoad" v-if="contentJson.length > 0">
          <div class="loading" v-show="bottomLoading">加载中...</div>
          <div class="noData" v-if="bottomNoData">没有更多的内容了</div>
        </div>
      </mt-loadmore>
    </div>
    <div id="noData" v-if="SerarchNo" style="height: 100vh;display: flex;align-items: center;justify-content: center;text-align: center;flex-direction: column;">
        <img src="./serarchNodata.png" alt="" style="height:2.08rem">
        <p style="font-size: .28rem;margin-top:.2rem;color:#b2b2b2">找不到相关内容</p>
    </div>
    <div id="loadding" v-if="loadding">
        <mt-spinner type="snake"></mt-spinner>
    </div>
    <!-- 请求提示 -->
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import { formatDate, getDateDiff } from "../../../config/cache";
import { Toast,Spinner } from "mint-ui";
import qs from "qs";
export default {
  name: "findseek",
  data() {
    return {
      key: "", // 搜索内容
      page: 1, // 加载更多页数
      search_state: "recommend", // 搜索状态
      searchJson: [], // 搜索数据
      hotJson: [], // 热点数据
      keyWords: null, // 推荐搜索的关键字
      history: {}, // 搜索历史
      bottomLock: false, // 上滑开关
      bottomStatus: "loading", // 上滑底部状态
      bottomTip: false, // bottom提示
      loading: false,
      error: false,
      boo: false,
      classPage: 0, // 当前栏目的翻页页数
      stickJson: [], // 置顶数据
      bannerJson: [], // banner数据
      contentJson: [], // 整个列表数据
      dataCount: 0, // 推荐文章数量
      topStatus: "", // 下拉状态
      bottomLock: false, // 上滑开关
      bottomLoading: false, // 底部loading
      bottomNoData: false, // 底部nothing
      loading: false,
      error: false,
      SerarchNo:false,
      findserarchHistory:[], //搜索记录
      serarchHistoryShow:false,
      loadding:false,
      iphonexPadding:false,
      includedColumnIds:''
    };
  },
  watch: {
    $route(to, from) {
      // 从首页进来，显示热点推荐
      if (from.path.includes("index")) {
        this.key = "";
        this.search_state = "recommend";
      }
    },
    key(val) {
      // 搜索值为空，显示热点推荐
      if (!val) {
        this.search_state = "recommend";
      }
    }
  },
  methods: {
    ...mapActions("search", ["get_hot_data", "get_search_data"]),
    ...mapActions("index", [
      // 'get_listItem_cache',
      "serarch_listItem_data",
      "get_child_listItem_data",
      "get_stick_data",
      "get_banner_data",
      "wechat_listItem_data"
    ]),
    clickItem(index){
        console.log( index )
        this.findserarchHistory.splice(index,1);
        localStorage.setItem('findserarchHistory',JSON.stringify( this.findserarchHistory ))
    },
    clear(){
        localStorage.removeItem('findserarchHistory');
        this.findserarchHistory = [];
    },
    serarchHistoryClick(keywords){
        this.key = keywords;
        this.serarchHistoryShow = true;
        this.loadTopAjax();
    },
    Serarch() {
      let that = this;
      if (this.key == "") {
        Toast({
          message: "请完善搜索信息",
          position: "middle",
          duration: 2000
        });
      } else {
        console.log( that.findserarchHistory )
        if( that.findserarchHistory.length >= 5 ){
           that.findserarchHistory.unshift(
                {
                    keywords:that.key
                }
            )
           that.findserarchHistory.pop();
        }else {
          console.log( '小于5' )
           that.findserarchHistory.unshift(
                {
                    keywords:that.key
                }
            )
        }
        localStorage.setItem('findserarchHistory',JSON.stringify( that.findserarchHistory ))
        this.serarchHistoryShow = true;
        this.loadTopAjax();
      }
    },
    // mint-ui 下拉组件的状态
    handleTopChange(status) {
      this.topStatus = status;
    },
    translateChange(translate) {
      let that = this;
    },
    loadTopAjax() {
      window.trackingClickSelf = false;
      var that = this;
      that.classPage = 0;
      that.loadding = true;
      that.axios({
          method: "post",
          url: that.apis.theme.api.news.getNewsChannelData,
          data: {
            pageNum: that.classPage,
            pageSize: 10,
            keyWord: that.key, //搜索信息
            appInfoId:that.apis.theme.api.appInfoId,
          }
        })
        .then(res => {
          this.loading = false;
          var tempArr = [];
          var bannerArr = [],
            numTemp = 0;
            res.data.data[0].list.forEach(function(item, i) {
            tempArr.push({
              type: item.type,
              id: item.id,
              title: item.title,
              befrom: item.source,
              time: getDateDiff(item.pubDate),
              titlepic:item.image_url != null ? item.image_url.split(" ")[0] : false, // 缩略图
              ptitlepic:i % 5 == 0 && item.image_url != null? item.image_url.split(" ")[0]: false, // 大图
              playonlineurl: item.stroyType == "VIDEO" ? item.video_url : false, // 视频
              lives: item.stroyType == "ZHIBO" ? item.video_url : false, // 直播
              href: item.stroyType == "HREF" ? item.url : false, //
              jsonUrl: item.jsonUrl,
              readNum: item.read_num,
              properties: item.properties
            });
          });
          res.data.list = tempArr;
          if (res.data.list.length > 0) {
            that.loadding = false;
            that.contentJson = res.data.list;
            that.dataCount = res.data.list.length;
            that.classPage++;
            that.bottomNoData = false;
            that.SerarchNo = false;
            Toast({
                message: "搜索完成",
                position: "middle",
                duration: 2000
            });
            $(`.container.serarch .dataCount`)
              .stop()
              .slideDown(200)
              .delay(1000)
              .slideUp(200);
          } else {
            that.loadding = false;
            that.contentJson =[];
            that.SerarchNo = true;
            $(`.container.serarch .noNewData`).stop().slideDown(200).delay(1000).slideUp(200);
          }
          this.$refs.loadmore.onTopLoaded();
          this.error = false;
          $(`.container.serarch .requestFail`).hide();
        })
        .catch(err => {
          if (this.contentJson.length > 0) {
            $(`.container.serarch .requestFail`).show();
          } else {
          }
          this.loading = false;
        });
    },
    loadBottomAjax() {
      var that = this;
      if (!this.bottomNoData) {
        this.bottomLock = true;
        this.bottomLoading = true;
        that
          .axios({
            method: "post",
            url: that.apis.theme.api.news.getNewsChannelData,
            data: {
              pageNum: that.classPage,
              pageSize: 10,
              keyWord: that.key, //搜索信息
              appInfoId:that.apis.theme.api.appInfoId,
            }
          })
          .then(res => {
            var tempArr = [];
            res.data.data[0].list.forEach(function(item, i) {
              tempArr.push({
                type: item.type,
                id: item.id,
                title: item.title,
                befrom: item.source,
                time: getDateDiff(item.pubDate),
                titlepic:item.image_url != null ? item.image_url.split(" ")[0] : false, // 缩略图
                ptitlepic:i % 5 == 0 && item.image_url != null? item.image_url.split(" ")[0]: false, // 大图
                playonlineurl:
                item.stroyType == "VIDEO" ? item.video_url : false, // 视频
                lives: item.stroyType == "ZHIBO" ? item.video_url : false, // 直播
                href: item.stroyType == "HREF" ? item.url : false, //
                jsonUrl: item.jsonUrl,
                readNum: item.read_num,
                properties: item.properties
              });
            });
            res.data.list = tempArr;
            if ( res.data.list.length > 0) {
              that.contentJson.push(...res.data.list);
              that.classPage++;
            } else {
              that.bottomNoData = true;
            }
            that.bottomLoading = false;
            that.bottomLock = false;
          });
      }
    },
  },
  mounted() {
    if( localStorage.getItem('findserarchHistory') != null ){
        this.findserarchHistory = JSON.parse( localStorage.getItem('findserarchHistory') );
    }
   if( this.apis.iphonexPaddingFn() ){
      this.iphonexPadding = true;
    }
    this.includedColumnIds = JSON.parse( localStorage.getItem('seek') ).includedColumnIds;
  },
};
</script>
<style lang='less'>

h3 > span {
  font-size: 18px;
}
#Serarch{
    position: relative;
    .iphonexPaddingClass{
       padding-top: 1.8rem;
    }
     .androidPaddingClass{
       padding-top: 1.44rem;
    }
}
#loadding{
    height: 100vh;
    display: flex;
    justify-content: center;
    position: absolute;
    width: 100%;
    left: 0;
    top: 50%;
    bottom: 0;
    right: 0;
    z-index: 111111;
    align-items: center;
    .mint-spinner-snake{
         border-top-color: red !important;
         border-left-color: red !important;
         border-bottom-color: red !important;
    }
}
.historySerarch{
    padding: 0 .5rem;
    padding-top: 1.6rem;
    font-size: .32rem;
    >div{ 
        display: flex;
        align-items: center;
        padding: .3rem 0;
        justify-content: space-between;
        >div{
            display: flex;
            align-items: center;
             img{
                height: .32rem;
                margin-right: .21rem;
            }
        }
        >img{
            height: .2rem;;
        }
    }
    .clear{
        font-size: .28rem;
        color: #b2b2b2;
        display: flex;
        justify-content: center;
    }
}
#search .content .search_recommend .article h3 {
  font-size: 15px;
  color: #403d3c;
  margin-bottom: 5px;
}
.back-white {
  position: fixed;
  width: 1.335rem;
  height: 1.335rem;
  background: url("../../../assets/img/back-white.png") no-repeat Center/cover;
  background-size: 20px;
  left: 0;
  top: -6px;
}
.login {
  height: 100%;
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
.form_input {
  display: flex;
  position: relative;
  left: 0;
  top: 7px;
  width: 100%;
  -ms-flex-align: center;
  align-items: center;
  color: #1a1a1a;
  font-size: 14px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 50px;
  padding: 0.13rem 0.267rem;
  // margin: 0 0.267rem
}
button {
  width: 57px;
  height: 20px;
  position: absolute;
  right: 26px;
  top: 18px;
  background-color: @dominantColor;
  color: #fff;
  border-radius: 22px;
}
.container {
  height: 100vh;
  overflow: auto;
  padding-top: 1.6rem;
  -webkit-overflow-scrolling: touch;
  position: relative;
  overflow: scroll;
  .globalTip {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
    div {
      height: 0.64rem;
      line-height: 0.64rem;
      font-size: 0.28rem;
      // color: #2a90d7;
      // background: rgba(213, 233, 247, .9);
      text-align: center;
      display: none;
      // &.requestFail {
      color: #f56767;
      background: #fbe9ef;
      // }
    }
  }
  .mint-loadmore-top {
    height: 50px;
    line-height: 50px;
    font-size: 14px;
  }
  .mint-loadmore {
    min-height: 100%;
  }
  .pullLoading {
    width: 24px;
    height: 24px;
    vertical-align: middle;
    margin-top: -4px;
    margin-right: 3px;
  }
}
</style>
