<template>
  <div id="orderDetails" class="page-body">
    <!-- 标题栏 -->
    <header-bar :header="header"></header-bar>
    <!-- 订单详情 -->
    <div class="order-details">
      <!-- 订单信息 -->
      <div class="order-info">
        <div class="order-no">
          <span class="order-icon"></span>评房申请编号：{{orderData.orderId}}
          <p class="order-status" :style="{color:orderData.statuCor}">{{orderData.statuVal}}</p>
        </div>
        <!-- 业务员自己提单 -->
        <ul class="order-data clear" v-if="usertype == '0' && orderData.createUserId != userid">
          <li>客户名：{{orderData.createUserName}}</li>
          <li class="even">手机号：{{orderData.webuserPhone}}</li>
          <li style="width:100%">申请日期：{{orderData.createTime}}</li>
        </ul>
        <!-- 业务员下属客户提单 -->
        <ul class="order-data clear" v-else-if="usertype == '1'">
          <li v-if="orderData.salesmanName">所属业务员：{{orderData.salesmanName}}</li>
          <li class="even" v-if="orderData.salesmanPhone">手机号：{{orderData.salesmanPhone}}</li>
          <li style="width:100%;">申请日期：{{orderData.createTime}}</li>
        </ul>
        <!-- 机构提单 -->
        <ul class="order-data clear" v-else-if="usertype == '2'">
          <li style="width:100%;">申请日期：{{orderData.createTime}}</li>
        </ul>
      </div>
      <!-- 初审员信息 -->
      <ul class="order-data clear">
        <li style="width:100%;">初审员：{{orderData.orderReviewUserName}}&nbsp;&nbsp;{{orderData.userPhone}}</li>
      </ul>
      <!-- 驳回、取消原因 -->
      <div class="cause" v-if="orderStatus.fn(orderData.status) === 'cancel'">
        <dl>
          <dt class="c-title">取消原因</dt>
          <dd class="c-text" v-html="orderData.cancelReason"></dd>
        </dl>
      </div>
      <div class="cause" v-else-if="orderStatus.fn(orderData.status) === 'reject'">
        <dl>
          <dt class="c-title">驳回原因</dt>
          <dd class="c-text" v-html="orderData.rejectReason"></dd>
        </dl>
      </div>
      <!-- 房产证 -->
      <div class="house-info">
        <p class="name">房产证</p>
        <div class="photograph">
          <img class="previewer-demo-img" :src="orderData.propertyImgUrl" @click="show(0)" alt="房产证图片">
        </div>
        <p class="housingEstate" v-if="orderData.housingEstate">小区名称：{{orderData.housingEstate}}</p>
        <!-- 展示房产证详细信息 -->
        <ul class="info-list" v-if=" !(orderStatus.fn(orderData.status) === ('noValuation' || 'wait' || 'cancel') )">
          <li>产权证编号：{{orderData.preperRightNo}}</li>
          <li class="mt40">抵押物位置：{{getCity(orderData.pawnProvince,orderData.pawnCounty)}}</li>
          <li class="mt40">具体地址：{{orderData.pawnAddress}}</li>
          <li class="mt40">建筑面积：{{orderData.pawnArea}}平米</li>
          <li class="mt40">规划用途：{{getPlan(orderData.planUse)}}</li>
          <li class="mt40">借款人：{{orderData.mortgagorName}}</li>
          <li class="mt40" v-for="b in orderData.borrower">共同借款人：{{b.mortgagorNamePub}}&nbsp;&nbsp;{{b.mortgagorPhonePub}}</li>
          <li class="mt40">客户想贷：{{orderData.actualLoanAmount}}万元</li>
          <li class="mt40" v-if="orderData.houseTotalAmount">房屋估值：{{orderData.houseTotalAmount}}万元</li>
          <li class="even mt40" v-if=" orderData.loanAmountText && orderData.loanAmount">{{ orderData.loanAmountText }}：{{orderData.loanAmount}}万元</li>
          <li class="tips" v-if="orderStatus.fn(orderData.status) === 'wait'">* 初评结果仅做参考，以下户后，业务决策可贷金额为准。</li>
        </ul>
      </div>
      <!-- 按钮组 -->
      <div v-if="orderData.createUserId == userid">
        <div class="btns clear" v-if="orderStatus.fn(orderData.status) === 'wait'">
          <router-link class="btn l-btn" :to="{path:'/cancelOrder',query:{orderId:orderData.orderId}}">取消订单</router-link>
          <router-link class="btn" :to="{path:'/completeInfo',query:{orderId:orderData.orderId}}">合作,去完善信息</router-link>
        </div>
        <div class="btns clear" v-else-if=" (orderStatus.fn(orderData.status) === 'reject' && orderData.rejectType == '1')">
          <router-link class="btn btn1 resubmit" :to="{path:'/completeInfo',query:{orderId:orderData.orderId}}">修改重新提交</router-link>
        </div>
      </div>
    </div>
    <!-- 图片放大 -->
    <div v-transfer-dom>
      <previewer :list="previewerList" ref="previewer" :options="previewerOpt"></previewer>
    </div>
  </div>
