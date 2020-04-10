<template>
    <div id="youyu_wenlv">
        <header class="com_header headerNavFixed">
          <div  style="visibility:hidden" class="nvbt iback"></div>
          <div class="nvtt">文旅</div>
          <!-- <div class="nvbt iabout">
             <img @click="seek" src="./img/search.png" alt="">
          </div> -->
        </header>
        <!-- 头部 -->
        <home-header/>
        <!-- 内容区域 -->
        <swiper-container></swiper-container>
        <!-- 子页面视图 -->
        <!-- <keep-alive>
            <router-view></router-view>
        </keep-alive> -->

        <!-- 请求提示 -->
        <my-loading :visible="loading"></my-loading>
        <my-error :visible='error' :method='reload'></my-error>
    </div>
</template>
<script>
import homeHeader from './components/homeHeader'
import swiperContainer from './components/swiperContainer'
import apis from '../../../assets/js/api.js'
// import { mapActions } from 'vuex'
import {mapGetters, mapMutations, mapActions} from 'vuex'
export default {
    name: 'indexHeader',
    data() {
        return {
            loading: true,
            error: false
        }
    },
    computed: {
        ...mapGetters('wenlv', [
            'indexActive',  // 当前ative的栏目
            'activeIndex',  // 当前active的栏目的数组位置
            'indexColumn'   // 栏目数据
        ])
    },
    components: { homeHeader, swiperContainer },
    methods: {
        ...mapActions('wenlv', [
            'get_indexColumn_data'
        ]),
        reload() {
            localStorage.clear()
            sessionStorage.clear()
            // plus.storage.removeItem("launchFlag");
            location.reload()
        },
        //  跳转到搜索页面
        seek(){
            //  在后面可以拼接参数
              apis.urlParams('findseek',{includedColumnIds:'5d25cedee4b09067cf752464'})
        },
    },
    created() {
      
        this.get_indexColumn_data()
        .then(res => {
          
            this.loading = false
            this.error = false
        })
        .catch(err => {
            this.loading = false
            this.error = true
        })
    }
}
</script>
<style lang='stylus'>
#youyu_wenlv {
    position: relative;
    width: 100%;
    height: 100%;
    min-height :11.17rem;
    overflow: hidden;
    background:#fff;
}
#youyu_wenlv header{
    background: #fff !important;
    border-bottom:.02rem solid #e5e5e5;
        .nvtt{
            font-size: .36rem;
            color: #1a1a1a;
        } 
}
.iabout{
    position:absolute;
    right:0;
    img{
        margin-top:0.28rem;
        width:0.34rem;
        height:0.34rem;
    }
}
</style>
