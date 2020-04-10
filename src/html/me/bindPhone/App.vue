<template>
  <div id="login">
    <!-- 头部 -->
    <header class="headerNavFixed">
      <div
        class="nvbt iback"
        style="flex: 1;"
        @click="apis.iback()"
        :class=" apis.getTheme() == 'dongpo'?'iBlackBack':'iback'"
      ></div>
      <div class="nvtt" style="width:70%">绑定手机号</div>
    </header>
    <!-- 正文 -->
    <div class="container communityNavFixed">
      <div class="wrapper">
        <div class="defaultLogin">
          <div class="defaultUser">
            <input type="text" name placeholder="请输入手机号" v-model="phone" />
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAARCAYAAAACCvahAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0MDk1MzUxZi1kNmY5LTY5NDgtOTVhYi1hZDM4ZTU4OTBiMjciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6N0NFOTA4QzFFQzlDMTFFODk1QzVBRTYzRjUzNDI1NDUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6N0NFOTA4QzBFQzlDMTFFODk1QzVBRTYzRjUzNDI1NDUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MGE3OTI3N2QtZDI4MS1hYzRjLTlmZWItZTQwNzMzZDhkYzMxIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjQwOTUzNTFmLWQ2ZjktNjk0OC05NWFiLWFkMzhlNTg5MGIyNyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PsXRQmIAAAEGSURBVHjaYpw5cyYDGuAC4hogDgZiMSA+C8QLgXgxukIWND4/EB8CYj0kMWco1gDiamTFTGiaJ6NpRAZVUEOwagbZGsqAH6Th08xBQLMELs1PgPghAc1ncGn+B8SteDT+BeI+fAE2G4ibsWh8CsQuUBpnVIFAHTTUvYGYB+qVzdicgk0zKOC+APECJDFeqLO/4XK2DhAvA+J7UEUgxX+A+D8QfwDiW0A8F4hV0TW7AvE5II4EYiEkOWYktjQQJwHxeSB2hAlKAvF2IGZlIA5wA/EOIBYHaa5EsoFYwAbEZSDNTgzkATeQZlEyNUuAoioRGhDS0HhlhqY2dMAIDaMv0LhfDBBgANJeK/y6zQXjAAAAAElFTkSuQmCC"
            />
          </div>
          <div class="defaultUser">
            <input type="text" name id value placeholder="请输入验证码" v-model="verification" />
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAARCAYAAAACCvahAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0MDk1MzUxZi1kNmY5LTY5NDgtOTVhYi1hZDM4ZTU4OTBiMjciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6N0NFOTA4QzVFQzlDMTFFODk1QzVBRTYzRjUzNDI1NDUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6N0NFOTA4QzRFQzlDMTFFODk1QzVBRTYzRjUzNDI1NDUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MGE3OTI3N2QtZDI4MS1hYzRjLTlmZWItZTQwNzMzZDhkYzMxIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjQwOTUzNTFmLWQ2ZjktNjk0OC05NWFiLWFkMzhlNTg5MGIyNyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PpN3skIAAAFDSURBVHjanNM/KIVRHMbx997LZLGwMBhQkmwmJhYDJpsMBgZFCoPFLMJC3kQKyx0Ug8Fice+VhEFGFimxiPy7xPdXjzqd3rfudepzO+fc87x/zu89iTAMg5g2jiEcYATf/oISb1yKHoU6NFeLNixgB09uuBq9aEQ7aiKeognrmEEOF9iz8IZChbQKdMtgkp/K4H+tzMIvRQQyOFX/M1lEcBOtSGv8ZeGEBj9YwXlEcAn96MS05t5tw1JO2OqZxy2qND+LSVUk7Vwwb3d+1cD6l+rX4QHLCg54QWt3Fsg6E/W4wpuqMIwxrEW8Ss7Cq95kgz6CcoxiPmYDtyx8gznvj2Y8YjEmuGuv+FeqCZx4C1IxwQ99+4FbZzsIZwXU28p174ef0YLtmNC1Ttdh4JTHbXZm+9CFfSsHjjGlfThyF/8KMACdikGLuT3cuQAAAABJRU5ErkJggg=="
            />
            <div class="defaultYanz">
              <!---->
              <span v-if="!show">{{count}}s</span>
              <span @click="phoneNum" style="font-size:.24rem;">{{ showWz ? '获取验证码':'重新获取' }}</span>
            </div>
          </div>
          <div class="defaultUser">
            <!-- <mt-field label="密码" placeholder="请输入密码" type="password" v-model="userPassword"></mt-field> -->
            <input type="password" name id value placeholder="请输入密码" v-model="userPassword" />
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAARCAYAAAACCvahAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0MDk1MzUxZi1kNmY5LTY5NDgtOTVhYi1hZDM4ZTU4OTBiMjciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6N0NFOTA4QzVFQzlDMTFFODk1QzVBRTYzRjUzNDI1NDUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6N0NFOTA4QzRFQzlDMTFFODk1QzVBRTYzRjUzNDI1NDUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MGE3OTI3N2QtZDI4MS1hYzRjLTlmZWItZTQwNzMzZDhkYzMxIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjQwOTUzNTFmLWQ2ZjktNjk0OC05NWFiLWFkMzhlNTg5MGIyNyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PpN3skIAAAFDSURBVHjanNM/KIVRHMbx997LZLGwMBhQkmwmJhYDJpsMBgZFCoPFLMJC3kQKyx0Ug8Fice+VhEFGFimxiPy7xPdXjzqd3rfudepzO+fc87x/zu89iTAMg5g2jiEcYATf/oISb1yKHoU6NFeLNixgB09uuBq9aEQ7aiKeognrmEEOF9iz8IZChbQKdMtgkp/K4H+tzMIvRQQyOFX/M1lEcBOtSGv8ZeGEBj9YwXlEcAn96MS05t5tw1JO2OqZxy2qND+LSVUk7Vwwb3d+1cD6l+rX4QHLCg54QWt3Fsg6E/W4wpuqMIwxrEW8Ss7Cq95kgz6CcoxiPmYDtyx8gznvj2Y8YjEmuGuv+FeqCZx4C1IxwQ99+4FbZzsIZwXU28p174ef0YLtmNC1Ttdh4JTHbXZm+9CFfSsHjjGlfThyF/8KMACdikGLuT3cuQAAAABJRU5ErkJggg=="
            />
          </div>
          <div class="loginBox" @click="landing">确认</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapActions } from "vuex";
