
  <template>
  <div id="user">
    <div class="container">
      <!-- 登录状态 -->
      <div class="loginState">
        <!-- 已登录 -->
        <template v-if="isLogin">
          <div class="wrapper">
            <!-- <img class="userProfile" src="./img/head_03.png"> -->
            <img :src='"~@/assets/img/"+apis.getTheme()+"/login/logo.png"'>
            <!--:src="userInfo.headimgurl"-->
            <span class="userName">
              <!--{{userInfo.nickname}}-->
              <span v-if="apis.getTheme()=='qingtongxia'">云上青铜峡</span>
              <span v-if="apis.getTheme()=='haicang'">云上海沧</span>
            </span>
          </div>
        </template>
        <!-- 未登录 -->
        <template v-else>
          <div class="wrapper">
            <img class="userProfile"  @click="wrapper" src="./img/head_03.png" v-if=" getStorge == null ">
            <!-- 账号密码 -->
            <img
            class="userProfile" :src='"~@/assets/img/"+apis.getTheme()+"/me/dafultImg.png"'
            v-else-if="JSON.parse( getStorge ).imgurl == null"
            @click="userMsg"
            >
            <!-- 微信用户 -->
            <img
              class="userProfile"
              :src="apis.theme.imgHost+JSON.parse( getStorge ).imgurl"
              v-else
              @click="userMsg"
            >
            <span class="userName" @click="wrapper" v-if=" getStorge == null ">登录</span>
            <span class="userName" v-else>{{ JSON.parse( getStorge ).person_name }}</span>
          </div>
        </template>
      </div>
      <div class="group">
        <!-- 意见反馈 -->
        <div
          @click.stop="opinion"
          class="opinion"
          style="border-bottom: 0px solid #DDDDDD"
        ><img :src='"~@/assets/img/"+apis.getTheme()+"/me/wm.png"' alt>
          <mt-cell title="意见反馈" style="padding-left: 10%;">
            <i class="icon-arrow-right"></i>
          </mt-cell>
        </div>
        <div
          class="us"
          @click.stop="us"
          style="border-bottom: 0px solid #DDDDDD"
        ><img :src='"~@/assets/img/"+apis.getTheme()+"/me/gy.png"' alt>
          <mt-cell title="关于我们" style="padding-left: 10%;">
            <i class="icon-arrow-right"></i>
          </mt-cell>
        </div>
        <div class="set" @click="personalIntegral" v-if="apis.theme.api.appName == 'puyang'"><img src='./img/integral.png' alt >
          <mt-cell title="我的积分" style="padding-left: 10%;">
            <i class="icon-arrow-right"></i>
          </mt-cell>
        </div>
        <!-- <div class="set" @click="integralMall" v-if="apis.getTheme()=='mile'"><img src='./img/Mall.png' alt>
          <mt-cell title="积分商城" style="padding-left: 10%;">
            <i class="icon-arrow-right"></i>
          </mt-cell>
        </div> -->
        <div class="set" @click="set"><img :src='"~@/assets/img/"+apis.getTheme()+"/me/zheze.png"' alt>
          <mt-cell title="设置" style="padding-left: 10%;">
            <i class="icon-arrow-right"></i>
          </mt-cell>
        </div>
        <div class="set" @click="collectHistory"><img :src='"~@/assets/img/"+apis.getTheme()+"/me/sc.png"' alt>
          <mt-cell title="我的收藏" style="padding-left: 10%;">
            <i class="icon-arrow-right"></i>
          </mt-cell>
        </div>
        <div class="set" @click="tipOff"><img :src='"~@/assets/img/"+apis.getTheme()+"/me/clue.png"' alt v-if="apis.theme.api.appName != 'qingtongxia'">
          <mt-cell title="我要报料" style="padding-left: 10%;" v-if="apis.theme.api.appName != 'qingtongxia'">
            <i class="icon-arrow-right"></i>
          </mt-cell>
        </div>
        <div class="set" @click="share"><img :src='"~@/assets/img/"+apis.getTheme()+"/me/share.png"' alt>
          <mt-cell title="推荐给好友" style="padding-left: 10%;">
            <i class="icon-arrow-right"></i>
          </mt-cell>
        </div>
        <!-- <div class="set" @click="subscriptionRegister" v-if="apis.getTheme()=='mile'"><img src='./img/Subscribe.png' alt>
          <mt-cell title="订阅号认证" style="padding-left: 10%;">
            <i class="icon-arrow-right"></i>
          </mt-cell>
        </div> -->
      </div>
      <div class="versions" @click.stop="update">
        <mt-cell title="当前版本">{{version}}
        </mt-cell>
      </div>
      <!-- <button @click="previewImage"> 预览 </button> -->
      <div class="quit" @click="quitUser" v-if="getStorge">
        <span>退出登录</span>
      </div>
      
    </div>
  </div>
