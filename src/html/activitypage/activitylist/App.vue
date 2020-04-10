<template>
  <div class="sinupall" id="indexHeader"  :style="{'-webkit-overflow-scrolling': scrollMode}"
    v-infinite-scroll="loadBottomAjax"
    infinite-scroll-disabled="bottomLock"
    infinite-scroll-distance="10"
    infinite-scroll-immediate-check="true">
   <div class='loaddingview' v-if="loadingtransform">
         <div class="loading"></div>
     </div>
  <header class="com_header headerNavFixed"   style="background: #fff;"   v-if="apis.getTheme() == 'tiemenguan' || apis.getTheme() == 'redflag'" :class="apis.getTheme() == 'qingtongxia' || apis.getTheme() == 'haicang' || apis.getTheme() == 'wenchang' || apis.getTheme() == 'redflag' || apis.getTheme() == 'huaning' || apis.getTheme() == 'longyang' || apis.getTheme() == 'dongpo'?'iback':'iBlackBack'">
      <div class="nvbt iback iBlackBack" @click="apis.iback()"></div>
      <div class="nvtt" style="color: #1a1a1a;">志愿者活动</div>
      <div class="nvbt idoc"></div>
    </header> 
    <div class="tiemguangantop" v-if="apis.getTheme() == 'tiemenguan'"></div>
 <div class="wrapper-list-news" :class="iphonexPadding ? 'iphonexPaddingList':''">
      <!--    <swiper :options="swiperOption" class="swiper-containerlistnew">
        <swiper-slide class="swiper-item listimgs" v-for='item in banners' :key='item.id'>
          <div class="slideimg" @click="goSignUpbaner(item)">
                <div class="slideimg-bgimg"  :style='"background-image:url("+item.titlePicUrl+")"'></div>
          </div>
          <div class="middle-tittle">{{item.name}}</div>
        </swiper-slide>
        <div class="swiper-pagination"  slot="pagination"></div>
    </swiper> -->
<mt-swipe :auto="4000">
  <mt-swipe-item class="swiper-item listimgs" v-for='item in banners' :key='item.id'>
       <div class="slideimg" @click.stop="goSignUpbaner(item)" @touchmove="touchmoveFunc()">
                <div class="slideimg-bgimg"  :style='"background-image:url("+item.titlePicUrl+")"'></div>
          </div>
        <div class="middle-tittle" >{{item.name}}</div>
  </mt-swipe-item>
</mt-swipe>
  </div>
   <div class="activtyall">
       <div class="activty-nav">
           <ul>
             <li><span :class="{active:type==1}" @click="tabClick(1)">进行中</span></li>
             <li><span :class="{active:type==0}" @click="tabClick(0)">往期</span></li>
           </ul>
       </div>
       <div class="activty-bottom">
           <!-- 活动列表循环 -->
            <div class="activty-start" v-for="(item,index) of list" :key="index" @click.stop="goSignUp(item)" @touchmove="touchmoveFunc()">
                 <div class="activty-left" :style="{'background-image':'url('+item.titlePicUrl+')'}"></div>
                 <div class="activty-right">
                      <div class="activty-title">{{item.name}}</div>
                      <div class="activty-times">{{formateDate(item.startTime,0)}}-{{formateDate(item.endTime,0)}}</div>
                      <div class="activty-address">{{item.activitiesZone}}</div>
                 </div>
                <div class="activty-end">
                     <div class="free-admission">
                          <div class="free-admission-title">{{item.perCost.length == 0?"免费":item.perCost+"元"}}</div>
                       
                          <div class="free-admission-name">{{formateDate(item.signUpEndTime,1)}} 截止报名</div>
                     </div>
                     <div class="free-admission-right">
                          <div class="free-button" v-if="item.signUpStatus =='1'">报名中</div>
                          <div class="free-button bth-gray"  v-else>已结束</div>
                          <div class="free-numbers"><font>{{item.singUpNum}}</font>/<span v-if="item.singUpCeiling==null">0</span><span v-else>{{item.singUpCeiling}}</span>人</div>
                     </div>
                </div>
            </div> 
            <!-- 数据加载状态 -->
            <div class="loading-controller">
                      <div class="tips1">
                       <div v-if="loading" style="margin:20px 0px;display: flex;flex-direction: row;align-items: center;align-self: center;justify-content: center;">
                            <img src="~@/assets/img/loadings.gif" style="width:20px;height:20px;">
                            <span style="font-size:13px;color:#63646E;margin-left:10px;">加载中...</span>
                            </div>
                         </div>
                          <div style="width:100%;font-size:13px;color:#63646E;margin-top:10px;margin-bottom:10px;text-align:center" v-if="nomore">没有更多内容了~~</div>
                        <div class='somenone' v-if="nodata">
                            <div>暂无活动</div>
                        </div>
            </div>
       </div>
      
   </div>
   
  </div>
