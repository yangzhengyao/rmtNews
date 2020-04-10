<template>
  <div id="tipOffRelease">
    <header class="com_header headerNavFixed">
      <div class="nvbt iback" @click="apis.iback()"></div>
      <div class="nvtt"></div>
      <div class="nvbt idoc" style="font-size:.32rem;" @click="release" v-if="!noLoading">发布</div>
      <div class="nvbt idoc" style="font-size:.32rem;" v-else>发布</div>
    </header>
    <div
      class="content contentNavFixed com_contentNavFixed"
      style="margin-top:.1rem;background:#fff"
    >
      <div
        class="container"
        :style="{'-webkit-overflow-scrolling': scrollMode}"
        style="background:#fff"
      >
        <mapDrag @drag="dragMap" :lat="latitude" :lng="longitude" class="mapbox"></mapDrag>
        <div class="tipOffRelease">
          <div>
            <input
              type="text"
              placeholder="标题长度1到30字之间..."
              v-model="inputVal"
              maxlength="30"
              class="inputColor"
            >
            <span>{{ inputVal.length }}/30</span>
          </div>
          <div>
            <textarea
              name
              id
              cols="30"
              rows="10"
              v-model="textareaVal"
              class="textareaColor"
              contenteditable="true"
              maxlength="200"
              style="-webkit-user-select: auto;"
              placeholder="内容长度1到200字之间..."
            ></textarea>
            <span>{{ textareaVal.length }}/200</span>
          </div>
          <!-- 非上传视频  && imgArr.type != 2-->


