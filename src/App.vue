<template>
  <div id="app">
    <transition name="slide-fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style lang="less">
@fs: 100rem;
#app {
  height: 100%;
  font-family: "Microsoft YaHei";
  line-height: 1;
}
</style>
