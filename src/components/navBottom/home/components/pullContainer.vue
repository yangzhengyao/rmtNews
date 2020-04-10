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
            <my-banner :json="bannerJson" v-if='bannerJson.length > 0 && apis.theme.news.columnId.tuijian == indexActive'></my-banner>
            <!-- 乐山新闻导航轮播图 -->
            <news-banner v-if=" apis.getTheme() =='mile' && apis.theme.news.columnId.xijinpingshijian == indexActive || apis.getTheme() =='baisha' && apis.theme.news.columnId.tuijian == indexActive || apis.getTheme() =='dongpo' && apis.theme.news.columnId.tuijian == indexActive || apis.getTheme() =='wanning' && apis.theme.news.columnId.tuijian == indexActive ||  apis.getTheme() =='leshan' && apis.theme.news.columnId.tuijian == indexActive || apis.getTheme() =='puyang' && apis.theme.news.columnId.tuijian == indexActive||apis.getTheme() =='redflag' && apis.theme.news.columnId.tuijian == indexActive "></news-banner>
            
            <!-- 新时代组件 -->
            <!-- <list-item :itemJson="xinshidaiFlag" v-if='xinshidaiFlag.flag'></list-item> -->
            <!-- 学习强国 -->
            <list-item :itemJson="xuexiFlag" v-if='xuexiFlag.xuexi'></list-item>
            <!-- 置顶组件 -->
            <list-item :itemJson="stickJson" v-if='stickJson.length > 0'></list-item>
            <!-- listItem --> 
            <!-- <list-item :itemJson="contentJson" v-if=' indexActive!="5cd1307d0cf2acaeba3f539a" && contentJson.length > 0 '></list-item> -->
            <news-list :itemJson="contentJson" v-if='indexActive!="5cd1307d0cf2acaeba3f539a" && contentJson.length > 0 '></news-list>
            <!-- 拍客 -->
            <news-shoot v-if="indexActive == '5d68ce51e4b0e2963a408841'"></news-shoot>
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
import haicangZw from './../../../commonList';//海沧政务栏目图标
import newsBanner from './../../../newsBanner';
import newsShoot from './../../../newsShoot';
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
            tops:'',
            pageNum:1,
            userDataid:'',
            stateList:[]
        }
    },
    computed: {
        ...mapGetters('index', [
          'indexActive',        // active的栏目
          'indexPage',          // 记录栏目page的对象
          'indexLocation',      // 记录栏目location的对象
          'activePage',         // active的page
          'activeLocation',     // active的location
          'indexSwiper',         // 是否正在swiper的boolean值
        ])
    },
    components:{
        haicangZw,
        newsBanner,
        newsShoot
    },
    watch: {
        indexActive (val) {
            if(apis.getTheme() == 'naidong'){
                this.contentJson = [];
            }
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
        },
       childTabActivesheng() {
            this.init()
        }
    },
    methods: {
        ...mapMutations('index', [
            'set_currentContent',
            'set_currentContent_zang',
            'set_indexPage',
            'set_indexLocation',
            'set_isNaidong',
        ]),
        ...mapActions('index', [
            // 'get_listItem_cache',
            'get_listItem_data',
            'get_child_listItem_data',
            'get_stick_data',
            'get_banner_data',
            'wechat_listItem_data',
            'get_tuijian_listItem_data',
            'wenhai_listItem_data'
        ]),
        init () {
            // if (this.indexActive === this.type && !(this.contentJson.length > 0)) {
            if ( (this.indexActive === this.type && !(this.contentJson.length > 0)) || ((this.indexActive == '5daffbe8e4b00d124a7c024a' || this.indexActive == '5d5b7bc7e4b07bac64e0d148' || this.indexActive == '5db0323be4b00d124a7c02ef' || this.indexActive == '5db0323be4b00d124a7c02ef' || this.indexActive == '5db002d6e4b00d124a7c0280' || this.indexActive == '5db00270e4b00d124a7c026d' || this.indexActive == '5da5ad29e4b0f0e6b01f39d5' || this.indexActive == '5daffc1be4b00d124a7c0252' || this.indexActive == '5daffbaee4b00d124a7c0240' || this.indexActive == '5da5aba7e4b0f0e6b01f39c4' || this.indexActive == '5dabd931e4b0e4f27ae7c607' || this.indexActive == '5d8c79d4e4b09940a1515bbc' || this.indexActive == '5dabd93ae4b0e4f27ae7c609' || this.indexActive == '5dabd91ee4b0e4f27ae7c603' || this.indexActive == '5da5acece4b0f0e6b01f39cd' || this.indexActive == '5d8c53e3e4b09940a1515b44' || this.indexActive == '5d8c53e3e4b09940a1515b43' || this.indexActive == '5d8c53e3e4b09940a1515b43' || this.indexActive == '5d8c53b5e4b09940a1515b42' || this.indexActive == '5d8c53a9e4b09940a1515b41' || this.indexActive == '5d8c5394e4b09940a1515b40' || this.indexActive == '5d8c5380e4b09940a1515b3f' || this.indexActive == '5d8c79e8e4b09940a1515bc0' || this.indexActive=='5d8c79cae4b09940a1515bb9' || this.indexActive == '5d8c79b3e4b09940a1515bb5' ||  this.indexActive === '5cc550cc0cf2c3d1b7e9d4be' || this.indexActive === '5ce9f0190cf23213ac8df4ec' || this.indexActive === '5ccea1cfa31099b0d557b266' || this.indexActive === '5d68ce2ce4b0e2963a40883d' || this.indexActive === '5d6e348be4b0e2963a408a8d' && this.childTabActive == this.type  && !(this.contentJson.length > 0))) ) {
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
                // 判断当前栏目值是否是置顶
                if(this.indexActive == apis.theme.news.columnId.tuijian){
                    // this.get_stick_data()
                    //方法多用，所以提了出去
                    this.getNewsBanner(1);
                    
                } else {
                    this.loadTopAjax()
                }
            }
        },
        getNewsBanner(num){ //num用来判断是否再调一次loadTopAjax
            let datas;
            if(this.userDataid){
                datas = {userId:this.userDataid}
            }else{
                datas = {userId:''}
            }
            this.get_stick_data(datas)
            .then(res => {
                var tempArr=[];
                var bannerArr=[],numTemp=0;
                res.list.forEach(function (item,i) {
                    // if(item.image_url!=null){
                    //     bannerArr.push({
                    //         type: item.type,
                    //         id: item.id,
                    //         title: item.title,
                    //         befrom: item.source,
                    //         time: getDateDiff(item.pubDate),
                    //         ptitlepic: item.image_url!=null?item.image_url.split(' ')[0]:false,
                    //         jsonUrl: item.jsonUrl,
                    //         readNum: item.read_num,
                    //         properties:item.properties
                    //     })
                    // }
                    if(bannerArr.length<5 && item.image_url!=null){
                        bannerArr.push({
                            // type: item.type,
                            // id: item.id,
                            // title: item.title,
                            // befrom: item.source,
                            // time: getDateDiff(item.pubDate),
                            // ptitlepic: item.image_url!=null?item.image_url.split(' ')[0]:false,
                            // jsonUrl: item.jsonUrl,
                            // readNum: item.read_num,
                            // properties:item.properties
                            type: item.type,
                            id: item.id,
                            title: item.title,
                            befrom: item.source,
                            time: getDateDiff(item.pubDate),
                            titlepic: item.image_url!=null?item.image_url.split(' ')[0]:false, // 缩略图
                            // ptitlepic: i%5==0&&item.image_url!=null?item.image_url.split(' ')[0]:false, // 大图
                            ptitlepic: item.image_url!=null?item.image_url.split(' ')[0]:false,
                            playonlineurl: item.stroyType=='VIDEO'?item.video_url:false, // 视频
                            lives: item.stroyType=='ZHIBO' || item.stroyType == 'LIVE' ?item.video_url:false, // 直播
                            href: item.stroyType=='HREF'?item.url:false, // 
                            jsonUrl: item.jsonUrl,
                            readNum: item.read_num,
                            properties:item.properties,
                            columnName:item.columnName,
                            readUrl:item.url,
                            summary:item.hasOwnProperty('summary')?item.summary:false,
                        })
                    }
                });
                // res=tempArr;
                // this.stickJson = res
                this.bannerJson = bannerArr;
                //num为1是初始化时期，需要触发一下loadTopAjax方法
                if(num === 1){  
                    this.loadTopAjax();
                }
            })
        },
        loadTopAjax () {
            window.trackingClickSelf = false;
            var that=this;
            this.classPage=0
            var uuid=(this.indexActive == '5daffbe8e4b00d124a7c024a' || this.indexActive == '5d5b7bc7e4b07bac64e0d148' || this.indexActive == '5db0323be4b00d124a7c02ef' || this.indexActive == '5db002d6e4b00d124a7c0280' || this.indexActive == '5db00270e4b00d124a7c026d' || this.indexActive == '5da5ad29e4b0f0e6b01f39d5' || this.indexActive == '5daffc1be4b00d124a7c0252' || this.indexActive == '5daffbaee4b00d124a7c0240' || this.indexActive == '5da5aba7e4b0f0e6b01f39c4' || this.indexActive == '5dabd931e4b0e4f27ae7c607' || this.indexActive == '5d8c79d4e4b09940a1515bbc' || this.indexActive == '5dabd93ae4b0e4f27ae7c609' || this.indexActive == '5dabd91ee4b0e4f27ae7c603' || this.indexActive == '5da5acece4b0f0e6b01f39cd' || this.indexActive == '5d8c53e3e4b09940a1515b44' || this.indexActive == '5d8c53e3e4b09940a1515b43' || this.indexActive == '5d8c53e3e4b09940a1515b43' || this.indexActive == '5d8c53b5e4b09940a1515b42' || this.indexActive == '5d8c53a9e4b09940a1515b41' || this.indexActive == '5d8c5394e4b09940a1515b40' || this.indexActive == '5d8c5380e4b09940a1515b3f' || this.indexActive == '5d8c79e8e4b09940a1515bc0' || this.indexActive=='5d8c79cae4b09940a1515bb9' || this.indexActive == '5d8c79b3e4b09940a1515bb5' ||  this.indexActive === '5cc550cc0cf2c3d1b7e9d4be'|| this.indexActive === '5ce9f0190cf23213ac8df4ec'  || this.indexActive === '5d68ce2ce4b0e2963a40883d' || this.indexActive === '5d6e348be4b0e2963a408a8d' || this.indexActive==apis.theme.news.columnId.chuangcheng)?this.type:null
            // this.loading = true
            //不需要再调一次loadTopAjax，则num为0；
            if(this.indexActive == apis.theme.news.columnId.tuijian){
                this.getNewsBanner(0);
            }
            //海沧今日海沧和海沧发布对接闻海数据
            if( this.indexActive == '5cefa709e4b0b2cdcbcf49d2' || this.indexActive == '5d5fafe8e4b0feeb914c5125' || this.indexActive == '5d5fafe8e4b0feeb914c5127' ){
                let haicangObj = { name:'海沧发布',type:'9' };
                if( this.indexActive == '5d5fafe8e4b0feeb914c5125' ){
                    haicangObj = { name:'新福建',type:'4' } //4是网站源信息
                }
                if( this.indexActive == '5d5fafe8e4b0feeb914c5127' ){
                    haicangObj = { name:'厦门新闻网',type:'4' } //4是网站源信息
                }
                this.wechat_listItem_data({page: this.classPage, name: haicangObj.name,type:haicangObj.type})
                .then(res => {
                    this.loading = false
                    var tempArr=[];
                    var bannerArr=[],numTemp=0;
                    res.data.forEach(function (item,i) {
                        // if( that.indexActive == '5cede9360cf2bd5d317cf425' ){
                        //     item.picture = 'http://wxservice.wengetech.com/wenhaiFt/picture/picTrans?picUrl='+item.picture
                        // }
                        tempArr.push({
                            id: item.id,
                            title: item.title,
                            befrom: item.author,
                            time: getDateDiff(item.pubtime),
                            outUrl: item.sourceUrl,
                            link: item.sourceUrl,
                            langTime: item.updated,
                            content: item.content,
                            ptitlepic: (i%5==0&&item.picture)?item.picture:false,
                            // titlepic: item.pictures.length>1?item.pictures[Math.floor(item.pictures.length/2)]:false,
                            titlepic: item.picture?item.picture:false,
                            readNum: -1,
                            weixin: true,
                        })
                    })
                    res=tempArr;
                    if(bannerArr.length>0) {
                        this.bannerJson = bannerArr
                    }
                    if (res && typeof res === 'object' && res.length > 0) {
                        // this.contentJson.unshift(...res)
                        this.contentJson = res
                        this.dataCount = res.length
                        this.classPage++
                        this.bottomLoading = false
                        $(`.container.${this.type} .dataCount`).slideDown(200).delay(1000).slideUp(200)
                        this.newLookHere()
                    } else {
                        $(`.container.${this.type} .noNewData`).slideDown(200).delay(1000).slideUp(200)
                    }
                    this.$refs.loadmore.onTopLoaded()
                    this.error = false
                })
                .catch(err => {
                    $(`.container.${this.type} .requestFail`).show()
                    this.loading = false
                })
                // 红旗闻海指定接口
            } else if( this.indexActive === '5da6bfb0e4b007d3b7559216' || this.indexActive === '5c7e3f410cf28d7f9fb8f004' || this.indexActive === '5c7e3f4e0cf28d7f9fb8f005' ){
                this.wenhai_listItem_data( {page: this.classPage,columnId:this.indexActive} )
                .then(res => {
                        this.loading = false
                        var tempArr=[];
                        var bannerArr=[],numTemp=0;
                        res.data[0].list.forEach(function (item,i) {
                            {
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
                                    readUrl:item.url,
                                    summary:item.hasOwnProperty('summary')?item.summary:false,
                                    // imageUrlList:item.images != "[]" && JSON.parse( item.images ).length > 2 ? JSON.parse( item.images ): false
                                })
                            }
                        });
                        res=tempArr;
                        for( let i = 0 ; i < res.length;i++ ){
                            if( res[i].hasOwnProperty('properties') && res[i].properties != undefined){
                                //订阅号
                                if( res[i].properties.hasOwnProperty('individualUserName') ){
                                    res[i]['individualUserName'] = res[i].properties.individualUserName;
                                } 
                            }
                        }
                        if (res && typeof res === 'object' && res.length > 0) {
                            if(this.indexActive !== '5d68ce51e4b0e2963a408841'){
                                this.contentJson = res
                            }
                            this.dataCount = res.length
                            this.classPage++
                            $(`.container.${this.type} .dataCount`).stop().slideDown(200).delay(1000).slideUp(200)
                            this.newLookHere()
                        } else {
                            $(`.container.${this.type} .noNewData`).stop().slideDown(200).delay(1000).slideUp(200)
                        }
                        this.$refs.loadmore.onTopLoaded()
                        this.error = false
                        $(`.container.${this.type} .requestFail`).hide()
                    })
            }
             else if(this.indexActive === '5d68ce51e4b0e2963a408841') {
                if (!this.isLoadAll) {
                    // this.$refs.loadmore.onBottomLoaded(); //通知loadmore组件从新渲染，计算
                    // this.currentPage++;
                    if(this.userDataid){
                        var postData = {
                            "pageNum":1,
                            "pageSize":10,
                            "app_info_id":this.apis.theme.api.appInfoId,
                            // "app_info_id":18,
                            "loginUserId":this.userDataid
                        }
                    }else{
                        var postData = {
                            "pageNum":1,
                            "pageSize":10,
                            "app_info_id":this.apis.theme.api.appInfoId,
                            // "app_info_id":18,
                        }
                    }
                        this.axios({
                            method: "post",
                            url: this.apis.theme.api.community.getStateList,
                            data: postData
                        })
                        .then(res => {
                        
                        if( res.data.status == 1 ){
                        $(`.container.${this.type} .dataCount`).slideDown(200).delay(1000).slideUp(200)
                        if (res.data.data.blog.length > 0 ) {
                            this.contentJson = res.data.data.blog  
                            this.stateList = res.data.data.blog;
                            Bus.$emit('stateListShoot',this.stateList);
                        } else {
                            this.bottomNoData = true
                        }
                            Bus.$emit('pageNumDy',{num:2,arr:this.stateList});
                            this.bottomLoading = false
                            this.bottomLock = false
                            this.$refs.loadmore.onTopLoaded();
                        }
                        })
                     
                    //网络请求加载数据  省略
                } else {
                console.log("已加载全部");
                }
                this.$refs.loadmore.onTopLoaded();
                this.loading = false
            }
             else {
                // 判断是否是推荐栏目 查询采编所有的稿件
                if(  this.apis.getTheme() =='jiangxian' && this.indexActive == apis.theme.news.columnId.tuijian ){
                 this.get_tuijian_listItem_data({page: this.classPage})
                 .then(res => {
                        this.loading = false
                        var tempArr=[];
                        var bannerArr=[],numTemp=0;
                        res.list.forEach(function (item,i) {
                            if( item.isTop != null && item.isTop > 0 ){
                                tempArr.unshift({
                                    type: item.type,
                                    id: item.id,
                                    title: item.title,
                                    befrom: item.source,
                                    time: getDateDiff(item.pubDate),
                                    titlepic: item.image_url!=null?item.image_url.split(' ')[0]:false, // 缩略图
                                    ptitlepic: false, // 大图
                                    playonlineurl: false, // 视频
                                    lives: false, // 直播
                                    href: item.stroyType=='HREF'?item.url:false, // 
                                    jsonUrl: item.jsonUrl,
                                    readNum: item.read_num,
                                    properties:item.properties,
                                    columnName:item.columnName,
                                    readUrl:item.url,
                                    summary:item.hasOwnProperty('summary')?item.summary:false,
                                    isTop:true,
                                    // imageUrlList:item.images != "[]" && JSON.parse( item.images ).length > 2 ? JSON.parse( item.images ): false
                                })
                            } else{
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
                                    readUrl:item.url,
                                    summary:item.hasOwnProperty('summary')?item.summary:false,
                                    // imageUrlList:item.images != "[]" && JSON.parse( item.images ).length > 2 ? JSON.parse( item.images ): false
                                })
                            }
                               //兼容新华社没有images字段
                            if( item.hasOwnProperty('images') ){
                                  var newsimgs=item.images != "[]" && JSON.parse( item.images ).length > 2 ? JSON.parse( item.images ): false;
                                if(newsimgs!=false){
                                  newsimgs.forEach(function(item){
                                    item.src = item.url;
                                    delete item.url;
                                 })
                                 tempArr[i]['imageUrlList'] = newsimgs
                                }
                            }
                        });
                        res=tempArr;
                        if( this.apis.getTheme() == 'dongpo' ){
                            for( let i = 0 ; i < res.length;i++ ){
                                if( res[i].hasOwnProperty('properties') && res[i].properties != undefined){
                                    //订阅组织
                                    if( res[i].properties.hasOwnProperty('groupName') ){
                                        res[i]['groupName'] = res[i].properties.groupName;
                                    } 
                                }
                            }
                        }
                        for( let i = 0 ; i < res.length;i++ ){
                            if( res[i].hasOwnProperty('properties') && res[i].properties != undefined){
                                //订阅号
                                if( res[i].properties.hasOwnProperty('individualUserName') ){
                                    res[i]['individualUserName'] = res[i].properties.individualUserName;
                                } 
                            }
                        }
                        // if(bannerArr.length>0) {
                        //     this.bannerJson = bannerArr
                        // }
                        if (res && typeof res === 'object' && res.length > 0) {
                            // this.contentJson.unshift(...res)
                            // if(this.indexActive !== '5d68ce51e4b0e2963a408841'){ //拍客先注释掉
                                this.contentJson = res
                            // }
                            // if(this.indexActive == apis.theme.news.columnId.redian || this.indexActive == apis.theme.news.columnId.xiachengyaowen ) this.xinshidaiFlag.flag=true
                            // if( this.indexActive == apis.theme.news.columnId.xiachengyaowen ) this.xuexiFlag.xuexi=true
                            this.dataCount = res.length
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
                        this.loading = false;
                        this.error = true;
                        this.$refs.loadmore.onTopLoaded()
                    })
                } else {
                    let datas;
                    if(this.userDataid){
                        datas = {page: this.classPage, uuid: uuid,userId:this.userDataid}
                    }else{
                        datas = {page: this.classPage, uuid: uuid,userId:''}
                    }
                    this.get_listItem_data(datas)
                    .then(res => {
                        this.loading = false
                        var tempArr=[];
                        var bannerArr=[],numTemp=0;
                        res.list.forEach(function (item,i,arr) {
                            if( item.isTop != null && item.isTop > 0 ){
                                tempArr.unshift({
                                    type: item.type,
                                    id: item.id,
                                    title: item.title,
                                    befrom: item.source,
                                    time: getDateDiff(item.pubDate),
                                    titlepic: item.image_url!=null?item.image_url.split(' ')[0]:false, // 缩略图
                                    ptitlepic: false, // 大图
                                    playonlineurl: false, // 视频
                                    lives: false, // 直播
                                    href: item.stroyType=='HREF'?item.url:false, // 
                                    jsonUrl: item.jsonUrl,
                                    readNum: item.read_num,
                                    properties:item.properties,
                                    columnName:item.columnName,
                                    readUrl:item.url,
                                    summary:item.hasOwnProperty('summary')?item.summary:false,
                                    isTop:true,
                                    // imageUrlList:item.images != "[]" && JSON.parse( item.images ).length > 2 ? JSON.parse( item.images ): false
                                })
                            } else {
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
                                    readUrl:item.url,
                                    summary:item.hasOwnProperty('summary')?item.summary:false,
                                    isTop:item.columnIsTop != null && item.columnIsTop > 0?true:false
                                    // imageUrlList:item.images != "[]" && JSON.parse( item.images ).length > 2 ? JSON.parse( item.images ): false
                                })
                            }
                            //兼容新华社没有images字段
                            if( item.hasOwnProperty('images') ){
                                  var newsimgs=item.images != "[]" && JSON.parse( item.images ).length > 2 ? JSON.parse( item.images ): false;
                                if(newsimgs!=false){
                                  newsimgs.forEach(function(item){
                                    item.src = item.url;
                                    delete item.url;
                                 })
                                 tempArr[i]['imageUrlList'] = newsimgs
                                }
                            }
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
                        for( let i = 0 ; i < res.length;i++ ){
                            if( res[i].hasOwnProperty('properties') && res[i].properties != undefined){
                                //订阅号
                                if( res[i].properties.hasOwnProperty('individualUserName') ){
                                    res[i]['individualUserName'] = res[i].properties.individualUserName;
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
                }
                
            }
        },
        getDataid(){
            let userDataid = JSON.parse(localStorage.getItem("userData"));
			if( userDataid !== null){
				this.userDataid = userDataid.user_id;
			}else{
				this.userDataid = false;
			}
        },
        loadBottomAjax () {
            var that=this;
            if (!this.bottomNoData) {
                this.bottomLock = true
                this.bottomLoading = true;
                var uuid=(this.indexActive == '5daffbe8e4b00d124a7c024a' || this.indexActive == '5d5b7bc7e4b07bac64e0d148' || this.indexActive == '5db0323be4b00d124a7c02ef' || this.indexActive == '5db002d6e4b00d124a7c0280' || this.indexActive == '5db00270e4b00d124a7c026d' || this.indexActive == '5da5ad29e4b0f0e6b01f39d5' || this.indexActive == '5daffc1be4b00d124a7c0252' || this.indexActive == '5daffbaee4b00d124a7c0240' || this.indexActive == '5da5aba7e4b0f0e6b01f39c4' || this.indexActive == '5dabd931e4b0e4f27ae7c607' || this.indexActive == '5d8c79d4e4b09940a1515bbc' || this.indexActive == '5dabd93ae4b0e4f27ae7c609' || this.indexActive == '5dabd91ee4b0e4f27ae7c603' || this.indexActive == '5da5acece4b0f0e6b01f39cd' || this.indexActive == '5d8c53e3e4b09940a1515b44' || this.indexActive == '5d8c53e3e4b09940a1515b43' || this.indexActive == '5d8c53e3e4b09940a1515b43' || this.indexActive == '5d8c53b5e4b09940a1515b42' || this.indexActive == '5d8c53a9e4b09940a1515b41' || this.indexActive == '5d8c5394e4b09940a1515b40' || this.indexActive == '5d8c5380e4b09940a1515b3f' || this.indexActive == '5d8c79e8e4b09940a1515bc0' || this.indexActive=='5d8c79cae4b09940a1515bb9' || this.indexActive == '5d8c79b3e4b09940a1515bb5' || this.indexActive === '5cc550cc0cf2c3d1b7e9d4be' || this.indexActive === '5ce9f0190cf23213ac8df4ec' || this.indexActive === '5d68ce2ce4b0e2963a40883d' || this.indexActive === '5d6e348be4b0e2963a408a8d'|| this.indexActive==apis.theme.news.columnId.chuangcheng)?this.type:null
                //海沧今日海沧和海沧发布对接闻海数据
                if( this.indexActive == '5cefa709e4b0b2cdcbcf49d2' || this.indexActive == '5d5fafe8e4b0feeb914c5125' || this.indexActive == '5d5fafe8e4b0feeb914c5127' ){
                    let haicangObj = { name:'海沧发布',type:'9' };
                    if( this.indexActive == '5d5fafe8e4b0feeb914c5125' ){
                        haicangObj = { name:'新福建',type:'4' } //4是网站源信息
                    }
                    if( this.indexActive == '5d5fafe8e4b0feeb914c5127' ){
                        haicangObj = { name:'厦门新闻网',type:'4' } //4是网站源信息
                    }
                    this.wechat_listItem_data({page: this.classPage, name: haicangObj.name,type:haicangObj.type})
                    .then(res => {
                        var tempArr=[];
                        res.data.forEach(function (item,i) {
                            // if( that.indexActive == '5cede9360cf2bd5d317cf425' ){
                            //     item.picture = 'http://wxservice.wengetech.com/wenhaiFt/picture/picTrans?picUrl='+item.picture
                            // }
                            tempArr.push({
                                id: item.id,
                                title: item.title,
                                befrom: item.author,
                                time: getDateDiff(item.pubtime),
                                outUrl: item.sourceUrl,
                                link: item.sourceUrl,
                                langTime: item.updated,
                                content: item.content,
                                ptitlepic: (i%5==0&&item.picture)?item.picture:false,
                                // titlepic: item.pictures.length>1?item.pictures[Math.floor(item.pictures.length/2)]:false,
                                titlepic: item.picture?item.picture:false,
                                readNum: -1,
                                weixin: true
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
                    // 红旗闻海指定接口
                } else if( this.indexActive === '5da6bfb0e4b007d3b7559216' || this.indexActive === '5c7e3f410cf28d7f9fb8f004' || this.indexActive === '5c7e3f4e0cf28d7f9fb8f005' ){
                        this.wenhai_listItem_data( {page: this.classPage,columnId:this.indexActive} )
                        .then(res => {
                            var tempArr=[];
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
                                    lives: item.stroyType=='ZHIBO' || item.stroyType == 'LIVE' ?item.video_url:false, // 直播
                                    href: item.stroyType=='HREF'?item.url:false, // 
                                    jsonUrl: item.jsonUrl,
                                    readNum: item.read_num,
                                    properties:item.properties,
                                    columnName:item.columnName,
                                    readUrl:item.url,
                                    summary:item.hasOwnProperty('summary')?item.summary:false,
                                    isTop:item.columnIsTop != null && item.columnIsTop > 0?true:false
                                    // imageUrlList:item.images != "[]" && JSON.parse( item.images ).length > 2 ? JSON.parse( item.images ): false
                                })
                                    //兼容新华社没有images字段
                                if( item.hasOwnProperty('images') ){
                                    var newsimgs=item.images != "[]" && JSON.parse( item.images ).length > 2 ? JSON.parse( item.images ): false;
                                    if(newsimgs!=false){
                                    newsimgs.forEach(function(item){
                                        item.src = item.url;
                                        delete item.url;
                                    })
                                    tempArr[i]['imageUrlList'] = newsimgs
                                    }
                                }
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
                  else if(this.indexActive === '5d68ce51e4b0e2963a408841'){
                    if(this.userDataid){
                        var postData = {
                            "pageNum":this.pageNum,
                            "pageSize":10,
                            "app_info_id":this.apis.theme.api.appInfoId,
                            // "app_info_id":18,
                            "loginUserId":this.userDataid
                        }
                    }else{
                        var postData = {
                            "pageNum":this.pageNum,
                            "pageSize":10,
                            "app_info_id":this.apis.theme.api.appInfoId,
                            // "app_info_id":18
                        }
                    }
                    if (!this.bottomNoData) {
                        this.bottomLock = true
                        this.bottomLoading = true;
                        this.axios({
                            method: "post",
                            url: this.apis.theme.api.community.getStateList,
                            data: postData
                            })
                        .then(res => {
                            if (!res.data.data.lastPage) {
                                this.stateList.push(...res.data.data.blog);
                                // this.contentJson = this.stateList
                                Bus.$emit('stateListShoot',this.stateList);
                                this.pageNum++;
                                if(this.pageNum == 2){
                                    this.loadBottomAjax();
                                }
                            } else {
                                this.bottomNoData = true
                            }
                            this.bottomLoading = false
                            this.bottomLock = false
                        })
                    }
                }
                 else {
                    if(  this.apis.getTheme() =='jiangxian' && this.indexActive == apis.theme.news.columnId.tuijian ){
                        this.get_tuijian_listItem_data({page: this.classPage})
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
                                    lives: item.stroyType=='ZHIBO' || item.stroyType == 'LIVE'?item.video_url:false, // 直播
                                    href: item.stroyType=='HREF'?item.url:false, // 
                                    jsonUrl: item.jsonUrl,
                                    readNum: item.read_num,
                                    properties:item.properties,
                                    columnName:item.columnName,
                                    readUrl:item.url,
                                    summary:item.hasOwnProperty('summary')?item.summary:false,
                                    // imageUrlList:item.images != "[]" && JSON.parse( item.images ).length > 2 ? JSON.parse( item.images ): false
                                })
                                   //兼容新华社没有images字段
                            if( item.hasOwnProperty('images') ){
                                  var newsimgs=item.images != "[]" && JSON.parse( item.images ).length > 2 ? JSON.parse( item.images ): false;
                                if(newsimgs!=false){
                                  newsimgs.forEach(function(item){
                                    item.src = item.url;
                                    delete item.url;
                                 })
                                 tempArr[i]['imageUrlList'] = newsimgs
                                }
                            }
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
                            for( let i = 0 ; i < res.length;i++ ){
                                if( res[i].hasOwnProperty('properties') && res[i].properties != undefined){
                                    //订阅号
                                    if( res[i].properties.hasOwnProperty('individualUserName') ){
                                        res[i]['individualUserName'] = res[i].properties.individualUserName;
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
                    }
                     else {
                        let datas;
                        if(this.userDataid){
                            datas = {page: this.classPage, uuid: uuid,userId:this.userDataid}
                        }else{
                            datas = {page: this.classPage, uuid: uuid}
                        }
                        this.get_listItem_data(datas)
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
                                    properties:item.properties,
                                    columnName:item.columnName,
                                    readUrl:item.url,
                                    summary:item.hasOwnProperty('summary')?item.summary:false,
                                    isTop:item.columnIsTop != null && item.columnIsTop > 0?true:false
                                    // imageUrlList:item.images != "[]" && JSON.parse( item.images ).length > 2 ? JSON.parse( item.images ): false
                                })
                                //兼容新华社没有images字段
                            if( item.hasOwnProperty('images') ){
                                  var newsimgs=item.images != "[]" && JSON.parse( item.images ).length > 2 ? JSON.parse( item.images ): false;
                                if(newsimgs!=false){
                                  newsimgs.forEach(function(item){
                                    item.src = item.url;
                                    delete item.url;
                                 })
                                 tempArr[i]['imageUrlList'] = newsimgs
                                }
                            }
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
                            for( let i = 0 ; i < res.length;i++ ){
                                if( res[i].hasOwnProperty('properties') && res[i].properties != undefined){
                                    //订阅号
                                    if( res[i].properties.hasOwnProperty('individualUserName') ){
                                        res[i]['individualUserName'] = res[i].properties.individualUserName;
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
                    }
                }
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
        this.getDataid();
        Bus.$on('pageNumDy',(val) =>{
			this.pageNum = val.num;
			this.stateList = val.arr;
			this.bottomNoData = false;
        });
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
        padding-top:0.1rem!important;
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
