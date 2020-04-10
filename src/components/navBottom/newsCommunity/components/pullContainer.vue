<template>
  <!-- 加载更多 -->
  <div
    class="container swiper-box-special"
    :class="type"
    v-infinite-scroll="loadBottomAjax"
    infinite-scroll-disabled="bottomLock"
    infinite-scroll-distance="10"
    infinite-scroll-immediate-check="false"
  >
    <!-- 请求提示 -->
    <my-loading :visible="loading"></my-loading>
    <my-error :visible="error" :method="init"></my-error>

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
      :distance="indexSwiper"
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
      <div v-if="apis.getTheme() !='dongpo'">
        <dynamic v-if="indexActive=='5d0221a6e4b0ed2aef82fd99'"></dynamic>
        <friends v-if="indexActive=='5d0221a6e4b0ed2aef82fd97'"></friends>
        <circles v-if="indexActive=='5d0221a6e4b0ed2aef82fd9b'"></circles>
        <activity v-if="indexActive=='5d0221a6e4b0ed2aef82fd9a'&& apis.getTheme() =='leshan'"></activity>
      </div>
      <div v-if="apis.getTheme() =='dongpo'">
          <dynamic v-if="indexActive=='5d0221a6e4b0ed2aef82fd99' && apis.getTheme() =='dongpo'"></dynamic>
      </div>
      <!-- <tipOff v-if="indexActive=='5d0221a6e4b0ed2aef82fd9a' && apis.getTheme() =='dongpo'"></tipOff> -->
      <!-- 底部提示 -->
      <div class="bottomLoad" v-if="contentJson.length > 0">
        <div class="loading" v-show="bottomLoading">加载中...</div>
        <div class="noData" v-if="bottomNoData">没有更多的内容了</div>
      </div>
    </mt-loadmore>
  </div>
