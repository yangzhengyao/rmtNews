<template>
  <div class="commonList">
    <!-- margin-top:.8rem 去掉 -->
    <header class="com_header headerNavFixed" style="border-bottom:.01rem solid #fafafa;">
      <div style="visibility:hidden" class="nvbt"></div>
      <div
        class="nvtt"
        style="font-size: 0.38rem;font-weight: 500;"
        v-if="apis.getTheme() == 'haicang'"
      >政务矩阵</div>
      <div class="nvtt" style="font-size: 0.38rem;font-weight: 500;" v-else>融媒矩阵</div>
      <div class="nvbt iabout"></div>
    </header>
    <div style="padding:.15rem;width:100%;display:flex;display:none" class="haicang_zhengwu">
      <div @click="apis.urlParams('hcZhengwu?type=1')">
        <div class="zhengwu_img">
          <img src="./navBottom/home/images/WeChat_icon.png" alt />
          <span>微信</span>
        </div>
        <div class="zhengwu_btn">
          <span>19</span>
          <span>家</span>
        </div>
      </div>
      <div @click="apis.urlParams('hcZhengwu?type=2')">
        <div class="zhengwu_img">
          <img src="./navBottom/home/images/sina_icon.png" alt />
          <span>微博</span>
        </div>
        <div class="zhengwu_btn">
          <span>1</span>
          <span>家</span>
        </div>
      </div>
      <div @click="apis.urlParams('hcZhengwu?type=3')">
        <div class="zhengwu_img">
          <img src="./navBottom/home/images/website.png" alt />
          <span>网站</span>
        </div>
        <div class="zhengwu_btn">
          <span>1</span>
          <span>家</span>
        </div>
      </div>
    </div>
    <div class="ibox" v-if="apis.getTheme() == 'haicang'">
      <h1>微信矩阵</h1>
      <div class="content">
        <a
          class="item"
          v-for="(item,index) in wechat"
          :key="index"
          @click="apis.urlParams('wechatItem',item,false)"
        >
          <img :src="item.icon" alt />
          <h3>{{item.name}}</h3>
        </a>
      </div>
    </div>
    <div class="ibox" v-if="apis.getTheme() == 'haicang'">
      <h1>微博矩阵</h1>
      <div class="content">
        <a
          class="item"
          v-for="(item,index) in sina"
          :key="index"
          @click="apis.urlParams(item.src,{ 'title':item.name },true)"
        >
          <img :src="item.icon" alt />
          <h3>{{item.name}}</h3>
        </a>
      </div>
    </div>
    <div class="ibox" v-if="apis.getTheme() == 'haicang'">
      <h1>网站矩阵</h1>
      <div class="content">
        <a
          class="item"
          v-for="(item,index) in web"
          :key="index"
          @click="apis.urlParams(item.src,{ 'title':item.name },true)"
        >
          <img :src="item.icon" alt />
          <h3>{{item.name}}</h3>
        </a>
      </div>
    </div>
    <div class="ibox" v-if="apis.getTheme() == 'baisha'">
      <h1>微信矩阵</h1>
      <div class="content">
        <a
          class="item"
          v-for="(item,index) in baisha_wechat"
          :key="index"
          @click="apis.urlParams('wechatItem',item,false)"
        >
          <img :src="item.icon" alt />
          <h3>{{item.name}}</h3>
        </a>
      </div>
    </div>
    <div class="ibox" v-if="apis.getTheme() == 'baisha'">
      <h1>微博矩阵</h1>
      <div class="content">
        <a
          class="item"
          v-for="(item,index) in baisha_sina"
          :key="index"
          @click="apis.urlParams(item.src,{ 'title':item.name },true)"
        >
          <img :src="item.icon" alt />
          <h3>{{item.name}}</h3>
        </a>
      </div>
    </div>
    <div class="ibox" v-if="apis.getTheme() == 'baisha'">
      <h1>网站矩阵</h1>
      <div class="content">
        <a
          class="item"
          v-for="(item,index) in baisha_web"
          :key="index"
          @click="apis.urlParams(item.src,{ 'title':item.name },true)"
        >
          <img :src="item.icon" alt />
          <h3>{{item.name}}</h3>
        </a>
      </div>
    </div>
    <div class="ibox" v-if="apis.getTheme() == 'wanning'">
      <h1>微信矩阵</h1>
      <div class="content">
        <a
          class="item"
          v-for="(item,index) in wanning_wechat"
          :key="index"
          @click="apis.urlParams('wechatItem',item,false)"
        >
          <img :src="item.icon" alt />
          <h3>{{item.name}}</h3>
        </a>
      </div>
    </div>
    <div class="ibox" v-if="apis.getTheme() == 'wanning'">
      <h1>微博矩阵</h1>
      <div class="content">
        <a
          class="item"
          v-for="(item,index) in wanning_sina"
          :key="index"
          @click="apis.urlParams(item.src,{ 'title':item.name },true)"
        >
          <img :src="item.icon" alt />
          <h3>{{item.name}}</h3>
        </a>
      </div>
    </div>
    <div class="ibox" v-if="apis.getTheme() == 'wanning'">
      <h1>网站矩阵</h1>
      <div class="content">
        <a
          class="item"
          v-for="(item,index) in wanning_web"
          :key="index"
          @click="apis.urlParams(item.src,{ 'title':item.name },true)"
        >
          <img :src="item.icon" alt />
          <h3>{{item.name}}</h3>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
