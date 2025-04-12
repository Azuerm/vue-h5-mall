import { getInfo, setInfo } from '@/utils/storage'
export default {
  namespaced: true,
  state () {
    return {
      // 个人权证相关
      userInfo: getInfo()
    }
  },
  mutations: {
    // 所以mutations的第一个参数都是state
    setUserInfo (state, obj) {
      state.userInfo = obj
      setInfo(obj)
    }
  },
  actions: {},
  getters: {}
}