<template>
  <transition name="fadeIn">
    <div id="questions">
      <!-- 头部 -->
      <header class="com_header headerNavFixed">
        <div class="nvbt iback" @click="apis.iback()" :class=" apis.getTheme() == 'dongpo'?'iBlackBack':'iback'"></div>
        <div class="nvtt">提问</div>
        <div class="nvbt idoc"></div>
      </header>
      <!-- 正文 -->
      <div class="content contentNavFixed com_contentNavFixed">
        <div class="container" style="background: #f7f7f7;">
          <div class="questions">
            <div class="title">
              <span>标题</span>
              <span class="line">|</span>
              <input type="text" id value placeholder="请输入要提问的标题" v-model="questionTitle">
            </div>
            <div class="title">
              <span>姓名</span>
              <span class="line">|</span>
              <input type="text" id value placeholder="请输入名称" v-model="real_name">
            </div>
            <div class="title">
              <span>手机号</span>
              <span class="line">|</span>
              <input type="text" id value placeholder="请输入手机号" v-model="mobile">
            </div>
            <div class="classification title" @click="getQuestionArea">
              <span style="width:1rem">地区</span>
              <span class="line">|</span>
              <span style="font-size: .3rem;margin-left: .3rem;">{{ QuestionAreaVal }}</span>
            </div>
            <!-- <div class="questionObj title">
              <span>对象</span>
              <span class="line">|</span>
              <input
                type="text"
                id
                v-model=" getWzQuestionVal.name "
                placeholder="请选择您要提问的对象"
                onfocus="this.blur()"
                @click="getQuestion"
                :class="{ dafultInput:getWzQuestionVal.name == '请选择您要提问的对象' }"
              >
            </div> -->
           <div class="" style="box-shadow: 0px 0px 4px 0px #d3cfcf;margin-bottom: 0.3rem;" >
            <group  label-width="1.1rem">
                <popup-picker :title="title1" :data="getWzQuestion" v-model="value1"  @on-change="onChange" ></popup-picker>
           </group>
          </div>
           <div class="" style="box-shadow: 0px 0px 4px 0px #d3cfcf;margin-bottom: 0.3rem;" >
            <group  label-width="1.1rem">
                <popup-picker :title="title2" :data="getWzQuestionNatures" v-model="value2"  @on-change="onChangefenlei" ></popup-picker>
           </group>
          </div>
            <!-- <div class="classification title">
              <span>分类</span>
              <span class="line">|</span>
              <input
                type="text"
                id
                value
                placeholder="请选择问题的分类"
                v-model=" getWzQuestionNatureVal.name "
                onfocus="this.blur()"
                @click="getQuestionNature"
                :class="{ dafultInput:getWzQuestionNatureVal.name == '请选择问题的分类' }"
              >
            </div> -->
            <div class="classification title">
              <span>性质</span>
              <span class="line">|</span>
              <input
                type="text"
                id
                value
                placeholder="请选择问题的性质"
                v-model=" getWzQuestionTypesVal.name "
                onfocus="this.blur()"
                @click="getQuestionType"
                :class="{ dafultInput:getWzQuestionTypesVal.name == '请选择问题的性质' }"
              >
            </div>
            <div class="contents title">
              <span>内容</span>
              <span class="line">|</span>
              <textarea
                name
                rows
                cols
                v-model="textareaVal"
                placeholder="请输入要提问的内容"
                @click="textareaFn"
                contenteditable="true"
                style="-webkit-user-select: auto;"
              ></textarea>
              <!--<input type="text" name="" id="" value="" placeholder="请选择问题的分类"/>-->
            </div>
            <!-- <div class=""  v-if="testJson.length > 0" v-for="(item,index) in testJson" :key="index">
              <img :src="item" alt>
            </div>-->
            <!-- <div class="imgAll" style="display: flex;width: 100%;flex-wrap: wrap;">
            
            <div class="imgAll" style="display: flex;width: 100%;flex-wrap: wrap;margin-top:0.3rem">
              <div
                class="addImg"
                :style="{'background-image':'url('+item+')'}"
                v-if="testJson.length > 0"
                v-for="(item,index) in testJson"
                :key="index"
                @click="addImage"
              ></div>
              <div class="uploadImg" @click="addImage" v-if="testJson.length < 1">
                <img src="./images/addImg.png" alt>
              </div>
            </div> -->
        <div  v-if="apis.getTheme()=='tiemenguan'" class="listshow">
              <mapDrag @drag="dragMap" :lat="latitude" :lng="longitude" class="mapbox"></mapDrag>
        </div>
         <div class="divimg" v-if="apis.getTheme()=='tiemenguan'">
            <img src="./images/position.png" alt>
           {{ dragData.address }}
          </div>
        <div class="imgBoxs">
            <div class="imgBoxsChi">
              <div class="imgTool" v-for="(item,index) in imgBox" :key="index" @click.stop="bigImg(index)">
                <div class="delVid" @click.stop="deletePic(index)">
                  <img src="~@/assets/img/del.png" alt="">
                </div>
                <img :src="item">
              </div>
              <!-- <div class="imgTool" alt="" v-for="(item,index) in imgBox" :key="index" @click.stop="tilt(index)">
                <div v-if="index == tilts"><i class="el-icon-delete" @click="deletePic(index)"></i></div>
                <img :src="item">
              </div> -->

              <div  class="vidBoxsChi" v-if="vidBox.length">
                <!-- <img src="./images/huati.png"> -->
                <div class="videoBack" v-for="(item,index) in vidBox" :key="index" :style="{'background-image':'url('+item[1]+')'}">
                  <div class="delVid" @click="deleteVid(index)">
                    <img src="~@/assets/img/del.png" alt="">
                  </div>
                  <div class="playRound"  @click.stop="jumpPlayer(item[0])"></div>
                </div>
                
              </div>
              <div @click="addImages" class="addImage" v-if="imgBox.length <= 8 && vidBox.length <= 0">
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

            <div class="selectPair">
              <img :src="NopPairImgUrl" alt @click="selectPair(pairImg)">
              <span>匿名</span>
            </div>
          </div>
          <!-- <question-area
              :getQuestionAreaBool="getQuestionAreaBool"
              @getQuestionAreaFn="getQuestionAreaFn"
              ref="questionAreaDom"
          ></question-area> -->
        </div>
        <div class="navbar" :class="iphonexPadding ? 'iphonexPaddingClass':'' " @click="questionCommit" v-if="commitLoding">
          <span>提交</span>
        </div>
        <div class="navbar" v-else :class="iphonexPadding ? 'iphonexPaddingClass':'' ">
          <span>提交</span>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import qs from "qs";
