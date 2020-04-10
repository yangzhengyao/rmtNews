<template>
  <!-- 热门 -->
  <div
    class="com_content main-body communityNavFixed"
    :style="{'-webkit-overflow-scrolling': scrollMode}"
    v-infinite-scroll="loadBottomAjax"
    infinite-scroll-disabled="bottomLock"
    infinite-scroll-distance="10"
    infinite-scroll-immediate-check="true"
    style="padding-top:1.5rem"
  >
    <mt-loadmore
      :top-method="loadTop"
      :auto-fill="true"
      ref="loadmore"
      :bottom-all-loaded="false"
      @top-status-change="handleTopChange"
    >
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
      <div class="search" style="display:none">
        <div v-if="json.length">
          <i class="icon iconfont">&#xe62a;</i>
          <input type="text" placeholder="请输入信息">
        </div>
      </div>
      <div class="item border_1px_b" v-for="(item,index) in json" :key="index">
        <div>
          <img
            :src="apis.theme.imgHost+item.imgurl"
            alt
            @click="userImg(item.user_id)"
            v-if=" item.imgurl != null"
          >
          <img :src='"~@/assets/img/"+apis.getTheme()+"/dafult.png"' alt @click="userImg(item.user_id)" v-else>
        </div>
        <div>
          <div class="my_follow">
            <span>{{ item.person_name }}</span>
            <button
              @click="clickFollow(index,item.is_followed,item.user_id,'0')"
              :class="{ select_follow:item.is_followed == '1' }"
              v-if=" JSON.parse( getStorge ) == null"
            >
              <i class="icon iconfont" v-if="item.is_followed == '0'">&#xe614;</i>
              {{ item.is_followed =='1' ? '已关注':'关注' }}
            </button>
            <button
              @click="clickFollow(index,item.is_followed,item.user_id,'0')"
              :class="{ select_follow:item.is_followed == '1' }"
              v-else-if=" item.user_id != JSON.parse( getStorge ).user_id"
            >
              <i class="icon iconfont" v-if="item.is_followed == '0'">&#xe614;</i>
              <!-- <img
                src="./../images/selectComm.png"
                alt
                style="width:.26rem;display:none"
                v-if="item.is_followed == '1'"
              > -->
              {{ item.is_followed =='1' ? '已关注':'关注' }}
            </button>
          </div>
          <span>{{ item.pub_time }}</span>
          <span>{{ item.content }}</span>
          <ul
            :class=" { 'isBolgImg': JSON.parse(item.blog_info_images).length > 1, 'circleFriends': JSON.parse(item.blog_info_images).length <= 1} "
            v-if=" !item.isVedio "
          >
            <li
              v-if=" JSON.parse(item.blog_info_images).length != 0"
              v-for="(itemImg,index1) in JSON.parse(item.blog_info_images)"
              :key="index1"
              @click="previewImage(index1,JSON.parse(item.blog_info_images))"
              :style="{'background-image':'url('+apis.theme.imgHost+itemImg.images+')'}"
            >
              <!-- :style="{'background-image':'url('+root+'/'+itemImg.images+')'}" -->
              <!-- apis.theme.imgHost -->
            </li>
          </ul>
          <ul v-else>
            <li class="video_wrapper" style="background:#fff; position: relative;margin-left: 0%;">
               <!-- <video :src='item.blog_info_videos' style="width:50%;height:5rem"></video> -->
               <video class="videoTag" :src='item.blog_info_videos' ref="refVideo" controls="controls" style="width:40%;height:5rem"></video>
               <div class="img-box" :style="{'background-image':'url('+item.videos_pre_image+')'}" v-if="item.video_poster"></div>
               <div class="playRound" @click="videoPlay(item,index)" v-if="item.video_poster"></div>
            </li>
          </ul>
          <div class="operation">
            <div class="zan" @click="zan( index,item.is_liked,item.auto_id )">
              <i class="iconfont" :class="{ dianzan:item.is_liked }">&#xe626;</i>
              <span :class="{ dianzan:item.is_liked }">{{ item.likes_num }}</span>
            </div>
            <div class="del" v-if=" JSON.parse( getStorge ) != null">
              <span
                v-if=" item.user_id == JSON.parse( getStorge ).user_id "
                @click="delready( index,item.is_liked,item.auto_id )"
              >删除</span>
            </div>
            <div class="del" v-else=" item.user_id == JSON.parse( getStorge ).user_id ">
              <!-- <span @click="del( index,item.is_liked,item.auto_id )">删除</span> -->
            </div>
          </div>
        </div>
      </div>
    </mt-loadmore>
    <no-data v-if="json.length == 0"></no-data>
  </div>
