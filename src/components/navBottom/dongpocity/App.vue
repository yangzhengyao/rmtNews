<template>
  <div id="home">
    <!-- 头部 -->
    <!-- <home-header/> -->
    <!-- 内容区域 -->
    <header
      class="com_header headerNavFixed"
      style="background: #fff;border-bottom: 1px solid #f0f0f0;"
    >
      <div class="nvbt" @click="apis.iback()"></div>
      <div class="nvtt" style="color: #1a1a1a;">同城</div>
       <div class="nvbt iabout iblisttop"  @click="actionSheetType" v-if="type==2">
        <img src="../me/img/dongpoadd.png"   style="height:0.4rem"/>
      </div>
      <div class="activtyall">
        <div class="activty-nav">
          <ul>
            <li>
              <span :class="{active:type==2}" @click="tabClick(2)">聊吧</span>
            </li>
            <li>
              <span :class="{active:type==1}" @click="tabClick(1)">吃喝玩乐</span>
            </li>
            <li>
              <span :class="{active:type==0}" @click="tabClick(0)">便民生活</span>
            </li>
          </ul>
        </div>
      </div>
    </header>
  <div class="swipertabnews" v-if="type==2">
    <dynamic/>
    </div>
    <div class="swipertab1" v-if="type==1">
        <swiper-container ref="mychilds"></swiper-container>
    </div>
   <div class="swipertab2" v-if="type==0">
          <iframe
            class="my_frame"
            id="ifrathree" frameborder="0" height="100%" scrolling='no' 
            src="https://share.meishanren.com/fenlei_view/home"
            style="width:1px; min-width:100%; *width:100%;height:60rem!important;"
          ></iframe> 
    </div>
    <!-- 子页面视图 -->
    <!-- <keep-alive>
            <router-view></router-view>
    </keep-alive>-->

    <!-- 请求提示 -->
    <my-loading :visible="loading"></my-loading>
    <my-error :visible="error" :method="reload"></my-error>
  </div>
</template>
<script>
import swiperContainer from "./components/swiperContainer";
import { mapActions } from "vuex";
import { get_local_cache, set_local_cache } from "../../../config/cache";
import dynamic from '../newsCommunity/community';// 动态组件
export default {
  name: "lives",
  data() {
    return {
      classPage: 1, // 当前栏目的翻页页数
      contentJson: [], // 整个列表数据
      dataCount: 0, // 推荐文章数量
      topStatus: "", // 下拉状态
      bottomLock: false, // 上滑开关
      bottomLoading: true, // 底部loading
      bottomNoData: false, // 底部nothing
      loading: false,
      error: false,
      location: 0,
      title: "",
      type: 2
    };
  },
  components: { swiperContainer,dynamic },
  methods: {
    //点击选项卡更改渲染的活动列表
    tabClick(type) {
      if (type == "1") {
        this.type = 1;
      } else if (type == "0") {
        this.type = 0;
      }else if (type == "2") {
        this.type = 2;
      }
    },
     // 点击弹出下拉框（ 发表文字，拍照上传，选择图册 ）
    actionSheetType() {
      let that = this;
       if(JSON.parse(localStorage.getItem("userData") == null)){
          that.apis.urlParams("Login", {});
      }else{
          localStorage.removeItem('imgData');
          localStorage.removeItem('vidData');
          that.characters();
      }
    },
     // 发表文字
    characters() {
      let that = this;
      that.apis.urlParams("publish", {
        urlImg: "",
        type: "1"
      });
      plus.webview
        .getWebviewById(
          window.location.href.split("#/")[0] + "#/" + "publish"
        )
        .addEventListener(
          "close",
          function(e) {
            localStorage.removeItem('imgData');
            localStorage.removeItem('vidData');
            that.$refs.hotChild.pageNo = 1;
            that.$refs.hotChild.loadPageList("top");
          },
          false
        );
    },
    reload() {
      localStorage.clear();
      sessionStorage.clear();
      // plus.storage.removeItem("launchFlag");
      location.reload();
    }
  },
  handleTopChange(status) {
    this.topStatus = status;
  },
  handleLocaltion(type) {
    if (type === "get") {
      this.$nextTick(() => {
        $(`#lives .container`).scrollTop(this.location);
      });
    } else if (type === "set") {
      this.location = $(`#lives .container`).scrollTop();
    }
  },
  mounted() {
  }
  // created() {
  //     this.init()
  // },
  // activated() {
  //     this.handleLocaltion('get')
  // },
  // deactivated() {
  //     this.handleLocaltion('set')
  // }
};
</script>
<style lang='less' scoped>
.iblisttop{ position: relative; top: 0.3rem}
#newCommunity {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 11.17rem;
  overflow: hidden;
  background: #fff;
}

#newCommunity header {
  background: #fff !important;

  .nvtt {
    font-size: 0.38rem;
    color: #1A1A1A;
    font-weight: 500;
  }

  .iabout {
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      height: 0.3rem;
      position:relative;
      top:-.05rem
    }
  }
}
.swipertabnews{padding-top:0.4rem;}
.swipertab1{margin-top:0.4rem;}
.head > .login {
  -ms-flex: 1;
  flex: 1;
  font-weight: 700;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.head {
  width: 100%;
  height: 50px;
  background-color: rgb(190, 44, 31);
  font-size: 19px;
  font-weight: bold;
  color: rgb(250, 250, 250);
  line-height: 50px;
  text-align: center;
}

.scroll-wrapper {
  -webkit-overflow-scrolling: touch;
  overflow: scroll;
  height: 100%;

  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
}

#lives {
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding-bottom: 48px;
  background: #fff;

  .res {
    height: 100%;

    .container {
      .globalTip {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        z-index: 999;

        div {
          height: 32px;
          line-height: 34px;
          font-size: 14px;
          color: #2a90d7;
          background: rgba(213, 233, 247, 0.9);
          text-align: center;
          display: none;

          &.requestFail {
            color: #f56767;
            background: #fbe9ef;
          }
        }
      }

      .mint-loadmore-top {
        height: 50px;
        line-height: 50px;
        font-size: 14px;
        color: #999;

        span {
          display: block;
        }

        .pullLoading {
          width: 24px;
          height: 24px;
          vertical-align: middle;
          margin-top: -4px;
          margin-right: 3px;
        }
      }
    }
  }
}

html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
<style lang="stylus" scoped>
.activtyall {
  width: 100%;
  margin-top: 0rem;
  overflow: hidden;
  background: #fff;
}

.activty-nav {
  width: 100%;
  height: 0.85rem;
  border-bottom: 1px solid #e8e8e8;
}

.activty-nav ul li {
  color: #999999;
  font-size: 0.36rem;
  width:33.2%;
  text-align: center;
  line-height: 0.76rem;
  float: left;
}

.activty-nav ul li span {
  display: inline-block;
}

.activty-nav ul li span.active {
  color: #FB7517;
  font-weight: 800;
}

.activty-nav ul li span.active:after {
  border-bottom: 2px solid #FB7517;
  display: block;
  width: 0.4rem;
  height: 2px;
  content: '';
  margin: 0 auto;
}
.swipertab2{margin-top:30%;width:100%; text-align:center;font-size:0.38rem;color:#999}
</style>
