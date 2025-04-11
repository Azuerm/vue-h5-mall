import Vue from 'vue'
import App from './App.vue'
// 路由
import router from './router'
// vuex数据库
import store from './store'
// vant组件库
import '@/utils/vant-ui'
// 公共样式
import '@/style/common.css'
// 导入toast轻提示
// import { Toast } from 'vant'
// Toast('嘿嘿，你好呀')
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
