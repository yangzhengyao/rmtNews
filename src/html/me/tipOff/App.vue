<template>
  <!-- 热门 -->
  <div class>
    <header class="com_header headerNavFixed" v-if="apis.getTheme() != 'dongpo'">
      <div class="nvbt iback" :class=" apis.getTheme() == 'dongpo'?'iBlackBack':'iback'"  @click="apis.iback()" ></div>
      <div class="nvtt" style="width:70%" >{{ navTitle }}</div>
      <!-- <div class="nvtt" v-if="navTitle.title == '报料'">我要报料</div>
      <div class="nvtt" v-if="navTitle.title == '搭把手'">搭把手</div>
      <div class="nvtt" v-if="navTitle.title == '东坡文旅'">东坡文旅</div>
      <div class="nvtt" v-if="navTitle.title == '农民工之家'">农民工之家</div> -->
      <div class="nvbt idoc"></div>
    </header>
    <div
      class="com_content main-body communityNavFixed"
      :style="{'-webkit-overflow-scrolling': scrollMode}"
      v-infinite-scroll="loadBottomAjax"
      infinite-scroll-disabled="bottomLock"
      infinite-scroll-distance="10"
      infinite-scroll-immediate-check="true"
      style="padding-top:1rem"
    >
      <mt-loadmore
        :top-method="loadTop"
        :auto-fill="true"
        ref="loadmore"
        :bottom-all-loaded="false"
        @top-status-change="handleTopChange"
        style="min-width:100%"
      >
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
        <div class="search" style="display:none">
          <div v-if="json.length">
            <i class="icon iconfont">&#xe62a;</i>
            <input type="text" placeholder="请输入信息">
          </div>
        </div>
        <div class="item border_1px_b" v-for="( item,index ) in json" :key="index">
          <span>{{ item.title }}</span>
          <div class="msg">
            <div class="user">
              <img :src="apis.theme.imgHost+item.imgurl" alt v-if="item.imgurl != null && item.imgurl != ''">
              <img :src='"~@/assets/img/"+apis.getTheme()+"/me/dafultImg.png"' v-else>
              <span>{{ item.personName }}</span>
            </div>
            <span>{{ item.pubTime }}</span>
          </div>
          <span>{{ item.content }}</span>
         <ul 
          class="isBolgImg"
           v-if="item.reportInfoImages != null && JSON.parse(item.reportInfoImages).length != 0">
          <li  v-for="(itemImg,index1) in JSON.parse(item.reportInfoImages)" :key="index1"
          :style="{'background-image':'url('+itemImg.images+')'}"
          @click="previewImage(index1,JSON.parse(item.reportInfoImages))"
        ></li>
        </ul>
         <template v-if="item.reportInfoVideos">
                <div class="article_video">
                     <template>
                         <div class="video_info zoomPic" :style='"background-image:url("+JSON.parse(item.reportInfoVideos)[0].img+");"'></div>
                         <div class="playRound" @click.stop="jumpPlayer(JSON.parse(item.reportInfoVideos)[0].video)"></div>
                      </template>
                 </div>
          </template>
        </div>
      </mt-loadmore>
      <!-- <no-data v-if="json.length == 0"></no-data> -->
    </div>
    <!-- 悬浮 -->
    <div class="myCommunity" @click="urlTipOffRelease" v-if="apis.getTheme() != 'dongpo'">
      <img :src='"~@/assets/img/"+apis.getTheme()+"/photo.png"' alt>
    </div>
    <div v-transfer-dom>
      <previewer :list="list" ref="previewer"></previewer>
    </div>
  </div>
