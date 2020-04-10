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
          <mt-swipe-item>
            <img src="./images/banner1.png" alt />
          </mt-swipe-item>
          <mt-swipe-item>
            <img src="./images/banner.png" alt />
          </mt-swipe-item>
        </mt-swipe>
        <div class="tab">
          <div @click="apis.urlParams('http://epg.xjitv.cn/yoonGoo/#/vodPlay?mediaId=cctv1_hd&columnId=100&meta=0&userId=yoongoo&phone=yoongoo',{'title':'看电视'},true)">
            <img src="../tiemenguan_zhibo/images/ico_kds.png" alt />
            <span>看电视</span>
          </div>
          <div @click="apis.urlParams('https://m.qingting.fm/channels/1122/',{'title':'听电台'},true)"> 
            <img src="../tiemenguan_zhibo/images/ico_tgb.png" alt />
            <span>听电台</span>
          </div>
          <div @click="apis.urlParams('http://paper.people.com.cn/rmrb/html/2019-07/11/nbs.D110000renmrb_01.htm',{'title':'读报纸'},true)">
            <img src="../tiemenguan_zhibo/images/ico_dbz.png" alt />
            <span>读报纸</span>
          </div>
          <div @click="apis.urlParams('https://live.xinhuaapp.com/xcy/userhome.html?orgId=149567794337639',{'title':'现场云'},true)">
            <img src="../tiemenguan_zhibo/images/ico_xcy.png" alt />
            <span>现场云</span>
          </div>
        </div>
        <div class="lookTv">
          <h3>看电视</h3>
          <div>
            <div>
              <div @click="apis.urlParams('http://epg.xjitv.cn/yoonGoo/#/vodPlay?mediaId=cctv1_hd&columnId=100&meta=0&userId=yoongoo&phone=yoongoo',{'title':'CCTV1'},true)">
                <img src="../tiemenguan_zhibo/images/CCTV1.png" alt />
                <span>CCTV1</span>
              </div>
              <div @click="apis.urlParams('http://epg.xjitv.cn/yoonGoo/#/vodPlay?mediaId=cctv2_hd&columnId=100&meta=0&userId=yoongoo&phone=yoongoo',{'title':'CCTV2'},true)">
                <img src="../tiemenguan_zhibo/images/CCTV2.png" alt />
                <span>CCTV2</span>
              </div>
              <div @click="apis.urlParams('http://epg.xjitv.cn/yoonGoo/#/vodPlay?mediaId=cctv4_hd&columnId=100&meta=0&userId=yoongoo&phone=yoongoo',{'title':'CCTV4'},true)">
                <img src="../tiemenguan_zhibo/images/CCTV4.png" alt />
                <span>CCTV4</span>
              </div>
              <div @click="apis.urlParams('http://epg.xjitv.cn/yoonGoo/#/vodPlay?mediaId=cctv12_hd&columnId=100&meta=0&userId=yoongoo&phone=yoongoo',{'title':'CCTV12'},true)">
                <img src="../tiemenguan_zhibo/images/CCTV12.png" alt />
                <span>CCTV12</span>
              </div>
            </div>
          </div>
        </div>
        <div class="listenPM">
          <h3>听电台</h3>
          <div>
            <div @click="apis.urlParams('https://m.qingting.fm/channels/1122/',{'title':'乐山综合广播'},true)">
              <img src="./images/3.png" alt />
              <span>乐山综合广播</span>
            </div>
            <div @click="apis.urlParams('https://m.qingting.fm/channels/4864/',{'title':'乐山音乐交通广播'},true)">
              <img src="./images/2.png" alt />
              <span>乐山音乐交通广播</span>
            </div>
            <div style=" margin-right:.3rem;" @click="apis.urlParams('https://m.qingting.fm/channels/4897/',{'title':'成都新闻广播'},true)">
              <img src="./images/1.png" alt />
              <span>成都新闻广播</span>
            </div>
             <div @click="apis.urlParams('https://m.qingting.fm/channels/4886/',{'title':'四川交通广播'},true)">
              <img src="./images/4.png" alt />
              <span>四川交通广播</span>
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
            <div @click="apis.urlParams('https://4g.scdaily.cn',{'title':'四川日报'},true)">
              <img src="./images/sichuang_rb.png" alt />
              <span>四川日报</span>
            </div>
             <div @click="apis.urlParams('http://www.cnepaper.com/lsrb/h5/',{'title':'乐山日报'},true)">
              <img src="./images/leshan_rb.png" alt />
              <span>乐山日报</span>
            </div>
            <div @click="apis.urlParams('http://www.cnepaper.com/sjdsb/h5/',{'title':'三江都市报'},true)">
              <img src="./images/sanjiang_rsb.png" alt />
              <span>三江都市报</span>
            </div>
            <div @click="apis.urlParams('http://e.chengdu.cn',{'title':'成都商报'},true)">
              <img src="./images/chengdu-sb.png" alt />
              <span>成都商报</span>
            </div>
          </div>
        </div>
        <div class="xcy" @click="apis.urlParams('https://live.xinhuaapp.com/xcy/userhome.html?orgId=149567794337639',{'title':'现场云'},true)">
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
  header {
    background: #fff;
    .nvtt {
      font-size: 0.36rem;
      color: #1a1a1a;
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
