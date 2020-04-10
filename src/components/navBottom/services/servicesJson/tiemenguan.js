const servicesJson = {
  banner: [
    {
      icon: require("../images/2_03.png"),
      name: "铁门关之声",
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
      name: "铁门关文旅",
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
    }
  ],
  banner2: [
    // 报料
    {
      icon: require("../images/2_25.png"),
      name: "农民工之家",
      src: "tipOff",
      marker: false
    }
  ],
  dataAI: [
    {
      icon: require("../images/tiemenweixin.png"),
      name: "铁门关在线",
      namecont:"铁门关在线(微信)",
      path: "service/tianqi",
      menu: "Robot"
    },
    {
      icon: require("../images/tiemenweibo.png"),
      name: "铁门关在线(微博)",
      namecont:"铁门关在线(微博)",
      path: "https://weibo.com/u/6942321359",
      menu: "https://weibo.com/u/6942321359"
    },
    {
      icon: require("../images/jiqi.png"),
      name: "新闻机器人",
      namecont: "新闻机器人",
      path: "service/tianqi",
      menu: "Robot"
    }
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
      // src: "https://m.weibo.cn/u/5110323748"
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
      src: ""
    },
    {
      icon: require("../images/douyin.png"),
      name: "活力青铜峡",
      src: "http://v.douyin.com/2tb94J/"
    }
  ],
  FMServices: [
    {
      icon: require("../images/tmg_fm.png"),
      name: "FM88.5",
      src: "https://m.qingting.fm/channels/20211703/"
    },
    {
      icon: require("../images/tmg_zg.png"),
      name: "中国之声",
      src: "https://www.qingting.fm/radios/386"
    }
  ],
  chuxing: [
    {
      icon: require("../images/didi.png"),
      name: "滴滴出行",
      src: "https://common.diditaxi.com.cn/general/webEntry?h=1#/"
    },
    {
      icon: require("../images/yihai.png"),
      name: "一嗨租车",
      src: "https://www.1hai.cn/"
    },
    {
      icon: require("../images/gjcx.png"),
      name: "公交查询",
      src: "https://m.keyunzhan.com/bus/state_kuerle_360552/"
    },
    {
      icon: require("../images/hbcx.png"),
      name: "航班查询",
      src: "https://touch.qunar.com/h5/flight/?bd_source=3w"
    },
    {
      icon: require("../images/lcsk.png"),
      name: "列车时刻",
      src: "http://touch.train.qunar.com/?bd_source=qunar"
    },
    {
      icon: require("../images/jdyd.png"),
      name: "酒店预订",
      src: "http://touch.qunar.com/hotel/index"
    }
  ],
  jiaofei: [
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
      icon: require("../images/hc_kuandai.png"),
      name: "宽带缴费",
      src: "https://h5.m.taobao.com/app/cz/combine/index.html?spm=a2141.8277929.1.2&subSource=%24%24tb_weex_card_icon%24%24stcz_1&navbars=2"
    },
    {
      icon: require("../images/dianxin.png"),
      name: "中国电信缴费",
      src: "https://market.m.taobao.com/apps/recharge/home/home.html?scm=2019.1.2.1003&subSource=stcz_1&utparam=%7B%22ranger_buckets_native%22%3A%225555_3151%22%7D&spm=a215s.7406091.icons.6"
    }
  ],
  fuwu: [
    {
      icon: require("../images/tianqi.png"),
      name: "天气预报",
      src: "http://wx.weather.com.cn/mweather/101131901.shtml#1"
    },

    {
      icon: require("../images/kdcx.png"),
      name: "快递查询",
      src: "http://m.kuaidi100.com/index.jsp?from=openv"
    },

    {
      icon: require("../images/wz.png"),
      name: "违章查询",
      src: "https://m.weizhang8.cn"
    },
    {
      icon: require("../images/yidong.png"),
      name: "中国移动",
      src: "http://wap.xj.10086.cn/wservice/payFee/res_ht/JxPayfee.html"
    },
    {
      icon: require("../images/liantong.png"),
      name: "中国联通",
      src: "http://m.bzlt186.icoc.bz/h-index.html?from=singlemessage"
    },
     {
      icon: require("../images/ico-listb16.png"),
      name: "中国电信",
      src: "http://www.189.cn/fj_np/"
    },

  
    {
      icon: require("../images/ico-listb1.png"),
      name: "住房公积金",
      src: "http://zwfw.xjbt.gov.cn/bmfw/service/1PYH001.jspx?areaId=660000?areaId=660000"
    },

    {
      icon: require("../images/xg.png"),
      name: "票根网",
      src: "https://www.txffp.com/"
    },
    {
      icon: require("../images/maoyan.png"),
      name: "猫眼电影",
      src: "http://m.maoyan.com/#movie"
    },
    {
      icon: require("../images/tmg_sg.png"),
      name: "时光同城",
      src: "https://mp.sg0996.com/sgtc114.php?id=sgtctc&site=100010&mod=index&prand=602"
    },
    {
      icon: require("../images/tme_sslk.png"),
      name: "交管12123",
      src: "https://m.12123.com/"
    },
    {
      icon: require("../images/nongjibutie.png"),
      name: "农机补贴",
      src: "https://mp.weixin.danongchang.cn/vip/nongjitong/butie/"
    },
   
  ],
  bendifulist: [
    // {
    //   icon: require('../images/jifen.png'),
    //   name: '驾驶证记分查询',
    //   src: 'https://xj.122.gov.cn/views/inquiry.html'
    // },
   
  
  
    // {
    //   icon: require("../images/tmg_shuiwu.png"),
    //   name: "新疆税务",
    //   src: "https://etax.xinjiang.chinatax.gov.cn/wszx-web/bszm/apps/views/beforeLogin/indexBefore/pageIndex.html#/"
    // },
    
   
  
    // {
    //   icon: require("../images/ico-listb2.png"),
    //   name: "博斯腾宾馆美团",
    //   src: "https://i.meituan.com/platform/share?mt_share_id=jyi7kjtf4lba&url=https%3A%2F%2Fi.meituan.com%2Fawp%2Fh5%2Fhotel%2Fpoi%2Fdeal.html%3FpoiId%3D2302580%26utm_term%3DAiphoneBgroupC10.0.800DqqEpoiG0000000000000B291CE5D53CF4A6BB91E45549F81CD23A15550131128241468320190725130024474%26utm_source%3Dappshare%26utm_medium%3DiOSweb%26utm_fromapp%3Dqq%26utm_sharesource%3Dpoi"
    // },
    // {
    //   icon: require("../images/ico-listb3.png"),
    //   name: "博斯腾宾馆携程",
    //   src: "https://m.ctrip.com/webapp/hotel/hoteldetail/2151634.html?atime=20190725&days=1&shareid=MjE1MTYzNHxob3RlbF9pbm5fZGV0YWlsfDh8MjAxOTA3MjUxMzA1MzM=&uid=3C4951AD689B88BC9CE11BE3A9BFC55428E4275125A2A8AFFC81696A5E2D290E&s_guid=EEDD803D-16A1-41EF-8AE2-EF6FE804AB1A"
    // },
    // {
    //   icon: require("../images/ico-listb5.png"),
    //   name: "博斯腾宾馆去哪儿",
    //   src: "https://touch.qunar.com/hoteldetail?seq=bayinguoleng_2133&checkInDate=2019-01-25&checkOutDate=2020-07-26&fromForLog=铁门关大酒店美团"
    // },
    // {
    //   icon: require("../images/ico-listb6.png"),
    //   name: "铁门关大酒店美团",
    //   src: "https://i.meituan.com/platform/share?mt_share_id=jyi7vm01ra3k&url=https%3A%2F%2Fi.meituan.com%2Fawp%2Fh5%2Fhotel%2Fpoi%2Fdeal.html%3FpoiId%3D94469674%26utm_term%3DAiphoneBgroupC10.0.800DqqEpoiG0000000000000B291CE5D53CF4A6BB91E45549F81CD23A15550131128241468320190725130900808%26utm_source%3Dappshare%26utm_medium%3DiOSweb%26utm_fromapp%3Dqq%26utm_sharesource%3Dpoi"
    // },
    // {
    //   icon: require("../images/ico-listb7.png"),
    //   name: "铁门关大酒店携程",
    //   src: "https://m.ctrip.com/webapp/hotel/hoteldetail/6034046.html?atime=20190725&days=1&shareid=NjAzNDA0Nnxob3RlbF9pbm5fZGV0YWlsfDh8MjAxOTA3MjUxMzA5MDE=&uid=3C4951AD689B88BC9CE11BE3A9BFC55428E4275125A2A8AFFC81696A5E2D290E&s_guid=E615F3B4-7B25-4405-9578-5FFEEF9D20B0"
    // },
    // {
    //   icon: require("../images/ico-listb8.png"),
    //   name: "铁门关大酒店去哪儿",
    //   src: "https://touch.qunar.com/hoteldetail?seq=bayinguoleng_2667&checkInDate=2019-01-25&checkOutDate=2020-07-26&fromForLog="
    // },
    {
      icon: require("../images/ico-listb14.png"),
      name: "库尔勒医院",
      src: "https://mp.weixin.qq.com/s/amZLZ__pO7uFJCh7WGqn3Q"
    },
    {
      icon: require("../images/ico-listb15.png"),
      name: "焉耆医院",
      src: "https://mp.weixin.qq.com/s/4k4lplamroXMRIE_gtPqYQ"
    },
    {
      icon: require("../images/ico-listb10.png"),
      name: "中国银行",
      src: "http://wap.boc.cn"
    },
    {
      icon: require("../images/ico-listb13.png"),
      name: "交通银行",
      src: "https://m.bankcomm.com/wap/index.shtml"
    },
    {
      icon: require("../images/ico-listb9.png"),
      name: "津汇村镇银行",
      src: "http://www.tmgjhczb.com/list.php?tid=112"
    },
    {
      icon: require("../images/nongye.png"),
      name: "中国农业银行",
      src: "http://www.abchina.com/cn/"
    },
    {
      icon: require("../images/xinjiangnongxin.png"),
      name: "新疆农村信用社",
      src: "https://www.xjrccb.com.cn/index.html"
    },
    {
      icon: require("../images/list.png"),
      name: "博斯腾宾馆",
      src: "http://hotel.elong.com/53104002/"
    },
    {
      icon: require("../images/zt.png"),
      name: "铁门关大酒店",
      src: "http://hotel.elong.com/91673061/"
    },
    {
      icon: require("../images/zhiyuanzhehuodong.png"),
      name: "志愿者活动",
      src: "activitylist"
    },
    {
      icon: require("../images/ico-listb11.png"),
      name: "医师电子化注册",
      src: "https://www.cndocsys.cn/home/index"
    },
    {
      icon: require("../images/ico-listb12.png"),
      name: "护士电子化注册",
      src: "https://cnnursys.cn/home/index"
    },
  ],
  weisheng: [
    {
      icon: require("../images/yygh.png"),
      name: "铁门关市预约挂号",
      src: "http://wapyyk.39.net/xjwwezzq/"
    }
  ],
  baozhang: [
    {
      icon: require("../images/kuerleYl.png"),
      name: "库尔勒养老保险查询",
      src: ""
    },
    {
      icon: require("../images/gjjjcx.png"),
      name: "公积金查询",
      src: "http://www.xinjianggjj.com/baz/gjjcx.jsp?urltype=tree.TreeTempUrl&wbtreeid=1029"
    }
  ],
  convenient: [
    {
      icon: require("../images/yjy.png"),
      name: "猫眼电影",
      src: "http://m.maoyan.com/#movie"
    },
    {
      icon: require("../images/yygh.png"),
      name: "铁门关市<br>预约挂号",
      src: "http://wapyyk.39.net/xjwwezzq/"
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
      src: "https://market.m.taobao.com/apps/recharge/home/home.html?scm=2019.1.2.1003&subSource=stcz_1&utparam=%7B%22ranger_buckets_native%22%3A%225555_3151%22%7D&spm=a215s.7406091.icons.6"
    },
    {
      icon: require("../images/tmg_sg.png"),
      name: "时光同城",
      src:
        "https://mp.sg0996.com/sgtc114.php?id=sgtctc&site=100010&mod=index&prand=602"
    },
    {
      icon: require("../images/didi.png"),
      name: "滴滴出行",
      src: "https://common.diditaxi.com.cn/general/webEntry?h=1#/"
    },
    {
      icon: require("../images/yihai.png"),
      name: "一嗨租车",
      src: "https://www.1hai.cn/"
    },
    {
      icon: require("../images/wz.png"),
      name: "违章查询",
      src: "https://m.weizhang8.cn"
    },

    {
      icon: require("../images/gjjjcx.png"),
      name: "公积金查询",
      src: "http://www.xinjianggjj.com/"
    },
    {
      icon: require("../images/kdcx.png"),
      name: "快递查询",
      src: "http://m.kuaidi100.com/index.jsp?from=openv"
    },
    {
      icon: require("../images/tqyb.png"),
      name: "天气预报",
      src: "https://baidu.weather.com.cn/mweather/101131901.shtml"
    },
    {
      icon: require("../images/gjcx.png"),
      name: "公交查询",
      src: "https://m.keyunzhan.com/bus/state_kuerle_360552/"
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
      icon: require("../images/lcsk.png"),
      name: "列车时刻",
      src: "http://touch.train.qunar.com/?bd_source=qunar"
    }
  ],
  chuxingfuw:[
    {
      icon: require("../images/lcsk.png"),
      name: "列车时刻",
      src: "http://touch.train.qunar.com/?bd_source=qunar"
    },
    {
      icon: require("../images/hbcx.png"),
      name: "航班查询",
      src: "https://touch.qunar.com/h5/flight/?bd_source=3w"
    },
    {
      icon: require("../images/jdyd.png"),
      name: "酒店预订",
      src: "http://touch.qunar.com/hotel/index"
    },
   
  ],
  zhengwu: [
    // {
    //   icon: require("../images/sjszxx.png"),
    //   name: "地方领导留言",
    //   src: "http://liuyan.people.com.cn/forum/list?fid=45",
    //   marker: true
    // },
    {
      icon: require("../images/xinxiang.png"),
      name: "师(市)长信箱",
      src: "http://www.tmg.gov.cn/appeal/form.jsp?model_id=7",
      marker: true
    },
    {
      icon: require("../images/nxzwfww.png"),
      name: "政务服务中心",
      src: "http://www.tmg.gov.cn/ggfw/",
      marker: true
    },
    {
      icon: require("../images/munty.png"),
      name: "纪检举报",
      src: "reportpages",
      marker: false
    },
    {
      icon: require("../images/qa.png"),
      name: "问政",
      src: "certificate",
      marker: false
    },
    {
      icon: require("../images/ico-lista1.png"),
      name: "企业信用信息",
      src: "http://xj.gsxt.gov.cn/index.html",
      marker: true
    },
    {
      icon: require("../images/ico-lista2.png"),
      name: "工商网上办事",
      src: "http://www.xjaic.gov.cn/gsindex.htm",
      marker: true
    },
    {
      icon: require("../images/ico-lista3.png"),
      name: "经营许可证",
      src: "http://service.xjbt.gov.cn/",
      marker: true
    },
    {
      icon: require("../images/ico-lista4.png"),
      name: "电子税务局",
      src: "https://etax.xinjiang.chinatax.gov.cn",
      marker: true
    },
    {
      icon: require("../images/ico-lista5.png"),
      name: "政务服务网",
      src: "http://zwfw.xinjiang.gov.cn/",
      marker: true
    },
    {
      icon: require("../images/ico-lista6.png"),
      name: "兵团公共资源",
      src: "http://ggzy.xjbt.gov.cn/TPFront/",
      marker: true
    },
  ],
  dianziBook: [
    {
      icon: require("../images/bkqk.png"),
      name: "博看期刊",
      src: "https://wk3.bookan.com.cn/index.html?id=43&token=&productId=5#/",
      marker: true
    }
  ],
  eCommerce: [
    // {
    //   icon: require("../images/kuerleTc.png"),
    //   name: "库尔勒馆",
    //   src: "https://mall.jd.com/index-606874.html"
    // },
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
      icon: require("../images/xinjiangnongxin.png"),
      name: "苏宁易购",
      src: "https://m.suning.com/?utm_source=sogou&utm_medium=brand-wuxian&utm_campaign=title"
    },
  ],
  jiaoyu: [
    {
      icon: require("../images/hc_xueli.png"),
      name: "学历证书查询",
      src: "https://fw.kaipuyun.cn/servicePage?serviceName=education&cityID=350000&clientID=123qwe&localFrom=xinhuashe_app"
    },
    {
      icon: require("../images/EnglishGrade.png"),
      name: "全国英语等级考试",
      src: "http://zscx.neea.edu.cn/html1/folder/1508/211-1.htm?sid=280"
    },
    {
      icon: require("../images/computerGrade.png"),
      name: "全国计算机等级考试",
      src: "http://cjcx.neea.edu.cn/html1/folder/1508/206-1.htm?sid=300"
    },
    // {
    //   icon: require("../images/xuewei.png"),
    //   name: "学位查询",
    //   src: "http://www.chinadegrees.com.cn/"
    // },
    {
      icon: require("../images/ketang.png"),
      name: "公益课堂",
      src: "https://ke.qq.com/"
    },
    {
      icon: require("../images/yinyue.png"),
      name: "音乐培训",
      src: "https://i.meituan.com/platform/share?mt_share_id=jyiamq6xzccx&url=https%3A%2F%2Fwww.meituan.com%2Fshop%2F175253913.html%3Futm_term%3DAiphoneBgroupC10.0.800DqqEpoiG0000000000000B291CE5D53CF4A6BB91E45549F81CD23A15550131128241468320190725142604652%26utm_source%3Dappshare%26utm_medium%3DiOSweb%26utm_fromapp%3Dqq%26utm_sharesource%3Dpoi"
    }, {
      icon: require("../images/shufa.png"),
      name: "书法培训",
      src: "https://i.meituan.com/platform/share?mt_share_id=jyiaq0s57ho5&url=https%3A%2F%2Fwww.meituan.com%2Fshop%2F181531658.html%3Futm_term%3DAiphoneBgroupC10.0.800DqqEpoiGF93F641A513D193361769FB4FCEAF518C617EABD4D648D6743E422243CEF50A620190725142838080%26utm_source%3Dappshare%26utm_medium%3DiOSweb%26utm_fromapp%3Dqq%26utm_sharesource%3Dpoi"
    },
  ],
  // 投诉
  tousu: [
  
    {
      icon: require("../images/hc_ljdx.png"),
      name: "举报垃圾短信",
      path: "https://fw.kaipuyun.cn/servicePage?serviceName=unhealthyReportMessage&cityID=350000&clientID=123qwe&localFrom=xinhuashe_app",
    },
    {
      icon: require("../images/hc_12315.png"),
      name: "全国12315互联网平台查询",
      path: "http://www.12315.cn/",
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
    // {
    //   icon: require("../images/hc_lyxl.png"),
    //   name: "旅游投诉",
    //   path: "https://fw.kaipuyun.cn/servicePage?serviceName=tourism&cityID=350000&clientID=123qwe&localFrom=xinhuashe_app",
    // },
  ],
  tv: [
    {
      icon: require("../images/yxds.png"),
      name: "网络电视",
      src: "http://m.miguvideo.com/wap/resource/migu/live/live-list.jsp"
    },
    {
      icon: require("../images/aiqiyi.png"),
      name: "爱奇艺",
      src: "http://www.iqiyi.com/"
    },
    {
      icon: require("../images/youku.png"),
      name: "优酷",
      src: "https://www.youku.com/"
    }
  ]
};
export default servicesJson;
