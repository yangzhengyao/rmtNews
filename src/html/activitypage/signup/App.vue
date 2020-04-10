<template>
  <div class="sinupall">
    <header class="com_header headerNavFixed">
      <div class="nvbt iback" @click="apis.iback()"></div>
      <div class="nvtt">活动报名</div>
      <div class="nvbt idoc"></div>
    </header>
    <div class="sinualltop" :class="iphonexPadding ? 'iphonexPaddingBaomingHeader':'aaaa'">
      <input type="text" value placeholder="请输入姓名" class="sinuall-top" maxlength="6" v-model="name">
      <input type="number" value placeholder="请输入手机号" class="sinuall-top" maxlength="11" v-model="phone">
      <input type="number" value placeholder="年龄" class="sinuall-top" maxlength="3" v-model="age">
      <input type="text" value placeholder="职业" class="sinuall-top" maxlength="10" v-model="job">
    </div>
    <div class="button" @click="signUp" :class="iphonexPadding ? 'iphonexPaddingBaoming':'aaaa'">报名</div>
  </div>
</template>
<script>
import api from "../../../../src/assets/js/api.js";
import { Toast } from "mint-ui";
import axios from "axios";
import qs from "qs";
import Bus from '@/Bus';
export default {
  data() {
    return {
      name:"",
      phone:"",
      age:"",
      job:"",
      activeID:'',
      userDataid:'',
      portraitUrl:'',
      iphonexPadding:false
    }
  },
  components: {},
  created() {
    let userDataid=JSON.parse(localStorage.getItem("userData"));
    let activititlecont = JSON.parse( localStorage.getItem('activitydetails'));
        this.activeID=activititlecont.title.id;
        this.userDataid=userDataid.user_id;
        this.portraitUrl=userDataid.imgurl;
  },
  mounted(){
    if( this.apis.iphonexPaddingFn() ){
        this.iphonexPadding = true;
    }
  },
  methods: {
    //报名方法
    signUp(){
      //参数验证检测
      if(this.name.trim().length == 0){
        this.name = "";
        Toast({
          message:"姓名不能为空",
          position:"middle",
          duration:1500
        })
        return;
      }else if(this.phone.trim().length == 0 || !/^1[34578]\d{9}$/.test(this.phone)){
        Toast({
          message:"手机号输入有误",
          position:"middle",
          duration:1500
        })
        return;
      }else if(this.age.trim().length == 0|| this.age == 0 || !/^\d+$/.test(this.age)){
        Toast({
          message:"年龄输入有误",
          position:"middle",
          duration:1500
        })
        return;
      }else if(this.job.trim().length == 0){
        this.job = "";
        Toast({
          message:"工作不能为空",
          position:"middle",
          duration:1500
        })
        return;
      }
      //参数验证检测完毕
       
      //请求接口
      axios({
          method: "post",
          url: api.theme.api.news.signUp,
          data:{
            "userId":this.userDataid,
            "activitiesId":this.activeID,
            "username":this.name,
            "phone":this.phone,
            "job":this.job,
            "age":this.age,
            'portraitUrl':''
          },
           headers:{'Content-Type':'application/json; charset=utf-8'}	
      }).then(res => {
          //报名成功
           let isSuccess = res.data.success;
          console.log(isSuccess)
          if(isSuccess){
              Toast({
                message:"报名成功",
                position:"middle",
                duration:1500
              })
              // let activititlecont = JSON.parse( localStorage.getItem('activitydetails'));
              // this.apis.urlParams('activitydetails',{'title':activititlecont},true);
            setTimeout( () =>{
              Bus.$emit('changeNum');
              this.apis.iback();
            },1600)
          }else{
             Toast({
                message:"报名失败",
                position:"middle",
                duration:1500
              })
          }
          
      });

    }
  }
};
</script>
<style>
  .iphonexPaddingBaoming{padding-bottom: 1.5rem !important; }
  .iphonexPaddingBaomingHeader{padding-top: 2rem !important; }
</style>
<style lang="stylus" scoped>
header {
  background: #be2c1f;
}

.sinualltop {
  padding-top: 2.35rem;
}

.sinuall-top {
  width: 6.39rem;
  height: 0.72rem;
  background: #f5f5f5;
  border: 1px solid #d9d9d9;
  color: #999999;
  border-radius: 5px;
  clear: both;
  margin: 0 auto 0.23rem auto;
  display: block;
  text-indent: 0.25rem;
  font-size: 0.3rem;
  -webkit-appearance: none;
}

.button {
  background: #be2c1f;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 0.98rem;
  color: #fff;
  font-size: 0.34rem;
  text-align: center;
  line-height: 0.98rem;
}
</style>


