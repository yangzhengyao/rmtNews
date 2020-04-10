<template>
    <div
    class="newsB container nesbox circBox wrapper"  
    v-infinite-scroll="loadBottomAjax"
    infinite-scroll-disabled="bottomLock"
    infinite-scroll-distance="10"
    infinite-scroll-immediate-check="false"
    >
        <div v-if="isActivelist">
            <div
            v-for="(item,index) in ActivList"
            :key="index"
            @click.stop="goSignUp(item)"
            @touchmove="touchmoveFunc()">
                <div class="favTime">{{item.favTime}}</div>
                <div class="activty-start">
                    <div class="activty-left" :style="{'background-image':'url('+item.titlePicUrl+')'}"></div>
                    <div class="activty-right">
                        <div class="activty-title">{{item.name}}</div>
                        <div class="activty-times">{{formateDate(item.startTime,0)}}-{{formateDate(item.endTime,0)}}</div>
                        <div class="activty-address">{{item.activitiesZone}}</div>
                    </div>
                    <div class="activty-end">
                        <div class="free-admission">
                        <div class="free-admission-title">{{item.perCost.length == 0?"免费":item.perCost+"元"}}</div>

                        <div class="free-admission-name">{{formateDate(item.signUpEndTime,1)}} 截止报名</div>
                        </div>
                        <div class="free-admission-right">
                        <div class="free-button" v-if="item.signUpStatus =='1'">报名中</div>
                        <div class="free-button bth-gray" v-else>已结束</div>
                        <div class="free-numbers">
                            <font>{{item.singUpNum}}</font>/
                            <span v-if="item.singUpCeiling==null">0</span>
                            <span v-else>{{item.singUpCeiling}}</span>人
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="!isActivelist" class="zanWu">暂无收藏</div>
    </div>
</template>

<script>
import Bus from "@/Bus";
export default {
  data() {
    return {
      ActivList: [],
      isActivelist:true,
      bottomLock: false,      // 上滑开关
      bottomLoading: false,    // 底部loading
      bottomNoData: false,    // 底部nothing
      userDataid:'',
      pageNo:2,
      pageSize:10,
      infoList:[],
      searchContent:''
    };
  },
  methods: {
    //时间格式处理
    formateDate(dateStr, type) {
      return type == 0
        ? dateStr.slice(0, -3).replace(/-/g, "/")
        : dateStr.slice(5, -3).replace(/-/g, "/");
    },
    
    touchmoveFunc() {
            if (window.trackingClickSelf) {
                window.trackingClickSelf = false;
            }
    },
    //去报名 参数id是活动id
        goSignUp(item){
            var that=this;
             if( localStorage.getItem( 'userData' ) != null ){
                this.apis.urlParams('activitydetails',{'title':item},false);
            } else {
                api.urlParams('Login')
            }
            plus.webview.getWebviewById(window.location.href.split('#/')[0]+'#/'+"activitylist").addEventListener(
              "close",
              function(e) {
              that.pageNo = 1;
              that.getActivitiyList()
              },
              false
            );
        },
        loadBottomAjax () {
            var that=this;
            if (!this.bottomNoData) {
                this.bottomLock = true
                this.bottomLoading = true
                var postData = {
                  "userId":this.userDataid,	
                  "searchContent":this.searchContent,
                  "type":0,
                  "pageNo":this.pageNo,
                  "pageSize":10,
                  "appInfoId":that.apis.theme.api.appInfoId}
            this.axios({
                method: "post",
                url: this.apis.theme.api.me.seachUserFavContent,
                data: postData
                }).then(res => {
                    if (res.data.data.length > 0 ) {
                        this.ActivList.concat(res.data.data);
                        this.pageNo++;
                    } else {
                        that.bottomNoData = true;
                    }
                    that.bottomLoading = false;
                    that.bottomLock = false;
            });
            }
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
  created() {
    var that = this;
    this.getDataid();
    Bus.$on("ActivList", val => {
      that.ActivList = val;
    });
    Bus.$on('isActivelist',(val) => {
        this.isActivelist = val;
    })
    Bus.$on('pageAndContent',(val) =>{
        this.pageNo = val.pageNo;
        this.searchContent = val.searchContent;
        this.bottomNoData = val.NoData;
    });
  },
  mounted() {
  }
};
</script>

<style lang="stylus" scoped>
.circBox{
    height: calc(80vh - 0.6rem);
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
}
.activty-start {
  width: 90%;
  height: 3.6rem;
  box-shadow: 0px 1px 10px 0px rgba(64, 83, 128, 0.3);
  border-radius: 6px;
  margin: 0.2rem auto 0.1rem auto;
  padding: 0.18rem;
}

.activty-start .activty-left {
  width: 1.97rem;
  height: 1.97rem;
  border-radius: 6px;
  background-color: #f2f2f2;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  float: left;
}

.activty-start .activty-right {
  width: 4.2rem;
  float: right;
}

.activty-start .activty-title {
  font-size: 0.3rem;
  line-height: 0.4rem;
  margin-top: 0.11rem;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}

.activty-start .activty-times {
  font-size: 0.24rem;
  color: #808080;
  margin-top: 0.2rem;
}

.activty-start .activty-address {
  font-size: 0.24rem;
  color: #808080;
  margin-top: 0.18rem;
}

.activty-end {
  width: 100%;
  overflow: hidden;
  clear: both;
}

.activty-end .free-admission {
  width: 60%;
  float: left;
  margin-left: 0.2rem;
}

.activty-end .free-admission .free-admission-title {
  font-size: 0.3rem;
  color: #be2c1f;
  margin-top: 0.3rem;
}

.activty-end .free-admission .free-admission-name {
  color: #4c4c4c;
  font-size: 0.26rem;
  margin-top: 0.2rem;
}

.activty-end .free-admission-right {
  float: right;
  margin-right: 0.2rem;
}

.activty-end .free-button {
  width: 1.58rem;
  height: 0.58rem;
  background: #be2c1f;
  font-size: 0.28rem;
  color: #fff;
  text-align: center;
  line-height: 0.58rem;
  border-radius: 50px;
  margin-top: 0.2rem;
}

.activty-end .bth-gray {
  background: #B3B3B3;
}

.free-admission-right .free-numbers {
  color: #808080;
  font-size: 0.26rem;
  margin-top: 0.12rem;
  text-align: right;
}

.free-admission-right .free-numbers font {
  color: #be2c1f;
}
.favTime{
    font-size: 0.28rem;
    color: #808080;
    margin:0.2rem 0 0 0.43rem;

}
.zanWu{
    font-size:0.32rem;
    color:#999999;
    margin-top:3rem;
    margin-left:3rem;
}
.wrapper{
    height: 76vh;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
}
</style>