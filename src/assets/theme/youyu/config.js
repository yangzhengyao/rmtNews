function config() {
    var obj = {
        dominantColor: "#fff", //主题颜色
        titlesColor:'#1a1a1a',
        imgHost:'http://tiemenguan.wengetech.com:28086',//发表图文图片线上地址
        api: {
            appInfoId:'12', //
            appShare:'https://www.pgyer.com/e6tD',
            appName:'youyu',
            appWeather:'https://www.tianqiapi.com/api/?version=v6&cityid=101131901', //乐山天气的请求id
            appWeatherUrl:'http://wx.weather.com.cn/mweather/101131901.shtml#1', //乐山天气的请求id
            updataCheckUrlUrl: 'http://youyu.wengetech.com:28086/common_al/common/getNewestAppVersion', // 更新
            questionName:'山西省 朔州市 右玉县',
            questionId:['140000000000','140600000000','140623000000'],
            rmtNews:'com.zkwg.youyunews.Helper',
            news: {
                // http://192.168.4.126:8089
                // column: 'http://tiemenguan.wengetech.com:9080/api/site/qtx/column/listAll', // 栏目
                column: 'http://youyu.wengetech.com:9001/news/getNewsColumn', // 栏目
                // infoListByColumnId: 'http://youyu.wengetech.com:9080/api/site/channels/qtx/columns/',
                infoListByColumnId: 'http://youyu.wengetech.com:9001/news/getNewsColumnData',
                    getNewsChannelData: 'http://youyu.wengetech.com:9001/news/getNewsChannelData', // 推荐所有的栏目
                getNewsDetailData: 'http://youyu.wengetech.com:9001/news/getNewsDetailData', // 详情
                getPageListByServeralID: 'http://youyu.wengetech.com:28086/xhs_al/xhs/getPageListByServeralID', // 新华社接口
                getInfoDetailByID: 'http://youyu.wengetech.com:28086/xhs_al/xhs/getInfoDetailByID2', //新华社分享详情
                addReadOrShareNum:'http://youyu.wengetech.com:9001/news/addReadOrShareNum', //浏览、分享、点赞量
                wenhaiListJson: 'http://youyu.wengetech.com:10001/wenhaiAPI/openAPI/headline/listJson', //闻海
                wenhaiAppHeadLine: 'http://wxservice.wengetech.com/wenhaiFt/openAPI/headline/openAppHeadLine', // 闻海微信矩阵
                wenhaiDisplayConfigs: 'http://youyu.wengetech.com:10001/wenhaiAPI/wxx_al/mod1/displayConfigs', // 闻海 专题
                imgCompress: 'http://youyu.wengetech.com:28086/common_al/common/imgCompress?filePath=',  //图片压缩
                isLike:'http://youyu.wengetech.com:28086/common_al/common/isLike',//是否点赞 
                removeLike:'http://youyu.wengetech.com:28086/common_al/common/removeLike',//取消点赞
                commentLikes:'http://youyu.wengetech.com:9001/activities/commentLike',
                getNewAudio:'http://youyu.wengetech.com:9001/news/getNewAudio',//新闻详情输出语音播报
                addCollectNews:'http://youyu.wengetech.com:9001/my_al/my/addCollectNews', //添加收藏新闻
                delUserFavorites:'http://youyu.wengetech.com:9001/my_al/my/delUserFavorites', //新增删除新闻收藏
                judgeShareNews:'http://youyu.wengetech.com:9001/my_al/my/judgeShareNews', //判断是否收藏过当前新闻
                activitylists:'http://youyu.wengetech.com:9001/activities/searchAll', //活动列表
                activityDetails:'http://youyu.wengetech.com:9001/activities/searchById', //活动列表
                activitygetActivities:'http://youyu.wengetech.com:9001/activities/getActivitiesComments', //评论列表
                getNewsComments:'http://youyu.wengetech.com:9001/activities/getNewsComments', //新闻评论列表
                addComment:'http://youyu.wengetech.com:9001/activities/addComment', //活动评论添加
                addNewsComment:'http://youyu.wengetech.com:9001/activities/addNewsComment', //新闻评论添加
                signUp:'http://youyu.wengetech.com:9001/activities/signUp', //报名页面
                signUpStatus:'http://hongqi.wengetech.com:9001/activities/signUpStatus', //报名页面
                cancels:'http://youyu.wengetech.com:9001/activities/cancel', //报名页面
                delesay:'http://youyu.wengetech.com:9001/activities/deleteComments', //删除评论
                getCommenlist:'http://youyu.wengetech.com:9001/activities/getCommentById', //新增评论列表接
            },
            //微社区接口
            community:{
                getHotBlogs:'http://youyu.wengetech.com:28086/community_al/blog/getHotBlogs',//热门列表
                getFollowBlogs:'http://youyu.wengetech.com:28086/community_al/blog/getFollowBlogs',//关注列表
                addBlogInfo:'http://youyu.wengetech.com:28086/community_al/blog/addBlogInfo',//新增博文
                getMyBlogInfoList:'http://youyu.wengetech.com:28086/community_al/blog/getMyBlogInfoList',//个人博文列表
                getOthersBlogInfoList:'http://youyu.wengetech.com:28086/community_al/blog/getOthersBlogInfoList',//他人博文列表
                blogLike:'http://youyu.wengetech.com:28086/community_al/blog/blogLike',//博文点赞
                getBlogLikeList:'http://youyu.wengetech.com:28086/community_al/blog/getBlogLikeList',//博文点赞列表
                addBlogComment:'http://youyu.wengetech.com:28086/community_al/blog/addBlogComment',//新增博文评论
                getBlogCommentList:'http://youyu.wengetech.com:28086/community_al/blog/getBlogCommentList',//获取博文评论列表
                deleteBlogComment:'http://youyu.wengetech.com:28086/community_al/blog/deleteBlogComment',//删除博文评论、
                getUserInfo:'http://youyu.wengetech.com:28086/community_al/user/getUserInfo',//博主信息查询
                getFansList:'http://hongqi.wengetech.com:9001/userFans/getFansList',//获取粉丝列表
                getFollowList:'http://hongqi.wengetech.com:9001/userFans/getFocusList',//获取关注列表
                followOtherUser:'http://youyu.wengetech.com:28086/community_al/user/followOtherUser',//博主关注/取消关注接口
                sendPrivateLetter:'http://youyu.wengetech.com:28086/community_al/user/sendPrivateLetter',//博主私信接口
                deleteBlogInfo:'http://youyu.wengetech.com:28086/community_al/blog/deleteBlogInfo',//删除博文
                selectTopicByParam:'http://hongqi.wengetech.com:9001/topic/selectTopicByParam',//话题列表接口  话题置顶
                selectTopicById:'http://hongqi.wengetech.com:9001/topic/selectTopicById',//话题列表详情页接口
                selectThemeById:'http://hongqi.wengetech.com:9001/theme/selectThemeById',//主题列表详情页接口
                getThemeTop:'http://hongqi.wengetech.com:9001/theme/selectThemeByParam', //主题置顶
                selectTopic:'http://hongqi.wengetech.com:9001/topic/selectTopic', //根据ID查询我参与过的话题
                getCorreTopict:'http://hongqi.wengetech.com:9001/themePost/selectThemePostByParam',  //查询主题帖
                getStateList:'http://hongqi.wengetech.com:9001/blog/getBlog',//信息列表
                getFocusList:'http://hongqi.wengetech.com:9001/userFans/getFocusList',//关注列表
                getBlogByIddetails:'http://hongqi.wengetech.com:9001/blog/getBlogById', //详情接口圈子
                likeBlogs:'http://hongqi.wengetech.com:9001/blog/likeBlog',
                cancelLikeBlogs:'http://hongqi.wengetech.com:9001/blog/cancelLikeBlog',
                msgRelease:'http://hongqi.wengetech.com:9001/blog/addBlog',//发布朋友圈

                addFavorites:'http://youyu.wengetech.com:9001/my_al/my/addFavorites',  //活动，动态收藏接口
                delUserFavorites:'http://youyu.wengetech.com:9001/my_al/my/delUserFavorites' //删除用户活动或动态收藏
            },
            //我的接口
            me:{
                register:'http://youyu.wengetech.com:28086/login_al/login/register',//注册
                loginByCaptcha:'http://youyu.wengetech.com:28086/login_al/login/loginByCaptcha',//登陆 手机号+验证码
                loginByPassword:'http://youyu.wengetech.com:28086/login_al/login/loginByPassword',//登陆 手机号+密码
                getSms:'http://youyu.wengetech.com:28086/login_al/login/getSms',//验证码
                logout:'http://youyu.wengetech.com:28086/login_al/login/logout',//注销
                wechatLogin:'http://youyu.wengetech.com:28086/login_al/wechatlogin/wechatLogin',//微信登陆
                qqLogin:'http://youyu.wengetech.com:28086/login_al/qqlogin/qqLogin',//qq登陆
                weiboLogin:'http://youyu.wengetech.com:28086/login_al/weibologin/weiboLogin',//微博登陆
                modifyUserInfo:'http://youyu.wengetech.com:28086/my_al/my/modifyUserInfo', //修改用户名
                addUserFeedback:'http://youyu.wengetech.com:28086/my_al/my/addUserFeedback',//意见反馈
                getUserCollect:'http://youyu.wengetech.com:28086/my_al/my/getUserCollect', //查看个人收藏
                delUserCollect:'http://youyu.wengetech.com:28086/my_al/my/delUserCollect', //取消收藏新闻
                isCollection:'http://youyu.wengetech.com:28086/my_al/my/isCollection',// 判断是否收藏此新闻
                addReportMaterialInfo: 'http://youyu.wengetech.com:28086/my_al/my/addReportMaterialInfo', //添加报料
                getAllReportMaterialList: 'http://youyu.wengetech.com:28086/my_al/my/getAllReportMaterialList', //全部报料信息
                getMyReportMaterialList: 'http://youyu.wengetech.com:28086/my_al/my/getMyReportMaterialList', //我的报料信息
                selectManageUserById:'http://hongqi.wengetech.com:9001/manageUser/selectManageUserById', //查询指定用户详情
                addUserFans:'http://hongqi.wengetech.com:9001/userFans/addUserFans',//关注用户
                cancelFans:'http://hongqi.wengetech.com:9001/userFans/cancelFans',  //取消关注用户

                seachUserFavContent:'http://youyu.wengetech.com:9001/my_al/my/seachUserFavContent', //查看用户收藏接口
                addUserBrowse:'http://youyu.wengetech.com:9001/userBrowse/addUserBrowse', //添加用户最近浏览
                getActivBySignUpUserId:'http://youyu.wengetech.com:9001/activities/getActivitiesBySignUpUserId', //查询用户已经报名的活动列表
            },
            //服务接口
            services:{
                //问政
                getWzServiceQuestions: 'http://youyu.wengetech.com:28086/wz_al/wz/getWzServiceQuestions',//问答列表
                getMyWzServiceQuestions: 'http://youyu.wengetech.com:28086/wz_al/wz/getMyWzServiceQuestions',//我的提问列表
                addWzServiceQuestion: 'http://youyu.wengetech.com:28086/wz_al/wz/addWzServiceQuestion',//新增提问
                addWzServiceReplay: 'http://youyu.wengetech.com:28086/wz_al/wz/addWzServiceReplay',//新增回复
                getWzQuestionAndReplayDetail: 'http://youyu.wengetech.com:28086/wz_al/wz/getWzQuestionAndReplayDetail',//问答明细接口
                getWzQuestionObjects: 'http://youyu.wengetech.com:28086/wz_al/wz/getWzQuestionObjects',//获取问题对象接口
                getWzQuestionTypes: 'http://youyu.wengetech.com:28086/wz_al/wz/getWzQuestionTypes',//获取问题性质接口
                getWzQuestionCategory: 'http://youyu.wengetech.com:28086/wz_al/wz/getWzQuestionCategory',//'获取问题分类接口
                getMyWzServiceWaitingList: 'http://youyu.wengetech.com:28086/wz_al/wz/getMyWzServiceWaitingList',//我的待回复列表
                selectReportType:'http://hongqi.wengetech.com:9001/report/selectReportType', //举报
                selectReportTypeDetail:'http://hongqi.wengetech.com:9001/report/selectReportTypeDetail',//举报二级
                addReportContent:'http://hongqi.wengetech.com:9001/report/addReportContent' //添加
                
            }
        },
        homeTabbar: [
            {
                name: '新闻',
                noSelect: require("./images/noNews.png"),
                select: require("./images/selectNews_03.png"),
                components: 'youyu_home'
            },{
                name: '文旅',
                noSelect: require("./images/onTv.png"),
                select: require("./images/selectTv_03.png"),
                components: 'youyu_wenlv' //tiemenguan_lives
            },
            {
                name: '媒体矩阵',
                noSelect: require("./images/ta2.png"),
                select: require("./images/selectgSerice2.png"),
                components: 'livesyouyu'
            },
              
            {
                name: '服务',
                noSelect: require("./images/noQinqiang.png"), //ta2.png
                select: require("./images/selectQinqiang.png"),
                components: 'service'
            },
           {
                name: '我的',
                noSelect: require("./images/noMe.png"),
                select: require("./images/selectMe_05.png"),
                components: 'me' //me  newMy
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
               // 'redian': '5c10cf48a310abf163b45662', // 热点
               'tuijian': '5d0ca2b5e4b0af4a6f4008a4', // 推荐
               'xijinpingshijian': '5d0ca2b5e4b0af4a6f4008a4', // 习近平时间
               'zhibo': '5cc7b1360cf2acaeba3f52ae', // 直播
               'jvzhen': '5cdbdc550cf2acaeba3f5605', // 部门媒体
               'jvzhennew': '5cde909e0cf2acaeba3f56d3', // 部门媒体
               'zhiding': '5dba4149e4b04c28f7795224', // 置顶
               'lianghui': '5c342fd9a310d0f746b3ad20', // 两会
               'youyuziid':'5cc7b1010cf2acaeba3f52aa',
               'xijingpinglunbo':'5dba4293e4b04c28f779522a'
            },
            columnIdChild: ['5cbd6d130cf21169387f12f5', '5cbd6d130cf21169387f12f8','5c22ed81a310abf163b4576e','5c22ed8ca310abf163b45770'], // 子级栏目
            columnIdOrder: ['5d0ca2b5e4b0af4a6f4008a4'], // 栏目排序
            columnIdHidden: ['5dba4293e4b04c28f779522a','5dba4149e4b04c28f7795224','5d03126be4b0ed2aef82fda6','5d031292e4b0ed2aef82fda8','5d0312ace4b0ed2aef82fdaa','5cc2e7ea0cf2c3d1b7e9d4a7','5ceaab820cf21d8154386dda','5cea01860cf23213ac8df4f1','5ce3eb030cf23213ac8df3e9','5ce3eb2c0cf23213ac8df3eb','5ce3ec6e0cf23213ac8df3f5','5cde909e0cf2acaeba3f56d3','5cdbdc550cf2acaeba3f5605','5cc7b1360cf2acaeba3f52ae', '5cc7ace50cf2acaeba3f5294','5c1da071a310abf163b45722','5c22ebb9a310abf163b45760','5c10f4d3a310abf163b45675','5c22f6a9a310abf163b45773','5c10cf48a310abf163b45662','5c1e2a21a310abf163b45735','5c10cf56a310abf163b45663'], // 隐藏栏目 置顶 大屏图片 大屏视频
            columnIdXhs: ['5c10cfcaa310abf163b45664'], // 请求新华社的栏目
            columnIdWenhaiListJson: [], // 请求闻海
            lianghuiChild: ['5c34304ea310d0f746b3ad23','5c343068a310d0f746b3ad26','5c343086a310d0f746b3ad29','5c343094a310d0f746b3ad2c'],
            lianghuiChildChild: ['5c34687ea310d0f746b3ad35','5c346890a310d0f746b3ad38','5c3468a0a310d0f746b3ad3b'],
            imgError: require("./images/img_error_s.jpg")
        },
        wenlv: {
            parentId: {
                qinqiang: '5cc7ad2d0cf2acaeba3f529a',
                wenlv: '5cc7ace50cf2acaeba3f5294',
                lvyoujingqu: '5c22ec29a310abf163b45762',
                xinshidai: '5c22f6a9a310abf163b45773'
            },
            columnId: {
                'lvyoujingqu': '' // 三级子级
            },
            columnIdOrder: ['5cc7acfa0cf2acaeba3f5296', '5c22ec29a310abf163b45764','5c22ecbca310abf163b45766','5c22ecd4a310abf163b45768'], // 栏目排序
            columnIdChild: ['5c22ed72a310abf163b4576c', '5c22ed50a310abf163b4576a','5c22ed81a310abf163b4576e','5c22ed8ca310abf163b45770'], // 子级栏目
            xinshidaiChild: ['5c22f6c0a310abf163b45775', '5c22f6cda310abf163b45777', '5c22f6dba310abf163b45779', '5c22f6e8a310abf163b4577b']
        },
        hcChild: {
            columnIdOrder: ['5d0341dce4b0ed2aef82fdc1', '5d0341dce4b0ed2aef82fdc3', '5d0341dce4b0ed2aef82fdc5', '5d0341f6e4b0ed2aef82fdc7','5d034209e4b0ed2aef82fdc9'], // 栏目排序
            columnIdHidden: ['5c22eb8da310abf163b4575c', '5c22eb8da310abf163b4575e']
        },
        qinqiang: {
            columnIdOrder: ['5cc7acfa0cf2acaeba3f5296', '5c22eafba310abf163b45752','5c22eb17a310abf163b45754','5c22eb2aa310abf163b45756'], // 栏目排序
            columnIdHidden: ['5c22eb8da310abf163b4575c','5c22eb8da310abf163b4575e']
        },
        services: {},
        me: {
            // 关于我们
            us: {
                text: "爱右玉",
                content: '爱右玉是山西省朔州市官方新闻客户端，右玉县融媒体平台立足于"新闻+政务+服务"的业务定位，从 "物理空间、体制机制、业务平台"三层面融合进行顶层设计，打造"一屏、五平台、N端" 的软件架构体系，形成"策、采、编、播、发、管、控、馈"立体化内容生产体系，实现"一次采集、多种生成、全媒传播"，把握新闻传播信息可视化、移动优先化、活动直播化的新趋势，通过内容、渠道、平台、管理、运营等方面的深度融合，建成形神兼备、软硬一体的融媒体平台建设解决方案。'
               
            }
        }
    };
    
    return obj;
}
window.$themeConfig = config()