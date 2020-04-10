<template>
  <div id="us">
    <header class="com_header headerNavFixed">
      <div class="nvbt iback" @click="apis.iback()"></div>
      <div class="nvtt">字体设置</div>
      <div class="nvbt idoc"></div>
    </header>
    <div class="container contentNavFixed com_contentNavFixed">
      <div class="font_big">
        <div class="fontlength">
          <div class="smalls">小</div>
          <div class="middles">中</div>
          <div class="bigfont">大</div>
          <mt-range v-model="rangeValue" :min="12" :max="30" :bar-height="5"></mt-range>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      rangeValue: localStorage.getItem('fontSize')!=null ?Number( localStorage.getItem('fontSize') ):18
    };
  },
  watch: {
    rangeValue(val) {
      localStorage.setItem("fontSize", val);
    }
  },
  methods: {},
  mounted() {},
  created() {}
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
#us {
  // font-family: monospace;
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: #f2f2f2;
}
.wrapper {
  width: 100%;
  height: 2rem;
  // border: 1px solid;
  text-align: center;
  margin-top: 0.6rem;
  img {
    width: 2rem;
  }
}

.box {
  width: 100%;
  text-align: center;
  font-size: 0.36rem;
  margin-top: 0.18rem;
  font-family: auto;
}
.subject {
  width: 100%;
  // height: 8.5rem;
  margin-top: 0.48rem;
  background-color: white;
  overflow: auto;
  font-size: 0.34rem;
  padding: 0.5rem 0.4rem 1.3rem;
  p {
    text-indent: 2em;
    margin-top: 10px;
    text-align: justify;
  }
}

.navclolr {
  color: rgb(26, 26, 26);
}
.font_big {
  width: 85%;
  margin: 1.3rem auto;
  display: flex;
  color: #999;
}
.font_big div {
  font-size: 0.38rem; margin-bottom: 0.2rem
}
.fontlength {
  width: 95%;
  margin: 0 auto;
}
.smalls{display: inline-block;}
.middles{ display: inline-block;margin-left:1.4rem}
.bigfont{display: inline-block;float: right}
</style>

