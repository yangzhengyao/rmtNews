  <template>
  <div id="feedback">
    <div id="set">
      <header class="com_header headerNavFixed">
        <div class="nvbt iback" @click="apis.iback()"></div>
        <div class="nvtt" >意见反馈</div>
        <div class="nvbt"></div>
      </header>
    </div>
    <div class="container contentNavFixed com_contentNavFixed" style="margin-top:.3rem">
      <div class="from">
        <textarea
          name="user_text"
          cols="30"
          rows="10"
          contenteditable="true"
          style="-webkit-user-select: auto;"
          placeholder="请输入您宝贵的意见或者建议"
          v-model="show"
        ></textarea>
      </div>

      <div class="group">
        <input type="text" placeholder="您的手机号/QQ/邮箱(选填)" v-model="relation">
      </div>
      <div class="quit" @click="submit">
        <span>提交</span>
      </div>
    </div>
  </div>
</template>
<script>
const root = process.env.API_ROOT;
import qs from "qs";
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "user",
  data() {
    return {
      show: "",
      relation: "",
      quit: true
    };
  },
  computed: {
    ...mapGetters("login", [
      "getStorge" // active的栏目
    ])
  },
  methods: {
    submit() {
      let that = this;
      if (JSON.parse(localStorage.getItem("userData") == null)) {
        that.apis.urlParams("Login", {});
      } else {
        if (that.show.length <= 0) {
          plus.nativeUI.alert(
            "意见反馈内容不能为空",
            function() {},
            "提示",
            "确定"
          );
          return;
        }
        if (that.show.length > 80) {
          plus.nativeUI.alert(
            "意见反馈内容字数不能超过80个字符",
            function() {},
            "提示",
            "确定"
          );
          return;
        }
        that.axios({
          // root+'/my_al/my/addUserFeedback'
          // that.apis.theme.api.me.addUserFeedback
          url: that.apis.theme.api.me.addUserFeedback,
          method: "post",
          data: qs.stringify({
            content: that.show,
            contact: that.relation
          })
        }).then(res => {
          console.log(res.data);
          if (res.data.message == "成功") {
            plus.nativeUI.alert("提交成功", function() {}, "提示", "确定");
            that.apis.iback();
          }
        });
      }
    }
  },

  watch: {
    show() {
      this.quit = false;
      if (this.show.length == 0) {
        this.quit = true;
      }
    }
  }
};
</script>
<style lang='less' scoped>
body {
  background-color: #f2f2f2;
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
.from {
  text-align: center;
  padding: 10px 10px 63px 10px;
  textarea {
    width: 100%;
    height: 3.5rem;
    border-radius: 4px;
    font-size: .34rem;
    outline: none;
    padding: .2rem;
    display: inline-block;
    display: inline;
    zoom: 1;
    letter-spacing: normal;
    word-spacing: normal;
    resize: none;
    border: none;
    font-family: -webkit-body;
    font-size: .32rem;
  }
}
.group {
  position: relative;
  text-align: center;
  margin: 0.2rem 0;
  input {
    width: calc(100% - 20px);
    // height: 0;
    border-radius: 4px;
    font-size: .34rem;
    outline: none;
    padding: .1rem;
    display: inline-block;
    display: inline;
    zoom: 1;
    letter-spacing: normal;
    word-spacing: normal;
    position: absolute;
    bottom: 25px;
    left: 10px;
    font-size: .3rem;
  }
}
p {
  font-size: 14px;
  color: rgba(189, 186, 186, 0.8);
  position: relative;
  bottom: 75px;
  width: 100%;
  left: 46px;
}
.forbidden {
  // color: @dominantColor;
  height: 35px;
  text-align: center;
  line-height: 35px;
  // margin-top: -50px;
  font-size: 18px;
  width: 50%;
  padding: 0 10px;
  margin: 0 auto;
  span {
    display: block;
    background-color: #ccc;
    color: #fff;
    border-radius: 4px;
  }
}
.quit {
  // color: @dominantColor;
  height: .7rem;
  text-align: center;
  line-height: .7rem;
  // margin-top: -50px;
  font-size: .36rem;
  width: 50%;
  padding: 0 .1rem;
  margin: 0 auto;
  span {
    display: block;
    background-color: @dominantColor;
    color: #fff;
    border-radius: 4px;
  }
}
#feedback {
  width: 100%;
  height: 100vh;
  background-color: #f2f2f2;
}
.navclolr{color:rgb(26, 26, 26)}
</style>
