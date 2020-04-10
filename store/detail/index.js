import { get_local_cache, set_local_cache, formatDate, getDateDiff} from '@/config/cache'
import { fetch } from '@/config/fetch'
import apis from '@/assets/js/api.js'
export default {
    namespaced: true,
    state: {
        listArticle: {},        // 点进去详情页的列表数据（用于改变列表的评论数）
        currentArticle: {},     // 当前文章数据（用于跨组件数据共用）
        historyArticle: [],     // 历史文章数据（用于浏览的历史记录功能）
        talkReply: '',          // 被@的那条数据（用于跨组件获取被@的数据）
        localtion: {},           // 储存页面滚动条位置
        readNum: ' - - ',
        shareNum: ' - - ',
        likeNum: ' - - ',
        toList:{}
    },
    getters: {
        listArticle: state => {
            return state.listArticle
        },
        currentArticle: state => {
            return state.currentArticle
        },
        historyArticle: state => {
            return state.historyArticle
        },
        talkReply: state => {
            return state.talkReply
        },
        localtion: state => {
            return state.localtion
        },
        readNum: state => {
            return state.readNum
        },
        shareNum: state => {
            return state.shareNum
        },
        likeNum: state => {
            return state.likeNum
        },
        getList: state => {
            return state.toList
        },
    },
    mutations: {
        set_listArticle(state, val) {
            console.log(state, val,"出来吧！")
            state.listArticle = val
        },
        set_currentArticle(state, val) {
            state.currentArticle = val
        },
        
        set_historyArticle(state, val) {
            state.historyArticle = val
            set_local_cache('history_Article', val)
        },
        set_talkReply(state, val) {
            state.talkReply = val
        },
        set_localtion(state, val) {
            state.localtion = val
        },
        set_readNum(state, val) {
            state.readNum = val
        },
        set_shareNum(state, val) {
            state.shareNum = val
        },
        set_likeNum(state, val) {
            state.likeNum = val
        },
        set_currentList(state, val) {
            state.toList = val
            //setCache(`${state.indexActive}_json`, val)
        },
    },
    actions: {

        // 获取文章缓存
        // get_historyArticle_cache({ commit }) {
        //     let historyData = JSON.parse(get_local_cache('history_Article'))
        //     if (historyData && historyData.length > 0) {
        //         commit('set_historyArticle', historyData)
        //     }
        // },`
        // 获取文章数据
        async get_Article_data({ commit, state, rootState }, { type, id, jsonUrl,userId}) {
            let res
            if (state.historyArticle && state.historyArticle.length > 0) {
                for (let i = 0; i < state.historyArticle.length; i++) {
                    if (state.historyArticle[i] && state.historyArticle[i].id === id) {
                        res = state.historyArticle[i]
                    }
                }
            }
            if (!res) {
                if(type){
                    // let params = {
                    //     'type': type,
                    //     'data': type==2?id:jsonUrl
                    // }
                    // await fetch('get', 'Artilce', params)
                    let params = {
                        'type': type,
                        'data': type==2?id:jsonUrl,
                        'userId':userId,  //新增了user和appinfo字段
                        'appInfoId':apis.theme.api.appInfoId
                    }
                    
                    await fetch('post', 'Artilce', params)
                    .then(json => {
                        // console.log(json,"json是什么")
                        let jsonData = json.data[0]
                        let subcolumn = jsonData.columnName;
                        let isSub;
                        if(subcolumn == '个人号'){
                            isSub = true;
                        }else{
                            isSub = false;
                        }
                        res = {
                            fav:jsonData.fav,
                            type: jsonData.type,
                            id: jsonData.id,
                            title: jsonData.title,
                            befrom: jsonData.source,
                            time: jsonData.pubDate,
                            titlepic: jsonData.video_url_pic!=''&&jsonData.video_url_pic!=null?jsonData.video_url_pic:jsonData.image!=''&&jsonData.image!=null?jsonData.image:false,
                            img_cut_url: jsonData.img_cut_url!=''&&jsonData.img_cut_url!=null?jsonData.img_cut_url:jsonData.video_url_pic,
                            playonlineurl: jsonData.stroyType=='VIDEO'?jsonData.video_url:false,
                            audioUrl: jsonData.stroyType=='AUDIO'?jsonData.video_url:false,
                            newstext: jsonData.content,
                            url: jsonData.url,
                            jsonUrl: jsonData.jsonUrl?jsonData.jsonUrl:'',
                            outUrl: jsonData.type==1?jsonData.url:apis.theme.api.news.getInfoDetailByID+'?path=/page/xhs_al/mobile_detail.html&auto_id='+jsonData.id,
                            columnName: jsonData.columnName,
                            imgurl:jsonData.image,
                            canComment:jsonData.canComment,
                            like:jsonData.like,
                            subName:isSub ? jsonData.subNum.subscribeName : '',
                            subImg:isSub ? jsonData.subNum.subscribeImage : ''
                        }
                        
                        // console.log(res,"resresresresresresresresresresresresresres")
                        let historyData = [res, ...state.historyArticle]
                        commit('set_historyArticle', historyData)
                        // commit('set_historyArticle', res)
                    })
                    
                }else {
                    let json=JSON.parse(get_local_cache('Details')).path
                    res = {
                        id: json.outUrl,
                        title: json.title,
                        befrom: json.befrom,
                        time: json.time,
                        titlepic: json.titlepic!=null?json.titlepic:false,
                        newstext: json.content,
                        url: json.link,
                        outUrl: json.outUrl,
                        imgurl:json.image,
                        canComment:json.canComment,
                    }
                 
                    let historyData = [res, ...state.historyArticle]
                    commit('set_historyArticle', historyData)
                }
            }
            if (res) {
                commit('set_currentArticle', res)
            }
            return res
        },



        // 浏览量，分享量，点赞量
        async addReadOrShareNum({ commit, state, rootState }, {type, uuid, columnName,userId} ) {
            let param = JSON.parse(get_local_cache('history_Article'))[0];
            // console.log( param.url )
            // let that = this;
            // this.axios({
            //     method:'get',
            //     url:'http://qtx.wengetech.com:28086/common_al/common/addReadOrShareNum?type='+type+'&url='+param.url+'&column=',
            // }).then( res => {
            //     that.res = res
            // })
            // let res = await fetch('get', 'addReadOrShareNum', {
            //     type: type,
            //     url: param.url,
            //     column: columnName,
            //     tel_code: uuid
            // })
            let res = await fetch('post', 'addReadOrShareNum', {
                'type': type,
                'data': param.url,
                'columnId': columnName,
                'userId':userId,
                'appInfoId':apis.theme.api.appInfoId
            })
            commit('set_readNum', res.data[0].read_num)
            commit('set_shareNum', res.data[0].share_num)
            commit('set_likeNum', res.data[0].like_num)
            return res.data[0]
        },
         
        // 添加评论信息
        async addNewsComment({ commit, state, rootState },inputVal ) {
            let param = JSON.parse(get_local_cache('history_Article'))[0];
            let userParam = JSON.parse(get_local_cache('userData'));
            let addParams = {
                pid:param.id,  //评论新闻id
                userId:userParam.user_id,                               //用户id
                appName:param.befrom,                       //appName
                type:'2',                                    //新闻评论类型
                newsType:param.type,       
                content:inputVal,                //稿件来源
                portraitUrl:userParam.imgurl,//头像,
                username:userParam.person_name,
                topContentId:param.id,
                topContentType:'2',
                appInfoId: apis.theme.api.appInfoId,
            }
            console.log( addParams )
            let res = await fetch('post', 'addNewsComment', addParams,{'Content-Type':'application/json; charset=utf-8'})
            return res
        },
        // 获取评论列表
        // async getActivitylist({ commit, state, rootState } ) {
        //     let param = JSON.parse(get_local_cache('history_Article'))[0];
        //     console.log( param )
        //     let userParam = JSON.parse(get_local_cache('userData'));
        //     let addParams = {
        //         pid:param.id,  
        //         userId:userParam.user_id,                              
        //         appName:param.befrom,                      
        //         type:'2',                                   
        //         newsType:param.type+'',                           
        //         pageNo:1,                                  
        //         pageSize:10                                 
        //     }
        //     console.log( addParams )
        //     let res = await fetch('post', 'activitygetActivities', addParams,{'Content-Type':'application/json; charset=utf-8'})
        //     return res
        // },
        async removeLikeStore({ commit, state, rootState }, uuid ) {
            let param = JSON.parse(get_local_cache('history_Article'))[0];
            let res = await fetch('get', 'removeLike', { url: param.url, column:'',tel_code: uuid })
            // console.log(res)
            commit('set_likeNum', state.likeNum-1)
            return res
        },
        async isLikeStore({ commit, state, rootState }, uuid ) {
            let param = JSON.parse(get_local_cache('history_Article'))[0];
            let res = await fetch('get', 'isLike', { url: param.url, column:'',tel_code: uuid })
            // console.log(res)
            return res
        },

        // 获取评论数据： 用户/全部
        async get_Comment_data({ commit, state, rootState }, { page, type }) {
            let params = {
                'userid': rootState.userid,
                'id': state.currentArticle.id,
                'datafrom': state.currentArticle.datafrom,
                'comment': 'remark',
                'type': type,
                'page': page
            }
            let res = fetch('post', 'getComment', params)
            return res
        },

        // 获取回复数据： 用户/全部
        async get_Reply_data({ state, rootState }, { page, type, remarkid }) {
            let params = {
                'userid': rootState.userid,
                'id': state.currentArticle.id,
                'datafrom': state.currentArticle.datafrom,
                'comment': 'reply',
                'type': type,
                'remarkid': remarkid,
                'page': page
            }
            let res = fetch('post', 'getComment', params)
            return res
        },

        // 提交用户离开页面时需要收集的数据
        post_user_data({ state, rootState }, entertime) {
            let params = {
                'wdata': 'userread',
                'userid': rootState.userid,
                'id': state.currentArticle.id,
                'datafrom': state.currentArticle.datafrom,
                'entertime': entertime,
                'leavetime': new Date().getTime()
            }
            let res = fetch('post', 'userData', params)
            return res
        },

        // 提交喜好数据 喜欢/收藏
        post_favorite_data({ state, rootState }, type) {
            let params = {
                'wdata': type,
                'userid': rootState.userid,
                'id': state.currentArticle.id,
                'datafrom': state.currentArticle.datafrom
            }
            let res = fetch('post', 'userData', params)
            return res
        },

        // 提交评论数据
        post_Comment_data({ state, rootState }, content) {
            let params = {
                'userid': rootState.userid,
                'id': state.currentArticle.id,
                'datafrom': state.currentArticle.datafrom,
                'comment': 'remark',
                'type': 'user',
                'content': content
            }
            let res = fetch('post', 'postComment', params)
            return res
        },

        // 提交回复数据
        post_Reply_data({ state, rootState }, { remarkid, content, altUserId }) {
            let params = {
                'userid': rootState.userid,
                'id': state.currentArticle.id,
                'datafrom': state.currentArticle.datafrom,
                'comment': 'reply',
                'type': 'user',
                'remarkid': remarkid,
                'content': content
            }
            if (altUserId) {
                params.replyid = altUserId
            }
            let res = fetch('post', 'postComment', params)
            return res
        },

        // 提交点赞数据
        post_zan_data({ state, rootState }, { comment, remarkid, replyid }) {
            let params = {
                'userid': rootState.userid,
                'id': state.currentArticle.id,
                'datafrom': state.currentArticle.datafrom,
                'comment': 'dz'
            }
            if (comment === 'remark') {
                params.type = 'remark'
                params.remarkid = remarkid
            } else if (comment === 'reply') {
                params.type = 'reply'
                params.remarkid = remarkid
                params.replyid = replyid
            }
            let res = fetch('post', 'postComment', params)
            return res
        },

        // 提交删除评论数据
        post_delete_data({ state, rootState }, { type, remarkid, replyid }) {
            let params = {
                'userid': rootState.userid,
                'id': state.currentArticle.id,
                'datafrom': state.currentArticle.datafrom,
                'comment': 'del',
                'type': type
            }
            if (type === 'remark') {
                params.remarkid = remarkid
            } else if (type === 'reply') {
                params.remarkid = remarkid
                params.replyid = replyid
            }
            let res = fetch('post', 'postComment', params)
            return res
        }
    }
}
