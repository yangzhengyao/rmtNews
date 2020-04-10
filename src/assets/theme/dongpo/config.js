function config() {
    var obj = {
        dominantColor: "#fff", //主题颜色
        titlesColor:'#1a1a1a',
        imgHost:'http://dongpo.wengetech.com:28086',//发表图文图片线上地址
        api: {
            appInfoId:'20',
            appShare:'https://www.pgyer.com/kF2o',
            appName:'dongpo',
            //appWeather:'101271501',
            updataCheckUrlUrl: 'http://dongpo.wengetech.com:28086/common_al/common/getNewestAppVersion', // 更新
            questionName:'四川省 眉山市 东坡区',
            questionId:['510000000000','511400000000','511402000000'],
            appWeather:'https://www.tianqiapi.com/api/?version=v6&cityid=101271507', //乐山天气的请求id
            appWeatherUrl:'http://wx.weather.com.cn/mweather/101271507.shtml#1', //乐山天气的请求id
            rmtNews:'com.zkwg.dongponews.Helper',
            news: {
               // http://192.168.4.126:8089
                // column: 'http://leshan.wengetech.com:9080/api/site/qtx/column/listAll', // 栏目
                    column: 'http://dongpo.wengetech.com:9001/news/getNewsColumn', // 栏目
                // infoListByColumnId: 'http://leshan.wengetech.com:9080/api/site/channels/qtx/columns/',
                    infoListByColumnId: 'http://dongpo.wengetech.com:9001/news/getNewsColumnData',
                    getNewsChannelData: 'http://dongpo.wengetech.com:9001/news/getNewsChannelData', // 推荐所有的栏目
                    getNewsDetailData: 'http://dongpo.wengetech.com:9001/news/getNewsDetailData', // 详情
                getPageListByServeralID: 'http://dongpo.wengetech.com:28086/xhs_al/xhs/getPageListByServeralID', // 新华社接口
                getInfoDetailByID: 'http://dongpo.wengetech.com:28086/xhs_al/xhs/getInfoDetailByID2', //新华社分享详情
                    addReadOrShareNum: 'http://dongpo.wengetech.com:9001/news/addReadOrShareNum', //浏览、分享、点赞量
                wenhaiListJson: 'http://leshan.wengetech.com:10001/wenhaiAPI/openAPI/headline/listJson', //闻海
                wenhaiAppHeadLine: 'http://wxservice.wengetech.com/wenhaiFt/openAPI/headline/openAppHeadLine', // 闻海微信矩阵
                wenhaiDisplayConfigs: 'http://leshan.wengetech.com:10001/wenhaiAPI/wxx_al/mod1/displayConfigs', // 闻海 专题
                imgCompress: 'http://dongpo.wengetech.com:28086/common_al/common/imgCompress?filePath=',  //图片压缩
                isLike:'http://dongpo.wengetech.com:28086/common_al/common/isLike',//是否点赞 
                removeLike:'http://dongpo.wengetech.com:28086/common_al/common/removeLike',//取消点赞
                    commentLikes:'http://dongpo.wengetech.com:9001/activities/commentLike',
                    getNewAudio:'http://dongpo.wengetech.com:9001/news/getNewAudio',//新闻详情输出语音播报
                    addCollectNews:'http://dongpo.wengetech.com:9001/my_al/my/addCollectNews', //添加收藏新闻
                    delUserFavorites:'http://dongpo.wengetech.com:9001/my_al/my/delUserFavorites', //新增删除新闻收藏
                judgeShareNews:'http://dongpo.wengetech.com:28086/my_al/my/judgeShareNews', //判断是否收藏过当前新闻
                activitylists:'http://dongpo.wengetech.com:9001/activities/searchAll', //活动列表
                activityDetails:'http://dongpo.wengetech.com:9001/activities/searchById', //活动列表
                activitygetActivities:'http://dongpo.wengetech.com:9001/activities/getActivitiesComments', //评论列表
                getNewsComments:'http://dongpo.wengetech.com:9001/activities/getNewsComments', //新闻评论列表
                addComment:'http://dongpo.wengetech.com:9001/activities/addComment', //活动评论添加
                addNewsComment:'http://dongpo.wengetech.com:9001/activities/addNewsComment', //新闻评论添加
                signUp:'http://dongpo.wengetech.com:9001/activities/signUp', //报名页面
                signUpStatus:'http://dongpo.wengetech.com:9001/activities/signUpStatus', //报名页面
                cancels:'http://dongpo.wengetech.com:9001/activities/cancel', //报名页面
               
                delesay:'http://dongpo.wengetech.com:9001/activities/deleteComments', //删除评论
                getCommenlist:'http://dongpo.wengetech.com:9001/activities/getCommentById', //新增评论列表接
                
            },
            //微社区接口
            community:{
                getHotBlogs:'http://dongpo.wengetech.com:28086/community_al/blog/getHotBlogs',//热门列表
                getFollowBlogs:'http://dongpo.wengetech.com:28086/community_al/blog/getFollowBlogs',//关注列表
                addBlogInfo:'http://dongpo.wengetech.com:28086/community_al/blog/addBlogInfo',//新增博文
                getMyBlogInfoList:'http://dongpo.wengetech.com:28086/community_al/blog/getMyBlogInfoList',//个人博文列表
                getOthersBlogInfoList:'http://dongpo.wengetech.com:28086/community_al/blog/getOthersBlogInfoList',//他人博文列表
                blogLike:'http://dongpo.wengetech.com:28086/community_al/blog/blogLike',//博文点赞
                getBlogLikeList:'http://dongpo.wengetech.com:28086/community_al/blog/getBlogLikeList',//博文点赞列表
                addBlogComment:'http://dongpo.wengetech.com:28086/community_al/blog/addBlogComment',//新增博文评论
                getBlogCommentList:'http://dongpo.wengetech.com:28086/community_al/blog/getBlogCommentList',//获取博文评论列表
                deleteBlogComment:'http://dongpo.wengetech.com:28086/community_al/blog/deleteBlogComment',//删除博文评论、
                getUserInfo:'http://dongpo.wengetech.com:28086/community_al/user/getUserInfo',//博主信息查询
                getFansList:'http://dongpo.wengetech.com:9001/userFans/getFansList',//获取粉丝列表
                getFollowList:'http://dongpo.wengetech.com:9001/userFans/getFocusList',//获取关注列表
                followOtherUser:'http://dongpo.wengetech.com:28086/community_al/user/followOtherUser',//博主关注/取消关注接口
                sendPrivateLetter:'http://dongpo.wengetech.com:28086/community_al/user/sendPrivateLetter',//博主私信接口
                deleteBlogInfo:'http://dongpo.wengetech.com:28086/community_al/blog/deleteBlogInfo',//删除博文
                selectTopicByParam:'http://dongpo.wengetech.com:9001/topic/selectTopicByParam',//话题列表接口  话题置顶
                selectTopicById:'http://dongpo.wengetech.com:9001/topic/selectTopicById',//话题列表详情页接口
                selectThemeById:'http://dongpo.wengetech.com:9001/theme/selectThemeById',//主题列表详情页接口
                getThemeTop:'http://dongpo.wengetech.com:9001/theme/selectThemeByParam', //主题置顶
                selectTopic:'http://dongpo.wengetech.com:9001/topic/selectTopic', //根据ID查询我参与过的话题
                getCorreTopict:'http://dongpo.wengetech.com:9001/themePost/selectThemePostByParam',  //查询主题帖
                getStateList:'http://dongpo.wengetech.com:9001/blog/getBlog',//信息列表
                deleteBlogInfo:'http://dongpo.wengetech.com:9001/blog/deleteBlogInfo',//删除帖子
                getFocusList:'http://dongpo.wengetech.com:9001/userFans/getFocusList',//关注列表
                getBlogByIddetails:'http://dongpo.wengetech.com:9001/blog/getBlogById', //详情接口圈子
                likeBlogs:'http://dongpo.wengetech.com:9001/blog/likeBlog',
                cancelLikeBlogs:'http://dongpo.wengetech.com:9001/blog/cancelLikeBlog',
                msgRelease:'http://dongpo.wengetech.com:9001/blog/addBlog',//发布朋友圈
                getHighLike:'http://dongpo.wengetech.com:9001/blog/getHighLikeBlog', //最赞接口
                getStateFocusList:'http://dongpo.wengetech.com:9001/blog/getFocusBlog', //查询已关注列表

                addFavorites:'http://dongpo.wengetech.com:9001/my_al/my/addFavorites',  //活动，动态收藏接口
                delUserFavorites:'http://dongpo.wengetech.com:9001/my_al/my/delUserFavorites' //删除用户活动或动态收藏
            },
            //我的接口
            me:{
                register:'http://dongpo.wengetech.com:28086/login_al/login/register', //注册
                loginByCaptcha:'http://dongpo.wengetech.com:28086/login_al/login/loginByCaptcha',//登陆 手机号+验证码
                loginByPassword:'http://dongpo.wengetech.com:28086/login_al/login/loginByPassword',//登陆 手机号+密码
                getSms:'http://dongpo.wengetech.com:28086/login_al/login/getSms',//验证码
                logout:'http://dongpo.wengetech.com:28086/login_al/login/logout',//注销
                wechatLogin:'http://dongpo.wengetech.com:28086/login_al/wechatlogin/wechatLogin',//微信登陆
                qqLogin:'http://dongpo.wengetech.com:28086/login_al/qqlogin/qqLogin',//qq登陆
                weiboLogin:'http://dongpo.wengetech.com:28086/login_al/weibologin/weiboLogin',//微博登陆
                modifyUserInfo:'http://dongpo.wengetech.com:28086/my_al/my/modifyUserInfo', //修改用户名
                addUserFeedback:'http://dongpo.wengetech.com:28086/my_al/my/addUserFeedback',//意见反馈
                getUserCollect:'http://dongpo.wengetech.com:28086/my_al/my/getUserCollect', //查看个人收藏
                delUserCollect:'http://dongpo.wengetech.com:28086/my_al/my/delUserCollect', //取消收藏新闻
                isCollection:'http://dongpo.wengetech.com:28086/my_al/my/isCollection',// 判断是否收藏此新闻
                addReportMaterialInfo: 'http://dongpo.wengetech.com:9001/revelation/addReportMaterialInfo', //添加报料
                getAllReportMaterialList: 'http://dongpo.wengetech.com:9001/revelation/getAllReportMaterialList', //全部报料信息
                delReportMaterial:'http://dongpo.wengetech.com:9001/revelation/delReportMaterial',//删除报料
                getMyReportMaterialList: 'http://dongpo.wengetech.com:28086/my_al/my/getMyReportMaterialList', //我的报料信息
                selectManageUserById:'http://dongpo.wengetech.com:9001/manageUser/selectManageUserById', //查询指定用户详情
                addUserFans:'http://dongpo.wengetech.com:9001/userFans/addUserFans',//关注用户
                cancelFans:'http://dongpo.wengetech.com:9001/userFans/cancelFans',  //取消关注用户
                updateManageUserById:'http://dongpo.wengetech.com:9001/manageUser/updateManageUserById',  //更新用户信息
                selectUserBrowseByParam:'http://dongpo.wengetech.com:9001/userBrowse/selectUserBrowseByParam', //查询用户最近浏览
                seachUserFavContent:'http://dongpo.wengetech.com:9001/my_al/my/seachUserFavContent', //查看用户收藏接口
                addUserBrowse:'http://dongpo.wengetech.com:9001/userBrowse/addUserBrowse', //添加用户最近浏览
                delUserBrowser:'http://leshan.wengetech.com:9001/userBrowse/delUserBrowser', //删除最近浏览的贴子
                getActivBySignUpUserId:'http://dongpo.wengetech.com:9001/activities/getActivitiesBySignUpUserId', //查询用户已经报名的活动列表
                getUserCommnets:'http://dongpo.wengetech.com:9001/activities/getUserCommnets', //查看我的评论
                getUserSendCommnets:'http://dongpo.wengetech.com:9001/activities/getUserSendCommnets', //查看我评论的
                updateManageUserById:'http://dongpo.wengetech.com:9001/manageUser/updateManageUserById',  //更新用户信息
            },
            //服务接口
            services:{
                //问政
                getWzServiceQuestions: 'http://dongpo.wengetech.com:28086/wz_al/wz/getWzServiceQuestions',//问答列表
                getMyWzServiceQuestions: 'http://dongpo.wengetech.com:28086/wz_al/wz/getMyWzServiceQuestions',//我的提问列表
                addWzServiceQuestion: 'http://dongpo.wengetech.com:28086/wz_al/wz/addWzServiceQuestion',//新增提问
                addWzServiceReplay: 'http://dongpo.wengetech.com:28086/wz_al/wz/addWzServiceReplay',//新增回复
                getWzQuestionAndReplayDetail: 'http://dongpo.wengetech.com:28086/wz_al/wz/getWzQuestionAndReplayDetail',//问答明细接口
                getWzQuestionObjects: 'http://dongpo.wengetech.com:28086/wz_al/wz/getWzQuestionObjects',//获取问题对象接口
                getWzQuestionTypes: 'http://dongpo.wengetech.com:28086/wz_al/wz/getWzQuestionTypes',//获取问题性质接口
                getWzQuestionCategory: 'http://dongpo.wengetech.com:28086/wz_al/wz/getWzQuestionCategory',//'获取问题分类接口
                getMyWzServiceWaitingList: 'http://dongpo.wengetech.com:28086/wz_al/wz/getMyWzServiceWaitingList',//我的待回复列表
            }
        },
        homeTabbar: [
            {
                name: '新闻',
                noSelect: require("./images/noNews.png"),
                select: require("./images/selectNews_03.png"),
                components: 'news'
            },
            {
                name: '服务',
                noSelect: require("./images/ta2.png"),
                select: require("./images/selectgSerice2.png"),
                components: 'service'
            },
            {
                name: '爆料',
                noSelect: require("./images/noCommunity.png"),
                select: require("./images/community_03.png"),
                components: 'cnockout',
                isChaoyang:false
            },
            {
                name: '同城',
                noSelect: require("./images/onTv.png"),
                select: require("./images/selectTv_03.png"),
                components: 'dongpocity' //dongpo_lives
            },
          
           {
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
                'tuijian': '5ce9f0190cf23213ac8df4e2', // 推荐
                'xijinpingshijian': '5ce9f0190cf23213ac8df4e0', // 习近平时间
                'zhiding': '5d09af26e4b0af4a6f40077d', // 置顶
                'zhibo': '5ce9f0190cf23213ac8df4ee', // 直播
            },
            columnIdChild: ["5db2aa0ee4b0b6c77c39cfb6","5db2b4f3e4b0b6c77c39cfda",'5cbd6d130cf21169387f12f5', '5cbd6d130cf21169387f12f8','5c22ed81a310abf163b4576e','5c22ed8ca310abf163b45770'], // 子级栏目
            columnIdOrder: ['5ce9f0190cf23213ac8df4e2'], // 栏目排序
            columnIdHidden: ['5da92625e4b0e4f27ae7c4c2','5da59a88e4b0f0e6b01f39b0','5ce9f0190cf23213ac8df4ec','5ce9f0190cf23213ac8df4ee',"5d9f1d04e4b0f0e6b01f35d3",'5d6e349ee4b0e2963a408a8f','5ce9f0190cf23213ac8df4e8','5d09af26e4b0af4a6f40077d','5ce9f0190cf23213ac8df4e4','5d099e1fe4b0af4a6f400767','5d099e96e4b0af4a6f400769','5d099e96e4b0af4a6f40076b','5d099e96e4b0af4a6f40076d','5d099e96e4b0af4a6f40076f','5d099e96e4b0af4a6f400771','5d099e96e4b0af4a6f400773','5d099ef8e4b0af4a6f400775','5d099ef8e4b0af4a6f400777','5d099ef8e4b0af4a6f400779','5d099ef8e4b0af4a6f40077b','5d09af26e4b0af4a6f40077d','5d5524c8e4b08f7738231eb6','5d5524f6e4b08f7738231eb8','5d55250fe4b08f7738231eba','5d55251ce4b08f7738231ebc'], // 隐藏栏目 文旅
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
                text: "东坡融媒体",
                content: "东坡老家：这是一款东坡人自己的APP，是东坡人的精神家园，是东坡人了解东坡、眉山乃至全国的窗口。在这里，你可以用文字、图片、视频记录生活表达情感；在这里，你可以足不出户享受政务服务；在这里，你可以方便快捷地了解办理上学、就医、出行、购物、生活缴费等相关事宜……<br>了解东坡、玩转东坡、爱上东坡，一个东坡老家APP就够了！<br>生活在东坡故里，就看“东坡老家”！"
            }
        }
    };
    
    return obj;
}
window.$themeConfig = config()