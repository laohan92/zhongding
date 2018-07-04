<template>
  <div id="completeInfo" class="page-body">
    <!-- 标题栏 -->
    <header-bar :header="header"></header-bar>
    <!-- 完善信息内容 -->
    <form id="addNewsForm" class="info-wrap" :action="requestUrl+'/ordermanager/orderInfoPerfect'" method="post" enctype="multipart/form-data">
      <!-- 产权证编号 -->
      <div>
        <p class="info-title">产权证编号＊</p>
        <input class="info-input mt16 w670 verify" type="text" placeholder="请输入" name="preperRightNo" v-model="orderData.preperRightNo" data-name="产权证编号" @blur="blurFn">
      </div>
      <!-- 抵押物位置 -->
      <div class="mt64">
        <p class="info-title">抵押物位置＊</p>
        <div class="picker mt16">
          <input class="info-input w670 verify" type="text" placeholder="省 市 区" v-model="sCity" data-name="抵押物位置">
          <input class="hide" name="pawnProvince" :value="orderData.pawnProvince">
          <input class="hide" name="pawnCounty" :value="orderData.pawnCounty">
          <span class="picker-mask"></span>
        </div>
        <textarea class="info-textarea w670 verify" placeholder="详细地址" name="pawnAddress" v-model="orderData.pawnAddress" data-name="详细地址"></textarea>
      </div>
      <!-- 抵押类型 -->
      <div class="mt64">
        <p class="info-title">抵押物类型＊</p>
        <div class="picker mt16">
          <input class="info-input w670 verify" type="text" placeholder="请选择" v-model="sType" data-name="抵押物类型">
          <span class="down-arrow"></span>
          <popup-picker :data="typeData" :columns="1" :value="[orderData.pawnType]" :confirm-text="'确认'" @on-change="typePicker"></popup-picker>
          <input class="hide" name="pawnType" :value="orderData.pawnType">
        </div>
      </div>
      <!-- 建筑面积 -->
      <div class="mt64">
        <p class="info-title">建筑面积＊</p>
        <input class="info-input mt16 w230 mr32 verify" type="text" maxlength="6" placeholder="1~100000" name="pawnArea" v-model="orderData.pawnArea" data-name="建筑面积">平方米
      </div>
      <!-- 规划用途 -->
      <div class="mt64">
        <p class="info-title">规划用途＊</p>
        <div class="picker mt16">
          <input class="info-input w670 verify" type="text" placeholder="请选择" v-model="sPlan" data-name="规划用途">
          <span class="down-arrow"></span>
          <popup-picker :data="planData" :columns="1" :value="[orderData.planUse]" :confirm-text="'确认'" @on-change="planPicker"></popup-picker>
          <input class="hide" name="planUse" :value="orderData.planUse">
        </div>
      </div>
      <!-- 借款人信息 -->
      <div class="mt64">
        <p class="info-title">借款人信息＊</p>
        <div class="uploading mt16">
          <div class="text" v-if="upImg == ''">
            <img src="../assets/images/completeInfo/upload.png">
            <p>上传身份证照片</p>
          </div>
          <img class="img" v-if="upImg != ''" :src="upImg" alt="上传图片">
          <input class="file" type="file" @change="upload" name="filePic">
        </div>
        <div class="mt33 clear">
          <input class="info-input inline-block w230 f-left verify" type="text" placeholder="姓名" name="mortgagorName" v-model="orderData.mortgagorName" data-name="借款人姓名">
          <input class="info-input inline-block w420 f-right verify maxAge" type="text" placeholder="身份证号" maxlength="18" name="cardId" v-model="orderData.mortgagorCard" data-name="借款人身份证号">
        </div>
      </div>
      <!-- 添加共同借款人 -->
      <div class="add-wrap clear mt64">
        <ul class="add-list" v-if="borrowerList.length > 0">
          <li class="mt33" v-for="(item,index) in borrowerList">
            <div class="title">共同借款人{{index+1}}
              <div class="cancel" @click="cancelLi(index)">取消</div>
            </div>
            <div class="uploading mt16">
              <div class="text" v-if="!item.mortgagorUrlPub">
                <img src="../assets/images/completeInfo/upload.png">
                <p>上传身份证照片</p>
              </div>
              <img class="img" v-if="item.mortgagorUrlPub" :src="item.mortgagorUrlPub" alt="上传图片">
              <input class="file" type="file" @change="upload2" :name="'mortgagorCardPicPub_'+index" :data-index="index">
            </div>
            <div class="mt33 clear">
              <input class="info-input inline-block w230 f-left verify" type="text" placeholder="姓名" :name="'mortgagorNamePub_'+index" v-model="item.mortgagorNamePub" data-name="共同借款人信息">
              <input class="info-input inline-block w420 f-right verify maxAge" type="text" placeholder="身份证号" maxlength="18" :name="'mortgagorCardPub_'+index" v-model="item.mortgagorCardPub" data-name="共同借款人信息">
            </div>
          </li>
        </ul>
        <p class="add-btn" @click="addLi">+添加共同借款人</p>
      </div>
      <!-- 婚姻状况 -->
      <div class="mt64">
        <p class="info-title">婚姻状况＊</p>
        <div class="picker mt16">
          <input class="info-input w670 verify" type="text" v-model="sMarital" placeholder="请选择" data-name="婚姻状况">
          <span class="down-arrow"></span>
          <popup-picker :data="maritalStatus" :columns="1" :value="[orderData.marriageStatus]" :confirm-text="'确认'" @on-change="maritalPicker"></popup-picker>
          <input class="hide" name="marriageStatus" :value="orderData.marriageStatus">
        </div>
      </div>
      <!-- 客户期望贷款金额 -->
      <div class="mt64">
        <p class="info-title">客户想贷金额（万元）＊</p>
        <input ref="maxSum" class="info-input mt16 w670 verify" type="number" placeholder="请输入" name="actualLoanAmount" v-model="orderData.actualLoanAmount" data-name="想贷金额">
      </div>
      <input class="hide" name="orderId" :value="orderId">
    </form>
    <!-- 错误信息 -->
    <div class="error-text" v-html="errorText"></div>
    <!-- 提交按钮 -->
    <div class="submit" @click="submit">提交</div>
    <!-- 驳回弹窗 -->
    <div class="dialog-box" v-if="boxData.isShow">
      <div class="main">
        <div class="header">
          <p class="title">提示</p>
          <p class="message" v-if="rejectList.length == 1">该借款人此前有过订单被驳回</p>
          <p class="message" v-else-if="rejectList.length > 1">该借款人此前多个订单被驳回</p>
        </div>
        <div class="content">
          <ul>
            <li v-for="(item,index) in rejectList" :class="{'mt16':index != 0}">
              <p class="child reason" v-html="'驳回原因：<br><span>'+item.rejectReason+'</span>'"></p>
              <p class="child orderId" v-html="'驳回单号：'+item.orderId"></p>
            </li>
          </ul>
        </div>
        <div class="btns clear">
          <div class="btn lb" @click="cancel1">取消</div>
          <div class="btn rb" @click="goOn">继续提交</div>
        </div>
      </div>
    </div>
    <!-- 提交成功弹窗 -->
    <div class="dialog-box2" v-if="boxData2.isShow">
      <div class="main">
        <div class="header">提交成功</div>
        <div class="content">
          <img style="display:block;margin:0 auto;width:1.56rem;" src="../assets/images/completeInfo/success.png">
        </div>
        <div class="footer" @click="backMyOrder">确定</div>
      </div>
    </div>
  </div>
