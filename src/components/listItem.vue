<template>
    <ul class="listItem" :class="{'checkBox' : visible,'listItemMargin':isHaixia}">
        <!-- {{ itemJson }} -->
        <div v-for="(section,index) in itemJson" :key="index">
            <!-- 新时代 -->
            <!-- <li v-if="itemJson.flag" style="height:auto" @click="apis.urlParams('./news/xinshidai.html',{'path':'123'})">
                <img style="width: 100%" src="../assets/img/qingtongxia/xinshidai.jpg">
            </li> -->
            <!-- 学习强国 -->
            <!-- <li v-if="itemJson.xuexi" style="height:auto" @click="openApp">
                <img style="width: 100%" src="../assets/img/qingtongxia/xxqg.jpg">
            </li> -->
            <!-- 票友大赛 -->
            <!-- <li v-if="itemJson.qinqiang"  style="height: 2.21rem; background: transparent; box-shadow: none;">
                <img style="width:3.45rem;height: 100%;float:left;box-shadow: 1px 1px 3px 0px #c1c1c1;" src="../assets/img/haicang/shequ.png" @click="apis.urlParams('taiweihuodong')">
                <img style="width:3.45rem;height: 100%;float:right;box-shadow: 1px 1px 3px 0px #c1c1c1;" src="../assets/img/haicang/taibao.png" @click="apis.urlParams('twoCommunity')">
            </li> -->
            <!-- 直播 -->
            <li v-if="section.lives" @click.stop='saveData(section)' @touchmove="touchmoveFunc()" class="video-list lives-list" style="margin-top:10px">
                <!-- checkBox -->
                <div class="checkBox" v-if='visible'>
                    <input type="checkbox" :id="section.id" v-if='visible'>
                    <label :for="section.id"></label>
                    <div class="checked_btn" @click='checkBoxMethod(section)'></div>
                </div>
                <div class='video-box'>
                    <div class="video_wrapper">
                        <div class="video_info below" >
                            <!-- <div class="video_title">
                               
                            </div>
                            <div class="totalTime">{{section.playtime}}</div> -->
                            <div class="img-loading-box">
                                <!-- <img style="height:21%" src="../assets/img/img-loading.gif"> -->
                            </div>
                            <img style="display:none" :src='section.titlepic' @load="imgLoad" @error="imgError">
                            <div class="img-box" :style="{'background-image':'url('+section.titlepic+')'}"></div>
                        </div>
                        <div class="playRound">
                            <!-- <div class="playSan"></div> -->
                        </div>
                    </div>
                    <div class="box">
                            <p v-html="section.title"></p>
                            <list-info :json='section'></list-info>
                    </div>
                </div>
            </li>
            <!-- 两岸一家亲 海峡要闻 -->
            <li v-else-if="section.haixia " @click.stop='saveData(section)' @touchmove="touchmoveFunc()" class="haixia">
                <!-- checkBox -->
                <div class="checkBox" v-if='visible'>
                    <input type="checkbox" :id="section.id" v-if='visible'>
                    <label :for="section.id"></label>
                    <div class="checked_btn" @click='checkBoxMethod(section)'></div>
                </div>
                <div class="img-loading-box">
                    <!-- <img style="height:21%" src="../assets/img/img-loading.gif"> -->
                </div>
                <img style="display:none" :src='section.titlepic' @load="imgLoad" @error="imgError">
                <div class='oneLarge' :style="{'background-image':'url('+section.titlepic+')'}">
                    <div class="news_title">
                       
                    </div>
                    <div class='news'>
                        <h2 v-html="section.title"></h2>
                    </div>
                    
                </div>
            </li>
            <!-- 两岸一家亲 扶台政策 -->
            <li v-else-if='section.futai' @click.stop='saveData(section)' @touchmove="touchmoveFunc()" class="futai" :class="index == 0?'futaiIndex':''">
                <!-- checkBox -->
                <span>
                    {{ section.title }}
                </span>
                <div>
                    <span>来源：{{ section.befrom }}</span>
                    <span>时间：{{ section.time}}</span>
                </div>
                <p></p>
            </li>
            <!-- 视频 -->
            <li v-else-if="section.playonlineurl" @click.stop='saveData(section)' @touchmove="touchmoveFunc()" class="video-list">
                <!-- {{ section.playonlineurl }} -->
                <!-- checkBox -->
                <div class="checkBox" v-if='visible'>
                    <input type="checkbox" :id="section.id" v-if='visible'>
                    <label :for="section.id"></label>
                    <div class="checked_btn" @click='checkBoxMethod(section)'></div>
                </div>
                <div class='video-box'>
                    <div class="video_wrapper">
                        <div class="video_info below" >
                            <!-- <div class="video_title">
                               
                            </div>
                            <div class="totalTime">{{section.playtime}}</div> -->
                            <div class="img-loading-box">
                                <!-- <img style="height:21%" src="../assets/img/img-loading.gif"> -->
                            </div>
                            <img style="display:none" :src='section.titlepic' @load="imgLoad" @error="imgError">
                            <div class="img-box" :style="{'background-image':'url('+section.titlepic+')'}"></div>
                        </div>
                        <div class="playRound">
                            <!-- <div class="playSan"></div> -->
                        </div>
                    </div>
                    <div class="box">
                            <p v-html="section.title"></p>
                            <list-info :json='section'></list-info>
                    </div>
                </div>
            </li>

            <!-- 1张大图 -->
            <li v-else-if="section.ptitlepic" @click.stop='saveData(section)' @touchmove="touchmoveFunc()" class="big">
                <!-- checkBox -->
                <div class="checkBox" v-if='visible'>
                    <input type="checkbox" :id="section.id" v-if='visible'>
                    <label :for="section.id"></label>
                    <div class="checked_btn" @click='checkBoxMethod(section)'></div>
                </div>
                <div class="img-loading-box">
                    <!-- <img style="height:21%" src="../assets/img/img-loading.gif"> -->
                </div>
                <img style="display:none" :src='section.ptitlepic' @load="imgLoad" @error="imgError">
                <div class='oneLarge' :style="{'background-image':'url('+section.ptitlepic+')'}">
                    <div class="news_title">
                       
                    </div>
                    <div class='news'>
                        <h2 v-html="section.title"></h2>
                    </div>
                    
                </div>
            </li>
            <!-- 3张小图 -->
            <li v-else-if="section.titlepic3" @click.stop='saveData(section)' @touchmove="touchmoveFunc()">
                <!-- checkBox -->
                <div class="checkBox" v-if='visible'>
                    <input type="checkbox" :id="section.id" v-if='visible'>
                    <label :for="section.id"></label>
                    <div class="checked_btn" @click='checkBoxMethod(section)'></div>
                </div>
                <div class='threeSmall'>
                    <div class="news_title">
                        <h3 v-html="section.title"></h3>
                    </div>
                    <div class='list_img'>
                        <ul>
                            <li><img v-lazy.container='section.titlepic'></li>
                            <li><img v-lazy.container='section.titlepic2'></li>
                            <li><img v-lazy.container='section.titlepic3'></li>
                        </ul>
                    </div>
                    <list-info :json='section'></list-info>
                </div>
            </li>
            <!-- 1张小图 -->
            <li v-else-if="section.titlepic" @click.stop='saveData(section)' @touchmove="touchmoveFunc()">
                <!-- checkBox -->
                <div class="checkBox" v-if='visible'>
                    <input type="checkbox" :id="section.id" v-if='visible'>
                    <label :for="section.id"></label>
                    <div class="checked_btn" @click='checkBoxMethod(section)'></div>
                </div>
                <div class='oneSmall'>
                    <div class="news_title">
                        <div class="title-box">
                            <h3 v-html="section.title"></h3>
                        </div>
                        <list-info :json='section'></list-info>
                    </div>
                    <div class='news_img'>
                        <div class="img-loading-box img-loading-box-s">
                            <!-- <img style="height:21%" src="../assets/img/img-loading.gif"> -->
                        </div>
                        <img style="display:none" :src='section.titlepic' @load="imgLoad" @error="imgError">
                        <div class="img" :style="{'background-image':'url('+section.titlepic+')'}"></div>
                        <!-- <div class="img" :style="{'background-image':'url(/static/img/news/app_logo.png)'}"></div> -->
                    </div>
                </div>
            </li>
             <!-- 文字 -->
            <!-- <li v-else-if='section.title' @click.stop='saveData(section)' @touchmove="touchmoveFunc()" class="text-list">
                <div class="checkBox" v-if='visible'>
                    <input type="checkbox" :id="section.id" v-if='visible'>
                    <label :for="section.id"></label>
                    <div class="checked_btn" @click='checkBoxMethod(section)'></div>
                </div>
                <div class='text'>
                    <div class="title-box">
                        <h3 v-html="section.title"></h3>
                    </div>
                    <list-info :json='section'></list-info>
                </div>
            </li> -->
             <!-- 文字 -->
            <li v-else-if='section.title' @click.stop='saveData(section)' @touchmove="touchmoveFunc()" class="text-box">
                <!-- checkBox -->
                <div class="checkBox" v-if='visible'>
                    <input type="checkbox" :id="section.id" v-if='visible'>
                    <label :for="section.id"></label>
                    <div class="checked_btn" @click='checkBoxMethod(section)'></div>
                </div>
                <div class='oneSmall'> 
                    <div class="news_title">
                        <div class="title-box">
                            <h3 v-html="section.title"></h3>
                        </div>
                        <list-info :json='section'></list-info>
                    </div>
                    <div class='news_img text-img-box'>
                        <div class="img"></div>
                        <!-- <div class="img" :style="{'background-image':'url(/static/img/news/app_logo.png)'}"></div> -->
                    </div>
                </div>
            </li>

            <li v-else-if='section.type' id="lookHere">
                <p>上次看到这里，点击刷新 <i class="icon-refresh"></i></p>
            </li>
        </div>
    </ul>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import api from '../../src/assets/js/api.js'
