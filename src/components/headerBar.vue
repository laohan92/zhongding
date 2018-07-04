<template>
	<div id="headerBar">
		<span class="h-arrow" v-if="header.isBack" @click=" $router.go(-1)"></span>
		<p class="h-title" v-html="header.title"></p>
	</div>
</template>

<script>
export default {
  name: "headerBar",
  props: ["header"]
};
</script>

<style lang="less">
@fs: 100rem;
@baseUrl: "../assets/images/headerBar";

#headerBar {
  position: fixed;
  top: 0;
  z-index: 10;
  width: 100%;
  height: 96 / @fs;
  background: #fff;
  box-shadow: 0 2px 1px 0 #ececec;
  .h-arrow {
    position: absolute;
    left: 20 / @fs;
    top: 50%;
    box-sizing: content-box;
    margin-top: -39 / @fs;
    display: block;
    width: 22 / @fs;
    height: 38 / @fs;
    border: 20 / @fs transparent solid;
    background: url("@{baseUrl}/back_arrow.png") no-repeat;
    background-size: 100%;
  }
  .h-title {
    font-size: 36 / @fs;
    color: #666;
    line-height: 96 / @fs;
    text-align: center;
  }
}
</style>