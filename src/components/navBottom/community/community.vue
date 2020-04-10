<template>
  <div class="community">
    <!-- 头部 -->
    <header class="com_header headerNavFixed">
      <!--  userID 暂时写死 iback  -->
      <div class="nvbt" style="flex: none;" @click="apis.iback()"></div>
      <!-- <div class="nvbt" style="flex: none;" @click="apis.iback()"></div> -->
      <div class="com_toggle">
        <span
          ref="vv"
          :class="{ com_toggle_active : comToggleActive}"
          @touchstart.stop.prevent="toggle(1)"
        >热门</span>
        <span
          ref="aa"
          :class="{ com_toggle_active : !comToggleActive}"
          @touchstart.stop.prevent="toggle(2)"
        >关注</span>
      </div>
      <div class v-if="getStorge != null" style="display: flex;width: 15%;justify-content: center;">
        <img
          src
          alt
          v-if=" JSON.parse( getStorge ) == null"
          @click="apis.urlParams('Homepage?id='+JSON.parse( getStorge ).user_id+'')"
          style="width: .47rem;height: .47rem;"
        >
        <!-- 手机用户 -->
        <img :src='"~@/assets/img/"+apis.getTheme()+"/dafult.png"'
          alt
          v-else-if="JSON.parse( getStorge ).imgurl == null"
          @click="apis.urlParams('Homepage?id='+JSON.parse( getStorge ).user_id+'')"
          style="width: .47rem;height: .47rem;"
        >
        <!-- 微信用户 -->
        <img
          :src="apis.theme.imgHost+JSON.parse( getStorge ).imgurl"
          alt
          v-else
          @click="apis.urlParams('Homepage?id='+JSON.parse( getStorge ).user_id+'')"
          style="width: .5rem;height: .5rem;border-radius:50%;"
        >
      </div>
      <div v-else style="width:15%"></div>
    </header>
    <!-- 热门 -->
    <hotBolgs v-if="comToggleActive" ref="hotChild"></hotBolgs>
    <!-- 关注 -->
    <followBlogs v-if="!comToggleActive"></followBlogs>
    <!-- 悬浮 -->
    <div class="myCommunity" v-if="getStorge != null" @click="actionSheetType">
      <img :src='"~@/assets/img/"+apis.getTheme()+"/photo.png"' alt>
    </div>
  </div>
