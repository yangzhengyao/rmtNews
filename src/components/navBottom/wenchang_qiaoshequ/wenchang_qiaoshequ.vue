<template>
    <div id="home">
        <header class="com_header headerNavFixed" style="border-bottom:.01rem solid #fafafa;">
          <div  style="visibility:hidden" class="nvbt"></div>
          <div class="nvtt" style="font-size: 0.38rem;font-weight: 500;">侨社区</div>
          <div class="nvbt iabout"></div>
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
import { mapActions } from 'vuex'
export default {
    name: 'indexHeader',
    data() {
        return {
            loading: true,
            error: false
        }
    },
    components: { homeHeader, swiperContainer },
    methods: {
        ...mapActions('wenchang_qiaoshequ', [
            'get_indexColumn_data'
        ]),
        reload() {
            localStorage.clear()
            sessionStorage.clear()
            // plus.storage.removeItem("launchFlag");
            location.reload()
        }
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
#home {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
}
</style>
