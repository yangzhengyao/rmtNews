<template>
  <div id="servicelist">
    <header class="com_header headerNavFixed" style="background:#fff;line-height: 0.4rem; ">
      <div class="nvbt iback iBlackBack" @click="apis.iback()"></div>
      <div class="nvtt" style="color:#000;line-height: .88rem;">博斯腾集团</div>
      <div class="nvbt iabout"></div>
      <div class="slide-box">
        <a
          @click="tabClick(item.indexActive)"
          :class="{actives:newindex==item.indexActive}"
          v-for="(item,index) in ximeng"
          :key="index"
        >{{item.tabname}}</a>
        <div class="endmargin"></div>
      </div>
    </header>
    <div class="servercont" :class="iphonexPadding ? 'changetoplist':''">
      <!-- <iframe
        class="my_frame"
        v-show="newindex==0"
        id="iframepages"
        frameborder="0"
        height="100%"
        scrolling="no"
        src="
        https://touch.qunar.com/hoteldetail?seq=bayinguoleng_2133&checkInDate=2019-01-25&checkOutDate=2020-07-26&fromForLog=铁门关大酒店美团
        "
        style="width:1px; min-width:100%; *width:100%;height:31rem!important;"
      ></iframe> -->

      <iframe
        class="my_frame"
        v-show="newindex==0"
        id="iframepages"
        frameborder="0"
        height="100%"
        scrolling="no"
        src="http://hotel.elong.com/53104002/"
        style="width:1px; min-width:100%; *width:100%;height:38.5rem!important;"
      ></iframe>
      <!-- <iframe
        class="my_frame"
        v-show="newindex==2"
        id="iframepages"
        frameborder="0"
        height="100%"
        scrolling="no"
        src="
    https://i.meituan.com/platform/share?mt_share_id=jyi7kjtf4lba&url=https%3A%2F%2Fi.meituan.com%2Fawp%2Fh5%2Fhotel%2Fpoi%2Fdeal.html%3FpoiId%3D2302580%26utm_term%3DAiphoneBgroupC10.0.800DqqEpoiG0000000000000B291CE5D53CF4A6BB91E45549F81CD23A15550131128241468320190725130024474%26utm_source%3Dappshare%26utm_medium%3DiOSweb%26utm_fromapp%3Dqq%26utm_sharesource%3Dpoi
    "
        style="width:1px; min-width:100%; *width:100%;height:43rem!important;"
      ></iframe> -->
      <iframe
        class="my_frame"
        v-show="newindex==1"
        id="iframepages"
        frameborder="0"
        height="100%"
        scrolling="no"
        src="
  https://m.ctrip.com/webapp/hotel/hoteldetail/2151634.html?atime=20190725&days=1&shareid=MjE1MTYzNHxob3RlbF9pbm5fZGV0YWlsfDh8MjAxOTA3MjUxMzA1MzM=&uid=3C4951AD689B88BC9CE11BE3A9BFC55428E4275125A2A8AFFC81696A5E2D290E&s_guid=EEDD803D-16A1-41EF-8AE2-EF6FE804AB1A
  "
        style="width:1px; min-width:100%; *width:100%;height:88rem!important;"
      ></iframe>
    </div>
  </div>
</template>
<script>
export default {
  name: "service",
  data() {
    return {
      newindex: 0,
      iphonexPadding: false,
      ximeng: [
        // {
        //   tabname: "博斯腾宾馆去哪儿",
        //   indexActive: 0
        // },
        {
          tabname: "博斯腾宾馆艺龙",
          indexActive:0
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
#servicelist {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
.servercont {
  width: 100%;
  margin-top: 26%;
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
  height: calc(100vh - 2.7rem);
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
#service {
  header {
    // background: #fff;
    .nvtt {
      font-size: 0.38rem;
      font-weight: 500;
      color: #fff;
    }
  }
  .com_contentNavFixed {
    height: calc(100vh - 0.1rem);
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
}
.changetoplist {
  margin-top: 36% !important;
}
</style>
<style>
.content .item:nth-child(3n + 0) {
  border-right: 0 !important;
}
</style>


