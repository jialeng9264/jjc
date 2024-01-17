/**
 * @author 孙志阳
 * @description router全局配置，如有必要可分文件抽离
 */
import Vue from "vue";
import VueRouter from "vue-router";
import { routerMode } from "@/config/settings";
import error from "./routes/error";
import head from "./routes/head";
// 不拦截页面
import anon from "./routes/anon";
// 通用页面
import common from "@/router/routes/common";
// 用户中心
import user from "@/router/routes/user";

Vue.use(VueRouter);

head.children.push(...anon);
head.children.push(...common);
head.children.push(...user);

const chat = {
  path: "/components/chat_alert",
  name: "chat_alert",
  meta: { title: "聊天" },
  component: () => import("@/components/chat_alert"),
};
const wxalert = {
  path: "/components/wx_alert",
  name: "wx_alert",
  meta: { title: "聊天" },
  component: () => import("@/components/wx_alert"),
};
const share = {
  path: "/common/share",
  name: "share",
  meta: { title: "分享" },
  component: () => import("@/views/common/share"),
};
const appPrivacy = {
  path: "/anon/privacy",
  name: "privacy",
  meta: { title: "隐私政策" },
  component: () => import("@/views/anon/appPrivacy"),
};
const lottery_h5 = {
  path: "/anon/lottery_h5",
  name: "lottery_h5",
  meta: { title: "抽奖" },
  component: () => import("@/views/anon/lottery_h5"),
};
const app_download = {
  path: "/anon/app_download",
  name: "app_download",
  meta: { title: "app下载" },
  component: () => import("@/views/anon/app_download"),
};

const routes = [];
routes.push(head);
routes.push(chat);
routes.push(wxalert);
routes.push(share);
routes.push(appPrivacy);
routes.push(lottery_h5);
routes.push(app_download);
routes.push(...error);
routes.push({
  path: "/:pathMatch(.*)",
  redirect: "/404",
});

const router = new VueRouter({
  mode: routerMode,
  scrollBehavior: () => ({
    y: 0,
  }),
  routes,
});

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

export function resetRouter() {
  router.matcher = new VueRouter({
    mode: routerMode,
    scrollBehavior: () => ({
      y: 0,
    }),
    routes,
  }).matcher;
}

export default router;
