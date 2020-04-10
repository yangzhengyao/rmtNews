<template>
    <swiper :options="swiperOption" class="swiper-box" ref="wenlvSwiper" :class="{isIOS: $store.state.device == 'ios'}">
        <swiper-slide v-for='(item,index) in indexColumn' :key='index' class="swiper-slide-box">
            <pullContainer :type='item.classpath'></pullContainer>
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
        }
    },
    computed: {
        ...mapGetters('qinqiang', [
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
        ...mapMutations('qinqiang', [
            'set_indexActive',
            'set_indexSwiper'
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
    margin-top: 50px;
    .mint-tab-container-item {
        height: calc(100vh - 180px);
    }
}
.swiper-box{
    height: calc(100vh - 1rem);
}
</style>
