<template>
  <div>
    <div id="home">
    <header class="com_header headerNavFixed" style="background: #fff;border-bottom: 1px solid #f0f0f0; z-index:99999999999999">
      <div class="nvbt ibackBack" @click="apis.iback()"></div>
      <div class="nvtt" style="color: #1a1a1a;">{{title}}</div>
      <div class="nvbt idoc"></div>
    </header> 
  </div>
  <div class="ioclist"></div>
    <div class="vieoall">
    <video x5-playsinline="true" :poster="icon" playsinline="true" webkit-playsinline="true" controls="controls" style="display: inline;text-align: center;width:100%;">
      <source :src="`http://www.msdata.cn:5021/live_hls/1/playlist.m3u8?begtime=${timesnews}T${smtime}00&duration=3600`" type="video/mp4"></video>  
         <!-- <div id="video"></div> -->
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { get_local_cache, set_local_cache } from "../../../config/cache";
export default {
  name: "musci",
  data() {
    return {
      imgA: require("./images/logo.jpg"),
      imgB: require("./images/pause.png"),
      // mats: require("./images/1.mp3"),
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
      icon:'',
      timesnews:'',
      smtime:''
    };
  },
  methods: {
    ready() {
      console.log("play click");
    },
    pause() {
      console.log("pause click");
    }
  },
 mounted() {
    this.title = JSON.parse(get_local_cache("dongpovieodetails")).section.name;
    this.icon=JSON.parse(get_local_cache("dongpovieodetails")).section.icon;
    var datatimes=JSON.parse(get_local_cache("dongpovieodetails")).section.datatimes;
    var timeslot=JSON.parse(get_local_cache("dongpovieodetails")).section.timeslot.split("-")[0];
    var n=datatimes.split("-");
    this.timesnews=n.join("");  
    this.smtime=timeslot.replace(/:/g,"");
    var timesnews1=n.join("");  
    var smtime1=timeslot.replace(/:/g,"");
    var player = null;
  },
};
</script>
<style lang='less' scoped>
.ioclist{width:100%;height:2.3rem}
.vieoall{ margin: 0% auto 0 auto;width:100%; text-align: center}
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
</style>
