<template>
  <div id="indexHeader" :class="isTop?'isTop':'noTop'">
    <!-- 头部 -->
    <header class="com_header headerNavFixed">
      <!-- 用于ios沉浸式状态栏 -->
      <div class="iosStatus" v-if="this.$store.state.device === 'ios'? true : false"></div>
      <div class="top_bar headerBg">
        <!-- <div
          class="fill-box"
          v-if="isWeather"
          style="position: absolute; left: .34rem;display:flex;flex-direction: column;line-height: .35rem;"
          @click="apis.urlParams(apis.theme.api.appWeatherUrl,{'title':'天气预报'},true)"
        >
          <span style="font-size:.25rem;">{{ weatherObj.wea }}</span>
          <span style="font-size:.25rem;">{{ weatherObj.tem2+'℃' }} ~ {{ weatherObj.tem1+'℃' }}</span>
        </div> -->
        <div
          class="logo"
          @click.stop.prevent="goTop"
          @touchstart="touchstartFunc"
          @touchend="touchendFunc"
          ref="logo"
        ></div>
        <div class="search" v-if="apis.getTheme() != 'naidong'">
          <div class="search_wrap">
            <i class="icon-search"></i>
            <!-- <div class="hot_topic">{{hot_topic}}</div> -->
            <div class="hot_topic" @click="seek">
              <img src="../../../../assets/img/search2.png" alt="#" />
              <!-- <span>青铜峡景区</span> -->
            </div>
          </div>
        </div>
        <div
          class="search"
          style="color:#fff;font-size:0.32rem"
          v-if="apis.getTheme() == 'naidong'"
          @click="switchNaidong"
        >
          <div class="search_wrap" ref="nd">{{naidong ? ndChinese : ndZang}}</div>
        </div>
      </div>
    </header>
    <!-- 栏目 -->
    <nav class="homeNavFixed">
      <div class="nav_ul nav_home" v-if="naidongZw">
        <a
          href="javascript:;"
          v-for="(item,index) in indexColumn"
          :class="{active: indexActive == item.classpath}"
          @click="navClick(item.classpath,index)"
          :key="index"
        >
          {{item.classname}}
          <span></span>
        </a>
      </div>
      <div class="nav_ul nav_home" v-if="apis.getTheme() == 'naidong' && naidong">
        <a
          href="javascript:;"
          v-for="(item,index) in indIndexColumn"
          :class="{active: indexActive == item.classpath}"
          @click="navClick1(item.classpath,index)"
          :key="index"
        >
          {{item.classname}}
          <span></span>
        </a>
      </div>
      <!-- 更多栏目 -->
      <div class="nav_menu" @click="add">
        <div class="shadow"></div>
        <div class="touming">
          <a href="javascript:;" class="more_btn"></a>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import apis from "../../../../../src/assets/js/api.js";
