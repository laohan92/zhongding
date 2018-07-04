// 公证处相关数据
var gzcLocation = [
  { name: "东城区", value: "dongchengqu", parent: 0 },
  { name: "西城区", value: "xichengqu", parent: 0 },
  { name: "海淀区", value: "haidianqu", parent: 0 }
];
var gzcData = {
  haidianqu: [
    {
      title: "方正公证处海淀分处",
      address: "北京市海淀区知春路113号银网中心A座11层融时代办公区"
    },
    {
      title: "国信公证处海淀分处",
      address: "北京市海淀区北太平庄路18号城建大厦C座9层"
    }
  ],
  dongchengqu: [
    {
      title: "方圆公证处",
      address: "北京东城区东水井胡同5号北京INN大厦1、3、5层"
    }
  ],
  xichengqu: [
    {
      title: "方正公证处西城区分处",
      address: "北京市西城区西环广场T3办公楼"
    },
    {
      title: "中信公证处",
      address: "北京市西城区广宁伯街2号金泽大厦5层"
    }
  ]
};

// 建委相关数据
var jwLocation = [
  { name: "东城区", value: "dongchengqu", parent: 0 },
  { name: "西城区", value: "xichengqu", parent: 0 },
  { name: "朝阳区", value: "chaoyangqu", parent: 0 },
  { name: "大兴区", value: "daxingqu", parent: 0 },
  { name: "丰台区", value: "fengtaiqu", parent: 0 },
  { name: "海淀区", value: "haidianqu", parent: 0 },
  { name: "昌平区", value: "changpingqu", parent: 0 },
  { name: "房山区", value: "fangshanqu", parent: 0 },
  { name: "门头沟", value: "mentougou", parent: 0 },
  { name: "石景山", value: "shijingshan", parent: 0 },
  { name: "顺义区", value: "shunyiqu", parent: 0 },
  { name: "通州区", value: "tongzhouqu", parent: 0 },
  { name: "开发区", value: "kaifaqu", parent: 0 },
  { name: "平谷区", value: "pingguqu", parent: 0 },
  { name: "密云县", value: "miyunxian", parent: 0 },
  { name: "延庆县", value: "yanqingxian", parent: 0 },
  { name: "怀柔区", value: "huairouqu", parent: 0 }
];
var jwData = {
  dongchengqu: {
    title: "东城区房屋权属登记中心",
    address: "东城区地安门东大街88号",
    subway: "地铁6号线南锣鼓巷站E口，直行500米",
    bus: "13、42、60、118、612、623（地安门站）",
    phone: "010-84014947",
    time: "周一至周五9:00~17:00",
    pic: "./static/image/queryList/dc.jpg"
  },
  xichengqu: {
    title: "西城区房管局服务大厅",
    address: "西城区南菜园街7号院51号楼",
    subway: "4号线陶然亭站，7号线广安门站",
    bus: "56、423、夜12（大观园西门站）",
    phone: "010-63557288",
    time: "周一至周五9:00~17:00",
    pic: "./static/image/queryList/xc.jpg"
  },
  chaoyangqu: {
    title: "朝阳区房管局房屋登记大厅",
    address: "朝阳区石佛营东里128号院3号楼",
    subway: "6号线十里堡站B口出，前行100米",
    bus: "675、640（石佛营东里站），回走新生活市场路口向东直行300米",
    phone: "010-85839922",
    time: "周一至周五9:00~17:00",
    pic: "./static/image/queryList/cy.jpg"
  },
  daxingqu: {
    title: "大兴区住建委房屋登记大厅",
    address: "大兴区兴政街29号建设大厦",
    subway: "大兴线黄村西大街站下C口出，往南400米",
    bus: "兴36路（科技大厦站）",
    phone: "010-69261324",
    time: "周一至周五9:00~17:00",
    pic: "./static/image/queryList/dx.jpg"
  },
  fengtaiqu: {
    title: "丰台区房管局房地产交易权属发证中心",
    address: "丰台区丰体南路1号院8号楼丰体时代大厦",
    subway: "14号线大井站A口出，前行300米",
    bus: "458（丰台体育中心南门站），前行300米即到",
    phone: "010-69261324",
    time: "周一至周五9:00~17:00",
    pic: "./static/image/queryList/ft.jpg"
  },
  haidianqu: {
    title: "海淀区房管局登记中心",
    address: "东北旺南路27号上地办公中心A座2楼西侧",
    subway: "13号线西二旗站A1口出，乘509公交",
    bus: "509、362、656、629 （软件园南站），往西走200米",
    phone: "010-82708600",
    time: "周一至周五9:00~17:00",
    pic: "./static/image/queryList/hd.jpg"
  },
  changpingqu: {
    title: "昌平区住建委房屋登记中心",
    address: "回龙观东大街5号",
    subway: "8号线回龙观东大街站A口出,往西350米",
    bus: "441、462、558、专101（和谐家园站）",
    phone: "010-89703954",
    time: "周一至周五9:00~17:00",
    pic: "./static/image/queryList/cp.jpg"
  },
  fangshanqu: {
    title: "房山区住建委登记办",
    address: "长阳镇昊天北大街38号",
    subway: "房山线长阳站",
    bus: "907、993、646（长阳环岛南站）",
    phone: "010-81312689",
    time: "周一至周五9:00~17:00",
    pic: "./static/image/queryList/fs.jpg"
  },
  mentougou: {
    title: "门头沟区住建委权属登记科",
    address: "新桥大街48号",
    subway: "1号线苹果园站",
    bus: "26、370（新桥站）",
    phone: "010-69861022",
    time: "周一至周五9:00~17:00",
    pic: "./static/image/queryList/mtg.jpg"
  },
  shijingshan: {
    title: "石景山区行政服务中心",
    address: "八角西街66号方地大厦B座三层",
    subway: "1号线八角游乐园站",
    bus: "663、472、598、325、527（八角西街站）",
    phone: "010-68838208",
    time: "周一至周五9:00~17:00",
    pic: "./static/image/queryList/sjs.jpg"
  },
  shunyiqu: {
    title: "顺义区住建委房屋交易市场管理科",
    address: "顺义线顺义站A口出，往北300米路西",
    subway: "1号线八角游乐园站",
    bus: "",
    phone: "010-69425703",
    time: "周一至周五9:00~17:00",
    pic: "./static/image/queryList/sy.jpg"
  },
  tongzhouqu: {
    title: "通州区住建委房地产交易中心",
    address: "通州区新华南路196号（蓝山国际小区西侧）",
    subway: "八通线九棵树站，果园环岛往北100米路西",
    bus: "",
    phone: "010-52118506",
    time: "周一至周五9:00~17:00",
    pic: "./static/image/queryList/tz.jpg"
  },
  kaifaqu: {
    title: "亦庄开发区房地局服务大厅",
    address: "亦庄荣华中路10号亦城国际中心裙房2层",
    subway: "亦庄线万源街站A1口",
    bus: "",
    phone: "010-67857576",
    time: "周一至周五9:00~17:00",
    pic: "./static/image/queryList/kf.jpg"
  },
  pingguqu: {
    title: "平谷区综合行政服务中心",
    address: "平谷区林荫北街13号",
    subway: "",
    bus: "",
    phone: "010-89985388",
    time: "周一至周五9:00~17:00",
    pic: "./static/image/queryList/pg.jpg"
  },
  miyunxian: {
    title: "密云县房产交易中心",
    address: "密云县水源东路339号",
    subway: "",
    bus: "",
    phone: "010-69043359",
    time: "周一至周五9:00~17:00",
    pic: "./static/image/queryList/myx.jpg"
  },
  yanqingxian: {
    title: "延庆县城建综合服务大厅",
    address: "延庆县东外大街89号",
    subway: "",
    bus: "",
    phone: "010-69148073",
    time: "周一至周五9:00~17:00",
    pic: "./static/image/queryList/yq.jpg"
  },
  huairouqu: {
    title: "怀柔区建委",
    address: "青春路48号南2楼",
    subway: "",
    bus: "",
    phone: "010-69644628",
    time: "周一至周五9:00~17:00",
    pic: "./static/image/queryList/hr.jpg"
  }
};

