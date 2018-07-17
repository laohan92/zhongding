//写cookies
export const setCookie = function(name, value) {
  var Days = 14;
  var exp = new Date();
  exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
  document.cookie =
    name + "=" + escape(value) + ";expires=" + exp.toGMTString();
};
//读取cookies
export const getCookie = function(name) {
  var arr,
    reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

  if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
  else return null;
};
//删除cookies
export const delCookie = function(name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null)
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
};

// 设置rem
export const setRem = function() {
  var client = document.documentElement.clientWidth;
  if (/samsung sm-n910h/.test(navigator.userAgent.toLowerCase())) {
    var s = (client * 100) / 800;
  } else {
    var s = (client * 100) / 750;
  }
  document.getElementsByTagName("html")[0].style["font-size"] = s + "px";
};

export const orderStatus = {
  arr: [
    {
      code: 0,
      type: "noValuation"
    },
    {
      code: 1,
      type: "noValuation"
    },
    {
      code: 2,
      type: "wait"
    },
    {
      code: 3,
      type: "cancel"
    },
    {
      code: 6,
      type: "reject"
    },
    {
      code: 7,
      type: ""
    },
    {
      code: 8,
      type: "reject"
    },
    {
      code: 9,
      type: ""
    },
    {
      code: 10,
      type: ""
    },
    {
      code: 11,
      type: ""
    },
    {
      code: 12,
      type: "reject"
    },
    {
      code: 13,
      type: ""
    },
    {
      code: 14,
      type: ""
    },
    {
      code: 15,
      type: "reject"
    },
    {
      code: 16,
      type: ""
    },
    {
      code: 17,
      type: ""
    },
    {
      code: 18,
      type: ""
    },
    {
      code: 99,
      type: "reject"
    }
  ],
  fn: function(code) {
    let selfArr = this.arr;
    for (let i = 0; i < selfArr.length; i++) {
      if (selfArr[i].code == code) {
        return selfArr[i].type;
      }
    }
  }
};
