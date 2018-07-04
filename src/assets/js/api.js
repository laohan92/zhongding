let REQUEST_URL = window.location.origin + "/zrhyApp/o"; // 请求接口

const ajax = function(url, opt) {
  var url = REQUEST_URL + url || "";
  var opt = opt || {};
  var type = opt.type || "POST";
  var dataType = opt.dataType || "json";
  var data = opt.data || {};
  var success = opt.success || function() {};
  var fail = opt.fail || function() {};
  var error = opt.error || function() {};
  var complete = opt.complete || function() {};
  var target = opt.target || Object;

  target.$vux.loading.show({
    text: "Loading"
  });
  return $.ajax({
    url: url,
    type: type,
    dataType: dataType,
    data: data,
    success: function(ret) {
      if (res.status == "0000") {
        success && success();
      } else {
        target.$vux.toast.show({
          text: ret.message,
          type: "warn",
          time: "1500"
        });
        fail && fail();
      }
      // 隐藏
      target.$vux.loading.hide();
    },
    error: function() {
      // 网络错误
      target.$vux.loading.hide();
      target.$vux.toast.show({
        text: "网络异常!",
        type: "warn",
        time: "1500"
      });
      error && error();
    },
    complete: function() {
      complete && complete();
    }
  });
};

// 获取注册短信验证码
export const sendMsg = function(opt) {
  ajax("/login/sendMsg", opt);
};

// 登录系统
export const login = function(opt) {
  ajax("/login/login", opt);
};

// 退出系统
export const logout = function(opt) {
  ajax("/login/logout", opt);
};

// 订单列表
export const orderlist = function(opt) {
  ajax("/ordermanager/orderlist", opt);
};

// 个人信息
export const toManagerCenter = function(opt) {
  ajax("/ordermanager/toManagerCenter", opt);
};

// 查询订单详情
export const selectOrderInfo = function(opt) {
  ajax("/ordermanager/selectOrderInfo", opt);
};

// 查询订单是否重复提交
export const chackOrderByPrNo = function(opt) {
  ajax("/ordermanager/chackOrderByPrNo", opt);
};

// 查询订单是否被驳回
export const selectRefuseCount = function(opt) {
  ajax("/ordermanager/selectRefuseCount", opt);
};

// 请求地址
export const requestUrl = REQUEST_URL;
