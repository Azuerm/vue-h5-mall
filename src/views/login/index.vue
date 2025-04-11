<template>
  <div class="">
    <div class="login">
      <!-- 头部NavBar -->
      <van-nav-bar title="会员登录" left-arrow @click-left="$router.go(-1)" />
      <!-- 主体 -->
      <div class="container">
        <div class="title">
          <h3>手机号登录</h3>
          <p>未注册的手机号登录后将自动注册</p>
        </div>
        <div class="form">
          <div class="form-item">
            <input v-model="mobile" type="tel" maxlength="11" placeholder="请输入手机号码">
          </div>
          <div class="form-item ipt">
            <input v-model="picCode" type="text" maxlength="6" placeholder="请输入图形验证码">
            <img v-if="picUrl" :src="picUrl" @click="getPicCode" alt="" class="ipt-codeimg">
          </div>
          <div class="form-item ipt">
            <input v-model="msgCode" type="text" placeholder="请输入短信验证码">
            <button @click="getCode">
              {{ second === totalSecond ? '获取验证码' : second + '秒后重新发送' }}
            </button>
          </div>
        </div>
        <div @click="login" class="login-btn">登录</div>
      </div>
    </div>
  </div>
</template>

<script>
// 导入接口
import { getPicCode, getMsgCode,codeLogin } from '@/api/login'
// import { Toast } from 'vant'
export default {
  name: 'LoginIndex',
  data() {
    return {
      picCodeKey: '', // 将来请求传递的图形验证码唯一标识,
      picUrl: '',  //存储请求渲染的图片地址
      totalSecond: 60,  //总秒数
      second: 60, // 当前秒数，开启定时器对 second---
      timer: null, // 定时器id
      mobile: '', // 手机号
      picCode: '', //用户输入的图形验证码
      msgCode: '' //短信验证码
    }
  },
  created() {
    this.getPicCode()
  },
  methods: {
    // 获得图形验证码
    async getPicCode() {
      const { data: { base64, key } } = await getPicCode()
      this.picUrl = base64  //存储地址
      this.picCodeKey = key //存储唯一标识
      // Toast('获取图形验证码成功')
      // this.$toast('获取成功')
    },
    // 校验 手机号 和图形验证码 是否合法
    // 不通过校验，返回false
    valiFn () {
      if (!/^1[3-9]\d{9}$/.test(this.mobile)) {
        this.$toast('请输入正确的手机号')
        return false
      }
      if (!/^\w{4}$/.test(this.picCode)) {
        this.$toast('请输入正确的图形验证码')
        return false
      }
      return true
    },
    // 获取短信验证码
    async getCode() {
      if (!this.valiFn()) {
        // 如果没有通过校验，没必要往下走
        return
      }
      // 当前目前没有定时器开启，且totalSecond 和 second 一致(描述归位) 才可以倒计时
      if (!this.timer && this.second === this.totalSecond) {
        // 发送请求
        // 预期：希望响应的status非200，最好抛出一个promise错误，await只会等待成功的promise
        await getMsgCode(this.picCode, this.picCodeKey, this.mobile) 
        this.$toast('短信发送成功，注意查收')
        // 开启倒计时
        this.timer = setInterval(() => {
          this.second--
          // console.log('开启倒计时')
          if (this.second <= 0) {
            clearInterval(this.timer)
            this.timer = null //重置定时器id
            this.second = this.totalSecond  // 归位
          }
        }, 1000);
      }

    },
    // 登录
    async login () {
      if (!this.valiFn()) {
        return
      }
      if (!/^\d{6}$/.test(this.msgCode)) {
        this.$toast('请输入正确的手机验证码')
        return
      }
      const res = await codeLogin(this.mobile, this.msgCode)
      this.$store.commit('user/setUserInfo',res.data)
      console.log(res)
      this.$toast('登录成功')
      this.$router.push('/')
    }
  },
  // 离开页面清除定时器
  destroyed () {
    clearInterval(this.timer)
  }
}
</script>

<style scoped lang="less">
.container {
  line-height: 1.5em;
  margin: 50px 30px;

  .title {
    h3 {
      font-size: 26px;
      font-weight: normal;
    }

    p {
      color: gray;
      margin: 10px 0;
    }
  }

  .form {
    width: 100%;
    margin: 30px 0 35px 0;

    .form-item {
      input {
        padding-left: 5px;
        margin: 5px 0;
        display: block;
        width: 100%;
        border: none;
        height: 60px;
        line-height: 60px;
        color: #000;
      }
    }

    .ipt {
      position: relative;
    }

    .ipt-codeimg {
      width: 40%;
      position: absolute;
      top: 10px;
      right: 0;
    }

    button {
      position: absolute;
      top: 18px;
      right: 0;
      border: none;
      background-color: transparent;
      color: orange;
    }
  }

  .login-btn {
    width: 100%;
    height: 50px;
    text-align: center;
    background: linear-gradient(90deg, #ecb53c, #ff9211);
    line-height: 50px;
    border-radius: 39px;
    color: white;
    box-shadow: 0 10px 20px 9 rgba(0, 0, 0, .1);
  }
}
</style>
