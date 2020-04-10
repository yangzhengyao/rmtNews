import { getCache, setCache, get_local_cache, set_local_cache } from '@/config/cache'
import { fetch } from '@/config/fetch'
import apis from '@/assets/js/api.js'
export default {
    namespaced: true,
    state: {
        indexActive: '5d0221a6e4b0ed2aef82fd991',          // active的栏目
        // indexPage: { '5c0f934ba310968e54438805': 1 },       // 记录各个栏目page的对象
        indexPage: {},       // 记录各个栏目page的对象
        // indexLocation: { '5c0f934ba310968e54438805': 0 },   // 各个栏目location的对象
        indexLocation: {},   // 各个栏目location的对象
        indexColumn: [{
            "classid": "5d0221a6e4b0ed2aef82fd991",
            "classname": "推荐",
            "classpath": "5d0221a6e4b0ed2aef82fd991",
            "showclass": "0"
        }, {
            "classid": "5d0221a6e4b0ed2aef82fd971",
            "classname": "订阅",
            "classpath": "5d0221a6e4b0ed2aef82fd971",
            "showclass": "0"
        }],
        currentContent: '',     // 当前栏目的数据，为了缓存各个栏目的数据，刷新时不用再次请求
        indexSwiper: false      // 是否在滑动
    },
    getters: {
        indexActive: state => {
            return state.indexActive
        },
        indexColumn: state => {
            return state.indexColumn
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
        activeClassid: (state, getters) => {
            return state.indexColumn[getters.activeIndex].classid
        },
        activePage: state => {
            return state.indexPage[state.indexActive]
        },
        activeLocation: state => {
            return state.indexLocation[state.indexActive]
        }
    },
    mutations: {
        set_indexActive(state, val) {
            state.indexActive = val
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
            set_local_cache('qinqiang_index_Column', arr)
        },
        set_currentContent(state, val) {
            state.currentContent = val
            setCache(`${state.indexActive}_json`, val)
        },
        set_indexSwiper(state, val) {
            state.indexSwiper = val
        }
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
        get_listItem_cache({ commit, state }) {
            let data = JSON.parse(getCache(`${state.indexActive}_json`))
            return data
        },

        // 获取栏目数据
        async get_indexColumn_data({ commit, state, dispatch }) {
            let res
            
                
            res =   [{
                "classid": "5d0221a6e4b0ed2aef82fd991",
                "classname": "动态",
                "classpath": "5d0221a6e4b0ed2aef82fd991",
                "showclass": "0"
            }, {
                "classid": "5d0221a6e4b0ed2aef82fd971",
                "classname": "关注",
                "classpath": "5d0221a6e4b0ed2aef82fd971",
                "showclass": "0"
            }]  
              
            // }
            dispatch('get_indexPage_cache', res)
            dispatch('get_indexLocation_cache', res)
            commit('set_indexColumn', res)
            return res
        },

        //获取文章列表数据
        async get_listItem_data({ rootState, getters }, {page, uuid,userId}) {
            
            let params = {
                'pageNum': page,
                'pageSize': 10,
                'columnId':uuid?uuid:getters.activeClassid!=''?getters.activeClassid:apis.theme.wenlv.columnIdOrder[0],
                'userId':userId,  //新增了user和appinfo字段
                'appInfoId':apis.theme.api.appInfoId
            }
            let res = await fetch('post', 'Class', params, {
                'app_key': 'sprint-ucm',
                'app_secret': 'bbbbbbaaaaaaaaaaaaa'
            })
            return res.data[0]
        },

        
        // 秦腔列表
        async qinqiang_listItem_data({ rootState, getters }, { page, uuid,userId}) {
            console.log(uuid)
            let params = {
                'id': uuid,
                'app_key': 'sprint-ucm',
                'app_secret': 'bbbbbbaaaaaaaaaaaaa'
            }
            let data={
                'page': page,
                'size': 10,
                'appInfoId':apis.theme.api.appInfoId,
                'userId':userId,  //新增了user和appinfo字段
                // 'columnId':uuid?uuid:getters.activeClassid!=''?getters.activeClassid:apis.theme.wenlv.columnIdOrder[0]
                'columnId':apis.theme.qinqiang.columnIdOrder[0],
            }
            let res = await fetch('post', 'Class',data , params)
            return res
        },

    }
}