import axios from "axios";
import { get_local_cache, set_local_cache } from "../../../../config/cache";
import Bus from "@/Bus";
export default {
  data() {
    return {
      hot_topic: "搜你想搜的",
      move: 0,
      timer: 0,
      longNum: 0,
      weather: {},
      isTop: "",
      isWeather: false,
      ndChinese: "中文",
      ndZang: "བོད་ཡིག་པར་ངོས།",
      naidong: false,
      naidongZw: true,
      indIndexColumn: [
        {
          classid: "5d254ba5e4b09067cf75242a",
          classname: "གསར་འགྱུར་ལྟེ་གནས།",
          classpath: "5d254ba5e4b09067cf75242a",
          showclass: "0"
        },
        {
          classid: "5d254b72e4b09067cf752429",
          classname: "སྤྱི་ཚོགས་དམངས་འཚོ།",
          classpath: "5d254b72e4b09067cf752429",
          showclass: "0"
        },
        {
          classid: "5d254be0e4b09067cf75242e",
          classname: "སྣོད་བཅུད་ཡུལ་སྐོར།",
          classpath: "5d254be0e4b09067cf75242e",
          showclass: "0"
        },
        {
          classid: "5d254c01e4b09067cf75242f",
          classname: "ཞིང་འབྲོག་གསར་པ།",
          classpath: "5d254c01e4b09067cf75242f",
          showclass: "0"
        }
      ],
      backgroundImage:
        "url(" +
        require("../../../../../src/assets/img/naidong/logoND.png") +
        ")",
      backgroundImageZ:
        "url(" + require("../../../../../src/assets/img/naidong/logo.png") + ")"
    };
  },
  computed: {
    ...mapGetters("index", [
      "indexActive", // 当前ative的栏目
      "activeIndex", // 当前active的栏目的数组位置
      "indexColumn" // 栏目数据
    ])
  },
  watch: {
    indexActive() {
      this.slideTo(this.activeIndex);
    }
  },
  methods: {
    ...mapMutations("index", ["set_indexActive", "set_indexColumn"]),
    ...mapActions("search", ["get_topic_data"]),
    // 获取推荐信息
    get_topic() {
      this.get_topic_data().then(res => {
        if (res.data) {
          this.hot_topic = res.data;
        }
      });
    },
    //  跳转到增加栏目页面
    add() {
      let that = this;
      apis.urlParams("addNav");
      plus.webview
        .getWebviewById(window.location.href.split("#/")[0] + "#/" + "addNav")
        .addEventListener(
          "close",
          function(e) {
            that.set_indexColumn(JSON.parse(get_local_cache("index_Column")));
            that.set_indexActive(apis.theme.news.columnIdOrder[0]);
          },
          false
        );
    },
    //  跳转到搜索页面
    seek() {
      //  在后面可以拼接参数
      apis.urlParams("seek");
    },
    // 自己实现导航栏滚动
    slideTo(index) {
      this.$nextTick(() => {
        let _container = $(".nav_ul.nav_home"); // 获取滚动容器元素
        let _column = $(".nav_ul.nav_home a").eq(index); // 获取当前active栏目元素
        if (_column) {
          let _container_width = _container.width(); // 容器宽度
          let _container_left = _container.scrollLeft(); // 容器当前滚动条的值
          let _column_width = _column.width(); // 栏目宽度
          let _column_left = _column.position().left; // 栏目距离屏幕左边的距离
          let midWidth = (_container_width - _column_width) / 2; // 屏幕中心线的宽度
          // 容器滚动为0，并且active栏目位于中间线左边？滚动值为0 ：当前容器滚动值 + （active栏目相对于中间线的值，有正负）
          if (_container_left === 0 && _column_left <= midWidth) {
            this.move = 0;
          } else {
            this.move = _container_left + (_column_left - midWidth);
          }
          _container.animate({ scrollLeft: this.move }, 300);
        }
      });
    },
    navClick(type, index) {
      this.set_indexActive(type); // 点击栏目需要改变vuex内的indexActive值，这是为了与swiper联动
      //    this.indexColumn.splice(index,1);
    },
    navClick1(type, index) {
        console.log(11111,type,index)
      this.set_indexActive(type); // 点击栏目需要改变vuex内的indexActive值，这是为了与swiper联动
      //    this.indexColumn.splice(index,1);
    },
    goTop() {
      $(`.container.${this.indexActive}`).animate({ scrollTop: 0 });
      // localStorage.clear()
      // sessionStorage.clear()
      // location.reload()
    },
    touchstartFunc() {
      this.timer = setInterval(() => {
        this.longNum++;
        /* if(this.longNum > 10 && this.longNum<30){
                    clearTimeout(this.timer);
                    location.reload();
                }else  */ if (
          this.longNum > 20
        ) {
          clearTimeout(this.timer);
          localStorage.clear();
          sessionStorage.clear();
          location.reload();
          plus.storage.removeItem("launchFlag");
        }
        // console.log(this.longNum);
      }, 100);
    },
    touchendFunc() {
      clearTimeout(this.timer);
      if (this.longNum > 5) {
        location.reload();
      }
      this.longNum = 0;
    },
    switchNaidong() {
      this.naidong = !this.naidong;
      this.naidongZw = !this.naidongZw;
      if (this.naidong) {
        Object.assign(this.$refs.logo.style, {
          background: this.backgroundImage + "no-repeat center center",
          backgroundSize:"55%"
        });
      } else {
        Object.assign(this.$refs.logo.style, {
          background: this.backgroundImageZ + "no-repeat center center",
          backgroundSize:"55%"
        });
      }
    }
  },
  mounted(index) {
    var that = this;
    localStorage.setItem("index", index);
    set_local_cache(
      "index_Active",
      apis.theme.news.columnId.xjp
        ? apis.theme.news.columnId.xjp
        : apis.theme.news.columnId.xijinpingshijian
    );

    if (apis.isPC()) {
      window.addEventListener("storage", function(e) {
        if (e.key == "index_Column") {
          that.set_indexColumn(JSON.parse(get_local_cache("index_Column")));
          that.set_indexActive(apis.theme.news.columnIdOrder[0]);
        }
      });
    }
    let weatherCity = that.apis.parseQueryString(
      that.apis.theme.api.appWeather
    );
    axios({
      method: "post",
      url: "http://hongqi.wengetech.com:9001/weather/get",
      data: {
        cityid: weatherCity.cityid
      },
      headers: { "Content-Type": "application/json; charset=utf-8" }
    }).then(res => {
      if (res.data.success) {
        that.isWeather = true;
        that.weatherObj = res.data.data[0];
      }
    });
    Bus.$on("changedTop", val => {
      this.isTop = val;
    });
  },
  activated() {
    this.$nextTick(() => {
      $(".nav_ul.nav_home").scrollLeft(this.move);
    });
  }
};
</script>
<style lang='less' scoped>
#indexHeader {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  .iosStatus {
    width: 100%;
    height: 0.535rem;
  }
  .headerBg {
    // background-image: url("../../../../assets/img/pic.png");
    background-size: 100% 100% !important;
  }
  header {
    display: block;
    position: relative;
    // overflow: hidden;
    background-color: @dominantColor;
    color: #fff;
    .top_bar {
      position: relative;
      height: 0.88rem;
      user-select: none;
      display: flex;
      align-items: center;
      justify-content: center;
      // background: url('./../images/bg_img.png');
      background-size: contain;
      // .logo{
      //     // flex: 2.5;
      //     width: 4.04rem;
      //     height: 0.8rem;
      //     // margin-left: 0.4rem;
      // }
      .search {
        // flex: 1.5;
        height: 100%;
        padding: 0.15rem 0.4rem 0.15rem;
        color: @dominantColor;
        overflow: hidden;
        position: absolute;
        right: 0;
        .search_wrap {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          width: 100%;
          height: 100%;
          // border: 1px solid #ddd;
          border-radius: 50px;
          background: transparent;
          overflow: hidden;
          // padding: 0 0.267rem;
          .icon-search {
            font-size: 15px;
          }
          .hot_topic {
            img {
              width: 17px;
              margin-top: 0;
              margin-left: 0px;
              z-index: 99;
              float: right;
            }
            span {
              margin-left: 8px;
            }
            color: #999999;
            font-size: 14px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }
        }
      }
    }
  }
  nav {
    position: relative;
    background-color: #fff;
    border-bottom: 1px solid #fff;
    padding-right: 0.6rem;
    margin-left: 0.3rem;
    .nav_ul {
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      white-space: nowrap;
      font-size: 0;
      position: relative;
      left: -0.2rem;
      &::-webkit-scrollbar {
        width: 0;
        height: 0;
        display: none;
      }
      a {
        display: table-cell;
        *display: inline-block;
        vertical-align: middle;
        padding: 0.2rem; //0 0.267rem .3rem .39rem .3rem 0
        margin-left: 0.133rem;
        height: 0.68rem;
        line-height: 0.68rem;
        font-size: 0.34rem;
        color: #505050;
        white-space: nowrap;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0.3);
        text-decoration: none;
        -webkit-tap-highlight-color: transparent;
        position: relative;
        &:last-child {
          margin-right: 0.133rem;
        }
        &.active {
          color: @dominantColor;
          font-weight: bold;
          font-size: 0.4rem;
          span {
            // border-bottom: 2px solid @dominantColor;
            // height: 4px;
            // border-radius: 37%;
            // border: 2px solid @dominantColor;
            // background: @dominantColor;
            // top: 35px;
          }
        }
        span {
          position: absolute;
          top: 0;
          bottom: 2px;
          left: 20%;
          right: 20%;
        }
      }
      a:last-child {
        padding-right: 0.5rem;
      }
    }
    .nav_menu {
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
      .shadow {
        position: absolute;
        width: 0.267rem;
        height: 100%;
        left: -0.267rem;
        background-size: contain;
        // background-color: rgba(244, 245, 246, .3);
      }
      .touming {
        display: block;
        width: 1.06rem;
        height: 100%;
        background-size: 0.32rem;
        border-left: 0.01rem solid rgb(245, 244, 244);
        // background-color: #fff;
        background: -webkit-linear-gradient(
          left;rgba(253, 253, 253, 0.8),
          rgb(255, 254, 254, 1)
        );
      }
      .more_btn {
        display: block;
        width: 1.06rem;
        height: 100%;
        background-size: 0.32rem;
        //  background:linear-gradient(to right,rgba(255,255,255,0), rgba(100,102,102,1));
      }
    }
  }
}
.isTop {
  box-shadow: 0px 0px 5px 1px #ccc;
}
.noTop {
  box-shadow: none;
}
</style>
<style lang='less'>
#indexHeader .logo {
  /* background: url(~@/assets/img/news_logo.png)no-repeat center center; */
  width: 60%;
  height: 100%;
  background: @logoBg;
  background-size: @logoBgWidth;
}
#indexHeader .shadow {
  background: url(~@/assets/img/shadow.png) no-repeat 100%;
}

#indexHeader .more_btn {
  background: @moreBtnBg;
}
</style>
