<template>
    <div id="detail">
        <!-- 头部 -->
        
      <header class="com_header headerNavFixed">
        <!-- iBlackBack -->
        <div class="nvbt iback" @click="apis.iback()" :class=" apis.getTheme() == 'dongpo'?'iBlackBack':'iback'"></div>
        <!-- <div class="nvtt">{{currentArticle.title}}</div> -->
          <div class="nvtt" @click="apis.iback()">
            {{ url.title }}
          </div>
        <div class="nvtt" ></div>
        <!-- <div class="nvbt idoc " @click.stop='$refs.range.toggle()'><img class="imore" src="./images/more.png"/></div> -->
        <div class="nvbt idoc " ></div>
      </header>
      <div>
          <iframe
            class="my_frame"
            id="ifrathree" frameborder="0" height="100%" scrolling='no' 
            :src="url.webviewId"
            style="width:1px; min-width:100%; *width:100%;height:70rem!important;"
          ></iframe> 
      </div>
    </div>
</template>
<script>
export default {
  name:'webDetail',
  data(){
    return{
       url:JSON.parse(localStorage.getItem('qtxWebUrl'))
    }
  },

}
</script>

<style lang='less' scoped>
#head {
    position: relative;
    width: 100%;
    height: 50px;
    background-color: rgb(190, 44, 31);
    font-size: 19px;
    font-weight: bold;
    color: rgb(250, 250, 250);
    line-height: 50px;
    text-align: center;
}
#detail {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #fff;
 header{
background: @headerBg;
.nvbt:nth-child(1){
background: @headerIback;
}
.nvtt{
font-size: .36rem;
font-weight: 500;
color:@headerColor;
}
}
}
.imore{
  height: 20px;
  margin-top: .25rem;
}
.navclolr{color:rgb(26, 26, 26)}
</style>