<template>
<!-- style="display:none"为临时隐藏评论 -->
   <div class="top" >
        <div class="comments-start" v-for="(section,index) in comments" :key="index" >
            <div class="leftcomments-img">
                    <!-- <img :src='apis.theme.imgHost+JSON.parse( getStorge ).imgurl' v-if="imgurl!=null"/> -->
                    <img :src='apis.theme.imgHost+section.portraitUrl' v-if="section.portraitUrl!=null"/>
                    <img :src='"~@/assets/img/head.png"' v-else/>
                    <!-- <img :src='"~@/assets/img/"+apis.getTheme()+"/me/dafultImg.png"' v-else/> -->
            </div>
            <div class="rightcomments-img">
                <div class="right-middles">
                    <!-- <div class="left-names"> {{section.receiverUser.personName}}</div> -->
                     <div class="left-names" >{{section.commentUser.personName}}</div> 
                    <div class="right-zan" @click="eventLiked(index)"><img :src="section.like? dianzanUrl:canceUrl"/><span v-if="section.likeNum==null">0</span><span v-else>{{section.likeNum}}</span></div>
                </div>
                <!-- zan-select.png -->
                <div class="coments-cont" v-if="section.type==0">{{section.content}}</div>
                <div class="coments-cont" v-else-if="section.type==1">{{section.content}}</div>
                <div class="coments-cont" v-else-if="section.type==2">{{section.content}}</div>
                <div class="coments-cont"  v-else-if="section.type==3">{{section.content}}//<span v-if="section.receiverUser!=null">@{{section.receiverUser.personName}}</span>: {{section.beContent}}</div> 
                <div class="coments-cont" v-else-if="section.type==4">{{section.content}}</div>
               <div class="coments-endbottom"><span>{{times(section.commentTime)}}</span>
                <font @click="replayClik(section.commentId,section.like,section.likeNum,section)" v-if="section.type==0 || section.type==2">
                    <template v-if="section.commentNum>0">{{section.commentNum}}回复</template>
                     <template v-else>回复</template>
                 </font>
                 <font v-else-if="section.type==3 || section.type==1 || section.type==4" @click="addconts(section.userId,section.username,section.content,section)">
                    <template v-if="section.commentNum>0">{{section.commentNum}}回复</template>
                     <template v-else>回复</template>
                 </font>
                  <div class="deletes" v-if="userDataid==section.userId" @click="deletes(index)">删除</div>  
                 </div>
            </div>
        </div>
        <div v-if="comments.length==0" class="noReply" :class="iphonexPadding ? 'iphonexMarginClass':'' ">
          <img :src='"~@/assets/img/onReply.png"'>
          <span>还没有评论，快来抢沙发~</span>
        </div>
  </div>
</template>
<script>

import api from '../../src/assets/js/api.js'
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
      props: {
        comments: {
            default: ''
        }
    },
    data(){
        return{
            dianzanUrl:require("../assets/img/zan-select.png"),
            canceUrl:require("../assets/img/zan-gray.png"),
            userDataid:'',
            imgurl:'',
            isShow:false,
            iphonexPadding:false,
            puyang:true
        }
    },
    created(){
      let userDataid=JSON.parse(localStorage.getItem("userData"));
      if(userDataid){
        this.userDataid=userDataid.user_id;
        this.imgurl=userDataid.imgurl;
      }else{
        this.userDataid=''
        this.imgurl='';
      }
      
      
      if(this.apis.getTheme() == 'puyang'){
        this.puyang=false
      }
    },
      computed: {
    ...mapGetters("login", [
      "getStorge" // active的栏目
    ])
  },
  methods: {
      deletes(index){
         this.$emit("dele",index)
      },
      replayClik(id,isLiked,likedNum,sections){
          this.$emit("replayClikCallback",id,isLiked,likedNum,sections)
      },
      eventLiked(index){
          this.$emit("likedClickCallback",index)
        //   this.dianzanUrl = '../assets/img/zan-select.png';
      },
      addconts(commentId,username,content,section){
        this.$emit("addcontsback",commentId,username,content,section)
      },
      times: api.timesdata
  },
  mounted(){
    if( this.apis.iphonexPaddingFn() ){
      this.iphonexPadding = true;
    }
  }
}

</script>
<style lang="stylus" scoped>
.comments-start{width:100%; overflow hidden; margin-bottom:0.42rem; padding-top:0.2rem}
.comments-start .leftcomments-img{width:0.7rem; height:0.7rem; float:left }
.comments-start .leftcomments-img img{width:0.7rem; height:0.7rem; border-radius:100px}
.comments-start .rightcomments-img{width:85%; float:right}
.comments-start .rightcomments-img .right-middles{ width:100%; overflow:hidden}
.comments-start .rightcomments-img .right-middles .left-names{ color:#576b95; font-size:0.32rem;width:60%; float:left;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;}
.comments-start .rightcomments-img .right-middles .right-zan{ float:right; font-size:0.24rem; color:#666;}
.comments-start .rightcomments-img .right-middles .right-zan img{width:0.4rem; height:0.4rem;
vertical-align:middle;display:inline-block; margin-right:0.1rem }
.comments-start .rightcomments-img .right-middles .right-zan span{position:relative; top:0.08rem}
.rightcomments-img .coments-cont{ color:#262626; font-size:0.34rem; margin-top:0.2rem}
.rightcomments-img .coments-cont span{color:#576b95}
.coments-endbottom{color:#999999; font-size:0.24rem; }
.coments-endbottom span{padding-top:0.25rem; display:inline-block}
.coments-endbottom font{ display:inline-block; color:#262626; background:#f5f5f5; margin-left:0.28rem; padding:0.1rem 0.2rem;border-radius:50px;}
.deletes{font-size:0.26rem;  display:inline-block; float:right; margin-top:0.3rem }
.noReply{
  height:2rem;
  font-size :16px;
  color:#b3b3b3;
  margin:0.3rem 0 0.3rem 1.4rem;
  img{
    display block;
    width:4rem;
    height:2.2rem;
    margin-bottom :0.2rem;
  }
  span{
    margin-left:0.33rem;
  }
}
.iphonexMarginClass{ margin-bottom:1.5rem; }
</style>
