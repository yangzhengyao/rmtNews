<template>
  <!-- 加载更多 -->
  <div
    class="container swiper-box-special"
    :class="type"
    v-infinite-scroll="loadBottomAjax"
    infinite-scroll-disabled="bottomLock"
    infinite-scroll-distance="10"
    infinite-scroll-immediate-check="false"
  >
    <!-- 请求提示 -->
    <my-loading :visible="loading"></my-loading>
    <my-error :visible="error" :method="init"></my-error>

    <!-- 顶部提示 -->
    <div class="globalTip">
      <!-- <div class="dataCount">已为你推荐{{dataCount}}条新内容</div> -->
      <div class="dataCount">已加载最新内容</div>
      <div class="noNewData">没有最新的内容了</div>
      <div class="requestFail">网络请求失败,请检查网络</div>
    </div>

    <!-- 下拉加载 -->
    <mt-loadmore
      :top-method="loadTopAjax"
      @translate-change="translateChange"
      @top-status-change="handleTopChange"
      ref="loadmore"
      :auto-fill="false"
      :distance="indexSwiper"
    >
      <!-- 下拉提示 -->
      <div slot="top" class="mint-loadmore-top">
        <span v-show="topStatus === 'pull'">
          <img class="pullLoading" src="~@/assets/img/loading.png"> 下拉刷新↓
        </span>
        <span v-show="topStatus === 'drop'">
          <img class="pullLoading" src="~@/assets/img/loading.png"> 释放更新↑
        </span>
        <span v-show="topStatus ==='loading'">
          <img class="pullLoading" src="~@/assets/img/loading.gif"> 加载中...
        </span>
      </div>
      <keep-alive>
        <subhot v-if="indexActive=='5d0221a6e4b0ed2aef82fd991'" :subHotLoad="subHotLoad"></subhot>
      </keep-alive>
      <keep-alive>
        <subscript v-if="indexActive=='5d0221a6e4b0ed2aef82fd971'" :subSpr="subSpr"></subscript>
      </keep-alive>
      <!-- 底部提示 -->
      <div class="bottomLoad" v-if="stateList.length > 0 || searchList.length > 0">
        <div class="loading" v-show="bottomLoading">加载中...</div>
        <div class="noData" v-if="bottomNoData">没有更多的内容了</div>
      </div>
    </mt-loadmore>
  </div>
