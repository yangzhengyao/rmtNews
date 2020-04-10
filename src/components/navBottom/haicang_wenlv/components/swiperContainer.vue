<template>
    <swiper :options="swiperOption" class="swiper-box" ref="wenlvSwiper" :class="{isIOS: $store.state.device == 'ios'}">
        <swiper-slide v-for='(item,index) in indexColumn' :key='index' class="swiper-slide-box">
            <template v-if="item.classpath == apis.theme.hcChild.columnIdOrder[1]">
                <!-- 子级tab页 -->
                <div class="child-tab">
                    <mt-tabbar v-model="childTabActive">
                        <mt-tab-item v-for="(item,index) in childTabList" :key="index" :id="item.uuid" class="wenlv-child-tab">
                            {{item.name}}
                        </mt-tab-item>
                    </mt-tabbar>
                    <mt-tab-container v-model="childTabActive">
                        <mt-tab-container-item v-for="(item,index) in childTabList" :key="index" :id="item.uuid">
                            <pullContainer :type='item.uuid' :childTabActive="childTabActive"></pullContainer>
                        </mt-tab-container-item>
                    </mt-tab-container>
                </div>
            </template>
             <template v-else > 
                <pullContainer :type='item.classpath'></pullContainer>
            </template>
            <!-- <pullContainer :type='item.classpath'></pullContainer> -->
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
            childTabActive: apis.theme.hclv.columnIdChild[1],
            childTabList:[]
        }
    },
    computed: {
        ...mapGetters('hcWenlv', [
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
        ...mapMutations('hcWenlv', [
            'set_indexActive',
            'set_indexSwiper'
        ]),
        ...mapActions('hcWenlv', [
            'hcwenlv_child_listItem_data',
            'displayConfigs_listItem_data'
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
        }
    },
    mounted() {
        let that = this;
        this.hcwenlv_child_listItem_data()
        .then(res => {
            that.childTabList = res.data
        })
        // 
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
    background: #fff !important;
    padding-top: 2.295rem;
    padding-top: 1.85rem !important;
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
<style lang='less' scoped>
.mint-tabbar {
    z-index: 1111;
    top: 0;
    bottom: auto;
    height: 94px;
    background: #fff;
    .wenlv-child-tab {
        padding: 66px 0 0 0;
        &:nth-child(1) {
            background: ~"url('../images/wan2.png') no-repeat center 12px / 44px";
        }
        &:nth-child(2) {
            background: ~"url('../images/chi2.png') no-repeat center 12px / 44px";
        }
        &:nth-child(3) {
            background: ~"url('../images/zhu2.png') no-repeat center 12px / 44px";
        }
        &:nth-child(4) {
            background: ~"url('../images/gou2.png') no-repeat center 12px / 44px";
        }
        &.is-selected {
            &:nth-child(1) {
                background: ~"#f2f2f2 url('../images/wan2.png') no-repeat center 12px / 44px";
            }
            &:nth-child(2) {
                background: ~"#f2f2f2 url('../images/chi2.png') no-repeat center 12px / 44px";
            }
            &:nth-child(3) {
                background: ~"#f2f2f2 url('../images/zhu2.png') no-repeat center 12px / 44px";
            }
            &:nth-child(4) {
                background: ~"#f2f2f2 url('../images/gou2.png') no-repeat center 12px / 44px";
            }
        }
    }
}

.mint-tab-container {
    margin-top: 94px;
    .mint-tab-container-item {
        height: calc(100vh - 180px);
    }
}
.special {
    padding-top: 0.2rem;
    background: #f7f7f7;
    height: calc(100vh - 180px);
    -webkit-overflow-scrolling: touch;
    overflow-y: auto;
    .item {
      background: #fff;
      padding: 0.2rem 0.33rem;
      display: flex;
      flex-direction: column;
      margin-bottom: 0.2rem;
      span:nth-child(1) {
        text-align: right;
        font-size: 0.3rem !important;
        color: #999;
        margin-bottom: 0.34rem;
      }
      span:nth-child(2) {
        text-align: left;
        font-size: 0.33rem !important;
        color: #262626;
        margin-bottom: 0.2rem;
      }
      img {
        width: 100%;
        height: 3rem;
        margin-bottom: 0.2rem;
      }
      span:nth-child(4) {
        text-align: left;
        font-size: 0.3rem !important;
        color: #999;
      }
    }
}
</style>
<style lang='less' scoped>
.mint-tabbar {
    z-index: 10;
    top: 0;
    bottom: auto;
    // height: 50px;
}
</style>
