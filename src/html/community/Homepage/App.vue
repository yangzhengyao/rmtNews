<template>
  <!-- 加载更多 -->
  <div id="Homepage">
    <header class="headerNavFixed">
      <div class="nvbt iback" style="flex: 1;" @click="apis.iback()"></div>
      <div class="nvtt"></div>
    </header>
    <div class="container contentNavFixed" >
      <div class="friendsContent">
        <div class="friendsContentBackground">
          <!-- <img src="./images/backgroundImg.png" alt=""> -->
          <div class="friednsMsg">
            <div>
              <!-- apis.url+itemImg.images -->
              <!-- <img :src=http://124.204.66.253:28080'+itemImg.images alt> -->
              <div v-if="headerJson.imgurl!=null">
                <img :src="apis.theme.imgHost+headerJson.imgurl">
              </div>
              <div v-else>
                <img :src='"~@/assets/img/"+apis.getTheme()+"/dafult.png"' alt >
              </div>
              <!-- <img src="./images/myVip.png" alt> -->
            </div>
            <span class="name">{{ headerJson.person_name }}</span>
            <div class="operation">
              <a
                href="javascript:void(0)"
                style="color:#fff;margin-left:.2rem;cursor:pointer;"
                @click="apis.urlParams('AttentionList?id='+headerJson.auto_id+'')"
              >
                <span style="margin-right:0.15rem">关注</span>
                <span>{{ headerJson.follow_num }}</span>
              </a>
              <span style="margin:0 .5rem">|</span>
              <a
                href="javascript:void(0)"
                style="color:#fff;cursor:pointer;"
                @click="apis.urlParams('Fans?id='+headerJson.auto_id+'')"
              >
                <span style="margin-right:0.15rem">粉丝</span>
                <span>{{ headerJson.fans_num }}</span>
              </a>
            </div>
            <div class="js">
              <p @click="skipDer" v-if="initParams.id == JSON.parse(getStorge).user_id">{{ headerJson.description }}</p>
              <p v-else>{{ headerJson.description }}</p>
            </div>
          </div>
        </div>
        <!-- 关注 和 操作 -->
        <div class="follow" v-if="initParams.id != JSON.parse(getStorge).user_id">
          <div class="follow_left">
            <a
              href="###"
              :class="{ followActive:headerJson.is_followed == 1 }"
              @click="clickFollow( headerJson.is_followed,headerJson.auto_id )"
            >
              <i class="icon iconfont" v-if="headerJson.is_followed == 0">&#xe614;</i>
              <span>{{ headerJson.is_followed == 1 ? '已关注':'关注' }}</span>
            </a>
          </div>
          <div style="color:#ccc;font-size:.01rem">|</div>
          <div class="follow_right">
            <span>私信</span>
          </div>
        </div>
        <!-- all发文 -->
        <div class="allFawen">
          <span>全部发文</span>
          <span>
            (
            <span>{{ json.length }}</span>
            )
          </span>
        </div>
        <!-- 列表 -->
        <div
          class="item border_1px_b"
          v-if="json.length > 0"
          v-for="(item,index) in json"
          :key="index"
        >
          <div>
            <img :src="apis.theme.imgHost+headerJson.imgurl" alt v-if="headerJson.imgurl">
            <!--  @click="apis.urlParams('./community/Homepage.html?id='+item.user_id+'')" -->
            <img :src='"~@/assets/img/"+apis.getTheme()+"/dafult.png"' alt v-else>
          </div>
          <div>
            <div class="my_follow">
              <span style="margin-bottom:.2rem">{{ headerJson.person_name }}</span>
            </div>
            <span>{{ item.pub_time }}</span>
            <span>{{ item.content }}</span>
            <ul
              :class=" { 'isBolgImg': JSON.parse(item.blog_info_images).length > 1, 'circleFriends': JSON.parse(item.blog_info_images).length <= 1} "
            >
              <li
                v-if=" JSON.parse(item.blog_info_images).length != 0"
                v-for="(itemImg,index1) in JSON.parse(item.blog_info_images)"
                :key="index1"
                :style="{'background-image':'url('+apis.theme.imgHost+itemImg.images+')'}"
                @click="previewImage(index1,JSON.parse(item.blog_info_images))"
              >
                <!-- <img :src="apis.theme.imgHost+itemImg.images"> -->
              </li>
            </ul>
            <div class="operation">
              <div class="zan" @click="zan( index,item.is_liked,item.auto_id )">
                <i class="iconfont" :class="{ dianzan:item.is_liked }">&#xe626;</i>
                <span :class="{ dianzan:item.is_liked }">{{ item.likes_num }}</span>
              </div>
              <div class="del" v-if=" initParams.id == JSON.parse( getStorge ).user_id">
                <span @click="del( index,item.is_liked,item.auto_id )">删除</span>
              </div>
              <!-- <div class="comment">
                <i class="iconfont">&#xe628;</i>
                <span>{{ item.comment_num }}</span>
              </div>-->
              <!-- <div class="share">
                <i class="iconfont">&#xe629;</i>
                <span>{{ item.trans_num }}</span>
              </div>-->
            </div>
          </div>
        </div>
        <no-data v-if="json.length == 0"></no-data>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import axios from "axios";
