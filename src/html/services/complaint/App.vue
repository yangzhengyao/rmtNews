<template>
  <transition name="fadeIn">
    <div id="certificate">
      <!-- 头部 -->
      <header class="com_header headerNavFixed">
        <div class="nvbt iback" @click="apis.iback()" :class=" apis.getTheme() == 'dongpo'?'iBlackBack':'iback'"></div>
        <div class="nvtt">企业投诉</div>
      </header>
      <!-- 正文 -->
      <div class="content contentNavFixed com_contentNavFixed" :style="text?'background:#F0F2F5':''">
        <div v-if="text">
            <div class="wrap">
              <h3 class="wrap-qyts">投诉须知</h3>
              <!-- <p class=""></p> -->
              <p>为进一步优化提升营商环境，根据上级有关政策要求和县委营商环境建设委员会部署，县委县政府督查局（县委营商环境办)设立投诉举报平台，受理企业针对全县营商环境的
                问题线索或意见建议。我们将对收到的问题线索和意见建议进行汇总整理，督促有关乡镇、部门处理，重大、典型问题线索直接派员督查，并向企业反馈处理结果。
              </p>
              <p>
               本平台暂不受理公民个人诉求事项。公民个人诉求类事项、意见建议等，请通过人民网地方领导留言板等其他渠道反映。
              </p>
            </div>
            <div
              class="navbar"

              @click="skipUrl"
              :class="iphonexPadding ? 'iphonexPaddingClass':'' "
            >
              <!-- @click="apis.urlParams('Login')" -->
              <span>我已知晓，开始投诉</span>
              <!-- <span v-if="!text">我要投诉</span> -->
            </div>
        </div>
        <div
          v-if="!text"
          class="container"
          :style="{'-webkit-overflow-scrolling': scrollMode}"
          v-infinite-scroll="loadBottomAjax"
          infinite-scroll-disabled="bottomLock"
          infinite-scroll-distance="10"
          infinite-scroll-immediate-check="true"
        >
          <div class="certificate">
            <mt-loadmore
              :top-method="loadTop"
              :auto-fill="true"
              ref="loadmore"
              :bottom-all-loaded="false"
              @top-status-change="handleTopChange" 
            >
              <!-- <div style="height:100%"> -->
                <div slot="top" class="mint-loadmore-top">
                  <span v-show="topStatus === 'pull'">
                    <img class="pullLoading" src="~@/assets/img/loading.png"> 下拉刷新↓
                  </span>
                  <span v-show="topStatus === 'drop'">
                    <img class="pullLoading" src="~@/assets/img/loading.png"> 释放更新↑
                  </span>
                  <span v-show="topStatus ==='loading'">
                    <img class="pullLoading" src="~@/assets/img/loading.gif"> 加载中...
                  </span>
                </div>
              
                <div class="contaniers" v-if="json.length > 0" v-for="(item,index) in json" :key="index">

                  <!-- 内容 -->
                  <div class="contanier">
                    <h3>
                      <span :class="item.replyStatus?'':'color'" v-html="item.replyStatus?'已回复':'未回复'"></span>{{item.title}}
                    </h3>
                    <div class="content">{{contents?item.content:item.content.length>50?item.content.slice(0, 50) + "...":item.content}}<span @click="openText(item.content)" v-html="quanbu" v-if="item.content.length>50"></span></div>
                    <div class="pic-or-vid">
                      <!-- 视频 -->
                      <div  class="vid" v-if="item.videoUrl" v-for="(items,indexs) in jsonctl(item.videoUrl,2)" :key="indexs" :style="{'background-image':'url('+items[1]+')'}">
                        <div class="playRound"  @click.stop="jumpPlayer(items[0])"></div>
                      </div>
                      <!-- 图片 -->
                      <div class="pic" v-if="item.pictureUrl" @click.stop="bigImg(item.pictureUrl,indexs)" v-for="(items,indexs) in jsonctl(item.pictureUrl)"  :key="indexs" @touchmove="touchmoveFunc()">
                        <img :src="items">
                      </div>
                    </div>
                    <div class="time">{{item.complaintsTime}}</div>
                  </div>

                  <!-- 回复 -->
                  <div class="revert" v-if="item.reply">
                    <p>回复:</p>
                    <div class="comment">
                      <span>{{item.userName}}</span>&nbsp;您好,<div class="comment">{{item.reply.replayContent}}</div>
                    </div>
                    <div class="time">{{item.reply.replayTime}}</div>
                  </div>

                </div>
              <!-- </div> -->

              <div v-if="!json.length > 0" style="text-align: center;font-size: .4rem;color: #888;padding-top: 1rem;height:100%">
                <img src="./images/default.png" style="width:3rem;">
                <p style="margin:1rem auto 2rem;">暂无信息</p>
              </div>
              
              <!-- 底部提示 -->
              <div class="bottomLoad" v-if="json.length > 0">
                <div class="loading" v-show="bottomLoading">加载中...</div>
                <div class="noData" v-if="bottomNoData">没有更多的内容了</div>
              </div>
            </mt-loadmore>
          </div>

        </div>
      </div>
      <div class="tab" v-if="!text">
        <div
          class="navbar"
          @click="skipUrl"
          :class="iphonexPadding ? 'iphonexPaddingClass':'' "
        >
          <span>我要投诉</span>
        </div>
      </div>
      <div id="loading" v-if="noLoading" >
        <spinner type="bubbles" size="40px"></spinner>
      </div>
    </div>
  </transition>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import axios from "axios";
