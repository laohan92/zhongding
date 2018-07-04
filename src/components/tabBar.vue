<template>
  <div id="tabBar">
    <router-link v-for="(item,index) in tabbar" :class="{'tab-item':true,'active':checked === item.link}" :to="item.link">
      <img class="icon" :src="(checked === item.link ? item.sIcon : item.icon)">
      <p class="name">{{item.name}}</p>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "titleBar",
  data() {
    return {
      tabbar: [
        {
          name: "首页",
          link: "/home",
          icon: require("../assets/images/tabBar/icon_1.png"),
          sIcon: require("../assets/images/tabBar/s_icon_1.png")
        },
        {
          name: "我的订单",
          link: "/myOrder",
          icon: require("../assets/images/tabBar/icon_2.png"),
          sIcon: require("../assets/images/tabBar/s_icon_2.png")
        },
        {
          name: "个人中心",
          link: "/personalCenter",
          icon: require("../assets/images/tabBar/icon_3.png"),
          sIcon: require("../assets/images/tabBar/s_icon_3.png")
        }
      ]
    };
  },
  computed: {
    checked: function() {
      return this.$route.path;
    }
  }
};
</script>

<style lang="less">
@fs: 100rem;

#tabBar {
  position: fixed;
  left: 0;
  bottom: 0;
  padding: 20 / @fs 0 0 0;
  width: 100%;
  height: 100 / @fs;
  border-top: 2px #ececec solid;
  display: flex;
  background: #fff;
  .tab-item {
    flex: 1;
  }
  .active {
    .name {
      color: #ff7201;
    }
  }
  .icon {
    display: block;
    margin: 0 auto;
    height: 50 / @fs;
  }
  .name {
    margin-top: 10 / @fs;
    font-size: 28 / @fs;
    text-align: center;
    color: #333;
  }
}
</style>