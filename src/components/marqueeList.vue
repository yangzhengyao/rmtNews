<template>
  <div class="vueBox">
    <div class="marquee">
      <div class="marquee_title">
        <span>
          <img :src="newsflash" />
        </span>
      </div>
      <div class="marquee_box">
        <ul class="marquee_list" :class="{marquee_top:animate}">
          <li v-for="(item, index) in contentJson" :key="index" @click.stop="saveData(item)">
            <span>{{item.title}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { formatDate, getDateDiff } from "@/config/cache.js";
import api from "@/assets/js/api.js";
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      animate: false,
      newsflash: require("../assets/img/newsflash.png"),
      boo: false,
      classPage: 0, // 当前栏目的翻页页数
      stickJson: [], // 置顶数据
      bannerJson: [], // banner数据
      contentJson: [], // 整个列表数据
      dataCount: 0, // 推荐文章数量
      topStatus: "", // 下拉状态
      bottomLock: false, // 上滑开关
      bottomLoading: false, // 底部loading
      bottomNoData: false, // 底部nothing
      loading: false,
      error: false,
      // xinshidaiFlag: {},
      xuexiFlag: {},
      tops: ""
    };
  },

  created() {
    this.init();
    setInterval(this.showMarquee, 2000);
  },
  methods: {
    ...mapActions("index", ["get_listItem_data"]),
    ...mapActions("integral",["calculateIntegral"]),
    init() {
      this.get_listItem_data({
        page: this.classPage,
        uuid: "5d8220fde4b07e4a5f838772"
      })
        .then(res => {
          var tempArr = [];
          res.list.forEach(function(item, i) {
            tempArr.push({
              type: item.type,
              id: item.id,
              title: item.title,
              befrom: item.source,
              time: getDateDiff(item.pubDate),
              titlepic:
                item.image_url != null ? item.image_url.split(" ")[0] : false, // 缩略图
              ptitlepic:
                i % 5 == 0 && item.image_url != null
                  ? item.image_url.split(" ")[0]
                  : false, // 大图
              playonlineurl: item.stroyType == "VIDEO" ? item.video_url : false, // 视频
              lives:
                item.stroyType == "ZHIBO" || item.stroyType == "LIVE"
                  ? item.video_url
                  : false, // 直播
              href: item.stroyType == "HREF" ? item.url : false, //
              jsonUrl: item.jsonUrl,
              readNum: item.read_num,
              properties: item.properties,
              columnName: item.columnName,
              readUrl: item.url
            });
          });
          this.contentJson = tempArr;
        })
        .catch(err => {});
    },
    saveData(section) {
      let that = this;
      // this.addReadOrShareNum({type: 1, columnName: param.columnName})
      if (section.lives) {
        this.readFn(section);
        this.apis.urlParams(section.lives, { title: section.title }, true);
        //  this.$router.push( {  path:'/Details'} )
      } else if (section.href) {
        this.readFn(section);
        this.apis.urlParams(section.href, { title: section.title }, true);
      } else if (section.weixin) {
        this.readFn(section);
        this.apis.urlParams(
          section.outUrl,
          { title: section.title, isWechat: true },
          true
        );
      } else if (
        section.qinqiang ||
        section.xinshidai ||
        section.weixin ||
        section.lianghui
      ) {
        this.apis.urlParams("Details", { path: section });
      } else {
        if (section.type == "1") {
          //判断是否有properties 对象, 针对VR视频
          // alert( section.properties == undefined )
          if (
            section.properties != undefined &&
            section.hasOwnProperty("properties")
          ) {
            if (
              section.properties.hasOwnProperty("isVr") == true &&
              section.properties.isVr == "1"
            ) {
              if (plus.os.name == "iOS") {
                var VRparams = {};
                VRparams["news_title"] = section.title;
                VRparams["news_url"] = section.properties.accessUrl;
                VRparams["news_id"] = section.id;
                VRparams["news_copyright"] = section.befrom;
                VRparams["news_type"] = section.type;
                VRparams["news_channel_id"] = localStorage.getItem(
                  "index_Active"
                );
                VRparams["submit_url"] =
                  "http://userlog.wengetech.com:10018/log_api/checkLogByAppname";
                if (localStorage.getItem("userData") != null) {
                  VRparams.uid = JSON.parse(
                    localStorage.getItem("userData")
                  ).user_id;
                }
                let appName = that.apis.getTheme();
                if (appName == "redflag") {
                  VRparams["appname"] = "hq_rmt";
                } else if (appName == "qingtongxia") {
                  VRparams["appname"] = "qtx";
                } else {
                  VRparams["appname"] = appName;
                }
                // var notiClass = plus.ios.importClass("ViewController");
                // notiClass.beginVR( JSON.stringify( VRparams ) );
                //获取ios阅读时间
                var notiClass = plus.ios.importClass("ReadInfo");
                if (notiClass) {
                  var readInfo = notiClass.sharedReadInfo();
                  if (
                    readInfo.respondsToSelector(
                      plus.ios.newObject("@selector", "beginVR:")
                    )
                  ) {
                    readInfo.beginVR(JSON.stringify(VRparams));
                  } else {
                  }
                } else {
                }
              } else {
                //安卓VR
                var VRparams = {};
                VRparams["news_title"] = section.title;
                VRparams["news_url"] = section.properties.accessUrl;
                VRparams["news_id"] = section.id;
                VRparams["news_copyright"] = section.befrom;
                VRparams["news_type"] = section.type;
                VRparams["news_channel_id"] = localStorage.getItem(
                  "index_Active"
                );
                VRparams["submit_url"] =
                  "http://userlog.wengetech.com:10018/log_api/checkLogByAppname";
                if (localStorage.getItem("userData") != null) {
                  VRparams.uid = JSON.parse(
                    localStorage.getItem("userData")
                  ).user_id;
                }
                let appName = that.apis.getTheme();
                if (appName == "redflag") {
                  VRparams["appname"] = "hq_rmt";
                } else if (appName == "qingtongxia") {
                  VRparams["appname"] = "qtx";
                } else {
                  VRparams["appname"] = appName;
                }
                //获取当前Activity
                var main = plus.android.runtimeMainActivity();
                //获取java辅助类
                var Helper = plus.android.importClass(
                  that.apis.theme.api.rmtNews
                );
                //创建对象实例
                var mHelper = new Helper();
                //调用java中的跳转方法，并且传入当前activity实例
                mHelper.playVRVideo(main, JSON.stringify(VRparams));
                // this.apis.urlParams('Details',{'path':section})
              }
            } else {
              this.apis.urlParams("Details", { path: section });
            }
          } else {
            this.apis.urlParams("Details", { path: section });
          }
        } else {
          this.apis.urlParams("Details", { path: section });
        }
      }
      let userDataid = JSON.parse(localStorage.getItem("userData"));
      if (userDataid !== null) {
        this.userDataid = userDataid.user_id;
      }
      if (this.userDataid) {
        var postData = {
          userId: this.userDataid,
          browseType: 1,
          browseContentId: section.id
        };
        this.addUserBrowse(postData);
      }
      plus.webview.getWebviewById(window.location.href.split('#/')[0]+'#/'+"Details").addEventListener(
        "close",
        function(e) {
          if(userDataid !== null){
            that.calculateIntegral(section)
          }
        },
        false
      );
    },
    addUserBrowse(postData) {
      this.axios({
        method: "post",
        url: this.apis.theme.api.me.addUserBrowse,
        data: postData
      });
    },
    showMarquee: function() {
      this.animate = true;
      setTimeout(() => {
        this.contentJson.push(this.contentJson[0]);
        this.contentJson.shift();
        this.animate = false;
      }, 500);
    }
  }
};
</script>
<style lang="stylus" scoped>
.marquee {
  width: 100%;
  height: 1.1rem;
  align-items: center;
  color: #3A3A3A;
  background-color: #efefef;
  display: flex;
  box-sizing: border-box;
}

.marquee_title {
  padding: 0 0.3rem;
  height: 0.3rem;
  font-size: 14px;
  border-right: 1px solid #969696;
  align-items: center;
}

.marquee_title img {
  width: 0.68rem;
  height: 0.34rem;
  display: inline-block;
  vertical-align: middle;
}

.marquee_box {
  display: block;
  position: relative;
  width: 90%;
  height: 30px;
  overflow: hidden;
  white-space: nowrap;
}

.marquee_list {
  width 100%
  padding-right .3rem;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
}

.marquee_top {
  transition: all 0.5s;
  margin-top: -30px;
}

.marquee_list li {
  width 100%
  height: 30px;
  line-height: 30px;
  font-size: 0.28rem;
  padding-left: 0.21rem;
  overflow: hidden;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  white-space: nowrap;
}

.marquee_list li span {
  padding: 0 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
  width: 100%;
}

.red {
  color: #FF0101;
}
</style>
