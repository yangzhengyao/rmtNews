<template>
  <swiper
    :options="swiperOption"
    class="swiper-box"
    ref="mySwiper"
    :class="{isIOS: $store.state.device == 'ios'}"
  >
    <swiper-slide v-for="(item,index) in indexColumn" :key="index" class="swiper-slide-box">
      <template v-if="apis.getTheme() == 'tiemenguan' && item.classpath == '5cbebdef0cf2c3d1b7e9d3b0'">
        <nav class="homeNavFixed childNav">
            <div class="nav_ul nav_home" @touchstart="touch($event)" @touchmove="touchmove($event)">
                <a href='javascript:;' v-for="(item,index) in tmg_childTabList"  @click="navClick(item.uuid)" :class="{ active:childTabActive == item.uuid }" :key="index">{{item.name}}
                </a>
            </div>
            <mt-tab-container v-model="childTabActive">
                <mt-tab-container-item
                  v-for="(item,index) in tmg_childTabList"
                  :key="index"
                  :id="item.uuid"
                >
                  <pullContainer :type="item.uuid" :childTabActive="childTabActive"></pullContainer>
                </mt-tab-container-item>
            </mt-tab-container>
            <!-- <pullContainer :type="item.uuid" :childTabActive="childTabActive"></pullContainer> -->
        </nav>
      </template>
      <template v-if="apis.getTheme() == 'tiemenguan' && item.classpath == '5d021ac6e4b0ed2aef82fd92'">
        <nav class="homeNavFixed childNav">
            <div class="nav_ul nav_home zhuanti" @touchstart="touch($event)" @touchmove="touchmove($event)" style="overflow:inherit">
                <a href='javascript:;' v-for="(item,index) in tmg_childTabList2"  @click="navClick2(item.uuid)" :class="{ active:childTabActive2 == item.uuid }" :key="index">{{item.name}}
                </a>
            </div>
            <mt-tab-container v-model="childTabActive2">
                <mt-tab-container-item
                  v-for="(item,index) in tmg_childTabList2"
                  :key="index"
                  :id="item.uuid"
                >
                  <pullContainer :type="item.uuid" :childTabActive="childTabActive2"></pullContainer>
                </mt-tab-container-item>
            </mt-tab-container>
            <!-- <pullContainer :type="item.uuid" :childTabActive="childTabActive"></pullContainer> -->
        </nav>
      </template>
      <template v-if="apis.getTheme() == 'tiemenguan' && item.classpath == '5d03424fe4b0ed2aef82fdcb'">
        <nav class="homeNavFixed childNav">
            <div class="nav_ul nav_home" @touchstart="touch($event)" @touchmove="touchmove($event)">
                <a href='javascript:;' v-for="(item,index) in tmg_childTabList3"  @click="navClick3(item.uuid)" :class="{ active:childTabActive3 == item.uuid }" :key="index">{{item.name}}
                </a>
            </div>
            <mt-tab-container v-model="childTabActive3">
                <mt-tab-container-item
                  v-for="(item,index) in tmg_childTabList3"
                  :key="index"
                  :id="item.uuid"
                >
                  <pullContainer :type="item.uuid" :childTabActive="childTabActive3"></pullContainer>
                </mt-tab-container-item>
            </mt-tab-container>
            <!-- <pullContainer :type="item.uuid" :childTabActive="childTabActive"></pullContainer> -->
        </nav>
      </template>
       <template v-if="apis.getTheme() == 'youyu' && item.classpath == '5cc7b0d70cf2acaeba3f52a8'">
                        <nav class="homeNavFixed childNav">
                            <div class="nav_ul nav_home navlist" @touchstart="touch($event)" @touchmove="touchmove($event)" >
                                <a href='javascript:;' v-for="(item,index) in tmg_childTabListyouyu"  @click="navClick4(item.uuid)" :class="{ active:childTabActive4 == item.uuid }" :key="index">{{item.name}}
                                </a>
                            </div>
                            <mt-tab-container v-model="childTabActive4">
                                <mt-tab-container-item
                                v-for="(item,index) in tmg_childTabListyouyu"
                                :key="index"
                                :id="item.uuid"
                                >
                                <pullContainer :type="item.uuid" :childTabActive="childTabActive4"></pullContainer>
                                </mt-tab-container-item>
                            </mt-tab-container>
                            <!-- <pullContainer :type="item.uuid" :childTabActive="childTabActive"></pullContainer> -->
                        </nav>
            </template>
      <template v-else>
        <pullContainer :type="item.classpath" :swiper='isSwiper'></pullContainer>
      </template>
    </swiper-slide>
  </swiper>
