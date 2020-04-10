<template>
    <div id="detail" v-infinite-scroll="loadMore" infinite-scroll-disabled="loadingMore" infinite-scroll-distance="10" ref="viewBox">
        <!-- 头部 -->
          
      <!-- <div id="head">
     
        <span class="back-white" @click="rollback">  </span>
        <span class='login'>{{json.title}}</span>
        
      </div> -->
      <header class="com_header headerNavFixed">
        <!-- iBlackBack -->
        <div class="nvbt iback " @click="apis.iback()" ></div>
        <!-- <div class="nvtt">{{currentArticle.title}}</div> -->
          <div class="nvtt" style="display: flex;align-items: center;" v-if="scrollShow" :class="scrollShow ? 'fadeIn':'fadeout' " >
                    <img :src='"~@/assets/img/"+apis.getTheme()+"/"+apis.getTheme()+".png"' class="touImg1" style="height: .64rem;width: .64rem;">
                    <div style="display: flex;flex-direction: column;width: 100%;align-items: start;margin-left: .2rem;">
                      <span style="font-size: .26rem;color: #1a1a1a;line-height: 1;margin-bottom: .1rem;">
{{ currentArticle.properties && currentArticle.properties.hasOwnProperty('groupName') && apis.theme.api.appName == 'dongpo'?currentArticle.properties.groupName:currentArticle.befrom }}
                      </span>
                      <span style="font-size: .26rem;color: #1a1a1a;line-height: 1;"  >{{currentArticle.time}}</span>
                    </div>
          </div>
        <div class="nvtt" v-else></div>
        <div class="nvbt idoc " @click.stop='$refs.range.toggle()' v-if="apis.getTheme() == 'dongpo'"><img class="imore" src="./images/more.png"/></div>
        <div class="nvbt idoc " @click.stop='$refs.range.toggle()' v-else><img class="imore" src="./images/more1.png"/></div>
      </header>
      
        <!-- 正文 -->
        <div class="contentNavFixed com_contentNavFixed" style="background:#fff;height: calc(100vh - 55px);"  >
            <!-- v-swiper:swiperRight='true' v-swiper:all="'blur'" -->
            <div class="container"  >
                <!-- 正文 -->
                <my-article v-if="currentArticle" :json='currentArticle' :fontSize='fontSize' :audioHiddenUrl='audioHiddenUrl' :audioHidden="audioHidden"></my-article>
                <!-- 分享 -->
                <div class="line" v-if="apis.theme.api.appName != 'hangkong'">
                  <span></span>
                  <span>分享到</span>
                  <span></span>
                </div>
                <div class="operation" v-if="apis.theme.api.appName != 'hangkong'">
                  <img
                    :src='"~@/assets/img/"+item.name+".png"'
                    alt
                    v-for="(item,index) in shareBts"
                    :key="index"
                    class="shareItem"
                    @click.stop="shareFunc(item)"
                  >
                </div>
                <!-- 标签 -->
                <my-tags v-if='currentArticle.infotags' :json='currentArticle.infotags'></my-tags>
                <!-- 喜欢/收藏 -->
                <div class="article_favorite">
                    <my-like :json="currentArticle"></my-like>
                    <my-collect type='btn' :json="currentArticle"></my-collect>
                </div>
                <!-- 热点评论 -->
                <template v-if='currentArticle.comment'>
                    <!-- 分割线 -->
                    <div class="bg_line"></div>
                    <div class="comment-hot">
                        <div class="comment_title">
                            <div class="Line">
                                <div class="title">用户热评</div>
                            </div>
                        </div>
                        <!-- 评论列表 -->
                        <comment-item layout='topFooter' comment='remark' type='all' v-for='(item,index) in currentArticle.comment' :itemJson='item' :key='index'></comment-item>
                        <!-- 更多评论 -->
                        <router-link class="comment_more" v-if="currentArticle.plnum > 0 " tag='div' :to="{name: 'comment'}">全部{{currentArticle.plnum}}条评论<i class="icon-detail"></i></router-link>
                    </div>
                </template>
                <!-- 分割线 canComment为1可评论-->
                <div class="bg_line" v-if="currentArticle.canComment == 1"></div>
                    <!-- 如不需要显示在本地隐藏即可，不用提交 -->
                    <div class="pinglun" v-if="currentArticle.canComment == 1">
                        <span><img src="./images/shutiao.png" alt=""></span>
                        <span>全部评论</span>
                    </div>
                <comcont @replayClikCallback="replayClikCallback" v-if="currentArticle.canComment == 1" style="padding: .3rem;background: #fff;" :comments="commentList" @dele='dele' @likedClickCallback='likedClickCallback'> 暂无评论信息 </comcont>
                <!--  推荐 -->
                <my-recommend :json='currentArticle.recommend'></my-recommend>
            </div>
           
             <!-- <div v-if="commentList.length == 0" style="height: 1rem;font-size: .3rem;line-height: 1rem;text-align: center;background: #fff;position: relative;top: -1rem;">
                暂无评论信息
             </div> -->
        </div>
        <!-- 底部工具栏 -->
        <my-tool icon comment='remark' @publish='publishCallBack' @detailParent="toolChild" :canComment="currentArticle.canComment">
            <!-- 按钮栏 -->
            <template slot='tool_btn'>
                <!-- 评论按钮 -->
                <!-- <router-link class="comment_btn" :to="{name:'comment'}">
                </router-link> -->
                <span class="comment_num" v-if="currentArticle.plnum > 0">{{currentArticle.plnum}}</span>
                
                <!-- 分享按钮 -->
                <a v-if="shareFlag && apis.theme.api.appName != 'hangkong'" class="share_btn" @click.stop='$refs.share.toggle()'></a>

                <!-- 点赞按钮 -->
                <a v-if="shareFlag" :class=" isZan == false ? 'zan_btn':'select_zan'" @click="zanFn"></a>
                
                <!-- 收藏按钮 -->
                <a v-if="shareFlag" :class=" isReview == false ? 'review_btn':'select_review'" @click="collection"></a>
                <!-- range按钮 -->
                <!-- <a class="range_btn" @click.stop='$refs.range.toggle()'></a> -->
                <!-- 收藏按钮 -->
                <!-- <my-collect type='icon' :json='currentArticle'></my-collect> -->
            </template>
        </my-tool>
        <!-- 分享组件 -->
        <my-share :json='currentArticle' ref="share"></my-share>
        <!-- 组件 -->
        <my-range :fontSize='fontSize' :json='currentArticle'  @fontSizeBack='fontSizeBack' ref="range"></my-range>
        <!-- 提示组件 -->
        <my-loading :visible='loading'></my-loading>
        <my-error fixed :visible='error' :method='init'></my-error>
        <!-- 子页面视图 -->
        <!-- <router-view></router-view> -->
        
    </div>
