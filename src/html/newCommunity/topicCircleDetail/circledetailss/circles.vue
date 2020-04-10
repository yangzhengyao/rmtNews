<template>
    <div class="circles">
        
            <!-- <div class="navigation">
                <div class="navigat">
                    <span :class="{'seletecd':typea == 0}" @click="switchs(0)">最新
                        <i v-if="typea == 0"></i>
                    </span>
                    <p></p>
                    <span :class="{'seletecd':typea == 1}" @click="switchs(1)">最赞
                        <i v-if="typea == 1"></i>
                    </span>
                </div>
            </div> -->

        <div class="contents container swiper-box-special circle-detail"
            v-infinite-scroll="loadBottomAjax"
			infinite-scroll-disabled="bottomLock"
			infinite-scroll-distance="10"
			infinite-scroll-immediate-check="false">
            <div class="thepicture">
                <img class="imgsone" :src="listupent.background" alt="">
                <div class="heades">
                    <div class="haddersimg">

                        <img :src="listupent.topicPic" alt="">
                    </div>
                    
                    <div class="titles">
                        <h2>
                            {{themoNames}}
                        </h2>
                        <h3>{{listupent.synopsis}}</h3>
                    </div>
                </div>
            </div>
                <info-list></info-list>
                <!-- <GreatList v-if="typea ==1"></GreatList> -->
             <!-- 底部提示 -->
            <div class="bottomLoad" v-if="listxpen.length > 0">
                <div class="loading" v-show="bottomLoading">加载中...</div>
                <div class="noData" v-if="bottomNoData">没有更多的内容了</div>
            </div>
        </div>
        
    </div>
