<template>
  <div id="home">
    <header
      class="com_header headerNavFixed"
      style="background: #fff;border-bottom: 1px solid #f0f0f0;"
    >
      <div class="nvbt ibackBack" @click="apis.iback()"></div>
      <div class="nvtt" style="color: #1a1a1a;">举报</div>
      <div class="nvbt idoc"></div>
    </header>

    <div class="listboxs">
      <div class="weachboxs">
        <div class="xztit">
          <img :src="xztit" />
        </div>
        <div class="xztitcon">
          <img :src="xztitcon" />
        </div>
      </div>
      <div class="listall">
        <p>一、纪检监察机关举报网站受理范围：</p>
        <p>1. 对党组织、党员违反政治纪律、组织纪律、廉洁纪律、群众纪律、工作纪律、生活纪律等党的纪律行为的检举控告。</p>
        <p>2. 对监察对象（监察法规定的六类公职人员，下同）不依法履职，违反秉公用权、廉洁从政从业以及道德操守等规定，涉嫌贪污贿赂、滥用职权、玩忽职守、权力寻租、利益输送、徇私舞弊以及浪费国家资财等职务违法犯罪行为的检举控告。</p>
        <p>3. 党员对党纪处分或者纪律检查机关所作的其他处理不服，提出的申诉。</p>
        <p>4. 监察对象对监察机关涉及本人的处理决定不服，提出的申诉；被调查人及其近亲属对监察机关及其工作人员违反法律法规、侵害被调查人合法权益的行为，提出的申诉。</p>
        <p>5. 对原行政监察机关作出的政纪处分和其他处理决定不服未超过申请期限，提出的申诉。</p>
        <p>6. 对党风廉政建设和反腐败工作的批评建议。</p>
        <p>三、根据“分级负责、归口办理”原则，请您按照被举报人属地和级别，选择相应的举报网站进行举报。</p>
        <p>四、纪检监察机关提倡实名举报（请填写真实姓名、身份证号和准确联系方式等内容）。</p>
      </div>
      <div class="shopL">
        <label>
          <input type="checkbox" v-model="ckeckVal" />我已阅读以上条款
        </label>
      </div>
      <div class="sublimetcont">
        <div
          class="sub"
          v-if="ckeckVal"
          style="background: rgba(238, 26, 26, 1);"
          @click="butlist"
        >确定</div>
        <div class="sub" v-else>确定</div>
      </div>
    </div>
  </div>
</template>
<script>
import { Cell, Checklist } from "mint-ui";
import swiperContainer from "./components/swiperContainer";
import { mapActions } from "vuex";
import { get_local_cache, set_local_cache } from "../../../config/cache";
export default {
  name: "lives",
  data() {
    return {
      classPage: 1, // 当前栏目的翻页页数
      contentJson: [], // 整个列表数据
      dataCount: 0, // 推荐文章数量
      topStatus: "", // 下拉状态
      bottomLock: false, // 上滑开关
      bottomLoading: true, // 底部loading
      bottomNoData: false, // 底部nothing
      loading: false,
      error: false,
      location: 0,
      title: "",
      type: 1,

      times: this.apis.getBeforeDate(0),
      xztit: require("./images/icon_jbxz.png"),
      xztitcon: require("./images/jbxz.png"),
      value: [],
      //checklist设置
      ckeckVal: false
    };
  },
  components: { swiperContainer },
  methods: {
    butlist() {
      this.apis.urlParams("reportpagesdetails", {}, false);
    },
    saveData(section) {
      this.apis.urlParams("reportpagesdetails", {}, false);
    },
    checkon: function() {
      console.log(this.value);
    }
  },
  mounted() {
    this.title = JSON.parse(get_local_cache("dongpovideos")).title;
  },
  created() {}
};
</script>
<style lang="less" scoped>
.listboxs {
 height: 100vh;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  padding-top: 18%; padding-bottom: 0.6rem;
}
.weachboxs {
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
  
}
.xztit img {
  height: 0.42rem;margin-left: 0.3rem;
}
.xztitcon img {
  height: 0.4rem;
}
.listall {
 padding: 0.3rem;
  
}

.listall p {
  font-size: 0.32rem;
  line-height: 0.6rem;
  margin-top: 0.2rem;
}
.xztit,
.xztitcon {
  height: 0.42rem;
}
.sublimetcont {
  width: 100%;
  text-align: center;
  padding-bottom: 1.2rem;
}
.sublimetcont .sub {
  background: #ccc;
  border-radius: 50px;
  width: 90%;
  margin: 0 auto;
  font-size: 0.32rem;
  color: #fff;
  padding: 0.12rem 0;
}
.checkbox {
  display: none;
}
.shopL {
  margin: 0.5rem 0;
}
.shopL label {
  font-size: 0.32rem;
  color: #333;
  margin-left: 0.3rem;
}
.shopL label span {
  display: inline-block;
  margin-left: 0.3rem;
  position: relative;
  top: 0.05rem;
}
.shopL label input {
  width: 0.4rem;
  height: 0.4rem;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: url(../../../assets/img/Checkbox_normal.png) no-repeat;
  background-size: 100%;
  margin-top: -0.1rem;
  margin-right: 0.2rem;
}
.shopL label input:checked {
  background: url(../../../assets/img/Checkbox.png) no-repeat;
  background-size: 100%;
}
</style>