</template>
<script>
import api from "../../../assets/js/api";
import myArticle from "./components/article";
import myTags from "./components/tags";
import myRecommend from "./components/recommend";
import myShare from "./components/share";
import myRange from "./components/range";
import myLike from "./components/like";
import myCollect from "./components/collect";
import moment from "moment";
import myHeader from "../../../../src/components/myHeader"; // header组件
import myLoading from "../../../../src/components/loading"; // loading组件
import myError from "../../../../src/components/error"; // error组件
import listInfo from "../../../../src/components/info"; // 文章列表信息组件
import listItem from "../../../../src/components/listItem"; // 文章列表组件
import commentItem from "../../../../src/components/commentItem"; // 评论列表组件
import publishItem from "../../../../src/components/publishItem"; // 后台发布列表组件
import myBanner from "../../../../src/components/banner"; // banner组件
import popupMenu from "../../../../src/components/popupMenu"; // 弹框组件
import myTool from "../../../../src/components/tool"; // 弹框组件
import { mapGetters, mapMutations, mapActions } from "vuex";
import $ from '../../../assets/jquery/jquery-1.12.0.min.js'
import { Toast } from 'mint-ui';
import { log } from 'util';
import Bus from '@/Bus';
const root = process.env.API_ROOT;
export default {
  name: "detail",
  components: {
    myArticle,
    myTags,
    myRecommend,
    myShare,
    myRange,
    myLike,
    myCollect,
    myHeader,
    myLoading,
    myError,
    listInfo,
    listItem,
    commentItem,
    publishItem,
    myBanner,
    popupMenu,
    myTool
  },
  data() {
    return {
      title: "新闻详情", // header的title
      id: "", // 文章id
      classid: "", // 文章classid（分类）
      articleJson: {}, // 文章数据
      enterTime: "", // 即进入页面时间
      loading: true,
      error: false,
      shareFlag: true,
      jsonUrl: "",
      fontSize: localStorage.getItem('fontSize')!=null ?Number( localStorage.getItem('fontSize') ):18,
      type: '',
      isZan: false,//默认未点赞
      isReview: false,//默认未收藏
      audioHiddenUrl: '',
      audioHidden: false,
      shares: null,
      shareBts: [],
      commentList:[],//评论列表
      newsParam:{}, //新闻详情
      inputVal:'',
      pageNo:1,
      loadingMore:false,
      scrollShow:false,
      activepid:'',
      puyang:true,
      userDataid:'',
      url:''
    };
  },
  computed: {
    ...mapGetters("index", ["indexColumn"]),
    ...mapGetters("detail", [
      "listArticle",
      "currentArticle",
      "historyArticle",
      "localtion",
      "likeNum"
    ])
  },
  created(){
    if(this.apis.getTheme() == 'puyang'){
      this.puyang=false
    }
  },
  methods: {
    loadMore() {
      // this.getActivitylist( this.newsParam );
    },
     //一级评论回复点击跳转 评论详情页面
    replayClikCallback(id,isLiked,likedNum,items){
     var that=this;
      if (JSON.parse(localStorage.getItem("userData") == null)) {
        that.apis.urlParams("Login");
        return
      };
      that.apis.urlParams('commentsdetails',{'title':items},false);
      plus.webview.getWebviewById(window.location.href.split('#/')[0]+'#/'+"commentsdetails").addEventListener(
        "close",
        function(e) {
          that.pageNo = 1;
          that.getActivitylist(that.newsParam)
        },
        false
      );
    },
    //点赞评论
    likedClickCallback(index){
      let userParam = JSON.parse(localStorage.getItem('userData'));
      let itemClick = this.commentList[index];

      if( userParam ){
         this.axios({
          method: "post",
          url:api.theme.api.news.commentLikes,
          data: {commentId:itemClick.commentId,userId:userParam.user_id,type:1},
          headers:{'Content-Type':'application/json; charset=utf-8'}	
          }).then(res => {
            let isSuccess = res.data.success;
            let tipMgs = res.data.message;
            if(isSuccess && tipMgs=="取消点赞成功！" ){
              Toast({
                message:tipMgs,
                position:"middle",
                duration:1500
              });
              itemClick.like = false;
              itemClick.likeNum--
            }else if(isSuccess && tipMgs=="点赞成功！"){
              Toast({
                message:tipMgs,
                position:"middle",
                duration:1500
              });
              itemClick.like = true;
              itemClick.likeNum++
            };
          });
      } else {
        this.apis.urlParams('Login')
      }
    },
    //删除评论
    dele(index){
      let userParam = JSON.parse(localStorage.getItem('userData'));
      if( userParam ){
        let itemClick = this.commentList[index];
        let userParam = JSON.parse(localStorage.getItem('userData'));
        this.axios({
          method: "post",
          url:api.theme.api.news.delesay,
          data: {commentId:itemClick.commentId,userId:userParam.user_id},
          headers:{'Content-Type':'application/json; charset=utf-8'}	
        }).then(res => {
          let isSuccess = res.data.success;
          let tipMgs = res.data.message;
          if(isSuccess){
            this.commentList.splice(index,1)
            Toast({
              message:tipMgs,
              position:"middle",
              duration:1500
            });
          }
        });
      } else {
        this.apis.urlParams('Login')
      }
    },
    toolChild(val){
      // 用户输入的input值
      this.inputVal = val;
      let that = this;
      that.pageNo = 1;
      // that.commentList = [];
      //回调成功
      this.addNewsComment(val)
      .then( res => {
       if(res.success==false && res.errorCode=="1112"){
             Toast({
              message: "你已被禁止评论任何内容！",
              position: "middle",
              duration: 1500
            });
            return
          }
         if( res.success ){
          //  plus.nativeUI.alert("评论信息成功，待审核", function(e) {}, "提示", "ok");
            this.updateUserRecordTime({
              userId: JSON.parse(localStorage.getItem( 'userData' )).user_id,
              appInfoId: this.apis.theme.api.appInfoId,
              expType: 7,
              recordTime: 1,
            })
            var timer = null;
            timer =setTimeout(() => {
              this.getActivitylist(that.newsParam);
               clearInterval(timer);
            }, 1000);
            var containerHeight = document.querySelector('.container');
            var topHeight = document.querySelector('.top');
            containerHeight.scrollTop = containerHeight.scrollHeight;
          }
      })
    },
    //添加评论
    // addNewsComment(){
    //   let param = JSON.parse( localStorage.getItem('history_Article'))[0];
    //   let userData=JSON.parse(localStorage.getItem("userData"));
    //   let that = this
    //   this.axios({
    //       method: "post",
    //       url:'http://micservices.wengetech.com:9003/activities/addNewsComment',
    //       data: {
    //          pid:"WS5d09cfe7e4b0af4a6f4007b8",  //评论新闻id
    //          userId:"3288",                               //用户id
    //          appName:"云上东坡",                       //appName
    //          type:'2',                                    //新闻评论类型
    //          newsType:'1',       
    //          content:that.inputVal,                //稿件来源
    //          portraitUrl:userData.imgurl,//头像,
    //          username:'用户565068'
    //       },
    //       headers:{'Content-Type':'application/json; charset=utf-8'}	
    //   }).then(res => {

    //   }).catch(err => {
    //   })
    // },
    getActivitylist(param){  
      let userParam = JSON.parse(localStorage.getItem('userData'));
      this.activepid=param.id;
      this.newsParam = param;
      let that = this;
      let listParms = {
        pid:param.id,  //评论新闻id
        appName:param.befrom,                      //appName
        type:'2',                                    //新闻评论类型
        newsType:param.type+'',                                  //稿件来源
        pageNo:that.pageNo,                                   //分页开始页
        pageSize:10,                                  //每页数量
      }
      if( userParam ){
        listParms['userId'] = userParam.user_id
      }
      this.axios({
        method: "post",
        url:that.apis.theme.api.news.getNewsComments,
        data: listParms,
        headers:{'Content-Type':'application/json; charset=utf-8'}	
      }).then(res => {
          let isSuccess = res.data.success;
          if(isSuccess){
            // if( that.commentList.length == 0 ){
            //    that.commentList=res.data.data;
            // } else {
            //    that.commentList = res.data.data;
            // }
            that.commentList = res.data.data;
            that.pageNo++
            if( that.commentList.length == res.data.total ){
              that.loadingMore = true;
            } else {
              that.loadingMore = false;
            }
          }else{
          }
        
      }).catch(err => {
        console.log(err)
      })
    },
    fontSizeBack(val) {
      this.fontSize=val
      localStorage.setItem('fontSize',val)
    },
    ...mapActions("index", ["get_indexColumn_data"]),
    ...mapMutations("detail", [
      "set_listArticle",
      "set_currentArticle",
      "set_historyArticle",
      "set_localtion",
      "set_likeNum"
    ]),
    ...mapActions("detail", ["get_Article_data", "post_user_data", "addReadOrShareNum", "removeLikeStore", "isLikeStore",'addNewsComment']),
    ...mapActions("integral",["updateUserRecordTime","calculateIntegral"]),
    ...mapMutations("integral",["set_startTime"]),
    async init() {
      // this.classid = this.$route.query.classid
      var json = JSON.parse(localStorage.getItem("Details"));
      this.type = json["path"].type
      this.id = json["path"].id
      this.jsonUrl = json["path"].jsonUrl
      if(json["path"].readUrl){
        this.url = json["path"].readUrl
      }else{
        this.url = json["path"].url
      }
      // await this.handleTitle()
      this.get_Article();
    },
    // 获取title分类
    async handleTitle() {
      if (!(this.indexColumn.length > 1)) {
        await this.get_indexColumn_data();
      }
      let index = this.indexColumn.findIndex(n => n.classid === this.classid);
      if (index > -1) {
        this.title = `详情 · ${this.indexColumn[index].classname}`;
      }
    },
    //是否点赞
    isLike(){
      var that = this;
      let param = JSON.parse( localStorage.getItem('history_Article'))[0];
      let uuid = plus.device.uuid;
      // that.axios({
      //     method:'get',
      //     url:that.apis.theme.api.news.isLike+'?tel_code='+uuid+'&url='+param.url+'',
      // })
      that.isLikeStore(uuid)
      .then( res => {
        that.isZan = res.status;
      })
    },
    /**
     * 收藏接口
     * @param type (1:采编数据，2:新华社数据)
     * @param data 采编传.json链接，新华社传auto_id
     */
    collection(){
      let that = this;
      let userId = '';
      let userParam = JSON.parse(localStorage.getItem("userData"));
      if( userParam ){
        userId = userParam.user_id
      }
      if (userParam == null) {
        that.apis.urlParams("Login", {});
      } else {
        
        let param = JSON.parse( localStorage.getItem('history_Article'))[0];
        delete param.newstext;
        // 默认是采编数据
        // let type  = 1;
        let data  = '';
        let url  = '';
        let type  = param.type;
        // if(type==2){
        //   data = param.id;
        // } else {
        //   data = param.jsonUrl
        // }
        // data = param.url
        
        //判断用户下次点击是添加收藏还是取消收藏
        // if(that.apis.theme.api.appName == 'leshan' || that.apis.theme.api.appName == 'dongpo'||that.apis.theme.api.appName == 'tiemenguan'){
        let postData = '';
        if( that.isReview ){
          postData = {
            "userFavorites":that.url,
            "userId":userId,
            "appInfoId":that.apis.theme.api.appInfoId
          }
          url = api.theme.api.news.delUserFavorites;  
        } else {
          postData = {
            "type":"2",
            "userFavorites":that.url,
            "userId":userId,
            "appInfoId":that.apis.theme.api.appInfoId,
            "jsonData":JSON.stringify(param)
          }
          url = api.theme.api.news.addCollectNews;
        }
        that.axios({
          method:'post',
          url:url,
          data:postData
        })
        .then( res => {
          // console.log(res,"res123")
          if( res.data.success ){
            if( that.isReview){
              that.isReview = false;
              that.$toast({
                message: '取消收藏',
                duration: 2000
              });
            } else {
              this.updateUserRecordTime({ //收藏成功调用积分接口
                userId: JSON.parse(localStorage.getItem( 'userData' )).user_id,
                appInfoId: this.apis.theme.api.appInfoId,
                expType: 8,
                recordTime: 1
              })
              that.isReview = true;
              that.$toast({
                message: '收藏成功',
                duration: 2000
              });
            }
          } 
        })
      }
    },
    // 语音播报
    detailText(){
      var that = this;
      let param = JSON.parse( localStorage.getItem('history_Article'))[0];
      // this.axios( {
      //     method:'get',
      //     url:that.apis.theme.api.news.getNewAudio+'?uuid='+param.id+'&text='+param.newstext.replace(/<(.[^>]*)>/g,'').replace(/&nbsp;/g,'').replace(/^\s+|\s+$/g,'')+'',
      // } )
      if( new RegExp("[\\u4E00-\\u9FFF]+","g").test(param.newstext) ){
        that.audioHidden = true;
      } else {
        console.log( '不包含中文字符' )
      }
      let data = {
        uuid: param.id,
        text: param.newstext.replace(/<(.[^>]*)>/g,'').replace(/&nbsp;/g,'').replace(/^\s+|\s+$/g,'').replace(/[\r\n]/g,'').replace(/[ ]/g, "")
      }
      this.axios.post(that.apis.theme.api.news.getNewAudio, data,{'Content-Type':'application/json; charset=utf-8'})
      .then( res => {
        if(res.data.success){
          if(res.data.data[0].slice(0,4) === "http"){
            that.audioHiddenUrl=res.data.data[0];
          }else{
            that.audioHiddenUrl=that.apis.theme.imgHost+res.data.data[0]
          }
        }
        
      })
    },

    //点赞
    zanFn(){
      var that = this;
      let userParam = JSON.parse(localStorage.getItem('userData'));
      let param = JSON.parse( localStorage.getItem('history_Article'))[0];

      // if(param.befrom=='新华社'){
      //   var data={commentId:that.id,userId:userParam.user_id,type:2}
      // }else{
      //   var data={commentId:that.jsonUrl,userId:userParam.user_id,type:2}
      // }

      if( userParam ){
        this.axios({
          method: "post",
          url:api.theme.api.news.commentLikes,
          data:{commentId:that.url,userId:userParam.user_id,type:2},
          headers:{'Content-Type':'application/json; charset=utf-8'}	
        }).then(res => {
          that.isZan = !that.isZan;
          if(that.isZan){
            let num = parseInt(that.likeNum)+1
            that.set_likeNum(num)
          }else{
            let num = parseInt(that.likeNum)-1
            that.set_likeNum(num)
          }
        });
      } else {
        this.apis.urlParams('Login')
        return
      }

    },
    // android and IOS ( 传参 )
    clientParam(param){
      // alert( JSON.stringify( param ) )
      let that = this;
      if( plus.os.name == 'iOS' ){
        let iosParam = {};
        if( localStorage.getItem( 'userData' ) != null ){
          iosParam.uid = JSON.parse( localStorage.getItem( 'userData' ) ).user_id;
        }
        iosParam['news_title'] = param.title;
        iosParam['news_url'] = param.url;
        iosParam['news_id'] = param.id;
        iosParam['news_copyright'] = param.befrom;
        iosParam['news_type'] = param.type;
        iosParam['news_channel_id'] = localStorage.getItem( 'index_Active' );
        iosParam['submit_url'] = "http://userlog.wengetech.com:10018/log_api/checkLogByAppname";
        iosParam['app_info_id'] = that.apis.theme.api.appInfoId;
        let appName = that.apis.getTheme();
        if( appName == 'redflag' ){
          iosParam['appname'] = 'hq_rmt';
        } else if( appName == 'qingtongxia' ) {
          iosParam['appname'] = 'qtx';
        } else {
          iosParam['appname'] = appName;
        }
        var notiClass = plus.ios.importClass("ReadInfo");
        if( notiClass ){
            var readInfo = notiClass.sharedReadInfo();
            if(readInfo.respondsToSelector(plus.ios.newObject("@selector", "readStart:"))) {
              // alert( '调用成功' )
              readInfo.readStart( JSON.stringify( iosParam ) );
            } else {
              // alert( '调用失败' )
            }
        } else {
          // alert( '获取不到readinfo1类' )
        }   
      } else {
        let androidParam = {};
        if( localStorage.getItem( 'userData' ) != null ){
          androidParam.uid = JSON.parse( localStorage.getItem( 'userData' ) ).user_id;
        }
        androidParam['news_title'] = param.title;
        androidParam['news_url'] = param.url;
        androidParam['news_id'] = param.id;
        androidParam['news_copyright'] = param.befrom;
        androidParam['news_type'] = param.type;
        androidParam['news_channel_id'] = localStorage.getItem( 'index_Active' );
        androidParam['app_info_id'] = that.apis.theme.api.appInfoId;
        androidParam['submit_url'] = "http://userlog.wengetech.com:10018/log_api/checkLogByAppname"; 
        let appName = that.apis.getTheme();
        if( appName == 'redflag' ){
          androidParam['appname'] = 'hq_rmt';
        } else if( appName == 'qingtongxia' ){
          androidParam['appname'] = 'qtx';
        } else {
          androidParam['appname'] = appName;
        }
        var Helper = plus.android.importClass(that.apis.theme.api.rmtNews);
        // //创建对象实例
        var helper = new Helper ();
        //调用java中的跳转方法，并且传入当前activity实例
        helper.startParam(JSON.stringify( androidParam ));
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
    // 获取文章
    get_Article() {
      this.loading = true;
      let data;
      let addData;
      // var param = JSON.parse( localStorage.getItem('history_Article'))[0];
      if(this.userDataid){
        data = {
          type: this.type,
          id: this.id,
          jsonUrl: this.jsonUrl,
          userId:this.userDataid
        };
      }else{
        data = {
          type: this.type,
          id: this.id,
          jsonUrl: this.jsonUrl,
          userId:''
        };
      }
      this.get_Article_data(data)
        .then(res => {
          // console.log(res,"json是什么")
          // 是否已经点赞
          if(res.like){
            this.isZan=true
          }else{
            this.isZan=false
          }
          // 是否已经收藏
          if(res.fav){
            this.isReview=true
          }else{
            this.isReview=false
          }
          if (res) {
            this.set_currentArticle(res);
            this.loading = false;
            this.handleLocaltion("get");
            this.set_startTime(moment().format('x'))
            // this.shareFlag=res.share
            var param
            JSON.parse( localStorage.getItem('history_Article')).map(item=>{
              if(item.id == this.currentArticle.id){
                param = item
              }
            })
            if(this.userDataid){
              addData = {type: 1, columnName: param.id,userId:this.userDataid}
            }else{
              addData = {type: 1, columnName: param.id,userId:''}
            }
          }
          this.error = false;
          // let param = JSON.parse( localStorage.getItem('history_Article'))[0];
          // this.addReadOrShareNum({type: 1, columnName: param.columnName})
          this.addReadOrShareNum(addData)
          this.detailText();
          this.getActivitylist(param)
          var that=this
          if (window.plus) {
            // that.isLike();
            that.clientParam(param);
          } else {
            document.addEventListener('plusready', function () {
              // that.isLike();
              that.clientParam(param);
            }, false);
          }
        })
        .catch(err => {
          console.log(err,'+++++=w ====');
          this.error = true;
          this.loading = false;
        });
    },
    handleLocaltion(type) {
      if (type === "get") {
        this.$nextTick(() => {
          if (this.localtion && this.localtion[this.id]) {
            $("#detail .container").scrollTop(this.localtion[this.id]);
          }
        });
      } else if (type === "set") {
        let scrollTop = $("#detail .container").scrollTop();
        this.localtion[this.id] = scrollTop;
        this.set_localtion(this.localtion);
      }
    },
    // 发表回调
    publishCallBack() {
      this.$router.push({ name: "comment" });
      this.currentArticle.plnum++;
      this.set_historyArticle(this.historyArticle);
      if (this.listArticle) {
        this.listArticle.plnum++;
        this.set_listArticle(this.listArticle);
      }
    },
    /**
     * 更新分享服务
     */
    shareFunc(item){
      this.$refs.share.shareFunc(item);
    },
    plusready(){},
    handleScroll: function () {
        let that = this;
        let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;  
        // 设备/屏幕高度
        let scrollObj = document.querySelector('.container'); // 滚动区域
        let scrollTop = scrollObj.scrollTop; // div 到头部的距离
        let scrollHeight = scrollObj.scrollHeight; // 滚动条的总高度
        // console.log( clientHeight,'设备屏幕高度'),
        // console.log( scrollObj,'滚动区域'),
        // console.log( scrollTop,' div 到头部的距离' );
        // console.log( scrollHeight,'滚动条的总高度' );
        //滚动条到底部的条件
        if(scrollTop > 170 ){
            this.scrollShow = true;
        } 
        if(scrollTop < 116 ){
            this.scrollShow = false;
        } 
    }
  },
  mounted() {
    this.getDataid();
    document.querySelector('#detail').addEventListener('scroll',this.handleScroll,true)
    let that = this;
    this.init();
    this.handleLocaltion("get");
    this.shareBts = this.$refs.share.shareBts ;
   
    if (window.plus) {
      that.plusready();
    } else {
      document.addEventListener('plusready', function () {
        that.plusready();
      }, false);
    }
    
  },
  beforeRouteUpdate(to, from, next) {
    this.handleLocaltion("set");
    if (!to.path.includes("comment")) {
      this.set_currentArticle({});
    }
    this.post_user_data(this.enterTime);
    next();
  },
  beforeRouteLeave(to, from, next) {
    // this.calculateIntegral({playonlineurl:false})
    this.handleLocaltion("set");
    if (to.path.includes("index")) {
      this.set_currentArticle({});
    }
    this.post_user_data(this.enterTime);
    next();
  },
};
</script>
<style lang='less' scoped>
video{
    margin-left: 0.7rem;
}
p{
    text-indent: 0.3em;
    font-size:17px;
    margin-top:5px;
    line-height:194%;
    fomt-family: Hiragino Sans GB, MicroSoft YaHei;
    line-height: 1.75;
}
// img{
//     // margin-left:-37px;
//     width:398px;
// }
.back-white {
    position: fixed;
    width: 1.335rem;
    height: 1.335rem;
    background: url('../../../assets/img/back-white.png') no-repeat Center/cover;
    background-size: 20px;
    left: 0;
    margin-top: -10px;
}

.login {
    display: inline-block;
    width: 230px;
    height: 50px;
    overflow: hidden;
    background-size: 20px;
}

#head {
    position: relative;
    width: 100%;
    height: 50px;
    background-color: rgb(190, 44, 31);
    font-size: 19px;
    font-weight: bold;
    color: rgb(250, 250, 250);
    line-height: 50px;
    text-align: center;
}

#detail {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #fff;
    // header {
    //     border-bottom:.02rem solid #e5e5e5;
    //     .nvtt{
    //       font-size: .36rem;
    //       span{
    //         color: #fff !important;
    //       }
    //     } 
    //     .menu {
    //         background: url('./images/menu_w.png') no-repeat center center;
    //         background-size: 20px;
    //     }
    // }
    header{
      background: @headerBg;
      .nvbt:nth-child(1){
        background: @headerIback;
      }
      .nvtt{
        font-size: .36rem;
        font-weight: 500;
        span{
          color:@headerColor;
        }
      }
    }
    .container {
        background-color: #fff;
        padding-bottom: 30px;
         /* 用于 android4+，或其他设备 */
        // -webkit-overflow-scrolling: touch;
        // /* 用于 ios5+ */
        // -webkit-overflow-scrolling: touch;
        // /* 当手指从触摸屏上移开，会保持一段时间的滚动 */
        // -webkit-overflow-scrolling: auto;
        // /* 当手指从触摸屏上移开，滚动会立即停止 */
        // -webkit-touch-callout: none;
        .article_favorite {
            display: none;
            text-align: center;
            padding: 0.4rem 0;
            background-color: #fff;
        }
        .line {
          display: flex;
          width: 100%;
          align-items: center;
          justify-content:center;
          // margin: 0 0.3rem;
          margin-top: .5rem;
          margin-bottom: .5rem;
          span:nth-child(1) {
            border-top: 0.02rem solid #efefef;
            width: 38%;
          }
          span:nth-child(2) {
            font-size: 0.25rem;
            color: #999999;
            margin: 0 0.3rem;
          }
          span:nth-child(3) {
            border-top: 0.02rem solid #efefef;
            width: 38%;
          }
        }
        .operation {
          margin : .5rem auto;
          text-align :center;
          margin-bottom :.5rem;
          img {
            width: 1.1rem;
            height: 1.1rem;
            margin-right: .5rem;
          }
          img:last-child{
            margin: 0;
          }
        }
        .comment-hot {
            padding: 0.533rem 0 0;
            background: #f9f9f9;

            .comment_title {
                margin-bottom: 0.4rem;
                position: relative;

                .Line {
                    position: relative;
                    width: 2.8rem;
                    margin: 0 auto;
                    text-align: center;

                    &:before {
                        content: '';
                        border-top: 2px solid #aaa;
                        display: block;
                        position: absolute;
                        width: 0.4rem;
                        top: 50%;
                        left: 0;
                    }

                    &:after {
                        content: '';
                        border-top: 2px solid #aaa;
                        display: block;
                        position: absolute;
                        width: 0.4rem;
                        top: 50%;
                        right: 0;
                    }
                }

                .title {
                    font-size: 14px;
                    font-weight: bold;
                }
            }

            .comment_more {
                text-align: center;
                font-size: 12px;
                color: #888;
                padding: 0.533rem 0;
                vertical-align: middle;

                i {
                    display: inline-block;
                    vertical-align: middle;
                    margin-left: 2px;
                    margin-top: -2px;
                    padding: 0 2px;
                    font-size: 12px;
                }
            }
        }
        .bg_line {
            height: 0.1333rem;
            background: #eee;
            display: none;
        }
    }
    .pinglun {
      height: 0.48rem;
      width: 100%;
      background:#fff;
      span:nth-child(1) {
        height: 0.33rem;
        margin-left: 0.34rem;
        float: left;
        img{
          margin-top: 0.09rem;
          width: 68%;
          height: 100%;
        }
      }
      span:nth-child(2) {
        font-size: 0.35rem;
        // color: @dominantColor;
        color: #000;
        margin: 0 0.1rem;
        font-weight: bolder;
        float: left;
        
      }
    }
}
.imore{
  height: 20px;
  margin-top: .25rem;
}
</style>
<style>
.fadeIn{
  -webkit-animation-name: fadeIn; /*动画名称*/
  -webkit-animation-duration: 3s; /*动画持续时间*/
  -webkit-animation-iteration-count: 1; /*动画次数*/
  -webkit-animation-delay: 0s; /*延迟时间*/
}
.fadeout{
  -webkit-animation-name: fadeIn; /*动画名称*/
  -webkit-animation-duration: 3s; /*动画持续时间*/
  -webkit-animation-iteration-count: 1; /*动画次数*/
  -webkit-animation-delay: 0s; /*延迟时间*/
}
@-webkit-keyframes fadeIn {
   0%   { opacity: 0; /*初始状态 透明度为0*/}
   50%  { opacity: .5; /*中间状态 透明度为0*/}
   100% { opacity: 1; /*结尾状态 透明度为1*/}}
@-webkit-keyframes fadeOut {
   100%   { opacity: 1; /*初始状态 透明度为0*/}
   50%  { opacity: .5; /*中间状态 透明度为0*/}
   0% { opacity: 0; /*结尾状态 透明度为1*/}}
#detail .comment_btn {
  background: url(~@/assets/img/comment.png) no-repeat center center;
  background-size: 18.5px;
}
#detail .share_btn {
  background: url(~@/assets/img/share.png) no-repeat center center;
  background-size: .36rem;
}
#detail .zan_btn {
  background: url(~@/assets/img/zan.png) no-repeat center center;
  background-size: .36rem;
}
#detail .review_btn{
   background: url(~@/assets/img/collect.png) no-repeat center center;
  background-size: .36rem;
}
#detail .select_zan {
  background: url(~@/assets/img/select_zan.png) no-repeat center center;
  background-size: .36rem;
}
#detail .select_review {
  background: url(~@/assets/img/collect-active.png) no-repeat center center;
  background-size: 18px;
}
#detail .range_btn {
  background: url(~@/assets/img/range.png) no-repeat center center;
  background-size: 22px;
}
/* #detail header .nvtt span.navclolr{color:rgb(26, 26, 26)!important} */
</style>
