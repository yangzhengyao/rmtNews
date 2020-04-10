<template>
    <transition name="fadeIn">
        <div id="questions">
            <header class="com_header headerNavFixed">
                <div class="nvbt iback" @click="apis.iback()" :class=" apis.getTheme() == 'dongpo'?'iBlackBack':'iback'"></div>
                <div class="nvtt">企业投诉</div>
                <div class="nvbt idoc"></div>
            </header>
            <div class="wrap">
                <div class="wrap-content">
                    <div class="listtitle">
                        <p>企业名称</p>
                        <input type="text"  placeholder="请输入企业名称" v-model="teamName">
                    </div>
                    <!-- <div class="listtitle" >        暂时隐藏
                        <p>所在区域</p>
                        <input type="text"  placeholder="请输入所在区域" v-model="addressName">
                        <span class="diqu">{{ addressName }}</span>
                    </div> -->
                    <div class="listtitle">
                        <p>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名</p>
                        <input type="text"  placeholder="请输入姓名" v-model="userName">
                    </div>
                    <div class="listtitle">
                        <p>手机号码</p>
                        <input type="text"  placeholder="请输入手机号码" v-model="phone">
                    </div>
                    <div class="listtitle">
                        <p>标&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;题</p>
                        <input type="text"  placeholder="请输入标题" v-model="titleName">
                    </div>
                    <div class="content">
                        <p>内&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;容</p>
                        <textarea name="" id="" placeholder="这是一段内容说明" cols="38" rows="7" v-model="textareaVal" contenteditable="true"></textarea>
                    </div>
                    <!-- 添加图片或者视频 -->
                    <div class="imgBoxs">
                        <div class="imgBoxsChi">
                            <!-- 图片 -->
                            <div class="imgTool" v-for="(item,index) in imgBox" :key=index @click.stop="bigImg(index)">
                                <div class="delVid" @click.stop="deletePic(index)">
                                    <img src="./images/del.png">
                                </div>
                                <img :src="item">
                            </div>
                            <!-- <div class="imgTool" @click.stop="bigImg(index)">
                                <div class="delVid" @click="deletePic(index)">
                                    <img src="./images/del.png">
                                </div>
                                <img src="../images/newsImg1.png">
                            </div> -->
                            
                            <!-- 视频 -->
                            <div  class="vidBoxsChi" v-if="vidBox.length">
                                <div class="videoBack" v-for="(item,index) in vidBox" :key="index" :style="{'background-image':'url('+item[1]+')'}">
                                    <div class="delVid" @click="deleteVid(index)" >
                                        <img src="./images/del.png">
                                    </div>
                                    <div class="playRound" @click.stop="jumpPlayer(item[0])"></div>
                                </div>
                            </div>
                            <div  class="addImage" v-if="imgBox.length<=8&& vidBox.length <= 0" @click="addImages">
                                <i class="el-icon-plus"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    class="navbar"
                    @click="submit"
                    :class="iphonexPadding ? 'iphonexPaddingClass':'' "
                >
                    <span >提交</span>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import { Cell, Toast,Indicator } from "mint-ui";
