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
          </mt-swipe-item> -->
          <mt-swipe-item>
            <img src="./images/item1.png" alt />
          </mt-swipe-item>
          <mt-swipe-item>
            <img src="./images/item2.png" alt />
          </mt-swipe-item>
        </mt-swipe>
        <div class="tab">
          <div @click="apis.urlParams('http://222.80.29.19:8088/lyb/content/PaperIndex.htm',{'title':'读报纸'},true)">
            <img src="./images/ico_dbz.png" alt />
            <span>读报纸</span>
          </div>
          <div @click="apis.urlParams('http://epg.xjitv.cn/yoonGoo/#/vodPlay?mediaId=nongershi1_hd&columnId=103&meta=0&userId=ctwapeba6fe8d43d076484bae6a9b52e99bee&phone=18099200432',{'title':'看电视'},true)"> 
            <img src="./images/ico_kds.png" alt />
            <span>看电视</span>
          </div>
          <div @click="apis.urlParams('https://m.qingting.fm/channels/20211703/',{'title':'听电台'},true)">
            <img src="./images/ico_tgb.png" alt />
            <span>听电台</span>
          </div>
          <div @click="apis.urlParams('https://live.xinhuaapp.com/xcy/userhome.html?orgId=15524562016436',{'title':'现场云'},true)">
            <img src="./images/ico_xcy.png" alt />
            <span>现场云</span>
          </div>
        </div>
        <div class="lookTv">
          <h3>看电视</h3>
          <div>
            <div>
              
              <div @click="apis.urlParams('http://epg.xjitv.cn/yoonGoo/#/vodPlay?mediaId=cctv1_hd&columnId=100&meta=0&userId=yoongoo&phone=yoongoo',{'title':'CCTV1'},true)">
                <img src="./images/CCTV1.png" alt />
                <span>CCTV1</span>
              </div>
              <div @click="apis.urlParams('http://epg.xjitv.cn/yoonGoo/#/vodPlay?mediaId=cctv2_hd&columnId=100&meta=0&userId=yoongoo&phone=yoongoo',{'title':'CCTV2'},true)">
                <img src="./images/CCTV2.png" alt />
                <span>CCTV2</span>
              </div>
              <div @click="apis.urlParams('http://epg.xjitv.cn/yoonGoo/#/vodPlay?mediaId=cctv4_hd&columnId=100&meta=0&userId=yoongoo&phone=yoongoo',{'title':'CCTV4'},true)">
                <img src="./images/CCTV4.png" alt />
                <span>CCTV4</span>
              </div>
              <div @click="apis.urlParams('http://epg.xjitv.cn/yoonGoo/#/vodPlay?mediaId=cctv8_hd&columnId=100&meta=0&userId=yoongoo&phone=yoongoo',{'title':'CCTV8'},true)">
                <img src="./images/CCTV8.png" alt />
                <span>CCTV8</span>
              </div>
              <div @click="apis.urlParams('http://epg.xjitv.cn/yoonGoo/#/vodPlay?mediaId=cctv10_hd&columnId=100&meta=0&userId=yoongoo&phone=yoongoo',{'title':'CCTV10'},true)">
                <img src="./images/CCTV10.png" alt />
                <span>CCTV10</span>
              </div>
              <div @click="apis.urlParams('http://epg.xjitv.cn/yoonGoo/#/vodPlay?mediaId=cctv12_hd&columnId=100&meta=0&userId=yoongoo&phone=yoongoo',{'title':'CCTV12'},true)">
                <img src="./images/CCTV12.png" alt />
                <span>CCTV12</span>
              </div>
              <div @click="apis.urlParams('http://epg.xjitv.cn/yoonGoo/#/vodPlay?mediaId=xinjiangweishi_hd&columnId=101&meta=0&userId=yoongoo&phone=yoongoo',{'title':'新疆卫视'},true)">
                <img src="./images/xjws.png" alt />
                <span>新疆卫视</span>
              </div>
            </div>
            <div>
              <div @click="apis.urlParams('http://epg.xjitv.cn/yoonGoo/#/vodPlay?mediaId=nongershi1_hd&columnId=103&meta=0&userId=ctwapeba6fe8d43d076484bae6a9b52e99bee&phone=18099200432',{'title':'二师铁门关市-1套'},true)">
                <img src="./images/tmg-1.png" alt />
                <span>二师铁门关市-1套</span>
              </div>
              <div style=" margin-bottom: 0rem;" @click="apis.urlParams('http://epg.xjitv.cn/yoonGoo/#/vodPlay?mediaId=xj1_hd&columnId=102&meta=0&userId=yoongoo&phone=yoongoo',{'title':'XJ-1'},true)">
                <img src="./images/XJ-1.png" alt />
                <span>XJ-1</span>
              </div>
              <div style=" margin-bottom: 0rem;" @click="apis.urlParams('http://epg.xjitv.cn/yoonGoo/#/vodPlay?mediaId=xj2_hd&columnId=102&meta=0&userId=yoongoo&phone=yoongoo',{'title':'XJ-2'},true)">
                <img src="./images/XJ-2.png" alt />
                <span>XJ-2</span>
              </div>
              <div style=" margin-bottom: 0rem;" @click="apis.urlParams('http://epg.xjitv.cn/yoonGoo/#/vodPlay?mediaId=xj3_hd&columnId=102&meta=0&userId=yoongoo&phone=yoongoo',{'title':'XJ-3'},true)">
                <img src="./images/XJ-3.png" alt />
                <span>XJ-3</span>
              </div>
              <div style=" margin-bottom: 0rem;"  @click="apis.urlParams('http://epg.xjitv.cn/yoonGoo/#/vodPlay?mediaId=bazhou1_hd&columnId=103&meta=0&userId=yoongoo&phone=yoongoo',{'title':'巴州-1'},true)">
                <img src="./images/bz-1.png" alt />
                <span>巴州-1</span>
              </div>
              <div style=" margin-bottom: 0rem;"  @click="apis.urlParams('http://epg.xjitv.cn/yoonGoo/#/vodPlay?mediaId=bazhou2_hd&columnId=103&meta=0&userId=yoongoo&phone=yoongoo',{'title':'巴州-2'},true)">
                <img src="./images/bz-2.png" alt />
                <span>巴州-2</span>
              </div>
              <div style=" margin-bottom: 0rem;"  @click="apis.urlParams('http://epg.xjitv.cn/yoonGoo/#/vodPlay?mediaId=bazhou3_hd&columnId=103&meta=0&userId=yoongoo&phone=yoongoo',{'title':'巴州-3'},true)">
                <img src="./images/bz-3.png" alt />
                <span>巴州-3</span>
              </div>
            </div>
          </div>
        </div>
        <div class="listenPM">
          <h3>听电台</h3>
          <div>
            <div @click="apis.urlParams('https://www.qingting.fm/radios/20211703/',{'title':'二师FM885'},true)">
              <img src="./images/ico_fm88.5.png" alt />
              <span>二师FM88.5</span>
            </div>
            <div @click="apis.urlParams('https://www.qingting.fm/radios/5022104/',{'title':'巴州FM107.7'},true)">
              <img src="./images/ico_fm107.7.png" alt />
              <span>巴州FM107.7</span>
            </div>
            <div @click="apis.urlParams('https://www.qingting.fm/radios/5022471/',{'title':'巴州FM996'},true)">
              <img src="./images/ico_fm996.png" alt />
              <span>巴州FM996</span>
            </div>
          </div>
        </div>
        <div class="readBz">
          <h3>读报纸</h3>
          <div>
            <div @click="apis.urlParams('http://paper.people.com.cn/rmrb',{'title':'人民日报'},true)">
              <img src="./images/ico_rmrb.png" alt />
              <span>人民日报</span>
            </div>
            <div @click="apis.urlParams('http://wap.xjdaily.com/xjrb/20190711/1.html',{'title':'新疆日报'},true)">
              <img src="./images/ico_xjrb.png" alt />
              <span>新疆日报</span>
            </div>
            <div @click="apis.urlParams('http://epaper.bingtuannet.com/pc/layout',{'title':'兵团日报'},true)">
              <img src="./images/ico_btrb.png" alt />
              <span>兵团日报</span>
            </div>
            <div @click="apis.urlParams('http://222.80.29.19:8088/lyb/content/PaperIndex.htm',{'title':'绿原报'},true)">
              <img src="./images/ico_lyb.png" alt />
              <span>绿原报</span>
            </div>
            <div @click="apis.urlParams('http://bk.loulannews.com/',{'title':'巴音郭楞日报'},true)">
              <img src="./images/ico_byglrb.png" alt />
              <span>巴音郭楞日报</span>
            </div>
            <div @click="apis.urlParams('http://www.xjfzb.com/fzb/',{'title':'新疆法制报'},true)">
              <img src="./images/xjfzb.png" alt />
              <span>新疆法制报</span>
            </div>
          </div>
        </div>
        <div class="xcy" @click="apis.urlParams('https://live.xinhuaapp.com/xcy/userhome.html?orgId=15524562016436',{'title':'现场云'},true)">
          <h3>现场云</h3>
          <div>
            <div>
              <img src="./images/VC.png" alt />
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
