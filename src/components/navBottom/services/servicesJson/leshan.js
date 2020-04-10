const servicesJson = {
  banner: [
    {
      icon: require("../images/dubao.png"),
      name: "读报",
      src: "http://u.eqxiu.com/s/aHtigaCR?from=singlemessage&isappinstalled=0",
      marker: true
    },
    {
      icon: require("../images/banner_jiqi.png"),
      name: "新闻机器人",
      src: "Robot",
      marker: "Robot"
    },
    {
      icon: require("../images/rongmeizhibo.png"),
      name: "融媒直播",
      src: "https://live.xinhuaapp.com/xcy/userhome.html?orgId=149567794337639",
      marker: true
    },
    {
      icon: require("../images/2_15.png"),
      name: "报料",
      src: "tipOff",
      marker: false
    },
    {
      icon: require("../images/leshanzhixin.png"),
      name: "乐山之声",
      src: "https://www.qingting.fm/radios/1122/",
      marker: true
    },
    
    // 市民云
    
    
    // {
    //   icon: require("../images/leshanfucai.png"),
    //   name: "乐山福彩",
    //   src: "http://www.cwl.gov.cn/kjxx/?scene=126",
    //   marker: true
    // },
    // // 报料
    // {
    //   icon: require("../images/shuku.png"),
    //   name: "书库",
    //   src: "https://c1033.818tu.com/m",
    //   marker: true
    // },
    // // 报料
    // {
    //   icon: require("../images/leshanyouxuan.png"),
    //   name: "乐山优选",
    //   src: "https://m.jd.com/?cu=true&utm_source=kong&utm_medium=tuiguang&utm_campaign=t_30192_&utm_term=24c1f923043d4390a2df2bb9313e5d84",
    //   marker: true
    // },
    // 报料
    {
      icon: require("../images/zhiyuanzhehuodong.png"),
      name: "志愿者活动",
      src: "community",
      marker: false
    },
    {
      icon: require("../images/gaosulukuang.png"),
      name: "高速路况",
      src: "https://www.scjtonline.cn/trafficinfo?type=1&scene=126",
      marker: true
    },
    {
      icon: require("../images/leshanGrow.png"),
      name: "乐山成长",
      src: "leshanGrow",
      marker: false,
      id:'5d0896d4e4b03673f896c6a5'
    },
    // {
    //   icon: require("../images/huafeichongzhi.png"),
    //   name: "话费充值",
    //   src: "https://life.10085.cn/mall/home?src=1001b19a27ab983fbcd396bbb39a8a6c850f",
    //   marker: true
    // },
    
    
  ],
  banner2: [
     // 微社区
    
    
    // // 报料
    // {
    //   icon: require("../images/2_25.png"),
    //   name: "农民工之家",
    //   src: "tipOff",
    //   marker: false
    // }
  ],
    dataAI: [
        {
          icon: require("../images/jiqi.png"),
          namecont: "新闻机器人",
          path: "service/tianqi",
          menu: "Robot"
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
        {
          icon: require("../images/xiehe.png"),
          name: "乐山市<br>人民医院",
          src: "http://www.leshan-hospital.com.cn/aspx/index.html"
        },
        {
          icon: require("../images/yygh.png"),
          name: "乐山市<br>预约挂号",
          src: "http://wapyyk.39.net/leshan/"
        },
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
        {
          icon: require("../images/wz.png"),
          name: "违章查询",
          src: "https://m.weizhang8.cn"
        },
        
        {
          icon: require("../images/gjjjcx.png"),
          name: "公积金查询",
          src:
            "http://gjj.leshan.gov.cn/"
        },
        {
          icon: require("../images/kdcx.png"),
          name: "快递查询",
          src: "http://m.kuaidi100.com/index.jsp?from=openv"
        },
        {
          icon: require("../images/tqyb.png"),
          name: "天气预报",
          src: "http://wx.weather.com.cn/mweather/101271401.shtml#1"
        },
        {
          icon: require("../images/gjcx.png"),
          name: "公交查询",
          src: "https://m.8684.cn/beijing_bus"
        },
        {
          icon: require("../images/jdyd.png"),
          name: "酒店预订",
          src: "http://touch.qunar.com/hotel/index"
        },
        {
          icon: require("../images/hbcx.png"),
          name: "航班查询",
          src: "https://touch.qunar.com/h5/flight/?bd_source=3w"
        },
        {
          icon: require("../images/bccx.png"),
          name: "班车查询",
          src: "http://mbus.mapbar.com/chaoyang"
        },
        {
          icon: require("../images/lcsk.png"),
          name: "列车时刻",
          src: "http://touch.train.qunar.com/?bd_source=qunar"
        }
      ],
      zhengwu: [
        {
          icon: require("../images/sjszxx.png"),
          name: "地方领导留言",
          src: "http://liuyan.people.com.cn/forum/list?fid=401",
          marker: true
        },
        {
          icon: require("../images/xinxiang.png"),
          name: "市长信箱",
          src: "http://szxx.leshan.cn/",
          marker: true
        },
        {
          icon: require("../images/nxzwfww.png"),
          name: "市政务<br>服务中心",
          src: "http://lss.sczwfw.gov.cn/app/main?level=2&areaCode=511100000000",
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