import axios from "axios";
import qs from "qs";
import { mapGetters, mapMutations, mapActions } from "vuex";
import apis from '@/assets/js/api.js';
export default {
    name: "complaintlist",
    data(){
        return{
            teamName:'',    // 企业名称
            addressName:this.apis.theme.api.questionName, // 所在区域
            userName:'',    // 姓名
            phone:'',       // 手机号码
            titleName:'',   // 标题
            textareaVal:'', // 内容
            iphonexPadding:'',
            imgBox:[],      // 图片
            imgData:[],
            androidImg:[],
            getData:localStorage.getItem('wz_imgData'),
            vidBox:[],      // 视频
            androidVid:[],
            getVidData:localStorage.getItem('wz_vidData'),
            isIOS:false,
            kind:[
                { title: '拍照或录像' },
                { title: '选择照片' },
                { title: '选择视频' },
            ],

        }
    },
    computed: {
    ...mapGetters("login", [
      "getStorge" // 
    ])
  },
    components: {
    
    },  
    methods:{
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

        //添加图片/视频
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

        //删除当前图片
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

        //图片保存至本地
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
                    });
                }
            });
        },

        //播放视频
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

        //删除视频
        deleteVid(index){ 
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

        //保存后重新渲染
        statusSet(){
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

        //提交按钮
        submit(){
            let userDataid=JSON.parse(localStorage.getItem("userData"));
            if(!userDataid ){
                this.apis.urlParams('Login');
                return;
            }
            
            var imgStr = "";
            var vidStr = "";

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
            this.imgBox.forEach((v,i) => {
                imgStr += v + ",";
            })

            this.vidBox.forEach((v,i) => {
                vidStr += v + ",";
            })
            // if(getVid){
            //     let jsonV = JSON.parse(getVid);
            //     vid = jsonV[0];
            //     vidImg = jsonV[1];
            // }
            console.log(imgStr.substring(0,imgStr.length-1),'dddddddddddddddddddddddddddddddd');


            let params={
                userId:userDataid.user_id,         //用户id
                companyName:this.teamName.trim(),        // 企业名称
                province:'',                     // 省份
                city:"",                        // 城市
                county:'',                       // 乡/县
                userName:this.userName.trim(),        // 姓名
                phone:this.phone,              // 手机号码
                title:this.titleName.trim(),      // 标题
                content:this.textareaVal.trim(),  // 内容
                pictureUrl:imgStr.substring(0,imgStr.length-1),  // 图片路径
                videoUrl:vidStr.substring(0,vidStr.length-1),                   // 视频路径
            };

            let tel=/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;//电话号码验证
            let reg= new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]")//内容不能有特殊字符验证

            
            if (params.companyName == ""||reg.test(params.companyName)) {
                Toast('请正确填写企业名称');
                return;
            } 
            // else if (params.addressName == "") {
            //     Toast('请选择所在区域');
            //     return;
            // } 
            else if (params.userName == ""||reg.test(params.userName)) {
                Toast('请正确填写姓名');
                return;
            }
            else if (params.phone == "") {
                Toast("请正确填写手机号码");
                return;
            } 
            else if (params.title == ""||reg.test(params.title)) {
                Toast("请正确填写标题");
                return;
            } 
            else if (params.content == "") {
                Toast("请正确填写内容");
                return;
            } 
            else if (!tel.test(params.phone)) {
                Toast("请填写正确格式的手机号码");
                return;
            }

            Indicator.open({
                text: '正在提交中...',
                spinnerType: 'fading-circle'
            });
            // that.commitLoding = false;
            if (userDataid.user_id) {
                this.axios({
                method: "post",
                url:  this.apis.theme.api.services.addComplaint, 
                data:params
                }).then(res => {
                    console.log(res,'jiangjaijaijiajijaijaijaijaijaijai');
                    
                    if (res.data.success){
                        Indicator.close();
                        Toast({
                            message: "提交成功",
                            position: "middle",
                            duration: 1400
                        });
                        setTimeout(() => {
                            localStorage.removeItem('wz_imgData');
                            localStorage.removeItem('wz_vidData');
                            this.apis.iback()
                        }, 1600);
                    }else{
                        Indicator.close();
                        Toast({
                            message: "网络错误，请重试。",
                            position: "middle",
                            duration: 1400
                        });
                    }
                });
            }
        },
    },
    mounted(){
        
        this.AndroisIos();
    },
}
</script>

<style lang="less" scoped>
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
.wrap{
    margin-top: .88rem;
    padding:.3rem;
    background: #F0F2F5;
    overflow-y: auto;
    height: 100vh;
    .navbar {
        border-radius: .4rem;
        background: @dominantColor;
        height: .8rem;
        width: 90%;
        margin: 1rem auto;
        text-align: center;
        font-size: 0.333rem;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
            width: 0.333rem;
            height: 0.333rem;
            margin-right: 0.24rem;
        }
    }
    .wrap-content{
        padding-top: .5rem;
        .listtitle{
            background: #fff;
            height: .88rem;
            margin-bottom: .3rem;
            display: flex;
            border-radius: 5px;
            overflow: hidden;
            justify-content: space-between;
            p{
                margin-left: .3rem;
                line-height: .88rem;
                height:100%;
                font-size:.32rem;
                font-family:Source Han Sans CN;
                font-weight:bold;
                color:rgba(26,26,26,1);
            }
            .diqu,input{
                width: 70%;
                font-size: .32rem;
                line-height: .48rem;
                padding: .2rem .3rem .2rem 0;
                text-align: right;
            }
            input::-webkit-input-placeholder{
                text-align: right;
                font-size: .32rem;
            }
        }
        .content{
            background: #fff;
            padding:0 .3rem;
            font-size:.32rem;
            border-radius: 5px;
            overflow: hidden; 
            margin-bottom: .3rem;
            p{
                font-weight: bold;
                line-height: .88rem;
                border-bottom: 1px solid #d9d9d9;
            }
            textarea{
                border: none;
                line-height: .5rem;
                font-size:.32rem;
                font-family:Source Han Sans CN;
                font-weight:400;
                outline:none;
                resize:none;
                -webkit-user-select: auto;
                // text-indent: 2em;
            }
            textarea::-webkit-input-placeholder{
                color:rgba(153,153,153,1);
                font-weight:400;
                font-family:Source Han Sans CN;
                font-size:.32rem;
                line-height: .5rem;
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
                        background: rgba(0, 0, 0, 0.4) url("~@/assets/img/play_san.png")
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
}
</style>