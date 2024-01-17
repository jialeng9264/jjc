const routes = {
  path: "/",
  redirect: "home",
  component: () => import("@/views/index"),
  children: [
    { path: "/home", name: "home", meta: { title: "首页" }, component: () => import("@/views/home/index.vue") },
    { path: "/zbxm", name: "zbxm", meta: { title: "公告" }, component: () => import("@/views/zbxm/index.vue") },
    { path: "/zbxm/zbxm", name: "zbxm/zbxm", meta: { title: "立项/采购项目" }, component: () => import("@/views/zbxm/zbxm.vue") },
    { path: "/zbxm/yffzb", name: "zbxm/yffzb", meta: { title: "依法非招标" }, component: () => import("@/views/zbxm/yffzb.vue") },
    { path: "/zzgx", name: "zzgx", meta: { title: "资质共享" }, component: () => import("@/views/zzgx/index.vue") },
    { path: "/fbxx", name: "fbxx", meta: { title: "分包信息" }, component: () => import("@/views/fbxx/index.vue") },
    { path: "/zxzx", name: "zxzx", meta: { title: "最新资讯" }, component: () => import("@/views/zxzx/index.vue") },
    { path: "/hylt", name: "hylt", meta: { title: "行业论坛" }, component: () => import("@/views/hylt/index.vue") },
    { path: "/bszz", name: "bszz", meta: { title: "标书制作" }, component: () => import("@/views/bszz/index.vue") },
    { path: "/winning", name: "winning", meta: { title: "中标课堂" }, component: () => import("@/views/winning/index.vue") },
    { path: "/member", name: "member", meta: { title: "成为会员" }, component: () => import("@/views/member/index.vue") },
  ],
};

export default routes;
