export default {
  // 此处编写的就是 Vue组件实例 的配置项，通过一定语法，可以直接混入到组件内部
  // data methods computed 生命周期函数...
  // 注意点：
  // 1. 如果 此处 和 组件内，提供了同名的data或methods，则组件内优先级更高
  // 2. 如果编写了生命周期函数，则mixins中的生命周期函数 和 页面的生命周期函数，会用 数组管理 统一执行
  created () {
    // console.log('嘎嘎')
  },
  data () {
    return {
      title: '标题'
    }
  },
  methods: {
   sayHi ()  {
    // console.log('你好')
   },
   
    // 根据登录状态，判断是否需要显示登录确认框
    // 1.如果未登录 => 显示确认框 返回true
    // 2.如果已登录 => 啥也不干 返回false
    loginConfirm () {
      // 判断token是否存在
      // 1.如果token不存在，弹确认框
      // 2.如果token存在，继续请求操作
      if (!this.$store.getters.token) {
        // console.log('弹确认框')
        this.$dialog.confirm({ 
          title:'温馨提示',
          message:'此时需要先登录才能继续操作哦',
          confirmButtonText: '去登录',
          cancelButtonText: '再逛逛'
        })
          .then(() => {
            // 如果希望，跳转到登录 => 登录后能回跳回来，需要在跳转去携带参数(当前的路径地址)
            // this.$route.fullPath(会包含查询参数)
            this.$router.replace({
              // push会不断往历史记录累加， replace不会新增历史，替换原有的历史
              path: '/login',
              query: {
                backUrl: this.$route.fullPath
              }
            })
          })
          .catch(() => {})
        return true
      }
      return false
    }
  }
}