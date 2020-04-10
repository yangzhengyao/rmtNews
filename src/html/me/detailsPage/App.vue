<template>
  <div id="detailPage"  
   :style="{'-webkit-overflow-scrolling': scrollMode}"
    v-infinite-scroll="loadBottomAjax"
    infinite-scroll-disabled="bottomLock"
    infinite-scroll-distance="10"
    infinite-scroll-immediate-check="true">
    <div class="scroll-wrapper"
    >
      <div class="bg">
        <img src="./images/back.png" alt @click="apis.iback()" />
        <div class="model"></div>
        <div class="headerMsg">
          <img  :src='"~@/assets/img/head.png"' alt v-if="userObj.imgurl == null || userObj.imgurl == ''"/>
          <img :src="apis.theme.imgHost+userObj.imgurl" alt="" v-else>
          <button v-if="initParams !==initParams" :class="userObj.focus?'':'followUrlClass'" @click="addUserFans( initParams )">
            <img :src="userObj.focus?followUrl:addUrl" alt />
            关注
          </button>
        </div>
        <div class="headerTitle">
          <span >{{ userObj.personName }}</span>
          <!-- <span>{{ userObj.description }}</span> -->
          <!-- 用户签名 -->
          <span>{{ userObj.signature }}</span> 
          <div>
            <span @click="newAttentionList">
              关注
              <i>{{ userObj.followNum }}</i>
            </span>
            <span>|</span>
            <span @click="newFans">
              粉丝
              <i>{{ userObj.fansNum }}</i>
            </span>
          </div>
        </div>
      </div>

      <div class="msg">
        <div class="tab" v-if="apis.getTheme() !='dongpo'">
          <span :class="{'seletecd':active == 0}" @click="toggle(0)">
            动态
            <i v-if="active == 0"></i>
          </span>
          <span :class="{'seletecd':active == 1}" @click="toggle(1)">
           <font>话题</font>
            <i v-if="active == 1"></i>
          </span>
        </div>
        <!-- 动态组件 -->
        <div class="" v-if="active == 0">
           <infolist :stateList='stateList' :isDele="isDele"></infolist>
        </div>
        <!-- 话题组件 -->
        <div class="Topic" v-if="active == 1">
           <div class="title">
              我共参与了<i>{{ topList.length }}个</i>话题
           </div>
           <TopicList></TopicList>
        </div>
      </div>
       <div id="loading" v-if="noLoading" >
        <spinner type="android" size="40px"></spinner>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import axios from "axios";
