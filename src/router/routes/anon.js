export default [
  {
    path: "/anon/login",
    name: "login",
    meta: { title: "登录" },
    component: () => import("@/views/anon/login"),
  },
  {
    path: "/anon/register",
    name: "register",
    meta: { title: "注册" },
    component: () => import("@/views/anon/register"),
  },
  {
    path: "/anon/info",
    name: "info",
    meta: { title: "信息详情" },
    component: () => import("@/views/anon/info"),
  },
  {
    path: "/anon/forget",
    name: "forget",
    meta: { title: "找回密码" },
    component: () => import("@/views/anon/forget"),
  },
  {
    path: "/anon/agreement",
    name: "agreement",
    meta: { title: "服务协议" },
    component: () => import("@/views/anon/agreement"),
  },
  {
    path: "/anon/lottery",
    name: "lottery",
    meta: { title: "抽奖" },
    component: () => import("@/views/anon/lottery"),
  },
  // {
  //   path: "/anon/privacy",
  //   name: "privacy",
  //   meta: { title: "隐私政策" },
  //   component: () => import("@/views/anon/privacy"),
  // },
];
