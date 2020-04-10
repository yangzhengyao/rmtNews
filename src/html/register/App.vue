<template>
  <div id="login">
    <!-- 头部 -->
    <header class="headerNavFixed">
      <div class="nvbt iback" style="flex: 1;" @click="apis.iback()"></div>
      <div class="nvtt" style="width:70%">注 册</div>
    </header>
    <!-- 正文 -->
    <div class="container communityNavFixed">
      <div class="wrapper">
        <div class="defaultImg">
          <img :src='"~@/assets/img/"+apis.getTheme()+"/login/logo.png"'>
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
          <div class="defaultUser">
            <input type="text" name id value placeholder="请输入验证码" v-model="verification">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAARCAYAAAACCvahAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0MDk1MzUxZi1kNmY5LTY5NDgtOTVhYi1hZDM4ZTU4OTBiMjciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6N0NFOTA4QzVFQzlDMTFFODk1QzVBRTYzRjUzNDI1NDUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6N0NFOTA4QzRFQzlDMTFFODk1QzVBRTYzRjUzNDI1NDUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MGE3OTI3N2QtZDI4MS1hYzRjLTlmZWItZTQwNzMzZDhkYzMxIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjQwOTUzNTFmLWQ2ZjktNjk0OC05NWFiLWFkMzhlNTg5MGIyNyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PpN3skIAAAFDSURBVHjanNM/KIVRHMbx997LZLGwMBhQkmwmJhYDJpsMBgZFCoPFLMJC3kQKyx0Ug8Fice+VhEFGFimxiPy7xPdXjzqd3rfudepzO+fc87x/zu89iTAMg5g2jiEcYATf/oISb1yKHoU6NFeLNixgB09uuBq9aEQ7aiKeognrmEEOF9iz8IZChbQKdMtgkp/K4H+tzMIvRQQyOFX/M1lEcBOtSGv8ZeGEBj9YwXlEcAn96MS05t5tw1JO2OqZxy2qND+LSVUk7Vwwb3d+1cD6l+rX4QHLCg54QWt3Fsg6E/W4wpuqMIwxrEW8Ss7Cq95kgz6CcoxiPmYDtyx8gznvj2Y8YjEmuGuv+FeqCZx4C1IxwQ99+4FbZzsIZwXU28p174ef0YLtmNC1Ttdh4JTHbXZm+9CFfSsHjjGlfThyF/8KMACdikGLuT3cuQAAAABJRU5ErkJggg=="
            >
            <div class="defaultYanz">
              <!---->
              <span v-if="!show">{{count}}s</span>
              <span @click="phoneNum" style="font-size:.24rem;">获取验证码</span>
            </div>
          </div>
          <div class="defaultUser">
            <input type="password" name v-model="userPwd" placeholder="请输入账户密码">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAARCAYAAAACCvahAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0MDk1MzUxZi1kNmY5LTY5NDgtOTVhYi1hZDM4ZTU4OTBiMjciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6N0NFOTA4QzVFQzlDMTFFODk1QzVBRTYzRjUzNDI1NDUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6N0NFOTA4QzRFQzlDMTFFODk1QzVBRTYzRjUzNDI1NDUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MGE3OTI3N2QtZDI4MS1hYzRjLTlmZWItZTQwNzMzZDhkYzMxIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjQwOTUzNTFmLWQ2ZjktNjk0OC05NWFiLWFkMzhlNTg5MGIyNyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PpN3skIAAAFDSURBVHjanNM/KIVRHMbx997LZLGwMBhQkmwmJhYDJpsMBgZFCoPFLMJC3kQKyx0Ug8Fice+VhEFGFimxiPy7xPdXjzqd3rfudepzO+fc87x/zu89iTAMg5g2jiEcYATf/oISb1yKHoU6NFeLNixgB09uuBq9aEQ7aiKeognrmEEOF9iz8IZChbQKdMtgkp/K4H+tzMIvRQQyOFX/M1lEcBOtSGv8ZeGEBj9YwXlEcAn96MS05t5tw1JO2OqZxy2qND+LSVUk7Vwwb3d+1cD6l+rX4QHLCg54QWt3Fsg6E/W4wpuqMIwxrEW8Ss7Cq95kgz6CcoxiPmYDtyx8gznvj2Y8YjEmuGuv+FeqCZx4C1IxwQ99+4FbZzsIZwXU28p174ef0YLtmNC1Ttdh4JTHbXZm+9CFfSsHjjGlfThyF/8KMACdikGLuT3cuQAAAABJRU5ErkJggg=="
            >
          </div>
          <div class="loginBox" @click="landing">注 册</div>
          <div class="selectPair">
            <!-- <img :src="NopPairImgUrl" alt @click="selectPair(pairImg)"> -->
            <span>
              点击注册表示您已阅读并同意
              <span>《注册协议》</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapActions } from "vuex";