import qs from "qs";
import { Spinner } from "vux";
import infolist from '../../../components/navBottom/infoList/InfoList';
import TopicList from '../../../components/navBottom/infoList/TopicList';
import Bus from '@/Bus';
//引入主页
import { Header } from "mint-ui";
import { Toast } from "mint-ui";
import noData from "components/noData.vue";
// const root = process.env.API_ROOT;
export default {
  props: ["type"],
  data() {
    let type = this.apis.parseQueryString(window.location.href);
    let typeVal = 0;
    if( type.hasOwnProperty('type') ){
       typeVal = type.type;
    }
    return {
      initParams: {},
      headerJson: {}, //mock数据
      followUrl:require("./images/follow.png"),
      addUrl:require("./images/add.png"),
      isFollowUrl:false,
      json: [],
      loading: false,
      list: [],
      pageNum:1,
      autoId:'',
      active: typeVal,
      initParams:{},
      userObj:{},
      stateList:[],//动态列表,
      topList:[],//话题列表
      isDele:false, //默认是false 如果是本人的话为true，否则为false
      scrollMode: "auto", //移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
      bottomLock: true, // 上滑开关
      noLoading:false,
      loadingType:type,
      userDataid:''
    };
  },
  components: {
    noData,
    infolist,
    TopicList,
    Spinner
  },
  computed: {
    ...mapGetters("login", [
      "getStorge" // active的栏目
    ])
  },
  methods: {
    loadBottomAjax() {
      this.getBlog();
    },
    newAttentionList(){
      let that = this;
      that.apis.urlParams("newAttentionList?id="+this.autoId+"");
      plus.webview.getWebviewById(window.location.href.split('#/')[0]+'#/'+"newAttentionList").addEventListener(
        "close",
        function(e) {
            // let locals = JSON.parse( localStorage.getItem('userData') );
            // that._setStorage(JSON.stringify(locals));
        },
        false
      );
    },
    newFans(){
      let that = this;
      that.apis.urlParams("newFans?id="+this.autoId+"");
      plus.webview.getWebviewById(window.location.href.split('#/')[0]+'#/'+"newFans").addEventListener(
        "close",
        function(e) {
            // let locals = JSON.parse( localStorage.getItem('userData') );
            // that._setStorage(JSON.stringify(locals));
        },
        false
      );
    },
    plusready(){},
     //获取用户ID
    getParams() {
      let url = window.location.href;
      let urlParams = this.apis.parseQueryString(url);
      this.initParams = urlParams;
      return urlParams;
    },
    //切换
    toggle(val){
       this.active = val;
       if( this.active == 1 ){
          //话题列表
          this.selectTopic();
          
       } else if(this.active == 0){
          //动态列表
          // alert("点击")
          this.pageNum = 1;
          this.stateList = [];
          this.getBlog();
       }
    },
     //我的动态列表
    getBlog() {
      let that = this;
      that.noLoading = true;
      // alert(that.initParams.id)
      // alert(this.initParams)
      if(that.userDataid){
          var postId = {
            'pageNum':that.pageNum,
            'pageSize':10,
            'app_info_id':that.apis.theme.api.appInfoId,
            'user_id':that.initParams.id,  //当前列表页的ID
            'loginUserId':that.userDataid
          }
      }else{
        var postId = {
            'pageNum':that.pageNum,
            'pageSize':10,
            'app_info_id':that.apis.theme.api.appInfoId,
            'user_id':this.autoId
          }
      }
      axios({
        method: "post",
        data:postId,
        url: that.apis.theme.api.community.getStateList
      }).then(res => {
        if( res.data.status = 1 ){
           that.noLoading = false;
           that.stateList = that.stateList.concat(res.data.blog);
           //判断是否是最后一页，禁止上拉加载
            if (res.data.data.lastPage == false) {
               that.pageNum++;
               that.bottomLock = false;
            } else {
              that.bottomLock = true;
            }
           Bus.$emit('stateList',that.stateList);
           that.$nextTick(function() {
            that.scrollMode = "touch";
           });
        }
      });
    },
    //我的话题列表   ！！！
    selectTopic() {
      let that = this;
      that.noLoading = true;
      localStorage.setItem('topicCircleList', JSON.stringify({"typeId":"话题","isShow":false,"type":1})); 
      // alert( this.autoId)
      if(!that.initParams){
        var postId = {
          user_id:this.autoId,
          appInfoId: parseInt(that.apis.theme.api.appInfoId)
        }
      }else{
        var postId = {
          user_id:that.initParams.id,
          appInfoId:parseInt(that.apis.theme.api.appInfoId)
        }
      }
      axios({
        method: "post",
        data:postId,
        url: that.apis.theme.api.community.selectTopic
      }).then(res => {
        if( res.data.success ){
           that.noLoading = false;
           that.topList = res.data.data;
           Bus.$emit( 'teamListso',{ teamList:that.topList,judgment:1,fulltopic:4,autoId:this.autoId} )
          //  Toast({
          //     message: res.data.message,
          //     position: "middle",
          //     duration: 1000
          //   });
        }
      });
      // Bus.$emit('userlistId',{autoId:this.autoId});
      // alert(this.teamList)
    },
    //添加关注
    addUserFans() {
      // alert(this.getStorge)
      let that = this;
      let url = '';
      if( this.userObj.focus ){
          url = that.apis.theme.api.me.cancelFans;
      } else {
          url = that.apis.theme.api.me.addUserFans;
      }
      // that.userObj.focus = !that.userObj.focus;
      axios({
        method: "post",
        data:{
          userId:that.initParams,
          fansId:JSON.parse( this.getStorge ).user_id
        },
        url: url
      }).then(res => {
        if( res.data.success ){
           if( that.userObj.focus ){
              Toast(res.data.message);
              that.userObj.fansNum--;
              that.userObj.focus = !that.userObj.focus;
           } else {
             Toast(res.data.message);
             that.userObj.fansNum++;
             that.userObj.focus = !that.userObj.focus;
           }
        }
      });
    },
    //用户详情
    selectManageUserById() {
      let that = this;
      // 判断id是自己的还是别人的,如果是自己的主页 initParams.id = autoId;
      // 否就是 autoId就是别人的, searchUserId就是当前登录者的ID 
      // 默认3333是当前登录者的ID, 后期改成登录者的id
      let params = {
         'autoId':that.initParams.id
      };
      if( !that.initParams){
         params['searchUserId'] = this.initParams.id;
      } 
      
      axios({
        method: "post",
        data:params,
        url: that.apis.theme.api.me.selectManageUserById
      }).then(res => {
         this.autoId = res.data.data[0].autoId
        if( res.data.success ){
           that.userObj = res.data.data[0];
        }
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
    
  },
  created() {
    this.getParams();
    this.getDataid();
    if (window.plus) {
      this.plusready();
    } else {
      document.addEventListener("plusready",this.plusready(),false);
    }
    //删除
    Bus.$on('childDel',(val) =>{
       let that  = this;
        // this.stateList.splice(val.index,1);
        //  plus.nativeUI.alert("删除成功", function() {}, "提示", "确定");
        plus.nativeUI.confirm("确定删除这条动态吗？", function(e) {
          //确定回调
          if (e.index == 0) {
            let param = {
              auto_id: val.autoId,//帖子的id
              user_id: that.initParams.id//当前用户登录的id
            };
            console.log( JSON.stringify( param ))
            axios({
              method: "post",
              url: that.apis.theme.api.community.deleteBlogInfo,
              data: param
            }).then(res => {
              // console.log( JSON.stringify( res ) )
              if (res.data.status == 1) {
                that.stateList.splice(val.index,1)
                plus.nativeUI.alert("删除成功", function() {}, "提示", "确定");
              }
            });
          }
        });
    });
    //点赞
    Bus.$on('childZan',(val) =>{
        // this.stateList.splice(val.index,1)
        // plus.nativeUI.confirm("确定删除这条动态吗？?", function(e) {
        //   //确定回调
        //   if (e.index == 0) {
        //     let param = qs.stringify({
        //       blog_id: autoId
        //     });
        //     axios({
        //       method: "post",
        //       url: that.apis.theme.api.community.deleteBlogInfo,
        //       data: param
        //     }).then(res => {
        //       if (res.data.status == 1) {
        //         this.stateList.splice(val.index,1)
        //         plus.nativeUI.alert("删除成功", function() {}, "提示", "确定");
        //       }
        //     });
        //   }
        // });
    });
  },
  mounted() {
    this.selectManageUserById();
    // let userDataid = JSON.parse( this.getStorge ).user_id;
    // this.initParams = userDataid.user_id
     if( this.initParams.id == this.userDataid){ //自己查看自己
        this.isDele = 2;
     }else if(this.initParams){ //自己查看他人
        this.isDele = 1;
     } else {
        this.isDele = 3;
     }
     // 0 是动态
     if( this.loadingType.type == '0' ){
       this.getBlog();
     } else if( this.loadingType.type == '1' ) {
       this.selectTopic();
     } else {
       // 其他页面进入到详情默认调动态列表
       this.getBlog();
     }
     
    },
};
</script>
<style scoped lang='less'>
.iphonexPaddingTop {
  padding-bottom: 0.44rem;
}
#detailPage {
  .vux-spinner-android{
    stroke:red !important;
  }
  #loading {
    position: fixed;
    width: 100%;
    height: 100%;
    background: #fff;
    opacity: 0.8;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 111111111;
  }
  header {
    background: #7f7f7f;
  }
  i {
    font-style: normal;
    color: #fff;
  }
  .bg {
    background-image: url("./images/bg2.png");
    height: 6.7rem;
    background-size: cover;
    padding-top: 0.88rem;
    position: relative;
    > img {
      height: 0.32rem;
      width: 0.32rem;
      margin-left: 0.3rem;
      position: relative;
      z-index: 11;
    }
    .model {
      position: absolute;
      height: 100%;
      width: 100%;
      background: #000000;
      top: 0;
      opacity: 0.6;
    }
    .headerMsg {
      position: absolute;
      z-index: 11;
      display: flex;
      padding: 0 0.47rem;
      width: 100%;
      align-items: flex-end;
      justify-content: space-between;
      > img {
        height: 1.44rem;
        border-radius: 50%;
      }
      button {
        display: flex;
        align-items: center;
        height: 0.58rem;
        line-height: 0.55rem;
        font-size: 0.26rem;
        border-radius: 0.5rem;
        width: 1.36rem;
        background: #ff802b;
        justify-content: center;
        color: #fff;
        font-size: 0.26rem;
        font-weight: 400;
        transition: all .5s;
        img {
          height: 0.24rem;
          margin-right: 0.12rem;
        }
      }
      .followUrlClass{
          background: #333333;
          opacity: .8;
          color: #ff802b;
          line-height: initial;
          transition: all .5s;
      }
    }
    
    .headerTitle {
      position: absolute;
      top: 4rem;
      padding: 0 0.47rem;
      width: 100%;
      z-index: 11;
      color: #fff;
      display: flex;
      flex-direction: column;
      > span:nth-child(1) {
        font-size: 0.48rem;
        font-size: 500;
        line-height: 1;
      }
      > span:nth-child(2) {
        font-size: 0.28rem;
        font-size: 300;
        line-height: 1;
        margin-top: 0.16rem;
        margin-bottom: 0.45rem;
      }
      > div {
        display: flex;
        align-items: center;
        span {
          font-size: 0.28rem !important;
          font-size: 300;
          line-height: 1;
          color: #d9d9d9;
        }
        > span:nth-child(2) {
          margin: 0 0.25rem;
        }
      }
    }
  }
  .msg {
    position: relative;
    top: -.44rem;
    background: #fff;
    border-radius: .4rem .4rem 0 0;
    .tab{
       display: flex;
       border-bottom: .01rem solid #E6E6E6;
       >span{
          flex: 1;
          text-align: center;
          font-size: .3rem;
          font-weight: 400;
          color: #999999;
          margin: .33rem 0;
          position: relative;
       }
       .seletecd{
         color: #E32519;
         font-size: .3rem;
         font-weight: 400;
       }
       i{
          border-bottom: .05rem solid red;
          position: absolute;
          z-index: 11111;
          width: 30px;
          left: 42%;
          bottom: -.32rem;
        }
    }
    .Topic{
       .title{
          height: .62rem;
          line-height: .62rem;
          background: #EFEFEF;
          color: #808080;
          font-size: .26rem;
          padding-left: .31rem;
          font-weight:400;
          i{
            color: #E32519;
          }
       }
    }
  }
  // .superloaddings {
  //   width: 100%;
  //   overflow: hidden;
  //   text-align: center;
  //   margin: 0 auto;
  //   position: absolute;
  //   /* height: 113vh; */
  //   top: 0;
  //   left: 0;
  //   height: 100%;
  //   line-height: 100vh;
  //   background: #fff;
  //   z-index: 111;
  //   opacity: 0.9;
  // }
}
</style>

