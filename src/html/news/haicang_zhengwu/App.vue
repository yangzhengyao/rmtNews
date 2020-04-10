<template>
  <div id="wechat">
    <header class="com_header headerNavFixed">
      <div class="nvbt iback" @click="apis.iback()"></div>
      <div class="nvtt" v-if="zhengwu_type.type == '1'">微信</div>
      <div class="nvtt" v-if="zhengwu_type.type == '2'">微博</div>
      <div class="nvtt" v-if="zhengwu_type.type == '3'">网站</div>
      <div class="nvbt iabout"></div>
    </header>

    <div class="scroll-wrapper contentNavFixed">
      <div class="ibox wechat">
        <div class="content" v-if="zhengwu_type.type == '1'">
          <!-- <a class="item" v-for="(item,index) in wechat" :key="index" @click="apis.urlParams(item.src,{'title':item.name},true)"> -->
          <a
            class="item"
            v-for="(item,index) in wechat"
            :key="index"
            @click="apis.urlParams('wechatItem',item,false)"
          >
            <!-- <img :src="'http://wxservice.wengetech.com/wenhaiFt/picture/picTrans?picUrl='+item.icon" alt> -->
            <img :src="item.icon" alt>
            <h3>{{item.name}}</h3>
          </a>
        </div>
        <div class="content" v-if="zhengwu_type.type == '2'">
          <!-- <a class="item" v-for="(item,index) in wechat" :key="index" @click="apis.urlParams(item.src,{'title':item.name},true)"> -->
          <a
            class="item"
            v-for="(item,index) in sina"
            :key="index"
            @click="apis.urlParams(item.src,{ 'title':item.name },true)"
          >
            <!-- <img :src="'http://wxservice.wengetech.com/wenhaiFt/picture/picTrans?picUrl='+item.icon" alt> -->
            <img :src="item.icon" alt>
            <h3>{{item.name}}</h3>
          </a>
        </div>
        <div class="content" v-if="zhengwu_type.type == '3'">
          <!-- <a class="item" v-for="(item,index) in wechat" :key="index" @click="apis.urlParams(item.src,{'title':item.name},true)"> -->
          <a
            class="item"
            v-for="(item,index) in web"
            :key="index"
            @click="apis.urlParams(item.src,{ 'title':item.name },true)"
          >
            <!-- <img :src="'http://wxservice.wengetech.com/wenhaiFt/picture/picTrans?picUrl='+item.icon" alt> -->
            <!-- <img :src="item.icon" alt> -->
            <img src="./hc_zw.png" alt="">
            <h3>{{item.name}}</h3>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { webview } from "assets/js/webview";