// 征信点相关数据
var zxData = {
  haidianqu: [
    {
      title: "北京消费金融公司",
      address: "海淀区中关村大街22号中科大厦B座一层",
      tel: "010-62521036"
    },
    {
      title: "北京农商银行海淀支行营业部",
      address: "北京市海淀区苏州街7号",
      tel: "010-96198"
    },
    {
      title: "北京银行中关村智能银行",
      address: "北京市海淀区彩和坊路6号",
      tel: "010-60190200"
    },
    {
      title: "招商银行个贷中关村中心",
      address: "北京市海淀区北二街6号中国普天大厦一层",
      tel: "010-95555"
    },
    {
      title: "中关村国家自主创新示范区中心支行",
      address: "北京市海淀区丹棱街6号中关村金融大厦一层",
      tel: "010-88655633"
    }
  ],
  dongchengqu: [
    {
      title: "北京农商银行东城支行营业部",
      address: "北京市东城区北三环东路37号A座华世隆国际公寓一层",
      tel: "010-96198"
    },
    {
      title: "浦发银行雅宝路支行",
      address: "东城区建国门北大街8号华润大厦一层",
      tel: "010-85192337"
    },
    {
      title: "招商银行长安街支行",
      address: "北京市东城区建国门内大街11-1号",
      tel: "010-95555"
    }
  ],
  xichengqu: [
    {
      title: "中国人民银行征信中心北京分中心",
      address: "西城区月坛北京26号恒华国际商务中心A座907",
      tel: "010-68559206"
    },
    {
      title: "北京农商银行西城支行营业部",
      address: "北京市西城区复兴门外大街4号",
      tel: "010-96198"
    },
    {
      title: "招商银行个贷复兴门分中心",
      address: "北京市西城区闹市口大街1号院4号楼10E",
      tel: "010-95555"
    }
  ],
  chaoyangqu: [
    {
      title: "北京农商银行京粮支行",
      address: "朝阳区东三环中路16号京粮大厦一层",
      tel: "010-51672305"
    },
    {
      title: "北京农商银行大望路支行",
      address: "朝阳区西大望路15号院3号楼一层",
      tel: "010-87723906"
    },
    {
      title: "北京农商银行朝阳支行望京分理处",
      address: "朝阳区南湖中园130号",
      tel: "010-64759036"
    },
    {
      title: "招商银行个贷朝外大街分中心",
      address: "北京市朝阳区朝外大街26号朝外门写字中心C座1层",
      tel: "010-95555"
    },
    {
      title: "浦发银行慧忠支行",
      address: "朝阳区慧中北里214号中奥华美达酒店一层",
      tel: "010-64877966"
    }
  ],
  fengtaiqu: [
    {
      title: "北京农商银行丰台支行营业部",
      address: "丰台区西局南街101号",
      tel: "010-63842592"
    }
  ],
  daxingqu: [
    {
      title: "北京农商银行黄村支行",
      address: "大兴区黄村兴华路216号",
      tel: "010-69266642"
    }
  ],
  shijingshan: [
    {
      title: "北京农商银行石景山支行营业部",
      address: "石景山区杨庄东路78号",
      tel: "010-88707930"
    }
  ],
  huairouqu: [
    {
      title: "北京农商银行怀柔支行营业部",
      address: "北京市怀柔区迎宾北路18号支行营业部",
      tel: "010-96198"
    }
  ],
  shunyiqu: [
    {
      title: "北京农商银行顺义支行营业部",
      address: "北京市顺义区新顺大街15号",
      tel: "010-96198"
    }
  ],
  changpingqu: [
    {
      title: "北京农商银行昌平支行营业部",
      address: "北京市昌平区东环路142号",
      tel: "010-96198"
    }
  ],
  mentougou: [
    {
      title: "北京农商银行门头沟支行营业部",
      address: "北京市门头沟区滨河路115号滨河大厦一层",
      tel: "010-96198"
    }
  ],
  fangshanqu: [
    {
      title: "北京农商银行房山支行营业部",
      address: "北京市房山区良乡长虹东路1号",
      tel: "010-96198"
    }
  ],
  pingguqu: [
    {
      title: "北京农商银行平谷支行营业部",
      address: "北京市平谷区新平北路平了街8号",
      tel: "010-96198"
    }
  ],
  miyunxian: [
    {
      title: "北京农商银行密云支行营业部",
      address: "北京市密云县鼓楼南大街25号",
      tel: "010-96198"
    }
  ],
  yanqingxian: [
    {
      title: "北京农商银行延庆支行营业部",
      address: "北京市延庆县东外大街109号",
      tel: "010-96198"
    }
  ],
  tongzhouqu: [
    {
      title: "北京农商银行通州支行",
      address: "通州区梨园北京63、65号",
      tel: "010-69540796"
    }
  ],
  kaifaqu: [
    {
      title: "浦发银行经济技术开发区支行",
      address: "北京经济技术开发区天华路天华园二里二区19号楼大雄商业中心1层",
      tel: "010-67890778"
    }
  ]
};

