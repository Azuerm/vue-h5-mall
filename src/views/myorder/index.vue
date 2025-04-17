<template>
  <div class="order">
    <van-nav-bar title="我的订单" left-arrow @click-left="$router.go(-1)" />
    <van-tabs v-model="active">
      <van-tab name="all" title="全部"></van-tab>
      <van-tab name="payment" title="待支付"></van-tab>
      <van-tab name="delivery" title="待发货"></van-tab>
      <van-tab name="received" title="待收货"></van-tab>
      <van-tab name="comment" title="待评价"></van-tab>
    </van-tabs>
    <OrderListItem v-for="item in list" :key="item.order_id" :item="item"></OrderListItem>
  </div>
</template>

<script>
import OrderListItem from '@/components/OrderListItem.vue'
import { getMyOrderList } from '@/api/order'
export default {
  name: 'OrderPage',
  data () {
    return {
      active: this.$route.query.dataType || 'all',
      page: 1,
      list: []
    }
  },
  components: {
    OrderListItem
  },
  created () {
    this.getOrderList()
  },
  methods: {
    async getOrderList () {
      const {data: {list}} = await getMyOrderList(this.active, this.page)
      list.data.forEach(item => {
        item.total_num = 0
        // 新加了一个计算总数的属性
        item.goods.forEach(goods => {
          item.total_num = item.total_num + goods.total_num
        })
      })
      // console.log(list.data)
      this.list = list.data
    }
  },
  watch: {
    active: {
      // 检测active的值，一打开页面立即渲染
      immediate:true,
      handler() {
        this.getOrderList()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.order {
  background-color: #fafafa;
}
.van-tabs {
  position: sticky;
  top: 0;
}
</style>
