function config() {
    var obj = {
        dominantColor: "#fff", //主题颜色
        titlesColor:'#1a1a1a',
        imgHost:'http://wanning.wengetech.com:28086',//发表图文图片线上地址
        api: {
            appInfoId:'37',
            appShare:'https://www.pgyer.com/wanning',
            appName:'wanning',
            appWeather:'https://www.tianqiapi.com/api/?version=v6&cityid=101310215', //乐山天气的请求id
            appWeatherUrl:'http://wx.weather.com.cn/mweather/101310215.shtml#1', //乐山天气的请求id
            updataCheckUrlUrl: 'http://wanning.wengetech.com:28086/common_al/common/getNewestAppVersion', // 更新
            questionName:'海南省 省直辖县级行政区划 万宁市',
            questionId:['460000000000','469000000000','469006000000'],
            rmtNews:'com.zkwg.wanningnews.Helper',
            news: {
                // http://192.168.4.126:8089
                // column: 'http://wanning.wengetech.com:9080/api/site/qtx/column/listAll', // 栏目
                    column: 'http://wanning.wengetech.com:9001/news/getNewsColumn', // 栏目
                // infoListByColumnId: 'http://wanning.wengetech.com:9080/api/site/channels/qtx/columns/',
                    infoListByColumnId: 'http://wanning.wengetech.com:9001/news/getNewsColumnData',
                    getNewsChannelData: 'http://wanning.wengetech.com:9001/news/getNewsChannelData', // 推荐所有的栏目
                    getNewsDetailData: 'http://wanning.wengetech.com:9001/news/getNewsDetailData', // 详情
                getPageListByServeralID: 'http://wanning.wengetech.com:28086/xhs_al/xhs/getPageListByServeralID', // 新华社接口
                getInfoDetailByID: 'http://wanning.wengetech.com:28086/xhs_al/xhs/getInfoDetailByID2', //新华社分享详情
                    addReadOrShareNum:'http://wanning.wengetech.com:9001/news/addReadOrShareNum',//阅读量 分享量 点赞量
                wenhaiListJson: 'http://ft.wengetech.com:10001/wenhaiAPI/openAPI/headline/listJson', //闻海
                wenhaiAppHeadLine: 'http://wxservice.wengetech.com/wenhaiFt/openAPI/headline/openAppHeadLine', // 闻海微信矩阵
                wenhaiDisplayConfigs: 'http://ft.wengetech.com:10001/wenhaiAPI/wxx_al/mod1/displayConfigs', // 闻海 专题
                imgCompress: 'http://wanning.wengetech.com:28086/common_al/common/imgCompress?filePath=',  //图片压缩
                isLike:'http://wanning.wengetech.com:28086/common_al/common/isLike',//是否点赞 
                removeLike:'http://wanning.wengetech.com:28086/common_al/common/removeLike',//取消点赞
                    commentLikes:'http://wenchang.wengetech.com:9001/activities/commentLike',//添加取消点赞
                    getNewAudio:'http://wanning.wengetech.com:9001/news/getNewAudio',//新闻详情输出语音播报
                    addCollectNews:'http://wanning.wengetech.com:9001/my_al/my/addCollectNews', //添加收藏新闻
                    delUserFavorites:'http://wanning.wengetech.com:9001/my_al/my/delUserFavorites', //新增删除新闻收藏
                judgeShareNews:'http://wanning.wengetech.com:28086/my_al/my/judgeShareNews', //判断是否收藏过当前新闻
                activitylists:'http://wanning.wengetech.com:9001/activities/searchAll', //活动列表
                activityDetails:'http://wanning.wengetech.com:9001/activities/searchById', //活动列表
                activitygetActivities:'http://wanning.wengetech.com:9001/activities/getActivitiesComments', //评论列表
                getNewsComments:'http://wanning.wengetech.com:9001/activities/getNewsComments', //新闻评论列表
                addComment:'http://wanning.wengetech.com:9001/activities/addComment', //活动评论添加
                addNewsComment:'http://wanning.wengetech.com:9001/activities/addNewsComment', //新闻评论添加
                signUp:'http://wanning.wengetech.com:9001/activities/signUp', //报名页面
                signUpStatus:'http://wanning.wengetech.com:9001/activities/signUpStatus', //报名页面
                cancels:'http://wanning.wengetech.com:9001/activities/cancel', //报名页面
                delesay:'http://wanning.wengetech.com:9001/activities/deleteComments', //删除评论
            },
            //微社区接口
            community:{
                getHotBlogs:'http://wanning.wengetech.com:28086/community_al/blog/getHotBlogs',//热门列表
                getFollowBlogs:'http://wanning.wengetech.com:28086/community_al/blog/getFollowBlogs',//关注列表
                addBlogInfo:'http://wanning.wengetech.com:28086/community_al/blog/addBlogInfo',//新增博文
                getMyBlogInfoList:'http://wanning.wengetech.com:28086/community_al/blog/getMyBlogInfoList',//个人博文列表
                getOthersBlogInfoList:'http://wanning.wengetech.com:28086/community_al/blog/getOthersBlogInfoList',//他人博文列表
                blogLike:'http://wanning.wengetech.com:28086/community_al/blog/blogLike',//博文点赞
                getBlogLikeList:'http://wanning.wengetech.com:28086/community_al/blog/getBlogLikeList',//博文点赞列表
                addBlogComment:'http://wanning.wengetech.com:28086/community_al/blog/addBlogComment',//新增博文评论
                getBlogCommentList:'http://wanning.wengetech.com:28086/community_al/blog/getBlogCommentList',//获取博文评论列表
                deleteBlogComment:'http://wanning.wengetech.com:28086/community_al/blog/deleteBlogComment',//删除博文评论、
                getUserInfo:'http://wanning.wengetech.com:28086/community_al/user/getUserInfo',//博主信息查询
                getFansList:'http://wanning.wengetech.com:28086/community_al/user/getFansList',//获取粉丝列表
                getFollowList:'http://wanning.wengetech.com:28086/community_al/user/getFollowList',//获取关注列表
                followOtherUser:'http://wanning.wengetech.com:28086/community_al/user/followOtherUser',//博主关注/取消关注接口
                sendPrivateLetter:'http://wanning.wengetech.com:28086/community_al/user/sendPrivateLetter',//博主私信接口
                deleteBlogInfo:'http://wanning.wengetech.com:28086/community_al/blog/deleteBlogInfo',//删除博文

                addFavorites:'http://wanning.wengetech.com:9001/my_al/my/addFavorites',  //活动，动态收藏接口
                delUserFavorites:'http://wanning.wengetech.com:9001/my_al/my/delUserFavorites' //删除用户活动或动态收藏
            },
            //我的接口
            me:{
                register:'http://wanning.wengetech.com:28086/login_al/login/register',//注册
                loginByCaptcha:'http://wanning.wengetech.com:28086/login_al/login/loginByCaptcha',//登陆 手机号+验证码
                loginByPassword:'http://wanning.wengetech.com:28086/login_al/login/loginByPassword',//登陆 手机号+密码
                getSms:'http://wanning.wengetech.com:28086/login_al/login/getSms',//验证码
                logout:'http://wanning.wengetech.com:28086/login_al/login/logout',//注销
                wechatLogin:'http://wanning.wengetech.com:28086/login_al/wechatlogin/wechatLogin',//微信登陆
                qqLogin:'http://wanning.wengetech.com:28086/login_al/qqlogin/qqLogin',//qq登陆
                weiboLogin:'http://wanning.wengetech.com:28086/login_al/weibologin/weiboLogin',//微博登陆
                modifyUserInfo:'http://wanning.wengetech.com:28086/my_al/my/modifyUserInfo', //修改用户名
                addUserFeedback:'http://wanning.wengetech.com:28086/my_al/my/addUserFeedback',//意见反馈
                getUserCollect:'http://wanning.wengetech.com:28086/my_al/my/getUserCollect', //查看个人收藏
                delUserCollect:'http://wanning.wengetech.com:28086/my_al/my/delUserCollect', //取消收藏新闻
                isCollection:'http://wanning.wengetech.com:28086/my_al/my/isCollection',// 判断是否收藏此新闻
                addReportMaterialInfo:'http://wanning.wengetech.com:28086/my_al/my/addReportMaterialInfo', //添加报料
                getAllReportMaterialList:'http://wanning.wengetech.com:28086/my_al/my/getAllReportMaterialList', //全部报料信息
                getMyReportMaterialList:'http://wanning.wengetech.com:28086/my_al/my/getMyReportMaterialList', //我的报料信息

                seachUserFavContent:'http://wanning.wengetech.com:9001/my_al/my/seachUserFavContent', //查看用户收藏接口
                addUserBrowse:'http://wanning.wengetech.com:9001/userBrowse/addUserBrowse', //添加用户最近浏览
                getActivBySignUpUserId:'http://wanning.wengetech.com:9001/activities/getActivitiesBySignUpUserId', //查询用户已经报名的活动列表
            },
            //服务接口
            services:{
                //问政
                getWzServiceQuestions:'http://wanning.wengetech.com:28086/wz_al/wz/getWzServiceQuestions',//问答列表
                getMyWzServiceQuestions:'http://wanning.wengetech.com:28086/wz_al/wz/getMyWzServiceQuestions',//我的提问列表
                addWzServiceQuestion:'http://wanning.wengetech.com:28086/wz_al/wz/addWzServiceQuestion',//新增提问
                addWzServiceReplay:'http://wanning.wengetech.com:28086/wz_al/wz/addWzServiceReplay',//新增回复
                getWzQuestionAndReplayDetail:'http://wanning.wengetech.com:28086/wz_al/wz/getWzQuestionAndReplayDetail',//问答明细接口
                getWzQuestionObjects:'http://wanning.wengetech.com:28086/wz_al/wz/getWzQuestionObjects',//获取问题对象接口
                getWzQuestionTypes:'http://wanning.wengetech.com:28086/wz_al/wz/getWzQuestionTypes',//获取问题性质接口
                getWzQuestionCategory:'http://wanning.wengetech.com:28086/wz_al/wz/getWzQuestionCategory',//'获取问题分类接口
                getMyWzServiceWaitingList:'http://wanning.wengetech.com:28086/wz_al/wz/getMyWzServiceWaitingList',//我的待回复列表
            }
        },
        homeTabbar: [
            {
                name: '新闻',
                noSelect: require("./images/noNews.png"),
                select: require("./images/selectNews_03.png"),
                components: 'news'
            },{
                name: '直播',
                noSelect: require("./images/onTv.png"),
                select: require("./images/selectTv_03.png"),
                components: 'wanning_zhibo'
            },
            {
                name: '市民云',
                noSelect: require("./images/ta2.png"),
                select: require("./images/selectgSerice2.png"),
                components: 'service'
            },
            {
                name: '融媒',
                noSelect: require("./images/noCommunity.png"),
                select: require("./images/community_03.png"),
                components: 'baishaRm',
                isChaoyang:false
            },{
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
                'tuijian': '5d8c1c6ae4b09940a1515aec', // 推荐
                'xijinpingshijian': '5d8c1c6ae4b09940a1515aed', // 习近平时间
                'zhiding': '5d8c1c6ae4b09940a1515af0', // 置顶
                'zhibo': '5d8c1c6ae4b09940a1515af3', // 直播
            },
            columnIdChild: ['5cbd6d130cf21169387f12f5', '5cbd6d130cf21169387f12f8','5c22ed81a310abf163b4576e','5c22ed8ca310abf163b45770'], // 子级栏目
            columnIdOrder: ['5d8c1c6ae4b09940a1515aec'], // 栏目排序
            columnIdHidden: ['5d8c1c6ae4b09940a1515af0','5d8c1c6ae4b09940a1515af3'], // 隐藏栏目 文旅
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
                text: "万宁融媒体",
                content: "万宁市级融媒体平台立足于“新闻+政务+服务”的业务定位，从 “物理空间、体制机制、业务平台”三层面融合进行顶层设计，打造“一屏、五平台、N端” 的软件架构体系，形成“策、采、编、播、发、管、控、馈”立体化内容生产体系，实现“一次采集、多种生成、全媒传播”，把握新闻传播信息可视化、移动优先化、活动直播化的新趋势，通过内容、渠道、平台、管理、运营等方面的深度融合，建成形神兼备、软硬一体的融媒体平台建设解决方案。"
            }
        }
    };
    
    return obj;
}
window.$themeConfig = config()