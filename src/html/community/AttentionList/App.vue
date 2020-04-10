<template>
  <!-- 加载更多 -->
  <div id="Homepage">
    <header class="headerNavFixed">
      <div class="nvbt iback" @click="apis.iback()"></div>
      <div class="nvtt">关注</div>
    </header>
    <div class="container contentNavFixed" style="margin-top:.3rem">
      <div class="friendsContent">
        <div class="search" style="display:none">
          <div>
            <i class="icon iconfont">&#xe62a;</i>
            <input type="text" placeholder="请输入信息">
          </div>
        </div>
        <!-- 列表 -->
        <div
          class="item border_1px_b"
          v-if="json.length > 0"
          v-for="(item,index) in json"
          :key="index"
        >
          <div>
            <img :src="apis.theme.imgHost+item.imgurl" alt v-if="item.imgurl != null">
            <img :src='"~@/assets/img/"+apis.getTheme()+"/dafult.png"' alt v-else>
          </div>
          <div>
            <div class="my_follow">
              <span>{{ item.person_name }}</span>
              <button
                @click="clickFollow(index,item.is_followed,item.auto_id)"
                :class="{ select_follow:item.is_followed == '1' }"
                v-if=" item.auto_id != JSON.parse( getStorge ).user_id"
              >
                <i class="icon iconfont" v-if="item.is_followed == '0'">&#xe614;</i>
                <!-- <img
                  src="./images/selectComm.png"
                  alt
                  style="width:.26rem"
                  v-if="item.is_followed == '1'"
                >-->
                {{ item.is_followed == '1' ? '已关注':'关注' }}
              </button>
            </div>
            <span>{{ item.description }}</span>
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
// const root = process.env.API_ROOT;
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
    //获取博主关注的列表
    /**
     * userId != null  是查看其他博主
     */
    initUserMsg() {
      let postData = {
        pageNum: "1",
        pageSize: "10",
        search: "",
        user_id: this.initParams.id
      };
      axios({
        method: "post",
        url: this.apis.theme.api.community.getFollowList,
        data: qs.stringify(postData)
      }).then(res => {
        console.log(res);
        if (res.data.status == "1") {
          this.json = res.data.data.list;
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
      console.log(index);
      console.log(status);
      console.log(user_id);
      //判断是否关注 或  取消关注
      let newJson = this.json;
      let that = this;
      let postData = qs.stringify({
        user_id: user_id
      });
      axios({
        method: "post",
        url: this.apis.theme.api.community.followOtherUser,
        data: postData
      }).then(res => {
        console.log(res);
        if (res.data.status == "1") {
          this.json[index].is_followed = res.data.follow_result;
          if (res.data.follow_result == "1") {
            Toast({
              message: "关注成功",
              position: "middle",
              duration: 1500
            });
          } else {
            Toast({
              message: "取消关注",
              position: "middle",
              duration: 1500
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
  // .search {
  //   width: 100%;
  //   padding: 0.24rem 0.333rem 0 0.333rem;
  //   position: relative;
  //   > div {
  //     position: relative;
  //     display: flex;
  //     i {
  //       position: absolute;
  //       top: 0.21rem;
  //       font-size: 0.28rem;
  //       margin: 0 0.26rem;
  //       color: #b3b3b3;
  //     }
  //     input {
  //       width: 100%;
  //       height: 0.7rem;
  //       border-radius: 0.6rem;
  //       padding-left: 0.68rem;
  //       background: #f5f5f5;
  //       color: #666666;
  //     }
  //     input::-webkit-input-placeholder {
  //       color: #666666;
  //       font-size: 0.32rem;
  //     }
  //   }
  // }
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
  .friendsContent {
    background: #fff;
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
        i {
          margin-right: 0.1rem;
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

    .item {
      padding: 0.35rem 0.25rem 0.35rem 0.25rem;
      display: flex;
      box-sizing: border-box;
      border-bottom: 0.18rem solid #efefef;
      > div:nth-child(1) {
        width: 1.3rem;
        height: 1.25rem;
        margin-right: 0.36rem;
        border: 0.01rem solid #cacdd1;
        border-radius: 50%;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      > div:nth-child(2) {
        padding-top: 0.04rem;
        display: flex;
        flex-direction: column;
        width: 79%;
        justify-content: space-around;
        .my_follow {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          position: relative;
          span {
            color: #576b95;
            font-size: 0.33rem;
            line-height: 1;
            margin-bottom: 0.19rem;
          }
          button {
            width: 1.1rem;
            color: @dominantColor;
            padding: 0.13rem 0;
            font-size: 0.25rem;
            border-radius: 0.1rem;
            // border-radius: 1rem;
            background: #fff;
            border: 1px solid @dominantColor;
            position: absolute;
            right: 0;
            i {
              font-size: .28rem;
              color: @dominantColor;
              font-weight:800; 
              position: relative;
              left: .04rem;
            }
          }
          .select_follow {
            background: @dominantColor;
            color: #fff;
          }
        }
        > span:nth-child(2) {
          color: #808080;
          font-size: 0.25rem;
          line-height: 1;
          // margin-bottom: 0.22rem;
        }
        > span:nth-child(3) {
          color: #333333;
          font-size: 0.333rem;
          margin-bottom: 0.173rem;
          margin-right: 0.3rem;
        }
        > img {
          width: 4.6rem;
          height: 3.21rem;
          display: block;
          margin-bottom: 0.31rem;
        }
        // 图片初始化
        .circleFriends {
          display: flex;
          width: 85%;
          li {
            max-height: 200px;
            min-height: 150px;
            list-style: none;
            -moz-box-sizing: border-box;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            background: #fff;
            margin-right: 5px;
            margin-bottom: 5px;
            max-width: 100%;
            min-width: 100%;
            background-position: left center;
            background-size: contain;
            background-repeat: no-repeat;
          }
        }
        .isBolgImg {
          display: flex;
          width: 85%;
          flex-wrap: wrap;
          box-sizing: border-box;
          li {
            height: 1.5rem;
            float: left;
            list-style: none;
            -moz-box-sizing: border-box;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            background: #fff;
            margin-right: 5px;
            margin-bottom: 5px;
            width: 31.3%;
            background-position: center;
            background-size: cover;
            background-repeat: no-repeat;
          }
        }
        .operation {
          display: flex;
          position: relative;
          > div {
            display: flex;
            align-items: center;
            > span {
              color: #9f9f9f;
              margin-left: 0.1rem;
              font-size: 0.3rem;
              position: relative;
              top: 0px;
            }
          }
          .zan {
            cursor: pointer;
            .iconfont {
              font-size: 0.3rem;
              color: #9f9f9f;
            }
          }
          .del {
            width: 100%;
            display: flex;
            justify-content: flex-end;
            span {
            }
          }
          .comment {
            flex: 2;
            cursor: pointer;
            .iconfont {
              font-size: 0.4rem;
              color: #9f9f9f;
              vertical-align: middle;
              margin-top: 2px;
            }
            .commentDiv {
              width: 100%;
              background: #f5f5f5;
              position: absolute;
              top: 22px;
              left: 0px;
              margin-top: 5px;
              padding: 5px;
              > div {
                font-size: 0.25rem;
                > span:nth-child(1) {
                  color: @dominantColor;
                }
              }
            }
          }
          .share {
            flex: 0.5;
            -webkit-justify-content: end;
            justify-content: end;
            cursor: pointer;
            .iconfont {
              font-size: 0.3rem;
              color: #9f9f9f;
            }
          }
        }
      }
    }
  }
}
</style>
