 <template>
  <!-- <div class="index">
        <div class="radio-wrap">
          <keep-alive>
             <component v-bind:is="tabView"  ref="selectA"></component>
          </keep-alive>
          <div class="radio-group">
            <span v-for="(tab ,index) in tabs" :class="{cur:iscur==index}" :key="index" @click="iscur=index,tabChange(index)" >
              <div class="background_icon nav_icon" :class="tab.class" v-if="index != 2 "></div>
              <div class="background_icon nav_icon" style="width: 100%;height: 70px;position: absolute;top: -22px;text-align: center;border-radius: 75px 75px 0 0;box-shadow:#eaeaea 0px -3px 1px -1px" :class="tab.class" v-if="index == 2 ">  </div>
              {{ index == 2 ? '' : tab.name}}
            </span>
          </div>
        </div>
  </div>-->
  <div id="app">
    <mt-tabbar v-model="selected" :class="iphonexPadding ? 'iphonexPaddingClass':'' " v-show="!isNaidong">
      <mt-tab-item v-for='(item,index) in tabs' :key="index" :id="index" >
         <!-- 海沧 青铜峡 -->
         <template v-if="(apis.getTheme() == 'haicang' || apis.getTheme() == 'qingtongxia') && item.name=='市民云'">
          <div style="background: #fff;padding-top: 0.18rem;border-radius: 50% 50% 0 0;position:relative;top:-1.08rem;box-shadow: 0px -2px 0px -1px #ccc">
          <img slot="icon" :src='item.noSelect' style="height:1.1rem">
          <img class="tab-active" slot="icon" :src='item.select' style="height:1.1rem">
        </div>
        </template>
        <template v-if="apis.getTheme() == 'wenchang' && item.name=='看航天'">
          <div style="background: #fff;padding-top: 0.07rem;border-radius: 50% 50% 0 0;position:relative;top:-1.08rem;box-shadow: 0px -2px 0px -1px #ccc">
          <img slot="icon" :src='item.noSelect' style="height:1.28rem">
          <img class="tab-active" slot="icon" :src='item.select' style="height:1.28rem">
        </div>
        </template>
         <template v-if="item.name=='媒体矩阵'">
         <div style="background: #fff;padding-top: 0.18rem;border-radius: 50% 50% 0 0;position:relative;top:-1.08rem;box-shadow: 0px -2px 0px -1px #ccc">
          <img slot="icon" :src='item.noSelect' style="height:1.1rem">
          <img class="tab-active" slot="icon" :src='item.select' style="height:1.1rem">
        </div>
        </template>
        <!-- <template v-if="apis.getTheme() == 'tiemenguan' && item.name=='市民云'">
          <div style="padding-top: 0.1rem;border-radius: 50% 50% 0 0;position:relative;top:-1.08rem;">
          <img slot="icon" :src='item.noSelect' style="height:1.18rem">
          <img class="tab-active" slot="icon" :src='item.select' style="height:1.18rem">
        </div>
        </template> -->
        <!-- <template v-if="apis.getTheme() == 'puyang' && item.name=='便民'">
          <div style="padding-top: 0.1rem;border-radius: 50% 50% 0 0;position:relative;top:-1.08rem;">
          <img slot="icon" :src='item.noSelect' style="height:1.18rem">
          <img class="tab-active" slot="icon" :src='item.select' style="height:1.18rem">
        </div>
        </template> -->
        <template>
          <img slot="icon" :src='item.noSelect'>
          <img class="tab-active" slot="icon" :src='item.select'>
          {{item.isChaoyang ? '学习强国':item.name}}
        </template>
      </mt-tab-item>
    </mt-tabbar>
    <!-- 乃东藏文tab -->
    <mt-tabbar v-model="selected" :class="iphonexPadding ? 'iphonexPaddingClass':'' " v-show="isNaidong">
      <mt-tab-item v-for='(item,index) in tabsNd' :key="index" :id="index" >
         <!-- 海沧 青铜峡 -->
         <template v-if="(apis.getTheme() == 'haicang' || apis.getTheme() == 'qingtongxia') && item.name=='市民云'">
          <div style="background: #fff;padding-top: 0.18rem;border-radius: 50% 50% 0 0;position:relative;top:-1.08rem;box-shadow: 0px -2px 0px -1px #ccc">
          <img slot="icon" :src='item.noSelect' style="height:1.1rem">
          <img class="tab-active" slot="icon" :src='item.select' style="height:1.1rem">
        </div>
        </template>
        <template v-if="apis.getTheme() == 'wenchang' && item.name=='看航天'">
          <div style="background: #fff;padding-top: 0.07rem;border-radius: 50% 50% 0 0;position:relative;top:-1.08rem;box-shadow: 0px -2px 0px -1px #ccc">
          <img slot="icon" :src='item.noSelect' style="height:1.28rem">
          <img class="tab-active" slot="icon" :src='item.select' style="height:1.28rem">
        </div>
        </template>
        <!-- <template v-if="apis.getTheme() == 'tiemenguan' && item.name=='市民云'">
          <div style="padding-top: 0.1rem;border-radius: 50% 50% 0 0;position:relative;top:-1.08rem;">
          <img slot="icon" :src='item.noSelect' style="height:1.18rem">
          <img class="tab-active" slot="icon" :src='item.select' style="height:1.18rem">
        </div>
        </template> -->
        <template v-if="apis.getTheme() == 'puyang' && item.name=='便民'">
          <div style="padding-top: 0.1rem;border-radius: 50% 50% 0 0;position:relative;top:-1.08rem;">
          <img slot="icon" :src='item.noSelect' style="height:1.18rem">
          <img class="tab-active" slot="icon" :src='item.select' style="height:1.18rem">
        </div>
        </template>
        <template>
          <img slot="icon" :src='item.noSelect'>
          <img class="tab-active" slot="icon" :src='item.select'>
          {{item.isChaoyang ? '学习强国':item.name}}
        </template>
      </mt-tab-item>
    </mt-tabbar>
    <!-- 乃东藏文tab -->
    <mt-tab-container v-model="selected" v-if="isNaidong">
       <mt-tab-container-item v-for='(item,index) in tabsNd' :key="index" :id="index" >
          <component :is="item.components" v-if="!item.isChaoyang" ></component>
          <!-- 朝阳县直接链接学习强国 -->
          <!-- <div v-else>
          </div> -->
          <!-- <component :is="item.components" v-else></component> -->
      </mt-tab-container-item>
    </mt-tab-container>
    <mt-tab-container v-model="selected" v-if="!isNaidong">
       <mt-tab-container-item v-for='(item,index) in tabs' :key="index" :id="index" >
          <component :is="item.components" v-if="!item.isChaoyang" ></component>
          <!-- 朝阳县直接链接学习强国 -->
          <!-- <div v-else>
          </div> -->
          <!-- <component :is="item.components" v-else></component> -->
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
  
