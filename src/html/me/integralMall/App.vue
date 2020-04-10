  <template>
  <div id="integralMall">
    <header class="com_header headerNavFixed">
      <div class="nvbt iback" @click="apis.iback()"></div>
      <div class="nvtt">积分商城</div>
      <div class="nvbt idoc"></div>
    </header>
    <div class="container contentNavFixed com_contentNavFixed">
      <div class="content">积分商城</div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import { Toast } from "mint-ui";
export default {
  name: "integralMall",
  data() {
    return {};
  },
  computed: {
    ...mapGetters("login", [
      "getStorge" // active的栏目
    ])
  },
  mounted() {},
  methods: {}
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
#integralMall {
  .container {
    background: #fff !important;
  }
}
</style>
