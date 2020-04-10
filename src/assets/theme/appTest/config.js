function config() {
    var obj = {
        dominantColor: "#fff", //主题颜色
        titlescolors:'#1a1a1a',
        imgHost:'http://111.20.145.19:9001',//发表图文图片线上地址
        api: {
            appInfoId:'18', //18 13
            appShare:'https://www.pgyer.com/e6tD',
            appName:'leshan',
            appWeather:'https://www.tianqiapi.com/api/?version=v6&cityid=101271401', //乐山天气的请求id
            appWeatherUrl:'http://wx.weather.com.cn/mweather/101271401.shtml#1', //乐山天气的请求id
            updataCheckUrlUrl: 'http://111.20.145.19:9001/common_al/common/getNewestAppVersion', // 更新
            questionName:'四川省 乐山市 市辖区',
            questionId:['510000000000','511100000000','511101000000'],
            rmtNews:'com.appbyme.app162383test.Helper',
            news: {
                // http://192.168.4.126:8089
                // column: 'http://leshan.wengetech.com:9080/api/site/qtx/column/listAll', // 栏目
                column: 'http://111.20.145.19:9001/news/getNewsColumn', // 栏目
                // infoListByColumnId: 'http://leshan.wengetech.com:9080/api/site/channels/qtx/columns/',
                infoListByColumnId: 'http://111.20.145.19:9001/news/getNewsColumnData',
                getNewsChannelData: 'http://111.20.145.19:9001/news/getNewsChannelData', // 推荐所有的栏目
                getNewsDetailData: 'http://111.20.145.19:9001/news/getNewsDetailData', // 详情
                getPageListByServeralID: 'http://111.20.145.19:9001http://111.20.145.19:9001_alhttp://111.20.145.19:9001/getPageListByServeralID', // 新华社接口
                getInfoDetailByID: 'http://111.20.145.19:9001http://111.20.145.19:9001_alhttp://111.20.145.19:9001/getInfoDetailByID2', //新华社分享详情
                addReadOrShareNum: 'http://111.20.145.19:9001/news/addReadOrShareNum', //浏览、分享、点赞量
                wenhaiListJson: 'http://111.20.145.19:9001/wenhaiAPI/openAPI/headline/listJson', //闻海
                wenhaiAppHeadLine: 'http://wxservice.wengetech.com/wenhaiFt/openAPI/headline/openAppHeadLine', // 闻海微信矩阵
                wenhaiDisplayConfigs: 'http://111.20.145.19:9001/wenhaiAPI/wxx_al/mod1/displayConfigs', // 闻海 专题
                imgCompress: 'http://111.20.145.19:9001/common_al/common/imgCompress?filePath=',  //图片压缩
                isLike:'http://111.20.145.19:9001/common_al/common/isLike',//是否点赞 
                removeLike:'http://111.20.145.19:9001/common_al/common/removeLike',//取消点赞
                getNewAudio:'http://111.20.145.19:9001/news/getNewAudio',//新闻详情输出语音播报
                addCollectNews:'http://111.20.145.19:9001/my_al/my/addCollectNews', //添加收藏新闻
                delUserFavorites:'http://111.20.145.19:9001/my_al/my/delUserFavorites', //新增删除新闻收藏
                judgeShareNews:'http://111.20.145.19:9001/my_al/my/judgeShareNews', //判断是否收藏过当前新闻
                activitylists:'http://111.20.145.19:9001/activities/searchAll', //活动列表
                activityDetails:'http://111.20.145.19:9001/activities/searchById', //活动列表
                activitylists:'http://111.20.145.19:9001/activities/searchAll', //活动列表
                activityDetails:'http://111.20.145.19:9001/activities/searchById', //活动列表
                activitygetActivities:'http://111.20.145.19:9001/activities/getActivitiesComments', //评论列表
                getNewsComments:'http://111.20.145.19:9001/activities/getNewsComments', //新闻评论列表
                addComment:'http://111.20.145.19:9001/activities/addComment', //活动评论添加
                addNewsComment:'http://111.20.145.19:9001/activities/addNewsComment', //新闻评论添加
                signUp:'http://111.20.145.19:9001/activities/signUp', //报名页面
                signUpStatus:'http://111.20.145.19:9001/activities/signUpStatus', //报名页面
                cancels:'http://111.20.145.19:9001/activities/cancel', //报名页面
                commentLikes:'http://111.20.145.19:9001/activities/commentLike',
                delesay:'http://111.20.145.19:9001/activities/deleteComments', //删除评论
                getCommenlist:'http://111.20.145.19:9001/activities/getCommentById', //新增评论列表接口
                    
            },
            //微社区接口
            community:{
                getHotBlogs:'http://111.20.145.19:9001/community_al/blog/getHotBlogs',//热门列表
                getFollowBlogs:'http://111.20.145.19:9001/community_al/blog/getFollowBlogs',//关注列表
                addBlogInfo:'http://111.20.145.19:9001/community_al/blog/addBlogInfo',//新增博文
                getMyBlogInfoList:'http://111.20.145.19:9001/community_al/blog/getMyBlogInfoList',//个人博文列表
                getOthersBlogInfoList:'http://111.20.145.19:9001/community_al/blog/getOthersBlogInfoList',//他人博文列表
                blogLike:'http://111.20.145.19:9001/community_al/blog/blogLike',//博文点赞
                getBlogLikeList:'http://111.20.145.19:9001/community_al/blog/getBlogLikeList',//博文点赞列表
                addBlogComment:'http://111.20.145.19:9001/community_al/blog/addBlogComment',//新增博文评论
                getBlogCommentList:'http://111.20.145.19:9001/community_al/blog/getBlogCommentList',//获取博文评论列表
                deleteBlogComment:'http://111.20.145.19:9001/community_al/blog/deleteBlogComment',//删除博文评论、
                getUserInfo:'http://111.20.145.19:9001/community_al/user/getUserInfo',//博主信息查询
                getFansList:'http://111.20.145.19:9001/userFans/getFansList',//获取粉丝列表
                getFollowList:'http://111.20.145.19:9001/userFans/getFocusList',//获取关注列表
                followOtherUser:'http://111.20.145.19:9001/community_al/user/followOtherUser',//博主关注/取消关注接口
                sendPrivateLetter:'http://111.20.145.19:9001/community_al/user/sendPrivateLetter',//博主私信接口
                deleteBlogInfo:'http://111.20.145.19:9001/community_al/blog/deleteBlogInfo',//删除博文
                selectTopicByParam:'http://111.20.145.19:9001/topic/selectTopicByParam',//话题列表接口  话题置顶
                selectTopicById:'http://111.20.145.19:9001/topic/selectTopicById',//话题列表详情页接口
                selectThemeById:'http://111.20.145.19:9001/theme/selectThemeById',//主题列表详情页接口
                getThemeTop:'http://111.20.145.19:9001/theme/selectThemeByParam', //主题置顶
                selectTopic:'http://111.20.145.19:9001/topic/selectTopic', //根据ID查询我参与过的话题
                getCorreTopict:'http://111.20.145.19:9001/themePost/selectThemePostByParam',  //查询主题帖
                getStateList:'http://111.20.145.19:9001/blog/getBlog',//信息列表
                deleteBlogInfo:'http://111.20.145.19:9001/blog/deleteBlogInfo',//删除帖子
                getFocusList:'http://111.20.145.19:9001/userFans/getFocusList',//关注列表
                getBlogByIddetails:'http://111.20.145.19:9001/blog/getBlogById', //详情接口圈子
                likeBlogs:'http://111.20.145.19:9001/blog/likeBlog',
                cancelLikeBlogs:'http://111.20.145.19:9001/blog/cancelLikeBlog',
                msgRelease:'http://111.20.145.19:9001/blog/addBlog',//发布朋友圈,
                getStateFocusList:'http://111.20.145.19:9001/blog/getFocusBlog', //查询已关注列表
                addFavorites:'http://111.20.145.19:9001/my_al/my/addFavorites',  //活动，动态收藏接口
                delUserFavorites:'http://111.20.145.19:9001/my_al/my/delUserFavorites' //删除用户活动或动态收藏
            },
            //我的接口
            me:{
                register:'http://leshan.wengetech.com:28086/login_al/login/register', //注册
                loginByCaptcha:'http://leshan.wengetech.com:28086/login_al/login/loginByCaptcha',//登陆 手机号+验证码
                loginByPassword:'http://leshan.wengetech.com:28086/login_al/login/loginByPassword',//登陆 手机号+密码
                getSms:'http://leshan.wengetech.com:28086/login_al/login/getSms',//验证码
                logout:'http://leshan.wengetech.com:28086/login_al/login/logout',//注销
                wechatLogin:'http://leshan.wengetech.com:28086/login_al/wechatlogin/wechatLogin',//微信登陆
                qqLogin:'http://leshan.wengetech.com:28086/login_al/qqlogin/qqLogin',//qq登陆
                weiboLogin:'http://111.20.145.19:9001/login_al/weibologin/weiboLogin',//微博登陆
                modifyUserInfo:'http://111.20.145.19:9001/my_al/my/modifyUserInfo', //修改用户名
                addUserFeedback:'http://111.20.145.19:9001/my_al/my/addUserFeedback',//意见反馈
                getUserCollect:'http://111.20.145.19:9001/my_al/my/getUserCollect', //查看个人收藏
                delUserCollect:'http://111.20.145.19:9001/my_al/my/delUserCollect', //取消收藏新闻
                isCollection:'http://111.20.145.19:9001/my_al/my/isCollection',// 判断是否收藏此新闻
                addReportMaterialInfo: 'http://111.20.145.19:9001/my_al/my/addReportMaterialInfo', //添加报料
                getAllReportMaterialList: 'http://111.20.145.19:9001/my_al/my/getAllReportMaterialList', //全部报料信息
                getMyReportMaterialList: 'http://111.20.145.19:9001/my_al/my/getMyReportMaterialList', //我的报料信息
                selectManageUserById:'http://111.20.145.19:9001/manageUser/selectManageUserById', //查询指定用户详情
                addUserFans:'http://111.20.145.19:9001/userFans/addUserFans',//关注用户
                cancelFans:'http://111.20.145.19:9001/userFans/cancelFans',  //取消关注用户
                addUserBrowse:'http://111.20.145.19:9001/userBrowse/addUserBrowse', //添加用户最近浏览
                selectUserBrowseByParam:'http://111.20.145.19:9001/userBrowse/selectUserBrowseByParam', //查询用户最近浏览
                seachUserFavContent:'http://111.20.145.19:9001/my_al/my/seachUserFavContent', //查看用户收藏接口
                getActivBySignUpUserId:'http://111.20.145.19:9001/activities/getActivitiesBySignUpUserId', //查询用户已经报名的活动列表
                delUserBrowser:'http://111.20.145.19:9001/userBrowse/delUserBrowser', //删除最近浏览的贴子
                getUserCommnets:'http://111.20.145.19:9001/activities/getUserCommnets', //查看我的评论
                getUserSendCommnets:'http://111.20.145.19:9001/activities/getUserSendCommnets', //查看我评论的
                updateManageUserById:'http://111.20.145.19:9001/manageUser/updateManageUserById',  //更新用户信息
                // leshan.wengetech.com
                // 192.168.16.16:9001

                integral_loginUpdate: 'http://111.20.145.19:9001/userExp/loginUpdate', //积分登录接口（测试用）
                integral_updateUserRecordTime: 'http://111.20.145.19:9001/userExp/updateUserRecordTime', //积分任务进度更新接口（测试用）
                integral_searchUserExpItem: 'http://111.20.145.19:9001/userExp/searchUserExpItem', //每日积分明细接口（测试用）
                integral_searchUserTotalExpDaily: 'http://111.20.145.19:9001/userExp/searchUserTotalExpDaily', //每日累计积分接口（测试用）

            },
            //服务接口
            services:{
                //问政
                getWzServiceQuestions: 'http://111.20.145.19:9001/wz_al/wz/getWzServiceQuestions',//问答列表
                getMyWzServiceQuestions: 'http://111.20.145.19:9001/wz_al/wz/getMyWzServiceQuestions',//我的提问列表
                addWzServiceQuestion: 'http://111.20.145.19:9001/wz_al/wz/addWzServiceQuestion',//新增提问
                addWzServiceReplay: 'http://111.20.145.19:9001/wz_al/wz/addWzServiceReplay',//新增回复
                getWzQuestionAndReplayDetail: 'http://111.20.145.19:9001/wz_al/wz/getWzQuestionAndReplayDetail',//问答明细接口
                getWzQuestionObjects: 'http://111.20.145.19:9001/wz_al/wz/getWzQuestionObjects',//获取问题对象接口
                getWzQuestionTypes: 'http://111.20.145.19:9001/wz_al/wz/getWzQuestionTypes',//获取问题性质接口
                getWzQuestionCategory: 'http://111.20.145.19:9001/wz_al/wz/getWzQuestionCategory',//'获取问题分类接口
                getMyWzServiceWaitingList: 'http://111.20.145.19:9001/wz_al/wz/getMyWzServiceWaitingList',//我的待回复列表
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
                components: 'leshan_lives'
            },
            {
                name: '智慧传媒',
                noSelect: require("./images/ta2.png"),
                select: require("./images/selectgSerice2.png"),
                // noSelect: require("./images/anniversary.png"),
                // select: require("./images/anniversary.png"),
                components: 'service'
            },
            {
                name: '社区',
                noSelect: require("./images/noCommunity.png"),
                select: require("./images/community_03.png"),
                components: 'newsCommunity',
                isChaoyang:false
            },{
                name: '我的',
                noSelect: require("./images/noMe.png"),
                select: require("./images/selectMe_05.png"),
                components: 'newMy'
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
                'tuijian': '5ce249190cf2acaeba3f579b', // 推荐
                'xijinpingshijian': '5ce249020cf2acaeba3f579a', // 习近平时间
                'zhiding': '5ce2495b0cf2acaeba3f579f', // 置顶
                'zhibo': '5d134980e4b0e7d3115695de', // 直播
            },
            columnIdChild: ['5cbd6d130cf21169387f12f5', '5cbd6d130cf21169387f12f8','5c22ed81a310abf163b4576e','5c22ed8ca310abf163b45770'], // 子级栏目
            columnIdOrder: ['5ce249190cf2acaeba3f579b'], // 栏目排序
            columnIdHidden: ['5d08ada7e4b0d65b006de717','5d08adeee4b0d65b006de719','5d08adeee4b0d65b006de71b','5d08adeee4b0d65b006de71d','5d08adeee4b0d65b006de71f','5d3d0d6ce4b0bd37b7bb6916',
                '5ce249020cf2acaeba3f579a','5c3844e8a31057f3fd4e247b','5ce2495b0cf2acaeba3f579f','5d1430d1e4b0e7d3115695e6','5d12ccf5e4b0e7d3115695cb','5d12ccf5e4b0e7d3115695cd','5d10d43fe4b0e7d311569598',
                '5d10d43fe4b0e7d311569596','5d10d43fe4b0e7d311569594','5d10d43fe4b0e7d311569592','5d10d43fe4b0e7d311569590','5d10d43fe4b0e7d31156958e','5d10d43fe4b0e7d31156958c','5d10d43fe4b0e7d31156958a',
                '5d10d43fe4b0e7d311569588','5d09facee4b0af4a6f4007de','5d08ae6de4b0d65b006de724','5d08ae1fe4b0d65b006de721','5d08ad70e4b0d65b006de715','5d08ad34e4b0d65b006de713','5d10d43fe4b0e7d311569586',
                '5ce2498a0cf2acaeba3f57a2','5ce2496e0cf2acaeba3f57a1','5ce2496e0cf2acaeba3f57a0','5ce2494b0cf2acaeba3f579e','5ce249210cf2acaeba3f579c','5d134980e4b0e7d3115695de',], // 隐藏栏目 文旅
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
                text: "乐山融媒体",
                content: "乐山市级融媒体平台立足于“新闻+政务+服务”的业务定位，从 “物理空间、体制机制、业务平台”三层面融合进行顶层设计，打造“一屏、五平台、N端” 的软件架构体系，形成“策、采、编、播、发、管、控、馈”立体化内容生产体系，实现“一次采集、多种生成、全媒传播”，把握新闻传播信息可视化、移动优先化、活动直播化的新趋势，通过内容、渠道、平台、管理、运营等方面的深度融合，建成形神兼备、软硬一体的融媒体平台建设解决方案。"
            }
        }
    };
    
    return obj;
}
window.$themeConfig = config()