</template>

<script>
import headerBar from "@/components/headerBar";
import PopupPicker from "vux/src/components/popup-picker";
import {
  selectOrderInfo,
  chackOrderByPrNo,
  selectRefuseCount
} from "@/assets/js/api.js";
import {
  cityData,
  typeData,
  planData,
  maritalStatus,
  getCity,
  getType,
  getPlan,
  getMarital
} from "@/assets/js/pickerData.js";

export default {
  name: "myOrder",
  data() {
    return {
      header: {
        title: "完善信息",
        isBack: true
      },
      requestUrl: this.GLOBAL.requestUrl,
      // 城市数据
      cityData: cityData,
      // 抵押类型
      typeData: typeData,
      // 规划用途
      planData: planData,
      // 婚姻状况
      maritalStatus: maritalStatus,
      // 错误信息
      errorText: "",
      errorTimer: null,
      // 上传图片
      upImg: "",
      // 共同借款人列表
      borrowerList: [],
      // 订单编号
      orderId: "",
      orderData: {
        preperRightNo: "", // 产权证编号
        pawnProvince: "", // 省编码
        pawnCounty: "", // 市编码
        pawnAddress: "", // 详细地址
        pawnArea: "", // 建筑面积
        pawnType: "", // 抵押类型编码
        planUse: "", // 规划用途编码
        cardImgUrl: "",
        mortgagorName: "", // 借款人姓名
        mortgagorCard: "", // 借款人身份证号
        actualLoanAmount: "", // 贷款人想贷金额
        marriageStatus: "" // 婚姻状况
      },
      // 传递信息
      sCity: "",
      sType: "",
      sPlan: "",
      sMarital: "",
      // 驳回原因列表
      rejectList: [],
      boxData: {
        isShow: false
      },
      boxData2: {
        isShow: false
      }
    };
  },
  methods: {
    upload: function(e) {
      var _this = this;
      var files = e.target.files[0];
      if (!files) {
        return;
      }
      if (!/\.(png|jpg)/gi.test(files.name)) {
        this.$vux.toast.show({
          text: "请上传png或jpg格式图片!",
          type: "warn",
          time: "2000",
          width: "16em"
        });
        return;
      }
      this.upImg = this.getObjectURL(files);
    },
    upload2: function(e) {
      var _this = this;
      var files = e.target.files[0];
      var index = Number($(e.target).attr("data-index"));
      if (!files) {
        return;
      }
      if (!/\.(png|jpg)/gi.test(files.name)) {
        this.$vux.toast.show({
          text: "请上传png或jpg格式图片!",
          type: "warn",
          time: "2000",
          width: "16em"
        });
        return;
      }
      this.borrowerList[index].mortgagorUrlPub = this.getObjectURL(files);
    },
    // 添加li
    addLi: function() {
      if (this.borrowerList.length >= 3) {
        this.$vux.toast.show({
          text: "最多只能添加<br>3位共同借款人",
          type: "warn",
          time: "1500",
          width: "10em"
        });
        return;
      }
      this.borrowerList.push({
        mortgagorNamePub: "",
        mortgagorCardPub: "",
        mortgagorUrlPub: ""
      });
    },
    // 删除li
    cancelLi: function(index) {
      this.borrowerList.splice(index, 1);
    },
    // 关闭弹窗1
    cancel1: function() {
      this.boxData.isShow = false;
    },
    // 关闭弹窗2
    cancel2: function() {
      this.boxData2.isShow = false;
    },
    // 继续提交
    goOn: function() {
      this.submitForm();
    },
    // 提交信息
    submit: function() {
      var _this = this;
      // 先校验非空
      var verify = $(".verify");
      var len = verify.length;
      var len2 = this.borrowerList.length;
      for (var i = 0; i < len; i++) {
        var val = verify
          .eq(i)
          .val()
          .replace(/\s/g, "");
        if (!val) {
          this.errorEvent("您还有" + verify.eq(i).attr("data-name") + "未填写");
          return;
        }
      }
      // 判断是否上传借款人身份证
      if (this.upImg == "") {
        this.errorEvent("您还未上传身份证照片！");
        return;
      }
      // 判断是否上传共同借款人身份证
      for (var k = 0; k < len2; k++) {
        if (!this.borrowerList[k].mortgagorUrlPub) {
          this.errorEvent("您还未上传共同借款人身份证照片！");
          return;
        }
      }
      // 判断借款人年龄是否超限
      var maxAge, currentTime, date;
      date = new Date();
      maxAge = $(".maxAge");
      currentTime = date.getFullYear();

      for (var j = 0; j < maxAge.length; j++) {
        var age = Number(
          maxAge
            .eq(j)
            .val()
            .substring(6, 10)
        );
        if (currentTime - age > 64) {
          this.errorEvent("借款人年龄大于64岁，不可提交订单。");
          return;
        }
      }
      // 是否超出最大可贷金额
      var maxSum = this.$refs.maxSum;
      if (Number(maxSum.value) < 1 || Number(maxSum.value) > 2000) {
        this.errorEvent("客户想贷金额可输入1-2000。");
        return;
      }

      // 只有初次完善信息才查询是否存在驳回
      if (this.orderData.status == "61") {
        // 再校验是否存在驳回
        var data = {
          cardId: this.orderData.mortgagorCard
        };

        selectRefuseCount({
          target: _this,
          data: data,
          success: function(ret) {
            _this.rejectList = ret.data;
            if (_this.rejectList && _this.rejectList.length > 0) {
              _this.boxData.isShow = true;
              return;
            } else {
              _this.submitForm();
            }
          }
        });
      } else {
        _this.submitForm();
      }
    },
    // 提交表单信息
    submitForm: function(cb) {
      var _this = this;
      this.$vux.loading.show({
        text: "Loading"
      });
      // 最后提交
      $("#addNewsForm").ajaxSubmit({
        dataType: "json",
        success: function(res) {
          _this.$vux.loading.hide();
          if (res.status == "0000") {
            _this.boxData.isShow = false;
            _this.boxData2.isShow = true;
          } else {
            _this.$vux.toast.show({
              text: res.message,
              type: "warn",
              time: "1500",
              width: "10em"
            });
          }
          cb && cb();
        }
      });
    },
    // 错误提示
    errorEvent: function(msg) {
      var _this = this;
      clearTimeout(this.errorTimer);
      this.errorText = "<span class='caution'></span>" + msg;
      this.errorTimer = setTimeout(function() {
        _this.errorText = "";
      }, 2000);
    },
    // 预览图片
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
    // 返回订单列表
    backMyOrder: function() {
      this.boxData2.isShow = false;
      this.$router.push("/myOrder");
    },
    // 初始请求
    init: function() {
      var _this = this;
      // 初始请求订单信息
      var data = {
        orderId: this.orderId
      };

      selectOrderInfo({
        target: _this,
        data: data,
        success: function(ret) {
          var retData = ret.data;
          _this.orderData = retData;
          _this.sCity =
            (retData.pawnProvince &&
              getCity(retData.pawnProvince, retData.pawnCounty)) ||
            ""; // 市、区名
          _this.upImg = retData.cardImgUrl || ""; // 身份证图片
          _this.borrowerList = retData.borrower || []; // 共同借款人列表
        }
      });
    },
    // 设置程序选择弹窗
    cityPicker: function(e) {
      this.sCity = e[0] != "" ? getCity(e[0], e[1]) : "";
      this.orderData.pawnProvince = e[0] || "";
      this.orderData.pawnCounty = e[1] || "";
    },
    // 设置抵押类型选择弹窗
    typePicker: function(e) {
      this.sType = e[0] != "" ? getType(e[0]) : "";
      this.orderData.pawnType = e[0] || "";
    },
    // 设置规划用途选择弹窗
    planPicker: function(e) {
      this.sPlan = e[0] != "" ? getPlan(e[0]) : "";
      this.orderData.planUse = e[0] || "";
    },
    // 设置婚姻状况弹窗
    maritalPicker: function(e) {
      this.orderData.marriageStatus = e[0];
      this.sMarital = e[0] != "" ? getMarital(e[0]) : "";
    },
    // 输入框失去焦点事件
    blurFn: function(e) {
      if (this.orderData.status != "61") {
        return;
      }
      var _this = this;
      var preperRightNo = e.target.value;

      chackOrderByPrNo({
        target: _this,
        data: {
          preperRightNo: preperRightNo
        },
        success: function(ret) {
          _this.$vux.alert.show({
            title: "提示",
            buttonText: "知道了",
            content:
              "该房产已进行了提交<br>评房申请单号：" +
              ret.orderInfo.orderId +
              "<br>初审人：" +
              ret.orderInfo.orderReviewUserName
          });
        }
      });
    }
  },
  created: function() {
    scrollTo(0, 0);
    var _this = this;
    this.orderId = this.$route.query.orderId;
  },
  mounted: function() {
    var _this = this;
    this.init();
  },
  components: {
    headerBar,
    PopupPicker
  }
};
</script>

