<template>
    <!-- 加载更多 -->
    <div class="container swiper-box-special" :class="type" v-infinite-scroll="loadBottomAjax" infinite-scroll-disabled="bottomLock" infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
        <!-- 请求提示 -->
        <my-loading :visible="loading"></my-loading>
        <my-error :visible='error' :method='init'></my-error>

        <!-- 顶部提示 -->
        <div class="globalTip">
            <!-- <div class="dataCount">已为你推荐{{dataCount}}条新内容</div> -->
            <div class="dataCount">已加载最新内容</div>
            <div class="noNewData">没有最新的内容了</div>
            <div class="requestFail">网络请求失败,请检查网络</div>
        </div>

        <!-- 下拉加载 -->
        <mt-loadmore :top-method="loadTopAjax" @translate-change="translateChange" @top-status-change="handleTopChange" ref="loadmore" :auto-fill='false' :distance='indexSwiper'>
            <!-- 下拉提示 -->
            <div slot="top" class="mint-loadmore-top">
                <span v-show="topStatus === 'pull'"><img class='pullLoading' src="~@/assets/img/loading.png"> 下拉刷新↓</span>
                <span v-show="topStatus === 'drop'"><img class='pullLoading' src="~@/assets/img/loading.png"> 释放更新↑</span>
                <span v-show="topStatus ==='loading'"><img class='pullLoading' src="~@/assets/img/loading.gif"> 加载中...</span>
            </div>
              <!-- 最上面的图片 -->
            <!-- <div class="Stick" style="background-image: url(&quot;http://124.204.66.253:9080/images/201811/26/5bfbc104a31091b7583886ef.jpeg&quot;);" v-show="boo">                 
                   
                    <div class="news">
                  
                     <h3>青铜峡市公安局刑侦大队....</h3>
                    <span class="news_from">县级融媒体中心网站</span>
                     <span class="news_time">1周前</span> 
                           </div>       
            </div> -->
            <!-- banner组件 -->
            <my-banner :json="bannerJson" v-if='bannerJson.length > 0 '></my-banner>
            <!-- 新闻导航轮播图 -->
            <!-- <news-banner v-if="  apis.getTheme() =='dongpo' && apis.theme.news.columnId.tuijian == indexActive "></news-banner> -->
            <!-- 新时代组件 -->
            <!-- <list-item :itemJson="xinshidaiFlag" v-if='xinshidaiFlag.flag'></list-item> -->
            <!-- 学习强国 -->
            <list-item :itemJson="xuexiFlag" v-if='xuexiFlag.xuexi'></list-item>
            <!-- 置顶组件 -->
            <list-item :itemJson="stickJson" v-if='stickJson.length > 0'></list-item>
            <!-- listItem --> 
            <!-- <list-item :itemJson="contentJson" v-if=' indexActive!="5cd1307d0cf2acaeba3f539a" && contentJson.length > 0 '></list-item> -->
            <news-list :itemJson="contentJson" v-if=' indexActive!="5cd1307d0cf2acaeba3f539a" && contentJson.length > 0 '></news-list>
            <!-- 海沧政务服务 -->
            <haicang-zw v-else-if="apis.getTheme() == 'haicang' && indexActive == '5cd1307d0cf2acaeba3f539a'"></haicang-zw>
            <!-- 底部提示 -->
            <div class="bottomLoad" v-if="contentJson.length > 0">
                <div class="loading" v-show='bottomLoading'>加载中...</div>
                <div class="noData" v-if='bottomNoData'>没有更多的内容了</div>
            </div>
        </mt-loadmore>
    </div>
