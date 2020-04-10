<template>
<div class="cont">
     <div class='loaddingview' v-if="loadingtransform">
         <div class="loading"></div>
     </div>
   <header class="com_header headerNavFixed" style="background: #fff;">
      <div class="nvbt ibackBack" @click="apis.iback()"></div>
      <div class="nvtt" style="color: #1a1a1a;" v-if="titles!='0'">{{titles}}条回复</div>
      <div class="nvtt" style="color: #1a1a1a;" v-else>暂无回复</div>
      <div class="nvbt idoc"></div>
    </header>
     <div class="sinupall">
    <div class="all-comments" id="viewscer" >
    <div class="activalls" :class="iphonexPadding ? 'iphonexPaddingHeader':'aaaa'">
        <div class="comments-start">
            <div class="leftcomments-img">
                    <!-- <img :src='apis.theme.imgHost+JSON.parse( getStorge ).imgurl' v-if="imgurl!=null"/> -->
                    <img :src='apis.theme.imgHost+defaultobj.portraitUrl' v-if="defaultobj.portraitUrl!=null"/>
                    <img :src='"~@/assets/img/head.png"' v-else/>
                    <!-- <img :src='"~@/assets/img/"+apis.getTheme()+"/me/dafultImg.png"' v-else/> -->
              </div>
            <div class="rightcomments-img">
                <div class="right-middles">
                    <div class="left-names">{{defaultobj.username}}</div>
                    <div class="right-zan" @click="Lv1Islike"><img :src="Lv1Isliked? dianzanUrl:canceUrl"/><span>{{Lv1IslikedNum}}</span></div>
                </div>
                <div class="coments-cont">{{defaultobj.content}}</div>
                <div class="coments-endbottom"><span>{{times(defaultobj.commentTime)}}</span> <div class="deletes" v-if="userDataid==defaultobj.userId"  @click="deleparent">删除</div></div>
               
            </div>
        </div>
        </div>
  </div>
  <div class="lines"></div>
<div class="all-comments">
  <div class="comdetails-say" :isLiked="isLikedFlag" v-if="comment.length>0"><span></span>全部评论</div>
    <comcont :comments="comment" @addcontsback="addcontsback" @likedClickCallback="likedClickCallback" @dele="dele"></comcont>
</div>
<div class="bottoms"></div>
  </div>
 
  <!-- <div class="fixeds" :class="iphonexPadding ? 'iphonexPaddingVal-bottom':'aaaa'">
     <textarea rows="10" cols="30" contenteditable="true" style="-webkit-user-select: auto;" ref="input1" 
     :placeholder="placeholder"  v-model="commentsContant" class="textarea-cont" @focus="onFocus" @blur="onBlur"></textarea>
     <div class="release-btn" @click="sendMsg">发布</div>
</div> -->

 <div class='tool' :class="[{'focus': focus},{'iphonexPaddingTool':iphonexPadding}]">
        <!-- 左边 -->
        <div class="left" @click.stop="inputFocus">
          <div v-if="userstatusn">
            <div class="text" v-show='!focus'>
                <a class="icon-write">我来说两句...</a>
            </div>
            <!-- 回复可以@功能，加上placeholder属性 -->
            <textarea id='input'  rows="10" cols="30"    contenteditable="true" 
            style="-webkit-user-select: auto;" :class="{ normal: !focus,inputWidth:focus }" v-model='inputVal' 
            @focus.stop="onFocus" @blur.stop="onBlur" ref="input1" :placeholder="placeholderVal"><br/></textarea>
        </div>
       </div>
        <!-- 发送按钮 -->
        <span v-show='focus' class="publish_btn" :class="{ hasVal: inputVal.length > 0 ? true : false }"  @click="sendMsg">发送</span>
    </div>



  </div>
</template>
<script>

