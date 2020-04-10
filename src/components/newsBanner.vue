<template>
  <div class="newsBanner">
    <div class="" v-if="apis.getTheme()!='youyu'">
    <swiper :options="swiperOption" class="swiper-box-banner index" ref="mySwiper">

      <!-- 濮阳 -->
      <swiper-slide v-if="apis.getTheme()=='puyang'"> 
        <div v-for="(item,index) in servicesJson.banner" :key="index" @click="url(item)" :style="{width:(apis.getTheme()=='puyang'? '33.3%':'')}" >
          <img :src="item.icon" alt>
          <span>{{ item.name }}</span>
        </div>
      </swiper-slide>

      <!-- 弥勒 订阅号 -->
      <swiper-slide v-else-if="apis.getTheme()=='mile'" >
        <div class="mile_bottom" v-for="(item,index) in servicesJson.banner" :key="index"  @touchmove="touchmoveFunc()" @click="url(item)" style="width:33.3%;"  >
          <img :src="item.icon" alt>
          <span>{{ item.name }}</span>
        </div>
      </swiper-slide>

      <swiper-slide v-else :style="{paddingBottom:(apis.getTheme()=='dongpo'? '0':'')}">
        <div v-for="(item,index) in servicesJson.banner" :key="index" @click="url(item)" :style="{width:(apis.getTheme()=='dongpo'? '20%':'')}" >
          <img :src="item.icon" alt>
          <span>{{ item.name }}</span>
        </div>
      </swiper-slide>
      <!-- 东坡 -->
      <swiper-slide v-if="apis.getTheme()=='dongpo'">
        <div v-for="(item,index) in servicesJson.banner2" :key="index" @click="url(item)">
          <img :src="item.icon" alt>
          <span>{{ item.name }}</span>
        </div>
      </swiper-slide> 
      <!-- 去掉小分页 -->
      <div class="swiper-pagination1" slot="pagination" v-if="apis.getTheme()!=='puyang'&& apis.getTheme()!=='mile'"></div>
    </swiper>
    <marqueeLists v-if="apis.getTheme() =='puyang'"/> 
    </div>
    <div class="" v-if="apis.getTheme()=='youyu'">
    <div class="indexcolme">
      <ul>
        <li @click="urlhtmlnew1('https://www.xuexi.cn/')">
          <img src="../assets/img/youyu/news1.png">
          <p>学习强国</p>
        </li>
         <li @click="urlhtmlnew3('https://www.sxgbxx.gov.cn/')">
          <img src="../assets/img/youyu/logonews.png">
          <p>好干部在线</p>
        </li>
        <li @click="urlhtmlnew2('http://www.youyuzf.gov.cn/')">
          <img src="../assets/img/youyu/news2.jpg">
          <p>政府网站</p>
        </li>
      </ul>
    </div>
    <div class="bannernews" @click="banerhref">
      <img src="../assets/img/youyu/banner.jpg">
    </div>
    <div class="bannernews" @click="bannelist">
      <img src="../assets/img/youyu/bannerlist.jpg">
    </div>
  </div>
  </div>