</template>
<script>
import { Loadmore, Toast, Indicator, Field, MessageBox } from "mint-ui";
import axios from "axios";
import qs from "qs";
import { Actionsheet } from "mint-ui";
// import noData from "";
import { mapGetters, mapMutations, mapActions } from "vuex";
import { Previewer, TransferDom } from "vux";
const root = process.env.API_ROOT;
export default {
  name: "community",
  data() {
    // let tipOffVal = {};
    // let tipOffLocalObj = localStorage.getItem( 'tipOff' );
    // if( tipOffLocalObj == null ){
    //     tipOffVal = '我要报料'
    // } else {
    //     tipOffVal = JSON.parse( 'tipOff' ).title;
    // }
    return {
      list: [],
      root: root,
      //   isData: false, //判断是否有数据
      bottomLock: true, // 上滑开关
      json: [], //mock数据
      pageNum: 1,
      pageSize: 10,
      scrollMode: "auto", //移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
      topStatus: "",
      topStatusFollow: "",
      inputShow: false,
      testJson: [], // 选择相册保存的图片
      navTitle:this.apis.getTheme() !='dongpo'?JSON.parse(localStorage.getItem( 'tipOff' )).title:'报料',
      data: [
        {
          name: "文字",
          method: this.characters //调用methods函数
        },
        {
          name: "从相册中选择",
          method: this.getLibrary // 调用methods中的函数
        }
      ],
      sheetVisible: false //默认不显示
    };
  },
  mounted() {
    this.Init("top");
  },
  computed: {
    ...mapGetters("login", [
      "getStorge" // active的栏目
    ])
  },
  directives: {
      TransferDom
  },
  methods: {
    urlTipOffRelease(){
      let that = this;
       if(JSON.parse(localStorage.getItem("userData") == null)){
          that.apis.urlParams("Login", {});
       }else{
     this.apis.urlParams('tipOffRelease')
      plus.webview.getWebviewById(window.location.href.split('#/')[0]+'#/'+"tipOffRelease").addEventListener(
        "close",
        function(e) {
            that.pageNum = 1;
            that.Init('top')
        },
        false
      );
   }
    },
   clickStop(){
    },
    previewImage(index,imgArr) {
        let testImg = [];
        for (let i = 0; i < imgArr.length; i++) {
          testImg.push(imgArr[i].images);
        }
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
                        }
                    );
                    // console.log( 123 )
                    // console.log( JSON.stringify( e ) )
                }
            });
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
    actionSheet() {
      this.sheetVisible = true;
    },
    loadTop: function() {
      //组件提供的下拉触发方法
      //下拉加载
      this.pageNum = 1;
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
      this.topStatus = status;
      if (this.topStatus == "loading") {
        $(".mint-loadmore-content").removeAttr("transform");
      }
    },
    // 初始化
    Init(isTop) {
      let that = this;
      let postData = {
        pageNo: this.pageNum,
        pageSize: this.pageSize,
        appInfoId:parseInt(this.apis.theme.api.appInfoId),
      };
      if (isTop == "bottom") {
        if (!this.bottomNoData) {
          this.bottomLoading = true;
        }
      }
      this.axios({
        method: "post",
        // root + "/my_al/my/getUserCollect"
        // that.apis.theme.api.me.getUserCollect
        url: that.apis.theme.api.me.getAllReportMaterialList, //that.apis.theme.api.me.getAllReportMaterialList  root + "/my_al/my/getAllReportMaterialList"
        data: postData
      }).then(res => {
        if (res.data.success) {
          if (isTop == "top") {
            this.json = [];
            this.json = this.json.concat(res.data.data);
          } else if (isTop == "bottom") {
            this.json = this.json.concat(res.data.data);
          }
          //判断是否是最后一页，禁止上拉加载
          if (res.data.data.lastPage == false) {
            this.pageNum += 1;
            this.bottomLock = false;
            this.bottomNoData = false;
          } else {
            this.bottomNoData = true;
            this.bottomLock = true;
          }
          this.bottomLoading = false;
          this.$nextTick(function() {
            this.scrollMode = "touch";
          });
        }
      });
    },
  },
  components: {
    "v-loadmore": Loadmore,
    Previewer
  },
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
.myCommunity {
  background: #fff;
  border-radius: 50%;
  -webkit-box-shadow: 0px 0px 9px 1px @dominantColor;
  box-shadow: 0px 0px 9px 1px @dominantColor;
  position: fixed;
  bottom: 2vh;
  right: 2vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.4rem 0.37rem;
  background: @dominantColor;
  img {
    width: 0.42rem;
    height: 0.324rem;
  }
}
.com_content {
 position: relative;
    width: 100%;
    height: 100%;
    min-height: 11.17rem;
    overflow: hidden; margin-top:1rem;
    background: #fff;
  .item {
    display: flex;
    // margin-bottom: 0.3495rem;
    flex-direction: column;
    background: #fff;
    padding: 0.2rem;
    border-bottom: 0.18rem solid #efefef;
    font-size: 0.3rem;
    > span:nth-child(1) {
      font-size: 0.32rem;
      color: #393939;
    }
    .msg {
      margin-top: 0.2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .user {
        display: flex;
        align-items: center;
        margin-bottom: 0.18rem;
        img {
          width: 0.8rem;
          height: 0.75rem;
          border-radius: 50%;
          margin-right: 0.2rem;
        }
        span {
          font-size: 0.28rem;
          color: #989898;
        }
      }
      span {
        font-size: 0.28rem;
        color: #989898;
      }
      > span:nth-child(2) {
        position: relative;
        top: -0.13rem;
      }
    }
    > span:nth-child(3) {
      font-size: 0.3rem;
      color: #989898;
      margin-bottom: 0.2rem;
    }
    // 图片初始化
    .circleFriends {
      display: flex;
      width: 35%;
      li {
        max-height: 4rem;
        min-height: 3rem;
        list-style: none;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        background: #fff;
        margin-right: 0.1rem;
        margin-bottom: 0.1rem;
        max-width: 100%;
        min-width: 100%;
        background-position: left center;
        background-size: contain;
        background-repeat: no-repeat;
      }
    }
    .isBolgImg {
      display: flex;
      width: 100%;
      flex-wrap: wrap;
      box-sizing: border-box;
      li {
        height: 1.8rem;
        float: left;
        list-style: none;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        background: #fff;
        margin-right:0.14rem;
        margin-bottom: 0.14rem;
        width: 31.3%;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
      }
    }
  }
}
 .article_video {
            margin-bottom: 0.15rem;
            position: relative;
            width:3.5rem;
            height:2.8rem;
            .video {
                overflow: hidden;
                width: 100%;
                min-height: 5.3rem;
            }
            .video-fixed {
                position: fixed;
                left: 0;
                right: 0;
                top: 0;
                z-index: 1000;
            }
            .video_info {
                left: 0;
                right: 0;
                top: 0;
                z-index: 111;
                background-position: center;
                background-repeat: no-repeat;
                background-size: cover;
                width:3.5rem;
                height:2.8rem;
                img {
                    width: 100%;
                    height: 5.3rem;
                }
            }
            .playRound {
                position: absolute;
                width: 0.9rem!important;
                height: 0.9rem!important;
                left: 37%;
                top: 33%;   
                border-radius: 50%;
                background: rgba(0, 0, 0, .4) url('./images/play_san.png') no-repeat center / 40%!important;
                z-index: 333;
                .playSan {
                    position: absolute;
                    width: 0;
                    height: 0;
                    font-size: 0;
                    border-width: 16px;
                    border-style: solid;
                    border-color: transparent transparent transparent rgba(255, 255, 255, .6);
                    left: 50%;
                    top: 50%;
                    margin-left: -5px;
                    margin-top: -16px;
                }
            }
            
            .repeat {
                position: absolute;
                width: 44px;
                height: 44px;
                left: 50%;
                top: 50%;
                margin-left: -22px;
                margin-top: -22px;
                border-radius: 50%;
                z-index: 444;
                background: #f8f8f8;
                .repeat_round {
                    width: 44px;
                    height: 44px;
                    background: url(./images/repeat.png) no-repeat center center;
                    background-size: 28px;
                }
                .repeat_text {
                    font-size: 12px;
                    color: #fff;
                    text-align: center;
                    margin-top: 4px;
                }
            }
            .black {
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                z-index: 333;
                height: 200px;
                background: rgba(0, 0, 0, .3);
            }
            .videos{
                position: relative;
                .loading {
                    position: absolute;
                    width: 50px;
                    height: 50px;
                    left: 50%;
                    top: 45%;
                    margin-left: -25px;
                    margin-top: -25px;
                    z-index: 222;
                }
            }
            .video_box {
                width: 100%;
                overflow: hidden;
                text-align: center;
                min-height: 4rem;
                video {
                    width: 100%;
                    margin: 0;
                    display: none;
                    min-height: 4rem;
                }
                
            }
        }
</style>
<style lang="less">
.mint-spinner-double-bounce-bounce1 {
  background-color: @dominantColor !important;
}
.mint-spinner-double-bounce-bounce2 {
  background-color: @dominantColor !important;
}
.mint-loadmore-top {
  height: 50px;
  line-height: 50px;
  font-size: 14px;
}
.pullLoading {
  width: 24px;
  height: 24px;
  vertical-align: middle;
  margin-top: -4px;
  margin-right: 3px;
}
.mint-loadmore-content {
  // padding-bottom: 1rem;
}
.mint-actionsheet {
  z-index: 10000 !important;
}

</style>