<style lang="less">
@fs: 100rem;
@baseUrl: "../assets/images/completeInfo";

#completeInfo {
  padding: 130 / @fs 0 165 / @fs;
  font-size: 30 / @fs;
  color: #666;
  .info-wrap {
    margin: 0 auto;
    width: 670 / @fs;
  }
  .info-title {
    line-height: 42 / @fs;
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
  .info-textarea {
    height: 200 / @fs;
    border: none;
    border-top: 1px #ececec solid;
    padding: 28 / @fs 34 / @fs;
    background: #fff;
    font-size: 32 / @fs;
    color: #333;
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
  .uploading .text img {
    width: 56 / @fs;
  }
  .hide {
    display: none;
  }
  // 添加共同借款人
  .add-wrap {
    .add-list {
      margin-bottom: 40 / @fs;
      .title {
        position: relative;
        height: 42 / @fs;
        font-size: 30 / @fs;
        color: #666;
        line-height: 42 / @fs;
        .cancel {
          position: absolute;
          right: 0;
          top: 0;
          height: 42 / @fs;
        }
      }
    }
    .add-btn {
      float: right;
      font-size: 28 / @fs;
      color: #666;
    }
  }
  // 驳回弹窗样式
  .dialog-box {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
    background: rgba(0, 0, 0, 0.3);
    .main {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 640 / @fs;
      background: #fff;
    }
    .header {
      padding: 24 / @fs 0 15 / @fs;
      text-align: center;
      border-bottom: 1px #ececec solid;
      .title {
        font-size: 34 / @fs;
        color: #ff8e34;
        line-height: 48 / @fs;
      }
      .message {
        font-size: 32 / @fs;
        color: #666;
        line-height: 45 / @fs;
      }
    }
    .content {
      padding: 70 / @fs 0 70 / @fs 32 / @fs;
      margin: 0 auto;
      width: 600 / @fs;
      max-height: 300 / @fs;
      overflow-y: auto;
      box-sizing: border-box;
      li {
        position: relative;
        font-size: 28 / @fs;
        color: #666;
        line-height: 40 / @fs;
      }
      .child {
        position: relative;
        span {
          display: block;
          padding-left: 30 / @fs;
        }
      }
      .child:before {
        position: absolute;
        top: 16 / @fs;
        left: -24 / @fs;
        display: block;
        content: "";
        width: 12 / @fs;
        height: 12 / @fs;
        background: #d8d8d8;
        border-radius: 50%;
      }
    }
    .btns {
      height: 86 / @fs;
      border-top: 1px #ececec solid;
      .btn {
        float: left;
        width: 50%;
        height: 86 / @fs;
        box-sizing: border-box;
        font-size: 34 / @fs;
        color: #ff8e34;
        text-align: center;
        line-height: 86 / @fs;
      }
      .lb {
        border-right: 1px #ececec solid;
      }
    }
  }
  // 提交成功弹窗
  .dialog-box2 {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
    background: rgba(0, 0, 0, 0.3);
    .main {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 524 / @fs;
      background: #fff;
      font-size: 34 / @fs;
      line-height: 90 / @fs;
      text-align: center;
    }
    .header {
      height: 90 / @fs;
      color: #666;
      border-bottom: 1px #ececec solid;
    }
    .content {
      padding: 70 / @fs 0;
    }
    .footer {
      height: 90 / @fs;
      color: #ff8e34;
      border-top: 1px #ececec solid;
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
  }
  .weui-cell {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
}
.weui-dialog__bd {
  font-size: 28 / @fs;
  text-align: left;
}
.weui-dialog__btn_primary {
  color: #ff7201 !important;
}
</style>
