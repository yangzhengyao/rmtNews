<template>
  <div id="articleDetail">
    <header class="headerNavFixed">
      <div class="nvbt ibackBack" @click="apis.iback()"></div>
      <div class="nvtt">{{typeId}}</div>
    </header>

    <div class="container contentNavFixed" style="margin-top:.14rem">
       <topic-list></topic-list>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import TopicList from '../../../components/navBottom/infoList/TopicList'
import Bus from '@/Bus';
import axios from "axios";
import qs from "qs";
//引入主页
import { Header } from "mint-ui";
import { Toast } from "mint-ui";
import noData from "components/noData.vue";
// const root = process.env.API_ROOT;
export default {
  name:'topicCircleList',
  // props: ["type","typesIds"],
  data() {
    return {
      typeId:"",
      initParams: {},
      headerJson: {}, //mock数据
      json: [],
      teamList:[],
      topicId:'',
      pageNum:1,
      pageSize:10,
      app_info_id:this.apis.theme.api.appInfoId,
      loginUserId:3484,
      type:'',//话题圈子判断
      judgment:''
    };
  },
  components: {
    noData,
    TopicList
  },
  computed: {
    ...mapGetters("login", [
      "getStorge" // active的栏目
    ])
  },
  methods: {
     
     detailsupdates(){
      var thire = JSON.parse(localStorage.getItem('topicCircleList'));
      this.typeId = thire.typeId;
      this.type = thire.type;
      this.judgment =thire.judgment;
      if(this.type==1||this.judgment===456){
          this.typeId="话题"
          this.sensitiveinformation();
          Bus.$emit("teamlos",{type:this.type});
      }else if(this.type==3||this.judgment===123){
          this.typeId="圈子"
          this.sensitiveinformationso()
      }
    },
    sensitiveinformationso(){//圈子
            this.axios({
                method:"post",
                url:this.apis.theme.api.community.getThemeTop,
                data:{
                    pageNo:this.pageNo,
                    pageSize:this.pageSize,
                    appInfoId:this.app_info_id,
                }
            }).then(res => {
				this.teamList=res.data.data
        Bus.$emit("teamListso",{teamList:this.teamList,judgment:3})
        })
      },
    sensitiveinformation(){//话题
      this.axios({
                method:"post",
                url:this.apis.theme.api.community.selectTopicByParam,
                data:{
                    pageNo:this.pageNo,
                    pageSize:this.pageSize,
                    appInfoId:this.app_info_id,
                }
            }).then(res => {
				this.teamList=res.data.data
				Bus.$emit("teamListso",{teamList:this.teamList,judgment:1});
      })
    }
  },
  mounted() {
    this.detailsupdates()
  },
};
</script>
<style scoped lang='less'>
.headerNavFixed{
  background:#fff
}
.nvtt{
  font-size:0.38rem;
  font-weight:500;
  color:#1A1A1A;
}

@import "../../../assets/communityIcon/iconfont.css";

</style>
