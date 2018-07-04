<template>
  <div id="index" class="page-body">
    <!-- 标题栏 -->
    <header-bar :header="header"></header-bar>
    <!-- 提交订单入口 -->
    <router-link class="submitOrder" to="/submitOrder">
      <img class="bg" src="../assets/images/submitOrder/bg.png" alt="背景图片">
      <img class="icon" src="../assets/images/submitOrder/submit.png" alt="提交图标">
      <p class="text">提交评房订单</p>
    </router-link>
    <!-- 跳转第三方列表 -->
    <ul class="link-list">
      <li v-for="item in linkList">
        <router-link :to="item.link">{{item.name}}</router-link>
      </li>
      <li>
        <a href="http://m.fang.com/fangjia/bj/accurate.html">查快出价</a>
      </li>
    </ul>
  </div>
</template>

<script>
import headerBar from "@/components/headerBar";

export default {
  name: "index",
  data() {
    return {
      header: {
        title: "评房审核系统",
        isBack: false
      },
      linkList: [
        {
          name: "查公证处",
          link: "/notaryOffice"
        },
        {
          name: "查建委",
          link: "/architecture"
        },
        {
          name: "查征信点",
          link: "/credit"
        },
        {
          name: "查税费",
          link: "/taxation"
        },
        {
          name: "查手续",
          link: "/procedures"
        }
      ]
    };
  },
  created: function() {
    // 回到页面顶部
    scrollTo(0, 0);
  },
  components: {
    headerBar
  }
};
</script>

<style lang="less">
@fs: 100rem;
@baseUrl: "../assets/images/submitOrder";

#index {
  padding-bottom: 140 / @fs;
  .submitOrder {
    position: relative;
    display: block;
    margin: 22 / @fs auto 0;
    padding-top: 96 / @fs;
    box-sizing: border-box;
    width: 670 / @fs;
    height: 324 / @fs;
    .bg {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      width: 100%;
      height: 100%;
    }
    .icon {
      display: block;
      position: relative;
      z-index: 2;
      margin: 0 auto;
      width: 56 / @fs;
      height: 55 / @fs;
    }
    .text {
      position: relative;
      z-index: 2;
      margin-top: 52 / @fs;
      font-size: 34 / @fs;
      text-align: center;
      line-height: 48 / @fs;
      color: #ff7201;
    }
  }
  .link-list {
    margin-top: 48 / @fs;
    width: 100%;
    li a {
      display: block;
      padding-left: 40 / @fs;
      height: 94 / @fs;
      border-bottom: 1px #e5e5e5 solid;
      background: url("@{baseUrl}/look_arrow.png") #fff no-repeat 692 / @fs
        center;
      background-size: 18 / @fs 32 / @fs;
      font-size: 30 / @fs;
      line-height: 94 / @fs;
      color: #666;
    }
  }
}
</style>
