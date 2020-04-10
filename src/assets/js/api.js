require("../theme/"+process.env.THEME+"/config.js")
const theme = $themeConfig
const url = 'http://10.1.37.90:8081/qdyq-innermgt/'; //请求后台url地址
// 处理点击事件
let _openw = null;
// 预创建二级页面
let preate = {};
// const as = 'pop-in'; // 默认窗口动画

var ws=null,as='pop-in';

const QFX = {
  theme:theme,
  //本次测试环境 图片url
  //http://172.168.0.249:8088  /api
  //线上测试环境 图片url
  //http://124.204.66.253:28080   
  url:'http://172.168.0.249:8088',//
  apis: {
    JczList: url + "/wechart/sample/chooseDetector",
    menuList: url + 'sys/menu/menuList', //获取所有菜单信息
  },
  getTheme:function(){
    return process.env.THEME;
  },
  //判断是否在手机端打开
  isPC: function () {
    var flag;
    if (typeof plus == "undefined") {
      flag = true;
    } else {
      flag = false;
    }
    return flag;
  },
  // 判断是否是iphoneX及以上机型
  iphonexPaddingFn:function(){
        var immersed = 0;
        var ms = /Html5Plus\/.+\s\(.*(Immersed\/(\d+\.?\d*).*)\)/gi.exec(
          navigator.userAgent
        );
        if (ms && ms.length >= 3) {
        immersed = parseFloat(ms[2]);
        }
        if( immersed == 44 ){
          return true;
        }
  },
  iback: function (hide) {
    let w = window;
    if (w.plus) {

      // ws || (ws = plus.webview.currentWebview());
      ws = plus.webview.currentWebview()
      if (hide || ws.preate) {
        ws.hide('auto');
      } else {
        if( window.location.href.indexOf("Details") != -1 ){
          if( plus.os.name == 'iOS' ){
            var newsId = JSON.parse( localStorage.getItem('history_Article'))[0].id;
            // var notiClass = plus.ios.importClass("ViewController");
            var notiClass = plus.ios.importClass("ReadInfo");
            if( notiClass ){
                var readInfo = notiClass.sharedReadInfo();
                if(readInfo.respondsToSelector(plus.ios.newObject("@selector", "readEnd:"))) {
                  // alert( '调用成功' )
                  readInfo.readEnd( newsId );
                } else {
                  // alert( '调用失败' )
                }
            } else {
                // alert( '获取不到readinfo1类' )
            }
          } else {
            var newsId = JSON.parse( localStorage.getItem('history_Article'))[0].id;
            var Helper = plus.android.importClass(theme.api.rmtNews);
            //创建对象实例
            var helper = new Helper ();
            //调用java中的跳转方法，并且传入当前activity实例
            helper.endParam(newsId);
          }
        }
        ws.close('auto');
      }
    } else if (history.length > 1) {
      history.back();
    } else {
      w.close();
    }
  },
  /* 弹出新页面方法 
  * @param {URIString} id : 要打开页面url
  * @param {JSON} params : 新页面传参
  * @param {boolean} mark : 是否用原生头部
  */
  urlParams: function (id, params,mark, a, s) {
    var href=window.location.href.split('#/')[0]+'#/';
    if (id == '') {
      return;
    }
    // 新闻机器人页面
    if (id == "Robot") {
      if( plus.os.name == 'iOS' ){
        var notiClass = plus.ios.importClass("NSNotificationCenter");
        notiClass.defaultCenter().postNotificationNameobject("openJs",null);
      } else {
        // var mainAct = plus.android.newObject("com.zkwg.tiemenguannews.SDK_WebApp");
        // plus.android.invoke(mainAct,"robot");
        //获取当前Activity
        var main = plus.android.runtimeMainActivity();
        //获取java辅助类
        var Helper = plus.android.importClass(theme.api.rmtNews);
                  //创建对象实例
        var mHelper = new Helper();
                  //调用java中的跳转方法，并且传入当前activity实例
        mHelper.jump(main);
      }
      return;
    }
    if (typeof params != "undefined") {
      localStorage.setItem(id, JSON.stringify(params))
    }
    var webviewId = null;
      if( id.indexOf('http') != -1 ){
        webviewId = id;
      } else {
        webviewId = href + id;
      }
    if (this.isPC()) {
      if( mark &&  params){
        localStorage.setItem('qtxWebUrl',JSON.stringify({ 'webviewId':webviewId,title:params.title }))
        if( mark && params ){
          if( params.isWechat ){
            // console.log( window.location.href.split('/#/')[0]+'/#/webDetail' )
            window.location.href = window.location.href.split('/#/')[0]+'/#/webDetail';
            return
          }
          window.location.href = window.location.href+'webDetail';
        }
      } else {
        window.location.href = webviewId;
      }
    } else {
      if(mark){
        // plus.webview.create(id, id, {
        //   titleNView:{
        //     autoBackButton:true,
        //     backgroundColor:theme.dominantColor,
        //     titleColor:'#fff',
        //     titleSize:"19px",
        //     titleText:params.title
        //     // type:"transparent"
        //   },
        //   backButtonAutoControl:'close',
        //   scalable:true
        // }).show('pop-in');
        var embed=null;
        localStorage.setItem('special_view',1);
        localStorage.setItem('special_view_url',id);
        embed=plus.webview.create(webviewId, webviewId, {
          'titleNView':{
            style:'transparent',
            backgroundColor:theme.dominantColor,
            titleText:params.title,
            titleColor:theme.titlescolors,
            autoBackButton:false,
            // height:'10%',
            // height:'88px',
            // backgroundColorTop:'#0c0cd2',
            'buttons':[
              {type:'share',float:'right',color:theme.titlescolors,onclick:clickButton},
              // {type:"back",text:'<',float:'left',onclick:goBack},
              {type:"close",text:'×',float:'left',color:theme.titlescolors,onclick:closeFn}
            ]
          },
          scalable: true, 
        });
        embed.show('pop-in');
        function goBack(){
          plus.webview.getWebviewById(id).back()
        }
        function closeFn(){
          plus.webview.getWebviewById(id).close()
        }
        function clickButton(){
          // plus.nativeUI.alert('clicked!');
          if(shareBts.length>0){
            plus.nativeUI.actionSheet({
                title: '分享',
                cancel: '取消',
                buttons: shareBts
            }, function (e) {
                (e.index > 0) && shareAction(shareBts[e.index - 1], true);
            })
          }else {
            updateSerivces()
          }
        }

        /**
         * 更新分享服务
         */
        var shares=null,shareBts=[]
        function updateSerivces() {
            plus.share.getServices(function (s) {
                outLine(JSON.stringify(s))
                shares = {};
                for (var i in s) {
                    var t = s[i];
                    shares[t.id] = t;
                }
                outLine(JSON.stringify(shares))
                shareHref();
            }, function (e) {
                outLine('获取分享服务列表失败：' + e.message)
                console.log('获取分享服务列表失败：' + e.message);
            });
        }
        // 分析链接
        function shareHref() {
            // 更新分享列表
            var ss = shares['weixin'];
            ss && ss.nativeClient && (shareBts.push({
                title: '微信朋友圈',
                s: ss,
                x: 'WXSceneTimeline',
                name: 'wx_pyq'
            }),
            shareBts.push({
                title: '微信好友',
                s: ss,
                x: 'WXSceneSession',
                name: 'wx_friend'
            }));
            ss = shares['qq'];
            ss && ss.nativeClient && shareBts.push({
                title: 'QQ',
                s: ss,
                name: 'qq'
            });
            ss = shares['sinaweibo'];
            ss && ss.nativeClient && shareBts.push({
                title: '新浪微博',
                s: ss,
                name: 'weibo'
            });
            // 弹出分享列表
            shareBts.length > 0 ? plus.nativeUI.actionSheet({
                title: '分享',
                cancel: '取消',
                buttons: shareBts
            }, function (e) {
                (e.index > 0) && shareAction(shareBts[e.index - 1], true);
            }) : plus.nativeUI.alert('当前环境无法支持分享链接操作!');
            outLine(JSON.stringify(shareBts))
        }
        /**
         * 分享操作
         * @param {JSON} sb 分享操作对象s.s为分享通道对象(plus.share.ShareService)
         * @param {Boolean} bh 是否分享链接
         */
        function shareAction(sb) {
            outLine(JSON.stringify(sb))
            if (!sb || !sb.s) {
                outLine('无效的分享服务！');
                return;
            }
            var msg = {
                extra: {
                    scene: sb.x
                }
            };
            msg.href =embed.getURL();
            msg.title = embed.getTitle();
            msg.content = sb.s.id == 'sinaweibo'?params.title:'点击查看详情';
            msg.thumbs = ['_www/logo.png']
            msg.pictures = ['_www/logo.png']
            
            // 发送分享
            if (sb.s.authenticated) {
                outLine('---已授权---');
                shareMessage(msg, sb.s);
            } else {
                outLine('---未授权---');
                sb.s.authorize(function () {
                    shareMessage(msg, sb.s);
                }, function (e) {
                    outLine('认证授权失败：' + e.code + ' - ' + e.message);
                    Toast({
                        message: "授权认证失败",
                        position: "middle",
                        duration: 1000
                    });
                });
            }
        }
        function outLine(str) {
            // alert(str)
            console.log(str)
        }
        /**
         * 发送分享消息
         * @param {JSON} msg
         * @param {plus.share.ShareService} s
         */
        function shareMessage(msg, s) {
            outLine(JSON.stringify(msg));
            s.send(msg, function () {
                outLine('分享到"' + s.description + '"成功！');
                plus.nativeUI.toast('分享成功！',{duration:'short'})
            }, function (e) {
                outLine('分享到"' + s.description + '"失败: ' + JSON.stringify(e));
                plus.nativeUI.toast('分享失败',{duration:'short'})
            });
        }

      }else{
        if (_openw) {
          return;
        }
        a || (a = as);
        _openw = preate[id];
        if (_openw) {
          _openw.showded = true;
          _openw.show(a, null, function () {
            _openw = null; //避免快速点击打开多个页面
          });
        } else {
          //		var wa=plus.nativeUI.showWaiting();
          //		_openw=plus.webview.create(id,id,{scrollIndicator:'none',scalable:false,popGesture:'hide'},{preate:true});//复用二级页面
          _openw = plus.webview.create(webviewId, webviewId, {
            scrollIndicator: 'none',
            scalable: true,
            popGesture: 'close'
          });
          _openw.addEventListener('popGesture', function(e){
             console.log( e.result )
             if( e.result ){
               //监听ios详情页面 左侧返回触发ios方法
              if( id == 'Details' ){
                var newsId = JSON.parse( localStorage.getItem('history_Article'))[0].id;
                // var notiClass = plus.ios.importClass("ViewController");
                var notiClass = plus.ios.importClass("ReadInfo");
                if( notiClass ){
                    var readInfo = notiClass.sharedReadInfo();
                    if(readInfo.respondsToSelector(plus.ios.newObject("@selector", "readEnd:"))) {
                      // alert( '调用成功' )
                      readInfo.readEnd( newsId );
                    } else {
                      // alert( '调用失败' )
                    }
                } else {
                    // alert( '获取不到readinfo1类' )
                }
                // notiClass.readEnd( newsId )
              }
             }
          }, false);
          preate[id] = _openw;
          // _openw.addEventListener('loaded', function () { //叶面加载完成后才显示
            setTimeout(function(){//延后显示可避免低端机上动画时白屏
              //			wa.close();
              _openw.showded = true;
              s || _openw.show(a, null, function () {
                _openw = null; //避免快速点击打开多个页面
              });
              s && (_openw = null); //避免s模式下变量无法重置
            },150);
          // }, false);
          _openw.addEventListener('hide', function () {
            _openw && (_openw.showded = true);
            _openw = null;
          }, false);
          _openw.addEventListener('close', function () { //页面关闭后可再次打开
            _openw = null;
            preate[id] && (preate[id] = null); //兼容窗口的关闭
          }, false);
        }
      }
 
    }
  },
  //获取浏览器url参数
  parseQueryString: function (url) {
    var result = {};
    if (url.indexOf('?') > -1) {
      var str = url.split('?')[1];
      var temp = str.split('&');
      for (var i = 0; i < temp.length; i++) {
        var temp2 = temp[i].split('=');
        result[temp2[0]] = temp2[1];
      }
    }
    return result;
  },
  // 判断姓名必须为中文或英文
  isFullName: function (str) {
    let chinese = /^[\u4e00-\u9fa5 ]{2,20}$/;
    let english = /^[a-zA-Z\/ ]{2,20}$/;
    let reg = new RegExp(chinese);
    let reg1 = new RegExp(english);
    return reg.test(str) || reg1.test(str)
  },
  // 判断为空可输入空白字符
  isNull: (str) => {
    if (str == "") return true;
    var regu = "^[ ]+$";
    var re = new RegExp(regu);
    return re.test(str);
  },
  //判断必须为正整数
  isNumber: (content) => {
    // let n = /^[0-9]\d*$/;
    let n = new RegExp(/^[0-9]\d*$/);
    return n.test(content)
  },
  // 获取url地址
  getUrlStr: (name) => {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  },
  // 时间戳转日期 2018-09-19 0:0:0
  timestampToTime: (timestamp) => {
    var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = date.getDate() + ' ';
    var h = date.getHours() + ':';
    var m = date.getMinutes() + ':';
    var s = date.getSeconds();
    return Y + M + D + h + m + s;
  },
  // 时间戳转日期 2018-09-19
  timestampToDate: (timestamp) => {
    var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = date.getDate();
    return Y + M + D;
  },
  // 日期转时间戳
  DateTrastion(date) {
    var date = new Date(date);
    return date.getTime();
  },
  //去重
  unique2(arr) {
    var arr2 = arr.sort();
    var res = [arr2[0]];
    for (var i = 1; i < arr2.length; i++) {
      if (arr2[i] !== res[res.length - 1]) {
        res.push(arr2[i]);
      }
    }
    return res;
  },
  //截取字符串
  cut(str) {
    // var str = "atynr6";    //要截取的字符串
    var index = str.indexOf(".0");
    var result = str.substr(index + 1, str.length);
    return result;
  },
  //截取指定字符串
  getStr(url, str) {
    var str_after = url.split(str)[1];
    return str_after;
  },
  //上传图片
  upLoadUrl: (e, apis) => {
    let file = e.target.files[0];
    let formData = new FormData();
    formData.append('uploadFile', $(e.target)[0].files[0]); // 文件数据
    $.ajax({ // ajax上传
      url: QDYQ.port.url + apis,
      type: 'POST',
      cache: false,
      data: formData,
      processData: false,
      contentType: false
    }).done(function (res) {
      return res;
    });
  },
  timesdata(date){
    let dt =new Date();
    let yestodayStamp = dt.getFullYear()+'/'+(dt.getMonth()+1<10?'0'+(dt.getMonth()+1):(dt.getMonth()+1))+'/'+(dt.getDate()-1)+' 00:00:00'
    let todayStamp = dt.getFullYear()+'/'+(dt.getMonth()+1<10?'0'+(dt.getMonth()+1):(dt.getMonth()+1))+'/'+(dt.getDate()<10?'0'+dt.getDate():dt.getDate())+' 00:00:00'
    let todayEndStamp = dt.getFullYear()+'/'+(dt.getMonth()+1<10?'0'+(dt.getMonth()+1):(dt.getMonth()+1))+'/'+(dt.getDate()<10?'0'+dt.getDate():dt.getDate())+' 23:59:59'
   if((new Date(date.replace(/\-/g,'/')).getTime())<new Date(yestodayStamp).getTime()){
    let diff = parseInt((new Date().getTime() - new Date(date.replace(/\-/g,'/')).getTime())/1000)
    if(diff<30*86400){
    return date;
    }else{
    return date
    } 
    }else if(new Date(date.replace(/\-/g,'/')).getTime()>=new Date(todayStamp).getTime() && new Date(date.replace(/\-/g,'/')).getTime()<new Date(todayEndStamp).getTime()){
    let diff = parseInt((new Date().getTime() - new Date(date.replace(/\-/g,'/')).getTime())/1000)
    if(diff<60){
    return "刚刚"
    }else if(diff<3600){
    return parseInt(diff/60)+'分钟前'
    }else if(diff<86400){
    return parseInt(diff/3600)+'小时前'
    }
    }else{
      return date;
    } 
  },
  getBeforeDate(n) {
    var n = n;
    var d = new Date();
    var year = d.getFullYear();
    var mon = d.getMonth() + 1;
    var day = d.getDate();
    if (day <= n) {
      if (mon > 1) {
        mon = mon - 1;
      } else {
        year = year - 1;
        mon = 12;
      }
    }
    d.setDate(d.getDate() - n);
    year = d.getFullYear();
    mon = d.getMonth() + 1;
    day = d.getDate();
    return year +"-" +(mon < 10 ? "0" + mon : mon) + "-" +(day < 10 ? "0" + day : day);
  }
}
window.QFX = QFX;
export default QFX;