</template>
<script>
import api from "../../../../../src/assets/js/api.js";
import qs from "qs";
import InfoList from "../../../../components/navBottom/infoList/InfoList"
import GreatList from "../../../../components/navBottom/infoList/GreatList"
import updates from "./updates/updates"
import Bus from '@/Bus';
export default {
    name:"circles",
    data(){
        return {
            bottomNoData: false,    // 底部nothing
            bottomLock: false, 
            bottomLoading: false,    // 底部loading
            listxpen:[],
            itemateId:'',
            pageNo:2,
            pageNum:1,
            pageSize:10,
            app_info_id:this.apis.theme.api.appInfoId,
            listupent:[],
            themoNames:'',
            userDataid:"",
            typea:0,
            type:1,
            topiOrcir:true,
            isShow:false,
            datanumber:'',
            topicName:'',
            themDataid:'',
            topicType:1,
            autoId:'',
            screening:''
        }
    },
    methods:{
         detailsupdate(){
            var thire = JSON.parse(localStorage.getItem('topicCircleDetail'));//动态直接进来
            this.autoId = thire.autoId
            // alert(this.autoId)
            this.screening = thire.screening
            this.itemateId = thire.params;
            let userDataid=JSON.parse(localStorage.getItem("userData"));
            console.log(userDataid, "userDataiduserDataid");
            if(userDataid === null){
                this.themDataid="";
            }else{
                this.themDataid=userDataid.user_id;
            }
            // this.themDataid=userDataid.user_id;
            let type = JSON.parse(localStorage.getItem("topicCircleList")).type;
            this.topicType = type;
        },
        switchs(typea){
            this.typea=typea;
            if(this.typea==0){
                this.sensito();
            }else if(this.typea==1){
                this.themostgreat()
            }
            
        },
        getParams(){
            console.log(this.themDataid !== null, this.themDataid,"this.themDataidthis.themDataidthis.themDataid")
            if(this.themDataid !== null){
                let obj = {
                    pageNum:this.pageNum,
                    pageSize:this.pageSize,
                    loginUserId:this.themDataid,
                    user_id:this.autoId,
                    app_info_id:this.app_info_id,
                    };
                
                if(this.topicType == 3){
                    obj.theme_id = this.itemateId;
                }else{
                    obj.topic_id = [this.itemateId];
                }
                return obj
            }else{
                let obj = {
                    pageNum:this.pageNum,
                    pageSize:this.pageSize,
                    user_id:this.autoId,
                    // app_info_id:parseInt(this.app_info_id),
                    app_info_id:this.app_info_id,
                    };
                if(this.topicType == 3){
                    obj.theme_id = this.itemateId;
                }else{
                    obj.topic_id = [this.itemateId];
                }
                return obj
            }
            
        },
    //      //最赞
    //    mostGreat(){
    //             let obj = {
    //                 pageNum:this.pageNum,
    //                 pageSize:this.pageSize,
    //                 user_id:this.themDataid,
    //                 };
    //             if(this.topicType == 3){
    //                 obj.theme_id = this.itemateId;
    //             }else{
    //                 obj.topic_id = [this.itemateId];
    //             }
    //             return obj
    //     },
        
        //上滑加载
        loadBottomAjax(){
            this.pageNum++;
            // if(this.typea ==0){
               if(!this.bottomNoData){//没有更多内容了
                    this.bottomLock = true;
                    this.bottomLoading = true;
                    this.axios({
                        method:"post",
                        url:this.apis.theme.api.community.getStateList,
                        data:this.getParams(),
                        }).then(res => {
                            if(res.data.data.blog.length > 0){
                                this.listxpen.push(...res.data.data.blog);
                                Bus.$emit("stateList",this.listxpen);
                                this.datanumber=res.data.total;
                                // this.pageNum++;
                            }else{
                                this.bottomNoData =true
                            }
                            this.bottomLoading = false
                            this.bottomLock = false
                        })
                }
            // }else if(this.typea ==1){
            //     if(!this.bottomNoData){//没有更多内容了
            //         this.bottomLock = true;
            //         this.bottomLoading = true;
            //         this.axios({
            //             method:"post",
            //             url:this.apis.theme.api.community.getHighLike,
            //             data:this.mostGreat(),
            //             }).then(res => {
            //                 if(res.data.data.length > 0){
            //                     this.listxpen.push(...res.data.data);
            //                     Bus.$emit("stateList",this.listxpen);
            //                     this.datanumber=res.data.total;
            //                     // this.pageNum++;
            //                 }else{
            //                     this.bottomNoData =true
            //                 }
            //                 this.bottomLoading = false
            //                 this.bottomLock = false
            //             })
            //     }
            // }
       },
       //接口调用
       sensito(){
            this.axios({
            method:"post",
            url:this.apis.theme.api.community.getStateList,
            data:this.getParams(),
            }).then(res => {
                if(res.data.data.blog.length > 0){
                    this.listxpen=res.data.data.blog
                    Bus.$emit("stateList",this.listxpen);
                    this.datanumber=res.data.total
                    Bus.$emit('islnfoListIn',true);
                }else{
                    Bus.$emit('islnfoListIn',false);
                }
                
            })
       },
       
    // //    最赞接口
    //    themostgreat(){
    //        this.axios({
    //         method:"post",
    //         url:this.apis.theme.api.community.getHighLike,
    //         data:this.mostGreat()
    //         }).then(res => {
    //             console.log(res,'------------------')
    //             if(res.data.data.length > 0){
    //                 this.listxpen=res.data.data
    //                 Bus.$emit("stateList",this.listxpen);
    //                 this.datanumber=res.data.total
    //                 Bus.$emit('islnfoListIn',true);
    //             }else{
    //                 Bus.$emit('islnfoListIn',false);
    //             }
    //         })
    //    },
    //    getDataid(){
	// 		let userDataid = JSON.parse(localStorage.getItem("userData"));
	// 		if( userDataid !== null){
	// 			this.userDataid = userDataid.user_id;
	// 		}else{
	// 			this.userDataid = false;
	// 		}
	// 	},
    },
    components:{
        updates,
        InfoList,
        GreatList
    },
    mounted(){
        // this.getDataid();
        this.detailsupdate();
        this.sensito();
        
        Bus.$on('stlists',(val) =>{
          this.listupent=val.listupent;
          this.type = val.type;
          if(this.type==1){
              this.isShow=false;
              this.themoNames = '#'+this.listupent.topicName+'#'
          }else if(this.type==3){
              this.isShow=true;
              this.themoNames = this.listupent.themeName;
              this.datanumber= val.datanumber+'条动态';
          }
      });
     
    },
    created(){
    //     Bus.$on('userlistId',val=>{
    //       let autoId = val.autoId;
    //   })
    }
}
</script>
<style scoped lang="less">
.bottomLoad{
    padding-bottom:1rem;
}
.circles{
    overflow:auto;
    display:flex;
    flex-direction: column;
    padding-top:0.08rem;
    width:100vw;
    height: calc(100vh - 1rem);
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
        background: #fff;
    }
    .thepicture{
        width:7.5rem;
        height:2.2rem;
        position:relative;
        background:#666666;
        .imgsone{
            opacity: 0.4;
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
                color:#be2c1f;
            }
            span{
                height:0.29rem;
                font-size:0.3rem;
                font-weight:400;
                color:rgba(153,153,153,1);
                padding:0 1.3rem 0.05rem 1.3rem;
                position:relative;
                 i{
                border-bottom: 2px solid #be2c1f;
                position: absolute;
                z-index: 11111;
                width: 0.4rem;
                height:2px;
                left: 43%;
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
