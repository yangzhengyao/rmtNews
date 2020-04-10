  <template>
  <div id="subscriptionRegister">
    <header class="com_header headerNavFixed">
      <div class="nvbt iback" @click="apis.iback()"></div>
      <div class="nvtt">选择入驻类型</div>
      <div class="nvbt idoc"></div>
    </header>
    <div class="container contentNavFixed com_contentNavFixed">
      <div class="content">
        <ul class="live-type">
          <li v-for="(item,index) in servicesJson" :key="index">
            <div class="flex-left">
              <img :src="item.titleImage" alt="网络出错" />
              <div class="desc">
                <p class="name">{{item.name}}</p>
                <p class="tips">{{item.description}}</p>
              </div>
            </div>
            <input type="radio" name='liveType' @click="seclctType(item.enterType,item.id)" value />
          </li>
        </ul>
        <div class="next-step" @click="toNext">下一步</div>
      </div>
      <my-loading :visible="loading"></my-loading>
      <my-error :visible='error' :method='reload'></my-error>
    </div>
  </div>
</template>
<script>
import api from "../../../../src/assets/js/api.js";
import { mapGetters, mapMutations, mapActions } from "vuex";
import { Toast } from "mint-ui";
export default {
  name: "subscriptionRegister",
  data() {
    return {
      type:"",
      kind:"",
      servicesJson:[],
      loading:true,
      error:false
    };
  },
  computed: {
    ...mapGetters("login", [
      "getStorge" // active的栏目
    ])
  },
  methods: {
    toNext() {
      if(this.type){
        api.urlParams("subscriptionRegisterPersonal",{type:this.type,kind:this.kind});
      }else{
        Toast('请选择类型！');
      }
    },
    seclctType(typeEnter,typeId){
      this.type = typeId;
      this.kind = typeEnter;
    },
    reload() {
      this.getParam();
    },
    getParam(){
      let data={'appInfoId':this.apis.theme.api.appInfoId}
      this.axios({
        method: "post",
        url: this.apis.theme.api.subscription.selectByParam,
        data: data
      }).then(res => {
        if(res.data.success){
          this.servicesJson=res.data.data
          this.loading = false
          this.error = false
        }else{
          this.loading = false
          this.error = true
        }
      })
    },
  },
  mounted() {
    this.getParam();
  },
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
#subscriptionRegister {
  .container {
    background: #fff !important;
  }
  .content {
    padding: 0 0.3rem;
  }
  .live-type {
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.4rem 0;
      border-bottom: 1px solid rgba(204, 204, 204, 1);
    }
    .flex-left {
      display: flex;
      align-items: flex-start;
      img {
        width: 1rem;
        height: 1rem;
        margin-right: 0.3rem;
      }
      .name {
        font-size: 0.36rem;
        color: rgba(87, 107, 149, 1);
        line-height: 0.6rem;
      }
      .tips {
        font-size: 0.24rem;
        color: rgba(102, 102, 102, 1);
        line-height: 0.36rem;
        max-width: 4.8rem;
      }
    }
    input[type="radio"] {
      /*去除浏览器默认样式*/
      -webkit-appearance: none;
      -webkit-tap-highlight-color: #fff;
      -moz-appearance: none;
      appearance: none;
      /*自定义样式*/
      position: relative;
      display: inline-block;
      vertical-align: top;
      width: 0.4rem;
      height: 0.4rem;
      background-image: url(img/unsel.png);
      background-size: 100% 100%;
      background-color: #fff!important;
      outline: none;
      cursor: pointer;
    }

    /**
    * 单选框 选中之后的样式
    **/
    input[type="radio"]:after {
      content: "";
      position: absolute;
      width: 0.4rem;
      height: 0.4rem;
      display: block;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      -webkit-transform: scale(0);
      -moz-transform: scale(0);
      transform: scale(0);
      /*增加一些动画*/
      -webkit-transition: all ease-in-out 300ms;
      -moz-transition: all ease-in-out 300ms;
      transition: all ease-in-out 300ms;
      -webkit-appearance: none;
      background-image: url(img/sel.png);
      background-size: 100% 100%;
    }
    input[type="radio"]:checked:after {
      background-image: url(img/sel.png);
      background-size: 100% 100%;
      -webkit-transform: scale(1);
      -moz-transform: scale(1);
      transform: scale(1);
    }
  }
  .next-step {
    margin: 1rem 0;
    height: 0.8rem;
    background: rgba(227, 37, 25, 1);
    border-radius: 0.4rem;
    padding: 0 0.3rem;
    font-size: 0.34rem;
    color: rgba(255, 255, 255, 1);
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