</template>
<script>
import { Tabbar, TabItem } from "mint-ui";
import news from "../../../components/navBottom/home/home";//新闻列表模块
import lives from "../../../components/navBottom/lives/lives"; //直播模块
// import service from "../../../components/navBottom/services/services"; //市民云
import service from "../../../components/navBottom/services/baisha_services"; //市民云
import subscription from "../../../components/navBottom/subscription/App"; //弥勒号
import community from "../../../components/navBottom/community/community"; 
import haicang_liangan from '../../../components/navBottom/haicang_liangan/haicang_liangan';
import haicang_wenlv from "../../../components/navBottom/haicang_wenlv/haicang_wenlv.vue";
import wenchang_qiaoshequ from "../../../components/navBottom/wenchang_qiaoshequ/wenchang_qiaoshequ.vue";
import wenchang_kanhangtian from "../../../components/navBottom/wenchang_kanhangtian/wenchang_kanhangtian.vue";
import tiemenguan_wenlv from "../../../components/navBottom/tiemenguan_wenlv/tiemenguan_wenlv.vue";
import qingtongxia_wenlv from "../../../components/navBottom/qingtongxia_wenlv/wenlv";
import qingtongxia_qq from '../../../components/navBottom/qingtongxia_qq/qinqiang';
import tiemenguan_lives from "../../../components/navBottom/tiemenguan_zhibo/App";
import jiangxian_lives from "../../../components/navBottom/jiangxian_zhibo/App";
import puyang_lives from "../../../components/navBottom/puyang_zhibo/App"; //濮阳直播模块
import puyang_wenlv from "../../../components/navBottom/puyang_wenlv/wenlv"; //濮阳直播模块
import leshan_lives from "../../../components/navBottom/leshan_zhibo/App";
import mile_zhibo from "../../../components/navBottom/mile_zhibo/App";
import changjiang_zhibo from "../../../components/navBottom/changjiang_zhibo/App";
import chengmai_zhibo from "../../../components/navBottom/chengmai_zhibo/App";
import dongpo_lives from "../../../components/navBottom/dongpo_zhibo/App";
import tiemenguan_home from "../../../components/navBottom/tiemenguan_home/home.vue";
import me from "../../../components/navBottom/me/me";
import newMy from "../../../components/navBottom/me/newMy";
import newsCommunity from '../../../components/navBottom/newsCommunity/community'
import haicangZw from '../../../components/commonList';//海沧政务栏目图标
import baishaRm from '../../../components/commonList';//白沙融媒栏目图标
import baisha_lives from "../../../components/navBottom/baisha_zhibo/App";
import wanning_zhibo from "../../../components/navBottom/wanning_zhibo/App";
import lingao_zhibo from "../../../components/navBottom/lingao_zhibo/App";
import naidong_zhibo from "../../../components/navBottom/naidong_zhibo/App";
import naidong_wmsj from "../../../components/navBottom/naidong_wmsj/App";
import hankgong_baike from "../../../components/navBottom/hangkong_baike/App";
import hankgong_zhuanti from "../../../components/navBottom/hangkong_zhuanti/App";
import dongpocity from "../../../components/navBottom/dongpocity/App"; //濮阳直播模块
import cnockout from "../../../components/navBottom/cnockout/community"; //爆料
import youyu_home from "../../../components/navBottom/youyu_home/home.vue";
import youyu_wenlv from "../../../components/navBottom/youyu_wenlv/youyu_wenlv";
import livesyouyu from "../../../components/navBottom/livesyouyu/lives.vue";

