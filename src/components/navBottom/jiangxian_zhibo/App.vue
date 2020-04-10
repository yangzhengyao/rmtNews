<template>
  <div id="lives">
    <div id="set">
      <header class="com_header headerNavFixed">
        <div class="nvbt"></div>
        <div class="nvtt">直播大厅</div>
        <div class="nvbt"></div>
      </header>
    </div>
    <div class="container contentNavFixed com_contentNavFixed">
      <div class="from" :class="iphonexLivs ? 'iphonexPaddingLivs':'' ">
        <mt-swipe :auto="4000">
          <!-- <mt-swipe-item>
            <img src="./images/item.png" alt />
          </mt-swipe-item>-->
          <mt-swipe-item>
            <img src="./images/item1.png" alt />
          </mt-swipe-item>
          <mt-swipe-item>
            <img src="./images/item2.png" alt />
          </mt-swipe-item>
        </mt-swipe>
        <div class="tab">
          <div @click="apis.urlParams('http://epaper.sxrb.com/shtml/sxrb/20191030/402538.shtml',{'title':'读报纸'},true)">
            <img src="./images/ico_dbz.png" alt />
            <span>读报纸</span>
          </div>
          <div @click="apis.urlParams('http://www.sxrtv.com/live/',{'title':'看电视'},true)">
            <img src="./images/ico_kds.png" alt />
            <span>看电视</span>
          </div>
          <div @click="apis.urlParams('https://www.qingting.fm/radios/1190',{'title':'听电台'},true)">
            <img src="./images/ico_tgb.png" alt />
            <span>听电台</span>
          </div>
          <!-- <div @click="apis.urlParams('',{'title':'现场云'},true)">
            <img src="./images/ico_xcy.png" alt />
            <span>现场云</span>
          </div> -->
        </div>
        <div class="lookTv">
          <h3>看电视</h3>
          <div>
            <div>
              <div
                @click="apis.urlParams('http://tv.cctv.com/live/cctv1/',{'title':'CCTV1'},true)"
              >
                <img src="./images/CCTV1.png" alt />
                <span>CCTV1</span>
              </div>
              <div
                @click="apis.urlParams('http://tv.cctv.com/live/cctv2/',{'title':'CCTV2'},true)"
              >
                <img src="./images/CCTV2.png" alt />
                <span>CCTV2</span>
              </div>
              <div
                @click="apis.urlParams('http://tv.cctv.com/live/cctv3/',{'title':'CCTV3'},true)"
              >
                <img src="./images/CCTV3.png" alt />
                <span>CCTV3</span>
              </div>
              <div
                @click="apis.urlParams('http://tv.cctv.com/live/cctv4/',{'title':'CCTV4'},true)"
              >
                <img src="./images/CCTV4.png" alt />
                <span>CCTV4</span>
              </div>
              <div
                @click="apis.urlParams('http://tv.cctv.com/live/cctv5/',{'title':'CCTV5'},true)"
              >
                <img src="./images/CCTV5.png" alt />
                <span>CCTV5</span>
              </div>
              <div
                @click="apis.urlParams('http://tv.cctv.com/live/cctv6/',{'title':'CCTV6'},true)"
              >
                <img src="./images/CCTV6.png" alt />
                <span>CCTV6</span>
              </div>
              <!-- <div @click="apis.urlParams('',{'title':'新疆卫视'},true)">
                <img src="./images/xjws.png" alt />
                <span>新疆卫视</span>
              </div> -->
            </div>
            <div>
              <!-- <div @click="apis.urlParams('',{'title':'二师铁门关市-1套'},true)">
                <img src="./images/tmg-1.png" alt />
                <span>二师铁门关市-1套</span>
              </div> -->
              <div style=" margin-bottom: 0rem;" @click="apis.urlParams('http://tv.cctv.com/live/cctv7/',{'title':'CCTV7'},true)">
                <img src="./images/CCTV7.png" alt />
                <span>CCTV7</span>
              </div>
              <div style=" margin-bottom: 0rem;" @click="apis.urlParams('http://tv.cctv.com/live/cctv8/',{'title':'CCTV8'},true)">
                <img src="./images/CCTV8.png" alt />
                <span>CCTV8</span>
              </div>
              <div style=" margin-bottom: 0rem;" @click="apis.urlParams('http://tv.cctv.com/live/cctv10/',{'title':'CCTV10'},true)">
                <img src="./images/CCTV10.png" alt />
                <span>CCTV10</span>
              </div>
              <div style=" margin-bottom: 0rem;" @click="apis.urlParams('http://tv.cctv.com/live/cctv11/',{'title':'CCTV11'},true)">
                <img src="./images/CCTV11.png" alt />
                <span>CCTV11</span>
              </div>
              <div style=" margin-bottom: 0rem;" @click="apis.urlParams('http://tv.cctv.com/live/cctv12/',{'title':'CCTV12'},true)">
                <img src="./images/CCTV12.png" alt />
                <span>CCTV12</span>
              </div>
              <div style=" margin-bottom: 0rem;" @click="apis.urlParams('http://www.sxrtv.com/live/',{'title':'山西卫视'},true)">
                <img src="./images/sxws.png" alt />
                <span>山西卫视</span>
              </div>
            </div>
          </div>
        </div>
        <div class="listenPM">
          <h3>听电台</h3>
          <div>
            <div @click="apis.urlParams('https://www.qingting.fm/radios/20007',{'title':'880山西交通广播'},true)">
              <img src="./images/88.0.png" alt />
              <span>880山西交通广播</span>
            </div>
            <div @click="apis.urlParams('https://www.qingting.fm/radios/1191',{'title':'运城交通文艺频道'},true)">
              <img src="./images/ycjt.png" alt />
              <span>运城交通文艺频道</span>
            </div>
            <div @click="apis.urlParams('https://www.qingting.fm/radios/1190',{'title':'运城新闻综合频道'},true)">
              <img src="./images/ycxw.png" alt />
              <span>运城新闻综合频道</span>
            </div>
          </div>
        </div>
        <div class="readBz">
          <h3>读报纸</h3>
          <div>
            <div @click="apis.urlParams('http://epaper.sxrb.com/shtml/sxnmb/20191029/402228.shtml',{'title':'山西农民报'},true)">
              <img src="./images/sxnmb.png" alt />
              <span>山西农民报</span>
            </div>
            <div @click="apis.urlParams('http://epaper.sxrb.com/shtml/sxrb/20191030/402538.shtml',{'title':'山西日报'},true)">
              <img src="./images/sxrb.png" alt />
              <span>山西日报</span>
            </div>
            <div @click="apis.urlParams('http://epaper.sxrb.com/index_sxwb.shtml',{'title':'山西晚报'},true)">
              <img src="./images/sxwb.png" alt />
              <span>山西晚报</span>
            </div>
            <div @click="apis.urlParams('http://epaper.sxrb.com/index_sxjjrb.shtml',{'title':'山西经济日报'},true)">
              <img src="./images/sxjjrb.png" alt />
              <span>山西经济日报</span>
            </div>
            <div @click="apis.urlParams('http://epaper.sxrb.com/index_sxfzb.shtml',{'title':'山西法制报'},true)">
              <img src="./images/sxfzb.png" alt />
              <span>山西法制报</span>
            </div>
            <div @click="apis.urlParams('http://sxqnb.com.cn/',{'title':'山西青年报'},true)">
              <img src="./images/sxqnb.png" alt />
              <span>山西青年报</span>
            </div>
          </div>
        </div>
        <!-- <div class="xcy" @click="apis.urlParams('',{'title':'现场云'},true)">
          <h3>现场云</h3>
          <div>
            <div>
              <img src="./images/VC.png" alt />
              <span>LIVE</span>
            </div>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import { Swipe, SwipeItem } from "mint-ui";
