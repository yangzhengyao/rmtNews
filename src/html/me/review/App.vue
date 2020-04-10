<template>
  <div id="review">
    <header class="com_header headerNavFixed">
      <div class="nvbt iback" @click="apis.iback()"></div>
      <div class="nvtt">我的收藏</div>
      <div class="nvbt idoc" style="font-size:.32rem;" @click="edit">{{ isCheckbox ? '取消':'编辑' }}</div>
    </header>
    <!-- 正文 -->
    <div class="content contentNavFixed com_contentNavFixed" style="margin-top:.3rem">
      <div
        class="container"
        :style="{'-webkit-overflow-scrolling': scrollMode}"
        v-infinite-scroll="loadBottomAjax"
        infinite-scroll-disabled="bottomLock"
        infinite-scroll-distance="10"
        infinite-scroll-immediate-check="true"
        style="background:#fff"
      >
        <div class="certificate" :class=" certificate_pdd ? 'certificate_pdd':''">
          <!-- <div class="banner">
              <img src="./images/wz1.png" alt>
          </div>-->
          <mt-loadmore
            :top-method="loadTop"
            :auto-fill="true"
            ref="loadmore"
            :bottom-all-loaded="false"
            @top-status-change="handleTopChange"
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
            <div class="contanier">
              <div v-for="(item,index) in json" :key="index">
                <div class="item" @click.stop="detailFn(item)" @touchmove="touchmoveFunc()">
                  <div
                    class="contanier_checkbox"
                    v-if="isCheckbox"
                  >
                    <input type="checkbox" v-model="item.state" name="checkbox" @click.stop="checkedOne(item.userFavorites)">
                  </div>
                  <div class="contanier_img" :style="{'background-image':'url('+JSON.parse(item.jsonData).titlepic.split(' ')[0]+')'}" v-if="JSON.parse(item.jsonData).titlepic">
                    <!-- apis.theme.imgHost  root-->
                    <!-- <img src="./images/default.jpg" alt v-if="item.img_url == '[]'">
                    <img :src="item.img_url" alt v-else> -->
                    <!-- <img :src="apis.theme.imgHost+item.images[0].images" alt> -->
                  </div>
                  <div class="contanier_img" :style="{'background-image':'url('+JSON.parse(item.jsonData).img_cut_url+')'}" v-else-if="JSON.parse(item.jsonData).img_cut_url">
                  <!-- <div class="contanier_img" style="{'background-image':'url('./images/default.jpg'}" v-else> -->
                    <!-- apis.theme.imgHost  root-->
                    <!-- <img src="./images/default.jpg" alt v-if="item.img_url == '[]'">
                    <img :src="item.img_url" alt v-else> -->
                    <!-- <img :src="apis.theme.imgHost+item.images[0].images" alt> -->
                  </div>
                  <div class="contanier_msg" :class="{nopic:!JSON.parse(item.jsonData).img_cut_url}">
                    <p>{{ JSON.parse(item.jsonData).title }}</p>
                    <div>
                      <span>{{ item.insertTime }}</span>
                      <!-- <span>{{ item.name }}</span> -->
                    </div>
                  </div>
                </div>
              </div>
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
    <!-- 删除提示框 -->
    <div class="navbar" @click="del" v-if="isCheckbox">
      <span><i style="margin-right:3px;font-style: normal;">删除</i>（{{ delArr.length }}）</span>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import axios from "axios";
import qs from "qs";
import Bus from '@/Bus';

