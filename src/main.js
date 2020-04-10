import Vue from 'vue'
import App from './App'
import axios from 'axios';
import qs from 'qs'
import router from './router'
import store from '../store/index'
import $ from './assets/jquery/jquery-1.12.0.min'
import VueStar from 'vue-star'
//引入初始化样式
import './assets/css/reset.css';
import './assets/css/transition.css';
import './assets/css/global.css';
import './assets/css/animate.css';
import '@/assets/styles/icon.css'
//后台接口存储及公共JS的模块
import apis from './assets/js/api';

Vue.prototype.qs=qs
// 第三方库
import MintUI, {  MessageBox, Toast, Indicator } from 'mint-ui' // 饿了么移动端UI组件
import 'mint-ui/lib/style.css'

import VueAwesomeSwiper from 'vue-awesome-swiper' // swiper的vue轮子
import 'swiper/dist/css/swiper.css'
// 自定义组件
import { swiper, goTop } from '@/config/directive.js' // 指令 
import myHeader from 'components/banner.vue' // header组件
import myLoading from 'components/loading' // loading组件
import myError from 'components/error' // error组件
import listInfo from 'components/info' // 文章列表信息组件
import listItem from 'components/listItem' // 文章列表组件
import youyulist from 'components/youyulist' // 文章列表组件
import newsList from 'components/newsListItem' // 新版UI列表组件
import commentItem from 'components/commentItem' // 评论列表组件
import publishItem from 'components/publishItem' // 后台发布列表组件
import myBanner from 'components/banner' // banner组件
import popupMenu from 'components/popupMenu' // 弹框组件
import myTool from 'components/tool' // 弹框组件
import comcont from 'components/comcont' // 评论列表组件
import marqueeLists from 'components/marqueeList' // 文章列表组件
import VueLazyload from 'vue-lazyload'
import { Upload,Dialog,Progress,Slider } from  'element-ui'; //使用elementui上传组件
import 'element-ui/lib/theme-chalk/index.css';
// import Vconsole from 'vconsole'
// let vConsole = new Vconsole()
// Vue.use(vConsole)
Vue.use(Upload);//使用elementui上传组件
Vue.use(Dialog);
Vue.use(Progress); 
Vue.use(Slider); 
Vue.config.productionTip = false
Vue.use(MintUI)
Vue.prototype.$toast = Toast
Vue.prototype.$msgBox = MessageBox
Vue.prototype.$indicator = Indicator
Vue.use(VueAwesomeSwiper)

Vue.use(VueLazyload)   //使用vue懒加载
// <!-- 引入样式 -->
// 注册全局组件
// 点赞组件
Vue.component('VueStar', VueStar)
Vue.component('my-header', myHeader)
Vue.component('my-loading', myLoading)
Vue.component('my-error', myError)
Vue.component('list-info', listInfo)
Vue.component('list-item', listItem)
Vue.component('news-list', newsList)
Vue.component('youyulist', youyulist)
Vue.component('comment-item', commentItem)
Vue.component('publish-item', publishItem)
Vue.component('my-banner', myBanner)
Vue.component('popup-menu', popupMenu)
Vue.component('my-tool', myTool)
Vue.component('comcont', comcont)
Vue.component('marqueeLists', marqueeLists)
// 注册全局指令
Vue.directive('swiper', { // 右滑返回上一页
  inserted: function (el, binding, vnode) {
    if (binding.value) {
      swiper(el, binding.arg, binding.value, vnode.context)
    } else {
      return ''
    }
  }
})
Vue.directive('goTop', { // 点击头部返回页面顶部
  inserted: function (el, binding, vnode) {
    if (binding.value) {
      goTop(el, binding.arg, vnode.context)
    } else {
      return ''
    }
  }
})
Vue.prototype.apis = apis;
Vue.prototype.axios = axios;
axios.defaults.headers.common['app_info_id'] = apis.theme.api.appInfoId;
axios.defaults.withCredentials=true;

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  $,
  components: {
    App
  }
})