</template>
<script>
import { Loadmore, Toast, Indicator, Field, MessageBox } from "mint-ui";
import axios from "axios";
import qs from "qs";
import { Actionsheet } from "mint-ui";
import noData from "./noData";
import { mapGetters, mapMutations, mapActions } from "vuex";
import hotBolgs from "./comments/hotBlogs";
import followBlogs from "./comments/followBolgs";
import { close } from 'fs';
const root = process.env.API_ROOT;
export default {
  name: "community",
  data() {
    return {
      comToggleActive: true,
      testJson: [], // 选择相册保存的图片
      data: [
        { title: "文字" },
        { title: "拍摄图片" },
        // { title: "拍摄视频" },
        { title: "从相册中选择" }
      ]
    };
  },
  computed: {
    ...mapGetters("login", [
      "getStorge" // active的栏目
    ])
  },
  methods: {
    // 点击弹出下拉框（ 发表文字，拍照上传，选择图册 ）
    actionSheetType() {
        let that = this;
        plus.nativeUI.actionSheet(
          {
            title: "选择操作类型",
            cancel: "取消",
            buttons: that.data
          },
          function(e) {
            //文字
            if (e.index == 1) {
              that.characters();
            } else if (e.index == 2) {
              that.shot();
            }else if (e.index == 3) {
              // that.getVideo();
              that.getLibrary();
            } 
            // else if (e.index == 4) {
            //   that.getLibrary();
            // }
          }
        );
    },
    // 发表文字
    characters() {
      let that = this;
      that.apis.urlParams("characters", {
        urlImg: "",
        type: "1"
      });
      plus.webview.getWebviewById(window.location.href.split('#/')[0]+'#/'+"characters").addEventListener(
        "close",
        function(e) {
          that.$refs.hotChild.pageNo = 1;
          that.$refs.hotChild.loadPageList('top');
        },
        false
      );
    },
    // 拍摄
    shot() {
      let that = this;
      var cmr = plus.camera.getCamera();
      cmr.captureImage(
        function(path) {
          //保存至本地
          plus.gallery.save(path, function(entry) {}, function(e) {});
          //转base64
          plus.io.resolveLocalFileSystemURL(
            path,
            function(entry) {
              that.test(entry.toURL(), entry.name);
            },
            function(e) {
              outLine("读取拍照文件错误：" + e.message);
            }
          );
        },
        function(e) {
          // alert('取消拍照');
        },
        { filename: "_doc/upload/", index: 1 }
      );
    },
    // 拍摄视频
    getVideo() {
      console.log('开始录像：');
      let that = this;
      var cmr = plus.camera.getCamera();
      console.log("支持录制的视频格式：cmr.supportedVideoFormats=====" + cmr.supportedVideoFormats)
      cmr.startVideoCapture(function (p) {
          console.log('录像成功：' + p);
          plus.io.resolveLocalFileSystemURL(p, function (entry) {
              that.uploadVideo(p, entry);
          }, function (e) {
              console.log('读取录像文件错误：' + e.message);
          });
      }, function (e) {
          console.log('失败：' + e.message);
      }, {
          filename: '_doc/camera/',
          index: 1
      });
    },
    // 上传录像
    uploadVideo(path, entry) { 
        var that = this;
        var uploadUrl = 'http://hongqi.wengetech.com:28086/common_al/common/uploadFile?type=4';
        var task = plus.uploader.createUpload(uploadUrl, {
                method: "POST"
            },
            function (t, status) { //上传完成
                if (status == 200) {
                    var data = JSON.parse( t.responseText );
                     that.apis.urlParams("characters", {
                        urlImg: [],
                        urlVedio:data.result,
                        urlVedioImg:data.preImage,
                        type: "3"
                     });
                      plus.webview.getWebviewById(window.location.href.split('#/')[0]+'#/'+"characters").addEventListener(
                        "close",
                        function(e) {
                          that.$refs.hotChild.pageNo = 1;
                          that.$refs.hotChild.loadPageList('top');
                        },
                        false
                      );
                } else {
                    console.log("上传失败：" + status);
                }
            }
        );
        task.addData("client", "HelloH5+");
        task.addFile(path, {
            key: "file"
        })
        task.start();
    },
    //获取相册
    getLibrary: function() {
      this.galleryImgsMaximum();
    },
    galleryImgsMaximum() {
      // 从相册中选择图片
      let lfs = null;
      let that = this;
      plus.gallery.pick(
        function(e) {
          for (var i in e.files) {
            that.showImg(e.files[i]);
          }
          that.testJson = [];
        },
        function(e) {},
        {
          filter: "image",
          multiple: true,
          maximum: 9,
          system: false
        },
        { popover: true, selected: lfs }
      );
    },
    showImg(url) {
      let that = this;
      if (plus.os.name == "iOS") {
        plus.io.resolveLocalFileSystemURL(url, function(entry) {
          entry.file(
            function(file) {
              var src1 = entry.toURL();
              that.test(src1, entry.name);
            },
            function(e) {
              callback.call(null);
              mui.toast("读写出现异常: " + e.message);
            }
          );
        });
      } else {
        plus.io.resolveLocalFileSystemURL(url, function(entry) {
          entry.file(function(file) {
            var src = entry.toLocalURL();
            that.test(src);
          });
        });
      }
    },
    test(src, filename) {
      let that = this;
      var name = "_doc/upload/F_CKJLB-" + filename; //_doc/upload/F_ZDDZZ-1467602809090.jpg
      plus.zip.compressImage(
        {
          src: src,
          dst: name,
          overwrite: true,
          width: "30%",
          height: "30%",
          format: "jpg",
          quality: 35
        },
        function(e) {
          var reader = new plus.io.FileReader();
          var imageArr = [];
          reader.onloadend = function(e) {
            var speech = e.target.result; //base64图片
            that.testJson.push(speech);
            that.apis.urlParams("characters", {
              urlImg: that.testJson,
              type: "2"
            });
            plus.webview.getWebviewById(window.location.href.split('#/')[0]+'#/'+"characters").addEventListener(
              "close",
              function(e) {
                that.$refs.hotChild.pageNo = 1;
                that.$refs.hotChild.loadPageList('top');
              },
              false
            );
          };
          //兼容ios未转换base64
          reader.readAsDataURL(e.target.replace("file://", ""));
        },
        function(err) {
          plus.nativeUI.alert("未知错误！", function() {});
        }
      );
    },
    //切换热门 关注
    toggle(index) {
      let that = this;
      if (index == 1) {
        this.comToggleActive = true;
      } else {
        if (JSON.parse(localStorage.getItem("userData") == null)) {
          that.apis.urlParams("Login", {});
          // this.comToggleActive = false;
        } else {
          this.comToggleActive = false;
        }
      }
    }
  },
  components: {
    "v-loadmore": Loadmore,
    noData,
    hotBolgs,
    followBlogs
  },
};
</script>

