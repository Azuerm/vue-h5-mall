import Vue from 'vue'
import VueRouter from 'vue-router'
// 其他的按需加载
// import Layout from '@/views/layout'
// import Search from '@/views/search'
// import SearchList from '@/views/search/list'
// import ProDetail from '@/views/prodetail'
// import Pay from '@/views/pay'
// import Myorder from '@/views/myorder'

// 首页相关 - 默认加载
// import Login from '@/views/login/index.vue' 和上面的效果一样
import Login from '@/views/login'
import Home from '@/views/layout/home.vue'
import Category from '@/views/layout/category.vue'
import Cart from '@/views/layout/cart.vue'
import User from '@/views/layout/user.vue'

import store from '@/store'
const Layout = () => import('@/views/layout')
const Search = () => import('@/views/search')
const SearchList = () => import('@/views/search/list')
const ProDetail = () => import('@/views/prodetail')
const Pay = () => import('@/views/pay')
const Myorder = () => import('@/views/myorder')
const Address = () => import('@/views/address')
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
    { path: '/', 
      component: Layout,
      redirect: '/home',
      children: [
        { path: '/home', component: Home},
        { path: '/category', component: Category},
        { path: '/cart', component: Cart},
        { path: '/user', component: User}
      ]
    },
    { path: '/search', component: Search },
    { path: '/searchlist', component: SearchList },
    // 动态路由传参，确认将来时那个商品，路由参数中携带id
    { path: '/prodetail/:id', component: ProDetail },
    { path: '/pay', component: Pay },
    { path: '/myorder', component: Myorder },
    { path: '/address', component: Address}
  ]
})

// 所有的路由在真正被访问到之前(解析渲染对应组件页面前),都会先经过全局前置守卫
// 只有全局前置守卫放行了，才会到达对应的页面
// 全局前置导航守卫(拦截进入pay、myorder页面)
// to：到哪去，到哪去的完整路由信息对象（路径，参数）
// from：从哪里来，从哪里来的完整路由信息对象（路径，参数）
// next()：是否放行
// （1）next()     直接放行，放行到to要去的路径
// （2）next(路径)  进行拦截，拦截到next里面配置的路径
// 定义一个数组，专门存放所有需要权限访问的页面
const authUrls = ['/pay', '/myorder']
router.beforeEach((to, from, next) => {
  // console.log(to, from, next)
  // 看 to.path 是否在 authUrls 中出现过
  if(!authUrls.includes(to.path)) {
    // 非权限页面，直接放行
    next()
    return
  }
  // 是权限页面，需要判断token
  // 1.导入store
  // 2.拿到token
  const token = store.getters.token
  // 3.判断是否有token
  if (token) {
    next()
  } else {
    next('/login')
  }
})

export default router
