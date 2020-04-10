
  <template>
  <div id="user">
    <div class="container" style="overflow:auto" :class="isIos?'iosContainer':'androidContainer'">
      <!-- 登录状态 -->
      <div class="loginState">
          <div class="wrapper">
            <!-- 未登录状态 -->
            <!-- <img class="userProfile"  @click="wrapper" src="./img/head_03.png" v-if=" getStorge == null "> -->
            <!-- 手机登录状态 -->
            <!-- <img
            class="userProfile" :src='"~@/assets/img/"+apis.getTheme()+"/me/dafultImg.png"'
            v-else-if="JSON.parse( getStorge ).imgurl == null"
            @click="userMsg"
            > -->
            <!-- 第三方登录 -->
            <!-- <img
              class="userProfile"
              :src="apis.theme.imgHost+JSON.parse( getStorge ).imgurl"
              v-else
              @click="userMsg"
            > -->
            <!-- <span class="userName" @click="wrapper" v-if=" getStorge == null ">登录</span>
            <span class="userName" v-else>{{ JSON.parse( getStorge ).person_name }}</span> -->
            <!-- 未登录状态 -->
            <div class="item1" v-if=" getStorge == null ">
               <img src="./img/head.png" alt="">
               <div :class=" getStorge ? '':'loginClass' ">
                   <span @click="apis.urlParams('Login')">登录/</span>
                   <span @click="apis.urlParams('register')">注册</span>
               </div>
            </div>
            <!-- 手机号登录状态 -->
            <div class="item1"  v-else-if="JSON.parse( getStorge ).imgurl == '' || JSON.parse( getStorge ).imgurl == null">
               <img src="./img/head.png" alt="" @click="userMsg">
               <div>
                   <span @click="userMsg">{{ JSON.parse( getStorge ).person_name }}</span>
                   <span @click="skipDer">{{ userObj.signature }}</span>
                   <img  @click="skipDer" src="./img/edi.png" alt="">
               </div>
            </div>
            <div class="item1"  v-else>
               <img :src="apis.theme.imgHost+JSON.parse( getStorge ).imgurl" alt="" @click="userMsg">
               <div>
                   <span @click="userMsg">{{ JSON.parse( getStorge ).person_name }}</span>
                   <span @click="skipDer">{{ userObj.signature }}</span>
                   <img  @click="skipDer" src="./img/edi.png" alt="">
               </div>
            </div>
            <div class="item2" v-if=" getStorge != null ">
               <div @click="follow">
                 <span>{{ userObj.followNum }}</span>
                 <span>关注</span>
               </div>
               <div @click="fans">
                 <span>{{ userObj.fansNum }}</span>
                 <span>粉丝</span>
               </div>
               <div @click="detailsPageCircle"> 
                 <span>{{ userObj.bolbNum }}</span>
                 <span>动态</span>
               </div>
               <div @click="detailsPageTopic" v-if="apis.getTheme() !='dongpo'">
                 <span>{{ userObj.topicNum }}</span>
                 <span>话题</span>
               </div>
            </div>
            <div class="bg"></div>
          </div>
      </div>
      <!-- container -->
      <div class="content" :class=" getStorge ? '':'contentClass' " >
         <div class="item1">
           <div v-for="(item,index) in apis.getTheme() !='mile'?myFunc1:myFunc2" :key="index" @click="myFunction(index)">
              <img :src="item.img" alt="">
              <span>{{item.name}}</span>
           </div>
         </div>
          <!-- 个人主页 清除缓存 意见反馈 关于我们 推荐给好友-->
          <div class="item2">
              <div @click.stop="detailsPage"  v-if="apis.getTheme() !='dongpo'">
                <img src="./img/ico_1.png" alt="">
                <span>个人主页</span>
                <span><img src="./img/next.png" alt=""></span>
              </div>
              <div @click.stop="integral" style="display:none">
                <img src='./img/integral.png' alt="">
                <span>我的积分</span>
              </div>
              <div style="display:none">
                <img src="./img/ico_2.png" alt="">
                <span>清除缓存</span>
                <span></span>
              </div>
              <div  @click.stop="opinion">
                <img src="./img/ico_3.png" alt="">
                <span>意见反馈</span>
                <span><img src="./img/next.png" alt=""></span>
              </div>
              <div  @click.stop="us">
                <img src="./img/ico_4.png" alt="">
                <span>关于我们</span>
                <span><img src="./img/next.png" alt=""></span>
              </div>
              <div  @click.stop="fontbig" v-if="apis.getTheme() =='dongpo'">
                <img src="./img/ico_4.png" alt="">
                <span>字体大小</span>
                <span><img src="./img/next.png" alt=""></span>
              </div>
              <div @click.stop="share">
                <img src="./img/ico_5.png" alt=""> 
                <span>推荐给好友</span>
                <span><img src="./img/next.png" alt=""></span>
              </div>
              <!-- <div  @click.stop="tipOff" v-if="apis.theme.api.appName == 'mile'">
                <img :src='"~@/assets/img/"+apis.getTheme()+"/me/clue.png"' alt v-if="apis.theme.api.appName != 'qingtongxia'">
                <span>我要报料</span>
                <span><img src="./img/next.png" alt=""></span>
              </div> -->
              <!-- <div  @click.stop="subscriptionRegister" v-if="apis.theme.api.appName == 'mile'">
                <img src='./img/Subscribe.png' alt>
                <span>订阅号认证</span>
                <span><img src="./img/next.png" alt=""></span>
              </div> -->
              <div @click.stop="update">
                <img src="./img/ico_6.png" alt="">
                <span>版本号</span>
                <span>{{version}}</span>
              </div>
          </div>
          <!-- 版本号-->
          <div class="item3" v-if=" getStorge " @click="quitUser">
              <div>
                <span>退出登录</span>
              </div>
          </div>
        </div>
      </div>
      
  </div>
