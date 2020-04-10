<template>
  <div class="wrapper">
    <!-- <div class="none" v-if="activelist.length==0">
            没有更多内容
        </div>
        <div class="infoList" v-for="(item,index) in activelist" :key="index">
            <div class="infoHeader">
                <img class="headerImg" :src="user.imgurl?user.imgurl:url"> 
                <dl>
                    <dt >{{user.person_name}}</dt>
                    <dd>{{item.signUpTime}}</dd>
                </dl>
            </div>
            <div class="listCont">
                <div class="ding">
                    <p v-if="item.top" class="ding1">顶</p>
                    <p v-if="item.excellent" class="ding2">精</p>
                    <p v-if="item.popular" class="ding3">热</p>
                </div>
                <p class="centxt" >
                    <span >{{item.name}}</span>
                    <span class="fenlei"></span>
                </p>
            </div>
            <div  class="listcontent">
                <div style="width:2.03rem;height:2.03rem;">
                    <img src="../img/my_bg.png" style="width:100%;height:100%">
                </div>
                <div class="describe">
                    <div style="width:100%;">
                        <p>时间：{{item.addTime}}</p>
                        <p style="margin-top:0.05rem;">地址：{{item.activitiesZone}}</p>
                    </div>
                    <div  class="describe_bt">
                        <div class="describe_bt_l" >￥{{item.perCost}}</div>
                        <div class="describe_bt_r">已报名</div>
                    </div>
                </div>
            </div>
    </div>-->
    <div class="none" v-if="list.length==0">
            没有更多内容了
    </div>
    <div
      class="activty-start"
      v-for="(item,index) in list"
      :key="index"
      @click.stop="goSignUp(item)"
      @touchmove="touchmoveFunc()"
    >
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
          <div class="free-button" v-if="item.signUpStatus =='1'">已报名</div>
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
</template>

<script>
import Bus from "@/Bus";
export default {
  data() {
    return {
      list: []
      //   user: {},
      //   url: require("../../infoList/image/head.png")
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

  },
  created() {
    var that = this;
    Bus.$on("activelist", val => {
      that.list = val;
    });
    Bus.$on("activeID", val => {
      that.list.forEach((list,index) => {
        if(list.id==val){
          that.list.splice(index,1)
        }
      });
    });
  },
  mounted() {
    // let name = JSON.parse(localStorage.getItem("userData"));
    // this.user = name;
  }
};
</script>

<style lang="stylus" scoped>
.none{
  font-size: 0.32rem;
  width: 100%;
  color: #D9D9D9;
  text-align: center;
  margin-top: 3rem;
}
.activty-start {
  width: 90%;
  height: 3.6rem;
  box-shadow: 0px 1px 10px 0px rgba(64, 83, 128, 0.3);
  border-radius: 6px;
  margin: 0.4rem auto 0 auto;
  padding: 0.18rem;
}
.wrapper{
  padding-top:0.1rem;
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
</style>
//   <style scoped lang="less">

</style>