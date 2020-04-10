<template>
    <div>
        <div class="loaddingview" v-if="loadingtransform">
            <div class="loading"></div>
        </div>
        <div :class="iphonexPadding ? 'iphonexMarginClass':'header' ">
            <header  :class="iphonexPadding ? 'iphonexMarginClass headerNavFixed':'headerNavFixed' ">
                <div class="nvbt ibackBack" @click="apis.iback()"></div>
                <div class="nvtt">我的收藏</div>
            </header>
        </div>
        <div  class="newheight">
            <div class="searchBox">
                <label for="txts"><img src="../img/search.png" alt=""></label>
                <input type="text" id="txts" v-model="valueKeys" class="searchk" autocomplete="off" placeholder="请输入搜索关键字">
                <span :class="valueKeys?'clear':'clear1'" @click="clear()"></span>
            </div>
            <div>
                <div class="base">
                    <div class="activty-nav">
                        <ul class="colum">
                            <li v-for="(item,index) in apis.theme.api.appName !== 'mile'?collectlist1:collectlist2" :key="index" @click="groupTypeChange(index)">
                                <span :class="{active:indexnewmy==index}">{{item}}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="commandContainer scroll-wrapper com_contentNavFixed newsliststop">
                    <div class="superall">
                        <swiper :options="swiperOption" class="nesbox" ref="mySwiper">
                            <swiper-slide class="swiper-slide-box zheFeatar">
                                <News></News>
                            </swiper-slide>
                            
                            <swiper-slide class="swiper-slide-box zheFeatar swiper-slide-boxnews">
                                <Circ :isType="isType"></Circ>
                            </swiper-slide>
                            
                            <swiper-slide class="swiper-slide-box zheFeatar swiper-slide-boxnews" v-if="apis.theme.api.appName !== 'mile'">
                                <Activ></Activ>
                            </swiper-slide>
                        </swiper>
                    </div>
                </div>

            </div>
        </div>
        
    </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import News from "../components/News.vue"
