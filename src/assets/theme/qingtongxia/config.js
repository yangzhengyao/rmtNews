function config() {
    var obj = {
        dominantColor: "#be2c1f", //主题颜色
        titlescolors:'#fff',
        imgHost:'http://qtx.wengetech.com:28086',//发表图文图片线上地址
        api: {
            appInfoId:'2', //18 13
            appShare:'http://qtx.wengetech.com:28086/app/installApp.html#news',
            appName:'qingtongxia',
            appWeather:'https://www.tianqiapi.com/api/?version=v6&cityid=101170306', //青铜峡天气的请求id  
            appWeatherUrl:'http://wx.weather.com.cn/mweather/101170306.shtml#1', //青铜峡天气的请求id
            updataCheckUrlUrl: 'http://hongqi.wengetech.com:28086/common_al/common/getNewestAppVersion', // 更新
            questionName:'宁夏回族自治区 吴忠市 青铜峡市',
            questionId:['640000000000','640300000000','640381000000'],
            rmtNews:'com.zkwg.qtxnews.Helper',
            news: {
                // http://192.168.4.126:8089
                // column: 'http://qtx.wengetech.com:9080/api/site/qtx/column/listAll', // 栏目
                    column: 'http://qtx.wengetech.com:9001/news/getNewsColumn', // 栏目
                // infoListByColumnId: 'http://qtx.wengetech.com:9080/api/site/channels/qtx/columns/',
                    infoListByColumnId: 'http://qtx.wengetech.com:9001/news/getNewsColumnData',
                    getNewsChannelData: 'http://qtx.wengetech.com:9001/news/getNewsChannelData', // 推荐所有的栏目
                    getNewsDetailData: 'http://qtx.wengetech.com:9001/news/getNewsDetailData', // 详情
                getPageListByServeralID: 'http://qtx.wengetech.com:28086/xhs_al/xhs/getPageListByServeralID', // 新华社接口
                getInfoDetailByID: 'http://qtx.wengetech.com:28086/xhs_al/xhs/getInfoDetailByID2', //新华社分享详情
                    addReadOrShareNum: 'http://qtx.wengetech.com:9001/news/addReadOrShareNum', //浏览、分享、点赞量
                wenhaiListJson: 'http://qtx.wengetech.com:10001/wenhaiAPI/openAPI/headline/listJson', //闻海
                wenhaiAppHeadLine: 'http://wxservice.wengetech.com/wenhaiFt/openAPI/headline/openAppHeadLine', // 闻海微信矩阵
                wenhaiDisplayConfigs: 'http://qtx.wengetech.com:10001/wenhaiAPI/wxx_al/mod1/displayConfigs', // 闻海 专题
                imgCompress: 'http://qtx.wengetech.com:28086/common_al/common/imgCompress?filePath=',  //图片压缩
                isLike:'http://qtx.wengetech.com:28086/common_al/common/isLike',//是否点赞 
                removeLike:'http://qtx.wengetech.com:28086/common_al/common/removeLike',//取消点赞
                    commentLikes:'http://qtx.wengetech.com:9001/activities/commentLike',//添加取消点赞 
                    getNewAudio:'http://qtx.wengetech.com:9001/news/getNewAudio',//新闻详情输出语音播报
                    addCollectNews:'http://qtx.wengetech.com:9001/my_al/my/addCollectNews', //添加收藏新闻
                    delUserFavorites:'http://qtx.wengetech.com:9001/my_al/my/delUserFavorites', //新增删除新闻收藏
                judgeShareNews:'http://qtx.wengetech.com:28086/my_al/my/judgeShareNews', //判断是否收藏过当前新闻
                activitylists:'http://hongqi.wengetech.com:9001/activities/searchAll', //活动列表
                activityDetails:'http://hongqi.wengetech.com:9001/activities/searchById', //活动列表
                activitygetActivities:'http://hongqi.wengetech.com:9001/activities/getActivitiesComments', //评论列表
                getNewsComments:'http://hongqi.wengetech.com:9001/activities/getNewsComments', //新闻评论列表
                addComment:'http://hongqi.wengetech.com:9001/activities/addComment', //活动评论添加
                addNewsComment:'http://hongqi.wengetech.com:9001/activities/addNewsComment', //新闻评论添加
                signUp:'http://hongqi.wengetech.com:9001/activities/signUp', //报名页面
                signUpStatus:'http://hongqi.wengetech.com:9001/activities/signUpStatus', //报名页面
                cancels:'http://hongqi.wengetech.com:9001/activities/cancel', //报名页面
                commentLikes:'http://hongqi.wengetech.com:9001/activities/commentLike',
                delesay:'http://hongqi.wengetech.com:9001/activities/deleteComments', //删除评论
                getCommenlist:'http://hongqi.wengetech.com:9001/activities/getCommentById', //新增评论列表接
            },
            //微社区接口
            community:{
                getHotBlogs:'http://qtx.wengetech.com:28086/community_al/blog/getHotBlogs',//热门列表
                getFollowBlogs:'http://qtx.wengetech.com:28086/community_al/blog/getFollowBlogs',//关注列表
                addBlogInfo:'http://qtx.wengetech.com:28086/community_al/blog/addBlogInfo',//新增博文
                getMyBlogInfoList:'http://qtx.wengetech.com:28086/community_al/blog/getMyBlogInfoList',//个人博文列表
                getOthersBlogInfoList:'http://qtx.wengetech.com:28086/community_al/blog/getOthersBlogInfoList',//他人博文列表
                blogLike:'http://qtx.wengetech.com:28086/community_al/blog/blogLike',//博文点赞
                getBlogLikeList:'http://qtx.wengetech.com:28086/community_al/blog/getBlogLikeList',//博文点赞列表
                addBlogComment:'http://qtx.wengetech.com:28086/community_al/blog/addBlogComment',//新增博文评论
                getBlogCommentList:'http://qtx.wengetech.com:28086/community_al/blog/getBlogCommentList',//获取博文评论列表
                deleteBlogComment:'http://qtx.wengetech.com:28086/community_al/blog/deleteBlogComment',//删除博文评论、
                getUserInfo:'http://qtx.wengetech.com:28086/community_al/user/getUserInfo',//博主信息查询
                getFansList:'http://hongqi.wengetech.com:9001/userFans/getFansList',//获取粉丝列表
                getFollowList:'http://hongqi.wengetech.com:9001/userFans/getFocusList',//获取关注列表
                followOtherUser:'http://qtx.wengetech.com:28086/community_al/user/followOtherUser',//博主关注/取消关注接口
                sendPrivateLetter:'http://qtx.wengetech.com:28086/community_al/user/sendPrivateLetter',//博主私信接口
                deleteBlogInfo:'http://qtx.wengetech.com:28086/community_al/blog/deleteBlogInfo',//删除博文
                selectTopicByParam:'http://hongqi.wengetech.com:9001/topic/selectTopicByParam',//话题列表接口  话题置顶
                selectTopicById:'http://hongqi.wengetech.com:9001/topic/selectTopicById',//话题列表详情页接口
                selectThemeById:'http://hongqi.wengetech.com:9001/theme/selectThemeById',//主题列表详情页接口
                getThemeTop:'http://hongqi.wengetech.com:9001/theme/selectThemeByParam', //主题置顶
                selectTopic:'http://hongqi.wengetech.com:9001/topic/selectTopic', //根据ID查询我参与过的话题
                getCorreTopict:'http://hongqi.wengetech.com:9001/themePost/selectThemePostByParam',  //查询主题帖
                getStateList:'http://hongqi.wengetech.com:9001/blog/getBlog',//信息列表
                deleteBlogInfo:'http://hongqi.wengetech.com:9001/blog/deleteBlogInfo',//删除帖子
                getFocusList:'http://hongqi.wengetech.com:9001/userFans/getFocusList',//关注列表
                getBlogByIddetails:'http://hongqi.wengetech.com:9001/blog/getBlogById', //详情接口圈子
                likeBlogs:'http://hongqi.wengetech.com:9001/blog/likeBlog',
                cancelLikeBlogs:'http://hongqi.wengetech.com:9001/blog/cancelLikeBlog',
                msgRelease:'http://hongqi.wengetech.com:9001/blog/addBlog',//发布朋友圈
                getHighLike:'http://hongqi.wengetech.com:9001/blog/getHighLikeBlog', //最赞接口
                getStateFocusList:'http://hongqi.wengetech.com:9001/blog/getFocusBlog', //查询已关注列表

                addFavorites:'http://qtx.wengetech.com:9001/my_al/my/addFavorites',  //活动，动态收藏接口
                delUserFavorites:'http://qtx.wengetech.com:9001/my_al/my/delUserFavorites' //删除用户活动或动态收藏
            },
            //我的接口
            me:{
                register:'http://qtx.wengetech.com:28086/login_al/login/register', //注册
                loginByCaptcha:'http://qtx.wengetech.com:28086/login_al/login/loginByCaptcha',//登陆 手机号+验证码
                loginByPassword:'http://qtx.wengetech.com:28086/login_al/login/loginByPassword',//登陆 手机号+密码
                getSms:'http://qtx.wengetech.com:28086/login_al/login/getSms',//验证码
                logout:'http://qtx.wengetech.com:28086/login_al/login/logout',//注销
                wechatLogin:'http://qtx.wengetech.com:28086/login_al/wechatlogin/wechatLogin',//微信登陆
                qqLogin:'http://qtx.wengetech.com:28086/login_al/qqlogin/qqLogin',//qq登陆
                weiboLogin:'http://qtx.wengetech.com:28086/login_al/weibologin/weiboLogin',//微博登陆
                modifyUserInfo:'http://qtx.wengetech.com:28086/my_al/my/modifyUserInfo', //修改用户名
                addUserFeedback:'http://qtx.wengetech.com:28086/my_al/my/addUserFeedback',//意见反馈
                getUserCollect:'http://qtx.wengetech.com:28086/my_al/my/getUserCollect', //查看个人收藏
                delUserCollect:'http://qtx.wengetech.com:28086/my_al/my/delUserCollect', //取消收藏新闻
                isCollection:'http://qtx.wengetech.com:28086/my_al/my/isCollection',// 判断是否收藏此新闻
                addReportMaterialInfo: 'http://qtx.wengetech.com:28086/my_al/my/addReportMaterialInfo', //添加报料
                getAllReportMaterialList: 'http://qtx.wengetech.com:28086/my_al/my/getAllReportMaterialList', //全部报料信息
                getMyReportMaterialList: 'http://qtx.wengetech.com:28086/my_al/my/getMyReportMaterialList', //我的报料信息
                selectManageUserById:'http://hongqi.wengetech.com:9001/manageUser/selectManageUserById', //查询指定用户详情
                addUserFans:'http://hongqi.wengetech.com:9001/userFans/addUserFans',//关注用户
                cancelFans:'http://hongqi.wengetech.com:9001/userFans/cancelFans',  //取消关注用户
                updateManageUserById:'http://hongqi.wengetech.com:9001/manageUser/updateManageUserById',  //更新用户信息

                seachUserFavContent:'http://qtx.wengetech.com:9001/my_al/my/seachUserFavContent', //查看用户收藏接口
                addUserBrowse:'http://qtx.wengetech.com:9001/userBrowse/addUserBrowse', //添加用户最近浏览
                getActivBySignUpUserId:'http://qtx.wengetech.com:9001/activities/getActivitiesBySignUpUserId', //查询用户已经报名的活动列表
            },
            //服务接口
            services:{
                //问政
                getWzServiceQuestions: 'http://qtx.wengetech.com:28086/wz_al/wz/getWzServiceQuestions',//问答列表
                getMyWzServiceQuestions: 'http://qtx.wengetech.com:28086/wz_al/wz/getMyWzServiceQuestions',//我的提问列表
                addWzServiceQuestion: 'http://qtx.wengetech.com:28086/wz_al/wz/addWzServiceQuestion',//新增提问
                addWzServiceReplay: 'http://qtx.wengetech.com:28086/wz_al/wz/addWzServiceReplay',//新增回复
                getWzQuestionAndReplayDetail: 'http://qtx.wengetech.com:28086/wz_al/wz/getWzQuestionAndReplayDetail',//问答明细接口
                getWzQuestionObjects: 'http://qtx.wengetech.com:28086/wz_al/wz/getWzQuestionObjects',//获取问题对象接口
                getWzQuestionTypes: 'http://qtx.wengetech.com:28086/wz_al/wz/getWzQuestionTypes',//获取问题性质接口
                getWzQuestionCategory: 'http://qtx.wengetech.com:28086/wz_al/wz/getWzQuestionCategory',//'获取问题分类接口
                getMyWzServiceWaitingList: 'http://qtx.wengetech.com:28086/wz_al/wz/getMyWzServiceWaitingList',//我的待回复列表
            }
        },
        homeTabbar: [
            {
                name: '新闻',
                noSelect: require("./images/noNews.png"),
                select: require("./images/selectNews_03.png"),
                components: 'news'
            },{
                name: '文旅',
                noSelect: require("./images/noWenlv.png"),
                select: require("./images/selectWenlv.png"),
                components: 'qingtongxia_wenlv'
            },
            {
                name: '市民云',
                noSelect: require("./images/ta2.png"),
                select: require("./images/selectgSerice2.png"),
                components: 'service'
            },
            {
                name: '秦腔',
                noSelect: require("./images/noQinqiang.png"),
                select: require("./images/selectQinqiang.png"),
                components: 'qingtongxia_qq',
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
                kanTV: '5ccea1cfa31099b0d557b266',
                xinshidai: ''
            },
            columnId: {
                'redian': '5c37f76ea31057f3fd4e207b', // 要闻
                'tuijian': '5c10cf56a310abf163b45663', // 推荐
                'xijinpingshijian': '5c10cfcaa310abf163b45664', // 习近平时间
                'zhiding': '5c13abefa310abf163b456b1', // 置顶
                'zhibo': '5c1206cba310abf163b4568a', // 直播
                'chuangcheng': '5ccea1cfa31099b0d557b266', // 创城
            },
            columnIdChild: ['5cd1371da31099b0d557b295', '5cd1371da31099b0d557b298','5cd1371da31099b0d557b29b'], // 子级栏目
            columnIdOrder: ['5c10cfcaa310abf163b45664', '5c402d86a3102170f25a0112','5cd1546fa31099b0d557b2a5','5c10f466a310abf163b4566b'], // 栏目排序
            columnIdHidden: ['5c13abefa310abf163b456b1','5c10cf56a310abf163b45663'], // 隐藏栏目 文旅
            columnIdXhs: ['5c10cfcaa310abf163b45664'], // 请求新华社的栏目
            columnIdWenhaiListJson: [], // 请求闻海
            lianghuiChild: ['5c34304ea310d0f746b3ad23','5c343068a310d0f746b3ad26','5c343086a310d0f746b3ad29','5c343094a310d0f746b3ad2c'],
            lianghuiChildChild: ['5c34687ea310d0f746b3ad35','5c346890a310d0f746b3ad38','5c3468a0a310d0f746b3ad3b'],
            imgError: require("./images/img_error_s.jpg")
        },
        wenlv: {
            parentId: {
                qinqiang: '5c10f4d3a310abf163b45675',
                wenlv: '5c22ebb9a310abf163b45760',
                lvyoujingqu: '5c22ec29a310abf163b45762',
                xinshidai: '5c22f6a9a310abf163b45773'
            },
            columnId: {
                'lvyoujingqu': '5c22ec29a310abf163b45762'
            },
            columnIdOrder: ['5c22ec29a310abf163b45762', '5c22ec29a310abf163b45764','5c22ecbca310abf163b45766','5c22ecd4a310abf163b45768'], // 栏目排序
            columnIdChild: ['5c22ed72a310abf163b4576c', '5c22ed50a310abf163b4576a','5c22ed81a310abf163b4576e','5c22ed8ca310abf163b45770'], // 子级栏目
            xinshidaiChild: ['5c22f6c0a310abf163b45775', '5c22f6cda310abf163b45777', '5c22f6dba310abf163b45779', '5c22f6e8a310abf163b4577b']
        },
        hcChild:{
            columnIdOrder: ['5cd2874b0cf2acaeba3f53c5', '5cd2874b0cf2acaeba3f53c7','5cd2874b0cf2acaeba3f53c9','5cd2874b0cf2acaeba3f53cb'], // 栏目排序
            columnIdHidden: ['5c22eb8da310abf163b4575c','5c22eb8da310abf163b4575e']
        },
        qinqiang: {
            columnIdOrder: ['5c22e790a310abf163b45750', '5c22eafba310abf163b45752','5c22eb17a310abf163b45754','5c22eb2aa310abf163b45756'], // 栏目排序
            columnIdHidden: ['5c22eb8da310abf163b4575c','5c22eb8da310abf163b4575e']
        },
        services: {},
        me: {
            // 关于我们
            us: {
                text: "云上青铜峡",
                content: "云上青铜峡是青铜峡市官方新闻客户端，是九渠云融媒体打造的一款接地气、说实话、重民生的精品APP。云上青铜峡围绕“新闻+信息+服务”的理念，涵盖新闻、视频、直播、微社区、问政、秦腔、便民服务、大数据新闻等多个板块。是传播中央声音的重要阵地，讲好青铜峡故事的有力抓手，连通青铜峡群众的移动入口，服务文旅经济的有力平台。"
            }
        }
    };
    
    return obj;
}
window.$themeConfig = config()