</template>

<script>
import headerBar from "@/components/headerBar";
import Previewer from "vux/src/components/previewer";
import TransferDom from "vux/src/directives/transfer-dom";
import { selectOrderInfo } from "@/assets/js/api.js";
import { getCity, getPlan } from "@/assets/js/pickerData.js";

export default {
  name: "orderDetails",
  data() {
    return {
      header: {
        title: "订单详情",
        isBack: true
      },
      userid: "",
      usertype: "",
      orderId: "",
      orderData: {},
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
    // 初始请求订单信息
    this.init();
  },
  methods: {
    getCity: getCity,
    getPlan: getPlan,
    show: function(index) {
      this.$refs.previewer.show(index);
    },
    init: function() {
      var _this = this;
      this.orderId = this.$route.query.orderId;
      var data = {
        orderId: this.orderId,
        userId: this.GLOBAL.userId
      };

      selectOrderInfo({
        target: _this,
        data: data,
        success: function(res) {
          _this.userid = res.userid;
          _this.usertype = res.usertype;
          _this.orderData = res.data;
          _this.previewerList.splice(0, 1, { src: res.data.propertyImgUrl });
        }
      });
    }
  },
  directives: {
    TransferDom
  },
  components: {
    headerBar,
    Previewer
  }
};
</script>

<style lang="less">
@fs: 100rem;
@baseUrl: "../assets/images/orderDetails";

#orderDetails {
  padding: 118 / @fs 0 120 / @fs;
  // 公用样式
  .mt40 {
    margin-top: 40 / @fs;
  }
  // 房产证信息
  .house-info {
    padding: 34 / @fs 0 60 / @fs;
    margin: 0 auto;
    width: 670 / @fs;
    .name {
      font-size: 30 / @fs;
      font-weight: 600;
      color: #333;
      line-height: 42 / @fs;
    }
    .photograph {
      margin-top: 28 / @fs;
      width: 100%;
      height: auto;
      background: #d8d8d8;
      img {
        display: block;
        width: 100%;
      }
    }
    .housingEstate {
      margin: 40 / @fs 0 0;
      font-size: 28 / @fs;
      line-height: 40 / @fs;
      color: #999;
    }
  }
  .info-list {
    margin-top: 40 / @fs;
    font-size: 28 / @fs;
    color: #999;
    line-height: 40 / @fs;
    .tips {
      font-size: 20 / @fs;
      color: #666;
    }
  }
  // 按钮组
  .btns {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 98 / @fs;
    background: #fff;
    border-top: 1px #ebebeb solid;
    .btn {
      float: left;
      width: 50%;
      height: 100%;
      box-sizing: border-box;
      font-size: 30 / @fs;
      color: #ff7201;
      line-height: 98 / @fs;
      text-align: center;
    }
    .l-btn {
      border-right: 1px #ebebeb solid;
    }
    .resubmit {
      display: block;
      margin: 0 auto;
      float: none;
    }
  }
  .b-padding {
    height: 100 / @fs;
  }
}
</style>