import { Indicator, Toast, Field } from "mint-ui";
export default {
  name: "login",
  data() {
    return {
      hide: false,
      GPSLocation: {},
      show: true,
      showWz: true,
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
      verification: "", //验证码
      isIOS: false,
      thirdData: {} //第三方登录信息
    };
  },
  methods: {
    ...mapMutations("login", ["_setStorage"]),
    register() {
      this.apis.urlParams("register");
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
            status: 2
          }
        }).then(res => {
          console.log( res.data.data[0] );
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
      if (this.verification == "") {
        Toast("请输入验证码");
        return;
      }
      if (this.userPassword == "") {
        Toast("请输入您的密码");
        return;
      }
      Indicator.open({
        text: "正在登录...",
        spinnerType: "double-bounce"
      });
      console.log( JSON.stringify( {
          username: that.thirdData.openid,
          type: that.thirdData.loginThirdType, //登录类型
          appInfoId: that.apis.theme.api.appInfoId,
          mobilePhone: that.phone, //账号
          password: that.userPassword //密码
        } ) )
      this.axios({
        method: "post",
        url: this.apis.theme.api.newMe.thirdBindPhone,
        data: {
          username: that.thirdData.openid,
          type: that.thirdData.loginThirdType, //登录类型
          appInfoId: that.apis.theme.api.appInfoId,
          mobile: that.phone, //账号
          password: that.userPassword //密码
        }
      })
      .then(res => {
        if (res.data.success) {
          Indicator.close();
          Toast({
            message: "绑定手机号成功",
            position: "middle",
            duration: 1500
          });
          //设置 手机登陆类型
          // res.data.data["loginType"] = 1;
          // res.data.data["params"] = {
          //   mobilePhone: that.phone,
          //   password: that.userPassword
          // };
          // this._setStorage(JSON.stringify(res.data.data));
          // setTimeout(() => {
          //   that.apis.urlParams(" ", {});
          //   if (!this.isIOS) {
          //     var main = plus.android.runtimeMainActivity();
          //     var Helper = plus.android.importClass(
          //       that.apis.theme.api.rmtNews
          //     );
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
    }
  },
  mounted() {
    // this.AndroisIos();
    this.thirdData = JSON.parse(localStorage.getItem("thirdData"));
  }
};
</script>
<style lang='less' scoped>
.login {
  -ms-flex: 1;
  flex: 1;
  font-weight: 700;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
header {
  background: @headerBg;
  .nvbt:nth-child(1) {
    background: @headerIback;
  }
  .nvtt {
    font-size: 0.36rem;
    font-weight: 500;
    color: @headerColor;
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
    padding-top: 0.88rem;
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
  .defaultLogin,
  .loginBox {
    width: 80%;
    margin: 0 auto;
    // padding-top: 1rem;
    .defaultUser {
      position: relative;
      margin-bottom: 0.25rem;
      display: flex;
      input {
        background: #f3f3f3;
        width: 100%;
        height: 0.8rem;
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
  .loginBox {
    height: 0.8rem;
    background: @dominantColor;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 0.34rem;
    padding: 0;
    margin: 0;
    width: 100%;
    border-radius: 1rem;
    margin-top: 0.8rem;
  }
  .container {
    background: #fff;
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
.navclolr {
  color: rgb(26, 26, 26);
}
</style>
