<template>
    <div>
        <div class='loaddingview' v-if="loadingtransform">
            <div class="loading"></div>
        </div>
        <div :class="iphonexPadding ? 'iphonexMarginClass':'header' ">
            <header :class="iphonexPadding ? 'iphonexMarginClass headerNavFixed':'headerNavFixed' ">
                <div class="nvbt ibackBack" @click="apis.iback()"></div>
                <div class="nvtt">我的活动</div>
            </header>
       </div>
       
       <div class="wrapper">
           <ActivityModule></ActivityModule>
       </div>
      

    </div>
</template>
<script>
// import api from "../../../../../src/assets/js/api.js";
import qs from "qs";
import axios from "axios";
import Bus from '@/Bus';
import ActivityModule from "./ActivityModule"
export default {
    name:"MyActivity",
    components:{
        ActivityModule
    },
    data(){
        return{
            iphonexPadding:false,
            loadingtransform:true,
        }
    },
    methods:{
        getActivBySignUpUserId() {
            //查询用户已经报名的活动列表
            let that = this;
            if(!this.userDataid) {
                that.apis.urlParams("Login", {});
            }
            
            axios({

                url: that.apis.theme.api.me.getActivBySignUpUserId,
                method: "post",
                data:{
                    userId:this.userDataid,
                },
            }).then(res => {
                Bus.$emit('activelist',res.data.data);
                this.loadingtransform = false;
            });
        },
        getDataid(){
			let userDataid = JSON.parse(localStorage.getItem("userData"));
			if( userDataid !== null){
				this.userDataid = userDataid.user_id;
			}else{
				this.userDataid = false;
			}
		},
    },
    mounted(){
        // this.getActivBySignUpUserId()
        if( this.apis.iphonexPaddingFn() ){
            this.iphonexPadding = true;
        }
    },
    created(){
        this.getDataid();
        this.getActivBySignUpUserId()
    }
}
</script>
<style scoped lang="less">
.loaddingview{width: 100%;height: 100%;position: fixed;top:0;left: 0;z-index:999999999;background: #fff}
.loaddingview .loading{position: fixed;top: 35%;left: 50%;margin: -20px 0 0 -20px;width: 40px;height: 40px;border: 2px solid;border-color: #fd4d4d #fd4d4d transparent;border-radius: 50%;box-sizing: border-box;animation: loading 1s linear infinite;z-index: 99999999999999991;}
@keyframes loading{0%{transform: rotate(0deg);}
100%{transform: rotate(360deg);}}
    .wrapper{
        height: 90vh;
        margin-top: .3rem;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
    }
    .headerNavFixed{
        background: #fff;
        height: .88rem;
        border-bottom: 1px solid #E6E6E6;
    }
    .headerNavFixed > div {
        height: .88rem;
        color: #000;
    }
    .header{
        height: 0.89rem;
    }
    .iphonexMarginClass{
        height: 1.26rem;
    }
    .infoList{
        width: 100%;
        padding: 0.4rem 0.3rem 0 0.3rem;
        font-size:16px;
        border-bottom: 0.2rem solid rgba(242,242,242,1);
        .infoHeader{
            height: 0.8rem;
            // overflow: hidden;
            .headerImg{
                width: 0.8rem;
                height: 0.8rem;
                border-radius: 50%;
                float: left;
            }
            dl{
                margin-left: 0.25rem;
                float: left;
                dt{
                    width:4rem;
                    font-size:0.3rem;
                    font-weight:400;
                    // font-size: 0.35rem;
                    color:rgba(227,37,25,1);
                    // margin-bottom: 0.1rem;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                }
                dd{
                    height:0.28rem;
                    font-size:0.24rem;
                    font-weight:400;
                    color:rgba(153,153,153,1);
                    margin-top: 0.1rem
                }
            }
            .floatR{
                // width: 1.6rem;
                float: right;
            }
            .guanBox{
                .yiguan{
                    border:1px solid rgba(255,128,43,1);
                    border-radius:0.5rem;
                    display: flex;
                    align-items:center;
                    justify-content:center; 
                    font-size:0.26rem;
                    color:rgba(255,128,43,1);
                    padding: 0.1rem 0.2rem;
                    img{
                        width:0.24rem;
                        height:0.24rem;
                        margin-right: 0.1rem;
                    }
                }
                .weiguan{
                    border:1px solid #D9D9D9;
                    border-radius:0.5rem;
                    display: flex;
                    align-items:center;
                    justify-content:center;
                    font-size:0.26rem;
                    background:#fff;
                    color: #4D4D4D;
                    padding: 0.1rem 0.2rem;
                    img{
                        width:0.24rem;
                        height:0.24rem;
                        margin-right: 0.1rem;
                    }
                }
            }
            .delImg{
                width: 1.36rem;
                height:0.38rem;
                margin-top: 0.15rem;
                img{
                    width: 0.36rem;
                    height:0.38rem;
                    float: right;
                }
            }
            .dele3{
                width: 1.36rem;
            }
            
        }
        .listCont{
            width: 100%;
            margin-top: 0.3rem;
            .ding{
                // font-size: 0.2rem;
                display: flex;
                color: #fff;
                flex-direction: row;
                // margin-right: 0.2rem;
                margin-top: 0.03rem;
                float: left;
                p{
                    margin-right: 0.12rem;
                    width:0.4rem;
                    height:0.4rem;
                    background:rgba(245,69,69,1);
                    border-radius:0.1rem;
                    text-align: center;
                    font-size:0.2rem;
                    line-height: 0.44rem;
                }
                .ding1{
                    background:rgba(255,172,56,1);
                }
                .ding2{
                    background:rgba(255,133,71,1);
                }
                
            }
            
            .ding p:nth-last-child(1){
                margin-right: 0.2rem;
            }
            .centxt{
                line-height: 0.5rem;
                font-size:0.3rem;
                font-weight:400;
                color:rgba(26,26,26,1);
                .fenlei{
                    color:#576B95;
                }
            }
        }
        .listcontent{
            margin: 0.3rem 0;
            width:100%;
            background:rgba(247,247,247,1);
            display: flex;
            .describe{
                font-size: 0.28rem;
                flex:1;
                padding: 0.37rem 0.26rem 0.24rem 0.5rem ;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
            }
        }
        .listImg{
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            margin-top: 0.3rem;
            div{
                width:2.2rem;
                height:2.2rem;
                margin: 0 0.15rem 0.15rem 0;
                background-position: center;
                background-repeat: no-repeat;
                background-size:cover; 
            }
            .zoomPic{
                width:3.5rem;
                height:2.8rem;
            }
            
        }
        .listImg div:nth-child(3n){
            margin-right:0;
        } 
        .listLoca{
            width: 100%;
            display: flex;
            justify-content: space-between;
            margin-top: 0.3rem;
            
            padding-bottom: 0.2rem;
            .quan{
                height:0.36rem;
                padding: 0 0.1rem;
                line-height: 0.36rem;
                background:rgba(227,37,25,1);
                border-radius:0.36rem;
                font-size:0.22rem;
                color: #fff;
                text-align: center;
            }
            img{
                width:0.19rem;
                height:0.28rem;
                margin: 0.1rem 0 0 0.2rem;
            }
            .locas{
                width:2.36rem;
                height:0.5rem;
                background:rgba(249,247,248,1);
                display: flex;
                span{
                    height:0.26rem;
                    font-size:0.26rem;
                    display: inline-block;
                    padding:0.1rem 0 0 0.12rem; 
                    font-family:SourceHanSansCN-Regular;
                    font-weight:400;
                    color:rgba(102,102,102,1);
                    text-align: center;
                    line-height: 0.26rem;
                }
            }
        }
        .share{
            width: 100%;
            display: flex;
            justify-content:space-between; 
            border-top: 1px solid rgba(230,230,230,1);
            color:rgba(102,102,102,1);
            padding: 0.2rem 0.3rem;
            li{
                display: flex;
                align-items: center;
                min-height: 0.4rem;
            }
            img{
                width: 0.32rem;
                height: 0.32rem;
                margin-right: 0.1rem;
            }
            .shareBut{
                margin-left: 0.1rem;
            }
            .itemLike{
                min-width: 0.6rem;
                img{
                    float: left;
                }
            }
        }
    }

</style>