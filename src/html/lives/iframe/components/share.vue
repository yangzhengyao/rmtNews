<template>
    <div id="share">
        <popup-menu v-model="contentFrame">
            <div class="share_container">
                <span v-for="(item,index) in shareBts" :key="index" class="shareItem" @click.stop="shareFunc(item)">
                    <img :src='"~@/assets/img/"+item.name+".png"'>
                    <label>{{item.title}}</label>
                </span>
            </div>
            <!-- <div class="share_container">
                <span class="wx_friend shareItem">
                    <img src="~@/assets/img/wx_friend.png">
                    <label>微信好友</label>
                </span>
                <span class="wx_pyq shareItem">
                    <img src="~@/assets/img/wx_pyq.png">
                    <label>微信朋友圈</label>
                </span>
                <span class="shareItem">
                    <img src="~@/assets/img/qq.png">
                    <label>QQ好友</label>
                </span>
                <span class="shareItem">
                    <img src="~@/assets/img/qzone.png">
                    <label>QQ空间</label>
                </span>
            </div> -->
        </popup-menu>
    </div>
</template>
<script>
import { get_local_cache } from '../../../../config/cache.js'
import { Toast } from "mint-ui"
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
    props: {
        json: {
            defalut: ''
        }
    },
    data () {
        return {
            contentFrame: false,
            shares: null,
            shareBts: []
        }
    },
    methods: {
        ...mapActions("detail", ["addReadOrShareNum"]),
        ...mapActions("integral",["updateUserRecordTime"]),
        toggle () {
            this.contentFrame = !this.contentFrame
        },
        shareFunc (Scene) {
            this.shareAction(Scene);
            // this.$parent.shareNumFunc();
            this.addReadOrShareNum({type: 2})
        },
        onSuccess() {
            Toast({
                message: "分享成功",
                position: "middle",
                duration: 1000
            });
            this.contentFrame = false;
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
            var shareData=JSON.parse(get_local_cache('./lives/iframe.html'));
            if (!sb || !sb.s) {
                that.outLine('无效的分享服务！');
                return;
            }
            var msg = {
                extra: {
                    scene: sb.x
                }
            };
            msg.href = shareData.src;
            msg.title = shareData.title;
            msg.content = '点击查看详情';
            msg.thumbs = ['_www/logo.png']
            msg.pictures = ['_www/logo.png']
            
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
    mounted() {
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
<style>
#share .functionItem {
    padding-bottom: env(safe-area-inset-bottom);
}
</style>


<style lang='stylus'>
#share {
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
    .share_box {
        padding: 15px 20px;
        .share_tip {
            padding: 0 10px;
            font-size: 16px;
        }
        .share_url {
            margin-top: 10px;
            padding: 10px;
            font-size: 14px;
            border: 1px dotted rgb(217, 217, 217);
            word-break: break-all;
            text-align: left;
        }
    }
    #popupMenu {
        .functionItem {
            background-color: #f2f2f2;
        }
        .cancle {
            border-top: none;
            background-color: #fff;
        }
    }
    .functionItem {
        padding-bottom: env(safe-area-inset-bottom);
    }
}
</style>

