const servicesJson = {
      dataAI: [
        {
          icon: require("../images/jiqi.png"),
          namecont: "新闻机器人",
          path: "service/tianqi",
          menu: "Robot"
        },
      ],
      xinxi:[
        // {
        //   icon: require("../images/hc_zhudong.png"),
        //   name: "主动信息",
        //   path: "",
        // },
        // {
        //   icon: require("../images/hc_zhengfu.png"),
        //   name: "政府信息",
        //   path: "",
        // },
      ],
      hudong:[
        // {
        //   icon: require("../images/hc_diaocha.png"),
        //   name: "网上调查",
        //   path: "",
        //   marker: true
        // },
        // {
        //   icon: require("../images/hc_minyi.png"),
        //   name: "民意征集",
        //   path: "",
        //   marker: true
        // },
        // {
        //   icon: require("../images/hc_zixun.png"),
        //   name: "咨询投诉",
        //   path: "",
        //   marker: true
        // },
        // {
        //   icon: require("../images/hc_fangtan.png"),
        //   name: "在线访谈",
        //   path: "",
        //   marker: true
        // },
        {
          icon: require("../images/hc_baoliao.png"),
          name: "网民报料",
          path: "tipOff",
          marker: false
        },
        {
          icon: require("../images/hc_gonggao.png"),
          name: "老年大学",
          path: "moreListItem",
          marker: false,
          uuid:'5d776c34e4b0e2963a408ec2'
        },
      ],
      baike:[
        // {
        //   icon: require("../images/hc_baike.png"),
        //   name: "海沧百科",
        //   path: "",
        // }
      ],
      // 交通出行
      jiaotong:[
        {
          icon: require("../images/wz.png"),
          name: "违章查询",
          path: "https://fw.kaipuyun.cn/servicePage?serviceName=infraction&cityID=350000&clientID=123qwe&localFrom=xinhuashe_app",
        },
        {
          icon: require("../images/lcsk.png"),
          name: "列车时刻",
          path: "https://trains.ctrip.com/TrainBooking/SearchTrain.aspx?&mkt_header=bdkx&allianceID=106225&sid=550027&ouid=0-alading_tit-###",
        },
        {
          icon: require("../images/hbcx.png"),
          name: "航班查询",
          path: "https://flights.ctrip.com/?mkt_header=bdnm&allianceid=863417&sid=1580220",
        },
        {
          icon: require("../images/bccx.png"),
          name: "班车查询",
          path: "https://xiamen.changtu.com/",
        },
        {
          icon: require("../images/hc_lundu.png"),
          name: "轮渡查询",
          path: "https://m.huoche.net/matou-%E5%8E%A6%E9%97%A8%E8%BD%AE%E6%B8%A1%E7%A0%81%E5%A4%B4/",
        },
        {
          icon: require("../images/gjcx.png"),
          name: "公交查询",
          path: "https://xiamen.8684.cn/",
        }
      ],
      // 生活缴费
      shenghuo:[
        {
          icon: require("../images/yidong.png"),
          name: "移动缴费",
          path: "https://market.m.taobao.com/apps/recharge/home/home.html?utparam=%7B%22ranger_buckets_native%22%3A%225555_3151%22%7D&spm=a215s.7406091.icons.6&scm=2019.1.2.1003&subSource=stcz_1",
        },
        {
          icon: require("../images/dianxin.png"),
          name: "电信缴费",
          path: "https://market.m.taobao.com/apps/recharge/home/home.html?utparam=%7B%22ranger_buckets_native%22%3A%225555_3151%22%7D&spm=a215s.7406091.icons.6&scm=2019.1.2.1003&subSource=stcz_1",
        },
        {
          icon: require("../images/liantong.png"),
          name: "联通缴费",
          path: "https://market.m.taobao.com/apps/recharge/home/home.html?utparam=%7B%22ranger_buckets_native%22%3A%225555_3151%22%7D&spm=a215s.7406091.icons.6&scm=2019.1.2.1003&subSource=stcz_1",
        },
        {
          icon: require("../images/sf.png"),
          name: "水费",
          path: "http://218.85.130.185:8000/Home/SearchWater?nsukey=lojFlvJppgdrr1KMAn5aUwM0IbFNA%2FFF3z75yYg37%2FzlSZSzI9X7KBmLCruA%2BF3kOkC89TGLe6JzCCtXhZHujQCKwmHyM79moUb2GP53xteByfzpyhgeErITPo%2Blb726UxcvWULdCDS%2BANhSxWaNqL6yup50ox2Ckp7%2B8wDje43AIY4scuT4SX5vXB6JpWRZt5nVRziFEtIIzpkfGzasXw%3D%3D",
        },
        {
          icon: require("../images/hc_df.png"),
          name: "电费",
          path: "http://www.95598.cn/member/login.shtml?%a0%9d%97hZd%60%60dcZ%9a%97%9br%8c%9f%90%82%8c%a4Z%9b%8c%a4Q%9b%8c%9d%9fy%9ah%7bx%5b%5d%5b%5b%5d%5b%5b%5c=",
        },
        {
          icon: require("../images/trq.png"),
          name: "燃气费",
          path: "http://service.crcgas.com.cn/ec_obh_site/account/login.html?backUrl=%2Fmygasuse%2FshowMygasUse%3Ftype%3D03",
        },
        {
          icon: require("../images/hc_kuandai.png"),
          name: "宽带缴费",
          path: "https://h5.m.taobao.com/app/cz/combine/index.html?spm=a2141.8277929.1.2&subSource=%24%24tb_weex_card_icon%24%24stcz_1&navbars=2",
        },
        {
          icon: require("../images/hc_gdwl.png"),
          name: "广电网络",
          path: "http://www.xmgd.com/",
        }
      ],
      // 医疗预约
      yiliao:[
        {
          icon: require("../images/hc_yiyuan.png"),
          name: "海沧医院",
          path: "http://haicang.hxmyw.net/",
        },
        {
          icon: require("../images/hc_changgeng.png"),
          name: "长庚医院",
          path: "http://www.cgmh.com.cn/",
        },
        {
          icon: require("../images/yygh.png"),
          name: "医疗机构查询",
          path: "http://www.gov.cn/fuwu/bmfw/wjwyljgcx/index.html",
        }
      ],
      // 便民查询
      binamin:[
        {
          icon: require("../images/huafeichongzhi.png"),
          name: "手机充值",
          path: "https://ebppprod.alipay.com/recharge/recharge.htm",
        },
        {
          icon: require("../images/sf.png"),
          name: "水费",
          path: "https://bianmin.chinapay.com/SCWeb/vfive/type/change?bizType=1001",
        },
        {
          icon: require("../images/hc_df.png"),
          name: "电费",
          path: "https://jiaofei.alipay.com/fare/ebppChargeEntering.htm?chargeType=water&province=%B1%B1%BE%A9&city=%B1%B1%BE%A9",
        },
        {
          icon: require("../images/trq.png"),
          name: "燃气费",
          path: "https://jiaofei.alipay.com/fare/ebppChargeEntering.htm?chargeType=water&province=%B1%B1%BE%A9&city=%B1%B1%BE%A9",
        },
        {
          icon: require("../images/hc_dsjf.png"),
          name: "有线电视缴费",
          path: "https://jiaofei.alipay.com/fare/ebppChargeEntering.htm?chargeType=catv",
        },
        {
          icon: require("../images/gjjjcx.png"),
          name: "公积金查询",
          path: "http://222.76.242.141:6003/gjj-grwt/",
        },
        {
          icon: require("../images/shebao.png"),
          name: "社保查询",
          path: "https://app.xmhrss.gov.cn/ggfwwt-auth/loginperson?ReturnURL=http%253A%252F%252Fapp.xmhrss.gov.cn%253A80%252Fggfwwt-person%252Fperson%252Fhome",
        },
        {
          icon: require("../images/kdcx.png"),
          name: "快递查询",
          path: "https://m.kuaidi100.com/index.jsp?from=openv",
        },
        {
          icon: require("../images/hc_xueli.png"),
          name: "学历证书",
          path: "https://fw.kaipuyun.cn/servicePage?serviceName=education&cityID=350000&clientID=123qwe&localFrom=xinhuashe_app",
        },
        {
          icon: require("../images/tianqi.png"),
          name: "天气预报",
          path: "http://wx.weather.com.cn/mweather/101230204.shtml#1",
        },
        {
          icon: require("../images/jdyd.png"),
          name: "酒店预订",
          path: "https://h5.m.taobao.com/trip/hotel/search/index.html?spm=181.7474825.entry.d2&ttid=seo.000000358&_projVer=1.1.35#/",
        }
      ],
      // 信用
      xinyong:[
        {
          icon: require("../images/hc_shangwu.png"),
          name: "商务行政法规查询",
          path: "http://swj.xm.gov.cn/",
        },
        {
          icon: require("../images/hc_tongyi.png"),
          name: "统一社会信用代码查询",
          path: "https://fw.kaipuyun.cn/servicePage?serviceName=code&cityID=350000&clientID=123qwe&localFrom=xinhuashe_app",
        },
        {
          icon: require("../images/hc_qiye.png"),
          name: "企业经营异常名录",
          path: "http://www.gsxt.gov.cn/index.html",
        },
        {
          icon: require("../images/hc_shixin.png"),
          name: "失信被执行人查询",
          path: "https://fw.kaipuyun.cn/servicePage?serviceName=lostTrusteeInquiry&cityID=350000&clientID=123qwe&localFrom=xinhuashe_app",
        }
      ],
      // 投诉
      tousu:[
        {
          icon: require("../images/hc_12315.png"),
          name: "全国12315<br>互联网平台查询",
          path: "http://www.12315.cn/",
        },
        {
          icon: require("../images/hc_ljdx.png"),
          name: "举报垃圾短信",
          path: "https://fw.kaipuyun.cn/servicePage?serviceName=unhealthyReportMessage&cityID=350000&clientID=123qwe&localFrom=xinhuashe_app",
        },
        {
          icon: require("../images/hc_zpdh.png"),
          name: "举报诈骗电话",
          path: "https://fw.kaipuyun.cn/servicePage?serviceName=unhealthySwindlePhone&cityID=350000&clientID=123qwe&localFrom=xinhuashe_app",
        },
        {
          icon: require("../images/hc_srdh.png"),
          name: "举报骚扰电话",
          path: "https://m.12321.cn/harass",
        },
        {
          icon: require("../images/hc_web.png"),
          name: "举报网站",
          path: "https://m.12321.cn/web",
        },
        {
          icon: require("../images/hc_grxxxl.png"),
          name: "举报个人信息泄露",
          path: "https://fw.kaipuyun.cn/servicePage?serviceName=unhealthyPersonInfo&cityID=350000&clientID=123qwe&localFrom=xinhuashe_app",
        },
        {
          icon: require("../images/hc_lyxl.png"),
          name: "旅游投诉",
          path: "https://fw.kaipuyun.cn/servicePage?serviceName=tourism&cityID=350000&clientID=123qwe&localFrom=xinhuashe_app",
        },
      ],
      wechat: [
        {
          uid: "paqtx110",
          name: "平安青铜峡",
          icon:
            "http://qtx.wengetech.com:28086/wechatImg/pingan_qtx.jpg",
          description: "宁夏青铜峡市公安局官方微信"
        },
        {
          uid: "qtxsgz",
          name: "邵岗镇",
          icon:
            "http://qtx.wengetech.com:28086/wechatImg/shaogangzhen.jpg",
          description:
            "邵岗镇政务信息公开,政策解读,意见留言;传播邵岗镇大事小事,宣传党的政策方针."
        },
        {
          uid: "gh_0b8405c4cfa5",
          name: "魅力小坝镇",
          icon:
            "http://qtx.wengetech.com:28086/wechatImg/meili_xiaobazhen.jpg",
          description:
            "发布政务信息,积极宣传党和政府的惠民惠农政策,坚持问政于民、问需于民、问计于民,增进党群干群感情,建设公共服务型乡镇政府."
        },
          
        {
          icon: require("../images/more.png"),
          name: "更多"
        }
      ],
      jiuquyun: [
        {
          icon:  require("../images/ysqtx.png"),
          name: "云上青铜峡",
          src: ""
        },
        {
          icon: require("../images/mlqtx.png"),
          name: "魅力青铜峡",
          src: "http://mp.weixin.qq.com/profile?src=3&timestamp=1546316203&ver=1&signature=k11RREli6IT1P8lSoTkdlPXkocK2XJdjgl8IwUGL3VbSAMXp5CapN0wphpZ-C053NgIwqd8dPWNegkIRQHujfQ=="
        },
        {
          icon: require("../images/jrqtx.png"),
          name: "今日青铜峡",
          src: "https://weibo.com/u/6529818376"
        },
        {
          icon:  require("../images/qtxzww.png"),
          name: "青铜峡政务网",
          src: "http://www.qtx.gov.cn/"
        },
        {
          icon: require("../images/qtxdst.png"),
          name: "青铜峡电视台",
          src:"http://qtxzb.nxdzsh.com/live/tvchat-745539?shareuid=0&v=1530758972117&stamp=636807451859102452"
        },
        {
          icon:  require("../images/yjgbxt.png"),
          name: "应急广播系统",
          src: ""
        },
        {
          icon:  require("../images/douyin.png"),
          name: "活力青铜峡",
          src: "http://v.douyin.com/2tb94J/"
        }
      ],
      convenient: [
        // {
        //   icon: require("../images/xiehe.png"),
        //   name: "厦门市<br>海沧医院",
        //   src: "http://www.xmhcyy.com/"
        // },
        // {
        //   icon: require("../images/yygh.png"),
        //   name: "厦门市<br>预约挂号",
        //   src: "http://wapyyk.39.net/xiamen/"
        // },
        // {
        //   icon: require("../images/yidong.png"),
        //   name: "中国移动缴费",
        //   src: "https://touch.10086.cn/i/mobile/rechargecredit.html"
        // },
        // {
        //   icon: require("../images/liantong.png"),
        //   name: "中国联通缴费",
        //   src: "http://upay.10010.com/npfwap/npfMobWap/bankcharge/index.html"
        // },
        // {
        //   icon: require("../images/dianxin.png"),
        //   name: "中国电信缴费",
        //   src: "http://yn.189.cn/WechatWeb/yn/fee/wxjf.jsp"
        // },
        // {
        //   icon: require("../images/wz.png"),
        //   name: "违章查询",
        //   src: "https://m.weizhang8.cn"
        // },
        // {
        //   icon: require("../images/gjjjcx.png"),
        //   name: "公积金查询",
        //   src:
        //     "http://gjj.xm.gov.cn/"
        // },
        // {
        //   icon: require("../images/kdcx.png"),
        //   name: "快递查询",
        //   src: "http://m.kuaidi100.com/index.jsp?from=openv"
        // },
        // {
        //   icon: require("../images/tqyb.png"),
        //   name: "天气预报",
        //   src: "https://baidu.weather.com.cn/mweather/101230201.shtml"
        // },
        // {
        //   icon: require("../images/gjcx.png"),
        //   name: "公交查询",
        //   src: "http://mbus.mapbar.com/xiamen"
        // },
        // {
        //   icon: require("../images/jdyd.png"),
        //   name: "酒店预订",
        //   src: "http://touch.qunar.com/hotel/index"
        // },
        // {
        //   icon: require("../images/hbcx.png"),
        //   name: "航班查询",
        //   src: "https://touch.qunar.com/h5/flight/?bd_source=3w"
        // },
        // {
        //   icon: require("../images/bccx.png"),
        //   name: "班车查询",
        //   src: "http://mbus.mapbar.com/chaoyang"
        // },
        // {
        //   icon: require("../images/lcsk.png"),
        //   name: "列车时刻",
        //   src: "http://touch.train.qunar.com/?bd_source=qunar"
        // }
      ],
      zhengwu: [
        {
          icon: require("../images/sjszxx.png"),
          name: "办事大厅",
          src: "http://xm.fjbs.gov.cn/",
          marker: true
        },
        {
          icon: require("../images/nxzwfww.png"),
          name: "海沧政务<br>服务中心",
          src: "http://www.haicang.gov.cn/fw/",
          marker: true
        },
        {
          icon: require("../images/hc_zhinan.png"),
          name: "办事指南", 
          src: "http://qzqd.xm.gov.cn/api/mobile/index.xhtml",
          marker: true
        },
        // {
        //   icon: require("../images/hc_banshi.png"),
        //   name: "办事预约", 
        //   src: "",
        //   marker: true
        // },
        {
          icon: require("../images/hc_ditu.png"),
          name: "办事地图", 
          src: "http://weixin.haicang.gov.cn/weixin2.php/Governmentservices/map.html?type=12",
          marker: true
        },
        {
          icon: require("../images/qa.png"),
          name: "问政", 
          src: "certificate",
          marker: false
        },
      ],
      eCommerce: [
        {
          icon: require("../images/jd.png"),
          name: "京东",
          src: "https://www.jd.com"
        },
        {
          icon: require("../images/taobao.png"),
          name: "淘宝",
          src: "https://www.taobao.com"
        },
        {
          icon: require("../images/vip.png"),
          name: "唯品会",
          src: "https://www.vip.com"
        },
        {
          icon: require("../images/elma.png"),
          name: "饿了么",
          src: "https://h5.ele.me/"
        },
        {
          icon: require("../images/mt.png"),
          name: "美团",
          src: "https://wuzhong.meituan.com"
        },
        {
          icon: require('../images/dazhong.jpg'),
          name: "大众点评",
          src : 'https://m.dianping.com/'
        }
      ],
      tv: [
        {
          icon: require("../images/yxds.png"),
          name: "网络电视",
          src: "http://m.miguvideo.com/wap/resource/migu/live/live-list.jsp"
        }
      ]
}
export default servicesJson;