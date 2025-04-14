import request from '@/utils/request'
// 获得首页数据
export const getHomeDate = () => {
  return request.get('/page/detail', { 
    params: {
      pageld: 0
    },
    platform: 'H5'
  })
}