</template>
<script>
import { Toast } from "mint-ui";
import api from "../../../../src/assets/js/api.js";
import axios from "axios";
import qs from "qs";
import Bus from '@/Bus';
export default {
    components: {},
    data() {
        return {
            //banner参数设置
             swiperOption:{
              pagination: '.swiper-pagination',
               loop: true, 
               autoplay : 2000,
              autoplayDisableOnInteraction: false,
            },
            //每页多少条数
            pageSize:10,
            //当前页
            pageNo:1,
            //点击选项卡的类型 默认是1 进行中 
            type:1,
            //真正需要渲染的活动列表
            list:[],
            //数据加载状态控制标识
            loadingFlag:0,
            scrollMode: "auto", //移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
            loading: true,
            nomore: false,
            nodata: false,
            isloading1: false,
            error: false,
            banners:[],
            titles:'',
            loadingtransform:false,
            iphonexPadding:false
        };
    },
    created() {
        // let activitylist_title = JSON.parse( localStorage.getItem('activitylist'));
        // this.titles=activitylist_title.title;
        this.getActivitiyList();
        
    },
    methods:{
         touchmoveFunc() {
            if (window.trackingClickSelf) {
                window.trackingClickSelf = false;
            }
        },
        //获取活动列表
        getActivitiyList(){
            this.loading=true;
            this.nodata=false;
            axios({
                method: "post",
                url: api.theme.api.news.activitylists,
                data:{
	            pageNo:this.pageNo,pageSize:this.pageSize,isEnd:this.type,tenant: api.theme.api.appName
               },
              headers:{'Content-Type':'application/json; charset=utf-8'},
            }).then(res => {
                let data = res.data;
                let arr = data.data
                console.log(data.success)
            if(data.success==true){
                if(this.type==1){
                    if( arguments.length == 0){
                        this.banners=data.data.slice(0,4); 
                    }
                }
             if (this.pageNo == 1) {
                        if (data.data.length == 0) {
                            this.loading=false;
                            this.nomore=false;
                            this.nodata=true;
                        } else if (data.data.length < 10) {
                            this.loading=false;
                            this.nomore=false;
                            this.nodata=false;
                        } else {
                            this.loading=true;
                            this.nomore=false;
                            this.nodata=false;
                            this.isloading1=true;
                        }
              }else{
                    if (data.data.length < 10) {
                            this.loading=false;
                            this.nomore=true;
                            this.nodata=false;
                            this.isloading1=false;
                        } else {
                            this.loading=true;
                            this.nomore=false;
                            this.nodata=false;
                        }
                 }
                   this.loadingtransform=false;
                   this.list= data.data;
                }else{
                    // Toast({
                    //     message:'网络异常',
                    //     position:"middle",
                    //     duration:1500
                    //  });
                     this.loadingtransform=false
                };
            });
        },
        //点击选项卡更改渲染的活动列表
        tabClick(type){
            //模拟加载
            this.list = [];
                if(type == '1'){//进行中
                    this.type = 1;
                    this.getActivitiyList()
                }else{
                    this.type = 0;
                    this.getActivitiyList()
                }
                this.pageNo = 1;//当前页重置为 1
        },
        //时间格式处理
        formateDate(dateStr,type){
            return type == 0?dateStr.slice(0,-3).replace(/-/g,"/"):dateStr.slice(5,-3).replace(/-/g,"/")
        },
        replacestr(itmesimgs){
           return  itmesimgs.replace(/\\/g,"/");
        },
        //去报名 参数id是活动id
        goSignUp(item){
            var that=this;
             if( localStorage.getItem( 'userData' ) != null ){
                this.apis.urlParams('activitydetails',{'title':item},false);
            } else {
                api.urlParams('Login')
            }
              plus.webview.getWebviewById(window.location.href.split('#/')[0]+'#/'+"activitylist").addEventListener(
                "close",
                function(e) {
                that.pageNo = 1;
                that.getActivitiyList()
                },
                false
             );
        },
          goSignUpbaner(item){
            var that=this;
             if( localStorage.getItem( 'userData' ) != null ){
                this.apis.urlParams('activitydetails',{'title':item},false);
            } else {
                api.urlParams('Login')
            }
              plus.webview.getWebviewById(window.location.href.split('#/')[0]+'#/'+"activitylist").addEventListener(
                "close",
                function(e) {
                that.pageNo = 1;
                that.getActivitiyList()
                },
                false
             );
        },
      
        //滚动加载更多方法
        loadBottomAjax(){
             var that = this;
            this.loadingtransform=false;
            if (that.isloading1 == true) {
                this.pageNo++;
                console.log(this.pageNo);
                that.getActivitiyList();
            }
        },
        plusready(){

         }
    },
      mounted() {
      var that = this;
      if (window.plus) {
      that.plusready();
      } else {
      document.addEventListener(
      "plusready",
      that.plusready(),
      false
      );
      }
      if( this.apis.iphonexPaddingFn() ){
        this.iphonexPadding = true;
      }
        Bus.$on('changeNum',()=>{
            this.list = [];
            this.getActivitiyList();
        })
},
};
</script>
<style lang="stylus" scoped>
.activtyall{ width:100%; overflow hidden; margin-top:0rem;}
.activty-nav{width:100%;height:0.85rem; border-bottom:1px solid #e8e8e8;}
.activty-nav ul li{ color: #999999; font-size:0.3rem;width:49.9%; float left; text-align:center; line-height:0.76rem; }
.activty-nav ul li span{display:inline-block; }
.activty-nav ul li span.active{color:#be2c1f; font-weight:800}
.activty-nav ul li span.active:after{ border-bottom:2px solid #be2c1f; display:block; width:0.4rem;height:2px;content:''; margin:0 auto;}
.activty-bottom{width:100%; overflow:hidden; padding-bottom:1rem}
.activty-start{width:90%; height:3.6rem;box-shadow: 0px 1px 10px 0px rgba(64, 83, 128, 0.3);border-radius:6px; margin:0.4rem auto 0 auto ; padding 0.18rem}
.activty-start .activty-left{ width:1.97rem;height:1.97rem;border-radius:6px;
background-color: #f2f2f2;background-repeat: no-repeat;background-position: center;background-size:cover; float left}
.activty-start .activty-right{ width:4.2rem; float:right; }
.activty-start .activty-title{ font-size:0.3rem;
line-height:0.4rem;margin-top:0.11rem;text-overflow: -o-ellipsis-lastline;overflow: hidden; text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;
  line-clamp: 2;-webkit-box-orient: vertical;}
.activty-start .activty-times{ font-size:0.24rem; color:#808080;margin-top:0.2rem}
 .activty-start .activty-address{font-size:0.24rem; color:#808080; margin-top:0.18rem} 
.activty-end{width:100%; overflow hidden; clear:both}
.activty-end .free-admission{ width:60%; float:left;margin-left:0.2rem}
.activty-end .free-admission .free-admission-title{ font-size:0.3rem; color:#be2c1f;margin-top:0.3rem}
.activty-end .free-admission .free-admission-name{ color:#4c4c4c;font-size:0.26rem;margin-top:0.2rem}
.activty-end .free-admission-right{ float:right;margin-right:0.2rem;}
.activty-end .free-button{width:1.58rem;height:0.58rem;background:#be2c1f;font-size:0.28rem; color:#fff; text-align:center;line-height:0.58rem;border-radius:50px;margin-top:0.2rem}
.activty-end .bth-gray{background:#B3B3B3}
.free-admission-right .free-numbers{color:#808080;font-size:0.26rem;margin-top: 0.12rem;text-align:right}
.free-admission-right .free-numbers font{color:#be2c1f;}
.banners .swiper-box-banner .swiper-slide-box-box .swiper-slide-img-box{ border-radius:0;width: 100% !important;}
.somenone{ font-size:16px;color:#63646E; margin-top:20%; text-align:center;}
.wrapper-list-news {margin-top:0.3rem}
.wrapper-list-news .middle-tittle{ position:absolute;height:0.7rem;line-height:0.7rem;  background: linear-gradient(to bottom, rgba(255,0,0,0), rgba(0,0,0,1));width:100%;bottom:0; font-size:0.3rem;color:#fff;padding-left:0.3rem}
.wrapper-list-news{ width:100%;position:relative;top:0; height: 3.575rem;}
.wrapper-list-news .listimgs img{ width: 100%; height: 100%;}
.wrapper-list-news .swiper-containerlistnew{width:100%;   height: 3.575rem;}
.wrapper-list-news .swiper-containerlistnew .swiper-pagination-bullets{left:65%; width:40%;bottom:3%}
.wrapper-list-news .slideimg{width:100%;height: 3.575rem;}
.wrapper-list-news .slideimg-bgimg{  background-repeat: no-repeat;background-position: center;background-size: contain;height: 100%; width: 100%; }
.tiemguangantop{margin-top:1.2rem}
</style>
<style>
.wrapper-list-news .swiper-pagination-bullet{ background: #ccc}
.wrapper-list-news .swiper-pagination-bullet.swiper-pagination-bullet-active{width:20px;height:4px;    border-radius:5px; background: #ffffff}
.loaddingview{width: 100%;height: 100%;position: fixed;top:0;left: 0;z-index:999999999;background: #fff}
.loaddingview .loading{position: fixed;top: 35%;left: 50%;margin: -20px 0 0 -20px;width: 40px;height: 40px;border: 2px solid;border-color: #fd4d4d #fd4d4d transparent;border-radius: 50%;box-sizing: border-box;animation: loading 1s linear infinite;z-index: 99999999999999991;}
@keyframes loading{0%{transform: rotate(0deg);}
100%{transform: rotate(360deg);}}
.iphonexPaddingList{ margin-top:1rem !important; }
.wrapper-list-news .mint-swipe-indicators{left:80%;bottom:0rem}
</style>