import Circ from "../components/Circ.vue"
import Activ from "../components/Activ.vue"
import Bus from '@/Bus';
export default {
    name:"MyCollect",
    data(){
        return{
            valueKeys:'',
            swiperOption: {
                notNextTick: true,
                onSlideChangeStart: this.slideChangeCallBack,
                onSliderMove: this.slideMoveCallBack,
                onTouchEnd: this.touchEndCallBack
            },
            isType:2,
            collectlist1:['新闻','圈子','活动' ], //乐山
            collectlist2:['新闻','圈子', ],       //弥勒
            type: 0,
            userDataid:'',
            num:0,
            newVals:'',
            iphonexPadding:false,
            loadingtransform: true
        }
    },
    components: {
        News,
        Circ,
        Activ,
    },
    watch: {
        indexnewmy() {
            this.slideTo();
        },
        valueKeys(newVal, oldVal){
        this.newVals = newVal;
        this.byApplist();
        Bus.$emit("pageAndContent",{pageNo:2,searchContent:newVal,NoData:false});
        }
    },
    computed: {
        ...mapGetters("index", [
            "indexnewmy", // 当前ative的栏目
            "indexColumnnews"
        ])
    },
    methods: {
        clear(){
            this.valueKeys=""


        },
        ...mapMutations("index", ["set_indexActivenewmy"]),
        groupTypeChange(itemname) {
            this.set_indexActivenewmy(itemname);
            this.type = itemname;
            this.byApplist();
        },
        slideChangeCallBack(swiper) {
            let index = swiper.activeIndex;
            this.set_indexActivenewmy(index); // 滚动完swiper需要改变vuex里面的indexActive，这是为了与栏目联动
            this.type = index;
        },
        slideTo() {
            this.$refs.mySwiper.swiper.slideTo(this.indexnewmy, 300, true); // 让swiper滚动到index位置
        },
        getDataid(){
			let userDataid = JSON.parse(localStorage.getItem("userData"));
			if( userDataid !== null){
				this.userDataid = userDataid.user_id;
			}else{
				this.userDataid = false;
			}
        },
        seachUserFavContent(){
            let that = this;
            if(!this.userDataid) {
                that.apis.urlParams("Login", {});
                return;
            }
            if(this.num == 0){
                var postData = {
                "userId":this.userDataid,	
                "searchContent":"",
                "type":2,
                "pageNo":1,
                "pageSize":10,
                "appInfoId":that.apis.theme.api.appInfoId}
            }else if(this.num == 1){
                postData = {
                "userId":this.userDataid,	
                "searchContent":"",
                "type":4,
                "pageNo":1,
                "pageSize":10,
                "appInfoId":that.apis.theme.api.appInfoId}
            }else{
                postData = {
                "userId":this.userDataid,	
                "searchContent":"",
                "type":0,
                "pageNo":1,
                "pageSize":10,
                "appInfoId":that.apis.theme.api.appInfoId}
            }
            this.axios({
                    method: "post",
                    url: this.apis.theme.api.me.seachUserFavContent,
                    data: postData
                }).then(res => {
                    this.condition1(res);
                    this.loadingtransform = false;
                    if(this.num <= 1){
                        this.num ++;
                        this.seachUserFavContent();
                    }
            });
        },
        condition(newVals){
            if(this.indexnewmy == 0){
                return {
                    "userId":this.userDataid,	
                    "searchContent":newVals,
                    "type":2,
                    "pageNo":1,
                    "pageSize":10,
                    "appInfoId":this.apis.theme.api.appInfoId}
            }else if(this.indexnewmy == 1){
                return {
                    "userId":this.userDataid,	
                    "searchContent":newVals,
                    "type":4,
                    "pageNo":1,
                    "pageSize":10,
                    "appInfoId":this.apis.theme.api.appInfoId}
            }else{
                return {
                    "userId":this.userDataid,	
                    "searchContent":newVals,
                    "type":0,
                    "pageNo":1,
                    "pageSize":10,
                    "appInfoId":this.apis.theme.api.appInfoId}
            }
        },
        condition1(res){
            if(this.num == 0){
                if (res.data.data.length > 0 ) {
                  this.stateList = res.data.data;
                  Bus.$emit('stateListNe',this.stateList);
                  Bus.$emit('islnfoListNe',true);
                }else {
                  Bus.$emit('islnfoListNe',false);
                  // this.bottomNoData = true
                }
            }else if(this.num == 1){
                if (res.data.data.length > 0 ) {
                    this.stateList = res.data.data;
                    Bus.$emit('stateListBr',{arr:this.stateList,type:2});
                    Bus.$emit('islnfoListBr',true);
                }else {
                    Bus.$emit('islnfoListBr',false);
                }
            }else{
                if (res.data.data.length > 0 ) {
                    this.stateList = res.data.data;
                    Bus.$emit('ActivList',this.stateList);
                    Bus.$emit('isActivelist',true);
                }else {
                    Bus.$emit('isActivelist',false);
                }
            }
        },
        condition2(res){
            if(this.indexnewmy == 0){
                if (res.data.data.length > 0 ) {
                  this.stateList = res.data.data;
                  Bus.$emit('stateListNe',this.stateList);
                  Bus.$emit('islnfoListNe',true);
                }else {
                  Bus.$emit('islnfoListNe',false);
                  // this.bottomNoData = true
                }
            }else if(this.indexnewmy == 1){
                if (res.data.data.length > 0 ) {
                    this.stateList = res.data.data;
                    // Bus.$emit('stateListBr',this.stateList);
                    Bus.$emit('stateListBr',{arr:this.stateList,type:2});
                    Bus.$emit('islnfoListBr',true);
                }else {
                    Bus.$emit('islnfoListBr',false);
                }
            }else{
                if (res.data.data.length > 0 ) {
                    this.stateList = res.data.data;
                    Bus.$emit('ActivList',this.stateList);
                    Bus.$emit('isActivelist',true);
                }else {
                    Bus.$emit('isActivelist',false);
                }
            }
        },
        byApplist() {
            var data = '';
            if(this.newVals){
                data = this.condition(this.newVals);
            }else{
                data = this.condition("")
            }
            this.axios({
                method: "post",
                url: this.apis.theme.api.me.seachUserFavContent,
                data: data
            }).then(res => {
                this.condition2(res);
                this.loadingtransform = false;
            });
            },
    },
    mounted () {
        this.getDataid();
        this.seachUserFavContent();
        if( this.apis.iphonexPaddingFn() ){
            this.iphonexPadding = true;
        }
    }
}
</script>
<style scoped lang="less">
.loaddingview{width: 100%;height: 100%;position: fixed;top:0;left: 0;z-index:999999999;background: #fff}
.loaddingview .loading{position: fixed;top: 35%;left: 50%;margin: -20px 0 0 -20px;width: 40px;height: 40px;border: 2px solid;border-color: #fd4d4d #fd4d4d transparent;border-radius: 50%;box-sizing: border-box;animation: loading 1s linear infinite;z-index: 99999999999999991;}
@keyframes loading{0%{transform: rotate(0deg);}
100%{transform: rotate(360deg);}}
.header{
    height: 0.89rem;
}
.headerNavFixed{
    background: #fff;
    border-bottom: 1px solid #E6E6E6;
}
.headerNavFixed > div {
  height: 0.88rem;
  color: #000;
}
.iphonexMarginClass{
    height: 1.26rem;
    
}
.newheight{
    overflow:hidden;
    // background:red;
    height: 90vh;
    margin-top: 0.5rem;
}
.searchBox{
    width:6.9rem;
    height:0.62rem;
    background:rgba(245,245,245,1);
    display: flex;
    margin-left: 0.3rem;
    margin-top: 0.3rem;
    border-radius: 0.3rem;
    .clear{
        width: 0.32rem;
        height: 0.62rem;
        line-height: 0.62rem;
        display: inline-block;
        font-size: 16px;
        margin-right: 0.2rem;
        background: url("../img/clear.png") no-repeat center center;
        background-size: contain;
    }
    .clear1{
        display: none;
    }
    label{
        display: flex;
        align-items: center;
        margin-left: 0.2rem;
        margin-right: 0.1rem;
        img{
            width: 0.32rem;
            height: 0.32rem;
        }
    }
    .searchk{
        height:0.62rem;
        font-size: 16px;
        width:6rem;
        background:rgba(245,245,245,1);
        // &::after{
        //     content: "X";
        //     width: 0.32rem;
        //     height: 0.32rem;
        //     display: inline-block;
        //     font-size: 16px;
        //     margin-right: 1rem;
        // }
    }
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