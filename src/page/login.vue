<template>
  <div id="login" class="page-body">
    <!-- 标题栏 -->
    <header-bar :header="header"></header-bar>
    <!-- form表单 -->
    <form class="form">
      <div class="f-item phone">
        <input class="input verify" type="tel" placeholder="请输入手机号" maxlength="11" v-model="formData.phone" data-text="您还未填写手机号">
      </div>
      <div class="f-item mt25 smsCode">
        <input class="input verify" type="tel" placeholder="请输入短信验证码" maxlength="6" v-model="formData.msgCode" data-text="您还未填写验证码">
        <div class="sms-btn" @click="getSms">{{cdText}}</div>
      </div>
      <!-- 错误信息 -->
      <div class="error-text" v-html="errorText"></div>
      <!-- 登录按钮 -->
      <div class="submit" @click="submit">登录</div>
      <!-- 提示文案 -->
      <p class="tips">登录成功后，两周内可免输入账户密码登录</p>
    </form>
  </div>
</template>

<script>
import headerBar from "@/components/headerBar";
import { sendMsg, login } from "@/assets/js/api.js";
import { setCookie } from "@/assets/js/function.js";

export default {
  name: "myOrder",
  data() {
    return {
      header: {
        title: "评房审核系统",
        isBack: false
      },
      // 表单数据
      formData: {
        phone: "",
        msgCode: ""
      },
      // 倒计时
      countSum: 60,
      count: 60,
      cdText: "获取验证码",
      cdTimer: null,
      // 错误信息
      errorText: "",
      errorTimer: null
    };
  },
  methods: {
    // 获取短信验证码
    getSms: function() {
      var _this = this;
      if (!/^1[34578]\d{9}$/.test(this.formData.phone)) {
        this.errorEvent("请输入正确手机号");
        return;
      }
      sendMsg({
        target: _this,
        data: {
          phoneNo: _this.formData.phone,
          type: "1"
        },
        success: function(res) {
          _this.countDown();
        }
      });
    },
    // 登录
    submit: function() {
      var _this = this;
      if (!/^1[34578]\d{9}$/.test(this.formData.phone)) {
        this.errorEvent("请输入正确手机号");
        return;
      }
      var verify = $(".verify");
      var len = verify.length;
      for (var i = 0; i < len; i++) {
        var val = verify
          .eq(i)
          .val()
          .replace(/\s/g, "");
        if (!val) {
          this.errorEvent(verify.eq(i).attr("data-text"));
          return;
        }
      }

      var data = {
        phoneNo: this.formData.phone,
        msgCode: this.formData.msgCode
      };

      // login({
      //   target: _this,
      //   data: data,
      //   success: function(res) {
      //     // 登录成功记录userid
      //     _this.$router.push("/index");
      //   }
      // });
      // 模拟登录成功
      setCookie("userId", "pengdong");
      _this.$router.push("/home");
    },
    // 倒计时
    countDown: function() {
      var _this = this;
      this.cdText = this.count + "s";
      if (this.count == 0) {
        this.count = this.countSum;
        this.cdText = "获取验证码";
        return;
      } else {
        _this.count--;
      }
      this.cdTimer = setTimeout(function() {
        clearTimeout(_this.cdTimer);
        _this.countDown();
      }, 1000);
    },
    // 错误提示
    errorEvent: function(msg) {
      var _this = this;
      clearTimeout(this.errorTimer);
      this.errorText = "<span class='caution'></span>" + msg;
      this.errorTimer = setTimeout(function() {
        _this.errorText = "";
      }, 2000);
    }
  },
  components: {
    headerBar
  }
};
</script>

<style lang="less">
@fs: 100rem;
@baseUrl: "../assets/images/login";

#login {
  background: #fff;
}
.caution {
  display: inline-block;
  position: relative;
  top: 4 / @fs;
  margin: 0 10 / @fs 0 0;
  width: 27 / @fs;
  height: 27 / @fs;
  background: url("@{baseUrl}/caution.png") no-repeat;
  background-size: 100%;
}
.tips {
  margin-top: 40 / @fs;
  font-size: 30 / @fs;
  text-align: center;
}
</style>
