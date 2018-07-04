import Vue from "vue";
import App from "./App";
import router from "./router";
import { LoadingPlugin, ToastPlugin, AlertPlugin } from "vux";
import { setRem } from "@/assets/js/function.js";
import { requestUrl } from "@/assets/js/api.js";

// 引入公共less文件
import "./assets/less/common.less";

// 设置rem
setRem();

Vue.use(LoadingPlugin);
Vue.use(ToastPlugin);
Vue.use(AlertPlugin);

Vue.config.productionTip = false;

// 定义全局变量
Vue.prototype.GLOBAL = {
  requestUrl: requestUrl
};

new Vue({
  router,
  template: "<App/>",
  components: { App }
}).$mount("#app");