</template>
<script>
import { formatDate, getDateDiff } from '../../../../config/cache.js'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import apis from '@/assets/js/api.js'
import { get_local_cache, set_local_cache } from '../../../../config/cache'
import Bus from '@/Bus';
export default {
    props: ['type','childTabActive'],
    data () {
        return {
            boo:false,
            classPage: 0,           // 当前栏目的翻页页数
            stickJson: [],          // 置顶数据
            bannerJson: [],         // banner数据
            contentJson: [],        // 整个列表数据
            dataCount: 0,           // 推荐文章数量
            topStatus: '',          // 下拉状态
            bottomLock: false,      // 上滑开关
            bottomLoading: false,    // 底部loading
            bottomNoData: false,    // 底部nothing
            loading: false,
            error: false,
            // xinshidaiFlag: {},
            xuexiFlag: {},
            tops:''
        }
    },
    computed: {
        ...mapGetters('index', [
          'indexActive',        // active的栏目
          'indexPage',          // 记录栏目page的对象
          'indexLocation',      // 记录栏目location的对象
          'activePage',         // active的page
          'activeLocation',     // active的location
          'indexSwiper'         // 是否正在swiper的boolean值
        ])
    },
  
    watch: {
        indexActive (val) {
            this.init()
        },
        classPage (val) {
            this.indexPage[this.indexActive] = val
            this.set_indexPage(this.indexPage)
        },
        contentJson (val) {
            this.set_currentContent(val)
        },
        childTabActive() {
            this.init()
        }
    },
    methods: {
        ...mapMutations('index', [
            'set_currentContent',
            'set_indexPage',
            'set_indexLocation'
        ]),
        ...mapActions('index', [
            // 'get_listItem_cache',
            'get_listItem_data',
            'get_child_listItem_data',
            'get_stick_data',
            'get_banner_data',
            'wechat_listItem_data',
        ]),
        init () {
          this.loadTopAjax()
        },
        loadTopAjax () {
            window.trackingClickSelf = false;
            var that=this;
            this.classPage=0
            var uuid=JSON.parse(get_local_cache('dongpoall')).uid;
             this.get_listItem_data({page: this.classPage, uuid: uuid})
                    .then(res => {
                        this.loading = false
                        var tempArr=[];
                        var bannerArr=[],numTemp=0;
                        res.list.forEach(function (item,i) {
                            tempArr.push({
                                type: item.type,
                                id: item.id,
                                title: item.title,
                                befrom: item.source,
                                time: getDateDiff(item.pubDate),
                                titlepic: item.image_url!=null?item.image_url.split(' ')[0]:false, // 缩略图
                                ptitlepic: i%5==0&&item.image_url!=null?item.image_url.split(' ')[0]:false, // 大图
                                playonlineurl: item.stroyType=='VIDEO'?item.video_url:false, // 视频
                                lives: item.stroyType=='ZHIBO' || item.stroyType == 'LIVE'?item.video_url:false, // 直播
                                href: item.stroyType=='HREF'?item.url:false, // 
                                jsonUrl: item.jsonUrl,
                                readNum: item.read_num,
                                properties:item.properties
                            })
                        });
                        res=tempArr;
                        // if(bannerArr.length>0) {
                        //     this.bannerJson = bannerArr
                        // }
                        if (res && typeof res === 'object' && res.length > 0) {
                            // this.contentJson.unshift(...res)
                            this.contentJson = res
                            // if(this.indexActive == apis.theme.news.columnId.redian || this.indexActive == apis.theme.news.columnId.xiachengyaowen ) this.xinshidaiFlag.flag=true
                            if( this.indexActive == apis.theme.news.columnId.xiachengyaowen ) this.xuexiFlag.xuexi=true
                            this.dataCount = res.length
                            this.bottomLock = false;
                            this.bottomNoData = false;
                            this.classPage++
                            $(`.container.${this.type} .dataCount`).stop().slideDown(200).delay(1000).slideUp(200)
                            this.newLookHere()
                        } else {
                            $(`.container.${this.type} .noNewData`).stop().slideDown(200).delay(1000).slideUp(200)
                        }
                        this.$refs.loadmore.onTopLoaded()
                        this.error = false
                        $(`.container.${this.type} .requestFail`).hide()
                        // setTimeout(function(){
                        //     document.getElementsByClassName(that.type)[0].scrollTop = 0
                        // },50)
                    })
                    .catch(err => {
                        if (this.contentJson.length > 0) {
                            $(`.container.${this.type} .requestFail`).show()
                        } else {
                            // this.get_listItem_cache()
                            // .then(cache => {
                            //     if (cache) {
                            //         this.contentJson = cache
                            //     } else {
                            //        this.error = true
                            //     }
                            // })
                        }
                        this.loading = false
                    })
        
        },
        loadBottomAjax () {
            var that=this;
            if (!this.bottomNoData) {
                this.bottomLock = true
                this.bottomLoading = true;
                 var uuid=JSON.parse(get_local_cache('dongpoall')).uid;
                 this.get_listItem_data({page: this.classPage, uuid: uuid})
                        .then(res => {
                            var tempArr=[];
                            res.list.forEach(function (item,i) {
                                tempArr.push({
                                    type: item.type,
                                    id: item.id,
                                    title: item.title,
                                    befrom: item.source,
                                    time: getDateDiff(item.pubDate),
                                    titlepic: item.image_url!=null?item.image_url.split(' ')[0]:false, // 缩略图
                                    ptitlepic: i%5==0&&item.image_url!=null?item.image_url.split(' ')[0]:false, // 大图
                                    playonlineurl: item.stroyType=='VIDEO'?item.video_url:false, // 视频
                                    lives: item.stroyType=='ZHIBO' || item.stroyType == 'LIVE' ?item.video_url:false, // 直播
                                    href: item.stroyType=='HREF'?item.url:false, // 
                                    jsonUrl: item.jsonUrl,
                                    readNum: item.read_num,
                                    properties:item.properties
                                })
                            });
                            res=tempArr;
                            if (res && typeof res === 'object' && res.length > 0) {
                                this.contentJson.push(...res)
                                this.classPage++
                            } else {
                                
                                this.bottomNoData = true
                            }
                            this.bottomLoading = false
                            this.bottomLock = false
                        })
            }
        },
        // 创建historyLook元素
        newLookHere() {
            // if (this.dataCount >= 10) {
            //     let lookIndex = this.contentJson.findIndex((n) => n.type === 'lookHere')
            //     this.contentJson.splice(lookIndex, 1)   // 删除数据里面的look数据
            //     this.contentJson.splice(10, 0, {type: 'lookHere'})  // 始终在第11个位置里添加look数据
            // }
            // this.$nextTick(() => {
            //     $(`.${this.indexActive} #lookHere`).prev().css('border', 'none')    // 去除look元素的上一个元素的border边框
            // })
        },
        // 点击look元素，发送请求
        lookHereClick() {
            $(`.container.${this.type}`).on('click', '#lookHere', () => {
                $(`.container.${this.indexActive}`).animate({scrollTop: 0}, () => {
                    this.loadTopAjax()
                })
            })
        },
        // mint-ui 下拉组件的状态
        handleTopChange(status) {
            this.topStatus = status
        },
        translateChange(translate){
            let that = this;
            // if(translate < 1){
            //     setTimeout(function(){
            //         document.getElementsByClassName(that.type)[0].scrollTop = 1
            //     },50)
            // }
        },
        // 处理滚动条位置的方法
        handleLocaltion(type) {
            if (this.indexActive === this.type) {
                if (type === 'get') {
                    this.$nextTick(() => {
                        $(`.container.${this.type}`).scrollTop(this.activeLocation)
                   })
                } else if (type === 'set') {
                    let scrollTop = this.tops
                    if (scrollTop >= 0) {
                        this.indexLocation[this.indexActive] = scrollTop
                        this.set_indexLocation(this.indexLocation)
                    }
                }
            }
        }
    },
    mounted () {
        Bus.$on('changedTops',(val) =>{
            this.tops = val;
        });
        this.init()
        this.lookHereClick()
        //  来显示默认大图
        if(this.type=='5bee2294a3100d8dc42eec55'){
            this.boo=true;
        }
    },
    activated () {
        this.handleLocaltion('get')
    },
    deactivated () {
        this.handleLocaltion('set')
    }
}
</script>
<style scoped lang='stylus'>
.Stick {
    // background: url('http://124.204.66.253:9080/images/201811/23/5bf7c08ba31091b758388611.jpeg') no-repeat center center;
    font-size: 16px;
    -webkit-box-shadow: 1px 1px 6px 0px #c1c1c1;
    box-shadow: 1px 1px 6px 0px #c1c1c1;
    margin: 1px 10.3px 0.2px;
    border-bottom: 1px solid rgba(222,222,222,0.6);
    padding-top: 20px;
    display: inline-block;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    width: 7.18rem !important;
    height: 5.3rem !important;
  .news{
    //   position:relative;
    //   top:236px;
    //   color:#ffff;
      position: relative;
    top: 193px;
    color: #212020;
    left: 21px;
      span{
        font-size:14px;
      }
      
  }
 width: 6.49rem;
    height: 6.49rem;
}
.container {
    height: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    position: relative;
    overflow:scroll;
    .globalTip{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        z-index: 999;
        div{
            height: 0.64rem;
            line-height: 0.64rem;
            font-size: 0.28rem;
            // color: #2a90d7;
            // background: rgba(213, 233, 247, .9);
            text-align: center;
            display: none;
            // &.requestFail {
                color: #f56767;
                background: #FBE9EF;
            // }
        }
    }
    .mint-loadmore-top {
        height: 50px;
        line-height: 50px;
        font-size: 14px;
    }
    .mint-loadmore {
        min-height: 100%;
    }
    .pullLoading{
        width: 24px;
        height: 24px;
        vertical-align: middle;
        margin-top: -4px;
        margin-right: 3px;
    }
}
.bottomLoad {
    background: transparent;
    padding-bottom: 50px;
}

</style>
