// 此处用于存放所有登录相关的接口请求
import request from '@/utils/request'
// 1.获取图像验证码
export const getPicCode = () => {
  return request.get('/captcha/image',{platform: 'H5'})
}
// 2.获取短信验证码
export const getMsgCode = (captchaCode, captchaKey, mobile ) => {
  return request.post('/captcha/sendSmsCaptcha',{
    platform: 'H5',
    form: {
      captchaCode,
      captchaKey,
      mobile,
    }
  })
}
// 3.登录接口
export const codeLogin = (mobile, smsCode) => {
  return request.post('/passport/login',{
    platform: 'H5',
    form: {
      isParty: false,
      partyData: {},
      mobile,
      smsCode
    }
  })
}