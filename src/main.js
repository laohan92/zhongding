import Vue from "vue";
import App from "./App";
import router from "./router";
import { LoadingPlugin, ToastPlugin, AlertPlugin } from "vux";
import { setRem, orderStatus } from "@/assets/js/function.js";

// 引入公共less文件
import "./assets/less/common.less";

// 设置rem
setRem();

Vue.use(LoadingPlugin);
Vue.use(ToastPlugin);
Vue.use(AlertPlugin);

Vue.config.productionTip = false;

Vue.prototype.orderStatus = orderStatus;

new Vue({
  router,
  template: "<App/>",
  components: { App }
}).$mount("#app");