// import haicangZw from "./navBottom/home/mockJson/haicang_zhengwu.js";
export default {
  name: "commonList",
  data() {
    return {
      zhengwu_type: {},
      wechat: [
        {
          name: "嵩屿街道",
          uid: "xmhcta",
          icon: require("../assets/img/songyujiedao.jpg")
        },
        {
          name: "海沧街道",
          uid: "xmhcta",
          icon: require("../assets/img/haicangjiedao.jpg")
        },
        {
          name: "文明新阳",
          uid: "xmhcta",
          icon: require("../assets/img/wenmingxinyang.jpg")
        },
        {
          name: "耕读东孚",
          uid: "xmhcta",
          icon: require("../assets/img/dongfu.jpg")
        },
        {
          name: "法治海沧",
          uid: "xmhcta",
          icon: require("../assets/img/fazhihaicang.jpg")
        },
        {
          name: "廉洁海沧",
          uid: "xmhcta",
          icon: require("../assets/img/lianjiehaicang.jpg")
        },
        {
          name: "健康海沧",
          uid: "xmhcta",
          icon: require("../assets/img/jiankanghaicang.jpg")
        },
        {
          name: "厦门海沧教育",
          uid: "xmhc_edu",
          icon:
            "http://wx.qlogo.cn/mmhead/Q3auHgzwzM5nQmr4BW2dp5vUqIUHGOoOslOhBHuibwMQH5FjztUDSJg/0"
        },
        {
          name: "海沧旅游",
          uid: "xmhcta",
          icon: "http://haicang.wengetech.com:8082/haicang/img/wechat/1.jpg"
        },
        {
          name: "海沧先锋",
          uid: "xmhczzb",
          icon:
            "http://wx.qlogo.cn/mmhead/Q3auHgzwzM6Qs4vicvQSQre3K7WBHTnhvkiaADXa8JSxOib511U5sdWxg/0"
        },
        {
          name: "厦门市海沧区文化馆",
          uid: "hcqwhg",
          icon: "http://haicang.wengetech.com:8082/haicang/img/wechat/9.jpg"
        },
        {
          name: "文明海沧",
          uid: "wenminghaicang",
          icon: "http://haicang.wengetech.com:8082/haicang/img/wechat/19.jpg"
        },
        {
          name: "海沧交警",
          uid: "hcqwtj",
          icon: require("../assets/img/haicangjiaojing.png")
        }
        // {
        //   name: "海沧青年",
        //   uid: "xmhcqn",
        //   icon: "http://haicang.wengetech.com:8082/haicang/img/wechat/3.jpg"
        // },
        // {
        //   name: "海沧边检",
        //   uid: "haicangbianjian",
        //   icon: "http://haicang.wengetech.com:8082/haicang/img/wechat/4.jpg"
        // },
        // {
        //   name: "海沧政协",
        //   uid: "xmhczx6056761",
        //   icon: "http://haicang.wengetech.com:8082/haicang/img/wechat/5.jpg"
        // },
        // {
        //   name: "厦门海沧公安",
        //   uid: "xmhcga",
        //   icon: "http://haicang.wengetech.com:8082/haicang/img/wechat/7.jpg"
        // },
        // {
        //   name: "厦门市海沧消防",
        //   uid: "hcxf01",
        //   icon: "http://haicang.wengetech.com:8082/haicang/img/wechat/5.jpg"
        // },
        // {
        //   name: "厦门海沧巡特警",
        //   uid: "xmhcxtj",
        //   icon: "http://haicang.wengetech.com:8082/haicang/img/wechat/8.jpg"
        // },
        // {
        //   name: "厦门市海沧区文化馆",
        //   uid: "hcqwhg",
        //   icon: "http://haicang.wengetech.com:8082/haicang/img/wechat/9.jpg"
        // },
        // {
        //   name: "厦门海沧区老年大学",
        //   uid: "hcq-lndx",
        //   icon: "http://haicang.wengetech.com:8082/haicang/img/wechat/10.jpg"
        // },
        // {
        //   name: "海沧高层次人才",
        //   uid: "hcqrcb1332",
        //   icon: "http://haicang.wengetech.com:8082/haicang/img/wechat/11.jpg"
        // },
        // {
        //   name: "海沧身边事",
        //   uid: "haicangshenbian",
        //   icon: "http://haicang.wengetech.com:8082/haicang/img/wechat/12.jpg"
        // },
        // {
        //   name: "厦门海沧招聘",
        //   uid: "xiamenhc-zhaoping",
        //   icon: "http://haicang.wengetech.com:8082/haicang/img/wechat/13.jpg"
        // },
        // {
        //   name: "海沧教育网",
        //   uid: "haicangedu",
        //   icon: "http://haicang.wengetech.com:8082/haicang/img/wechat/14.jpg"
        // },
        // {
        //   name: "海沧创新社区",
        //   uid: "chuangxinshequ",
        //   icon: "http://haicang.wengetech.com:8082/haicang/img/wechat/15.jpg"
        // },
        // {
        //   name: "海沧生活",
        //   uid: "haicang114",
        //   icon: "http://haicang.wengetech.com:8082/haicang/img/wechat/16.jpg"
        // },
        // {
        //   name: "今日海沧",
        //   uid: "jinrihaicang",
        //   icon: "http://haicang.wengetech.com:8082/haicang/img/wechat/17.jpg"
        // },
        // {
        //   name: "海沧先锋",
        //   uid: "xmhczzb",
        //   icon: "http://haicang.wengetech.com:8082/haicang/img/wechat/18.jpg"
        // },
        // {
        //   name: "文明海沧",
        //   uid: "wenminghaicang",
        //   icon: "http://haicang.wengetech.com:8082/haicang/img/wechat/19.jpg"
        // }
      ],
      sina: [
        {
          name: "海沧发布",
          icon:
            "https://tva1.sinaimg.cn/crop.0.0.179.179.180/005zYPjUgw1etsrob45yhj3050050wer.jpg",
          src: "https://m.weibo.cn/u/5112332878?jumpfrom=weibocom"
        },
        {
          name: "厦门海沧公安",
          icon: "http://haicang.wengetech.com:8082/haicang/img/wechat/7.jpg",
          src: "https://m.weibo.cn/u/1875990202?jumpfrom=weibocom"
        },
        {
          name: "海沧法院",
          icon:
            "https://tva3.sinaimg.cn/crop.20.6.142.142.180/ebdcadc8tw1ec52zwqonhj2050050jrt.jpg?Expires=1564410335&ssig=MEVK%2FoD%2FKD&KID=imgbed,tva",
          src: "https://m.weibo.cn/u/3957108168?jumpfrom=weibocom"
        },
        {
          name: "海沧检察",
          icon: "http://haicang.wengetech.com:8082/haicang/img/wechat/2.jpg",
          src: "https://weibo.com/xmhcjc"
        }
      ],
      web: [
        {
          name: "海沧区政务网",
          icon: require("../../src/html/news/haicang_zhengwu/hc_zw.png"),
          src: "http://www.haicang.gov.cn/"
        },
        {
          name: "厦门网",
          icon: require("../assets/img/xiamenwang.jpg"),
          src: "http://www.xmnn.cn/"
        },
        {
          name: "新福建",
          icon: require("../assets/img/xinfujian.png"),
          src: "http://www.fjdaily.com/"
        },
        {
          name: "海博TV",
          icon: require("../assets/img/haiboTV.png"),
          src: "http://weixin.fjtv.net/"
        },
        {
          name: "东南网",
          icon: require("../assets/img/dongnanwang.jpg"),
          src: "http://www.fjsen.com/"
        },
        {
          name: "学习强国",
          icon: require("../assets/img/xuexiqiangguo.jpg"),
          src: "https://www.xuexi.cn/"
        }
      ],
      baisha_wechat: [
        {
          name: "白沙街坊",
          uid: "xmhcta",
          icon: require("../assets/img/baishajiefang.jpg")
        },
        {
          name: "白沙新闻在线",
          uid: "xmhcta",
          icon: require("../assets/img/baishanews.jpg")
        },
        {
          name: "白沙网",
          uid: "xmhcta",
          icon: require("../assets/img/baishawang.jpg")
        },
        // {
        //   name: "白沙溪",
        //   uid: "xmhcta",
        //   icon: require("../assets/img/baishaxi.jpg")
        // },
        {
          name: "白沙在线",
          uid: "xmhcta",
          icon: require("../assets/img/baishazaixian.jpg")
        },
        {
          name: "白沙县政府网站",
          uid: "xmhcta",
          icon: require("../assets/img/baishazhengfu.jpg")
        },
        {
          name: "白沙便民网",
          uid: "xmhcta",
          icon: require("../assets/img/bianminwang.jpg")
        },
        // {
        //   name: "健康白沙",
        //   uid: "xmhcta",
        //   icon: require("../assets/img/jiankangbaisha.jpg")
        // }
      ],
      baisha_sina: [
        {
          name: "白沙法院",
          icon: require("../assets/img/baishafayuan.jpg"),
          src:
            "https://m.weibo.cn/u/3926910066?is_all=1&is_all=1&jumpfrom=weibocom"
        },
        {
          name: "白沙共青团",
          icon: require("../assets/img/baishagongqingtuan.jpg"),
          src:
            "https://m.weibo.cn/u/2640438233?uid=2640438233&luicode=10000011&lfid=100103type%3D1%26q%3D%E7%99%BD%E6%B2%99%E5%85%B1%E9%9D%92%E5%9B%A2"
        },
        {
          name: "白沙县旅游",
          icon: require("../assets/img/baishalvyou.jpg"),
          src:
            "https://m.weibo.cn/u/5085600366?uid=5085600366&luicode=10000011&lfid=100103type%3D1%26q%3D%E7%99%BD%E6%B2%99%E5%8E%BF%E6%97%85%E6%B8%B8"
        },
        {
          name: "海南黎苗三月三",
          icon: require("../assets/img/limiao.jpg"),
          src:
            "https://m.weibo.cn/u/5084419211?uid=5084419211&luicode=10000011&lfid=100103type%3D1%26q%3D%E6%B5%B7%E5%8D%97%E9%BB%8E%E8%8B%97%E4%B8%89%E6%9C%88%E4%B8%89"
        }
      ],
      baisha_web: [
        {
          name: "白沙网",
          icon: require("../assets/img/baishanwang_pc.png"),
          src: "http://www.baisha.ccoo.cn/"
        },
        {
          name: "白沙县人民政府网",
          icon: require("../assets/img/baisha_zhengfu.png"),
          src: "http://baisha.hainan.gov.cn/baisha/index.html"
        },
        {
          name: "南海网",
          icon: require("../assets/img/nanhaiwang.png"),
          src: "http://m.hinews.cn/mobile/"
        }
      ],
      wanning_wechat: [
        {
          name: "万宁发布",
          uid: "xmhcta",
          icon: require("../assets/img/wanningfabu.jpg")
        },
        {
          name: "万宁公安",
          uid: "xmhcta",
          icon: require("../assets/img/wanninggongan.jpg")
        },
        {
          name: "万宁广播电视台",
          uid: "xmhcta",
          icon: require("../assets/img/wanningguanbodiantai.jpg")
        },
        {
          name: "万宁网",
          uid: "xmhcta",
          icon: require("../assets/img/wanningwang.jpg")
        },
        {
          name: "万宁在线",
          uid: "xmhcta",
          icon: require("../assets/img/wanningzaixian.jpg")
        }
      ],
      wanning_sina: [
        {
          name: "冲浪万宁",
          icon: require("../assets/img/chonglangwanning.png"),
          src:
            "https://m.weibo.cn/u/3068900723"
        },
        {
          name: "万宁发布",
          icon: require("../assets/img/wanningfabu2.jpg"),
          src:
            "https://m.weibo.cn/u/3840241905?uid=3840241905&luicode=10000011&lfid=100103type%3D1%26q%3D%E4%B8%87%E5%AE%81%E5%8F%91%E5%B8%83"
        },
        {
          name: "万宁法院",
          icon: require("../assets/img/wanningfayuan.jpg"),
          src:
            "https://m.weibo.cn/u/3934390205?uid=3934390205&luicode=10000011&lfid=100103type%3D1%26q%3D%E4%B8%87%E5%AE%81%E6%B3%95%E9%99%A2"
        },
        {
          name: "万宁公安消防大队",
          icon: require("../assets/img/wanninggonganxiaofangdadui.jpg"),
          src:
            "https://m.weibo.cn/u/2579357570?uid=2579357570&luicode=10000011&lfid=100103type%3D1%26q%3D%E4%B8%87%E5%AE%81%E5%85%AC%E5%AE%89%E6%B6%88%E9%98%B2%E5%A4%A7%E9%98%9F"
        }
      ],
      wanning_web: [
        {
          name: "万宁市人民政府网",
          icon: require("../assets/img/baisha_zhengfu.png"),
          src: "http://wanning.hainan.gov.cn/wanning/"
        },
        {
          name: "南海网",
          icon: require("../assets/img/nanhaiwang.png"),
          src: "http://m.hinews.cn/mobile/"
        }
      ],
      lingao_wechat: [
        {
          name: "万宁发布",
          uid: "xmhcta",
          icon: require("../assets/img/wanningfabu.jpg")
        },
        {
          name: "万宁公安",
          uid: "xmhcta",
          icon: require("../assets/img/wanninggongan.jpg")
        },
        {
          name: "万宁广播电视台",
          uid: "xmhcta",
          icon: require("../assets/img/wanningguanbodiantai.jpg")
        },
        {
          name: "万宁网",
          uid: "xmhcta",
          icon: require("../assets/img/wanningwang.jpg")
        },
        {
          name: "万宁在线",
          uid: "xmhcta",
          icon: require("../assets/img/wanningzaixian.jpg")
        }
      ],
      lingao_sina: [
        {
          name: "冲浪万宁",
          icon: require("../assets/img/chonglangwanning.png"),
          src:
            "https://m.weibo.cn/u/3068900723"
        },
        {
          name: "万宁发布",
          icon: require("../assets/img/wanningfabu2.jpg"),
          src:
            "https://m.weibo.cn/u/3840241905?uid=3840241905&luicode=10000011&lfid=100103type%3D1%26q%3D%E4%B8%87%E5%AE%81%E5%8F%91%E5%B8%83"
        },
        {
          name: "万宁法院",
          icon: require("../assets/img/wanningfayuan.jpg"),
          src:
            "https://m.weibo.cn/u/3934390205?uid=3934390205&luicode=10000011&lfid=100103type%3D1%26q%3D%E4%B8%87%E5%AE%81%E6%B3%95%E9%99%A2"
        },
        {
          name: "万宁公安消防大队",
          icon: require("../assets/img/wanninggonganxiaofangdadui.jpg"),
          src:
            "https://m.weibo.cn/u/2579357570?uid=2579357570&luicode=10000011&lfid=100103type%3D1%26q%3D%E4%B8%87%E5%AE%81%E5%85%AC%E5%AE%89%E6%B6%88%E9%98%B2%E5%A4%A7%E9%98%9F"
        }
      ],
      lingao_web: [
        {
          name: "万宁市人民政府网",
          icon: require("../assets/img/baisha_zhengfu.png"),
          src: "http://wanning.hainan.gov.cn/wanning/"
        },
        {
          name: "南海网",
          icon: require("../assets/img/nanhaiwang.png"),
          src: "http://m.hinews.cn/mobile/"
        }
      ]
    };
  }
};
</script>
<style scoped lang="less">
  header{
  background: @headerBg;
    .nvtt{
      font-size: .36rem;
      font-weight: 500;
     color:@headerColor;
    
    }
  }
