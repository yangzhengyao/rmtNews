<template>
  <!-- 加载更多 -->
  <div id="Homepage">
    <header class="headerNavFixed">
      <div class="nvbt iback" @click="apis.iback()"></div>
      <!-- <div class="nvbt iback" ></div> -->
      <div class="nvtt">发表文字</div>
      <div class="nvcom" v-if="disabled">
        <button @click="publish" style="color: #fff;background: none; font-size: 18px;">发布</button>
      </div>
      <div class="nvcom" v-else>
        <button disabled style="color: #fff;background: none; font-size: 18px;">发布</button>
      </div>
    </header>
    <div class="container contentNavFixed" style="margin-top:.3rem">
      <div class="friendsContent">
        <!-- <mt-field placeholder="请在此输入您想发表的文字。" type="textarea" rows="4" v-model="introduction"></mt-field> -->
        <textarea
          rows="10"
          cols="30"
          contenteditable="true"
          style="-webkit-user-select: auto;"
          placeholder="这一刻您的想法..."
          v-model="introduction"
        ></textarea>
      </div>
      <!-- {{ imgArr }} -->
      <!-- 非上传视频  && imgArr.type != 2-->
      <div class="imageDiv" v-if=" imgArr.type == 2  ">
        <div v-for="(item,index) in imgArr.urlImg" :key="index">
          <img
            :src="item"
            alt
            @touchstart.prevent="touchin(index)"
            @touchend.prevent="cleartime(index)"
          >
        </div>
        <div
          class="addImg"
          @click="addImage"
          v-if="imgArr.urlImg.length < 9 || imgArr.type == '3' "
        >
          <img style="width:25%;height:30%" src="./images/addImg.png" alt>
        </div>
      </div>
      <!-- <mt-spinner :type="1"  color="red"></mt-spinner> -->
      <!-- <div id="loading" v-if="noLoading" >
        <spinner type="bubbles" size="40px"></spinner>
      </div> -->
      <!-- 上传视频 -->
      <div class="video_wrapper" v-else-if=" imgArr.type == 3" style="background:#fff;">
        <video :src='imgArr.urlVedio' ref="refVideo" controls="controls" style="width:50%;height:5rem"></video>
        <div class="img-box" :style="{'background-image':'url('+imgArr.urlVedioImg+')'}" v-if="video_poster"></div>
        <div class="playRound" @click.stop="videoPlay" v-if="video_poster"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { Field, MessageBox } from "mint-ui";