//引入主页
import { Header, Toast, Loadmore } from "mint-ui";
import noData from "components/noData.vue";
const root = process.env.API_ROOT;
export default {
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      title: "问政",
      json: [],
      root: root,
      bottomLock: true, // 上滑开关
      topStatus: "", //下拉状态
      bottomLoading: false, // 底部loading
      bottomNoData: false, // 底部nothing
      scrollMode: "auto", //移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
      isCheckbox: false,
      certificate_pdd: false,
      delArr: [], //删除数组
      userDataid:''
    };
  },
  components: {
    "v-loadmore": Loadmore
  },
  methods: {
    touchmoveFunc() {
      if (window.trackingClickSelf) {
          window.trackingClickSelf = false;
      }
    },
    ...mapMutations("detail", ["set_listArticle"]),
    ...mapActions("detail", ['addReadOrShareNum']),
    //跳转新闻详情
    detailFn(section){
      if(this.isCheckbox){
        return    
      }
      let that = this;
      // this.addReadOrShareNum({type: 1, columnName: param.columnName})
      if (section.lives) {
          this.apis.urlParams(section.lives, { title: section.title }, true);
          //  this.$router.push( {  path:'/Details'} )
      } else if (section.href) {
          this.apis.urlParams(section.href, { title: section.title }, true);
      } else if (section.weixin) {
          this.apis.urlParams(section.outUrl, { title: section.title,isWechat:true }, true);
      } else if ( section.qinqiang || section.xinshidai || section.weixin || section.lianghui) {
          this.apis.urlParams("Details", { path: section });
      } else {
        if (JSON.parse(section.jsonData).type == "1") {
      //判断是否有properties 对象, 针对VR视频
      // alert( section.properties == undefined )
          if (
              section.properties != undefined &&
              section.hasOwnProperty("properties")
              ) {
              if ( section.properties.hasOwnProperty("isVr") == true && section.properties.isVr == "1" ) {
                  if (plus.os.name == "iOS") {
                    var VRparams = {};
                    VRparams["news_title"] = section.title;
                    VRparams["news_url"] = section.properties.accessUrl;
                    VRparams["news_id"] = section.id;
                    VRparams["news_copyright"] = section.befrom;
                    VRparams["news_type"] = JSON.parse(section.jsonData).type;
                    VRparams["news_channel_id"] = localStorage.getItem("index_Active");
                    VRparams["submit_url"] = "http://userlog.wengetech.com:10018/log_api/checkLogByAppname";
                    if (localStorage.getItem("userData") != null) {
                      VRparams.uid = JSON.parse(localStorage.getItem("userData")).user_id;
                    }
                    let appName = that.apis.getTheme();
                    if (appName == "redflag") {
                      VRparams["appname"] = "hq_rmt";
                    } else if (appName == "qingtongxia") {
                      VRparams["appname"] = "qtx";
                    } else {
                      VRparams["appname"] = appName;
                    }
                    // var notiClass = plus.ios.importClass("ViewController");
                    // notiClass.beginVR( JSON.stringify( VRparams ) );
                    //获取ios阅读时间
                    var notiClass = plus.ios.importClass("ReadInfo");
                    if (notiClass) {
                      var readInfo = notiClass.sharedReadInfo();
                      if (readInfo.respondsToSelector(plus.ios.newObject("@selector", "beginVR:"))) {
                        readInfo.beginVR(JSON.stringify(VRparams));
                      } 
                    } 
                  } else {
                    //安卓VR
                    var VRparams = {};
                    VRparams["news_title"] = section.title;
                    VRparams["news_url"] = section.properties.accessUrl;
                    VRparams["news_id"] = section.id;
                    VRparams["news_copyright"] = section.befrom;
                    VRparams["news_type"] = JSON.parse(section.jsonData).type;
                    VRparams["news_channel_id"] = localStorage.getItem(
                    "index_Active"
                    );
                    VRparams["submit_url"] ="http://userlog.wengetech.com:10018/log_api/checkLogByAppname";
                    if (localStorage.getItem("userData") != null) {
                      VRparams.uid = JSON.parse(localStorage.getItem("userData")).user_id;
                    }
                    let appName = that.apis.getTheme();
                    if (appName == "redflag") {
                      VRparams["appname"] = "hq_rmt";
                    } else if (appName == "qingtongxia") {
                      VRparams["appname"] = "qtx";
                    } else {
                      VRparams["appname"] = appName;
                    }
                    //获取当前Activity
                    var main = plus.android.runtimeMainActivity();
                    //获取java辅助类
                    var Helper = plus.android.importClass(that.apis.theme.api.rmtNews);
                    //创建对象实例
                    var mHelper = new Helper();
                    //调用java中的跳转方法，并且传入当前activity实例
                    mHelper.playVRVideo(main, JSON.stringify(VRparams));
                  // this.apis.urlParams('Details',{'path':section})
                  }
              } else {
                this.apis.urlParams("Details", { path: JSON.parse(section.jsonData) });
              }
          } else {
            this.apis.urlParams("Details", { path: JSON.parse(section.jsonData) });
          }
        } else {
          this.apis.urlParams("Details", { path: JSON.parse(section.jsonData) });
        }
      }
      let userDataid = JSON.parse(localStorage.getItem("userData"));
      if( userDataid !== null){
        this.userDataid = userDataid.user_id;
      }
      if(this.userDataid){
        var postData = {
          "userId":this.userDataid,	
          "browseType":1,
          "browseContentId":section.id
        }
          // this.addUserBrowse(postData)
      }
    },

    // detailFn(item){
    //   console.log("sndjandjk");
      
    //   if(this.isCheckbox) return;
    //   if( item.type == 1 ){
    //     item['jsonUrl'] = item.data;
    //   } else {
    //     item['id'] = item.data;
    //   }
    //   let detailObj = localStorage.setItem('Details',JSON.stringify( { path:item } ));
    //   let that = this;
    //   this.apis.urlParams("Details",{ path: item });
    //   plus.webview.getWebviewById(window.location.href.split('#/')[0]+'#/'+"Details").addEventListener(
    //     "close",
    //     function(e) {
    //       that.pageNum = 1
    //       that.Init('top')
    //     },
    //     false
    //   );
    // },
    
    //选中收藏栏目（可选多个）
    checkedOne(autoId) {
      let idIndex = this.delArr.indexOf(autoId);
      if (idIndex >= 0) {
        //如果已经包含就去除
        this.delArr.splice(idIndex, 1);
      } else {
        //如果没有包含就添加
        this.delArr.push(autoId);
      }
    },
    edit() {
      this.isCheckbox = !this.isCheckbox;
      this.certificate_pdd = !this.certificate_pdd;
    },
    /**
     * 删除收藏新闻
     * @param auto_ids 收藏的唯一ID，多个用英文,分隔
     */

    //获取用户信息
    getDataid(){
      let userDataid = JSON.parse(localStorage.getItem("userData"));
      if( userDataid !== null){
        this.userDataid = userDataid.user_id;
      }else{
        this.userDataid = false;
      }
    },
    //删除选中收藏（可同时删多个）
    del() {
      let that=this
      
      this.delArr.map(item=>{
        let data={
          "userFavorites":item,
          "userId":that.userDataid,
          "appInfoId":that.apis.theme.api.appInfoId
        }
        that.axios({
          method: "post",
          url: that.apis.theme.api.community.delUserFavorites,
          data: data
        }).then(res => {
          if( res.data.success){
            this.delArr = [];
            Toast({
              message: '删除成功',
              duration: 2000
            });
            that.Init("top");
            setTimeout(function(){
              that.loadTop();
              that.isCheckbox = false;
            },2100)
          }
        });
      });
    },
    //判断是否有dep_id
    isDepid(autoId) {},
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
    //初始
    Init(isTop) {
      let that = this;
      let postData={
        "userId":that.userDataid,
        "searchContent":"",
        "type":"2",
        "appInfoId":that.apis.theme.api.appInfoId
      }
      if (isTop == "bottom") {
        if (!this.bottomNoData) {
          this.bottomLoading = true;
        }
      }
      this.axios({
        method: "post",
        url: that.apis.theme.api.me.seachUserFavContent,
        data: postData
      }).then(res => {
        // console.log(res,'iiiiiiiiiiiiiiiiii');
        this.json = res.data.data;
        if (res.data.success) {
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
    }
    //初始
    // Init(isTop) {
    //   let that = this;
    //   let postData = {
    //     pageNum: this.pageNum,
    //     pageSize: this.pageSize
    //   };
    //   if (isTop == "bottom") {
    //     if (!this.bottomNoData) {
    //       this.bottomLoading = true;
    //     }
    //   }
    //   this.axios({
    //     method: "post",
    //     // root + "/my_al/my/getUserCollect"
    //     // that.apis.theme.api.me.getUserCollect
    //     url: that.apis.theme.api.me.getUserCollect,
    //     data: qs.stringify(postData)
    //   }).then(res => {
    //     if (res.data.status == "1") {
    //       if (isTop == "top") {
    //         this.json = [];
    //         this.json = this.json.concat(res.data.data.list);
    //         this.json["state"] = true;
    //       } else if (isTop == "bottom") {
    //         this.json = this.json.concat(res.data.data.list);
    //       }
    //       this.json.forEach( (item,index) => {
    //         if( item.title.length > 34 ){
    //           item.title = item.title.substring(0,item.title.length-14) + "..."
    //         } 
    //       })
    //       //判断是否是最后一页，禁止上拉加载
    //       if (res.data.data.lastPage == false) {
    //         this.pageNum += 1;
    //         this.bottomLock = false;
    //         this.bottomNoData = false;
    //       } else {
    //         this.bottomNoData = true;
    //         this.bottomLock = true;
    //       }
    //       this.bottomLoading = false;
    //       this.$nextTick(function() {
    //         this.scrollMode = "touch";
    //       });
    //     }
    //   });
    // },
  },
  mounted() {
    this.getDataid();
    this.Init("top");
  },
  created () {
        this.getDataid();
        Bus.$on('stateListNe',(val) =>{
            this.infoList = val;
            this.infoList.forEach((v,i) => {
                let str = JSON.parse(v.jsonData).titlepic;
                if(str){
                    if(str.indexOf(" ")){
                        var s = str.split(" ");
                        this.infoList[i].titlepic = s[0];
                    }else{
                        this.infoList[i].titlepic = false;
                    }
                }else{
                    this.infoList[i].titlepic = false;
                }
                
            });
            this.infoList.forEach((item,ind) => {
                let strs = JSON.parse(item.jsonData);
                let tempArr = [];
                tempArr.push({
                    type: strs.type,
                    id: strs.id,
                    title: strs.title,
                    befrom: strs.source,
                    time: strs.time,
                    titlepic: strs.image_url!=null?strs.image_url:false, // 缩略图
                    ptitlepic: ind%5==0&&strs.image_url!=null?strs.image_url:false, // 大图
                    playonlineurl: strs.stroyType=='VIDEO'?strs.video_url:false, // 视频
                    lives: strs.stroyType=='ZHIBO'?strs.video_url:false, // 直播
                    href: strs.stroyType=='HREF'?strs.url:false, // 
                    jsonUrl: strs.jsonUrl,
                    readNum: strs.read_num,
                })
                this.infoList[ind].tempArrs = tempArr;
            })
        });
        Bus.$on('pageAndContent',(val) =>{
            this.pageNo = val.pageNo;
            this.searchContent = val.searchContent;
            this.bottomNoData = val.NoData;
        });
        Bus.$on('islnfoListNe',(val) =>{
            this.islnfoListNe = val;
            if(!this.islnfoListNe){
                this.bottomNoData = true;
            }
            
        });
    }
};
</script>
<style lang='less' scoped>
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
#review {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: #f8f8f8;
  header{
    background: @headerBg;
    .nvtt{
      font-size: .36rem;
      font-weight: 500;
      color:@headerColor;
    }
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
    .contanier {
      display: flex;
      flex-direction: column;
      // margin-bottom: 50px;
      .item {
        display: flex;
        margin-bottom: 0.3495rem;
        .contanier_checkbox {
          display: flex;
          align-items: center;
          width: 1.5rem;
          justify-content: center;
        }
        .contanier_img {
           width: 36%;
           height: 1.695rem;
           background-repeat: no-repeat;
           background-position: center;
           background-size: cover;
          img {
           
          }
          margin-right: 0.22rem;
        }
        .contanier_msg {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 64%;
          p {
            font-size: 0.333rem;
            color: #262626;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
          }
          > div {
            align-items: center;
            display: flex;
            span {
              flex: 1;
              font-size: 0.2475rem;
              color: #999999;
            }
            button {
              font-size: 0.2475rem;
              color: @dominantColor;
              border: 0.015rem solid @dominantColor;
              line-height: 1;
              background: #fff;
              border-radius: 10%;
              padding: 0.045rem 0.075rem;
            }
          }
        }.nopic{
          width: 100%;
          p {
            line-height: 1.4rem;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
          }
        }
      }
    }
  }
  .certificate_pdd {
    padding-right: 0 !important;
  }
  .navbar {
    position: fixed;
    bottom: 0;
    left: 0;
    background: @dominantColor;
    height: 50px;
    width: 100%;
    text-align: center;
    font-size: 0.333rem;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
<style lang="less">
.mint-loadmore-top {
  font-size: 14px;
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
 input[type=checkbox]{
        /*去除浏览器默认样式*/
        -webkit-appearance: none;
        -webkit-tap-highlight-color:#fff;
        -moz-appearance: none;
        appearance: none;
        /*自定义样式*/
        position: relative;
        display: inline-block;
        vertical-align: top;
        width: 20px;
        height: 20px;
        border: 1px solid @dominantColor;
        outline: none;
        cursor: pointer;
        /*设置为圆形，看起来是个单选框*/
        -webkit-border-radius: 20px;
        -moz-border-radius: 20px;
        border-radius: 20px;
        -webkit-background-clip:text;
        -webkit-text-fill-color:transparent;
    }
 
    /**
    * 单选框 选中之后的样式
    **/
    input[type=checkbox]:after{
        content: '';
        position: absolute;
        width: 12px;
        height: 12px;
        display: block;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        background: @dominantColor;
        -webkit-border-radius: 12px;
        -moz-border-radius: 12px;
        border-radius: 12px;
        -webkit-transform: scale(0);
        -moz-transform: scale(0);
        transform: scale(0);
        /*增加一些动画*/
        -webkit-transition : all ease-in-out 300ms;
        -moz-transition : all ease-in-out 300ms;
        transition : all ease-in-out 300ms;
        -webkit-appearance: none;
    }
    input[type=checkbox]:checked:after{
        -webkit-transform: scale(1);
        -moz-transform: scale(1);
        transform: scale(1);
        -webkit-appearance: none;
        -webkit-background-clip:content-box;
        -webkit-text-fill-color:@dominantColor;
    }
</style>
