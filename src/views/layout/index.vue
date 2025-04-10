<template>
  <div >
    <!-- 二级路由出口：二级路由展示的位置 -->
     <router-view></router-view>
    <!-- 导航链接 -->
    <van-tabbar route active-color="#ee0a24" inactive-color="#000">
      <van-tabbar-item to="/home" icon="wap-home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/category" icon="apps-o">分类页</van-tabbar-item>
      <van-tabbar-item to="/cart" icon="shopping-cart-o">购物车</van-tabbar-item>
      <van-tabbar-item to="/user" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  name: 'LayoutIndex',
  data() {
    return {
    }
  },
  methods: {}
}
</script>
<style scoped lang="less"></style>
