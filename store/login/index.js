import { set_local_cache } from '@/config/cache'
// const userParam = '';
// if( JSON.parse( localStorage.getItem('./index.html') ) != undefined ){
//     userParam = {};
// }
export default {
  namespaced: true,
  state: {
    userData: localStorage.getItem('userData'), //判断用户是否登录
    imgData:[]
  },
  getters: {
    getStorge: function (state) {
      if (!state.userData) {
        state.userData = JSON.parse(localStorage.getItem('userData'));
      }
      return state.userData
    },
    imgData:function(state){
      return state.imgData
    }
  },
  mutations: {
    _setStorage(state, value) {
      state.userData = value;
      localStorage.setItem('userData', value);
    },
    _RemoveStorage(state, value) {
      state.userData = value;
      localStorage.removeItem('userData');
    },
    _setImgData(state,value){
      state.imgData = value;
      alert(state.imgData)
    }
  }
}
