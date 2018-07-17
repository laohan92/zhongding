<template>
  <div id="myOrder" class="page-body">
    <!-- 标题栏 -->
    <header-bar :header="header"></header-bar>
    <div class="wrapper" ref="wrapper">
      <div class="content">
        <!-- 顶部提示信息 -->
        <div class="top-tip">
          <span class="refresh-hook" v-html="loadText">下拉刷新</span>
        </div>
        <!-- 订单列表 -->
        <ul class="order-list">
          <li v-for="(item,index) in orderData" :class="{'mt40':index != 0}">
            <!-- 订单预览 -->
            <div class="order-details">
              <router-link :to="{path:'/orderDetails',query:{orderId:item.orderId}}">
                <!-- 订单信息 -->
                <div class="order-info">
                  <div class="order-no">
                    <span class="order-icon"></span>评房申请编号：{{item.orderId}}
                    <p class="order-status" :style="{color:item.statuCor}">{{item.statuVal}}</p>
                  </div>
                  <!-- 业务员自己提单 -->
                  <ul class="order-data clear" v-if="usertype == '0' && item.createUserId != userid">
                    <li>客户名：{{item.createUserName}}</li>
                    <li class="even">手机号：{{item.webuserPhone}}</li>
                    <li style="width:100%">申请日期：{{item.createTime}}</li>
                  </ul>
                  <!-- 业务员下属客户提单 -->
                  <ul class="order-data clear" v-else-if="usertype == '1'">
                    <li v-if="item.salesmanName">所属业务员：{{item.salesmanName}}</li>
                    <li class="even" v-if="item.salesmanPhone">手机号：{{item.salesmanPhone}}</li>
                    <li style="width:100%;">申请日期：{{item.createTime}}</li>
                  </ul>
                  <!-- 机构提单 -->
                  <ul class="order-data clear" v-else-if="usertype == '2'">
                    <li style="width:100%;">申请日期：{{item.createTime}}</li>
                  </ul>
                </div>
                <!-- 房屋估值 -->
                <ul class="order-data clear">
                  <li v-if="item.houseTotalAmount">房屋估值：{{item.houseTotalAmount}}万元</li>
                  <li class="even" v-if="item.loanAmountText && item.loanAmount">{{ item.loanAmountText }}：{{item.loanAmount}}万元</li>
                  <li style="width:100%;">初审员：{{item.orderReviewUserName}}&nbsp;&nbsp;{{item.userPhone}}</li>
                  <li class="tips" v-if="orderStatus.fn(item.status) === 'wait'">* 初评结果仅做参考，以下户后，业务决策可贷金额为准。</li>
                </ul>
                <!-- 房屋信息 -->
                <ul class="order-data clear" v-if="!(orderStatus.fn(item.status) === ('noValuation' || 'wait' || 'cancel'))">
                  <li>建筑面积：{{item.pawnArea}}平方</li>
                  <li class="even">借款人：{{item.mortgagorName}}</li>
                  <li style="width:100%;">具体地址：{{item.pawnAddress}}</li>
                </ul>
                <!-- 驳回、取消原因 -->
                <div class="cause" v-if="orderStatus.fn(item.status) === 'cancel'">
                  <dl>
                    <dt class="c-title">取消原因</dt>
                    <dd class="c-text" v-html="item.cancelReason"></dd>
                  </dl>
                </div>
                <div class="cause" v-else-if="orderStatus.fn(item.status) === 'reject'">
                  <dl>
                    <dt class="c-title">驳回原因</dt>
                    <dd class="c-text" v-html="item.rejectReason"></dd>
                  </dl>
                </div>
              </router-link>
              <!-- 按钮组 -->
              <div v-if="item.createUserId == userid">
                <div class="btns clear" v-if="orderStatus.fn(item.status) === 'wait'">
                  <router-link class="btn btn1" :to="{path:'/completeInfo',query:{orderId:item.orderId}}">合作,去完善信息</router-link>
                  <router-link class="btn btn2" :to="{path:'/cancelOrder',query:{orderId:item.orderId}}">取消订单</router-link>
                </div>
                <div class="btns clear" v-else-if=" (orderStatus.fn(item.status) === 'reject' && item.rejectType == '1')">
                  <router-link class="btn btn1 resubmit" :to="{path:'/completeInfo',query:{orderId:item.orderId}}">修改重新提交</router-link>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <!-- 加载按钮 -->
        <div class="load-more" v-html="loadMoreText" @click="loadMore"></div>
      </div>
    </div>
  </div>
