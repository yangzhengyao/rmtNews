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
        <mt-loadmore :top-method="loadTopAjax" @top-status-change="handleTopChange" ref="loadmore" :auto-fill='false' :distance='indexSwiper'>
            <!-- 下拉提示 -->
            <div slot="top" class="mint-loadmore-top">
                <span v-show="topStatus === 'pull'"><img class='pullLoading' src="~@/assets/img/loading.png"> 下拉刷新↓</span>
                <span v-show="topStatus === 'drop'"><img class='pullLoading' src="~@/assets/img/loading.png"> 释放更新↑</span>
                <span v-show="topStatus ==='loading'"><img class='pullLoading' src="~@/assets/img/loading.gif"> 加载中...</span>
            </div>
            <!-- banner组件 -->
            <my-banner :json="bannerJson" v-if='bannerJson.length > 0'></my-banner>
            <!-- 置顶组件 -->
            <list-item :itemJson="stickJson" v-if='stickJson.length > 0'></list-item>
            <!-- listItem --> 
            <!-- <list-item :itemJson="contentJson" v-if='contentJson.length > 0'></list-item> -->
            <news-list :itemJson="contentJson" v-if=' contentJson.length > 0 '></news-list>
            <!-- 底部提示 -->
            <div class="bottomLoad" v-if="contentJson.length > 0">
                <div class="loading" v-show='bottomLoading'>加载中...</div>
                <div class="noData" v-if='bottomNoData'>没有更多的内容了</div>
            </div>
        </mt-loadmore>
    </div>
