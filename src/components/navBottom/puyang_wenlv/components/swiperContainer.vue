<template>
    <swiper :options="swiperOption" class="swiper-box" ref="wenlvSwiper" :class="{isIOS: $store.state.device == 'ios'}">
        <swiper-slide v-for='(item,index) in indexColumn' :key='index' class="swiper-slide-box">
            <template v-if="item.classpath=='5d68c7f5e4b0e2963a40882d'">
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
            <!-- <template v-else-if="item.classpath=='wldsj'" >
                <div class="special">
                    <div class="item" v-for="(item,index) in list" :key="index" @click="apis.urlParams(item.newsUrl,{'title':item.title},true)">
                        <span>{{ item.time }}</span>
                        <span>{{ item.title }}</span>
                        <img :src="item.imgUrl" alt>
                        <span>{{ item.reed }}</span>
                    </div>
                </div>
            </template> -->
            <template v-else >
                <pullContainer :type='item.classpath'></pullContainer>
            </template>

        </swiper-slide>
    </swiper>
</template>
<script>
import pullContainer from '../components/pullContainer'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import apis from '../../../../../src/assets/js/api.js'
import { formatDate, getDateDiff, get_local_cache } from '../../../../config/cache.js'
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
            childTabActive: '5d68c811e4b0e2963a408833',
            childTabList: [],
            list1: [
                {
                    time: "一天前",
                    title: "青铜峡黄河大峡谷",
                    imgUrl: require("../images/special1.png"),
                    reed: "32阅读",
                    newsUrl: "http://wxservice.wengetech.com/wenhaiFt/display_al/mod3/shareAnalysisResult/oDJ50xM7BsyqrHgvuJJv__"
                },
                {
                    time: "一天前",
                    title: "青铜峡黄河楼",
                    imgUrl: require("../images/special2.jpg"),
                    reed: "34阅读",
                    newsUrl: "http://wxservice.wengetech.com/wenhaiFt/display_al/mod3/shareAnalysisResult/8m6o5IpBShlubAnZ0CIXz_"
                },
                {
                    time: "一天前",
                    title: "青铜峡环保进行时",
                    imgUrl: require("../images/special3.jpg"),
                    reed: "32阅读",
                    newsUrl: "http://wxservice.wengetech.com/wenhaiFt/display_al/mod3/shareAnalysisResult/tVAtrKYVu1x8fvuGwAcGj1"
                }
            ],
            list: []
        }
    },
    computed: {
        ...mapGetters('puyang_wenlv', [
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
        ...mapMutations('puyang_wenlv', [
            'set_indexActive',
            'set_indexSwiper'
        ]),
        ...mapActions('puyang_wenlv', [
            'wenlv_child_listItem_data',
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
        this.wenlv_child_listItem_data()
        .then(res => {
            
            this.childTabList = res.data
        })

        // this.displayConfigs_listItem_data()
        // .then(res => {
        //     var tempArr=[];
        //     res.data.forEach(function (item,i) {
        //         tempArr.push({
        //             time: getDateDiff(item.insert_time),
        //             title: item.name,
        //             imgUrl: 'https://wxservice.wengetech.com/wenhaiFt'+item.img_url,
        //             reed: item.read_count+'阅读',
        //             newsUrl: 'http://wxservice.wengetech.com/wenhaiFt/display_al/mod3/shareAnalysisResult/'+item.accesstoken
        //         });
        //     });
        //     this.list = tempArr
        // })
        // .catch(err => {
        //     this.list1 = this.list
        // })

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
        height calc( 100vh - 2rem )
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
</style>
// <style lang='stylus'>
// .swiper-box.isIOS {
//     // padding-top: 2.83rem;
//         padding-top: 1.335rem;
// }
// .swiper-box {
//     width: 100%;
//     height: 100%;
//     z-index: 0;
//     background: #f2f2f2;
//     padding-top: 2.295rem;
//     padding-top: 79px
//     .swiper-slide-box {
//         padding-top: 0rem;
//     }
// }
// .swiper-box-special .swiper-box {
//     padding: 0 !important;
// }
// .listItem a[data-v-43c7437e] {
//     display: block;
//     width: 100%;
//     padding: 0.427rem 0;
//     outline: none;
//     color: #131313;
//     -webkit-tap-highlight-color: rgba(0,0,0,0.1);
//     text-decoration: none;
// }
// .listItem h3{
//     white-space: normal;
//     font-size: 17px;
//     line-height: 42px;
//     color: #222;
//     font-weight: 400;
//     display: -webkit-box;
//     -webkit-line-clamp: 3;
//     text-overflow: ellipsis;
//     -webkit-box-orient: vertical;
//     overflow: hidden;
//     padding: 0.427rem 0;
// }
// .wenlv-child-tab .mint-tab-item-label {
//     font-size: 16px;
// }
// .child-tab {
//     .mint-tabbar > .mint-tab-item.is-selected {
//         color: #333;
//     }
//     .listItem >div:first-child {
//         margin-top: 10px;
//     }
// }
// </style>

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
    height: calc(100vh - 130px);
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

// <style lang='less' scoped>
// .mint-tabbar {
//     z-index: 10;
//     top: 0;
//     bottom: auto;
//     height: 50px;
// }
// .mint-tab-container {
//     margin-top: 50px;
//     .mint-tab-container-item {
//         height: calc(100vh - 180px);
//     }
// }
// </style>
