  <template>
  <div id="feedback">
    <div id="set">
      <header class="com_header headerNavFixed">
        <div class="nvbt iback" @click="apis.iback()"></div>
        <div class="nvtt">推荐给朋友</div>
        <div class="nvbt idoc"></div>
      </header>
    </div>
    <div class="container contentNavFixed com_contentNavFixed">
      <div class="share">
        <div class="content">
            <p>{{ apis.theme.me.us.text }}</p>
            <img class="userProfile" :src='"./img/"+apis.getTheme()+".png"'>
            <!-- <img src="./img/redflag.png" alt=""> -->
            <p>好东西要分享！快快分享二维码给朋友吧！</p>
        </div>
        <div class="line">
          <span></span>
          <span>分享到</span>
          <span></span>
        </div>
        <div class="operation">
          <!-- <img src="./img/qq.png" alt>
          <img src="./img/wechat.png" alt>
          <img src="./img/sina.png" alt> -->
          <img
            :src='"~@/assets/img/"+item.name+".png"'
            alt
            v-for="(item,index) in shareBts"
            :key="index"
            class="shareItem"
            @click.stop="shareFunc(item)"
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const root = process.env.API_ROOT;
import qs from "qs";
// import { get_local_cache } from '../../../../config/cache.js'
import { get_local_cache } from "../../../config/cache.js";
import { mapGetters, mapMutations, mapActions } from "vuex";
import { Toast } from "mint-ui";
export default {
  name: "user",
  data() {
    return {
      contentFrame: false,
      shares: null,
      shareBts: []
    };
  },
  computed: {
    ...mapGetters("login", [
      "getStorge" // active的栏目
    ])
  },
  mounted() {
    var that = this;
    if (window.plus) {
      that.updateSerivces();
    } else {
      document.addEventListener(
        "plusready",
        function() {
          that.updateSerivces();
        },
        false
      );
    }
  },
  methods: {
    ...mapActions("integral",["updateUserRecordTime"]),
    toggle() {
      this.contentFrame = !this.contentFrame;
    },
    shareFunc(Scene) {
      console.log(Scene);
      this.shareAction(Scene);
    },
    onSuccess() {
      Toast({
        message: "分享成功",
        position: "middle",
        duration: 1000
      });
      this.contentFrame = false;
      this.updateUserRecordTime({ //分享成功调用积分接口
        userId: JSON.parse(localStorage.getItem( 'userData' )).user_id,
        appInfoId: this.apis.theme.api.appInfoId,
        expType: 10,
        recordTime: 1
      })
    },
    onError() {
      Toast({
        message: "分享失败",
        position: "middle",
        duration: 1000
      });
    },

    /**
     * 更新分享服务
     */
    updateSerivces() {
      var that = this;
      plus.share.getServices(
        function(s) {
          that.outLine(JSON.stringify(s));
          that.shares = {};
          for (var i in s) {
            var t = s[i];
            that.shares[t.id] = t;
          }
          that.shareHref();
        },
        function(e) {
          that.outLine("获取分享服务列表失败：" + e.message);
          console.log("获取分享服务列表失败：" + e.message);
        }
      );
    },

    // 分析链接
    shareHref() {
      let that = this;
      // 更新分享列表
      var ss = this.shares["weixin"];
      ss &&
        ss.nativeClient &&
        (this.shareBts.push({
          title: "微信朋友圈",
          s: ss,
          x: "WXSceneTimeline",
          name: "wx_pyq"
        }),
        this.shareBts.push({
          title: "微信好友",
          s: ss,
          x: "WXSceneSession",
          name: "wx_friend"
        }));
      ss = this.shares["qq"];
      ss &&
        ss.nativeClient &&
        this.shareBts.push({
          title: "QQ",
          s: ss,
          name: "qq"
        });
      ss = this.shares["sinaweibo"];
      ss &&
        ss.nativeClient &&
        this.shareBts.push({
          title: "新浪微博",
          s: ss,
          name: "weibo"
        });
      // 弹出分享列表
      // shareBts.length > 0 ? plus.nativeUI.actionSheet({
      //     title: '分享链接',
      //     cancel: '取消',
      //     buttons: shareBts
      // }, function (e) {
      //     (e.index > 0) && shareAction(shareBts[e.index - 1], true);
      // }) : plus.nativeUI.alert('当前环境无法支持分享链接操作!');
    },

    /**
     * 分享操作
     * @param {JSON} sb 分享操作对象s.s为分享通道对象(plus.share.ShareService)
     * @param {Boolean} bh 是否分享链接
     */
    shareAction(sb) {
      var that = this;
      // var shareData = JSON.parse(get_local_cache("history_Article"))[0];
      if (!sb || !sb.s) {
        that.outLine("无效的分享服务！");
        return;
      }
      var msg = {
        extra: {
          scene: sb.x
        }
      };
      msg.href = that.apis.theme.api.appShare; //分享地址
      // if (sharehrefTitle && sharehrefTitle.value != '') {
      // msg.title = sharehrefTitle.value;
      msg.title = that.apis.theme.me.us.text+'官方新闻客户端';
      // }
      // if (sharehrefDes && sharehrefDes.value != '') {
      //   msg.content = sharehrefDes.value;
      msg.content = that.apis.theme.me.us.text+"平台立足于“新闻+政务+服务”的业务定位，从 “物理空间、体制机制、业务平台”三层面融合进行顶层设计，打造“一屏、五平台、N端” 的软件架构体系，形成“策、采、编、播、发、管、控、馈”立体化内容生产体系，实现“一次采集、多种生成、全媒传播”，把握新闻传播信息可视化、移动优先化、活动直播化的新趋势，通过内容、渠道、平台、管理、运营等方面的深度融合，建成形神兼备、软硬一体的融媒体平台建设解决方案。";
      // }
      // msg.thumbs = ['_www/logo.png'];
      // msg.thumbs = shareData.imagesUrl!=''?[shareData.imagesUrl]:shareData.titlepic!=''?[shareData.titlepic]:['_www/logo.png'];
      msg.thumbs = ["_www/logo.png"];
      // msg.pictures = ['_www/logo.png'];
      msg.pictures = ["_www/logo.png"];

      // 发送分享
      if (sb.s.authenticated) {
        that.outLine("---已授权---");
        that.shareMessage(msg, sb.s);
      } else {
        that.outLine("---未授权---");
        sb.s.authorize(
          function() {
            that.shareMessage(msg, sb.s);
          },
          function(e) {
            that.outLine("认证授权失败：" + e.code + " - " + e.message);
            Toast({
              message: "授权认证失败",
              position: "middle",
              duration: 1000
            });
          }
        );
      }
    },

    outLine(str) {
      // alert(str)
      console.log(str);
    },

    /**
     * 发送分享消息
     * @param {JSON} msg
     * @param {plus.share.ShareService} s
     */
    shareMessage(msg, s) {
      let that = this;
      that.outLine(JSON.stringify(msg));
      s.send(
        msg,
        function() {
          that.outLine('分享到"' + s.description + '"成功！');
          that.onSuccess();
        },
        function(e) {
          that.outLine(
            '分享到"' + s.description + '"失败: ' + JSON.stringify(e)
          );
          that.onError();
        }
      );
    }
  }
};
</script>
<style lang='less' scoped>
body {
  background-color: #f2f2f2;
}
#feedback {
  width: 100%;
  height: 100vh;
  background-color: #f2f2f2;
}
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
.share {
  padding: 0.4rem;
  display: flex;
  flex-direction: column;
  text-align: center;
}
.content {
  background: #fafafa;
  p:nth-child(1) {
    font-size: 0.35rem;
    color: @dominantColor;
    margin-top: 10px;
    margin-bottom: 20px;
  }
  img {
    width: 2.6rem;
    height: 2.6rem;
    margin-bottom: 0.3rem;
  }
  p:nth-child(3) {
    color: #5a5a5a;
    font-size: 0.3rem;
    margin-bottom: 0.2rem;
  }
}
.operation {
  margin-top: .5rem;
  img {
    width: 1rem;
    height: 1rem;
    margin-right: 15px;
  }
  img:last-child{
    margin: 0;
  }
}
.line {
  display: flex;
  width: 100%;
  align-items: center;
  // margin: 0 0.3rem;
  margin-top: 1rem;
  span:nth-child(1) {
    border-top: 0.02rem solid #efefef;
    width: 39%;
  }
  span:nth-child(2) {
    font-size: 0.25rem;
    color: #999999;
    margin: 0 0.3rem;
  }
  span:nth-child(3) {
    border-top: 0.02rem solid #efefef;
    width: 40%;
  }
}
.navclolr{color:rgb(26, 26, 26)}
</style>
