<template>
  <div class="container">
    <!-- 页面主体 -->
    <div class="vue-body">
      <div class="router-view">
        <router-view></router-view>
      </div>
    </div>
    <!-- 底部选项卡 -->
    <tabBar></tabBar>
  </div>
</template>

<script>
import tabBar from "@/components/tabBar";

export default {
  name: "container",
  data() {
    return {
      nowPath: ""
    };
  },
  components: {
    tabBar
  },
  methods: {
    goToTop: function() {
      // 页签切换时，页面回到顶部
      scrollTo(0, 0);
    }
  },
  watch: {
    $route: "goToTop"
  }
};
</script>

<style>
.container,
.vue-body,
.router-view {
  width: 100%;
  height: 100%;
}
</style>

