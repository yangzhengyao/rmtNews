<template>
  <div id="newCommunity">
    <header class="com_header headerNavFixed" v-if="apis.getTheme() !='dongpo'">
      <div style="visibility:hidden" class="nvbt iback"></div>
      <div class="nvtt" v-if="apis.getTheme() =='dongpo'">同城</div>
      <div class="nvtt" v-else-if="apis.getTheme() =='mile'">圈子</div>
      <div class="nvtt" v-else>社区</div>
      <div class="nvbt iabout"  @click="actionSheetType">
        <img src="../me/img/add.png"  v-if="apis.getTheme() !='dongpo' && apis.getTheme() !='mile'"/>
        <img src="../me/img/dongpoadd.png"   style="height:0.4rem" v-else/>
      </div>
    </header>
    <!-- 头部 -->
    <home-header />
    <!-- 内容区域 -->
    <swiper-container></swiper-container>
    <!-- 子页面视图 -->
    <!-- <keep-alive>
            <router-view></router-view>
    </keep-alive>-->

    <!-- 请求提示 -->
    <my-loading :visible="loading"></my-loading>
    <my-error :visible="error" :method="reload"></my-error>
  </div>
</template>
<script>
import homeHeader from "./components/homeHeader";
import swiperContainer from "./components/swiperContainer";
import { mapActions,mapGetters, mapMutations, } from "vuex";
import { Toast } from "mint-ui";
import Bus from '@/Bus';
import { setInterval, setTimeout } from 'timers';
export default {
  name: "indexHeader",
  data() {
    return {
      loading: true,
      error: false,
      testJson: [], // 选择相册保存的图片
      data: [
        { title: "文字" },
        { title: "拍摄图片" },
        // { title: "拍摄视频" },
        { title: "从相册中选择" }
      ],
      datas:1
    };
  },
  components: { homeHeader, swiperContainer },
  computed: {
    ...mapGetters("login", [
      "getStorge",
      // active的栏目
      "imgData"
    ]),
  ...mapGetters("newsCommunity", [
      "indexActive",
    ])
  },
  methods: {
    ...mapActions("newsCommunity", ["get_indexColumn_data"]),
    ...mapMutations('login', [
            '_setImgData'
        ]),
    reload() {
      localStorage.clear();
      sessionStorage.clear();
      // plus.storage.removeItem("launchFlag");
      location.reload();
    },
    urlTipOffRelease(){
      let that = this;
      if(this.indexActive=="5d0221a6e4b0ed2aef82fd99" &&JSON.parse(localStorage.getItem("userData") == null)){
          that.apis.urlParams("Login", {});
      }else{
          localStorage.removeItem('imgData');
          localStorage.removeItem('vidData');
          that.charactersnews();
      }
    },
     // 发表文字
    charactersnews() {
      let that = this;
      that.apis.urlParams("tipOffRelease", {
        urlImg: "",
        type: "1"
      });
      plus.webview
        .getWebviewById(
          window.location.href.split("#/")[0] + "#/" + "tipOffRelease"
        )
        .addEventListener(
          "close",
          function(e) {
            localStorage.removeItem('imgData');
            localStorage.removeItem('vidData');
            that.$refs.hotChild.pageNo = 1;
            that.$refs.hotChild.loadPageList("top");
          },
          false
        );
    },
    // 发表文字
    characters() {
      let that = this;
      that.apis.urlParams("publish", {
        urlImg: "",
        type: "1"
      });
      plus.webview
        .getWebviewById(
          window.location.href.split("#/")[0] + "#/" + "publish"
        )
        .addEventListener(
          "close",
          function(e) {
            localStorage.removeItem('imgData');
            localStorage.removeItem('vidData');
            that.$refs.hotChild.pageNo = 1;
            that.$refs.hotChild.loadPageList("top");
          },
          false
        );
    },
    // 点击弹出下拉框（ 发表文字，拍照上传，选择图册 ）
    actionSheetType() {
      // if( this.getStorge ){
           let that = this;
      //     plus.nativeUI.actionSheet(
      //       {
      //         title: "选择操作类型",
      //         cancel: "取消",
      //         buttons: that.data
      //       },
      //       function(e) {
      //         //文字
      //         if (e.index == 1) {
      //           that.characters();
      //         } else if (e.index == 2) {
      //           that.shot();
      //         } else if (e.index == 3) {
      //           // that.getVideo();
      //           that.getLibrary();
      //         }
      //         // else if (e.index == 4) {
      //         //   that.getLibrary();
      //         // }
      //       }
      //     );
      // } else {
      //   this.apis.urlParams('Login')
      // }
       if(JSON.parse(localStorage.getItem("userData") == null)){
          that.apis.urlParams("Login", {});
      }else{
          localStorage.removeItem('imgData');
          localStorage.removeItem('vidData');
          that.characters();
      }
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
      console.log("开始录像：");
      let that = this;
      var cmr = plus.camera.getCamera();
      console.log(
        "支持录制的视频格式：cmr.supportedVideoFormats=====" +
          cmr.supportedVideoFormats
      );
      cmr.startVideoCapture(
        function(p) {
          console.log("录像成功：" + p);
          plus.io.resolveLocalFileSystemURL(
            p,
            function(entry) {
              that.uploadVideo(p, entry);
            },
            function(e) {
              console.log("读取录像文件错误：" + e.message);
            }
          );
        },
        function(e) {
          console.log("失败：" + e.message);
        },
        {
          filename: "_doc/camera/",
          index: 1
        }
      );
    },
    // 上传录像
    uploadVideo(path, entry) {
      var that = this;
      var uploadUrl =
        "http://hongqi.wengetech.com:28086/common_al/common/uploadFile?type=4";
      var task = plus.uploader.createUpload(
        uploadUrl,
        {
          method: "POST"
        },
        function(t, status) {
          //上传完成
          if (status == 200) {
            var data = JSON.parse(t.responseText);
            that.apis.urlParams("publish", {
              urlImg: [],
              urlVedio: data.result,
              urlVedioImg: data.preImage,
              type: "3"
            });
            plus.webview
              .getWebviewById(
                window.location.href.split("#/")[0] + "#/" + "publish"
              )
              .addEventListener(
                "close",
                function(e) {
                  that.$refs.hotChild.pageNo = 1;
                  that.$refs.hotChild.loadPageList("top");
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
      });
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
          format: "png",
          quality: 70
        },
        function(e) {
          
          var src = e.target

          var params = {file:src}
          var server = "http://hongqi.wengetech.com:9001/activities/fileUpload"
          var task=plus.uploader.createUpload(server,
          {method:"POST"},
          function(t,status){ //上传完成
            if(status==200){
              // that.newimgArr.push({
              //   images:JSON.parse(t.responseText).data?JSON.parse(t.responseText).data[0]:""
              // })
              // var name = "_doc/upload/F_CKJLB-" + filename; //_doc/upload/F_ZDDZZ-1467602809090.jpg
              if(JSON.parse(t.responseText).data.length == 1){
                  that.testJson.push(JSON.parse(t.responseText).data[0]);
                  that.apis.urlParams("publish", {
                    urlImg: that.testJson,
                    type: "2"
                  });
                  plus.webview
                  .getWebviewById(
                    window.location.href.split("#/")[0] + "#/" + "publish"
                  )
                  .addEventListener(
                    "close",
                    function(e) {
                      // that.$refs.hotChild.pageNo = 1;
                      // that.$refs.hotChild.loadPageList("top");
                    },
                    false
                  );
              }
            }else{
              console.log("上传失败："+status);
              // wt.close();
            }
          }
        );
        task.addData("client","HelloH5+");
        task.addFile(src,{key:'file'});
        task.start();
        },
        function(err) {
          plus.nativeUI.alert("未知错误！", function() {});
        }
      );
    },
    // test(src, filename) {
    //   let that = this;
    //   var name = "_doc/upload/F_CKJLB-" + filename; //_doc/upload/F_ZDDZZ-1467602809090.jpg
    //   plus.zip.compressImage(
    //     {
    //       src: src,
    //       dst: name,
    //       overwrite: true,
    //       width: "30%",
    //       height: "30%",
    //       format: "jpg",
    //       quality: 35
    //     },
    //     function(e) {
    //       var reader = new plus.io.FileReader();
    //       var imageArr = [];
    //       reader.onloadend = function(e) {
    //         var speech = e.target.result; //base64图片
    //         that.testJson.push(speech);
    //         that.apis.urlParams("publish", {
    //           urlImg: that.testJson,
    //           type: "2"
    //         });
    //         plus.webview
    //           .getWebviewById(
    //             window.location.href.split("#/")[0] + "#/" + "publish"
    //           )
    //           .addEventListener(
    //             "close",
    //             function(e) {
    //               that.$refs.hotChild.pageNo = 1;
    //               that.$refs.hotChild.loadPageList("top");
    //             },
    //             false
    //           );
    //       };
    //       //兼容ios未转换base64
    //       reader.readAsDataURL(e.target.replace("file://", ""));
    //     },
    //     function(err) {
    //       plus.nativeUI.alert("未知错误！", function() {});
    //     }
    //   );
    // },
    getRes(result,type){
      // {status:true,data:[1,2,3]}
      let selecteType;
      if(plus.os.name == 'iOS'){
        selecteType = result.type;
      }else{
        selecteType = type;
      }
      if(selecteType == 1){
        let oldVal;
        let newVal;
        let datas = localStorage.getItem('imgData');
        let jsonPic = result
        if(datas){
          oldVal = JSON.parse(datas);
          newVal = oldVal.concat(jsonPic.data);
          console.log(JSON.stringify(jsonPic.data))
          localStorage.setItem('imgData',JSON.stringify(newVal))
          console.log("111111")
        }else{
          localStorage.setItem('imgData',JSON.stringify(jsonPic.data))
          console.log(JSON.stringify(jsonPic.data),"222222")
        }
        
      }else{  
        localStorage.setItem('vidData',JSON.stringify(result.data));
        console.log("上传视频")
      }
      
    },
    
    plusready(){

    }
  },
  mounted(){
    var that = this;
    window["imgBoxs"] = (result,type) => { //挂载到window上的方法，以便安卓或IOS调用
      this.getRes(result,type);
    };
    if (window.plus) {
      that.plusready();
    } else {
      document.addEventListener(
      "plusready",
      that.plusready(),
      false
      );
    }
 

    
  },

  created() {
    this.get_indexColumn_data()
      .then(res => {
        this.loading = false;
        this.error = false;
      })
      .catch(err => {
        this.loading = false;
        this.error = true;
      });

  }
};
</script>
<style lang='stylus'>
#newCommunity {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 11.17rem;
  overflow: hidden;
  background: #fff;
}

#newCommunity header {
  background: #fff !important;

  .nvtt {
    font-size: 0.38rem;
    color: #1A1A1A;
    font-weight: 500;
  }

  .iabout {
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      height: 0.3rem;
      position:relative;
      top:-.05rem
    }
  }
}
</style>
