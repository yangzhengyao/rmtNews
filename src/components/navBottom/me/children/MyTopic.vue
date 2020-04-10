<template>
  <div>
     <!-- 小弹窗 -->
    <div class="mask" v-show="mask" @click="shade()">
      <div class="popup">
        <p @click="tocomment(0)" :class="select==0?'selectcolor':''">{{comment[0]}}</p>
        <p @click="tocomment(1)" :class="select==1?'selectcolor':''">{{comment[1]}}</p>
      </div>
    </div>

    <!-- 头部 -->
    <div :class="iphonexPadding ? 'iphonexMarginClass':'header' ">
      <header  :class="iphonexPadding ? 'iphonexMarginClass headerNavFixed':'headerNavFixed' ">
        <div class="nvbt ibackBack" @click="apis.iback()"></div>
        <div :class="mask?'nvtt icon':'nvtt icon1'" @click="tab()">{{comment[select]}}</div>
      </header>
    </div>

    <!-- <div class="borderline"></div> -->
    <div class="wrapper"
    v-infinite-scroll="loadBottomAjax"
    infinite-scroll-disabled="bottomLock"
    infinite-scroll-distance="10"
    infinite-scroll-immediate-check="false">

      <!-- 首次加载的loadding -->
      <div class="loaddingview" v-if="loadingtransform">
        <div class="loading"></div>
      </div>

      <!-- 我评论的 -->
      <div v-if="select=='1'">
        <div class="none" v-if="UserSendCommnets.length==0">
            暂无评论
        </div>
        <div class="infoList" v-for="(items,index) in UserSendCommnets" :key="index">
          <div  @click.stop="routeDateil(items.paentData.auto_id)">
             <div class="infoHeader">
              <img class="headerImg" :src="items.commentUser.imgurl?apis.theme.imgHost+items.commentUser.imgurl:imgurl" />
              
              <dl>
                <dt>{{items.username}}</dt>
                <dd>{{items.commentTime}}</dd>
              </dl>
            </div>

            <div class="response" v-if="reply">
              回复<a href="" style="color:#3F6290">@{{items.paentData.user.personName}}</a>:<span class="response_content">{{items.content}}</span>
            </div>

            <div :class="reply?'listcontent bgcolor2':'listcontent bgcolor1'">
                <!-- <div class="reply" v-if="items.childData"><a href="" style="color:#3F6290">@{{items.commentUser.personName}}</a>:{{items.content}}</div> -->
              <div class="listcontent_con">
                <div class="listcontent_pic" v-if="JSON.parse(items.paentData.blog_info_images) && JSON.parse(items.paentData.blog_info_images).length">
                  <img :src="JSON.parse(items.paentData.blog_info_images).length>0?JSON.parse(items.paentData.blog_info_images)[0].images:''" />
                </div>
                <div :class="reply?'describe bgcolor1':'describe bgcolor2'">
                  <p class="describe_user">@{{items.paentData.user.personName}}</p>
                  <div class="describe_content">{{items.paentData.content}}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="items.type=='1'" @click.stop="routeDateil(items.paentData.auto_id)">
            <div class="infoHeader">
              <img class="headerImg" :src="items.commentUser.imgurl?items.commentUser.imgurl:imgurl" />
              <dl>
                <dt>{{items.username}}</dt>
                <dd>{{items.commentTime}}</dd>
              </dl>
            </div>
            <div class="response" v-if="reply">
              回复<a href="" style="color:#3F6290">@{{items.paentData.username}}</a>:<span class="response_content">{{items.content}}</span>
            </div>

            <div :class="reply?'listcontent bgcolor2':'listcontent bgcolor1'">
                <div class="reply"><a href="" style="color:#3F6290">@{{items.paentData.username}}</a>:{{items.paentData.content}}</div>
              <div class="listcontent_con">
                <div class="listcontent_pic" v-if="JSON.parse(items.paentData.paentData.blog_info_images)">
                  <img :src="JSON.parse(items.paentData.paentData.blog_info_images).length>0?JSON.parse(items.paentData.paentData.blog_info_images)[0].images:''" />
                </div>
                <div :class="reply?'describe bgcolor1':'describe bgcolor2'">
                  <p class="describe_user">@{{items.paentData.paentData.user.personName}}</p>
                  <div class="describe_content">{{items.paentData.paentData.content}}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- 我的评论-->
      <div v-if="select=='0'">
        <div class="none" v-if="UserCommnets.length==0">
            暂无评论
        </div>
        <div class="infoList" v-for="(item,index) in UserCommnets" :key="index">
          <div @click.stop="routeDateil(item.paentData.auto_id)">

              <div class="infoHeader">
                <img class="headerImg" :src="item.commentUser.imgurl?apis.theme.imgHost+item.commentUser.imgurl:imgurl" />
                <dl>
                  <dt>{{item.commentUser.personName}}</dt>
                  <dd>{{item.commentTime}}</dd>
                </dl>
              </div>

              <div class="response" v-if="reply">
                <!-- 回复<a href="" style="color:#3F6290">@{{item.commentUser.personName}}</a>: -->
                <span class="response_content">{{item.content}}</span>
              </div>

              <div :class="reply?'listcontent bgcolor2':'listcontent bgcolor1'">
                  <!-- <div class="reply" v-if="item.childData"><a href="" style="color:#3F6290">@{{item.commentUser.personName}}</a>:{{item.content}}</div> -->
                <div class="listcontent_con">
                  <div class="listcontent_pic" v-if="JSON.parse(item.paentData.blog_info_images) && JSON.parse(item.paentData.blog_info_images).length">
                    <img :src="JSON.parse(item.paentData.blog_info_images).length>0?JSON.parse(item.paentData.blog_info_images)[0].images:''" />
                  </div>
                  <div :class="reply?'describe bgcolor1':'describe bgcolor2'">
                    <p class="describe_user">@{{item.paentData.user.personName}}</p>
                    <div class="describe_content">
                      {{item.paentData.content}}
                    </div>
                  </div>
                </div>
              </div>
          </div>

          <div v-if="item.type=='1'" @click.stop="routeDateil(item.paentData.auto_id)">

              <div class="infoHeader">
                <img class="headerImg" :src="item.commentUser.imgurl?item.commentUser.imgurl:imgurl" />
                <dl>
                  <dt>{{item.commentUser.personName}}</dt>
                  <dd>{{item.commentTime}}</dd>
                </dl>
              </div>

              <div class="response" v-if="reply">
                <!-- 回复<a href="" style="color:#3F6290">@{{item.commentUser.personName}}</a>: -->
                <span class="response_content">{{item.content}}</span>
              </div>

              <div :class="reply?'listcontent bgcolor2':'listcontent bgcolor1'">
                  <!-- <div class="reply" v-if="item.childData"><a href="" style="color:#3F6290">@{{item.commentUser.personName}}</a>:{{item.content}}</div> -->
                <div class="listcontent_con">
                  <div class="listcontent_pic" v-if="JSON.parse(item.paentData.blog_info_images).length>0">
                    <img :src="JSON.parse(item.paentData.blog_info_images).length>0?JSON.parse(item.paentData.blog_info_images)[0].images:''" />
                  </div>
                  <div :class="reply?'describe bgcolor1':'describe bgcolor2'">
                    <p class="describe_user">@{{item.paentData.user.personName}}</p>
                    <div class="describe_content">
                      {{item.paentData.content}}
                    </div>
                  </div>
                </div>
              </div>
          </div>

        </div>
      </div>
      <div class="bottomLoad" v-if="UserCommnets.length > 0 || UserSendCommnets.length > 0">
        <div class="loading" v-show="bottomLoading">加载中...</div>
        <div class="noData" v-if="bottomNoData">没有更多的内容了</div>
      </div>
      
    </div>
  </div>