<!--           
          <div class="imageDiv">
            <div v-for="(item,index) in imgArr" :key="index">
              <img
                :src="item"
                alt
                @touchstart.prevent="touchin(index)"
                @touchend.prevent="cleartime(index)"
              >
              <div class="delete" @click="deleteImg(index)">
                <img src="./images/delete.png" alt>
              </div>
            </div>
            <div class="addImg" @click="actionSheetType" v-if="imgArr.length < 9 ">
              <img style="width:35%;height:40%" src="./images/addImg.png" alt>
            </div>
          </div>  -->

       <div class="imgBoxs">
          <div class="imgBoxsChi">
            <div class="imgTool" v-for="(item,index) in imgBox" :key="index" @click.stop="bigImg(index)">
              <!-- <div v-if="index == tilts"><i class="el-icon-delete" @click="deletePic(index)"></i></div> -->
              <div class="delVid" @click.stop="deletePic(index)">
                <img src="./images/delete.png" alt>
              </div>
              <img :src="item">
            </div>
            <div  class="vidBoxsChi" v-if="vidBox.length">
              <!-- <img src="./images/huati.png"> -->
              <div class="videoBack" v-for="(item,index) in vidBox" :key="index" :style="{'background-image':'url('+item[1]+')'}">
                <div class="delVid" @click="deleteVid(index)">
                  <img src="./images/delete.png" alt>
                </div>
                <div class="playRound"  @click.stop="jumpPlayer(item[0])"></div>
              </div>
              
            </div>
            <div @click="addImageOrVideo" class="addImage" v-if="imgBox.length <= 8 && vidBox.length <= 0">
              <i class="el-icon-plus"></i>
            </div>
          </div>
          
        </div>
          <div class="newsaddress">
            <img src="./images/position.png" alt>
            {{ dragData.address }}
          </div>
          <div id="loading" v-if="noLoading">
            <spinner type="bubbles" size="40px"></spinner>
          </div>
        
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import axios from "axios";
import qs from "qs";
import { Spinner,TransferDom, Actionsheet, Group, XSwitch } from "vux";
//引入主页
import { Header, Toast, Loadmore } from "mint-ui";
import mapDrag from "../../../components/mapDrag";
const root = process.env.API_ROOT;
export default {
  data() {
    // let latitude = '';
    // let longitude = '';
    // if( this.apis.isPC() ){

    // } else {
    //    latitude = JSON.parse(  localStorage.getItem( 'latAndLong' ) ).latitude;
    //    longitude = JSON.parse(  localStorage.getItem( 'latAndLong' ) ).longitude;
    // }
    return {
      show4:false,
      menu4: {
        menu1: '拍摄照片',
        menu2: '相册选取',
      },
      pageNum: 1,
      pageSize: 10,
      title: "问政",
      imgArr: [],
      hideAddImg: true,
      root: root,
      scrollMode: "auto", //移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
      introduction: "",
      inputVal: "",
      textareaVal: "",
      noLoading: false,
      dragData: {
        lng: null,
        lat: null,
        address: null,
        nearestJunction: null,
        nearestRoad: null,
        nearestPOI: null,
        regeocode: null,
        position: null
      },
     latitude: JSON.parse(  localStorage.getItem( 'latAndLong' ) ).latitude,
     longitude: JSON.parse(  localStorage.getItem( 'latAndLong' ) ).longitude,
    //  latitude:'39.98554',
    //  longitude:'116.328031',
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
  directives: {
    TransferDom
  },
  components: {
    Spinner,
    Actionsheet,
    Group,
    XSwitch,
    mapDrag
  },
  created() {
    this.AndroisIos();
  },
   computed: {
    ...mapGetters("login", [
      "getStorge"
    ]),
  },
   watch:{
    getData(newVal, oldVal){
      window.clearInterval(this.timer);   
    },
    getVidData(newVal, oldVal){
      window.clearInterval(this.timer);   
    },
  },
  methods: {
    //地图拖拽
    dragMap(data) {
      console.log(data);
      this.dragData = {
        lng: data.position.lng,
        lat: data.position.lat,
        address: data.address,
        nearestJunction: data.nearestJunction,
        nearestRoad: data.nearestRoad,
        nearestPOI: data.nearestPOI,
        regeocode: data.regeocode,
        position: data.position
      };
    },
    //发布
    release() {
      let that = this;
      if(this.inputVal.trim().length == 0){
        this.inputVal = "";
        Toast({
          message:"标题不能为空",
          position:"middle",
          duration:1500
        })
        return;
      }
     if(this.textareaVal.trim().length == 0){
        this.textareaVal = "";
        Toast({
          message:"内容不能为空",
          position:"middle",
          duration:1500
        })
        return;
      }

     let userid =JSON.parse( this.getStorge ).user_id;
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
           var imgStr = "";
            for (var i = 0; i < jsonV.length; i++) {
              var imgSplit = jsonV[i].split(",");
              imgStr += imgSplit + ",";
            }
          this.androidVid = imgStr.substring(0,imgStr.length-1);
        }else{
          this.androidVid = '';
        }
 
      let postData = {};
          postData["title"] = this.inputVal; //标题
          postData["content"] = this.textareaVal; //内容
          postData["userId"] = userid; //用户ID
          postData["pubStatus"] = "0"; //发布状态 暂时写死 0 实名  1 匿名
          postData["address"] = that.dragData.address; //地址
          postData["identity"] = "1"; //身份 //暂时写死 0 记者  1 匿名
          postData["countyId"] =that.dragData.regeocode.addressComponent.adcode + "000000";
          postData["latitude"] = that.dragData.position.lat;// 纬度
          postData["longitude"] = that.dragData.position.lng; // 经度
          postData["appInfoId"] =parseInt(this.apis.theme.api.appInfoId); // 经度
          postData["reportInfoImages"] = JSON.stringify(this.androidImg); //图片
          postData["reportInfoVideos"] =this.androidVid; //视频
      that.noLoading = true;
      console.log(JSON.stringify(postData));
      this.axios({
        method: "post",
        url: that.apis.theme.api.me.addReportMaterialInfo, //root+'/my_al/my/addReportMaterialInfo' that.apis.theme.api.me.addReportMaterialInfo
        data:postData
      }).then(res => {
        console.log( res.data )
        if (res.data.success) {
          that.noLoading = false;
          Toast("添加成功");
          that.apis.iback();
        } else {
          that.noLoading = false;
          Toast("添加失败");
        }
      });
    },
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
  },
  beforeMount() {
    let that = this;
    document.addEventListener(
      "plusready",
      function() {
        plus.geolocation.getCurrentPosition(function(p) {
          // alert('Geolocation\nLatitude:' + p.coords.latitude + '\nLongitude:' + p.coords.longitude + '\nAltitude:' + p.coords.altitude);
          that.latitude = p.coords.latitude;
          that.altitude = p.coords.altitude;
        });
      },
      false
    );
  }
};
</script>
<style lang='less' scoped>
#tipOffRelease {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #fff;
header{
    background: @headerBg;
    .nvbt:nth-child(1){
      background: @headerIback;
    }
    .nvbt{
      font-size: .36rem;
      font-weight: 500;
      color:@headerColor;
    }
}
  .tipOffRelease {
    padding: 0.1rem;
    > div:nth-child(1) {
      height: 1rem !important;
      display: flex;
      position: relative;
      border-bottom: 0.02rem solid #c1c1c1;
      input {
        width: 100%;
        height: 100%;
        font-size: 0.3rem;
        padding: 0.07rem;
      }
      .inputColor::-webkit-input-placeholder {
        color: #989898;
        font-size: 0.3rem;
      }
      span {
        position: absolute;
        right: 0;
        bottom: 3px;
        font-size: 0.3rem;
        color: #989898;
      }
    }
    > div:nth-child(2) {
      height: 3.5rem !important;
      display: flex;
      position: relative;
      textarea {
        width: 100% !important;
        border: none;
        margin-top: 0.2rem;
        outline: none;
        font-size: 0.3rem;
      }
      .textareaColor::-webkit-input-placeholder {
        color: #989898;
        font-size: 0.3rem;
      }
      span {
        position: absolute;
        right: 0.1rem;
        bottom: 3px;
        font-size: 0.3rem;
        color: #989898;
      }
    }
    > div:nth-child(4) {
      // height: 1rem !important;
      // display: flex;
      // border-bottom: 0.02rem solid #c1c1c1;
      // border-top: 0.02rem solid #c1c1c1;
      // font-size: 0.3rem;
      // // line-height: 1rem;
      // align-items: center;
      // justify-content: start;
      // padding-left: 0.3rem;
      // img {
      //   width: 0.3rem;
      //   height: 0.4rem;
      //   margin-right: 0.3rem;
      // }
    }
    // 图片
    .imageDiv {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      padding: 10px 0px;
      background: #fff;
      > div {
        width: 2rem;
        height: 2rem;
        margin-right: 10px;
        margin-bottom: 10px;
        position: relative;
        .delete {
          position: absolute;
          right: -0.2rem;
          top: -0.3rem;
          img {
            width: 0.5rem;
            height: 0.5rem;
          }
        }
        img {
          width: 100%;
          height: 100%;
        }
      }
      .addImg {
        background: #fff;
        text-align: center;
        font-size: 0.3rem;
        align-items: center;
        display: flex;
        justify-content: center;
        color: @dominantColor;
        border: 1px dashed #ccc;
      }
    }
  }
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
.vux-spinner {
  stroke: @dominantColor;
  fill: @dominantColor;
}
.newsaddress{
      height: 1rem !important;
      display: flex;
      border-bottom: 0.02rem solid #c1c1c1;
      border-top: 0.02rem solid #c1c1c1;
      font-size: 0.3rem;
      // line-height: 1rem;
      align-items: center;
      justify-content: start;
      padding-left: 0.3rem; clear: both;
}
.newsaddress img{   
        width: 0.3rem;
        height: 0.4rem;
        margin-right: 0.3rem;
      }
</style>

<style scoped lang='less'>
.imgBoxs{
  min-height: 2.4rem; margin: 0.3rem 0;
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
