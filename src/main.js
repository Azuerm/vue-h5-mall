import Vue from 'vue'
import App from './App.vue'
// 路由
import router from './router'
// vuex数据库
import store from './store'
// vant组件库
import '@/utils/vant-ui'
import '@/style/common.css'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