</template>
<script>
import {
  formatDate,
  getDateDiff,
  getDateDiff_8
} from "../../../../config/cache.js";
import { mapGetters, mapMutations, mapActions } from "vuex";
import dynamic from "../children/dynamic"; // 动态组件
import activity from "../children/activity"; // 活动组件
import circles from "../children/circle"; // 圈子组件
import friends from "../children/friends"; // 好友组件
import tipOff from "../children/tipOff"; // 我要报料组件
import apis from "@/assets/js/api.js";
import Bus from "@/Bus";
export default {
  props: ["type"],
  data() {
    return {
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
      qinqiangFlag: {},
      isHaixia: false,
      pageNum: 1,
      themeId: "",
      userDataid: "",
      stateList: []
    };
  },
  components: {
    dynamic,
    circles,
    friends,
    activity,
    tipOff
  },
  computed: {
    ...mapGetters("newsCommunity", [
      "indexActive", // active的栏目
      "indexPage", // 记录栏目page的对象
      "indexLocation", // 记录栏目location的对象
      "activePage", // active的page
      "activeLocation", // active的location
      "indexSwiper" // 是否正在swiper的boolean值
    ])
  },
  watch: {
    indexActive(val) {
      this.init();
    },
    classPage(val) {
      this.indexPage[this.indexActive] = val;
      this.set_indexPage(this.indexPage);
    },
    contentJson(val) {
      this.set_currentContent(val);
    }
  },
  methods: {
    ...mapMutations("newsCommunity", [
      "set_currentContent",
      "set_indexPage",
      "set_indexLocation"
    ]),
    ...mapActions("newsCommunity", [
      "get_listItem_cache",
      "get_listItem_data",
      "get_stick_data",
      "get_banner_data"
    ]),
    init() {
      if (this.indexActive === this.type && !(this.contentJson.length > 0)) {
        // if ( !(this.contentJson.length > 0)) {
        // this.classPage = this.activePage
        // this.error = false
        // this.loading = true
        this.loadTopAjax();
      }
    },
    getDataid() {
      let userDataid = JSON.parse(localStorage.getItem("userData"));
      if (userDataid !== null) {
        this.userDataid = userDataid.user_id;
      } else {
        this.userDataid = false;
      }
    },
    loadTopAjax() {
      this.getDataid();
      if (this.type == "5d0221a6e4b0ed2aef82fd99") {
        //动态
        if (!this.isLoadAll) {
          // this.$refs.loadmore.onBottomLoaded(); //通知loadmore组件从新渲染，计算
          // this.currentPage++;
          if (this.userDataid) {
            var postData = {
              pageNum: 1,
              pageSize: 10,
              app_info_id: this.apis.theme.api.appInfoId,
              loginUserId: this.userDataid
            };
          } else {
            var postData = {
              pageNum: 1,
              pageSize: 10,
              app_info_id: this.apis.theme.api.appInfoId
            };
          }
          this.axios({
            method: "post",
            url: this.apis.theme.api.community.getStateList,
            data: postData
          }).then(res => {
            if (res.data.status == 1) {
              $(`.container.${this.type} .dataCount`)
                .slideDown(200)
                .delay(1000)
                .slideUp(200);
              if (res.data.data.blog.length > 0) {
                this.stateList = res.data.data.blog;
                Bus.$emit("stateListDy", this.stateList);
              } else {
                this.bottomNoData = true;
              }
              Bus.$emit("pageNumDy", { num: 2, arr: this.stateList });
              this.bottomLoading = false;
              this.bottomLock = false;
              this.$refs.loadmore.onTopLoaded();
            }
          });

          //网络请求加载数据  省略
        } else {
          console.log("已加载全部");
        }
        this.$refs.loadmore.onTopLoaded();
      } else if (this.type == "5d0221a6e4b0ed2aef82fd97") {
        //关注
        if (!this.isLoadAll) {
          // this.$refs.loadmore.onBottomLoaded(); //通知loadmore组件从新渲染，计算
          // this.currentPage++;
          if (this.userDataid) {
            // Bus.$emit( "pageFri",false);
            var postData = {
              pageNum: 1,
              pageSize: 10,
              app_info_id: this.apis.theme.api.appInfoId,
              user_id: this.userDataid
            };
            this.axios({
              method: "post",
              url: this.apis.theme.api.community.getStateFocusList,
              data: postData
            }).then(res => {
              if (res.data.success == true) {
                $(`.container.${this.type} .dataCount`)
                  .slideDown(200)
                  .delay(1000)
                  .slideUp(200);
                if (res.data.data.length > 0) {
                  this.stateList = res.data.data;
                  Bus.$emit("stateListFri", this.stateList);
                  Bus.$emit("islnfoList", true);
                } else {
                  Bus.$emit("islnfoList", false);
                  this.bottomNoData = false;
                }
                Bus.$emit("pageNumFri", { num: 2, arr: this.stateList });
                this.bottomLoading = false;
                this.bottomLock = false;
                this.$refs.loadmore.onTopLoaded();
              }
            });
          } else {
            Bus.$emit("islnfoList", false);
          }
          //网络请求加载数据  省略
        } else {
          console.log("已加载全部");
        }
        this.$refs.loadmore.onTopLoaded();
      } else if (this.type == "5d0221a6e4b0ed2aef82fd9b") {
        //圈子
        if (!this.isLoadAll) {
          if (this.userDataid) {
            var postData = {
              pageNum: 1,
              pageSize: 10,
              app_info_id: this.apis.theme.api.appInfoId,
              theme_id: this.themeId,
              loginUserId: this.userDataid
            };
          } else {
            var postData = {
              pageNum: 1,
              pageSize: 10,
              app_info_id: this.apis.theme.api.appInfoId,
              theme_id: this.themeId
            };
          }
          this.axios({
            method: "post",
            url: this.apis.theme.api.community.getStateList,
            data: postData
          }).then(res => {
            if (res.data.status == 1) {
              $(`.container.${this.type} .dataCount`)
                .slideDown(200)
                .delay(1000)
                .slideUp(200);
              if (res.data.data.blog.length > 0) {
                this.stateList = res.data.data.blog;
                Bus.$emit("stateListCir", this.stateList);
                Bus.$emit("pageNumCir", { num: 2, arr: this.stateList });
              } else {
                this.bottomNoData = true;
              }
              this.bottomLoading = false;
              this.bottomLock = false;
              this.$refs.loadmore.onTopLoaded();
            }
          });
        }
        this.$refs.loadmore.onTopLoaded();
      } else {
        //活动
        this.$refs.loadmore.onTopLoaded();
      }
    },
    loadBottomAjax() {},
    // 创建historyLook元素
    newLookHere() {
      // if (this.dataCount >= 10) {
      //     let lookIndex = this.contentJson.findIndex((n) => n.type === 'lookHere')
      //     this.contentJson.splice(lookIndex, 1)   // 删除数据里面的look数据
      //     this.contentJson.splice(10, 0, {type: 'lookHere'})  // 始终在第11个位置里添加look数据
      // }
      // this.$nextTick(() => {
      //     $(`.${this.indexActive} #lookHere`).prev().css('border', 'none')    // 去除look元素的上一个元素的border边框
      // })
    },
    // 点击look元素，发送请求
    lookHereClick() {
      $(`.container.${this.type}`).on("click", "#lookHere", () => {
        $(`.container.${this.indexActive}`).animate({ scrollTop: 0 }, () => {
          this.loadTopAjax();
        });
      });
    },
    // mint-ui 下拉组件的状态
    handleTopChange(status) {
      this.topStatus = status;
    },
    translateChange(translate) {
      let that = this;
      // if(translate < 1){
      //     setTimeout(function(){
      //         document.getElementsByClassName(that.type)[0].scrollTop = 1
      //     },50)
      // }
    },
    // 处理滚动条位置的方法
    handleLocaltion(type) {
      if (this.indexActive === this.type) {
        if (type === "get") {
          this.$nextTick(() => {
            $(`.container.${this.type}`).scrollTop(this.activeLocation);
          });
        } else if (type === "set") {
          let scrollTop = $(`.container.${this.type}`).scrollTop();
          if (scrollTop >= 0) {
            this.indexLocation[this.indexActive] = scrollTop;
            this.set_indexLocation(this.indexLocation);
          }
        }
      }
    }
  },
  mounted() {
    this.init();
    this.lookHereClick();
    //  来显示默认大图
    if (this.type == "5bee2294a3100d8dc42eec55") {
      this.boo = true;
    }
    Bus.$on("itemtypes", val => {
      this.themeId = val;
    });
  },
  activated() {
    this.handleLocaltion("get");
  },
  deactivated() {
    this.handleLocaltion("set");
  }
};
</script>
<style scoped lang='stylus'>
.Stick {
  // background: url('http://124.204.66.253:9080/images/201811/23/5bf7c08ba31091b758388611.jpeg') no-repeat center center;
  font-size: 16px;
  -webkit-box-shadow: 1px 1px 6px 0px #c1c1c1;
  box-shadow: 1px 1px 6px 0px #c1c1c1;
  margin: 1px 10.3px 0.2px;
  border-bottom: 1px solid rgba(222, 222, 222, 0.6);
  padding-top: 20px;
  display: inline-block;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 7.18rem !important;
  height: 5.3rem !important;

  .news {
    position: relative;
    top: 193px;
    color: #212020;
    left: 21px;

    span {
      font-size: 14px;
    }
  }

  width: 6.49rem;
  height: 6.49rem;
}

