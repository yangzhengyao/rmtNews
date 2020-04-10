<template>
    <div class="topicBox">
        
        <!-- <h1>6</h1>
        <button>点击</button> -->
        <div class="joinList" v-for="(item,index) in teamList" :key="index"> <!-- 通过data中joinList遍历 -->
            <img :src="item.topicPic" alt="" class="joinImg1">
            <dl v-if="type==1" @click="jumpdetails(item, item.topicId, 1)">
                <dt>
                    #{{item.topicName}}#
                </dt>
                <dd>
                    <span>{{item.synopsis}}</span>
                    <span class="circ" v-if="isCircle">乐山圈</span>
                </dd>
            </dl>
            <dl v-if="type==3" @click="jumpdetails(item, item.themeId, 3)">
                <dt>
                    {{item.themeName}}
                </dt>
                <dd>
                    <span>{{item.synopsis}}</span>
                    <span class="circ" v-if="isCircle">乐山圈</span>
                </dd>
            </dl>
            <img src="./image/del.png" alt="" class="joinImg2" v-if="isDel">
        </div>
    </div>
</template>
<script>
import api from "../../../../src/assets/js/api.js";
import Bus from '@/Bus';
export default {
    name: 'TopicList',
    props:['isShow'],
    data() {
        return {
            judgment:'',
	        appInfoId:this.apis.theme.api.appInfoId,
            pageNo:1,
            pageSize:100,
            teamList:[],
            topicId:'',
            isCircle:true,
            isDel:false,
            type:"",
            thire:'',//页面返回
            topiOrcir:true,
            fulltopic:'',
            autoId:'',
            quanziTitle:""
        }
    },
    components: {

    },
    watch: {
        
    },
    methods: {
        
         detailsupdate(){
            let thire = JSON.parse(localStorage.getItem('topicCircleList')).judgment;
            let type = JSON.parse(localStorage.getItem('topicCircleList')).type;
            this.thire=thire;
            this.type=type;
        },
        jumpdetails(item, topicIdo, judgment){
            console.log(item, topicIdo, judgment, this.thire, this.type)
            // let userDataid = JSON.parse(localStorage.getItem("userData"));
            // if (userDataid == null) {
            //     this.apis.urlParams("Login");
            //     return false;
            // }
            if(this.thire==123||this.thire===456){
                localStorage.setItem('publishHuati',JSON.stringify(item))
                
                this.apis.iback();
             }else if(this.type==1||this.type==3){
                 console.log(this.fulltopic)
                 if(this.fulltopic==4){
                    // this.apis.urlParams("topicCircleDetail",{params:topicIdo,fulltopic:this.fulltopic,autoId:this.autoId});//跳转圈子/话题 详情
                    this.apis.urlParams("topicCircleDetail",{params:topicIdo,typeId:"话题",type:1,autoId:this.autoId},false);
                 }else{
                    this.apis.urlParams("topicCircleDetail",{params:topicIdo});//跳转圈子/话题 详情
                 }
                Bus.$emit("temonentas",{judgment});
                //  this.apis.iback();
             }
            
        },
       
    },
    mounted() {
        this.isCircle = this.isShow;
        this.detailsupdate();
        
        plus.webview.getWebviewById(window.location.href.split('#/')[0]+'#/'+"publish").addEventListener(
        "close",() =>{
          let locals = JSON.parse(localStorage.getItem('publishHuati'));
          
          if(this.quanziTitle!==locals){
            this.quanziActive = locals.themeName; //修改自动切换圈子标题
          }
        },
      );
         
         
    },
    created(){
         
          Bus.$on('teamListso',(val) =>{
            this.teamList = val.teamList;
            this.type = val.judgment;
            this.fulltopic = val.fulltopic;
            this.autoId=val.autoId
        });
        if(localStorage.getItem('publishHuati')){

        this.quanziTitle=JSON.parse(localStorage.getItem('publishHuati'));
        }
    }
}
</script>
<style lang='less'>
    .topicBox{
        width: 100%;
        font-size: 16px;
        background:#fff;
        .joinTop{
            height:0.62rem;
            line-height: 0.62rem;
            background:rgba(239,239,239,1);
            font-size:0.26rem;
            color:rgba(128,128,128,1);
            font-family:SourceHanSansCN-Regular;
            padding-left: 0.4rem;
            span{
                color: #E32519;
            }
        }
        .joinList{
            width: calc(100% - 0.6rem);
            display: flex;
            padding: 0.28rem 0 ;
            margin: 0 0.3rem;
            border-bottom: .01rem solid #D9D9D9;
            background:#fff;
            .joinImg1{
                width: 1rem;
                height: 1rem;
                border: 1px solid #e5e5e5;
                margin-right: 0.3rem;
            }
            .joinImg2{
                width: 0.36rem;
                height:0.38rem;
                margin-top: 0.35rem;
            }
            dl{
                width: 5.2rem;
                dt{
                    font-size:0.36rem;
                    font-family:SourceHanSansCN-Regular;
                    color:rgba(87,107,149,1);
                }
                dd{
                    font-size:0.24rem;
                    font-family:SourceHanSansCN-Regular;
                    color:rgba(102,102,102,1);
                    margin-top: 0.15rem; 
                    .circ{
                        display: inline-block;
                        width:1rem;
                        height:0.36rem;
                        line-height: 0.36rem;
                        background:rgba(227,37,25,1);
                        border-radius:0.36rem;
                        text-align: center;
                        color: #fff;

                    }
                }
            }
        }
    }
</style>