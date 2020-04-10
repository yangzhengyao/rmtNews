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
              <span :class="{ 'questionClass':questionObj.question_status == '0' }">
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
                <div class="Answer">
                  <span></span>
                  {{ questionObj.question_status == '0' ?'暂无回复':questionObj.replay_content }}
                </div>
              </div>
            </div>
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
      questionObj: {}
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
    }
  },
  mounted() {
    this.init();
  }
};
</script>
<style lang="less" scoped>
.questionClass{
     color: @nQuestionColor !important;
}
.questionAnswer {
  .title {
    padding: 0.2475rem;
    background: #f5f5f5;
    margin-top: .28rem;
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
        color: @yQuestionColor;
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
      }
    }
  }
}
</style>
