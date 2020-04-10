function config() {
    var obj = {
        dominantColor: "#3fa2ff",//主题颜色
        imgHost:'http://haicang.wengetech.com:28086',//发表图文图片线上地址
        titlescolors:'#fff',
        api: {
            appInfoId:'4', //18 13
            appShare:'https://www.pgyer.com/eNdg',
            appName:'haicang',
            appWeather:'https://www.tianqiapi.com/api/?version=v6&cityid=101230204', //乐山天气的请求id
            appWeatherUrl:'http://wx.weather.com.cn/mweather/101230204.shtml#1', //乐山天气的请求id
            updataCheckUrlUrl: 'http://haicang.wengetech.com:28086/common_al/common/getNewestAppVersion', // 更新
            questionName:'福建省 厦门市 海沧区',
            questionId:['350000000000','350200000000','350205000000'],
            rmtNews:'com.zkwg.hcnews.Helper',
            news: {
                // http://192.168.4.126:8089
                // column: 'http://haicang.wengetech.com:9080/api/site/qtx/column/listAll', // 栏目
                    column: 'http://haicang.wengetech.com:9001/news/getNewsColumn', // 栏目
                // infoListByColumnId: 'http://haicang.wengetech.com:9080/api/site/channels/qtx/columns/',
                    infoListByColumnId: 'http://haicang.wengetech.com:9001/news/getNewsColumnData',
                    getNewsChannelData: 'http://haicang.wengetech.com:9001/news/getNewsChannelData', // 推荐所有的栏目
                    getNewsDetailData: 'http://haicang.wengetech.com:9001/news/getNewsDetailData', // 详情
                getPageListByServeralID: 'http://haicang.wengetech.com:28086/xhs_al/xhs/getPageListByServeralID', // 新华社接口
                getInfoDetailByID: 'http://haicang.wengetech.com:28086/xhs_al/xhs/getInfoDetailByID2', //新华社分享详情
                    addReadOrShareNum: 'http://haicang.wengetech.com:9001/news/addReadOrShareNum', //浏览、分享、点赞量
                wenhaiListJson: 'http://haicang.wengetech.com:10001/wenhaiAPI/openAPI/headline/listJson', //闻海
                wenhaiAppHeadLine: 'http://wxservice.wengetech.com/rongmeiti-wenhai-hongqi/openAPI/headline/openAppHeadLine', // 闻海微信矩阵
                wenhaiDisplayConfigs: 'http://haicang.wengetech.com:10001/wenhaiAPI/wxx_al/mod1/displayConfigs', // 闻海 专题
                imgCompress: 'http://haicang.wengetech.com:28086/common_al/common/imgCompress?filePath=',  //图片压缩
                isLike:'http://haicang.wengetech.com:28086/common_al/common/isLike',//是否点赞 
                removeLike:'http://haicang.wengetech.com:28086/common_al/common/removeLike',//取消点赞
                    commentLikes:'http://haicang.wengetech.com:9001/activities/commentLike',
                    getNewAudio:'http://haicang.wengetech.com:9001/news/getNewAudio',//新闻详情输出语音播报
                    addCollectNews:'http://haicang.wengetech.com:9001/my_al/my/addCollectNews', //添加收藏新闻
                    delUserFavorites:'http://haicang.wengetech.com:9001/my_al/my/delUserFavorites', //新增删除新闻收藏
                judgeShareNews:'http://haicang.wengetech.com:28086/my_al/my/judgeShareNews', //判断是否收藏过当前新闻
                activitylists:'http://hongqi.wengetech.com:9001/activities/searchAll', //活动列表
                activityDetails:'http://hongqi.wengetech.com:9001/activities/searchById', //活动列表
                activitygetActivities:'http://hongqi.wengetech.com:9001/activities/getActivitiesComments', //评论列表
                getNewsComments:'http://hongqi.wengetech.com:9001/activities/getNewsComments', //新闻评论列表
                addComment:'http://hongqi.wengetech.com:9001/activities/addComment', //活动评论添加
                addNewsComment:'http://hongqi.wengetech.com:9001/activities/addNewsComment', //新闻评论添加
                signUp:'http://hongqi.wengetech.com:9001/activities/signUp', //报名页面
                signUpStatus:'http://hongqi.wengetech.com:9001/activities/signUpStatus', //报名页面
                cancels:'http://hongqi.wengetech.com:9001/activities/cancel', //报名页面
                
                delesay:'http://hongqi.wengetech.com:9001/activities/deleteComments', //删除评论
                getCommenlist:'http://hongqi.wengetech.com:9001/activities/getCommentById', //新增评论列表接
            },
            //微社区接口
            community:{
                getHotBlogs:'http://haicang.wengetech.com:28086/community_al/blog/getHotBlogs',//热门列表
                getFollowBlogs:'http://haicang.wengetech.com:28086/community_al/blog/getFollowBlogs',//关注列表
                addBlogInfo:'http://haicang.wengetech.com:28086/community_al/blog/addBlogInfo',//新增博文
                getMyBlogInfoList:'http://haicang.wengetech.com:28086/community_al/blog/getMyBlogInfoList',//个人博文列表
                getOthersBlogInfoList:'http://haicang.wengetech.com:28086/community_al/blog/getOthersBlogInfoList',//他人博文列表
                blogLike:'http://haicang.wengetech.com:28086/community_al/blog/blogLike',//博文点赞
                getBlogLikeList:'http://haicang.wengetech.com:28086/community_al/blog/getBlogLikeList',//博文点赞列表
                addBlogComment:'http://haicang.wengetech.com:28086/community_al/blog/addBlogComment',//新增博文评论
                getBlogCommentList:'http://haicang.wengetech.com:28086/community_al/blog/getBlogCommentList',//获取博文评论列表
                deleteBlogComment:'http://haicang.wengetech.com:28086/community_al/blog/deleteBlogComment',//删除博文评论、
                getUserInfo:'http://haicang.wengetech.com:28086/community_al/user/getUserInfo',//博主信息查询
                getFansList:'http://hongqi.wengetech.com:9001/userFans/getFansList',//获取粉丝列表
                getFollowList:'http://hongqi.wengetech.com:9001/userFans/getFocusList',//获取关注列表
                followOtherUser:'http://haicang.wengetech.com:28086/community_al/user/followOtherUser',//博主关注/取消关注接口
                sendPrivateLetter:'http://haicang.wengetech.com:28086/community_al/user/sendPrivateLetter',//博主私信接口
                deleteBlogInfo:'http://haicang.wengetech.com:28086/community_al/blog/deleteBlogInfo',//删除博文
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

                addFavorites:'http://haicang.wengetech.com:9001/my_al/my/addFavorites',  //活动，动态收藏接口
                delUserFavorites:'http://haicang.wengetech.com:9001/my_al/my/delUserFavorites' //删除用户活动或动态收藏
            },
            //我的接口
            me:{
                register:'http://haicang.wengetech.com:28086/login_al/login/register', //注册
                loginByCaptcha:'http://haicang.wengetech.com:28086/login_al/login/loginByCaptcha',//登陆 手机号+验证码
                loginByPassword:'http://haicang.wengetech.com:28086/login_al/login/loginByPassword',//登陆 手机号+密码
                getSms:'http://haicang.wengetech.com:28086/login_al/login/getSms',//验证码
                logout:'http://haicang.wengetech.com:28086/login_al/login/logout',//注销
                wechatLogin:'http://haicang.wengetech.com:28086/login_al/wechatlogin/wechatLogin',//微信登陆
                qqLogin:'http://haicang.wengetech.com:28086/login_al/qqlogin/qqLogin',//qq登陆
                weiboLogin:'http://haicang.wengetech.com:28086/login_al/weibologin/weiboLogin',//微博登陆
                modifyUserInfo:'http://haicang.wengetech.com:28086/my_al/my/modifyUserInfo', //修改用户名
                addUserFeedback:'http://haicang.wengetech.com:28086/my_al/my/addUserFeedback',//意见反馈
                getUserCollect:'http://haicang.wengetech.com:28086/my_al/my/getUserCollect', //查看个人收藏
                delUserCollect:'http://haicang.wengetech.com:28086/my_al/my/delUserCollect', //取消收藏新闻
                isCollection:'http://haicang.wengetech.com:28086/my_al/my/isCollection',// 判断是否收藏此新闻
                addReportMaterialInfo: 'http://dongpo.wengetech.com:9001/revelation/addReportMaterialInfo', //添加报料
                getAllReportMaterialList: 'http://dongpo.wengetech.com:9001/revelation/getAllReportMaterialList', //全部报料信息
                getMyReportMaterialList: 'http://haicang.wengetech.com:28086/my_al/my/getMyReportMaterialList', //我的报料信息
                selectManageUserById:'http://hongqi.wengetech.com:9001/manageUser/selectManageUserById', //查询指定用户详情
                addUserFans:'http://hongqi.wengetech.com:9001/userFans/addUserFans',//关注用户
                cancelFans:'http://hongqi.wengetech.com:9001/userFans/cancelFans',  //取消关注用户
                updateManageUserById:'http://hongqi.wengetech.com:9001/manageUser/updateManageUserById',  //更新用户信息

                seachUserFavContent:'http://haicang.wengetech.com:9001/my_al/my/seachUserFavContent', //查看用户收藏接口
                addUserBrowse:'http://haicang.wengetech.com:9001/userBrowse/addUserBrowse', //添加用户最近浏览
                getActivBySignUpUserId:'http://haicang.wengetech.com:9001/activities/getActivitiesBySignUpUserId', //查询用户已经报名的活动列表
            },
            //服务接口
            services:{
                //问政
                getWzServiceQuestions: 'http://haicang.wengetech.com:28086/wz_al/wz/getWzServiceQuestions',//问答列表
                getMyWzServiceQuestions: 'http://haicang.wengetech.com:28086/wz_al/wz/getMyWzServiceQuestions',//我的提问列表
                addWzServiceQuestion: 'http://haicang.wengetech.com:28086/wz_al/wz/addWzServiceQuestion',//新增提问
                addWzServiceReplay: 'http://haicang.wengetech.com:28086/wz_al/wz/addWzServiceReplay',//新增回复
                getWzQuestionAndReplayDetail: 'http://haicang.wengetech.com:28086/wz_al/wz/getWzQuestionAndReplayDetail',//问答明细接口
                getWzQuestionObjects: 'http://haicang.wengetech.com:28086/wz_al/wz/getWzQuestionObjects',//获取问题对象接口
                getWzQuestionTypes: 'http://haicang.wengetech.com:28086/wz_al/wz/getWzQuestionTypes',//获取问题性质接口
                getWzQuestionCategory: 'http://haicang.wengetech.com:28086/wz_al/wz/getWzQuestionCategory',//'获取问题分类接口
                getMyWzServiceWaitingList: 'http://haicang.wengetech.com:28086/wz_al/wz/getMyWzServiceWaitingList',//我的待回复列表
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
                components: 'haicang_wenlv'
            },{
                name: '市民云',
                noSelect: require("./images/ta2.png"),
                select: require("./images/selectgSerice2.png"),
                components: 'service',
                isChaoyang:false
            },{
                name: '政务矩阵',
                noSelect: require("./images/government.png"),
                select: require("./images/governmentactive.png"),
                components: 'haicangZw'
            },{
                name: '我的',
                noSelect: require("./images/noMe.png"),
                select: require("./images/selectMe_05.png"),
                components: 'me'
            },
        ],
        news: { // 新闻
            parentId:{
                'kanTV':''
            },
           columnId: {
                'zhiding': '5cc260710cf2c3d1b7e9d460', // 习近平时间/置顶
                'tuijian': '5c0f935aa310968e54438806', // 推荐 
                'zhibo': '5cc260710cf2c3d1b7e9d46e', // 直播 
                'kanTV':''
            },
            columnIdChild:[''],
            columnIdOrder: ['5cc260710cf2c3d1b7e9d460','5d5fafe8e4b0feeb914c5125','5d5fafe8e4b0feeb914c5127', '5cede9360cf2bd5d317cf425','5cc260710cf2c3d1b7e9d466','5cefa709e4b0b2cdcbcf49d2'], // 栏目排序
            columnIdHidden: ['5cd1307d0cf2acaeba3f539a','5d776c34e4b0e2963a408ec2','5cc260710cf2c3d1b7e9d464','5cedea220cf2bd5d317cf429','5cc260710cf2c3d1b7e9d462','5cd2871c0cf2acaeba3f53c3','5cc260710cf2c3d1b7e9d468','5cc260710cf2c3d1b7e9d46c','5cc260710cf2c3d1b7e9d46a','5cedea220cf2bd5d317cf42b'], // 隐藏栏目 置顶 大屏图片 大屏视频
            columnIdXhs: ['5c10cfcaa310abf163b45664','5c188ce5a310abf163b456de','5c170e87a310abf163b456c5','5c10f4dea310abf163b45677','5c1da60aa310abf163b45724'], // 请求新华社的栏目
            channelId: { // 新华社参数
                '5c10cfcaa310abf163b45664': 'c0030173001,c0030173010', // 习近平时间
                '5c188ce5a310abf163b456de': 'c0030173010', // 短视频
                '5c170e87a310abf163b456c5': 'c0030173005,c0030173030', // 图片
                '5c10f4dea310abf163b45677': 'c0030173018', // 国际
                '5c1e2a21a310abf163b45735': 'c0030173028', // 科技
                '5c10f4eba310abf163b45679': 'c0050001011,c0090155,c0030002014', // 社会
                '5c1da60aa310abf163b45724': 'c0030173027' // 
            },
            channelJson: {
                '5c10cfcaa310abf163b45664': '[{"channel_id":"c0030173010","kws":"习近平时间","filter":"title"}]', // 习近平时间
                '5c188ce5a310abf163b456de': '[{"channel_id":"c0030173010"}]', // 短视频
                '5c170e87a310abf163b456c5': '[{"channel_id":"c0030173005"},{"channel_id":"c0030173030"}]', // 图片
                '5c10f4dea310abf163b45677': '[{"channel_id":"c0030173018"}]', // 国际
                '5c1e2a21a310abf163b45735': '[{"channel_id":"c0030173028"}]', // 科技
                '5c10f4eba310abf163b45679': '[{"channel_id":"c0050001011"},{"channel_id":"c0090155"},{"channel_id":"c0030002014"}]', // 社会
                '5c1da60aa310abf163b45724': '[{"channel_id":"c0030173027"}]'
            },
            // columnIdWenhaiListJson: ['5c10cf56a310abf163b45663','5c10cf48a310abf163b45662','5c10f491a310abf163b4566f','5c10f4a3a310abf163b45671'], // 请求闻海
            columnIdWenhaiListJson: [], // 请求闻海
            wenhaiListJsonR: { // 闻海参数
                '5c10cf56a310abf163b45663': '117e42b53f2a7173e94a73ae33d0a4a9', // 推荐
                '5c10cf48a310abf163b45662': '2wq142b53f2a7173e94a73ae33d12weq', // 热点
                '5c10f491a310abf163b4566f': 'gh2314b53f2a7173e94a73ae335612er', // 党建
                '5c10f4a3a310abf163b45671': '6712dfb53f2a7173e94a73ae367sd12er' // 扶贫
            },
            lianghuiChild: ['5c34304ea310d0f746b3ad23','5c343068a310d0f746b3ad26','5c343086a310d0f746b3ad29','5c343094a310d0f746b3ad2c'],
            lianghuiChildChild: ['5c34687ea310d0f746b3ad35','5c346890a310d0f746b3ad38','5c3468a0a310d0f746b3ad3b'],
            // imgError: require("./images/img_error_s.jpg")
        },
        wenlv: {
            parentId: {
                qinqiang: '5cc550cc0cf2c3d1b7e9d4be', //两岸一家亲
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
        hclv:{
            parentId: {
                qinqiang: '5cd2871c0cf2acaeba3f53c3', //两岸一家亲
                wenlv: '5cd2871c0cf2acaeba3f53c3',
                lvyoujingqu: '5cd2874b0cf2acaeba3f53c7',
                xinshidai: '5c22f6a9a310abf163b45773'
            },
            columnId: {
                'lvyoujingqu': '5cd2874b0cf2acaeba3f53c7'
            },
            columnIdOrder: ['5cd2874b0cf2acaeba3f53c7', '5c22ec29a310abf163b45764','5c22ecbca310abf163b45766','5c22ecd4a310abf163b45768'], // 栏目排序
            columnIdChild: ['5cd391f30cf2acaeba3f53e7', '5cd391f30cf2acaeba3f53e5','5cd391f30cf2acaeba3f53e9','5cd391f30cf2acaeba3f53eb'], // 子级栏目
            xinshidaiChild: ['5c22f6c0a310abf163b45775', '5c22f6cda310abf163b45777', '5c22f6dba310abf163b45779', '5c22f6e8a310abf163b4577b']
        },
        //海沧文旅二级栏目
        hcChild:{
            columnIdOrder: ['5cd2874b0cf2acaeba3f53c5','5cd2874b0cf2acaeba3f53c7','5cedeced0cf2bd5d317cf42d','5cd2874b0cf2acaeba3f53c9'], // 栏目排序
            columnIdHidden: ['5cd2874b0cf2acaeba3f53c9','5c22eb8da310abf163b4575e']
        },
        qinqiang: {
            columnIdOrder: ['5cc551840cf2c3d1b7e9d4c2','5cc551840cf2c3d1b7e9d4c4','5cd130330cf2acaeba3f5394'], // 栏目排序
            columnIdHidden: ['5cc551840cf2c3d1b7e9d4c0','5c22eb8da310abf163b4575c','5c22eb8da310abf163b4575e']
        },
        me: { // 关于我们
            us: {
                text: "云上海沧",
                content: "海沧，位于厦门岛西部，面积186平方公里，常住人口36万，北部古属泉州府同安县，南部古属漳州府海澄县。1958年划归厦门管辖，海沧融汇了当今的厦漳泉，可以说是“最闽南”。1989年5月20日，国务院决定设立海沧台商投资区，2003年设立海沧行政区。海沧建设30年来，经济社会发展跃入了快车道，已经崛起成为祖国东南沿海的一座崭新城区。2018年，海沧人均地区生产总值达到2.62万美元，与台湾地区持平。相当于全球200个经济体的第35位。"
            }
        }
    };
    return obj;
}

window.$themeConfig = config()
// export { //很关键
//     config
//    }