export default {
  data() {
    return {
      iframeUrlBool: true,
      swiperOption: {
        pagination: {
          el: ".swiper-pagination3",
          loop: false,
          autoplay: 2000,
          autoplayDisableOnInteraction: false
        }
      },
      iphonexLivs: false
    };
  },
  components: {
    Swipe,
    SwipeItem
  },
  methods: {
    // iframeUrl(id) {
    //   if (id == "TV") {
    //     this.apis.urlParams(
    //       "http://epg.xjitv.cn/yoonGoo/#/vodPlay?mediaId=nongershi1_hd&columnId=103&meta=0&userId=ctwapeba6fe8d43d076484bae6a9b52e99bee&phone=18099200432",
    //       { title: "铁门关电视台" },
    //       true
    //     );
    //   }
    //   if (id == "FM") {
    //     this.apis.urlParams(
    //       "https://m.qingting.fm/channels/20211703/",
    //       { title: "电台" },
    //       true
    //     );
    //   }
    //   if (id == "xcy") {
    //     this.apis.urlParams(
    //       "https://live.xinhuaapp.com/xcy/userhome.html?orgId=15524562016436",
    //       { title: "现场云" },
    //       true
    //     );
    //   }
    //   if (id == "dbz") {
    //     // this.apis.urlParams('https://live.xinhuaapp.com/xcy/userhome.html?orgId=15524562016436',{'title':'现场云'},true)
    //   }
    // },
  },
  mounted() {
    if (this.apis.iphonexPaddingFn()) {
      this.iphonexLivs = true;
    }
  }
};
</script>
<style lang="less" scoped>
.contentNavFixed {
  background: #fff;
}
.iphonexPaddingLivs {
  padding-top: 0.3rem;
}
.swiper-container {
  height: 300px;
  width: 100%;
}
.mint-swipe {
  height: 3.77rem;
}
.mint-swipe-item {
  height: 3.77rem;
  img {
    width: 100%;
    height: 100%;
  }
}
.swiper-slide {
  text-align: center;
  font-size: 38px;
  font-weight: 700;
  background-color: #eee;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
#lives {
  height: 100%;
  overflow: scroll;
  .container {
    // overflow-y: auto;
    // overflow-x: auto;
  }
  header {
    // background: #fff;
    background: @headerBg;
    .nvtt {
      font-size: 0.36rem;
      color: @headerColor;
    }
  }
  .from {
    .tab {
      padding: 0.38rem 0.45rem;
      display: flex;
      > div {
        display: flex;
        font-size: 0.26rem;
        flex: 1;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        img {
          height: 0.9rem;
          width: 0.9rem;
        }
        span {
          margin-top: 0.2rem;
        }
      }
    }
    .lookTv {
      padding: 0 0 0 0.3rem;
      margin-top: 0.5rem;
      h3 {
        font-size: 0.4rem;
        margin-bottom: 0.33rem;
      }
      > div {
        overflow: scroll;
        // height: 100px;
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        > div {
          display: flex;
          flex-direction: row;
          > div {
            display: flex;
            flex-direction: column;
            font-size: 0.26rem;
            width: 2.1rem;
            text-align: center;
            align-items: center;
            margin-bottom: 0.36rem;
            img {
              height: 1.42rem;
              width: 1.42rem;
              margin-bottom: 0.16rem;
            }
          }
        }
      }
    }
    .listenPM {
      padding: 0 0.3rem;
      margin-top: 0.5rem;
      h3 {
        font-size: 0.4rem;
        margin-bottom: 0.33rem;
      }
      > div {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        > div {
          text-align: center;
          font-size: 0.26rem;
          color: #1a1a1a;
          display: flex;
          flex-direction: column;
          img {
            height: 2.1rem;
            margin-bottom: 0.15rem;
          }
        }
      }
    }
    .readBz {
      padding: 0 0.3rem;
      margin-top: 0.5rem;
      h3 {
        font-size: 0.4rem;
        margin-bottom: 0.36rem;
      }
      > div {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        flex-wrap: wrap;
        > div {
          text-align: center;
          font-size: 0.26rem;
          color: #1a1a1a;
          display: flex;
          flex-direction: column;
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
    .xcy {
      padding: 0 0.3rem;
      margin-top: 0.5rem;
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
    // .bg {
    //   height: 4.6rem;
    //   img {
    //     width: 100%;
    //     height: 100%;
    //   }
    // }
    // .list {
    //   display: flex;
    //   padding: 0.25rem;
    //   flex-direction: row;
    //   position: relative;
    //   top: -1.5rem;
    //   flex-wrap: wrap;
    //   > div {
    //     position: relative;
    //     width: 50%;
    //     button {
    //       position: absolute;
    //       outline: none;
    //       padding: 0.12rem 0.18rem;
    //       color: #fff;
    //       background: #be2c1f;
    //       border-radius: 0.1rem;
    //       bottom: 0.67rem;
    //       left: 0.37rem;
    //       font-size: 0.22rem;
    //     }
    //     h3 {
    //       position: absolute;
    //       font-size: 0.4rem;
    //       top: 0.62rem;
    //       left: 0.38rem;
    //       color: #1a1a1a;
    //     }
    //   }
    //   img {
    //     height: 2.6rem;
    //     width: 100%;
    //   }
    // }
  }
}
</style>