</template>
<script>
import qs from "qs";
import axios from "axios";
export default {
  name: "MyTopic",
  data() {
    return {
      comment:["我的评论","我评论的"],
      select:0,
      popupVisible:false,
      reply: true,
      mask:false,
      iphonexPadding: false,
      userDataid: "",
      loadingtransform: true,
      UserCommnets: [],
      UserSendCommnets:[],
      imgurl:require("../img/head.png"),
      bottomLock: false,      // 上滑开关
      bottomLoading: false,    // 底部loading
      bottomNoData: false,    // 底部nothing
      pageNo:2,
      pageNo1:2,
      pageSize:10,
    };
  },
  methods: {
    tocomment(number){
        this.select=number
        if(this.select==1){
          this.getUserSendCommnets();
        }else{
          this.getUserCommnets();
        }
    },
    loadBottomAjax(){  //我的评论 和我评论的分页 接口暂不支持
      // var that=this;
      // var postData = "";
      // if (!this.bottomNoData) {
      //     this.bottomLock = true
      //     this.bottomLoading = true
      //     if(this.select == 1){
      //         this.loadingtransform = true;
      //         axios({
      //           url: that.apis.theme.api.me.getUserSendCommnets,
      //           method: "post",
      //           data: {
      //             receiverId: that.userDataid,
      //             pageNo:this.pageNo,
      //             pageSize:10
      //           }
      //         }).then(res => {
      //           if(res.data.data.length > 0){
      //             let datas = res.data.data;
      //             datas.forEach((v, i) => {
      //               if(v.type == 4 && v.commentUser && v.paentData.user){
      //                 that.UserSendCommnets.push(v);
      //               }
      //             });
      //             this.pageNo++;
      //           }else{
      //             this.bottomLoading = false;
      //             this.bottomNoData = true;
      //           }
      //           that.loadingtransform = false;
      //         });
      //     }else{
      //         this.loadingtransform = true;
      //         axios({
      //           url: that.apis.theme.api.me.getUserCommnets,
      //           method: "post",
      //           data: {
      //             receiverId: that.userDataid,
      //             pageNo:this.pageNo1,
      //             pageSize:10
      //           }
      //         }).then(res => {
      //           console.log(res,'我的评论');
      //           if(res.data.data.length > 0){
      //             let datas = res.data.data;
      //             datas.forEach((v, i) => {
      //               if(v.type == 4 && v.commentUser && v.paentData.user){
      //                 that.UserCommnets.push(v);
      //               }
      //             });
      //             this.pageNo1++;
      //           }else{
      //             this.bottomLoading = false;
      //             this.bottomNoData = true;
      //           }
      //           that.loadingtransform = false;
      //         });
      //     }
          
      // }
      this.bottomNoData = true;
    },
    shade(){
        this.mask=!this.mask
    },
    tab(){
        this.popupVisible=!this.popupVisible
        this.mask=!this.mask
    },
    routeDateil(autoId){
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
    getUserCommnets() {
      //查看我的评论 列表
      let that = this;
      this.loadingtransform = true;
      that.UserCommnets = [];
      axios({
        url: that.apis.theme.api.me.getUserCommnets,
        method: "post",
        data: {
          receiverId: that.userDataid
        }
      }).then(res => {
        console.log(res,'我的评论');
        let datas = res.data.data;
        datas.forEach((v, i) => {
          if(v.type == 4 && v.commentUser && v.paentData.user){
            that.UserCommnets.push(v);
          }
        });
        that.loadingtransform = false;
        this.bottomNoData = false;
      });
    },

    getUserSendCommnets() {
      //查看我评论  的列表
      let that = this;
      this.loadingtransform = true;
      that.UserSendCommnets = [];
      axios({
        url: that.apis.theme.api.me.getUserSendCommnets,
        method: "post",
        data: {
          receiverId: that.userDataid
        }
      }).then(res => {
        console.log(res,'我评论的');
        let datas = res.data.data;
        datas.forEach((v, i) => {
          if(v.type == 4 && v.commentUser && v.paentData.user){
            that.UserSendCommnets.push(v);
          }
        });
        this.bottomNoData = false;
        that.loadingtransform = false;
      });
    },
    getDataid() {
      let that = this;
      let userDataid = JSON.parse(localStorage.getItem("userData"));
      console.log(userDataid);

      if (userDataid !== null) {
        that.userDataid = userDataid.user_id;
      } else {
        that.userDataid = false;
      }
    }
  },
  mounted() {
    if (this.apis.iphonexPaddingFn()) {
      this.iphonexPadding = true;
    }
  },
  created() {
    this.getDataid();
    this.getUserCommnets();//我的评论
    // this.getUserSendCommnets();//我评论的
  }
};
</script>
<style scoped lang="less">
.mask{
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 10000;
  top: 0;
  left: 0;
  background: rgba(0,0,0,0.1);
  .popup{
    background: #fff;
    width: 40%;
    height: 1.5rem;
    margin: 1.3rem auto;
    border-radius: 10px;
    padding-top: 0.25rem;
    position: relative;
    z-index: 10000;
    p{
      width: 80%;
      height: 0.5rem;
      line-height: 0.5rem;
      margin: 0 auto;
      text-align: center;
      font-size: .25rem;
      // border-bottom: 1px solid #000;
    }
    .selectcolor{
      color: #e68e34;
    }
    &::before{
      content:"";
      position: absolute;
      top: -0.18rem;
      left:50%;
      width: 0;
      z-index: 999999999;
      border: 5px solid;
      border-color: transparent transparent white transparent ;
    }
  }
}
.none{
  font-size: 0.32rem;
  width: 100%;
  color: #D9D9D9;
  text-align: center;
  margin-top: 3rem;
}
.wrapper {
  margin-top: .3rem;
  height: 90vh;
  overflow-y: auto;
  position: relative;
  -webkit-overflow-scrolling: touch;
  .loaddingview {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999999999;
    background: #fff;
  }
  .loaddingview .loading {
    position: absolute;
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
}
.borderline {
  padding-top: 0.1rem;
}
.headerNavFixed {
  background: #fff;
  height: 0.88rem;
  border-bottom: 1px solid #e6e6e6;
  .icon1{
    position: relative;
    font-size: .3rem;
    &::after{
      content:"";
      position: absolute;
      top: .3rem;
      margin-left: .15rem;
      width: .3rem;
      height: .3rem;
      background: url("../img/untop.png") no-repeat;
      background-size: contain;
    }
  }
  .icon{
    position: relative;
    font-size: .3rem;
    &::after{
      content:"";
      position: absolute;
      margin-left: .15rem;
      top: .3rem;
      width: .3rem;
      height: .3rem;
      background: url("../img/top.png") no-repeat ;
      background-size: contain;
    }
  }
}
.headerNavFixed > div {
  height: 0.88rem;
  color: #000;
}
.header {
  height: 0.89rem;
}
.iphonexMarginClass {
  height: 1.26rem;
}
.infoList {
  width: 100%;
  padding-top: 0.4rem;
  font-size: 16px;
  border-bottom: 0.2rem solid rgba(242, 242, 242, 1);
  .infoHeader {
    padding: 0 0.3rem;
    height: 1rem;
    display: flex;
    align-items: center;
    margin-bottom: 0.14rem;
    // overflow: hidden;
    .headerImg {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      float: left;
    }
    dl {
      margin-left: 0.25rem;
      float: left;
      dt {
        width: 4rem;
        font-size: 0.36rem;
        font-weight: 400;
        // font-size: 0.35rem;
        color: #1a1a1a;
        // margin-bottom: 0.1rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      dd {
        height: 0.28rem;
        font-size: 0.24rem;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        margin-top: 0.1rem;
      }
    }
    .floatR {
      // width: 1.6rem;
      float: right;
    }
    .guanBox {
      .yiguan {
        border: 1px solid rgba(255, 128, 43, 1);
        border-radius: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.26rem;
        color: rgba(255, 128, 43, 1);
        padding: 0.1rem 0.2rem;
        img {
          width: 0.24rem;
          height: 0.24rem;
          margin-right: 0.1rem;
        }
      }
      .weiguan {
        border: 1px solid #d9d9d9;
        border-radius: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.26rem;
        background: #fff;
        color: #4d4d4d;
        padding: 0.1rem 0.2rem;
        img {
          width: 0.24rem;
          height: 0.24rem;
          margin-right: 0.1rem;
        }
      }
    }
    .delImg {
      width: 1.36rem;
      height: 0.38rem;
      margin-top: 0.15rem;
      img {
        width: 0.36rem;
        height: 0.38rem;
        float: right;
      }
    }
    .dele3 {
      width: 1.36rem;
    }
  }
  .response {
    font-size: 0.32rem;
    padding: 0 0.3rem;
    .response_content {
      color: rgba(26, 26, 26, 1);
      font-weight: 500;
    }
  }
  .listCont {
    width: 100%;
    margin-top: 0.3rem;
    .ding {
      display: flex;
      color: #fff;
      flex-direction: row;
      margin-top: 0.03rem;
      float: left;
      p {
        margin-right: 0.12rem;
        width: 0.4rem;
        height: 0.4rem;
        background: rgba(245, 69, 69, 1);
        border-radius: 0.1rem;
        text-align: center;
        font-size: 0.2rem;
        line-height: 0.44rem;
      }
      .ding1 {
        background: rgba(255, 172, 56, 1);
      }
      .ding2 {
        background: rgba(255, 133, 71, 1);
      }
    }
    .ding p:nth-last-child(1) {
      margin-right: 0.2rem;
    }
    .centxt {
      line-height: 0.5rem;
      font-size: 0.3rem;
      font-weight: 400;
      color: rgba(26, 26, 26, 1);
      .fenlei {
        color: #576b95;
      }
    }
  }
  .listcontent {
    padding: 0.2rem 0.3rem;
    margin: 0.3rem 0 0.1rem;
    width: 100%;
    background: #f7f7f7;

    .reply {
      font-size: 0.32rem;
      margin-bottom: 0.2rem;
    }
    .listcontent_con {
      background: #fff;
      display: flex;
      .listcontent_pic {
        width: 1.66rem;
        height: 1.66rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .describe {
        font-size: 0.28rem;
        flex: 1;
        padding: 0.16rem 0.28rem;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        width: 100%;
        .describe_user {
          font-size: 0.32rem;
        }
        .describe_content {
          color: #666666;
          font-size: 0.26rem;
          line-height: 0.4rem;
          margin-top: 0.08rem;
          width: 4.7rem;
          overflow : hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
      .bgcolor2 {
        background: #f7f7f7;
      }
    }
  }
  .bgcolor1 {
    background: #fff;
  }
  .listImg {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin-top: 0.3rem;
    div {
      width: 2.2rem;
      height: 2.2rem;
      margin: 0 0.15rem 0.15rem 0;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    }
    .zoomPic {
      width: 3.5rem;
      height: 2.8rem;
    }
  }
  .listImg div:nth-child(3n) {
    margin-right: 0;
  }
  .listLoca {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 0.3rem;

    padding-bottom: 0.2rem;
    .quan {
      height: 0.36rem;
      padding: 0 0.1rem;
      line-height: 0.36rem;
      background: rgba(227, 37, 25, 1);
      border-radius: 0.36rem;
      font-size: 0.22rem;
      color: #fff;
      text-align: center;
    }
    img {
      width: 0.19rem;
      height: 0.28rem;
      margin: 0.1rem 0 0 0.2rem;
    }
    .locas {
      width: 2.36rem;
      height: 0.5rem;
      background: rgba(249, 247, 248, 1);
      display: flex;
      span {
        height: 0.26rem;
        font-size: 0.26rem;
        display: inline-block;
        padding: 0.1rem 0 0 0.12rem;
        font-family: SourceHanSansCN-Regular;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        text-align: center;
        line-height: 0.26rem;
      }
    }
  }
  .share {
    width: 100%;
    display: flex;
    justify-content: space-between;
    border-top: 1px solid rgba(230, 230, 230, 1);
    color: rgba(102, 102, 102, 1);
    padding: 0.2rem 0.3rem;
    li {
      display: flex;
      align-items: center;
      min-height: 0.4rem;
    }
    img {
      width: 0.32rem;
      height: 0.32rem;
      margin-right: 0.1rem;
    }
    .shareBut {
      margin-left: 0.1rem;
    }
    .itemLike {
      min-width: 0.6rem;
      img {
        float: left;
      }
    }
  }
}
</style>