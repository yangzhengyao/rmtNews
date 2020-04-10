<template>
    <div>
        <!-- 弥勒订阅号banner图 -->
        <!-- <div class="dingyuehao"><img src="../images/banner.png" alt=""></div> -->
        <!-- 弥勒订阅号栏目轮播图 -->
        <!-- <news-banner></news-banner> -->
        <div class="slide" >
            <div class="slide_box" v-for="(item,index) in servicesJsondingyue" :key="index"  @touchmove="touchmoveFunc()" @click="url(item)"  >
                <img :src="item.titleUrl" alt>
                <span>{{ item.name }}</span>
            </div>
            
        </div>
        <div class="bor_bottom"></div>
        <subinfolist></subinfolist>
        <div class="loaddingview" v-if="subHotLoad">
            <div class="loading"></div>
        </div>
    </div>
</template>
<script>
import subinfolist from '../../infoList/SubHotInfoList'
import newsBanner from './../../../newsBanner';
import apis from '@/assets/js/api.js'

export default {
    name:'SubHot',
    props:{
        subHotLoad:{
            default:true
        }
    },
    data(){
        return{
            servicesJsondingyue:''
        }
    },
    components: {
        subinfolist,
        newsBanner,
    },
    methods: {
        getdingyuedata(){    //查询订阅号查询类型
            let data={'appInfoId':this.apis.theme.api.appInfoId}

            this.axios({
                method: "post",
                url: this.apis.theme.api.subscription.selectSbuListChild,
                data: data
            }).then(res => {
                this.servicesJsondingyue = res.data.data
            })
        },
        url(item) {
            //跳转订阅号列表
            this.apis.urlParams("sublist", { title: item.name,checkInId:item.id});
        },
        touchmoveFunc() {
            if (window.trackingClickSelf) {
                window.trackingClickSelf = false;
            }
        },
    },
    mounted () {
        this.getdingyuedata();
    }
}
</script>
<style lang="less" scoped>
    .dingyuehao{
        margin: 0.36rem 0.3rem 0;
        img{
        width:100%;
        height:100%;
        }
    }
    .slide {
        display: flex;
        flex-wrap: wrap;
        background: #fff;
        padding:.4rem .3rem;
        .slide_box {
            width: 25%;
            font-size: 0.24rem;
            display: flex;
            flex-direction: column;
            text-align: center;
            align-items: center;
            // color: #1a1a1a; cursor pointer;
            // margin-top .25rem;
            img {
                height: 0.85rem;
                width: 0.85rem;
                margin-bottom: 0.1rem;
            }
        }
        div:nth-child(1), div:nth-child(2), div:nth-child(3){
            margin-bottom:.4rem;
        }
    }
    .bor_bottom{
        border-bottom: 0.02rem solid #D9D9D9;
        margin: 0 0.3rem;
    }
    .loaddingview {
        width: 100%;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 999999999;
        background: #fff;
    }
    .loading {
        position: fixed;
        top: 35%;
        left: 50%;
        margin: -20px 0 0 -20px;
        width: 40px;
        height: 40px;
        border: 2px solid;
        border-color: #fd4d4d #fd4d4d transparent;
        border-radius: 50%;
        box-sizing: border-box;
        animation: loading 1s linear infinite;
        z-index: 99999999999999991;
        margin-top: 4rem;
    }
    @keyframes loading {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>