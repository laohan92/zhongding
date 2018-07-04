<template>
  <div id="personal" class="page-body">
    <!-- 标题栏 -->
    <header-bar :header="header"></header-bar>
    <!-- 信息模块 -->
    <ul class="user-info">
      <li>姓名：{{personalInfo.userName}}</li>
      <li>电话：{{personalInfo.userPhone}}</li>
    </ul>
    <!-- 信息模块 -->
    <ul class="user-info" v-if="personalInfo.type == 1">
      <li>专属业务员：{{personalInfo.counterman}}</li>
      <li>电话：{{personalInfo.countermanPhone}}</li>
    </ul>
    <ul class="user-info" v-else-if="personalInfo.type == 2">
      <li>所属机构：{{personalInfo.institutionName}}</li>
    </ul>
    <!-- 退出登录 -->
    <div class="exit" @click="logOut">退出登录</div>
  </div>
</template>

<script>
import headerBar from "@/components/headerBar";
import { toManagerCenter, logout } from "@/assets/js/api.js";

export default {
  name: "index",
  data() {
    return {
      header: {
        title: "个人中心",
        isBack: false
      },
      personalInfo: {}
    };
  },
  created: function() {
    var _this = this;
    // 初始请求个人信息
    var data = {
      userId: g_userId
    };

    toManagerCenter({
      target: _this,
      data: data,
      success: function(ret) {
        _this.personalInfo = ret.data;
      }
    });
  },
  methods: {
    logOut: function() {
      var _this = this;
      // 初始请求订单信息
      var data = {
        openId: g_openId,
        userId: g_userId
      };

      logout({
        target: _this,
        data: data,
        success: function(ret) {
          _this.$router.push("/login");
        }
      });
    }
  },
  components: {
    headerBar
  }
};
</script>

<style lang="less">
@fs: 100rem;

#personal {
  padding-bottom: 140 / @fs;
}
.user-info {
  margin-top: 45 / @fs;
  width: 100%;
  background: #fff;
  li {
    margin: 0 auto;
    width: 670 / @fs;
    height: 96 / @fs;
    border-bottom: 1px #ececec solid;
    font-size: 32 / @fs;
    color: #999;
    line-height: 96 / @fs;
  }
  li:last-child {
    border: none;
  }
}
.exit {
  margin: 60 / @fs auto 0;
  width: 475 / @fs;
  height: 96 / @fs;
  border: 1px solid #ff7201;
  box-sizing: border-box;
  border-radius: 6 / @fs;
  font-size: 36 / @fs;
  color: #ff7201;
  line-height: 96 / @fs;
  text-align: center;
}
</style>
