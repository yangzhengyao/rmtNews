<template>
    <div
    class="newsB container nesbox circBox"  
    v-infinite-scroll="loadBottomAjax"
    infinite-scroll-disabled="bottomLock"
    infinite-scroll-distance="10"
    infinite-scroll-immediate-check="false"
    >
        <div class="newBox" v-for="(item,index) in infoList" :key="index" v-if="islnfoListNe">
            <dl>
                <dt>{{item.insertTime.split(' ')[0].slice(5)}}</dt>
                <dd>{{item.insertTime.slice(0,4)}}年</dd>
            </dl>
            <div class="boxRight" @click="jumpDta(item.tempArrs[0], item)">
                <div class="newImg" v-if="item.titlepic"><img :src="item.titlepic" alt=""></div>
                <div class="centext" :id="!item.titlepic ? 'centextSe' : ''">
                    <p>{{JSON.parse(item.jsonData).title}}</p>
                    <img class="del" src="../../infoList/image/del.png" alt="" @click.stop="deletaNews(index,item.tempArrs[0])">
                </div>
            </div>
        </div>
        <div v-if="!islnfoListNe" class="zanWu">暂无内容</div>
        <div class="bottomLoad" v-if="infoList.length > 0">
          <div class="loading" v-show="bottomLoading">加载中...</div>
          <div class="noData" v-if="bottomNoData">没有更多的内容了</div>
        </div>
    </div>
</template>
<script>
import Bus from "@/Bus";
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
    name:'News',
    data(){
        return{
            bottomLock: false,      // 上滑开关
            bottomLoading: false,    // 底部loading
            bottomNoData: false,    // 底部nothing
            userDataid:'',
            pageNo:2,
            pageSize:10,
            infoList:[],
            islnfoListNe:true,
            searchContent:''
        }
    },
    methods: {
        ...mapMutations("detail", ["set_listArticle"]),
        ...mapActions("detail", ['addReadOrShareNum']),
        ...mapActions("integral",["calculateIntegral"]),
        jumpDta(section){
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
        deletaNews(index, tempArrs){
            let that  = this;
            var param = {};
            plus.nativeUI.confirm("确定删除这条动态吗？", function(e) {
            // 确定回调
            if (e.index == 0) {
                if(that.browseType == 2){
                    param = {
                        "userFavorites":data,
                        "userId":that.userDataid,
                        "appInfoId":that.apis.theme.api.appInfoId
                    }
                    that.axios({
                        method: "post",
                        url: that.apis.theme.api.news.delUserFavorites,
                        data: param
                    }).then(res => {
                    if (res.data.success) {
                        that.infoList.splice(index,1)
                        plus.nativeUI.alert("删除成功", function() {}, "提示", "确定");
                    }
                    });
                }else{
                    
                    // param = {
                    //     "browseContentId":auto_id,
                    //     "userId":that.userDataid,
                    //     "appInfoId":that.apis.theme.api.appInfoId
                    // };
                    param = {
                        "userFavorites":tempArrs.jsonUrl,
                        "userId":that.userDataid,
                        "appInfoId":that.apis.theme.api.appInfoId
                    }
                    that.axios({
                        method: "post",
                        url: that.apis.theme.api.news.delUserFavorites,
                        data: param
                    }).then(res => {
                    if (res.data.success) {
                        that.infoList.splice(index,1)
                        plus.nativeUI.alert("删除成功", function() {}, "提示", "确定");
                    }
                    });
                }
                
            }
            });
        },
        loadBottomAjax () {
            var that=this;
            if (!this.bottomNoData) {
                this.bottomLock = true
                this.bottomLoading = true
                var postData = {
                "userId":this.userDataid,	
                "searchContent":this.searchContent,
                "type":2,
                "pageNo":this.pageNo,
                "pageSize":10,
                "appInfoId":that.apis.theme.api.appInfoId}
            this.axios({
                method: "post",
                url: this.apis.theme.api.me.seachUserFavContent,
                data: postData
                }).then(res => {
                    if (res.data.data.length > 0 ) {
                        this.infoList.concat(res.data.data);
                        this.pageNo++;
                        if(res.data.end){
                            that.bottomNoData = true;
                        }
                    } else {
                        that.bottomNoData = true;
                    }
                    that.bottomLoading = false;
                    that.bottomLock = false;
            });
            }
        },
        getDataid(){
			let userDataid = JSON.parse(localStorage.getItem("userData"));
			if( userDataid !== null){
				this.userDataid = userDataid.user_id;
			}else{
				this.userDataid = false;
			}
        },
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
                    url:strs.url
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
}
</script>
<style lang="less" scoped>
.newsB{
    height: calc(80vh - 0.6rem);
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
}
.zanWu{  
    font-size:0.32rem;
    color:#999999;
    margin-top:3rem;
    margin-left:3rem;
}
.newBox{
    display: flex;
    font-size: 0.3rem;
    margin: 0.35rem 0.25rem;
    dl{
        width: 1.5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        padding-right: 0.2rem;
        dt{
            font-size:0.48rem;
            font-weight: bolder;
        }
        dd{
            color: #666666;
        }
    }
    .boxRight{
        display: flex;
        .newImg{
            width:1.5rem;
            height:1.5rem;
            background: #e6e6e6;
            img{
                height: 100%;
                width: 100%;
                background-position: center;
                background-repeat: no-repeat;
                background-color: #f8f8f8;
                background-size: cover;
            }
        }
        .centext{
            width: 3.95rem;
            display: flex;
            flex-direction: column;
            p{
                width: 100%;
                height: 1.1rem;
                line-height: 0.52rem;
                text-overflow: -o-ellipsis-lastline;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                line-clamp: 2;
                -webkit-box-orient: vertical;
                padding: 0.04rem 0.2rem 0 0.2rem ;
                align-self: flex-start;
            }
            .del{
                margin-top:0.25rem;
                width: 0.36rem;
                height:0.38rem;
                align-self: flex-end;
            }
        }
        #centextSe{
            width: 5.45rem;
            p{
                background: #EFEFEF;
                border-radius: 3px;
            }
            
        }
    }
}
</style>