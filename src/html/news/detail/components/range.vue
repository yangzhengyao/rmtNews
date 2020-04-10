<template>
    <div id="range">
        <popup-menu v-model="contentFrame1">
            <div class="share_container">
                <span v-for="(item,index) in shareBts" :key="index" class="shareItem" @click.stop="shareFunc(item)">
                    <img :src='"~@/assets/img/"+item.name+".png"'>
                    <label>{{item.title}}</label>
                </span>
            </div>
            <div class="title-box">字体调整</div>
            <!-- <div class="value-box" :style="'font-size:'+rangeValue+'px'">{{rangeValue}}</div> -->
            <div class="range-box">
                <mt-range v-model="rangeValue" :min="12" :max="30" :bar-height="5">
                </mt-range>
            </div>
        </popup-menu>
    </div>
</template>
<script>
import { get_local_cache } from '../../../../config/cache.js'
import { mapGetters, mapMutations, mapActions } from "vuex";
import { log } from 'util';
export default {
    props: ['fontSize','json'],
    data () {
        return {
            contentFrame1: false,
            rangeValue: 18,
            shareURL: `http://m.toutiaojk.com/#/detail?classid=${this.json.classid}&id=${this.json.id}&datafrom=${this.json.datafrom}`,
            shares: null,
            shareBts:[]
        }
    },
    methods: {
        ...mapActions("integral",["updateUserRecordTime"]),
        toggle () {
            this.contentFrame1 = !this.contentFrame1
        },
        shareFunc (Scene) {
            this.shareAction(Scene);
            let param = JSON.parse( localStorage.getItem('history_Article'))[0];
            // this.$parent.shareNumFunc();
            this.addReadOrShareNum({type: 2, column: param.columnName})
        },
        onSuccess() {
            Toast({
                message: "分享成功",
                position: "middle",
                duration: 1000
            });
            // this.contentFrame1 = false;
            this.updateUserRecordTime({ //分享成功调用积分接口
                userId: JSON.parse(localStorage.getItem( 'userData' )).user_id,
                appInfoId: this.apis.theme.api.appInfoId,
                expType: 9,
                recordTime: 1
            })
        },
        onError() {
            Toast({
                message: "分享失败",
                position: "middle",
                duration: 1000
            });
        },

        /**
         * 更新分享服务
         */
        updateSerivces() {
            var that=this;
            plus.share.getServices(function (s) {
                that.outLine(JSON.stringify(s))
                // let data=JSON.parse('[{"id":"qq","description":"QQ","authenticated":true,"nativeClient":true},{"id":"tencentweibo","description":"腾讯微博","authenticated":false,"accessToken":"","nativeClient":false},{"id":"weixin","description":"微信","authenticated":true,"nativeClient":true},{"id":"sinaweibo","description":"新浪微博","authenticated":true,"accessToken":"2.00unFNwGnpUszDe30d82130c03sNjy","nativeClient":true}]')
                // that.shares = {};
                // for (var i in data) {
                //     var t = data[i];
                //     that.shares[t.id] = t;
                // }

                that.shares = {};
                for (var i in s) {
                    var t = s[i];
                    that.shares[t.id] = t;
                }
                that.outLine(JSON.stringify(that.shares))
                that.shareHref();
            }, function (e) {
                that.outLine('获取分享服务列表失败：' + e.message)
                console.log('获取分享服务列表失败：' + e.message);
            });
        },

        // 分析链接
        shareHref() {
            // 更新分享列表
            var ss = this.shares['weixin'];
            ss && ss.nativeClient && (this.shareBts.push({
                title: '微信朋友圈',
                s: ss,
                x: 'WXSceneTimeline',
                name: 'wx_pyq'
            }),
            this.shareBts.push({
                title: '微信好友',
                s: ss,
                x: 'WXSceneSession',
                name: 'wx_friend'
            }));
            ss = this.shares['qq'];
            ss && ss.nativeClient && this.shareBts.push({
                title: 'QQ',
                s: ss,
                name: 'qq'
            });
            ss = this.shares['sinaweibo'];
            ss && ss.nativeClient && this.shareBts.push({
                title: '新浪微博',
                s: ss,
                name: 'weibo'
            });
            // 弹出分享列表
            // shareBts.length > 0 ? plus.nativeUI.actionSheet({
            //     title: '分享链接',
            //     cancel: '取消',
            //     buttons: shareBts
            // }, function (e) {
            //     (e.index > 0) && shareAction(shareBts[e.index - 1], true);
            // }) : plus.nativeUI.alert('当前环境无法支持分享链接操作!');
            this.outLine(JSON.stringify(this.shareBts))
        },

        /**
         * 分享操作
         * @param {JSON} sb 分享操作对象s.s为分享通道对象(plus.share.ShareService)
         * @param {Boolean} bh 是否分享链接
         */
        shareAction(sb) {
            var that=this;
            that.outLine(JSON.stringify(sb))
            var shareData=JSON.parse(get_local_cache('history_Article'))[0];
            if (!sb || !sb.s) {
                that.outLine('无效的分享服务！');
                return;
            }
            var msg = {
                extra: {
                    scene: sb.x
                }
            };
            msg.href = shareData.outUrl;
            // if (sharehrefTitle && sharehrefTitle.value != '') {
            // msg.title = sharehrefTitle.value;
            msg.title = shareData.title.slice(0,50);
            // }
            // if (sharehrefDes && sharehrefDes.value != '') {
            //   msg.content = sharehrefDes.value; 
            msg.content = shareData.newstext.replace(/<(.[^>]*)>/g,'').replace(/&nbsp;/g,'').replace(/^\s+|\s+$/g,'').slice(0,50);
            // }
            
            if(sb.s.id == 'sinaweibo' && plus.os.name=='Android'){
                msg.thumbs = ['_www/logo.png']
                msg.pictures = ['_www/logo.png']
            }else {
                msg.thumbs = shareData.img_cut_url?[shareData.img_cut_url]:shareData.titlepic!=''?[that.apis.theme.api.news.imgCompress+shareData.titlepic]:['_www/logo.png'];
                msg.pictures = shareData.img_cut_url?[shareData.img_cut_url]:shareData.titlepic!=''?[that.apis.theme.api.news.imgCompress+shareData.titlepic]:['_www/logo.png'];
            }
            
            // 发送分享
            if (sb.s.authenticated) {
                that.outLine('---已授权---');
                that.shareMessage(msg, sb.s);
            } else {
                that.outLine('---未授权---');
                sb.s.authorize(function () {
                    that.shareMessage(msg, sb.s);
                }, function (e) {
                    that.outLine('认证授权失败：' + e.code + ' - ' + e.message);
                    Toast({
                        message: "授权认证失败",
                        position: "middle",
                        duration: 1000
                    });
                });
            }
        },
        outLine(str) {
            // alert(str)
            console.log(str)
        },
        /**
         * 发送分享消息
         * @param {JSON} msg
         * @param {plus.share.ShareService} s
         */
        shareMessage(msg, s) {
            let that=this
            that.outLine(JSON.stringify(msg));
            s.send(msg, function () {
                that.outLine('分享到"' + s.description + '"成功！');
                that.onSuccess();
            }, function (e) {
                that.outLine('分享到"' + s.description + '"失败: ' + JSON.stringify(e));
                that.onError();
            });
        },
    },
    components:{
        // share
    },
    watch: {
        rangeValue(val) {
            this.$emit('fontSizeBack', val)
        }
    },
    mounted() {
        this.rangeValue = this.fontSize;
        var that=this;
        if (window.plus) {
            that.updateSerivces();
        } else {
            document.addEventListener('plusready', function () {
                that.updateSerivces();
            }, false);
        }
    }
}
</script>
<style lang='less' scoped>
#range {
    .share_container {
        width: 100%;
        padding: 20px 10px;
        display: flex;
        overflow: auto;
        text-align: center;
        .shareItem {
            flex: 1;
            min-width: 60px;
            margin: 0 5px;
            img{
                width: 50px;
                height: 50px;
                margin: 5px auto;
            }
            label{
                display: block;
                font-size: 12px;
                margin-top: 8px;
                text-align: center;
            }
        }
    }
    .title-box {
        font-size: 18px;
        padding: 10px;
    }
    .value-box {
        position: absolute;
        top: 55px;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    .range-box {
        height: 90px;
        padding: 30px 20px;
        font-size: 18px;
        
    }
}
</style>
<style lang='less'>
.mt-range-content {
    // margin: 0 50px 0 20px;
}
</style>

