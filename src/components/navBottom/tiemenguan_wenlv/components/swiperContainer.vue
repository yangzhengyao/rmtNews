<template>
    <swiper :options="swiperOption" class="swiper-box swiper-box-news" ref="wenlvSwiper" :class="{isIOS: $store.state.device == 'ios'}">
        <swiper-slide v-for='(item,index) in indexColumn' :key='index' class="swiper-slide-box">
                <nav class="homeNavFixed childNav" v-if="apis.getTheme() == 'tiemenguan' && item.classpath == '5d24707be4b09067cf75240c'">
                        <div class="nav_ul nav_home" @touchstart="touch($event)" @touchmove="touchmove($event)">
                            <a href='javascript:;' v-for="(item,index) in tmg_childTabList3"  @click="navClick(item.uuid)" :class="{ active:childTabActive3 == item.uuid }" :key="index">{{item.name}}
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
                       
                    </nav>
                      <template v-else>
                            <pullContainer :type='item.classpath'></pullContainer>
                     </template>
           
        </swiper-slide>
    </swiper>
</template>
<script>
import pullContainer from '../components/pullContainer'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import apis from '../../../../../src/assets/js/api.js'
export default {
    components: {
        pullContainer
    },
    data () {
        return {
            swiperOption: {
                notNextTick: true,
                onSlideChangeStart: this.slideChangeCallBack,
                onSliderMove: this.slideMoveCallBack,
                onTouchEnd: this.touchEndCallBack,
                observer:   true,
                observeParents:true,
            },
            tmg_childTabList3:[],
            childTabActive3: "5d44323be4b0bd37b7bb6af2",
            active:0,
        }
    },
    computed: {
        ...mapGetters('tiemenguan_wenlv', [
            'indexActive',
            'activeIndex',
            'indexColumn'
        ])
    },
    watch: {
        indexActive() {
            this.slideTo()
        }
    },
    methods: {
        ...mapMutations('tiemenguan_wenlv', [
            'set_indexActive',
            'set_indexSwiper'
        ]),
     ...mapActions("tiemenguan_wenlv", [
      "lists_child_listItem_data",
       ]),
        slideTo() {
            this.$refs.wenlvSwiper.swiper.slideTo(this.activeIndex, 300, true) // 让swiper滚动到index位置
        },
        slideChangeCallBack (swiper) {
            let index = swiper.activeIndex
            this.set_indexActive(this.indexColumn[index].classpath) // 滚动完swiper需要改变vuex里面的indexActive，这是为了与栏目联动
        },
        // 移动的时候设为true，这是为了移动时，不能下拉，我在mint-ui的loadmore代码里自定义了一个属性用于监听左右滑动，然后禁止loadmore组件的触发
        slideMoveCallBack () {
            this.set_indexSwiper(true)
        },
        // 移动的时候设为true，这是为了移动时，不能下拉，我在mint-ui的loadmore代码里自定义了一个属性用于监听左右滑动，然后禁止loadmore组件的触发
        touchEndCallBack () {
            this.set_indexSwiper(false)
        },
        navClick(uuid){
           this.childTabActive3 = uuid;
    },
    touch(oEvent){
      oEvent.cancelBubble = true;
    },
    touchmove(oEvent){
      $('.zhuanti').css({ 'overflow-x':'auto' });
      oEvent.cancelBubble = true;
    },
    },
    mounted() {
        this.lists_child_listItem_data().then(res => {
           this.tmg_childTabList3 = res.data;
    });
    }
}
</script>
<style lang='stylus'>
.swiper-box.isIOS {
    // padding-top: 2.83rem;
        padding-top: 1.335rem;
}
.swiper-box {
    width: 100%;
    height: 100%;
    z-index: 0;
    background: #f2f2f2;
    padding-top: 2.295rem;
    padding-top: 79px
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
    -webkit-tap-highlight-color: rgba(0,0,0,0.1);
    text-decoration: none;
}
.listItem h3{
    white-space: normal;
    font-size: 17px;
    line-height: 42px;
    color: #222;
    font-weight: 400;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    overflow: hidden;
    padding: 0.427rem 0;
}

</style>
<style lang='less' scoped>
.mint-tabbar {
    z-index: 10;
    top: 0;
    bottom: auto;
    height: 50px;
}
.mint-tab-container {
    .mint-tab-container-item {
        height: calc(100vh - 180px);
    }
}
.swiper-box-news {
    width: 100%;
    height: 100%;
    z-index: 0;
    background: #fff !important;
    padding-top: 2.295rem;
    padding-top: 1.85rem !important;
}
</style>
<style lang="less" scoped>
        .mint-tabbar {
          z-index: 1111;
          top: 0;
          bottom: auto;
          height: 94px;
      
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
        //         
        //     }
        // }
        </style>
        
        