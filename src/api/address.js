import request from '@/utils/request'

// 获得地址列表
export const getAddressList = () => {
  return request.get('/address/list')
}
// 获得省市区
export const getCity = () => {
  return request.get('/region/tree', {
    platform: 'H5'
  })
}
// 添加收货地址
export const getUserAddress = (userName, phone, region) => {
  return request.post('/address/add',{
    Headers: {
      platform: 'H5'
    },
    form: {
      name: userName,
      phone,
      ...region
    }
  })
}