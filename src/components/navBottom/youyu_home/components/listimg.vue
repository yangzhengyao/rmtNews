<template>
  <div class>
    <div v-for="(section,index) in childTabList" :key="index" class="newalltop">
      <div class="imgboxs" @click="apis.urlParams('newwechatItem',section,false)"> 
        <img :src="section.columnThumbnail1">
      </div>
      <div class="box">
        <p>{{section.comment}}</p>
        <div class="news_info">
          <span class="news_label blue">专题</span>
          <span class="news_from" style="max-width:80%">{{section.name}}</span>
        </div>
      </div>
    </div>
    
  </div>
</template>
<script>
export default {
  props: ["childTabList"],
  data() {
    return {
    
    };
  },
  methods: {
   
  }
};
</script>
<style scoped lang='stylus'>
.Stick {
  // background: url('http://124.204.66.253:9080/images/201811/23/5bf7c08ba31091b758388611.jpeg') no-repeat center center;
  font-size: 16px;
  -webkit-box-shadow: 1px 1px 6px 0px #c1c1c1;
  box-shadow: 1px 1px 6px 0px #c1c1c1;
  margin: 1px 10.3px 0.2px;
  border-bottom: 1px solid rgba(222, 222, 222, 0.6);
  padding-top: 20px;
  display: inline-block;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 7.18rem !important;
  height: 5.3rem !important;

  .news {
    position: relative;
    top: 193px;
    color: #212020;
    left: 21px;

    span {
      font-size: 14px;
    }
  }

  width: 6.49rem;
  height: 6.49rem;
}

.container {
  height: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  position: relative;
  overflow: scroll;

  .globalTip {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;

    div {
      height: 0.64rem;
      line-height: 0.64rem;
      font-size: 0.28rem;
      // color: #2a90d7;
      // background: rgba(213, 233, 247, .9);
      text-align: center;
      display: none;
      color: #f56767;
      background: #FBE9EF;
    }
  }

  .mint-loadmore-top {
    height: 50px;
    line-height: 50px;
    font-size: 14px;
  }

  .mint-loadmore {
    min-height: 100%;
  }

  .pullLoading {
    width: 24px;
    height: 24px;
    vertical-align: middle;
    margin-top: -4px;
    margin-right: 3px;
  }
}

.bottomLoad {
  background: transparent;
  padding-bottom: 50px;
}

.newalltop {
  -webkit-box-shadow: 1px 1px 3px 0px #c1c1c1;
  box-shadow: 1px 1px 3px 0px #c1c1c1;
  display: block;
  width: calc(100% - 20px);
  margin-top: 12px;
  background-color: #fff;
  margin: 10px;
  position: relative;
}

.imgboxs img {
  width: 100%;
  height: 100%;
  display: block;
  margin-top: 0.1rem;
  margin-bottom: 0.2rem;
}

.newalltop .box {
  width: 100%;
  height: 70px;
  padding: 10px;
}
.newalltop .box{
    width: 100%;
    height: 70px;
    padding: 10px;
}
.newalltop .box p{
    line-height: 24px;
    font-size: 17px;
    margin-bottom: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.news_info {
    white-space: normal;
    color: #8a8a8a;
    overflow: hidden;
    font-size: x-small;
    width: 100%;
}
.news_info .blue {
    color: #fff;
    background: #21be6f;
}

.news_info .news_label {
    border-radius: 2px;
    padding: 0px 2px 1px;
}
.news_info span {
    display: inline-block;
    vertical-align: middle;
    font-size: 0.24rem;
}
.news_info span.news_from {
    max-width: 30%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.news_info span + span {
    margin-left: 0.12rem;
}

.news_info span {
    display: inline-block;
    vertical-align: middle;
    font-size: 0.24rem;
}
</style>