import qs from "qs";
import { Indicator, Toast } from "mint-ui";
const root = process.env.API_ROOT;
export default {
  name: "login",
  data() {
    return {
      hide: false,
      GPSLocation: {},
      show: true,
      timer: null,
      userPwd: "",
      count: "",
      disabled: false,
      NopPairImgUrl: require("./images/noPairImg.png"),
      pairImg: 1,
      phone: "",
      time: 0,
      verification: ""
    };
  },
  methods: {
    // selectPair(index) {
    //   if (index == 1) {
    //     this.NopPairImgUrl = require("./images/pairImg.png");
    //     this.pairImg = 2;
    //   } else {
    //     this.NopPairImgUrl = require("./images/noPairImg.png");
    //     this.pairImg = 1;
    //   }
    // },
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
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
        //获取验证码接口
        this.axios({
          method: "post",
          // root+'/login_al/login/getSms'
          // this.apis.theme.api.me.getSms 
          url: this.apis.theme.api.me.getSms, 
          data: qs.stringify({ mobilePhone: this.phone })
        }).then(res => {
          if (res.data.status == "1") {
            Toast({
              message: "验证码已发送,请注意查收",
              position: "bottom",
              duration: 2000
            });
          } else {
             Toast({
              message: res.data.message,
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
    landing() {
      let that = this;
      var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
      //var url="/nptOfficialWebsite/apply/sendSms?mobile="+this.ruleForm.phone;
      if (this.phone == "") {
        // this.$toast({ message: "请输入手机号", duration: 2000 });
        Toast("请输入手机号");
      } else if (!reg.test(this.phone)) {
        // this.$toast({ message: "请输入正确的手机号", duration: 2000 });
        Toast("请输入正确的手机号");
      } else if (this.verification == "") {
        // this.$toast({ message: "请输入正确验证码", duration: 2000 });
        Toast("请输入正确的验证码");
      } else if (this.userPwd == "") {
        Toast("请设置您的账户密码");
      } else {
        Indicator.open({
          text: "正在注册...",
          spinnerType: "double-bounce"
        });
        this.axios({
          method: "post",
          // root+'/login_al/login/register'
          // this.apis.theme.api.me.register
          url: this.apis.theme.api.me.register,  
          data: qs.stringify({
            mobilePhone: this.phone, //手机号
            captcha: this.verification, //验证码
            password: this.userPwd //账户密码
          })
        })
          .then(res => {
            console.log(res);
            if (res.data.status == "1") {
              Indicator.close();
              Toast({
                message: `${res.data.data.result_message}`,
                position: "bottom",
                duration: 2000
              });
              setTimeout(() => {
                // that.apis.urlParams("./login.html", {});
                that.apis.iback();
              }, 2100);
            } else {
              Indicator.close();
              Toast({
                message: `${res.data.data.result_message}`,
                position: "bottom",
                duration: 2000
              });
              that.phone = "";
              that.verification = "";
              that.userPwd = "";
              // that.selectPair(2);
            }
          })
          .catch(res => {
            Indicator.close();
            Toast({
              message: "网络请求失败",
              position: "bottom",
              duration: 2000
            });
          });
      }
    }
  },
  mounted() {
    // this.get_location();
  }
};
</script>
<style lang='less' scoped>
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
    margin-top: 0.4rem;
    img {
      width: 1.85rem;
      height: 1.85rem;
      margin-top: 10px;
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
  }
  .selectPair {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: .1rem;
    > img {
      width: 0.3rem;
      height: 0.3rem;
      margin-right: 0.2rem;
      margin-left: 0.36rem;
    }
    > span {
      font-size: 0.25rem;
      color: #ccc;
      >span{
        color: #3fa2ff;
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
    margin-top: 1rem;
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
  p {
    margin-top: 10px;
  }
}
</style>
<style lang='less'>
.mint-spinner-double-bounce-bounce1,
.mint-spinner-double-bounce-bounce2 {
  background: @dominantColor !important;
}
</style>

