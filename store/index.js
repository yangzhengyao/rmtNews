import Vue from 'vue'
import Vuex from 'vuex'

import index_module from './index/index'
import detail_module from './detail/index'
import search_module from './search/index'
import login_module from './login/index'
import integral_module from './integral/index' //积分模块
// import collect_module from './collect/index'
// import video_module from './video/index'
// import user_module from './user/index'
// import health_module from './health/index'
//新增微社区
import community_module from './community/index'
// import xinshidai from './xinshidai/index'
import qinqiang from './qinqiang/index' //海沧  两岸一家亲
import wenchang_qiaoshequ from './wenchang_qiaoshequ/index' //文昌 侨社区  
import wenchang_kanhangtian from './wenchang_kanhangtian/index' //文昌 侨社区  
import hcWenlv from './haicnag_wenlv/index' //海沧  两岸一家亲
import tiemenguan_wenlv from './tiemenguan_wenlv/index' //铁门关 文旅  
import newsCommunity from './newsCommunity/index' //新社区 
import wenlv from './wenlv/index' //青铜峡文旅
import qingtongxia_qq from './qingtongxia_qq/index' //海沧  两岸一家亲
import puyang_wenlv from './puyang_wenlv/index' //濮阳  两岸一家亲
import subscription from './subscription/index' //订阅号

Vue.use(Vuex)

const state = {
    device: 'android',                       // 设备
    userid: 'oqKkTvySObkOpp6L2z__GjacVFN8',  // 我微信的id: oqKkTvySObkOpp6L2z__GjacVFN8
    firstTime: ''                            // 第一次进入app时间
}

const getters = {
    device: state => {
        return state.device
    },
    userid: state => {
        return state.userid
    },
    firstTime: state => {
        return state.firstTime
    }
}

const mutations = {
    set_device(state, val) {
        state.device = val
    },
    set_userid(state, val) {
        state.userid = val
    },
    set_firstTime(state, val) {
        state.firstTime = val
    }
}

const actions = {
}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules: {
        index: index_module,
        community: community_module,
        detail: detail_module,
        search: search_module,
        login: login_module,
        newsCommunity:newsCommunity,
        wenlv:wenlv,
        qingtongxia_qq:qingtongxia_qq,
        // haicang_wenlv: haicang_wenlv,
        // xinshidai: xinshidai,
        qinqiang: qinqiang,
        hcWenlv:hcWenlv,
        tiemenguan_wenlv:tiemenguan_wenlv,
        wenchang_qiaoshequ:wenchang_qiaoshequ,
        wenchang_kanhangtian:wenchang_kanhangtian,
        puyang_wenlv:puyang_wenlv,
        subscription:subscription,
        // collect: collect_module,
        // video: video_module,
        // user: user_module,
        // health: health_module
        integral:integral_module
    }
})
