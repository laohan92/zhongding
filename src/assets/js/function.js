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