<style lang="less" scoped>
.community {
  width: 100%;
  box-sizing: border-box;
  position: relative;
  .myCommunity {
    background: #fff;
    border-radius: 50%;
    -webkit-box-shadow: 0px 0px 9px 1px @dominantColor;
    box-shadow: 0px 0px 9px 1px @dominantColor;
    position: fixed;
    bottom: 12vh;
    right: 2vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: .4rem .37rem;
    background: @dominantColor;
    img {
      width: 0.42rem;
      height: 0.324rem;
    }
  }
  header {
    // height: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .com_header {
    width: 100%;
    // height: 1rem;
    // height: 50px;
    background: @dominantColor;
    // display: flex;
    // align-items: center;
    // position: relative;
    // position: fixed;
    // z-index: 111;
    // justify-content: space-between;
    // align-items: center;
    // padding: 0.17rem 0;
    // box-sizing: border-box;
    .com_photo_left {
      width: 0.47rem;
      height: 0.47rem;
      img {
        width: 100%;
        margin-left: 0.333rem;
      }
    }
    .com_toggle {
      display: flex;
      align-items: center;
      justify-content: space-around;
      border-radius: 0.7rem;
      background: #ffffff;
      padding: 0.02rem;
      span {
        font-size: 0.3rem;
        line-height: 1;
        color: @dominantColor;
        padding: 0.1rem 0.19rem;
        cursor: pointer;
      }
      .com_toggle_active {
        display: block;
        background: @dominantColor;
        color: #fff;
        border-radius: 1rem;
        transition: transform 2s;
      }
      // .com_toggle_active:hover{
      //    transform: translate(-38px)
      // }
    }
    .com_photo_right {
      width: 0.35rem;
      height: 0.29rem;
      margin-right: 0.24rem;
      margin-top: 0.1rem;
      img {
        width: 100%;
      }
    }
  }
  .isLogin {
    justify-content: center !important;
  }
  // .main-body{
  //   overflow: scroll;
  // }
  .dianzan {
    color: red !important;
  }
  .loading {
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 0.32rem;
    color: #999;
    margin-bottom: 50px;
  }
}
</style>
<style lang="less">
.mint-spinner-double-bounce-bounce1 {
  background-color: @dominantColor !important;
}
.mint-spinner-double-bounce-bounce2 {
  background-color: @dominantColor !important;
}
.mint-loadmore-top {
  height: 50px;
  line-height: 50px;
  font-size: 14px;
}
.pullLoading {
  width: 24px;
  height: 24px;
  vertical-align: middle;
  margin-top: -4px;
  margin-right: 3px;
}
.mint-loadmore-content {
  padding-bottom: 1rem;
}
.mint-actionsheet {
  z-index: 10000 !important;
}
</style>