</template>
<script>
import api from "../../../../src/assets/js/api.js";
import qs from "qs";
import axios from "axios";
import { mapGetters, mapMutations, mapActions } from "vuex";
const root = process.env.API_ROOT;
import { Toast,Indicator } from "mint-ui";
export default {
  name: "user",
  data() {
    return {
      id: "/login.html",
      isLogin: false,
      commentNum: 0,
      version: 0,
      wgtVer: null,
      wgtUrl: "",
      versionFlag: '',
      oldAppVersion:null,
      userDataid:''
    };
  },
  methods: {
    ...mapMutations("login", ["_RemoveStorage","_setStorage"]),
    ...mapMutations("index", ["set_appMain",'set_ShowActivity','set_indexActive',]),
    userMsg() {
      let that = this;
      that.apis.urlParams("userCore");
      plus.webview.getWebviewById(window.location.href.split('#/')[0]+'#/'+"userCore").addEventListener(
        "close",
        function(e) {
            if( localStorage.getItem('userData') ){
              let locals = JSON.parse( localStorage.getItem('userData') );
              that._setStorage(JSON.stringify(locals));
            }
        },
        false
      );
    },
    // 退出登录
    outLogin() {
      if (this.isLogin) {
        this.$msgBox.confirm("请确认退出").then(action => {
          // this.set_isLogin('')
          // this.set_userInfo('')
          // this.set_userid('')
          this.commentNum = 0;
          this.$toast({ message: "已退出登录", duration: 1500 });
          this.isLogin = false;
        });
      } else {
        this.$toast({ message: "未登录", duration: 1500 });
      }
    },
    tipOff(){
      if( localStorage.getItem( 'userData' ) != null ){
        // api.urlParams("tipOff");
        this.apis.urlParams('tipOff', { title: '我要报料' }, false);
      } else {
        api.urlParams('Login')
      }
    },
    opinion() {
      api.urlParams("feedBack");
    },
    us() {
      api.urlParams("us");
    },
    set() {
      let that = this;
      that.apis.urlParams("set");
      plus.webview.getWebviewById(window.location.href.split('#/')[0]+'#/'+"set").addEventListener(
        "close",
        function(e) {
            if( localStorage.getItem('userData') ){
              let locals = JSON.parse( localStorage.getItem('userData') );
              console.log( JSON.stringify(locals) )
              that._setStorage(JSON.stringify(locals));
            }
        },
        false
      );
    },
    getDataid(){
        let userDataid = JSON.parse(localStorage.getItem("userData"));
        if( userDataid !== null){
            this.userDataid = userDataid.user_id;
        }else{
            this.userDataid = null;
        }
    },
    subscriptionRegister(){
      if(!this.userDataid){
        api.urlParams("login");
        return;
      }
      Indicator.open({
        text: '正在检测入驻状态...',
        spinnerType: 'fading-circle'
      });
      let params = {
          "appInfoId": this.apis.theme.api.appInfoId,
          // "loginUserId": this.userDataid,
          "userId": this.userDataid
      }
      this.axios({
          method:"post",
          url:this.apis.theme.api.subscription.selectSbuList,
          data:params
      })
      .then(res => {
        if(res.data.success){  //要判断用户是否已申请或者是申请的状态，对应跳转不同的页面
          Indicator.close();
          if(res.data.data.length != 0){
            // let subID = res.data.data[0].subscribeNumber;
            let subID = res.data.data[0];
            if(subID.checkType == 0){
              api.urlParams("subscriptionRegisterResult",{type:0});
            }else if(subID.checkType == 1){
              api.urlParams("subscriptionRegisterResult",{type:1,reason:subID.refuesReson,id:subID.id});
            }else if(subID.checkType == 2){
              api.urlParams("subscriptionRegisterResult",{
                type:2,
                url:subID.cbURL,
                pass:subID.cbPassword,
                name:subID.cbUsername
                
              });
            }else{
              api.urlParams("subscriptionRegister");
            }
          }else{
            api.urlParams("subscriptionRegister");
          }
        }else{
          Indicator.close();
          Toast({
            message: "网络出错，请重试！",
            position: "middle",
            duration: 1000
          });
        }
      })
    },
    personalIntegral(){
      let that = this;
      if (JSON.parse(localStorage.getItem("userData"))) {
        api.urlParams("personalIntegral");
        plus.webview.getWebviewById(window.location.href.split('#/')[0]+'#/'+"personalIntegral").addEventListener(
          "close",
          function(e) {
            if(localStorage.getItem('goNews')=='true'){
              that.set_appMain(5)
            }
            localStorage.removeItem('goNews')
          },
          false
        );
      } else {
        that.apis.urlParams("Login", {});
      }
    },
    integralMall(){
       api.urlParams("integralMall");
    },
    share(){
       api.urlParams("share");
    },
    collectHistory(){
        let that = this;
        if (JSON.parse(localStorage.getItem("userData") == null)) {
          that.apis.urlParams("Login", {});
        } else {
          that.apis.urlParams("review", {});
        }
    },
    quitUser() {
      //获取验证码接口
      let that = this;
      axios({
        method: "post",
        //api.theme.api.me.logout
        // root+'/login_al/login/logout'
        url: api.theme.api.me.logout
      }).then(res => {
        if (res.data.status == "1") {
          that.$toast({
            message: "退出登录",
            position: "middle",
            duration: 1500
          });
          localStorage.removeItem('index_Column'); //切换至其他用户，需要重置栏目
          localStorage.removeItem('removeChannel');
          localStorage.removeItem('old_index_Column');
          this._RemoveStorage(null);
        }
      });
    },
    // 跳转到登陆页
    wrapper(id) {
      api.urlParams("Login");
      // window.location.href=window.location.href+"/login.html";
    },
    goToMyComment() {
      if (this.isLogin) {
        this.$router.push({ name: "myComment" });
      } else {
        this.$toast({ message: "未登录", duration: 1500 });
      }
    },
    update() {
      var that=this
      if(localStorage.getItem('regengxin')=='true') {
        localStorage.setItem('restart','true');
        plus.nativeUI.showWaiting("发现新版本，正在为你更新中");
        return
      }
      plus.runtime.getProperty(plus.runtime.appid, function (inf) {
        that.wgtVer = inf.version;
        if(inf.version == that.versionFlag) {
          plus.nativeUI.toast("您当前已为最新版本",{duration:"short"})
          return
        }
        // alert(that.wgtVer)
        console.log(that.wgtVer);
        that.checkUpdate();
      });
    },

    // 检测更新
    checkUpdate() {
      //+'?type=0'
      var checkUrl = window.$themeConfig.api.updataCheckUrlUrl;
      var that=this;
      // console.log("版本更新...");
      // plus.nativeUI.showWaiting("版本更新...");
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        switch (xhr.readyState) {
          case 4:
            plus.nativeUI.closeWaiting();
            if (xhr.status == 200) {
              console.log("检测更新成功：" + xhr.responseText);
              let data = JSON.parse(xhr.responseText);
              var newVer = data.data.app_version;
              that.wgtUrl = data.data.app_path;
              // 线上最新版本号 newVer
              // 获取本地版本号 wgtVer
              newVer =  newVer.replace('.', "").replace('.', "");
              that.wgtVer = that.wgtVer.replace('.', "").replace('.', "");

              if( Number( that.wgtVer ) >= Number(newVer) ){
                that.versionFlag = newVer
                setTimeout(() => {
                  that.versionFlag = ''
                }, 20000);
                plus.nativeUI.toast("您当前已为最新版本",{duration:"short"})
                return;
              } else {
                that.downWgt();
              }
              // if (that.wgtVer && newVer && that.wgtVer != newVer) {
              //   that.downWgt(); // 下载升级包
              // } else {
              //   // plus.nativeUI.alert("您当前已为最新版本");
               
              //   plus.nativeUI.toast("您当前已为最新版本",{duration:"short"})
              // }
            } else {
              console.log("检测更新失败，请重试");
              plus.nativeUI.alert("检测更新失败，请重试");
            }
            break;
          default:
            break;
        }
      };
      xhr.open("GET", checkUrl);
      xhr.setRequestHeader('app_info_id', that.apis.theme.api.appInfoId);
      xhr.send();
    },

    // 更新应用资源
    // 从服务器下载应用资源包（wgt文件）
    // 下载wgt文件
    downWgt() {
      var that=this
      console.log("下载中...");
      plus.nativeUI.showWaiting("发现新版本，正在为你更新中");
      plus.downloader
        .createDownload(
          that.wgtUrl, {
            filename: "_doc/update/"
          },
          function (d, status) {
            if (status == 200) {
              console.log("下载成功：" + d.filename);
              that.installWgt(d.filename); // 更新wgt包
            } else {
              console.log("下载失败！");
              plus.nativeUI.alert("下载失败！");
              plus.nativeUI.closeWaiting();
            }
          }
        )
        .start();
    },

    // 更新应用资源
    installWgt(path) {
      // plus.nativeUI.showWaiting("更新中...");
      plus.runtime.install(
        path, {},
        function () {
          plus.nativeUI.closeWaiting();
          console.log("更新成功！");
          plus.nativeUI.alert("更新成功！", function () {
            plus.runtime.restart();
          });
        },
        function (e) {
          plus.nativeUI.closeWaiting();
          console.log("更新失败，请重试 [" + e.code + "]：" + e.message);
          plus.nativeUI.alert("更新失败，请重试 [" + e.code + "]");
        }
      );
    }

  },
  created() {
    var that = this;
    that.getDataid();
    if (window.plus) {
      plus.runtime.getProperty(plus.runtime.appid, function(inf) {
        that.version = inf.version;
      });
    } else {
      document.addEventListener(
        "plusready",
        function() {
          plus.runtime.getProperty(plus.runtime.appid, function(inf) {
            that.version = inf.version;
          });
        },
        false
      );
    }
    // if (this.isLogin && this.userid) {
    //     this.get_userPower_data(this.userid) // 获取用户权限
    // }
  },
  activated() {
    // this.init()
  },
  computed: {
    ...mapGetters("login", [
      "getStorge" // active的栏目
    ])
  }
};
</script>
<style lang='less' scoped>
.mint-cell:last-child {
  background-image: none;
}
.quit {
  color: @dominantColor;
  height: .86rem;
  text-align: center;
  line-height: .86rem;
  margin-top: .2rem;
  background-color: #fff;
  font-size: .36rem;
}