import index from '../../store/index/index.js'
import './fonts/font.css'
export default {
    data () {
        return {
            apis:api
        }
    },
    computed: {
        ...mapGetters('index', [
          'indexActive',        // active的栏目
          'indexPage',          // 记录栏目page的对象
          'indexLocation',      // 记录栏目location的对象
          'activePage',         // active的page
          'activeLocation',     // active的location
          'indexSwiper'         // 是否正在swiper的boolean值
        ])
    },
    props: {
        itemJson: {
            default: ''
        },
        isHaixia:{
            type:Boolean
        },
        visible: {
            type: Boolean,
            default: false
        },
        checkBoxMethod: Function
    },
    methods: {
        ...mapMutations('detail', [
            'set_listArticle'
        ]),
        // url(item) {
        //     return `/detail?classid=${item.classid}&id=${item.id}&datafrom=${item.befrom}&jsonUrl=${item.jsonUrl}&time=${item.time}&title=${item.title}&content=${item.content}`
        // },
        saveData(section) {
            let that = this;
         if(section.lives){
            this.apis.urlParams(section.lives,{'title':section.title},true)
            //  this.$router.push( {  path:'/Details'} )
          }else if(section.href){
            this.apis.urlParams(section.href,{'title':section.title},true)
          }else if(section.weixin){
            this.apis.urlParams(section.outUrl,{'title':section.title},true)
          } else if(section.qinqiang || section.xinshidai || section.weixin || section.lianghui) {
              this.apis.urlParams('Details',{'path':section})
          }else {
            if( section.type == '1' ){
                //判断是否有properties 对象, 针对VR视频
                // alert( section.properties == undefined )
                if( section.properties != undefined && section.hasOwnProperty('properties') ){
                    if( section.properties.hasOwnProperty('isVr') == true && section.properties.isVr == '1'){
                        if( plus.os.name == 'iOS' ){
                            var VRparams = {};
                            VRparams['news_title'] = section.title;
                            VRparams['news_url'] = section.properties.accessUrl;
                            VRparams['news_id'] = section.id;
                            VRparams['news_copyright'] = section.befrom;
                            VRparams['news_type'] = section.type;
                            VRparams['news_channel_id'] = localStorage.getItem( 'index_Active' );
                            VRparams['submit_url'] = "http://userlog.wengetech.com:10018/log_api/checkLogByAppname";
                            if( localStorage.getItem( 'userData' ) != null ){
                              VRparams.uid = JSON.parse( localStorage.getItem( 'userData' ) ).user_id;
                            }
                            let appName = that.apis.getTheme();
                            if( appName == 'redflag' ){
                                VRparams['appname'] = 'hq_rmt';
                            } else if( appName == 'qingtongxia' ) {
                                VRparams['appname'] = 'qtx';
                            } else {
                                VRparams['appname'] = appName;
                            }
                            // var notiClass = plus.ios.importClass("ViewController");
                            // notiClass.beginVR( JSON.stringify( VRparams ) );
                             //获取ios阅读时间
                            var notiClass = plus.ios.importClass("ReadInfo");
                            if( notiClass ){
                                var readInfo = notiClass.sharedReadInfo();
                                if(readInfo.respondsToSelector(plus.ios.newObject("@selector", "beginVR:"))) {
                                // alert( '调用成功' )
                                readInfo.beginVR( JSON.stringify( VRparams ) );
                                } else {
                                // alert( '调用失败' )
                                }
                            } else {
                                // alert( '获取不到readinfo1类' )
                            }
                        } else {
                            //安卓VR
                            var VRparams = {};
                            VRparams['news_title'] = section.title;
                            VRparams['news_url'] = section.properties.accessUrl;
                            VRparams['news_id'] = section.id;
                            VRparams['news_copyright'] = section.befrom;
                            VRparams['news_type'] = section.type;
                            VRparams['news_channel_id'] = localStorage.getItem( 'index_Active' );
                            VRparams['submit_url'] = "http://userlog.wengetech.com:10018/log_api/checkLogByAppname";
                            if( localStorage.getItem( 'userData' ) != null ){
                              VRparams.uid = JSON.parse( localStorage.getItem( 'userData' ) ).user_id;
                            }
                            let appName = that.apis.getTheme();
                            if( appName == 'redflag' ){
                                VRparams['appname'] = 'hq_rmt';
                            } else if( appName == 'qingtongxia' ) {
                                VRparams['appname'] = 'qtx';
                            } else {
                                VRparams['appname'] = appName;
                            }
                            //获取当前Activity
                            var main = plus.android.runtimeMainActivity();
                            //获取java辅助类
                            var Helper = plus.android.importClass(that.apis.theme.api.rmtNews);
                            //创建对象实例
                            var mHelper = new Helper();
                            //调用java中的跳转方法，并且传入当前activity实例
                            mHelper.playVRVideo(main,JSON.stringify( VRparams ));
                            // this.apis.urlParams('Details',{'path':section})
                        }
                    } else {
                        this.apis.urlParams('Details',{'path':section})
                    }
                } else {
                    this.apis.urlParams('Details',{'path':section})
                }
            } else {
                this.apis.urlParams('Details',{'path':section})
            }
          }
        },
        openApp() {
            var that=this
            if ( plus.os.name == "Android" ) {
                plus.runtime.launchApplication( {pname:"cn.xuexi.android"}
                    , function ( e ) {
                        // plus.nativeUI.confirm( "检查到您未安装\"微信\"，是否到商城搜索下载？", function(i){
                        //     if ( i.index == 0 ) {
                        //         androidMarket( "com.tencent.mm" );
                        //     }
                        // } );
                    that.apis.urlParams('https://www.xuexi.cn',{'title':'学习强国'},true);
                } );
            } else if ( plus.os.name == "iOS" ) {
                plus.runtime.launchApplication( {action:"dtxuexi://"}, function ( e ) {
                    // plus.nativeUI.confirm( "检查到您未安装\"微信\"，是否到商城搜索下载？", function(i){
                    //     if ( i.index == 0 ) {
                    //         iosAppstore( "itunes.apple.com/cn/app/wechat/id414478124?mt=8" );
                    //     }
                    // } );
                    that.apis.urlParams('https://www.xuexi.cn',{'title':'学习强国'},true);
                } );
            }
        //	var url = "http://weixin.qq.com/r/RnUbAwvEilb1rU9g9yBU";
        //	plus.runtime.openURL( url );
        },
        touchmoveFunc() {
            // console.log('111');
            if(window.trackingClickSelf){
               window.trackingClickSelf = false; 
            }
        },
        imgLoad(event) {
            // console.log(event.currentTarget);
            event.currentTarget.previousElementSibling.parentNode.removeChild(event.currentTarget.previousElementSibling);
        },
        imgError(event) {
            // console.log(event.currentTarget.nextElementSibling);
            event.currentTarget.previousElementSibling.parentNode.removeChild(event.currentTarget.previousElementSibling);
            event.currentTarget.nextElementSibling.style.backgroundImage='url('+this.apis.theme.news.imgError+')';
        },
        videoLoadeddata(event) {
            // console.log(111)
            // var imgBox = event.currentTarget.nextElementSibling;
            // var canvas = document.createElement("canvas");
            // canvas.width = imgBox.offsetWidth;
            // canvas.height = imgBox.offsetHeight;
            // canvas.getContext('2d').drawImage(event.currentTarget, 0, 0, canvas.width, canvas.height);
            // var src=canvas.toDataURL("image/png");
            // if(src=='data:,') src=this.apis.theme.news.imgError;
            // imgBox.style.backgroundImage='url('+src+')';
            // event.currentTarget.parentNode.parentNode.removeChild(event.currentTarget.parentNode.previousElementSibling);
            // console.log(src);
            // event.currentTarget.parentNode.removeChild(event.currentTarget);
        },
        videoImgFunc() {
            var that=this;
            if(that.$refs.video!=undefined){
                // console.log(this.$refs.video);
                for(var i=0;i<that.$refs.video.length;i++){
                    that.$refs.video[i].addEventListener('loadstart',function () {
                        console.log(111);
                    });
                    that.$refs.video[i].addEventListener('durationchange',function () {
                        console.log(222);
                    });
                    that.$refs.video[i].addEventListener('loadedmetadata',function () {
                        console.log(333);
                    });
                    that.$refs.video[i].addEventListener('loadeddata',function () { // 第一帧
                        // console.log(444);
                        var imgBox = this.nextElementSibling;
                        var canvas = document.createElement("canvas");
                        canvas.width = imgBox.offsetWidth;
                        canvas.height = imgBox.offsetHeight;
                        canvas.getContext('2d').drawImage(this, 0, 0, canvas.width, canvas.height);
                        var src=canvas.toDataURL("image/png");
                        if(src=='data:,') src=that.apis.theme.news.imgError;
                        imgBox.style.backgroundImage='url('+src+')';
                        this.parentNode.parentNode.removeChild(this.parentNode.previousElementSibling);
                        // console.log(src);
                        this.parentNode.removeChild(this);
                    });
                }
            }
        }
    },
    created () {
          localStorage.getItem('index');
        //   console.log(index.state.indexActive)
    },
    mounted() {
        // this.videoImgFunc()
    },
    watch: {
        // itemJson( newData,oldData ) {
        //     this.$nextTick(function(){
        //         this.videoImgFunc()
        //     })
        // }
    }
}
</script>
<style lang='less' scoped>
.small{
    display: inline-block !important;
    margin-top: -29px !important;
    margin-left: -35px  !important;
    .news_info{
        margin-right: -33px;
        color: #8a8a8a;
        top: 49px;
        margin-left: -147px;
    }    
}
.news{
    position: absolute;
    font-size: 0.24rem;
    color: #fff;
    left: 0px;
    width: 100%;
    z-index: 9 !important;
    padding: 0.2rem 0;
    bottom: 0px;
    background:linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.2), rgba(0,0,0,0.4) 81%) !important;
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
.listItemMargin{
    margin-top: 2.4rem;
}
.listItem{
    li {
        -webkit-box-shadow: 1px 1px 3px 0px #c1c1c1;
        box-shadow: 1px 1px 3px 0px #c1c1c1;
        display: block;
        width: calc(100% - 20px);
        height:2.5rem;
        margin-top: 12px;
        background-color: #fff;
        margin:.2rem;
        margin-top: .2rem !important;
        position: relative;
        &.big{ 
            -webkit-box-shadow: 1px 1px 6px 0px #c1c1c1;
            box-shadow: 1px 1px 6px 0px #c1c1c1;
            margin: 10px;
            height: 4rem;//5.3rem;
            >img {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10;
            }
        }
        &.haixia{
            -webkit-box-shadow: 1px 1px 6px 0px #c1c1c1;
            box-shadow: 1px 1px 6px 0px #c1c1c1;
            margin: 10px;
            height: 4rem;//5.3rem;
            >img {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10;
            }
            .news{
                background: linear-gradient(rgba(0, 0, 0,.4), rgba(0, 0, 0,.6), rgba(0, 0, 0,.8) 81%) !important;
            }
        }
        &.video-list {
            height: 5.3rem;
        }
        &.text-list {
            height: auto;
            .text {
                position:relative;
                height: 100%;
                padding: 7px;
                .news_info {
                    position: static;
                    margin-top: 10px;
                }
                .title-box {
                    min-height: 48px;
                }
            }
        }
        &.video-list.lives-list {
            height: 6.1rem;
        }
        &.text-box {
            height: 1.8rem;
            h3 {
                -webkit-line-clamp: 2;
            }
        }
       
        &.futai{
            height: auto;
            display: flex;
            flex-direction: column;
            padding: .3rem .24rem;
            background: #fff !important;
            margin-bottom: 0 !important;
            margin-top: 0 !important;
            box-shadow:none;
            padding-top: 0 !important;
            padding-bottom: 0 !important;
            >span{
               font-size: .35rem;
               color: #333;
               font-weight: 500;
            }
            p{
                width: 100%;
                border: .01rem solid #ccc;
                margin: .26rem 0;
            }
            >div{
                margin-top: .23rem;
                display: flex;
                font-size: .3rem;
                color:#808080;
                >span:nth-child(1){
                    margin-right: .5rem;
                }
            }
        }
         &.futaiIndex{
            padding-top: .3rem !important;
        }
        >div {
            position:relative;
            height: 100%;
        }
        .title-box {
            width: 100%;
            height: 83%;
        }
        
        h3 {
            white-space: normal;
            font-size: 0.34rem;
            line-height: 0.48rem;
            color: #171717;
            font-weight: 400;
            padding-left: 13px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            padding: 0;
        }
        .oneSmall {
            position:relative;
            height: 100%;
            & > div{
                display: inline-block;
                vertical-align: middle;
            }
            .news_title {
                height: 100%;
                width: 64%;
                overflow: hidden;
                float: right;
                position: relative;
                padding: 7px;
            }
            .news_img {
                width: 36%;
                height: 100%;
                overflow: hidden;
                position: relative;
                .title{
                    margin-top:-10px;
                    color:white !important;
                }
                .img {
                    width: 100%;
                    height: 100%;
                    // min-height: 4.6875rem ;
                    background-repeat : no-repeat;
                    background-position : center ;
                    background-size : cover;
                }
                &.text-img-box .img {
                    background: @textList
                }
            }
        }
        
    }
    >div:first-child li {
        margin-top: 0;
        // background: none;
    }
    a {
        display: block;
        width: 100%;
        padding: 0.427rem 0;
        outline: none;
        color: #131313;
        -webkit-tap-highlight-color: rgba(0, 0, 0, .1);
        text-decoration: none;
    }
    a:visited h3 {
        color: #999;
    }

    img[lazy=loading] {
        height: 100%;
    }
    
    .oneLarge {
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        .news_img {
            width: 100%;
            margin-top: 0.16rem;
            overflow: hidden;
            height: 100%;
            position: relative;
            .jgp {
                width: 100%;
                height: 100%;
                min-height: 4.6875rem ;
                background-repeat : no-repeat;
                background-position : center ;
                background-size : cover;
            }
        }
        
    }
    .threeSmall {
        .list_img {
            width: 100%;
            margin-top: 0.16rem;
            ul {
                width: 100%;
                /*display: flex;*/
                font-size: 0;
            }
            li {
                display: inline-block;
                width: 33.3%;
                height: 1.96875rem ;
                overflow: hidden;
                margin: 0!important;
                /*flex: 1;*/
            }
            li:nth-child(2) {
                padding: 0 2px;
            }
            img {
                width: 100%;
                min-height: 1.96875rem ;
            
                  
            }
        }
    }
    .video-box {
        .video_wrapper {
            width: 100%;
            height: calc(100% - 1.4rem);
            position: relative;
            overflow: hidden;
            color: #999;
            .video_info {
                width: 100%;
                height: 100%;
                position: relative;
                .error-img {
                    width: 100%;
                }
                .img-box {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    left: 0;
                    top: 0;
                    z-index: 111;
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: cover;
                }
                .video_title {
                    position: absolute;
                    width: 100%;
                    bottom: 7px;
                    left: 0;
                    color: #fff;
                    background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, rgba(0, 0, 0, .5)), color-stop(100%, transparent));
                    z-index: 222;
                }
            }
            .totalTime {
                position: absolute;
                display: inline-block;
                width: 40px;
                right: 5px;
                bottom: 5px;
                background: rgba(0, 0, 0, .5);
                color: #fff;
                font-size: 12px;
                text-align: center;
                height: 20px;
                line-height: 20px;
                border-radius: 10px;
                z-index: 222;
            }
            .playRound {
                position: absolute;
                width: 50px;
                height: 50px;
                left: 50%;
                top: 50%;
                margin-left: -25px;
                margin-top: -25px;
                border-radius: 50%;
                // background: url('../assets/img/play.png') no-repeat center / 100%;
                background: rgba(0, 0, 0, .4) url('../assets/img/play_san.png') no-repeat center / 40%;
                z-index: 222;
                // border: 1px solid #fff;
            }
            .playSan {
                position: absolute;
                width: 0;
                height: 0;
                font-size: 0;
                border: 16px solid white;
                border-color: transparent transparent transparent rgba(255, 255, 255, .6);
                left: 50%;
                top: 50%;
                margin-left: -5px;
                margin-top: -16px;
            }
        }
        .box{
            width: 100%;
            height: 1.4rem;
            padding: 0.2rem;
            p {
                line-height: 0.48rem;
                font-size: 0.34rem;
                margin-bottom: 0.16rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
    }
    #lookHere {
        background: transparent;
        border: none !important;
        margin: 0 !important;
        box-shadow: none;
        height: auto;
        display: none;
        p {
            font-size: 12px;
            line-height: 18px;
            color: @dominantColor;
            text-align: center;
            user-select: none;
            margin: 0;
            padding: 10px 0;
        }
    }
    &.checkBox li {
        white-space: nowrap;
        position: relative;
        a {
            display: inline-block!important;
        }
        .checkBox {
            width: 30px;
            padding: 0.427rem 0;
            display: inline-block;
            vertical-align: top;
            input[type="checkbox"] {
                display: none;
            }
            label {
                position: absolute;
                top: 50%;
                left: 0;
                width: 20px;
                height: 20px;
                line-height: 20px;
                margin-top: -10px;
                background: #fff;
                border: 1px solid #aaa;
                border-radius: 100%;
                text-align: center;
            }
            input[type="checkbox"]:checked + label {
                border-color: @dominantColor;
                background-color: @dominantColor;
                color: #fff;
            }
            input[type="checkbox"]:checked + label:after {
                border: 2px solid transparent;
                border-left: 0;
                border-top: 0;
                content: " ";
                top: 3px;
                left: 6px;
                position: absolute;
                width: 4px;
                height: 8px;
                -webkit-transform: rotate(45deg) scale(0);
                transform: rotate(45deg) scale(0);
                -webkit-transition: -webkit-transform .2s;
                transition: -webkit-transform .2s;
                transition: transform .2s;
                transition: transform .2s,-webkit-transform .2s;
                border-color: #fff;
                -webkit-transform: rotate(45deg) scale(1);
                transform: rotate(45deg) scale(1);
            }
            .checked_btn {
                position: absolute;
                width: 120%;
                height: 100%;
                top: 0;
                left: 0;
                z-index: 888;
            }
        }
    }
    .img-loading-box {
        width:100%;
        height:100%;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index:300;
        position: absolute;
        top: 0;
        left: 0;
        background: @imgLoading;
        &.img-loading-box-s {
            background: @imgLoadingS;
        }
    }
    
}

</style>
<style>
.listItem li a highlight{
    color: #fe3333 !important;
    font-weight: bold;
}
</style>
