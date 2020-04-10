<template>
  <!-- 加载更多 -->
  <div id="Homepage">
    <header class="headerNavFixed">
      <div class="nvbt ibackBack" @click="apis.iback()"></div>
      <div class="nvtt">关注</div>
    </header>
    <div class="container contentNavFixed" style="margin-top:.14rem;background:#fff">
      <div class="allFollow">
        <span>全部关注</span>
      </div>
      <div class="friendsContent">
        <!-- 列表 -->
        <div class="item border_1px_b" v-for="(item,index) in json " :key="index">
          <div>
            <!-- <img :src="apis.theme.imgHost+item.imgurl" alt v-if="item.imgurl" /> -->
            <img :src="apis.theme.imgHost+item.imgurl" alt v-if="item.imgurl" />
            <img :src='"~@/assets/img/head.png"' alt v-else />
          </div>
          <div class="myBox">
            <div class="my_follow">
              <span class="span1">{{ item.personName }}</span>
              <span class="span2">{{ item.description }}</span>
            </div>
            <div class="focuses" :class="item.focus?'select_follow':''" @click="clickFollow(index,item.focus,item.autoId)">
              <img :src="addUrl"  v-if="item.focus == 0" alt />
              <img :src="followUrl"  v-if="item.focus == 1" alt/>
              <img :src="followAllUrl" v-if="item.focus == 2" alt />
              <span v-if="item.focus == 0">关注</span>
              <span v-if="item.focus == 1">已关注</span>
              <span v-if="item.focus == 2">互相关注</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="loading" v-if="noLoading">
      <spinner type="android" size="40px"></spinner>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import axios from "axios";
import qs from "qs";
import { Spinner } from "vux";
//引入主页
import { Header } from "mint-ui";
import { Toast } from "mint-ui";
// const root = process.env.API_ROOT;
export default {
  props: ["type"],
  data() {
    return {
      initParams: {},
      headerJson: {}, //mock数据
      json: [],
      noLoading:false,
      followUrl:require("./images/follow.png"),
      addUrl:require("./images/add.png"),
      followAllUrl:require('./images/xingzhuang.png')
    };
  },
  components: {
    Spinner
  },
  computed: {
    ...mapGetters("login", [
      "getStorge" // active的栏目
    ])
  },
  methods: {
    //获取博主关注的列表
    /**
     * userId != null  是查看其他博主
     */
    initUserMsg() {
      let that = this;
      that.noLoading = true;
      let postData = {
        pageNum: 1,
        pageSize: 10,
        userId: this.initParams.id
      };
      axios({
        method: "post",
        url: this.apis.theme.api.community.getFocusList,
        data: postData
      }).then(res => {
        if (res.data.success) {
          that.noLoading = false;
          this.json = res.data.data;
          // Toast({
          //     message: "查询成功",
          //     position: "middle",
          //     duration: 1000
          //   });
          console.log(this.json);
        }
      });
    },
    //关注
    /**
     * index 当前索引
     * status 是否关注
     * user_id  关注博主的ID
     */
    clickFollow(index, status, user_id) {
      console.log( index,status,user_id )
      //判断是否关注 或  取消关注
      let newJson = this.json;
      let that = this;
      let url = '';
      if( status ){
          url = that.apis.theme.api.me.cancelFans;
      } else {
          url = that.apis.theme.api.me.addUserFans;
      }
      let postData = { userId: user_id,fansId:JSON.parse( that.getStorge ).user_id };
      that.axios({
        method: "post",
        url: url,
        data: postData
      }).then(res => {
        console.log(res);
        if (res.data.success ) {
          that.json[index].focus = !status;
          if (status) {
            Toast({
              message: "取消关注",
              position: "middle",
              duration: 1000
            });
          } else {
            Toast({
              message: "关注成功",
              position: "middle",
              duration: 1000
            });
          }
        } else {
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
  }
};
</script>
<style scoped lang='less'>
@import "../../../assets/communityIcon/iconfont.css";

.headerNavFixed > div {
  height: 0.88rem;
  font-size: .38rem;
  font-weight: 500;
  color: #1A1A1A;
}
#Homepage {
  background: #fff;
  header{
    background: #fff;
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
  .allFollow {
    display: flex;
    padding-left: 0.3rem;
    padding-top: 0.19rem;
    padding-bottom: 0.19rem;
    background: rgba(239, 239, 239, 1);
    span {
      font-size: 0.26rem;
      font-weight: 400;
      color: rgba(128, 128, 128, 1);
    }
  }
  .friendsContent {
    background: #fff;
    padding: 0 0.3rem;
    .item {
      display: flex;
      box-sizing: border-box;
      border-bottom: 0.02rem solid #efefef;
      padding: 0.3rem 0;
      > div:nth-child(1) {
        width: 1rem;
        height: 1rem;
        margin-right: 0.25rem;
        border: 0.01rem solid #cacdd1;
        border-radius: 50%;
        img {
          // width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      > div:nth-child(2) {
        padding-top: 0.04rem;
        display: flex;
        justify-content: space-between;
        width: 100%;
        .my_follow{
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .span1{
            color: #576b95;
            font-size: 0.36rem;
          }
          .span2{
            color: #808080;
            font-size: 0.25rem;
          }
        }
        .focuses{
          float: right;
          font-size: 0.26rem;
          color: #ff802b;
          padding: 0.08rem 0.23rem;
          border-radius: 0.3rem;
          background: #fff;
          border: 1px solid #ff802b;
          height: 0.6rem;
          margin-top: 0.15rem;
          img{
            height: 0.24rem;
            margin-right: 0.04rem;
            margin-top: 0.07rem; 
          }
        }
        .select_follow {
          background: #fff;
          border: 1px solid #d9d9d9;
          transition: all .5s;
          img {
            margin-right: 0.04rem;
          }
          span {
            color: #4d4d4d;
          }
        }
      }
    }
  }
}
</style>
