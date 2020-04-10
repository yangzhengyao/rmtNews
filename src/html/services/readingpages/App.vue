<template>
  <div id="home">
    <!-- 头部 -->
    <!-- <home-header/> -->
    <!-- 内容区域 -->
    <header
      class="com_header headerNavFixed"
      style="background: #fff;border-bottom: 1px solid #f0f0f0;"
    >
      <div class="nvbt ibackBack" @click="apis.iback()"></div>
      <div class="nvtt" style="color: #1a1a1a;">悦读</div>
      <div class="nvbt idoc"></div>
      <div class="activtyall">
        <div class="activty-nav">
          <ul>
            <li>
              <span :class="{active:type==0}" @click="tabClick(0)">百坡</span>
            </li>
              <li>
              <span :class="{active:type==1}" @click="tabClick(1)">东坡文化</span>
            </li>
            <li>
              <span :class="{active:type==2}" @click="tabClick(2)">美文</span>
            </li>
             <li>
              <span :class="{active:type==3}" @click="tabClick(3)">读报</span>
            </li>
          </ul>
        </div>
      </div>
    </header>
    <div class="swipertab1" v-if="type==0">
        <swiper-container ref="mychilds"></swiper-container>
    </div>
   
   <div class="swipertab2" v-if="type==2">
          <iframe
            class="my_frame"
            id="ifrathree" frameborder="0" height="100%" scrolling='no' 
            src="https://book.yunzhan365.com/jeam/xton/mobile/index.html?from=timeline&isappinstalled=0"
            style="width:1px; min-width:100%; *width:100%;height:100%vh!important;"
          ></iframe> 
    </div>
     <div class="swipertab2" v-if="type==3">
      <div class="readBz">
          <div>
            <div @click="apis.urlParams('http://paper.people.com.cn/rmrb/html/2019-07/11/nbs.D110000renmrb_01.htm',{'title':'人民日报'},true)">
              <img src="./images/renmin_rb.png" alt />
              <span>人民日报</span>
            </div>
            <div @click="apis.urlParams('https://4g.scdaily.cn',{'title':'四川日报'},true)">
              <img src="./images/sichuang_rb.png" alt />
              <span>四川日报</span>
            </div>
            <div @click="apis.urlParams(' https://e.thecover.cn/shtml/index_hxdsb.shtml',{'title':'华西都市报'},true)">
              <img src="./images/huaxi.png" alt />
              <span>华西都市报</span>
            </div>
           <div @click="apis.urlParams('http://e.chengdu.cn',{'title':'成都商报'},true)">
              <img src="./images/chengdu-sb.png" alt />
              <span>成都商报</span>
            </div>
            <div @click="apis.urlParams('http://szb.mshw.net/html/2019-08/22/node_2.htm',{'title':'眉山日报'},true)">
              <img src="./images/meishan.png" alt />
              <span>眉山日报</span>
            </div>
             <!-- <div @click="apis.urlParams('http://www.cnepaper.com/lsrb/h5/',{'title':'乐山日报'},true)">
              <img src="./images/leshan_rb.png" alt />
              <span>乐山日报</span>
            </div> -->
            <!-- <div @click="apis.urlParams('http://www.cnepaper.com/sjdsb/h5/',{'title':'三江都市报'},true)">
              <img src="./images/sanjiang_rsb.png" alt />
              <span>三江都市报</span>
            </div> -->
          </div>
        </div>
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
      type: 0
    };
  },
  components: { swiperContainer },
  methods: {
    //点击选项卡更改渲染的活动列表
      tabClick(type) {
        if (type == "0") {
            this.type = 0;
            var uuids = JSON.parse(get_local_cache('readingpages'));
            uuids.uid = "5da92625e4b0e4f27ae7c4c2";
            set_local_cache('readingpages', JSON.stringify(uuids));
            this.$refs.mychilds.parentHandleclick();
        } else if (type == "1") {
            this.type = 1;
            var uuids = JSON.parse(get_local_cache('readingpages'));
            uuids.uid = "5db2b4f3e4b0b6c77c39cfda";
            set_local_cache('readingpages', JSON.stringify(uuids));
            this.$refs.mychilds.parentHandleclick();
        } else if (type == "2") {
            this.type = 2;
        } else if (type == "3") {
            this.type = 3;
        }
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
  width:24.9%;
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
.swipertab2{margin-top:20%;width:100%; text-align:center;font-size:0.38rem;color:#999;height:100vh}
    .readBz {
      padding: 0 0.3rem;
      margin-top: 2.5rem;
      padding-right: 0;
      h3 {
        font-size: 0.4rem;
        margin-bottom: 0.36rem;
      }
      > div {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        > div {
          text-align: center;
          font-size: 0.26rem;
          color: #1a1a1a;
          display: flex;
          flex-direction: column;
          margin-right: .3rem;
          img {
            height: 1.6rem;
            margin-bottom: 0.16rem;
          }
          span {
            margin-bottom: 0.36rem;
            color: #1a1a1a;
          }
        }
      }
    }
</style>