</template>

<script>
import headerBar from "@/components/headerBar";
import BScroll from "better-scroll";
import { orderlist } from "@/assets/js/api.js";

export default {
  name: "myOrder",
  data() {
    return {
      header: {
        title: "我的订单",
        isBack: false
      },
      // 分页相关
      pageNumber: "1",
      pageSize: "10",
      loadMoreText: "点击加载更多>>",
      // 订单数据
      userid: "",
      usertype: "",
      orderData: [],
      loadText: "下拉刷新",
      scroll: Object
    };
  },
  created: function() {
    // 回到页面顶部
    scrollTo(0, 0);
    var _this = this;
    // 初始请求订单列表
    var data = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      userId: this.GLOBAL.userId
    };

    this.getList(data, function(rows) {
      for (var i = 0; i < rows.length; i++) {
        _this.orderData.push(rows[i]);
      }
    });
  },
  mounted() {
    var _this = this;
    this.$nextTick(function() {
      _this.initScroll();
    });
  },
  methods: {
    loadMore: function() {
      var _this = this;
      var data = {
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        userId: this.GLOBAL.userId
      };

      this.getList(data, function(rows) {
        for (var i = 0; i < rows.length; i++) {
          _this.orderData.push(rows[i]);
        }
      });
    },
    isLast: function(rows) {
      if (rows && rows.length == "0") {
        this.loadMoreText = "没有更多了";
      } else {
        this.pageNumber++;
        this.loadMoreText = "点击加载更多>>";
      }
    },
    getList: function(data, cb) {
      var _this = this;
      orderlist({
        target: _this,
        data: data,
        success: function(res) {
          _this.userid = res.userid;
          _this.usertype = res.usertype;
          cb && cb(res.rows);
          _this.isLast(res.rows);
        },
        complete: function() {
          _this.scroll.finishPullDown();
        }
      });
    },
    // 下拉刷新
    initScroll: function() {
      var _this = this;
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        pullDownRefresh: true
      });
      // 滑动中
      this.scroll.on("scroll", function(position) {
        if (position.y > 30) {
          _this.loadText = "释放立即刷新";
        } else {
          _this.loadText = "下拉刷新";
        }
      });
      // 滑动结束
      this.scroll.on("touchEnd", function(position) {
        if (position.y > 30) {
          _this.pageNumber = "1";
          var data = {
            pageNumber: _this.pageNumber,
            pageSize: _this.pageSize,
            userId: _this.GLOBAL.userId
          };

          _this.getList(data, function(rows) {
            _this.orderData = rows;
            _this.scroll.finishPullDown();
          });
        }
      });
    }
  },
  components: {
    headerBar
  }
};
</script>

<style lang="less">
@fs: 100rem;
@baseUrl: "../assets/images/orderDetails";

#myOrder {
  padding-bottom: 140 / @fs;
  .order-list {
    padding-top: 20 / @fs;
    .tips {
      font-size: 20 / @fs;
      color: #666;
    }
  }
  // 按钮组
  .btns {
    padding: 36 / @fs 0;
    margin: 0 auto;
    width: 670 / @fs;
    .btn {
      float: right;
      height: 66 / @fs;
      border: 1px #ff7201 solid;
      border-radius: 6 / @fs;
      font-size: 28 / @fs;
      color: #ff7201;
      line-height: 66 / @fs;
      text-align: center;
    }
    .btn1 {
      width: 228 / @fs;
    }
    .btn2 {
      margin-right: 48 / @fs;
      width: 200 / @fs;
    }
    .resubmit {
      display: block;
      margin: 0 auto;
      float: none;
    }
  }
  .c-title {
    font-size: 30 / @fs;
    color: #333;
  }
  // 加载更多
  .load-more {
    padding: 46 / @fs 0 33 / @fs;
    font-size: 28 / @fs;
    color: #666;
    text-align: center;
    line-height: 40 / @fs;
    text-decoration: underline;
  }
  .wrapper {
    position: absolute;
    top: 18 / @fs;
    left: 0;
    right: 0;
    bottom: 140 / @fs;
    .content {
      min-height: 100.1%;
    }
  }
  .top-tip {
    width: 100%;
    height: 80 / @fs;
    line-height: 80 / @fs;
    text-align: center;
  }
}
</style>
