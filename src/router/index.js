import Vue from "vue";
import Router from "vue-router";
// 引入页面
import Container from "@/page/Container"; // app主体
import Index from "@/page/index"; // 首页
import Login from "@/page/login"; // 登录页
import MyOrder from "@/page/myOrder"; // 我的订单页
import PersonalCenter from "@/page/personalCenter"; // 个人中心页
import SubmitOrder from "@/page/submitOrder"; // 提交订单页
import loginTimeout from "@/page/loginTimeout"; // 登录超时页
import OrderDetails from "@/page/orderDetails"; // 订单详情页
import CompleteInfo from "@/page/completeInfo"; // 完善信息
import CancelOrder from "@/page/cancelOrder"; // 取消订单
import NotaryOffice from "@/page/notaryOffice"; // 查公证处
import Architecture from "@/page/architecture"; // 查建委
import Credit from "@/page/credit"; // 查征信点
import Taxation from "@/page/taxation"; // 查税费
import Procedures from "@/page/procedures"; // 查手续
import QuickPrice from "@/page/quickPrice"; // 查快出价

// 引入公共方法
import { setCookie, getCookie, delCookie } from "../assets/js/function.js";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/home",
      name: "Container",
      component: Container,
      children: [
        {
          path: "/",
          component: Index
        },
        {
          path: "/myOrder",
          component: MyOrder
        },
        {
          path: "/personalCenter",
          component: PersonalCenter
        }
      ]
    },
    {
      path: "/orderDetails",
      name: "OrderDetails",
      component: OrderDetails
    },
    {
      path: "/completeInfo",
      name: "CompleteInfo",
      component: CompleteInfo
    },
    {
      path: "/submitOrder",
      name: "SubmitOrder",
      component: SubmitOrder
    },
    {
      path: "/cancelOrder",
      name: "CancelOrder",
      component: CancelOrder
    },
    {
      path: "/notaryOffice",
      name: "NotaryOffice",
      component: NotaryOffice
    },
    {
      path: "/architecture",
      name: "Architecture",
      component: Architecture
    },
    {
      path: "/credit",
      name: "Credit",
      component: Credit
    },
    {
      path: "/taxation",
      name: "Taxation",
      component: Taxation
    },
    {
      path: "/procedures",
      name: "Procedures",
      component: Procedures
    },
    {
      path: "/quickPrice",
      name: "QuickPrice",
      component: QuickPrice
    }
  ]
});

// 路由拦截当cookie内无userId时跳转至登录页面
router.beforeEach((to, from, next) => {
  let userId = getCookie("userId") || "";
  next();
  if (!userId) {
    router.push({
      path: "/login"
    });
  } else if (userId && to.name === "Login") {
    router.push({
      path: "/home"
    });
  }
});

export default router;
