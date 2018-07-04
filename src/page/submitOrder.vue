<template>
  <div id="submitOrder" class="page-body">
    <!-- 标题栏 -->
    <header-bar :header="header"></header-bar>
    <!-- 上传模块 -->
    <div class="uploading">
      <form id="addNewsForm" :action="requestUrl+'/ordermanager/upload'" method="post" enctype="multipart/form-data">
        <div class="up-img">
          <div class="text" v-if="upImg == ''">
            <img src="../assets/images/submitOrder/uploading.png">
            <p>上传房本照片</p>
          </div>
          <img class="img" v-if="upImg != ''" :src="upImg" alt="上传图片">
          <input class="file" type="file" name="filePic" @change="upload">
          <input style="display:none;" type="text" name="userId">
        </div>
        <!-- 房主姓名 -->
        <div class="houseOwner">
          <p class="info-title">房主姓名＊</p>
          <input class="info-input mt16 w670 verify" type="text" placeholder="请输入" name="houseOwner" data-name="房主姓名">
        </div>
        <!-- 抵押物位置 -->
        <div class="location">
          <p class="info-title">抵押物位置＊</p>
          <div class="picker mt16">
            <input class="info-input w670 verify" type="text" :value="sCity.value" placeholder="省 市 区" data-name="抵押物位置">
            <span class="down-arrow"></span>
            <popup-picker :data="cityData" :confirm-text="'确认'" :columns="2" @on-change="cityPicker"></popup-picker>
            <input class="hide" name="pawnProvince" :value="sCity.pawnProvince">
            <input class="hide" name="pawnCounty" :value="sCity.pawnCounty">
          </div>
        </div>
      </form>
    </div>
    <!-- 上传按钮 -->
    <div class="submit up-btn" @click="submit">确认提交</div>
  </div>
</template>


<script>
import headerBar from "@/components/headerBar";
import PopupPicker from "vux/src/components/popup-picker";
import { requestUrl } from "@/assets/js/api.js";
import { cityData, getCity } from "@/assets/js/pickerData.js";

export default {
  name: "submitOrder",
  data() {
    return {
      header: {
        title: "评房审核系统",
        isBack: true
      },
      upImg: "",
      requestUrl: this.GLOBAL.requestUrl,
      // 城市数据
      cityData: cityData,
      sCity: {
        value: "",
        pawnProvince: "",
        pawnCounty: ""
      }
    };
  },
  methods: {
    upload: function(e) {
      var _this = this;
      var files = e.target.files[0];
      if (!files) return;
      if (files && !/\.(png|jpg|jpeg)/gi.test(files.name)) {
        this.$vux.toast.show({
          text: "请上传png或jpg格式图片!",
          type: "warn",
          time: "2000",
          width: "16em"
        });
        return;
      }
      console.log(files);
      this.upImg = this.getObjectURL(files);
    },
    submit: function() {
      var _this = this;
      if (this.upImg == "") {
        this.$vux.toast.show({
          text: "请上传图片!",
          type: "warn",
          time: "1500"
        });
        return;
      }
      // 先校验非空
      var verify = $(".verify");
      var len = verify.length;
      for (var i = 0; i < len; i++) {
        var val = verify
          .eq(i)
          .val()
          .replace(/\s/g, "");
        if (!val) {
          this.$vux.toast.text(
            "请填写" + verify.eq(i).attr("data-name"),
            "middle"
          );
          return;
        }
      }
      if (this.upImg != "") {
        this.$vux.loading.show({
          text: "Loading"
        });
        $("#addNewsForm").ajaxSubmit({
          dataType: "json",
          success: function(res) {
            _this.$vux.loading.hide();
            if (res.status == "0000") {
              _this.$vux.toast.show({
                text: res.message,
                type: "success",
                time: "1500"
              });
              _this.$router.push("/myOrder");
            } else {
              _this.$vux.toast.show({
                text: res.message,
                type: "warn",
                time: "1500"
              });
            }
          }
        });
      }
    },
    getObjectURL: function(file) {
      var url = null;
      if (window.createObjectURL != undefined) {
        // basic
        url = window.createObjectURL(file);
      } else if (window.URL != undefined) {
        // mozilla(firefox)
        url = window.URL.createObjectURL(file);
      } else if (window.webkitURL != undefined) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
      }
      return url;
    },
    // 设置程序选择弹窗
    cityPicker: function(e) {
      this.sCity.value = e[0] != "" ? getCity(e[0], e[1]) : "";
      this.sCity.pawnProvince = e[0] || "";
      this.sCity.pawnCounty = e[1] || "";
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

#submitOrder {
  padding-bottom: 20 / @fs;
  .uploading {
    background: transparent;
  }
  form {
    width: 100%;
    height: 100%;
  }
  .up-img {
    position: relative;
    width: 670 / @fs;
    height: 324 / @fs;
    background: #fff;
  }
  .up-btn {
    position: relative;
    z-index: 10;
    margin-top: 20%;
  }
  .info-input {
    display: inline-block;
    padding: 0 34 / @fs;
    border: none;
    height: 80 / @fs;
    border-radius: 8 / @fs;
    background-color: #fff;
    font-size: 32 / @fs;
    color: #333;
  }
  .hide {
    display: none;
  }
  .houseOwner {
    margin-top: 30 / @fs;
  }
  .location {
    margin-top: 30 / @fs;
  }
  // 覆盖框架样式
  .picker {
    position: relative;
    height: 80 / @fs;
  }
  .picker-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .vux-cell-box {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
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
