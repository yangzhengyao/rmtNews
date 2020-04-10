<template>
    <div class="listBox">
        <div class="infoList" v-if="islnfoListBr" v-for="(item,index) in infoList" :key="index"> <!-- data中控制遍历数组 -->
            <div class="infoHeader">
                <img @click="apis.urlParams('detailsPage?id='+item.user_id+'&type=0')" :src='item.user.imgurl ? apis.theme.imgHost+item.user.imgurl : imgHead' alt="" class="headerImg"> 
                <dl>
                    <dt @click="apis.urlParams('detailsPage?id='+item.user_id+'&type=0')">{{item.user.personName}}</dt>
                    <dd>{{item.pub_time}}</dd>
                </dl>
                <div class="floatR">
                    <div class="guanBox" v-if="isDele == 1 && item.user_id != userDataid" @click="cancelFoc(index,item.user_id)" >
                        <div class="yiguan" v-show="!item.focus">
                                <img src="./image/add.png" alt="">
                                <span>关注</span>
                        </div>
                        <div class="weiguan" v-show="item.focus">
                            <img src="./image/followJian.png" alt="">
                            <span>已关注</span>
                        </div>
                    </div>
                    <div class="delImg" v-if="isDele == 2">
                        <img src="./image/del.png" alt="" @click="delready(index,item.auto_id)">
                    </div>
                    
                    <div class="dele3" v-if="isDele == 3"></div>
                </div>
            </div>
            <div @click.stop="routeDateil(item.auto_id)" @touchmove="touchmoveFunc()">
                <div class="listCont">
                    <div class="ding">
                        <p v-if="item.top" class="ding1">顶</p>
                        <p v-if="item.excellent" class="ding2">精</p>
                        <p v-if="item.popular" class="ding3">热</p>
                    </div>
                    <p class="centxt" >
                        <span v-html="parseComments(item.content)" @click.stop="linkTo(index, $event, item.topic_id, item.auto_id)"></span>
                        <span class="fenlei">{{item.topicId}}</span>
                    </p>
                </div>
                <div class="listImg">
                    <!-- <ul
                        :class=" { 'isBolgImg': JSON.parse(item.blog_info_images).length > 1, 'circleFriends': JSON.parse(item.blog_info_images).length <= 1} "
                        v-if=" !item.isVedio "
                    >
                        <li
                        v-if=" JSON.parse(item.blog_info_images).length != 0"
                        v-for="(itemImg,index1) in JSON.parse(item.blog_info_images)"
                        :key="index1"
                        @click="previewImage(index1,JSON.parse(item.blog_info_images))"
                        :style="{'background-image':'url('+itemImg.images+')'}">
                        </li>
                    </ul> -->
                    <!-- <img :src="i.images" @click.stop="bigImg(ind,JSON.parse(item.blog_info_images))" :alt="i.ind" v-for="(i,ind) in JSON.parse(item.blog_info_images)" :key="ind" :class="JSON.parse(item.blog_info_images).length == 1 ? 'zoomPic':''"> -->
                    <!-- <img :src="i.images"  :alt="i.ind" v-for="(i,ind) in JSON.parse(item.blog_info_images)" :key="ind" :class="JSON.parse(item.blog_info_images).length == 1 ? 'zoomPic':''"> -->
                     <div class="listChi" v-lazy:background-image="i.images"  @click.stop="bigImg(ind,JSON.parse(item.blog_info_images))" :alt="i.ind" v-for="(i,ind) in listsver(item.blog_info_images)" :key="ind" :class="JSON.parse(item.blog_info_images).length == 1 ? 'zoomPic':''">
                    </div>

                    <template v-if="item.blog_info_videos">
                        <div class="article_video" @click.stop="clickStop">
                            <template>
                                <div class="video_info zoomPic" :style='"background-image:url("+item.blog_info_videos[1]+");"'>
                                    <!-- <img :src="json.titlepic"> -->
                                </div>
                                <div class="playRound" @click.stop="jumpPlayer(item.blog_info_videos[0])">
                                    <!-- <div class="playSan"></div> -->
                                </div>
                            </template>
                        </div>
                    </template>

                </div>
                <div class="listLoca">
                    <div class="quan" v-if="item.themeName !== null" @click.stop="jumpQuan(item.theme_id)">
                        {{item.themeName}}
                    </div>
                    <div class="quan" v-if="item.themeName === null" @click.stop="jumpQuan(item.theme_id)" v-html="apis.getTheme() =='leshan'?'乐山圈':'弥勒圈'">
                        
                    </div>
                    <div class="locas" style="display:none;">
                        <img src="./image/icon_01.png" alt="">
                        <span>
                            北京 银谷大厦
                        </span>
                    </div>
                </div>
            </div>
            <ul class="share" v-if="isShare">
                <li class="shareBut" @click="collection(index, item.auto_id)">
                    <img src="./image/collect.png"  v-if="!item.fav">
                    <img src="./image/collect-active.png"   v-if="item.fav" >
                    <span></span>
                </li>
                <li @click="routeDateil(item.auto_id)">
                    <img src="./image/icon_02.png" alt="">
                    <span v-if="item.comment_num">{{item.comment_num}}</span>
                </li>
                <li class="itemLike" @click="cancel(item.like, index, item.auto_id, item.theme_id, item.topic_id)">
                    <img src="./image/icon_03.png" alt=""  v-if="!item.like">
                    <img src="./image/praise.png" alt=""  v-if="item.like" >
                    <span v-if="item.likes_num">{{item.likes_num}}</span>
                </li>
            </ul>
        </div>
        <div class="zanWu" v-if="!islnfoListBr">暂无内容</div>
    </div>
