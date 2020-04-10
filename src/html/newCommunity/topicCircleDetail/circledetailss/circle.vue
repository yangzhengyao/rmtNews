<template>
    <div class="circles">
        <div class="back-list">
            <img src="./images/fanhui_03.png" alt="">
            <h2>招聘求职</h2>
        </div>
        <div class="thepicture">
            <img src="./images/banner_02.png" alt="">
            <div class="heades">
                <div class="haddersimg">
                    <img src="./images/head_03.jpg" alt="">
                </div>
                
                <div class="titles">
                    <h2>招聘求职<span>1003条动态</span></h2>
                    <h3>XX本地发布职位，找工作，快加入吧~</h3>
                </div>
            </div>
        </div>
        <div class="navigation">
            <div class="navigat">
                <span :class="{'seletecd':type == 0}" @click="switchs(0)">最新
                    <i v-if="type == 0"></i>
                </span>
                <p></p>
                <span :class="{'seletecd':type == 1}" @click="switchs(1)">最赞
                    <i v-if="type == 1"></i>
                </span>
            </div>
        </div>
        <div class="contents">
                <updates v-if="type==0"></updates>
                <mostgreat v-if="type==1"></mostgreat>
        </div>
    </div>
</template>
<script>
import updates from "./updates/updates"
import mostgreat from "./mostgreat/mostgreat"
export default {
    name:"circles",
    data(){
        return {
            type:0
        }
    },
    methods:{
        switchs(type){
            this.type=type;
        }
    },
    components:{
        updates,
        mostgreat
    }
}
</script>
<style scoped lang="less">
.circles{
    display:flex;
    flex-direction: column;
    width:100vw;
    height:100vh;
}
    .back-list{
        width:7.5rem;
        height:0.88rem;
        display:flex;
        position:relative;
        justify-content: center;
        img{
            left:0.3rem;
            top:0.29rem;
            position:absolute;
            width:0.16rem;
            height:0.3rem;
        }
        h2{
            height:0.88rem;
            line-height:0.88rem;
            font-size:0.38rem;
            font-weight:500;
            color:rgba(26,26,26,1);
        }
    }
    .contents{
        flex:1;
        overflow: auto;
        background: #fff;
    }
    .thepicture{
        width:7.5rem;
        height:2.2rem;
        position:relative;
        img{
            width:7.5rem;
            height:2.2rem;
        }
        .heades{
            position:absolute;
            top:0;
            left:0;
            width:7.5rem;
            height:2.2rem;
            display:flex;
            align-items: center;
            .haddersimg{
                width:1.85rem;
                height:2.2rem;
                display:flex;
                justify-content: center;
                align-items:center;
                img{
                    width:1.2rem;
                    height:1.2rem;
                }
            }
            .titles{
                width:5.56rem;
                height:2.2rem;
                span{
                    margin-left:0.25rem;
                    padding:0.1rem 0.17rem;
                    background:rgba(227,37,25,1);
                    border-radius:0.4rem;
                    font-size:0.24rem;
                    color:rgba(255,255,255,1);
                }
                h2{
                    padding-top:0.48rem;
                    width:100%;
                    height:0.45rem;
                    font-size:0.48rem;
                    font-weight:400;
                    color:rgba(255,255,255,1);
                }
                h3{
                    width:100%;
                    padding-top:0.74rem;
                    height:0.12rem;
                    font-size:0.28rem;
                    font-weight:400;
                    color:rgba(255,255,255,1);
                }
            }
        }
    }
    .navigation{
        height:0.94rem;
        border-bottom:0.01rem solid rgba(230,230,230,1);
        display:flex;
        align-items: center;
        .navigat{
            display:flex;
            justify-content: space-around;
            height:0.29rem;
            width:100%;
            .seletecd{
                color:red;
            }
            span{
                height:0.29rem;
                font-size:0.3rem;
                font-weight:400;
                color:rgba(153,153,153,1);
                padding:0 1.3rem 0.05rem 1.3rem;
                position:relative;
                 i{
                border-bottom: .05rem solid red;
                position: absolute;
                z-index: 11111;
                width: 30px;
                left: 42%;
                bottom: -.32rem;
                }
            }
           
            p{
                width:0.01rem;
                height:0.28rem;
                background:rgba(217,217,217,1);
            }
        }
    }
</style>
