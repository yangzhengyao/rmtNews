<template>
  <div id="articleDetail">
    <header class="headerNavFixed">
      <div class="nvbt ibackBack" @click="apis.iback()"></div>
      <div class="nvtt"  v-if="apis.getTheme() =='dongpo'">
        <div class="quanziTab">发布</div>
      </div>
       <div class="nvtt"  v-else>
        <div class="quanziTab" v-if="apis.getTheme() != 'puyang'" @click.stop="quanzi()">{{quanziActive}} <img src="./images/bdown.png" /></div>
        <div class="quanziTab" v-else>拍客</div>
      </div>
    </header>
    
    <div class="container contentNavFixed" style="margin-top:.14rem;background:#fff">
        <!-- <div class="outbox">
          <div class="OutContainer trexArea" v-html="parseComments(introduction)">
          </div> 
        </div> -->
        <div class="friendsContent">
        <textarea
          contenteditable="true"
          placeholder="请输入正文..."
          v-model="introduction"
          id="textarea"
          class="trexArea"
          @click="clearhtml"></textarea>
        </div>
        <div class="imgBoxs">
          <div class="imgBoxsChi">
            <div class="imgTool" v-for="(item,index) in imgBox" :key="index" @click.stop="bigImg(index)">
              <!-- <div v-if="index == tilts"><i class="el-icon-delete" @click="deletePic(index)"></i></div> -->
              <div class="delVid" @click.stop="deletePic(index)">
                <img src="~@/assets/img/del.png" alt="">
              </div>
              <img :src="item">
            </div>
            <div  class="vidBoxsChi" v-if="vidBox.length">
              <!-- <img src="./images/huati.png"> -->
              <div class="videoBack" v-for="(item,index) in vidBox" :key="index" :style="{'background-image':'url('+item[1]+')'}">
                <div class="delVid" @click="deleteVid(index)">
                  <img src="~@/assets/img/del.png" alt="">
                </div>
                <div class="playRound"  @click.stop="jumpPlayer(item[0])"></div>
              </div>
              
            </div>
            <div @click="addImageOrVideo" class="addImage" v-if="imgBox.length <= 8 && vidBox.length <= 0">
              <i class="el-icon-plus"></i>
            </div>
          </div>
          
        </div>
        <!-- <div class="uploadBox" >
          <div v-if="isIOS && fileImgList.length <= 8">
            <el-upload
                action="http://hongqi.wengetech.com:9001/activities/fileUpload"
                list-type="picture-card"
                class="needsclick"
                :class="isIOS ? 'shiphone':'' "
                :on-preview="handlePictureCardPreview"
                :multiple="trues"
                :limit='9'
                :on-exceed="onExceed" 
                accept='image/*'
                :on-success="onSuccess"
                :before-upload="beforeAvatarUpload"
                :before-remove="beforeRemove"
                :http-request="httpRequ"
                :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog>
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </div>
        </div> -->
      <!-- 话题 -->
      <div class="topic-box" v-if="apis.getTheme() != 'puyang' && apis.getTheme() != 'dongpo'">
        <a class="item" v-for="(item,index) in topicList" :key="index" :class="item.isselect?'':'gray'"  @click.stop="addTopic(item,index)">
          #{{item.label}}#
        </a>
      </div>

      <!-- 功能列表 -->
          <div class="function-box" v-if="apis.getTheme() != 'puyang' && apis.getTheme() != 'dongpo' && apis.getTheme() != 'mile'">
              <div @click.stop="topic()">
                <img src="./images/huati.png" alt="">
                <span>话题</span>
                <span><img src="./images/next.png" alt=""></span>
              </div>
              <div v-if="0">
                <img src="./images/position.png" alt="">
                <span>定位</span>
                <span><img src="./images/next.png" alt=""></span>
              </div>
        </div>
        <div class="release-box">
          <div class="release-button" @click.stop="publish">
            发&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;布
          </div>
        </div>
    </div>
  </div>