import api from "../../../../src/assets/js/api.js";
import { mapGetters, mapMutations, mapActions } from "vuex";
import axios from "axios";
import { Toast } from "mint-ui";
import qs from "qs";
import { setTimeout } from 'timers';
export default {
  data() {
    return {
      commentId:'',
      comment:[],//二级评论列表
     
       defaultConmmentsInfo:{
          commentId:'',
       },
       defaultobj:{
           username:'',
           likeNum:0,
           commentId:'',
           content:'',
           commentTime:'',
           portraitUrl:''
       },
       isLikedFlag:true,
       Lv1Isliked:false,
       Lv1IslikedNum:0,
       error: false,
       titles:'',
       userDataid:'',
       contall:[],
       loadingtransform:true,
       imgurl:'',
       person_name:'',
       iphonexPadding:false,
        dianzanUrl:require("./images/zan-select.png"),
       canceUrl:require("./images/zan-gray.png"),
       interval:null,
       bfscrolltop:0,
      // placeholder:'这一刻您的想法...',
       typenumber:1,
       receiverId:'',
       beContent:'',
       isTrue:false,
       pageNo:1,
       pageSize:100,
       focus: false,       // input是否聚焦
       inputVal: '',       // input的内容
       keepInputVal: '',   // 失焦持久的input内容
       placeholderVal: '',  // @的内容
       interval:null,
       iphonexPadding:false,
       userstatusn:true
    };
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
   computed: {
    ...mapGetters("login", [
      "getStorge" // active的栏目
    ])
  },
  
  created() {
     let userDataid=JSON.parse(localStorage.getItem("userData"));
     console.log(userDataid,"userDataid")
     let activititlecont = JSON.parse( localStorage.getItem('activitydetails'));
        this.userDataid=userDataid.user_id;
        this.person_name=userDataid.person_name;
        this.imgurl=userDataid.imgurl;
        if(userDataid){
         if(userDataid.user_status=="0"){
           this.userstatusn=true;
         }else{
            this.userstatusn=false;
         }
        }
  },
  mounted(){
    let activititlecont = JSON.parse( localStorage.getItem('commentsdetails'));
    this.getL2ConmmentsList(activititlecont.title.commentId)
    //  this.titles=activititlecont.title.commentNum;
     this.commentId=activititlecont.title.commentId;
     this.defaultConmmentsInfo = {
        commentId:activititlecont.title.commentId,
     }
    if( this.apis.iphonexPaddingFn() ){
        this.iphonexPadding = true;
    }
  },
  methods: {
    ...mapActions("integral",["updateUserRecordTime"]),
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
            $('.tool #input').blur();
            this.focus = false;
            this.receiverId = "";
            this.beContent = "";
            this.person_name=JSON.parse(localStorage.getItem("userData")).person_name;
            this.typenumber=1
          },0)
            
        },
    //二级评论列表
    getL2ConmmentsList(id){
      axios({
          method: "post",
          url:api.theme.api.news.getCommenlist,
          data: {commentId:id,userId:this.userDataid,username:this.person_name,pageNo:this.pageNo,pageSize:this.pageSize},
          headers:{'Content-Type':'application/json; charset=utf-8'}	
      }).then(res => {
          let isSuccess = res.data.success;
          if(isSuccess){
              this.contall=res.data.data;
              console.log(res.data.data,"res.datares.data")
              if(res.data.data[0].commentsList!=null){
                  this.comment=res.data.data[0].commentsList;
              }
              this.defaultobj.likeNum=res.data.data[0].likeNum;
              this.defaultobj.commentId=res.data.data[0].commentId;
              this.defaultobj.content=res.data.data[0].content;
              this.defaultobj.commentTime=res.data.data[0].commentTime;
              this.defaultobj.portraitUrl=res.data.data[0].portraitUrl;
              this.Lv1Isliked = res.data.data[0].like;
              this.Lv1IslikedNum = res.data.data[0].likeNum;
              this.defaultobj.userId=res.data.data[0].userId;
              this.receiverId=res.data.data[0].userId;
              this.defaultobj.username=res.data.data[0].username;
              this.titles=res.data.data[0].commentNum;
              this.loadingtransform=false
             
          }else{
            this.loadingtransform=false
            console.log("查询失败！")
          }
        
      }).catch(err => {
        console.log(err)
      })
    },
    addcontsback(id,name,content){  //二级回复
    console.log(this.receiverId, "恢复")
         if(this.focus==false){
        this.placeholderVal = "回复" + name;
        this.beContent = content;
        this.receiverId = id;
        this.typenumber = 3;
        this.focus = true;
        this.person_name=name;
        $(".tool #input").focus();
      }
        
    },
    likedClickCallback(index){//  用户 第一次 进入 点赞；点赞在取消点赞；取消点赞再点赞 3中情况
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
          }else{
             Toast({
              message:'点赞失败',
              position:"middle",
              duration:1500
              });
          }
        
      }).catch(err => {
        console.log(err)
        console.log("点赞失败！")
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
            this.comment.splice(index,1);
            this.titles=parseInt(this.titles-1);
             Toast({
              message:tipMgs,
              position:"middle",
              duration:1500
            });
        }
      });
         
    },
    deleparent(){
      let that=this;
          axios({
          method: "post",
          url:api.theme.api.news.delesay,
          data: {commentId:this.defaultobj.commentId,userId:this.userDataid},
          headers:{'Content-Type':'application/json; charset=utf-8'}	
      }).then(res => {
         let isSuccess = res.data.success;
         let tipMgs = res.data.message;
         if(isSuccess){
         this.contall=[];
         this.comment=[]
             Toast({
              message:tipMgs,
              position:"middle",
              duration:1500
            });
             setTimeout( () =>{
              this.apis.iback();
            },1600)
        }
      });
    },
    sendMsg(){
      //进行评论回复  
     this.$nextTick(() => {
          document.getElementById("viewscer").scrollIntoView(true);
      });
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
              pid: this.defaultConmmentsInfo.commentId,
              type:this.typenumber,
              userId:this.userDataid,
              content: this.inputVal,
              username:this.person_name,
              portraitUrl:this.imgurl,
              receiverId:this.receiverId, //点击回复多传了这个相互回复 父级就是空
              beContent:this.beContent,  //点击回复多传了这个相互回复
              topContentId:this.defaultConmmentsInfo.commentId,
              topContentType:this.typenumber,
              appInfoId: this.apis.theme.api.appInfoId,
            },
            headers:{'Content-Type':'application/json; charset=utf-8'}	
        }).then(res => {
            let isSuccess = res.data.success;
            if(isSuccess==false && res.data.errorCode=="1112"){
             Toast({
              message: "你已被禁止评论任何内容！",
              position: "middle",
              duration: 1500
            });
            return
          }
            if(isSuccess){
                this.inputVal = ""
                this.updateUserRecordTime({ //评论成功调用积分更新接口
                  userId: JSON.parse(localStorage.getItem( 'userData' )).user_id,
                  appInfoId: api.theme.api.appInfoId,
                  expType: 7,
                  recordTime: 1,
                })
                  Toast({
                    message:'评论成功',
                    position:"middle",
                    duration:1500
                  });
            var timer = null;
                timer =setInterval(() => {
                    this.getL2ConmmentsList(this.defaultConmmentsInfo.commentId)
                  clearInterval(timer);
                }, 1000);
            }else{
                    Toast({
                    message:'评论失败',
                    position:"middle",
                    duration:1500 
                  });
            }
         
        }).catch(err => {
          console.log(err)
           
        }).finally(()=>{
          
        })
    },
    //一级赞
    Lv1Islike(){
      console.log(this.Lv1Isliked)
           axios({
              method: "post",
              url:api.theme.api.news.commentLikes,
              data: {commentId:this.defaultobj.commentId,userId:this.userDataid,type:1},
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
          })
     
    },
    times: api.timesdata,
  }
};
</script>
<style lang="stylus" scoped>

