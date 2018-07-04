<template>
  <div id="procedures" class="page-body">
    <!-- 标题栏 -->
    <header-bar :header="header"></header-bar>
    <!-- 房屋产权人 -->
    <div class="pull-down">
      <ul class="clear">
        <li class="identity">房屋产权人</li>
        <li>{{ isSelf.name }}
          <span class="arrow"></span>
        </li>
        <li>{{ status.name }}
          <span class="arrow"></span>
        </li>
      </ul>
      <popup-picker :data="sxList" :confirm-text="'确认'" :columns="2" @on-change="change"></popup-picker>
    </div>
    <div class="content">
      <p class="title">材料清单</p>
      <dl class="clear" v-for="(item,index) in sData">
        <dt v-if="index == 0">办&ensp;理&ensp;人：</dt>
        <dt v-else-if="index == 1">必备材料：</dt>
        <dt v-else-if="index == 2">增信材料：</dt>
        <dd>{{item}}</dd>
      </dl>
    </div>
  </div>
</template>

<script>
import headerBar from "@/components/headerBar";
import PopupPicker from "vux/src/components/popup-picker";

export default {
  name: "procedures",
  data() {
    return {
      header: {
        title: "查手续",
        isBack: true
      },
      isSelf: {
        name: "是借款人",
        value: "y"
      },
      status: {
        name: "未婚",
        value: "weihun"
      },
      sData: {},
      sxList: sxList,
      sxData: sxData
    };
  },
  created: function() {
    // 回到页面顶部
    scrollTo(0, 0);
    this.sData = getSxData(this.isSelf.value, this.status.value);
  },
  methods: {
    change: function(e) {
      this.isSelf = getSxItem(e[0]);
      this.status = getSxItem(e[1]);
      this.sData = getSxData(e[0], e[1]);
    }
  },
  components: {
    headerBar,
    PopupPicker
  }
};
</script>

<style lang="less">
@fs: 100rem;
#procedures {
  .pull-down {
    position: relative;
    height: 70 / @fs;
    background: #fff;
    font-size: 36 / @fs;
    line-height: 70 / @fs;
    .identity {
      font-size: 36 / @fs;
      color: #000;
    }
    .arrow {
      display: inline-block;
      position: relative;
      top: -6 / @fs;
      margin-left: 20 / @fs;
      width: 0;
      height: 0;
      border-left: 12 / @fs solid transparent;
      border-right: 12 / @fs solid transparent;
      border-top: 12 / @fs solid #000;
    }
    ul {
      li {
        position: relative;
        float: left;
        width: 33.33%;
        text-align: center;
        border-right: 1px solid #e4e6e9;
        box-sizing: border-box;
        font-size: 30 / @fs;
      }
      li:last-child {
        border: none;
      }
    }
  }
  .content {
    padding-bottom: 40 / @fs;
    margin: 20 / @fs auto 0;
    width: 710 / @fs;
    border-radius: 20 / @fs;
    background: #fff;
    .title {
      height: 82 / @fs;
      line-height: 82 / @fs;
      text-align: center;
      border-bottom: 1px solid #e4e6e9;
      font-size: 36 / @fs;
      color: #000;
    }
    dl {
      margin: 20 / @fs auto 0;
      width: 640 / @fs;
      line-height: 46 / @fs;
    }
    dt {
      float: left;
      width: 190 / @fs;
      font-size: 36 / @fs;
      color: #000;
    }
    dd {
      float: left;
      width: 450 / @fs;
      text-align: justify;
      font-size: 32 / @fs;
      color: #646b70;
    }
  }
  // 覆盖插件样式
  .vux-cell-box {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    overflow: hidden;
  }
  .weui-cell {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
}
</style>
