const servicesJson = {
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
          name: "保山市<br>人民医院",
          src: "http://www.ynbsyy.com/"
        },
        {
          icon: require("../images/yygh.png"),
          name: "保山市<br>预约挂号",
          src: "http://wapyyk.39.net/baoshan3/"
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
            "https://www.bsgjj.com/bswsyyt/index.jsp"
        },
        {
          icon: require("../images/kdcx.png"),
          name: "快递查询",
          src: "http://m.kuaidi100.com/index.jsp?from=openv"
        },
        {
          icon: require("../images/tqyb.png"),
          name: "天气预报",
          src: "http://wx.weather.com.cn/mweather/101290502.shtml#1"
        },
        {
          icon: require("../images/gjcx.png"),
          name: "公交查询",
          src: "http://bus.mapbar.com/baoshan/"
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
          src: "http://liuyan.people.com.cn/forum/list?fid=432",
          marker: true
        },
        {
          icon: require("../images/xinxiang.png"),
          name: "市长信箱",
          src: "http://www.longyang.gov.cn/mail_list.jsp?urltype=tree.TreeTempUrl&wbtreeid=1121",
          marker: true
        },
        {
          icon: require("../images/nxzwfww.png"),
          name: "市政务<br>服务中心",
          src: "http://www.longyang.gov.cn/xxgk_index.jsp?urltype=tree.TreeTempUrl&wbtreeid=1076",
          marker: true
        },
        {
          icon: require("../images/qa.png"),
          name: "问政", 
          src: "certificate",
          marker: false
        },
        {
          icon: require("../images/gaokao.png"),
          name: "高考成绩查询",
          src: "https://web.yn.gov.cn/dist/index.html#/ExaminationScore",
          marker: true
        },
        {
          icon: require("../images/touzi.png"),
          name: "投资项目办件<br>进度查询",
          src: "https://web.yn.gov.cn/dist/index.html#/investmentProjects",
          marker: true
        },
        {
          icon: require("../images/yunnan_hunyin.png"),
          name: "婚姻登记机关查询",
          src: "https://web.yn.gov.cn/dist/index.html#/marriageRegistrationQuery",
          marker: true
        },
        {
          icon: require("../images/pugao.png"),
          name: "云南省普通<br>高考录取查询",
          src: "https://web.yn.gov.cn/dist/index.html#/examAdmission",
          marker: true
        },
        {
          icon: require("../images/chengkao.png"),
          name: "云南省成人<br>高考成绩查询",
          src: "https://web.yn.gov.cn/dist/index.html#/AdultExamScore",
          marker: true
        },
        {
          icon: require("../images/chengkaolq.png"),
          name: "云南成人高考<br>录取查询",
          src: "https://web.yn.gov.cn/dist/index.html#/adultExamAdmit",
          marker: true
        },
        {
          icon: require("../images/jiuzhu.png"),
          name: "云南救助管理<br>机构查询",
          src: "https://web.yn.gov.cn/dist/index.html#/reliefManagementQuery",
          marker: true
        },
        {
          icon: require("../images/nashui.png"),
          name: "纳税信用A级<br>纳税人查询",
          src: "https://web.yn.gov.cn/dist/index.html#/taxOne",
          marker: true
        },
        {
          icon: require("../images/gongcheng.png"),
          name: "工程建设中标<br>结果查询",
          src: "https://web.yn.gov.cn/dist/index.html#/projectCheck",
          marker: true
        },
        {
          icon: require("../images/shixin.png"),
          name: "严重违法失信<br>企业名单查询",
          src: "https://web.yn.gov.cn/dist/index.html#/sbreak",
          marker: true
        },
        {
          icon: require("../images/shipin.png"),
          name: "食品生产许可<br>获证企业查询",
          src: "https://web.yn.gov.cn/dist/index.html#/medicineOne",
          marker: true
        },
        {
          icon: require("../images/jianli.png"),
          name: "工程监理企业<br>资质查询",
          src: "https://web.yn.gov.cn/dist/index.html#/build",
          marker: true
        },
        {
          icon: require("../images/cehui.png"),
          name: "测绘单位资质<br>信息查询",
          src: "https://web.yn.gov.cn/dist/index.html#/cehuiju",
          marker: true
        },
        {
          icon: require("../images/churujing.png"),
          name: "出入境证件办理进度查询",
          src: "https://web.yn.gov.cn/dist/index.html#/entryExitQuery",
          marker: true
        }
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