.container {
  height: calc(100vh - 2.65rem);
  -webkit-overflow-scrolling: touch;
  position: relative;
  overflow: scroll;

  .globalTip {
    position: absolute;
    top: 0.2rem;
    left: 0;
    right: 0;
    z-index: 99999999999;

    div {
      height: 0.64rem;
      line-height: 0.64rem;
      font-size: 0.28rem;
      // color: #2a90d7;
      // background: rgba(213, 233, 247, .9);
      text-align: center;
      display: none;
      color: #f56767;
      background: #FBE9EF;
    }
  }

  .mint-loadmore {
    min-height: 100%;
  }

  .mint-loadmore-top {
    height: 50px;
    line-height: 50px;
    font-size: 14px;
  }

  .pullLoading {
    width: 24px;
    height: 24px;
    vertical-align: middle;
    margin-top: -4px;
    margin-right: 3px;
  }
}

.bottomLoad {
  background: transparent;
  padding-bottom: 50px;
}

.ibox {
  margin-top: 0.2rem;
  background: #fff;
  padding: 0.3rem 0.24rem;

  h1 {
    font-size: 0.33rem;
    font-weight: 500;
  }

  .content {
    padding: 0;
    display: flex;
    flex-flow: wrap;

    .item {
      h3 {
        font-size: 0.27rem;
        margin-top: 0.1rem;
        font-weight: 500;
      }

      img {
        height: 0.46rem;
        margin-top: 0.34rem;
        border-radius: 4px;
      }

      img.serviceBig {
        height: 0.5888rem;
      }

      flex: 0 0 33%;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
