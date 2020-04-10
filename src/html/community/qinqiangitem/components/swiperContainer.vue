<template>
    <!-- <swiper :options="swiperOption" class="swiper-box" ref="mySwiper" :class="{isIOS: $store.state.device == 'ios'}"> -->
        <!-- <swiper-slide v-for='(item,index) in livesColumn' :key='index' class="swiper-slide-box"> -->
            <div class="swiper-box" :class="{isIOS: $store.state.device == 'ios'}">
                <pullContainer :type='type'></pullContainer> 
            </div>

        <!-- </swiper-slide> -->
    <!-- </swiper> -->
</template>
<script>
import pullContainer from '../components/pullContainer'
import { mapGetters, mapMutations } from 'vuex'
import { get_local_cache, set_local_cache } from '../../../../config/cache'
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
                onTouchEnd: this.touchEndCallBack
            },
            // livesColumn: [{
            //     classpath: '5c0fb33da310ccac1bde493d'
            // }]
            type: ''
        }
    },
    computed: {
        ...mapGetters('index', [
            'indexActive',
            'activeIndex',
            // 'indexColumn'
        ])
    },
    watch: {
        indexActive() {
            this.slideTo()
        }
    },
    methods: {
        ...mapMutations('index', [
            'set_indexActive',
            'set_indexSwiper'
        ]),
        slideTo() {
            // this.$refs.mySwiper.swiper.slideTo(this.activeIndex, 300, true) // 让swiper滚动到index位置
        },
        slideChangeCallBack (swiper) {
            let index = swiper.activeIndex
            // this.set_indexActive(this.indexColumn[index].classpath) // 滚动完swiper需要改变vuex里面的indexActive，这是为了与栏目联动
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
        this.type=JSON.parse(get_local_cache('./community/qinqiangitem.html')).uuid;
    }
}
</script>
<style lang='stylus' scoped>
.swiper-box.isIOS {
    padding-top: 1.335rem;
}
.swiper-box {
    width: 100%;
    height: calc(100vh - 94px);
    z-index: 0;
    background: #f2f2f2;
    padding-top: 44px;
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
