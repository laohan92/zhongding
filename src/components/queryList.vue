<template>
  <div id="queryList">
    <!-- 城区列表 -->
    <ul class="location-list clear" v-if="listData.lls">
      <li v-for="(item,index) in listData.ll" @click="select(index)"><img src="../assets/images/notaryOffice/housePropertylocation_03.png" alt="指示标">
        <span>{{item.name}}</span>
      </li>
    </ul>
    <!-- 详情 -->
    <div class="details" v-if="!listData.lls">
      <div class="pull-down">
        <span class="name">{{listData.sl.name}}</span>
        <span class="arrow"></span>
        <popup-picker :data="listData.ll" :confirm-text="'确认'" :value="[listData.sl.value]" :columns="1" @on-change="change"></popup-picker>
      </div>
      <div class="content">
        <ul v-if="listData.sd instanceof Array">
          <li v-for="item in listData.sd">
            <p class="title">{{item.title}}</p>
            <dl class="clear">
              <dt>详细地址：</dt>
              <dd>{{item.address}}</dd>
            </dl>
            <dl class="clear" v-if="item.tel">
              <dt>联系电话：</dt>
              <dd>{{item.tel}}</dd>
            </dl>
          </li>
        </ul>
        <ul v-else>
          <li>
            <p class="title">{{listData.sd.title}}</p>
            <dl class="clear">
              <dt>详细地址：</dt>
              <dd>{{listData.sd.address}}</dd>
            </dl>
            <dl class="clear">
              <dt>附近地铁：</dt>
              <dd>{{listData.sd.subway}}</dd>
            </dl>
            <dl class="clear">
              <dt>公交站点：</dt>
              <dd>{{listData.sd.bus}}</dd>
            </dl>
            <dl class="clear">
              <dt>联系电话：</dt>
              <dd>{{listData.sd.phone}}</dd>
            </dl>
            <dl class="clear">
              <dt>工作时间：</dt>
              <dd>{{listData.sd.time}}</dd>
            </dl>
            <img class="previewer-demo-img" style="display:block;margin:0.25rem auto 0;width:6.4rem;" :src="listData.sd.pic" @click="show(0)">
          </li>
        </ul>
      </div>
    </div>
    <!-- 图片放大 -->
    <div v-transfer-dom>
      <previewer :list="previewerList" ref="previewer" :options="previewerOpt"></previewer>
    </div>
  </div>
</template>

<script>
import PopupPicker from "vux/src/components/popup-picker";
import Previewer from "vux/src/components/previewer";
import TransferDom from "vux/src/directives/transfer-dom";

export default {
  name: "queryList",
  props: ["listData"],
  data() {
    return {
      previewerList: [],
      previewerOpt: {
        getThumbBoundsFn(index) {
          let thumbnail = document.querySelectorAll(".previewer-demo-img")[
            index
          ];
          let pageYScroll =
            window.pageYOffset || document.documentElement.scrollTop;
          let rect = thumbnail.getBoundingClientRect();
          return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
        }
      }
    };
  },
  created: function() {
    scrollTo(0, 0);
    var tld = this.listData;
    tld.ll = window[tld.ll];
    tld.dd = window[tld.dd];
  },
  methods: {
    select: function(index) {
      var tld = this.listData;
      tld.sl = tld.ll[index];
      tld.sd = tld.dd[tld.sl.value];
      this.previewerList.splice(0, 1, { src: tld.sd.pic });
      tld.lls = !tld.lls;
      scrollTo(0, 0);
    },
    change: function(e) {
      var tld = this.listData;
      tld.sl = this.getName(e[0]);
      tld.sd = tld.dd[e[0]];
      this.previewerList.splice(0, 1, { src: tld.sd.pic });
    },
    getName: function(a) {
      var tld = this.listData;
      var obj = {};
      for (var i = 0; i < tld.ll.length; i++) {
        if (a == tld.ll[i].value) {
          obj = tld.ll[i];
          break;
        }
      }
      return obj;
    },
    show: function(index) {
      this.$refs.previewer.show(index);
    }
  },
  directives: {
    TransferDom
  },
  components: {
    PopupPicker,
    Previewer
  }
};
</script>

<style lang="less">
@fs: 100rem;

#queryList {
  .pull-down {
    position: relative;
    height: 70 / @fs;
    background: #fff;
    font-size: 36 / @fs;
    line-height: 70 / @fs;
    text-align: center;
    .arrow {
      display: block;
      position: absolute;
      right: 40 / @fs;
      top: 50%;
      margin-top: -8 / @fs;
      width: 0;
      height: 0;
      border-left: 16 / @fs solid transparent;
      border-right: 16 / @fs solid transparent;
      border-top: 16 / @fs solid #000;
    }
  }
  .content {
    margin: 43 / @fs auto 0;
    width: 710 / @fs;
    font-size: 36 / @fs;
    color: #000;
    li {
      padding: 0 0 40 / @fs;
      margin-bottom: 20 / @fs;
      background: #fff;
      border-radius: 10 / @fs;
    }
    .title {
      height: 82 / @fs;
      line-height: 82 / @fs;
      text-align: center;
      border-bottom: 1px solid #e4e6e9;
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