// 手续相关数据
var sxList = [
  { name: "是借款人", value: "y", parent: 0 },
  { name: "不是借款人", value: "n", parent: 0 },
  { name: "未婚", value: "weihun", parent: "y" },
  { name: "已婚", value: "yihun", parent: "y" },
  { name: "再婚", value: "zaihun", parent: "y" },
  { name: "离异", value: "liyi", parent: "y" },
  { name: "丧偶", value: "sangou", parent: "y" },
  { name: "未婚", value: "weihun", parent: "n" },
  { name: "已婚", value: "yihun", parent: "n" },
  { name: "再婚", value: "zaihun", parent: "n" },
  { name: "离异", value: "liyi", parent: "n" },
  { name: "丧偶", value: "sangou", parent: "n" }
];

var sxData = {
  y: {
    weihun: [
      "借款人本人",
      "借款人身份证原件，房产证原件，个人征信报告详细版，户口本原件，单身证明",
      "个人流水，对公流水，工作收入证明，公司执照，房屋产权人及爱人其他房产，车产，其他资产"
    ],
    yihun: [
      "借款人夫妻",
      "借款人夫妻身份证原件，借款人夫妻户口本原件，借款人夫妻个人征信报告详细版，房产证原件",
      "个人流水，对公流水，工作收入证明，公司执照，房屋产权人及爱人其他房产，车产，其他资产"
    ],
    zaihun: [
      "借款人夫妻",
      "借款人夫妻身份证原件，房产证原件，借款人夫妻户口本原件，借款人夫妻双方征信报告详细版，借款人夫妻结婚证，借款人离婚证明或法院判决书",
      "个人流水，对公流水，工作收入证明，公司执照，房屋产权人及爱人其他房产，车产，其他资产"
    ],
    liyi: [
      "借款人本人",
      "借款人身份证原件，借款人户口本原件，借款人本人离婚证/法院判决书，房产证原件，借款人征信报告详细版",
      "个人流水，对公流水，工作收入证明，公司执照，房屋产权人及爱人其他房产，车产，其他资产"
    ],
    sangou: [
      "借款人本人",
      "借款人身份证原件，房产证原件，借款人户口本原件，死亡证明，借款人配偶死亡后期间婚姻状况证明，借款人结婚证，借款人征信报告详细版",
      "个人流水，对公流水，工作收入证明，公司执照，房屋产权人及爱人其他房产，车产，其他资产"
    ]
  },
  n: {
    weihun: [
      "房屋产权人，借款人本人",
      "借款人个人征信报告详细版，借款人身份证原件，房屋产权人身份证原件，房屋产权人户口本原件，房屋产权人征信报告详细版，房屋产权人单身证明，房产证原件",
      "个人流水，对公流水，工作收入证明，公司执照，房屋产权人及爱人其他房产，车产，其他资产"
    ],
    yihun: [
      "借款人本人，房屋产权人夫妻",
      "借款人个人征信报告详细版，借款人身份证原件，房屋产权人夫妻双方身份证原件，房屋产权人夫妻双方户口本原件，房屋产权人夫妻双方征信报告详细版，房屋产权人结婚证原件，房产证原件",
      "个人流水，对公流水，工作收入证明，公司执照，房屋产权人及爱人其他房产，车产，其他资产"
    ],
    zaihun: [
      "借款人本人，房屋产权人夫妻",
      "借款人个人征信报告详细版，借款人身份证原件，房屋产权人夫妻双方身份证原件，房屋产权人夫妻双方户口本原件，房屋产权人夫妻双方征信报告详细版，房屋产权人结婚证原件，房屋产权人离婚证或法院判决书，房产证原件",
      "个人流水，对公流水，工作收入证明，公司执照，房屋产权人及爱人其他房产，车产，其他资产"
    ],
    liyi: [
      "借款人本人，房屋产权人",
      "借款人个人征信报告详细版，房产证原件，借款人身份证原件，房屋产权人身份证原件，房屋产权人离婚证/法院判决书，房屋产权人户口本原件，房屋产权人征信报告详细版",
      "个人流水，对公流水，工作收入证明，公司执照，房屋产权人及爱人其他房产，车产，其他资产"
    ],
    sangou: [
      "借款人本人，房屋产权人",
      "借款人个人征信报告详细版，房产证原件，借款人身份证原件，房屋产权人身份证原件，房屋产权人户口本原件，房屋产权人征信报告详细版，死亡证明，房屋产权人配偶死亡后的婚姻状况证明",
      "个人流水，对公流水，工作收入证明，公司执照，房屋产权人及爱人其他房产，车产，其他资产"
    ]
  }
};

function getSxItem(value) {
  var obj = {};
  for (var i = 0; i < sxList.length; i++) {
    if (sxList[i].value == value) {
      obj = sxList[i];
      break;
    }
  }
  return obj;
}

function getSxData(a, b) {
  var _a = sxData[a] || {};
  return _a[b];
}
