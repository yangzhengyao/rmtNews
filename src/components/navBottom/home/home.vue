<template>
    <div id="home">
        <!-- 头部 -->
        <home-header/>
        <!-- 内容区域 -->
        <swiper-container></swiper-container>
        <!-- 子页面视图 -->
        <!-- <keep-alive>
            <router-view></router-view>
        </keep-alive> -->
        <!-- 拍客上传按钮 -->
        <div class="myCommunity" v-if="indexActive == '5d68ce51e4b0e2963a408841' " @click="clickShoot" :class="{is_ios: iphonexPadding}">
            <img :src='"~@/assets/img/"+apis.getTheme()+"/photo.png"' alt>
        </div>
        <!-- 请求提示 -->
        <my-loading :visible="loading"></my-loading>
        <my-error :visible='error' :method='reload'></my-error>
    </div>
</template>
<script>
import homeHeader from './components/homeHeader'
import swiperContainer from './components/swiperContainer'
import { getCache, setCache, get_local_cache, set_local_cache } from '@/config/cache'
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'indexHeader',
    data() {
        return {
            loading: true,
            error: false,
            iphonexPadding:false,
            userDataid:''
        }
    },
    components: { homeHeader, swiperContainer },
    computed: {
        ...mapGetters('index', [
          'indexActive',        // active的栏目
        ])
    },
    methods: {
        ...mapActions('index', [
            'get_indexColumn_data'
        ]),
        reload() {
            localStorage.clear()
            sessionStorage.clear()
            // plus.storage.removeItem("launchFlag");
            location.reload()
        },
        clickShoot(){
            if(!this.userDataid){
                this.apis.urlParams("Login", {});
                return;
            }
            localStorage.removeItem('imgData');
            localStorage.removeItem('vidData');
            this.characters();
        },
        getDataid(){
            let userDataid = JSON.parse(localStorage.getItem("userData"));
            if( userDataid !== null){
                this.userDataid = userDataid.user_id;
            }else{
                this.userDataid = null;
            }
        },
        characters() {
            let that = this;
            that.apis.urlParams("publish", {
                urlImg: "",
                type: "1"
            });
            plus.webview
                .getWebviewById(
                window.location.href.split("#/")[0] + "#/" + "publish"
                )
                .addEventListener(
                "close",
                function(e) {
                    localStorage.removeItem('imgData');
                    that.$refs.hotChild.pageNo = 1;
                    that.$refs.hotChild.loadPageList("top");
                },
                false
                );
        },
    },
    created() {
        this.getDataid();
        this.get_indexColumn_data()
        .then(res => {
            this.loading = false
            this.error = false
        })
        .catch(err => {
            this.loading = false
            this.error = true
        })
        if( this.apis.iphonexPaddingFn() ){
            this.iphonexPadding = true;
        }
    }
}
</script>
<style lang='less'>
#home {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
}
.myCommunity {
    border-radius: 50%;
    -webkit-box-shadow: 0px 0px 9px 1px @dominantColor;
    box-shadow: 0px 0px 9px 1px @dominantColor;
    position: fixed;
    display: flex;
    bottom:1.2rem;
    right:0.4rem;
    justify-content: center;
    align-items: center;
    padding: .4rem .37rem;
    background: @dominantColor;
    z-index: 10;
    img {
        width: 0.42rem;
        height: 0.324rem;
    }
}
.is_ios{
    bottom:1.8rem!important;
}
</style>
