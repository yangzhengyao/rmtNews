<template>
  <div id="servicelist">
    <header class="com_header headerNavFixed" style="background:#fff;line-height: 0.4rem; ">
      <div class="nvbt iback iBlackBack" @click="apis.iback()"></div>
      <div class="nvtt" style="color:#000;line-height: .88rem;">{{title}}</div>
      <div class="nvbt iabout"></div>
    </header>
    <div class="servercont" :class="iphonexPadding ? 'changetoplist':''">
      <div id="service">
        <div class="ibox newiboxs">
          <div class="content">
            <a class="item" v-for="(item,index) in list.Convenient" :key="index">
              <img class="serviceBig" :src="item.icon" alt />
              <h3 v-html="item.name"></h3>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { get_local_cache, set_local_cache } from "../../config/cache";
import servicesJson from "./dongpo"; //云南眉山市东坡json配置文件
export default {
  name: "service",
  data() {
    return {
      newindex: 0,
      iphonexPadding: false,
      list: servicesJson,
      title:'',
      ximeng: [
        // {
        //   tabname: "博斯腾宾馆去哪儿",
        //   indexActive: 0
        // },
        {
          tabname: "博斯腾宾馆艺龙",
          indexActive: 0
        },
        // {
        //   tabname: "博斯腾宾馆美团",
        //   indexActive: 2
        // },
        {
          tabname: "博斯腾宾馆携程",
          indexActive: 1
        }
      ]
    };
  },
  components: {},
  created() {},
  methods: {
    tabClick(index) {
      $(".servercont").scrollTop(0);
      this.newindex = index;
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
          _container.animate({ scrollLeft: this.move }, 300);
        }
      });
    }
  },
  mounted() {
    this.title = JSON.parse(get_local_cache("servergroups")).title;
    if (this.apis.iphonexPaddingFn()) {
      this.iphonexPadding = true;
    }
  }
};
</script>
<style>
.van-dialog {
  top: 20% !important;
}
</style>

<style lang="less" scoped>
#service {
  header {
    //  background: @headerBg;
    background: #fff !important;
    .nvtt {
      font-size: 0.36rem;
      font-weight: 500;
      //  color:@headerColor;
      color: #1a1a1a !important;
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
    padding-top: 1.335rem;
    height: 0;
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
        height: 2.2rem;
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
#servicelist {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
.servercont {
  width: 100%;
  margin-top: 16%;
  height: 100vh;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}

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
  height: calc(100vh);
}
.slide-box a {
  height: 0.8rem;
  line-height: 0.8rem;
  font-size: 0.34rem;
  color: #1a1a1a;
  margin: 0rem 0.1rem 0 0.3rem;
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
  background: #fff;
}
.slide-box::-webkit-scrollbar {
  display: none;
}
.navBarWrap {
  position: fixed;
  top: 0.88rem;
  z-index: 66;
}
</style>


