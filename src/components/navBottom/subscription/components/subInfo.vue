<template>
    <div>
        <header class="com_header headerNavFixed" style="background: #fff;">
            <div class="nvbt ibackBack" @click="apis.iback()"></div>
            <div class="nvtt" style="color: #1a1a1a;">详情</div>
            <div class="nvbt idoc"></div>
        </header>
        <div class="mainFea contentNavFixed com_contentNavFixed" :class="{is_ios: iphonexPadding}">
            
            
            <div
                class="container swiper-box-special"
                infinite-scroll-disabled="bottomLock"
                infinite-scroll-distance="10"
                v-infinite-scroll="loadBottomAjax"
                infinite-scroll-immediate-check="false"
                :class="type"
            >
                <!-- 请求提示 -->
                <my-loading :visible="loading"></my-loading>
                <my-error :visible="error" :method="init"></my-error>

                <!-- 顶部提示 -->
                <div class="globalTip">
                <!-- <div class="dataCount">已为你推荐{{dataCount}}条新内容</div> -->
                <div class="dataCount">已加载最新内容</div>
                <div class="noNewData">没有最新的内容了</div>
                <div class="requestFail">网络请求失败,请检查网络</div>
                </div>

                <!-- 下拉加载 -->
                <mt-loadmore
                :top-method="loadTopAjax"
                @translate-change="translateChange"
                @top-status-change="handleTopChange"
                ref="loadmore"
                :auto-fill="false"
                >
                <!-- 下拉提示 -->
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
                
                <!-- <subhot v-if="indexActive=='5d0221a6e4b0ed2aef82fd991'"></subhot>
                <subscript v-if="indexActive=='5d0221a6e4b0ed2aef82fd971'"></subscript> -->
                <div class="main">
                    <div class="subtitel">
                        <img :src="dispostPic(subInfo.subscribeImage)" alt="">
                        <dl>
                            <dt>{{subInfo.subscribeName}}</dt>
                            <dd>{{subInfo.description}}</dd>
                            <dd class="subnum"><span>{{subInfo.subscribeCount}}</span> 订阅</dd>
                        </dl>
                        <div @click="clickFollow(subInfo.foucs,subInfo.id)" v-if="!subInfo.foucs">订阅</div>
                        <div @click="clickFollow(subInfo.foucs,subInfo.id)" v-if="subInfo.foucs">已订阅</div>
                    </div>
                    <!-- <keep-alive> -->
                        <subltemlist :itemJson="contentJson" :isType="isType" v-if=contentJson.length > 0 '></subltemlist>
                        <div class="zanWu" v-if="contentJson.length == 0">没有更多的内容了</div>
                    <!-- </keep-alive> -->
                </div>
                <!-- 底部提示 -->
                <div class="bottomLoad" v-if="contentJson.length > 0">
                    <div class="loading" v-show="bottomLoading">加载中...</div>
                    <div class="noData" v-if="bottomNoData">没有更多的内容了</div>
                </div>
                </mt-loadmore>
            </div>
        </div>
    </div>
        
