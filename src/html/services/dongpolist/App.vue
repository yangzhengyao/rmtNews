<template>
    <div id="home">
        <!-- 头部 -->
        <!-- <home-header/> -->
        <!-- 内容区域 -->
  <header class="com_header headerNavFixed" style="background: #fff;border-bottom: 1px solid #f0f0f0;">
      <div class="nvbt ibackBack" @click="apis.iback()"></div>
      <div class="nvtt" style="color: #1a1a1a;">{{title}}</div>
      <div class="nvbt idoc"></div>
 <div class="activtyall" v-if="title=='农民工之家'">
       <div class="activty-nav">
           <ul>
             <li><span :class="{active:type==1}" @click="tabClick(1)">农民工风采</span></li>
             <li><span :class="{active:type==0}" @click="tabClick(0)">求帮助</span></li>
             <li><span :class="{active:type==2}" @click="tabClick(2)">涨经验</span></li>
           </ul>
       </div>
	   </div>
    </header>
        <div style=""></div>
        <swiper-container ref="mychilds"></swiper-container>
        <!-- 子页面视图 -->
        <!-- <keep-alive>
            <router-view></router-view>
        </keep-alive> -->

        <!-- 请求提示 -->
        <my-loading :visible="loading"></my-loading>
        <my-error :visible='error' :method='reload'></my-error>
    </div>
</template>
<script>
import swiperContainer from './components/swiperContainer'
import { mapActions } from "vuex";
import { get_local_cache, set_local_cache } from '../../../config/cache'
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
      location: 0,
      title: '',
      type:1,
    };
  },
  components: { swiperContainer },
  methods: {
         //点击选项卡更改渲染的活动列表
        tabClick(type){
                if(type == '1'){//进行中
                    this.type = 1;
                   var uuids=JSON.parse(get_local_cache('dongpoall'));
                     uuids.uid='5d6e348be4b0e2963a408a8d';
                    set_local_cache('dongpoall', JSON.stringify(uuids));
                    this.$refs.mychilds.parentHandleclick();
                }else if(type == '0'){
                    this.type = 0;
                     var uuids=JSON.parse(get_local_cache('dongpoall'));
                     uuids.uid='5d6e349ee4b0e2963a408a8f';
                    set_local_cache('dongpoall', JSON.stringify(uuids));
                    this.$refs.mychilds.parentHandleclick();
                }else{
                    this.type = 2;
                     var uuids=JSON.parse(get_local_cache('dongpoall'));
                     uuids.uid='5d55251ce4b08f7738231ebc';
                    set_local_cache('dongpoall', JSON.stringify(uuids));
                    this.$refs.mychilds.parentHandleclick();
                }
        },
       reload() {
            localStorage.clear()
            sessionStorage.clear()
            // plus.storage.removeItem("launchFlag");
            location.reload()
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
   
  },
  mounted() {
    this.title=JSON.parse(get_local_cache('dongpoall')).title;
  }
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
<style lang='less' scoped>
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
  padding-bottom: 48px;
  background: #fff;

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
<style lang="stylus" scoped>
.activtyall{ width:100%;  margin-top:0rem; overflow: hidden;background:#fff}
.activty-nav{width:100%;height:0.85rem; border-bottom:1px solid #e8e8e8;}
.activty-nav ul li{ color: #999999; font-size:0.36rem;width:33.2%;  text-align:center; line-height:0.76rem; float: left; }
.activty-nav ul li span{display:inline-block; }
.activty-nav ul li span.active{color:#FB7517; font-weight:800}
.activty-nav ul li span.active:after{ border-bottom:2px solid #FB7517; display:block; width:0.4rem;height:2px;content:''; margin:0 auto;}
</style>
