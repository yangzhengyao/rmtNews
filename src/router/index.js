import Vue from 'vue'
import Router from 'vue-router'


const index = resolve => require(['html/index/redFlag/App'], resolve); //红旗首页加载

// const yuxiIndex = resolve => require(['html/index/yuxi/App'],resolve); //玉溪首页加载

const Login = resolve => require(['html/login/App'], resolve); //登录页面

const register = resolve => require(['html/register/App'], resolve);//注册页面

const Details = resolve => require(['html/news/detail/App'], resolve); //详情页面

const webDetail = resolve => require(['html/news/webDetail/App'], resolve); //青铜峡页面

const seek = resolve => require(['html/news/seek/App'], resolve); //搜索页面
const findseek = resolve => require(['html/news/seek/find'], resolve); //搜索页面
const wechat = resolve => require(['html/services/wechat/App'], resolve);

const wechatItem = resolve => require(['html/services/wechatItem/App'], resolve);

const moreListItem = resolve => require(['html/services/moreListItem/App'], resolve);

const addNav = resolve => require(['html/news/add/App'], resolve);

const hcZhengwu = resolve => require(['html/news/haicang_zhengwu/App'], resolve);

const firstAmateur = resolve => require(['html/firstAmateur/App'], resolve);//票友大赛页面

const Homepage = resolve => require(['html/community/Homepage/App'], resolve); //博客主页

const AttentionList = resolve => require(['html/community/AttentionList/App'], resolve);//关注列表页面

const newAttentionList = resolve => require(['html/community/newAttentionList/App'], resolve);//新关注列表页面

const Fans = resolve => require(['html/community/Fans/App'], resolve);//粉丝列表页面

const newFans = resolve => require(['html/community/newFans/App'], resolve);//新粉丝列表页面

const articleDetail = resolve => require(['html/newCommunity/articleDetail/App'], resolve);//文章详情页面

const statement = resolve => require(['html/newCommunity/articleDetail/statement'], resolve);//免责声明

const publish = resolve => require(['html/newCommunity/publish/App'], resolve);//发表页面

const topicCircleDetail = resolve => require(['html/newCommunity/topicCircleDetail/App'], resolve);//圈子，话题详情页面

const topicCircleList = resolve => require(['html/newCommunity/topicCircleList/App'], resolve);//圈子，话题列表页面

const characters = resolve => require(['html/community/characters/App'], resolve);//发表博文页面

const feedBack = resolve => require(['html/me/feedback/App'], resolve);//意见反馈页面

const us = resolve => require(['html/me/us/App'], resolve);//关于我们页面

const set = resolve => require(['html/me/set/App'], resolve);//设置页面

const yinsi = resolve => require(['html/me/set/children/App'], resolve);//隐私政策页面

const review = resolve => require(['html/me/review/App'], resolve);//意见反馈页面

const forgetPwd = resolve => require(['html/me/forgetPassword/App'], resolve);//修改密码页面

const setNewPwd = resolve => require(['html/me/setNewPassword/App'], resolve);//设置新密码页面

const share = resolve => require(['html/me/share/App'], resolve);//分享下载页面

const userCore = resolve => require(['html/me/userCore/App'], resolve);//个人中心页面

const skipmMobile = resolve => require(['html/me/skipmMobile/App'], resolve);//个人中心页面

const detailsPage = resolve => require(['html/me/detailsPage/App'], resolve);//个人中心以及好友页面

const subscriptionRegister = resolve => require(['html/me/subscriptionRegister/App'], resolve);//订阅号注册页面

const subscriptionRegisterPersonal = resolve => require(['html/me/subscriptionRegister/children/personal'], resolve);//订阅号身份注册页面

const subscriptionRegisterEnterprise = resolve => require(['html/me/subscriptionRegister/children/enterprise'], resolve);//订阅号企业注册页面

const subscriptionRegisterResult = resolve => require(['html/me/subscriptionRegister/children/result'], resolve);//订阅号企业注册页面

const personalIntegral = resolve => require(['html/me/personalIntegral/App'], resolve);//个人积分页面

const IntegralDetail = resolve => require(['html/me/personalIntegral/children/detail'], resolve);//个人积分详情页面

const integralMall = resolve => require(['html/me/integralMall/App'], resolve);//积分商城页面

const certificate = resolve => require(['html/services/certificate/App'], resolve);//问政页面

const questions = resolve => require(['html/services/questions/App'], resolve);//提问页面

const iconCertificate = resolve => require(['html/services/iconCertificate/App'], resolve);//我的提问页面

