<template>
  <div id="login">
    <!-- 头部 -->
    <!-- <header class="headerNavFixed"> 
      <div class="nvbt iback" style="flex: 1;" @click="apis.iback()"  :class=" apis.getTheme() == 'dongpo'?'iBlackBack':'iback'"></div>
      <div class="nvtt" style="width:70%" >登 录</div>
    </header> -->
    <!-- 正文 -->
    <div class="">
      <div class="">
        <div class="defaultImg">
          <span class="iback" style="flex: 1;" @click="apis.iback()"  :class=" apis.getTheme() == 'dongpo'?'iBlackBack':'iback'"></span>
          <span @click="register" style="color:#fff">新用户注册</span>
          <div>
            <img :src='"~@/assets/img/"+apis.getTheme()+"/login/logo.png"'>
            <span>登录</span>
          </div>
          <!-- <div class="defaultImg"><img :src='"./images/"+apis.getTheme()+"/logo.png"'> -->
        </div>
        <div class="title">
          <span v-if="apis.getTheme()=='qingtongxia'">云上青铜峡</span>
          <span v-if="apis.getTheme()=='haicang'">云上海沧</span>
        </div>
        <div class="defaultLogin">
          <div class="defaultUser">
            <input type="text" name placeholder="请输入手机号" v-model="phone">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAARCAYAAAACCvahAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0MDk1MzUxZi1kNmY5LTY5NDgtOTVhYi1hZDM4ZTU4OTBiMjciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6N0NFOTA4QzFFQzlDMTFFODk1QzVBRTYzRjUzNDI1NDUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6N0NFOTA4QzBFQzlDMTFFODk1QzVBRTYzRjUzNDI1NDUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MGE3OTI3N2QtZDI4MS1hYzRjLTlmZWItZTQwNzMzZDhkYzMxIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjQwOTUzNTFmLWQ2ZjktNjk0OC05NWFiLWFkMzhlNTg5MGIyNyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PsXRQmIAAAEGSURBVHjaYpw5cyYDGuAC4hogDgZiMSA+C8QLgXgxukIWND4/EB8CYj0kMWco1gDiamTFTGiaJ6NpRAZVUEOwagbZGsqAH6Th08xBQLMELs1PgPghAc1ncGn+B8SteDT+BeI+fAE2G4ibsWh8CsQuUBpnVIFAHTTUvYGYB+qVzdicgk0zKOC+APECJDFeqLO/4XK2DhAvA+J7UEUgxX+A+D8QfwDiW0A8F4hV0TW7AvE5II4EYiEkOWYktjQQJwHxeSB2hAlKAvF2IGZlIA5wA/EOIBYHaa5EsoFYwAbEZSDNTgzkATeQZlEyNUuAoioRGhDS0HhlhqY2dMAIDaMv0LhfDBBgANJeK/y6zQXjAAAAAElFTkSuQmCC"
            >
          </div>
          <div class="defaultUser" v-if="userPwd">
            <!-- <mt-field label="密码" placeholder="请输入密码" type="password" v-model="userPassword"></mt-field> -->
            <input type="password" name id value placeholder="请输入密码" v-model="userPassword">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAARCAYAAAACCvahAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0MDk1MzUxZi1kNmY5LTY5NDgtOTVhYi1hZDM4ZTU4OTBiMjciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6N0NFOTA4QzVFQzlDMTFFODk1QzVBRTYzRjUzNDI1NDUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6N0NFOTA4QzRFQzlDMTFFODk1QzVBRTYzRjUzNDI1NDUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MGE3OTI3N2QtZDI4MS1hYzRjLTlmZWItZTQwNzMzZDhkYzMxIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjQwOTUzNTFmLWQ2ZjktNjk0OC05NWFiLWFkMzhlNTg5MGIyNyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PpN3skIAAAFDSURBVHjanNM/KIVRHMbx997LZLGwMBhQkmwmJhYDJpsMBgZFCoPFLMJC3kQKyx0Ug8Fice+VhEFGFimxiPy7xPdXjzqd3rfudepzO+fc87x/zu89iTAMg5g2jiEcYATf/oISb1yKHoU6NFeLNixgB09uuBq9aEQ7aiKeognrmEEOF9iz8IZChbQKdMtgkp/K4H+tzMIvRQQyOFX/M1lEcBOtSGv8ZeGEBj9YwXlEcAn96MS05t5tw1JO2OqZxy2qND+LSVUk7Vwwb3d+1cD6l+rX4QHLCg54QWt3Fsg6E/W4wpuqMIwxrEW8Ss7Cq95kgz6CcoxiPmYDtyx8gznvj2Y8YjEmuGuv+FeqCZx4C1IxwQ99+4FbZzsIZwXU28p174ef0YLtmNC1Ttdh4JTHbXZm+9CFfSsHjjGlfThyF/8KMACdikGLuT3cuQAAAABJRU5ErkJggg=="
            >
          </div>
          <div class="defaultUser" v-if="!userPwd">
            <input type="password" name id value placeholder="请输入验证码" v-model="verification">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAARCAYAAAACCvahAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0MDk1MzUxZi1kNmY5LTY5NDgtOTVhYi1hZDM4ZTU4OTBiMjciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6N0NFOTA4QzVFQzlDMTFFODk1QzVBRTYzRjUzNDI1NDUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6N0NFOTA4QzRFQzlDMTFFODk1QzVBRTYzRjUzNDI1NDUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MGE3OTI3N2QtZDI4MS1hYzRjLTlmZWItZTQwNzMzZDhkYzMxIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjQwOTUzNTFmLWQ2ZjktNjk0OC05NWFiLWFkMzhlNTg5MGIyNyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PpN3skIAAAFDSURBVHjanNM/KIVRHMbx997LZLGwMBhQkmwmJhYDJpsMBgZFCoPFLMJC3kQKyx0Ug8Fice+VhEFGFimxiPy7xPdXjzqd3rfudepzO+fc87x/zu89iTAMg5g2jiEcYATf/oISb1yKHoU6NFeLNixgB09uuBq9aEQ7aiKeognrmEEOF9iz8IZChbQKdMtgkp/K4H+tzMIvRQQyOFX/M1lEcBOtSGv8ZeGEBj9YwXlEcAn96MS05t5tw1JO2OqZxy2qND+LSVUk7Vwwb3d+1cD6l+rX4QHLCg54QWt3Fsg6E/W4wpuqMIwxrEW8Ss7Cq95kgz6CcoxiPmYDtyx8gznvj2Y8YjEmuGuv+FeqCZx4C1IxwQ99+4FbZzsIZwXU28p174ef0YLtmNC1Ttdh4JTHbXZm+9CFfSsHjjGlfThyF/8KMACdikGLuT3cuQAAAABJRU5ErkJggg=="
            >
            <div class="defaultYanz">
              <!---->
              <span v-if="!show">{{count}}s</span><span @click="phoneNum" style="font-size:.24rem;">{{ showWz ? '获取验证码':'重新获取' }}</span>
            </div>
          </div>
          <!-- 切换 -->
          <div class="toggleLogin">
            <span @click="toggleFn" style="color:#4D4D4D">{{ userPwd ? '验证码登录':'用户密码登录' }}</span>
            <span @click="register" style="color:#4D4D4D">忘记密码</span>
          </div>
          <div class="loginBox" @click=" landing">登 录</div>
        </div>
        <div class="sanfang">
          <div>
            <span></span>
            <span>第三方登录</span>
            <span></span>
          </div>
          <div class="sanfangIcon">
            <img src="./images/qq.png" @click="plusReady('qq')" alt>
            <img src="./images/wechat.png" @click="plusReady('weixin')" alt>
            <img src="./images/sina.png" @click="plusReady('sinaweibo')" alt>
          </div>
        </div>
        <!-- <div class="loginText">
          <p>
            登录即代表您已阅读并同意
            <a>服务条款</a> 和
            <a>隐私政策</a>
          </p>
        </div>-->
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapActions } from "vuex";
// import { get_iosLocation, get_androidLocation } from "@/config/cordova";
// import user from "../index/user/user";
import { Indicator, Toast, Field } from "mint-ui";
import qs from "qs";
const root = process.env.API_ROOT;
export default {
  name: "login",
  data() {
    return {
      hide: false,
      GPSLocation: {},
      show: true,
      showWz:true,
      timer: null,
      userPwd: true,
      userPassword: "", //密码
      count: "",
      disabled: false,
      phone: "",
      time: 0,
      formMess: {
        phone: this.phone
      },
      popupVisible: false,
      verification: "",
      auths: {},
      isIOS:false
    };
  },
  methods: {
    // ...mapMutations(["set_userid"]),
    ...mapMutations("login", ["_setStorage"]),
    // ...mapMutations("user", ["set_userInfo"]),
    // ...mapActions("login", ["get_userPower_data"]),
    register() {
      this.apis.urlParams("register");
      // window.location.href="./register.html"
    },
    toggleFn() {
      this.userPwd = !this.userPwd;
    },
    phoneNum() {
      var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
      //var url="/nptOfficialWebsite/apply/sendSms?mobile="+this.ruleForm.phone;
      if (this.phone == "") {
        // $toast({ message: "请输入手机号", duration: 2000 });
        Toast("请输入手机号");
      } else if (!reg.test(this.phone)) {
        // this.$toast({ message: "请输入正确的手机号", duration: 2000 });
        Toast("请输入正确的手机号");
      } else {
        this.time = 60;
        this.disabled = true;
        this.showWz = false;
        this.getTime();
      }
    },
    //获取验证码
    getTime() {
      const loginTime = 60;
      if (!this.timer) {
        this.count = loginTime;
        this.show = false;
        this.timer = setInterval(() => {
          if ((this.count > 0) & (this.count <= loginTime)) {
            this.count--;
          } else {
            this.show = true;
            this.showWz = true;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
        //获取验证码接口
        this.axios({
          method: "post",
          url: this.apis.theme.api.newMe.getSms,
          data: {
            mobilePhone: this.phone,
            auto_id: this.apis.theme.api.appInfoId,
            status: 1
          }
        }).then(res => {
          if (res.data.success) {
            Toast({
              message: "验证码已发送,请注意查收",
              position: "bottom",
              duration: 2000
            });
          }
        });
      } else {
        Toast({
          message: "1分钟不可多次获取验证码",
          position: "bottom",
          duration: 2000
        });
      }
    },
    plusReady(loginType) {
      let that = this;
      // 获取登录认证通道
      plus.oauth.getServices(
        function(services) {
          // alert(JSON.stringify(services[0]));
          // alert(JSON.stringify(services[1]));
          // alert(JSON.stringify(services[2]));
          // alert(JSON.stringify(services[3]));
          // alert( services )
          let service = {};
          for (let i = 0; i < services.length; i++) {
            if (services[i].id == loginType) {
              service = services[i];
            }
            //  if (services[i].id == "qq") {
            //   service = services[i];
            // }
            //  if (services[i].id == "sinaweibo") {
            //   service = services[i];
            // }
          }

          that.auths[service.id] = service;
          that.weixinLogin(service.id);
          // info.innerText = txt;
        },
        function(e) {
          alert("获取登录认证失败：" + e.message);
        }
      );
    },
    // 登录认证
    weixinLogin(id) {
      // alert("----- 登录认证 -----");
      // alert(id);
      let that = this;
      var auth = that.auths[id];
      if (auth) {
        var w = null;
        if (plus.os.name == "Android") {
          w = plus.nativeUI.showWaiting();
        }
        document.addEventListener(
          "pause",
          function() {
            setTimeout(function() {
              w && w.close();
              w = null;
            }, 2000);
          },
          false
        );
        auth.login(
          function() {
            w && w.close();
            w = null;
            console.log(JSON.stringify(auth.authResult));
            that.userinfo(auth);
          },
          function(e) {
            w && w.close();
            w = null;
            plus.nativeUI.alert("详情错误信息", null, "登录失败:" + e.message);
          }
        );
      } else {
        // alert("无效的登录认证通道！");
        plus.nativeUI.alert("无效的登录认证通道！", null, "登录");
      }
    },
    // 获取用户信息
    userinfo(a) {
      let that = this;
      a.getUserInfo(
        function() {
          console.log(JSON.stringify(that.auths)+'11111111111111111111111111');
          /**
           * @param a.userInfo.openid 微信用户ID
           * @param a.userInfo.nickname 微信用户名称
           * @param a.userInfo.headimgurl 微信用户头像
           * @param a.userInfo.sex 微信用户性别
           * @param a.userInfo.language 微信用户语言
           * @param a.userInfo.city 微信用户城市
           * @param a.userInfo.province 微信用户省份
           * @param a.userInfo.country 微信用户国籍
           * @param a.userInfo.unionid 微信用户unionid
           * @param a.userInfo.privilege 微信用户privilege
           */
         
          if( that.auths.hasOwnProperty("qq")){
              that.qqLogin(a.userInfo);
          }
           if( that.auths.hasOwnProperty("weixin")){
              that.wechatLogin(
                a.userInfo.openid,
                a.userInfo.nickname,
                a.userInfo.headimgurl,
                a.userInfo.sex,
                a.userInfo.language,
                a.userInfo.city,
                a.userInfo.province,
                a.userInfo.country,
                a.userInfo.unionid,
                a.userInfo.privilege
              );
          }
           if( that.auths.hasOwnProperty("sinaweibo")){
             that.weiboLogin( a.userInfo )
          }
          var nickname =
            a.userInfo.nickname || a.userInfo.name || a.userInfo.miliaoNick;
          // plus.nativeUI.alert("欢迎“" + nickname + "”登录！");
        },
        function(e) {
          // alert("获取用户信息失败：");
          // alert("[" + e.code + "]：" + e.message);
          plus.nativeUI.alert("获取用户信息失败！", null, "登录");
        }
      );
    },
    //微信登录
    wechatLogin( openid,nickname,headimgurl,sex,language,city,province,country,unionid,privilege ) {
      let that = this;
      let param = {
        username: openid, //微信id
        appInfoId:that.apis.theme.api.appInfoId,
        type:'2'
      };
      console.log( JSON.stringify( param ),'22222222222' )
      that.axios({
          method: "post",
          //this.apis.theme.api.me.wechatLogin
          url: that.apis.theme.api.newMe.thirdRegister,
          data: param
        })
        .then(res => {
          console.log(JSON.stringify(res.data));
          // alert(JSON.stringify(res.data));
          if (res.data.success) {
            Indicator.close();
            Toast({
              message: "登录成功",
              position: "middle",
              duration: 1000
            });
            //设置
            res.data.data[0]['loginType'] = 2; //登录类型
            res.data.data[0]['params'] = param;
            that._setStorage(JSON.stringify(res.data.data[0]));
            // setTimeout(() => {
            //   that.apis.urlParams("index", {});
            //   if(!this.isIOS){
            //     var main = plus.android.runtimeMainActivity();
            //     var Helper = plus.android.importClass(that.apis.theme.api.rmtNews);
            //     var mHelper = new Helper();
            //     //调用java中的跳转方法，并且传入当前activity实例
            //     mHelper.reStart(main);
            //   }
            //   plus.runtime.restart();
            //   // that.apis.iback();
            // }, 1000);
          } else {
            // Indicator.close();
            // Toast({
            //   message: `${res.data.message}`,
            //   position: "middle",
            //   duration: 2000
            // });
            res.data['loginThirdType'] = 2;
            res.data['openid'] = openid;
            console.log(JSON.stringify(res.data),'微信登录成功');
            that.apis.urlParams("bindPhone");
            localStorage.setItem('thirdData',JSON.stringify( res.data ))
          }
        })
    },
    //qq登录
    qqLogin( qqParam ){
      let that = this;
      let param = {
        username: that.auths.qq.authResult.openid, //qq唯一id
        appInfoId:that.apis.theme.api.appInfoId,
        type:'1'
      };
      // console.log( JSON.stringify( that.auths ) )
      // qqParam['openid'] = that.auths.qq.authResult.openid;
      // qqParam['headimgurl'] = that.auths.qq.userInfo.figureurl_qq_1;//统一使用figureurl_qq_1 字段头像
      console.log( JSON.stringify(param) )
      that.axios({
        method: "post",
        url: that.apis.theme.api.newMe.thirdRegister,
        data: param
      })
      .then( res => {
        console.log(JSON.stringify(res.data ));
        if (res.data.success) {
          Indicator.close();
          Toast({
            message: "登录成功",
            position: "middle",
            duration: 1000
          });
          //设置
          res.data.data[0]['loginType'] = 1;
          res.data.data[0]['params'] = qqParam;
          that._setStorage(JSON.stringify(res.data.data[0]));
          setTimeout(() => {
            that.apis.urlParams("index", {});
            if(!this.isIOS){
              var main = plus.android.runtimeMainActivity();
              var Helper = plus.android.importClass(that.apis.theme.api.rmtNews);
              var mHelper = new Helper();
              mHelper.reStart(main);
            }
            plus.runtime.restart();
          }, 1000);
        } else {
          res.data['loginThirdType'] = 1; //登录类型
          res.data['openid'] = that.auths.qq.authResult.openid;
          that.apis.urlParams("bindPhone");
          localStorage.setItem('thirdData',JSON.stringify( res.data ))
        }
      })
      .catch( res => {
          console.log( JSON.stringify( res ) )
      })
    },
    //微博登陆
    weiboLogin(weiboParam){
      let that = this;
      let param = {
        username: weiboParam.openid, //微博id
        appInfoId:that.apis.theme.api.appInfoId,
        type:'3'
      };
      if( plus.os.name == 'iOS' ){
         param['openid'] = weiboParam.id;
      }
      console.log( JSON.stringify(weiboParam) )
      // weiboParam.headimgurl = weiboParam.avatar_hd;
      that.axios({
        method: "post",
        url: that.apis.theme.api.newMe.thirdRegister,
        data: param
      })
      .then( res => {
        if (res.data.success) {
            Indicator.close();
            Toast({
              message: "登录成功",
              position: "middle",
              duration: 1000
            });
            //设置
            res.data.data[0]['loginType'] = 3; //登录类型
            res.data.data[0]['params'] = param;
            that._setStorage(JSON.stringify(res.data.data[0]));
            // setTimeout(() => {
            //   that.apis.urlParams("index", {});
            //   if(!this.isIOS){
            //     var main = plus.android.runtimeMainActivity();
            //     var Helper = plus.android.importClass(that.apis.theme.api.rmtNews);
            //     var mHelper = new Helper();
            //     //调用java中的跳转方法，并且传入当前activity实例
            //     mHelper.reStart(main);
            //   }
            //   plus.runtime.restart();
            //   // that.apis.iback();
            // }, 1000);
          } else {
            res.data['loginThirdType'] = 3;
            res.data['openid'] = weiboParam.id;
            console.log(JSON.stringify(res.data));
            that.apis.urlParams("bindPhone");
            localStorage.setItem('thirdData',JSON.stringify( res.data ))
        }
      })
      .catch( res => {
          console.log( JSON.stringify( res ) )
      })
    },
    AndroisIos(){   //判断是否是安卓
      let u = navigator.userAgent;
      let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
      let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isAndroid) {
        return this.isIOS = false;
      } else if (isIOS) {
        return this.isIOS = true;
      }
    },
    //登陆
    landing() {
      let that = this;
      var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
      if (this.phone == "") {
        Toast("请输入手机号");
        return;
      }
      if (!reg.test(this.phone)) {
        Toast("请输入正确的手机号");
        return;
      }
      //判断用户使用什么登陆方式，相应验证
      if (this.userPwd) {
        if (this.userPassword == "") {
          Toast("请输入您的密码");
          return;
        }
      } else {
        if (this.verification == "") {
          Toast("请输入验证码");
          return;
        }
      }
      Indicator.open({
        text: "正在登录...",
        spinnerType: "double-bounce"
      });
      /**
       * @param  1  验证码登陆
       * @param  2  账号密码登陆
       */
      if (this.userPwd) {
        this.axios({
          method: "post",
          //root+'/login_al/login/loginByPassword'
          //this.apis.theme.api.me.loginByPassword
          url: this.apis.theme.api.newMe.signIn,
          data: {
            mobile: this.phone, //账号
            password: this.userPassword, //密码
            appInfoId:this.apis.theme.api.appInfoId
          }
        })
          .then(res => {
            console.log( res )
            if (res.data.success) {
              Indicator.close();
              Toast({
                message: "登录成功",
                position: "middle",
                duration: 1000
              });
              //设置 手机登陆类型
              res.data.data[0]['loginType'] = 1;
              res.data.data[0]['params'] = { 'mobilePhone':that.phone,'password':that.userPassword };
              this._setStorage(JSON.stringify(res.data.data[0]));
              // setTimeout(() => {
              //   that.apis.urlParams(" ", {});
              //   if(!this.isIOS){
              //     var main = plus.android.runtimeMainActivity();
              //     var Helper = plus.android.importClass(that.apis.theme.api.rmtNews);
              //     var mHelper = new Helper();
              //     //调用java中的跳转方法，并且传入当前activity实例
              //     mHelper.reStart(main);
              //   }
              //   plus.runtime.restart();
              
              //   // that.apis.iback();
              // }, 1000);
            } else {
              Indicator.close();
              Toast({
                message: `${res.data.result_message}`,
                position: "middle",
                duration: 1000
              });
            }
          })
          .catch(res => {
            Indicator.close();
            Toast({
              message: "网络请求失败",
              position: "middle",
              duration: 2000
            });
          });
      } else {
        this.axios({
          method: "post",
          url: that.apis.theme.api.newMe.checkCaptcha,
          data: {
            mobile: that.phone, //账号
            captcha: that.verification, //验证码
            appInfoId:that.apis.theme.api.appInfoId
          }
        })
          .then(res => {
            console.log( res )
            if (res.data.success) {
              Indicator.close();
              Toast({
                message: "登录成功",
                position: "middle",
                duration: 1000
              });
              this._setStorage(JSON.stringify(res.data.data[0]));
              setTimeout(() => {
                // that.apis.iback();
                that.apis.urlParams(" ", {});
                if(!this.isIOS){
                  var main = plus.android.runtimeMainActivity();
                  var Helper = plus.android.importClass(that.apis.theme.api.rmtNews);
                  var mHelper = new Helper();
                  //调用java中的跳转方法，并且传入当前activity实例
                  mHelper.reStart(main);
                }
                plus.runtime.restart();
              }, 1100);
            } else {
              Indicator.close();
              Toast({
                message: `${res.data.message}`,
                position: "middle",
                duration: 1100
              });
            }
          })
          .catch(res => {
            Indicator.close();
            Toast({
              message: "网络请求失败",
              position: "middle",
              duration: 1100
            });
          });
      }
    }
  },
  mounted() {
    // this.get_location();
    // console.log( this._setStorage() )
    this.AndroisIos();
  }
};
</script>
<style lang='less' scoped>
.back-white {
  position: fixed;
  width: 1.335rem;
  height: 1.335rem;
  background-size: 20px;
  left: 0;
}

.login {
  -ms-flex: 1;
  flex: 1;
  font-weight: 700;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
header{
    background: @headerBg;
    .nvbt:nth-child(1){
      background: @headerIback;
    }
    .nvtt{
      font-size: .36rem;
      font-weight: 500;
      color:@headerColor;
    }
}
#head {
  width: 100%;
  height: 50px;
  background-color: rgb(190, 44, 31);
  font-size: 19px;
  font-weight: bold;
  color: rgb(250, 250, 250);
  line-height: 50px;
  text-align: center;
}

#login {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .wrapper {
    width: 100%;
    padding-top: .88rem;
    .title {
      text-align: center;
      display: flex;
      justify-content: center;
      margin-top: 0.2rem;
      > span {
        font-size: 0.37rem;
      }
    }
  }

  .container {
    background: #fff;
  }

  .defaultImg {
    text-align: center;
    width: 100%;
    background-image: url('./bg.png');
    height: 4.64rem;
    background-size: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    padding-top: .5rem;
    >div{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      span{
        font-size:0.36rem;
        font-weight:500;
        color: #fff;
      }
      img {
        width: 1.85rem;
        height: 1.85rem;
        margin-bottom: .2rem;
      }
    }
    >span:nth-child(1){
      position: absolute;
      top: .6rem;
      left: .2rem;
      height: .88rem;;
      width: 1rem;
    }
    >span:nth-child(2){
      position: absolute;
      top: .8rem;
      right:.2rem;
      font-size: .32rem;
    }
    p {
      font-size: 0.5rem;
      padding-top: 0.2rem;
    }
  }

  .defaultLogin,
  .loginBox {
    width: 80%;
    margin: 0 auto;
    padding-top: 1rem;
    .defaultUser {
      position: relative;
      margin-bottom: 0.25rem;
      display: flex;
      input {
        background: #f3f3f3;
        width: 100%;
        height: 0.75rem;
        border-radius: 1rem;
        padding-left: 1rem;
        font-size: 0.3rem;
      }

      img {
          position: absolute;
          top: 0.2rem;
          left: 0.36rem;
          width: 0.3rem;
          height: 0.34rem;
      }

      .defaultYanz {
        position: absolute;
        top: 0.1rem;
        right: 0.1rem;
        width: 1.5rem;
        height: 0.57rem;
        border-radius: 0.5rem;
        text-align: center;
        line-height: 0.57rem;
        background: @dominantColor;
        color: #fff;
        font-size: 0.24rem;
      }
    }
    .toggleLogin {
      display: flex;
      font-size: 0.25rem;
      color: #ccc;
      justify-content: space-between;
    }
  }
  .sanfang {
    margin-top: 25px;
    display: flex;
    flex-direction: column;
    > div:nth-child(1) {
      display: flex;
      width: 100%;
      align-items: center;
      margin: 0 0.3rem;
      span:nth-child(1) {
        border-top: 0.02rem solid #e6e6e6;
        width: 36%;
      }
      span:nth-child(2) {
        font-size: 0.25rem;
        color: #a0a0a0;
        margin: 0 0.2rem;
      }
      span:nth-child(3) {
        border-top: 0.02rem solid #e6e6e6;
        width: 34%;
      }
    }
    .sanfangIcon {
      margin: 0 auto;
      margin-top: 0.6rem;
      img {
        width: 1rem;
        height: 1rem;
        margin-right: 15px;
      }
      img:last-child{
        margin:0;
      }
    }
  }
  .loginBox {
    margin: 0;
    width: 100%;
    height: 0.76rem;
    border-radius: 0.5rem;
    text-align: center;
    line-height: 0.76rem;
    margin-top: 30px;
    padding: 0;
    background: @dominantColor;
    color: #fff;
    font-size: 0.33rem;
  }

  .defaultTip {
    margin: 0 auto;
    width: 90%;
    margin-top: 1rem;
    text-align: center;

    span {
      position: relative;
      display: inline-block;
      vertical-align: middle;
      font-size: 0.32rem;
      color: #9f9f9f;
      letter-spacing: 5px;
      height: 0.8rem;
      line-height: 0.8rem;
    }

    span:before {
      content: "";
      position: absolute;
      width: 160%;
      top: 50%;
      left: -160%;
      transform: translateY(-50%);
      border-top: 1px solid #f5f5f5;
    }

    span:after {
      content: "";
      position: absolute;
      width: 160%;
      top: 50%;
      right: -160%;
      transform: translateY(-50%);
      border-top: 1px solid #f5f5f5;
    }
  }

  .loginList {
    height: 2.5rem;
    width: 200px;
    margin: 0 auto;

    .list-item {
      float: left;
      margin-left: 0.3rem;
      margin-top: 0.25rem;
      text-align: center;
    }
  }

  .loginText {
    color: #a1a1a1;
    font-size: 0.25rem;
    text-align: center;

    a {
      color: #a1a1a1;
    }
  }

  p {
    margin-top: 10px;
  }
}
</style>
<style lang="less">
.mint-spinner-double-bounce-bounce1,
.mint-spinner-double-bounce-bounce2 {
  background: @dominantColor !important;
}
.is-placebottom {
  padding: 10px 5px;
}
.navclolr{color:rgb(26, 26, 26)}
</style>