import { Spinner } from "vux";
import { mapGetters, mapMutations, mapActions } from "vuex";
import axios from "axios";
import qs from "qs";
//引入主页
import { Header } from "mint-ui";
import { Toast } from "mint-ui";
const root = process.env.API_ROOT;
export default {
  props: ["type"],
  data() {
    return {
      initParams: {},
      headerJson: {}, //mock数据
      json: [],
      introduction: "",
      hideAddImg: true,
      disabled: true,
      imgArr: JSON.parse(localStorage.getItem("characters")),
      Loop: 0,
      noLoading: false,
      video_poster: true, // video封面
    };
  },
  components: {
    "mt-field": Field,
    Spinner
  },
  methods: {
    videoPlay() {
      this.video_poster = !this.video_poster;
      this.$refs.refVideo.play();
    },
    touchin(index) {
      clearTimeout(this.Loop); //再次清空定时器
      let that = this;
      this.Loop = setTimeout(function() {
        that.imgArr.urlImg.splice(index, 1);
        plus.nativeUI.alert("删除成功", function() {}, "提示", "确定");
      }, 1000);
    },
    cleartime() {
      var that = this;
      clearTimeout(this.Loop);
      return false;
    },
    //发表
    publish() {
      let params = {
        title: "Test", //标题   暂无
        content: this.introduction, //内容
        pub_status: "1" //发布状态：1、 公开 ,2、仅自己可见,3、好友圈  暂定写死1
      };
      let that = this;
      console.log(that.disabled,"111111111111")
      if (!that.disabled) {
        return;
      }
      if (this.imgArr.type == "1") {
        if (this.introduction == "") {
          alert("发布内容不能为空");
          return;
        }
        that.disabled = false;
        that.noLoading = true;
        axios({
          method: "post",
          url: this.apis.theme.api.community.addBlogInfo, //addBlogInfo   community_al/blog/addBlogInfo   this.apis.theme.api.community.addBlogInfo
          data: qs.stringify(params)
        }).then(res => {
          // console.log(JSON.stringify(params));
          // console.log(JSON.stringify(res));
          // console.log(that.disabled,"22222222222222222")
          console.log( JSON.stringify( res ) )
          if (res.data.status == 1) {
            that.apis.iback();
          } else {
            Toast({
              message: "发布失败",
              position: "middle",
              duration: 2000
            });
          }
          that.noLoading = false;
          that.disabled = true;
        });
      } else if (this.imgArr.type == "2") {
        var imgStr = "";
        for (var i = 0; i < this.imgArr.urlImg.length; i++) {
          var imgSplit = this.imgArr.urlImg[i].split(",")[1];
          imgStr += imgSplit + ",";
        }
        params["imgEncodes"] = imgStr;
        if (params.hasOwnProperty("blog_info_videos")) {
          delete params["blog_info_videos"];
          delete params["videos_pre_image"];
        }
        that.disabled = false;
        that.noLoading = true;
        axios({
          method: "post",
          url: this.apis.theme.api.community.addBlogInfo,
          data: qs.stringify(params)
        }).then(res => {
          that.disabled = true;
          console.log(JSON.stringify(params));
          console.log(JSON.stringify(res));
          if (res.data.status == 1) {
            that.noLoading = false;
            localStorage.removeItem("characters");
            that.apis.iback();
          } else {
            that.noLoading = false;
          }
        });
      } else if (this.imgArr.type == "3") {
        params["blog_info_videos"] = this.imgArr.urlVedio;
        params["videos_pre_image"] = this.imgArr.urlVedioImg;
        if (params.hasOwnProperty("imgEncodes")) {
          delete params["imgEncodes"];
        }
        console.log(JSON.stringify(params));
        that.disabled = false;
        that.noLoading = true;
        axios({
          method: "post",
          url: this.apis.theme.api.community.addBlogInfo,
          data: qs.stringify(params)
        }).then(res => {
          that.disabled = true;
          if (res.data.status == 1) {
            that.noLoading = false;
            localStorage.removeItem("characters");
            that.apis.iback();
          } else {
            that.noLoading = false;
          }
        });
      }
    },
    //添加图片
    addImage() {
      // 从相册中选择图片
      let that = this;
      let addImgLength = 9 - that.imgArr.urlImg.length; //二级页面控制还能选择几张
      if (this.imgArr.urlImg.length <= 8) {
        let lfs = null;
        let that = this;
        plus.gallery.pick(
          function(e) {
            for (var i in e.files) {
              that.showImg(e.files[i]);
            }
            that.testJson = [];
          },
          function(e) {
            plus.nativeUI.alert("您最多只能选择" + addImgLength + "张图片", function() {}, "提示", "确定");
          },
          {
            filter: "image",
            multiple: true,
            maximum: addImgLength,
            system: false
          },
          { popover: true, selected: lfs }
        );
      } else {
        plus.nativeUI.alert("您最多只能选择" + addImgLength + "张图片", function() {}, "提示", "确定");
      }
    },
    showImg(url) {
      let that = this;
      //判断是否是安卓
      if (plus.os.name == "iOS") {
        plus.io.resolveLocalFileSystemURL(url, function(entry) {
          entry.file(
            function(file) {
              var srcLocal = entry.toLocalURL();
              that.test(srcLocal);
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
    test(src) {
      let that = this;
      plus.zip.compressImage(
        {
          src: src,
          dst: "_doc/a.jpg",
          overwrite: true,
          width: "30%",
          height: "30%",
          format: "png",
          quality: 35
        },
        function(e) {
          var reader = new plus.io.FileReader();
          var imageArr = [];
          reader.onloadend = function(e) {
            // alert(JSON.stringify(e.target));
            // alert(111);
            var speech = e.target.result; //base64图片\
            that.imgArr.urlImg.push(e.target.result);
            // that.testJson.push(e.target.result);
            if (that.imgArr.urlImg.length == 9) {
              that.hideAddImg = false;
            } else {
              that.hideAddImg = true;
            }
          };
          //兼容ios未转换base64
          reader.readAsDataURL(e.target.replace("file://", ""));
        },
        function(err) {
          plus.nativeUI.alert("未知错误！", function() {});
        }
      );
    },
    //获取用户ID
    getParams() {
      let url = window.location.href;
      let urlParams = this.apis.parseQueryString(url);
      this.initParams = urlParams;
      // alert( JSON.stringify( this.initParams ) )
      return urlParams;
    },
    isLocalParams() {
      if (this.imgArr.length == 0) {
        JSON.parse(window.localStorage.setItem("characters")).urlImg = [];
      }
    }
  },
  created() {
    this.getParams();
    this.isLocalParams();
  },
  mounted() {
    if (this.imgArr.type == "2") {
      this.$refs.refVideo.src = this.imgArr.urlVedio;
    }
  }
};
</script>
<style scoped lang='less'>
.headerNavFixed > div {
  height: .88rem;
}
#Homepage {
  background: #f7f7f7;
}
.container {
  height: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  position: relative;

  .globalTip {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
    div {
      height: 32px;
      line-height: 34px;
      font-size: 14px;
      color: #2a90d7;
      background: rgba(213, 233, 247, 0.9);
      text-align: center;
      display: none;

      &.requestFail {
        color: #f56767;
        background: #fbe9ef;
      }
    }
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
  .friendsContent {
    background: #fff;
    textarea {
      width: 100% !important;
      border: none;
      margin-top: 0.2rem;
      height: 2rem !important;
      outline: none;
      font-size: 0.32rem;
      // text-indent: 20px;
      padding-left: 6%;
      padding-right: 6%;
    }
  }

  // 图片
  .imageDiv {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    padding: 10px 0px;
    background: #fff;
    > div {
      margin-left: 0.4rem;
      width: 2rem;
      height: 1.5rem;
      margin-bottom: 0.2rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .addImg {
      background: #f2f2f2;
      text-align: center;
      font-size: 0.3rem;
      align-items: center;
      display: flex;
      justify-content: center;
      color: @dominantColor;
    }
  }
  .video_wrapper {
    position: relative;
    margin-left: 6%;
    .img-box {
      position: absolute;
      width: 50%;
      height: 5rem;
      left: 0;
      top: 0;
      z-index: 111;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    }
    .playRound {
      position: absolute;
      width: 48px;
      height: 48px;
      left: 18%;
      top: 50%;
      // margin-left: -24px;
      margin-top: -24px;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.4)
        url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjhBODk5RTUyMDU5QTExRTlBQ0Q5QkVFMzYxNjcxOUFCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjhBODk5RTUzMDU5QTExRTlBQ0Q5QkVFMzYxNjcxOUFCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OEE4OTlFNTAwNTlBMTFFOUFDRDlCRUUzNjE2NzE5QUIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OEE4OTlFNTEwNTlBMTFFOUFDRDlCRUUzNjE2NzE5QUIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7yX53KAAADCUlEQVR42uSbb2hNYRzH7zH/1aKFFHshWyOKeCFpeYPyStTKCs1aIlZeoKTLiBBpb/ZC1HhBQryx8qcIoVEaxjRJWtRiStfSlMfncc9TJ93u7vlzd89zft/6tHW7u89+n/M7zzm/WyellEoVwv/htf1wFwZUNn1wHBanbIpfAfw+C7pU/tyCmUkV0K0KSwZ2wajECOBnvfKf57AwKQIeqOA5CROsFQAODKlw+QgrbRVQqaLLZZgWh/r9bFDlEa5bB++Q0KQ7yxYBZRGvPRnOwGMkzLFBQLGyFPSltQXGShSgowtPw2skLJcowKQK9KX2LEyRKEBHb4qN0IOEDRIFmOjL5EV3rqiUKMBkFbxFwm4okyhAZyKcgBdRj9u2CDBZAJ1IaIVJEgWY/7nZ3STXSBRgor9wuYmEqzBDogCT9W43bAsyVyRBgBnU2ty5okaiAO9c8RIJR2CcRAE6Y2AfvEHCCokCTGbDPSS055sr/AhQlorYDL1IWBdWgGNxN1SAvlweDCPgj+WnhD6AB5BwPqiApOwXm7ydkORNMF/SSKiWLECfDnskC9BZK11ABafBVMkC/t01ShaQcRzns2QBN6TvAcckCzhM+3dLuxU2aaf4tMRbYT3NHqL4Bu+LowWMwzrfoInir0schy9AVa7i/XaAbfkAjRR+X8KI681vOArzhis+iR3wFBoovEfKzm7yA7bDMj/FJ6UDrsFOCv8S5I9tFtAHWym8I8yH2HgK6DvSVqgJW7yNHfAKNlJ4V1QfaEsHDKay3+EtirJ4Wzrgtnsb+6kYHx7nDuiHegpfXazi4ypAD13noJrCLxV7sbidAr2whcIfjdSCcemAIWiB+SNZfFw64KF71N+XYnE/HfAr4rW/u7t7bamK99sBAxGuewV2UHh/6bdcf0+NZZL20JTfTfBJiLVOwVyO+p14XXT9dUBdgKP+LDEPTrrv7yiw8J/60dnY32gHEFA+zMPTg3AaptswZTm5Ho3P+UbH8UoYz4+9UAtLUtmvpPSU1gltvPerLfP1XwEGAJjEdy2l1lKkAAAAAElFTkSuQmCC)
        no-repeat center / 40%;
      z-index: 333;
    }
  }
}
</style>
<style lang="less">
.mint-cell-value {
  margin-top: 0.3rem;
}
.vux-spinner {
  stroke: @dominantColor !important;
  fill: @dominantColor !important;
}
#loading {
  position: fixed;
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0.5;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