const questionAnswer = resolve => require(['html/services/questionAnswer/App'], resolve);//提问详情页面

const complaint = resolve => require(['html/services/complaint/App'], resolve);//企业投诉

const complaintlist = resolve => require(['html/services/complaint/components/complaintlist'], resolve);//企业投诉表

const twoCommunity = resolve => require(['html/twoCommunity/App'], resolve);//台胞园地

const taiweihuodong = resolve => require(['html/taiweihuodong/App'], resolve);//戏迷园地页面

const taiweihuodong_detail = resolve => require(['html/taiweihuodong_detail/App'], resolve);//戏迷园地页面

const tipOff = resolve => require(['html/me/tipOff/App'], resolve);//我要爆料

const tipOffRelease = resolve => require(['html/me/tipOffRelease/App'], resolve);//发表爆料

const ebook = resolve => require(['html/ebook//App'], resolve);//阅读电子书

const subscription = resolve => require(['components/navBottom/subscription/App'], resolve);//订阅号

const sublist = resolve => require(['components/navBottom/subscription/components/sublist'], resolve);//订阅号列表
const subinfo = resolve => require(['components/navBottom/subscription/components/subinfo'], resolve);//订阅号详情

const noData = resolve => require(['components/404.vue'], resolve);//发表爆料
const activitylist = resolve => require(['html/activitypage/activitylist/App'], resolve); //活动列表
const commentsdetails = resolve => require(['html/activitypage/commentsdetails/App'], resolve); //评论详情
const activitydetails = resolve => require(['html/activitypage/activitydetails/App'], resolve); //活动详情
const signup = resolve => require(['html/activitypage/signup/App'], resolve); //报名
const groups = resolve => require(['html/newsiframes/groups'], resolve); //详情页面
const groupslist = resolve => require(['html/newsiframes/groupslist'], resolve); //详情页面
const grounphostys= resolve => require(['html/newsiframes/grounphosty'], resolve); //详情页面
const servergroups= resolve => require(['html/newsiframes/servergroups'], resolve); //详情页面
const MyBrowse = resolve => require(['components/navBottom/me/children/MyBrowse.vue'], resolve);
const MyCollect = resolve => require(['components/navBottom/me/children/MyCollect.vue'], resolve);
const MyTopic = resolve => require(['components/navBottom/me/children/MyTopic.vue'], resolve);
const MyActivity = resolve => require(['components/navBottom/me/children/MyActivity.vue'], resolve);
const wechathtml = resolve => require(['html/services/dongpowechat/App'], resolve); //东坡
const dongpoall = resolve => require(['html/services/dongpolist/App'], resolve); //东坡
const dongpovideos = resolve => require(['html/services/dongpovideo/App'], resolve); //东坡
const puyangall = resolve => require(['html/services/puyanglist/App'], resolve); //濮阳
const dongpovieodetails= resolve => require(['html/services/dongpovieodetails/App'], resolve); //东坡
const reportpages= resolve => require(['html/services/reportpages/App'], resolve); //铁门关举报页面
const reportpagesdetails= resolve => require(['html/services/reportpages/children/App'], resolve); //铁门关举报页面
const leshanGrow = resolve => require(['html/services/leshanGrow/App'], resolve); //乐山成长
const aboutnews = resolve => require(['html/me/us/aboutnews'], resolve);//新增关于我们页面
const fontbig = resolve => require(['html/me/fontbig/App.vue'], resolve);//字体
const livebroadcast = resolve => require(['html/services/livebroadcast/App'], resolve); //新增东坡直播
const readingpages = resolve => require(['html/services/readingpages/App'], resolve); //东坡
const mytipOff = resolve => require(['html/me/mytipOff/App'], resolve);//我的爆料
const newspapers = resolve => require(['html/services/newspaper/App'], resolve);  //报纸
const tvstations = resolve => require(['html/services/tvstation/App'], resolve);  //右玉电视台
const radiobroadcasts = resolve => require(['html/services/radiobroadcast/App'], resolve);  //右玉广播
const newwechatItem = resolve => require(['html/services/newwechatItem/App'], resolve);
Vue.use(Router)
const router = new Router({
    routes: [
        //在此处配置页面初始化要显示的tab底部导航
        /**
         * @params yuxiIndex 玉溪app
         * @params index     红旗app
         */
      
        {
            path: '/',
            name: 'index',
            component: index,
            meta: { keepAlive: true }// 缓存}
        },
        {
            path: '/Login',
            name: 'Login',
            component: Login,
        },
        {
            path: '/ebook',
            name: 'ebook',
            component: ebook,
        },
        {
            path: '/register',
            name: 'register',
            component: register,
        },
        {
            path: '/Details',
            name: 'Details',
            component: Details,
            meta: { keepAlive: false }// 缓存
        },
        {
            path: '/webDetail',
            name: 'webDetail',
            component: webDetail,
        },
        {
            path: '/findseek',
            name: 'findseek',
            component: findseek,
        },
        {
            path: '/seek',
            name: 'seek',
            component: seek,
        },
        {
            path: '/wechat',
            name: 'wechat',
            component: wechat,
        },
        {
            path:'/hcZhengwu',
            name: 'hcZhengwu',
            component: hcZhengwu,
        },
        {
            path: '/wechatItem',
            name: 'wechatItem',
            component: wechatItem,
        },
        {
            path: '/moreListItem',
            name: 'moreListItem',
            component: moreListItem,
        },
        {
            path: '/addNav',
            name: 'addNav',
            component: addNav,
        },
        // {
        //     path:'/news',
        //     name: 'news',
        //     component: news,
        // },
        {
            path:'/firstAmateur',
            name: 'firstAmateur',
            component: firstAmateur,
        },
        // {
        //     path:'/lianganYjq',
        //     name: 'lianganYjq',
        //     component: lianganYjq,
        // },
        // {
        //     path: '/taiweihuodong',
        //     name: 'taiweihuodong',
        //     component: taiweihuodong,
        // },
        {
            path: '/twoCommunity',
            name: 'twoCommunity',
            component: twoCommunity,
        },
        {
            path: '/taiweihuodong',
            name: 'taiweihuodong',
            component: taiweihuodong,
        },
        {
            path: '/taiweihuodong_detail',
            name: 'taiweihuodong_detail',
            component: taiweihuodong_detail,
        },
        {
            path: '/feedBack',
            name: 'feedBack',
            component: feedBack,
        },
        {
            path:'/tipOff',
            name: 'tipOff',
            component: tipOff,
        },
        {
            path:'/tipOffRelease',
            name: 'tipOffRelease',
            component: tipOffRelease,
        },
        {
            path: '/us',
            name: 'us',
            component: us,
        },
        {
            path: '/set',
            name: 'set',
            component: set,
        },
        {
            path: '/yinsi',
            name: 'yinsi',
            component: yinsi,
        },
        {
            path: '/review',
            name: 'review',
            component: review,
        },
        {
            path: '/share',
            name: 'share',
            component: share,
        },
        {
            path: '/forgetPwd',
            name: 'forgetPwd',
            component: forgetPwd,
        },
        {
            path: '/setNewPwd',
            name: 'setNewPwd',
            component: setNewPwd,
        },
        {
            path: '/userCore',
            name: 'userCore',
            component: userCore,
        },
        {
            path: '/skipmMobile',
            name: 'skipmMobile',
            component: skipmMobile,
        },
        {
            path: '/detailsPage',
            name: 'detailsPage',
            component: detailsPage,
        },
        {
            path: '/subscriptionRegister',
            name: 'subscriptionRegister',
            component: subscriptionRegister,
        },
        {
            path: '/subscriptionRegisterPersonal',
            name: 'subscriptionRegisterPersonal',
            component: subscriptionRegisterPersonal,
        },
        {
            path: '/subscriptionRegisterEnterprise',
            name: 'subscriptionRegisterEnterprise',
            component: subscriptionRegisterEnterprise,
        },
        {
            path: '/subscriptionRegisterResult',
            name: 'subscriptionRegisterResult',
            component: subscriptionRegisterResult,
        },
        {
            path: '/personalIntegral',
            name: 'personalIntegral',
            component: personalIntegral,
        },
      {
            path: '/IntegralDetail',
            name: 'IntegralDetail',
            component: IntegralDetail,
        },
        {
            path: '/integralMall',
            name: 'integralMall',
            component: integralMall,
        },
        {
            path: '/Homepage',
            name: 'Homepage',
            component: Homepage,
        },
        {
            path: '/AttentionList',
            name: 'AttentionList',
            component: AttentionList,
        },
        {
            path: '/newAttentionList',
            name: 'newAttentionList',
            component: newAttentionList,
        },
        {
            path: '/Fans',
            name: 'Fans',
            component: Fans,
        },
        {
            path: '/newFans',
            name: 'newFans',
            component: newFans,
        },
        {
            path: '/characters',
            name: 'characters',
            component: characters,
        },
        {
            path: '/articleDetail',
            name: 'articleDetail',
            component: articleDetail,
        },
        {
            path: '/publish',
            name: 'publish',
            component: publish,
        },
        {
            path: '/topicCircleList',
            name: 'topicCircleList',
            component: topicCircleList,
        },
        {
            path: '/topicCircleDetail',
            name: 'topicCircleDetail',
            component: topicCircleDetail,
        },
        {
            path: '/certificate',
            name: 'certificate',
            component: certificate,
        },
        {
            path: '/questions',
            name: 'questions',
            component: questions,
        },
        {
            path: '/iconCertificate',
            name: 'iconCertificate',
            component: iconCertificate,
        },
        {
            path: '/questionAnswer',
            name: 'questionAnswer',
            component: questionAnswer,
        },
        {
            path: '/noData',
            name: 'noData',
            component: noData,
        },
        {
            path: '/activitylist',
            name: 'activitylist',
            component: activitylist,
        },
        {
            path: '/commentsdetails',
            name: 'commentsdetails',
            component: commentsdetails,
        },
        {
            path: '/activitydetails',
            name: 'activitydetails',
            component: activitydetails,
        },
        {
            path: '/signup',
            name: 'signup',
            component: signup,
        },
        {
            path: '/groupslist',
            name: 'groupslist',
            component: groupslist,
        },
        {
            path: '/groups',
            name: 'groups',
            component: groups,
        },
        {
            path: '/grounphostys',
            name: 'grounphostys',
            component: grounphostys,
        },
        {
            path: '/MyBrowse',
            name: 'MyBrowse',
            component: MyBrowse,
        },
        {
            path: '/MyCollect',
            name: 'MyCollect',
            component: MyCollect,
        },
        {
            path: '/MyTopic',
            name: 'MyTopic',
            component: MyTopic,
        },
        {
            path: '/MyActivity',
            name: 'MyActivity',
            component: MyActivity,
        },
        {
            path: '/wechathtml',
            name: 'wechathtml',
            component: wechathtml,
        },
        {
            path: '/dongpoall',
            name: 'dongpoall',
            component: dongpoall,
        },
        {
            path: '/dongpovideos',
            name: 'dongpovideos',
            component: dongpovideos,
        },
        {
            path: '/dongpovieodetails',
            name: 'dongpovieodetails',
            component: dongpovieodetails,
        },
        {
            path: '/puyangall',
            name: 'puyangall',
            component: puyangall,
        },
        {
            path: '/reportpages',
            name: 'reportpages',
            component: reportpages,
        },
        {
            path: '/reportpagesdetails',
            name: 'reportpagesdetails',
            component: reportpagesdetails,
        },
        {
            path: '/leshanGrow',
            name: 'leshanGrow',
            component: leshanGrow,
        },
        {
            path: '/aboutnews',
            name: 'aboutnews',
            component: aboutnews,
        },
        {
            path: '/livebroadcast',
            name: 'livebroadcast',
            component: livebroadcast,
        },
        {
            path: '/subscription',
            name: 'subscription',
            component: subscription,
        },
        {
            path: '/sublist',
            name: 'sublist',
            component: sublist,
        },
        {
            path: '/subinfo',
            name: 'subinfo',
            component: subinfo,
        },
        {
            path: '/complaint',
            name: 'complaint',
            component: complaint,
        },
        {
            path: '/complaintlist',
            name: 'complaintlist',
            component: complaintlist,
        },
        {
            path: '/fontbig',
            name: 'fontbig',
            component: fontbig,
        },
        {
            path: '/readingpages',
            name: 'readingpages',
            component: readingpages,
        },
        {
            path: '/statement',
            name: 'statement',
            component: statement,
        },
        {
            path: '/mytipOff',
            name: 'mytipOff',
            component: mytipOff,
        },
        {
            path: '/servergroups',
            name: 'servergroups',
            component: servergroups,
        },
        {
            path: '/tvstations',
            name: 'tvstations',
            component: tvstations,
        },
        {
            path: '/newspapers',
            name: 'newspapers',
            component: newspapers,
        },
        {
            path: '/radiobroadcasts',
            name: 'radiobroadcasts',
            component: radiobroadcasts,
        },
        {
            path: '/newwechatItem',
            name: 'newwechatItem',
            component: newwechatItem,
        },
    ]
})
router.afterEach(route => {
    let  i = 0;
    if( route.path == '/' && i == 0 ){
        localStorage.setItem('localStorageVersion','0')
        i = 1;
    } else {
        localStorage.setItem('localStorageVersion','111')
    }
});
export default router;
