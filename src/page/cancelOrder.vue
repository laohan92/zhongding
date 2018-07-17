<template>
  <div id="cancelOrder" class="page-body">
    <!-- 标题栏 -->
    <header-bar :header="header"></header-bar>
    <!-- 请输入取消原因 -->
    <div class="main">
      <p class="title">请输入取消原因</p>
      <ul class="list">
        <li>
          <label><input class="checkbox" type="checkbox" name="vehicle" value="可贷金额不符合客户预期" />
            <span class="text">可贷金额不符合客户预期</span>
          </label>
        </li>
      </ul>
      <textarea id="textarea" class="cancelReason" name="cancelReason"></textarea>
      <div class="submit" @click="submit">确认提交</div>
    </div>
  </div>
</template>

<script>
import headerBar from "@/components/headerBar";

export default {
  name: "orderDetails",
  data() {
    return {
      header: {
        title: "取消订单",
        isBack: true
      },
      orderId: "",
      cancelReason: "",
      rSwitch: true
    };
  },
  created: function() {
    this.orderId = this.$route.query.orderId;
  },
  methods: {
    submit: function() {
      var _this = this;
      var textarea = $("#textarea");
      if (!this.rSwitch) {
        return;
      }
      $("input:checkbox[name=vehicle]:checked").each(function(index, ele) {
        _this.cancelReason += "<br>" + $(ele).val();
      });
      this.cancelReason += "<br>" + textarea.val();
      this.rSwitch = false;
      // 取消订单
      var data = {
        orderId: this.orderId,
        userId: this.GLOBAL.userId,
        cancelReason: encodeURI(this.cancelReason)
      };
      $.ajax({
        url: g_requestUrl + "/ordermanager/cancelorder",
        type: "POST",
        data: data,
        dataType: "json",
        success: function(res) {
          if (res.status == "0000") {
            _this.$vux.toast.show({
              text: res.message,
              type: "success",
              time: "1500"
            });
            _this.$router.push("/myOrder");
          } else {
            alert(res.message);
          }
          _this.rSwitch = true;
        },
        error: function() {
          _this.$vux.toast.show({
            text: "网络异常!",
            type: "warn",
            time: "1500"
          });
          _this.rSwitch = true;
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

#cancelOrder {
  .main {
    padding: 30 / @fs 0 58 / @fs;
    background: #fff;
  }
  .title {
    width: 634 / @fs;
    margin: 0 auto;
    font-size: 34 / @fs;
    color: #666;
    line-height: 48 / @fs;
  }
  .list {
    width: 634 / @fs;
    margin: 30 / @fs auto 0;
    font-size: 28 / @fs;
    color: #666;
    line-height: 40 / @fs;
    .checkbox {
      position: relative;
      top: 4 / @fs;
      margin-right: 12 / @fs;
    }
  }
  .cancelReason {
    display: block;
    padding: 20 / @fs;
    margin: 38 / @fs auto 0;
    border: 1px #ececec solid;
    width: 634 / @fs;
    height: 280 / @fs;
    box-sizing: border-box;
  }
}
</style>
