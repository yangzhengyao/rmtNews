<template>
<div id="listallnews">
  <ul class="listItem" :class="{'checkBox' : visible,'listItemMargin':isHaixia}" @scroll="handleScroll">
    <div v-for="(section,index) in itemJson" :key="index">
      <!-- 直播 -->
      <!-- <li v-if="section.lives" @click.stop="saveData(section)" @touchmove="touchmoveFunc()" class="video-list lives-list" style="margin-top:10px">
        <div class="checkBox" v-if="visible">
          <input type="checkbox" :id="section.id" v-if="visible" />
          <label :for="section.id"></label>
          <div class="checked_btn" @click="checkBoxMethod(section)"></div>
        </div>
        <div class="video-box">
          <div class="video_wrapper">
            <div class="video_info below">
              <div class="img-loading-box">
              </div>
              <img style="display:none" :src="section.titlepic" @load="imgLoad" @error="imgError" />
              <div class="img-box" :style="{'background-image':'url('+section.titlepic+')'}"></div>
            </div>
            <div class="playRound">
            </div>
          </div>
          <div class="box">
            <p v-html="section.title"></p>
            <list-info :json="section"></list-info>
          </div>
        </div>
      </li> -->
        <!-- 青铜峡学习强国 -->
        <li v-if="indexActive == '5c10f466a310abf163b4566b' && index == 0 && apis.theme.api.appName == 'qingtongxia' && !type" style="height:auto;margin-top:.3rem" @click="openApp">
            <img style="width: 100%" src="../assets/img/qingtongxia/xxqg.jpg">
        </li>
        <!-- 票友大赛 -->
        <li v-if="type && index == 0"  style="height: 2.063rem; background: transparent; box-shadow: none;margin-top:.3rem">
            <img style="width:48%;height: 100%;float:left;box-shadow: 1px 1px 3px 0px #c1c1c1;" src="../assets/img/qingtongxia/pyds.jpg" @click="apis.urlParams('firstAmateur')">
            <img style="width:48%;height: 100%;float:right;box-shadow: 1px 1px 3px 0px #c1c1c1;" src="../assets/img/qingtongxia/xmyd.jpg" @click="apis.urlParams('twoCommunity')">
        </li>
         <!-- 置顶稿件 -->
        <li  v-if=" section.hasOwnProperty('isTop') &&  section.isTop" @click.stop="saveData(section)" @touchmove="touchmoveFunc()" class="small_zhiding">
            <div class="small_left">
                <div class="title">
                    <h3 :class="[{gray:contains(readings,section.id)!=-1}]">{{ section.title }}</h3>
                </div>
                <div class="oper">
                    <!-- <span style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{ section.hasOwnProperty('groupName') && apis.theme.api.appName != 'haicang' && apis.theme.api.appName != 'qingtongxia'?section.groupName:section.befrom }}</span> -->
                     <span>
                      置顶
                    </span>
                    <span>
                      {{ section.befrom }}
                    </span>
                </div>
            </div>
            <div class="small_right"  v-lazy:background-image="section.titlepic" :key="section.titlepic" v-if="section.titlepic != ''">
            </div>
        </li>
        <li v-else-if="section.imageUrlList" class="rmt_title rmt_images">
            <div class="rmt_container">
                <div class="title">
                    <h3 :class="[{gray:contains(readings,section.id)!=-1}]">{{ section.title }}</h3>
                </div>
                <div class="item">
                  <div v-for="(imgList,index1) in section.imageUrlList" :key="index1" :style="{'background-image':'url('+imgList.src+')'}"  @click.stop="show(index,index1,imgList,section.imageUrlList)"></div>
                </div>
                <div class="oper">
                    <!-- <span>{{ section.hasOwnProperty('groupName') && apis.theme.api.appName != 'haicang' && apis.theme.api.appName != 'qingtongxia'?section.groupName:section.befrom }}</span> -->
                    <span v-if="section.hasOwnProperty('individualUserName')">
                      {{ section.individualUserName }}
                    </span>
                    <span v-else-if="section.hasOwnProperty('groupName') && apis.theme.api.appName != 'dongpo' && apis.theme.api.appName != 'naidong'">
                      {{ section.groupName }}
                    </span>
                    <span v-else>
                      {{ section.befrom }}
                    </span>
                    <span v-if="section.readNum > 0 && apis.theme.api.appName !== 'haicang'&& apis.theme.api.appName !== 'puyang' && apis.theme.api.appName !== 'leshan' && apis.theme.api.appName !== 'naidong' ">{{ section.readNum }}阅</span>
                    <span v-else></span>
                    <span v-if="apis.theme.api.appName != 'haicang'">{{ section.time }}</span>
                </div>
            </div>
        </li>
        <!-- 视频大图 -->
        <li
          v-else-if="section.playonlineurl && index%4==0"
          @click.stop="saveData(section)"
          @touchmove="touchmoveFunc()"
          class="big_video"
        >
          <div class="big_title">
              <h3 :class="[{gray:contains(readings,section.id)!=-1}]">{{ section.title }}</h3>
          </div>
          <div class="big_bg" v-lazy:background-image="section.titlepic" :key="section.titlepic">
            <div class="playRound">

            </div>
          </div>
          <div class="big_oper">
            <span>视频</span>
            <!-- <span>
              {{ section.hasOwnProperty('groupName') && apis.theme.api.appName != 'haicang' && apis.theme.api.appName != 'qingtongxia'?section.groupName:section.befrom }}
            </span> -->
            <span v-if="section.hasOwnProperty('individualUserName')">
              {{ section.individualUserName }}
            </span>
            <span v-else-if="section.hasOwnProperty('groupName') && apis.theme.api.appName != 'dongpo' && apis.theme.api.appName != 'naidong' && apis.theme.api.appName !== 'naidong'">
              {{ section.groupName }}
            </span>
            <span v-else>
              {{ section.befrom }}
            </span>

            <span v-if="section.readNum > 0 && apis.theme.api.appName != 'haicang'&& apis.theme.api.appName !== 'puyang' && apis.theme.api.appName !== 'leshan' && apis.theme.api.appName !== 'naidong' ">{{ section.readNum }}阅</span>
            <span v-else></span>
            <span v-if="apis.theme.api.appName != 'haicang'">{{ section.time }}</span>
          </div>
        </li>
        <!-- 视频小图 -->
        <li v-else-if="section.playonlineurl && index%4!=0" @click.stop="saveData(section)" @touchmove="touchmoveFunc()" class="small">
            <div class="small_left">
                <div class="title">
                    <h3 :class="[{gray:contains(readings,section.id)!=-1}]">{{ section.title }}</h3>
                </div>
                <div class="samll_oper">
                    <span>视频</span>
                    <!-- <span style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{ section.befrom }}</span> -->
                    <span v-if="section.hasOwnProperty('individualUserName')">
                      {{ section.individualUserName }}
                    </span>
                    <span v-else-if="section.hasOwnProperty('groupName') && apis.theme.api.appName == 'dongpo' && apis.theme.api.appName != 'naidong'">
                      {{ section.groupName }}
                    </span>
                    <span v-else>
                      {{ section.befrom }}
                    </span>
                    <span v-if="section.readNum > 0 && apis.theme.api.appName != 'haicang'&& apis.theme.api.appName !== 'puyang' && apis.theme.api.appName !== 'leshan' && apis.theme.api.appName !== 'naidong' ">{{ section.readNum }}阅</span>
                    <span v-else></span>
                    <span style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;" v-if="apis.theme.api.appName != 'haicang'">{{ section.time }}</span>
                </div>
            </div>
            <div class="small_right" v-lazy:background-image="section.titlepic" :key="section.titlepic">
                <div class="playRound">
                </div>
            </div>
        </li>
        <!-- 直播 -->
        <li
          v-else-if="section.lives"
          @click.stop="saveData(section)"
          @touchmove="touchmoveFunc()"
          class="big_zhibo"
        >
          <div class="big_title">
              <h3 :class="[{gray:contains(readings,section.id)!=-1}]">{{ section.title }}</h3>
          </div>
          <div class="big_bg" v-lazy:background-image="section.titlepic" :key="section.titlepic">
            <div class="playRound">

            </div>
          </div>
          <div class="big_oper">
            <span>直播</span>
            <!-- <span>{{ section.hasOwnProperty('groupName') && apis.theme.api.appName != 'haicang' && apis.theme.api.appName != 'qingtongxia'?section.groupName:section.befrom }}</span> -->
            <span v-if="section.hasOwnProperty('individualUserName')">
              {{ section.individualUserName }}
            </span>
            <span v-else-if="section.hasOwnProperty('groupName') && apis.theme.api.appName != 'dongpo' && apis.theme.api.appName != 'naidong'">
              {{ section.groupName }}
            </span>
            <span v-else>
              {{ section.befrom }}
            </span>
            <span v-if="section.readNum > 0 && apis.theme.api.appName != 'haicang'&& apis.theme.api.appName !== 'puyang' && apis.theme.api.appName !== 'leshan' && apis.theme.api.appName !== 'naidong' ">{{ section.readNum }}阅</span>
            <span v-else></span>
            <span v-if="apis.theme.api.appName != 'haicang'">{{ section.time }}</span>
          </div>
        </li>
        <!-- 1张大图 -->
        <li
          v-else-if="section.ptitlepic"
          @click.stop="saveData(section)"
          @touchmove="touchmoveFunc()"
          class="big"
        >
          <div class="big_title">
              <h3 :class="[{gray:contains(readings,section.id)!=-1}]">{{ section.title }}</h3>
          </div>
          <div class="big_bg" v-lazy:background-image="section.ptitlepic" :key="section.titlepic">
          </div>
          <div class="big_oper">
            <!-- <span>{{ section.hasOwnProperty('groupName') && apis.theme.api.appName != 'haicang' && apis.theme.api.appName != 'qingtongxia'?section.groupName:section.befrom }}</span> -->
            <span v-if="section.hasOwnProperty('individualUserName')">
              {{ section.individualUserName }}
            </span>
            <span v-else-if="section.hasOwnProperty('groupName') && apis.theme.api.appName != 'dongpo' && apis.theme.api.appName != 'naidong'">
              {{ section.groupName }}
            </span>
            <span v-else>
              {{ section.befrom }}
            </span>
            <span v-if="section.readNum > 0 && apis.theme.api.appName != 'haicang' && apis.theme.api.appName !== 'puyang' && apis.theme.api.appName !== 'leshan' && apis.theme.api.appName !== 'naidong'">{{ section.readNum }}阅</span>
            <span v-else></span>
            <span v-if="apis.theme.api.appName != 'haicang'">{{ section.time }}</span>
          </div>
        </li>
        <!-- 1张小图 -->
        <li  v-else-if="section.titlepic" @click.stop="saveData(section)" @touchmove="touchmoveFunc()" class="small">
            <div class="small_left">
                <div class="title">
                    <h3 :class="[{gray:contains(readings,section.id)!=-1}]">{{ section.title }}</h3>
                </div>
                <div class="oper">
                    <!-- <span style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{ section.hasOwnProperty('groupName') && apis.theme.api.appName != 'haicang' && apis.theme.api.appName != 'qingtongxia'?section.groupName:section.befrom }}</span> -->
                    <span v-if="section.hasOwnProperty('individualUserName')">
                      {{ section.individualUserName }}
                    </span>
                    <span v-else-if="section.hasOwnProperty('groupName') && apis.theme.api.appName != 'dongpo' && apis.theme.api.appName != 'naidong'">
                      {{ section.groupName }}
                    </span>
                    <span v-else>
                      {{ section.befrom }}
                    </span>
                    <span v-if="section.readNum > 0 && apis.theme.api.appName != 'haicang'&& apis.theme.api.appName !== 'puyang' && apis.theme.api.appName !== 'leshan' && apis.theme.api.appName !== 'naidong'">{{ section.readNum }}阅</span>
                    <span v-else></span>
                    <span style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;" v-if="apis.theme.api.appName != 'haicang'">{{ section.time }}</span>
                </div>
            </div>
            <div class="small_right" v-lazy:background-image="section.titlepic" :key="section.titlepic">
                <!-- <img class="animated slow fadeIn" alt=""> -->
            </div>
        </li>
        <!-- 1张小图 -->
        <li  v-else-if="section.audio" @click.stop="saveData(section)" @touchmove="touchmoveFunc()" class="small">
            <div class="small_left">
                <div class="title">
                    <h3 :class="[{gray:contains(readings,section.id)!=-1}]">{{ section.title }}</h3>
                </div>
                <div class="oper">
                    <!-- <span>{{ section.hasOwnProperty('groupName') && apis.theme.api.appName != 'haicang' && apis.theme.api.appName != 'qingtongxia'?section.groupName:section.befrom }}</span> -->
                    <span v-if="section.hasOwnProperty('individualUserName')">
                      {{ section.individualUserName }}
                    </span>
                    <span v-else-if="section.hasOwnProperty('groupName') && apis.theme.api.appName != 'dongpo' && apis.theme.api.appName != 'naidong'">
                      {{ section.groupName }}
                    </span>
                    <span v-else>
                      {{ section.befrom }}
                    </span>
                    <span v-if="section.readNum > 0 && apis.theme.api.appName != 'haicang'&& apis.theme.api.appName !== 'puyang' && apis.theme.api.appName !== 'leshan' && apis.theme.api.appName !== 'naidong'">{{ section.readNum }}阅</span>
                    <span v-else></span>
                    <span v-if="apis.theme.api.appName != 'haicang'">{{ section.time }}</span>
                </div>
            </div>
            <div class="small_right" v-lazy:background-image="section.titlepic" :key="section.titlepic">
                <!-- <img class="animated slow fadeIn" alt=""> -->
            </div>
        </li>
         <!-- 文字 -->
        <li  v-else-if="section.text" @click.stop="saveData(section)" @touchmove="touchmoveFunc()" class="rmt_title">
              <div class="rmt_container">
                  <div class="title">
                      <h3 :class="[{gray:contains(readings,section.id)!=-1}]">{{ section.title }}</h3>
                  </div>
                  <div class="oper">
                      <!-- <span>{{ section.hasOwnProperty('groupName') && apis.theme.api.appName != 'haicang' && apis.theme.api.appName != 'qingtongxia'?section.groupName:section.befrom }}</span> -->
                      <span v-if="section.hasOwnProperty('individualUserName')">
                        {{ section.individualUserName }}
                      </span>
                      <span v-else-if="section.hasOwnProperty('groupName') && apis.theme.api.appName != 'dongpo' && apis.theme.api.appName != 'naidong'">
                        {{ section.groupName }}
                      </span>
                      <span v-else>
                        {{ section.befrom }}
                      </span>
                      <span v-if="section.readNum > 0 && apis.theme.api.appName != 'haicang'&& apis.theme.api.appName !== 'puyang' && apis.theme.api.appName !== 'leshan' && apis.theme.api.appName !== 'naidong'">{{ section.readNum }}阅</span>
                      <span v-else></span>
                      <span v-if="apis.theme.api.appName != 'haicang'">{{ section.time }}</span>
                  </div>
              </div>
          </li>
          <li  v-else-if="section.titlepic == ''" @click.stop="saveData(section)" @touchmove="touchmoveFunc()" class="rmt_title">
              <div class="rmt_container">
                  <div class="title">
                      <h3 :class="[{gray:contains(readings,section.id)!=-1}]">{{ section.title }}</h3>
                  </div>
                  <div class="oper">
                      <!-- <span>{{ section.hasOwnProperty('groupName') && apis.theme.api.appName != 'haicang' && apis.theme.api.appName != 'qingtongxia'?section.groupName:section.befrom }}</span> -->
                      <span v-if="section.hasOwnProperty('individualUserName')">
                        {{ section.individualUserName }}
                      </span>
                      <span v-else-if="section.hasOwnProperty('groupName') && apis.theme.api.appName != 'dongpo' && apis.theme.api.appName != 'naidong'">
                        {{ section.groupName }}
                      </span>
                      <span v-else>
                        {{ section.befrom }}
                      </span>
                      <span v-if="section.readNum > 0 && apis.theme.api.appName !== 'haicang'&& apis.theme.api.appName !== 'puyang' && apis.theme.api.appName !== 'leshan' && apis.theme.api.appName !== 'naidong'">{{ section.readNum }}阅</span>
                      <span v-else></span>
                      <span v-if="apis.theme.api.appName != 'haicang'">{{ section.time }}</span>
                  </div>
              </div>
          </li>
          <!-- <li v-else-if="section.type" id="lookHere">
            <p>
              上次看到这里，点击刷新
              <i class="icon-refresh"></i>
            </p>
          </li> -->
        <div  v-transfer-dom> 
            <previewer :list="section.imageUrlList" :ref="'previewer'+index" v-if="section && section.imageUrlList"  @on-index-change="logIndexChange"></previewer>
        </div>
    </div>
  </ul>
  </div>
