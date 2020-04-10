<template>
  <div id="service">
    <header class="com_header headerNavFixed historytop">
      <div style="visibility:hidden" class="nvbt iback"></div>
      <!-- 市民云  服务 -->
      <div class="nvtt" v-if="apis.getTheme() == 'dongpo'">服务</div>
      <div class="nvtt" v-else-if="apis.getTheme() == 'mile'">便民云</div>
      <div class="nvtt" v-else-if="apis.getTheme() != 'leshan'">市民云</div>
      <div class="nvtt" v-else>智慧传媒</div>
      <div class="nvbt iabout"></div>
      <div class="slide-box">
        <a @click="tabClick(index)" :class="{actives:index==0}"  v-for="(item,index) in tabsall.tablist" :key="index">{{item.tabname}}</a>
        <div class="endmargin"></div>
      </div>
    </header>
  <div class="scroll-wrapper contentNavFixed com_contentNavFixed scroll-all">
      <div class="service-box">
        <div class="ibox newiboxs" v-if="apis.getTheme() == 'haicang' && xinxi.length != 0">
          <h1>信息公开</h1>
          <div class="content">
            <a class="item"
              v-for="(item,index) in xinxi"
              :key="index"
              @click="apis.urlParams(item.path,{'title':item.name},true)"
            >
              <img class="serviceBig" :src="item.icon" alt>
              <h3 v-html="item.name"></h3>
            </a>
          </div>
        </div>
        <div class="ibox newiboxs">
          <h1>政务服务</h1>
          <div class="content">
               <a
              :to="item.path"
              class="item"
              v-for="(item,index) in zhengwu"
              :key="index"
              @click="isLoginCertificate(item.src,item.name,item.marker)"
              :href="herfTel"
            >
              <img :src="item.icon" alt>
              <h3 v-html="item.name"></h3>
            </a>
          </div>
        </div>
        <div class="ibox newiboxs" v-if="apis.getTheme() == 'haicang' && hudong.length != 0">
          <h1>互动服务</h1>
          <div class="content">
               <a
              :to="item.path"
              class="item"
              v-for="(item,index) in hudong"
              :key="index"
              @click="apis.urlParams(item.path,{'title':item.name.replace('<br>',''),'uuid':item.uuid},item.marker)"
            >
              <img :src="item.icon" alt>
              <h3 v-html="item.name"></h3>
            </a>
          </div>
        </div>
        <div class="ibox newiboxs" v-if="apis.getTheme() == 'haicang' && baike.length != 0">
          <h1>生活百科</h1>
          <div class="content">
               <a
              :to="item.path"
              class="item"
              v-for="(item,index) in baike"
              :key="index"
              @click="apis.urlParams(item.path,{'title':item.name},true)"
            >
              <img :src="item.icon" alt>
              <h3 v-html="item.name"></h3>
            </a>
          </div>
        </div>
        <div class="ibox newiboxs" v-if="apis.getTheme() == 'haicang' && jiaotong.length != 0">
          <h1>交通出行</h1>
          <div class="content">
            <a
              class="item"
              v-for="(item,index) in jiaotong"
              :key="index"
              @click="apis.urlParams(item.path,{'title':item.name},true)"
            >
              <img class="serviceBig" :src="item.icon" alt>
              <h3 v-html="item.name"></h3>
            </a>
          </div>
        </div>
        <div class="ibox newiboxs" v-if="apis.getTheme() == 'haicang' && yiliao.length != 0">
          <h1>医疗预约</h1>
          <div class="content">
            <a
              class="item"
              v-for="(item,index) in yiliao"
              :key="index"
              @click="apis.urlParams(item.path,{'title':item.name},true)"
            >
              <img class="serviceBig" :src="item.icon" alt>
              <h3 v-html="item.name"></h3>
            </a>
          </div>
        </div>
        <div class="ibox newiboxs" v-if="apis.getTheme() == 'haicang' && binamin.length != 0">
          <h1>便民服务</h1>
          <div class="content">
            <a
              class="item"
              v-for="(item,index) in binamin"
              :key="index"
              @click="apis.urlParams(item.path,{'title':item.name},true)"
            >
              <img class="serviceBig" :src="item.icon" alt>
              <h3 v-html="item.name"></h3>
            </a>
          </div>
        </div>
        <div class="ibox newiboxs" v-if="apis.getTheme() == 'haicang' || apis.getTheme() == 'youyu' && xinyong.length != 0">
          <h1>信用服务</h1>
          <div class="content">
            <a
              class="item"
              v-for="(item,index) in xinyong"
              :key="index"
              @click="apis.urlParams(item.path,{'title':item.name},true)"
            >
              <img class="serviceBig" :src="item.icon" alt>
              <h3 v-html="item.name"></h3>
            </a>
          </div>
        </div>
        <div class="ibox newiboxs" v-if="apis.getTheme() == 'haicang' || apis.getTheme() == 'youyu' && tousu.length != 0">
          <h1>投诉举报</h1>
          <div class="content">
            <a
              class="item"
              v-for="(item,index) in tousu"
              :key="index"
              @click="apis.urlParams(item.path,{'title':item.name},true)"
            >
              <img class="serviceBig" :src="item.icon" alt>
              <h3 v-html="item.name"></h3>
            </a>
          </div>
        </div>
        <div class="ibox newiboxs" v-if=" apis.getTheme() != 'tiemenguan' && convenient.length != 0">
          <h1>便民服务</h1>
          <div class="content">
            <a
              :to="item.path"
              class="item"
              v-for="(item,index) in convenient"
              :key="index"
              @click="listclickbianmin(item,index)"
            >
              <img :src="item.icon" alt>
              <h3 v-html="item.name"></h3>
            </a>
          </div>
        </div>
        <div class="ibox newiboxs" v-if="apis.getTheme() == 'tiemenguan' && fuwu.length != 0">
          <h1>便民服务</h1>
          <div class="content">
            <a
              class="item"
              v-for="(item,index) in fuwu"
              :key="index"
              @click="apis.urlParams(item.src,{'title':item.name},true)"
            >
              <img class="serviceBig" :src="item.icon" alt>
              <h3 v-html="item.name"></h3>
            </a>
          </div>
        </div>
        <div class="ibox newiboxs" v-if="apis.getTheme() == 'tiemenguan' && bendifulist.length != 0">
          <h1>本地服务</h1>
          <div class="content">
            <a
              class="item"
              v-for="(item,index) in bendifulist"
              :key="index"
              @click="listclick(item,index)"
            >
              <img class="serviceBig" :src="item.icon" alt>
              <h3 v-html="item.name"></h3>
            </a>
          </div>
        </div>
        <div class="ibox newiboxs" v-if="apis.getTheme() == 'tiemenguan' && chuxingfuw.length != 0">
          <h1>出行服务</h1>
          <div class="content">
            <a
              class="item"
              v-for="(item,index) in chuxingfuw"
              :key="index"
              @click="apis.urlParams(item.src,{'title':item.name},true)"
            >
              <img class="serviceBig" :src="item.icon" alt>
              <h3 v-html="item.name"></h3>
            </a>
          </div>
        </div>
        <div class="ibox newiboxs" v-if="apis.getTheme()=='naidong'">
          <h1>微信矩阵</h1>
          <div class="content">
            <a
              class="item"
              v-for="(item,index) in wechatNd"
              :key="index"
              @click="apis.urlParams('wechatItem',item,false)"
            >
              <img :src="item.icon" alt />
              <h3>{{item.name}}</h3>
            </a>
          </div>
        </div>
        <div class="ibox newiboxs" v-if="apis.getTheme()!='dongpo'">
            <h1>媒体服务</h1>
            <div class="content">
              <a
                :to="item.path"  
                class="item"  
                v-for="(item,index) in dataAI" 
                :key="index" 
                @click="dataAIFn( index,item )" 
              >
              <!-- :key="index"  @click=" apis.urlParams(item.menu,{'path':item.menu,'title':'1111111111'})" -->
              <!-- @click=" index==0 || index ==1? apis.urlParams('wechatItem',item,false) :apis.urlParams(item.menu,{'path':item.menu,'title':'1111111111'})" -->
                <img :src="item.icon" alt>
                <h3>{{item.namecont}}</h3>
                <!-- name -->
              </a>
            </div>
          </div>
        <div class="ibox newiboxs" v-if=" ( apis.getTheme() == 'tiemenguan' || apis.getTheme() == 'jiangxian' ) && jiaoyu.length != 0">
          <h1>教育服务</h1>
          <div class="content">
            <a
              class="item"
              v-for="(item,index) in jiaoyu"
              :key="index"
              @click="apis.urlParams(item.src,{'title':item.name},true)"
            >
              <img class="serviceBig" :src="item.icon" alt>
              <h3 v-html="item.name"></h3>
            </a>
          </div>
        </div>
        <div class="ibox newiboxs">  
          <h1>电商服务</h1>
          <div class="content">
            <a
              class="item"
              v-for="(item,index) in eCommerce"
              :key="index"
              @click="apis.urlParams(item.src,{'title':item.name.replace('<br>','')},true)"
            >
              <img class="serviceBig" :src="item.icon" alt>
              <h3 v-html="item.name"></h3>
            </a>
          </div>
        </div>
        <div class="ibox newiboxs" v-if="(apis.getTheme() == 'tiemenguan' || apis.getTheme() == 'jiangxian') && tmgTouSu.length != 0">
          <h1>投诉举报</h1>
          <div class="content">
            <a
              class="item"
              v-for="(item,index) in tmgTouSu"
              :key="index"
              @click="apis.urlParams(item.path,{'title':item.name},true)"
            >
              <img class="serviceBig" :src="item.icon" alt>
              <h3 v-html="item.name"></h3>
            </a>
          </div>
        </div>
        <div class="ibox newiboxs" v-if="apis.getTheme() == 'qingtongxia' && jiuquyun.length != 0">
          <h1>九渠云融媒体矩阵</h1>
          <div class="content">
            <a
              class="item"
              v-for="(item,index) in jiuquyun"
              :key="index"
               @click="apis.urlParams(item.name=='魅力青铜峡'?'wechatItem':item.src,item.name=='魅力青铜峡'?item:{'title':item.name},item.name!='魅力青铜峡')"
            >
              <img class="serviceBig" :src="item.icon" alt>
              <h3>{{item.name}}</h3>
            </a>
          </div>
        </div>
        <div class="ibox newiboxs" v-if="apis.getTheme() == 'qingtongxia' && wechat.length != 0">
          <h1>部门、镇（场）新媒体</h1>
          <div class="content">
            <a
              class="item wechat"
              v-for="(item,index) in wechat"
              :key="index"
              v-if="index < 3"
              @click="apis.urlParams('wechatItem',item,false)"
            >
              <img :src="item.icon" alt>
              <h3>{{item.name}}</h3>
            </a>
            <a class="item newiboxs" @click="apis.urlParams('wechat',{'title':''})">
              <img
                style="height: 0.48rem; margin-top: 0.43rem; margin-bottom: 0.13rem;"
                :src="wechat[wechat.length-1].icon"
                alt
              >
              <h3>{{wechat[wechat.length-1].name}}</h3>
            </a>
          </div>
        </div>
         <div class="ibox newiboxs" v-if="apis.getTheme() == 'youyu'">
          <h1>科技</h1>
          <div class="content">
            <a
              class="item"
              v-for="(item,index) in scienceskeji"
              :key="index"
              @click="apis.urlParams(item.src,{'title':item.name},true)"
            >
              <img class="serviceBig" :src="item.icon" alt>
              <h3>{{item.name}}</h3>
            </a>
          </div>
        </div>
        <div class="ibox newiboxs" v-if="tv.length>0">
          <h1>网络视频</h1>
          <div class="content" style="height:0">
            <a
              class="item"
              v-for="(item,index) in tv"
              :key="index"
              @click="apis.urlParams(item.src,{'title':item.name},true)"
            >
              <img class="serviceBig" :src="item.icon" alt>
              <h3>{{item.name}}</h3>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { webview } from "assets/js/webview";
