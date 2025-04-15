// 接口需要导入
import { getCartList} from '@/api/cart'
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
    }
  }
}