</template>
<script>
import api from "../../../../src/assets/js/api.js";
import { mapGetters, mapMutations, mapActions } from "vuex";
import Bus from '@/Bus';
export default {
    name: 'BrowseList',
    props:{
        isDele:{
            default: 2
        },
        isShare:{
            default: true
        },
        isBrowseType:{
            default: 1
        }
    } ,
    data() {
        return {
            infoList:[],
            aIndex:-1,
            initParams:'',
            userId:'',
            imgHead:require('./image/head.png'),
            userDataid:"",
            commentId:"",
            islnfoListBr:true,
            browseType:1
            // isLike:
        }
    },
    components: {

    },
    watch: {
    },
    methods: {
        ...mapActions("integral",["updateUserRecordTime"]),
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
        collection(index, autoId){
            let that = this;
            let url = '';
            let data = '';
            if (JSON.parse(localStorage.getItem("userData") == null)) {
                that.apis.urlParams("Login", {});
            } else {
            //判断用户下次点击是添加收藏还是取消收藏
                if( !that.infoList[index].fav){
                    url = api.theme.api.community.addFavorites;
                    data = {
                        "type":4,
                        "userFavorites":autoId,
                        "userId":this.userDataid,
                        "appInfoId":that.apis.theme.api.appInfoId
                    }
                } else {
                    url = api.theme.api.community.delUserFavorites;
                    data = {
                        "userFavorites":autoId,
                        "userId":this.userDataid,
                        "appInfoId":that.apis.theme.api.appInfoId
                    }
                }
                this.axios({
                    url: url,
                    method: "post",
                    data:data,
                })
                .then( res => {
                    if( res.status ){
                        if( that.infoList[index].fav){
                            that.$toast({
                                message: '取消收藏',
                                duration: 2000
                            });
                            if(that.isBrowseType != 1){
                                that.infoList.splice(index,1);
                            }
                        } else {
                            this.updateUserRecordTime({ //收藏成功调用积分接口
                                userId: JSON.parse(localStorage.getItem( 'userData' )).user_id,
                                appInfoId: that.apis.theme.api.appInfoId,
                                expType: 8,
                                recordTime: 1
                            })
                            that.$toast({
                                message: '收藏成功',
                                duration: 2000
                            });
                        }
                        this.infoList[index].fav = !this.infoList[index].fav;
                    } 
                })
            }
        },
        listsver(listimg){
           if(listimg){
               return JSON.parse(listimg)
           }else{
               return []
           }
        },
        touchmoveFunc() {
            if (window.trackingClickSelf) {
                window.trackingClickSelf = false;
            }
        },
        previewImage(index, imgArr) {
            let testImg = [];
            for (let i = 0; i < imgArr.length; i++) {
                testImg.push(imgArr[i].images);
            }
            plus.nativeUI.previewImage(testImg, {
                background: "#333333",
                current: index
            });
        },
        bigImg(index,imgArr){
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
                }
            });
        },
        parseComments (value) {
            var exp
            exp = /(#|＃)((?!#).)*(#|＃)/g // 这里中文#和英文#都会识别
            value = value.replace(exp, (item) => {
                //  class="text-blue"
            // item = item.replace(/^#/,"# ").replace(/#$/," #");
            let newVal = ' '+'<a style="color:#576B95;">' + item + '</a>'+' '
            return newVal
            }) 
            return value 
        },
        linkTo( index, event, params, autoId ){
            var ev = event || window.event;
            var target = ev.target || ev.srcElement;
            if(target.nodeName.toLowerCase() == "a"){
                var that=target;
                var grid = that.parentNode.childNodes;
                var indexs;
                for(var i=0;i<grid.length;i++){
                    if(grid[i]===target){
                        indexs=(i+1)/2-1;
                        break;
                        
                    }
                }
                let userDataid = JSON.parse(localStorage.getItem("userData"));
                if (userDataid == null) {
                    this.apis.urlParams("Login");
                    return false;
                }
                localStorage.setItem('topicCircleList', JSON.stringify({"typeId":"话题","isShow":false,"type":1}));
                this.apis.urlParams("topicCircleDetail",{params:params[indexs]},false);
            }else{
                this.routeDateil(autoId);
            }
        },
        jumpQuan(params){
            if( localStorage.getItem( 'userData' ) === null ){
                        api.urlParams('Login');
                        return;
                }
            localStorage.setItem('topicCircleList', JSON.stringify({"typeId":"圈子","isShow":false,"type":3}));
            this.apis.urlParams("topicCircleDetail",{params},false);
            
        },
        addUserFans(focus) {
            let that = this;
            let url = '';
            let userDataid=JSON.parse(localStorage.getItem("userData"));
            this.initParams=userDataid.user_id;
            if( !focus ){
                url = that.apis.theme.api.me.cancelFans;
            } else {
                url = that.apis.theme.api.me.addUserFans;
            }
            this.axios({
            method: "post",
            data:{
                userId:that.userId,
                fansId:that.initParams
            },url,
            }).then(res => {
            if( res.data.success ){
                console.log(res.data)
            }
            });
        },
        cancelFoc(index,user_id){
            if( localStorage.getItem( 'userData' ) === null ){
                    api.urlParams('Login');
                    return;
            }
                var focus = this.infoList[index].focus;
                for(var i = 0; i < this.infoList.length; i++) {
                    if(this.infoList[i].user_id == user_id) {
                        this.infoList[i].focus = !this.infoList[i].focus;
                        // break;
                    }
                }
                this.userId = user_id;
                this.addUserFans(this.infoList[index].focus);
            
        },
        cancel(like,index,autoId,themeId, topicId){
            if( localStorage.getItem( 'userData' ) === null ){
                    api.urlParams('Login');
                    return;
            }
            let userDataid=JSON.parse(localStorage.getItem("userData"));
            this.initParams=userDataid.user_id;  
            this.infoList[index].like = !this.infoList[index].like;
            if(!this.infoList[index].like){
                this.infoList[index].likes_num--;
                if(this.infoList[index].likes_num == 0){
                    this.infoList[index].likes_num = null;
                }
                this.canclelike(autoId, themeId, topicId);
            }else{
                this.infoList[index].likes_num++;
                this.zan_btns(autoId, themeId, topicId);
            }
        },
        canclelike(autoId, themeId, topicId) {
            let userDataid=JSON.parse(localStorage.getItem("userData"));
            this.initParams=userDataid.user_id;
            this.axios({
            method: "post",
            url: this.apis.theme.api.community.cancelLikeBlogs,
            data: { blog_id: autoId, user_id: this.initParams, theme_id:themeId, topic_id:topicId }
            })
            .then(res => {
            })
            .catch(err => {
                console.log(err);
            });
        },
        zan_btns(autoId, themeId, topicId) {
            let userDataid=JSON.parse(localStorage.getItem("userData"));
            this.initParams=userDataid.user_id;
            this.axios({
            method: "post",
            url: this.apis.theme.api.community.likeBlogs,
            data: { blog_id: autoId, user_id: this.initParams, theme_id:themeId, topic_id:topicId }
            })
            .then(res => {
            })
            .catch(err => {
                console.log(err);
            });
        },
        routeDateil(autoId){
            if(this.isShare == false){
                return;
            }
            if(this.userDataid){
                var postData = {
                    "userId":this.userDataid,	
                    "browseType":0,
                    "browseContentId":autoId
                }
                this.addUserBrowse(postData)
            }
            if( localStorage.getItem( 'userData' ) != null ){
                this.apis.urlParams("articleDetail",{autoId},false);
            } else {
                api.urlParams('Login')
            }
        },
        addUserBrowse(postData){
            this.axios({
                method: "post",
                url: this.apis.theme.api.me.addUserBrowse,
                data: postData
            });
        },
        getDataid(){
			let userDataid = JSON.parse(localStorage.getItem("userData"));
			if( userDataid !== null){
				this.userDataid = userDataid.user_id;
			}else{
				this.userDataid = false;
			}
        },
        delready(ind,auto_id){
            let that  = this;
            var param = {};
            // this.stateList.splice(val.index,1);
            //  plus.nativeUI.alert("删除成功", function() {}, "提示", "确定");
            plus.nativeUI.confirm("确定删除这条动态吗？", function(e) {
            //确定回调
            if (e.index == 0) {
                if(that.browseType == 2){
                    param = {
                        "userFavorites":auto_id,
                        "userId":that.userDataid,
                        "appInfoId":that.apis.theme.api.appInfoId
                    };
                    that.axios({
                        method: "post",
                        url: api.theme.api.community.delUserFavorites,
                        data: param
                    }).then(res => {
                    if (res.data.success) {
                        that.infoList.splice(ind,1)
                        plus.nativeUI.alert("删除成功", function() {}, "提示", "确定");
                    }
                    });
                }else{
                    param = {
                        "browseContentId":auto_id,
                        "userId":that.userDataid,
                        // "appInfoId":that.apis.theme.api.appInfoId
                    };
                    console.log(param)
                    that.axios({
                        method: "post",
                        url: api.theme.api.me.delUserBrowser,
                        data: param
                    }).then(res => {
                    if (res.data.success) {
                        that.infoList.splice(ind,1)
                        plus.nativeUI.alert("删除成功", function() {}, "提示", "确定");
                    }
                    });
                }
            }
            });
        },
        clickStop(){
        },
        
    },
    mounted() {
        this.getDataid();
    },
    created(){
        let userDataid = JSON.parse(localStorage.getItem("userData"));
        // let autoIds = JSON.parse(localStorage.getItem("articleDetail"));
        this.userDataid = userDataid.user_id;
        // this.commentId = autoIds.autoId;

        Bus.$on('stateListBr',(val) =>{
            this.infoList = val.arr;
            this.browseType = val.type;
            if(val.length <= 0){
                this.islnfoListBr = false;
            }else{
                this.islnfoListBr = true;
            }
        });
        Bus.$on('islnfoListBr',(val) =>{
            this.islnfoListBr = val;
        });
    }
}
</script>
<style lang='less' scoped>
    .text-blue{
        color:#576B95;
    }
    .listBox{
        width: 100%;
        background: #fff;
        padding-top:0.1rem; 
    }
    .infoList{
        width: 100%;
        padding: 0.4rem 0.3rem 0 0.3rem;
        font-size:16px;
        border-bottom: 0.2rem solid rgba(242,242,242,1);
        .infoHeader{
            height: 0.8rem;
            .headerImg{
                width: 0.8rem;
                height: 0.8rem;
                border-radius: 50%;
                float: left;
            }
            dl{
                margin-left: 0.25rem;
                float: left;
                dt{
                    width:4rem;
                    font-size:0.3rem;
                    font-weight:400;
                    font-size: 0.35rem;
                    color:rgba(227,37,25,1);
                    margin-bottom: 0.1rem;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                }
                dd{
                    height:0.18rem;
                    font-size:0.24rem;
                    font-weight:400;
                    color:rgba(153,153,153,1);
                }
            }
            .floatR{
                // width: 1.6rem;
                float: right;
            }
            .guanBox{
                .yiguan{
                    border:1px solid rgba(255,128,43,1);
                    border-radius:0.5rem;
                    display: flex;
                    align-items:center;
                    justify-content:center; 
                    font-size:0.26rem;
                    color:rgba(255,128,43,1);
                    padding: 0.1rem 0.2rem;
                    img{
                        width:0.24rem;
                        height:0.24rem;
                        margin-right: 0.1rem;
                    }
                }
                .weiguan{
                    border:1px solid #D9D9D9;
                    border-radius:0.5rem;
                    display: flex;
                    align-items:center;
                    justify-content:center;
                    font-size:0.26rem;
                    background:#fff;
                    color: #4D4D4D;
                    padding: 0.1rem 0.2rem;
                    img{
                        width:0.24rem;
                        height:0.24rem;
                        margin-right: 0.1rem;
                    }
                }
            }
            .delImg{
                width: 1.36rem;
                height:0.38rem;
                margin-top: 0.15rem;
                img{
                    width: 0.36rem;
                    height:0.38rem;
                    float: right;
                }
            }
            .dele3{
                width: 1.36rem;
            }
            
        }
        .listCont{
            width: 100%;
            margin-top: 0.2rem;
            .ding{
                // font-size: 0.2rem;
                display: flex;
                color: #fff;
                flex-direction: row;
                // margin-right: 0.2rem;
                margin-top: 0.03rem;
                float: left;
                p{
                    margin-right: 0.12rem;
                    width:0.4rem;
                    height:0.4rem;
                    background:rgba(245,69,69,1);
                    border-radius:0.1rem;
                    text-align: center;
                    font-size:0.2rem;
                    line-height: 0.4rem;
                }
                .ding1{
                    background:rgba(255,172,56,1);
                }
                .ding2{
                    background:rgba(255,133,71,1);
                }
                
            }
            
            .ding p:nth-last-child(1){
                margin-right: 0.2rem;
            }
            .centxt{
                line-height: 0.5rem;
                font-size:0.3rem;
                font-weight:400;
                color:rgba(26,26,26,1);
                .fenlei{
                    color:#576B95;
                }
            }
        }
        .listImg{
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            margin-top: 0.3rem;
            .listChi{
                width:2.2rem;
                height:2.2rem;
                margin: 0 0.15rem 0.15rem 0;
                background-position: center;
                background-repeat: no-repeat;
                background-size:cover; 
                background-color: #f8f8f8;
            }
            .listChi[lazy=loaded] {
                -webkit-animation-duration: 1s;
                animation-duration: 1s;
                -webkit-animation-fill-mode: both;
                animation-fill-mode: both;
                -webkit-animation-name: fadeIn;
                animation-name: fadeIn;
                background-size:cover;
                
            }
            .listChi[lazy=loading] {
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
            .zoomPic{
                width:3.5rem;
                height:2.8rem;
            }
            
        }
        .listImg div:nth-child(3n){
            margin-right:0;
        } 
        .listLoca{
            width: 100%;
            display: flex;
            justify-content: space-between;
            margin-top: 0.3rem;
            
            padding-bottom: 0.2rem;
            .quan{
                height:0.36rem;
                padding: 0 0.1rem;
                line-height: 0.36rem;
                background:rgba(227,37,25,1);
                border-radius:0.36rem;
                font-size:0.22rem;
                color: #fff;
                text-align: center;
            }
            img{
                width:0.19rem;
                height:0.28rem;
                margin: 0.1rem 0 0 0.2rem;
            }
            .locas{
                width:2.36rem;
                height:0.5rem;
                background:rgba(249,247,248,1);
                display: flex;
                span{
                    height:0.26rem;
                    font-size:0.26rem;
                    display: inline-block;
                    padding:0.1rem 0 0 0.12rem; 
                    font-family:SourceHanSansCN-Regular;
                    font-weight:400;
                    color:rgba(102,102,102,1);
                    text-align: center;
                    line-height: 0.26rem;
                }
            }
        }
        .share{
            width: 100%;
            display: flex;
            justify-content:space-between; 
            border-top: 1px solid rgba(230,230,230,1);
            color:rgba(102,102,102,1);
            padding: 0.2rem 0.3rem;
            li{
                display: flex;
                align-items: center;
                min-height: 0.4rem;
            }
            img{
                width: 0.32rem;
                height: 0.32rem;
                margin-right: 0.1rem;
            }
            .shareBut{
                margin-left: 0.1rem;
            }
            .itemLike{
                min-width: 0.6rem;
                img{
                    float: left;
                }
            }
        }
    }
    .selectedLike{
        display: none;
    }
    .zanWu{
        font-size:0.32rem;
        color:#999999;
        margin-top:3rem;
        margin-left:3rem;
    }
    // 图片初始化
      .circleFriends {
        display: flex;
        width:100%;
        height: 4rem;
        li {
          height: 100%;
          list-style: none;
          -moz-box-sizing: border-box;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          background: #fff;
          margin-right: 0.1rem;
          margin-bottom: 0.1rem;
          width: 100%;
          width: 100%;
          background-position: left center;
          background-size: cover;
          background-repeat: no-repeat;
        }
      }
      .isBolgImg {
        display: flex;
        width: 100%;
        flex-wrap: wrap;
        box-sizing: border-box;
        li {
          height: 2.2rem;
          width: 2.2rem;
          float: left;
          list-style: none;
          -moz-box-sizing: border-box;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          background: #fff;
          margin-right: 5px;
          margin-bottom: 5px;
          width: 31.3%;
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
        }
      }
      .operation {
        display: flex;
        position: relative;
        > div {
          display: flex;
          align-items: center;
          > span {
            color: #9f9f9f;
            margin-left: 0.1rem;
            font-size: 0.33rem;
            position: relative;
            line-height: 1;
            top: 0px;
          }
        }
        .zan {
          cursor: pointer;
          .iconfont {
            font-size: 0.3rem;
            color: #9f9f9f;
          }
        }
        .del {
          width: 100%;
          display: flex;
          justify-content: flex-end;
         
        }
        .comment {
          flex: 2;
          cursor: pointer;
          .iconfont {
            font-size: 0.4rem;
            color: #9f9f9f;
            vertical-align: middle;
            margin-top: 2px;
          }
          .commentDiv {
            width: 100%;
            background: #f5f5f5;
            position: absolute;
            top: 22px;
            left: 0px;
            margin-top: 5px;
            padding: 5px;
            > div {
              font-size: 0.25rem;
              > span:nth-child(1) {
                color: @dominantColor;
              }
            }
          }
        }
        .share {
          flex: 0.5;
          -webkit-justify-content: end;
          justify-content: end;
          cursor: pointer;
          .iconfont {
            font-size: 0.3rem;
            color: #9f9f9f;
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
                background: rgba(0, 0, 0, .4) url('./image/play_san.png') no-repeat center / 40%!important;
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
                    background: url(./image/repeat.png) no-repeat center center;
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
