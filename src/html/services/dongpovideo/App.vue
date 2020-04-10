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
      <div class="nvtt" style="color: #1a1a1a;">{{title}}</div>
      <div class="nvbt idoc"></div>
      <div class="activtyall">
        <div class="activty-nav">
          <ul>
            <li>
              <span :class="{active:type==1}" @click="tabClick(1)">今天</span>
            </li>
            <li>
              <span :class="{active:type==2}" @click="tabClick(2)">昨天</span>
            </li>
            <li>
              <span :class="{active:type==3}" @click="tabClick(3)">往期</span>
            </li>
          </ul>
        </div>
      </div>
    </header>
    <div style="width:100%;margin-top:30%;padding-bottom:1.2rem">
      <div class="playlist" v-for="(item,index) in listvideo" :key="index" @click.stop='saveData(item)' v-show="item.shows">
        <div class="play-ul">
          <div class="play-left" :style="{'background':'url('+item.icon+') no-repeat'}">
            <div class="playRoundnes"></div>
          </div>
          <div class="play-right">
            <h3>{{item.name}}</h3>
            <p>{{item.timeslot}}</p>
            <div class="newstime">{{item.datatimes}}</div>
          </div>
        </div>
      </div>

      <!-- <video x5-playsinline="true" poster="./images/dongpozhisheng.jpg" playsinline="true" webkit-playsinline="true" controls="controls" style="display: inline;margin: 0 auto;text-align: center;width:100%;">
      <source src="http://www.msdata.cn:8600/hls/dpzx.m3u8" type="application/vnd.apple.mpegurl"></video>-->
     <!-- <video x5-playsinline="true" poster="./images/dongpozhisheng.jpg" playsinline="true" webkit-playsinline="true" controls="controls" style="display: inline;margin: 0 auto;text-align: center;width:100%;">
      <source src="http://www.msdata.cn:5021/live_hls/1/playlist.m3u8?begtime=20190909T140000&duration=3600" type="video/mp4"></video> -->
    </div>
    <!-- <swiper-container ref="mychilds"></swiper-container> -->
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
      type: 1,
      times: this.apis.getBeforeDate(0),
      listvideo: [
          {name:"开机音乐",icon:require('./images/ico_1.png'),timeslot:"06:00"},
          // {name:"新闻和报纸摘要",icon:require('./images/ico_2.png'),timeslot:"06:00"},
          {name:"国歌",icon:require('./images/ico_3.png'),timeslot:"07:00"},
          // {name:"川广新闻",icon:require('./images/ico_4.png'),timeslot:"07:00"},
          {name:"融媒新闻 ",icon:require('./images/ico_5.png'),timeslot:"08:00"},
          {name:"悦读时光",icon:require('./images/ico_6.png'),timeslot:"10:00"},
          {name:"102龙门阵",icon:require('./images/ico_7.png'),timeslot:"11:00"},
          {name:"午间综艺",icon:require('./images/ico_8.png'),timeslot:"12:00"},
          {name:"音乐加点糖",icon:require('./images/ico_9.png'),timeslot:"14:00"},
          {name:"影视情报站",icon:require('./images/ico_10.png'),timeslot:"16:00"},
          {name:"逛吃逛吃",icon:require('./images/ico_11.png'),timeslot:"17:00"},
          {name:"快乐大巴",icon:require('./images/ico_12.png'),timeslot:"18:00"},
          {name:"新闻联播",icon:require('./images/ico_13.png'),timeslot:"19:00"},
          {name:"音乐晚点名",icon:require('./images/ico_14.png'),timeslot:"19:30"}
      ]
    };
  },
  components: { swiperContainer },
  methods: {
    saveData(section){
        this.apis.urlParams('dongpovieodetails',{section},false)
    },
    //点击选项卡更改渲染的活动列表
    tabClick(type) {
      var that = this;
      if (type == "1") {
        that.type = 1;
          for (var i = 0; i < that.listvideo.length; i++) {
          that.listvideo[i].datatimes = this.apis.getBeforeDate(0);
          this.contfirst();
        }
      } else if (type == "2") {
        that.type = 2;
        for (var i = 0; i < that.listvideo.length; i++) {
          that.listvideo[i].datatimes = this.apis.getBeforeDate(1);
          that.listvideo[i].shows=true;
        }
      } else {
        that.type = 3;
         for (var i = 0; i < that.listvideo.length; i++) {
          that.listvideo[i].datatimes = this.apis.getBeforeDate(3);
          that.listvideo[i].shows=true;
        }
      }
    },
    reload() {
      localStorage.clear();
      sessionStorage.clear();
      // plus.storage.removeItem("launchFlag");
      location.reload();
    },
    contfirst(){
      var that=this;
       for (var i = 0; i < that.listvideo.length; i++) {
       that.listvideo[i].datatimes = that.times;
       var targetTime=that.listvideo[i].datatimes+' '+that.listvideo[i].timeslot; 
       var targetStamp1=new Date(targetTime.replace(/-/g, '/')).getTime();  
       var nowTime=new Date();
       var nowStamp3=nowTime.getTime();
       if(nowStamp3>targetStamp1){
          that.listvideo[i].shows=true;
       }else{
          that.listvideo[i].shows=false;
       }
    }
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
    this.title = JSON.parse(get_local_cache("dongpovideos")).title;
  },
  created() {
    this.contfirst();
  }
  // activated() {
  //     this.handleLocaltion('get')
  // },
  // deactivated() {
  //     this.handleLocaltion('set')
  // }
};
</script>
<style lang='less' scoped>
.playlist {
  padding: 0 0.3rem;
  margin-top: 0.3rem;
}
.play-ul {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  border-bottom: 1px solid #ededed;
  padding-bottom: 0.3rem;
}
.play-left {
  flex: 1;
  position: relative;
  margin-right: 0.4rem;
  height: 1.8rem;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 5px;
  position: relative;
  background-color: #f8f8f8;
  background-size: contain!important;
}
.playRoundnes {
  position: absolute;
  width: 0.7rem;
  height: 0.7rem;
  left: 50%;
  top: 50%;
  margin-left: -0.55rem;
  margin-top: -0.35rem;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.4) url("../../../assets/img/play_san.png")
    no-repeat center / 40%;
  z-index: 222;
}

.play-right {
  flex: 2;
  height: 1.8rem;
}
.play-right p {
  color: #999999;
  margin-top: 0.3rem;
  font-size: 0.24rem;
}
.newstime {
  font-size: 0.3rem;
  margin-top: 0.2rem;
}

.play-right h3 {
  font-size: 0.36rem;
  color: #1a1a1a; margin-top: 0.1rem
}
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
  font-size: 0.3rem;
  width: 33.2%;
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
</style>
