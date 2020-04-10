<template>
    <article id="article" v-if="json">
        <!-- 信息 -->
        <div class="article_info">
            <h1 class="title">{{json.title}}</h1>
            <div class="befrom-box">
                <!-- {{json.columnName}} -->
                <img v-if="json.columnName != '个人号'" :src='"~@/assets/img/"+apis.getTheme()+"/"+apis.getTheme()+".png"' class="touImg1">
                <img v-else :src="json.subImg" class="touImg1">
                <div class="spans">
                    <span v-if="json.columnName != '个人号'" class="befrom" @click="json.befrom=='云上青铜峡'?apis.urlParams('../me/share.html'):''">
                    {{ json.properties && json.properties.hasOwnProperty('groupName') && apis.theme.api.appName == 'dongpo'?json.properties.groupName:json.befrom }}
                    </span>
                    <span v-else class="befrom" @click="json.befrom=='云上青铜峡'?apis.urlParams('../me/share.html'):''">
                    {{ json.subName }}
                    </span>
                    <span class="newstime">{{json.time}}</span>
                </div>
                
                <div class="audio-btn" @click="audioPlay" v-if="audioHidden && apis.getTheme() != 'hangkong'">
                    <img src="../images/audio_loading.gif" alt style="height:20px" v-if="!audioHiddenUrl">
                    <img :src='"~@/assets/img/playIcon.png"' alt v-else-if="audioPlaying">
                    <img :src='"~@/assets/img/stopIcon.png"' alt v-else-if="!audioPlaying">
                    语音播报
                    <audio :src="audioHiddenUrl" controls style="display:none" ref="audioHidden" @ended="audioEnd"></audio>
                </div> 
            </div>
            <!-- 阅读量 -->
            <div v-if="apis.getTheme() !='leshan' && apis.getTheme() !='haicang' && apis.getTheme() !='dongpo'" style="display: flex; align-items: center;margin-top: 5px;color:#777;" :style="{display: json.number?'none':'' }">
                <span style="margin-right: 10px;">浏览量：<span class="blackSpan">{{ readNum }}</span></span>
                |
                <span style="margin-left: 10px;margin-right: 10px;">分享量：<span class="blackSpan">{{ shareNum }}</span></span>
                |
                <span style="margin-left: 10px;">点赞量：<span class="blackSpan">{{ likeNum }}</span></span>
            </div>
        </div>

        <!-- 音频 -->
        <template v-if="json.audioUrl">
            <div class="article_audio">
                <audio :src="json.audioUrl" controls="controls" preload='auto'></audio>
            </div>
        </template>
        
        <!-- 视频 -->
        <template v-if="json.playonlineurl">
            <div class="article_video">
                <div class="video" :class="{'video-fixed': video_fixed}">
                    <template v-if="video_poster">
                        <div class="video_info" :style='"background-image:url("+json.img_cut_url+");"'>
                            <!-- <img :src="json.titlepic"> -->
                        </div>
                        <div class="playRound" @click.stop="videoPlay">
                            <!-- <div class="playSan"></div> -->
                        </div>
                    </template>
                    <template v-if="video_ended">
                        <div class="video_info" :style='"background-image:url("+json.img_cut_url+");"'>
                            <!-- <img :src="json.titlepic"> -->
                        </div>
                        <div class="repeat">
                            <div class="repeat_round" @click.stop="videoPlay"></div>
                            <p class="repeat_text">重播</p>
                        </div>
                        <div class="black"></div>
                    </template>
                    <div class="videos">
                        <div class="loading" v-show='video_loading'>
                            <mt-spinner :type="0" :size='50'></mt-spinner>
                        </div>
                        <div class="video_box" id="video_box">
                            <video ref='video' :controls='!video_poster' :key='json.playonlineurl' x5-playsinline="true" playsinline="true" webkit-playsinline="true">
                                <source :src="json.playonlineurl" type="video/mp4">
                            </video>
                        </div>
                    </div>
                    
                </div>
            </div>
            <section class="article_content">
                <div class="content_html imglistprev" v-html='delHtmlTag(json.newstext)' :style="'font-size:'+fontSize+'px'" @click="previewImage"></div>
            </section>
        </template>
        <!-- 文字 & 图片 -->
        <template v-else>
            <section class="article_content">
                <!-- <div style="width:100%;" v-if="json.marker"><img style="width:100%" v-lazy.container='json.titlepic'></div> -->
                <div class="content_html imglistprev" ref="contentHtml" :style="'font-size:'+fontSize+'px'" v-html='delHtmlTag(json.newstext)'  @click="previewImage"></div>
                <p class="summary" v-if="json.summary">{{ json.summary }}</p>
            </section>
        </template>
        <div v-transfer-dom>
            <previewer :list="list" ref="previewer"  @on-index-change="logIndexChange"></previewer>
        </div>
        <div class="article_info" v-if="apis.getTheme() =='dongpo'">
            <!-- 阅读量 -->
            <div v-if="apis.getTheme() !='leshan' && apis.getTheme() !='haicang'" style="display: flex; align-items: center;margin-top: 5px;color:#777;" :style="{display: json.number?'none':'' }">
                <span style="margin-right: 10px;">浏览量：<span class="blackSpan">{{ readNum }}</span></span>
                |
                <span style="margin-left: 10px;margin-right: 10px;">分享量：<span class="blackSpan">{{ shareNum }}</span></span>
                |
                <span style="margin-left: 10px;">点赞量：<span class="blackSpan">{{ likeNum }}</span></span>
            </div>
        </div>
    </article>