import { fire } from "assets/js/utils";
import { indexMixin } from "assets/js/mixins";
import { mapActions } from "vuex";
import tabJson from "./tabJson/taball.js";
// import { setTimeout, setInterval, clearInterval } from "timers";
// import servicesJson from "./servicesJson/chaoyang"     // 朝阳json配置文件
// import servicesJson from "./servicesJson/gucheng"      // 丽江古城json配置文件
// import servicesJson from "./servicesJson/haicang"      // 海沧json配置文件
// import servicesJson from "./servicesJson/longyang"     // 云南隆阳json配置文件
// import servicesJson from "./servicesJson/lufeng"       // 云南禄丰json配置文件
// import servicesJson from "./servicesJson/yuxi"         // 云南玉溪json配置文件
// import servicesJson from "./servicesJson/honghe"       // 云南红河json配置文件
// import servicesJson from "./servicesJson/chuxiong"     // 云南楚雄json配置文件
//import servicesJson from "./servicesJson/dongpo";      // 云南眉山市东坡json配置文件
// import servicesJson from "./servicesJson/leshan"       // 乐山json配置文件
// import servicesJson from "./servicesJson/puyang"       // 濮阳json配置文件
// import servicesJson from "./servicesJson/mile"         // 弥勒市json配置文件
// import servicesJson from "./servicesJson/ximeng"       // 西盟县json配置文件
// import servicesJson from "./servicesJson/huaning"      // 玉溪华宁县json配置文件
// import servicesJson from "./servicesJson/qilin"        // 麒麟区json配置文件
// import servicesJson from "./servicesJson/redflag"      // 红旗json配置文件
import servicesJson from "./servicesJson/naidong"      // 乃東json配置文件
// import servicesJson from "./servicesJson/tiemenguan";  // 铁门关市民云json配置文件
// import servicesJson from "./servicesJson/qingtongxia"; // 青铜峡市民云json配置文件
//import servicesJson from "./servicesJson/jiangxian";    // 山西绛县市民云json配置文件
// import servicesJson from "./servicesJson/wenchang";    // 海南文昌市民云json配置文件
// import servicesJson from "./servicesJson/yantian";     // 海南盐田市民云json配置文件
// import servicesJson from "./servicesJson/youyu";     //山西绛县市民云json配置文件