</template>
<script>
// import servicesJson from "./navBottom/services/servicesJson/redflag"; //红旗
// import servicesJson from "./navBottom/services/servicesJson/dongpo"; //东坡
// import servicesJson from "./navBottom/services/servicesJson/tiemenguan"; //铁门关
// import servicesJson from "./navBottom/services/servicesJson/leshan"; //乐山
//import servicesJson from "./navBottom/services/servicesJson/puyang"; //濮阳
// import servicesJson from "./navBottom/services/servicesJson/ali"; //阿里
// import servicesJson from "./navBottom/services/servicesJson/wanning"; //万宁
//import servicesJson from "./navBottom/services/servicesJson/baisha"; //白沙
import servicesJson from "./navBottom/services/servicesJson/mile"; //弥勒
import { mapGetters, mapMutations } from "vuex";
import apis from '@/assets/js/api.js'
import { log } from 'util';
export default {
  data() {
    return {
      servicesJson: servicesJson,
      servicesJsondingyue:"",//弥勒订阅号
      swiperOption: {
        autoplay: 0,
        pagination: ".swiper-pagination1",
      },
           jsonlist:{
          "contentPageFileName": "", 
          "siteTitle": "", 
          "displayOrder": 1, 
          "contentPageTemplateId": "", 
          "sourceColumnPath": "", 
          "channelType": "WEBSITE", 
          "recommend": 0, 
          "type": 0, 
          "uuid": "5db462a2e4b0b6c77c39d0d1", 
          "columnThumbnail1": "http://hongqi.wengetech.com:9080/images/201910/26/5db462d7e4b0b6c703866c54.jpeg", 
          "treeOrder": "005001", 
          "columnPageFlag": "", 
          "sourceChannelId": "", 
          "columnPageFileName": "", 
          "disabled": false, 
          "sourceColumnId": "", 
          "channelId": "youyu", 
          "contentPageFlag": "", 
          "columnPageTemplateId": "", 
          "level": 0, 
          "pageCache": 0, 
          "siteDescription": "", 
          "fullName": "专题专栏/不忘初心 牢记使命", 
          "nameTag": "bwcxljsm", 
          "parentId": "5cc7b1010cf2acaeba3f52aa", 
          "url": "http://youyu.wengetech.com:9080/ztzl/bwcxljsm", 
          "contentShowType": 0, 
          "byname": "", 
          "name": "不忘初心 牢记使命", 
          "publishTypes": "", 
          "comment": "右玉县“不忘初心、牢记使命”主题教育专题报道", 
          "fixed": 0, 
          "siteKeywords": "", 
          "position": 0, 
          "updated": "2019-10-26T16:16:12.000+0000"
    }
    };
  },
  methods: {
      ...mapMutations("index", [
      "set_appMain",
      "set_indexActive",
    ]),
    touchmoveFunc() {
      if (window.trackingClickSelf) {
        window.trackingClickSelf = false;
      }
    },
    getdingyuedata(){    //查询订阅号查询类型
      if(this.apis.getTheme()=='mile'){

        let data={'appInfoId':this.apis.theme.api.appInfoId}

        this.axios({
          method: "post",
          url: this.apis.theme.api.subscription.selectSbuListChild,
          data: data
        }).then(res => {
          this.servicesJsondingyue=res.data.data
        })
      }
    },
      banerhref() {
      this.set_indexActive("5cc7b0d70cf2acaeba3f52a8");
    },
    urlhtmlnew1(url) {
      this.apis.urlParams(url, {}, true);
    },
    urlhtmlnew2(url) {
      this.apis.urlParams(url, {}, true);
    },
    urlhtmlnew3(url) {
      this.apis.urlParams(url, {}, true);
    },
     bannelist() {
      this.apis.urlParams('newwechatItem', this.jsonlist, false);
    },
    url(item) {
      if (item.marker) {
        this.apis.urlParams(item.src, { title: item.name }, item.marker);
      } else {
        // 微社区
        if (item.src == "shiminyun") {
          //跳转市民云
          this.set_appMain(2);
        }
        if (item.src == "complaint") {
          //濮阳企业投诉
          this.apis.urlParams(item.src, { title: item.name }, item.marker);
        }
        //订阅号
        if (item.appInfoId) {
          //跳转订阅号列表
          this.apis.urlParams("sublist", { title: item.name,checkInId:item.id}, item.marker);
        }
        // 报料
        if (item.src == "tipOff") {
          this.apis.urlParams(item.src, { title: item.name }, item.marker);
        }
        // 微社区
        if (item.src == "community") {
          //跳转微社区
          this.set_appMain(3);
        }
         // 东坡之声
        if (item.src == "dongpovideos") {
          //跳转活动
          this.apis.urlParams(item.src, { title: item.name }, item.marker);
        }
           // 东坡直播
        if (item.src == "livebroadcast") {
          //跳转活动
          this.apis.urlParams(item.src, { title: item.name }, item.marker);
        }
        // 活动
        if (item.src == "activitylist") {
          //跳转活动
          this.apis.urlParams(item.src, { title: item.name }, item.marker);
        }
        // 融媒矩阵
        if (item.src == "wechathtml") {
          //跳转活动
          this.apis.urlParams(item.src, { title: item.name }, item.marker);
        }
          // 跳转东坡文旅、农名工之家
        if (item.src == "dongpoall") {
          //跳转活动
          this.apis.urlParams(item.src, { title: item.name,uid:item.id }, item.marker);
        }
        //跳转东坡阅读ebook
        if (item.src == "ebook") {
          //跳转活动
          this.apis.urlParams(item.src, { title: item.name,uid:item.id }, item.marker);
        }
        if (item.src == "puyangall") {
          //濮阳跳转活动
          this.apis.urlParams(item.src, { title: item.name,uid:item.id }, item.marker);
        }
        
        //乐山跳转到乐山活动
        if (item.src == "leshanGrow") {
          this.apis.urlParams(item.src, { title: item.name,uid:item.id }, item.marker);
        }
        // 积分商城
        if (item.src == "jifen" || item.src == "dubao" || item.src == "zhisheng" || item.src =='noDatanews') {
           if( this.apis.getTheme() =='leshan' && item.src == "dubao" ){
             this.apis.urlParams('http://u.eqxiu.com/s/aHtigaCR',{'title':'乐山日报'},true);
           } else {
             this.apis.urlParams('noData');
           }
        }
        
      }
    },
    plusready(){}
  },
  mounted() {
    this.getdingyuedata()
    var that = this;
    if (window.plus) {
      that.plusready();
    } else {
      document.addEventListener("plusready", that.plusready(), false);
    }
  }
};
</script>
<style lang='stylus'>
banner_height = 4.3375rem;

