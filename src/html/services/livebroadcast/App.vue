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
      <div class="nvtt" style="color: #1a1a1a;">直播</div>
      <div class="nvbt idoc"></div>
      <div class="activtyall-big">
        <div class="activty-nav-big">
          <ul>
            <li>
              <span :class="{active:typebig==1}" @click="tabClickbig(1)">听广播</span>
            </li>
            <li>
              <span :class="{active:typebig==2}" @click="tabClickbig(2)">看电视</span>
            </li>
            <li>
              <span :class="{active:typebig==3}" @click="tabClickbig(3)">直播</span>
            </li>
          </ul>
        </div>
      </div>
    <div class="activtyallcenters"  v-if="typebig==2">
        <div class="activty-navcenters">
          <ul>
            <li>
              <span :class="{active:typecenter==0}" @click="tabClickcenter(0)">东坡新闻</span>
            </li>
            <li>
              <span :class="{active:typecenter==1}" @click="tabClickcenter(1)">网络电视</span>
            </li>
          </ul>
        </div>
    </div>
    </header>
    <div style="width:100%;margin-top:33%;padding-bottom:1.2rem" v-if="typebig==1">
         <div class="dongponotes">
             <div class="dongponotes-left"><img src="~@/assets/img/dongpo/me/dafultImg.png" /></div>
             <div class="dongponotes-right">
               <h3>东坡之声</h3>
               <p>讲东坡故事，传递东坡声音，fm102.0东坡之声综合广播，在您身边，伴您同行。</p>
             </div>
         </div>
                  <div class="activty-navlist">
                      <ul>
                        <li>
                          <span :class="{active:typenavlist==1}" @click="navlistClick(1)">东坡之声</span>
                        </li>
                        <li>
                          <span :class="{active:typenavlist==2}" @click="navlistClick(2)">网络电台</span>
                        </li>
                      </ul>
                  </div>
     <div class="activeall"  v-if="typenavlist==1">
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
        <div class="play-list">
            <div class="radio-list" v-for="(item,index) in listvideo" :key="index" @click.stop="saveData(item)" v-show="item.shows">
                <div class="div">
                    <div class="audio-list-item">
                        <div class="title">{{item.name}}</div>
                        <div class="misc text-small">{{item.datatimes}} {{item.timeslot}}</div>
                    </div>
                      <div class="play-btn"><img :src="vidobg"/></div>
                </div>
            </div>
        </div>
    </div>
 <div class="activeall"  v-if="typenavlist==2">
     <div class="musize">
           <div class="musize-list" @click="apis.urlParams('https://m.qingting.fm/channels/386/',{'title':'新增中国之声'},true)">
              <img src="./images/yangshi.jpg" alt />
              <span>中国之声</span>
            </div>
             <div class="musize-list" @click="apis.urlParams('https://m.qingting.fm/channels/20207767/',{'title':'四川之声'},true)">
              <img src="./images/sichuan.jpg" alt />
              <span>四川之声</span>
            </div>
           <div class="musize-list"  @click="apis.urlParams('https://m.qingting.fm/channels/4897/',{'title':'成都新闻广播'},true)">
              <img src="./images/1.png" alt />
              <span>成都新闻广播</span>
            </div>
             <div class="musize-list" @click="apis.urlParams('https://m.qingting.fm/channels/4886/',{'title':'四川交通广播'},true)">
              <img src="./images/4.png" alt />
              <span>四川交通广播</span>
            </div> 
     </div>
 </div>
</div>
     <div class="typelives" v-if="typecenter==0 && typebig==2"><swiper-container ref="mychilds"></swiper-container></div>
     <div class="typelives" v-if="typecenter==1">
       <iframe class="my_frame"  id="iframepages" frameborder="0" height="100%" scrolling='no' src="http://m.miguvideo.com/wap/resource/migu/live/live-list.jsp" style="width:1px; min-width:100%; *width:100%;height:100rem!important;"></iframe>
     </div>
   <div class v-if="typebig==3">
       <iframe class="my_frame"  id="iframepages" frameborder="0" height="100%" scrolling='no' src="https://live.xinhuaapp.com/xcy/userhome.html?orgId=15120976019093&from=singlemessage" style="width:1px; min-width:100%; *width:100%;height:100rem!important;margin-top:2rem"></iframe>
    </div> 
    <!-- 请求提示 -->
    <my-loading :visible="loading"></my-loading>
    <my-error :visible="error" :method="reload"></my-error>
  </div>
