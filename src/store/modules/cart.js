// 接口需要导入
import { getCartList, changeCount, delSelect} from '@/api/cart'
import { Toast } from 'vant'
export default {
  namespaced: true,
  state () {
    return {
      cartList: []
    }
  },
  mutations: {
    // 提供一个设置cartList的mutation
    setCartList (state, newList) {
      state.cartList = newList
    },
    toggleCheck (state, goodsId) {
      // 让对应的 id 的项 状态取反
      const goods = state.cartList.find( item => item.goods_id === goodsId)
      goods.isChecked = !goods.isChecked
    },
    toggleAllCheck (state, flag) {
      // 让所有的小选框，同步设置
      state.cartList.forEach( item => {
        item.isChecked = flag
      })
    },
    changeCount (state, obj) {
      const {goodsId,goodsNum} = obj
      const goods = state.cartList.find( item => item.goods_id === goodsId)
      goods.goods_num = goodsNum
    }
  },
  actions: {
    async getCartAction (context) {
      const { data } = await getCartList()
      // 后台返回的数据中，不包含复选框的选中状态，为了实现将来的功能
      // 需要手动维护数据，给每一项，添加一个isChecked状态 (标记当前商品是否选中)
      data.list.forEach(item => {
        item.isChecked = true
      })
      context.commit('setCartList', data.list)
    },
    async changeCountAction (context, obj) {
      const { goodsNum,goodsId,goodSkuId } = obj
      // 先本地修改
      context.commit('changeCount', {goodsId,goodsNum})
      // 再同步到后台
      await changeCount(goodsId,goodsNum,goodSkuId)
    },
    // 删除购物车数据
    async delSelect (context) {
      // 找出选中的商品项
      const selCarList = context.getters.selCarList
      const cartIds = selCarList.map(item => item.id)
      // 后台删除
      await delSelect(cartIds)
      Toast('删除成功')
      // 重新拉取最新的购物车数据(重新渲染)
      context.dispatch('getCartAction')
    }
  },
  getters: {
    // 求所有的商品累加总数
    cartTotal (state) {
      return state.cartList.reduce( (sum, item) => sum + item.goods_num , 0)
    },
    // 选中的商品项
    selCarList (state) {
      return state.cartList.filter( item => item.isChecked)
    },
    // 选中的总数
    // 在getters访问其他getters：
    selCount (state, getters) {
      return getters.selCarList.reduce( (sum, item) => sum + item.goods_num , 0)
    },
    // 选中的总价
    selPrice (state, getters) {
      return getters.selCarList.reduce( (sum, item) => {
        return sum + item.goods_num * item.goods.goods_price_min
      }, 0).toFixed(2)
    },
    // 是否全选
    isAllChecked (state) {
      return state.cartList.every( item => item.isChecked)
    }
  }
}