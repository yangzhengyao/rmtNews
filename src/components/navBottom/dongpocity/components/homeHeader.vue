<template>
    <div id="indexHeader">
        <!-- 头部 -->
        <header class="com_header headerNavFixed">
            <!-- 用于ios沉浸式状态栏 -->
            <div class="iosStatus" v-if="this.$store.state.device === 'ios'? true : false"></div>
            <div class="top_bar">
                <!-- <div class="fill-box" style="flex: 2;"></div> -->
                <div class="logo" @click.stop.prevent='goTop' @touchstart="touchstartFunc" @touchend="touchendFunc"></div>
                <div class="search">
                    <div class="search_wrap">
                        <i class="icon-search"></i>
                        <!-- <div class="hot_topic">{{hot_topic}}</div> -->
                        <div class="hot_topic" @click='seek'>
                            <img src="../../../../assets/img/search2.png" alt="#">
                            <!-- <span>青铜峡景区</span> -->
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <!-- 栏目 -->
        <nav class="homeNavFixed navCommuntiy">
            <div class="nav_ul newCommunity ">
                <a href='javascript:;' v-for="(item,index) in indexColumn" :class='{active: indexActive == item.classpath,activedongpo:apis.getTheme() =="dongpo"}' @click="navClick(item.classpath,index)" :key="index">{{item.classname}}
                    <span></span>
                </a>
            </div>
        </nav>
    </div>
