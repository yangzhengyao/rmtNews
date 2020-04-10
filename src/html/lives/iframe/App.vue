<template>
  <transition name="fadeIn">
    <div id="iframe-box">
      <!-- 头部 -->
      <header class="com_header headerNavFixed">
        <div class="nvbt iback" @click="apis.iback()"></div>
        <div class="nvtt">{{title}}</div>
        <div class="nvbt idoc share_btn" @click.stop='$refs.share.toggle()'></div>
      </header>
      <!-- 正文 -->
      <div class="contentNavFixed com_contentNavFixed">
        <iframe class="iframeDiv" scrolling="yes" :src="src" frameborder="0"></iframe>
      </div>
      
      <!-- 底部工具栏 -->
      <!-- <my-tool icon comment='remark' @publish='publishCallBack'> -->
          <!-- 按钮栏 -->
          <!-- <template slot='tool_btn'> -->
              <!-- 分享按钮 -->
              <!-- <a v-if="shareFlag" class="share_btn" @click.stop='$refs.share.toggle()'></a> -->
          <!-- </template> -->
      <!-- </my-tool> -->
      <!-- 分享组件 -->
      <my-share :json='src' ref="share"></my-share>
    </div>
  </transition>
</template>
<script>
import { webviewMixin } from "assets/js/mixins.js";
import myShare from "./components/share";
export default {
  mixins: [webviewMixin],
  name: "detail",
  data() {
    return {
      src: '',
      title: '',
      shareFlag: true,
    };
  },
  components: {
    myShare
  },
  created() {
    this.src=JSON.parse(localStorage.getItem('./lives/iframe.html')).src
    this.title=JSON.parse(localStorage.getItem('./lives/iframe.html')).title
  },
  methods: {
    // 发表回调
    publishCallBack() {
      this.$router.push({ name: "comment" });
      this.currentArticle.plnum++;
      this.set_historyArticle(this.historyArticle);
      if (this.listArticle) {
        this.listArticle.plnum++;
        this.set_listArticle(this.listArticle);
      }
    }
  }
};
</script>
<style lang="less" scoped>
#iframe-box {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background: #f7f7f7;
  .com_header {
    // width: 100%;
    // height: 1rem;
    background: @dominantColor;
    text-align: center;
    display: flex;
    align-items: center;
    position: relative;
    position: fixed;
    z-index: 111;
    justify-content: center;
    align-items: center;
    // padding: 0.17rem 0;
    img {
      width: 1.12rem;
      height: 1.57rem;
      position: relative;
      top: 0.45rem;
    }
  }
  iframe {
      width: 100%;
      height: 100%;
      border: none;
    }
}

#iframe-box .share_btn {
  background: url(~@/assets/img/share2.png) no-repeat center center;
  background-size: 18.5px;
}
</style>
