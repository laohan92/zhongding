<template>
	<div id="iframe" class="page-body">
		<!-- 标题栏 -->
		<header-bar :header="header"></header-bar>
		<iframe id="show-iframe"  frameborder=0 scrolling=auto src="http://m.fang.com/fangjia/bj/accurate.html"></iframe>
	</div>
</template>

<script>
import headerBar from "@/components/headerBar";

export default {
  name: "iframe",
  data() {
    return {
      header: {
        title: "房天下",
        isBack: true
      }
    };
  },
  mounted: function() {
    var oIframe = document.getElementById("show-iframe");
    var deviceWidth = document.documentElement.clientWidth;
    var deviceHeight = document.documentElement.clientHeight;
    oIframe.style.width = deviceWidth + "px";
    oIframe.style.height = deviceHeight + "px";
  },
  components: {
    headerBar
  }
};
</script>
<style lang="less">
#iframe {
  width: 100%;
  height: 100%;
}
</style>