</template>
<script>
import { formatDate, getDateDiff, get_local_cache } from '../../../../config/cache.js'
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
    props: ['type'],
    data () {
        return {
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
            name: '',
            userDataid:''
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
        }
    },
    methods: {
        ...mapMutations('index', [
            'set_currentContent',
            'set_indexPage',
            'set_indexLocation',
            'set_indexActive'
        ]),
        ...mapActions('index', [
            'get_listItem_cache',
            'get_listItem_data',
            'get_stick_data',
            'get_banner_data',
            'wechat_listItem_data',
            'more_listItem_data'
        ]),
        init () {
            this.name=JSON.parse(get_local_cache('leshanGrow')).uid;
            if ( !(this.contentJson.length > 0)) {
                this.classPage = this.activePage
                this.error = false
                this.loading = true
                // 获取banner数据
                // this.get_banner_data()
                // .then(res => {
                //     if (res) {
                //         this.bannerJson = res
                //     }
                // })
                // 获取置顶数据
                // this.get_stick_data()
                // .then(res => {
                //     if (res) {
                //         this.stickJson = res
                //     }
                // })
                
                this.loadTopAjax()
            }
            this.getDataid()
        },
        getDataid(){
          let userDataid = JSON.parse(localStorage.getItem("userData"));
          if( userDataid !== null){
            this.userDataid = userDataid.user_id;
          }else{
            this.userDataid = false;
          }
        },
        loadTopAjax () {
            var that=this;
            this.classPage=0
            // this.loading = true
            this.more_listItem_data({page: this.classPage, uuid: this.name,userId:this.userDataid})
             .then(res => {
                this.loading = false
                var tempArr=[];
                var bannerArr=[],numTemp=0;
                res.data[0].list.forEach(function (item,i) {
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
                        properties:item.properties,
                        columnName:item.columnName,
                        readUrl:item.url
                    })
                });
                res=tempArr;
                if( this.apis.getTheme() == 'dongpo' ){
                    for( let i = 0 ; i < res.length;i++ ){
                        if( res[i].hasOwnProperty('properties') && res[i].properties != undefined){
                            if( res[i].properties.hasOwnProperty('groupName') ){
                                res[i]['groupName'] = res[i].properties.groupName;
                            } 
                        }
                    }
                }
                // if(bannerArr.length>0) {
                //     this.bannerJson = bannerArr
                // }
                if (res && typeof res === 'object' && res.length > 0) {
                    // this.contentJson.unshift(...res)
                    this.contentJson = res
                    // if(this.indexActive == apis.theme.news.columnId.redian || this.indexActive == apis.theme.news.columnId.xiachengyaowen ) this.xinshidaiFlag.flag=true
                    if( this.indexActive == this.apis.theme.news.columnId.xiachengyaowen ) this.xuexiFlag.xuexi=true
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
                this.loading = false
                if (this.contentJson.length > 0) {
                    // $(`.container.${this.type} .requestFail`).show()
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
                
            })
        },
        loadBottomAjax () {
            var that=this;
            if (!this.bottomNoData) {
                this.bottomLock = true
                this.bottomLoading = true
                this.more_listItem_data({page: this.classPage, uuid: this.name,userId:this.userDataid})
                .then(res => {
                    var tempArr=[];
                    res.data[0].list.forEach(function (item,i) {
                        tempArr.push({
                            type: item.type,
                            id: item.id,
                            title: item.title,
                            befrom: item.source,
                            time: getDateDiff(item.pubDate),
                            titlepic: item.image_url, // 缩略图
                            href:item.url,
                            ptitlepic: i%5==0&&item.image_url!=''?item.image_url:false, // 大图
                            playonlineurl: item.stroyType=='VIDEO'?item.video_url:false, // 视频
                            lives: item.stroyType=='ZHIBO'?true:false, // 直播
                            jsonUrl: item.jsonUrl,
                            readNum: item.read_num,
                            columnName:item.columnName,
                            properties:item.properties,
                            readUrl:item.url
                        })
                    })
                    res=tempArr;
                    for( let i = 0 ; i < res.length;i++ ){
                        if( res[i].hasOwnProperty('properties') && res[i].properties != undefined){
                            if( res[i].properties.hasOwnProperty('groupName') ){
                                res[i]['groupName'] = res[i].properties.groupName;
                            } 
                        }
                    }
                    if (res && typeof res === 'object' && res.length > 0) {
                        this.contentJson.push(...res)
                        this.classPage++
                    } else {
                       
                        this.bottomNoData = true
                    }
                    this.bottomLoading = false
                    this.bottomLock = false
                })
                .catch(err =>{
                    console.log(err)
                })
            }
        },
        // 创建historyLook元素
        newLookHere() {
            if (this.dataCount >= 10) {
                let lookIndex = this.contentJson.findIndex((n) => n.type === 'lookHere')
                this.contentJson.splice(lookIndex, 1)   // 删除数据里面的look数据
                this.contentJson.splice(10, 0, {type: 'lookHere'})  // 始终在第11个位置里添加look数据
            }
            this.$nextTick(() => {
                $(`.${this.indexActive} #lookHere`).prev().css('border', 'none')    // 去除look元素的上一个元素的border边框
            })
        },
        // 点击look元素，发送请求
        // lookHereClick() {
        //     $(`.container.${this.type}`).on('click', '#lookHere', () => {
        //         $(`.container.${this.indexActive}`).animate({scrollTop: 0}, () => {
        //             this.loadTopAjax()
        //         })
        //     })
        // },
        // mint-ui 下拉组件的状态
        handleTopChange(status) {
            this.topStatus = status
        },
        // 处理滚动条位置的方法
        handleLocaltion(type) {
            if (this.indexActive === this.type) {
                if (type === 'get') {
                    this.$nextTick(() => {
                        $(`.container.${this.type}`).scrollTop(this.activeLocation)
                   })
                } else if (type === 'set') {
                    let scrollTop = $(`.container.${this.type}`).scrollTop()
                    if (scrollTop >= 0) {
                        this.indexLocation[this.indexActive] = scrollTop
                        this.set_indexLocation(this.indexLocation)
                    }
                }
            }
        }
    },
    mounted () {
        this.init()
        // this.lookHereClick()
    },
    activated () {
        this.handleLocaltion('get')
    },
    deactivated () {
        this.handleLocaltion('set')
    }
}
</script>
<style scoped lang='stylus' scoped>
.container {
    height: calc(100vh - 45px);
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
            height: 32px;
            line-height: 34px;
            font-size: 14px;
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
    .pullLoading{
        width: 24px;
        height: 24px;
        vertical-align: middle;
        margin-top: -4px;
        margin-right: 3px;
    }
    .mint-loadmore {
        min-height: 100%;
    }
    .listItem {
        padding-top: 0.2rem;
    }
    .bottomLoad{
        padding-bottom: 0.8rem;
    }
}


</style>
