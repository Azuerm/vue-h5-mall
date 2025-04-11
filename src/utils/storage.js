// 封装存储模块
// localStorage.setItem('Shopping_info', JSON.stringify(xxx))
// 约定一个通用的键名
const INFO_KEY = 'shopping_info'
// 获取个人信息
export const getInfo = () => {
  const defaultObj = { token: '', userId: ''}
  const result = localStorage.getItem(INFO_KEY)
  return result ? JSON.parse(result) : defaultObj
}
// 设置个人信息
export const setInfo = (obj) => {
  localStorage.setItem(INFO_KEY, JSON.stringify(obj))
}
// 移除个人信息
export const removeInfo = () => {
  localStorage.removeItem(INFO_KEY)
}