<template>
  <transition name="fadeIn">
    <div id="certificate">
      <!-- 头部 -->
      <header class="com_header headerNavFixed">
        <div class="nvbt iback" @click="apis.iback()"></div>
        <div class="nvtt">{{ title }}</div>
        <div class="nvbt idoc">
        </div>
      </header>
      <!-- 正文 -->
      <div class="content contentNavFixed com_contentNavFixed">
        <div
          class="container"
          :style="{'-webkit-overflow-scrolling': scrollMode}"
          v-infinite-scroll="loadBottomAjax"
          infinite-scroll-disabled="bottomLock"
          infinite-scroll-distance="10"
          infinite-scroll-immediate-check="true"
        >
          <div class="certificate">
            <!-- <div class="banner">
              <img src="./images/wz1.png" alt>
            </div>-->
            <mt-loadmore
              :top-method="loadTop"
              :auto-fill="true"
              ref="loadmore"
              :bottom-all-loaded="false"
              @top-status-change="handleTopChange"
            >
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
              <div class="contanier" v-if="json.length>0">
                <div to="certificate/questionAnswer" v-for="(item,index) in json" :key="index" >
                  <div class="item" @click="isDepid(item.auto_id)">
                    <div class="contanier_img">
                      <img :src='"~@/assets/img/"+apis.getTheme()+"/text_list.png"' alt v-if="item.images == null">
                      <img :src='"~@/assets/img/"+apis.getTheme()+"/text_list.png"' alt v-else-if="JSON.parse(item.images).length == 0">
                      <!-- <img :src="apis.theme.imgHost+JSON.parse(item.images)[0].images" alt v-else> -->
                      <!-- 我提问的问政图片链接也需要改为不拼接 -->
                      <img :src="JSON.parse(item.images)[0].images" alt v-else> 
                      <!-- <img :src="apis.theme.imgHost+item.images[0].images" alt> -->
                    </div>
                    <div class="contanier_msg">
                      <p>{{ item.title }}</p>
                      <div>
                        <span>{{ item.insert_time }}</span>
                        <span>{{ item.name }}</span>
                        <button :class="{ 'questionClass':item.question_status == '0' }">{{ item.question_status == 0 ? '未回复':'已回复' }}</button>
                      </div>
                    </div>
                    <!--  <div class="contanier_img">
                            <img :src="item.HeadPortrait" alt>
                          </div>
                          <div class="contanier_msg">
                            <p>{{ item.msg }}</p>
                            <div>
                              <span>{{ item.time }}</span>
                              <span>{{ item.ShortMsg }}</span>
                              <button>{{ item.isHf  ? '已回复':'未回复' }}</button>
                            </div>
                    </div>-->
                  </div>
                </div>
              </div>
              <div v-else style="text-align: center;font-size: .4rem;color: #888;padding-top: 1rem;">
                 暂无信息
              </div>
              <!-- 底部提示 -->
              <div class="bottomLoad" v-if="json.length > 0">
                <div class="loading" v-show="bottomLoading">加载中...</div>
                <div class="noData" v-if="bottomNoData">没有更多的内容了</div>
              </div>
            </mt-loadmore>
          </div>
        </div>
      </div>
      <div
          class="navbar"
          @click="apis.urlParams('questions')"
          v-if="JSON.parse(getStorge).dep_id == '0'"
          :class="iphonexPadding ? 'iphonexPaddingClass':'' "
      >
        <img src="./images/tiwen.png" alt>
        <span>我要提问</span>
      </div>
    </div>
  </transition>