</template>
<script>
import { Toast } from "mint-ui";
import subltemlist from "../children/subItemList"
export default {
    name:"subInfo",
    data(){
        return{
            contentJson: [],        // 整个列表数据
            dataCount: 0,           // 推荐文章数量
            topStatus: '',          // 下拉状态
            bottomLock: false,      // 上滑开关
            bottomLoading: false,    // 底部loading
            bottomNoData: false,    // 底部nothing
            loading: false,
            error: false,
            isSub:true,
            userDataid:'',
            subId:'',
            subInfo:'',
            type:'vall',
            pageNum:1,
            isType:1,
            iphonexPadding:false
        }
    },
    components: {
        subltemlist
    },
    methods: {
        ctrlSub(){
           this.isSub = !this.isSub; 
        },
        dispostPic(pic){
            let isHave = pic && pic.indexOf(",");
            if(isHave){
                var s = pic.split(",");
                return s[0];
            }else{
                return pic;
            }
        },
        loadBottomAjax () {
            if (!this.bottomNoData) {
                this.bottomLock = true
                this.bottomLoading = true;
                var postData = {
                  "appInfoId":this.apis.theme.api.appInfoId,
                  "userId":this.userDataid,
                  "pageNum":this.pageNum,
                  "pageSize":10,
                  "individualUserIds":this.subId
                }
                this.axios({
                  method: "post",
                  url: this.apis.theme.api.news.infoListByColumnId,
                  data: postData
                })
                .then(res => {
                  if( res.data.success ){
                    if (res.data.data[0].list.length > 0 ) {
                      $(`.container.${this.type} .dataCount`).slideDown(200).delay(1000).slideUp(200)
                        this.contentJson.push(...res.data.data[0].list);
                        // localStorage.setItem('contentJsons',JSON.stringify(this.contentJson));
                        this.pageNum++;
                    } else {
                        this.bottomNoData = true
                    }
                    this.bottomLoading = false
                    this.bottomLock = false
                    // this.$refs.loadmore.onTopLoaded();
                  }
                })
                // .then(res => {
                //     if (!res.data.data.lastPage) {
                //         this.pageNum++;
                //         if(this.pageNum == 2){
                //             this.loadBottomAjax();
                //         }
                //     } else {
                //         this.bottomNoData = true
                //     }
                //     this.bottomLoading = false
                //     this.bottomLock = false
                // })
            }   
        },
        loadTopAjax(){
            let that = this;
            var postData = {
                "appInfoId":this.apis.theme.api.appInfoId,
                // "appInfoId":1,
                "userId":this.userDataid,
                "pageNum":0,
                "pageSize":10,
                "individualUserIds":this.subId
            }
            this.axios({
                method: "post",
                url: this.apis.theme.api.news.infoListByColumnId,
                data: postData
            })
            .then(res => {
            if( res.data.success ){
                $(`.container.${this.type} .dataCount`).slideDown(200).delay(1000).slideUp(200)
                if (res.data.data[0].list.length > 0 ) {
                    this.bottomNoData = false;
                    this.pageNum = 1;
                    this.contentJson = res.data.data[0].list;
                    // localStorage.setItem('contentJsons',JSON.stringify(this.contentJson));
                    this.isType = 1;
                } else {
                    this.bottomNoData = true;
                    this.isType = 0;
                }
                    this.bottomLoading = false
                    this.bottomLock = false
                    this.$refs.loadmore.onTopLoaded();
            }
            })
              //网络请求加载数据  省略
            this.$refs.loadmore.onTopLoaded();
        },
        init(){
            this.loadTopAjax();
            this.getSubInfo();
        },
        translateChange(translate){
            let that = this;
            // if(translate < 1){
            //     setTimeout(function(){
            //         document.getElementsByClassName(that.type)[0].scrollTop = 1
            //     },50)
            // }
        },
        handleTopChange(status) {
            this.topStatus = status
        },
        getDataid(){
            let userDataid = JSON.parse(localStorage.getItem("userData"));
            if( userDataid !== null){
                this.userDataid = userDataid.user_id;
            }else{
                this.userDataid = null;
            }
        },
        getSubInfo(){
            let that = this;
            let datas = {
                "id": this.subId,
                "userId":this.userDataid
            }
            this.axios({
                method:"post",
                url:that.apis.theme.api.subscription.selectById,
                data:datas
            })
            .then(res => {
                if(res.data.success){
                    that.subInfo = res.data.data[0]
                }
            })
        },
        clickFollow(foucs,sid) {
            //判断是否关注 或  取消关注
            let that = this;
            let url,postData;
            if(!this.userDataid){
                console.log("loai")
                this.apis.urlParams("Login");
                return
            }
            if( foucs ){
                url = that.apis.theme.api.subscription.cancelSubscribe;
            } else {
                url = that.apis.theme.api.subscription.addSubscribeUser;
            }
            postData = {
                "subscribeId": sid,
                "userId":this.userDataid
            }
            that.axios({
                method: "post",
                url: url,
                data: postData
            }).then(res => {
                if (res.data.success ) {
                    that.subInfo.foucs = !foucs;
                    if (foucs) {
                        Toast({
                            message: "取消订阅",
                            position: "middle",
                            duration: 1000
                        });
                        this.subInfo.subscribeCount -= 1;
                    } else {
                        Toast({
                            message: "订阅成功",
                            position: "middle",
                            duration: 1000
                        });
                        this.subInfo.subscribeCount += 1;
                    }
                } 
            });
        },
    },
    mounted () {
        this.subId = JSON.parse(localStorage.getItem("subinfo")).id;
        this.getSubInfo();
        this.loadTopAjax();
    },
    created () {
        if (this.apis.iphonexPaddingFn()) {
            this.iphonexPadding = true;
        }
        this.getDataid();
        // let cont = localStorage.getItem('contentJsons');
        // if(cont){
        //     this.contentJson = JSON.parse(cont);
        // }
    }
}
</script>
<style lang="less" scoped>
    .com_header{
        border-bottom: 0.02rem solid #e6e6e6;
    }
    .mainFea{
        height:100vh;
        padding-top: 0.9rem;
        overflow-y: auto;
        -webkit-overflow-scrolling: auto;
        background: #fff;
    }
    .main{
        background: #fff !important;
    }
    .subtitel{
        font-size: 0.32rem;
        display: flex;
        flex-flow: column;
        align-items: center;
        border-bottom: 0.14rem solid rgba(247,247,247,1);
        padding-top: 0.2rem;
        img{
            width: 1.3rem;
            height: 1.3rem;
            margin-bottom: 0.25rem;
            border-radius: 50%;
        }
        dl{
            width: 5.5rem;
            text-align: center;
            
            dt{
                font-size: 0.36rem;
                font-weight: bold;
                margin-bottom: 0.25rem;
            }
            dd{
               font-size: 0.26rem;
               color: #999999; 
               margin-bottom: 0.25rem;
            }
            .subnum{
                font-size: 0.3rem;
                color: #000;
                span{
                    color: #E32519;
                }
            }
        }
        div{
            text-align: center;
            width: 1.3rem;
            height: 0.62rem;
            line-height: 0.62rem;
            background: #FFF4CA;
            border-radius:0.1rem;
            margin-bottom: 0.35rem;
        }
    }
    .container {
        height: cacl(100vh - 1.88rem);
        -webkit-overflow-scrolling: touch;
        position: relative;
        overflow:scroll;
        .globalTip {
            position: absolute;
            // top: .2rem;
            left: 0;
            right: 0;
            z-index: 99999999999;
            div {
            height: 0.64rem;
            line-height: 0.64rem;
            font-size: 0.28rem;
            // color: #2a90d7;
            // background: rgba(213, 233, 247, .9);
            text-align: center;
            display: none;
            color: #f56767;
            background: #FBE9EF;
            }
        }

        .mint-loadmore {
            min-height: 100%;
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
    }
    .zanWu{
        font-size:0.32rem;
        color:#999999;
        margin-top:3rem;
        margin-left:2.5rem;
    }
    .is_ios {
        padding-top: 1.7rem!important;
    }
</style>