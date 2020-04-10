<template>
  <div class="cont">
    <div class="loaddingview" v-if="loadingtransform">
      <div class="loading"></div>
    </div>
    <header class="com_header headerNavFixed" style="background: #fff;border-bottom:1px solid #f2f2f2;">
      <div class="nvbt ibackBack" @click="apis.iback()"></div>
      <div class="nvtt" style="color: #1a1a1a;">详情</div>
      <div class="nvbt idoc"></div>
    </header>
    <div class="datilse" :class="iphonexPadding ? 'iphonexpaddingslist':''" >
      <info-list :state-list="stateList" :isShare="isShare" :isShoot="isShoot"></info-list>
      <div class="sinupall">
        <div class="lines" ></div>
        <div class="all-comments"  id="viewscer" >
          <div class="comdetails-say" :isLiked="isLikedFlag"><span></span>全部评论</div>
          <comcont
            :comments="comment"
            @addcontsback="addcontsback"
            @likedClickCallback="likedClickCallback"
            @dele="dele"
          ></comcont>
        </div>
        <div class="bottoms"></div>
      </div>
    </div>
    <div class="tool-lists" :class="[{'focus': focus},{'iphonexPaddingTool':iphonexPadding}]">
      <!-- 左边 -->
      <div class="left"  @click.stop="inputFocus">
        <div v-if="userstatusn">
          <div class="text" v-show="!focus">
            <a class="icon-write">我来说两句...</a>
          </div>
          <!-- 回复可以@功能，加上placeholder属性 -->
          <textarea
            id="input"
            rows="10"
            cols="30"
            contenteditable="true"
            style="-webkit-user-select: auto;"
            :class="{ normal: !focus,inputWidth:focus }"
            v-model="inputVal"
            @focus.stop="onFocus"
            @blur.stop="onBlur"
            ref="input1"
            :placeholder="placeholderVal"
          ><br/></textarea>
        </div>
      </div>
      <div class="right-listnews" v-show="!focus">
        <a :class=" !isReview ? 'review_btn':'select_review'" @click="collection()"></a>
        <a class="zan_btn" @click="zan_btns" :class=" likeactive == false ? 'zan_btn':'select_zan'"></a>
        <!-- <a class="share_btn"></a> -->
      </div>
      <!-- 发送按钮 -->
      <span
        v-show="focus"
        class="publish_btn"
        :class="{ hasVal: inputVal.length > 0 ? true : false }"
        @click="sendMsg">
        发送
      </span>
    </div>
  </div>