</template>
<script>
import apis from '../../../../assets/js/api.js'
import { mapGetters, mapMutations, mapActions } from "vuex"
import { Previewer, TransferDom } from 'vux'
export default {
    props: ['json','fontSize','audioHiddenUrl','audioHidden'],
    data() {
        return {
            video: '',              // video元素
            video_poster: true,     // video封面
            video_playing: false,   // video是否播放
            video_ended: false,     // video是否播放结束
            video_loading: false,   // video是否正在缓冲
            video_fixed: false ,     // video是否悬浮
            h5video: null,
            audioPlaying: false,
            list:[],
            isIOS:false
        }
    },
    computed: {
        ...mapGetters("detail", [
            "readNum",
            "shareNum",
            "likeNum"
        ])
    },
    directives: {
        TransferDom
    },
    components:{
        Previewer
    },
    watch: {
        fontSize(){
           console.log(this.fontSize)
        },
        
        json(val) {
            this.$nextTick(() => {
                this.video = this.$el.querySelector('video')
                this.video_poster = true
                this.video_playing = false
                this.video_ended = false
                this.video_loading = false
                this.video_fixed = false
                if( val.imgurl ){
                    this.list = val.imgurl.split(' ')
                    let imagesArr = val.imgurl.split( ' ' );
                    for( let i = 0; i<imagesArr.length; i++ ){
                        imagesArr[i] = {
                            'src':imagesArr[i],
                            'w': 600,
                            'h': 600
                        }
                    }
                    this.list = imagesArr;
                } 
            })
        },
    },
    methods: {
        logIndexChange( log ){
        },
        videoPlay() {
            $('video').show();
            this.video = this.$el.querySelector('video')
            this.video.play()
            this.videoEvent()
            // this.videoFixed()
        },
        
        videoEvent() {
            // 播放
            this.video.onplay = () => {
                this.video_playing = true
                this.video_poster = false
                this.video_ended = false
                // if( this.apis.getTheme() == 'haicang' ){
                //     if(!this.isIOS){   //通知安卓,使屏幕可横屏
                //         var main = plus.android.runtimeMainActivity();
                //         var Helper = plus.android.importClass(that.apis.theme.api.rmtNews);
                //         var mHelper = new Helper();
                //         mHelper.userScreen(main);
                //     }
                // }
            }
            // 暂停
            this.video.onpause = () => {
                this.video_playing = false
                this.video_loading = false
                // if( this.apis.getTheme() == 'haicang' ){
                //     if(!this.isIOS){   //通知安卓,使屏幕不可横屏
                //         var main = plus.android.runtimeMainActivity();
                //         var Helper = plus.android.importClass(that.apis.theme.api.rmtNews);
                //         var mHelper = new Helper();
                //         mHelper.verticalScreen(main);
                //         console.log("调用暂停")
                //     }
                // }
            }
            // 等待
            this.video.onwaiting = () => {
                this.video_loading = true
                console.log(455555)
            }
            // 可以播放
            this.video.oncanplay = () => {
                this.video_loading = false
            }
            // 结束
            this.video.onended = () => {
                this.video_ended = true
                // if( this.apis.getTheme() == 'haicang' ){
                //     if(!this.isIOS){   //通知安卓,使屏幕不可横屏
                //         var main = plus.android.runtimeMainActivity();
                //         var Helper = plus.android.importClass(that.apis.theme.api.rmtNews);
                //         var mHelper = new Helper();
                //         mHelper.verticalScreen(main);
                //     }
                // }
            }
        },
        videoFixed() {
            // let videoTop = $('.video').position().top   // video元素相对于屏幕上方的距离
            // $('#detail .container').on('scroll', (event) => {
            //     event.preventDefault()
            //     // 滚动到video元素 && video正在播放
            //     if ($('#detail .container').scrollTop() >= videoTop && this.video_playing) {
            //         this.video_fixed = true
            //     } else {
            //         this.video_fixed = false
            //     }
            // })

        },
        backTo() {
            // 监听应用是否回到手机后台，是就暂停播放。（效果可在手机上查看）
            document.addEventListener('pause', () => {
                if (this.video) {
                    this.video.pause()
                }
            }, false)
        },
        
        plusReady(){
            var that=this
            // that.h5video = new plus.video.createVideoPlayer('video_box',{
            //     // src:'http://hd.yinyuetai.com/uploads/videos/common/0D7601345B999963CD41FB5D5CF356C0.flv'
            //     src: that.json.playonlineurl,
            //     top:'200px',
            //     left:'0px',
            //     width: '100%',
            //     height: '300px',
            //     position: 'absolute'
            // });
            // plus.webview.currentWebview().append(that.h5video);
            
            that.h5video = new plus.video.VideoPlayer('video_box',{
                src: that.json.playonlineurl
            });
            
            that.h5video.addEventListener('play', function(){
                updatePlaying(true);
            }, false);
            that.h5video.addEventListener('pause', function(){
                updatePlaying(false);
            }, false);
        },
        // 更新为播放状态
        updatePlaying(play) {
            if(play){
                this.video_playing = play
                this.video_poster = !play
                this.video_ended = !play
            }else {
                this.video_playing = play
                this.video_loading = play
            }
        },
        playReady() {
            this.plusReady()
            this.updatePlaying(true)
        },
        AndroisIos(){   //判断是否是安卓
            let u = navigator.userAgent;
            let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
            let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            if (isAndroid) {
                return this.isIOS = false;
            } else if (isIOS) {
                return this.isIOS = true;
            }
        },
        audioPlay() {
            if(this.audioHiddenUrl) {
                if(this.audioPlaying){
                    this.$refs.audioHidden.pause()
                }else {
                    this.$refs.audioHidden.play()
                }
                this.audioPlaying=!this.audioPlaying
            }
        },
        audioEnd() {
            this.audioPlaying=false;
        },
        previewImage (e) {
            if (e.target.nodeName == 'IMG') {
                let url = e.target.currentSrc;
                let dafult = 0;
                for( let i = 0;i < this.list.length; i++ ){
                    if( url ==  this.list[i].src ){
                        dafult = i;
                    }
                }
                this.$refs.previewer.show(dafult);
            } else {
                return;
            }
        },
    delHtmlTag(str)
        {
        return String(str).replace(/header/g,'div')
        }
    },
    mounted() {
       
        var that=this
        this.backTo()
        $('.content_html').on('click','a',function(event){
            event.stopPropagation();
            event.preventDefault();
            let href = $(this).attr('href')
            apis.urlParams(href,{'title':'详细信息'},true)
            return false;
        });
        this.AndroisIos();
        if( !this.isIOS ){
            document.addEventListener('webkitfullscreenchange', function() {  
                var el = document.webkitFullscreenElement; //获取全屏元素  
                if(el) {  
                    plus.screen.lockOrientation('landscape'); //锁死屏幕方向为横屏  
                } else {  
                    plus.screen.lockOrientation('portrait-primary'); //锁死屏幕方向为竖屏  
                }  
            })
        } 
        
    }
}
</script>
<style lang='less' >
#article {
    width: 100%;
    position: relative;
    .article_info {
        font-size: .28rem;
        overflow: hidden;
        background: #fff;
        padding: 0 0.257rem 0.4rem;
        background: #fff;
        .befrom-box {
            position: relative;
            margin-bottom: 15px;
            .audio-btn {
                position: absolute;
                top: 0.18rem;
                right: 0;
                height: .54rem;
                width: 1.84rem;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: .26rem;
                color: #fff;
                border-radius: .3rem;
                background-color: @dominantColor;
                img {
                    height: .26rem;
                    margin-right: .1rem;
                }
                
            }
            .spans{
                height: .50rem;
                width: 5rem;
                position: absolute;
                left: 1rem;
                top:2px;
                .befrom{
                    position: absolute;
                    left: 0.16rem;
                    top: .1rem;
                    display: block;
                    font-size: .3rem;
                    font-weight:700;
                }
                .newstime {
                    margin-top: 0.1rem;
                    font-size: 0.24rem;
                    position: absolute;
                    top: 0.52rem;
                    left: 0.15rem;
                }
            }
            .touImg1{
                width: 0.9rem;
                height: 0.9rem;
                margin-top: 0.06rem;
                border-radius: 50%;
                display: inline-block
            }
            
        }
        
        span {
            color: #777;
        }
        .title {
            color: #000;
            font-size: .44rem;
            font-weight: bold;
            padding: 0.4rem 0;
        }
        .befrom {
            display: block;
            font-size: .32rem;
            color: #1a1a1a;
            margin-bottom: 5px;
            width: calc(100% - 100px);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
    .blackSpan{
        color: #000!important;
    }
    .article_audio {
        width: 100%;
        padding: 0 0.257rem;
        audio {
            width: 100%
        }
    }
    .article_video {
        width: 100%;
        margin-bottom: 20px;
        .video {
            position: relative;
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
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            z-index: 111;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            height: 5.3rem;
            margin: 0 .257rem;
            img {
                width: 100%;
                height: 5.3rem;
            }
        }
        .playRound {
            position: absolute;
            width: 48px;
            height: 48px;
            left: 50%;
            top: 50%;
            margin-left: -24px;
            margin-top: -24px;
            border-radius: 50%;
            background: rgba(0, 0, 0, .4) url('../../../../assets/img/play_san.png') no-repeat center / 40%;
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
                background: url(../images/repeat.png) no-repeat center center;
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
            position:relative;
            padding-bottom:70.25%;   
            height: 0;
            video {
                position: absolute;
                top:0;
                left: 0;
                width: 100%;
                height: 100%; 
                background: #000
            }
        }
    }
    .article_content {
        position: relative;
        color: #333;
        font-size: 18px !important;
        line-height: 0.1rem;
        padding: 0 0.257rem 0;
        background-color: #fff;
        .summary{
            line-height: .6rem;
            text-indent:20px
        }
        .content_html {
            // overflow: hidden;
            text-indent: none !important;
            font-size: inherit;
            line-height: 0.6rem;
            position: relative;
            header {
                position: absolute !important;
            }
            figure{
                margin: 0;
                padding: 0;
                line-height: 0.1rem;
            }
            figure span{
                line-height: .6rem !important;
            }
            figure img{
                width: 100% !important;
                height: auto !important;
                margin-bottom: 0.3rem!important;
            }
            figure figcaption{
                margin-bottom: .2rem;
            }
            // p img {
            //     width: 100% !important;
            //     height: auto !important;
            //     padding: 0.3rem 0;
            // }
            center>img {
                width: 100% !important;
                height: auto !important;
            }
            img[type="icon"]{
                width: initial!important;
            }
            table {
                width: 100% !important;
                td{
                    border: .01rem solid #333;
                }
            }
            video {
                width: 100%;
                margin: 0;
            }
            *{
                // text-align: justify !important;
                text-justify: inter-ideograph !important;
                font-size: inherit !important;

            }
            div,p{
                width: 100% !important;
                margin-bottom: 0.02rem;
                font-size: .34rem;
            }
            p.xhs_style {
                text-indent: 2em !important;
            }
        }
        // img{
        //     width: 100%;
        // }
    }
}
.pswp{
    z-index: 10000 !important;
}
.pswp__img{
    height: auto !important;
}
.pswp__button--fs,
.pswp__button--close{
  display: none !important;
}
.pswp__counter{
    right: 0;
    bottom: 0;
    left: auto !important;
    top: auto;
}
.pswp__top-bar{
      right: 0;
    bottom: 0;
    left: auto !important;
    top: auto !important;
}
</style>
<style>
#article .article_content .imglistprev img{max-width: 100% !important;height: auto !important; display: block}
</style>

