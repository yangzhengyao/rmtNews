import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import apis from '../assets/js/api'
Vue.prototype.$http = axios
// 应用数据和后台富文本数据的地址不同
let baseUrl = 'http://app.toutiaojk.com/e/extend/list/'
let publishURL = 'http://api.toutiaojk.com/e/extend/jkh/'

const ajaxURL = {
    // 新闻
    classID: apis.theme.api.news.column,  // 栏目
    Class: apis.theme.api.news.infoListByColumnId,  // 栏目列表
    Class1: apis.theme.api.news.getPageListByServeralID,  // 新华社
    Class2: apis.theme.api.news.wenhaiListJson,  // 闻海
    Class3: apis.theme.api.news.wenhaiAppHeadLine,  // 微信矩阵
    Class4: apis.theme.api.news.wenhaiDisplayConfigs,  // 闻海 专题
    Class5: apis.theme.api.news.getNewsChannelData,  // 推荐栏目列表
    Stick: apis.theme.api.news.infoListByColumnId,  // 栏目置顶
    Wenhai: 'http://111.20.145.19:9003/news/getNewsColumnData',  // 闻海经济,适合,时政列表
    // 详情页
    Artilce: apis.theme.api.news.getNewsDetailData,  // 文章
    addReadOrShareNum: apis.theme.api.news.addReadOrShareNum,  // 浏览、评论、点赞量
    removeLike: apis.theme.api.news.removeLike,
    isLike: apis.theme.api.news.isLike,
    addComment:apis.theme.api.news.addComment,
    addNewsComment:apis.theme.api.news.addNewsComment,
    activitygetActivities:apis.theme.api.news.activitygetActivities,
    //积分
    integral_loginUpdate: apis.theme.api.me.integral_loginUpdate, //积分登录接口（测试用）
    integral_updateUserRecordTime: apis.theme.api.me.integral_updateUserRecordTime, //积分任务进度更新接口（测试用）
    integral_searchUserExpItem: apis.theme.api.me.integral_searchUserExpItem, //每日积分明细接口（测试用）
    integral_searchUserTotalExpDaily: apis.theme.api.me.integral_searchUserTotalExpDaily, //每日累计积分接口（测试用）


    Recommend: baseUrl + 'apptuijian.php',              // 文章推荐
    getComment: baseUrl + 'appGetComment.php',          // 获取评论
    postComment: baseUrl + 'appPostComment.php',        // 提交评论
    userData: baseUrl + 'appuserdata.php',              // 提交数据：用户浏览时间、喜欢、收藏
    // 搜索页
    Search: baseUrl + 'search.php',                     // 搜索
    // 视频页
    videoList: baseUrl + 'appvideo.php',                // 视频列表
    // 收藏页
    collectList: baseUrl + 'appreaduserdata.php',       // 收藏列表
    // 用户页
    appreaduserdata: baseUrl + 'appreaduserdata.php',   // 用户页数据：评论、收藏数量
    historyComment: baseUrl + 'historyComment.php',     // 用户的历史评论
    // 后台页
    list: publishURL + 'List.php',                      // 后台列表请求
    edit: publishURL + 'Edit.php',                      // 后台编辑内容
    uploadFile: publishURL + 'upload_file.php',         // 后台图片上传
    // 其他
    addata: baseUrl + 'ad.php',                         // 广告
    power: publishURL + 'Logincc.php'                   // 用户权限验证
}

export var fetch = async(type = 'POST', url = '', data = {}, headers = {}) => {
    let result
    type = type.toUpperCase() 

    // if (url == 'Class' || url == 'Stick') {
        // url = ajaxURL[url] + headers.id + '/stories'
    // } else if (url == 'Artilce') {
        // url = data.jsonUrl
        // url = '/sell'+data.jsonUrl.slice(29)
    // }else {
        url = ajaxURL[url]
    // }
    if (type === 'GET') {
        await axios.get(url, { params: data, headers: headers })
        .then(res => {
            result = res.data
        })
    } else if (type === 'POST') {
        await axios.post(url, data)
        .then(res => {
            result = res.data
        })
    }
    return result
}
