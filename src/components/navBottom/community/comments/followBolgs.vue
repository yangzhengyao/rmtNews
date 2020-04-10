<template>
  <div
    class="com_content"
    :style="{'-webkit-overflow-scrolling': scrollMode}"
    v-infinite-scroll="loadBottomAjax"
    infinite-scroll-disabled="bottomLockFollow"
    infinite-scroll-distance="10"
    infinite-scroll-immediate-check="true"
    style="padding-top:1.5rem"
  >
    <mt-loadmore
      :top-method="loadTopFollow"
      :auto-fill="true"
      ref="loadmoreFollow"
      @top-status-change="handleTopChangeFollow"
    >
      <div slot="top" class="mint-loadmore-top">
        <span v-show="topStatusFollow === 'pull'">
          <img class="pullLoading" src="~@/assets/img/loading.png"> 下拉刷新↓
        </span>
        <span v-show="topStatusFollow === 'drop'">
          <img class="pullLoading" src="~@/assets/img/loading.png"> 释放更新↑
        </span>
        <span v-show="topStatusFollow ==='loading'">
          <img class="pullLoading" src="~@/assets/img/loading.gif"> 加载中...
        </span>
      </div>
      <div class="item border_1px_b" v-for="(item,index) in json1" :key="index">
        <div>
          <img
            :src="apis.theme.imgHost+item.imgurl"
            alt
            @click="apis.urlParams('Homepage?id='+item.user_id+'')"
            v-if="item.imgurl != null"
          >
          <img
            :src='"~@/assets/img/"+apis.getTheme()+"/dafult.png"'
            alt
            @click="apis.urlParams('Homepage?id='+item.user_id+'')"
            v-else
          >
        </div>
        <div>
          <div class="my_follow">
            <span>{{ item.person_name }}</span>
            <button
              @click="clickFollow(index,item.is_followed,item.user_id,'1')"
              :class="{ select_follow:item.blog_type == '1' }"
            >
              <i class="icon iconfont" v-if="item.blog_type == '0'">&#xe614;</i>
              {{ item.blog_type =='1' ? '已关注':'关注' }}
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
              :style="{'background-image':'url('+apis.theme.imgHost+itemImg.images+')'}"
              @click="previewImage(index1,JSON.parse(item.blog_info_images))"
            >
            </li>
          </ul>
          <ul v-else>
            <li class="video_wrapper" style="background:#fff; position: relative;margin-left: 0%;">
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
          </div>
        </div>
      </div>
    </mt-loadmore>
    <no-data v-if="json1.length == 0"></no-data>
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
      isData: false, //判断是否有数据
      //   bottomLock: false, // 上滑开关
      bottomLockFollow: true, // 上滑开关
      json1: [],
      pageNoFollow: 1,
      pageSizeFollow: 10,
      allLoaded: true, //是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
      scrollMode: "auto", //移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
      topStatusFollow: ""
    };
  },
  computed: {
    ...mapGetters("login", [
      "getStorge" // active的栏目
    ])
  },
  methods: {
    // 视频播放
    videoPlay(item,index) {
      this.json[index].video_poster = false;
      this.$set(this.json[index], this.json[index].video_poster,false);
      document.querySelectorAll('.videoTag')[item.videosIndex].play()
    },
    // 点击图文放大轮播
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
    //点击头像是否登陆
    userImg(userId) {
      if (JSON.parse(localStorage.getItem("userData") != null)) {
        this.apis.urlParams("Homepage?id=" + userId + "");
      } else {
        this.apis.urlParams("Login", {});
      }
    },
    // 滚动加载
    loadBottomAjax() {
      this.loadPageFollowList("1");
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
        //   let that = this;
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
            } else {
              //关注
              for (let i = 0; i < this.json1.length; i++) {
                if (user_id == this.json1[i].user_id) {
                  if (res.data.follow_result == "0") {
                    this.$set(this.json1[i], "blog_type", "0");
                    Toast({
                      message: "取消成功",
                      position: "middle",
                      duration: 2000
                    });
                  } else {
                    this.$set(this.json1[i], "blog_type", "1");
                    Toast({
                      message: "关注成功",
                      position: "middle",
                      duration: 2000
                    });
                  }
                }
              }
              console.log(this.json1, "aaaaa");
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
            this.json1[index].is_liked = Number(res.data.like_result);
            if (res.data.like_result == "0") {
              let zanNum = Number(this.json1[index]["likes_num"]);
              this.json1[index]["likes_num"] = zanNum - 1;
            } else {
              let zanNum = Number(this.json1[index]["likes_num"]);
              this.json1[index]["likes_num"] = zanNum + 1;
            }
          }
        });
      }
    },
    // 关注列表
    loadPageFollowList(index) {
      this.pageNo = 1;
      this.bottomLockFollow = true;
      let postData = qs.stringify({
        pageNum: this.pageNoFollow,
        pageSize: this.pageSizeFollow,
        search: ""
      });
      axios({
        method: "post",
        ///root + "/community_al/blog/getFollowBlogs"
        ///this.apis.theme.api.community.getFollowBlogs
        url: this.apis.theme.api.community.getFollowBlogs,
        data: postData
      }).then(res => {
        if (res.data.status === 1) {
          // type:1 关注
          this.json1 = this.json1.concat(res.data.data.list);
          let videosIndex = 0;
          for( let i = 0;i < this.json1.length;i++ ){
               this.json1[i]['video_poster'] = true;
               if( this.json1[i]['blog_info_videos'] != '' ){
                  this.json1[i]['videosIndex'] = videosIndex;
                  videosIndex++;
               }
               if( this.json1[i].blog_info_videos != null && this.json1[i].blog_info_videos != "" ){
                  this.json1[i]['isVedio'] = true;
               } else {
                  this.json1[i]['isVedio'] = false;
               }
            }
          if (this.json1.length == 0) {
            this.isData = true;
          }
          //判断是否是最后一页，禁止上拉加载
          if (res.data.data.lastPage == false) {
            this.pageNoFollow += 1;
            this.bottomLockFollow = false;
          } else {
            this.bottomLockFollow = true;
          }
          this.$nextTick(function() {
            this.scrollMode = "touch";
          });
        } else {
          this.isData = true;
        }
      });
    },
    // 下拉状态
    handleTopChangeFollow(status) {
      this.topStatusFollow = status;
      if (this.topStatusFollow == "loading") {
        $(".mint-loadmore-content").removeAttr("transform");
      }
    },
    loadTopFollow() {
      this.pageNoFollow = 1;
      this.json1 = [];
      this.bottomLockFollow = true;
      this.loadPageFollowList("1");
      this.$refs.loadmoreFollow.onTopLoaded(); // 固定方法，查询完要调用一次，用于重新定位
    }
  },
  mounted() {
    this.loadPageFollowList();
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
        font-size: 0.28rem;
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