</template>
<script>
import InfoList from "@/components/navBottom/infoList/InfoList";
import api from "../../../assets/js/api";
import { mapGetters, mapMutations, mapActions } from "vuex";
import axios from "axios";
import { Toast } from "mint-ui";
import qs from "qs";
import Bus from "@/Bus";
import { setTimeout } from "timers";
export default {
  data() {
    return {
      commentId: "",
      comment: [], //二级评论列表
      isLikedFlag: true,
      Lv1Isliked: false,
      Lv1IslikedNum: 0,
      error: false,
      isShare: false,
      userDataid: "",
      contall: [],
      loadingtransform: true,
      imgurl: "",
      person_name: "",
      dianzanUrl: require("./images/zan-select.png"),
      canceUrl: require("./images/zan-gray.png"),
      interval: null,
      bfscrolltop: 0,
      // placeholder:'这一刻您的想法...',
      typenumber: 4,
      receiverId: "",
      beContent: "",
      isTrue: false,
      pageNo:1,
      pageSize:100,
      focus: false, // input是否聚焦
      inputVal: "", // input的内容
      keepInputVal: "", // 失焦持久的input内容
      placeholderVal: "", // @的内容
      interval: null,
      iphonexPadding: false,
      stateList: [],
      likeactive: false,
      newsflage: true,
      isReview:false,
      userstatusn:true,
      isShoot:1  //是否是濮阳拍客
    };
  },
  components: {
    InfoList
  },
  watch: {
    focus(val) {
      // 聚焦
      if (val) {
        // 是否有持久内容
        if (this.keepInputVal) {
          // this.inputVal = "";
        }
      } else {
        this.placeholderVal = "";

        if (this.inputVal) {
          // this.keepInputVal = this.inputVal;
          this.inputVal = "";
        } else {
          this.keepInputVal = "";
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
    let userDataid = JSON.parse(localStorage.getItem("userData"));
    let autoIds = JSON.parse(localStorage.getItem("articleDetail"));
    this.userDataid = userDataid.user_id;
    this.person_name = userDataid.person_name;
    this.imgurl = userDataid.imgurl;
    this.getL2ConmmentsList(autoIds.autoId);
    this.commentId = autoIds.autoId;
    if(userDataid){
      if(userDataid.user_status=="0"){
        this.userstatusn=true;
      }else{
        this.userstatusn=false;
      }
    }
    if(this.apis.getTheme() =='puyang'){
      this.isShoot = 2;
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
      };
    if (this.apis.iphonexPaddingFn()) {
      this.iphonexPadding = true;
    }
    this.listaxios();
  },
  methods: {
    ...mapActions("integral",["updateUserRecordTime"]),
    collection(){
        let that = this;
        let url = '';
        let data = '';
        if (JSON.parse(localStorage.getItem("userData") == null)) {
          that.apis.urlParams("Login", {});
        } else {
          //判断用户下次点击是添加收藏还是取消收藏
          if( !that.isReview){
            url = api.theme.api.community.addFavorites;
            data = {
                "type":4,
                "userFavorites":this.commentId,
                "userId":this.userDataid,
                "appInfoId":that.apis.theme.api.appInfoId
            }
          } else {
            url = api.theme.api.community.delUserFavorites;
            data = {
                "userFavorites":this.commentId,
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
                if( that.isReview){
                    that.isReview = false;
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
    // 聚焦
    inputFocus() {
      $(".tool-lists #input").focus();
    },
    // 聚焦时候的钩子
    onFocus() {
      this.focus = true;
      setTimeout(() => {
        // 移动端聚焦打开键盘的时候，让tool元素位于视图中。ios系统下会被盖住。
        this.$el.scrollIntoView(true);
      }, 100);
      $(".tool-lists").css({ bottom: "0" });
      this.bfscrolltop = document.body.scrollTop; //获取软键盘唤起前浏览器滚动部分的高度
      this.interval = setInterval(function() {
        //设置一个计时器，时间设置与软键盘弹出所需时间相近
        document.body.scrollTop = document.body.scrollHeight; //获取焦点后将浏览器内所有内容高度赋给浏览器滚动部分高度
      }, 100);
    },
    // 失焦时候的钩子
    onBlur() {
      setTimeout(() => {
        if (this.focus == true) {
          $(".tool-lists #input").blur();
          this.focus = false;
          this.receiverId = "";
          this.beContent = "";
          
          this.typenumber = 4;
        }
      }, 0);
    },
    //一级评论列表
    getL2ConmmentsList(id) {
      axios({
        method: "post",
        url: api.theme.api.news.activitygetActivities,
        data: { pid: id, userId: this.userDataid, username: this.person_name, pageNo:this.pageNo,pageSize:this.pageSize},
        headers: { "Content-Type": "application/json; charset=utf-8" }
      })
        .then(res => {
          let isSuccess = res.data.success;
          if (isSuccess) {
            this.contall = res.data.data;
            if (res.data.data[0].commentsList != null) {
              this.comment = res.data.data[0].commentsList;
            }
            this.loadingtransform = false;
          } else {
            this.loadingtransform = false;
            console.log("查询失败！");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    canclelike() {
      axios({
        method: "post",
        url: this.apis.theme.api.community.cancelLikeBlogs,
        data: { blog_id: this.commentId, user_id: this.userDataid },
        headers: { "Content-Type": "application/json; charset=utf-8" }
      })
      .then(res => {
        let isSuccess = res.data.success;
        if (isSuccess) {
          Toast({
            message: res.data.message,
            position: "middle",
            duration: 1500
          });
          this.likeactive = false;
        }
      })
      .catch(err => {
        console.log(err);
      });
    },
    zan_btns() {
      if (this.likeactive == true) {
        this.canclelike();
      } else {
        axios({
          method: "post",
          url: this.apis.theme.api.community.likeBlogs,
          data: { blog_id: this.commentId, user_id: this.userDataid },
          headers: { "Content-Type": "application/json; charset=utf-8" }
        })
          .then(res => {
            let isSuccess = res.data.success;
            if (isSuccess) {
              Toast({
                message: res.data.message,
                position: "middle",
                duration: 1500
              });
              this.likeactive = true;
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    addcontsback(id, name, content,items) {
      var that=this;
      that.apis.urlParams('commentsdetails',{'title':items},false);
      plus.webview.getWebviewById(window.location.href.split('#/')[0]+'#/'+"commentsdetails").addEventListener(
        "close",
        function(e) {
          that.getL2ConmmentsList(that.commentId)
        },
        false
      );
      //新闻评论相互回复
      // if (this.focus == false) {
      //   this.placeholderVal = "回复" + name;
      //   this.beContent = content;
      //   this.receiverId = id;
      //   this.typenumber = 3;
       
      //   this.focus = true;
      //   $(".tool-lists #input").focus();
      // }
    },
    plusready(){},
    likedClickCallback(index) {
      //  用户 第一次 进入 点赞；点赞在取消点赞；取消点赞再点赞 3中情况
      let itemClick = this.comment[index];
      axios({
        method: "post",
        url: api.theme.api.news.commentLikes,
        data: {
          commentId: itemClick.commentId,
          userId: this.userDataid,
          type: 1
        },
        headers: { "Content-Type": "application/json; charset=utf-8" }
      })
        .then(res => {
          let isSuccess = res.data.success;
          let tipMgs = res.data.message;
          if (isSuccess && tipMgs == "取消点赞成功！") {
            Toast({
              message: tipMgs,
              position: "middle",
              duration: 1500
            });
            itemClick.like = false;
            itemClick.likeNum--;
          } else if (isSuccess && tipMgs == "点赞成功！") {
            Toast({
              message: tipMgs,
              position: "middle",
              duration: 1500
            });
            itemClick.like = true;
            itemClick.likeNum++;
          } else {
            Toast({
              message: "点赞失败",
              position: "middle",
              duration: 1500
            });
          }
        })
        .catch(err => {
          console.log(err);
          console.log("点赞失败！");
        });
    },
    //删除评论
    dele(index) {
      let itemClick = this.comment[index];
      axios({
        method: "post",
        url: api.theme.api.news.delesay,
        data: { commentId: itemClick.commentId, userId: this.userDataid },
        headers: { "Content-Type": "application/json; charset=utf-8" }
      }).then(res => {
        let isSuccess = res.data.success;
        let tipMgs = res.data.message;
        if (isSuccess) {
          this.comment.splice(index, 1);
          Toast({
            message: tipMgs,
            position: "middle",
            duration: 1500
          });
        }
      });
    },
    //列表
    listaxios() {
      axios({
        method: "post",
        url: this.apis.theme.api.community.getBlogByIddetails,
        data: { auto_id: this.commentId, loginUserId: this.userDataid },
        headers: { "Content-Type": "application/json; charset=utf-8" }
      }).then(res => {
        let isSuccess = res.data.success;
        if (isSuccess) {
          this.stateList = res.data.data;
          this.receiverId=res.data.data[0].user.autoId;
          this.likeactive = res.data.data[0].like;
          this.isReview = res.data.data[0].fav;
          Bus.$emit("stateList", this.stateList);
        }
      });
    },

    sendMsg() {
      //进行评论回复
      this.$nextTick(() => {
        document.getElementById("viewscer").scrollIntoView(true);
      });
      if (this.inputVal.trim().length == 0) {
        this.inputVal = "";
        Toast({
          message: "内容不能为空",
          position: "middle",
          duration: 1500
        });
        return;
      }
      axios({
        method: "post",
        url: api.theme.api.news.addComment,
        data: {
          appInfoId:this.apis.theme.api.appInfoId,
          pid: this.commentId,
          type: this.typenumber,
          userId: this.userDataid,
          content: this.inputVal,
          username: this.person_name,
          portraitUrl: this.imgurl,
          receiverId: this.receiverId,
          beContent: this.beContent,
          topContentId:this.commentId,
          topContentType:this.typenumber
        },
        headers: { "Content-Type": "application/json; charset=utf-8" }
      })
        .then(res => {
          let isSuccess = res.data.success;
          if(isSuccess==false && res.data.errorCode=="1112"){
             Toast({
              message: "你已被禁止评论任何内容！",
              position: "middle",
              duration: 1500
            });
            return
          }
          if (isSuccess) {
            this.inputVal = "";
            this.updateUserRecordTime({ //评论成功调用积分更新接口
              userId: JSON.parse(localStorage.getItem( 'userData' )).user_id,
              appInfoId: api.theme.api.appInfoId,
              expType: 7,
              recordTime: 1,
            })
            Toast({
              message: "评论成功",
              position: "middle",
              duration: 1500
            });
          var timer = null;
            timer =setInterval(() => {
               this.getL2ConmmentsList(this.commentId)
               clearInterval(timer);
            }, 1000);
          } else {
            Toast({
              message: "评论失败",
              position: "middle",
              duration: 1500
            });
          }
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {});
    },
    times: api.timesdata
  }
};
</script>


<style lang="stylus" scoped>
.datilse {
  margin-top: 1.33rem;  
  height: calc(90vh - 20px);overflow: auto;
  -webkit-overflow-scrolling: touch;
  
}
.iphonexpaddingslist {
     margin-top: 1.33rem!important;
}
.activalls {
  widht: 100%;
  overflow: hidden;
  margin-top: 20%;
}

.activitydetails {
  padding: 0 0.4rem;
  margin-top: 0.8rem;
}

.details-title {
  font-size: 0.4rem;
  color: #1a1a1a;
  padding-top: 0.3rem;
}

.cont {
  width: 100%;
  overflow: hidden;
}

.sinupall {
  // height: calc(100vh - 20px);
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  margin-bottom: 1.3rem;
  overflow: scroll;
}

.comdetails-say{ color:#242424; font-size:0.35rem; margin-bottom:0.1rem;font-weight:bold;}
.comdetails-say span{width:4px;height:16px; background:#E32519;display:inline-block; margin-bottom:-0.03rem;
                    margin-right: 0.12rem;border-radius: 2px;}

.lines {
  border-bottom: 1px solid #ebebeb;
  width: 100%;
  height: 1px;
  margin-bottom: 20px;
}

.all-comments {
  width: 90%;
  margin: 0 auto;
}

.comments-start {
  width: 100%;
  overflow: hidden;
  margin-bottom: 0.28rem;
  padding-top: 0.2rem;
}

.comments-start .leftcomments-img {
  width: 0.7rem;
  height: 0.7rem;
  float: left;
}

.comments-start .leftcomments-img img {
  width: 0.7rem;
  height: 0.7rem;
  border-radius: 100px;
}

.comments-start .rightcomments-img {
  width: 85%;
  float: right;
}

.comments-start .rightcomments-img .right-middles {
  width: 100%;
  overflow: hidden;
}

.comments-start .rightcomments-img .right-middles .left-names {
  color: #576b95;
  font-size: 0.32rem;
  width: 60%;
  float: left;
}

.comments-start .rightcomments-img .right-middles .right-zan {
  float: right;
  font-size: 0.24rem;
  color: #666;
}

.comments-start .rightcomments-img .right-middles .right-zan img {
  width: 0.4rem;
  height: 0.4rem;
  vertical-align: middle;
  display: inline-block;
  margin-right: 0.1rem;
}

.comments-start .rightcomments-img .right-middles .right-zan span {
  position: relative;
  top: 0.08rem;
}

.rightcomments-img .coments-cont {
  color: #262626;
  font-size: 0.34rem;
  margin-top: 0.2rem;
}

.coments-endbottom {
  color: #999999;
  font-size: 0.24rem;
}

.coments-endbottom span {
  padding-top: 0.25rem;
  display: inline-block;
}

.coments-endbottom font {
  display: inline-block;
  color: #262626;
  background: #f5f5f5;
  margin-left: 0.28rem;
  padding: 0.11rem 0.2rem;
  border-radius: 50px;
}

.bottoms {
  padding-bottom: 1.2rem;
  // background #f2f2f2
}

.fixeds {
  width: 100%;
  height: 1.1rem;
  background: #ffffff;
  position: fixed;
  bottom: 0;
  z-index: 999999;
  padding-bottom: 1.1rem;
  padding-top: 0.12rem;
}

.fixeds input {
  width: 76%;
  float: left;
  background: #f0f4f3;
  height: 0.6rem;
  display: block;
  border-radius: 50px;
  margin-left: 0.34rem;
  padding-left: 0.3rem;
  margin-top: 0.16rem;
  font-size: 0.28rem;
  float: left;
}

.release-btn {
  font-size: 0.32rem;
  display: block;
  color: #fff;
  float: left;
  background: #be2c1f;
  padding: 0.1rem 0.2rem;
  border-radius: 5px;
  margin-left: 0.3rem;
  margin-top: 0.27rem;
}

.deletes {
  font-size: 0.26rem;
  display: inline-block;
  float: right;
  margin-top: 0.3rem;
}
</style>
<style>
.loaddingview {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999999999;
  background: #fff;
}
.loading {
  position: fixed;
  top: 35%;
  left: 50%;
  margin: -20px 0 0 -20px;
  width: 40px;
  height: 40px;
  border: 2px solid;
  border-color: #fd4d4d #fd4d4d transparent;
  border-radius: 50%;
  box-sizing: border-box;
  animation: loading 1s linear infinite;
  z-index: 99999999999999991;
}
@keyframes loading {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.iphonexPaddingDetail {
  padding-bottom: 1.7rem;
}
.iphonexPaddingHeader {
  margin-top: 2rem !important;
}
.iphonexPaddingVal-bottom {
  margin-bottom: 8%;
}
textarea {
  -webkit-appearance: none;
}
.textarea-cont {
  width: 76%;
  background: #f5f5f5;
  border: none;
  border-radius: 5px;
  outline: none;
  font-size: 0.28rem;
  height: 1rem;
  display: block;
  margin-left: 0.16rem;
  padding-top: 0.1rem;
  padding-left: 0.2rem;
  float: left;
}
</style>

<style lang='less'>
.tool-lists {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 666;
  display: flex;
  background: #fdfdfd;
  border-top: 1px solid #ddd;
  padding-right: 0.32rem;
  font-size: 0;
  align-items: center;
  padding-bottom: env(safe-area-inset-bottom);
  .left {
    flex: 4;
    position: relative;
    padding-left: 16px;
    font-size: 0;
    .text {
      position: absolute;
      left: 32px;
      top: 0;
      z-index: 111;
      font-size: 12px;
      a {
        height: 42px;
        display: table-cell;
        vertical-align: middle;
        white-space: nowrap;
      }
    }
    #input {
      width: 270px;
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
      word-break: break-all;
      &::-webkit-scrollbar {
        width: 0;
        height: 0;
        display: none;
      }
      &.normal {
        height: 31px !important;
        line-height: 20px;
      }
      &.inputWidth {
        width: 5.5rem;
      }
    }
  }
  .right-listnews {
    flex: 1.5;
    font-size: 0;
    padding-left: 0.2rem;
    a {
      display: inline-block;
      text-align: center;
      width: 50%;
      height: 0.96rem;
      font-size: 0.4rem;
      text-decoration: none;
      vertical-align: top;
    }
    .comment_btn {
      position: relative;
      .comment_num {
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
    font-size: 0.32rem;
    // font-weight: bold;
    color: #d9d9d9;
    user-select: none;
    vertical-align: middle;
    &.hasVal {
      color: @dominantColor;
    }
  }
}
.iphonexPaddingTool {
  padding-bottom: 0.84rem;
}
</style>
<style>
.right-listnews .comment_btn {
  background: url(~@/assets/img/comment.png) no-repeat center center;
  background-size: 18.5px;
}
.right-listnews .share_btn {
  background: url(~@/assets/img/share.png) no-repeat center center;
  background-size: 0.36rem;
}
.right-listnews .zan_btn {
  background: url(~@/assets/img/zan.png) no-repeat center center;
  background-size: 0.36rem;
}
.right-listnews .review_btn {
  background: url(~@/assets/img/collect.png) no-repeat center center;
  background-size: 0.36rem;
}
.right-listnews .select_zan {
  background: url(~@/assets/img/select_zan.png) no-repeat center center;
  background-size: 0.36rem;
}
.right-listnews .select_review {
  background: url(~@/assets/img/collect-active.png) no-repeat center center;
  background-size: 18px;
}
.right-listnews .range_btn {
  background: url(~@/assets/img/range.png) no-repeat center center;
  background-size: 22px;
}
</style>


