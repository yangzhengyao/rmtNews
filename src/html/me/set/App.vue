
  <template>
  <div id="set">
    <header class="com_header headerNavFixed">
      <div class="nvbt iback" @click="apis.iback()"></div>
      <div class="nvtt">设置</div>
      <div class="nvbt idoc"></div>
    </header>

    <div class="container contentNavFixed com_contentNavFixed" style="margin-top:.3rem">
      <div class="opinion" @click="userMsg">
        <mt-cell title="个人中心">
          <i class="icon-arrow-right"></i>
        </mt-cell>
      </div>
      <div class="opinion" @click="yinsi">
        <mt-cell title="隐私政策">
          <i class="icon-arrow-right"></i>
        </mt-cell>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "user",
  data() {
    return {
      value: false
    };
  },
  methods: {
    ...mapMutations("login", ["_RemoveStorage", "_setStorage"]),
    userMsg() {
      let that = this;
      if (JSON.parse(localStorage.getItem("userData") == null)) {
        that.apis.urlParams("Login");
      } else {
        that.apis.urlParams("userCore");
        plus.webview.getWebviewById("userCore").addEventListener(
          "close",
          function(e) {
            let locals = JSON.parse(localStorage.getItem("userData"));
            that._setStorage(JSON.stringify(locals));
          },
          false
        );
      }
    },
    yinsi(){
      let that = this;
      that.apis.urlParams("yinsi");
    }
  },
  created() {},
  watch: {
    value() {
      if (this.value == true) {
        alert("切换夜间模式");
      }
    }
  }
};
</script>
<style lang='less' scoped>
.personage {
  position:relative img {
    bottom: 14px;
    width: 20px;
    position: absolute;
    display: inline-block;
    z-index: 999;
    left: 15px;
  }
}

.set {
  position:relative img {
    bottom: 14px;
    width: 20px;
    position: absolute;
    display: inline-block;
    z-index: 999;
    left: 15px;
  }
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
.us {
  position:relative img {
    bottom: 14px;
    width: 20px;
    position: absolute;
    display: inline-block;
    z-index: 999;
    left: 15px;
  }
}

.opinion {
  position: relative;
  img {
    bottom: 14px;
    width: 20px;
    position: absolute;
    display: inline-block;
    z-index: 999;
    left: 15px;
  }
}

.collect {
  position: relative;
  img {
    bottom: 14px;
    width: 20px;
    position: absolute;
    display: inline-block;
    z-index: 999;
    left: 15px;
  }
}

.comment {
  position: relative;
  img {
    bottom: 14px;
    width: 20px;
    position: absolute;
    display: inline-block;
    z-index: 999;
    left: 15px;
  }
}

#set {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  font-size: 0.37rem;
  // padding-bottom: 48px;
  background-color: #f2f2f2;
  overflow: auto;
  a {
    text-decoration: none;
  }
  .loginState {
    // font-family: monospace;
    position: relative;
    width: 100%;
    height: 4.6rem;
    //   overflow-y: scroll

    .wrapper {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      .userProfile {
        display: block;
        border-radius: 50%;
        width: 2.7rem;
        height: 2.7rem;
        text-align: center;
        vertical-align: middle;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
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
    margin: 0.6rem 0;
    position: relative;
    top: 26px;
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
  height: 45px;
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
</style>