</template>
<script>
// import { json } from "./certificateJson.js";
import { mapGetters, mapMutations, mapActions } from "vuex";
// import axios from "axios";
import qs from "qs";
//引入主页
import { Header, Toast, Loadmore } from "mint-ui";
import noData from "components/noData.vue";
const root = process.env.API_ROOT;
export default {
  name: "certificate",
  data() {
    return {
      title: "问政",
      json: [],
      root: root,
      pageNo: 1,
      pageSize: 10,
      bottomLock: true, // 上滑开关
      topStatus: "", //下拉状态
      bottomLoading: false, // 底部loading
      bottomNoData: false, // 底部nothing
      scrollMode: "auto", //移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
      iphonexPadding:false
    };
  },
  computed: {
    ...mapGetters("login", [
      "getStorge" // active的栏目
    ])
  },
  components: {
    "v-loadmore": Loadmore
  },
  methods: {
    questionAnswer() {
      this.$router.push({
        path: "questionAnswer"
      });
    },
    //判断是否有dep_id
    isDepid(autoId) {
      if (JSON.parse(this.getStorge) != null) {
        this.apis.urlParams("questionAnswer", {
          question_id: autoId,
          dep_id: JSON.parse(this.getStorge).dep_id,
          //我的待回复列表跳转到问题详细页面
          isWz:JSON.parse(this.getStorge).dep_id
        });
      } else {
        this.apis.urlParams("questionAnswer", {
          question_id: autoId
        });
      }
    },
    loadTop: function() {
      //组件提供的下拉触发方法
      //下拉加载
      this.pageNo = 1;
      this.bottomLock = true;
      this.Init("top");
      this.$refs.loadmore.onTopLoaded(); // 固定方法，查询完要调用一次，用于重新定位
    },
    //滚动触发
    loadBottomAjax() {
      this.Init("bottom");
    },
    // mint-ui 下拉组件的状态
    handleTopChange(status) {
      console.log(status);
      this.topStatus = status;
      if (this.topStatus == "loading") {
        $(".mint-loadmore-content").removeAttr("transform");
      }
    },
    //初始
    Init(isTop) {
      if( JSON.parse(this.getStorge).dep_id == '0' ){
        this.title = '我的提问列表'
      } else {
        this.title = '我的待回复列表'
      }
      let postData = {
        pageNum: this.pageNo,
        pageSize: this.pageSize
      };
      let url = this.apis.theme.api.services.getMyWzServiceQuestions;  //提问  this.apis.theme.api.services.getMyWzServiceQuestions  root+'/wz_al/wz/getMyWzServiceQuestions'
      //初始化参数
      if(  JSON.parse(this.getStorge).dep_id != '0' ){
        postData['question_obj'] = JSON.parse(this.getStorge).dep_id;
        url = this.apis.theme.api.services.getMyWzServiceWaitingList             //待回复 this.apis.theme.api.services.getMyWzServiceWaitingList root+'/wz_al/wz/getMyWzServiceWaitingList'
      } 
      if (isTop == "bottom") {
        if (!this.bottomNoData) {
          this.bottomLoading = true;
        }
      }
      this.axios({
        method: "post",
        url: url, 
        data: qs.stringify(postData),
      })
      .then( res => {
        console.log(JSON.stringify(res.data));
        if (res.data.status == "1") {
          if (isTop == "top") {
            this.json = [];
            this.json = this.json.concat(res.data.data.list);
          } else if (isTop == "bottom") {
            this.json = this.json.concat(res.data.data.list);
          }
          // for (let i = 0; i < res.data.data.list.length; i++) {
          //   this.json[i]["images"] = JSON.parse(res.data.data.list[i].images);
          // }
          //判断是否是最后一页，禁止上拉加载
          if (res.data.data.lastPage == false) {
            this.pageNo += 1;
            this.bottomLock = false;
            this.bottomNoData = false;
          } else {
            this.bottomNoData = true;
            this.bottomLock = true;
          }
          this.bottomLoading = false;
          console.log(this.json, "数据");
          this.$nextTick(function() {
            this.scrollMode = "touch";
          });
        }
      });
    }
  },
  created() {
    this.Init("top");
  },
  mounted() {
    if( this.apis.iphonexPaddingFn() ){
       this.iphonexPadding = true;
    }
  }
};
</script>
<style lang="less" scoped>
#certificate {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 1000;
  background: #fff;
  .contentNavFixed {
    background: #fff;
  }
  .certificate {
    padding: 0.3375rem 0.2475rem 0 0.2475rem;
    background: #fff;
    .banner {
      width: 100%;
      img {
        width: 100%;
      }
      margin-bottom: 0.3495rem;
    }
    .contanier {
      display: flex;
      flex-direction: column;
      // margin-bottom: 50px;
      .item {
        display: flex;
        margin-bottom: 0.3495rem;
        .contanier_img {
          img {
            width: 1.2rem; 
            height: 1.2rem;
          }
          margin-right: 0.3495rem;
        }
        .contanier_msg {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 100%;
          p {
            font-size: 0.333rem;
            color: #262626;
          }
          > div {
            align-items: center;
            display: flex;
            span {
              flex: 1;
              font-size: 0.2475rem;
              color: #999999;
            }
            button {
              font-size: 0.2475rem;
              color: @yQuestionColor;
              border: 0.015rem solid @yQuestionColor;
              line-height: 1;
              background: #fff;
              border-radius: 10%;
              padding: 0.045rem 0.075rem;
            }
          }
        }
      }
    }
  }
}
.navbar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: @dominantColor;
    height: 1rem;
    width: 100%;
    text-align: center;
    font-size: 0.333rem;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 0.333rem;
      height: 0.333rem;
      margin-right: 0.24rem;
    }
  }
  .questionClass{
     color: @nQuestionColor !important;
     border: 0.015rem solid @nQuestionColor !important;
  }
</style>
<style>
.mint-loadmore-top {
  font-size: 14px;
}
.pullLoading {
  width: 24px;
  height: 24px;
  vertical-align: middle;
  margin-top: -4px;
  margin-right: 3px;
}
.bottomLoad {
  background: transparent;
  margin-bottom: 50px;
}
</style>