.haicang_zhengwu {
  flex-wrap: wrap;
  > div {
    width: 48.7%;
    height: 150px;
    text-align: center;
    margin-bottom: 0.15rem;
    background: #333333;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    font-size: 0.3rem;
    color: #fff;
    border-radius: 0.1rem;
    .zhengwu_img {
      img {
        width: 1rem;
      }
      span {
        display: block;
        margin-top: 0.05rem;
      }
    }
    .zhengwu_btn {
      margin: 0 auto;
      padding: 0.1rem 0.4rem;
      border: 0.02rem solid #fff;
      background-color: rgba(0, 0, 0, 0.502);
      border-radius: 0.05rem;
      > span:nth-child(1) {
        color: #ffa201;
        font-size: 0.35rem;
      }
      > span:nth-child(2) {
        font-size: 0.3rem;
      }
    }
  }
  > div:nth-child(odd) {
    margin-right: 0.16rem;
  }
  > div:nth-child(1) {
    background: url("./navBottom/home/images/wechat.png");
    background-size: contain;
  }
  > div:nth-child(2) {
    background: url("./navBottom/home/images/sina.png");
    background-size: contain;
  }
  > div:nth-child(3) {
    background: url("./navBottom/home/images/web.png");
    background-size: contain;
  }
}

.ibox {
  margin-top: 0.2rem;
  background: #fff;
  padding: 0.3rem 0.24rem;
  h1 {
    font-size: 0.33rem;
    font-weight: 500;
  }
  .content {
    padding: 0;
    display: flex;
    flex-flow: wrap;
    .item {
      h3 {
        font-size: 0.27rem;
        margin-top: 0.1rem;
        font-weight: 500;
      }
      img {
        height: 0.8rem;
        // width: 0.6666rem;
        margin-top: 0.34rem;
        border-radius: 50%;
      }
      img.serviceBig {
        height: 0.5888rem;
      }
      flex: 0 0 25%;
      text-align: center;
      padding-bottom: 14px;
    }
  }
}
.ibox:nth-last-child(1) {
  margin-bottom: 7px;
}
.ibox {
  .content .item.wechat {
    img {
      height: 0.7rem;
      border-radius: 50%;
    }
    h3 {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      margin-left: 0.07rem;
      margin-right: 0.07rem;
    }
  }
}
.mint-tab-container-item .commonList{
  height: calc(100vh - 1rem) !important;
  overflow: auto;
  padding-top: 1.2rem  !important;
}
</style>