import qs from "qs";
import { Spinner } from "vux";
import apis from '@/assets/js/api.js';
//引入主页
import { Header, Toast, Loadmore } from "mint-ui";
import noData from "components/noData.vue";
import { log } from 'util';
const root = process.env.API_ROOT;
export default {
  name: "complaint",
  data() {
    return {
      json: [],
      root: root,
      pageNo: 1,
      pageSize: 10,
      bottomLock: true,          // 上滑开关
      topStatus: "",            //下拉状态
      bottomLoading: false,    // 底部loading
      bottomNoData: false,    // 底部nothing
      scrollMode: "auto",    //移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
      iphonexPadding:false,
      noLoading: false,
      text:true,          //是否是投诉列表还是投诉须知
      x:true,             //是否回复标签
      contents:false,  //内容的收缩与展开
      quanbu:'全部',
    };
  },
  computed: {
    ...mapGetters("login", [
      "getStorge" // active的栏目
    ])
  },
  components: {
    "v-loadmore": Loadmore,
    Spinner
  },
  methods: {
    openText(wenben){
      if(this.quanbu=='全部'){
        this.quanbu='收缩'
        this.contents=true
      }else{
        this.quanbu='全部'
        this.contents=false
      }
    },
    jsonctl(data,x){
      if(data){
        if(data.indexOf(',')){
          if(x==2){
            let arr=[]
            arr.push(data.split(","))
            return arr
          }else{
            return data.split(",")
          }
        }else{
          return data
        }
      }
    },
    jumpPlayer(videoUrl){
      var that = this;
      var url = {url:videoUrl};
      if(plus.os.name != "iOS"){
        var main = plus.android.runtimeMainActivity();
        //获取java辅助类
        var Helper = plus.android.importClass(that.apis.theme.api.rmtNews);
        //创建对象实例
        var mHelper = new Helper();
        mHelper.playVideo(main,videoUrl);
      }else{
        var notiClass = plus.ios.importClass("NSNotificationCenter");
        notiClass.defaultCenter().postNotificationNameobject("JS2NativePlayVideo",JSON.stringify(url));
      }
    },

    //图片保存至本地
    bigImg(images,index){
      let testImg = images.split(',');
      plus.nativeUI.previewImage(testImg, {
        background: "#333333",
        current: index,
        onLongPress:function(event){
          let bts = [ {
            title: "保存图片至本地"
          }];
          plus.nativeUI.actionSheet({
            title: "操作",
            cancel: "取消",
            buttons: bts
          },
          function(e) {
            if( e.index == 1 ){
              plus.nativeUI.showWaiting('保存中...')
              let dtask = plus.downloader.createDownload(event.url, {}, function (d, status) {
                // 下载完成
                if (status == 200) {
                //mui.toast("下载成功,文件保存在"+d.filename)
                  plus.gallery.save(d.filename, function () {//保存到相册方法
                  plus.nativeUI.closeWaiting()
                  plus.nativeUI.alert('已保存到手机相册')
                }, function () {
                  plus.nativeUI.closeWaiting()
                  plus.nativeUI.alert('保存失败，请重试！')
                });
                } else {
                  plus.nativeUI.alert("下载失败")
                }
              });
              dtask.start();
            }
          });
        }
      });
    },
    touchmoveFunc() {
      if (window.trackingClickSelf) {
        window.trackingClickSelf = false;
      }
    },

    //投诉按钮
    skipUrl() {
      let userDataid=JSON.parse(localStorage.getItem("userData"));
      if(!userDataid ){
        this.apis.urlParams('Login');
        return;
      }
      let that = this;
      if(that.text){
        this.Init("top");
        that.text=false
      }else{
        that.apis.urlParams("complaintlist", {});
      }
      plus.webview.getWebviewById(window.location.href.split('#/')[0]+'#/'+"complaintlist").addEventListener(
        "close",
        function(e) {
          localStorage.removeItem('wz_imgData');
          localStorage.removeItem('wz_vidData');
          that.pageNo = 1;
          that.Init('top')
          that.text=false
        },
        false
      );
    },
    iconCertificate() {
      //请登陆
      if (JSON.parse(this.getStorge) == null) {
        this.apis.urlParams("Login");
        return
      } else {
        this.apis.urlParams("iconCertificate", {
          dep_id: JSON.parse(this.getStorge).dep_id
        });
      }
    },
    loadTop: function() {
      //组件提供的下拉触发方法
      //下拉加载
      this.pageNo = 1;
      this.bottomLock = true;
      this.Init("top");
      this.$refs.loadmore.onTopLoaded(); // 固定方法，查询完要调用一次，用于重新定位
    },
    //滚动触发
    loadBottomAjax() {
      this.Init("bottom");
    },
    // mint-ui 下拉组件的状态
    handleTopChange(status) {
      console.log(status);
      this.topStatus = status;
    },
    //初始
    Init(isTop) {
      let userDataid=JSON.parse(localStorage.getItem("userData"));
      let postData = {
        userId:userDataid.user_id,
        pageNo: this.pageNo,
        pageSize: this.pageSize
      };
      if (isTop == "bottom") {
        if (!this.bottomNoData) {
          this.bottomLoading = true;
        }
      }
      this.axios({
        method: "post",
        url: this.apis.theme.api.services.selectInfo, 
        data: postData
      }).then(res => {
        if (res.data.data.length>0) {
          this.pageNo += 1;
          this.bottomLock = false;
          this.bottomNoData = false;
          if (isTop == "top") {
            this.json = res.data.data;
          } else if (isTop == "bottom") {
            this.json = this.json.concat(res.data.data);
          }
        }else if(res.data.data.length<10){
          this.bottomNoData = true;
          this.bottomLock = true;
        }
          this.bottomLoading = false;
          this.$nextTick(function() {
            this.scrollMode = "touch";
          });
      });
    }
  },
  mounted() {
    this.noLoading = true;
    this.noLoading = false;
    if( this.apis.iphonexPaddingFn() ){
      this.iphonexPadding = true;
    }
  }
};
</script>
<style lang="less" scoped>
header{
  background: @headerBg;
  .nvbt:nth-child(1){
    background: @headerIback;
  }
  .nvtt{
    font-size: .36rem;
    font-weight: 500;
    color:@headerColor;
  }
}
.wrap{
  background: #fff;
  padding: .3rem;
  margin: .32rem;
  margin-bottom: 1rem;
  border-radius: .1rem;
  .wrap-qyts{
    padding-bottom: .3rem;
    text-align: justify; 
    font-size:.36rem;
    font-family:Source Han Sans CN;
    font-weight:500;
    color:rgba(26,26,26,1);
    border-bottom: 1px solid #D9D9D9;
    margin-bottom: .4rem;
  }
  p{
    text-indent:2em;
    text-align: justify;
    font-size:.3rem;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:.5rem;
  }
}
#certificate {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
  overflow-y: auto;
  z-index: 1000;
  background: #fff;
  .contentNavFixed {
    background: #fff;
  }
  .certificate {
    padding: 0.3375rem 0.2475rem 0 0.2475rem;
    background: #fff;
    .banner {
      width: 100%;
      img {
        width: 100%;
      }
      margin-bottom: 0.3495rem;
    }
    
    .contaniers{
      height: 100%;
      overflow-y: auto;
      padding-bottom: .5rem;
      // border-bottom: .2rem solid #e2e2e2;
      .contanier{
        h3{
          display: flex;
          align-items: center;
          span{
            margin-right: .3rem;
            display: inline-block;
            height: .5rem;
            padding: 0 .2rem;
            background: #21BE6F;
            border-radius: .28rem;
            color: #fff;
            font-size: .26rem;
            line-height: .54rem;
            
          }
          .color{
            background: #E32519;
          }
          font-size: .4rem;
          font-weight: bold;
          line-height: .65rem;
        }
        .content{
          padding: .1rem .1rem 0;
          font-size:.32rem;
          font-family:Source Han Sans CN;
          font-weight:400;
          color:rgba(102,102,102,1);
          line-height:.48rem;
          span{
            color:#08377E;
            margin-left: .15rem;
          }
        }
        .pic-or-vid{
          margin: .2rem 0;
          overflow: hidden;
          display:flex;
          justify-content: flex-start;
          flex-flow: wrap;
          .vid{
            background-size: cover;
            background-position:center 30%;
            width: 100%;
            height: 4rem;
            border-radius: 10px;
            border: 1px solid #f2f2f2;
            overflow: hidden;
            display: flex;justify-content: center;
            align-items: center;
            .playRound {
              width: 0.8rem;
              height: 0.8rem;
              border-radius: 50%;
              background: rgba(0, 0, 0, 0.4) url("../../../assets/img/play_san.png")
              no-repeat center / 40%;
              z-index: 1;
            }
          }
          .pic{
            width: 2.2rem;
            height: 2.2rem;
            margin-right: .2rem;
            margin-bottom: .2rem;
            float: left;
            border-radius: 5px;
            overflow: hidden;
            img{
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }
          
          .pic:nth-child(3n){
            margin-right: 0;
          }
        }
        .time{
          padding: 0 0.1rem;
          margin-bottom: .2rem;
          font-size:.30rem;
          font-family:Source Han Sans CN;
          color:rgba(153,153,153,1);
          line-height:.45rem;
        }
      }
      .revert{
        padding: 0 0.1rem;
        p{
          padding: .15rem 0;
          border-top: 1px solid #E6E6E6;
          font-size:.36rem;
          font-family:Source Han Sans CN;
          font-weight:400;
          color:rgba(26,26,26,1);
        }
        .comment{
          word-wrap: break-word;
          word-break: break-all;
          overflow: hidden;
          font-size:.32rem;
          font-family:Source Han Sans CN;
          font-weight:400;
          color:rgba(8,55,126,1);
          line-height:.48rem;
        }
        .time{
          font-size:.30rem;
          font-family:Source Han Sans CN;
          color:rgba(153,153,153,1);
          line-height:.45rem;
          margin-bottom: .2rem;
        }
      }
    }
  }
  .navbar {
    border-radius: .4rem;
    background: @dominantColor;
    height: .8rem;
    width: 90%;
    margin: 0.2rem auto 0.3rem;
    text-align: center;
    font-size: 0.333rem;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 0.333rem;
      height: 0.333rem;
      margin-right: 0.24rem;
    }
  }
  .questionClass{
     color: @nQuestionColor !important;
     border: 0.015rem solid @nQuestionColor !important;
  }
  .tab{
    position: fixed;
    width: 100%;
    background: #fff;
    bottom: 0;
    left: 0;
  }
}
</style>
<style lang="less">
.mint-loadmore-top {
  font-size: 14px;
}
.mint-loadmore{
  // height: 100vh;
}
.pullLoading {
  width: 24px;
  height: 24px;
  vertical-align: middle;
  margin-top: -4px;
  margin-right: 3px;
}
.bottomLoad {
  background: transparent;
  margin-bottom: 50px;
}
#loading {
  position: fixed;
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0.7;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.vux-spinner{
  fill: @dominantColor !important;
}
</style>

