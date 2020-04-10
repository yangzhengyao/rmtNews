<template>
  <div id="service">
    <header class="com_header headerNavFixed historytop">
      <div style="visibility:hidden" class="nvbt iback"></div>
      <!-- 市民云  服务 -->
      <div class="nvtt" v-if="apis.getTheme() != 'leshan'">市民云</div>
      <div class="nvtt" v-else-if="apis.getTheme() == 'mile'">便民云</div>
      <div class="nvtt" v-else>智慧传媒</div>
      <div class="nvbt iabout"></div>
      <div class="slide-box">
        <a
          @click="tabClick(index)"
          :class="{actives:index==0}"
          v-for="(item,index) in tabsall.tablist"
          :key="index"
        >{{item.tabname}}</a>
        <div class="endmargin"></div>
      </div>
    </header>
    <div class="scroll-wrapper contentNavFixed com_contentNavFixed scroll-all">
      <div class="service-box">
        <div class="ibox newiboxs" >
          <h1>政务服务</h1>
          <div class="content">
            <a
              :to="item.src"
              class="item"
              v-for="(item,index) in bsData.zhengwu"
              :key="index"
              @click="apis.urlParams(item.src,{'title':item.name},true)"
            >
              <img :src="item.icon" alt />
              <h3 v-html="item.name"></h3>
            </a>
          </div>
        </div>
        <div class="ibox newiboxs" >
          <h1>婴幼服务</h1>
          <div class="content">
            <a
              :to="item.src"
              class="item"
              v-for="(item,index) in bsData.yinyou"
              :key="index"
              @click="apis.urlParams(item.src,{'title':item.name},true)"
            >
              <img :src="item.icon" alt />
              <h3 v-html="item.name"></h3>
            </a>
          </div>
        </div>
        <div class="ibox newiboxs" >
          <h1>文体教育</h1>
          <div class="content">
            <a
              :to="item.src"
              class="item"
              v-for="(item,index) in bsData.wenti"
              :key="index"
              @click="apis.urlParams(item.src,{'title':item.name},true)"
            >
              <img :src="item.icon" alt />
              <h3 v-html="item.name"></h3>
            </a>
          </div>
        </div>
        <!-- <div class="ibox newiboxs" >
          <h1>民生保障</h1>
          <div class="content">
            <a
              :to="item.src"
              class="item"
              v-for="(item,index) in bsData.minsheng"
              :key="index"
              @click="apis.urlParams(item.src,{'title':item.name},true)"
            >
              <img :src="item.icon" alt />
              <h3 v-html="item.name"></h3>
            </a>
          </div>
        </div> -->
        <div class="ibox newiboxs" >
          <h1>就业创业</h1>
          <div class="content">
            <a
              :to="item.src"
              class="item"
              v-for="(item,index) in bsData.jiuye"
              :key="index"
              @click="apis.urlParams(item.src,{'title':item.name},true)"
            >
              <img :src="item.icon" alt />
              <h3 v-html="item.name"></h3>
            </a>
          </div>
        </div>
        <div class="ibox newiboxs" >
          <h1>家庭生活</h1>
          <div class="content">
            <a
              :to="item.src"
              class="item"
              v-for="(item,index) in bsData.jiating"
              :key="index"
              @click="apis.urlParams(item.src,{'title':item.name},true)"
            >
              <img :src="item.icon" alt />
              <h3 v-html="item.name"></h3>
            </a>
          </div>
        </div>
        <div class="ibox newiboxs" >
          <h1>交通旅游</h1>
          <div class="content">
            <a
              :to="item.src"
              class="item"
              v-for="(item,index) in bsData.jiaotong"
              :key="index"
              @click="apis.urlParams(item.src,{'title':item.name},true)"
            >
              <img :src="item.icon" alt />
              <h3 v-html="item.name"></h3>
            </a>
          </div>
        </div>
        <div class="ibox newiboxs" >
          <h1>健康医疗</h1>
          <div class="content">
            <a
              :to="item.src"
              class="item"
              v-for="(item,index) in bsData.jiankang"
              :key="index"
              @click="apis.urlParams(item.src,{'title':item.name},true)"
            >
              <img :src="item.icon" alt />
              <h3 v-html="item.name"></h3>
            </a>
          </div>
        </div>
        <div class="ibox newiboxs" >
          <h1>环境气象</h1>
          <div class="content">
            <a
              :to="item.src"
              class="item"
              v-for="(item,index) in bsData.huanjing"
              :key="index"
              @click="apis.urlParams(item.src,{'title':item.name},true)"
            >
              <img :src="item.icon" alt />
              <h3 v-html="item.name"></h3>
            </a>
          </div>
        </div>
        <div class="ibox newiboxs" >
          <h1>电商服务</h1>
          <div class="content" style="height:0">
            <a
              :to="item.src"
              class="item"
              v-for="(item,index) in bsData.dianshang"
              :key="index"
              @click="apis.urlParams(item.src,{'title':item.name},true)"
            >
              <img :src="item.icon" alt style="height: 0.6888rem;" />
              <h3 v-html="item.name"></h3>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { webview } from "assets/js/webview";
