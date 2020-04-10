<template>
  <div id="wechat">
    <header class="com_header headerNavFixed">
      <div class="nvbt iback" @click="apis.iback()"></div>
      <div class="nvtt">部门、镇（场）新媒体</div>
      <div class="nvbt iabout"></div>
    </header>

    <div class="scroll-wrapper contentNavFixed">
      <div class="ibox wechat">
        <div class="content">
          <!-- <a class="item" v-for="(item,index) in wechat" :key="index" @click="apis.urlParams(item.src,{'title':item.name},true)"> -->
          <a class="item" v-for="(item,index) in wechat" :key="index" @click="apis.urlParams('wechatItem',item,false)">
            <!-- <img :src="'http://wxservice.wengetech.com/wenhaiFt/picture/picTrans?picUrl='+item.icon" alt> -->
            <img :src="item.icon" alt>
            <h3>{{item.name}}</h3>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { webview } from "assets/js/webview";
import { fire } from "assets/js/utils";
import { indexMixin } from "assets/js/mixins";
import { mapActions } from "vuex";
// import { apis } from "assets/js/api";
export default {
  name: "wechat",
  data() {
    return {
      wechat: [
            {"name":"魅力青铜峡","icon":"http://qtx.wengetech.com:28086/wechatImg/meili_qtx.jpg"},
            {"name":"魅力小坝镇","icon":"http://qtx.wengetech.com:28086/wechatImg/meili_xiaobazhen.jpg"},
            {"name":"魅力大坝","icon":"http://qtx.wengetech.com:28086/wechatImg/meili_daba.jpg"},
            {"name":"青铜峡镇党建","icon":"http://qtx.wengetech.com:28086/wechatImg/qtx_zhendangjian.jpg"},
            {"name":"生态旅游小镇陈袁滩镇","icon":"http://qtx.wengetech.com:28086/wechatImg/shengtai_lvyou_xiaozhen.jpg"},
            {"name":"贡米之乡叶盛镇","icon":"http://qtx.wengetech.com:28086/wechatImg/gong_mi_zhi_xiang.jpg"},
            {"name":"邵岗镇","icon":"http://qtx.wengetech.com:28086/wechatImg/shaogangzhen.jpg"},
            {"name":"魅力峡口镇","icon":"http://qtx.wengetech.com:28086/wechatImg/meili_xiakouzhen.jpg"},
            {"name":"最美树新","icon":"http://qtx.wengetech.com:28086/wechatImg/zuimeishuxin.jpg"},
            {"name":"青铜峡市良繁场","icon":"http://qtx.wengetech.com:28086/wechatImg/qtx_shiliang_fanchang.jpg"},
            {"name":"青铜峡教育","icon":"http://qtx.wengetech.com:28086/wechatImg/qtx_jiaoyu.jpg"},
            {"name":"平安青铜峡","icon":"http://qtx.wengetech.com:28086/wechatImg/pingan_qtx.jpg"},
            {"name":"青铜峡市财政","icon":"http://qtx.wengetech.com:28086/wechatImg/qtx_caizheng.jpg"},
            {"name":"青铜峡市人力资源和社会保障局","icon":"http://qtx.wengetech.com:28086/wechatImg/qtx_reliziyuan_shehuibaozhang.jpg"},
            {"name":"古峡国土","icon":"http://qtx.wengetech.com:28086/wechatImg/gu_xia_guo_tu.jpg"},
            {"name":"青铜峡市住房和城乡建设局","icon":"http://qtx.wengetech.com:28086/wechatImg/qtx_zhufang_chengxiang_jiansheju.jpg"},
            {"name":"青铜峡交通运输局","icon":"http://qtx.wengetech.com:28086/wechatImg/qtx_jiaotongyunshuju.jpg"},
            {"name":"青铜峡农情","icon":"http://qtx.wengetech.com:28086/wechatImg/qtx_nongqing.jpg"},
            {"name":"人文青铜峡","icon":"http://qtx.wengetech.com:28086/wechatImg/renwen_qtx.jpg"},
            {"name":"青铜峡市市场监督管理局","icon":"http://qtx.wengetech.com:28086/wechatImg/qtx_shichang_jiandu_guanliju.jpg"},
            {"name":"青铜峡市安全生产监督管理局","icon":"http://qtx.wengetech.com:28086/wechatImg/qtx_anquan_shengchan_jiandu.jpg"},
            {"name":"青铜峡市旅游局","icon":"http://qtx.wengetech.com:28086/wechatImg/qtx_lvyouju.jpg"},
            {"name":"青铜峡市信访督办局","icon":"http://qtx.wengetech.com:28086/wechatImg/qtx_xinfang_dubanju.jpg"},
            {"name":"青铜峡市就业创业和人才服务局","icon":"http://qtx.wengetech.com:28086/wechatImg/qtx_jiuye_chuangye_rencaifuwu.jpg"},
            {"name":"魅力鸟岛","icon":"http://qtx.wengetech.com:28086/wechatImg/meili_niaodao.jpg"},
            {"name":"青铜峡市人民法院","icon":"http://qtx.wengetech.com:28086/wechatImg/qtx_renmin_fayuan.jpg"},
            {"name":"青铜峡检察","icon":"http://qtx.wengetech.com:28086/wechatImg/qtx_jiancha.jpg"},
            {"name":"青铜峡市房屋产权交易服务中心","icon":"http://qtx.wengetech.com:28086/wechatImg/qtx_fangwu_chanquan_jiaoyi.jpg"},
            {"name":"青铜峡扶贫","icon":"http://qtx.wengetech.com:28086/wechatImg/qtx_fupin.jpg"},
            {"name":"青铜峡市微科普","icon":"http://qtx.wengetech.com:28086/wechatImg/qtx_weikepu.jpg"},
            {"name":"青铜峡市市政管理服务中心","icon":"http://qtx.wengetech.com:28086/wechatImg/qtx_shizheng_guanli_fuwu.jpg"},
            {"name":"青铜峡市总工会","icon":"http://qtx.wengetech.com:28086/wechatImg/qtx_zonggonghui.jpg"},
            {"name":"书香古峡","icon":"http://qtx.wengetech.com:28086/wechatImg/shuxiang_guxia.jpg"},
            {"name":"青铜峡档案","icon":"http://qtx.wengetech.com:28086/wechatImg/qtx_dangan.jpg"},
            {"name":"青铜峡共青团","icon":"http://qtx.wengetech.com:28086/wechatImg/qtx_gongqingtuan.jpg"},
            {"name":"人文青铜峡","icon":"http://qtx.wengetech.com:28086/wechatImg/renwen_qtx.jpg"},
            {"name":"青铜峡党员教育 ","icon":"http://qtx.wengetech.com:28086/wechatImg/qtx_dangyuan_jiaoyu.jpg"},
            {"name":"青铜峡文物所 ","icon":"http://qtx.wengetech.com:28086/wechatImg/qtx_wenwusuo.jpg"},
            {"name":"青铜峡市污水处理中心 ","icon":"http://qtx.wengetech.com:28086/wechatImg/qtx_wushuichuli_zhongxin.jpg"},
            {"name":"青铜峡市水务局","icon":"http://qtx.wengetech.com:28086/wechatImg/qtx_shuiwuju.jpg"},
            {"name":"史志青铜峡","icon":"http://qtx.wengetech.com:28086/wechatImg/shizhi_qtx.jpg"},
            {"name":"青铜峡市审计局","icon":"http://qtx.wengetech.com:28086/wechatImg/qtx_shenjiju.jpg"},
            {"name":"青铜峡市社会保险事业管理局","icon":"http://qtx.wengetech.com:28086/wechatImg/qtx_shehuibaoxian_shiye_guanli.jpg"},
            {"name":"古峡清风","icon":"http://qtx.wengetech.com:28086/wechatImg/guxia_qingfeng.jpg"},    
            {"name":"青铜峡市妇联","icon":"http://qtx.wengetech.com:28086/wechatImg/qtx_fulian.jpg"},
            {"name":"青铜峡市残疾人联合会","icon":"http://qtx.wengetech.com:28086/wechatImg/qtx_canjiren_lianhehui.jpg"},
            {"name":"青铜峡市裕民街道紫薇社区","icon":"http://qtx.wengetech.com:28086/wechatImg/qtx_yumin_ziwei.jpg"},
            {"name":"青铜峡市裕民街道银河社区","icon":"http://qtx.wengetech.com:28086/wechatImg/qtx_yumin_yinhe.jpg"},
            {"name":"青铜峡市裕民街道怡园社区s","icon":"http://qtx.wengetech.com:28086/wechatImg/qtx_yumin_yiyuan.jpg"},
            {"name":"青铜峡市裕民街道唐源社区","icon":"http://qtx.wengetech.com:28086/wechatImg/qtx_yumin_tangyuan.jpg"},
            {"name":"青铜峡市裕民街道南苑社区s","icon":"http://qtx.wengetech.com:28086/wechatImg/qtx_yumin_nanyuan.jpg"},
            {"name":"青铜峡市裕民街道惠源社区","icon":"http://qtx.wengetech.com:28086/wechatImg/qtx_yumin_huiyuan.jpg"},
            {"name":"青铜峡市裕民街道东街社区","icon":"http://qtx.wengetech.com:28086/wechatImg/qtx_yumin_dongjie.jpg"},
            {"name":"青铜峡市裕民街道北苑社区","icon":"http://qtx.wengetech.com:28086/wechatImg/qtx_yumin_beiyuan.jpg"},
            {"name":"青铜峡市文化馆","icon":"http://qtx.wengetech.com:28086/wechatImg/qtx_wenhua.jpg"},
            {"name":"青铜峡司法局","icon":"http://qtx.wengetech.com:28086/wechatImg/qtx_sifaju.jpg"},
            {"name":"青铜峡市供销合作社","icon":"http://qtx.wengetech.com:28086/wechatImg/qtx_gongxiao_hezuoshe.jpg"},
            {"name":"青铜峡市城市管理综合执法大队","icon":"http://qtx.wengetech.com:28086/wechatImg/qtx_chengshi_guanli.jpg"},
            {"name":"青铜峡气象","icon":"http://qtx.wengetech.com:28086/wechatImg/qtx_qixiangju.jpg"},
            {"name":"健康青铜峡","icon":"http://qtx.wengetech.com:28086/wechatImg/jiankang_qtx.jpg"},
            {"name":"青铜峡市供水","icon":"http://qtx.wengetech.com:28086/wechatImg/qtx_gongshui.jpg"},
            {"name":"青铜峡市环境保护局","icon":"http://qtx.wengetech.com:28086/wechatImg/qtx_huanbao.jpg"},
            {"name":"青铜峡市民政局","icon":"http://qtx.wengetech.com:28086/wechatImg/qtx_minzheng.jpg"},
            {"name":"青铜峡市工业信息化和商务局","icon":"http://qtx.wengetech.com:28086/wechatImg/qtx_xinxihua_shangwu.jpg"},
            {"name":"青铜峡市发展和改革局","icon":"http://qtx.wengetech.com:28086/wechatImg/qtx_fazhan_gaige.jpg"},
            {"name":"青铜峡市裕民街道","icon":"http://qtx.wengetech.com:28086/wechatImg/qtx_yumin.jpg"},
            {"name":"青铜峡市瞿靖镇","icon":"http://qtx.wengetech.com:28086/wechatImg/qtx_qujing.jpg"},
            {"name":"青铜峡林业","icon":"http://qtx.wengetech.com:28086/wechatImg/qtx_linye.jpg"},
            {"name":"青铜峡市房产交易和不动产登记", "icon":"http://qtx.wengetech.com:28086/wechatImg/qtx_fangchan.jpg"},
            {"name":"青铜峡市建设工程质量监督站", "icon":"http://qtx.wengetech.com:28086/wechatImg/qtx_jianshe_jiandu.jpg"},
        ]
    };
  },
  components: {},
  created() {
  },
  methods: {

  }
};
</script>
<style lang="less" scoped>
#wechat {
  .com_contentNavFixed{
    height:calc(100vh - 50px)
  }
