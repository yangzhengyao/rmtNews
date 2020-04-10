<template>
<div class="cont">
    <!-- @touchstart="gotouchmove" -->
    <div class='loaddingview' v-if="loadingtransform">
         <div class="loading"></div>
    </div>
     <header class="com_header headerNavFixed" style="background: #fff;">
      <div class="nvbt ibackBack" @click="apis.iback()"></div>
      <div class="nvtt" style="color: #1a1a1a;"></div>
      <div class="nvbt idoc"></div>
    </header>
  <div class="sinupall" @touchstart="gotouchmove">
   
    <div class="activalls" :class="iphonexPadding ? 'iphonexPaddingVal':'aaaa'" >
     <div class="activitydetails">
        <div class="details-title">{{activityDetails.activityName}}</div> 
       <div class="button-details" v-if="activityDetails.signUpStatus=='1'">报名中</div> 
          <div class="button-details grays" v-else>已结束</div>
    </div>
      <div class="details-bg">
          <div class="details-times">时间：{{formateDate(activityDetails.activityStartTime,0)}} - {{formateDate(activityDetails.activityEndTime,0)}}</div>
          <div class="details-times">地点：{{activityDetails.activityAdrress}}</div>
          <div class="details-times">费用：{{activityDetails.activityCost.length == 0?"免费":activityDetails.activityCost}}元</div>
          <div class="details-times">人数：<font>{{activityDetails.activitySingUpNum}}</font>/{{activityDetails.activitySingUpPlaces}}人</div>
          <div class="details-times">报名：截止至 {{formateDate(activityDetails.activitySignUpEndTime,1)}}</div>
      </div> 
       <div class="details-centers">
        <p v-html="activityDetails.activityContent"></p>
        <!-- <p><img :src="activityDetails.activityTitlePicUrl"/></p> -->
      </div>
  </div>
  <div class="lines"></div>
<div class="all-comments"  id="viewscer">
      <comcont :comments="comment" @replayClikCallback="replayClikCallback" @likedClickCallback="likedClickCallback" @dele="dele"></comcont>
</div>
<div class="bottoms"></div>
 
  </div>
  
<div class="bottom-fixed" :class="iphonexPadding ? 'iphonexPaddingVal':'aaaa'">
    <ul>
      <li @click="activityColl"><img :src="fav ? celcollectUrl:collectUrl" />
      <font v-html="fav?'取消收藏':'收藏'" ></font></li>
      <li @click="activityLiked"><img :src="Lv1Isliked? canceUrl:dianzanUrl" />
      <font v-html="Lv1Isliked?'取消点赞':'点赞'" ></font></li>
      <!-- ({{Lv1IslikedNum}}) -->
      <li><img src="~@/assets/img/comments.png" @click="activityComments"/>评论</li>
       <li class="nocont-number" v-if="activityDetails.signUpStatus!='1'">已结束</li> 
      <li class="end-number" v-if='isSuccessbtn==true'  @click="Cancellation">取消报名</li>
       <li class="start-number" @click="activitygo" v-if='isSuccessbtn==false && activityDetails.signUpStatus=="1"'>立即报名</li> 
      
    </ul>
</div>
<!-- <div class="fixeds" v-show="isCommentsShow" :class="iphonexPadding ? 'iphonexPaddingVal-bottom':'aaaa'">
  <textarea rows="10" cols="30"  style="-webkit-user-select: auto;" placeholder="这一刻您的想法..." ref="input1" v-model="commentsContant" class="textarea-cont" @focus.stop="onFocus" @blur.stop="onBlur" ></textarea>
   <div class="release-btn" @click="sendMsg">发布</div>
</div> -->
 <div class='tool' v-show="isCommentsShow" :class="[{'focus': focus},{'iphonexPaddingTool':iphonexPadding}]" style="height:1.2rem">
        <!-- 左边 -->
        <div class="left"  @click.stop="inputFocus">
            <div class="text" v-show='!focus'>
                <a class="icon-write">我来说两句...</a>
            </div>
            <!-- 回复可以@功能，加上placeholder属性 -->
            <textarea id='input'  rows="10" cols="30"    contenteditable="true" 
            style="-webkit-user-select: auto;" :class="{ normal: !focus,inputWidth:focus }" v-model='inputVal' 
            @focus.stop="onFocus" @blur.stop="onBlur" ref="input1" :placeholder="placeholderVal"><br/></textarea>
        </div>
       
        <!-- 发送按钮 -->
        <span v-show='focus' class="publish_btn" :class="{ hasVal: inputVal.length > 0 ? true : false }"  @click="sendMsg">发送</span>
    </div>



  </div>
