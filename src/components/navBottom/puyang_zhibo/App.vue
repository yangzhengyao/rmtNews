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
        <!-- <mt-swipe :auto="4000"> -->
          <!-- <mt-swipe-item>
            <img src="./images/item.png" alt />
          </mt-swipe-item> -->
          <!-- <mt-swipe-item>
            <img src="./images/item1.png" alt />
          </mt-swipe-item>
          <mt-swipe-item>
            <img src="./images/item2.png" alt />
          </mt-swipe-item>
        </mt-swipe> -->
        <div class="tab">
          <div @click="apis.urlParams('https://live.xinhuaapp.com/xcy/userhome.html?orgId=15101243206302',{'title':'现场云'},true)">
            <img src="./images/ico_xcy.png" alt />
            <span>现场云</span>
          </div>
          <div @click="apis.urlParams('http://paper.people.com.cn/rmrb',{'title':'读报纸'},true)">
            <img src="./images/ico_dbz.png" alt />
            <span>读报纸</span>
          </div>
          <!-- <div @click="apis.urlParams('http://epg.xjitv.cn/yoonGoo/#/vodPlay?mediaId=nongershi1_hd&columnId=103&meta=0&userId=ctwapeba6fe8d43d076484bae6a9b52e99bee&phone=18099200432',{'title':'看电视'},true)">  -->
          <div @click="apis.urlParams('http://epg.xjitv.cn/yoonGoo/#/vodPlay?mediaId=cctv1_hd&columnId=100&meta=0&userId=yoongoo&phone=yoongoo',{'title':'看电视'},true)">   
            <img src="./images/ico_kds.png" alt />
            <span>看电视</span>
          </div>
          <div @click="apis.urlParams('https://www.qingting.fm/radios/20206',{'title':'听电台'},true)">
            <img src="./images/ico_tgb.png" alt />
            <span>听电台</span>
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
            </div>
            <div>
              <div @click="apis.urlParams('http://epg.xjitv.cn/yoonGoo/#/vodPlay?mediaId=cctv12_hd&columnId=100&meta=0&userId=yoongoo&phone=yoongoo',{'title':'CCTV12'},true)">
                <img src="./images/CCTV12.png" alt />
                <span>CCTV12</span>
              </div>
              <!-- <div @click="apis.urlParams('http://mini.javaa.cn/zhibo/tv/bingtuan.html',{'title':'兵团卫视'},true)">
                <img src="./images/btws.png" alt />
                <span>兵团卫视</span>
              </div> -->
              <!-- <div @click="apis.urlParams('javascript:;',{'title':'濮阳县电视台'},true)"> -->
                 <!-- http://www.pytv.ha.cn/live5.html -->
              <div @click="apis.urlParams('http://epg.xjitv.cn/yoonGoo/#/vodPlay?mediaId=henan_hd&columnId=101&meta=0&userId=yoongoo&phone=yoongoo',{'title':'河南电视台'},true)">
                <img src="./images/hnstv.png" alt />
                <span>河南电视台</span><!--河南省电视台 濮阳市电视台 濮阳县电视台 这三个目前还没有连接-->
              </div>
              <!-- <div @click="apis.urlParams('http://www.pytv.ha.cn/live5.html',{'title':'濮阳市广播电视台'},true)">
                <img src="./images/pystv.png" alt /> 
                <span>濮阳市广播电视台</span>
              </div> -->
              <div >
                <img src="./images/pyDianshi.png" alt />
                <span>濮阳县电视台</span>
              </div>
            </div>
            <!-- <div>
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
            </div> -->
          </div>
        </div>
        <div class="listenPM">
          <h3>听电台</h3>
          <div>
            <div @click="apis.urlParams('https://www.qingting.fm/radios/386',{'title':'中国之声'},true)">
              <img src="./images/chinasheng.png" alt />
              <span>中国之声</span>
            </div>
            <div @click="apis.urlParams('https://www.qingting.fm/radios/1233/',{'title':'濮阳市交通广播'},true)">
              <img src="./images/puyangjiaotong.png" alt />
              <span>濮阳市交通广播</span>
            </div>
            <div @click="apis.urlParams('https://www.qingting.fm/radios/20206',{'title':'濮阳县广播电台'},true)">
              <img src="./images/hyRenmin.png" alt />
              <span>濮阳县人民广播电台</span>
            </div>
            
          </div>
        </div>

        <div class="readBz">
          <h3>读报纸</h3>
          <div>
            <!-- <div @click="apis.urlParams('http://218.84.231.165:8088/lyb/content/PaperIndex.htm',{'title':'绿原报'},true)">
              <img src="./images/ico_lyb.png" alt />
              <span>绿原报</span>
            </div> -->
            <div @click="apis.urlParams('http://paper.people.com.cn/rmrb',{'title':'人民日报'},true)">
              <img src="./images/ico_rmrb.png" alt />
              <span>人民日报</span>
            </div>
            
            <div @click="apis.urlParams('http://newpaper.dahe.cn/hnrb/html/2019-07/03/node_1.htm',{'title':'河南日报'},true)">
              <img src="./images/hnRibao.png" alt />
              <span>河南日报</span>
            </div>
            <div @click="apis.urlParams('http://pyrb.pyxww.com/201908/20/l01.html',{'title':'濮阳日报'},true)">
              <img src="./images/pyRibao.png" alt />
              <span>濮阳日报</span>
            </div>
            <!-- <div @click="apis.urlParams('http://epaper.bingtuannet.com/pc/layout',{'title':'兵团日报'},true)">
              <img src="./images/ico_btrb.png" alt />
              <span>兵团日报</span>
            </div> -->
            <!-- <div @click="apis.urlParams('http://bk.loulannews.com/',{'title':'巴音郭楞日报'},true)">
              <img src="./images/ico_byglrb.png" alt />
              <span>巴音郭楞日报</span>
            </div> -->
          </div>
        </div>
        <div class="xcy" @click="apis.urlParams('https://live.xinhuaapp.com/xcy/userhome.html?orgId=15101243206302',{'title':'新华社现场云'},true)">
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
#lives header{
  background: @headerBg !important;
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
  header {
    background: #be2c1f;
    .nvtt {
      font-size: 0.36rem;
      // color: #1a1a1a;
      color: #fff;
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
        // justify-content: space-between;
        flex-wrap: wrap;
        > div {
          display: flex;
          flex-direction: row;
          justify-content: space-between;

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
        // display: flex;
        overflow: hidden;
        // flex-direction: row;
        // justify-content: space-between;
        > div {
          // flex: 1;
          float: left;
          margin-right:0.18rem; 
          text-align: center;
          font-size: 0.26rem;
          color: #1a1a1a;
          display: flex;
          flex-direction: column;
          img {
            
            height: 2.1rem;
            width: 2.1rem;
            margin:0 auto 0.15rem;
          }
        }
        >div:last-child{
          margin-right: 0;
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