import { mapGetters, mapMutations, mapActions } from 'vuex'
import Bus from '@/Bus';

export default {
  data() {
    return {
      tabView: "news",
      selected: 0,
      tabs: [],
      tabsNd: [],
      iscur: 0,
      wgtUrl:'',
      iphonexPadding:false,
      loadding: true,
      loaddingNum: 5,
      timer: null,
      banner:''
    };
  },
  computed: {
      ...mapGetters('index', [
        'appMain',   // tab的当前索引栏目
        'isShowActivity', //是否直接跳转到活动页面
        'isNaidong'
      ]),
  },
  watch:{
     appMain:function(val){
       if(val==5){
          this.selected = 0;
         return
       }
        if( val ){
          this.selected = val;
        } else if( val ==3 ){
           this.selected = val;
        }
     }
  },
  components: {
    news,
    lives,
    service,
    community,
    me,
    haicang_liangan,
    haicang_wenlv,
    tiemenguan_wenlv,
    tiemenguan_home,
    tiemenguan_lives,
    leshan_lives,
    mile_zhibo,
    changjiang_zhibo,
    chengmai_zhibo,
    dongpo_lives,
    newMy,
    newsCommunity,
    qingtongxia_wenlv,
    puyang_lives,
    qingtongxia_qq,
    wenchang_qiaoshequ,
    wenchang_kanhangtian,
    puyang_wenlv,
    haicangZw,
    baisha_lives,
    baishaRm,
    wanning_zhibo,
    hankgong_baike,
    hankgong_zhuanti,
    dongpocity,
    subscription,
    lingao_zhibo,
    naidong_zhibo,
    naidong_wmsj,
    cnockout,
    jiangxian_lives,
    youyu_home,
    youyu_wenlv,
    livesyouyu
  },
  methods: {
    ...mapMutations("index", ["set_appMain",'set_ShowActivity','set_indexActive','set_isNaidong']),
    ...mapActions("integral",["loginUpdate"]),
    tiemoutLoadding() {
      let that = this;
      that.timer = setInterval(() => {
        if (that.loaddingNum > 0) {
          that.loaddingNum--;
        } else {
          clearInterval(that.timer);
          that.timer = null;
          that.loadding = false;
        }
      }, 1000);
    },
    clickIndex() {
      let that = this;
      clearInterval(that.timer);
      this.loadding = false;
    },
    iphonexPaddingFn(){
        var immersed = 0;
        var ms = /Html5Plus\/.+\s\(.*(Immersed\/(\d+\.?\d*).*)\)/gi.exec(
          navigator.userAgent
        );
        if (ms && ms.length >= 3) {
        immersed = parseFloat(ms[2]);
        }
        if( immersed == 44 ){
          return true;
        }
    },
    // 登录成功调用原生安卓客户端方法
    androidClientStartUp(data) {
      var main = plus.android.runtimeMainActivity();
      var Helper = plus.android.importClass("com.zkwg.hqnews.Helper");
      var helper = new Helper();
      helper.StartUp(main);
    },
    // 登录成功调用原生ios客户端方法
    iosClientStartUp() {
      alert('调ios方法');
      var notiClass = plus.ios.importClass("NSNotificationCenter");
      notiClass.defaultCenter().postNotificationNameobject("JS2NativeStartUp");
    },
    nowVersion() {
      let that = this;
      plus.runtime.getProperty(plus.runtime.appid, function(inf) {
        // 当前版本号
        that.checkUpdate( inf.version );
      });
      // if( plus.os.name == "iOS" ){
      //   that.iosClientStartUp();
      // } else {
      //   that.androidClientStartUp();
      // }
    },
    // 更新应用资源
    // 从服务器下载应用资源包（wgt文件）
    // 下载wgt文件
    // var wgtUrl = "http://124.204.66.253:28080/media/app/updata/H53E82D4D.wgt";
    // 发起ajax请求检测是否有新版本
    // 检测更新
    // var checkUrl = "http://hc.wengetech.com:28086/common_al/common/getNewestAppVersion"
    checkUpdate( wgtVerFn ) {
      let that = this;
      var wgtVerParams = wgtVerFn;
      var checkUrl = window.$themeConfig.api.updataCheckUrlUrl;
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        switch (xhr.readyState) {
          case 4:
            if (xhr.status == 200) {
              console.log("检测更新成功：" + xhr.responseText);
              let data = JSON.parse(xhr.responseText);
              console.log( data )
              var newVer = data.data.app_version;
                  that.wgtUrl = data.data.app_path;
              newVer =  newVer.replace('.', "").replace('.', "");
              wgtVerParams = wgtVerParams.replace('.', "").replace('.', "");
              if( Number( wgtVerParams ) >= Number(newVer) ){
                
              } else {
                //如果是铁门关就弹框提示用户下载
                if( window.$themeConfig.api.appName  == 'tiemenguan'){
                  plus.nativeUI.alert("软件发现有新版本，需联网下载", function(e) {
                    var i = e.index;
                    if(i < 0) {

                    } else {
                      //下载资源包
                      that.downWgt();
                    }
                  }, "更新提示", "确认");
                } else {
                   that.downWgt();
                }
              }
            } else {
              console.log("检测更新失败！");
            }
            break;
          default:
            break;
        }
      };
      xhr.open("GET", checkUrl);
      xhr.setRequestHeader('app_info_id', that.apis.theme.api.appInfoId);
      xhr.send();
    },
    downWgt() {
      let that = this;
      localStorage.setItem('regengxin','true');
      if( window.$themeConfig.api.appName  == 'tiemenguan' ){
        plus.nativeUI.showWaiting("正在更新，请耐心等待...");
      }
      plus.downloader
        .createDownload(
          that.wgtUrl,
          {
            filename: "_doc/update/"
          },
          function(d, status) {
            if (status == 200) {
              console.log("下载wgt成功：" + d.filename);
              that.installWgt(d.filename); // 安装wgt包
            } else {
              console.log("下载wgt失败！");
              plus.nativeUI.closeWaiting();
            }
          }
        )
        .start();
    },
    // 更新应用资源
    installWgt(path) {
      plus.runtime.install(
        path,
        {},
        function() {
          plus.nativeUI.closeWaiting();
          console.log("安装wgt文件成功！");
          if( window.$themeConfig.api.appName  == 'tiemenguan' ){
            localStorage.setItem('regengxin','false');
            plus.runtime.restart();
          } else {
            localStorage.setItem('regengxin','false');
            if(localStorage.getItem('restart')=='true') {
              localStorage.setItem('restart','false');
              plus.runtime.restart();
            }
          }
        },
        function(e) {
          plus.nativeUI.closeWaiting();
          console.log("安装wgt文件失败[" + e.code + "]：" + e.message);
        }
      );
    },
  },
  created() {
    var that = this;
    this.tabs=this.apis.theme.homeTabbar;
    this.tabsNd=this.apis.theme.homeTabbarNd;
    if (window.plus) {
       that.nowVersion();
    } else {
      document.addEventListener(
        "plusready",
        that.nowVersion(),
        false
      );
    }
  },
  mounted(){
    // this.tiemoutLoadding();
    // this.banner = localStorage.getItem('banner');
    // alert( this.banner )
    if(localStorage.getItem('userData')){
      this.loginUpdate({ //登录获取积分
        userId: JSON.parse(localStorage.getItem('userData')).user_id,
        appInfoId: this.apis.theme.api.appInfoId,
        expType: 1,
        recordTime: 1
      })
    }
    //加载完通知原生
    // if (window.plus) {
    //    this.loadClient();
    // } else {
    //   document.addEventListener(
    //     "plusready",
    //     this.loadClient(),
    //     false
    //   );
    // }
    if( this.iphonexPaddingFn() ){
       this.iphonexPadding = true;
    }
    let that = this;
    $(".mint-tabbar").children('.mint-tab-item').click(function(){//当li下的子元素被点击时触发
        let indexActive = $(this).find('.mint-tab-item-label').text().trim();
         that.set_appMain(0) ;
        // if( that.apis.theme.appName )
        // if( that.apis.theme.api.appName == 'leshan' ){
        //    if( indexActive == '新闻' ){
        //      that.set_appMain(0) ;
        //    }
        //    if( indexActive == '直播' ){
        //       that.set_appMain(1) ;
        //    }
        //    if( indexActive == '智慧传媒' ){
        //      that.set_appMain(2) ;
        //    }
        //    if( indexActive == '社区' ){
        //      that.set_appMain(3) ;
        //    }
        //    if( indexActive == '我的' ){
        //      that.set_appMain(4) ;
        //    }
        // }
       if(  that.apis.theme.api.appName == 'dongpo' && indexActive == '新闻' ){
           that.set_indexActive('5ce9f0190cf23213ac8df4e2')
        }
        if(  that.apis.theme.api.appName == 'qingtongxia' ){
            let event = document.createEvent('MouseEvents')
            event.initEvent('mousewheel', true, true)
            document.querySelector('#home .container').dispatchEvent(event)
        }
        if(  that.apis.theme.api.appName == 'puyang' ){
            let event = document.createEvent('MouseEvents')
            event.initEvent('mousewheel', true, true)
            document.querySelector('#lives .container').dispatchEvent(event)
        }
        $('#home').find('.small_right').removeAttr("lazy")
        let event = document.createEvent('MouseEvents')
        event.initEvent('mousewheel', true, true)
        document.querySelector('#home .container').dispatchEvent(event)
        if( indexActive == '我的' ){
          Bus.$emit('zanUpdate',true);
          //  plus.navigator.setStatusBarStyle('light')
        }
        if( indexActive == '新闻' ){
            $('#home').find('.big_bg').removeAttr("lazy")
            $('#home').find('.small_right').removeAttr("lazy")
        }
        if( indexActive == '直播' ){
            $('#lives').find('.big_bg').removeAttr("lazy")
            let event = document.createEvent('MouseEvents')
            event.initEvent('mousewheel', true, true)
            document.querySelector('#lives .container').dispatchEvent(event)
            $('#lives').find('.small_right').removeAttr("lazy")
        }
        if( indexActive == '文旅' ){
            let event = document.createEvent('MouseEvents')
            event.initEvent('mousewheel', true, true)
            document.querySelector('#tmg_wenlv .container').dispatchEvent(event)
            document.querySelector('#home .container').dispatchEvent(event)
            $('#tmg_wenlv').find('.small_right').removeAttr("lazy")
        }
    });
  }
};
</script>
<style lang="less" scoped>
@import '../../../assets/communityIcon/iconfont.css';
.mint-tabbar {
  .mint-tab-item {
    .tab-active {
      display: none;
    }
  }

  .is-selected {
    img {
      display: none;
    }
    .tab-active {
      display: inline-block;
    }
  }

  position: fixed;
  bottom: 0;
  z-index: 9999;
  background: #fff;
  height: 1rem;
  // height: calc(50px + env(safe-area-inset-bottom));
  // box-shadow: 0px 0px 5px 1px #ccc;
  border-top: 1px solid #ededed;
}
#app{
  .loadding {
    display: flex;
    width: 100%;
    height: 100vh;
    img {
      width: 100%;
      z-index: 111111;
    }
    span {
      position: absolute;
      z-index: 111112;
      right: 0.5rem;
      top: 0.5rem;
      color: #fff;
      font-size: 0.26rem;
    }
  }
  .loaddingFadeIn {
    background: red;
  }
}
</style>
<style lang="less" >
.iphonexPaddingClass {
    padding-bottom:90px !important;
}
.mint-tab-item {
  // padding: .07rem 0;
  padding: .1rem 0;
}
.mint-tab-item-icon {
  // 海沧样式
  //  width: 0.4rem !important;
  //  height: 0.4rem !important;
  //  margin: 0 auto 0.15rem;
  // 基础班样式
  width: .48rem !important;
  height: .48rem !important;
  margin: 0 auto 0.1rem;
}
// 海沧样式
.mint-tab-item-label {
  // font-size: 0.25rem !important;
}
// 基础版样式
.mint-tab-item-label {
  font-size: 0.22rem;
}
.mint-tabbar > .mint-tab-item.is-selected {
  color: @dominantColor;
  background: #fff;
}
// .mint-tab-item:nth-child(3) .mint-tab-item-icon {
//   width: 100% !important;
//   height: 0.33rem !important;
// }
.mint-tab-container-item {
  height: calc(100vh - 1rem);
}
.mint-tab-container-item:nth-child(4){
  height: 100% ;
}
#app .mint-tab-item-icon img{
  // width: auto;
}
</style>