</template>
<script>
import swiperContainer from "./components/swiperContainer";
import dongpo_lives from "../../../components/navBottom/dongpo_zhibo/App";
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
      typebig: 1,
      typenavlist:1,
      typecenter:0,
      times: this.apis.getBeforeDate(0),
      vidobg: require("./images/list_play.png"),
      listvideo: [
        {
          name: "开机音乐",
          icon: require("./images/ico_1.png"),
          timeslot: "06:00"
        },
        // {name:"新闻和报纸摘要",icon:require('./images/ico_2.png'),timeslot:"06:00"},
        {
          name: "国歌",
          icon: require("./images/ico_3.png"),
          timeslot: "07:00"
        },
        // {name:"川广新闻",icon:require('./images/ico_4.png'),timeslot:"07:00"},
        {
          name: "融媒新闻 ",
          icon: require("./images/ico_5.png"),
          timeslot: "08:00"
        },
        {
          name: "悦读时光",
          icon: require("./images/ico_6.png"),
          timeslot: "10:00"
        },
        {
          name: "102龙门阵",
          icon: require("./images/ico_7.png"),
          timeslot: "11:00"
        },
        {
          name: "午间综艺",
          icon: require("./images/ico_8.png"),
          timeslot: "12:00"
        },
        {
          name: "音乐加点糖",
          icon: require("./images/ico_9.png"),
          timeslot: "14:00"
        },
        {
          name: "影视情报站",
          icon: require("./images/ico_10.png"),
          timeslot: "16:00"
        },
        {
          name: "逛吃逛吃",
          icon: require("./images/ico_11.png"),
          timeslot: "17:00"
        },
        {
          name: "快乐大巴",
          icon: require("./images/ico_12.png"),
          timeslot: "18:00"
        },
        {
          name: "新闻联播",
          icon: require("./images/ico_13.png"),
          timeslot: "19:00"
        },
        {
          name: "音乐晚点名",
          icon: require("./images/ico_14.png"),
          timeslot: "19:30"
        }
      ]
    };
  },
  components: { swiperContainer, dongpo_lives },
  methods: {
    saveData(section) {
      this.apis.urlParams("dongpovieodetails", { section }, false);
    },
    tabClickbig(typebig) {
      var that = this;
      if (typebig == "1") {
        that.typebig = 1;
      } else if (typebig == "2") {
        that.typebig = 2;
      }  else if (typebig == "3"){
        that.typebig = 3;
      }
    },
   navlistClick(typenavlist) {
      var that = this;
      if (typenavlist == "1") {
        that.typenavlist = 1;
      } else if (typenavlist == "2") {
        that.typenavlist = 2;
      } 
    },
 tabClickcenter(typecenter) {
      var that = this;
      if (typecenter == "0") {
        that.typecenter = 0;
      } else if (typecenter == "1") {
        that.typecenter = 1;
      } 
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
          that.listvideo[i].shows = true;
        }
      } else {
        that.type = 3;
        for (var i = 0; i < that.listvideo.length; i++) {
          that.listvideo[i].datatimes = this.apis.getBeforeDate(3);
          that.listvideo[i].shows = true;
        }
      }
    },
    reload() {
      localStorage.clear();
      sessionStorage.clear();
      // plus.storage.removeItem("launchFlag");
      location.reload();
    },
    contfirst() {
      var that = this;
      for (var i = 0; i < that.listvideo.length; i++) {
        that.listvideo[i].datatimes = that.times;
        var targetTime =
          that.listvideo[i].datatimes + " " + that.listvideo[i].timeslot;
        var targetStamp1 = new Date(targetTime.replace(/-/g, "/")).getTime();
        var nowTime = new Date();
        var nowStamp3 = nowTime.getTime();
        if (nowStamp3 > targetStamp1) {
          that.listvideo[i].shows = true;
        } else {
          that.listvideo[i].shows = false;
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
    // this.title = JSON.parse(get_local_cache("dongpovideos")).title;
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
.dongponotes{width: 100%;overflow: hidden; display: flex;justify-content: center}
.dongponotes .dongponotes-left{width:1.5rem;height: 1.5rem;}
.dongponotes .dongponotes-left img{width:1.5rem;height: 1.5rem;}
.dongponotes .dongponotes-right{font-size: 0.32rem;width:63%; margin-left: 0.3rem;}
.dongponotes .dongponotes-right p{font-size:0.3rem; margin-top: 0.2rem;}
.musize{width:94%;display: flex;justify-content: space-between;flex-wrap: wrap; margin: 0.6rem auto 0 auto;}
.typelives{ margin-top:3rem;}
.musize-list{text-align: center;
    font-size: 0.26rem;
    color: #1a1a1a;
    display: flex;
    flex-direction: column;
    margin-bottom: 0.4rem;}
.musize-list img{  height: 2.1rem;
    margin-bottom: 0.15rem;}
  
.play-list {
    display: contents;
}
.play-list > div {
    padding: 0 10px;
    background-color: #FFF;
}

.radio-list > div {
    position: relative;
}
.radio-list .audio-list-item {
    display: block;
    position: relative;
    padding: 10px 55px 10px 5px;
    border-bottom: 1px solid #eaecef;
}

.radio-list .audio-list-item .title{
    color: #333; font-size: 0.32rem;
}

.radio-list .audio-list-item .misc {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;font-size: 0.28rem;color: #676B7B; margin-top: 0.1rem;
}
.radio-list .play-btn {
    position: absolute;
    top: 0.34rem;
    bottom: 0;
    right: 15px;width: 34px;
}
.radio-list .play-btn img{width:0.6rem;height: 0.6rem;}


.xcylist {
  padding: 0 0.3rem;
  margin-top: 2.5rem;
  margin-bottom: 0.88rem;
  h3 {
    font-size: 0.4rem;
    margin-bottom: 0.36rem;
  }
  > div {
    background-image: url("./images/live.png");
    height: 3.8rem;
    background-size: 100% 100%;
    padding: 0.24rem;
    > div {
      padding: 0.14rem 0.16rem;
      width: 1.24rem;
      display: flex;
      align-items: center;
      background: #090e1b;
      border-radius: 5px;
      img {
        height: 0.17rem;
        margin-right: 0.16rem;
      }
      span {
        font-size: 0.2462rem;
        color: #fff;
      }
    }
  }
}
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
  background-size: contain !important;
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
  color: #1a1a1a;
  margin-top: 0.1rem;
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
.activtyall-big {
  width: 100%;
  margin-top: 0rem;
  overflow: hidden;
  background: #fff;
}

.activty-nav-big {
  width: 100%;
  height: 0.85rem;
  border-bottom: 1px solid #e8e8e8;
}

.activty-nav-big ul li {
  color: #999999;
  font-size: 0.33rem;
  width: 33.2%;
  text-align: center;
  line-height: 0.76rem;
  float: left;
}

.activty-nav-big ul li span {
  display: inline-block;
}

.activty-nav-big ul li span.active {
  color: #FB7517;
  font-weight: 800;
}

.activty-nav-big ul li span.active:after {
  border-bottom: 2px solid #FB7517;
  display: block;
  width: 0.4rem;
  height: 2px;
  content: '';
  margin: 0 auto;
}

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
.activty-navlist{
  width: 100%;
  height: 0.85rem;
  border-bottom: 1px solid #e8e8e8;
  margin-top:0.9rem;
}

.activty-navlist ul li {
  color: #999999;
  font-size: 0.33rem;
  width: 49.9%;
  text-align: center;
  line-height: 0.76rem;
  float: left;
}

.activty-navlist ul li span {
  display: inline-block;
}

.activty-navlist ul li span.active {
  color: #FB7517;
  font-weight: 800;
}

.activty-navlist ul li span.active:after {
  border-bottom: 2px solid #FB7517;
  display: block;
  width: 0.4rem;
  height: 2px;
  content: '';
  margin: 0 auto;
}

.activtyallcenters {
  width: 100%;
  margin-top: 0rem;
  overflow: hidden;
  background: #fff; 
}

.activty-navcenters {
  width: 100%;
  height: 0.85rem;
  border-bottom: 1px solid #e8e8e8;
}

.activty-navcenters ul li {
  color: #999999;
  font-size: 0.36rem;
  width:50%;
  text-align: center;
  line-height: 0.76rem;
  float: left;
}

.activty-navcenters ul li span {
  display: inline-block;
}

.activty-navcenters ul li span.active {
  color: #FB7517;
  font-weight: 800;
}

.activty-navcenters ul li span.active:after {
  border-bottom: 2px solid #FB7517;
  display: block;
  width: 0.4rem;
  height: 2px;
  content: '';
  margin: 0 auto;
}
</style>
