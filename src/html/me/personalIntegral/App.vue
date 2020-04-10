  <template>
  <div id="personalIntegral">
    <div class="scroll-wrapper">
      <div class="bg">
        <img src="./img/iback.png" alt @click="apis.iback()" />
        <div class="integral-title">我的积分</div>
        <div class="integral-detail" @click="toDetail">积分明细</div>
        <div class="user-integral">
          <div class="range"></div>
          <span class="range-text">小白</span>
        </div>
        <p class="total-integral">
          总积分:
          <span>{{userExpScore}}</span>
        </p>
      </div>
      <div class="content">
        <div class="integral-list">
          <ul>
            <li v-for="(item,index) in taskList" :key="index"  v-if="item.status">
            <!-- <li v-for="(item,index) in taskList" :key="index" v-if="item.status"> -->
              <div class="word-box">
                <p class="integral-type">{{item.taskName}}</p>
                <p class="tips">{{item.taskDetail}}</p>
              </div>
              <div v-if="isComlete(item.taskDoneRate) == 1" class="integral-btn done">
                <span>已完成</span>
              </div>
              <div v-else-if="isComlete(item.taskDoneRate)>0&&isComlete(item.taskDoneRate)<1" class="integral-btn" @click="toFinish(item.forwardUrl)">
                <span>{{item.taskDoneRate}}</span>
              </div>
              <div v-else class="integral-btn" @click="toFinish(item.forwardUrl)">
                <span>{{item.forwardName}}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from "../../../../src/assets/js/api.js";
import { mapGetters, mapMutations, mapActions, mapState } from "vuex";
import { Toast } from "mint-ui";
export default {
  name: "personalIntegral",
  data() {
    return {};
  },
  computed: {
    ...mapGetters("login", [
      "getStorge" // active的栏目
    ]),
    ...mapState("integral",[
      "taskList","userExpScore"
    ])
  },
  mounted() {
    // this.updateUserRecordTime()
    //this.searchUserExpItem()
    //this.searchUserTotalExpDaily()
  },
  methods: {
    ...mapActions("integral", [
      "loginUpdate",
      "updateUserRecordTime",
      "searchUserExpItem",
      "searchUserTotalExpDaily"
    ]),
    toDetail() {
      api.urlParams("IntegralDetail");
    },
    isComlete(str){ //判断任务是否完成
      return eval(str)
    },
    toFinish(url) { //去完成任务
      if(url == 'share' || url == 'publish'){
        api.urlParams(url);
      }else{
        localStorage.setItem('goNews','true')
        this.apis.iback()
      }
    }
  }
};
</script>
<style lang='less' scoped>
.bg {
  background-image: url("./img/bg.png");
  height: 5.58rem;
  background-size: cover;
  text-align: center;
  color: #fff;
  line-height: 0.88rem;
  > img:nth-child(1) {
    position: absolute;
    height: 0.88rem;
    margin-top: 0.6rem;
    left: 0;
  }
  .integral-title {
    font-size: 0.36rem;
    position: absolute;
    height: 0.88rem;
    margin-top: 0.6rem;
    left: 50%;
    transform: translateX(-50%);
    font-weight: 500;
  }
  .integral-detail {
    font-size: 0.3rem;
    position: absolute;
    height: 0.88rem;
    margin-top: 0.6rem;
    right: 0.3rem;
  }
  .total-integral {
    font-size: 0.28rem;
    color: rgba(255, 45, 35, 1);
    padding-top: 2.5rem;
    span {
      font-size: 0.88rem;
      font-weight: 500;
      color: rgba(227, 37, 25, 1);
    }
  }
  .user-integral {
    background: rgba(227, 37, 25, 0.8);
    color: #fff;
    font-size: 0.25rem;
    position: absolute;
    top: 1.88rem;
    right: 0.66rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 0.42rem;
    line-height: 0.42rem;
    padding: 0 0.26rem 0 0rem;
    border-radius: 1rem;
    .range {
      width: 0.42rem;
      height: 0.42rem;
      background-image: url(./img/v1.png);
      background-size: cover;
    }
    .range-text {
      margin-left: 0.14rem;
    }
  }
}
#personalIntegral {
  .content {
    background: #f5f5f5 !important;
    padding: 0 0.3rem;
  }
  .integral-list {
    background: #fff;
    border-radius: 0.2rem;
    position: relative;
    top: -0.7rem;
    padding: 0 0.15rem;
    font-size: 0.32rem;
    color: rgba(26, 26, 26, 1);
    li {
      border-bottom: 0.01rem solid #e6e6e6;
      display: flex;
      justify-content: space-between;
      align-items: center;
      &:last-child {
        border-bottom: none;
      }
    }
    .word-box {
      padding: 0.34rem 0 0.34rem 0.19rem;
      .tips {
        font-size: 0.24rem;
        color: rgba(153, 153, 153, 1);
        margin-top: 0.1rem;
      }
    }
    .integral-btn {
      margin-right: 0.19rem;
      font-size: 0.28rem;
      width: 1.4rem;
      text-align: center;
      background: rgba(255, 244, 202, 1);
      border-radius: 1rem;
      color: rgba(200, 136, 47, 1);
      display: flex;
      align-items: center;
      justify-content: center;
      height: 0.46rem;
      span {
        display: block;
      }
    }
    .done {
      background: rgba(217, 217, 217, 1);
      color: rgba(255, 255, 255, 1);
    }
    .receive {
      background: rgba(227, 37, 25, 1);
      color: rgba(255, 255, 255, 1);
    }
  }
}
</style>
