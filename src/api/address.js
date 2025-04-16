import request from '@/utils/request'

// 获得地址列表
export const getAddressList = () => {
  return request.get('/address/list')
}