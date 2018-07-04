// 城市数据
export const cityData = [
  { value: "01", parent: 0, name: "北京市" },
  { value: "02", parent: 0, name: "上海市" },
  { value: "0101", parent: "01", name: "东城区" },
  { value: "0102", parent: "01", name: "西城区" },
  { value: "0103", parent: "01", name: "朝阳区" },
  { value: "0104", parent: "01", name: "丰台区" },
  { value: "0105", parent: "01", name: "石景山区" },
  { value: "0106", parent: "01", name: "海淀区" },
  { value: "0107", parent: "01", name: "门头沟区" },
  { value: "0108", parent: "01", name: "房山区" },
  { value: "0109", parent: "01", name: "通州区" },
  { value: "0110", parent: "01", name: "顺义区" },
  { value: "0111", parent: "01", name: "昌平区" },
  { value: "0112", parent: "01", name: "大兴区" },
  { value: "0113", parent: "01", name: "怀柔区" },
  { value: "0114", parent: "01", name: "平谷区" },
  { value: "0115", parent: "01", name: "密云区" },
  { value: "0116", parent: "01", name: "延庆区" },
  { value: "0201", parent: "02", name: "黄浦区" },
  { value: "0202", parent: "02", name: "卢湾区" },
  { value: "0203", parent: "02", name: "徐汇区" },
  { value: "0204", parent: "02", name: "长宁区" },
  { value: "0205", parent: "02", name: "静安区" },
  { value: "0206", parent: "02", name: "闸北区" },
  { value: "0207", parent: "02", name: "虹口区" },
  { value: "0208", parent: "02", name: "杨浦区" },
  { value: "0209", parent: "02", name: "宝山区" },
  { value: "0210", parent: "02", name: "闵行区" },
  { value: "0211", parent: "02", name: "嘉定区" },
  { value: "0212", parent: "02", name: "浦东新区" },
  { value: "0213", parent: "02", name: "青浦区" },
  { value: "0214", parent: "02", name: "松江区" },
  { value: "0215", parent: "02", name: "金山区" },
  { value: "0216", parent: "02", name: "南汇区" },
  { value: "0217", parent: "02", name: "奉贤区" },
  { value: "0218", parent: "02", name: "普陀区" },
  { value: "0219", parent: "02", name: "崇明县" }
];
// 抵押类型
export const typeData = [
  { value: "1", name: "一抵" },
  { value: "2", name: "二抵" },
  { value: "3", name: "一抵转单" },
  { value: "4", name: "二抵转单" },
  { value: "0", name: "其他" }
];
// 规划用途
export const planData = [
  { value: "0", name: "住宅" },
  { value: "1", name: "公寓" },
  { value: "2", name: "别墅" }
];
// 婚姻状况
export const maritalStatus = [
  { value: "0", name: "未婚" },
  { value: "1", name: "已婚" },
  { value: "2", name: "离异" },
  { value: "3", name: "丧偶" },
  { value: "4", name: "再婚" }
];
// 获取城市信息
export const getCity = function(a, b) {
  var str = "",
    aa = "",
    bb = "";
  for (var i = 0; i < cityData.length; i++) {
    if (cityData[i].value == a) {
      aa = cityData[i].name;
    } else if (cityData[i].value == b) {
      bb = cityData[i].name;
    }
  }
  str = aa + " " + bb;
  return str;
};
// 获取抵押类型
export const getType = function(a) {
  var str = "";
  for (var i = 0; i < typeData.length; i++) {
    if (typeData[i].value == a) {
      str = typeData[i].name;
    }
  }
  return str;
};
// 获取规划用途
export const getPlan = function(a) {
  var str = "";
  for (var i = 0; i < planData.length; i++) {
    if (a == planData[i].value) {
      str = planData[i].name;
    }
  }
  return str;
};
// 获取婚姻状况
export const getMarital = function(a) {
  var str = "";
  for (var i = 0; i < maritalStatus.length; i++) {
    if (maritalStatus[i].value == a) {
      str = maritalStatus[i].name;
    }
  }
  return str;
};
