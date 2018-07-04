<template>
  <div id="architecture" class="page-body">
    <!-- 标题栏 -->
    <header-bar :header="header"></header-bar>
    <!-- 查询列表 -->
    <query-list :listData="listData"></query-list>
  </div>
</template>

<script>
import headerBar from "@/components/headerBar";
import queryList from "@/components/queryList";

export default {
  name: "loginTimeout",
  data() {
    return {
      header: {
        title: "查建委",
        isBack: true
      },
      listData: {
        sl: {}, // 选择位置
        sd: {}, // 选择区域建委的详细信息
        lls: true, // 位置列表是否展示
        ll: "jwLocation", // 列表信息
        dd: "jwData" // 详细数据
      }
    };
  },
  components: {
    headerBar,
    queryList
  }
};
</script>

<style lang="less">
@fs: 100rem;
#architecture {
  padding-bottom: 50 / @fs;
}
</style>