.newsBanner {
  // display:none
  position: relative;
  // border-bottom:.02rem solid #D9D9D9;
  .line{
    height :.02rem;
    background #D9D9D9
    margin:0 0.3rem;
  }
  .swiper-slide {
    display: flex;
    flex-wrap: wrap;
    background: #fff;
    padding:.4rem .3rem;

    >div {
      width: 20%;
      font-size: 0.24rem;
      display: flex;
      flex-direction: column;
      text-align: center;
      align-items: center;
      color: #1a1a1a; cursor pointer;
      // margin-top .25rem;
      img {
        height: 0.85rem;
        width: 0.85rem;
        margin-bottom: 0.1rem;
      }
    }
    >div:nth-child(1), >div:nth-child(2), >div:nth-child(3),  {
     margin-bottom:.4rem;
    }
    .mile_bottom{
      margin-bottom:0!important;
    }
  }

  .swiper-pagination-bullets {
    bottom: -10px !important;
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 11111111;
    text-align: center;
    height:.2rem;

    .swiper-pagination-bullet{
      position : relative;
      top:-1.05rem;;
      
    }
  }
}
.indexcolme {
  width: 100%;
  overflow: hidden;
  margin-top: 0.13rem;
  background: #fff;
  margin-bottom: 0.1rem;
}
.indexcolme ul li {
  width: 33.2%; margin: 0 auto; 
  float: left;text-align: center;
  padding-top: 0.3rem;
  color: #8a8a8a;
  padding-bottom: 0.2rem;
}
.indexcolme img {
  height: 0.9rem; text-align: center;
  border-radius: 50px;margin: 0 auto;
  display:block;
}
.indexcolme p {
  display: block;text-align: center;
  font-size: 0.28rem; 
  margin-left: 0.2rem;
  margin-top:0.2rem;
}
.bannernews {
  width: 100%; margin-top: 0.2rem;
}
.bannernews img {
  width: 100%;
}
</style>
