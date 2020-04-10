<template>
  <div id="wechat">
     <header class="com_header headerNavFixed" style="background: #fff; border-bottom: 1px solid rgb(240, 240, 240);">
      <div class="nvbt ibackBack" @click="apis.iback()"></div>
      <div class="nvtt" style="color: #1a1a1a;">融媒矩阵</div>
      <div class="nvbt idoc"></div>
    </header>
    <div class="scroll-wrapper contentNavFixed">
      <div class="ibox wechat">
        <div class="content">
          <!-- <a class="item" v-for="(item,index) in wechat" :key="index" @click="apis.urlParams(item.src,{'title':item.name},true)"> -->
          <a class="item" v-for="(item,index) in wechat" :key="index" @click="apis.urlParams('wechatItem',item,false)">
            <!-- <img :src="'http://wxservice.wengetech.com/wenhaiFt/picture/picTrans?picUrl='+item.icon" alt> -->
            <img :src="item.icon" alt>
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
      wechat: [
            {"name":"微东坡","icon":"http://dongpo.wengetech.com:8082/dongpo/img/wechat/wdp.jpg"},
            {"name":"东坡故里","icon":"http://dongpo.wengetech.com:8082/dongpo/img/wechat/dpgl.jpg"},
            {"name":"E东坡","icon":"http://dongpo.wengetech.com:8082/dongpo/img/wechat/Edp.jpg"},
            {"name":"IN东坡","icon":"http://dongpo.wengetech.com:8082/dongpo/img/wechat/INdp.jpg"},
            {"name":"东坡城曦","icon":"http://dongpo.wengetech.com:8082/dongpo/img/wechat/dpcx.jpg"},
            {"name":"东坡妇女之家","icon":"http://dongpo.wengetech.com:8082/dongpo/img/wechat/dpfnzj.jpg"},
            {"name":"东坡工会","icon":"http://dongpo.wengetech.com:8082/dongpo/img/wechat/dpgh.jpg"},
            {"name":"东坡工商","icon":"http://dongpo.wengetech.com:8082/dongpo/img/wechat/dpgs.jpg"},
            {"name":"东坡科协","icon":"http://dongpo.wengetech.com:8082/dongpo/img/wechat/dpkx.jpg"},
            {"name":"东坡廉苑","icon":"http://dongpo.wengetech.com:8082/dongpo/img/wechat/dply.jpg"},
            {"name":"东坡气象","icon":"http://dongpo.wengetech.com:8082/dongpo/img/wechat/dpqx.jpg"},
            {"name":"东坡青年","icon":"http://dongpo.wengetech.com:8082/dongpo/img/wechat/dpqn.jpg"},
            {"name":"东坡微健康","icon":"http://dongpo.wengetech.com:8082/dongpo/img/wechat/dpwjk.jpg"},
            {"name":"东坡信访","icon":"http://dongpo.wengetech.com:8082/dongpo/img/wechat/dpxf.jpg"},
            {"name":"东坡应急","icon":"http://dongpo.wengetech.com:8082/dongpo/img/wechat/dpyj.jpg"},
            {"name":"东坡云","icon":"http://dongpo.wengetech.com:8082/dongpo/img/wechat/dpy.jpg"},
            {"name":"眉山东坡文化","icon":"http://dongpo.wengetech.com:8082/dongpo/img/wechat/msdpwh.jpg"},
            {"name":"眉山东坡消防","icon":"http://dongpo.wengetech.com:8082/dongpo/img/wechat/msdpxf.jpg"},
            {"name":"青羊区东坡路社区青年","icon":"http://dongpo.wengetech.com:8082/dongpo/img/wechat/qyqdpl.jpg"},
            {"name":"清廉东坡","icon":"http://dongpo.wengetech.com:8082/dongpo/img/wechat/qldp.jpg"},
            {"name":"生态东坡","icon":"http://dongpo.wengetech.com:8082/dongpo/img/wechat/stdp.jpg"},
           
        ]
    };
  },
  components: {},
  created() {
  },
  methods: {

  }
};
</script>
<style lang="less" scoped>
#wechat {
  .com_contentNavFixed{
    height:calc(100vh - 50px)
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
      font-weight: 500
    }
    .content {
      padding: 0;
      display: flex;
      flex-flow: wrap;
      .item {
        h3 {
          font-size: 0.27rem;
          margin-top: 0.1rem;
          font-weight:500
        }
        img {
          height: 0.8rem;
          // width: 0.6666rem;
          margin-top: 0.34rem;
        }
        flex: 0 0 25%;
        text-align: center;
        padding-bottom: 14px
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
