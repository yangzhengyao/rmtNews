<template>
  <transition name="fadeIn">
    <div id="questionAnswer">
      <!-- 头部 -->
      <header class="com_header headerNavFixed">
        <div class="nvbt iback" @click="apis.iback()"></div>
        <div class="nvtt">回答</div>
        <div class="nvbt idoc"></div>
      </header>
      <!-- 正文 -->
      <ordinaryUsers v-if="questionObj.dep_id == '0' && questionObj.isWz == '0'"></ordinaryUsers>
      <ordinaryUsers v-else-if="questionObj.dep_id == '1' && questionObj.isWz == '0'"></ordinaryUsers>
      <government v-else></government>
    </div>
  </transition>
</template>
<script>
const root = process.env.API_ROOT;
import qs from "qs";
import { mapGetters, mapMutations, mapActions } from "vuex";
import ordinaryUsers from "./components/ordinaryUsers";
import government from './components/government';
export default {
  name: "questionAnswer",
  data() {
    return {
      title: "问答",
      questionObj: {}
    };
  },
  components: {
    ordinaryUsers,
    government
  },
  computed: {
    ...mapGetters("login", [
      "getStorge" // active的栏目
    ])
  },
  methods: {
    init() {
      this.questionObj = JSON.parse(
        localStorage.getItem("questionAnswer")
      );
      console.log( this.questionObj,"1111" )
    }
  },
  created() {
     this.init();
  },
  mounted() {
    
  }
};
</script>
<style lang="less" scoped>
#questionAnswer {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 1000;
  background: #fff;
  .content {
    background: #fff;
  }
}
</style>
