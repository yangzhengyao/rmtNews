function config() {
    var obj = {
        dominantColor: "#fff",//主题颜色
        titlesColor:'#1a1a1a',
        imgHost:'http://chuxiong.wengetech.com:28086',//发表图文图片线上地址
        api: {
            updataCheckUrlUrl: 'http://chuxiong.wengetech.com:28086/common_al/common/getNewestAppVersion',
            appInfoId:'19',
            appShare:'https://www.pgyer.com/UKdV',
            appName:'chuxiong',
            //appWeather:'101290801',
            appWeather:'https://www.tianqiapi.com/api/?version=v6&cityid=101290801',
            questionName:'云南省 楚雄彝族自治州 楚雄市',
            questionId:['530000000000','532300000000','532301000000'],
            rmtNews:'com.zkwg.chuxiongnews.Helper',
            news: {
              // column: 'http://chuxiong.wengetech.com:9080/api/site/chuxiong/column/listAll', // 栏目
                column: 'http://chuxiong.wengetech.com:9001/news/getNewsColumn', // 栏目
              // infoListByColumnId: 'http://chuxiong.wengetech.com:9080/api/site/channels/chuxiong/columns/',
                infoListByColumnId: 'http://chuxiong.wengetech.com:9001/news/getNewsColumnData',
                getNewsDetailData: 'http://chuxiong.wengetech.com:9001/news/getNewsDetailData', // 详情
              getPageListByServeralID: 'http://chuxiong.wengetech.com:28086/xhs_al/xhs/getPageListByServeralID', // 新华社接口
              getInfoDetailByID: 'http://chuxiong.wengetech.com:28086/xhs_al/xhs/getInfoDetailByID2', //新华社分享详情
                addReadOrShareNum: 'http://chuxiong.wengetech.com:9001/news/addReadOrShareNum', //浏览、分享、点赞量
              wenhaiListJson: 'http://ft.wengetech.com:10001/wenhaiAPI/openAPI/headline/listJson', //闻海
              wenhaiAppHeadLine: 'http://wxservice.wengetech.com/wenhaiFt/openAPI/headline/openAppHeadLine', // 闻海微信矩阵
              wenhaiDisplayConfigs: 'http://ft.wengetech.com:10001/wenhaiAPI/wxx_al/mod1/displayConfigs', // 闻海 专题
              imgCompress: 'http://chuxiong.wengetech.com:28086/common_al/common/imgCompress?filePath=',  //图片压缩
              isLike:'http://chuxiong.wengetech.com:28086/common_al/common/isLike',//是否点赞 
              removeLike:'http://chuxiong.wengetech.com:28086/common_al/common/removeLike',//取消点赞
                commentLikes:'http://puyang.wengetech.com:9001/activities/commentLike',
                getNewAudio:'http://chuxiong.wengetech.com:9001/news/getNewAudio',//新闻详情输出语音播报
                addCollectNews:'http://chuxiong.wengetech.com:9001/my_al/my/addCollectNews', //添加收藏新闻
                delUserFavorites:'http://leshan.wengetech.com:9001/my_al/my/delUserFavorites', //新增删除新闻收藏
              judgeShareNews:'http://chuxiong.wengetech.com:28086/my_al/my/judgeShareNews', //判断是否收藏过当前新闻
            },
            //微社区接口
            community:{
                getHotBlogs:'http://chuxiong.wengetech.com:28086/community_al/blog/getHotBlogs',//热门列表
                getFollowBlogs:'http://chuxiong.wengetech.com:28086/community_al/blog/getFollowBlogs',//关注列表
                addBlogInfo:'http://chuxiong.wengetech.com:28086/community_al/blog/addBlogInfo',//新增博文
                getMyBlogInfoList:'http://chuxiong.wengetech.com:28086/community_al/blog/getMyBlogInfoList',//个人博文列表
                getOthersBlogInfoList:'http://chuxiong.wengetech.com:28086/community_al/blog/getOthersBlogInfoList',//他人博文列表
                blogLike:'http://chuxiong.wengetech.com:28086/community_al/blog/blogLike',//博文点赞
                getBlogLikeList:'http://chuxiong.wengetech.com:28086/community_al/blog/getBlogLikeList',//博文点赞列表
                addBlogComment:'http://chuxiong.wengetech.com:28086/community_al/blog/addBlogComment',//新增博文评论
                getBlogCommentList:'http://chuxiong.wengetech.com:28086/community_al/blog/getBlogCommentList',//获取博文评论列表
                deleteBlogComment:'http://chuxiong.wengetech.com:28086/community_al/blog/deleteBlogComment',//删除博文评论、
                getUserInfo:'http://chuxiong.wengetech.com:28086/community_al/user/getUserInfo',//博主信息查询
                getFansList:'http://chuxiong.wengetech.com:28086/community_al/user/getFansList',//获取粉丝列表
                getFollowList:'http://chuxiong.wengetech.com:28086/community_al/user/getFollowList',//获取关注列表
                followOtherUser:'http://chuxiong.wengetech.com:28086/community_al/user/followOtherUser',//博主关注/取消关注接口
                sendPrivateLetter:'http://chuxiong.wengetech.com:28086/community_al/user/sendPrivateLetter',//博主私信接口
                deleteBlogInfo:'http://chuxiong.wengetech.com:28086/community_al/blog/deleteBlogInfo',  //删除博文

                addFavorites:'http://chuxiong.wengetech.com:9001/my_al/my/addFavorites',  //活动，动态收藏接口
                delUserFavorites:'http://chuxiong.wengetech.com:9001/my_al/my/delUserFavorites' //删除用户活动或动态收藏
            },
            //我的接口
            me:{
                register:'http://chuxiong.wengetech.com:28086/login_al/login/register',//注册
                loginByCaptcha:'http://chuxiong.wengetech.com:28086/login_al/login/loginByCaptcha',//登陆 手机号+验证码
                loginByPassword:'http://chuxiong.wengetech.com:28086/login_al/login/loginByPassword',//登陆 手机号+密码
                getSms:'http://chuxiong.wengetech.com:28086/login_al/login/getSms',//验证码
                logout:'http://chuxiong.wengetech.com:28086/login_al/login/logout',//注销
                wechatLogin:'http://chuxiong.wengetech.com:28086/login_al/wechatlogin/wechatLogin',//微信登陆
                qqLogin:'http://chuxiong.wengetech.com:28086/login_al/qqlogin/qqLogin',//qq登陆
                weiboLogin:'http://chuxiong.wengetech.com:28086/login_al/weibologin/weiboLogin',//微博登陆
                modifyUserInfo:'http://chuxiong.wengetech.com:28086/my_al/my/modifyUserInfo', //修改用户名
                addUserFeedback:'http://chuxiong.wengetech.com:28086/my_al/my/addUserFeedback',//意见反馈
                getUserCollect:'http://chuxiong.wengetech.com:28086/my_al/my/getUserCollect', //查看个人收藏
                delUserCollect:'http://chuxiong.wengetech.com:28086/my_al/my/delUserCollect', //取消收藏新闻
                isCollection:'http://chuxiong.wengetech.com:28086/my_al/my/isCollection',// 判断是否收藏此新闻
                addReportMaterialInfo:'http://chuxiong.wengetech.com:28086/my_al/my/addReportMaterialInfo', //添加报料
                getAllReportMaterialList:'http://chuxiong.wengetech.com:28086/my_al/my/getAllReportMaterialList', //全部报料信息
                getMyReportMaterialList:'http://chuxiong.wengetech.com:28086/my_al/my/getMyReportMaterialList', //我的报料信息

                seachUserFavContent:'http://chuxiong.wengetech.com:9001/my_al/my/seachUserFavContent', //查看用户收藏接口
                addUserBrowse:'http://chuxiong.wengetech.com:9001/userBrowse/addUserBrowse', //添加用户最近浏览
                getActivBySignUpUserId:'http://chuxiong.wengetech.com:9001/activities/getActivitiesBySignUpUserId', //查询用户已经报名的活动列表

                
            },
            //服务接口
            services:{
                //问政
                getWzServiceQuestions:'http://chuxiong.wengetech.com:28086/wz_al/wz/getWzServiceQuestions',//问答列表
                getMyWzServiceQuestions:'http://chuxiong.wengetech.com:28086/wz_al/wz/getMyWzServiceQuestions',//我的提问列表
                addWzServiceQuestion:'http://chuxiong.wengetech.com:28086/wz_al/wz/addWzServiceQuestion',//新增提问
                addWzServiceReplay:'http://chuxiong.wengetech.com:28086/wz_al/wz/addWzServiceReplay',//新增回复
                getWzQuestionAndReplayDetail:'http://chuxiong.wengetech.com:28086/wz_al/wz/getWzQuestionAndReplayDetail',//问答明细接口
                getWzQuestionObjects:'http://chuxiong.wengetech.com:28086/wz_al/wz/getWzQuestionObjects',//获取问题对象接口
                getWzQuestionTypes:'http://chuxiong.wengetech.com:28086/wz_al/wz/getWzQuestionTypes',//获取问题性质接口
                getWzQuestionCategory:'http://chuxiong.wengetech.com:28086/wz_al/wz/getWzQuestionCategory',//'获取问题分类接口
                getMyWzServiceWaitingList:'http://chuxiong.wengetech.com:28086/wz_al/wz/getMyWzServiceWaitingList',//我的待回复列表
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
                components: 'service',
            },{
                name: '微社区',
                noSelect: require("./images/noCommunity.png"),
                select: require("./images/community_03.png"),
                components: 'community'
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
                'xijinpingshijian': '5cceb2880cf2acaeba3f52e9', // 习近平时间/置顶
                'zhibo': '5cceb2880cf2acaeba3f52f0', // 直播 
                'kanTV':''
            },
            columnIdChild:[''],
            columnIdOrder: ['5cceb2880cf2acaeba3f52e9','5cceb2880cf2acaeba3f52ea', '5c0f935aa310968e54438806'], // 栏目排序
            columnIdHidden: ['5cceb2880cf2acaeba3f52ed'], // 隐藏栏目 置顶 大屏图片 大屏视频
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
            columnIdOrder: ['5cd2874b0cf2acaeba3f53c5', '5cd2874b0cf2acaeba3f53c7','5cd2874b0cf2acaeba3f53c9','5cd2874b0cf2acaeba3f53cb'], // 栏目排序
            columnIdHidden: ['5c22eb8da310abf163b4575c','5c22eb8da310abf163b4575e']
        },
        qinqiang: {
            columnIdOrder: ['5cc551840cf2c3d1b7e9d4c0', '5cc551840cf2c3d1b7e9d4c2','5cc551840cf2c3d1b7e9d4c4','5cc551840cf2c3d1b7e9d4c6'], // 栏目排序
            columnIdHidden: ['5c22eb8da310abf163b4575c','5c22eb8da310abf163b4575e']
        },
        me: { // 关于我们
            us: {
                text: "云上楚雄",
                content: "楚雄州融媒体平台立足于“新闻+政务+服务”的业务定位，从 “物理空间、体制机制、业务平台”三层面融合进行顶层设计，打造“一屏、五平台、N端” 的软件架构体系，形成“策、采、编、播、发、管、控、馈”立体化内容生产体系，实现“一次采集、多种生成、全媒传播”，把握新闻传播信息可视化、移动优先化、活动直播化的新趋势，通过内容、渠道、平台、管理、运营等方面的深度融合，建成形神兼备、软硬一体的融媒体平台建设解决方案。"
            }
        }
    };
    return obj;
}

window.$themeConfig = config()
// export { //很关键
//     config
//    }