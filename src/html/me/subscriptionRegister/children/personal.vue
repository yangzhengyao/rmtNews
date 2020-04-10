  <template>
  <div id="applicationLiving">
    <header class="com_header headerNavFixed">
      <div class="nvbt iback" @click="apis.iback()"></div>
      <div class="nvtt">申请入驻</div>
      <div class="nvbt idoc"></div>
    </header>
    <div class="container contentNavFixed com_contentNavFixed">
      <div class="content">
        <h3 class="main_top">基本信息</h3>
        <ul class="information basic">
          <!-- <li>
            <div>
              <span>选择东坡号图标</span>
            </div>
            <div>
              <span class="add-icon"></span>
            </div>
          </li> -->
          <!--needsclick 是用来给fastClick识别的，一旦去掉，则ios需要双击才能打开文件选择器-->
          <li class="userImg">
            <div>
              <span class="required">*</span>
              <span>选择订阅号图标</span>
            </div>
            <div class="icon_box needsclick"  @click="upload">
              <span v-if="!headUrl" class="add-icon icons"></span>
              <img v-else class="icons_img" :src="headUrl" alt="">
            </div>
            <!-- <div class="userInput">
              <div class="photo" >
                <img :src="headUrl" alt  class="avatar"  >
              </div>
            </div> -->
          </li>
          <upload-cropper :initparam="uploadParam" :success-callback="handleAvatarSuccess" ref="cropper">
          </upload-cropper>
          <li>
            <div>
              <span class="required">*</span>
              <span>订阅号名称</span>
            </div>
            <div>
              <input v-model="subName" type="text" placeholder="请填写订阅号名称" />
            </div>
          </li>
          <li>
            <div>
              <span class="required">*</span>
              <span>地理坐标</span>
            </div>
            <div>
              <!-- <span class="select"  @click="showPopup">选择省、市、区/县</span> -->
              <input v-model="aeras" class="aerasInp" type="text" placeholder="XX省XX市XX县XX乡镇" />
            </div>
          </li>
          <li>
            <div>
              <span class="required">*</span>
              <span>简介</span>
            </div>
            <div>
              <input v-model="intro" class="inp" type="text" placeholder="简单的介绍一下吧" />
            </div>
          </li>
        </ul>
        <h3>运营者信息</h3>
        <ul class="information">
          <li>
            <div>
              <span class="required">*</span>
              <span>联系人姓名</span>
            </div>
            <div>
              <input v-model="name" type="text" placeholder="请填写真实姓名" />
            </div>
          </li>
          <li>
            <div>
              <span class="required">*</span>
              <span>手机号码</span>
            </div>
            <div>
              <input type="text" v-model="phoneNum" placeholder="请填写手机号码" />
            </div>
          </li>
          <li>
            <div class="code">
              <span class="required">*</span>
              <span>
                联系人身份证
                <br />或者机构代码
              </span>
            </div>
            <div>
              <input v-model="idNum" type="text" placeholder="请填写证件号码" />
            </div>
          </li>
          <li>
            <div class="qualifications">
              <p>
                <span class="required">*</span>
                <span>资质证明</span>
              </p>
              <p class="tips">
                个人账号请上传身份证正面
                <br />非个人账号请上传执照照片
              </p>
            </div>
            <div class="needsclick" @click="idUpload">
              <span v-if="!idUrl" class="add-icon"></span>
              <img v-else class="id_img" :src="idUrl" alt="">
              <input class="file needsclick" ref="idFile" type="file" accept="image/*" @change="uploadChange">
            </div>
          </li>
          <li>
            <div>
              <!-- <span class="required">*</span> -->
              <span>备注</span>
            </div>
            <div>
              <input class="inp" v-model="remark" type="text" placeholder="请填写备注" />
            </div>
          </li>
        </ul>
        <div class="submit-btn" @click="submits">提交</div>
        
      </div>
    </div>
    
    
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import { Toast,Indicator } from "mint-ui";
import { PopupPicker,Group,Cell } from 'vux'
import UploadCropper from './UploadCropper'
export default {
  name: "personal",
  data() {
    return {
      subName:"",
      show:false,
      phoneNum:"",
      idNum:"",
      name:"",
      intro:"",
      remark:"",
      headUrl:"",
      idUrl:"",
      imgUrl:'',
      aeras:"",
      userDataid:'',
      uploadParam: {
        fileType: 'recruit', // 其他上传参数
        uploadURL: '', // 上传地址
        scale: 4, // 相对手机屏幕放大的倍数: 4倍
        uid: ''
      },
      submiting:true
 
    };
  },
  components: {
    PopupPicker,
    Group,
    Cell,
    UploadCropper
  },
  computed: {
    ...mapGetters("login", [
      "getStorge" // active的栏目
    ])
  },
  mounted() {
    this.getDataid();
  },
  methods: {
    showPopup() {
      this.show = true;
    },
    upload () {
      this.$refs['cropper'].upload()
    },
    uploadChange(e) {
      var self = this
      var fd = new FormData()
      let file = e.target.files[0];
      this.compress(file);
      

      // fd.append('file', file);
      // this.axios.post("http://hongqi.wengetech.com:9001/activities/fileUpload",fd)
      // .then(res => {
      //   if(res.data.success){
      //     this.idUrl = res.data.data[0];
      //     Toast('上传成功！')
      //   }else{
      //     Toast('上传失败，请重新上传！')
      //   }
        
      // })
    },
    compress(file) { 
      let that = this
      let fileObj = file //上传文件的对象
      let reader = new FileReader()
      reader.readAsDataURL(fileObj)
      reader.onload = function(e) {
          let image = new Image() //新建一个img标签（还没嵌入DOM节点)
          image.src = e.target.result
          image.onload = function() {
              let canvas = document.createElement('canvas'), 
              context = canvas.getContext('2d'),
              imageWidth = image.width / 2,    //压缩后图片的大小
              imageHeight = image.height / 2,
              data = ''

              canvas.width = imageWidth
              canvas.height = imageHeight

              context.drawImage(image, 0, 0, imageWidth, imageHeight)
              data = canvas.toDataURL('image/jpeg')

              //压缩完成 
              // document.getElementById('img').src = data
              that.idUrl = data;
              var byteString;
              if (data.split(',')[0].indexOf('base64') >= 0){
                byteString = atob(data.split(',')[1]);
              }else{
                byteString = unescape(data.split(',')[1]);
              }
              var mimeString = data.split(',')[0].split(':')[1].split(';')[0];
              var ia = new Uint8Array(byteString.length);
              for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
              }
              var blob = new Blob([ia], {type:mimeString});
              var canvass = document.createElement('canvas');
              var dataURL = canvass.toDataURL('image/jpeg', 0.5);
              var fd = new FormData(document.forms[0]);
              // fd.append("the_file", blob, 'image.png');
              fd.append('file', blob, 'image.png');
              that.axios.post("http://hongqi.wengetech.com:9001/activities/fileUpload",fd)
              .then(res => {
                if(res.data.success){
                  that.idUrl = res.data.data[0];
                  Toast('上传成功！')
                }else{
                  Toast('上传失败，请重新上传！')
                }
                
              })  

          }
      }
    },
    getDataid(){
        let userDataid = JSON.parse(localStorage.getItem("userData"));
        if( userDataid !== null){
            this.userDataid = userDataid.user_id;
        }else{
            this.userDataid = null;
        }
    },
    idUpload () {
      this.$refs['idFile'].click()
    },
    callback(img){
      this.headUrl=img
    },
    handleAvatarSuccess(res) {
      this.headUrl = res
      Toast('上传成功！');
    },
    addSubScription(data,url){
      this.axios({
        method:"post",
        url,
        data
      })
      .then(res => {
        if(res.data.success){
          Indicator.close();
          this.submiting = true;
          localStorage.removeItem('subscriptionRegisterResult');
          this.apis.urlParams("subscriptionRegisterResult");
          setTimeout(() => {
            let h1 = plus.webview.getWebviewById( window.location.href.split('#/')[0]+'#/'+'subscriptionRegisterPersonal' );
            let h2 = plus.webview.getWebviewById( window.location.href.split('#/')[0]+'#/'+'subscriptionRegister' );
            plus.webview.close( h1,"none" );
            plus.webview.close( h2,"none" );
          },1000);
          
        }else{
          Toast({
            message: "网络出错，请重试！",
            position: "middle",
            duration: 1000
          });
        }
      })
    },
    isNull( str ){
      // if ( str == "" ) return true;
      var regu = "^[ ]+$";
      var re = new RegExp(regu);
      console.log(re.test(str),"isNull")
      return re.test(str);
    },
    retsetNumer(){
      console.log(this.isNull(this.subName),"nmnmnm")
      if(this.isNull(this.subName)){
        console.log("diyi ")
        Toast({
          message: "订阅号名称不能为空",
          position: "middle",
          duration: 1000
        });
        return false
      }else if(this.isNull(this.aeras)){
        Toast({
          message: "地理坐标不能为空",
          position: "middle",
          duration: 1000
        });
        return false
      }else if(this.isNull(this.intro)){
        Toast({
          message: "简介不能为空",
          position: "middle",
          duration: 1000
        });
        return false
      }else if(this.isNull(this.name)){
        Toast({
          message: "姓名不能为空",
          position: "middle",
          duration: 1000
        });
        return false
      }else if(this.isNull(this.idNum)){
        Toast({
          message: "证件号不能为空",
          position: "middle",
          duration: 1000
        });
        return false
      }else{
        return true
      }
    },
    submits(){
      if(!this.submiting){
        return;
      }
      this.submiting = false;
      let that = this;
      
      if(this.intro && this.subName && this.phoneNum && this.idNum && this.name && this.idUrl && this.headUrl && this.aeras){
        let dataAdd;
        if(!this.retsetNumer()) {
          console.log(",.,.,")
          this.submiting = true;
          return;
        }
        if(!(/^1[3456789]\d{9}$/.test(this.phoneNum))){
          Toast({
            message: "请输入正确的手机号码",
            position: "middle",
            duration: 1000
          });
          this.submiting = true;
          return; 
        }
        Indicator.open({
          text: '正在提交中...',
          spinnerType: 'fading-circle'
        });
        let local = JSON.parse(localStorage.getItem('subscriptionRegisterPersonal'));
        let result = localStorage.getItem('subscriptionRegisterResult');
        let type = local.type;
        let kind = local.kind;
        let url;
        dataAdd = {
          "enterTypeId":type,
          "appInfoId":this.apis.theme.api.appInfoId,
          "subscribeName":this.subName,
          "subscribeImage":this.headUrl,
          "province":this.aeras,
          "city":'',
          "county":'',
          "description":this.intro,
          "enterType":kind,
          "contactName":this.name,
          "phone":this.phoneNum,
          "email":'',
          "certificationImages":this.idUrl,
          "remark":this.remark,
          "certificationCode":this.idNum,
          "userId":this.userDataid
        }
        if(result && JSON.parse(result).reason){
          url = that.apis.theme.api.subscription.updateSubscribeNum;
          dataAdd.checkType = 0;
          dataAdd.id = JSON.parse(result).id;
          this.addSubScription(dataAdd,url);
        }else{
          url = that.apis.theme.api.subscription.addSubscribeNum;
          this.addSubScription(dataAdd,url);
        }

      }else{
        this.submiting = true;
        Toast({
          message: "请填写带*字的必填项",
          position: "middle",
          duration: 1000
        });
      }
    }
  }
};
</script>
<style lang='less' scoped>
/deep/ .vux-no-group-title{
   margin-top:0;
}
/deep/ .weui-cells{
  margin-top:0;
}
/deep/ .weui-cell{
    padding-left: 0;
    padding-right: 0;
    padding: 0.28rem 0 0.28rem 0;
    width: 6.9rem;
}
/deep/ .vux-cell-primary{
  width: 3.3rem;
  font-size: 0.3rem;
  padding:0.1rem 0 0.1rem 0;
}
.icon_box{
  width: 4.6rem;
  .icons{
    width: 0.64rem;
    height: 0.64rem;
    margin-left: 3.97rem;
  }
  .icons_img{
    width: 1rem;
    height: 1rem;
    margin-left: 3.55rem;
  }
}
.id_img{
  width: 1.24rem;
  height: 1.24rem;
}
.file{
  display: none;
}
.inp{
  width: 6rem;
}
.aerasInp{
  width: 5.5rem;
}
header {
  background: @headerBg;
  .nvbt:nth-child(1) {
    background: @headerIback;
  }
  .nvtt {
    font-size: 0.36rem;
    font-weight: 500;
    color: @headerColor;
  }
}
#applicationLiving {
  .container {
    top: calc(constant(safe-area-inset-top) + 0.1rem); // 标准
    top: calc(env(safe-area-inset-top) + 0.1rem); // 兼容 ios11
    // top: 0.2rem; // 兼容非刘海屏
    background: #fff !important;
    font-size: 0.3rem;
    // padding-top: 1rem;
    // border-top: 3rem solid pink;
    h3 {
      height: 0.58rem;
      line-height: 0.58rem;
      background: rgba(245, 245, 245, 1);
      color: rgba(128, 128, 128, 1);
      font-size: 0.26rem;
      font-weight: 400;
      padding-left: 0.3rem;
    }
    .information {
      padding: 0 0.3rem;
      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: rgba(26, 26, 26, 1);
        font-size: 0.3rem;
        line-height: 1.1rem;
        border-bottom: 1px solid rgba(220, 220, 220, 1);
        & > div {
          display: flex;
        }
        .qualifications {
          display: block;
          p:first-child {
            display: flex;
          }
        }
      }
      .required {
        color: rgba(224, 23, 10, 1);
        font-size: 0.32rem;
      }
      input {
        line-height: 0.8rem;
        text-align: right;
        font-size: 0.3rem;
      }
      .select {
        color: rgba(153, 153, 153, 1);
      }
      .code {
        line-height: 0.34rem;
        padding: 0.4rem 0;
      }
      .tips {
        color: rgba(153, 153, 153, 1);
        font-size: 0.24rem;
        line-height: 0.3rem;
        margin: -0.3rem 0 0.38rem 0.12rem;
      }
      .add-icon {
        display: block;
        width: 0.64rem;
        height: 0.64rem;
        background-image: url(../img/add.png);
        background-size: 100% 100%;
      }
    }
    .basic li:last-child {
      border-bottom: none;
    }
    .submit-btn {
      margin: 1rem 0.3rem;
      color: #fff;
      text-align: center;
      padding: 0.2rem 0;
      background: rgba(227, 37, 25, 1);
      border-radius: 0.4rem;
      font-size: 0.34rem;
      letter-spacing: 0.1rem;
    }
  }
  input::-webkit-input-placeholder {
    color: rgba(153, 153, 153, 1);
    font-size: 0.3rem;
    text-align: right;
  }
}
</style>