</template>
<script>
import {mapGetters, mapMutations, mapActions} from 'vuex'
import apis from '../../../../../src/assets/js/api.js'
import { get_local_cache, set_local_cache } from '../../../../config/cache'
import { setTimeout } from 'timers';
export default {
    data() {
        return {
            hot_topic: '搜你想搜的',
            move: 0,
            timer: 0,
            longNum: 0
        }
    },
    computed: {
     ...mapGetters('index', [
        'appMain',   // tab的当前索引栏目
      ]),
        ...mapGetters('newsCommunity', [
            'indexActive',  // 当前ative的栏目
            'activeIndex',  // 当前active的栏目的数组位置
            'indexColumn'   // 栏目数据
        ])
    },
    watch: {
     
        indexActive () {
            this.slideTo(this.activeIndex);
        }
    },
    methods: {
        ...mapMutations('newsCommunity', [
            'set_indexActive',
            'set_indexColumn'
        ]),
        ...mapActions('search', [
            'get_topic_data'
        ]),
        // 获取推荐信息
        get_topic() {
            this.get_topic_data()
            .then(res => {
                if (res.data) {
                    this.hot_topic = res.data
                }
            })
        },
        urlActivity(){
            plus.nativeUI.alert("社区功能正在维护，敬请期待！", function() {}, "提示", "确定");
        },
        //  跳转到增加栏目页面
        // add(){
        //     let that=this;
        //     apis.urlParams('./news/add.html');
        //     plus.webview.getWebviewById('./news/add.html').addEventListener('close', function(e){
        //         that.set_indexColumn(JSON.parse(get_local_cache('index_Column')));
        //         that.set_indexActive(apis.theme.news.columnIdOrder[0])
        //     }, false);
        // },
        //  跳转到搜索页面
        seek(){
            //  在后面可以拼接参数
              apis.urlParams('./news/seek.html')
        },
        // 自己实现导航栏滚动
        slideTo (index) {
             setTimeout(() => {
                let _container = $('.nav_ul.newCommunity')           // 获取滚动容器元素
                let _column = $('.nav_ul.newCommunity a').eq(index)  // 获取当前active栏目元素
                if (_column) {
                    let _container_width = _container.width()               // 容器宽度
                    let _container_left = _container.scrollLeft()           // 容器当前滚动条的值
                    let _column_width = _column.width()                     // 栏目宽度
                    let _column_left = _column.position().left              // 栏目距离屏幕左边的距离
                    let midWidth = (_container_width - _column_width) / 2   // 屏幕中心线的宽度
                    // 容器滚动为0，并且active栏目位于中间线左边？滚动值为0 ：当前容器滚动值 + （active栏目相对于中间线的值，有正负）
                    if (_container_left === 0 && _column_left <= midWidth) {
                        this.move = 0
                    } else {
                        this.move = _container_left + (_column_left - midWidth)
                    }
                    _container.animate({ 'scrollLeft': this.move }, 300)
                }
            },2000)
        },
        navClick (type,index) {
            console.log(type)
             this.set_indexActive(type) // 点击栏目需要改变vuex内的indexActive值，这是为了与swiper联动
        //    this.indexColumn.splice(index,1);
            if(type=='5d0221a6e4b0ed2aef82fd9a'){
                let userDataid = JSON.parse(localStorage.getItem("userData"));
                    if (userDataid == null) {
                        this.apis.urlParams("Login");
                    }
            }
        },
        goTop() {
            $(`.container.${this.indexActive}`).animate({scrollTop: 0})
            // localStorage.clear()
            // sessionStorage.clear()
            // location.reload()
        },
        touchstartFunc() {
            this.timer=setInterval(() => {
                this.longNum++;
                /* if(this.longNum > 10 && this.longNum<30){
                    clearTimeout(this.timer);
                    location.reload();
                }else  */if(this.longNum > 20) {
                    clearTimeout(this.timer);
                    localStorage.clear()
                    sessionStorage.clear()
                    location.reload()
                    plus.storage.removeItem("launchFlag");
                }
                // console.log(this.longNum);
            }, 100);
        },
        touchendFunc() {
            clearTimeout(this.timer);
            if(this.longNum > 5){
                location.reload();
            }
            this.longNum=0;
        },
        plusReady(){}
    },
    mounted(index) {
        if (window.plus) {
          this.plusReady();
        } else {
          document.addEventListener("plusready", this.plusReady(), false);
        }
        var that=this;
        localStorage.setItem('index',index);
        
        if(apis.isPC()) {
            window.addEventListener("storage", function (e) {
                if(e.key=='index_Column'){
                    that.set_indexColumn(JSON.parse(get_local_cache('qinqiang_index_Column')));
                    that.set_indexActive(apis.theme.news.columnIdOrder[0])
                }
            })
        }
        
        
    },
    activated () {
        this.$nextTick(() => {
            $('.nav_ul.newCommunity').scrollLeft(this.move)
        })
    }
}
</script>
<style lang='less' scoped>
#indexHeader {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
    .iosStatus {
        width: 100%;
        height: 0.535rem;
    }
    header {
        display: block;
        position: relative;
        // overflow: hidden;
        background-color: @dominantColor;
        color: #fff;
        .top_bar {
            position: relative;
            height: 44px;
            user-select: none;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #fff;
            .logo{
                // flex: 2.5;
                width: 160px;
                height: 100%;
                // margin-left: 0.4rem;
            }
            .search{
                // flex: 1.5;
                height: 100%;
                padding: 0.15rem 0.4rem 0.15rem;
                color: @dominantColor;
                overflow: hidden;
                position: absolute;
                right: 0;
                display: none;
                .search_wrap{
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content : flex-end;
                    width: 100%;
                    height: 100%;
                    // border: 1px solid #ddd;
                    border-radius: 50px;
                    background: transparent;
                    overflow: hidden;
                    // padding: 0 0.267rem;
                    .icon-search{
                        font-size: 15px;
                    }
                    .hot_topic{
                        
                        img {
                            width: 17px;
                            margin-top: 0;
                            margin-left: 0px;
                            z-index: 99;
                            float: right;
                        }
                        span{
                            margin-left: 8px;
                        }
                        color:#999999;
                        font-size: 14px;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
                    }
                }
            }
        }
    }
    .navCommuntiy{
        border-bottom: .1rem solid #F5F5F5;
    }
    nav {
        position: relative;
        background-color: #fff;
        border-bottom: 1px solid #fff;
        // padding-right: 1.06rem;
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
                display:table-cell; 
                *display:inline-block;
                vertical-align: middle;
                padding: 0 0.267rem;
                margin-left: 0.133rem;
                height: 42px;
                font-size: 17px;
                color: #999999;
                white-space: nowrap;
                -webkit-tap-highlight-color: rgba(0, 0, 0, .3);
                text-decoration: none;
                -webkit-tap-highlight-color: transparent;
                position: relative;
                font-weight: 400;
                &:last-child {
                    margin-right: 0.133rem;
                }
                &.active {
                    color: #333333;
                    font-weight: bold;
                    font-size: .38rem;
                    span{
                      border-bottom: .04rem solid #E63418;
                    }
                }
                span {
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: 37%;
                    right: 39%;
                }
            }
        }
        .newCommunity{
            display: flex;
            a{
                // width: 25%;
                flex: 1;
                text-align: center;
                line-height: 42px;
                font-size: .32rem;
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
                background-color: rgba(244, 245, 246, .3);
            }
            .more_btn {
                display: block;
                width: 1.06rem;
                height: 100%;
                background-size: 16px;
                background-color: #f4f5f6;
            }
        }
    }
}
#indexHeader nav .newCommunity a.activedongpo{width:50%}
</style>
<style lang='less'>
#indexHeader .logo {
    /* background: url(~@/assets/img/news_logo.png)no-repeat center center; */
    background: @logoBg;
    background-size: @logoBgWidth;
}
#indexHeader .shadow {
    background: url(~@/assets/img/shadow.png) no-repeat 100%;
}

#indexHeader .more_btn {
    background: @moreBtnBg;
}
</style>
