<template>
  <!-- 加载更多 -->
  <div id="userCore">
    <header class="headerNavFixed" style="">
      <div class="nvbt iback" @click="apis.iback()"></div>
      <div class="nvtt">票友大赛</div>
    </header>
    <div class="container contentNavFixed">
      <div class="friendsContent">
        <div class="banner">
          <img src="./images/piaoyoubanne.jpg" alt>
        </div>
        <!-- tab -->
        <div class="amatrueTab">
          <div>
            <img src="./images/tab1.png" alt>
            <span>周 TOP3</span>
          </div>
          <div>
            <img src="./images/tab2.png" alt>
            <span>月 TOP3</span>
          </div>
          <div>
            <img src="./images/tab3.png" alt>
            <span>季度 TOP3</span>
          </div>
          <div>
            <img src="./images/tab4.png" alt>
            <span>年度 TOP3</span>
          </div>
        </div>
        <!-- liebiao -->
        <div class="content">
          <div class="item">
            <img src="./images/headImg1.png" alt>
            <div class="right">
              <div>
                <span>柳萍</span>
                <img src="./images/logo1.png" alt style="width:.3reml;height:.42rem;">
              </div>
              <span>女，国家一级演员，荣获中国戏剧“梅花奖”，实现了宁夏“梅花奖”零的突破，宁夏回族自…</span>
            </div>
          </div>
          <div class="item">
            <img src="./images/headImg2.png" alt>
            <div class="right">
              <div>
                <span>李小雄</span>
                <img src="./images/logo2.png" alt style="width:.3reml;height:.42rem;">
              </div>
              <span>女，国家一级演员，荣获中国戏剧“梅花奖”，实现了宁夏“梅花奖”零的突破，宁夏回族自…</span>
            </div>
          </div>
          <div class="item">
            <img src="./images/headImg3.png" alt>
            <div class="right">
              <div>
                <span>张晓琴</span>
                <img src="./images/logo3.png" alt style="width:.3reml;height:.42rem;">
              </div>
              <span>女， 主工小旦、武旦，后改工小生，参加全区首届“汾曲香杯”秦腔广播电视大奖赛获二等奖…</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import qs from "qs";
//引入主页
import { Cell } from "mint-ui";
const root = process.env.API_ROOT;
export default {
  data() {
    return {
      json: []
    };
  },
  components: {
    // noData
  },
  computed: {
    ...mapGetters("login", [
      "getStorge" // active的栏目
    ])
  },
  methods: {
    skipUrl() {}
  },
  created() {},
  mounted() {}
};
</script>
<style scoped lang='less'>
@import "../../assets/communityIcon/iconfont.css";
.iconfont {
  font-size: 14px;
  color: #ccc;
}
.headerNavFixed > div {
  height: 44px;
}
.headerNavFixed {
  // background-image: url("./images/piaoyoubanne.jpg");
  // background-size: cover;
  // height: 285px;
}
#userCore {
  background: #f7f7f7;
  height: 100%;
}
.contentNavFixed {
  // padding-top: 44 !important;
}
.container {
  height: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  position: relative;
  .friendsContent {
    background: #fff;
  }
  .banner {
    position: relative;
    width: 100%;
    height: 5rem;
    padding-top: 0px;
    // top: -44px;
    img {
      height: 100%;
      width: 100%;
    }
  }
  .amatrueTab {
    display: flex;
    width: 100%;
    font-size: 0.25rem;
    color: #333333;
    position: relative;
    // top: -44px;
    > div {
      display: flex;
      flex-direction: column;
      text-align: center;
      flex: 1;
      background: #fff;
      padding-bottom: 0.4rem;
      border-bottom: 1px solid #ebebeb;
      img {
        width: 0.86rem;
        height: 0.75rem;
        margin: 0 auto;
        margin-top: 0.4rem;
        margin-bottom: 0.28rem;
      }
    }
  }
  .content {
    position: relative;
    // top: -44px;
    .item {
      margin: 0.3rem 0.25rem;
      display: flex;
      font-size: 0.25rem;
      img {
        width: 1.3rem;
        margin-right: 0.3rem;
        height: 1.7rem;
      }
      .right {
        padding: 0.2rem 0;
        > div {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.26rem;
          span {
            font-size: 0.33rem;
            color: #be2c1f;
          }
          img {
            height: 0.42rem;
            width: 0.3rem;
          }
        }
      }
    }
  }
}
</style>
