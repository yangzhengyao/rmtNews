<template>
  <transition name="fadeIn">
    <!-- 正文 -->
    <div class="content contentNavFixed com_contentNavFixed">
      <div class="container">
        <div class="questionAnswer">
          <div class="title">
            <p>{{ questionObj.title }}</p>
            <div>
              <span>{{ questionObj.question_type }}</span>
              <span>
                <img src="./../images/pairImg.png" alt v-if="questionObj.question_status == '1'">
                {{ questionObj.question_status == '0'? '未回复':'已回复' }}
              </span>
            </div>
          </div>
          <div class="contanier">
            <div class="item">
              <div class="wen">
                <img src="./../images/wenImg.png" alt>
              </div>
              <div class="msg">
                <div class="name">
                  <span>{{ questionObj.user_name }}</span>
                  <span>{{ questionObj.question_time }}</span>
                </div>
                <span class="who">向 {{ questionObj.question_obj }} 提问</span>
                <div class="Answer">
                  <span></span>
                  {{ questionObj.question_content }}
                </div>
              </div>
            </div>
            <!-- 未登陆回复的信息 -->
            <div class="item">
              <div class="wen">
                <img src="./../images/daImg.png" alt>
              </div>
              <div class="msg">
                <div class="name">
                  <span>{{ questionObj.question_obj }}</span>
                  <span>{{ questionObj.replay_time }}</span>
                </div>
                <div class="Answer" style="padding:.2rem">
                  <span></span>
                  <textarea
                    rows="10"
                    cols="30"
                    contenteditable="true"
                    style="-webkit-user-select: auto;"
                    placeholder="请回复"
                    v-model="introduction"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <!-- 回复 -->
          <div class="navbar" @click="questionCommit">
            <span>提交</span>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
const root = process.env.API_ROOT;
import qs from "qs";
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "questionAnswer",
  data() {
    return {
      title: "问答",
      questionObj: {},
      introduction: ""
    };
  },
  computed: {
    ...mapGetters("login", [
      "getStorge" // active的栏目
    ])
  },
  methods: {
    init() {
      let question_id = localStorage.getItem("questionAnswer");
      console.log(question_id);
      let postData = {
        question_id: JSON.parse(question_id).question_id
      };
      this.axios({
        method: "post",
        url: this.apis.theme.api.services.getWzQuestionAndReplayDetail, //this.apis.theme.api.services.getWzQuestionAndReplayDetail  root+'/wz_al/wz/getWzQuestionAndReplayDetail'
        data: qs.stringify(postData)
      }).then(res => {
        if (res.data.status == "1") {
          this.questionObj = res.data.data;
          console.log(this.questionObj);
        }
      });
    },
    questionCommit() {
      let question_id = localStorage.getItem("questionAnswer");
      if (this.introduction == "" || this.introduction == "请回复") {
        plus.nativeUI.alert("请输入要回复内容", function() {}, "提示", "确定");
        return;
      }
      let that = this;
      let param = {
        content: this.introduction,
        question_id: JSON.parse(question_id).question_id
      };
      let url = root + "/wz_al/wz/addWzServiceReplay";
      this.axios({
        method: "post",
        //this.apis.theme.api.services.getWzServiceQuestions
        url: this.apis.theme.api.services.addWzServiceReplay,
        data: qs.stringify(param)
      }).then(res => {
        console.log(res);
        if (res.data.status == "1") {
          plus.nativeUI.alert("回复成功", function() {}, "提示", "确定");
          this.apis.urlParams("./certificate.html");
        }
      });
    }
  },
  mounted() {
    this.init();
  }
};
</script>
<style lang="less" scoped>
.questionAnswer {
  .title {
    padding: 0.2475rem;
    background: #f5f5f5;
    p {
      font-size: 0.4162rem;
      color: #262626;
      line-height: 1;
      margin-bottom: 0.1995rem;
    }
    > div {
      display: flex;
      justify-content: space-between;
      span {
        font-size: 0.2775rem;
        color: #b5b5b5;
      }
      > span:nth-child(2) {
        img {
          width: 0.24rem;
          height: 0.24rem;
        }
        color: @dominantColor;
        display: flex;
        align-items: center;
      }
    }
  }
  .contanier {
    padding: 0.345rem 0.2475rem;
    .item {
      display: flex;
      margin-bottom: 0.39rem;
      .wen {
        width: 0.42rem;
        height: 0.42rem;
        margin-right: 0.36rem;
        img {
          width: 100%;
        }
      }
      .msg {
        width: 100%;
        .name {
          display: flex;
          justify-content: space-between;
          font-size: 0.3465rem;
          align-items: center;
          line-height: 1;
          margin-bottom: 0.075rem;
          > span:nth-child(1) {
            color: #262626;
            line-height: 1;
          }
          > span:nth-child(2) {
            color: #999999;
          }
        }
        .who {
          color: @dominantColor;
          font-size: 0.2497rem;
          display: block;
        }
      }
      .Answer {
        font-size: 0.3rem;
        padding: 0.1995rem 0.3195rem;
        background: #f5f5f5;
        border-radius: 5px;
        margin-top: 0.285rem;
        position: relative;
        span {
          width: 0;
          height: 0;
          border-right: 10px solid transparent;
          border-left: 10px solid transparent;
          border-bottom: 10px solid #f5f5f5;
          position: absolute;
          left: 0.42rem;
          top: -9px;
        }
        textarea {
          width: 100% !important;
          border: none;
          margin-top: 0.1rem;
          height: 2.5rem !important;
          outline: none;
          font-size: 0.32rem;
          //   text-indent: 20px;
        }
      }
    }
  }
  .navbar {
    position: fixed;
    bottom: 0;
    left: 0;
    background: @dominantColor;
    height: 50px;
    width: 100%;
    text-align: center;
    font-size: 0.333rem;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
