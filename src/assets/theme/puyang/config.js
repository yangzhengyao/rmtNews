function config() {
    var obj = {
        dominantColor: "#fff", //主题颜色
        titlesColor:'#1a1a1a',
        imgHost:'http://puyang.wengetech.com:28086',//发表图文图片线上地址
        api: {
            appInfoId:'10',
            appShare:'https://www.pgyer.com/r921',
            appName:'puyang',
            appWeather:'https://www.tianqiapi.com/api/?version=v6&cityid=101181301', //青铜峡天气的请求id
            appWeatherUrl:'http://wx.weather.com.cn/mweather/101181301.shtml#1', //青铜峡天气的请求id
            updataCheckUrlUrl: 'http://puyang.wengetech.com:28086/common_al/common/getNewestAppVersion', // 更新
            questionName:'河南省 濮阳市 濮阳县',
            questionId:['410000000000','410900000000','410928000000'],
            rmtNews:'com.zkwg.pynews.Helper',
            news: {
                // http://192.168.4.126:8089
                // column: 'http://puyang.wengetech.com:9080/api/site/qtx/column/listAll', // 栏目
                column: 'http://puyang.wengetech.com:9001/news/getNewsColumn', // 栏目
                // infoListByColumnId: 'http://puyang.wengetech.com:9080/api/site/channels/qtx/columns/',
                infoListByColumnId: 'http://puyang.wengetech.com:9001/news/getNewsColumnData',
                getNewsChannelData: 'http://puyang.wengetech.com:9001/news/getNewsChannelData', // 推荐所有的栏目
                getNewsDetailData: 'http://puyang.wengetech.com:9001/news/getNewsDetailData', // 详情
                getPageListByServeralID: 'http://puyang.wengetech.com:28086/xhs_al/xhs/getPageListByServeralID', // 新华社接口
                getInfoDetailByID: 'http://puyang.wengetech.com:28086/xhs_al/xhs/getInfoDetailByID2', //新华社分享详情
                addReadOrShareNum: 'http://puyang.wengetech.com:9001/news/addReadOrShareNum', //浏览、分享、点赞量
                wenhaiListJson: 'http://puyang.wengetech.com:10001/wenhaiAPI/openAPI/headline/listJson', //闻海
                wenhaiAppHeadLine: 'http://wxservice.wengetech.com/wenhaiFt/openAPI/headline/openAppHeadLine', // 闻海微信矩阵
                wenhaiDisplayConfigs: 'http://puyang.wengetech.com:10001/wenhaiAPI/wxx_al/mod1/displayConfigs', // 闻海 专题
                imgCompress: 'http://puyang.wengetech.com:28086/common_al/common/imgCompress?filePath=',  //图片压缩
                isLike:'http://puyang.wengetech.com:28086/common_al/common/isLike',//是否点赞 
                removeLike:'http://puyang.wengetech.com:28086/common_al/common/removeLike',//取消点赞
                commentLikes:'http://puyang.wengetech.com:9001/activities/commentLike',
                getNewAudio:'http://puyang.wengetech.com:9001/news/getNewAudio',//新闻详情输出语音播报
                addCollectNews:'http://puyang.wengetech.com:9001/my_al/my/addCollectNews', //添加收藏新闻
                delUserFavorites:'http://puyang.wengetech.com:9001/my_al/my/delUserFavorites', //新增删除新闻收藏
                judgeShareNews:'http://puyang.wengetech.com:28086/my_al/my/judgeShareNews', //判断是否收藏过当前新闻
                activitylists:'http://puyang.wengetech.com:9001/activities/searchAll', //活动列表
                activityDetails:'http://puyang.wengetech.com:9001/activities/searchById', //活动列表
                activitygetActivities:'http://puyang.wengetech.com:9001/activities/getActivitiesComments', //评论列表
                getNewsComments:'http://puyang.wengetech.com:9001/activities/getNewsComments', //新闻评论列表
                addComment:'http://puyang.wengetech.com:9001/activities/addComment', //活动评论添加
                addNewsComment:'http://puyang.wengetech.com:9001/activities/addNewsComment', //新闻评论添加
                signUp:'http://puyang.wengetech.com:9001/activities/signUp', //报名页面
                signUpStatus:'http://hongqi.wengetech.com:9001/activities/signUpStatus', //报名页面
                cancels:'http://puyang.wengetech.com:9001/activities/cancel', //报名页面
                delesay:'http://puyang.wengetech.com:9001/activities/deleteComments', //删除评论
                getCommenlist:'http://puyang.wengetech.com:9001/activities/getCommentById', //新增评论列表接
            },
            //微社区接口
            community:{
                getHotBlogs:'http://puyang.wengetech.com:28086/community_al/blog/getHotBlogs',//热门列表
                getFollowBlogs:'http://puyang.wengetech.com:28086/community_al/blog/getFollowBlogs',//关注列表
                addBlogInfo:'http://puyang.wengetech.com:28086/community_al/blog/addBlogInfo',//新增博文
                getMyBlogInfoList:'http://puyang.wengetech.com:28086/community_al/blog/getMyBlogInfoList',//个人博文列表
                getOthersBlogInfoList:'http://puyang.wengetech.com:28086/community_al/blog/getOthersBlogInfoList',//他人博文列表
                blogLike:'http://puyang.wengetech.com:28086/community_al/blog/blogLike',//博文点赞
                getBlogLikeList:'http://puyang.wengetech.com:28086/community_al/blog/getBlogLikeList',//博文点赞列表
                addBlogComment:'http://puyang.wengetech.com:28086/community_al/blog/addBlogComment',//新增博文评论
                getBlogCommentList:'http://puyang.wengetech.com:28086/community_al/blog/getBlogCommentList',//获取博文评论列表
                deleteBlogComment:'http://puyang.wengetech.com:28086/community_al/blog/deleteBlogComment',//删除博文评论、
                getUserInfo:'http://puyang.wengetech.com:28086/community_al/user/getUserInfo',//博主信息查询
                getFansList:'http://puyang.wengetech.com:9001/userFans/getFansList',//获取粉丝列表
                getFollowList:'http://puyang.wengetech.com:9001/userFans/getFocusList',//获取关注列表
                followOtherUser:'http://puyang.wengetech.com:28086/community_al/user/followOtherUser',//博主关注/取消关注接口
                sendPrivateLetter:'http://puyang.wengetech.com:28086/community_al/user/sendPrivateLetter',//博主私信接口
                deleteBlogInfo:'http://puyang.wengetech.com:28086/community_al/blog/deleteBlogInfo',//删除博文
                selectTopicByParam:'http://puyang.wengetech.com:9001/topic/selectTopicByParam',//话题列表接口  话题置顶
                selectTopicById:'http://puyang.wengetech.com:9001/topic/selectTopicById',//话题列表详情页接口
                selectThemeById:'http://puyang.wengetech.com:9001/theme/selectThemeById',//主题列表详情页接口
                getThemeTop:'http://puyang.wengetech.com:9001/theme/selectThemeByParam', //主题置顶
                selectTopic:'http://puyang.wengetech.com:9001/topic/selectTopic', //根据ID查询我参与过的话题
                getCorreTopict:'http://puyang.wengetech.com:9001/themePost/selectThemePostByParam',  //查询主题帖
                getStateList:'http://puyang.wengetech.com:9001/blog/getBlog',//信息列表
                getFocusList:'http://puyang.wengetech.com:9001/userFans/getFocusList',//关注列表
                getBlogByIddetails:'http://puyang.wengetech.com:9001/blog/getBlogById', //详情接口圈子
                likeBlogs:'http://puyang.wengetech.com:9001/blog/likeBlog',
                cancelLikeBlogs:'http://puyang.wengetech.com:9001/blog/cancelLikeBlog',
                msgRelease:'http://puyang.wengetech.com:9001/blog/addBlog',//发布朋友圈

                addFavorites:'http://puyang.wengetech.com:9001/my_al/my/addFavorites',  //活动，动态收藏接口
                delUserFavorites:'http://puyang.wengetech.com:9001/my_al/my/delUserFavorites' //删除用户活动或动态收藏
            },
            //我的接口
            me:{
                register:'http://puyang.wengetech.com:28086/login_al/login/register',//注册
                loginByCaptcha:'http://puyang.wengetech.com:28086/login_al/login/loginByCaptcha',//登陆 手机号+验证码
                loginByPassword:'http://puyang.wengetech.com:28086/login_al/login/loginByPassword',//登陆 手机号+密码
                getSms:'http://puyang.wengetech.com:28086/login_al/login/getSms',//验证码
                logout:'http://puyang.wengetech.com:28086/login_al/login/logout',//注销
                wechatLogin:'http://puyang.wengetech.com:28086/login_al/wechatlogin/wechatLogin',//微信登陆
                qqLogin:'http://puyang.wengetech.com:28086/login_al/qqlogin/qqLogin',//qq登陆
                weiboLogin:'http://puyang.wengetech.com:28086/login_al/weibologin/weiboLogin',//微博登陆
                modifyUserInfo:'http://puyang.wengetech.com:28086/my_al/my/modifyUserInfo', //修改用户名
                addUserFeedback:'http://puyang.wengetech.com:28086/my_al/my/addUserFeedback',//意见反馈
                getUserCollect:'http://puyang.wengetech.com:28086/my_al/my/getUserCollect', //查看个人收藏
                delUserCollect:'http://puyang.wengetech.com:28086/my_al/my/delUserCollect', //取消收藏新闻
                isCollection:'http://puyang.wengetech.com:28086/my_al/my/isCollection',// 判断是否收藏此新闻
                addReportMaterialInfo: 'http://puyang.wengetech.com:28086/my_al/my/addReportMaterialInfo', //添加报料
                getAllReportMaterialList: 'http://puyang.wengetech.com:28086/my_al/my/getAllReportMaterialList', //全部报料信息
                getMyReportMaterialList: 'http://puyang.wengetech.com:28086/my_al/my/getMyReportMaterialList', //我的报料信息
                selectManageUserById:'http://hongqi.wengetech.com:9001/manageUser/selectManageUserById', //查询指定用户详情
                addUserFans:'http://hongqi.wengetech.com:9001/userFans/addUserFans',//关注用户
                cancelFans:'http://hongqi.wengetech.com:9001/userFans/cancelFans',  //取消关注用户

                seachUserFavContent:'http://puyang.wengetech.com:9001/my_al/my/seachUserFavContent', //查看用户收藏接口
                addUserBrowse:'http://puyang.wengetech.com:9001/userBrowse/addUserBrowse', //添加用户最近浏览
                getActivBySignUpUserId:'http://puyang.wengetech.com:9001/activities/getActivitiesBySignUpUserId', //查询用户已经报名的活动列表

                integral_loginUpdate: 'http://puyang.wengetech.com:9001/userExp/loginUpdate', //积分登录接口（测试用）
                integral_updateUserRecordTime: 'http://puyang.wengetech.com:9001/userExp/updateUserRecordTime', //积分任务进度更新接口（测试用）
                integral_searchUserExpItem: 'http://puyang.wengetech.com:9001/userExp/searchUserExpItem', //每日积分明细接口（测试用）
                integral_searchUserTotalExpDaily: 'http://puyang.wengetech.com:9001/userExp/searchUserTotalExpDaily', //每日累计积分接口（测试用）
            },
            //服务接口
            services:{
                //问政
                getWzServiceQuestions: 'http://puyang.wengetech.com:28086/wz_al/wz/getWzServiceQuestions',//问答列表
                getMyWzServiceQuestions: 'http://puyang.wengetech.com:28086/wz_al/wz/getMyWzServiceQuestions',//我的提问列表
                addWzServiceQuestion: 'http://puyang.wengetech.com:28086/wz_al/wz/addWzServiceQuestion',//新增提问
                addWzServiceReplay: 'http://puyang.wengetech.com:28086/wz_al/wz/addWzServiceReplay',//新增回复
                getWzQuestionAndReplayDetail: 'http://puyang.wengetech.com:28086/wz_al/wz/getWzQuestionAndReplayDetail',//问答明细接口
                getWzQuestionObjects: 'http://puyang.wengetech.com:28086/wz_al/wz/getWzQuestionObjects',//获取问题对象接口
                getWzQuestionTypes: 'http://puyang.wengetech.com:28086/wz_al/wz/getWzQuestionTypes',//获取问题性质接口
                getWzQuestionCategory: 'http://puyang.wengetech.com:28086/wz_al/wz/getWzQuestionCategory',//'获取问题分类接口
                getMyWzServiceWaitingList: 'http://puyang.wengetech.com:28086/wz_al/wz/getMyWzServiceWaitingList',//我的待回复列表

                addComplaint:'http://puyang.wengetech.com:9001/complaint/addComplaint' ,  //添加企业投诉
                selectInfo:'http://puyang.wengetech.com:9001/complaint/selectInfo'   //企业投诉列表查询
                // 111.20.145.19:9001
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
                // components: 'lives'
                components: 'puyang_lives'
            },
            {
                name: '便民',
                noSelect: require("./images/ta2.png"),
                select: require("./images/selectgSerice21.png"),
                components: 'service'
            },
            {
                name: '文旅',
                noSelect: require("./images/noWenlv.png"),
                select: require("./images/selectWenlv.png"),
                components: 'puyang_wenlv',
                // isChaoyang:false
                // puyang_wenlv
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
                'tuijian': '5cc57db80cf2c3d1b7e9d4de', // 推荐
                'xijinpingshijian': '5cc57db80cf2c3d1b7e9d4dd', // 习近平时间
                'zhibo': '5cc57db80cf2c3d1b7e9d4e4', // 直播
                'zhiding':'5cc57db80cf2c3d1b7e9d4e1'
            },
            columnIdChild: ['5cbd6d130cf21169387f12f5', '5cbd6d130cf21169387f12f8','5c22ed81a310abf163b4576e','5c22ed8ca310abf163b45770'], // 子级栏目
            columnIdOrder: ['5cc57db80cf2c3d1b7e9d4de','5cc57db80cf2c3d1b7e9d4dd','5c37f76ea31057f3fd4e207b'], // 栏目排序
            columnIdHidden: ['5d8220fde4b07e4a5f838772','5cc57db80cf2c3d1b7e9d4e1','5d68c7e3e4b0e2963a408829','5d68d4c1e4b0e2963a408859','5d68d447e4b0e2963a40884e',
                              '5d68d495e4b0e2963a408851','5d68d4a0e4b0e2963a408853','5d68d4ace4b0e2963a408855','5d7ef466e4b0e7a7d72fd4d2','5d68d4b8e4b0e2963a408857','5da14b3de4b0f0e6b01f37ab'], // 隐藏栏目 
            columnIdXhs: ['5c10cfcaa310abf163b45664'], // 请求新华社的栏目
            columnIdWenhaiListJson: [], // 请求闻海
            lianghuiChild: ['5c34304ea310d0f746b3ad23','5c343068a310d0f746b3ad26','5c343086a310d0f746b3ad29','5c343094a310d0f746b3ad2c'],
            lianghuiChildChild: ['5c34687ea310d0f746b3ad35','5c346890a310d0f746b3ad38','5c3468a0a310d0f746b3ad3b'],
            imgError: require("./images/img_error_s.jpg")
        },
        wenlv: {
            parentId: {
                qinqiang: '',
                wenlv: '5d68c7e3e4b0e2963a408829',
                lvyoujingqu: '',
                xinshidai: ''
            },
            columnId: {
                'lvyoujingqu': '5d68c7ede4b0e2963a40882b' // 三级子级
            },
            columnIdOrder: ['5d68c7ede4b0e2963a40882b', '5d68c7f5e4b0e2963a40882d','5d68c7fce4b0e2963a40882f','5d68c803e4b0e2963a408831'], // 栏目排序
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
                text: "濮阳县融媒体",
                content: "濮阳县融媒体平台立足于“新闻+政务+服务”的业务定位，从 “物理空间、体制机制、业务平台”三层面融合进行顶层设计，打造“一屏、五平台、N端” 的软件架构体系，形成“策、采、编、播、发、管、控、馈”立体化内容生产体系，实现“一次采集、多种生成、全媒传播”，把握新闻传播信息可视化、移动优先化、活动直播化的新趋势，通过内容、渠道、平台、管理、运营等方面的深度融合，建成形神兼备、软硬一体的融媒体平台建设解决方案。"
            }
        }
    };
    
    return obj;
}
window.$themeConfig = config()