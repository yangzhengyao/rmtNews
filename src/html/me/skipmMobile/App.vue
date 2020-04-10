<template>
  <!-- 加载更多 -->
  <div id="userCore">
    <header class="headerNavFixed">
      <div class="nvbt iback" @click="apis.iback()"></div>
      <div class="nvtt">更换手机号</div>
    </header>
    <div class="container contentNavFixed">
      <div class="friendsContent">
        <div class="defaultUser">
          <input type="text" name :placeholder="headerJson.loginType == 1 ? '请输入新手机号':'请输入手机号'" v-model="phone">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAARCAYAAAACCvahAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0MDk1MzUxZi1kNmY5LTY5NDgtOTVhYi1hZDM4ZTU4OTBiMjciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6N0NFOTA4QzFFQzlDMTFFODk1QzVBRTYzRjUzNDI1NDUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6N0NFOTA4QzBFQzlDMTFFODk1QzVBRTYzRjUzNDI1NDUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MGE3OTI3N2QtZDI4MS1hYzRjLTlmZWItZTQwNzMzZDhkYzMxIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjQwOTUzNTFmLWQ2ZjktNjk0OC05NWFiLWFkMzhlNTg5MGIyNyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PsXRQmIAAAEGSURBVHjaYpw5cyYDGuAC4hogDgZiMSA+C8QLgXgxukIWND4/EB8CYj0kMWco1gDiamTFTGiaJ6NpRAZVUEOwagbZGsqAH6Th08xBQLMELs1PgPghAc1ncGn+B8SteDT+BeI+fAE2G4ibsWh8CsQuUBpnVIFAHTTUvYGYB+qVzdicgk0zKOC+APECJDFeqLO/4XK2DhAvA+J7UEUgxX+A+D8QfwDiW0A8F4hV0TW7AvE5II4EYiEkOWYktjQQJwHxeSB2hAlKAvF2IGZlIA5wA/EOIBYHaa5EsoFYwAbEZSDNTgzkATeQZlEyNUuAoioRGhDS0HhlhqY2dMAIDaMv0LhfDBBgANJeK/y6zQXjAAAAAElFTkSuQmCC"
          >
        </div>
        <div class="defaultUser" >
          <input type="text"  placeholder="请输入验证码" v-model="verification">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAARCAYAAAACCvahAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0MDk1MzUxZi1kNmY5LTY5NDgtOTVhYi1hZDM4ZTU4OTBiMjciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6N0NFOTA4QzVFQzlDMTFFODk1QzVBRTYzRjUzNDI1NDUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6N0NFOTA4QzRFQzlDMTFFODk1QzVBRTYzRjUzNDI1NDUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MGE3OTI3N2QtZDI4MS1hYzRjLTlmZWItZTQwNzMzZDhkYzMxIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjQwOTUzNTFmLWQ2ZjktNjk0OC05NWFiLWFkMzhlNTg5MGIyNyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PpN3skIAAAFDSURBVHjanNM/KIVRHMbx997LZLGwMBhQkmwmJhYDJpsMBgZFCoPFLMJC3kQKyx0Ug8Fice+VhEFGFimxiPy7xPdXjzqd3rfudepzO+fc87x/zu89iTAMg5g2jiEcYATf/oISb1yKHoU6NFeLNixgB09uuBq9aEQ7aiKeognrmEEOF9iz8IZChbQKdMtgkp/K4H+tzMIvRQQyOFX/M1lEcBOtSGv8ZeGEBj9YwXlEcAn96MS05t5tw1JO2OqZxy2qND+LSVUk7Vwwb3d+1cD6l+rX4QHLCg54QWt3Fsg6E/W4wpuqMIwxrEW8Ss7Cq95kgz6CcoxiPmYDtyx8gznvj2Y8YjEmuGuv+FeqCZx4C1IxwQ99+4FbZzsIZwXU28p174ef0YLtmNC1Ttdh4JTHbXZm+9CFfSsHjjGlfThyF/8KMACdikGLuT3cuQAAAABJRU5ErkJggg=="
          >
          <div class="defaultYanz">
            <span v-if="!show">{{count}}s</span><span @click="phoneNum" style="font-size:.24rem;">{{ showWz ? '获取验证码':'重新获取' }}</span> 
          </div>
        </div>
        <div class="defaultUser" v-if="headerJson.loginType != 1">
          <!-- <mt-field label="密码" placeholder="请输入密码" type="password" v-model="userPassword"></mt-field> -->
          <input type="password"  placeholder="请输入手机密码" v-model="userPassword">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAARCAYAAAACCvahAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0MDk1MzUxZi1kNmY5LTY5NDgtOTVhYi1hZDM4ZTU4OTBiMjciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6N0NFOTA4QzVFQzlDMTFFODk1QzVBRTYzRjUzNDI1NDUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6N0NFOTA4QzRFQzlDMTFFODk1QzVBRTYzRjUzNDI1NDUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MGE3OTI3N2QtZDI4MS1hYzRjLTlmZWItZTQwNzMzZDhkYzMxIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjQwOTUzNTFmLWQ2ZjktNjk0OC05NWFiLWFkMzhlNTg5MGIyNyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PpN3skIAAAFDSURBVHjanNM/KIVRHMbx997LZLGwMBhQkmwmJhYDJpsMBgZFCoPFLMJC3kQKyx0Ug8Fice+VhEFGFimxiPy7xPdXjzqd3rfudepzO+fc87x/zu89iTAMg5g2jiEcYATf/oISb1yKHoU6NFeLNixgB09uuBq9aEQ7aiKeognrmEEOF9iz8IZChbQKdMtgkp/K4H+tzMIvRQQyOFX/M1lEcBOtSGv8ZeGEBj9YwXlEcAn96MS05t5tw1JO2OqZxy2qND+LSVUk7Vwwb3d+1cD6l+rX4QHLCg54QWt3Fsg6E/W4wpuqMIwxrEW8Ss7Cq95kgz6CcoxiPmYDtyx8gznvj2Y8YjEmuGuv+FeqCZx4C1IxwQ99+4FbZzsIZwXU28p174ef0YLtmNC1Ttdh4JTHbXZm+9CFfSsHjjGlfThyF/8KMACdikGLuT3cuQAAAABJRU5ErkJggg=="
          >
        </div>
        <button @click="commit" class="quit">提交</button>
        <!-- 暂无数据 -->
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
// import axios from "axios";
import qs from "qs";
//引入主页
import { Cell,Toast } from "mint-ui";
// import { Header } from "mint-ui";
// import { Toast } from "mint-ui";
// import  noData from 'components/noData.vue'
const root = process.env.API_ROOT;
export default {
  data() {
    return {
      initParams: {},
      headerJson: {}, //mock数据
      json: [],
      newUserName: "",
      defaultColor: false,
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
      auths: {}
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
        // console.log( this.apis.theme.api.me.getSms )
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
    getInputValue() {
      if (this.newUserName.length >= 1) {
        this.defaultColor = true;
      } else {
        this.defaultColor = false;
      }
    },
    //获取用户ID
    getParams() {
       let local = JSON.parse( localStorage.getItem('userData') );
       this.headerJson =  local;
      //  alert( JSON.stringify( this.headerJson ) )
       console.log( local )
    },
    commit() {
      // console.log(1111);
      //  this.apis.urlParams('./editUserName.html')
      let that = this;
      var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
      if (that.phone == "") {
        Toast("请输入手机号");
        return;
      }
      if (!reg.test(that.phone)) {
        Toast("请输入正确的手机号");
        return;
      }
      if (that.verification == "") {
          Toast("请输入验证码");
          return;
      }
      // 判断用户是用什么方式登录
      let params = {
          newmobile: that.phone,
          captcha:that.verification
      }
      if( that.headerJson.loginType != 1 ){
        if( that.userPassword == '' ){
            Toast({
              message: '请输入密码',
              position: "middle",
              duration: 1400
            });
            return;
        } else {
          params['newpassword'] = that.userPassword    
        }  
      }
      that.axios({
          method: "post",
          //this.apis.theme.api.me.modifyUserInfo
          //root + "/my_al/my/modifyUserInfo"
          url: that.apis.theme.api.me.modifyUserInfo,
          data: qs.stringify(params)
        })
        .then(res => {
          console.log(res);
          if (res.data.status == "1") {
            let locals = JSON.parse( localStorage.getItem('userData') );
            localStorage.setItem('userData',JSON.stringify( locals )) 
            Toast({
              message: res.data.message,
              position: "middle",
              duration: 1400
            });
            setTimeout( () =>{
              that.apis.iback();
            },1600)
          } else {
            Toast({
              message: res.data.message,
              position: "middle",
              duration: 1500
            });
          }
        });
    }
  },
  created() {
    this.getParams();
  },
  mounted() {}
};
</script>
<style scoped lang='less'>
// @import "../../../assets/communityIcon/iconfont.css";
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
#userCore {
  background: #f7f7f7;
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
    background: #fff;
    display: flex;
    flex-direction: column;
    padding: 1rem;
     
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
         .quit {
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
        .toggleLogin {
          display: flex;
          font-size: 0.25rem;
          color: #ccc;
          justify-content: space-between;
        }
  }
  .mint-cell {
    border-bottom: 1px solid #ccc;
  }
}
</style>