import { fire } from "assets/js/utils";
import { indexMixin } from "assets/js/mixins";
import { mapActions } from "vuex";
// import { apis } from "assets/js/api";
export default {
  name: "wechat",
  data() {
    return {
      zhengwu_type: {},
      wechat: [
        {
          name: "海沧旅游",
          uid: "xmhcta",
          icon: "http://haicang.wengetech.com:8082/haicang/img/wechat/1.jpg"
        },
        {
          name: "海沧检查",
          uid: "xmhcjc",
          icon: "http://haicang.wengetech.com:8082/haicang/img/wechat/2.jpg"
        },
        {
          name: "海沧青年",
          uid: "xmhcqn",
          icon: "http://haicang.wengetech.com:8082/haicang/img/wechat/3.jpg"
        },
        {
          name: "海沧边检",
          uid: "haicangbianjian",
          icon: "http://haicang.wengetech.com:8082/haicang/img/wechat/4.jpg"
        },
        {
          name: "海沧政协",
          uid: "xmhczx6056761",
          icon: "http://haicang.wengetech.com:8082/haicang/img/wechat/5.jpg"
        },
        {
          name: "厦门海沧公安",
          uid: "xmhcga",
          icon: "http://haicang.wengetech.com:8082/haicang/img/wechat/7.jpg"
        },
        {
          name: "厦门市海沧消防",
          uid: "hcxf01",
          icon: "http://haicang.wengetech.com:8082/haicang/img/wechat/5.jpg"
        },
        {
          name: "厦门海沧巡特警",
          uid: "xmhcxtj",
          icon: "http://haicang.wengetech.com:8082/haicang/img/wechat/8.jpg"
        },
        {
          name: "厦门市海沧区文化馆",
          uid: "hcqwhg",
          icon: "http://haicang.wengetech.com:8082/haicang/img/wechat/9.jpg"
        },
        {
          name: "厦门海沧区老年大学",
          uid: "hcq-lndx",
          icon: "http://haicang.wengetech.com:8082/haicang/img/wechat/10.jpg"
        },
        {
          name: "海沧高层次人才",
          uid: "hcqrcb1332",
          icon: "http://haicang.wengetech.com:8082/haicang/img/wechat/11.jpg"
        },
        {
          name: "海沧身边事",
          uid: "haicangshenbian",
          icon: "http://haicang.wengetech.com:8082/haicang/img/wechat/12.jpg"
        },
        {
          name: "厦门海沧招聘",
          uid: "xiamenhc-zhaoping",
          icon: "http://haicang.wengetech.com:8082/haicang/img/wechat/13.jpg"
        },
        {
          name: "海沧教育网",
          uid: "haicangedu",
          icon: "http://haicang.wengetech.com:8082/haicang/img/wechat/14.jpg"
        },
        {
          name: "海沧创新社区",
          uid: "chuangxinshequ",
          icon: "http://haicang.wengetech.com:8082/haicang/img/wechat/15.jpg"
        },
        {
          name: "海沧生活",
          uid: "haicang114",
          icon: "http://haicang.wengetech.com:8082/haicang/img/wechat/16.jpg"
        },
        {
          name: "今日海沧",
          uid: "jinrihaicang",
          icon: "http://haicang.wengetech.com:8082/haicang/img/wechat/17.jpg"
        },
        {
          name: "海沧先锋",
          uid: "xmhczzb",
          icon: "http://haicang.wengetech.com:8082/haicang/img/wechat/18.jpg"
        },
        {
          name: "文明海沧",
          uid: "wenminghaicang",
          icon: "http://haicang.wengetech.com:8082/haicang/img/wechat/19.jpg"
        }
      ],
      sina: [
        {
          name: "海沧发布",
          icon:"https://tva1.sinaimg.cn/crop.0.0.179.179.180/005zYPjUgw1etsrob45yhj3050050wer.jpg", 
          src :'https://m.weibo.cn/u/5112332878?uid=5112332878&luicode=10000011&lfid=100103type%3D1%26q%3D%E6%B5%B7%E6%B2%A7%E5%8F%91%E5%B8%83'
        }
      ],
      web: [
        {
          name: "海沧区政务网",
          icon: "./hc_zw.png",
          src:'http://www.haicang.gov.cn/'
        }
      ]
    };
  },
  components: {},
  created() {
    this.getParams();
  },
  methods: {
    getParams() {
      let url = window.location.href;
      let urlParams = this.apis.parseQueryString(url);
      this.zhengwu_type = urlParams;
      console.log(this.zhengwu_type);
      return urlParams;
    }
  }
};
</script>
<style lang="less" scoped>
#wechat {
  .com_contentNavFixed {
    height: calc(100vh - 50px);
  }
  //   height: 100%;
  background: #fff;
  .content {
    position: relative;
    width: 100%;
    height: 100%;
    padding-top: 1.335rem;
  }
  .content.isIOS {
    padding-top: 1.87rem;
    padding-top: 1.335rem;
  }
  // .com_header {
  //   width: 100%;
  //   height: 50px;
  //   background: @dominantColor;
  //   text-align: center;
  //   display: flex;
  //   align-items: center;
  //   position: relative;
  //   position: fixed;
  //   z-index: 111;
  //   justify-content: center;
  //   align-items: center;
  //   padding: 0.17rem 0;
  //   color: #ffffff;
  //   font-weight: 700;
  // }
  .scroll-wrapper {
    -webkit-overflow-scrolling: touch;
    overflow: scroll;
    // height: 100%;
    // padding-top: 1rem;
  }
  font-size: 14px;
  .ibox {
    // margin-top: 10px;
    background: #fff;
    padding: 0.3rem 0.24rem;
    h1 {
      font-size: 0.33rem;
      font-weight: 500;
    }
    .content {
      padding: 0;
      display: flex;
      flex-flow: wrap;
      .item {
        h3 {
          font-size: 0.27rem;
          margin-top: 0.1rem;
          font-weight: 500;
        }
        img {
          height: 0.8rem;
          // width: 0.6666rem;
          margin-top: 0.34rem;
        }
        flex: 0 0 25%;
        text-align: center;
        padding-bottom: 14px;
      }
    }
  }
  .ibox:nth-last-child(1) {
    // margin-bottom: 7px;
  }
  .ibox.wechat {
    .content .item {
      img {
        height: 0.96rem;
        border-radius: 50%;
      }
      h3 {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        // max-height: 5.6em;
        margin-left: 0.07rem;
        margin-right: 0.07rem;
      }
    }
  }
}
</style>
