import request from '@/utils/request.js'

// 订单结算
// 如果参数不同可以通过obj接受，再...obj
// mode: cart    => obj { cartIds }
// mode: buyNow  => obj { goodsId  goodsNum  goodsSkuId }
export const checkOrder = (mode, obj) => {
  return request.get('/checkout/order', {
    params: {
      mode,
      delivery: 10,
      shopId: 0,
      couponId: 0,
      isUsePoints: 0,
      ...obj
    }
  })
}
// 提交订单
// mode: cart    => obj { cartIds remark }
// mode: buyNow  => obj { goodsId  goodsNum  goodsSkuId remark}
export const submitOrder = (mode, obj) => {
  // 不加params 试试
  return request.post('/checkout/submit',{
    mode,
    delivery: 10,
    couponId: 0,
    isUsePoints: 0,
    payType: 10,
    ...obj
  })
}

// 订单列表
export const getMyOrderList = (dataType, page) => {
  return request.get('/order/list',{
    params: {
      dataType,
      page,
    },
    platform: 'H5'
  })
}