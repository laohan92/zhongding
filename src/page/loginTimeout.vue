<template>
  <div id="loginTimeout">
    <!-- 标题栏 -->
    <header-bar :header="header"></header-bar>
    <img class="timeout-icon" src="../assets/images/loginTimeout/Timeout.png" alt="登录超时">
    <p class="timeout-icon">啊哦...登录信息失效了<br>请重新登录</p>
    <!-- 重新登录 -->
    <router-link class="to-login" to="/login">重新登录</router-link>
  </div>
</template>

<script>
import headerBar from "@/components/headerBar";

export default {
  name: "loginTimeout",
  data() {
    return {
      header: {
        title: "评房审核系统",
        isBack: true
      }
    };
  },
  components: {
    headerBar
  }
};
</script>

<style lang="less">
@fs: 100rem;

#loginTimeout {
  padding-top: 196 / @fs;
  .timeout-icon {
    display: block;
    margin: 0 auto;
    width: 280 / @fs;
  }
  .timeout-icon {
    margin-top: 56 / @fs;
    font-size: 28 / @fs;
    color: #999;
    line-height: 42 / @fs;
    text-align: center;
  }
  .to-login {
    margin: 100 / @fs auto 0;
    display: block;
    width: 475 / @fs;
    height: 96 / @fs;
    background: #ff7201;
    border-radius: 6px;
    font-size: 36 / @fs;
    color: #fff;
    line-height: 96 / @fs;
    text-align: center;
  }
}
</style>
