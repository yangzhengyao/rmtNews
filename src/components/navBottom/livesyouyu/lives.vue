<template>
  <div id="lives">
    <!-- 头部 -->
    <header class="com_header headerNavFixed">
      <div  style="visibility:hidden" class="nvbt iback"></div>
      <div class="nvtt">媒体矩阵</div>
      <div class="nvbt iabout"></div>
    </header>
    <!-- <div class="res">
      <div class="scroll-wrapper contentNavFixed">
        <iframe
          class="iframeDiv"
          scrolling="yes"
          src="https://live.xinhuaapp.com/xcy/reportlist.html?liveId=1538761012555255&from=timeline&isappinstalled=0"
          frameborder="0"
        ></iframe>
      </div>
    </div> -->
    <!-- 内容区域 -->
    <swiper-container></swiper-container>
    <!-- 请求提示 -->
    <my-loading :visible="loading"></my-loading>
    <my-error :visible="error" :method="init"></my-error>
  </div>
</template>
<script>
import swiperContainer from './components/swiperContainer'
import { mapActions } from "vuex";
export default {
  name: "lives",
  data() {
    return {
      classPage: 1, // 当前栏目的翻页页数
      contentJson: [], // 整个列表数据
      dataCount: 0, // 推荐文章数量
      topStatus: "", // 下拉状态
      bottomLock: false, // 上滑开关
      bottomLoading: true, // 底部loading
      bottomNoData: false, // 底部nothing
      loading: false,
      error: false,
      location: 0
    };
  },
  components: { swiperContainer },
  methods: {
    // ...mapActions('video', [
    //     'get_videoItem_data'
    // ]),
    init() {
      if (this.contentJson.length === 0) {
        this.loading = true;
        this.loadTopAjax();
      }
    },
    loadTopAjax() {
      this.get_videoItem_data(this.classPage)
        .then(res => {
          this.loading = false;
          if (res) {
            this.contentJson.unshift(...res);
            this.dataCount = res.length;
            this.classPage++;
            this.globalTip = "dataCount";
            $(`#lives .dataCount`)
              .slideDown(200)
              .delay(1000)
              .slideUp(200);
          } else {
            $(`#lives .noNewData`)
              .slideDown(200)
              .delay(1000)
              .slideUp(200);
          }
          this.$refs.loadmore.onTopLoaded();
          this.error = false;
          $(`#lives .requestFail`).hide();
        })
        .catch(err => {
          console.log(err);
          if (this.contentJson.length > 0) {
            $(`#lives .requestFail`).show();
          } else {
            this.error = true;
          }
          this.loading = false;
        });
    },
    loadBottomAjax() {
      if (!this.bottomNoData) {
        this.bottomLock = true;
        this.get_videoItem_data(this.classPage).then(res => {
          if (res) {
            this.contentJson.push(...res);
            this.classPage++;
          } else {
            this.bottomLoading = false;
            this.bottomNoData = true;
          }
          this.bottomLock = false;
        });
      }
    },
    handleTopChange(status) {
      this.topStatus = status;
    },
    handleLocaltion(type) {
      if (type === "get") {
        this.$nextTick(() => {
          $(`#lives .container`).scrollTop(this.location);
        });
      } else if (type === "set") {
        this.location = $(`#lives .container`).scrollTop();
      }
    }
  },
  mounted() {}
  // created() {
  //     this.init()
  // },
  // activated() {
  //     this.handleLocaltion('get')
  // },
  // deactivated() {
  //     this.handleLocaltion('set')
  // }
};
</script>
<style lang='stylus' scoped>
.head > .login {
  -ms-flex: 1;
  flex: 1;
  font-weight: 700;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.head {
  width: 100%;
  height: 50px;
  background-color: rgb(190, 44, 31);
  font-size: 19px;
  font-weight: bold;
  color: rgb(250, 250, 250);
  line-height: 50px;
  text-align: center;
}

.scroll-wrapper {
  -webkit-overflow-scrolling: touch;
  overflow: scroll;
  height: 100%;

  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
}

#lives {
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding-top: 0.1rem;
  background: #f2f2f2;

  .res {
    height: 100%;

    .container {
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
            background: #FBE9EF;
          }
        }
      }

      .mint-loadmore-top {
        height: 50px;
        line-height: 50px;
        font-size: 14px;
        color: #999;

        span {
          display: block;
        }

        .pullLoading {
          width: 24px;
          height: 24px;
          vertical-align: middle;
          margin-top: -4px;
          margin-right: 3px;
        }
        
      }
    }
  }
}

html, body {
  height: 100%;
  margin: 0;
  padding: 0; 
}

</style>