.activalls{ widht:100%; overflow:hidden; margin-top:20%}
.activitydetails{ padding:0 0.4rem; margin-top:0.8rem}
.details-title{
  font-size:0.4rem;
  color:#1a1a1a; padding-top:0.3rem;
}

.cont{ width:100%; overflow hidden}
.sinupall{ height: calc(100vh - 40px); overflow: auto; -webkit-overflow-scrolling:touch; overflow:scroll;}
.comdetails-say{ color:#242424; font-size:0.35rem; margin-bottom:0.1rem;font-weight:bold;}
.comdetails-say span{width:4px;height:16px; background:#E32519;display:inline-block; margin-bottom:-0.03rem;
                    margin-right: 0.12rem;border-radius: 2px;}
.lines{ border-bottom:1px solid #ebebeb; width:100%; height:1px; margin-bottom:20px}
.all-comments{width:90%; margin 0 auto}
.comments-start{width:100%; overflow hidden; margin-bottom:0.28rem; padding-top:0.2rem}
.comments-start .leftcomments-img{width:0.7rem; height:0.7rem; float:left;  }
.comments-start .leftcomments-img img{width:0.7rem; height:0.7rem; border-radius:100px}
.comments-start .rightcomments-img{width:85%; float:right}
.comments-start .rightcomments-img .right-middles{ width:100%; overflow:hidden}
.comments-start .rightcomments-img .right-middles .left-names{ color:#576b95; font-size:0.32rem;width:60%; float:left;}
.comments-start .rightcomments-img .right-middles .right-zan{ float:right; font-size:0.24rem; color:#666;}
.comments-start .rightcomments-img .right-middles .right-zan img{width:0.4rem; height:0.4rem;
vertical-align:middle;display:inline-block; margin-right:0.1rem }
.comments-start .rightcomments-img .right-middles .right-zan span{position:relative; top:0.08rem}
.rightcomments-img .coments-cont{ color:#262626; font-size:0.34rem; margin-top:0.2rem}
.coments-endbottom{color:#999999; font-size:0.24rem; }
.coments-endbottom span{padding-top:0.25rem; display:inline-block}
.coments-endbottom font{ display:inline-block; color:#262626; background:#f5f5f5; margin-left:0.28rem; padding:0.11rem 0.2rem;border-radius:50px;}

.bottoms{padding-bottom:1.2rem}
.fixeds{width:100%; height: 1.1rem; background:#ffffff;  position:fixed; bottom:0; z-index :999999; padding-bottom: 1.1rem;padding-top: 0.12rem }
.fixeds input{ width:76%; float:left; background:#f0f4f3; height:0.6rem; display:block; border-radius:50px; margin-left:0.34rem; padding-left:0.3rem; margin-top:0.16rem; font-size:0.28rem; float:left}
.release-btn{ font-size:0.32rem; display:block;color:#fff; float:left; background:#be2c1f;padding: 0.1rem 0.2rem;border-radius:5px; margin-left: 0.3rem; margin-top: 0.27rem}
.deletes{font-size:0.26rem;  display:inline-block; float:right; margin-top:0.3rem }
</style>
<style>
.loaddingview{width: 100%;height: 100%;position: fixed;top:0;left: 0;z-index:999999999;background: #fff}
.loaddingview .loading{position: fixed;top: 35%;left: 50%;margin: -20px 0 0 -20px;width: 40px;height: 40px;border: 2px solid;border-color: #fd4d4d #fd4d4d transparent;border-radius: 50%;box-sizing: border-box;animation: loading 1s linear infinite;z-index: 99999999999999991;}
@keyframes loading{0%{transform: rotate(0deg);}
100%{transform: rotate(360deg);}}
.iphonexPaddingDetail{ padding-bottom: 1.7rem }
.iphonexPaddingHeader{ margin-top: 2rem !important; }
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
    border-top: 1px solid #ddd;
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


