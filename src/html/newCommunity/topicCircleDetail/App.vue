<template>
  <div id="articleDetail">
    <header class="headerNavFixed">
      <div class="nvbt ibackBack" @click="apis.iback()"></div>
      <div class="nvtt">{{typeId}}</div>
    </header>

    <div
      class="container contentNavFixed">
      <!-- 话题以及圈子详情，根据值来判断 -->
      <circles></circles>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import api from "../../../../src/assets/js/api.js";
import circles from "./circledetailss/circles";
import axios from "axios";
import Bus from "@/Bus";
import qs from "qs";
//引入主页
import { Header } from "mint-ui";
import { Toast } from "mint-ui";
import noData from "components/noData.vue";
// const root = process.env.API_ROOT;
export default {
  // props: ["type"],
  data() {
    return {
      // bottomLock: false,
      // loading: false,
      // bottomLoading: false, // 底部loading
      // bottomNoData: false, // 底部nothing
      userDataid: "",
      pageNo: 1,
      pageSize: 10,
      app_info_id: this.apis.theme.api.appInfoId,
      itemateId: "",
      listupent: [],
      listxpen: [],
      datanumber: 0,
      initParams: {},
      headerJson: {}, //mock数据
      json: [],
      judgment: "", //话题圈子
      typeId: "",
      type:1,
      user_id:'',
      fulltopic:''
    };
  },
  components: {
    noData,
    circles
  },
  computed: {
    ...mapGetters("login", [
      "getStorge" // active的栏目
    ])
  },
  methods: {
    detailsupdate() {
      var thire = JSON.parse(localStorage.getItem("topicCircleDetail"));//列表点进来的id
      this.typeId = thire.typeId
      // console.log(this.type,'999999999999')
      let userDataid = JSON.parse(localStorage.getItem("userData"));//用户id
      if(userDataid === null){
            this.user_id="";
        }else{
            this.user_id=userDataid.user_id;
        }
      // this.user_id=userDataid
      let type = JSON.parse(localStorage.getItem("topicCircleList")).type;
      this.itemateId = thire.params;
      this.fulltopic=thire.fulltopic;
      this.type = type;
       
      // alert(this.type)
      if (this.type == 1) {
        this.typeId = "话题";
        this.sensitveinformation();
      } else if (this.type == 3) {
        this.typeId = "圈子";
        this.sensitveinformationss();
      };
      if( this.fulltopic==4){
          // alert("大功告成")
      }
    },

    sensitveinformation() {
      //话题详情
      this.axios({
        method: "post",
        url: this.apis.theme.api.community.selectTopicById,
        data: {
          topicId:this.itemateId
        }
      }).then(res => {
        this.listupent = res.data.data[0];
        Bus.$emit("stlists", { listupent: this.listupent, type: 1 });
      });
    },
    sensitveinformationss() {
      //圈子详情
      this.axios({
        method: "post",
        url: this.apis.theme.api.community.selectThemeById,
        data: {
          themeId: this.itemateId
        }
      }).then(res => {
        this.listupent = res.data.data[0];
        this.datanumber = res.data.total;
        Bus.$emit("stlists", {
          listupent: this.listupent,
          datanumber: this.datanumber,
          type: 3
        });
      });
    },
    sensito() {
      // this.getDataid();
      if (this.userDataid) {
        var postData = {
          topic_id: [this.itemateId],
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          app_info_id: this.app_info_id,
          loginUserId: this.userDataid,
        };
      } else {
        var postData = {
          topic_id: [this.itemateId],
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          app_info_id: this.app_info_id,
        };
      }
      this.axios({
          method: "post",
          url: this.apis.theme.api.community.getStateList,
          data: postData
      }).then(res => {
            this.listxpen = res.data.data.blog;
            Bus.$emit("stateLists", this.listxpen);
            this.datanumber = res.data.total;
        })
      },
      
    sensitosa() {
      // this.getDataid();
      if (this.userDataid) {
        var postData = {
          theme_id: this.itemateId,
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          app_info_id: this.app_info_id,
          loginUserId: this.userDataid
        };
      } else {
        var postData = {
          theme_id: this.itemateId,
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          app_info_id: this.app_info_id
        };
      }
      this.axios({
        method: "post",
        url: this.apis.theme.api.community.getStateList,
        data: postData
      })
        .then(res => {
          this.listxpen = res.data.data.blog;
          Bus.$emit("stateLists", this.listxpen);
          this.datanumber = res.data.total;
        })
    },
    // getDataid() {
    //   let userDataid = JSON.parse(localStorage.getItem("userData"));
    //   if (userDataid !== null) {
    //     this.userDataid = userDataid.user_id;
    //   } else {
    //     this.userDataid = false;
    //   }
    // }
  },
  created() {
    Bus.$on("temonentas", val => {
      // this.judgment = val.judgment;
    });
  },
  mounted() {
    Bus.$on("topicId", val => {
      this.itemateId = val;
    });
    Bus.$on("teamListso", val => {
      this.judgment = val.judgment;
    });
    
      this.detailsupdate();
      // this.sensito();
      // this.sensitosa();
      if(this.judgment==1){
          this.sensitveinformation(); //话题详情上部
      }else if(this.judgment==3){
          this.sensitveinformationss(); //圈子详情上部
      }
      
      
  }
  
};
</script>
<style scoped lang='less'>
@import "../../../assets/communityIcon/iconfont.css";
#articleDetail{
  overflow:hidden;
  height: calc(100vh - 0.08rem);
}
.headerNavFixed {
  background: #fff;
}
.nvtt {
  font-size: 0.38rem;
  font-weight: 500;
  color: #1a1a1a;
}
</style>
