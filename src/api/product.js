import request from '@/utils/request'

// 获得搜索商品列表的数据
export const getProList = (obj) => {
  const {categoryId, goodsName, page} = obj
  return request.get('/goods/list', {
    params: {
      categoryId,
      goodsName,
      page
    }
  })
}