export default [
  { path: "/common/ggInfo", name: "common/ggInfo", meta: { title: "公告信息" }, component: () => import("@/views/common/ggInfo.vue") },
  { path: "/common/xmInfo", name: "common/xmInfo", meta: { title: "项目信息" }, component: () => import("@/views/common/xmInfo.vue") },
  {
    path: "/common/find_bulletin",
    name: "common/find_bulletin",
    meta: { title: "查询公告" },
    component: () => import("@/views/common/find_bulletin.vue"),
  },
  {
    path: "/common/find_manager",
    name: "common/find_manager",
    meta: { title: "查项目经理" },
    component: () => import("@/views/common/find_manager.vue"),
  },
  {
    path: "/common/find_manager_info",
    name: "common/find_manager_info",
    meta: { title: "查项目经理" },
    component: () => import("@/views/common/find_manager_info.vue"),
  },
  {
    path: "/common/find_performance",
    name: "common/find_performance",
    meta: { title: "查企业" },
    component: () => import("@/views/common/find_performance.vue"),
  },
  {
    path: "/common/find_intention",
    name: "common/find_intention",
    meta: { title: "查招标采购意向" },
    component: () => import("@/views/common/find_intention.vue"),
  },
  {
    path: "/common/cedit",
    name: "common/cedit",
    meta: { title: "查企业" },
    component: () => import("@/views/common/cedit.vue"),
  },
];
