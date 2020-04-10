<template>
  <div id="lives">
      <header class="com_header headerNavFixed">
        <div class="nvbt"></div>
        <div class="nvtt">直播大厅</div>
        <div class="nvbt"></div>
      </header>
    <div class="container contentNavFixed ">
      <div class="from" :class="iphonexLivs ? 'iphonexPaddingLivs':'' ">
        <mt-swipe :auto="4000">
          <mt-swipe-item>
            <img src="./images/banner.png" alt />
          </mt-swipe-item>
        </mt-swipe>
        <div class="tab">
          <div @click="apis.urlParams('',{'title':'看电视'},true)">
            <img src="../tiemenguan_zhibo/images/ico_kds.png" alt />
            <span>看电视</span>
          </div>
          <div @click="apis.urlParams('',{'title':'听电台'},true)"> 
            <img src="../tiemenguan_zhibo/images/ico_tgb.png" alt />
            <span>听电台</span>
          </div>
          <div @click="apis.urlParams('http://paper.people.com.cn/rmrb/html/2019-07/11/nbs.D110000renmrb_01.htm',{'title':'读报纸'},true)">
            <img src="../tiemenguan_zhibo/images/ico_dbz.png" alt />
            <span>读报纸</span>
          </div>
          <div @click="apis.urlParams('https://live.xinhuaapp.com/xcy/userhome.html?orgId=15687105288341',{'title':'现场云'},true)">
            <img src="../tiemenguan_zhibo/images/ico_xcy.png" alt />
            <span>现场云</span>
          </div>
        </div>
        <div class="lookTv">
          <h3>看电视</h3>
          <div>
            <div>
              <div @click="apis.urlParams('http://tv.cctv.com/live/cctv1/m/?spm=C96370.PWZlnA98wIvO.EoylNL2EbEq5.1',{'title':'CCTV1'},true)">
                <img src="../tiemenguan_zhibo/images/CCTV1.png" alt />
                <span>CCTV1</span>
              </div>
              <div @click="apis.urlParams('http://tv.cctv.com/live/cctv2/m/?spm=C96370.PWZlnA98wIvO.EoylNL2EbEq5.3',{'title':'CCTV2'},true)">
                <img src="../tiemenguan_zhibo/images/CCTV2.png" alt />
                <span>CCTV2</span>
              </div>
              <div @click="apis.urlParams('http://tv.cctv.com/live/cctv3/m/?spm=C96370.PWZlnA98wIvO.EoylNL2EbEq5.4',{'title':'CCTV3'},true)">
                <img src="../tiemenguan_zhibo/images/CCTV3.png" alt />
                <span>CCTV3</span>
              </div>
              <div @click="apis.urlParams('http://tv.cctv.com/live/cctv4/m/?spm=C96370.PWZlnA98wIvO.EoylNL2EbEq5.5',{'title':'CCTV4'},true)">
                <img src="../tiemenguan_zhibo/images/CCTV4.png" alt />
                <span>CCTV4</span>
              </div>
              <div @click="apis.urlParams('http://tv.cctv.com/live/cctv7/m/?spm=C96370.PWZlnA98wIvO.EoylNL2EbEq5.6',{'title':'CCTV7'},true)">
                <img src="../tiemenguan_zhibo/images/CCTV7.png" alt />
                <span>CCTV7</span>
              </div>
              <div @click="apis.urlParams('http://tv.cctv.com/live/cctv13/m/?spm=C96370.PWZlnA98wIvO.EoylNL2EbEq5.2',{'title':'CCTV13'},true)">
                <img src="../tiemenguan_zhibo/images/CCTV13.png" alt />
                <span>CCTV13</span>
              </div>
              <div @click="apis.urlParams('http://tv.cctv.com/live/cctvchild/m/?spm=C96370.PWZlnA98wIvO.EoylNL2EbEq5.7',{'title':'CCTV14'},true)">
                <img src="../tiemenguan_zhibo/images/CCTV14.png" alt />
                <span>CCTV14</span>
              </div>
              <div @click="apis.urlParams('http://tv.cctv.com/live/cctv17/m/?spm=C96370.PWZlnA98wIvO.EoylNL2EbEq5.8',{'title':'CCTV17'},true)">
                <img src="../tiemenguan_zhibo/images/CCTV17.png" alt />
                <span>CCTV17</span>
              </div>
            </div>
          </div>
        </div>
        <div class="listenPM">
          <h3>听电台</h3> 
          <div>
           <div @click="apis.urlParams('https://m.qingting.fm/share/channels/1313?platform=wx_friend',{'title':'西藏藏语广播'},true)">
              <img src="./images/zgzygbw.png" alt />
              <span>西藏藏语广播</span>
            </div>
            <div @click="apis.urlParams('https://m.qingting.fm/share/channels/21321?platform=wx_friend',{'title':'西藏汉语频道'},true)">
              <img src="./images/xzhyws.png" alt />
              <span>西藏汉语频道</span>
            </div>
            <div @click="apis.urlParams('https://m.qingting.fm/share/vchannels/153008?platform=wx_friend',{'title':'天上西藏'},true)">
              <img src="./images/tsxz.png" alt />
              <span>天上西藏</span>
            </div>
          </div>
        </div>
        <div class="readBz">
          <h3>读报纸</h3>
          <div>
            <div @click="apis.urlParams('http://paper.people.com.cn/rmrb/html/2019-07/11/nbs.D110000renmrb_01.htm',{'title':'人民日报'},true)">
              <img src="./images/renmin_rb.png" alt />
              <span>人民日报</span>
            </div>
            <div @click="apis.urlParams('http://epaper.chinatibetnews.com/rmrbzw',{'title':'人民日报藏文版'},true)">
              <img src="./images/rmtbzwb.png" alt />
              <span>人民日报藏文版</span>
            </div>
            <div @click="apis.urlParams('http://epaper.chinatibetnews.com',{'title':'西藏日报'},true)">
              <img src="./images/xzrb.png" alt />
              <span>西藏日报</span>
            </div>
            <div @click="apis.urlParams('http://epaper.chinatibetnews.com/tibet',{'title':'西藏日报藏文版'},true)">
              <img src="./images/xzrbzwb.png" alt />
              <span>西藏日报藏文版</span>
            </div>
            <div @click="apis.urlParams('http://epaper.chinatibetnews.com/xzsb',{'title':'西藏商报'},true)">
              <img src="./images/xzsb.png" alt />
              <span>西藏商报</span>
            </div>
            <div @click="apis.urlParams('http://epaper.chinatibetnews.com/xzfzb',{'title':'西藏法制报'},true)">
              <img src="./images/xzfzb.png" alt />
              <span>西藏法制报</span>
            </div>
          </div>
        </div>
        <div class="xcy" @click="apis.urlParams('https://live.xinhuaapp.com/xcy/userhome.html?orgId=15687105288341',{'title':'现场云'},true)">
          <h3>现场云</h3>
          <div>
            <div>
              <img src="../tiemenguan_zhibo/images/VC.png" alt />
              <span>LIVE</span>
            </div>
          </div>
        </div>
        
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
    plusready() {
      plus.navigator.setStatusBarStyle("dark");
    }
  },
  mounted() {
    var that = this;
    if (window.plus) {
      that.plusready();
    } else {
      document.addEventListener("plusready", that.plusready(), false);
    }
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
  header{
   background: @headerBg;
    // background: #fff!important;
    .nvtt{
      font-size: .36rem;
      font-weight: 500;
     color:@headerColor;
    //  color: #1a1a1a!important;
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
      padding:0 0.3rem;
      padding-right: 0;
      margin-top: 0.5rem;
      h3 {
        font-size: 0.4rem;
        margin-bottom: 0.33rem;
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
          margin-bottom: .4rem;
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