import { fire } from "assets/js/utils";
import { indexMixin } from "assets/js/mixins";
import { mapActions } from "vuex";
import tabJson from "./tabJson/taball.js";
import servicesJson from "./servicesJson/baisha"; //海南白沙市民云json配置文件
//import servicesJson from "./servicesJson/wanning"; //海南白沙市民云json配置文件
export default {
  name: "service",
  data() {
    // 投诉举报
    var bsData = {};
    // 白沙json
    // if (this.apis.getTheme() == 'baisha') {
       bsData = servicesJson;
    // }
    return {
      isChinaTime: false,
      bsData:servicesJson,
      tabsall: {
        tablist: tabJson.baisha
      },
      index: 0,
      _H1: 0,
      _H2: 0,
      _H3: 0,
      _H4: 0,
      _H5: 0,
      _H6: 0,
      _H7: 0,
      _H8: 0,
      _H9: 0,
      _H10: 0,
      _H11: 0,
      _H12: 0,
      newindex: 0,
      herfTel: "javascript:void(0);"
    };
  },
  components: {},
  methods: {
    dataAIFn(index, item) {
      if (this.apis.getTheme() == "tiemenguan") {
        if (index == 0) {
          this.apis.urlParams("wechatItem", item, false);
        } else {
          this.apis.urlParams(
            item.menu,
            { path: item.menu, title: item.name },
            true
          );
        }
      } else if (this.apis.getTheme() == "wenchang") {
        if (index == 0) {
          this.apis.urlParams(
            item.menu,
            { path: item.menu, title: "1111111111" },
            true
          );
        } else {
          this.apis.urlParams("wechatItem", item, false);
        }
      } else if (this.apis.getTheme() == "puyang") {
        if (index == 1 || index == 2 || index == 6) {
          this.apis.urlParams(
            item.menu,
            { path: item.menu, title: item.name },
            true
          );
        } else {
          this.apis.urlParams("wechatItem", item, false);
        }
      } else {
        this.apis.urlParams(
          item.menu,
          { path: item.menu, title: "1111111111" },
          true
        );
      }
      // apis.getTheme() == 'tiemenguan'?index==0? apis.urlParams('wechatItem',item,false) :apis.urlParams(item.menu,{'path':item.menu,'title':'铁门关在线'},true) : apis.urlParams(item.menu,{'path':item.menu,'title':'1111111111'},true)
    },
    listclick(itmes, index) {
      if (itmes.name == "库尔勒医院") {
        this.apis.urlParams("grounphostys", { title: itmes.name }, false);
      } else if (itmes.name == "博斯腾宾馆") {
        this.apis.urlParams("groups", { title: itmes.name }, false);
      } else if (itmes.name == "铁门关大酒店") {
        this.apis.urlParams("groupslist", { title: itmes.name }, false);
      } else if (itmes.name == "志愿者活动") {
        let userData = localStorage.getItem("userData");
        if (userData == null) {
          this.apis.urlParams("Login");
        } else {
          this.apis.urlParams("activitylist", { title: itmes.name }, false);
        }
      } else {
        this.apis.urlParams(itmes.src, { title: itmes.name }, true);
      }
    },
    isLoginCertificate(src, name, marker) {
      let userData = localStorage.getItem("userData");
      this.herfTel = "javascript:void(0);";
      if (src == "certificate" || src == "reportpages") {
        if (userData == null) {
          this.apis.urlParams("Login");
        } else {
          this.apis.urlParams(src, { title: name.replace("<br>", "") }, marker);
        }
      } else if (name == "12345热线") {
        this.herfTel = "tel:" + 12345;
        return;
      } else {
        this.apis.urlParams(src, { title: name.replace("<br>", "") }, marker);
      }
    },
    tabClick(index) {
      if (
        document
          .querySelectorAll(".slide-box a")
          [index].classList.contains("actives")
      );
      if (index == 0) {
        $(".contentNavFixed").animate({ scrollTop: 0 }, 200);
      } else {
        $(".contentNavFixed").animate(
          {
            scrollTop: [
              this._H1,
              this._H2 + 4,
              this._H3 + 4,
              this._H4 + 4,
              this._H5 + 4,
              this._H6 + 4,
              this._H7 + 4,
              this._H8 + 4,
              this._H9 + 4,
              this._H10 + 4,
              this._H11 + 4,
              this._H12
            ][index - 1]
          },
          500
        );
      }
      this.newindex = index;
      this.slideTo(index);
    },
    slideTo(index) {
      this.$nextTick(() => {
        let _container = $(".slide-box"); // 获取滚动容器元素
        let _column = $(".slide-box a").eq(index); // 获取当前active栏目元素
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
          _container.stop().animate({ scrollLeft: this.move }, 300);
        }
      });
    },
    getRes(result, type) {
      //问政上传的图片地址保存在local
      let selecteType;
      if (plus.os.name == "iOS") {
        selecteType = result.type;
      } else {
        selecteType = type;
      }
      if (selecteType == 1) {
        let oldVal;
        let newVal;
        let datas = localStorage.getItem("wz_imgData");
        let jsonPic = result;
        if (datas) {
          oldVal = JSON.parse(datas);
          newVal = oldVal.concat(jsonPic.data);
          console.log(JSON.stringify(jsonPic.data));
          localStorage.setItem("wz_imgData", JSON.stringify(newVal));
        } else {
          localStorage.setItem("wz_imgData", JSON.stringify(jsonPic.data));
        }
      } else {
        localStorage.setItem("wz_vidData", JSON.stringify(result.data));
      }
    }
  },
  mounted() {
    window["WZImgBoxs"] = (result, type) => {
      //挂载到window上的方法，以便安卓或IOS调用
      this.getRes(result, type);
    };
    var timer = null;
    timer = setInterval(() => {
      var aLi = document.querySelectorAll(".newiboxs");
      try {
        if (aLi[0] && aLi[0].offsetHeight > 0) {
          clearInterval(timer);
          this._H1 = aLi[0].offsetHeight;
          this._H2 = aLi[1].offsetHeight + this._H1;
          this._H3 = aLi[2].offsetHeight + this._H2;
          this._H4 = aLi[3].offsetHeight + this._H3;
          this._H5 = aLi[4].offsetHeight + this._H4;
          this._H6 = aLi[5].offsetHeight + this._H5;
          this._H7 = aLi[6].offsetHeight + this._H6;
          this._H8 = aLi[7].offsetHeight + this._H7;
          this._H9 = aLi[8].offsetHeight + this._H8;
          this._H10 = aLi[9].offsetHeight + this._H9;
          this._H11 = aLi[10].offsetHeight + this._H10;
          this._H12 = aLi[11].offsetHeight;
        }
      } catch (e) {
        console.log(e.message); //未获取到楼层高度，会抛出错误信息
      }
    }, 1000);
    $(".scroll-all").scroll(() => {
      var scrollTop = $(".scroll-all").scrollTop();
      if (scrollTop >= this._H1 && scrollTop < this._H2) {
        document
          .querySelector(".slide-box a.actives")
          .classList.remove("actives");
        document.querySelectorAll(".slide-box a")[1].classList.add("actives");
        this.newindex = 1;
      } else if (scrollTop >= this._H2 && scrollTop < this._H3) {
        document
          .querySelector(".slide-box a.actives")
          .classList.remove("actives");
        document.querySelectorAll(".slide-box a")[2].classList.add("actives");
        this.newindex = 2;
      } else if (scrollTop >= this._H3 && scrollTop < this._H4) {
        document
          .querySelector(".slide-box a.actives")
          .classList.remove("actives");
        document.querySelectorAll(".slide-box a")[3].classList.add("actives");
        this.newindex = 3;
      } else if (scrollTop >= this._H4 && scrollTop < this._H5) {
        document
          .querySelector(".slide-box a.actives")
          .classList.remove("actives");
        document.querySelectorAll(".slide-box a")[4].classList.add("actives");
        this.newindex = 4;
      } else if (scrollTop >= this._H5 && scrollTop < this._H6) {
        document
          .querySelector(".slide-box a.actives")
          .classList.remove("actives");
        document.querySelectorAll(".slide-box a")[5].classList.add("actives");
        this.newindex = 5;
      } else if (scrollTop >= this._H6 && scrollTop < this._H7) {
        document
          .querySelector(".slide-box a.actives")
          .classList.remove("actives");
        document.querySelectorAll(".slide-box a")[6].classList.add("actives");
        this.newindex = 6;
      } else if (scrollTop >= this._H7 && scrollTop < this._H8) {
        document
          .querySelector(".slide-box a.actives")
          .classList.remove("actives");
        document.querySelectorAll(".slide-box a")[7].classList.add("actives");
        this.newindex = 7;
      } else if (scrollTop >= this._H8 && scrollTop < this._H9) {
        document
          .querySelector(".slide-box a.actives")
          .classList.remove("actives");
        document.querySelectorAll(".slide-box a")[8].classList.add("actives");
        this.newindex = 8;
      } else if (scrollTop >= this._H9 && scrollTop < this._H10) {
        document
          .querySelector(".slide-box a.actives")
          .classList.remove("actives");
        document.querySelectorAll(".slide-box a")[9].classList.add("actives");
        this.newindex = 9;
      } else if (scrollTop >= this._H10 && scrollTop < this._H11) {
        document
          .querySelector(".slide-box a.actives")
          .classList.remove("actives");
        document.querySelectorAll(".slide-box a")[10].classList.add("actives");
        this.newindex = 10;
      } else if (scrollTop >= this._H12) {
        document
          .querySelector(".slide-box a.actives")
          .classList.remove("actives");
        document.querySelectorAll(".slide-box a")[11].classList.add("actives");
        this.newindex = 11;
      } else {
        document
          .querySelector(".slide-box a.actives")
          .classList.remove("actives");
        document.querySelectorAll(".slide-box a")[0].classList.add("actives");
        this.newindex = 0;
      }
      this.slideTo(this.newindex);
    });
  }
};
</script>
<style lang="less" scoped>
.endmargin {
  padding-right: 0.12rem;
}
.slide-box {
  display: -webkit-box;
  border-bottom: 1px solid #f0f0f0;
  clear: both;
  background: #fff;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  white-space: nowrap;
}
.ibox:last-child {
  height: calc(100vh - 1.7rem);
}
.slide-box a {
  height: 0.8rem;
  line-height: 0.8rem;
  font-size: 0.34rem;
  color: #1a1a1a;
  margin: 0rem 0.2rem 0 0.3rem;
  display: block;
}
.slide-box a.actives {
  // border-bottom: 2px solid #e32519;
  color: @dominantColor;
  font-weight: bold;
  font-size: 0.4rem;
}
.slide-box a:last-child {
  margin-right: 0.5rem;
}
.service-box {
  padding-top: 44px;
  position: relative;
}
.historytop {
  width: 100%;
  // background: #fff;
}
.slide-box::-webkit-scrollbar {
  display: none;
}
.navBarWrap {
  position: fixed;
  top: 0.88rem;
  z-index: 66;
}
#service {
  header {
    background: @headerBg;
    // background: #fff!important;
    .nvtt {
      font-size: 0.36rem;
      font-weight: 500;
      color: @headerColor;
      //  color: #1a1a1a!important;
    }
  }
  .com_contentNavFixed {
    height: calc(100vh - 0.2rem);
    box-sizing: border-box;
    padding-top: 44px;
  }
  height: 100%;
  background: #f7f7f7;
  .content {
    position: relative;
    width: 100%;
    height: 100%;
    padding-top: 1.335rem;
  }
  .content.isIOS {
    padding-top: 1.87rem;
    padding-top: 1.335rem;
  }
  .scroll-wrapper {
    -webkit-overflow-scrolling: touch;
    overflow: scroll;
  }
  font-size: 14px;
  .ibox {
    margin-top: 0rem;
    background: #fff;
    width: 100%;
    margin: 0rem auto;
    border-bottom: 0.12rem solid #f5f4f9;
    border-radius: 4px;
    h1 {
      font-size: 0.33rem;
      font-weight: 500;
      padding: 0.28rem 0 0.28rem 0.3rem;
      color: #5e5e5e;
    }
    .content {
      padding: 0;
      display: flex;
      flex-flow: wrap;
      .item {
        h3 {
          font-size: 0.27rem;
          margin-top: 0.14rem;
          font-weight: 500;
          color: #5e5e5e;
        }
        img {
          height: 0.4888rem;
          margin-top: 0.34rem;
          border-radius: 4px;
        }
        img.serviceBig {
          height: 0.5888rem;
        }
        flex: 0 0 33.3%;
        text-align: center;
        padding-bottom: 0.4rem;
        padding-top: 0.12rem;
      }
    }
  }

  // .ibox:nth-last-child(1) {
  //   // margin-bottom: 7px;
  // }
  .ibox {
    .content .item.wechat {
      img {
        height: 0.7rem;
        border-radius: 50%;
      }
      h3 {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        margin-left: 0.07rem;
        margin-right: 0.07rem;
      }
    }
  }
  .navclolr {
    color: rgb(26, 26, 26);
  }
  .navcolor {
    .nvtt {
      color: #fff;
    }
    background: @dominantColor;
  }
}
#service header .nvtt.navclolr {
  color: rgb(26, 26, 26);
}
</style>
<style>
.content .item:nth-child(3n + 0) {
  border-right: 0 !important;
}
</style>


