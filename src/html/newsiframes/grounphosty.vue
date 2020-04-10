<template>
  <div id="servicelist">
    <header class="com_header headerNavFixed" style="background:#fff;line-height: 0.4rem; ">
      <div class="nvbt iback iBlackBack" @click="apis.iback()"></div>
      <div class="nvtt" style="color:#000;line-height: .88rem;">库尔勒医院</div>
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
      <iframe class="my_frame" v-if="newindex==0" id="iframepages" frameborder="0" height="100%" scrolling='no' 
      src="http://www.giantecwechat.site/WeChatPlatformKuerle/result.html#/Introduce" style="width:1px; min-width:100%; *width:100%;height:50rem!important;"></iframe>

      <iframe class="my_frame" v-if="newindex==1" id="iframepages" frameborder="0" height="100%" scrolling='no'
        src="http://www.giantecwechat.site/WeChatPlatformKuerle/result.html#/PolicyList"
        style="width:1px; min-width:100%; *width:100%;height:38.5rem!important;"></iframe>

      <iframe class="my_frame" v-if="newindex==2" id="iframepageslist" frameborder="0" height="100%" scrolling='no' src="
    http://www.giantecwechat.site/WeChatPlatformKuerle/result.html#/PriceEnquiry
    " style="width:1px; min-width:100%; *width:100%;height:23rem!important;"></iframe>

    
      <iframe class="my_frame" v-if="newindex==3" id="iframepages" frameborder="0" height="100%" scrolling='no' src="
  http://www.giantecwechat.site/WeChatPlatformKuerle/result.html#/ProjectQuery
  " style="width:1px; min-width:100%; *width:100%;height:88rem!important;"></iframe>
    </div>
  </div>
</template>
<script>
export default {
  name: "service",
  data() {
    return {
      newindex: 0,
      iphonexPadding:false,
      ximeng: [
        {
          tabname: "医院介绍",
          indexActive: 0
        },
        {
          tabname: "政策信息",
          indexActive: 1
        },
        {
          tabname: "药品查询",
          indexActive: 2
        },
        {
          tabname: "项目查询",
          indexActive: 3
        }
      ]
    };
  },
  components: {},

  created() {},
  methods: {
    tabClick(num) {
      $(".servercont").scrollTop(0);
      this.newindex = num;
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
.van-dialog{top:20%!important}
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
 .changetoplist{margin-top: 36%!important;}
</style>
<style>
.content .item:nth-child(3n + 0) {
  border-right: 0 !important;
}

</style>