</template>
<script>
import api from "../../../../src/assets/js/api.js";
import { mapGetters, mapMutations, mapActions } from "vuex";
import { Toast } from "mint-ui";
import { Spinner } from 'mint-ui';
import axios from "axios";
import qs from "qs";
import Bus from '@/Bus';
export default {
  data() {
    return {
      activityDetails:{
        activityName:"",//活动名称
        activityTitle:"",//活动标题
        signUpStatus:1,//进行中 默认
        activityStartTime:"",//活动开始时间
        activityEndTime:"",//活动结束时间
        activityAdrress:"",//活动地点
        activityCost:"",//活动费用
        activitySignUpEndTime:"",//活动报名截止时间
        activitySingUpNum:"",//活动报名人数
        activitySingUpPlaces:"",//活动报名人数名额
        activityContent:"",//活动具体内容
        activityTitlePicUrl:"",//标题图片
        titles:"",
      },
      isCommentsShow:false,//输入框显示标识
      comment:[],//评论列表
      isLiked:false,//评论是否点赞 默认false
      likedNum:0,//评论点赞数量 默认 0
      activeID:"",
      isSuccessbtn:false,
      Lv1Isliked:false,
      Lv1IslikedNum:0,
      Lv1IsColl:false,
      error: false,
      userDataid:'',
      loadingtransform:true,
      person_name:'',
      imgurl:'',
      iphonexPadding:false,
      dianzanUrl:require("@/assets/img/zan.png"),
      canceUrl:require("@/assets/img/select_zan.png"),
      collectUrl:require("@/assets/img/collect.png"),
      celcollectUrl:require("@/assets/img/collect-active.png"),
      interval:null,
      bfscrolltop:0,
      pageNo:1,
      pageSize:100,
      focus: false,       // input是否聚焦
      inputVal: '',       // input的内容
      keepInputVal: '',   // 失焦持久的input内容
      placeholderVal: '',  // @的内容
      interval:null,
      iphonexPadding:false,
      fav:false
    }
  },
  components: {},
  created() {
    let userDataid=JSON.parse(localStorage.getItem("userData"));
    let activititlecont = JSON.parse( localStorage.getItem('activitydetails'));
    this.userDataid=userDataid.user_id;
    this.person_name=userDataid.person_name;
    this.titles=activititlecont.title.name;
    this.imgurl=userDataid.imgurl;
    this.activeID=activititlecont.title.id;
    this.getActivityInfo(this.activeID);
    this.getActivitylist(this.activeID);
    this.singupsList(this.activeID);
  },
  watch: {
    focus(val) {
      // 聚焦
      if (val) {
        // 是否有持久内容
        if (this.keepInputVal) {
          this.inputVal = ''
        }
      } else {
        this.placeholderVal = ''
          
        if (this.inputVal) {
          this.keepInputVal = this.inputVal
          this.inputVal = ''
        } else {
          this.keepInputVal = ''
        }
      }
    }
  },
  methods: {
    ...mapActions("integral",["updateUserRecordTime"]),
    //获取活动详情 根据活动id获取 
    getActivityInfo(id){
      axios({
          method: "post",
          url:api.theme.api.news.activityDetails,
          data: {
            "id":id,
            "userId":this.userDataid,
            "appInfoId":this.apis.theme.api.appInfoId
          },
          headers:{'Content-Type':'application/json; charset=utf-8'}	
      }).then(res => {
        let isSuccess = res.data.success;
        if(isSuccess){
          let info = res.data.data.length==0?{}:res.data.data[0];
          this.activityDetails= {
            activityName : info.name,//活动名称
            activityTitle : "欢迎参加“迎冬奥”十大志愿服务示范项目",//活动标题
            signUpStatus :info.signUpStatus,//进行中 默认
            activityStartTime : info.startTime?info.startTime:'',//活动开始时间
            activityEndTime:info.endTime?info.endTime:"",//活动结束时间
            activityAdrress:info.activitiesZone,//活动地点
            activityCost:info.perCost,//活动费用
            activitySignUpEndTime  :info.signUpEndTime?info.signUpEndTime:'',//活动报名截止时间
            activitySingUpNum: info.singUpNum,//活动报名人数
            activitySingUpPlaces: info.singUpCeiling,//活动报名人数名额
            activityContent:info.content,//活动具体内容
            activityTitlePicUrl:info.titlePicUrl,//标题图片
            aotuId:info.id, //信息ID
          }
          this.fav = info.fav;//是否已收藏
        }else{
          this.loadingtransform=false
          console.log("查询失败！")
        }
      }).catch(err => {
        console.log(err)
      })
    },
     getActivitylist(id){  //评论列表
      axios({
        method: "post",
        url:api.theme.api.news.activitygetActivities,
        data: {pid:id,userId:this.userDataid,username:this.person_name,pageNo:this.pageNo,pageSize:this.pageSize},
        headers:{'Content-Type':'application/json; charset=utf-8'}	
      }).then(res => {
        let isSuccess = res.data.success;
        if(isSuccess){
          this.comment=res.data.data[0].commentsList;
          this.Lv1Isliked = res.data.data[0].like;
          this.Lv1IslikedNum = res.data.data[0].likeNum;
          this.loadingtransform=false
        }else{
          console.log("查询失败！")
          this.loadingtransform=false
        }
      }).catch(err => {
        console.log(err)
      })
    },
    //时间格式处理
    formateDate(dateStr,type){
      if(dateStr.length == 0 || !dateStr)return "";
      return type == 0?dateStr.slice(0,-3).replace(/-/g,"/"):dateStr.slice(5,-3).replace(/-/g,"/")
    },
    //评论
    activityComments(){
      let userDataid = JSON.parse(localStorage.getItem("userData"));
      var that=this;
      if (userDataid== null) {
        that.apis.urlParams("Login");
        return
      }
      if(userDataid){
        if(userDataid.user_status=="0"){
          this.userstatusn=true;
        }else{
          this.userstatusn=false;
        }
      }
      this.$nextTick(()=> {
        this.$refs.input1.focus()
      })
     
    },
    //删除评论
    dele(index){
       let itemClick = this.comment[index];
      axios({
        method: "post",
        url:api.theme.api.news.delesay,
        data: {commentId:itemClick.commentId,userId:this.userDataid},
        headers:{'Content-Type':'application/json; charset=utf-8'}	
      }).then(res => {
          let isSuccess = res.data.success;
          let tipMgs = res.data.message;
          if(isSuccess){
          this.comment.splice(index,1)
            Toast({
            message:tipMgs,
            position:"middle",
            duration:1500
          });
        }
      });
    },
    //评论点赞
    likedClickCallback(index){
      let itemClick = this.comment[index];
      axios({
        method: "post",
        url:api.theme.api.news.commentLikes,
        data: {commentId:itemClick.commentId,userId:this.userDataid,type:1},
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
    },
    //活动点赞
    activityLiked(){
   var that=this;
      if (JSON.parse(localStorage.getItem("userData") == null)) {
        that.apis.urlParams("Login");
        return
      };
     axios({
        method: "post",
        url:api.theme.api.news.commentLikes,
        data: {commentId:this.activeID,userId:this.userDataid,type:0},
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
          this.Lv1Isliked =false;
          this.Lv1IslikedNum--
        }else if(isSuccess && tipMgs=="点赞成功！"){
          Toast({
            message:tipMgs,
            position:"middle",
            duration:1500
          });
          this.Lv1Isliked =true;
          this.Lv1IslikedNum++
        }
        
      }).catch(err => {
        console.log(err)
      })

    },
    activityColl(){
        let that = this;
        let url = '';
        let data = '';
        if (JSON.parse(localStorage.getItem("userData") == null)) {
          that.apis.urlParams("Login", {});
        } else {
          //判断用户下次点击是添加收藏还是取消收藏
          if( !that.fav){
            url = api.theme.api.community.addFavorites;
            data = {
              "type":0,
              "userFavorites":this.activeID,
              "userId":this.userDataid,
              "appInfoId":that.apis.theme.api.appInfoId
            }
          } else {
            url = api.theme.api.community.delUserFavorites;
            data = {
              "userFavorites":this.activeID,
              "userId":this.userDataid,
              "appInfoId":that.apis.theme.api.appInfoId
            }
          }
          axios({
            url: url,
            method: "post",
            data:data,
          })
          .then( res => {
             if( res.status ){
                if( that.fav){
                  that.fav = false;
                  that.$toast({
                    message: '取消收藏',
                    duration: 2000
                  });
                } else {
                    this.updateUserRecordTime({ //收藏成功调用积分接口
                      userId: JSON.parse(localStorage.getItem( 'userData' )).user_id,
                      appInfoId: that.apis.theme.api.appInfoId,
                      expType: 8,
                      recordTime: 1
                    })
                    that.fav = true;
                    that.$toast({
                        message: '收藏成功',
                        duration: 2000
                    });
                }
             } 
          })
        }
    },
    Cancellation(){
       axios({
        method: "post",
        url:api.theme.api.news.cancels,
        data: {activitiesId:this.activeID,userId:this.userDataid,},
        headers:{'Content-Type':'application/json; charset=utf-8'}	
      }).then(res => {
          let isSuccess = res.data.success;
          console.log(res,"sasa");
          if(isSuccess){
            Bus.$emit("activeID",this.activeID) //活动id传递
             Toast({
              message:res.data.message,
              position:"middle",
              duration:1500
              });
             this.isSuccessbtn=false
             this.activityDetails.activitySingUpNum--;
             Bus.$emit('changeNum');
          }else{
             Toast({
              message:res.data.message,
              position:"middle",
              duration:1500
              });
            console.log("查询失败！")
          }
        
      }).catch(err => {
        console.log(err)
      })
    },
    //一级评论回复点击跳转 评论详情页面
    replayClikCallback(id,isLiked,likedNum,items){
        var that=this;
      if (JSON.parse(localStorage.getItem("userData") == null)) {
        that.apis.urlParams("Login");
        return
      };
      this.apis.urlParams('commentsdetails',{'title':items},false);
         plus.webview.getWebviewById(window.location.href.split('#/')[0]+'#/'+"commentsdetails").addEventListener(
          "close",
          function(e) {
            that.getActivityInfo(that.activeID);
            that.getActivitylist(that.activeID);
            that.singupsList(that.activeID)
          },
          false
        );
      // console.log(id,isLiked,likedNum)
      // this.isCommentsShow = true ;
      // this.replayId = id
      // this.isLiked=isLiked;//评论是否点赞 默认false
      // this.likedNum=likedNum
    },
    gotouchmove(){
       this.isCommentsShow=false
    },
    
      // 聚焦
      inputFocus() {
          $('.tool #input').focus()
      },
      // 聚焦时候的钩子
      onFocus() {
        
            this.focus = true
          setTimeout(() => {
            // 移动端聚焦打开键盘的时候，让tool元素位于视图中。ios系统下会被盖住。
            this.$el.scrollIntoView(true)
          }, 100)
            $('.tool').css({'bottom':'0'})
          this.bfscrolltop = document.body.scrollTop;//获取软键盘唤起前浏览器滚动部分的高度
          this.interval = setInterval(function(){//设置一个计时器，时间设置与软键盘弹出所需时间相近
            document.body.scrollTop = document.body.scrollHeight;//获取焦点后将浏览器内所有内容高度赋给浏览器滚动部分高度
          },100)
      },
      // 失焦时候的钩子
      onBlur() {
        setTimeout(()=>{
          this.focus = false
          this.placeholderVal = '';
          this.receiverId='' 
          this.beContent=''  
          this.typenumber=1
        },0)
      },
    //发送回复消息
    sendMsg(){
      this.$nextTick(() => {
        document.getElementById("viewscer").scrollIntoView(true);
      });
      //请求内容 this.commentsContant
      if(this.inputVal.trim().length == 0){
        this.inputVal = "";
        Toast({
          message:"内容不能为空",
          position:"middle",
          duration:1500
        })
        return;
      }
      axios({
        method: "post",
        url:api.theme.api.news.addComment,
        data: {
          pid:this.activeID,
          type:0,
          userId:this.userDataid,
          content:this.inputVal,
          username:this.person_name,
          portraitUrl:this.imgurl,
        },
        headers:{'Content-Type':'application/json; charset=utf-8'}	
      }).then(res => {
        if(res.data.success==false && res.data.errorCode=="1112"){
             Toast({
              message: "你已被禁止评论任何内容！",
              position: "middle",
              duration: 1500
            });
            return
          }
          if(res.data.success){
            this.updateUserRecordTime({ //评论成功调用积分更新接口
              userId: JSON.parse(localStorage.getItem( 'userData' )).user_id,
              appInfoId: api.theme.api.appInfoId,
              expType: 7,
              recordTime: 1,
            })
              Toast({
                message:"评论成功",
                position:"middle",
                duration:1500
              })
         var timer = null;
            timer =setInterval(() => {
              this.getActivitylist(this.activeID);
              clearInterval(timer);
            }, 1000);
          }else{
            Toast({
              message:"评论失败",
              position:"middle",
              duration:1500
            })
          }
      }).catch(err => {
        console.log(err)
      })
      this.isCommentsShow = false ;
      this.inputVal = ""
    },
    singupsList(id){
      axios({
          method: "post",
          url:api.theme.api.news.signUpStatus,
          data: {activitiesId:id,userId:this.userDataid,username:this.person_name},
          headers:{'Content-Type':'application/json; charset=utf-8'}	
      }).then(res => {
          let isSuccess = res.data.success;
          if(isSuccess){
            this.isSuccessbtn=isSuccess
          }else{
            console.log("查询失败！")
          }
        
      }).catch(err => {
        console.log(err)
      })
    },

    activitygo(){
      var that=this;
      if (JSON.parse(localStorage.getItem("userData") == null)) {
        that.apis.urlParams("Login");
        return
      };
       that.apis.urlParams('signup',{},false);
       plus.webview.getWebviewById(window.location.href.split('#/')[0]+'#/'+"signup").addEventListener(
                "close",
                function(e) {
               
                 that.getActivityInfo(that.activeID);
                 that.getActivitylist(that.activeID);
                
                 that.singupsList(that.activeID)
                },
                false
             );
           
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
},
  directives: { focus: { // 指令的定义 
    inserted: function (el) { el.focus() } } 
  }

};
</script>
<style lang="less" scoped>
.activalls{ width:100%; overflow:hidden}
.activitydetails{ padding:0 0.4rem; margin-top:15%}
.details-title{font-size:0.4rem;color:#1a1a1a; padding-top:0.4rem;}
.cont{ width:100%; overflow :hidden}
.sinupall{ height: calc(100vh - 55px);overflow: auto;-webkit-overflow-scrolling: touch;overflow:scroll;}
.button-details{ width:1.61rem; height:0.58rem; background:#be2c1f; font-size:0.28rem; border-radius:50px; text-align:center; line-height:0.58rem; color:#fff; margin-top:0.32rem; margin-bottom:0.2rem  }
.button-details.grays{background:#a8a8a8}
.details-bg{background-image:~"url(./images/bg.png)"; width:95%; height:3.58rem;background-size:100%;background-repeat:no-repeat; margin:0px auto;padding-left:0.87rem;padding-top:6%;}
.details-times{ font-size:0.28rem; color:#fff; margin-bottom:0.15rem}
.details-times font{ font-size:0.28rem; color:#be2c1f}
.details-centers{padding:0 0.4rem 0.4rem; }
.details-centers p{ font-size:0.3rem; line-height:0.5rem; color:#1a1a1a; margin:0;padding:0}
.details-centers p img{ width:100%;display:block; text-align:center; margin-top:0.2rem}
.details-centers img{width:100%;display:block;width:100%;display:block; text-align:center; margin-top:0.2rem}
.bottom-fixed{ width:100%; height:0.98rem; background:#f5f5f5; position:fixed; bottom:0; z-index: 3}
.bottom-fixed ul li{ width:25%; float:left; text-align:center;font-size:0.22rem; color:#999999}
.bottom-fixed ul li img{width:0.46rem;height:0.46rem; display:block; margin:0.12rem auto 0 auto}
.bottom-fixed ul li.start-number{ background:#be2c1f; height:0.98rem; font-size:0.32rem; line-height:0.98rem; color:#fff}
.bottom-fixed ul li.end-number{ background:#ebb5b0;height:0.98rem; font-size:0.32rem; line-height:0.98rem; color:#fff}
.bottom-fixed ul li.nocont-number{background:#a8a8a8;height:0.98rem; font-size:0.32rem; line-height:0.98rem; color:#fff}
.lines{ border-bottom:1px solid #ebebeb; width:100%; height:1px; margin-bottom:20px}
.all-comments{width:90%; margin :0 auto}
.bottoms{padding-bottom:1.2rem}
.fixeds{width:100%; height: 1.1rem; background:#ffffff;  position:fixed; bottom:0; z-index :999999; padding-bottom: 1.1rem;padding-top: 0.12rem }
.fixeds input{ width:76%; float:left; background:#f0f4f3; height:0.6rem; display:block; border-radius:50px; margin-left:0.34rem; padding-left:0.3rem; margin-top:0.16rem; font-size:0.28rem; float:left}
.release-btn{ font-size:0.32rem; display:block;color:#fff; float:left; background:#be2c1f;padding: 0.1rem 0.2rem;border-radius:5px; margin-left: 0.3rem; margin-top: 0.27rem}
</style>
<style>
.loaddingview{width: 100%;height: 100%;position: fixed;top:0;left: 0;z-index:999999999;background: #fff}
.loaddingview .loading{position: fixed;top: 35%;left: 50%;margin: -20px 0 0 -20px;width: 40px;height: 40px;border: 2px solid;border-color: #fd4d4d #fd4d4d transparent;border-radius: 50%;box-sizing: border-box;animation: loading 1s linear infinite;z-index: 99999999999999991;}
@keyframes loading{0%{transform: rotate(0deg);}
100%{transform: rotate(360deg);}}
.details-centers img{width:100%;display:block;width:100%;display:block; text-align:center; margin-top:0.2rem}
.iphonexPaddingVal{ margin-top:.8rem;padding-bottom: 1.7rem }
.iphonexPaddingVal-bottom{ margin-bottom:8%}
textarea { -webkit-appearance: none;}
.textarea-cont{width:76%; background: #f5f5f5; border: none; border-radius:5px;outline:none; font-size:0.28rem;height: 1rem; display: block; margin-left: 0.16rem;padding-top: 0.1rem;padding-left: 0.2rem;float: left;}
</style>

<style lang='less'>
.tool {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 666;
    display: flex;
    background: #fdfdfd;
   
    padding-right: .32rem;
    font-size: 0;
    align-items: center;
    padding-bottom: env(safe-area-inset-bottom);
    .left {
        flex: 3;
        position: relative;
        padding-left: 16px;
        font-size: 0;
        .text {
            position: absolute;
            left: 32px;
            top: 0;
            z-index: 111;
            font-size: 12px;
            a{
                height: 42px;
                display: table-cell;
                vertical-align: middle;
                white-space: nowrap;
            }
        }
        #input {
            width: 200px;
            height: 31px;
            font-size: 14px;
            line-height: 20px;
            border-radius: 20px;
            border: 1px solid #f4f5f6;
            background: #f4f5f6;
            -webkit-appearance: none;
            outline: none;
            resize: none;
            overflow-y: auto !important;
            margin: 6px 0;
            padding: 6px 15px;
            word-break:break-all;
            &::-webkit-scrollbar {
                width: 0;
                height: 0;
                display: none;
            }
            &.normal{
                height: 31px !important;
                line-height: 20px;width:100%!important;
            }
            &.inputWidth{
                width: 5.5rem;
            }
        }
    }
    .right {
        flex: 2.5;
        font-size: 0;
        padding-left: .3rem;
        a {
            display: inline-block;
            text-align: center;
            width: 33%;
            height: .96rem;
            font-size: .4rem;
            text-decoration: none;
            vertical-align: top;
            
        }
        .comment_btn{
            position: relative;
            .comment_num{
                position: absolute;
                top: 8px;
                padding: 2px 4px 1px;
                text-align: center;
                border-radius: 100%;
                font-size: 10px;
                color: #fff;
                background: #d43d3d;
                line-height: 1;
            }
        }
    }
    .publish_btn {
        display: table-cell;
        padding-left: 15px;
        font-size: .32rem;
        // font-weight: bold;
        color: #d9d9d9;
        user-select:none;
        vertical-align: middle;
        &.hasVal{
            color: @dominantColor
        }
    }
}
.iphonexPaddingTool{
    padding-bottom: .84rem;
}
</style>



