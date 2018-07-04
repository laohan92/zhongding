<template>
  <div id="notaryOffice" class="page-body">
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
  name: "notaryOffice",
  data() {
    return {
      header: {
        title: "查询公证处",
        isBack: true
      },
      listData: {
        sl: {}, // 选择位置
        sd: {}, // 选择区域公证处的详细信息
        lls: true, // 位置列表是否展示
        ll: "gzcLocation", // 位置列表
        dd: "gzcData" // 详细数据
      }
    };
  },
  components: {
    headerBar,
    queryList
  }
};
</script>