</template>
<script>
import { Field, MessageBox } from "mint-ui";
import { Spinner } from "vux";
import { mapGetters, mapMutations, mapActions,mapState } from "vuex";
import axios from "axios";
import qs from "qs";
import Bus from '@/Bus';
// import uni from "@dcloudio/uni-h5";
//引入主页
import { Header } from "mint-ui";
import { Toast } from "mint-ui";
import noData from "components/noData.vue";
import { setInterval } from 'timers';
// const root = process.env.API_ROOT;
export default {
  name:"publish",
  props: ["type"],
  data() {
    return {
      param:[],
      pageNo:1,
			appInfoId:1,
      pageSize:10,
      teamList:[],
      hideAddImg: true,
      disabled: true,
      imgArr: JSON.parse(localStorage.getItem("publish")),
      Loop: 0,
      textareaLength:"",
      newimgArr:[],
      noLoading: false,
      video_poster: true, 
      initParams: {},
      headerJson: {}, //mock数据
      json: [],
      quanziActive: "",
      quanziId:"",
      introduction: "",
      topicList: [],
      quanziTitle:"",
      topicNameone:"",
      dialogImageUrl: '',
      dialogVisible: false,
      fileImgList:[],
      fileVioList:[],
      num:0,
      iphonexPadding:false,
      isIOS:false,
      trues:true,
      imgBox:[],
      vidBox:[],
      getData:localStorage.getItem('imgData'),
      getVidData:localStorage.getItem('vidData'),
      androidImg:[],
      androidVid:[],
      kind:[
        { title: '拍照或录像' },
        { title: '选择照片' },
        { title: '选择视频' }],
      coverBox:[]
    };
  },
  components: {
    noData
  },
  computed: {
    ...mapGetters("login", [
      "getStorge"
      // active的栏目
    ]),
    // ...mapState('login', [
    //     'imgData'
    // ]),
  },
  watch:{
    introduction(newVal, oldVal){
      let introduc = '';
      this.topicList.forEach((v, i) => {
        introduc = '#'+ v.label + '#';
        if(newVal.indexOf(introduc) == -1){
          this.topicList[i].isselect = true;
        }else{
          this.topicList[i].isselect = false;
        }
      });
    },
    getData(newVal, oldVal){
      window.clearInterval(this.timer);   
    },
    getVidData(newVal, oldVal){
      window.clearInterval(this.timer);   
    },
  },
  methods: {
    ...mapActions('integral',['updateUserRecordTime']),
    ...mapMutations('login', [
        '_setImgData'
    ]),
    jumpPlayer(videoUrl){
        var that = this;
        var url = {url:videoUrl};
        if(plus.os.name != "iOS"){
            var main = plus.android.runtimeMainActivity();
            //获取java辅助类
            var Helper = plus.android.importClass(that.apis.theme.api.rmtNews);
            //创建对象实例
            var mHelper = new Helper();
            mHelper.playVideo(main,videoUrl);
        }else{
            var notiClass = plus.ios.importClass("NSNotificationCenter");
            notiClass.defaultCenter().postNotificationNameobject("JS2NativePlayVideo",JSON.stringify(url));
        }
    },
    bigImg(index){
        let testImg = this.imgBox;
        plus.nativeUI.previewImage(testImg, {
            background: "#333333",
            current: index,
            onLongPress:function(event){
                let bts = [ {
                    title: "保存图片至本地"
                }];
                plus.nativeUI.actionSheet({
                        title: "操作",
                        cancel: "取消",
                        buttons: bts
                    },
                    function(e) {
                        if( e.index == 1 ){
                            plus.nativeUI.showWaiting('保存中...')
                            let dtask = plus.downloader.createDownload(event.url, {}, function (d, status) {
                                // 下载完成
                                if (status == 200) {
                                //mui.toast("下载成功,文件保存在"+d.filename)
                                plus.gallery.save(d.filename, function () {//保存到相册方法
                                    plus.nativeUI.closeWaiting()
                                    plus.nativeUI.alert('已保存到手机相册')
                                }, function () {
                                    plus.nativeUI.closeWaiting()
                                    plus.nativeUI.alert('保存失败，请重试！')
                                });
                                } else {
                                    plus.nativeUI.alert("下载失败")
                                }
                            });
                            dtask.start();
                        }
                    }
                );
            }
        });
    },
    httpRequ(params){
        const url = 'http://hongqi.wengetech.com:9001/activities/fileUpload'
        this.num += 100;
        const file = params.file,
        fileType = file.type,
        isImage = fileType.indexOf("image") != -1,
        isLt2M = file.size / 1024 / 1024 < 2;
        // 这里常规检验，看项目需求而定
        // 根据后台需求数据格式
        const form = new FormData();
        // 文件对象
        form.append("file", file);
        setTimeout(()=>{
          axios({
            method: "post",
            url: url,
            data: form,
            
            headers: {"content-type": "multipart/form-data"}
          })
            .then(res => {
              //自行处理各种情况
              if(res.data.success){
                this.onSuccess(res.data)
              }else{
                Toast({
                  message:"未知错误",
                  position:"middle",
                  duration:1500
                })
              }
            })
        },this.num)
    },
    beforeRemove(file, fileList){
      for (var i = 0; i < fileList.length; i++) { //删除图片后，上传的图片也要截掉
        if (fileList[i].uid == file.uid) {
          this.fileImgList.splice(i,1);
        }
      }
    },
    beforeAvatarUpload(file) {
      let fielName = file.name.lastIndexOf(".")
      let fileNameLength = file.name.length;//取到文件名长度
      let fileType = file.name.substring(fielName + 1, fileNameLength);//截取文件后缀名
      const isLt5M = file.size / 1024 / 1024 < 10;
      const fileArr = ['image/jpeg', 'image/png'];
      var isFlie = false;
            fileArr.forEach(v=>{
                if(v === file.type) {
                    return isFlie = true;
                }
            })
      if (!isFlie) {
        Toast({
          message:"上传文件格式不正确",
          position:"middle",
          duration:1500
        })
      }
      if (!isLt5M) {
        Toast({
          message:"上传文件过大",
          position:"middle",
          duration:1500
        })
      }
      return isFlie && isLt5M;
    },
    onExceed(){
      Toast({
        message:"超过最大限制9张",
        position:"middle",
        duration:1500
      })
    },
    onSuccess(response,file, fileList){
      let fileType = this.verify(response);
      if (fileType) {
        // fileList[fileList.length-1].url = response.data[0]; //图片 在图片列表喽
        let image = {images:response.data[0]};
        this.fileImgList.push(image);
      } else {                       //视频 在视频列表喽
        // fileList[fileList.length-1].url = response.data[0];
        let video = {videos:response.data[0]};
        this.fileVioList.push(video);
      }
    },
    verify(response){
      let imgStr = /(jpg|jpeg|png|bmp|BMP|JPG|PNG|JPEG|GIF|gif)$/;
      let videoStr = /(AVI|1080P|MP4|MP3|OGG|avi|1080p|mp4|mp3|ogg)$/;
      let fielName = response.data[0].lastIndexOf(".")
      let fileNameLength = response.data[0].length;//取到文件名长度
      let fileType = response.data[0].substring(fielName + 1, fileNameLength);//截取文件后缀名
      let type;
      if (imgStr.test(fileType)) {
        return type = 1;    //图片
      } else if (videoStr.test(fileType)) {                      
        return type = 0;    //视频
      } 
    },
    handleRemove(file, fileList) {
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    parseComments (value) {
     var exp
      exp = /(#|＃)((?!#).)*(#|＃)/g // 这里中文#和英文#都会识别
      value = value.replace(exp, (item) => {
        // item = item.replace(/^#/,"# ").replace(/#$/," #");
        let newVal = '<span class="text-blue">' + item + '</span>'
        return newVal
      }) 
      document.querySelector(".OutContainer")?document.querySelector(".friendsContent").style.height=(document.querySelector(".OutContainer").offsetHeight+26)+"px":"";
      return value 
    },
    //判断话题是否存在
    // flagHati( str ) {
    //   if(this.introduction.indexOf(str)!=-1) {
    //       return 1
    //   }else {
    //       return 0
    //   }
    // },
    addTopic(data,index){//添加话题
          var item = this.topicList[index];
          var itemClick = this.topicList[index].isselect;
          if(!itemClick)return;
          this.introduction==="请输入正文..."?this.introduction="":this.introduction = this.introduction;
          let topic = '#'+data.label+'# ';
          // 去除多个话题判断
          // if(!this.flagHati(topic)){}
          const myField = document.querySelector("#textarea");
          // let cursurPosition = myField.selectionStart;
          this.introduction = this.introduction.slice(0,this.textareaLength) + topic + this.introduction.slice(this.textareaLength)
          this.topicList[index].isselect = false
    },
    clearhtml() {
      this.introduction==="请输入正文..."?this.introduction="":this.introduction = this.introduction;
      const myField = document.querySelector("#textarea");
      let cursurPosition = myField.selectionStart; 
      this.textareaLength = cursurPosition;
    },
    topic(){
      this.apis.urlParams("topicCircleList",{judgment:456});
      plus.webview.getWebviewById(window.location.href.split('#/')[0]+'#/'+"topicCircleList").addEventListener(
        "close",() =>{
          
          this.introduction==="请输入正文..."?this.introduction="":"";
          let locals = JSON.parse(localStorage.getItem('publishHuati'));


          if(locals.topicName&&this.topicNameone!==locals.topicName){
            this.topicNameone=locals.topicName
            this.introduction = this.introduction.slice(0,this.textareaLength) + "#"+locals.topicName+"#" + this.introduction.slice(this.textareaLength)   //修改点击话题返回后出现#undefined#
          }
          localStorage.setItem('publishHuati',{topicName:'',themeName:this.quanziActive})
        },
      false
      );
    },
    quanzi(){
      this.apis.urlParams('topicCircleList',{judgment:123})
      plus.webview.getWebviewById(window.location.href.split('#/')[0]+'#/'+"topicCircleList").addEventListener(
        "close",() =>{
          let locals = JSON.parse(localStorage.getItem('publishHuati'));
          
          if(this.quanziActive!==locals.themeName){
            this.quanziActive = locals.themeName;
          }  

          localStorage.setItem('publishHuati',{topicName:'',themeName:this.quanziActive})
             //修改自动切换圈子标题
          
          this.quanziId = locals.themeId;
        },
        false
      );
    },
    videoPlay() {
      this.video_poster = !this.video_poster;
      this.$refs.refVideo.play();
    },
    touchin(index) {
      clearTimeout(this.Loop); //再次清空定时器
      this.Loop = setTimeout(() =>{
        this.imgArr.urlImg.splice(index, 1);
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
      let userid =JSON.parse( this.getStorge ).user_id;
      let params;
      
      // if(this.isIOS){   //IOS入参
      //   params = {
      //     title: "Test", //标题   暂无
      //     content: this.introduction, //内容
      //     user_id:userid,
      //     pub_status: "1", //发布状态：1、 公开 ,2、仅自己可见,3、好友圈  暂定写死1
      //     theme_id:this.quanziId,//圈子id
      //     app_info_id:this.apis.theme.api.appInfoId,
      //     blog_info_images:JSON.stringify(this.fileImgList),
      //     blog_info_videos:"",
      //     videos_pre_image:""
      //   };
      // }else{
        let getPic = localStorage.getItem('imgData');
        if(getPic){
          // JSON.parse(getPic);
          let jsonP = JSON.parse(getPic);
          jsonP.forEach((v,i) => {
            let image = {images:v};
            this.androidImg.push(image);
          });
        }
        let getVid = localStorage.getItem('vidData');
        if(getVid){
          // JSON.parse(getPic);
          let jsonV = JSON.parse(getVid);
          this.androidVid = getVid;
        }else{
          this.androidVid = '';
        }
        params = {    //安卓入参
          title: "Test", //标题   暂无
          content: this.introduction, //内容
          user_id:userid,
          pub_status: "1", //发布状态：1、 公开 ,2、仅自己可见,3、好友圈  暂定写死1
          theme_id:this.quanziId,//圈子id
          app_info_id:this.apis.theme.api.appInfoId,
          blog_info_images:JSON.stringify(this.androidImg),
          blog_info_videos:this.androidVid?JSON.stringify(this.androidVid):'',
          videos_pre_image:""
        };
      // }
      let that = this;
      if (this.introduction == ""||this.introduction.trim()=="") {
          Toast({
              message:"发布内容不能为空",
              position:"middle",
              duration:1500
            })
        return;
      }
      axios({
        method: "post",
        url: this.apis.theme.api.community.msgRelease, //addBlogInfo   community_al/blog/addBlogInfo   this.apis.theme.api.community.addBlogInfo
        data: params
      }).then(res => {
        if (res.data.success) {
          that.updateUserRecordTime({
            userId: userid,
            appInfoId: this.apis.theme.api.appInfoId,
            expType: 6,
            recordTime: 1,
          })
          that.apis.iback();
        } else {
          Toast({
              message:"发表失败",
              position:"middle",
              duration:1500
            })
        }
      });
    },
    deletePic(index){
      this.getData = localStorage.getItem('imgData');
      let data = JSON.parse(this.getData);
      data.splice(index,1);
      if(data.length <= 0){
        localStorage.removeItem('imgData');
      }else{
        localStorage.setItem('imgData',JSON.stringify(data));
      }
      // data.forEach((v,i) => {
      //   let image = {images:v};
      //   this.androidImg.push(image);
      // });
      this.imgBox.splice(index,1);
    },
    deleteVid(index){ //删除视频
      this.getVidData = localStorage.getItem('vidData');
      let data = JSON.parse(this.getVidData);
      data.splice(index,2);
      this.androidVid = data;
      this.vidBox.splice(index,1);
      if(data.length <= 0){
        localStorage.removeItem('vidData');
      }else{
        localStorage.setItem('vidData',JSON.stringify(data));
      }
    },
    //添加图片或视频
    addImageOrVideo() {
      var that = this;
      var data = localStorage.getItem('imgData');
      var picNum = 9;
      if(data){
        picNum -= JSON.parse(data).length;
      }
      if(!that.isIOS){
        var main = plus.android.runtimeMainActivity();
        //获取java辅助类
        var Helper = plus.android.importClass(that.apis.theme.api.rmtNews);
        //创建对象实例
        var mHelper = new Helper();
      }else{
        var notiClass = plus.ios.importClass("NSNotificationCenter");
      }
      //调用java中的跳转方法，并且传入当前activity实例
      // mHelper.jump2(main,picNum,0);
      /**
       * 选择图片或视频jump2方法，5个都为必传
       * @param 1: 安卓实例
       * @param 2：可上传图片数量
       * @param 3: 0 社区， 1 问政
       * @param 4: type
       * @param 5: 录制视频时长
       * @param 6：剪裁视频时长
       */
      plus.nativeUI.actionSheet(
        {
          title: "选择操作类型",
          cancel: "取消",
          buttons: that.kind
        },
        function(e) {
          //文字
          if(!that.isIOS){
            switch (e.index) {
              case 1:
                mHelper.jump2(main,picNum,0,0,15,0);
                break;
              case 2:
                mHelper.jump2(main,picNum,0,1,0,0);
                break;
              case 3:
                if(data){
                  Toast({
                    message:"已选图片，不可再上传视频",
                    position:"middle",
                    duration:1500
                  })
                  return;
                }
                mHelper.jump2(main,picNum,0,2,0,60);
                break;
            }
          }else{
            var dataIOS;
            switch (e.index) {
              case 1:
                dataIOS = {
                  numder:picNum,
                  type:0,
                  selectType:0,
                  recordVideoTime:15,
                  localVideoTime:0
                }
                notiClass.defaultCenter().postNotificationNameobject("JS2NativeUploadImageOrVideo",JSON.stringify(dataIOS));
                break;
              case 2:
                dataIOS = {
                  numder:picNum,
                  type:0,
                  selectType:1,
                  recordVideoTime:0,
                  localVideoTime:0
                }
                notiClass.defaultCenter().postNotificationNameobject("JS2NativeUploadImageOrVideo",JSON.stringify(dataIOS));
                break;
              case 3:
                if(data){
                  Toast({
                    message:"已选图片，不可再上传视频",
                    position:"middle",
                    duration:1500
                  })
                  return;
                }
                dataIOS = {
                  numder:picNum,
                  type:0,
                  selectType:2,
                  recordVideoTime:0,
                  localVideoTime:60
                }
                notiClass.defaultCenter().postNotificationNameobject("JS2NativeUploadImageOrVideo",JSON.stringify(dataIOS));
                break;
            }
          }
        }
      );
      this.statusSet();
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
              that.imgArr.urlImg.push({
                images:JSON.parse(t.responseText).data?JSON.parse(t.responseText).data[0]:""
              })
              if(JSON.parse(t.responseText).data.length == 1){
                that.imgArr.urlImg.push(JSON.parse(t.responseText).data[0]);
                  if (that.imgArr.urlImg.length == 9) {
                    that.hideAddImg = false;
                  } else {
                    that.hideAddImg = true;
                  }
              }
              // plus.storage.setItem("uploader",t.responseText);
              
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
    },
    AndroisIos(){   //判断是否是安卓
      let u = navigator.userAgent;
      let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
      let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isAndroid) {
        return this.isIOS = false;
      } else if (isIOS) {
        return this.isIOS = true;
      }
    },
    statusSet(){
      // {status:true,data:{}}
      // if(!this.isIOS){
        this.timer = setInterval(()=>{
          this.vidBox = [];
          this.getData = localStorage.getItem('imgData');
          this.getVidData = localStorage.getItem('vidData');
          if(this.getData){
            this.imgBox = JSON.parse(this.getData);
          }
          if(this.getVidData){
            let datas = JSON.parse(this.getVidData);
            this.vidBox.push(datas);
            this.androidVid = datas;
            // coverBox.push(datas.data[0]);
            // coverBox.forEach((v,i) => {
            //   let video = {videos:v};
            //   this.androidVid.push(video);
            // });
          }
        },1000);
      // }
    },
    plusReady() {
    },
  },
  created() {
    if(localStorage.getItem('publishHuati')){
        this.quanziTitle=JSON.parse(localStorage.getItem('publishHuati'));
    }
    this.AndroisIos();
  },
  mounted() {
      this.AndroisIos();
      
      if( this.apis.iphonexPaddingFn() ){
        this.iphonexPadding = true;
      }
      axios({
          method: "post",
          url: this.apis.theme.api.community.selectTopicByParam,
            data:{
              "pageNum":1,
              "pageSize":10,
              "appInfoId":parseInt(this.apis.theme.api.appInfoId),
            }
        }).then(res => {
          // this.quanziActive = res.data.data[0].themeName;          //修改默认的圈子标题
          // this.quanziId = res.data.data[0].themeId;
          this.topicList = [];
          res.data.data.forEach(( v , i ) => {
            this.topicList.push({
              label:v.topicName,
              isselect:true
            })
          })
          this.axios({
                method:"post",
                url:this.apis.theme.api.community.getThemeTop,
                data:{
                  "pageNum":1,
                  "pageSize":10,
                  "appInfoId":parseInt(this.apis.theme.api.appInfoId),
                }
            }).then(res => {
              this.quanziActive = res.data.data[0].themeName;          //修改默认的圈子标题
              this.quanziId = res.data.data[0].themeId;
            })
          // that.disabled = true;
          // if (res.data.success) {
          //   that.noLoading = false;
          //   localStorage.removeItem("characters");
          //   that.apis.iback();
          // } else {
          //   that.noLoading = false;
          // }
        });

    
  }
};

</script>

<style scoped lang='less'>
@import "../../../assets/communityIcon/iconfont.css";
header{
  background: #fff;
  .nvbt,.nvtt{
    color:#4d4d4d;
  }
}
.container{
  -webkit-overflow-scrolling : touch;
}
.imgBoxs{
  min-height: 2.4rem;
  .imgBoxsChi{
    min-width: 2rem;
    .imgTool{
      position: relative;
      width: 2rem;
      height: 2rem;
      float: left;
      margin-left: 0.37rem;
      margin-bottom: 0.37rem;
      border-radius: 6px;
      div{
        background: #000;
        opacity: .5;
        position: absolute;
        width: 2rem;
        height: 2rem;
        border-radius: 0.1rem;
        i{
          color: #fff;
          font-size: 0.5rem;
        }
      }
      img{
        width: 2rem;
        height: 2rem;
        background-size: cover;
      }
      .delVid{
        background: #fff;
        position: absolute;
        right: -0.2rem;
        top: -0.2rem;
        width: 0.45rem;
        height: 0.45rem;
        border-radius: 50%;
        opacity: 1;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
    .addImage{
      background-color: #fbfdff;
      border: 1px dashed #c0ccda;
      border-radius: 6px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      width: 2rem;
      height: 2rem;
      line-height: 146px;
      vertical-align: top;
      position: relative;
      margin-left: 0.37rem;
      margin-bottom: 0.37rem;
      float: left;
      i{
        font-size: 28px;
        color: #8c939d;
        position: absolute;
        left: 37%;
        top: 37%;
      }
    }
    
  }
  .vidBoxsChi{
    position: relative;
    width: 3.5rem;
    height: 2.8rem;
    float: left;
    margin-right: 0.37rem;
    margin-bottom: 0.37rem;
    border-radius: 6px;
    .videoBack{
      margin-left: 0.37rem;
      margin-bottom: 0.37rem;
      width: 3.5rem;
      height: 2.8rem;
      background-size: cover;
    }
    .playRound {
        position: absolute;
        width: 0.8rem;
        height: 0.8rem;
        left: 50%;
        top: 50%;
        margin-left: 0px;
        margin-top: -0.4rem;
        border-radius: 50%;
        background: rgba(0, 0, 0, 0.4) url("../../../assets/img/play_san.png")
        no-repeat center / 40%;
        z-index: 1;
    }
    .delVid{
      background: #fff;
      position: absolute;
      right: -0.6rem;
      top: -0.2rem;
      width: 0.45rem;
      height: 0.45rem;
      border-radius: 50%;
      img{
        width: 100%;
        height: 100%;
      }
    }
}
  
}

/deep/.el-upload-list__item{
  width: 2rem;
  height: 2rem;
  margin-left:0.15rem;
  
}
/deep/.el-upload--picture-card{
  width: 2rem;
  height: 2rem;
  margin-left:0.15rem;
  // margin-top: 0.6rem;
}
/deep/.el-upload-list__item{
    margin-bottom: -0.01rem;
  }
.shiphone{
  /deep/.el-upload--picture-card{
    margin-top: 0.6rem;
  }
  /deep/.el-upload-list__item{
    margin-bottom: -0.26rem;
  }
} 
/deep/.el-upload--picture-card{
  position: relative;
}
/deep/.el-upload--picture-card i{
  position: absolute;
  left: 37%;
  top: 37%;
}
/deep/.el-upload-list--picture-card .el-upload-list__item-actions span+span{
  margin-left:0;
}
/deep/.el-icon-zoom-in{
  display: none;
}
/deep/.el-upload-list__item-delete{
  position: relative;
  top: 1.2rem;
}
/deep/.el-icon-delete{
  position: absolute;
  top: 1.4rem;
  left: 1.4rem;
}
/deep/.el-upload--picture-card:hover, .el-upload:focus {
    border-color: #c0ccda;
    color: #c0ccda;
}

/deep/.el-upload-list__item {
  transition: none !important;
}
/deep/.el-progress-circle{
  width: 1.5rem!important;
  height:1.5rem!important;
  margin-left: 0.5rem;
}
.uploadBox{
  margin-left:0.3rem;
  margin-top: 0.3rem;
  clear: both;
}

.quanziTab {
  width: min-content;
  margin: 0 auto;
  vertical-align: middle;
  img {
    width: 0.24rem;
    vertical-align: middle;
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
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjhBODk5RTUyMDU5QTExRTlBQ0Q5QkVFMzYxNjcxOUFCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjhBODk5RTUzMDU5QTExRTlBQ0Q5QkVFMzYxNjcxOUFCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OEE4OTlFNTAwNTlBMTFFOUFDRDlCRUUzNjE2NzE5QUIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OEE4OTlFNTEwNTlBMTFFOUFDRDlCRUUzNjE2NzE5QUIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7yX53KAAADCUlEQVR42uSbb2hNYRzH7zH/1aKFFHshWyOKeCFpeYPyStTKCs1aIlZeoKTLiBBpb/ZC1HhBQryx8qcIoVEaxjRJWtRiStfSlMfncc9TJ93u7vlzd89zft/6tHW7u89+n/M7zzm/WyellEoVwv/htf1wFwZUNn1wHBanbIpfAfw+C7pU/tyCmUkV0K0KSwZ2wajECOBnvfKf57AwKQIeqOA5CROsFQAODKlw+QgrbRVQqaLLZZgWh/r9bFDlEa5bB++Q0KQ7yxYBZRGvPRnOwGMkzLFBQLGyFPSltQXGShSgowtPw2skLJcowKQK9KX2LEyRKEBHb4qN0IOEDRIFmOjL5EV3rqiUKMBkFbxFwm4okyhAZyKcgBdRj9u2CDBZAJ1IaIVJEgWY/7nZ3STXSBRgor9wuYmEqzBDogCT9W43bAsyVyRBgBnU2ty5okaiAO9c8RIJR2CcRAE6Y2AfvEHCCokCTGbDPSS055sr/AhQlorYDL1IWBdWgGNxN1SAvlweDCPgj+WnhD6AB5BwPqiApOwXm7ydkORNMF/SSKiWLECfDnskC9BZK11ABafBVMkC/t01ShaQcRzns2QBN6TvAcckCzhM+3dLuxU2aaf4tMRbYT3NHqL4Bu+LowWMwzrfoInir0schy9AVa7i/XaAbfkAjRR+X8KI681vOArzhis+iR3wFBoovEfKzm7yA7bDMj/FJ6UDrsFOCv8S5I9tFtAHWym8I8yH2HgK6DvSVqgJW7yNHfAKNlJ4V1QfaEsHDKay3+EtirJ4Wzrgtnsb+6kYHx7nDuiHegpfXazi4ypAD13noJrCLxV7sbidAr2whcIfjdSCcemAIWiB+SNZfFw64KF71N+XYnE/HfAr4rW/u7t7bamK99sBAxGuewV2UHh/6bdcf0+NZZL20JTfTfBJiLVOwVyO+p14XXT9dUBdgKP+LDEPTrrv7yiw8J/60dnY32gHEFA+zMPTg3AaptswZTm5Ho3P+UbH8UoYz4+9UAtLUtmvpPSU1gltvPerLfP1XwEGAJjEdy2l1lKkAAAAAElFTkSuQmCC);
    z-index: 333;
  }
}
.friendsContent {
  background: #fff;
  height: 3rem;
  margin-bottom:0.3rem;
  #trexArea {
    height:  100%;
    margin-top: 0.18rem;
  }
}
.outbox {
  position: absolute;
  min-height: 2rem;
  width: 100%;
  .OutContainer {
    height: auto;
  }
  // top: 0.95rem;
}

.trexArea {
    width: 100% ;
    border: none;
    margin-top: 0.2rem;
    color: #4d4d4d;
    outline: none;
    font-size: 0.32rem;
    padding-left: 0.5rem;
    padding-right: 6%;
    -webkit-user-select: auto;
    color: #000
    ;position:relative;
    height:100%;
    font-family: Roboto,Helvetica, Arial, Microsoft YaHei, STHeiti, sans-serif;
  }
.topic-box {
  background: #fff;
  font-size: 0.9rem;
  clear: both;
  .item {
    font-size: 0.28rem;
    padding: 0.22rem 0.4rem;
    color: rgba(77, 77, 77, 1);
    background: rgba(247, 247, 247, 1);
    border-radius: 1rem;
    margin-left: 0.4rem;
    display: inline-block;
  }
}
.function-box {
  display: flex;
  background: #fff;
  border-radius: 10px;
  flex-direction: column;
  padding-top: 0.6rem;
  > div {
    display: flex;
    flex: 1;
    align-items: center;
    margin: 0 0.4rem;
    padding: 0.35rem 0 0.35rem 0.1rem;
    border-top: 1px solid rgba(230, 230, 230, 1);
    position: relative;
    img {
      width: 0.36rem;
      height: 0.36rem;
      margin-right: 0.14rem;
    }
    span {
      font-size: 0.32rem;
      color: rgba(26, 26, 26, 1);
      line-height: 1;
    }
    > span:nth-child(3) {
      font-size: 0.3rem;
      color: rgba(153, 153, 153, 1);
      font-weight: 400;
      position: absolute;
      right: 0;
      img {
        height: 0.3rem;
      }
    }
  }
  > div:last-child {
    border-bottom: 1px solid rgba(230, 230, 230, 1);
  }
}
.release-box{
  padding: 1rem .4rem;
  background:rgba(255,255,255,1);
  clear:both;

}
.release-button{
  background:@dominantColor;
  height:0.8rem;
  line-height:0.8rem;
  font-size:0.32rem;
  color:rgba(255,255,255,1);
  border-radius: .8rem;
  text-align: center;
}
.gray{ color: #ccc!important}
</style>

<style lang='less'>
.text-blue{
  color:#576B95;
}
</style>