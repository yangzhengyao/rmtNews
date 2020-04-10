import { fetch } from '@/config/fetch'
import moment from "moment";
import apis from '@/assets/js/api.js'
export default {
  namespaced: true,
  state: {
    taskList:JSON.parse(localStorage.getItem('taskList')), //任务列表
    userExpScore:JSON.parse(localStorage.getItem('userExpScore')), //用户积分
    startTime:'', //文章或视频开始时间
  },
  mutations: {
    set_startTime(state,val){
      localStorage.setItem('startTime',JSON.stringify(val))
      state.startTime = JSON.parse(localStorage.getItem('startTime'))
    }
  },
  actions: {
    async loginUpdate({state,commit},param) { //登录交互接口
      let res = await fetch('post', 'integral_loginUpdate', param)
      if(res.success){
        localStorage.setItem('taskList',JSON.stringify(res.data[0].userTasks))
        localStorage.setItem('userExpScore',JSON.stringify(res.data[0].userExp.expScore))
        state.taskList = JSON.parse(localStorage.getItem('taskList'))
        state.userExpScore = JSON.parse(localStorage.getItem('userExpScore'))
      }
    },
    async updateUserRecordTime({state,commit},param) { //任务进度更新接口
      let res = await fetch('post', 'integral_updateUserRecordTime', param)
      if(res.success){
        localStorage.setItem('taskList',JSON.stringify(res.data[0].userTasks))
        localStorage.setItem('userExpScore',JSON.stringify(res.data[0].userExp.expScore))
        state.taskList = JSON.parse(localStorage.getItem('taskList'))
        state.userExpScore = JSON.parse(localStorage.getItem('userExpScore'))
        return true
      }else{
        return false
      }
    },
    calculateIntegral({dispatch},param){
      if(!param.playonlineurl){ //非视频触发阅读文章获取任务积分接口
        if(dispatch('updateUserRecordTime',{
          userId: JSON.parse(localStorage.getItem( 'userData' )).user_id,
          appInfoId: apis.theme.api.appInfoId,
          expType: 2,
          recordTime: 1
        })){
          if(dispatch('updateUserRecordTime',{
            userId: JSON.parse(localStorage.getItem( 'userData' )).user_id,
            appInfoId: apis.theme.api.appInfoId,
            expType: 3,
            recordTime: parseInt((moment().format('x')-JSON.parse(localStorage.getItem('startTime')))/1000)
          })){
            localStorage.removeItem('startTime')
          }else{
            localStorage.removeItem('startTime')
          }
        }
      }else{
        if(dispatch('updateUserRecordTime',{
          userId: JSON.parse(localStorage.getItem( 'userData' )).user_id,
          appInfoId: apis.theme.api.appInfoId,
          expType: 4,
          recordTime: 1
        })){
          if(dispatch('updateUserRecordTime',{
            userId: JSON.parse(localStorage.getItem( 'userData' )).user_id,
            appInfoId: apis.theme.api.appInfoId,
            expType: 5,
            recordTime: parseInt((moment().format('x')-JSON.parse(localStorage.getItem('startTime')))/1000)
          })){
            localStorage.removeItem('startTime')
          }else{
            localStorage.removeItem('startTime')
          }
        }
      }
    },
  }
}