.set {
  position: relative;
}

.set img {
  // bottom: 14px;
  width: .4rem;
  position: absolute;
  display: inline-block;
  z-index: 999;
  left: 15px;
  top: 50%;
    transform: translate(0,-50%);
}

.us {
  position: relative;
}

.us img {
  // bottom: 14px;
  width:0.4rem;
  position: absolute;
  display: inline-block;
  z-index: 999;
  left: 15px;
  top: 50%;
  transform: translate(0,-50%);
}

.opinion {
  position: relative;
}

.opinion img {
  // bottom: 14px;
  width: .4rem;
  position: absolute;
  display: inline-block;
  z-index: 999;
  left: 15px;
  top: 50%;
  transform: translate(0,-50%);
}

.collect {
  position: relative;
}

.collect img {
  // bottom: 14px;
  width: .4rem;
  position: absolute;
  display: inline-block;
  z-index: 999;
  left: 15px;
  top: 50%;
  transform: translate(0,-50%);
}

.comment {
  position: relative;
}

.comment > img {
  // bottom: 14px;
  width: .4rem;
  position: absolute;
  display: inline-block;
  z-index: 999;
  left: 15px;
  top: 50%;
    transform: translate(0,-50%);
}

#user {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  font-size: 0.37rem;
  padding-bottom: 1.1rem;
  background-color: #f2f2f2;
  overflow: scroll;

  a {
    text-decoration: none;
  }

  .loginState {
    // font-family: monospace;
    position: relative;
    width: 100%;
    height: 4.6rem;
    box-sizing: content-box;

    .wrapper {
      position: absolute;
      left: 50%;
      // top: 50%;
      bottom: -1.4rem;
      transform: translate(-50%, -50%);
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      .userProfile {
        display: block;
        border-radius: 50%;
        width: 2.7rem;
        height: 2.7rem;
        text-align: center;
        vertical-align: middle;
        // box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
        margin-bottom: 0.4rem;
      }

      .userName {
        font-size: 0.37rem;
        color: #fff;
      }
    }
  }

  .menu {
    width: 100%;
    display: flex;
    background: #fff;

    .menu-item {
      flex: 1;
      text-align: center;
      padding: 0.25rem 0;

      .menu-value {
        color: @dominantColor;
        font-size: 0.533rem;
        padding-bottom: 0.133rem;
      }

      .menu-title {
        color: #666;
        font-size: 0.373rem;
      }
    }
  }

  .group {
    font-size: 19px;
    margin: 0.2rem 0;
  }

  .mint-cell {
    color: #333;
    min-height: 1rem;

    .mint-cell-wrapper {
      font-size: 0.3rem;
      padding-left: 0.5rem;
      padding-right: 0.25rem;
    }
  }
}

.versions {
  // height: 45px;
  overflow: hidden;
}
</style>
<style lang='less'>
#user .loginState {
  /*background: url('~@/assets/img/myColorp.png') no-repeat 50% 0%;
    background-size: 100% 100%;*/
  background: @dominantColor;
}
#user .icon-arrow-right {
  display: table-cell;
  vertical-align: middle;
  width: 0.5rem;
  height: 0.32rem;
  background: url("~@/assets/img/back_right.png") no-repeat center center;
  background-size: cover;
}
.mint-cell-wrapper{
  font-size:.32rem;
}
</style>