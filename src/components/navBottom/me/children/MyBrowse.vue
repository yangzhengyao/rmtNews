<template>
    <div class="browses">
        <div class="loaddingview" v-if="loadingtransform">
            <div class="loading"></div>
        </div>
        <div :class="iphonexPadding ? 'iphonexMarginClass':'header' ">
            <header  :class="iphonexPadding ? 'iphonexMarginClass headerNavFixed':'headerNavFixed' ">
                <div class="nvbt ibackBack" @click="apis.iback()"></div>
                <div class="nvtt">最近浏览</div>
            </header>
        </div>

        <div class="main">
            <!-- <div class="base">
                <div class="activty-nav">
                    <ul class="colum">
                        <li v-for="(item,index) in browselist" :key="index" @click="groupTypeChange(index)">
                            <span :class="{active:indexnewBr==index}">{{item}}</span>
                        </li>
                    </ul>
                </div>
            </div> -->
            <!-- <div class="commandContainer scroll-wrapper com_contentNavFixed newsliststop">
                <div class="superall">
                    <swiper :options="swiperOption" class="nesbox" ref="mySwiper">
                        <swiper-slide class="swiper-slide-box zheFeatar">
                            <News></News>
                        </swiper-slide>
                        <swiper-slide class="swiper-slide-box zheFeatar swiper-slide-boxnews ">
                            <Circ :isType="isType"></Circ>
                        </swiper-slide>
                    </swiper>
                </div>
            </div> -->
            <Circ :isType="isType"></Circ>  <!-- 圈子列表 -->
            
        </div>
    </div>
</template>
<script>
import BrowseList from '../../infoList/BrowseList'
import News from "../components/News.vue"
import Circ from "../components/Circ.vue"
import Bus from '@/Bus';
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
    name:"MyBrowse",
    data(){
        return{
            userDataid:'',
            isType:1,
            browselist:[ '新闻', '圈子' ],
            swiperOption: {
                notNextTick: true,
                onSlideChangeStart: this.slideChangeCallBack,
                onSliderMove: this.slideMoveCallBack,
                onTouchEnd: this.touchEndCallBack
            },
            type: 0,
            Browsenum:0,
            iphonexPadding:false,
            loadingtransform: true
        }
    },
    components: {
        Circ,
        News
    },
    watch: {
        indexnewBr() {
            this.slideTo();
        }
    },
    computed: {
        ...mapGetters("index", [
        "indexnewBr", // 当前ative的栏目
        "indexColumnnews"
        ])
    },
    methods: {
        getDataid(){
			let userDataid = JSON.parse(localStorage.getItem("userData"));
			if( userDataid !== null){
				this.userDataid = userDataid.user_id;
			}else{
				this.userDataid = false;
			}
        },
        ...mapMutations("index", ["set_indexActivenewBr"]),
        groupTypeChange(itemname) {
            this.set_indexActivenewBr(itemname);
            this.type = itemname;
        },
        slideChangeCallBack(swiper) {
            let index = swiper.activeIndex;
            this.set_indexActivenewBr(index); // 滚动完swiper需要改变vuex里面的indexActive，这是为了与栏目联动
            this.type = index;
        },
        slideTo() {
            this.$refs.mySwiper.swiper.slideTo(this.indexnewBr, 300, true); // 让swiper滚动到index位置
        },
        
        selectUserBrowseByParam(){
            // if(!this.userDataid) {
            //     that.apis.urlParams("Login", {});
            // }
            var postData = "";
            if(this.Browsenum == 0){
                postData = {
                "userId":this.userDataid,	
                "browseType":1,
                "pageNo":1,
                "pageSize":10,
                }
            }else{
                postData = {
                "userId":this.userDataid,	
                "browseType":0,
                "pageNo":1,
                "pageSize":10,
                }
            }
            this.axios({
                    method: "post",
                    url: this.apis.theme.api.me.selectUserBrowseByParam,
                    data: postData 
                }).then(res => {
                    this.loadingtransform = false;
                    if(this.Browsenum == 0){
                        if (res.data.data.length > 0 ) {
                            this.stateList = res.data.data;
                            Bus.$emit('stateListNe',{arr:this.stateList,type:1});
                            Bus.$emit('islnfoListNe',true);
                            
                        }else {
                            Bus.$emit('islnfoListNe',false);
                        }
                    }else{
                        this.loadingtransform = false;
                        if (res.data.data.length > 0 ) {
                            this.stateList = res.data.data;
                            
                            Bus.$emit('stateListBr',{arr:this.stateList,type:1});
                            Bus.$emit('islnfoListBr',true);
                            
                        }else {
                            Bus.$emit('islnfoListBr',false);
                            // this.bottomNoData = true
                        } 
                    }
                
                if(this.Browsenum < 1){
                    this.Browsenum ++;
                    this.selectUserBrowseByParam();
                }
            });
        },
    },
    mounted () {
        this.getDataid();
        this.selectUserBrowseByParam();
        if( this.apis.iphonexPaddingFn() ){
            this.iphonexPadding = true;
        }
    },
    created () {
        // this.seachUserFavContent();
    }
}
</script>
<style scoped lang="less">
.loaddingview{width: 100%;height: 100%;position: fixed;top:0;left: 0;z-index:999999999;background: #fff}
.loaddingview .loading{position: fixed;top: 35%;left: 50%;margin: -20px 0 0 -20px;width: 40px;height: 40px;border: 2px solid;border-color: #fd4d4d #fd4d4d transparent;border-radius: 50%;box-sizing: border-box;animation: loading 1s linear infinite;z-index: 99999999999999991;}
@keyframes loading{0%{transform: rotate(0deg);}
100%{transform: rotate(360deg);}}
.browses{
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    .main{
        margin-top: 0.3rem;
        flex: 1;
    }
}
.header{
    height: 0.89rem;
}
.headerNavFixed{
    background: #fff;
    border-bottom: 1px solid #E6E6E6;
}
.headerNavFixed > div {
  height: .88rem;
  color: #000;
}
.iphonexMarginClass{
    height: 1.26rem;
}
.colum{
    display: flex;
    justify-content: space-around;
    margin-top: 0.25rem;
    border-bottom: 1px solid #E6E6E6;
    li{
        font-size: 0.32rem;
        color:rgba(153,153,153,1);
    }
    
}
.activty-nav ul li span{
    padding-bottom: 0.2rem;
}
.activty-nav ul li span.active {
    color: #E32519;
    // font-weight: bolder;
}
.activty-nav ul li span.active:after {
    border-bottom: 2px solid #E32519;
    display: block;
    width: 0.4rem;
    height: 2px;
    content: "";
    margin: 0.15rem auto 0;
}
</style>