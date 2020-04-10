<template>
    <div id="us">
       <header class="com_header headerNavFixed">
        <div class="nvbt iback" @click="apis.iback()" ></div>
        <div class="nvtt" >关于我们</div>
        <div class="nvbt idoc"></div>
         </header>
    <div class="container contentNavFixed com_contentNavFixed">
          <template>
            <div class="wrapper">
                  <img class="userProfile" :src='"~@/assets/img/"+apis.getTheme()+"/me/dafultImg.png"'>
            </div>
                  
          </template>
            <div class='box'>
               <p>{{apis.theme.me.us.text}}</p>
            </div>
         <div class='subject'>
              <p v-html="apis.theme.me.us.content"></p>
           </div> 
           <div class='js'>
           </div>


   </div>                        
    </div>
</template>
<script>
export default {
  
  data() {
    return {
    };
  },
  methods: {
  },
  mounted() {
  },
  created(){
  }
};
</script>
<style lang='less' scoped>
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
#us{
    // font-family: monospace;
    position: relative;
    width: 100%;
    height:100vh;
    overflow: hidden;
   background-color: #f2f2f2;
  
    }
    .wrapper{
    width: 100%;
    height: 2rem;
    // border: 1px solid;
    text-align: center;
    margin-top: .6rem;
    img{
      width: 2rem;
    }
   }  

.box{
    width: 100%;
    text-align: center;
    font-size: .36rem;
    margin-top: .18rem;
    font-family: auto;
}
.subject{
    width: 100%;
    // height: 8.5rem;
    margin-top: .48rem;
    background-color: white;
    overflow: auto;
    font-size:.34rem;
    padding: .5rem .4rem 1.3rem;
   p{
     text-indent: 2em;
     margin-top:10px; text-align: justify
   }
}

.js{
  position:relative;
  width: 100%;
  height: 50px;
  p{
    position: absolute;
    font-size: 12px;
    right: 18px;
    color: #9DA1A4;
    line-height: 50px;
  }
}
.navclolr{color:rgb(26, 26, 26)}

</style>

