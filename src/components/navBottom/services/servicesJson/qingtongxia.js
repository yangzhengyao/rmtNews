const servicesJson = {
  banner: [
    {
      icon: require("../images/2_03.png"),
      name: "红旗之声",
      src: "zhisheng",
      marker: false
    },
    {
      icon: require("../images/2_05.png"),
      name: "融媒直播",
      src: "zhibo",
      marker: false
    },
    {
      icon: require("../images/2_07.png"),
      name: "读报",
      src: "dubao",
      marker: false
    },
    // 市民云
    {
      icon: require("../images/2_09.png"),
      name: "融媒矩阵",
      src: "shiminyun",
      marker: false
    },
    {
      icon: require("../images/2_15.png"),
      name: "报料",
      src: "tipOff",
      marker: false
    },
    // 报料
    {
      icon: require("../images/2_16.png"),
      name: "搭把手",
      src: "tipOff",
      marker: false
    },
    // 报料
    {
      icon: require("../images/2_17.png"),
      name: "红旗文旅",
      src: "tipOff",
      marker: false
    },
    // 报料
    {
      icon: require("../images/2_18.png"),
      name: "志愿者招募",
      src: "activitylist",
      marker: false
    },
  ],
  banner2: [
    // 微社区
    {
      icon: require("../images/2_23.png"),
      name: "老家社区",
      src: "community",
      marker: false
    },
    {
      icon: require("../images/2_24.png"),
      name: "积分商城",
      src: "jifen",
      marker: false
    },
    {
      icon: require("../images/2_25.png"),
      name: "农民工之家",
      src: "tipOff",
      marker: false
    }
  ],
  dataAI: [
    {
      icon: require("../images/jiqi.png"),
      namecont: "新闻机器人",
      path: "service/tianqi",
      menu: "Robot"
    }
  ],
  zhengwu: [
    {
      icon: require("../images/sjszxx.png"),
      name: "地方领导留言",
      src: "http://liuyan.people.com.cn/forum/list?fid=44",
      marker: true
    },
    {
      icon: require("../images/xinxiang.png"),
      name: "市长信箱",
      src: "http://www.qtx.gov.cn/hdjl/sjxx/",
      marker: true
    },
    {
      icon: require("../images/nxzwfww.png"),
      name: "市政务<br>服务中心",
      src: "http://zwfw.nx.gov.cn/qtx/",
      marker: true
    },
    {
      icon: require("../images/12345.png"),
      name: "12345热线",
      src: "http://zwfw.nx.gov.cn/qtx/",
      marker: true
    },
    // {
    //   icon: require("../images/qa.png"),
    //   name: "问政",
    //   src: "certificate",
    //   marker: false
    // },
  ],
  wechat: [
    {
      uid: "paqtx110",
      name: "平安青铜峡",
      icon: "http://qtx.wengetech.com:28086/wechatImg/pingan_qtx.jpg",
      description: "宁夏青铜峡市公安局官方微信"
    },
    {
      uid: "qtxsgz",
      name: "邵岗镇",
      icon: "http://qtx.wengetech.com:28086/wechatImg/shaogangzhen.jpg",
      description:
        "邵岗镇政务信息公开,政策解读,意见留言;传播邵岗镇大事小事,宣传党的政策方针."
    },
    {
      uid: "gh_0b8405c4cfa5",
      name: "魅力小坝镇",
      icon: "http://qtx.wengetech.com:28086/wechatImg/meili_xiaobazhen.jpg",
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
      icon: require("../images/ysqtx.png"),
      name: "云上青铜峡",
      src: ""
    },
    {
      icon: require("../images/mlqtx.png"),
      name: "魅力青铜峡",
      src:
        "http://mp.weixin.qq.com/profile?src=3&timestamp=1546316203&ver=1&signature=k11RREli6IT1P8lSoTkdlPXkocK2XJdjgl8IwUGL3VbSAMXp5CapN0wphpZ-C053NgIwqd8dPWNegkIRQHujfQ=="
    },
    {
      icon: require("../images/jrqtx.png"),
      name: "今日青铜峡",
      src: "https://weibo.com/u/6529818376"
    },
    {
      icon: require("../images/qtxzww.png"),
      name: "青铜峡政务网",
      src: "http://www.qtx.gov.cn/"
    },
    {
      icon: require("../images/qtxdst.png"),
      name: "青铜峡电视台",
      src:
        "http://qtxzb.nxdzsh.com/live/tvchat-745539?shareuid=0&v=1530758972117&stamp=636807451859102452"
    },
    {
      icon: require("../images/yjgbxt.png"),
      name: "应急广播系统",
      src: "https://m.qingting.fm/channels/386/from/20190827203000"
    },
    {
      icon: require("../images/douyin.png"),
      name: "活力青铜峡",
      src: "http://v.douyin.com/2tb94J/"
    }
  ],
  convenient: [
    {
      icon: require("../images/yjy.png"),
      name: "青铜峡影剧院",
      src: "http://www.nx165.com/index.php?g=Wap&m=Index&a=index&token=zujbgd1483500856"
    },
    {
      icon: require("../images/yy.png"),
      name: "青铜峡<br>演艺公司",
      src: "http://www.nx165.com/index.php?g=Wap&m=Index&a=index&token=nccljn1494920340&wecha_id=0"
    },
    // {
    //   icon: require("../images/yiyuan.png"),
    //   name: "青铜峡市<br>人民医院",
    //   src: "https://c.quyiyuan.com/c_quyiyuan_web/system/c_quyiyuan/index.jsp?wx_forward=appointment&userSource=0&PublicServiceType=020468&skinType=1&hospitalID=9530002#/appointment"
    // },
    {
      icon: require("../images/yygh.png"),
      name: "预约挂号",
      src: "http://wapyyk.39.net/nxhzzzq/"
    },
    // {
    //   icon: require("../images/sj.png"),
    //   name: "手机话费",
    //   src: "https://life.baifubao.com/sj?channel_no=CHF1000002"
    // },
    {
      icon: require("../images/yidong.png"),
      name: "中国移动缴费",
      src: "https://touch.10086.cn/i/mobile/rechargecredit.html"
    },
    {
      icon: require("../images/liantong.png"),
      name: "中国联通缴费",
      src: "http://upay.10010.com/npfwap/npfMobWap/bankcharge/index.html"
    },
    {
      icon: require("../images/dianxin.png"),
      name: "中国电信缴费",
      src: "http://yn.189.cn/WechatWeb/yn/fee/wxjf.jsp"
    },
    // {
    //   icon: require("../images/yxds.png"),
    //   name: "有线电视",
    //   src: "https://www.xiao4r.com.cn/pay/to_query/CableTv-"
    // },
    {
      icon: require("../images/trq.png"),
      name: "天然气",
      src: "http://www.xiao4r.com.cn/pay/to_query/Gas-"
    },
    {
      icon: require("../images/sf.png"),
      name: "水费",
      src: "https://www.xiao4r.com.cn/pay/to_query/TapWater-"
    },
    
    {
      icon: require("../images/wz.png"),
      name: "违章查询",
      src: "https://m.weizhang8.cn"
    },
    
    {
      icon: require("../images/gjjjcx.png"),
      name: "公积金查询",
      src:
        "http://www.nxgjj.com.cn/list_gjjcx.jsp?urltype=tree.TreeTempUrl&wbtreeid=1022"
    },
    {
      icon: require("../images/kdcx.png"),
      name: "快递查询",
      src: "http://www.guoguo-app.com"
    },
    {
      icon: require("../images/tqyb.png"),
      name: "天气预报",
      src: "http://wx.weather.com.cn/mweather/101170306.shtml#1"
    },
    {
      icon: require("../images/gjcx.png"),
      name: "公交查询",
      src: "http://bus.mapbar.com/wuzhong/"
    },
    {
      icon: require("../images/cjjcx.png"),
      name: "成绩查询",
      src: "http://score.nxpta.gov.cn/chengjichaxun/wap/"
    },
    {
      icon: require("../images/jdyd.png"),
      name: "酒店预订",
      src: "http://touch.qunar.com/hotel/index"
    },
    {
      icon: require("../images/nxly.png"),
      name: "宁夏旅游",
      // src: "http://www.mafengwo.cn/travel-scenic-spot/mafengwo/12931.html"
      src: "http://www.nxzhly.com"
    },
    
    // {
    //   icon: require("../images/sslk.png"),
    //   name: "实时路况",
    //   src: "https://m.weibo.cn/u/5657312575?jumpfrom=weibocom"
    // },
    {
      icon: require("../images/hbcx.png"),
      name: "航班查询",
      src: "https://touch.qunar.com/h5/flight/?bd_source=3w"
    },
    {
      icon: require("../images/bccx.png"),
      name: "班车查询",
      src: "https://m.keyunzhan.com/b-%E5%90%B4%E5%BF%A0-%E9%93%B6%E5%B7%9D/"
    },
    {
      icon: require("../images/lcsk.png"),
      name: "列车时刻",
      src: "http://touch.train.qunar.com/?bd_source=qunar"
    }
    
    // {
    //   icon: require("../images/more.png"),
    //   name: "更多",
    //   src: "",
    //   menu: "more"
    // },
  ],
  eCommerce: [
    {
      icon: require("../images/onlineretailers.png"),
      name: "青铜峡<br>电商孵化园",
      src: "http://www.qtxdzsw.com"
    },
    {
      icon: require("../images/qtxptj.png"),
      name: "青铜峡葡萄酒<br>官方旗舰店",
      src: "https://shop.m.jd.com/?shopId=780774"
    },
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
      icon: require("../images/mt.png"),
      name: "美团",
      src: "https://wuzhong.meituan.com"
    }
  ],
  tv: [
    {
      icon: require("../images/yxds.png"),
      name: "网络电视",
      src: "http://m.miguvideo.com/wap/resource/migu/live/live-list.jsp"
    }
  ]
};
export default servicesJson;
