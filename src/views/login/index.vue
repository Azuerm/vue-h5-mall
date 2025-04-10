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
            <input type="tel" maxlength="11" placeholder="请输入手机号码">
          </div>
          <div class="form-item ipt">
            <input type="text" maxlength="5" placeholder="请输入图形验证码" >
            <img src="@/assets/code.png" alt="" class="ipt-codeimg">
          </div>
          <div class="form-item ipt">
            <input type="text" placeholder="请输入短信验证码">
            <button >获得验证码</button>
          </div>
        </div>
        <div class="login-btn">登录</div>
      </div>
    </div>
  </div>
</template>
<script>
import request from '@/utils/request.js'
export default {
  name: 'LoginIndex',
  async created() {
    const res = await request.get('/captcha/image',
{platform: 'H5'})
    console.log(res)
  },
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
    background: linear-gradient(90deg, #ecb53c,#ff9211);
    line-height: 50px;
    border-radius: 39px;
    color: white;
    box-shadow: 0 10px 20px 9 rgba(0, 0, 0, .1);
  }
}
</style>