</template>
<script>
import { formatDate, getDateDiff, getDateDiff_8  } from '../../../../config/cache.js'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import subhot from '../children/Subhot';// 动态组件
import subscript from '../children/Subscript';// 活动组件
import apis from '@/assets/js/api.js'
import Bus from '@/Bus'
export default {
    props: ['type'],
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
            qinqiangFlag: {},
            isHaixia:false,
            pageNum:1,
            hotPageNum:1,
            themeId:"",
            userDataid:"",
            stateList:[],
            searchList:[],
            subStrings:'',
            subStr:'',
            subHotLoad:true,
            subSpr:true
        }
    },
    components:{
      subhot,
      subscript
    },
    computed: {
        ...mapGetters('subscription', [
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
    },
    methods: {
        ...mapMutations('subscription', [
            'set_currentContent',
            'set_indexPage',
            'set_indexLocation'
        ]),
        ...mapActions('subscription', [
            'get_listItem_cache',
            'get_listItem_data',
            'get_stick_data',
            'get_banner_data'
        ]),
        init () {
            if ( this.indexActive === this.type && !(this.contentJson.length > 0) ) {
            // if ( !(this.contentJson.length > 0)) {
                // this.classPage = this.activePage
                // this.error = false
                // this.loading = true
                this.loadTopAjax()
            }
        },
      getDataid(){
        let userDataid = JSON.parse(localStorage.getItem("userData"));
        if( userDataid !== null){
          this.userDataid = userDataid.user_id;
        }else{
          this.userDataid = '';
        }
      },
      loadTopAjax () {
          if(this.type == "5d0221a6e4b0ed2aef82fd991"){    //热门
            this.axios({
              method: "post",
              url: this.apis.theme.api.subscription.selectAllIdByAppInfoId,
              data: {"appInfoId":this.apis.theme.api.appInfoId}
            })
            .then(res => {
              this.subStrings = '';
              res.data.data.forEach((v,i) => {
                // this.subStrings += v.subscribeId;
                this.subStrings += v+',';
              })
              if(res.data.success){
                var postData = {
                  "appInfoId":this.apis.theme.api.appInfoId,
                  "userId":this.userDataid,
                  "pageNum":0,
                  "pageSize":10,
                  "individualUserIds":this.subStrings.substring(0,this.subStrings.length-1)
                }
                this.axios({
                  method: "post",
                  url: this.apis.theme.api.news.infoListByColumnId,
                  data: postData
                })
                .then(res => {
                  if( res.data.success ){
                    $(`.container.${this.type} .dataCount`).slideDown(200).delay(1000).slideUp(200)
                    if (res.data.data[0].list.length > 0 ) {
                        this.bottomNoData = false;
                        this.hotPageNum = 1;
                        this.stateList = res.data.data[0].list;
                        Bus.$emit('stateListSub',this.stateList);
                        Bus.$emit('islnfoListSubHot',true);
                    } else {
                        this.bottomNoData = true
                        Bus.$emit('islnfoListSubHot',false);
                    }
                        // Bus.$emit('pageNumDy',{num:2,arr:this.stateList});
                        this.bottomLoading = false
                        this.bottomLock = false
                        this.$refs.loadmore.onTopLoaded();
                        this.subHotLoad = false;
                  }else{
                    Bus.$emit('islnfoListSubHot',false);
                    this.subHotLoad = false;
                  }
                })
              }else{
                Bus.$emit('islnfoListSubHot',false);
                this.subHotLoad = false;
              }
            })
              //网络请求加载数据  省略
            this.$refs.loadmore.onTopLoaded();
          
          }else if(this.type == "5d0221a6e4b0ed2aef82fd971"){   //关注
            if(this.userDataid){
              var posts = {
                "userId":this.userDataid
              }
              this.axios({
                method: "post",
                url: this.apis.theme.api.subscription.searchSub,
                data: posts
              })
              .then(res => {
                if( res.data.success == true ){
                  this.subStr = '';
                  if (res.data.data.length > 0 ) {
                      res.data.data.forEach((v,i) => {
                        this.subStr += v.subscribeId+',';
                      })
                      let data = {
                        "appInfoId":this.apis.theme.api.appInfoId,
                        "userId":this.userDataid,
                        "pageNum":0,
                        "pageSize":10,
                        "individualUserIds":this.subStr.substring(0,this.subStr.length-1)
                      }
                      this.axios({
                        method:"post",
                        url:this.apis.theme.api.news.infoListByColumnId,
                        data
                      })
                      .then(res => {
                        if(res.data.success){
                          if (res.data.data[0].list.length > 0 ) {
                            $(`.container.${this.type} .dataCount`).slideDown(200).delay(1000).slideUp(200)
                            this.searchList = res.data.data[0].list
                            this.pageNum = 1;
                            Bus.$emit('searchListSubScr',res.data.data[0].list);
                            Bus.$emit('islnfoListSubSp',true);
                          }else{
                            Bus.$emit('islnfoListSubSp',false);
                            this.bottomNoData = false
                          }
                          this.subSpr = false;
                        }
                      })
                  }else{
                    Bus.$emit('searchListSubScr',[]);
                    this.subSpr = false;
                  }
                  this.bottomLoading = false
                  this.bottomLock = false
                  this.$refs.loadmore.onTopLoaded();
                }
              })
            }else{
              Bus.$emit('islnfoListSubSp',false);
              console.log("需登录")
              this.subSpr = false;
            }
              //网络请求加载数据  省略
            this.$refs.loadmore.onTopLoaded()
          } else {      //活动
            this.$refs.loadmore.onTopLoaded();
          }
            
        },
        loadBottomAjax () {
          if(this.type == "5d0221a6e4b0ed2aef82fd991"){
            if (!this.bottomNoData) {
                this.bottomLock = true
                this.bottomLoading = true;
                var postData = {
                  "appInfoId":this.apis.theme.api.appInfoId,
                  "userId":this.userDataid,
                  "pageNum":this.hotPageNum,
                  "pageSize":10,
                  "individualUserIds":this.subStrings.substring(0,this.subStrings.length-1)
                  // "individualUserIds":'1'
                }
                this.axios({
                  method: "post",
                  url: this.apis.theme.api.news.infoListByColumnId,
                  data: postData
                })
                .then(res => {
                  if( res.data.success ){
                    if (res.data.data[0].list.length > 0 ) {
                      $(`.container.${this.type} .dataCount`).slideDown(200).delay(1000).slideUp(200)
                        this.stateList.push(...res.data.data[0].list);
                        Bus.$emit('stateListSub',this.stateList);
                        Bus.$emit('islnfoListSubHot',true);
                        this.hotPageNum++;
                    } else {
                        this.bottomNoData = true
                        Bus.$emit('islnfoListSubHot',false);
                    }
                    this.bottomLoading = false
                    this.bottomLock = false
                    // this.$refs.loadmore.onTopLoaded();
                  }
                })
            }
          }else if(this.type == "5d0221a6e4b0ed2aef82fd971"){
            if (!this.bottomNoData) {
              this.bottomLock = true
              this.bottomLoading = true;
              let data = {
                "appInfoId":this.apis.theme.api.appInfoId,
                "userId":this.userDataid,
                "pageNum":this.pageNum,
                "pageSize":10,
                "individualUserIds":this.subStr.substring(0,this.subStr.length-1)
              }
              this.axios({
                method:"post",
                url:this.apis.theme.api.news.infoListByColumnId,
                data
              })
              .then(res => {
                if(res.data.success){
                  if (res.data.data[0].list.length > 0 ) {
                    $(`.container.${this.type} .dataCount`).slideDown(200).delay(1000).slideUp(200)
                    console.log(this.searchList,"this.searchListthis.searchList")
                    this.searchList.push(...res.data.data[0].list);
                    Bus.$emit('searchListSubScr',this.searchList);
                    Bus.$emit('islnfoListSubSp',true);
                    this.pageNum++;
                  }else{
                    this.bottomNoData = true
                  }
                  if(this.searchList.length < 0){
                    Bus.$emit('islnfoListSubSp',false);
                    this.bottomNoData = false
                  }
                  this.bottomLoading = false
                  this.bottomLock = false
                }
              })
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
        this.getDataid();
        this.init()
        this.lookHereClick()
        //  来显示默认大图
        if(this.type=='5bee2294a3100d8dc42eec55'){
            this.boo=true;
        }
        Bus.$on('itemtypes',(val) =>{
            this.themeId = val;
        });
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
  border-bottom: 1px solid rgba(222, 222, 222, 0.6);
  padding-top: 20px;
  display: inline-block;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 7.18rem !important;
  height: 5.3rem !important;

  .news {
    position: relative;
    top: 193px;
    color: #212020;
    left: 21px;

    span {
      font-size: 14px;
    }
  }

  width: 6.49rem;
  height: 6.49rem;
}

.container {
   height: calc(100vh - 1.65rem);
    -webkit-overflow-scrolling: touch;
    position: relative;
    overflow:scroll;
  .globalTip {
    position: absolute;
    // top: .2rem;
    left: 0;
    right: 0;
    z-index: 99999999999999999999;
    div {
      height: 0.64rem;
      line-height: 0.64rem;
      font-size: 0.28rem;
      // color: #2a90d7;
      // background: rgba(213, 233, 247, .9);
      text-align: center;
      display: none;
      color: #f56767;
      background: #FBE9EF;
    }
  }

  .mint-loadmore {
    min-height: 100%;
  }

  .mint-loadmore-top {
    height: 50px;
    line-height: 50px;
    font-size: 14px;
  }
  
  .pullLoading {
    width: 24px;
    height: 24px;
    vertical-align: middle;
    margin-top: -4px;
    margin-right: 3px;
  }
}

.bottomLoad {
  background: transparent;
  padding-bottom: 0.65rem;
}
.ibox {
    margin-top: 0.2rem;
    background: #fff;
    padding: 0.3rem 0.24rem;
    h1 {
      font-size: 0.33rem;
      font-weight: 500;
    }
    .content {
      padding: 0;
      display: flex;
      flex-flow: wrap;
      .item {
        h3 {
          font-size: 0.27rem;
          margin-top: 0.1rem;
          font-weight: 500;
        }
        img {
          height: .46rem;
          margin-top: 0.34rem;
          border-radius: 4px;
        }
        img.serviceBig{
          height: 0.5888rem;
        }
        flex: 0 0 33%;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    }
  }
</style>