import { PopupPicker, Group, Picker, XButton, Divider, XSwitch } from 'vux';
import { mapGetters, mapMutations, mapActions } from "vuex";
import axios from "axios";
import { Cell, Toast,Indicator } from "mint-ui";
// import questionArea from "../../../components/Area";
import mapDrag from "../../../components/mapDrag";
const root = process.env.API_ROOT;
export default {
  name: "questions",
  data() {
    return {
      title: "我要提问",
      questionTitle: "",
      NopPairImgUrl: require("./images/noPairImg.png"),
      pairImg: 2,
      textareaVal: "",
      testJson: [], //存放的图片
      getWzQuestion: [], //对象数据,
      getWzQuestionVal: { autoId: "0", name: "请选择您要提问的对象" }, //用户选择之后的存储
      getWzQuestionTypes: [], //性质数据,
      getWzQuestionTypesVal: { autoId: "0", name: "请选择问题的性质" }, //用户选择之后的存储,
      getWzQuestionNatures: [], //分类数据,
      getWzQuestionNatureVal: { autoId: "0", name: "请选择问题的分类" }, //用户选择之后的存储,
      getQuestionAreaBool: false, //地区三级联动,
      getQuestionAreaArr:[],
      QuestionAreaVal: this.apis.theme.api.questionName,
      //新疆维吾尔自治区 自治区直辖县级行政区划 铁门关市
      //福建省 厦门市 海沧区
      //四川省 眉山市 东坡区
      //四川省 乐山市 市辖区
      //福建省 厦门市 海沧区
      real_name:'',
      mobile:'',
      QuestionAreaArr: this.apis.theme.api.questionId,
      //铁门关 ['650000000000','659000000000','659006000000']
      //东坡区 ['510000000000','511400000000','511402000000']
      //乐山区 ['510000000000','511100000000','511101000000']
      //海沧区 ['350000000000','350200000000','350205000000']
      commitLoding:true,
      iphonexPadding:false,
      title1: '对象',
      value1: ['请选择你要提问的对象'],
      title2: '分类',
      value2: ['请选择问题的分类'],
      auto_ids:{},
      newsautoId:'',
      auto_idsfenlei:{},
      auto_fenleiID:'',
      isIOS:false,
      trues:true,
      imgBox:[],
      imgData:[],
      getData:localStorage.getItem('wz_imgData'),
      androidImg:[],
      dialogImageUrl: '',
      fileImgList:[],
      fileVioList:[],
      num:0,
      auto_fenleiID:'',
     dragData: {
        lng: null,
        lat: null,
        address:null,
        position: null
      },
      // latitude: JSON.parse(  localStorage.getItem( 'latAndLong' ) ).latitude,
      // longitude: JSON.parse(  localStorage.getItem( 'latAndLong' ) ).longitude,
       latitude:'39.98554',
     longitude:'116.328031',
      vidBox:[],
      getVidData:localStorage.getItem('wz_vidData'),
      androidVid:[],
      kind:[
        { title: '拍照或录像' },
        { title: '选择照片' },
        { title: '选择视频' }],
      coverBox:[]
    };
  },
  computed: {
    ...mapGetters("login", [
      "getStorge" // active的栏目
    ])
  },
  components: {
    // questionArea,
    PopupPicker,
      Group,
      Picker,
      XButton,
      Divider,
      Cell,
      XSwitch,
      mapDrag
  },
  methods: {
      //地图拖拽
    dragMap(data) {
      console.log(data);
      this.dragData = {
        lng: data.position.lng,
        lat: data.position.lat,
        address: data.address,
        position: data.position
      };
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
    onChange (val) {
      var that=this;
      that.newsautoId=that.auto_ids[val]
    },
    onChangefenlei(val){
        var that=this;
        that.auto_fenleiID=that.auto_idsfenlei[val]
    },
    //地区组件
    getQuestionArea() {
      this.getQuestionAreaBool = false;
    },
    //地区选中回调
    getQuestionAreaFn(obj) {
      this.getQuestionAreaBool = obj.areaBool;
      this.getQuestionAreaArr = obj.areaObj;
      if( obj.areaObj.length == 0 ){
        this.QuestionAreaVal = "新疆维吾尔自治区 自治区直辖县级行政区划 铁门关市";
      } else {
        this.QuestionAreaVal = '';
        for (let i = 0; i < obj.areaObj.length; i++) {
          this.QuestionAreaVal += obj.areaObj[i].name + "   ";
        }
      }
      if( obj.areaObj.length > 2 ){
         this.getWzQuestionList(obj.areaObj[2].code);
      }
      // this.getWzQuestionList()
    },
    selectPair(index) {
      if (index == 2) {
        this.NopPairImgUrl = require("./images/pairImg.png");
        this.pairImg = 1;
      } else {
        this.NopPairImgUrl = require("./images/noPairImg.png");
        this.pairImg = 2;
      }
    },
    textareaFn() {
      this.textareaVal = this.textareaVal;
    },
    getQuestion() {
      let that = this;
      plus.nativeUI.actionSheet(
        {
          title: "请选择对象",
          cancel: "取消",
          buttons: that.getWzQuestion
        },
        function(e) {
          for (let i = 0; i < that.getWzQuestion.length; i++) {
            if (e.index - 1 == i) {
              that.getWzQuestionVal["autoId"] = that.getWzQuestion[i].autoId;
              that.getWzQuestionVal["name"] = that.getWzQuestion[i].title;
            }
          }
        }
      );
    },
    getQuestionType() {
      let that = this;
      plus.nativeUI.actionSheet(
        {
          title: "请选择性质",
          cancel: "取消",
          buttons: that.getWzQuestionTypes
        },
        function(e) {
          for (let i = 0; i < that.getWzQuestionTypes.length; i++) {
            if (e.index - 1 == i) {
              that.getWzQuestionTypesVal["autoId"] =
                that.getWzQuestionTypes[i].autoId;
              that.getWzQuestionTypesVal["name"] =
                that.getWzQuestionTypes[i].title;
            }
          }
        }
      );
    },
    getQuestionNature() {
      let that = this;
      plus.nativeUI.actionSheet(
        {
          title: "请选择分类",
          cancel: "取消",
          buttons: that.getWzQuestionNatures
        },
        function(e) {
          for (let i = 0; i < that.getWzQuestionNatures.length; i++) {
            if (e.index - 1 == i) {
              that.getWzQuestionNatureVal["autoId"] =
                that.getWzQuestionNatures[i].autoId;
              that.getWzQuestionNatureVal["name"] =
                that.getWzQuestionNatures[i].title;
            }
          }
        }
      );
    },
    //获取提问对象列表
    getWzQuestionList( county_id ) {
      let countyObj = {  };
      if( county_id ){
          countyObj['county_id'] = county_id+'000000';
      } else {
          // 盘龙区 530103000000
          // 铁门关市 659006000000
          // 东坡区 659006000000
          // 乐山市 659006000000
          countyObj['county_id'] = this.apis.theme.api.questionId[2];
      }
      axios({
        method: "post",
        url: this.apis.theme.api.services.getWzQuestionObjects, //this.apis.theme.api.services.getWzQuestionObjects  root+'/wz_al/wz/getWzQuestionObjects'
        data: qs.stringify(countyObj)
      }).then(res => {
        if (res.data.status == 1) {
          var getWzQuestions = [];
          for (let i = 0; i < res.data.data.length; i++) {
            getWzQuestions.push(res.data.data[i].name)
            this.auto_ids[res.data.data[i].name] = res.data.data[i].auto_id;
            // auto_ids.push(res.data.data[i].auto_id)
          }
          // console.log(auto_ids,"auto_idsauto_ids")
          this.getWzQuestion=[getWzQuestions];
          
          // console.log(this.getWzQuestion,"this.getWzQuestionthis.getWzQuestion")
          // if( this.getWzQuestion.length == 0 ){
          //   this.getWzQuestionVal = { autoId: "0", name: "请选择您要提问的对象" }
          // } 
          // console.log( this.getWzQuestion)
        }
      });
    },
    //获取性质列表
    getWzQuestionType() {
      axios({
        method: "post",
        url: this.apis.theme.api.services.getWzQuestionTypes //this.apis.theme.api.services.getWzQuestionTypes  root+'/wz_al/wz/getWzQuestionTypes'
      }).then(res => {
        if (res.data.status == 1) {
          for (let i = 0; i < res.data.data.length; i++) {
            this.getWzQuestionTypes.push({
              autoId: res.data.data[i].auto_id,
              title: res.data.data[i].name
            });
          }
        }
      });
    },
    //获取分类列表
    getWzQuestionNature() {
      axios({
        method: "post",
        url: this.apis.theme.api.services.getWzQuestionCategory //this.apis.theme.api.services.getWzQuestionCategory  root+'/wz_al/wz/getWzQuestionCategory'
      }).then(res => {
        if (res.data.status == 1) {
          var getWzQuestionNatures = [];
          console.log( res.data)
          for (let i = 0; i < res.data.data.length; i++) {
            getWzQuestionNatures.push(res.data.data[i].name)
            this.auto_idsfenlei[res.data.data[i].name] = res.data.data[i].auto_id;
            // this.getWzQuestionNatures.push({
            //   autoId: res.data.data[i].auto_id,
            //   title: res.data.data[i].name
            // });
          }
          this.getWzQuestionNatures=[getWzQuestionNatures];
        }
      });
    },
    deleteVid(index){ //删除视频
      this.getVidData = localStorage.getItem('wz_vidData');
      let data = JSON.parse(this.getVidData);
      data.splice(index,2);
      this.vidBox.splice(index,1);
      if(data.length <= 0){
        localStorage.removeItem('wz_vidData');
      }else{
        localStorage.setItem('wz_vidData',JSON.stringify(data));
      }
    },
    //添加图片
    addImage() {
      // 从相册中选择图片
      let lfs = null;
      let that = this;
      plus.gallery.pick(
        function(e) {
          // for (var i in e.files) {
          //   that.showImg(e.files[i]);
          // }
          that.showImg(e.files.pop());
          that.testJson = [];
        },
        function(e) {},
        {
          filter: "image",
          multiple: true,
          maximum: 1,
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
              var src1 = entry.toLocalURL();
              that.test(src1);
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
          width: "35%",
          height: "35%",
          format: "png",
          quality: 50
        },
        function(e) {
          var reader = new plus.io.FileReader();
          var imageArr = [];
          reader.onloadend = function(e) {
            var speech = e.target.result; //base64图片
            that.testJson.push(e.target.result);
          };
          //兼容ios未转换base64
          reader.readAsDataURL(e.target.replace("file://", ""));
        },
        function(err) {
          plus.nativeUI.alert("未知错误！", function() {});
        }
      );
    },
    questionCommit() {
      var imgStr = "";
      let that = this;            //安卓入参
      let getPic = localStorage.getItem('wz_imgData');
      let getVid = localStorage.getItem('wz_vidData');
      let vid,vidImg = "";
      if(getPic){
        let jsonP = JSON.parse(getPic);
        jsonP.forEach((v,i) => {
          let image = {images:v};
          this.androidImg.push(image);
        });
      }
      this.fileImgList.forEach((v,i) => {
        imgStr += v.images + ",";
      })
      if(getVid){
        let jsonV = JSON.parse(getVid);
        vid = jsonV[0];
        vidImg = jsonV[1];
      }

      let params = {
        // latitude:this.dragData.position.lat,
        // longitude:this.dragData.position.lng,
        title: this.questionTitle, //标题
        real_name:this.real_name,// 姓名
        mobile:this.mobile,// 手机号
        question_obj: this.newsautoId, //问题对象
        question_type: this.getWzQuestionTypesVal.autoId, //问题性质 
        question_category:this.auto_fenleiID, //问题分类 
        content: this.textareaVal, //内容
        images: imgStr.substring(0,imgStr.length-1), //图片
        is_anonymous: this.pairImg, //是否匿名
        videos:vid,
        videos_image:vidImg
      };
      if( this.getQuestionAreaArr.length != 0 ){
         params['province_id'] = this.getQuestionAreaArr[0].code+'000000';
         params['city_id'] = this.getQuestionAreaArr[1].code+'000000';
         params['county_id'] = this.getQuestionAreaArr[2].code+'000000';
      } else {
         params['province_id'] = this.QuestionAreaArr[0];
         params['city_id'] = this.QuestionAreaArr[1];
         params['county_id'] = this.QuestionAreaArr[2];
      }
     if(this.apis.getTheme()=="tiemenguan"){
       params['latitude']=this.dragData.position.lat;
       params['longitude']=this.dragData.position.lng;
       params["address"] = this.dragData.address;
     }
      // let params = {
      //   "title": "标题",
      //   "real_name": "姓名",
      //   "mobile": "15138915457",
      //   "question_obj": 3,
      //   "question_type": 3,
      //   "question_category": 6,
      //   "content": "内容",
      //   "is_anonymous": 1,
      //   "province_id": "530000000000",
      //   "city_id": "530100000000",
      //   "county_id": "530103000000"
      // }
      console.log( JSON.stringify(params))
      if (params.title == "") {
        Toast('请填写标题');
        return;
      } else if (params.real_name == "") {
        Toast('请填写姓名');
        return;
      } else if (params.mobile == "") {
        Toast('请填写手机号');
        return;
      }
       else if (params.question_obj == "") {
        Toast("请选择提问对象");
        return;
      } else if (params.question_category == "") {
        Toast("请选择提问分类");
        return;
      } else if (params.question_type == "0") {
        Toast("请选择提问性质");
        return;
      } else if (params.content == "请输入要提问的内容") {
        Toast("请输入要提问的内容");
        return;
      }
      Indicator.open({
        text: '正在提交中...',
        spinnerType: 'fading-circle'
      });
      that.commitLoding = false;
      if (JSON.parse(this.getStorge).user_id) {
        this.axios({
          method: "post",
          url:  this.apis.theme.api.services.addWzServiceQuestion, // "" + root + "/wz_al/wz/addWzServiceQuestion"  this.apis.theme.api.services.addWzServiceQuestion
          data: qs.stringify(params)
        }).then(res => {
          if (res.data.status == 1) {
            Indicator.close();
            Toast({
              message: "提问成功",
              position: "middle",
              duration: 1400
            });
            setTimeout(() => {
              localStorage.removeItem('wz_imgData');
              localStorage.removeItem('wz_vidData');
              that.apis.iback();
            }, 1600);
          }
        });
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
    deletePic(index){
      this.getData = localStorage.getItem('wz_imgData');
      let data = JSON.parse(this.getData);
      data.splice(index,1);
      if(data.length <= 0){
        localStorage.removeItem('wz_imgData');
      }else{
        localStorage.setItem('wz_imgData',JSON.stringify(data));
      }
      this.imgBox.splice(index,1);
    },
    statusSet(){
      // if(!this.isIOS){
      //   this.timer = setInterval(()=>{
      //     this.getData = localStorage.getItem('wz_imgData');
      //     let datas = JSON.parse(this.getData)
      //     if(datas){
      //       this.imgBox = datas;
      //     }
      //   },1000);
      // }
      this.timer = setInterval(()=>{
        this.vidBox = [];
        this.getData = localStorage.getItem('wz_imgData');
        this.getVidData = localStorage.getItem('wz_vidData');
        if(this.getData){
          this.imgBox = JSON.parse(this.getData);
        }
        if(this.getVidData){
          let datas = JSON.parse(this.getVidData);
          this.vidBox.push(datas);
          this.androidVid = datas;
        }
      },1000);
    },
    addImages() {
      var that = this;
      var data = localStorage.getItem('wz_imgData');
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
                mHelper.jump2(main,picNum,1,0,15,0);
                break;
              case 2:
                mHelper.jump2(main,picNum,1,1,0,0);
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
                mHelper.jump2(main,picNum,1,2,0,60);
                break;
            }
          }else{
            var dataIOS;
            switch (e.index) {
              case 1:
                dataIOS = {
                  numder:picNum,
                  type:1,
                  selectType:0,
                  recordVideoTime:15,
                  localVideoTime:0
                }
                notiClass.defaultCenter().postNotificationNameobject("JS2NativeUploadImageOrVideo",JSON.stringify(dataIOS));
                break;
              case 2:
                dataIOS = {
                  numder:picNum,
                  type:1,
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
                  type:1,
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
    httpRequ(params){    //element 上传图片方法
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
  },
  mounted() {
    $(".weui-cell__ft").removeAttr("class")
    this.getWzQuestionList();
    this.getWzQuestionType();
    this.getWzQuestionNature();
    if( this.apis.iphonexPaddingFn() ){
      this.iphonexPadding = true;
    }
    this.AndroisIos();
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
<style lang="less" scoped>
.listshow{box-shadow: 0px 0px 4px 0px #d3cfcf; margin-bottom: 0.4rem}
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
#questions {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 2;
  background: #fff;
  .questions {
    padding: 0.495rem 0.345rem;
    background: #f7f7f7;
    overflow: hidden;
    .title {
      display: flex;
      align-items: center;
      width: 100%;
      background: #fff;
      padding: 0.2497rem 0;
      box-shadow: 0px 0px 4px 0px #d3cfcf;
      margin-bottom: 0.3rem;
      > span:nth-child(1) {
        margin: 0px 0.3rem;
        text-align: center;
        font-size: 0.33rem;
        color: #262626;
      }
      input {
        margin-left: 0.3rem;
        font-size: 0.3rem;
        color: #262626;
      }
      .dafultInput {
        color: #999999;
      }
      input::-webkit-input-placeholder {
        // font-size: 0.3375rem;
        color: #999999;
      }
      .line {
        color: #e3e3e3;
        font-size: 0.32rem;
      }
    }
    .contents {
      align-items: flex-start;
      > textarea {
        width: 80%;
        color: #999999;
        height: 2.625rem;
        font-size: 0.3rem;
        padding-left: 0.3rem;
        outline: none;
        border: none;
      }
    }
    .imgAll {
      .uploadImg,
      .addImg {
        width: 2rem;
        height: 2rem;
        background: #ffffff;
        border-radius: 0.225rem;
        padding: 0.75rem;
        margin-bottom: 0.2625rem;
        margin-right: 0.4rem;
        box-shadow: 0px 0px 4px 1px #d3cfcf;
        > img {
          width: 100%;
        }
      }
      .addImg:nth-of-type(3n) {
        margin-right: 0;
      }
      .addImg {
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
      }
    }

    .selectPair {
      display: flex;
      align-items: center;
      margin-top: 0.3rem;
      margin-bottom: 1rem;
      clear: both;
      > img {
        width: 0.3375rem;
        height: 0.3375rem;
        margin-right: 0.1125rem;
      }
      > span {
        font-size: 0.3375rem;
      }
    }
  }
  .navbar {
    position: fixed;
    bottom: 0;
    left: 0;
    background: @dominantColor;
    height: 1rem;
    width: 100%;
    text-align: center;
    font-size: 0.333rem;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 11111;
    > img {
      width: 0.333rem;
      height: 0.333rem;
      margin-right: 0.24rem;
    }
  }
}
.imgBoxs{
  min-height: 2.1rem;
  .imgBoxsChi{
    min-width: 2rem;
    .imgTool{
      position: relative;
      width: 2rem;
      height: 2rem;
      // border-radius: 0.225rem;
      border-radius: 6px;
      box-shadow: 0px 0px 4px 1px #d3cfcf;
      border: none;
      float: left;
      margin: 0 0.12rem 0.32rem 0.12rem;
      div{
        background: #000;
        opacity: .5;
        position: absolute;
        width: 2rem;
        height: 2rem;
        box-shadow: 0px 0px 4px 1px #d3cfcf;
        border: none;
        border-radius: 6px;
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
        right: -0.15rem;
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
      background: #ffffff;
      box-shadow: 0px 0px 4px 1px #d3cfcf;
      border: none;
      border-radius: 6px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      width: 2rem;
      height: 2rem;
      line-height: 146px;
      vertical-align: top;
      position: relative;
      margin: 0 0.12rem 0.32rem 0.12rem;
      // margin-left:0.1rem;
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
    margin-left: 0.12rem;
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
      margin-left: -0.26rem;
      margin-top: -0.4rem;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.4) url("../../../assets/img/play_san.png")
      no-repeat center / 40%;
      z-index: 1;
  }
  .delVid{
    background: #fff;
    position: absolute;
    right: -0.35rem;
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
/deep/.el-upload-list__item{
  width: 2rem;
  height: 2rem;
  box-shadow: 0px 0px 4px 1px #d3cfcf;
  border: none;
  margin-left:0.1rem;
  
}
/deep/.el-upload--picture-card{
  width: 2rem;
  height: 2rem;
  background: #ffffff;
  box-shadow: 0px 0px 4px 1px #d3cfcf;
  border: none;
  margin-left:0.1rem;
  position: relative;
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
  margin-left: 0.03rem;
  margin-top: 0.3rem;
  clear: both;
}
</style>
<style lang="less">
  .circle-color-20 > div::before{
    background: @dominantColor !important;
  }
  .mint-popup-bottom{
    z-index: 111111111111111111 !important;
  }
.vux-popup-dialog{ z-index: 9999!important;} 
 /* .vux-popup-mask{ z-index: 1001!important;}  */
.vux-popup-picker-select{ text-align: left !important; margin-left: 0.2rem}
.vux-popup-picker-value{font-size:0.3rem;}
.weui-cell_access .weui-cell__ft:after{border-style:dashed!important;}
.weui-label{border-right:2px solid #e3e3e3;height: 0.4rem }
.divimg{ display: -webkit-box; display: -ms-flexbox;display: flex; -webkit-box-align: center; -ms-flex-align: center;align-items: center;margin-top: 0.3rem;font-size:0.32rem; margin: 0.4rem 0}
.divimg img{width: 0.27rem;height: 0.35rem;margin-right: 0.1125rem;}
</style>

