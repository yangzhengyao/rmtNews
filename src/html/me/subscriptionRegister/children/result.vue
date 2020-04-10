  <template>
  <div id="result">
    <header class="com_header headerNavFixed">
      <div class="nvbt iback" @click="apis.iback()"></div>
      <div class="nvtt">申请入驻</div>
      <div class="nvbt idoc"></div>
    </header>
    <div class="container contentNavFixed com_contentNavFixed">
      <div class="content">
        <dl v-if="this.audit == 0" class="audit">
          <dt>
            <img class="in_audit" src="../img/InAudit.png" alt="">
          </dt>
          <dd>
            您已申请，审核中...
          </dd>
        </dl>
        <dl v-else-if="this.audit == 1" class="audit">
          <dt>
            <img class="in_audit" src="../img/refuse.png" alt="">
          </dt>
          <dd>
            您的申请被拒绝！
          </dd>
          <dd class="refuse">
            拒绝理由：<span style="color:#E32519">{{reason}}</span>
          </dd>
          <dd class="submitCall" @click="submitCall">
            重新审核
          </dd>
        </dl>
        <div v-else-if="this.audit == 2">
          <dl class="audit">
            <dt>
              <img class="in_audit" src="../img/InAudit.png" alt="">
            </dt>
            <dd>
              您的申请已通过
            </dd>
          </dl>
          <ul class="identification">
            <!-- <li>请登录：<span>{{cbUrl}}</span></li> -->
            <li>请登录：<span>{{cbUrl}}</span><span style="display:block;margin-left:1.3rem;">/sprint/portal/home</span></li>
            <li>账号：<span>{{cbName}}</span></li>
            <li>密码：<span>{{cbPass}}</span></li>
          </ul>
          <!-- <p class="servi">客服电话：888-888-8888</p> -->
        </div>
        
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import { Toast } from "mint-ui";
export default {
  name: "personal",
  data() {
    return {
      audit:'0',
      cbUrl:'',
      cbName:'',
      cbPass:'',
      reason:''
    };
  },
  mounted() {
    let subLocal = localStorage.getItem('subscriptionRegisterResult');
    if(subLocal){
      let jsonSub = JSON.parse(subLocal);
      this.audit = jsonSub.type;
      if(jsonSub.type == 1){
        this.reason = jsonSub.reason;
      }else if(jsonSub.type == 2){
        this.cbUrl = jsonSub.url;
        this.cbName = jsonSub.name;
        this.cbPass = jsonSub.pass;
      }
    }
    
  },
  methods: {
    submitCall(){
      // let data = {
      //   "id": "433dd878-9b41-40cb-8184-5b09f0ca8e5a",
      //   "checkType":0
      // }
      // this.axios({
      //   method:"post",
      //   url:this.apis.theme.api.subscription.updateSubscribeNum,
      //   data:
      // })
      this.apis.urlParams("subscriptionRegister");
    }
  }
};
</script>
<style lang='less' scoped>
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
#result {
  .container {
    background: #fff !important;
    font-size: 0.32rem;
  }
}
.audit{
  text-align: center;
  margin-top: 3.5rem;
  font-size:0.36rem;
  color:rgba(102,102,102,1);
  .in_audit{
    width: 1.8rem;
    height: 1.8rem;
  }
  dd{
    margin-top: 0.5rem;
  }
  .refuse{
    color: #000;
  }
  .submitCall{
    width:6.9rem;
    height:0.8rem;
    background:rgba(227,37,25,1);
    border-radius:0.4rem;
    line-height: 0.8rem;
    margin-left: 0.3rem;
    color: #fff;
    font-size: 0.32rem;
  }
}
.identification{
  margin:1.3rem 0 0 0.76rem;
  font-size: 0.32rem;
  li{
    margin-bottom: 0.1rem;
    span{
      color: #0A6ACD;
    }
  }
  
}
.servi{
  color: #666666;
  font-size: 0.3rem;
  margin: 5.6rem 0 0 2rem;
}

</style>