</template>
<script>
import api from "../../../../src/assets/js/api.js";
import qs from "qs";
import axios from "axios";
import Bus from '@/Bus';
import { mapGetters, mapMutations, mapActions } from "vuex";
const root = process.env.API_ROOT;
import { Toast,MessageBox,Indicator } from "mint-ui";
export default {
  name: "user",
  data() {
    return {
      id: "/login.html",
      isLogin: false,
      commentNum: 0,
      version: 0,
      wgtVer: null,
      wgtUrl: "",
      versionFlag: '',
      oldAppVersion:null,
      isIos:false,
      userObj:{},
      num:0,
      Browsenum:0,
      myFunc1:[      // 乐 山
        {name:'最近浏览',img:require('./img/2_18.png')},
        {name:'我的收藏',img:require('./img/2_15.png')},
        {name:'我的评论',img:require('./img/2_17.png')},
        {name:'我的活动',img:require('./img/2_03.png')},
      ],
      myFunc2:[      // 弥  勒
        {name:'最近浏览',img:require('./img/2_18.png')},
        {name:'我的收藏',img:require('./img/2_15.png')},
        {name:'我的评论',img:require('./img/2_17.png')},
      ],
      islnfoListBr:true,
      stateList:'',
      userDataid:''
    };
  },
  methods: {
    ...mapMutations("login", ["_RemoveStorage","_setStorage"]),
    ...mapMutations("index", ["set_appMain",'set_ShowActivity','set_indexActive',]),
    userMsg() {
      let that = this;
      that.apis.urlParams("userCore");
      plus.webview.getWebviewById(window.location.href.split('#/')[0]+'#/'+"userCore").addEventListener(
        "close",
        function(e) {
          let locals = JSON.parse( localStorage.getItem('userData') );
          that._setStorage(JSON.stringify(locals));
        },
        false
      );
    },
    tipOff(){
      if( localStorage.getItem( 'userData' ) != null ){
        // api.urlParams("tipOff");
        this.apis.urlParams('tipOff', { title: '我要报料' }, false);
      } else {
        api.urlParams('Login')
      }
    },
    myFunction(index){
      if( !this.userDataid ){
        this.apis.urlParams("Login");
        return;
			}
      switch (index) {
        case 0:
          this.apis.urlParams('MyBrowse', { }, false);
          this.Browsenum = 0;
          // this.selectUserBrowseByParam();
          break;
        case 1:
          this.apis.urlParams('MyCollect', { }, false);
          this.num = 0;
          // this.seachUserFavContent();
          break;
        case 2:
          this.apis.urlParams('MyTopic', { }, false);
          break;
        case 3:
          this.apis.urlParams('MyActivity', { }, false);
          // this.getActivBySignUpUserId()
          break;
      }
      
    },
    // getActivBySignUpUserId() {
    //     //查询用户已经报名的活动列表
    //     console.log("wqeqr");
    //   let that = this;
    //   axios({
    //       url: api.theme.api.me.getActivBySignUpUserId,
    //       method: "post",
    //       data:{
    //           userId:this.userDataid,
    //       },
    //   }).then(res => {
    //       // console.log(res);
    //       Bus.$emit('activelist',res.data.data);

    //   });
    // },
    // selectUserBrowseByParam(){
    //   if(!this.userDataid) {
    //     that.apis.urlParams("Login", {});
    //   }
    //   var postData = "";
    //   if(this.Browsenum == 0){
    //     postData = {
    //       "userId":this.userDataid,	
    //       "browseType":1
    //     }
    //   }else{
    //      postData = {
    //       "userId":this.userDataid,	
    //       "browseType":0
    //     }
    //   }
    //   this.axios({
    //         method: "post",
    //         url: this.apis.theme.api.me.selectUserBrowseByParam,
    //         data: postData
    //       }).then(res => {
    //     if (res.data.data.length > 0 ) {
    //       console.log(res.data.data,"zxzxzx")
    //       this.stateList = res.data.data;
    //       Bus.$emit('stateListBr',this.stateList);
    //       Bus.$emit('islnfoListBr',true);

    //     }else {
    //       Bus.$emit('islnfoListBr',false);
    //       // this.bottomNoData = true
    //     }
    //     if(this.Browsenum < 1){
    //       this.Browsenum ++;
    //       console.log(this.Browsenum)
    //       this.selectUserBrowseByParam();
          
    //     }
    //   });
    // },
    // seachUserFavContent(){
    //   let that = this;
    //   if(!this.userDataid) {
    //     that.apis.urlParams("Login", {});
    //   }
    //   if(this.num == 0){
    //     var postData = {
    //       "userId":this.userDataid,	
    //       "searchContent":"",
    //       "type":4,
    //       "appInfoId":that.apis.theme.api.appInfoId}
    //   }else if(this.num == 1){
    //     postData = {
    //       "userId":this.userDataid,	
    //       "searchContent":"",
    //       "type":2,
    //       "appInfoId":that.apis.theme.api.appInfoId}
    //   }else{
    //      postData = {
    //       "userId":this.userDataid,	
    //       "searchContent":"",
    //       "type":0,
    //       "appInfoId":that.apis.theme.api.appInfoId}
    //   }
    //   this.axios({
    //         method: "post",
    //         url: this.apis.theme.api.me.seachUserFavContent,
    //         data: postData
    //       }).then(res => {
    //       if(this.num <= 1){
    //         this.num ++;
    //         console.log(this.num)
    //         this.seachUserFavContent();
    //       }
    //       if(this.num == 0){
    //           // if (res.data.data.length > 0 ) {
    //           //   console.log(res.data.data,"zxzxzx")
    //           //   this.stateList = res.data.data;
    //           //   Bus.$emit('stateListBr',this.stateList);
    //           //   Bus.$emit('islnfoListBr',true);
    //           // }else {
    //           //   Bus.$emit('islnfoListBr',false);
    //           //   // this.bottomNoData = true
    //           // }
    //       }else if(this.num == 1){
    //           if (res.data.data.length > 0 ) {
    //             this.stateList = res.data.data;
    //             Bus.$emit('stateListBr',this.stateList);
    //             Bus.$emit('islnfoListBr',true);
    //           }else {
    //             Bus.$emit('islnfoListBr',false);
    //             // this.bottomNoData = true
    //           }
    //       }else{
    //           if (res.data.data.length > 0 ) {
    //             this.stateList = res.data.data;
    //             Bus.$emit('activalist',this.stateList);
    //             Bus.$emit('isActivelist',true);
    //           }else {
    //             Bus.$emit('isActivelist',false);
    //           }
    //       }
    //   });
      
    // },
    getDataid(){
			let userDataid = JSON.parse(localStorage.getItem("userData"));
			if( userDataid !== null){
				this.userDataid = userDataid.user_id;
			}else{
				this.userDataid = false;
			}
    },
    subscriptionRegister(){
      if(!this.userDataid){
        api.urlParams("login");
        return;
      }
      Indicator.open({
        text: '正在检测入驻状态...',
        spinnerType: 'fading-circle'
      });
      let params = {
          "appInfoId": this.apis.theme.api.appInfoId,
          // "loginUserId": this.userDataid,
          "userId": this.userDataid
      }
      this.axios({
          method:"post",
          url:this.apis.theme.api.subscription.selectSbuList,
          data:params
      })
      .then(res => {
        if(res.data.success){  //要判断用户是否已申请或者是申请的状态，对应跳转不同的页面
          Indicator.close();
          if(res.data.data.length != 0){
            // let subID = res.data.data[0].subscribeNumber;
            let subID = res.data.data[0];
            if(subID.checkType == 0){
              api.urlParams("subscriptionRegisterResult",{type:0});
            }else if(subID.checkType == 1){
              api.urlParams("subscriptionRegisterResult",{type:1,reason:subID.refuesReson,id:subID.id});
            }else if(subID.checkType == 2){
              api.urlParams("subscriptionRegisterResult",{
                type:2,
                url:subID.cbURL,
                pass:subID.cbPassword,
                name:subID.cbUsername
                
              });
            }else{
              api.urlParams("subscriptionRegister");
            }
          }else{
            api.urlParams("subscriptionRegister");
          }
        }else{
          Indicator.close();
          Toast({
            message: "网络出错，请重试！",
            position: "middle",
            duration: 1000
          });
        }
      })
    },
    skipDer(){
        let that = this;
        MessageBox({
            $type:'prompt',
            title:'提示',
            message:'请输入个人简介',
            closeOnClickModal:false,   //点击model背景层不关闭MessageBox
            showCancelButton:true,   //不显示取消按钮
            inputErrorMessage:'请输入正确的验证码',
            showInput:true
        }).then(({ value, action }) => {
            /* value 为填写的值，进行下一步操作*/
            if( value ){
              if( action == 'confirm' ){
                that.axios({
                    method: "post",
                    url: that.apis.theme.api.me.updateManageUserById,
                    data: {
                      signature: value,
                      autoId:JSON.parse( that.getStorge ).user_id
                    }
                  })
                  .then(res => {
                    if (res.data.success ) {
                      that.selectManageUserById();
                      Toast({
                        message: res.data.message,
                        position: "middle",
                        duration: 1000
                      });
                    } else {
                      Toast({
                        message: res.data.message,
                        position: "middle",
                        duration: 1000
                      });
                    }
                  });
              }
            } else {
              Toast({
                message: '请输入个人简介',
                position: "middle",
                duration: 1000
              });
            }
          
        });
    },
    // 退出登录
    outLogin() {
      if (this.isLogin) {
        this.$msgBox.confirm("请确认退出").then(action => {
          // this.set_isLogin('')
          // this.set_userInfo('')
          // this.set_userid('')
          this.commentNum = 0;
          this.$toast({ message: "已退出登录", duration: 1500 });
          this.isLogin = false;
        });
      } else {
        this.$toast({ message: "未登录", duration: 1500 });
      }
    },
    tipOff(){
      if( localStorage.getItem( 'userData' ) != null ){
        // api.urlParams("tipOff");
        this.apis.urlParams('tipOff', { title: '我要报料' }, false);
      } else {
        api.urlParams('Login')
      }
    },
    follow() {
      let that = this;
      that.apis.urlParams("newAttentionList?id="+JSON.parse( this.getStorge ).user_id+"");
      plus.webview.getWebviewById(window.location.href.split('#/')[0]+'#/'+"newAttentionList?id="+JSON.parse( this.getStorge ).user_id+"").addEventListener(
        "close",
        function(e) {
          that.selectManageUserById();
        },
        false
      );
    },
    fans() {
      let that = this;
      that.apis.urlParams("newFans?id="+JSON.parse( this.getStorge ).user_id+"");
      plus.webview.getWebviewById(window.location.href.split('#/')[0]+'#/'+"newFans?id="+JSON.parse( this.getStorge ).user_id+"").addEventListener(
        "close",
        function(e) {
           that.selectManageUserById();
        },
        false
      );
    },
    opinion() {
      api.urlParams("feedBack");
    },
    detailsPage(){
       let that = this;
       if( localStorage.getItem( 'userData' ) != null ){
        api.urlParams("detailsPage?id="+JSON.parse( this.getStorge ).user_id+"&type=0");
        plus.webview.getWebviewById(window.location.href.split('#/')[0]+'#/'+"detailsPage?id="+JSON.parse( this.getStorge ).user_id+"&type=0").addEventListener(
        "close",
        function(e) {
          that.selectManageUserById();
        },
        false
      );
      } else {
        api.urlParams('Login')
      }
       
    },
    detailsPageTopic(){
       let that = this;
       api.urlParams("detailsPage?id="+JSON.parse( this.getStorge ).user_id+"&type=1",{ type : 1 });
       plus.webview.getWebviewById(window.location.href.split('#/')[0]+'#/'+"detailsPage?id="+JSON.parse( this.getStorge ).user_id+"&type=1").addEventListener(
        "close",
        function(e) {
          that.selectManageUserById();
        },
        false
      );
    },
    detailsPageCircle(){
      let that = this;
       api.urlParams("detailsPage?id="+JSON.parse( this.getStorge ).user_id+"&type=0",{ type: 0 });
        plus.webview.getWebviewById(window.location.href.split('#/')[0]+'#/'+"detailsPage?id="+JSON.parse( this.getStorge ).user_id+"&type=0").addEventListener(
        "close",
        function(e) {
          that.selectManageUserById();
        },
        false
      );
    },
    integral() {
      let that = this;
      if (JSON.parse(localStorage.getItem("userData"))) {
        api.urlParams("personalIntegral");
        plus.webview.getWebviewById(window.location.href.split('#/')[0]+'#/'+"personalIntegral").addEventListener(
          "close",
          function(e) {
            if(localStorage.getItem('goNews')=='true'){
              that.set_appMain(5)
            }
            localStorage.removeItem('goNews')
          },
          false
        );
      } else {
        that.apis.urlParams("Login", {});
      }
    },
    us() {
      if(this.apis.getTheme() != 'dongpo'){
         api.urlParams("us");
      }else{
         api.urlParams("aboutnews");
      }
    },
    fontbig() {
       let that = this;
      if(that.apis.getTheme() == 'dongpo'){
        if (JSON.parse(localStorage.getItem("userData") == null)) {
          that.apis.urlParams("Login", {});
        } else {
          api.urlParams("fontbig");
        }
      }
    },
    share(){
       api.urlParams("share");
    },
    collectHistory(){
        let that = this;
        if (JSON.parse(localStorage.getItem("userData") == null)) {
          that.apis.urlParams("Login", {});
        } else {
          that.apis.urlParams("review", {});
        }
    },
    quitUser() {
      //获取验证码接口
      let that = this;
      axios({
        method: "post",
        //api.theme.api.me.logout
        // root+'/login_al/login/logout'
        url: api.theme.api.me.logout
      }).then(res => {
        if (res.data.status == "1") {
          that.$toast({
            message: "退出登录",
            position: "middle",
            duration: 1500
          });
          localStorage.removeItem('index_Column'); //切换至其他用户，需要重置栏目
          localStorage.removeItem('removeChannel');
          localStorage.removeItem('old_index_Column');
          this._RemoveStorage(null);
        }
      });
    },
    //用户详情
    selectManageUserById() {
      //获取验证码接口
      let that = this;
      axios({
        method: "post",
        data:{
          autoId:JSON.parse( that.getStorge ).user_id
        },
        url: api.theme.api.me.selectManageUserById
      }).then(res => {
        if( res.data.success ){
          this.userObj = res.data.data[0];
        }
      });
    },
    // 跳转到登陆页
    wrapper(id) {
      api.urlParams("Login");
      // window.location.href=window.location.href+"/login.html";
    },
    goToMyComment() {
      if (this.isLogin) {
        this.$router.push({ name: "myComment" });
      } else {
        this.$toast({ message: "未登录", duration: 1500 });
      }
    },
    update() {
      var that=this
      if(localStorage.getItem('regengxin')=='true') {
        localStorage.setItem('restart','true');
        plus.nativeUI.showWaiting("发现新版本，正在为你更新中");
        return
      }
      plus.runtime.getProperty(plus.runtime.appid, function (inf) {
        that.wgtVer = inf.version;
        if(inf.version == that.versionFlag) {
          plus.nativeUI.toast("您当前已为最新版本",{duration:"short"})
          return
        }
        // alert(that.wgtVer)
        that.checkUpdate();
      });
    },

    // 检测更新
    checkUpdate() {
      //+'?type=0'
      var checkUrl = window.$themeConfig.api.updataCheckUrlUrl;
      var that=this;
      // console.log("版本更新...");
      // plus.nativeUI.showWaiting("版本更新...");
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        switch (xhr.readyState) {
          case 4:
            plus.nativeUI.closeWaiting();
            if (xhr.status == 200) {
              console.log("检测更新成功：" + xhr.responseText);
              let data = JSON.parse(xhr.responseText);
              var newVer = data.data.app_version;
              that.wgtUrl = data.data.app_path;
              // 线上最新版本号 newVer
              // 获取本地版本号 wgtVer
              newVer =  newVer.replace('.', "").replace('.', "");
              that.wgtVer = that.wgtVer.replace('.', "").replace('.', "");

              if( Number( that.wgtVer ) >= Number(newVer) ){
                that.versionFlag = newVer
                setTimeout(() => {
                  that.versionFlag = ''
                }, 20000);
                plus.nativeUI.toast("您当前已为最新版本",{duration:"short"})
                return;
              } else {
                that.downWgt();
              }
              // if (that.wgtVer && newVer && that.wgtVer != newVer) {
              //   that.downWgt(); // 下载升级包
              // } else {
              //   // plus.nativeUI.alert("您当前已为最新版本");
               
              //   plus.nativeUI.toast("您当前已为最新版本",{duration:"short"})
              // }
            } else {
              console.log("检测更新失败，请重试");
              plus.nativeUI.alert("检测更新失败，请重试");
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

    // 更新应用资源
    // 从服务器下载应用资源包（wgt文件）
    // 下载wgt文件
    downWgt() {
      var that=this
      console.log("下载中...");
      plus.nativeUI.showWaiting("发现新版本，正在为你更新中");
      plus.downloader
        .createDownload(
          that.wgtUrl, {
            filename: "_doc/update/"
          },
          function (d, status) {
            if (status == 200) {
              console.log("下载成功：" + d.filename);
              that.installWgt(d.filename); // 更新wgt包
            } else {
              console.log("下载失败！");
              plus.nativeUI.alert("下载失败！");
              plus.nativeUI.closeWaiting();
            }
          }
        )
        .start();
    },
    // 更新应用资源
    installWgt(path) {
      // plus.nativeUI.showWaiting("更新中...");
      plus.runtime.install(
        path, {},
        function () {
          plus.nativeUI.closeWaiting();
          console.log("更新成功！");
          plus.nativeUI.alert("更新成功！", function () {
            plus.runtime.restart();
          });
        },
        function (e) {
          plus.nativeUI.closeWaiting();
          console.log("更新失败，请重试 [" + e.code + "]：" + e.message);
          plus.nativeUI.alert("更新失败，请重试 [" + e.code + "]");
        }
      );
    },
  },
  created() {
    var that = this;
    if (window.plus) {
      if(  plus.os.name == "iOS" ){
         that.isIos = true;
      } else {
         that.isIos = false;
      }
      plus.runtime.getProperty(plus.runtime.appid, function(inf) {
        that.version = inf.version;
      });
    } else {
      document.addEventListener(
        "plusready",
        function() {
          plus.runtime.getProperty(plus.runtime.appid, function(inf) {
            that.version = inf.version;
          });
        },
        false
      );
    }
    Bus.$on('zanUpdate',(val) =>{
            if( val ){
              that.selectManageUserById();
            }
        });
  },
  mounted(){
    if( this.getStorge  ){
      this.selectManageUserById();
    }
    this.getDataid();
  },
  computed: {
    ...mapGetters("login", [
      "getStorge" // active的栏目
    ])
  }
};
</script>
<style lang='less' scoped>
#user {
  position: relative;
  width: 100%;
  height: calc( 100vh + 1rem );
  // overflow-y: scroll;
  font-size: 0.37rem;
  padding-bottom: .88rem;
  background-color: #f2f2f2;
  // overflow: scroll;
  a {
    text-decoration: none;
  }
  .container{
    position: relative;
    top: -.6rem;
  }
  .iosContainer{
    top: -.88rem;
  }
  .androidContainer{
    top: -.88rem;
  }
  .loginState {
    position: relative;
    box-sizing: content-box;
    .wrapper{
       width: 100%;
       height: 5.5rem;
       background-image: url('./img/my_bg.png');
       background-size: cover;
       position: relative;
       .item1{
         position: absolute;
         width: 100%;
         z-index: 11;
         top: 1.44rem;
         display: flex;
         >img{
           height: 1.44rem;
           margin-left: .3rem;
           border-radius: 50%;
         }
         >div{
           margin-left: .3rem;
           color: #fff;
          //  flex: 1;
           display: flex;
           flex-direction: column;
           justify-content: center;
           position: relative;
           >span:nth-child(1){
             font-size:0.48rem;
             margin-bottom: .1rem;
             font-weight:500;
           }
           >span:nth-child(2){
             font-size:0.28rem;
              font-weight:300;
              margin-right: .27rem;
           }
           img{
             height: .3rem;
             width: .3rem;
             position: absolute;
             right: -.27rem;
             bottom: .16rem;
           }
         }
         .loginClass{
            display: flex;
            flex-direction: row;
            align-items: center;
            span{
              font-size: .36rem !important;
              margin: 0 !important;
              line-height: 1;
              font-weight:500 !important;
            }
         }
       }
       .item2{
         position: absolute;
         top: 3.5rem;
         width: 100%;
         height: 1rem;
         display: flex;
         padding: 0 .3rem;
         z-index: 11;
         >div{
           display: flex;
           flex-direction: column;
           justify-content: center;
           color: #fff;
           flex: 1;
           text-align: center;
            >span:nth-child(1){
             font-size:0.56rem;
             font-weight:bold;
            }
            >span:nth-child(2){
             font-size:0.28rem;
             font-weight:400;
             color:rgba(217,217,217,1);
            }
         }
       }
       .bg{
         position: absolute;
         background: black;
         opacity: .3;
         width: 100%;
         height: 100%;
       }
    }
    
  }
  .content{
    position: relative;
    top: -.5rem;
    height:auto;
    width: 100%;
    padding: 0 .3rem;
    .item1{
      display: flex;
      background: #fff;
      border-radius: 10px;
      margin-bottom: .3rem;
      >div{
        display: flex;
        flex: 1;
        flex-direction: column;
        align-items: center;
        padding: .3rem .38rem;
        font-size: .24rem;
        font-weight:400;
        img{
          width: .64rem;
          height: .64rem;
          margin-bottom: .18rem;
        }
      }
    }
    .item2,.item3{
      display: flex;
      background: #fff;
      border-radius: 10px;
      flex-direction: column;
      >div{
        display: flex;
        flex: 1;
        align-items: center;
        margin: 0 .3rem;
        padding: .35rem 0;
        border-bottom:.01rem solid rgba(230,230,230,1);
        position: relative;
        img{
          width: .36rem;
          height: .36rem;
          margin-right: .14rem;
        }
        span{
          font-size: .3rem;
          font-weight:400;
          color:#1a1a1a;
          line-height: 1;
        }
        >span:nth-child(3){
          font-size: .3rem;
          color:rgba(153,153,153,1);
          font-weight:400;
          position: absolute;
          right: 0;
          img{
            height: .3rem;;
          }
        }
      }
      >div:last-child{
        border: none;
      }
    }
    .item3{
      margin-top: .3rem;
      >div{
         justify-content: center;
         span{
           color: red;
         }
      }
    }
  }
  .contentClass{
     top: -1.3rem;
  }
}
</style>