</template>
<script>
import pullContainer from "../components/pullContainer";
import { mapGetters, mapMutations, mapActions } from "vuex";
import apis from "../../../../../src/assets/js/api.js";
export default {
  components: {
    pullContainer
  },
  data() {
    return {
      swiperOption: {
        notNextTick: true,
        onSlideChangeStart: this.slideChangeCallBack,
        onSliderMove: this.slideMoveCallBack,
        onTouchEnd: this.touchEndCallBack
      },
      lianghuiList: [],
      childTabActive: '5d0341dce4b0ed2aef82fdc1',
      childTabActive2: '5d07176de4b03673f896c660',
      childTabActive3: '5d03427be4b0ed2aef82fdcd',
      childTabActive4: '5d085bf4e4b03673f896c683',
      childTabList: [],
      tmg_childTabList: [],
      tmg_childTabList2:[],
      tmg_childTabList3:[],
      tmg_childTabListyouyu:[],
      active:0,
      isSwiper:false,
    };
  },
  computed: {
    ...mapGetters("index", ["indexActive", "activeIndex", "indexColumn"])
  },
  watch: {
    indexActive() {
      this.slideTo();
    }
  },
  methods: {
    ...mapMutations("index", ["set_indexActive", "set_indexSwiper"]),
    ...mapActions("index", [
      "TV_child_listItem_data",
      "lianghui_indexColumn_data",
      "tmg_child_listItem_data",
      'zhuanti_child_listItem_data',
      'fazhi_child_listItem_data',
      'shijian_child_listItem_data'
    ]),
    navClick(uuid){
      this.childTabActive = uuid;
    },
    navClick2(uuid){
      this.childTabActive2 = uuid;
    },
    navClick3(uuid){
      this.childTabActive3 = uuid;
    },
    navClick4(uuid){
      this.childTabActive4 = uuid;
    },
    touch(oEvent){
      oEvent.cancelBubble = true;
    },
    touchmove(oEvent){
      $('.zhuanti').css({ 'overflow-x':'auto' });
      oEvent.cancelBubble = true;
    },
    slideTo() {
      this.$refs.mySwiper.swiper.slideTo(this.activeIndex, 300, true); // 让swiper滚动到index位置
    },
    slideChangeCallBack(swiper) {
      let index = swiper.activeIndex;
      this.set_indexActive(this.indexColumn[index].classpath); // 滚动完swiper需要改变vuex里面的indexActive，这是为了与栏目联动
    },
    // 移动的时候设为true，这是为了移动时，不能下拉，我在mint-ui的loadmore代码里自定义了一个属性用于监听左右滑动，然后禁止loadmore组件的触发
    slideMoveCallBack() {
      this.set_indexSwiper(true);
      this.isSwiper = true;
    },
    // 移动的时候设为true，这是为了移动时，不能下拉，我在mint-ui的loadmore代码里自定义了一个属性用于监听左右滑动，然后禁止loadmore组件的触发
    touchEndCallBack() {
      this.set_indexSwiper(false);
      this.isSwiper = false;
    }
  },
  mounted() {
    let that = this;
    this.lianghui_indexColumn_data()
      .then(res => {
        var tempArr = [];
        res.forEach(function(item, i) {
          tempArr.push({
            classid: item.uuid,
            classname: item.name
          });
        });
        this.lianghuiList = tempArr;
      })
      .catch(err => {});
    //看电视子栏目
    this.TV_child_listItem_data().then(res => {
      this.childTabList = res;
    });
    this.tmg_child_listItem_data().then(res => {
      that.tmg_childTabList = res;
    });
    this.zhuanti_child_listItem_data().then(res => {

      that.tmg_childTabList2 = res.data;
    });
    this.fazhi_child_listItem_data().then(res => {
      
      that.tmg_childTabList3 = res.data;
    });
      this.shijian_child_listItem_data()
        .then(res => {
             this.tmg_childTabListyouyu = res.data;
        })
        .catch(err => {
            
        })

    
  }
};
</script>
<style lang='stylus' >
.swiper-box.isIOS {
  padding-top: 1.335rem;
}

.swiper-box {
  width: 100%;
  height: 100%;
  z-index: 0;
  background: #ffffff !important;
  padding-top: 2.295rem;
  padding-top: 1.85rem !important;
  // padding-top:100px !important;
  .swiper-slide-box {
    padding-top: 0rem;
  }
}

