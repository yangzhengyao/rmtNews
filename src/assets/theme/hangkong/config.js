function config() {
    var obj = {
        dominantColor: "#fff", //主题颜色
        titlesColor:'#1a1a1a',
        imgHost:'http://hangkong.wengetech.com:28086',//发表图文图片线上地址
        api: {
            appInfoId:'36',
            appShare:'https://www.pgyer.com/9990',
            appName:'hangkong',
            appWeather:'https://www.tianqiapi.com/api/?version=v6&cityid=101010100', //乐山天气的请求id
            appWeatherUrl:'http://wx.weather.com.cn/mweather/101010100.shtml#1', //乐山天气的请求id
            updataCheckUrlUrl: 'http://hangkong.wengetech.com:28086/common_al/common/getNewestAppVersion', // 更新
            questionName:'北京市 市辖区 海淀区',
            questionId:['110000000000','110100000000','110108000000'],
            rmtNews:'com.zkwg.hangkongnews.Helper',
            news: {
                // http://192.168.4.126:8089
                // column: 'http://hangkong.wengetech.com:9080/api/site/qtx/column/listAll', // 栏目
                    column: 'http://hangkong.wengetech.com:9001/news/getNewsColumn', // 栏目
                // infoListByColumnId: 'http://hangkong.wengetech.com:9080/api/site/channels/qtx/columns/',
                    infoListByColumnId: 'http://hangkong.wengetech.com:9001/news/getNewsColumnData',
                    getNewsChannelData: 'http://hangkong.wengetech.com:9001/news/getNewsChannelData', // 推荐所有的栏目
                    getNewsDetailData: 'http://hangkong.wengetech.com:9001/news/getNewsDetailData', // 详情
                getPageListByServeralID: 'http://hangkong.wengetech.com:28086/xhs_al/xhs/getPageListByServeralID', // 新华社接口
                getInfoDetailByID: 'http://hangkong.wengetech.com:28086/xhs_al/xhs/getInfoDetailByID2', //新华社分享详情
                    addReadOrShareNum:'http://hangkong.wengetech.com:9001/news/addReadOrShareNum',//阅读量 分享量 点赞量
                wenhaiListJson: 'http://ft.wengetech.com:10001/wenhaiAPI/openAPI/headline/listJson', //闻海
                wenhaiAppHeadLine: 'http://wxservice.wengetech.com/wenhaiFt/openAPI/headline/openAppHeadLine', // 闻海微信矩阵
                wenhaiDisplayConfigs: 'http://ft.wengetech.com:10001/wenhaiAPI/wxx_al/mod1/displayConfigs', // 闻海 专题
                imgCompress: 'http://hangkong.wengetech.com:28086/common_al/common/imgCompress?filePath=',  //图片压缩
                isLike:'http://hangkong.wengetech.com:28086/common_al/common/isLike',//是否点赞 
                removeLike:'http://hangkong.wengetech.com:28086/common_al/common/removeLike',//取消点赞
                    commentLikes:'http://wenchang.wengetech.com:9001/activities/commentLike',//添加取消点赞
                    getNewAudio:'http://hangkong.wengetech.com:9001/news/getNewAudio',//新闻详情输出语音播报
                    addCollectNews:'http://hangkong.wengetech.com:9001/my_al/my/addCollectNews', //添加收藏新闻
                    delUserFavorites:'http://hangkong.wengetech.com:9001/my_al/my/delUserFavorites', //新增删除新闻收藏
                judgeShareNews:'http://hangkong.wengetech.com:28086/my_al/my/judgeShareNews', //判断是否收藏过当前新闻
                activitylists:'http://hangkong.wengetech.com:9001/activities/searchAll', //活动列表
                activityDetails:'http://hangkong.wengetech.com:9001/activities/searchById', //活动列表
                activitygetActivities:'http://hangkong.wengetech.com:9001/activities/getActivitiesComments', //评论列表
                getNewsComments:'http://hangkong.wengetech.com:9001/activities/getNewsComments', //新闻评论列表
                addComment:'http://hangkong.wengetech.com:9001/activities/addComment', //活动评论添加
                addNewsComment:'http://hangkong.wengetech.com:9001/activities/addNewsComment', //新闻评论添加
                signUp:'http://hangkong.wengetech.com:9001/activities/signUp', //报名页面
                signUpStatus:'http://hangkong.wengetech.com:9001/activities/signUpStatus', //报名页面
                cancels:'http://hangkong.wengetech.com:9001/activities/cancel', //报名页面
                delesay:'http://hangkong.wengetech.com:9001/activities/deleteComments', //删除评论
            },
            //微社区接口
            community:{
                getHotBlogs:'http://hangkong.wengetech.com:28086/community_al/blog/getHotBlogs',//热门列表
                getFollowBlogs:'http://hangkong.wengetech.com:28086/community_al/blog/getFollowBlogs',//关注列表
                addBlogInfo:'http://hangkong.wengetech.com:28086/community_al/blog/addBlogInfo',//新增博文
                getMyBlogInfoList:'http://hangkong.wengetech.com:28086/community_al/blog/getMyBlogInfoList',//个人博文列表
                getOthersBlogInfoList:'http://hangkong.wengetech.com:28086/community_al/blog/getOthersBlogInfoList',//他人博文列表
                blogLike:'http://hangkong.wengetech.com:28086/community_al/blog/blogLike',//博文点赞
                getBlogLikeList:'http://hangkong.wengetech.com:28086/community_al/blog/getBlogLikeList',//博文点赞列表
                addBlogComment:'http://hangkong.wengetech.com:28086/community_al/blog/addBlogComment',//新增博文评论
                getBlogCommentList:'http://hangkong.wengetech.com:28086/community_al/blog/getBlogCommentList',//获取博文评论列表
                deleteBlogComment:'http://hangkong.wengetech.com:28086/community_al/blog/deleteBlogComment',//删除博文评论、
                getUserInfo:'http://hangkong.wengetech.com:28086/community_al/user/getUserInfo',//博主信息查询
                getFansList:'http://hangkong.wengetech.com:28086/community_al/user/getFansList',//获取粉丝列表
                getFollowList:'http://hangkong.wengetech.com:28086/community_al/user/getFollowList',//获取关注列表
                followOtherUser:'http://hangkong.wengetech.com:28086/community_al/user/followOtherUser',//博主关注/取消关注接口
                sendPrivateLetter:'http://hangkong.wengetech.com:28086/community_al/user/sendPrivateLetter',//博主私信接口
                deleteBlogInfo:'http://hangkong.wengetech.com:28086/community_al/blog/deleteBlogInfo',//删除博文

                addFavorites:'http://hangkong.wengetech.com:9001/my_al/my/addFavorites',  //活动，动态收藏接口
                delUserFavorites:'http://hangkong.wengetech.com:9001/my_al/my/delUserFavorites' //删除用户活动或动态收藏
            },
            //我的接口
            me:{
                register:'http://hangkong.wengetech.com:28086/login_al/login/register',//注册
                loginByCaptcha:'http://hangkong.wengetech.com:28086/login_al/login/loginByCaptcha',//登陆 手机号+验证码
                loginByPassword:'http://hangkong.wengetech.com:28086/login_al/login/loginByPassword',//登陆 手机号+密码
                getSms:'http://hangkong.wengetech.com:28086/login_al/login/getSms',//验证码
                logout:'http://hangkong.wengetech.com:28086/login_al/login/logout',//注销
                wechatLogin:'http://hangkong.wengetech.com:28086/login_al/wechatlogin/wechatLogin',//微信登陆
                qqLogin:'http://hangkong.wengetech.com:28086/login_al/qqlogin/qqLogin',//qq登陆
                weiboLogin:'http://hangkong.wengetech.com:28086/login_al/weibologin/weiboLogin',//微博登陆
                modifyUserInfo:'http://hangkong.wengetech.com:28086/my_al/my/modifyUserInfo', //修改用户名
                addUserFeedback:'http://hangkong.wengetech.com:28086/my_al/my/addUserFeedback',//意见反馈
                getUserCollect:'http://hangkong.wengetech.com:28086/my_al/my/getUserCollect', //查看个人收藏
                delUserCollect:'http://hangkong.wengetech.com:28086/my_al/my/delUserCollect', //取消收藏新闻
                isCollection:'http://hangkong.wengetech.com:28086/my_al/my/isCollection',// 判断是否收藏此新闻
                addReportMaterialInfo:'http://hangkong.wengetech.com:28086/my_al/my/addReportMaterialInfo', //添加报料
                getAllReportMaterialList:'http://hangkong.wengetech.com:28086/my_al/my/getAllReportMaterialList', //全部报料信息
                getMyReportMaterialList:'http://hangkong.wengetech.com:28086/my_al/my/getMyReportMaterialList', //我的报料信息

                seachUserFavContent:'http://hangkong.wengetech.com:9001/my_al/my/seachUserFavContent', //查看用户收藏接口
                addUserBrowse:'http://hangkong.wengetech.com:9001/userBrowse/addUserBrowse', //添加用户最近浏览
                getActivBySignUpUserId:'http://hangkong.wengetech.com:9001/activities/getActivitiesBySignUpUserId', //查询用户已经报名的活动列表
            },
            //服务接口
            services:{
                //问政
                getWzServiceQuestions:'http://hangkong.wengetech.com:28086/wz_al/wz/getWzServiceQuestions',//问答列表
                getMyWzServiceQuestions:'http://hangkong.wengetech.com:28086/wz_al/wz/getMyWzServiceQuestions',//我的提问列表
                addWzServiceQuestion:'http://hangkong.wengetech.com:28086/wz_al/wz/addWzServiceQuestion',//新增提问
                addWzServiceReplay:'http://hangkong.wengetech.com:28086/wz_al/wz/addWzServiceReplay',//新增回复
                getWzQuestionAndReplayDetail:'http://hangkong.wengetech.com:28086/wz_al/wz/getWzQuestionAndReplayDetail',//问答明细接口
                getWzQuestionObjects:'http://hangkong.wengetech.com:28086/wz_al/wz/getWzQuestionObjects',//获取问题对象接口
                getWzQuestionTypes:'http://hangkong.wengetech.com:28086/wz_al/wz/getWzQuestionTypes',//获取问题性质接口
                getWzQuestionCategory:'http://hangkong.wengetech.com:28086/wz_al/wz/getWzQuestionCategory',//'获取问题分类接口
                getMyWzServiceWaitingList:'http://hangkong.wengetech.com:28086/wz_al/wz/getMyWzServiceWaitingList',//我的待回复列表
            }
        },
        homeTabbar: [
            {
                name: '头条',
                noSelect: require("./images/noNews.png"),
                select: require("./images/selectNews_03.png"),
                components: 'news'
            },
            {
                name: '百科',
                noSelect: require("./images/noWenlv.png"),
                select: require("./images/selectWenlv.png"),
                components: 'hankgong_baike'
            },
            // {
            //     name: '市民云',
            //     noSelect: require("./images/ta2.png"),
            //     select: require("./images/selectgSerice2.png"),
            //     components: 'service'
            // },
            {
                name: '专题',
                noSelect: require("./images/noCommunity.png"),
                select: require("./images/community_03.png"),
                components: 'hankgong_zhuanti',
                isChaoyang:false
            },
            {
                name: '我的',
                noSelect: require("./images/noMe.png"),
                select: require("./images/selectMe_05.png"),
                components: 'me'
            },
        ],
        news: { // 新闻
            parentId: {
                qinqiang: '',
                wenlv: '',
                kanTV: '',
                xinshidai: ''
            },
            columnId: {
                'redian': '5c37f76ea31057f3fd4e207b', // 要闻
                'tuijian': '5c7e3ef40cf28d7f9fb8f000', // 推荐
                'xijinpingshijian': '5d8c5380e4b09940a1515b3f', // 习近平时间
                'tupian': '5c7e3f050cf28d7f9fb8f001', // 图片
                'shipin': '5c7e3f0f0cf28d7f9fb8f002', // 视频
                'zhiding': '5d9bf054e4b0868a6bc4b34d', // 置顶
                'shizheng': '5c7e3f410cf28d7f9fb8f004', // 时政
                'shehui': '5c7e3f4e0cf28d7f9fb8f005', // 社会
                'zhibo': '5d905249e4b0ab24122c0515', // 直播
            },
            columnIdChild: ['5cbd6d130cf21169387f12f5', '5cbd6d130cf21169387f12f8','5c22ed81a310abf163b4576e','5c22ed8ca310abf163b45770'], // 子级栏目
            columnIdOrder: ['5d8c5380e4b09940a1515b3f'], // 栏目排序
            columnIdHidden: ['5c3844e8a31057f3fd4e247b','5d9bf054e4b0868a6bc4b34d','5d905249e4b0ab24122c0515'], // 隐藏栏目 文旅
            columnIdXhs: ['5c10cfcaa310abf163b45664'], // 请求新华社的栏目
            columnIdWenhaiListJson: [], // 请求闻海
            lianghuiChild: ['5c34304ea310d0f746b3ad23','5c343068a310d0f746b3ad26','5c343086a310d0f746b3ad29','5c343094a310d0f746b3ad2c'],
            lianghuiChildChild: ['5c34687ea310d0f746b3ad35','5c346890a310d0f746b3ad38','5c3468a0a310d0f746b3ad3b'],
            imgError: require("./images/img_error_s.jpg")
        },
        wenlv: {
            parentId: {
                qinqiang: '',
                wenlv: '5c3844e8a31057f3fd4e247b',
                lvyoujingqu: '',
                xinshidai: ''
            },
            columnId: {
                'lvyoujingqu': '' // 三级子级
            },
            columnIdOrder: ['5c384548a31057f3fd4e247d', '5c384548a31057f3fd4e247f','5c384548a31057f3fd4e2481','5c384548a31057f3fd4e2483'], // 栏目排序
            columnIdChild: [''], // 子级栏目
            xinshidaiChild: []
        },
        hcChild:{
            columnIdOrder: ['5cd2874b0cf2acaeba3f53c5', '5cd2874b0cf2acaeba3f53c7','5cd2874b0cf2acaeba3f53c9','5cd2874b0cf2acaeba3f53cb'], // 栏目排序
            columnIdHidden: ['5c22eb8da310abf163b4575c','5c22eb8da310abf163b4575e']
        },
        qinqiang: {
            columnIdOrder: [], // 栏目排序
            columnIdHidden: []
        },
        services: {},
        me: {
            // 关于我们
            us: {
                text: "装备智搜",
                content: "装备智搜平台介绍"
            }
        }
    };
    
    return obj;
}
window.$themeConfig = config()