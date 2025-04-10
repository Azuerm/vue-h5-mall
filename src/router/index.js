import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
// import Login from '@/views/login/index.vue' 和上面的效果一样
import Layout from '@/views/layout'
import Search from '@/views/search'
import SearchList from '@/views/search/list'
import ProDetail from '@/views/prodetail'
import Pay from '@/views/pay'
import Myorder from '@/views/myorder'
import Home from '@/views/layout/home.vue'
import Category from '@/views/layout/category.vue'
import Cart from '@/views/layout/cart.vue'
import User from '@/views/layout/user.vue'
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
    { path: '/myorder', component: Myorder }
  ]
})

export default router