import qs from "qs";
//引入主页
import { Header } from "mint-ui";
import { Toast } from "mint-ui";
import noData from "components/noData.vue";
const root = process.env.API_ROOT;
export default {
  props: ["type"],
  data() {
    return {
      initParams: {},
      headerJson: {}, //mock数据
      json: []
    };
  },
  components: {
    noData
  },
  computed: {
    ...mapGetters("login", [
      "getStorge" // active的栏目
    ])
  },
  methods: {
    skipDer(){
        let that = this;
        var bts=["确认","取消"];
        plus.nativeUI.prompt("设置个人简介",function(e){
          var i=e.index;
          var eMsg  = e.message;
          if( i <= 0 ){
              console.log( '确认' )
              that.axios({
                method: "post",
                //this.apis.theme.api.me.modifyUserInfo
                //root + "/my_al/my/modifyUserInfo"
                url: that.apis.theme.api.me.modifyUserInfo,
                data: qs.stringify({
                  description: eMsg
                })
              })
              .then(res => {
                console.log(res);
                if (res.data.status == "1") {
                  that.headerJson.description = eMsg;
                  Toast({
                    message: res.data.message,
                    position: "middle",
                    duration: 1400
                  });
                } else {
                  Toast({
                    message: res.data.message,
                    position: "middle",
                    duration: 1500
                  });
                }
              });
          } else {
          }
      },"",that.headerJson.description,bts);
    },
    previewImage(index, imgArr) {
      console.log(index, imgArr);
      let testImg = [];
      for (let i = 0; i < imgArr.length; i++) {
        testImg.push(this.apis.theme.imgHost + imgArr[i].images);
      }
      plus.nativeUI.previewImage(testImg, {
        background: "#333333",
        current: index
      });
    },
    //获取博主的个人信息 包括个人 和 其他
    /**
     * userId != null  是查看其他博主
     */
    initUserMsg() {
      this.initParams.id = this.initParams.id.replace(/#/g, "");
      console.log(this.initParams.id);
      let postData = {
        is_myself: "0",
        user_id: this.initParams.id
      };
      // 暂且1为本人ID
      if (this.initParams.id == JSON.parse(this.getStorge).user_id) {
        postData.is_myself = "1";
      }
      this.axios({
        method: "post",
        // root+'/community_al/user/getUserInfo'
        // this.apis.theme.api.community.getUserInfo
        url: this.apis.theme.api.community.getUserInfo,
        data: qs.stringify(postData)
      }).then(res => {
        console.log(res);
        if (res.data.status == "1") {
          this.headerJson = res.data.data;
        }
      });
    },
    /**
     * 获取博主的博文列表 包括个人 和 其他
     * userId != null  是查看其他博主
     */
    initUserBoke() {
      let postData = {
        pageNum: "1",
        pageSize: "10"
        // url: "/community_al/blog/getMyBlogInfoList" //个人接口
      };
      let BokeUrl = "";
      if (this.initParams.id != JSON.parse(this.getStorge).user_id) {
        postData["user_id"] = this.initParams.id;
        BokeUrl = "/community_al/blog/getOthersBlogInfoList";
      } else {
        BokeUrl = "/community_al/blog/getMyBlogInfoList";
      }
      this.axios({
        method: "post",
        url: "" + this.apis.theme.imgHost + "" + BokeUrl + "", //"" + this.apis.theme.imgHost + "" + BokeUrl + ""
        data: qs.stringify(postData)
      }).then(res => {
        console.log(res);
        if (res.data.status == 1) {
          this.json = res.data.data.list;
        }
      });
    },
    //关注
    /**
     * status 是否关注
     * user_id  关注博主的ID
     */
    clickFollow(status, user_id) {
      //判断是否关注 或  取消关注
      // let newJson = this.headerJson;
      let that = this;
      let postData = qs.stringify({
        user_id: user_id
      });
      this.axios({
        method: "post",
        url: this.apis.theme.api.community.followOtherUser,
        data: postData
      }).then(res => {
        console.log(res);
        if (res.data.status == "1") {
          // console.log( that.headerJson )
          if (res.data.follow_result == "1") {
            that.headerJson.is_followed = res.data.follow_result;
            that.headerJson.fans_num += 1;
            Toast({
              message: "关注成功",
              position: "middle",
              duration: 1500
            });
          } else {
            that.headerJson.is_followed = res.data.follow_result;
            that.headerJson.fans_num -= 1;
            Toast({
              message: "取消关注",
              position: "middle",
              duration: 1500
            });
          }
        } else {
          Toast({
            message: "关注失败",
            position: "middle",
            duration: 1500
          });
        }
      });
    },
    /**
     * auto_id  博文ID
     */
    zan(index, isLiked, autoId) {
      let param = qs.stringify({
        blog_id: autoId
      });
      let that = this;
      this.axios({
        method: "post",
        url: this.apis.theme.api.community.blogLike,
        data: param
      }).then(res => {
        console.log(res);
        if (res.data.status == "1") {
          // this.json[index]["likes_num"] = res.data.like_result;
          this.json[index].is_liked = Number(res.data.like_result);
          if (res.data.like_result == "0") {
            let zanNum = Number(this.json[index]["likes_num"]);
            this.json[index]["likes_num"] = zanNum - 1;
          } else {
            let zanNum = Number(this.json[index]["likes_num"]);
            this.json[index]["likes_num"] = zanNum + 1;
          }
        }
      });
    },
    del(index, isLiked, autoId) {
      let that = this;
      plus.nativeUI.confirm("是否删除当前博文?", function(e) {
        //确定回调
        if (e.index == 0) {
          let param = qs.stringify({
            blog_id: autoId
          });
          axios({
            method: "post",
            //this.apis.theme.api.community.deleteBlogInfo
            //root + "/community_al/blog/deleteBlogInfo"
            url: that.apis.theme.api.community.deleteBlogInfo,
            data: param
          }).then(res => {
            if (res.data.status == 1) {
              that.json.splice(index, 1);
              plus.nativeUI.alert("删除成功", function() {}, "提示", "确定");
            }
          });
        }
      });
    },
    //获取用户ID
    getParams() {
      let url = window.location.href;
      let urlParams = this.apis.parseQueryString(url);
      this.initParams = urlParams;
      return urlParams;
    }
  },
  created() {
    this.getParams();
  },
  mounted() {
    this.initUserMsg();
    this.initUserBoke();
  }
};
</script>
<style scoped lang='less'>
@import "../../../assets/communityIcon/iconfont.css";
.headerNavFixed > div {
  height: .88rem;
}
#Homepage {
  background: #f7f7f7;
}
.container {
  height: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  position: relative;

  .globalTip {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;

    div {
      height: 32px;
      line-height: 34px;
      font-size: 14px;
      color: #2a90d7;
      background: rgba(213, 233, 247, 0.9);
      text-align: center;
      display: none;

      &.requestFail {
        color: #f56767;
        background: #fbe9ef;
      }
    }
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

  .friendsContent {
    // padding-top:1.335rem;
    background: #f7f7f7;
    // 简介
    .friendsContentBackground {
      width: 100%;
      // height: 7.4rem;
      background: red;
      background: url("./images/backgroundImg.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      padding: 0.45rem 0.9rem;
      text-align: center;

      .friednsMsg {
        display: flex;
        justify-content: center;
        flex-direction: column;
        > div:nth-child(1) {
          position: relative;
          margin-bottom: 0.3rem;
          width: 100%;
          display: flex;
          justify-content: center;
          >div{
            width: 1.3rem;
            height: 1.3rem;
            > img:nth-child(1) {
              width: 100%;
              height: 98%;
              border-radius: 50%;
              box-shadow: 0px 0px 20px 3px #eaeaea;
            }
          }
          > img:nth-child(2) {
            width: 0.46rem;
            height: 0.46rem;
            position: absolute;
            bottom: -0.08rem;
            right: 2rem;
          }
        }

        .name {
          color: #fff;
          font-size: 0.4rem;
        }

        .operation {
          color: #fff;
          text-align: center;
          margin-top: 0.3rem;
          margin-bottom: 0.3rem;
          font-size: 0.3rem;
        }

        .js {
          color: #fff;
          text-align: left;
          font-size: 0.333rem;
        }
      }
    }
    // 关注
    .follow {
      height: 1rem;
      background: #f2f2f2;
      display: flex;
      align-items: center;

      .follow_left,
      .follow_right {
        flex: 1;
        text-align: center;
        color: #333333;
        font-size: 0.333rem;
        a{
          display: flex;
          justify-content: center;
          align-items: center;
          i {
            font-size: 0.35rem;
            font-weight:700;
          }
        }
      }

      .followActive {
        color: @dominantColor;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    // 全部 发文
    .allFawen {
      height: 0.9rem;
      background: #fff;
      display: flex;
      align-items: center;
      margin-bottom: 0.17rem;

      > span:nth-child(1) {
        margin-left: 0.333rem;
        font-size: 0.37rem;
        color: #333333;
        margin-right: 0.333rem;
      }

      > span:nth-child(2) {
        font-size: 0.37rem;
        color: #333333;

        > span {
          color: @dominantColor;
          font-size: 0.37rem;
        }
      }
    }
  }
  .noData {
    padding: 22% !important;
  }
}
@import '../../../assets/css/community.less';
.item{
  background: #fff;
}
</style>