.swiper-box-special .swiper-box {
  padding: 0 !important;
}

.listItem a[data-v-43c7437e] {
  display: block;
  width: 100%;
  padding: 0.427rem 0;
  outline: none;
  color: #131313;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0.1);
  text-decoration: none;
}

.listItem h3 {
  white-space: normal;
  font-size: 0.34rem;
  line-height: 0.48rem;
  color: #222;
  font-weight: 400;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  overflow: hidden;
  padding: 0.427rem 0;
}

// 看电视
.wenlv-child-tab .mint-tab-item-label {
  font-size: 16px;
}

.child-tab {
  .mint-tabbar > .mint-tab-item.is-selected {
    color: #333;
  }

  .listItem >div:first-child {
    margin-top: 10px;
  }
}
</style>
<style lang="less" scoped>
.mint-tabbar {
  z-index: 1111;
  top: 0;
  bottom: auto;
  height: 94px;
  .wenlv-child-tab {
    padding: 66px 0 0 0;
    &:nth-child(1) {
      background: ~"url('../images/cyIcon.png') no-repeat center 12px / 40px";
    }
    &:nth-child(2) {
      background: ~"url('../images/ztIcon.png') no-repeat center 12px / 40px";
    }
    &:nth-child(3) {
      background: ~"url('../images/wsp1.png') no-repeat center 12px / 40px";
    }
    &.is-selected {
      &:nth-child(1) {
        background: ~"#f2f2f2 url('../images/cyIcon.png') no-repeat center 12px / 40px";
      }
      &:nth-child(2) {
        background: ~"#f2f2f2 url('../images/ztIcon.png') no-repeat center 12px / 40px";
      }
      &:nth-child(3) {
        background: ~"#f2f2f2 url('../images/wsp1.png') no-repeat center 12px / 40px";
      }
    }
  }
}
nav {
  position: relative;
  background-color: #f4f5f6;
  border-bottom: 1px solid #eee;
  padding-right: 1.06rem;
  .nav_ul {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    white-space: nowrap;
    font-size: 0;
    &::-webkit-scrollbar {
      width: 0;
      height: 0;
      display: none;
    }
    a {
      display: table-cell;
      *display: inline-block;
      vertical-align: middle;
      padding: 0 0.133rem; //0 0.267rem
      margin-left: 0.133rem;
      height: 0.68rem;
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
        // font-weight: bold;
        span {
          border-bottom: 2px solid @dominantColor;
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
      background-color: rgba(244, 245, 246, 0.3);
    }
    .more_btn {
      display: block;
      width: 1.06rem;
      height: 100%;
      background-size: 0.32rem;
      background-color: #f4f5f6;
    }
  }
}
.childNav {
  padding: 0;
  background: #fff;
  padding: 0.2rem 0;
  // padding-left: 0.5rem;
  .nav_ul {
    margin-bottom:.2rem;
    position: relative;
    left: .2rem;
    a {
      color: #828186;
      background: #f9f9fb;
      // margin: 0 0.2rem !important;
      display: inline-block;
      line-height: 0.55rem;
      border-radius: 3px;
      padding: 0 0.2rem;
      font-size: .3rem;
      height: .55rem;
      margin: 0 .1rem;
      &.active {
        color: #fff;
        background: @dominantColor;
      }
    }
  }
}
.mint-tab-container {
  // margin-top: 94px;
  .mint-tab-container-item {
    height: calc(100vh - 180px);
  }
}
// .lianghui {
//     width: 100%;
//     height: 100%;
//     padding: 10px 10px 0.5rem;
//     -webkit-overflow-scrolling: touch;
//     overflow-y: auto;
//     >div {
//         width: 100%;
//         height: 2.96rem;
//         margin-bottom: 10px;
//         &:nth-child(1) {
//             background: url('../../../../assets/img/qingtongxia/xbdnklh.jpg') no-repeat center / cover;
//         }
//         &:nth-child(2) {
//             background: url('../../../../assets/img/qingtongxia/lhjj.jpg') no-repeat center / cover;
//         }
//         &:nth-child(3) {
//             background: url('../../../../assets/img/qingtongxia/dhlh.jpg') no-repeat center / cover;
//         }
//         &:nth-child(4) {
//             background: url('../../../../assets/img/qingtongxia/lhqwfb.jpg') no-repeat center / cover;
//         }
//         >div {
//             width: 100%;
//             height: 100%;
//         }
//     }
// }
</style>

