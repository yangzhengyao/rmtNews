import { getCache, setCache, get_local_cache, set_local_cache } from '@/config/cache'
import { fetch } from '@/config/fetch'
import apis from '@/assets/js/api.js'
import { stat } from 'fs'
export default {
    namespaced: true,
    state: {
        // indexActive: 'news_recommend',          // active的栏目
        // indexPage: { news_recommend: 1 },       // 记录各个栏目page的对象
        // indexLocation: { news_recommend: 0 },   // 各个栏目location的对象
        // 栏目数据
        // indexColumn: [{
        //     classname: '推荐',
        //     classid: 0,
        //     classpath: 'news_recommend'
        // }],
        appMain:0,
        isShowActivity:false,
        indexActive: apis.theme.news.columnIdOrder[0],          // active的栏目
        indexActiveZang: "",          // 藏文active的栏目
        // indexPage: { '5c0f934ba310968e54438805': 1 },       // 记录各个栏目page的对象
        indexPage: {},       // 记录各个栏目page的对象
        // indexLocation: { '5c0f934ba310968e54438805': 0 },   // 各个栏目location的对象
        indexLocation: {},   // 各个栏目location的对象
        indexColumn: [],
        indexColumnZang: [],
        currentContent: '',     // 当前栏目的数据，为了缓存各个栏目的数据，刷新时不用再次请求
        indexSwiper: false,      // 是否在滑动
        indexnewmy:0,
        indexnewBr:0,
        isNaidong:localStorage.getItem('isNaidong') === 'true' ? true : false,
    },
    getters: {
        appMain: state => {
            return state.appMain
        },
        isShowActivity: state => {
            return state.isShowActivity
        },
        indexActive: state => {
            return state.indexActive
        },
        indexActiveZang: state => {
            return state.indexActiveZang
        },
        indexColumn: state => {
            return state.indexColumn
        },
        indexColumnZang: state => {
            return state.indexColumnZang
        },
        indexPage: state => {
            return state.indexPage
        },
        indexLocation: state => {
            return state.indexLocation
        },
        indexSwiper: state => {
            return state.indexSwiper
        },
        indexnewmy: state => {
            return state.indexnewmy
        },
        indexnewBr: state => {
            return state.indexnewBr
        },
        // 以下都是为了方便取到当前active的数据
        activeIndex: state => {
            // return state.indexColumn.findIndex(obj => obj.classpath === state.indexActive)
            let temp;
            state.indexColumn.forEach(function (obj,i) {
                if(obj.classpath === state.indexActive){
                    temp=i
                }
            })
            return temp
        },
        activeIndexZang: state => {
            // return state.indexColumn.findIndex(obj => obj.classpath === state.indexActive)
            let temp;
            state.indexColumnZang.forEach(function (obj,i) {
                if(obj.classpath === state.indexActiveZang){
                    temp=i
                }
            })
            return temp
        },
        activeClassid: (state, getters) => {
            return state.indexColumn[getters.activeIndex].classid
        },
        // activeClassidZang: (state, getters) => {
        //     return state.indexColumnZang[getters.activeIndexZang].classid
        // },
        activePage: state => {
            return state.indexPage[state.indexActive]
        },
        activeLocation: state => {
            return state.indexLocation[state.indexActive]
        },
        isNaidong:state =>{
            return state.isNaidong
        }
    },
    mutations: {
        set_appMain(state, val){
            state.appMain = val;
        },
        set_ShowActivity(state, val){
            state.isShowActivity = val;
        },
        set_indexActive(state, val) {
            state.indexActive = val
            set_local_cache('index_Active', val)
        },
        set_indexActive_zang(state, val) {
            state.indexActiveZang = val
            set_local_cache('index_Active_zang', val)
        },
        set_indexActivenewmy(state, val) {
            state.indexnewmy = val
        },
        set_indexActivenewBr(state, val) {
            state.indexnewBr = val
        },
        set_indexPage(state, obj) {
            state.indexPage = obj
            setCache('index_Page', obj)
        },
        set_indexLocation(state, obj) {
            state.indexLocation = obj
        },
        set_indexColumn(state, arr) {
            state.indexColumn = arr
            set_local_cache('index_Column', arr)
        },
        set_indexColumn_zang(state, arr) {
            state.indexColumnZang = arr
            set_local_cache('index_Column_zang', arr)
        },
        set_currentContent(state, val) {
            state.currentContent = val
            setCache(`${state.indexActive}_json`, val)
        },
        set_indexSwiper(state, val) {
            state.indexSwiper = val
        },
        set_isNaidong(state, val) {
            state.isNaidong = val
            set_local_cache('isNaidong', val)
        },
    },
    actions: {
        // 获取page缓存
        get_indexPage_cache({ commit }, indexColumn) {
            const data = JSON.parse(getCache('index_Page'))
            if (data) {
                commit('set_indexPage', data)
            } else {
                if (indexColumn) {
                    let pageObj = {}
                    for (let i = 0; i < indexColumn.length; i++) {
                        pageObj[indexColumn[i].classpath] = 1
                    }
                    commit('set_indexPage', pageObj)
                }
            }
        },

        // 获取location缓存
        get_indexLocation_cache({ commit }, indexColumn) {
            if (indexColumn) {
                let locationObj = {}
                for (let i = 0; i < indexColumn.length; i++) {
                    locationObj[indexColumn[i].classpath] = 0
                }
                commit('set_indexLocation', locationObj)
            }
        },

        // 获取列表数据缓存
        // get_listItem_cache({ commit, state }) {
        //     let data = JSON.parse(getCache(`${state.indexActive}_json`))
        //     return data
        // },

        // 获取栏目数据
        async get_indexColumn_data({ commit, state, dispatch }) {
            
            // if(get_local_cache('index_Column')){
            //     var datas = JSON.parse(get_local_cache('index_Column'));
            //     dispatch('get_indexPage_cache', datas)
            //     dispatch('get_indexLocation_cache', datas)
            //     commit('set_indexColumn', datas)
            //     return datas;
            // }else{
                let res,resZang;
                let params = {'Content-Type':'application/json; charset=utf-8'}	
                
                //app_name 红旗融媒体 魅力朝阳县 云上海沧
                // let data = await fetch('get', 'classID', {type: 'column'}, params)
                let data = await fetch('POST', 'classID', {appInfoId: apis.theme.api.appInfoId}, params)
                let result = data.data;
                let listZang = [];
                let listZhong = [];
                for(let key in result){
                    if(result[key].comment == "藏文"){
                        listZang.push(result[key])

                    } else {
                        listZhong.push(result[key])
                    }
                }
                // if(this.state.isNaidong){
                //     commit('set_indexActive_zang', apis.theme.news.columnIdOrder[0]);
                // }else{
                    // commit('set_indexActive_zang', listZang[0].uuid);
                // }
                
                // 排序缓存逻辑
                let oldColumn = get_local_cache('old_index_Column');
                let oldAppId = get_local_cache('old_app_id');
                let oldHidden = get_local_cache('old_column_hidden');
                let oldOrder= get_local_cache('old_column_order');
                let columnIdHidden = JSON.stringify(apis.theme.news.columnIdHidden);
                let columnIdOrder = JSON.stringify(apis.theme.news.columnIdOrder);
                let col = get_local_cache('index_Column');
                // 如果用户修改了栏目顺序或增减，下次打开app会拿到修改过的栏目，而不是再读一遍所有栏目
                if(oldColumn && col && col!='null'&& col!='{}' && oldColumn != result && oldAppId == apis.theme.api.appInfoId
                    && oldHidden == columnIdHidden && oldOrder == columnIdOrder){
                    var datas = JSON.parse(get_local_cache('index_Column'));
                    dispatch('get_indexPage_cache', datas)
                    dispatch('get_indexLocation_cache', datas)
                    commit('set_indexColumn', datas)
                    return datas;
                }else{
                    set_local_cache('old_index_Column', result);
                    set_local_cache('old_app_id', apis.theme.api.appInfoId);
                    set_local_cache('old_column_hidden', JSON.stringify(apis.theme.news.columnIdHidden));
                    set_local_cache('old_column_order', JSON.stringify(apis.theme.news.columnIdOrder));
                    let tempColumn,tempColumnZang,localArr=[],removeArr=[],arr1=[],arr2=[],removeTemp=[]
                    let localColumn = JSON.parse(get_local_cache('index_Column'))
                    let removeColumn = JSON.parse(get_local_cache('removeChannel'))
                    if(localColumn!=null){
                        localColumn.forEach(function (item,i) {
                            localArr.push(item.classid);
                        });
                        if(removeColumn!=null) {
                            removeColumn.forEach(function (item,i) {
                                removeArr.push(item.classid);
                            });
                        }
                        tempColumn=listZhong
                        tempColumnZang=listZang
                        if(!localStorage.getItem('removeChannel')){
                            set_local_cache('removeChannel', removeTemp)
                        }
                        
                    }else {
                        tempColumn=listZhong
                        tempColumnZang=listZang
                    }

                    let json = []
                    let jsonZang = []
                    let json1 = []
                    let json1Zang = []
                    let jsonT = []
                    let jsonTZang = []
                    tempColumn.forEach(function (item, i) {
                        if (item.uuid == apis.theme.news.columnIdOrder[0]) {
                            jsonT.unshift({
                                'classid': item.uuid,
                                'classname': item.name,
                                'classpath': item.uuid,
                                'showclass': '0'
                            })
                        } else if (item.uuid == apis.theme.news.columnIdOrder[1]) {
                            jsonT.push({
                                'classid': item.uuid,
                                'classname': item.name,
                                'classpath': item.uuid,
                                'showclass': '0'
                            })
                        } else if (item.uuid == apis.theme.news.columnIdOrder[2]) {
                            json1.unshift({
                                'classid': item.uuid,
                                'classname': item.name,
                                'classpath': item.uuid,
                                'showclass': '0'
                            })
                        } else if (item.uuid == apis.theme.news.columnIdOrder[3]) {
                            json1.push({
                                'classid': item.uuid,
                                'classname': item.name,
                                'classpath': item.uuid,
                                'showclass': '0'
                            })
                        } else if (item.uuid == apis.theme.news.columnIdOrder[4]) {
                            json.unshift({
                                'classid': item.uuid,
                                'classname': item.name,
                                'classpath': item.uuid,
                                'showclass': '0'
                            })
                        } else if ( apis.theme.news.columnIdHidden.indexOf(item.uuid) < 0 ) { // 隐藏 直播 置顶
                            json.push({
                                'classid': item.uuid,
                                'classname': item.name,
                                'classpath': item.uuid,
                                'showclass': '0'
                            })
                        }
                    })
                    tempColumnZang.forEach(function (item, i) {
                        if (item.uuid == apis.theme.news.columnIdOrder[0]) {
                            jsonTZang.unshift({
                                'classid': item.uuid,
                                'classname': item.name,
                                'classpath': item.uuid,
                                'showclass': '0'
                            })
                        } else if (item.uuid == apis.theme.news.columnIdOrder[1]) {
                            jsonTZang.push({
                                'classid': item.uuid,
                                'classname': item.name,
                                'classpath': item.uuid,
                                'showclass': '0'
                            })
                        } else if (item.uuid == apis.theme.news.columnIdOrder[2]) {
                            json1Zang.unshift({
                                'classid': item.uuid,
                                'classname': item.name,
                                'classpath': item.uuid,
                                'showclass': '0'
                            })
                        } else if (item.uuid == apis.theme.news.columnIdOrder[3]) {
                            json1Zang.push({
                                'classid': item.uuid,
                                'classname': item.name,
                                'classpath': item.uuid,
                                'showclass': '0'
                            })
                        } else if (item.uuid == apis.theme.news.columnIdOrder[4]) {
                            jsonZang.unshift({
                                'classid': item.uuid,
                                'classname': item.name,
                                'classpath': item.uuid,
                                'showclass': '0'
                            })
                        } else if ( apis.theme.news.columnIdHidden.indexOf(item.uuid) < 0 ) { // 隐藏 直播 置顶
                            jsonZang.push({
                                'classid': item.uuid,
                                'classname': item.name,
                                'classpath': item.uuid,
                                'showclass': '0'
                            })
                        }
                    })
                    json = jsonT.concat(json1, json)
                    jsonZang = jsonTZang.concat(json1Zang, jsonZang)
                    res = [...state.indexColumn, ...json]
                    resZang = [...state.indexColumnZang, ...jsonZang]
                    // }
                    dispatch('get_indexPage_cache', res)
                    dispatch('get_indexLocation_cache', res)
                    commit('set_indexColumn', res)
                    commit('set_indexColumn_zang', resZang)
                    
                    return res
                }
                // }
                
            
        },

        // 获取文章列表数据
        async get_listItem_data({ rootState, getters }, {page, uuid,userId}) {
            // console.log('=============++++++++++++++',userId);
            let params = {
                'pageNum': page,
                'pageSize': 10,
                'columnId':uuid?uuid:getters.activeClassid!=''?getters.activeClassid:apis.theme.news.columnIdOrder[0],
                'userId':userId,  //新增了user和appinfo字段
                'appInfoId':apis.theme.api.appInfoId
            }
            let res
            //判断是否是拍客栏目
            // if(params.columnId=='5d68ce51e4b0e2963a408841'){
            //     res='jiangxunliang'
            // }else{
                res = await fetch('post', 'Class', params, {
                    'app_key': 'sprint-ucm',
                    'app_secret': 'bbbbbbaaaaaaaaaaaaa'
                })
                res=res.data[0]
            // }
            // console.log("11111",res);
            return res
        },
        // 获取推荐所有栏目列表数据
        async get_tuijian_listItem_data({ rootState, getters }, {page, uuid}) {
            var excid='';
            var columnId='';
            var includedColumnIds='';
            if(apis.getTheme() =='tiemenguan'){
                excid='5d44323be4b0bd37b7bb6af2,5d25cedee4b09067cf752464,5d44323be4b0bd37b7bb6af2,5d443271e4b0bd37b7bb6af4,5d4432a3e4b0bd37b7bb6af8,5d4432cfe4b0bd37b7bb6afa,5d479651e4b0bd37b7bb6b49';
            }else{
                excid='';
                columnId='';
            };
            if(apis.getTheme() =='youyu'){
                columnId='5d0ca2b5e4b0af4a6f4008a4';
                includedColumnIds='5cc2e7ea0cf2c3d1b7e9d4a7,5cc2e81f0cf2c3d1b7e9d4a8, 5cc2e8360cf2c3d1b7e9d4a9,5cdbb4f30cf2acaeba3f557c,5cc2e8470cf2c3d1b7e9d4aa,5ce366ec0cf23213ac8df37a,5ce369720cf23213ac8df380,5ce369ed0cf23213ac8df383,5ce36c8b0cf23213ac8df386,5ce4c63f0cf23213ac8df424, 5cc2e8740cf2c3d1b7e9d4ac,5cc7b0d70cf2acaeba3f52a8, 5cc7ace50cf2acaeba3f5294, 5cdbb4c50cf2acaeba3f557a,5d085bf4e4b03673f896c683,5d085fade4b03673f896c686,5d085fade4b03673f896c688,5d085fe3e4b03673f896c68a,5cc7acfa0cf2acaeba3f5296,5cc7ad0e0cf2acaeba3f5298,5cc7ad880cf2acaeba3f52a0,5cc7ad990cf2acaeba3f52a2,5cc7ada80cf2acaeba3f52a4,5cc7afac0cf2acaeba3f52a6'
            }else{
                columnId='';
                includedColumnIds='';
            }
            let params = {
                'appInfoId':apis.theme.api.appInfoId,
                'pageNum': page,
                'pageSize': 10,
                'keyWord':'',
                'includedColumnIds':includedColumnIds,
                // 'columnId':columnId,
                'excludedColumnIds':excid
            }
            let res = await fetch('post', 'Class5', params, {
                'app_key': 'sprint-ucm',
                'app_secret': 'bbbbbbaaaaaaaaaaaaa'
            })
            return res.data[0]
        },
        // 获取三级列表数据
        async get_child_listItem_data({ rootState, getters }, page) {
            // let params = {
            //     'page': page,
            //     'size': 10,
            //     'columnId': getters.activeClassid!=''?getters.activeClassid:apis.theme.news.columnIdChild[0]
            // }
            // let res = await fetch('post', 'Class', params, {
            //     'app_key': 'sprint-ucm',
            //     'app_secret': 'bbbbbbaaaaaaaaaaaaa'
            // })
            let params = {
                'pageNum': page,
                'pageSize': 10,
                'columnId':getters.activeClassid!=''?getters.activeClassid:apis.theme.news.columnIdChild[0],
                'userId':userId,  //新增了user和appinfo字段
                'appInfoId':apis.theme.api.appInfoId
            }

            let res = await fetch('post', 'Class', params, {
                'app_key': 'sprint-ucm',
                'app_secret': 'bbbbbbaaaaaaaaaaaaa'
            })
            console.log("获取三级列表数据")
            return res.data[0]
        },
        // 直播
        async lives_listItem_data({ rootState, getters },{page,userId}) {

            let params = {
                // 'page': page,
                // 'size': 10,
                // 'columnId':apis.theme.news.columnId.zhibo
                'pageNum': page,
                'pageSize': 10,
                'columnId':apis.theme.news.columnId.zhibo,
                'userId':userId,  //新增了user和appinfo字段
                'appInfoId':apis.theme.api.appInfoId
            }
            let res = await fetch('post', 'Class', params, {
                'app_key': 'sprint-ucm',
                'app_secret': 'bbbbbbaaaaaaaaaaaaa'
            })
            return res
        },
        // 直播
        async wmsj_listItem_data({ rootState, getters },{page,userId}) {

            let params = {
                // 'page': page,
                // 'size': 10,
                // 'columnId':apis.theme.news.columnId.zhibo
                'pageNum': page,
                'pageSize': 10,
                'columnId':'5dad3de7e4b0e4f27ae7c6a8',
                'userId':userId,  //新增了user和appinfo字段
                'appInfoId':apis.theme.api.appInfoId
            }
            let res = await fetch('post', 'Class', params, {
                'app_key': 'sprint-ucm',
                'app_secret': 'bbbbbbaaaaaaaaaaaaa'
            })
            return res
        },
        // 二级页面（采编数据）
        async more_listItem_data({ rootState, getters }, {page,userId,uuid}) {
            let params = {
                'pageNum': page,
                'pageSize': 10,
                'columnId':uuid?uuid:getters.activeClassid!=''?getters.activeClassid:apis.theme.news.columnIdOrder[0],
                'userId':userId,  //新增了user和appinfo字段
                'appInfoId':apis.theme.api.appInfoId
            }
            let res = await fetch('post', 'Class', params, {
                'app_key': 'sprint-ucm',
                'app_secret': 'bbbbbbaaaaaaaaaaaaa'
            })
            return res
        },

        // 微信矩阵
        async wechat_listItem_data({ rootState, getters }, {page, name,type}) {
            let res = await fetch('get', 'Class3', {'pageNo': page+1, author: name,type:type})
            return res
        },
        // 闻海接口
        async wenhai_listItem_data({ rootState, getters }, {page,columnId}) {
            // {
            //     "appInfoId":1,
            //     "columnId":"5c7e3f4e0cf28d7f9fb8f005",
            //     "userId":3560,
            //     "pageNum":1,
            //     "pageSize":10
            // }
            let res = await fetch('post', 'Wenhai', {appInfoId:'1',columnId:columnId,pageNum:page,pageSize:10})
            return res
        },
        // 两会
         async lianghui_indexColumn_data({ commit, state, dispatch }) {
            let params = {
                app_key: 'sprint-ucm',
                app_secret: 'bbbbbbaaaaaaaaaaaaa',
            }
            let res = await fetch('post', 'classID', {appInfoId: apis.theme.api.appInfoId,parentId: apis.theme.news.columnId.lianghui}, params)
                
            
            return res.data
        },
        // 创城
        async chuangcheng_indexColumn_data({ commit, state, dispatch }) {
            let params = {
                app_key: 'sprint-ucm',
                app_secret: 'bbbbbbaaaaaaaaaaaaa',
            }
            let res = await fetch('post', 'classID', {appInfoId: apis.theme.api.appInfoId,parentId: apis.theme.news.columnId.chuangcheng}, params)
            return res
        },
        // 文明实践
        async wenming_indexColumn_data({ commit, state, dispatch }) {
            let params = {
                app_key: 'sprint-ucm',
                app_secret: 'bbbbbbaaaaaaaaaaaaa',
            }
            let res = await fetch('post', 'classID', {appInfoId: apis.theme.api.appInfoId,parentId: '5d5b7bc7e4b07bac64e0d148'}, params)
            return res
        },
        // 两会列表
        async lianghui_listItem_data({ rootState, getters }, {page, uuid}) {
            // let params = {
            //     'page': page,
            //     'size': 10,
            //     'columnId': uuid
            // }
            let params = {
                'pageNum': page,
                'pageSize': 10,
                'columnId':uuid?uuid:getters.activeClassid!=''?getters.activeClassid:apis.theme.news.columnIdOrder[0],
                'userId':userId,  //新增了user和appinfo字段
                'appInfoId':apis.theme.api.appInfoId
            }
            let res = await fetch('post', 'Class', params, {
                'app_key': 'sprint-ucm',
                'app_secret': 'bbbbbbaaaaaaaaaaaaa'
            })
            return res
        },
        // 海沧二级
        async liangan_child_listItem_data({ rootState, getters }) {
            let params = {
                app_key: 'sprint-ucm',
                app_secret: 'bbbbbbaaaaaaaaaaaaa',
            }
            let res = await fetch('post', 'classID', {appInfoId: apis.theme.api.appInfoId,parentId: '5cc550cc0cf2c3d1b7e9d4be'}, params)
            return res
            
        },
          // 东坡专栏
        async zhuanlan_child_listItem_data({ rootState, getters }) {
            let params = {
                app_key: 'sprint-ucm',
                app_secret: 'bbbbbbaaaaaaaaaaaaa',
            }
            let res = await fetch('post', 'classID', {appInfoId: apis.theme.api.appInfoId,parentId: '5ce9f0190cf23213ac8df4ec'}, params)
            return res
        },
        // 东坡农民工风采
         async afarmer_child_listItem_data({ rootState, getters }) {
            let params = {
                app_key: 'sprint-ucm',
                app_secret: 'bbbbbbaaaaaaaaaaaaa',
            }
            let res = await fetch('post', 'classID', {appInfoId: apis.theme.api.appInfoId,parentId: '5d6e348be4b0e2963a408a8d'}, params)
            return res
        },
        // 铁门关子级tab
        async tmg_child_listItem_data({ rootState, getters }) {
            let params = {
                app_key: 'sprint-ucm',
                app_secret: 'bbbbbbaaaaaaaaaaaaa',
            }
            
            let res = await fetch('post', 'classID', {appInfoId: apis.theme.api.appInfoId,parentId: '5cbebdef0cf2c3d1b7e9d3b0'}, params)
            return res
        },
        // 铁门关专题专栏子级tab
        async zhuanti_child_listItem_data({ rootState, getters }) {
            let params = {
                app_key: 'sprint-ucm',
                app_secret: 'bbbbbbaaaaaaaaaaaaa',
            }
            let res = await fetch('post', 'classID', {appInfoId: apis.theme.api.appInfoId,parentId:'5d021ac6e4b0ed2aef82fd92'}, params)
            return res
        },
        // 铁门关法制新闻子级tab
        async fazhi_child_listItem_data({ rootState, getters }) {
            
            let params = {
                app_key: 'sprint-ucm',
                app_secret: 'bbbbbbaaaaaaaaaaaaa',
            }
            // ,parentId:'5d03424fe4b0ed2aef82fdcb'
            let res = await fetch('post', 'classID', {appInfoId: apis.theme.api.appInfoId,parentId:'5d03424fe4b0ed2aef82fdcb',}, params)
            return res
        },
        // 濮阳龙乡新闻专题专栏子级tab
        async longxiang_child_listItem_data({ rootState, getters }) {
            let params = {
                app_key: 'sprint-ucm',
                app_secret: 'bbbbbbaaaaaaaaaaaaa',
            }
            let res = await fetch('post', 'classID', {appInfoId: apis.theme.api.appInfoId,parentId: '5d68ce3ce4b0e2963a40883f'}, params)
            return res
        },
        // 濮阳龙乡省市新闻子级tab
        async shenshi_child_listItem_data({ rootState, getters }) {
            let params = {
                app_key: 'sprint-ucm',
                app_secret: 'bbbbbbaaaaaaaaaaaaa',
            }
            let res = await fetch('post', 'classID', {appInfoId: apis.theme.api.appInfoId,parentId: '5d68ce2ce4b0e2963a40883d'}, params)
            return res
        },
        // 白沙文明实践新闻子级tab
        async shijian_child_listItem_data({ rootState, getters }) {
            let params = {
                app_key: 'sprint-ucm',
                app_secret: 'bbbbbbaaaaaaaaaaaaa',
            }
            let res = await fetch('post', 'classID', {appInfoId: apis.theme.api.appInfoId,parentId: '5d8c79b3e4b09940a1515bb5'}, params)
            return res
        },
        // 白沙脱贫攻坚新闻子级tab
        async tuopin_child_listItem_data({ rootState, getters }) {
            let params = {
                app_key: 'sprint-ucm',
                app_secret: 'bbbbbbaaaaaaaaaaaaa',
            }
            let res = await fetch('post', 'classID', {appInfoId: apis.theme.api.appInfoId,parentId: '5d8c79cae4b09940a1515bb9'}, params)
            return res
        },
        // 白沙政法先锋新闻子级tab
        async zhengfa_child_listItem_data({ rootState, getters }) {
            let params = {
                app_key: 'sprint-ucm',
                app_secret: 'bbbbbbaaaaaaaaaaaaa',
            }
            let res = await fetch('post', 'classID', {appInfoId: apis.theme.api.appInfoId,parentId: '5d8c79d4e4b09940a1515bbc'}, params)
            return res
        },
        // 白沙特色文旅新闻子级tab
        async wenlv_child_listItem_data({ rootState, getters }) {
            let params = {
                app_key: 'sprint-ucm',
                app_secret: 'bbbbbbaaaaaaaaaaaaa',
            }
            let res = await fetch('post', 'classID', {appInfoId: apis.theme.api.appInfoId,parentId: '5d8c79e8e4b09940a1515bc0'}, params)
            return res
        },
        // 万宁文明实践新闻子级tab
        async wmsj_child_listItem_data({ rootState, getters }) {
            let params = {
                app_key: 'sprint-ucm',
                app_secret: 'bbbbbbaaaaaaaaaaaaa',
            }
            let res = await fetch('post', 'classID', {appInfoId: apis.theme.api.appInfoId,parentId: '5d8c1c6ae4b09940a1515af1'}, params)
            return res
        },
        // 万宁脱贫攻坚新闻子级tab
        async tpgj_child_listItem_data({ rootState, getters }) {
            let params = {
                app_key: 'sprint-ucm',
                app_secret: 'bbbbbbaaaaaaaaaaaaa',
            }
            let res = await fetch('post', 'classID', {appInfoId: apis.theme.api.appInfoId,parentId: '5d908b33e4b0ab24122c053d'}, params)
            return res
        },
        // 万宁万宁双创新闻子级tab
        async wnsc_child_listItem_data({ rootState, getters }) {
            let params = {
                app_key: 'sprint-ucm',
                app_secret: 'bbbbbbaaaaaaaaaaaaa',
            }
            let res = await fetch('post', 'classID', {appInfoId: apis.theme.api.appInfoId,parentId: '5d908b3fe4b0ab24122c0541'}, params)
            return res
        },
        // 万宁特色文旅新闻子级tab
        async tswl_child_listItem_data({ rootState, getters }) {
            let params = {
                app_key: 'sprint-ucm',
                app_secret: 'bbbbbbaaaaaaaaaaaaa',
            }
            let res = await fetch('post', 'classID', {appInfoId: apis.theme.api.appInfoId,parentId: '5d908b46e4b0ab24122c0543'}, params)
            return res
        },
        // 临高文明实践新闻子级tab
        async lgwmsj_child_listItem_data({ rootState, getters }) {
            let params = {
                app_key: 'sprint-ucm',
                app_secret: 'bbbbbbaaaaaaaaaaaaa',
            }
            let res = await fetch('post', 'classID', {appInfoId: apis.theme.api.appInfoId,parentId: '5da5acece4b0f0e6b01f39cd'}, params)
            return res
        },
        // 临高脱贫攻坚新闻子级tab
        async lgtpgj_child_listItem_data({ rootState, getters }) {
            let params = {
                app_key: 'sprint-ucm',
                app_secret: 'bbbbbbaaaaaaaaaaaaa',
            }
            let res = await fetch('post', 'classID', {appInfoId: apis.theme.api.appInfoId,parentId: '5dabd91ee4b0e4f27ae7c603'}, params)
            return res
        },
        // 临高临高双创新闻子级tab
        async lglgsc_child_listItem_data({ rootState, getters }) {
            let params = {
                app_key: 'sprint-ucm',
                app_secret: 'bbbbbbaaaaaaaaaaaaa',
            }
            let res = await fetch('post', 'classID', {appInfoId: apis.theme.api.appInfoId,parentId: '5dabd931e4b0e4f27ae7c607'}, params)
            return res
        },
        // 临高特色文旅新闻子级tab
        async lgtswl_child_listItem_data({ rootState, getters }) {
            let params = {
                app_key: 'sprint-ucm',
                app_secret: 'bbbbbbaaaaaaaaaaaaa',
            }
            let res = await fetch('post', 'classID', {appInfoId: apis.theme.api.appInfoId,parentId: '5dabd93ae4b0e4f27ae7c609'}, params)
            return res
        },
        // 澄迈文明实践新闻子级tab
        async cmshijian_child_listItem_data({ rootState, getters }) {
            let params = {
                app_key: 'sprint-ucm',
                app_secret: 'bbbbbbaaaaaaaaaaaaa',
            }
            let res = await fetch('post', 'classID', {appInfoId: apis.theme.api.appInfoId,parentId: '5da5aba7e4b0f0e6b01f39c4'}, params)
            return res
        },
        // 澄迈特色文旅新闻子级tab
        async cmtswl_child_listItem_data({ rootState, getters }) {
            let params = {
                app_key: 'sprint-ucm',
                app_secret: 'bbbbbbaaaaaaaaaaaaa',
            }
            let res = await fetch('post', 'classID', {appInfoId: apis.theme.api.appInfoId,parentId: '5daffc1be4b00d124a7c0252'}, params)
            return res
        },
        // 澄迈脱贫攻坚新闻子级tab
        async cmtpgj_child_listItem_data({ rootState, getters }) {
            let params = {
                app_key: 'sprint-ucm',
                app_secret: 'bbbbbbaaaaaaaaaaaaa',
            }
            let res = await fetch('post', 'classID', {appInfoId: apis.theme.api.appInfoId,parentId: '5daffbaee4b00d124a7c0240'}, params)
            return res
        },
        // 澄迈双创新闻子级tab
        async cmsc_child_listItem_data({ rootState, getters }) {
            let params = {
                app_key: 'sprint-ucm',
                app_secret: 'bbbbbbaaaaaaaaaaaaa',
            }
            let res = await fetch('post', 'classID', {appInfoId: apis.theme.api.appInfoId,parentId: '5daffbe8e4b00d124a7c024a'}, params)
            return res
        },
        // 昌江文明实践新闻子级tab
        async cjwmsj_child_listItem_data({ rootState, getters }) {
            let params = {
                app_key: 'sprint-ucm',
                app_secret: 'bbbbbbaaaaaaaaaaaaa',
            }
            let res = await fetch('post', 'classID', {appInfoId: apis.theme.api.appInfoId,parentId: '5da5ad29e4b0f0e6b01f39d5'}, params)
            return res
        },
        // 昌江脱贫攻坚新闻子级tab
        async cjtpgj_child_listItem_data({ rootState, getters }) {
            let params = {
                app_key: 'sprint-ucm',
                app_secret: 'bbbbbbaaaaaaaaaaaaa',
            }
            let res = await fetch('post', 'classID', {appInfoId: apis.theme.api.appInfoId,parentId: '5db00270e4b00d124a7c026d'}, params)
            return res
        },
        // 昌江特色文旅新闻子级tab
        async cjtswl_child_listItem_data({ rootState, getters }) {
            let params = {
                app_key: 'sprint-ucm',
                app_secret: 'bbbbbbaaaaaaaaaaaaa',
            }
            let res = await fetch('post', 'classID', {appInfoId: apis.theme.api.appInfoId,parentId: '5db002d6e4b00d124a7c0280'}, params)
            return res
        },
        // 昌江双创新闻子级tab
        async cjsc_child_listItem_data({ rootState, getters }) {
            let params = {
                app_key: 'sprint-ucm',
                app_secret: 'bbbbbbaaaaaaaaaaaaa',
            }
            let res = await fetch('post', 'classID', {appInfoId: apis.theme.api.appInfoId,parentId: '5db002a8e4b00d124a7c0277'}, params)
            return res
        },
         // 文昌文昌故事新闻子级tab
         async wcwcgs_child_listItem_data({ rootState, getters }) {
            let params = {
                app_key: 'sprint-ucm',
                app_secret: 'bbbbbbaaaaaaaaaaaaa',
            }
            let res = await fetch('post', 'classID', {appInfoId: apis.theme.api.appInfoId,parentId: '5db0323be4b00d124a7c02ef'}, params)
            return res
        },
        // 航空热点关注新闻子级tab
        async rdgz_child_listItem_data({ rootState, getters }) {
            let params = {
                app_key: 'sprint-ucm',
                app_secret: 'bbbbbbaaaaaaaaaaaaa',
            }
            let res = await fetch('post', 'classID', {appInfoId: apis.theme.api.appInfoId,parentId: '5d8c5380e4b09940a1515b3f'}, params)
            return res
        },
        // 航空概念理论新闻子级tab
        async gnll_child_listItem_data({ rootState, getters }) {
            let params = {
                app_key: 'sprint-ucm',
                app_secret: 'bbbbbbaaaaaaaaaaaaa',
            }
            let res = await fetch('post', 'classID', {appInfoId: apis.theme.api.appInfoId,parentId: '5d8c5394e4b09940a1515b40'}, params)
            return res
        },
        // 航空军事技术新闻子级tab
        async jsjs_child_listItem_data({ rootState, getters }) {
            let params = {
                app_key: 'sprint-ucm',
                app_secret: 'bbbbbbaaaaaaaaaaaaa',
            }
            let res = await fetch('post', 'classID', {appInfoId: apis.theme.api.appInfoId,parentId: '5d8c53a9e4b09940a1515b41'}, params)
            return res
        },
        // 航空武器装备新闻子级tab
        async wqzb_child_listItem_data({ rootState, getters }) {
            let params = {
                app_key: 'sprint-ucm',
                app_secret: 'bbbbbbaaaaaaaaaaaaa',
            }
            let res = await fetch('post', 'classID', {appInfoId: apis.theme.api.appInfoId,parentId: '5d8c53b5e4b09940a1515b42'}, params)
            return res
        },
        // 航空国防工业新闻子级tab
        async gfgy_child_listItem_data({ rootState, getters }) {
            let params = {
                app_key: 'sprint-ucm',
                app_secret: 'bbbbbbaaaaaaaaaaaaa',
            }
            let res = await fetch('post', 'classID', {appInfoId: apis.theme.api.appInfoId,parentId: '5d8c53e3e4b09940a1515b43'}, params)
            return res
        },
         // 航空战略规划新闻子级tab
         async zlgh_child_listItem_data({ rootState, getters }) {
            let params = {
                app_key: 'sprint-ucm',
                app_secret: 'bbbbbbaaaaaaaaaaaaa',
            }
            let res = await fetch('post', 'classID', {appInfoId: apis.theme.api.appInfoId,parentId: '5d8c53e3e4b09940a1515b44'}, params)
            return res
        },
          // 右玉文明实践子级tab
         async shijian_child_listItem_data({ rootState, getters }) {
            let params = {
                app_key: 'sprint-ucm',
                app_secret: 'bbbbbbaaaaaaaaaaaaa',
            }
            let res = await fetch('post', 'classID', {
                    type: 'column',
                    parentId: '5cc7b0d70cf2acaeba3f52a8',
                    'appInfoId':apis.theme.api.appInfoId
                }, params)
            return res
        },
        //新增首页（专题栏目）三级
        async lives_listItem_datanewtwo({ rootState, getters }, page) {
            let uid = JSON.parse( localStorage.getItem('newwechatItem') ).uuid;
            let params = {
                'page': page,
                'size': 10,
                'columnId':uid,
                'appInfoId':apis.theme.api.appInfoId
            }
            let res = await fetch('post', 'Class', params, {
                'app_key': 'sprint-ucm',
                'app_secret': 'bbbbbbaaaaaaaaaaaaa'
            })
            return res
        },
        // 右玉文明实践子级tab
         async shijian_child_listItem_data({ rootState, getters }) {
            let params = {
                app_key: 'sprint-ucm',
                app_secret: 'bbbbbbaaaaaaaaaaaaa',
            }
            let res = await fetch('post', 'classID', {
                   'appInfoId':apis.theme.api.appInfoId,
                    parentId: '5cc7b0d70cf2acaeba3f52a8'
                }, params)
            return res
        },
       //右玉矩阵2
        async lives_listItem_datajvzhen({ rootState, getters }, page) {
            let params = {
                'page': page,
                'size': 100,
                'columnId':apis.theme.news.columnId.jvzhen,
                'appInfoId':apis.theme.api.appInfoId
            }
            let res = await fetch('post', 'Class', params, {
                'app_key': 'sprint-ucm',
                'app_secret': 'bbbbbbaaaaaaaaaaaaa',
                'appInfoId':apis.theme.api.appInfoId
            })
            console.log(res,"111111111111111")
            return res
        },
        //右玉矩阵3
        async lives_listItem_datajvzhennew({ rootState, getters }, page) {
            
            let params = {
                'page': page,
                'size': 100,
                'columnId':apis.theme.news.columnId.jvzhennew,
                'appInfoId':apis.theme.api.appInfoId
            }
            let res = await fetch('post', 'Class', params, {
                'app_key': 'sprint-ucm',
                'app_secret': 'bbbbbbaaaaaaaaaaaaa',
                'appInfoId':apis.theme.api.appInfoId
            })
           
            return res
        },
        // 获取置顶数据
        async get_stick_data({ commit, getters },userId) {
            // let params = {
            //     'page': 0,
            //     'size': 10,
            //     'columnId': apis.theme.news.columnId.zhiding
            // }
            // let res = await fetch('post', 'Stick', params, {
            //     'app_key': 'sprint-ucm',
            //     'app_secret': 'bbbbbbaaaaaaaaaaaaa'
            // })
            let params 
            if(apis.getTheme() == 'tiemenguan'){
                params = {
                    'pageNum': 0,
                    'pageSize': 10,
                    'columnId':apis.theme.news.columnId.zhiding,
                    'userId':userId,  //新增了user和appinfo字段
                    'appInfoId':apis.theme.api.appInfoId
                }
            }else{
                params = {
                    'pageNum': 0,
                    'pageSize': 10,
                    'columnId':apis.theme.news.columnId.zhiding,
                    'userId':userId.userId,  //新增了user和appinfo字段
                    'appInfoId':apis.theme.api.appInfoId
                }
            }
            let res = await fetch('post', 'Stick', params, {
                'app_key': 'sprint-ucm',
                'app_secret': 'bbbbbbaaaaaaaaaaaaa'
            })
            return res.data[0]
        },
       // 右玉专题专栏
       async TV_child_listItem_data({ rootState, getters }) {
                let params = {
                    app_key: 'sprint-ucm',
                    app_secret: 'bbbbbbaaaaaaaaaaaaa',
                }
                let res = await fetch('post', 'classID', {
                        parentId:apis.theme.news.columnId.youyuziid,
                        'appInfoId':apis.theme.api.appInfoId
                    }, params)
                  //  console.log(apis.theme.news.columnId.youyuziid)
                return res
        },
        //  // 文旅子级tab
        //  async TV_child_listItem_data({ rootState, getters }) {
        //     let params = {
        //         app_key: 'sprint-ucm',
        //         app_secret: 'bbbbbbaaaaaaaaaaaaa',
        //     }
        //     let res = await fetch('post', 'classID', {appInfoId: apis.theme.api.appInfoId,parentId: apis.theme.news.parentId.kanTV}, params)
        //     return res
        // },
        // // 获取banner数据
        // async get_banner_data({ commit, getters }) {
        //     // let params = { 'classid': getters.activeClassid, 'type': 'banner' }
        //     // let res = await fetch('post', 'Stick', params)
        //     // return res
        // },

        // 获取频道数据
        async get_channel_data({ state }) {
            // let res = await fetch('post', 'classID', { 'channel': 'channel' })
            let params = {
                app_key: 'sprint-ucm',
                app_secret: 'bbbbbbaaaaaaaaaaaaa'
            }
            // parentId: '5bed0bbaa3100d8dc42eec4d'
            let data = await fetch('post', 'classID', {appInfoId: apis.theme.api.appInfoId}, params)
            let res = []
            let json = []
            let json1 = []
            let jsonT = []
            let result = data.data
            result.forEach(function (item, i) {
                if (item.uuid == apis.theme.news.columnIdOrder[0]) {
                    jsonT.unshift({
                        'classid': item.uuid,
                        'classname': item.name,
                        'classpath': item.uuid,
                        'showclass': '0'
                    })
                } else if (item.uuid == apis.theme.news.columnIdOrder[1]) {
                    jsonT.push({
                        'classid': item.uuid,
                        'classname': item.name,
                        'classpath': item.uuid,
                        'showclass': '0'
                    })
                } else if (item.uuid == apis.theme.news.columnIdOrder[2]) {
                    json1.unshift({
                        'classid': item.uuid,
                        'classname': item.name,
                        'classpath': item.uuid,
                        'showclass': '0'
                    })
                } else if (item.uuid == apis.theme.news.columnIdOrder[3]) {
                    json1.push({
                        'classid': item.uuid,
                        'classname': item.name,
                        'classpath': item.uuid,
                        'showclass': '0'
                    })
                } else if (item.uuid == apis.theme.news.columnIdOrder[4]) {
                    json.unshift({
                        'classid': item.uuid,
                        'classname': item.name,
                        'classpath': item.uuid,
                        'showclass': '0'
                    })
                } else if ( apis.theme.news.columnIdHidden.indexOf(item.uuid) < 0 ) { // 隐藏 直播 置顶
                    json.push({
                        'classid': item.uuid,
                        'classname': item.name,
                        'classpath': item.uuid,
                        'showclass': '0'
                    })
                }
            })
            res = jsonT.concat(json1, json)
            return res
        },

        //  广告页
        async get_coverImg_data({ rootState }) {
            let params = {
                'userid': rootState.userid,
                'starttime': '',
                'type': 'ad'
            }
            let res = await fetch('post', 'addata', params)
            return res
        }
    }
}