//   height: 100%;
  background: #fff;
  .content {
    position: relative;
    width: 100%;
    height: 100%;
    padding-top: 1.335rem;
  }
  .content.isIOS {
    padding-top: 1.87rem;
    padding-top: 1.335rem;
  }
  // .com_header {
  //   width: 100%;
  //   height: 50px;
  //   background: @dominantColor;
  //   text-align: center;
  //   display: flex;
  //   align-items: center;
  //   position: relative;
  //   position: fixed;
  //   z-index: 111;
  //   justify-content: center;
  //   align-items: center;
  //   padding: 0.17rem 0;
  //   color: #ffffff;
  //   font-weight: 700;
  // }
  .scroll-wrapper {
    -webkit-overflow-scrolling: touch;
    overflow: scroll;
    // height: 100%;
    // padding-top: 1rem;
  }
  font-size: 14px;
  .ibox {
    // margin-top: 10px;
    background: #fff;
    padding: 0.3rem 0.24rem;
    h1 {
      font-size: 0.33rem;
      font-weight: 500
    }
    .content {
      padding: 0;
      display: flex;
      flex-flow: wrap;
      .item {
        h3 {
          font-size: 0.27rem;
          margin-top: 0.1rem;
          font-weight:500
        }
        img {
          height: 0.8rem;
          // width: 0.6666rem;
          margin-top: 0.34rem;
        }
        flex: 0 0 25%;
        text-align: center;
        padding-bottom: 14px
      }
    }
  }
  .ibox:nth-last-child(1) {
    // margin-bottom: 7px;
  }
  .ibox.wechat {
    .content .item {
      img {
        height: 0.96rem;
        border-radius: 50%;
      }
      h3 {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        // max-height: 5.6em;
        margin-left: 0.07rem;
        margin-right: 0.07rem;
      }
    }
  }
}
</style>
