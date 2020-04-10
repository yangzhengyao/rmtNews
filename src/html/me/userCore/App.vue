<template>
  <!-- 加载更多 -->
  <div id="userCore">
    <header class="headerNavFixed">
      <div class="nvbt iback" @click="apis.iback()" ></div>
      <div class="nvtt">编辑资料</div>
    </header>
    <div class="container contentNavFixed" style="margin-top:.2rem">
      <div class="friendsContent">
        <!-- 用户姓名 -->
        <div style="margin-top:10px;">
          <div>
            <span>头像</span>
          </div>
          <div>
            <img :src='"~@/assets/img/"+apis.getTheme()+"/me/dafultImg.png"' alt style="width:.62rem" v-if="headerJson.imgurl == null">
            <!-- 微信用户登陆 -->
            <img :src="apis.theme.imgHost+headerJson.imgurl" alt style="width:.62rem" v-else>
            <!-- <i class="iconfont">&#xe625;</i> -->
          </div>
        </div>
        <!-- 头像 -->
        <div>
          <div>
            <span>昵称</span>
          </div>
          <div>
            <span @click="skipUrl">{{ headerJson.person_name }}</span>
            <!-- <i class="iconfont">&#xe625;</i> -->
          </div>
        </div>
        <!-- 性别 -->
        <div>
          <div>
            <span>性别</span>
          </div>
          <div>
            <!-- <span>{{ headerJson.sex == 1 ? '男':'女' }}</span> -->
            <input type="radio" name="sex" v-model="headerJson.sex"  value='1' @click="sexFn(headerJson.sex)"/>
            <span>男</span>
            <input type="radio" name="sex" v-model="headerJson.sex"  value='2' @click="sexFn(headerJson.sex)"/>
            <span>女</span>
          </div>
        </div>
        <!-- 生日 -->
        <div style="margin-bottom:10px">
          <div>
            <span>生日</span>
          </div>
          <div>
            <span @click="birthdayFn">{{ headerJson.birthday == null ? '请选择':headerJson.birthday }}</span>
          </div>
        </div>
        <!-- 手机号 -->
        <div style="margin-top:10px">
          <div>
            <span>手机号</span>
          </div>
          <div>
            <span @click="mobileFn">{{ headerJson.mobile == '' ? '请添加': headerJson.mobile }}</span>
          </div>
        </div>
        <!-- 企业名称 -->
        <div>
          <div>
            <span>企业名称</span>
          </div>
          <div>
            <span @click="qiyename">{{ headerJson.company_name == null ? '暂无': headerJson.company_name}}</span>
          </div>
        </div>
        <!-- <div>
          <div>
            <span>省市区域</span>
          </div>
          <div>
            <span @click="skipUrl">濮阳市濮阳县</span>
          </div>
        </div> -->
        <!-- 邮箱 -->
        <div style="margin-bottom:10px">
          <div>
            <span>邮箱</span>
          </div>
          <div>
            <span>{{ headerJson.email == null ? '暂无': headerJson.email }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import qs from "qs";
//引入主页
import { Cell } from "mint-ui";
import { Toast } from "mint-ui";
const root = process.env.API_ROOT;
export default {
  data() {
    return {
      initParams: {},
      headerJson: {}, //mock数据
      json: []
      // imgRoot:root
    };
  },
  components: {
    // noData
  },
  computed: {
    ...mapGetters("login", [
      "getStorge" // active的栏目
    ])
  },
  methods: {
    //获取博主的个人信息 包括个人 和 其他
    /**
     * userId != null  是查看其他博主
     */
    initUserMsg() {
      let that = this;
      let postData = {
        is_myself: "1",
        user_id: JSON.parse(that.getStorge).user_id
      };
      that.axios({
        method: "post",
        ///community_al/user/getUserInfo'
        // this.apis.theme.api.community.getUserInfo
        url: that.apis.theme.api.community.getUserInfo,
        data: qs.stringify(postData),
      }).then(res => {
        if (res.data.status == "1") {
          that.headerJson = res.data.data;
          that.headerJson.sex = window.String( that.headerJson.sex )
          that.headerJson.birthday = that.headerJson.birthday.split(' 00:00:00')[0];
        } 
      });
    },
    //获取用户ID
    getParams() {
      let url = window.location.href;
      let urlParams = this.apis.parseQueryString(url);
      this.initParams = urlParams;
      return urlParams;
    },
    //修改或添加手机号
    mobileFn(){
        let that = this;
        that.apis.urlParams("skipmMobile");
        plus.webview.getWebviewById("skipmMobile").addEventListener(
          "close",
          function(e) {
            that.initUserMsg();
          },
          false
        );
    },
    //修改性别
    sexFn(sex){
      console.log( sex )
      console.log( typeof sex )
        // if( plus.os.name != 'iOS' ){
            if( sex == '2' ){
              sex = '1';
            } else {
              sex = '2';
            }
        // }
        let that = this;
        let postData = {
          sex: sex
        };
        this.axios({
          method: "post",
          ///community_al/user/getUserInfo'
          // this.apis.theme.api.community.getUserInfo
          url: this.apis.theme.api.me.modifyUserInfo,
          data: qs.stringify(postData)
        }).then(res => {
          // console.log(res);
          if (res.data.status == "1") {
                Toast({
                  message: res.data.message,
                  position: "middle",
                  duration: 1400
                });
          } else {
              Toast({
                  message: res.data.message,
                  position: "middle",
                  duration: 1400
              });
          }
        });
    },
    //修改用户生日
    birthdayFn(){
      let that = this;
      //默认选择当天 最大也不能超过当天
      var dDate=new Date();
          dDate = that.apis.timestampToDate(dDate);
      //最小选择日期
      var minDate=new Date();
      minDate.setFullYear(1900,7,8);
      plus.nativeUI.pickDate( function(e) {
        var d= e.date;
         let postData = {
          birthday: d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate(),
        };
        // alert( postData.birthday )
        that.axios({
          method: "post",
          ///community_al/user/getUserInfo'
          // this.apis.theme.api.community.getUserInfo
          url: that.apis.theme.api.me.modifyUserInfo,
          data: qs.stringify(postData)
        }).then(res => {
          // console.log(JSON.stringify(res.data));
          if (res.data.status == "1") {
              Toast({
                message: res.data.message,
                position: "middle",
                duration: 1400
              });
              that.headerJson.birthday = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
          } else {
              Toast({
                message: res.data.message,
                position: "middle",
                duration: 1400
              });
          }
        });
      },function(e){
      },{title:"请选择日期",date:dDate,minDate:minDate,maxDate:dDate});
    },
    plusReady(){
    },
    //修改企业名
      qiyename() {
          let that = this;
          // that.apis.urlParams("./skipUserName.html");
          // plus.webview.getWebviewById("./skipUserName.html").addEventListener(
          //   "close",
          //   function(e) {
          //     that.initUserMsg();
          //   },
          //   false
          // );
          let bts=["确认","取消"];
          let localParams = JSON.parse( localStorage.getItem('userData') )
          plus.nativeUI.prompt("请输入新的企业名",function(e){
            let i=e.index;
            let eMsg  = e.message;
            if( i <= 0 ){
              console.log( '确认' )
              that.axios({
                method: "post",
                //this.apis.theme.api.me.modifyUserInfo
                //root + "/my_al/my/modifyUserInfo"
                url: that.apis.theme.api.me.modifyUserInfo,
                data: qs.stringify({
                  company_name: eMsg
                })
              })
              .then(res => {
                console.log(res);
                if (res.data.status == "1") {
                  that.headerJson.company_name = eMsg;
                  let locals = JSON.parse(localStorage.getItem('userData'));
                  locals.company_name = eMsg;
                  localStorage.setItem('userData',JSON.stringify( locals )) 
                  Toast({
                    message: res.data.message,
                    position: "middle",
                    duration: 1400
                  });
                } else {
                  Toast({
                    message: res.data.message,
                    position: "middle",
                    duration: 1500
                  });
                }
              });
            }else {
              console.log( '取消' )
            }
        },"",localParams.company_name,bts);
      },
      //修改用户名
      skipUrl() {
          let that = this;
          // that.apis.urlParams("./skipUserName.html");
          // plus.webview.getWebviewById("./skipUserName.html").addEventListener(
          //   "close",
          //   function(e) {
          //     that.initUserMsg();
          //   },
          //   false
          // );
          let bts=["确认","取消"];
          let localParams = JSON.parse( localStorage.getItem('userData') )
          plus.nativeUI.prompt("请输入新的用户名",function(e){
            let i=e.index;
            let eMsg  = e.message;
            if( i <= 0 ){
               console.log( '确认' )
                that.axios({
                  method: "post",
                  //this.apis.theme.api.me.modifyUserInfo
                  //root + "/my_al/my/modifyUserInfo"
                  url: that.apis.theme.api.me.modifyUserInfo,
                  data: qs.stringify({
                    person_name: eMsg
                  })
                })
                .then(res => {
                  console.log(res);
                  if (res.data.status == "1") {
                    that.headerJson.person_name = eMsg;
                    let locals = JSON.parse( localStorage.getItem('userData') );
                    locals.person_name = eMsg;
                    localStorage.setItem('userData',JSON.stringify( locals )) 
                    Toast({
                      message: res.data.message,
                      position: "middle",
                      duration: 1400
                    });
                  } else {
                    Toast({
                      message: res.data.message,
                      position: "middle",
                      duration: 1500
                    });
                  }
                });
            } else {
               console.log( '取消' )
            }
        },"",localParams.person_name,bts);
      }
    },
    created() {
      this.getParams();
      this.initUserMsg();
    },
    mounted() {
      if(window.plus){
        this.plusReady();
      }else{
        document.addEventListener("plusready",this.plusReady(),false);
      }
    }
    
};
</script>
<style scoped lang='less'>
@import "../../../assets/communityIcon/iconfont.css";
.iconfont {
  font-size: 14px;
  color: #ccc;
}
header{
    background: @headerBg;
    .nvbt{
      background: @headerIback;
    }
    .nvtt{
      font-size: .36rem;
      font-weight: 500;
      color:@headerColor;
    }
}
.headerNavFixed > div {
  height: .88rem;
}
#userCore {
  background: #f7f7f7;
  height: 100%;
}
.container {
  height: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  position: relative;

  .globalTip {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
    div {
      height: 32px;
      line-height: 34px;
      font-size: 14px;
      color: #2a90d7;
      background: rgba(213, 233, 247, 0.9);
      text-align: center;
      display: none;

      &.requestFail {
        color: #f56767;
        background: #fbe9ef;
      }
    }
  }

  .mint-loadmore-top {
    height: 50px;
    line-height: 50px;
    font-size: 14px;
  }

  .pullLoading {
    width: 24px;
    height: 24px;
    vertical-align: middle;
    margin-top: -4px;
    margin-right: 3px;
  }
  .friendsContent {
    background: #f4f4f4;
    span {
      font-size: 0.33rem;
      color: #3e3b3b;
    }
    > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: .96rem;
      padding: 0 0.2rem 0 0.45rem;
      border-bottom: 1px solid #ebebeb;
      background: #fff;
      > div:nth-child(1),
      > div:nth-child(2) {
        display: flex;
        align-items: center;
      }
      > div:nth-child(2) {
        span {
          color: #ccc;
          line-height: 1;
          margin-right: 0.16rem;
          margin-left: 0.16rem;
        }
      }
    }
  }
  .mint-cell {
    border-bottom: 1px solid #ccc;
  }
}
  input[type=radio]{
        /*去除浏览器默认样式*/
        -webkit-appearance: none;
        -webkit-tap-highlight-color:#fff;
        -moz-appearance: none;
        appearance: none;
        /*自定义样式*/
        position: relative;
        display: inline-block;
        vertical-align: top;
        width: 0.32rem;
        height: 0.32rem;
        border: 1px solid @dominantColor;
        outline: none;
        cursor: pointer;
        /*设置为圆形，看起来是个单选框*/
        -webkit-border-radius: 20px;
        -moz-border-radius: 20px;
        border-radius: 20px;
        -webkit-background-clip:text;
        -webkit-text-fill-color:transparent;
    }
 
    /**
    * 单选框 选中之后的样式
    **/
    input[type=radio]:after{
        content: '';
        position: absolute;
        width: .2rem;
        height: .2rem;
        display: block;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        background: @dominantColor;
        -webkit-border-radius: .24rem;
        -moz-border-radius: .24rem;
        border-radius: .24rem;
        -webkit-transform: scale(0);
        -moz-transform: scale(0);
        transform: scale(0);
        /*增加一些动画*/
        -webkit-transition : all ease-in-out 300ms;
        -moz-transition : all ease-in-out 300ms;
        transition : all ease-in-out 300ms;
        -webkit-appearance: none;
    }
    input[type=radio]:checked:after{
        -webkit-transform: scale(1);
        -moz-transform: scale(1);
        transform: scale(1);
        -webkit-appearance: none;
        -webkit-background-clip:content-box;
        -webkit-text-fill-color:@dominantColor;
    }
    .navclolr{color:rgb(26, 26, 26)}
</style>