export default {
  name: "service",
  data() {
    // 投诉举报
    var hc_jiaotong = [],
      hc_shenghuo = [],
      hc_binamin = [],
      hc_xinyong = [],
      hc_tousu = [],
      hc_yiliao = [],
      hc_xinxi = [],
      hc_hudong = [],
      hc_baike = [],
      tmg_FMServices = [],
      tmg_chuxing = [],
      tmg_jiaofei = [],
      tmg_fuwu = [],
      tmg_chuxingfuw=[],
      tmg_bendifulist = [],
      tmg_weisheng = [],
      tmg_baozhan = [],
      tmg_tousu = [],
      tmg_jiaoyu = [],
      tmg_dianziBook = [];
    // 海沧json
    if (servicesJson.hasOwnProperty("tousu")) {
       hc_jiaotong = servicesJson.jiaotong;
      hc_shenghuo = servicesJson.shenghuo;
      hc_binamin = servicesJson.binamin;
      hc_xinyong = servicesJson.xinyong;
      hc_tousu = servicesJson.tousu;
      hc_yiliao = servicesJson.yiliao;
      hc_xinxi = servicesJson.xinxi;
      hc_hudong = servicesJson.hudong;
      hc_baike = servicesJson.baike;
    }
    if (servicesJson.hasOwnProperty("FMServices")) {
      tmg_FMServices = servicesJson.FMServices;
      tmg_chuxing = servicesJson.chuxing;
      tmg_jiaofei = servicesJson.jiaofei;
      tmg_fuwu = servicesJson.fuwu;
      tmg_bendifulist= servicesJson.bendifulist;
      tmg_chuxingfuw=servicesJson.chuxingfuw;
      tmg_weisheng = servicesJson.weisheng;
      tmg_baozhan = servicesJson.baozhang;
      tmg_tousu = servicesJson.tousu;
      tmg_jiaoyu = servicesJson.jiaoyu;
      tmg_dianziBook = servicesJson.dianziBook;
    }
    if( this.apis.getTheme() == 'jiangxian' ){
      tmg_jiaoyu = servicesJson.jiaoyu;
      tmg_tousu = servicesJson.tousu;
    } 
    return {
      isChinaTime: false,
      dataAI: servicesJson.dataAI,
      wechat: servicesJson.wechat,
      jiuquyun: servicesJson.jiuquyun,
      convenient: servicesJson.convenient,
      zhengwu: servicesJson.zhengwu,
      eCommerce: servicesJson.eCommerce,
      tv: servicesJson.tv,
      // 海沧服务列表
      jiaotong: hc_jiaotong,
      shenghuo: hc_shenghuo,
      binamin: hc_binamin,
      xinyong: hc_xinyong,
      tousu: hc_tousu,
      yiliao: hc_yiliao,
      xinxi: hc_xinxi,
      hudong: hc_hudong,
      baike: hc_baike,
      FMServices: tmg_FMServices,
      chuxing: tmg_chuxing,
      jiaofei: tmg_jiaofei,
      chuxingfuw:tmg_chuxingfuw,
      fuwu: tmg_fuwu,
      bendifulist:tmg_bendifulist,
      weisheng: tmg_weisheng,
      baozhang: tmg_baozhan,
      tmgTouSu: tmg_tousu,
      jiaoyu: tmg_jiaoyu,
      scienceskeji: servicesJson.scienceskeji,
      dianziBook: tmg_dianziBook,
      wechatNd:servicesJson.wechatNd,
      tabsall:{
        tablist:tabJson.naidong
      },
      index: 0,
      _H1: 0,
      _H2: 0,
      _H3: 0,
      _H4: 0,
      _H5: 0,
      _H6: 0,
      _H7: 0,
      _H8: 0,
      _H9: 0,
      _H10: 0,
      _H11: 0,
      _H12: 0,
      newindex: 0,
      herfTel:'javascript:void(0);'
    };
  },
  components: {},

  created() {
    var that = this;
    if (new Date().getTimezoneOffset() / 60 != -8) {
      that.tv = [];
      that.wechat = [];
      that.jiuquyun = [];
      that.zhengwu.forEach(function(item, i) {
        if (item.name == "地方领导留言") {
          that.zhengwu.splice(i, 4);
        }
      });

      that.convenient.forEach(function(item, i) {
        if (item.name == "北京市<br>协和医院") {
          that.convenient.splice(i, 1);
        } else if (item.name == "厦门市<br>海沧医院") {
          that.convenient.splice(i, 1);
        }
      });
      that.convenient.forEach(function(item, i) {
        if (item.name == "北京市<br>预约挂号") {
          that.convenient.splice(i, 1);
        } else if (item.name == "厦门市<br>预约挂号") {
          that.convenient.splice(i, 1);
        }
      });
    }
  },
  methods: {
    dataAIFn(index,item){
      
      if( this.apis.getTheme() == 'tiemenguan' ){
        if( index == 0 ){
          this.apis.urlParams('wechatItem',item,false)
        } else {
          this.apis.urlParams(item.menu,{'path':item.menu,'title':item.name},true)
        }
      }else if( this.apis.getTheme() == 'wenchang' ){
        if( index == 0 ){
        this.apis.urlParams(item.menu,{'path':item.menu,'title':'1111111111'},true)
        } else {
        this.apis.urlParams('wechatItem',item,false)
        }
      }else if( this.apis.getTheme() == 'puyang' ){
        if( index == 1||index == 2 ||index == 7||index == 6 ){
          this.apis.urlParams(item.menu,{'path':item.menu,'title':item.name,'uuid':item.uuid},false)
        }else {
          this.apis.urlParams('wechatItem',item,false)
        }
      }else{
        this.apis.urlParams(item.menu,{'path':item.menu,'title':'1111111111'},true)
      }
      // apis.getTheme() == 'tiemenguan'?index==0? apis.urlParams('wechatItem',item,false) :apis.urlParams(item.menu,{'path':item.menu,'title':'铁门关在线'},true) : apis.urlParams(item.menu,{'path':item.menu,'title':'1111111111'},true) 
    },
    listclickbianmin(item,index){
       if(item.name=='生活缴费'){
        this.apis.urlParams('servergroups',{'title':item.name},false)
      }else if(item.name=='出行旅游'){
        this.apis.urlParams('servergroups',{'title':item.name},false)
      }else if(item.name=='预约挂号'){
        this.apis.urlParams('servergroups',{'title':item.name},false)
      }else if(item.name=='生活娱乐'){
        this.apis.urlParams('servergroups',{'title':item.name},false)
      }else if(item.name=='查询服务'){
        this.apis.urlParams('servergroups',{'title':item.name},false)
      }else{
        this.apis.urlParams(item.src,{'title':item.name.replace('<br>','')},true)
      } 
    },
    listclick(itmes,index){
      if(itmes.name=='库尔勒医院'){
        this.apis.urlParams('grounphostys',{'title':itmes.name},false)
      }else if(itmes.name=='博斯腾宾馆'){
        this.apis.urlParams('groups',{'title':itmes.name},false)
      }else if(itmes.name=='铁门关大酒店'){
        this.apis.urlParams('groupslist',{'title':itmes.name},false)
      }else if(itmes.name=='志愿者活动'){
        let userData = localStorage.getItem("userData");
         if (userData == null) {
          this.apis.urlParams("Login");
        } else {
          this.apis.urlParams('activitylist',{'title':itmes.name},false)
        }
      }else{
        this.apis.urlParams(itmes.src,{'title':itmes.name},true)
      } 
    },
    isLoginCertificate(src, name, marker) {
      let userData = localStorage.getItem("userData");
      this.herfTel = 'javascript:void(0);';
      if (src == "certificate" || src == "reportpages") {
        if (userData == null) {
          this.apis.urlParams("Login");
        } else {
          this.apis.urlParams(src, { title: name.replace("<br>", "") }, marker);
        }
      } else if( name == '12345热线' ){
        this.herfTel = 'tel:'+12345
        return;
      } else {
        this.apis.urlParams(src, { title: name.replace("<br>", "") }, marker);
      }
    },
    tabClick(index) {
      if (
        document.querySelectorAll(".slide-box a")[index].classList.contains("actives")
      );
      if (index == 0) {
        $(".contentNavFixed").animate({ scrollTop: 0 }, 200);
      } else {
        $(".contentNavFixed").animate(
          {
            scrollTop: [
              this._H1,
              this._H2 + 4,
              this._H3 + 4,
              this._H4 + 4,
              this._H5 + 4,
              this._H6 + 4,
              this._H7 + 4,
              this._H8 + 4,
              this._H9 + 4,
              this._H10 + 4,
              this._H11 + 4,
              this._H12
            ][index - 1]
          },
          500
        );
      }
      this.newindex = index;
      this.slideTo(index);
    },
    slideTo(index) {
      this.$nextTick(() => {
        let _container = $(".slide-box"); // 获取滚动容器元素
        let _column = $(".slide-box a").eq(index); // 获取当前active栏目元素
        if (_column) {
          let _container_width = _container.width(); // 容器宽度
          let _container_left = _container.scrollLeft(); // 容器当前滚动条的值
          let _column_width = _column.width(); // 栏目宽度
          let _column_left = _column.position().left; // 栏目距离屏幕左边的距离
          let midWidth = (_container_width - _column_width) / 2; // 屏幕中心线的宽度
          // 容器滚动为0，并且active栏目位于中间线左边？滚动值为0 ：当前容器滚动值 + （active栏目相对于中间线的值，有正负）
          if (_container_left === 0 && _column_left <= midWidth) {
            this.move = 0;
          } else {
            this.move = _container_left + (_column_left - midWidth);
          }
          _container.stop().animate({ scrollLeft: this.move }, 300);
        }
      });
    },
    getRes(result,type){ //问政上传的图片地址保存在local
      let selecteType;
      if(plus.os.name == 'iOS'){
        selecteType = result.type;
      }else{
        selecteType = type;
      }
      if(selecteType == 1){
        let oldVal;
        let newVal;
        let datas = localStorage.getItem('wz_imgData');
        let jsonPic = result
        if(datas){
          oldVal = JSON.parse(datas);
          newVal = oldVal.concat(jsonPic.data);
          console.log(JSON.stringify(jsonPic.data))
          localStorage.setItem('wz_imgData',JSON.stringify(newVal))
        }else{
          localStorage.setItem('wz_imgData',JSON.stringify(jsonPic.data))
        }
      }else{  
        localStorage.setItem('wz_vidData',JSON.stringify(result.data));
      }
    },
  },
  mounted() {
    window["WZImgBoxs"] = (result,type) => { //挂载到window上的方法，以便安卓或IOS调用
      this.getRes(result,type);
    };
    var timer = null;
    timer = setInterval(() => {
      var aLi = document.querySelectorAll(".newiboxs");
      try{
        if (aLi[0] && aLi[0].offsetHeight > 0) {
          clearInterval(timer);
          this._H1 = aLi[0].offsetHeight;
          this._H2 = aLi[1].offsetHeight + this._H1;
          this._H3 = aLi[2].offsetHeight + this._H2;
          this._H4 = aLi[3].offsetHeight + this._H3;
          this._H5 = aLi[4].offsetHeight + this._H4;
          this._H6 = aLi[5].offsetHeight + this._H5;
          this._H7 = aLi[6].offsetHeight + this._H6;
          this._H8 = aLi[7].offsetHeight + this._H7;
          this._H9 = aLi[8].offsetHeight + this._H8;
          this._H10 = aLi[9].offsetHeight + this._H9;
          this._H11 = aLi[10].offsetHeight + this._H10;
          this._H12 = aLi[11].offsetHeight;
        }
      }catch(e){
        console.log(e.message); //未获取到楼层高度，会抛出错误信息
      }
    }, 1000);
    $(".scroll-all").scroll(() => {
      var scrollTop = $(".scroll-all").scrollTop();
      if (scrollTop >= this._H1 && scrollTop < this._H2) {
        document.querySelector(".slide-box a.actives").classList.remove("actives");
        document.querySelectorAll(".slide-box a")[1].classList.add("actives");
        this.newindex = 1;
      } else if (scrollTop >= this._H2 && scrollTop < this._H3) {
        document.querySelector(".slide-box a.actives").classList.remove("actives");
        document.querySelectorAll(".slide-box a")[2].classList.add("actives");
        this.newindex = 2;
      } else if (scrollTop >= this._H3 && scrollTop < this._H4) {
        document.querySelector(".slide-box a.actives").classList.remove("actives");
        document.querySelectorAll(".slide-box a")[3].classList.add("actives");
        this.newindex = 3;
      } else if (scrollTop >= this._H4 && scrollTop < this._H5) {
        document.querySelector(".slide-box a.actives").classList.remove("actives");
        document.querySelectorAll(".slide-box a")[4].classList.add("actives");
        this.newindex = 4;
      } else if (scrollTop >= this._H5 && scrollTop < this._H6) {
        document.querySelector(".slide-box a.actives").classList.remove("actives");
        document.querySelectorAll(".slide-box a")[5].classList.add("actives");
        this.newindex = 5;
      } else if (scrollTop >= this._H6 && scrollTop < this._H7) {
        document.querySelector(".slide-box a.actives").classList.remove("actives");
        document.querySelectorAll(".slide-box a")[6].classList.add("actives");
        this.newindex = 6;
      } else if (scrollTop >= this._H7 && scrollTop < this._H8) {
        document.querySelector(".slide-box a.actives").classList.remove("actives");
        document.querySelectorAll(".slide-box a")[7].classList.add("actives");
        this.newindex = 7;
      } else if (scrollTop >= this._H8 && scrollTop < this._H9) {
        document.querySelector(".slide-box a.actives").classList.remove("actives");
        document.querySelectorAll(".slide-box a")[8].classList.add("actives");
        this.newindex = 8;
      } else if (scrollTop >= this._H9 && scrollTop < this._H10) {
        document.querySelector(".slide-box a.actives").classList.remove("actives");
        document.querySelectorAll(".slide-box a")[9].classList.add("actives");
        this.newindex = 9;
      } else if (scrollTop >= this._H10 && scrollTop < this._H11) {
        document.querySelector(".slide-box a.actives").classList.remove("actives");
        document.querySelectorAll(".slide-box a")[10].classList.add("actives");
        this.newindex = 10;
      }else if (scrollTop >= this._H12) {
        document.querySelector(".slide-box a.actives").classList.remove("actives");
        document.querySelectorAll(".slide-box a")[11].classList.add("actives");
        this.newindex = 11;
      } else {
        document.querySelector(".slide-box a.actives").classList.remove("actives");
        document.querySelectorAll(".slide-box a")[0].classList.add("actives");
        this.newindex = 0;
      }
      this.slideTo(this.newindex);
    });
  }
};
</script>
<style lang="less" scoped>
.endmargin {
  padding-right: 0.12rem;
}
.slide-box {
  display: -webkit-box;
  border-bottom: 1px solid #f0f0f0;
  clear: both;
  background: #fff;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  white-space: nowrap;
}
.ibox:last-child {
  height: calc(100vh - 1.7rem);
}
.slide-box a {
  height: 0.8rem;
  line-height: 0.8rem;
  font-size: 0.34rem;
  color: #1a1a1a;
  margin: 0rem 0.2rem 0 0.3rem;
  display: block;
}
.slide-box a.actives {
  // border-bottom: 2px solid #e32519;
    color: @dominantColor;
    font-weight: bold;
    font-size: 0.4rem;
}
.slide-box a:last-child {
  margin-right: 0.5rem;
}
.service-box {
  padding-top: 44px;
  position: relative;
}
.historytop {
  width: 100%;
  // background: #fff;
}
.slide-box::-webkit-scrollbar {
  display: none;
}
.navBarWrap {
  position: fixed;
  top: 0.88rem;
  z-index: 66;
}
#service {
  header{
  //  background: @headerBg;
    background: #fff!important;
    .nvtt{
      font-size: .36rem;
      font-weight: 500;
    //  color:@headerColor;
     color: #1a1a1a!important;
    }
  }
  .com_contentNavFixed {
    height: calc(100vh - 0.2rem);
    box-sizing: border-box;
    padding-top: 44px;
  }
  height: 100%;
  background: #f7f7f7;
  .content {
    position: relative;
    width: 100%;
    height: 100%;
    padding-top: 1.335rem;
  }
  .content.isIOS {
    padding-top: 1.87rem;
    padding-top: 1.335rem;
  }
  .scroll-wrapper {
    -webkit-overflow-scrolling: touch;
    overflow: scroll;
  }
  font-size: 14px;
  .ibox {
    margin-top: 0rem;
    background: #fff;
    width: 100%;
    margin: 0rem auto;
    border-bottom: 0.12rem solid #f5f4f9;
    border-radius: 4px;
    h1 {
      font-size: 0.33rem;
      font-weight: 500;
      padding: 0.28rem 0 0.28rem 0.3rem;
      color: #5e5e5e;
    }
    .content {
      padding: 0;
      display: flex;
      flex-flow: wrap;
      .item {
        height:2.2rem;
        h3 {
          font-size: 0.27rem;
          margin-top: 0.14rem;
          font-weight: 500;
          color: #5e5e5e;
        }
        img {
          height: 0.4888rem;
          margin-top: 0.34rem;
          border-radius: 4px;
        }
        img.serviceBig {
          height: 0.5888rem;
        }
        flex: 0 0 33.3%;
        text-align: center;
        padding-bottom: 0.4rem;
        padding-top: 0.12rem;
      }
    }
  }

  // .ibox:nth-last-child(1) {
  //   // margin-bottom: 7px;
  // }
  .ibox {
    .content .item.wechat {
      img {
        height: 0.7rem;
        border-radius: 50%;
      }
      h3 {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        margin-left: 0.07rem;
        margin-right: 0.07rem;
      }
    }
  }
  .navclolr{color:rgb(26, 26, 26)}
  .navcolor{ 
    .nvtt{
      color: #fff;
    }
    background: @dominantColor;
  } 
}
#service header .nvtt.navclolr{color:rgb(26, 26, 26)}
</style>
<style>
.content .item:nth-child(3n + 0) {
  border-right: 0 !important;
}
</style>


