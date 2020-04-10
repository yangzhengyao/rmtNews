function config() {
    var obj = {
        dominantColor: "#fff", //主题颜色
        titlesColor:'#1a1a1a',
        imgHost:'http://chaoyang.wengetech.com:28086',//发表图文图片线上地址
        api: {
            appInfoId:'6',
            appShare:'https://www.pgyer.com/EmQR',
            appName:'chaoyang',
            //appWeather:'101071201',
            appWeather:'https://www.tianqiapi.com/api/?version=v6&cityid=101071201',
            updataCheckUrlUrl: 'http://chaoyang.wengetech.com:28086/common_al/common/getNewestAppVersion', // 更新
            questionName:'辽宁省 朝阳市 朝阳县',
            questionId:['210000000000','211300000000','211321000000'],
            rmtNews:'com.zkwg.cynews.Helper',
            news: {
                // column: 'http://chaoyang.wengetech.com:9080/api/site/qtx/column/listAll', // 栏目
                    column: 'http://chaoyang.wengetech.com:9001/news/getNewsColumn', // 栏目
                // infoListByColumnId: 'http://chaoyang.wengetech.com:9080/api/site/channels/qtx/columns/',
                    infoListByColumnId: 'http://chaoyang.wengetech.com:9001/news/getNewsColumnData',
                    getNewsDetailData: 'http://chaoyang.wengetech.com:9001/news/getNewsDetailData', // 详情
                getPageListByServeralID: 'http://chaoyang.wengetech.com:28086/xhs_al/xhs/getPageListByServeralID', // 新华社接口
                getInfoDetailByID: 'http://chaoyang.wengetech.com:28086/xhs_al/xhs/getInfoDetailByID2', //新华社分享详情
                    addReadOrShareNum: 'http://chaoyang.wengetech.com:9001/news/addReadOrShareNum', //浏览、分享、点赞量
                wenhaiListJson: 'http://chaoyang.wengetech.com:10001/wenhaiAPI/openAPI/headline/listJson', //闻海
                wenhaiAppHeadLine: 'http://wxservice.wengetech.com/wenhaiFt/openAPI/headline/openAppHeadLine', // 闻海微信矩阵
                wenhaiDisplayConfigs: 'http://chaoyang.wengetech.com:10001/wenhaiAPI/wxx_al/mod1/displayConfigs', // 闻海 专题
                imgCompress: 'http://chaoyang.wengetech.com:28086/common_al/common/imgCompress?filePath=',  //图片压缩
                isLike:'http://chaoyang.wengetech.com:28086/common_al/common/isLike',//是否点赞 
                removeLike:'http://chaoyang.wengetech.com:28086/common_al/common/removeLike',//取消点赞
                    commentLikes:'http://chaoyang.wengetech.com:9001/activities/commentLike',
                    getNewAudio:'http://chaoyang.wengetech.com:9001/news/getNewAudio',//新闻详情输出语音播报
                    addCollectNews:'http://chaoyang.wengetech.com:9001/my_al/my/addCollectNews', //添加收藏新闻
                    delUserFavorites:'http://chaoyang.wengetech.com:9001/my_al/my/delUserFavorites', //新增删除新闻收藏
                judgeShareNews:'http://chaoyang.wengetech.com:28086/my_al/my/judgeShareNews', //判断是否收藏过当前新闻
            },
            //微社区接口  
            community:{
                getHotBlogs:'http://chaoyang.wengetech.com:28086/community_al/blog/getHotBlogs',//热门列表
                getFollowBlogs:'http://chaoyang.wengetech.com:28086/community_al/blog/getFollowBlogs',//关注列表
                addBlogInfo:'http://chaoyang.wengetech.com:28086/community_al/blog/addBlogInfo',//新增博文
                getMyBlogInfoList:'http://chaoyang.wengetech.com:28086/community_al/blog/getMyBlogInfoList',//个人博文列表
                getOthersBlogInfoList:'http://chaoyang.wengetech.com:28086/community_al/blog/getOthersBlogInfoList',//他人博文列表
                blogLike:'http://chaoyang.wengetech.com:28086/community_al/blog/blogLike',//博文点赞
                getBlogLikeList:'http://chaoyang.wengetech.com:28086/community_al/blog/getBlogLikeList',//博文点赞列表
                addBlogComment:'http://chaoyang.wengetech.com:28086/community_al/blog/addBlogComment',//新增博文评论
                getBlogCommentList:'http://chaoyang.wengetech.com:28086/community_al/blog/getBlogCommentList',//获取博文评论列表
                deleteBlogComment:'http://chaoyang.wengetech.com:28086/community_al/blog/deleteBlogComment',//删除博文评论、
                getUserInfo:'http://chaoyang.wengetech.com:28086/community_al/user/getUserInfo',//博主信息查询
                getFansList:'http://chaoyang.wengetech.com:28086/community_al/user/getFansList',//获取粉丝列表
                getFollowList:'http://chaoyang.wengetech.com:28086/community_al/user/getFollowList',//获取关注列表
                followOtherUser:'http://chaoyang.wengetech.com:28086/community_al/user/followOtherUser',//博主关注/取消关注接口
                sendPrivateLetter:'http://chaoyang.wengetech.com:28086/community_al/user/sendPrivateLetter',//博主私信接口
                deleteBlogInfo:'http://chaoyang.wengetech.com:28086/community_al/blog/deleteBlogInfo',//删除博文

                addFavorites:'http://chaoyang.wengetech.com:9001/my_al/my/addFavorites',  //活动，动态收藏接口
                delUserFavorites:'http://chaoyang.wengetech.com:9001/my_al/my/delUserFavorites' //删除用户活动或动态收藏
            },
            //我的接口
            me:{
                register:'http://chaoyang.wengetech.com:28086/login_al/login/register',//注册
                loginByCaptcha:'http://chaoyang.wengetech.com:28086/login_al/login/loginByCaptcha',//登陆 手机号+验证码
                loginByPassword:'http://chaoyang.wengetech.com:28086/login_al/login/loginByPassword',//登陆 手机号+密码
                getSms:'http://chaoyang.wengetech.com:28086/login_al/login/getSms',//验证码
                logout:'http://chaoyang.wengetech.com:28086/login_al/login/logout',//注销
                wechatLogin:'http://chaoyang.wengetech.com:28086/login_al/wechatlogin/wechatLogin',//微信登陆
                qqLogin:'http://chaoyang.wengetech.com:28086/login_al/qqlogin/qqLogin',//qq登陆
                weiboLogin:'http://chaoyang.wengetech.com:28086/login_al/weibologin/weiboLogin',//微博登陆
                modifyUserInfo:'http://chaoyang.wengetech.com:28086/my_al/my/modifyUserInfo', //修改用户名
                addUserFeedback:'http://chaoyang.wengetech.com:28086/my_al/my/addUserFeedback',//意见反馈
                getUserCollect:'http://chaoyang.wengetech.com:28086/my_al/my/getUserCollect', //查看个人收藏
                delUserCollect:'http://chaoyang.wengetech.com:28086/my_al/my/delUserCollect', //取消收藏新闻
                isCollection:'http://chaoyang.wengetech.com:28086/my_al/my/isCollection',// 判断是否收藏此新闻
                addReportMaterialInfo:'http://chaoyang.wengetech.com:28086/my_al/my/addReportMaterialInfo', //添加报料
                getAllReportMaterialList:'http://chaoyang.wengetech.com:28086/my_al/my/getAllReportMaterialList', //全部报料信息
                getMyReportMaterialList:'http://chaoyang.wengetech.com:28086/my_al/my/getMyReportMaterialList', //我的报料信息

                seachUserFavContent:'http://chaoyang.wengetech.com:9001/my_al/my/seachUserFavContent', //查看用户收藏接口
                addUserBrowse:'http://chaoyang.wengetech.com:9001/userBrowse/addUserBrowse', //添加用户最近浏览
                getActivBySignUpUserId:'http://chaoyang.wengetech.com:9001/activities/getActivitiesBySignUpUserId', //查询用户已经报名的活动列表
            },
            //服务接口
            services:{
                //问政
                getWzServiceQuestions:'http://chaoyang.wengetech.com:28086/wz_al/wz/getWzServiceQuestions',//问答列表
                getMyWzServiceQuestions:'http://chaoyang.wengetech.com:28086/wz_al/wz/getMyWzServiceQuestions',//我的提问列表
                addWzServiceQuestion:'http://chaoyang.wengetech.com:28086/wz_al/wz/addWzServiceQuestion',//新增提问
                addWzServiceReplay:'http://chaoyang.wengetech.com:28086/wz_al/wz/addWzServiceReplay',//新增回复
                getWzQuestionAndReplayDetail:'http://chaoyang.wengetech.com:28086/wz_al/wz/getWzQuestionAndReplayDetail',//问答明细接口
                getWzQuestionObjects:'http://chaoyang.wengetech.com:28086/wz_al/wz/getWzQuestionObjects',//获取问题对象接口
                getWzQuestionTypes:'http://chaoyang.wengetech.com:28086/wz_al/wz/getWzQuestionTypes',//获取问题性质接口
                getWzQuestionCategory:'http://chaoyang.wengetech.com:28086/wz_al/wz/getWzQuestionCategory',//'获取问题分类接口
                getMyWzServiceWaitingList:'http://chaoyang.wengetech.com:28086/wz_al/wz/getMyWzServiceWaitingList',//我的待回复列表
                
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
                components: 'lives'
            },{
                name: '市民云',
                noSelect: require("./images/ta2.png"),
                select: require("./images/selectgSerice2.png"),
                components: 'service'
            },{
                name: '微社区',
                noSelect: require("./images/noCommunity.png"),
                select: require("./images/community_03.png"),
                components: 'community',
                isChaoyang:true,
                cyName:'学习强国'
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
                kanTV: '5cbd6c060cf21169387f12e6',
                xinshidai: ''
            },
            columnId: {
                'redian': '5caaa9e70cf21169387f1271', // 要闻
                'xjp': '5caaaa720cf21169387f1273', // 推荐
                'tupian': '5caaaa720cf21169387f1275', // 图片
                'shipin': '5caaaa730cf21169387f1277', // 视频
                'zhiding': '5caab6240cf21169387f1289', // 置顶
                'shizheng': '5caaaa730cf21169387f127b', // 时政
                'shehui': '5caaaa730cf21169387f127d', // 社会
                'zhibo': '5caaaa730cf21169387f127f', // 直播
                'kanTV':'5cbd6c060cf21169387f12e6'
            },
            columnIdOrder: ['5caaaa720cf21169387f1273', '5caaa9e70cf21169387f1271'], // 栏目排序
            columnIdHidden: ['5c3844e8a31057f3fd4e247b','5c7e3f180cf28d7f9fb8f003','5cbd6d130cf21169387f12fb','5caab6240cf21169387f1289'], // 隐藏栏目 文旅
            columnIdChild: ['5cbd6d130cf21169387f12f5', '5cbd6d130cf21169387f12f8','5c22ed81a310abf163b4576e'], // 子级栏目
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
            columnIdChild: [], // 子级栏目
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
                text: "魅力朝阳县",
                content: "魅力朝阳县是朝阳县官方新闻客户端，是朝阳县融媒体中心打造的一款接地气、说实话、重民生的精品APP。魅力朝阳县围绕“新闻+信息+服务”的理念，涵盖新闻、视频、直播、微社区、问政、便民服务、大数据新闻等多个板块。是传播中央声音的重要阵地，讲好朝阳县故事的有力抓手，连通朝阳县群众的移动入口，服务文旅经济的有力平台。"
            }
        }
    };
    
    return obj;
}
window.$themeConfig = config()