</template>
<script>
import { Loadmore, Toast, Indicator, Field, MessageBox } from "mint-ui";
import axios from "axios";
import qs from "qs";
import { Actionsheet } from "mint-ui";
import noData from "./../noData";
import { mapGetters, mapMutations, mapActions } from "vuex";
const root = process.env.API_ROOT;
export default {
  name: "community",
  data() {
    return {
      root: root,
      isData: false, //判断是否有数据
      bottomLock: true, // 上滑开关
      json: [], //mock数据
      pageNo: 1,
      pageSize: 10,
      scrollMode: "auto", //移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
      topStatus: "",
    };
  },
  mounted() {
    this.loadPageList("top");
  },
  computed: {
    ...mapGetters("login", [
      "getStorge" // active的栏目
    ])
  },
  methods: {
    //播放视频
    videoPlay(item,index) {
      this.json[index].video_poster = false;
      this.$set(this.json[index], this.json[index].video_poster,false);
      document.querySelectorAll('.videoTag')[item.videosIndex].play()
    },
    //点击头像是否登陆
    userImg(userId) {
      if (JSON.parse(localStorage.getItem("userData") != null)) {
        this.apis.urlParams("Homepage?id=" + userId + "");
      } else {
        this.apis.urlParams("Login", {});
      }
    },
    // 点击查看图文详情
    previewImage(index, imgArr) {
      let testImg = [];
      for (let i = 0; i < imgArr.length; i++) {
        testImg.push(this.apis.theme.imgHost + imgArr[i].images);
      }
      plus.nativeUI.previewImage(testImg, {
        background: "#333333",
        current: index
      });
    },
    // 关注博文
    clickFollow(index, status, user_id, type) {
      //判断是否登陆
      let loginThat = this;
      if (JSON.parse(localStorage.getItem("userData") == null)) {
        //未登录状态直接跳转到登陆界面
        loginThat.apis.urlParams("Login", {});
      } else {
        //判断是否关注 或  取消关注
        let that = this.json;
        let postData = qs.stringify({
          user_id: user_id
        });
        axios({
          method: "post",
          url: this.apis.theme.api.community.followOtherUser,
          data: postData
        }).then(res => {
          if (res.data.status == "1") {
            if (type == "0") {
              for (let i = 0; i < this.json.length; i++) {
                if (user_id == this.json[i].user_id) {
                  if (res.data.follow_result == "0") {
                    this.json[i].is_followed = "0";
                    Toast({
                      message: "取消成功",
                      position: "middle",
                      duration: 2000
                    });
                  } else {
                    this.json[i].is_followed = "1";
                    Toast({
                      message: "关注成功",
                      position: "middle",
                      duration: 2000
                    });
                  }
                }
              }
            }
          } else {
            Toast({
              message: "关注失败",
              position: "middle",
              duration: 2000
            });
          }
        });
      }
    },
    // 点赞博文
    zan(index, isLiked, autoId) {
      let that = this;
      if (JSON.parse(localStorage.getItem("userData") == null)) {
        that.apis.urlParams("Login", {});
      } else {
        let param = qs.stringify({
          blog_id: autoId
        });
        axios({
          method: "post",
          url: this.apis.theme.api.community.blogLike,
          data: param
        }).then(res => {
          if (res.data.status == "1") {
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
      }
    },
    // 删除博文
    del(index, isLiked, autoId) {
      let that = this;
      if (JSON.parse(localStorage.getItem("userData") == null)) {
        that.apis.urlParams("Login", {});
      } else {
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
      }
    },
    // 默认加载首页
    loadPageList(isTop) {
      let that = this;
      this.bottomLock = true;
      let postData = qs.stringify({
        pageNum: this.pageNo,
        pageSize: this.pageSize,
        search: ""
      });
      axios({
        method: "post",
        //  this.apis.theme.api.community.getHotBlogs
        //  root + "/community_al/blog/getHotBlogs"
        url: this.apis.theme.api.community.getHotBlogs,
        data: postData
      }).then(res => {
        if (res.data.status === 1) {
            that.isData = true;
            if (isTop == "top") {
              that.json = [];
              that.json = that.json.concat(res.data.data.list);
            } else if (isTop == "bottom") {
              that.json = that.json.concat(res.data.data.list);
            }
            let videosIndex = 0;
            for( let i = 0;i < that.json.length;i++ ){
               that.json[i]['video_poster'] = true;
               if( that.json[i]['blog_info_videos'] != '' ){
                  that.json[i]['videosIndex'] = videosIndex;
                  videosIndex++;
               }
               if( that.json[i].blog_info_videos != null && that.json[i].blog_info_videos != "" ){
                  that.json[i]['isVedio'] = true;
               } else {
                  that.json[i]['isVedio'] = false;
               }
            }
            //判断是否是最后一页，禁止上拉加载
            if (res.data.data.lastPage == false) {
              that.pageNo += 1;
              that.bottomLock = false;
            } else {
              that.bottomLock = true;
            }
          that.$nextTick(function() {
            that.scrollMode = "touch";
          });
        } else {
          that.isData = true;
        }
      });
    },
    // 滚动加载
    loadBottomAjax() {
      this.loadPageList("bottom");
    },
    // mint-ui 下拉组件的状态
    handleTopChange(status) {
      this.topStatus = status;
      if (this.topStatus == "loading") {
        $(".mint-loadmore-content").removeAttr("transform");
      }
    },
    // 组件提供的下拉触发方法
    loadTop: function() {
      //下拉加载
      this.pageNo = 1;
      this.json = [];
      this.bottomLock = true;
      this.loadPageList("top");
      this.$refs.loadmore.onTopLoaded(); // 固定方法，查询完要调用一次，用于重新定位
    },
    delready(index, isLiked, autoId) {
      if (window.plus) {
        this.del(index, isLiked, autoId);
      } else {
        document.addEventListener(
          "plusready",
          function() {
            this.del(index, isLiked, autoId);
          },
          false
        );
      }
    },
  },
  components: {
    "v-loadmore": Loadmore,
    noData
  }
};
</script>
<style lang="less">
.com_content {
  background: #ffffff;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding-top: 50px;
  box-sizing: border-box;
  .search {
    width: 100%;
    padding: 0.24rem 0.333rem 0 0.333rem;
    position: relative;
    > div {
      position: relative;
      display: flex;
      i {
        position: absolute;
        top: 0.21rem;
        font-size: 0.4rem;
        margin: 0 0.26rem;
        color: #b3b3b3;
      }
      input {
        width: 100%;
        height: 0.7rem;
        padding-left: 0.7rem;
        padding: 0.2rem 0;
        border-radius: 0.6rem;
        padding-left: 0.68rem;
        background: #f5f5f5;
        color: #666666;
        font-size: 15px;
      }
      input::-webkit-input-placeholder {
        /* placeholder颜色  */
        color: #666666;
        /* placeholder字体大小  */
        // font-size: 16px !important;
      }
    }
  }
}
@import '../../../../assets/css/community.less';
</style>