</template>
<script>
// import { Lazyload } from 'mint-ui';
import { mapGetters, mapMutations, mapActions } from "vuex";
import { Previewer, TransferDom } from 'vux'
import api from "../../src/assets/js/api.js";
import index from "../../store/index/index.js";
import "./fonts/font.css";
import Bus from "@/Bus";
import qs from 'qs';
export default {
  data() {
    return {
      apis: api,
      userDataid:'',
      newimglist:[],
      readings:[],
      wenlvPu:'2'
    };
  },
  computed: {
    ...mapGetters("index", [
      "indexActive", // active的栏目
      "indexPage", // 记录栏目page的对象
      "indexLocation", // 记录栏目location的对象
      "activePage", // active的page
      "activeLocation", // active的location
      "indexSwiper" // 是否正在swiper的boolean值
    ])
  },
  props: {
    itemJson: {
      default: ""
    },
    isHaixia: {
      type: Boolean
    },
    visible: {
      type: Boolean,
      default: false
    },
    type:{
      type: Boolean,
      default: false
    },
    checkBoxMethod: Function
  },
   directives: {
        TransferDom
    },
    components:{
        Previewer
    },
  methods: {
    ...mapMutations("detail", ["set_listArticle"]),
    ...mapActions("detail", ['addReadOrShareNum']),
    ...mapActions("integral",["calculateIntegral"]),
    handleScroll(event) {
       var top = event.target.scrollTop;
            Bus.$emit('changedTops',top);
    },
    logIndexChange(log){
      $(".revtop").text(this.newimglist[log.currentIndex].comment)
    },
    show (index,index1,imgList,arraylists) {
      this.$refs['previewer'+index][0].show(index1)
      this.newimglist=arraylists;
      $(".revtop").remove();
      $(".pswp__scroll-wrap").after('<div class="revtop">'+imgList.comment+'</div>')
    },
    openApp() {
        var that=this
        if ( plus.os.name == "Android" ) {
            plus.runtime.launchApplication( {pname:"cn.xuexi.android"}
                , function ( e ) {
                that.apis.urlParams('https://www.xuexi.cn',{'title':'学习强国'},true);
            } );
        } else if ( plus.os.name == "iOS" ) {
            plus.runtime.launchApplication( {action:"dtxuexi://"}, function ( e ) {
                that.apis.urlParams('https://www.xuexi.cn',{'title':'学习强国'},true);
            } );
        }
    },
    contains(arr, v) {
      for(var i=0;i<arr.length;i++){
        if (arr[i] === v) {
          return i
        }
      }
      return -1
    },
    readFn( param ){
      let that = this;
      that.axios({
          url: that.apis.theme.api.news.addReadOrShareNum,
          method: "post",
          data: {
                type: 1,
                url: param.readUrl,
                column: param.columnName,
          }
        }).then(res => {
          
        });
    },
    saveData(section) {
      let that = this;
      // this.addReadOrShareNum({type: 1, columnName: param.columnName})
      // let getRedNewsLocal = JSON.parse( localStorage.getItem('readNewsLocal') );
      // getRedNewsLocal.push(section.id)
      // localStorage.setItem('readNewsLocal',JSON.stringify(getRedNewsLocal))
      if (section.type == 3) {
        this.apis.urlParams(section.jsonUrl, { title: section.title }, true);
      } else if (section.lives) {
        this.readFn(section);
        this.apis.urlParams(section.lives, { title: section.title }, true);
        //  this.$router.push( {  path:'/Details'} )
      } else if (section.href) {
        this.readFn(section);
        this.apis.urlParams(section.href, { title: section.title }, true);
      } else if (section.weixin) {
        this.readFn(section);
        this.apis.urlParams(section.outUrl, { title: section.title,isWechat:true }, true);
      } else if ( section.qinqiang || section.xinshidai || section.weixin || section.lianghui) {
        this.apis.urlParams("Details", { path: section });
      } else {
        if (section.type == "1") {
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
                VRparams["news_type"] = section.type;
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
                    } else {

                    }
                } else {

                }
              } else {
                //安卓VR
                var VRparams = {};
                VRparams["news_title"] = section.title;
                VRparams["news_url"] = section.properties.accessUrl;
                VRparams["news_id"] = section.id;
                VRparams["news_copyright"] = section.befrom;
                VRparams["news_type"] = section.type;
                VRparams["news_channel_id"] = localStorage.getItem(
                  "index_Active"
                );
                VRparams["submit_url"] ="http://userlog.wengetech.com:10018/log_api/checkLogByAppname";
                if (localStorage.getItem("userData") != null) {
                    VRparams.uid = JSON.parse(localStorage.getItem("userData")).user_id;}
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
              this.apis.urlParams("Details", { path: section });
            }
          } else {
            this.apis.urlParams("Details", { path: section });
          }
        } else {
          this.apis.urlParams("Details", { path: section });
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
          this.addUserBrowse(postData)
      }
      that.readings = sessionStorage.readings ? JSON.parse(sessionStorage.readings):[]
        if(that.contains(that.readings,section.id)==-1){
          that.readings.push(section.id)
          sessionStorage.readings = JSON.stringify(that.readings)
      }
      plus.webview.getWebviewById(window.location.href.split('#/')[0]+'#/'+"Details").addEventListener(
        "close",
        function(e) {
          if(userDataid !== null){
            that.calculateIntegral(section)
          }
        },
        false
      );
    },
    addUserBrowse(postData){
        this.axios({
            method: "post",
            url: this.apis.theme.api.me.addUserBrowse,
            data: postData
        });
    },
    openApp() {
      var that = this;
      if (plus.os.name == "Android") {
        plus.runtime.launchApplication({ pname: "cn.xuexi.android" }, function(
          e
        ) {
          that.apis.urlParams(
            "https://www.xuexi.cn",
            { title: "学习强国" },
            true
          );
        });
      } else if (plus.os.name == "iOS") {
        plus.runtime.launchApplication({ action: "dtxuexi://" }, function(e) {
          that.apis.urlParams(
            "https://www.xuexi.cn",
            { title: "学习强国" },
            true
          );
        });
      }
    },
    touchmoveFunc() {
      if (window.trackingClickSelf) {
        window.trackingClickSelf = false;
      }
    },
    imgLoad(event) {
      event.currentTarget.previousElementSibling.parentNode.removeChild(
        event.currentTarget.previousElementSibling
      );
    },
    imgError(event) {
      event.currentTarget.previousElementSibling.parentNode.removeChild(
        event.currentTarget.previousElementSibling
      );
      event.currentTarget.nextElementSibling.style.backgroundImage =
        "url(" + this.apis.theme.news.imgError + ")";
    },
    videoLoadeddata(event) {},
    videoImgFunc() {
      var that = this;
      if (that.$refs.video != undefined) {
        // console.log(this.$refs.video);
        for (var i = 0; i < that.$refs.video.length; i++) {
          that.$refs.video[i].addEventListener("loadstart", function() {
          });
          that.$refs.video[i].addEventListener("durationchange", function() {
          });
          that.$refs.video[i].addEventListener("loadedmetadata", function() {
          });
          that.$refs.video[i].addEventListener("loadeddata", function() {
            // 第一帧
            var imgBox = this.nextElementSibling;
            var canvas = document.createElement("canvas");
            canvas.width = imgBox.offsetWidth;
            canvas.height = imgBox.offsetHeight;
            canvas
              .getContext("2d")
              .drawImage(this, 0, 0, canvas.width, canvas.height);
            var src = canvas.toDataURL("image/png");
            if (src == "data:,") src = that.apis.theme.news.imgError;
            imgBox.style.backgroundImage = "url(" + src + ")";
            this.parentNode.parentNode.removeChild(
              this.parentNode.previousElementSibling
            );
            this.parentNode.removeChild(this);
          });
        }
      }
    }
  },
  created() {
    var that = this
      if(sessionStorage.readings){
        that.readings = JSON.parse(sessionStorage.readings)
      }
    localStorage.getItem("index");
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll, true);
  },

};
</script>
<style lang='less'>
// .small {
//   display: inline-block !important;
//   margin-top: -29px !important;
//   margin-left: -35px !important;
//   .news_info {
//     margin-right: -33px;
//     color: #8a8a8a;
//     top: 49px;
//     margin-left: -147px;
//   }
// }
.news {
  position: absolute;
  font-size: 0.24rem;
  color: #fff;
  left: 0px;
  width: 100%;
  z-index: 9 !important;
  padding: 0.2rem 0;
  bottom: 0px;
  background: linear-gradient(
    rgba(0, 0, 0, 0.1),
    rgba(0, 0, 0, 0.2),
    rgba(0, 0, 0, 0.4) 81%
  ) !important;
  h2 {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-height: 1.4em;
    max-height: 2.8em;
    padding: 0 10px;
  }
}
.listItemMargin {
  // margin-top: 2.4rem;
}
.listItem {
    padding: 0 .3rem;
    li.big{
        border-bottom: 1px solid #ededed;
        .big_title{
            padding: .3rem 0;
            h3{
                font-size: @fontSize;
                color: #1a1a1a;
                padding: 0;
                line-height: normal;
                font-weight: normal;
            }
        }
        .big_bg{
            height: 4rem;
            background-position: center;
            background-repeat: no-repeat;
            border-radius: 5px;
            background-color: #f8f8f8;
            background-size: cover;
            // img{
            //     width: 100%;
            //     height: 100%;
            //     border-radius:5px;
            // }
        }
        .big_bg[lazy=loaded] {
            -webkit-animation-duration: 1s;
            animation-duration: 1s;
            -webkit-animation-fill-mode: both;
            animation-fill-mode: both;
            -webkit-animation-name: fadeIn;
            animation-name: fadeIn;
             background-size:cover;
            
        }
        .big_bg[lazy=loading] {
          background-position:center;
          background-repeat:no-repeat;
          background-size:15% 15%;
          background-color: #f8f8f8;
          background-size:none;
        }
        @keyframes fadeIn {
            0%{opacity: 0;}
            100%{opacity: 1;}
        }
        .big_oper{
            color: #999999;
            font-size: .24rem;
            padding: .3rem 0;
            span:nth-child(1){
                margin-right: .4rem;
            }
            span:nth-child(2){
                margin-right: .26rem;
            }
        }
    }
    li.big_video,
    li.big_zhibo{
        border-bottom: 1px solid #ededed;
        .big_title{
            padding: .3rem 0;
            h3{
                font-size: @fontSize;
                color: #1a1a1a;
                padding: 0;
                line-height: normal;
                font-weight: normal;
            }
        }
        .big_bg{
             height: 4rem;
             background-repeat: no-repeat;
             background-position: center;
             border-radius: 5px;
             position: relative;
             background-color: #f8f8f8;
             background-size: cover;
             .playRound {
                position: absolute;
                width: 50px;
                height: 50px;
                left: 50%;
                top: 50%;
                margin-left: -25px;
                margin-top: -25px;
                border-radius: 50%;
                background: rgba(0, 0, 0, 0.4) url("../assets/img/play_san.png")
                no-repeat center / 40%;
                z-index: 222;
            }
        }
        .big_bg[lazy=loaded] {
            -webkit-animation-duration: 1s;
            animation-duration: 1s;
            -webkit-animation-fill-mode: both;
            animation-fill-mode: both;
            -webkit-animation-name: fadeIn;
            animation-name: fadeIn;
            background-size: cover;
           
        }
        .big_bg[lazy=loading] {
          background-position:center;
          background-repeat:no-repeat;
          background-size:15% 15%;
          background-color: #f8f8f8;
           background-size: none;
        }
        @keyframes fadeIn {
            0%{opacity: 0;}
            100%{opacity: 1;}
        }
        .big_oper{
            color: #999999;
            font-size: .24rem;
            padding: .3rem 0;
            display: flex;
            align-items: center;
            span:nth-child(1){
              background:@dominantColor; 
              color: #fff;
              border-radius: 3px;
              font-size: .24rem;
              padding: .05rem .15rem;
              margin-right: .1rem;
            }
            span:nth-child(2){
                margin-right: .4rem;
            }
            span:nth-child(3){
                margin-right: .26rem;
            }
        }

    }
    li.small{
        display: flex;
        padding: .3rem 0;
        border-bottom: 1px solid #ededed;
        .small_left{
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content:space-between;
            flex: 2;
            .title{
                h3{
                    font-size: @fontSize;
                    color: #1a1a1a;
                    padding: 0;
                    line-height: normal; 
                    font-weight: normal;
                    text-overflow: -o-ellipsis-lastline;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    line-clamp: 2;
                    -webkit-box-orient: vertical;
                }
            }
            .oper{
                display: flex;
                span{
                    color: #999999;
                    font-size: .24rem;
                }
                span:nth-child(1){
                    margin-right: .4rem;
                }
                span:nth-child(2){
                    margin-right: .26rem;
                }
            }
            .samll_oper{
                color: #999999;
                font-size: .24rem;
                // padding: .2rem 0;
                display: flex;
                align-items: center;
                span:nth-child(1){
                  background:@dominantColor; 
                  color: #fff;
                  border-radius: 3px;
                  font-size: .24rem;
                  padding: .05rem .15rem;
                  margin-right: .2rem;
                }
                span:nth-child(2){
                  margin-right: .2rem;
                }
                span:nth-child(3){
                  margin-right: .2rem;
                }
            }
            
            
        }
        .small_right{
            height: 1.62rem;
            flex: 1.2;
            margin-left: .5rem;
            border-radius: 5px;
            background-position: center;
            background-repeat: no-repeat;
            background-color: #f8f8f8;
            background-size: cover;
            position:relative;
             .playRound {
                position: absolute;
                width: 0.7rem;
                height: 0.7rem;
                left: 50%;
                top: 50%;
                margin-left: -0.35rem;
                margin-top: -0.35rem;
                border-radius: 50%;
                background: rgba(0, 0, 0, 0.4) url("../assets/img/play_san.png")
                no-repeat center / 40%;
                z-index: 222;
            }
        }
        .small_right[lazy=loaded] {
            -webkit-animation-duration: 1s;
            animation-duration: 1s;
            -webkit-animation-fill-mode: both;
            animation-fill-mode: both;
            -webkit-animation-name: fadeIn;
            animation-name: fadeIn;
            background-size: cover;
        }
        .small_right[lazy=loading] {
          background-position:center;
          background-repeat:no-repeat;
          background-size:15% 15%;
           background-size:none;
          background-color: #f8f8f8;
        }
        @keyframes fadeIn {
            0%{opacity: 0;}
            100%{opacity: 1;}
        }
       
    }
    li.small_zhiding{
        display: flex;
        padding: .3rem 0;
        border-bottom: 1px solid #ededed;
        .small_left{
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content:space-between;
            flex: 2;
            .title{
                h3{
                    font-size: @fontSize;
                    color: #1a1a1a;
                    padding: 0;
                    line-height: normal; 
                    font-weight: normal;
                    text-overflow: -o-ellipsis-lastline;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    line-clamp: 2;
                    -webkit-box-orient: vertical;
                }
            }
            .oper{
                display: flex;
                span{
                    color: #999999;
                    font-size: .24rem;
                }
                span:nth-child(2){
                }
                span:nth-child(1){
                    color: #f00;
                    margin-right: .4rem;
                }
            }
            .samll_oper{
                color: #999999;
                font-size: .24rem;
                // padding: .2rem 0;
                display: flex;
                align-items: center;
                span:nth-child(1){
                  background:@dominantColor; 
                  color: #fff;
                  border-radius: 3px;
                  font-size: .24rem;
                  padding: .05rem .15rem;
                  margin-right: .2rem;
                }
                span:nth-child(2){
                  margin-right: .2rem;
                }
                span:nth-child(3){
                  margin-right: .2rem;
                }
            }
            
            
        }
        .small_right{
            height: 1.62rem;
            flex: 1.2;
            margin-left: .5rem;
            border-radius: 5px;
            background-position: center;
            background-repeat: no-repeat;
            background-color: #f8f8f8;
            background-size: cover;
            position:relative;
             .playRound {
                position: absolute;
                width: 0.7rem;
                height: 0.7rem;
                left: 50%;
                top: 50%;
                margin-left: -0.35rem;
                margin-top: -0.35rem;
                border-radius: 50%;
                background: rgba(0, 0, 0, 0.4) url("../assets/img/play_san.png")
                no-repeat center / 40%;
                z-index: 222;
            }
        }
        .small_right[lazy=loaded] {
            -webkit-animation-duration: 1s;
            animation-duration: 1s;
            -webkit-animation-fill-mode: both;
            animation-fill-mode: both;
            -webkit-animation-name: fadeIn;
            animation-name: fadeIn;
            background-size: cover;
        }
        .small_right[lazy=loading] {
          background-position:center;
          background-repeat:no-repeat;
          background-size:15% 15%;
           background-size:none;
          background-color: #f8f8f8;
        }
        @keyframes fadeIn {
            0%{opacity: 0;}
            100%{opacity: 1;}
        }
       
    }
    li.rmt_title,
    li.rmt_images{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content:space-between;
        border-bottom: 1px solid #ededed;
        padding: .3rem 0;
        .rmt_container{
            min-width: 100%;
            h3{
                font-size: @fontSize;
                color: #1a1a1a;
                padding: 0;
                line-height: normal; 
                font-weight: normal;
            }
        }
        .oper{
            display: flex;
            margin-top: .5rem;
            span{
                color: #999999;
                font-size: .24rem;
            }
            span:nth-child(1){
                margin-right: .4rem;
            }
            span:nth-child(2){
                margin-right: .26rem;
            }
        }
    }
    .rmt_images{
      .rmt_container{
         min-width: 100%;
        .item{
          display: flex;
          height: 1.68rem;
          margin-top: .3rem;
          >div{
            height: 1.62rem;
            -webkit-box-flex: 1.2;
            -ms-flex: 1.2;
            flex: 1.2;
            margin-right: .1rem;
            border-radius: 6px;
            background-position: center;
            background-repeat: no-repeat;
            background-color: #f8f8f8;
            background-size: cover;
            position: relative;
            // background-image: url('http://hongqi.wengetech.com:9080/images/201909/06/5d7229c6e4b0e296615551a4.jpeg') 
          }
          div:last-child{
            margin: 0;
          }
        }
        .oper{
          margin-top: .3rem;
        }
      }
    }
}
</style>
<style>
.listItem li a highlight {
  color: #fe3333 !important;
  font-weight: bold;
}
.pswp{z-index: 99999999!important;}
.revtop{height:1.2rem; position:absolute;bottom: 0rem;left: 0; background: rgba(0,0,0,.5);z-index: 999999;color:#fff;font-size:0.3rem; padding: 0.1rem 0.2rem;width: 100%; text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;}

#listallnews .listItem li.big .big_title h3.gray{color:#999}
#listallnews .listItem li.small .small_left .title h3.gray{color:#999}
#listallnews .listItem .small_zhiding .small_left .title{margin-bottom: .25rem;}
 #listallnews .listItem li h3.gray{color:#999}
</style>
