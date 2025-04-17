import request from '@/utils/request'

// 获得用户信息
export const getUserInfoDetail = () => {
  return request.get('/user/info',{
    platform: 'H5'
  })
}