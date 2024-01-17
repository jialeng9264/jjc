/**
 * @copyright chuzhixin 1204505056@qq.com
 * @description 路由守卫，目前两种模式：all模式与intelligence模式
 */
import router from "../router";
import store from "../store";
import nprogress from "nprogress";
import "nprogress/nprogress.css";
import getPageTitle from "@/utils/pageTitle";
import { progressBar, recordRoute, routesWhiteList } from "@/config/settings";

nprogress.configure({
  easing: "ease",
  speed: 500,
  trickleSpeed: 200,
  showSpinner: false,
});

router.beforeResolve(async (to, from, next) => {
  if (progressBar) nprogress.start();

  let hasToken = store.getters["user/accessToken"];
  //发生错误时/登出
  async function errorLogout() {
    await store.dispatch("user/resetAccessToken");
    if (recordRoute) {
      next({ path: `/anon/login?redirect=${to.path}` });
    } else {
      next(`/anon/login`);
    }
    if (progressBar) nprogress.done();
  }
  if (hasToken) {
    if (to.path === "/anon") {
      next({ path: "/" });
      if (progressBar) nprogress.done();
    } else {
      const hasUser = store.getters["user/user"];
      if (hasUser && hasUser.uuid) {
        next();
      } else {
        try {
          let infoFlag = await store.dispatch("user/getInfo");
          if (infoFlag) {
            next({ ...to, replace: true });
          } else {
            router.addRoute(null);
            await errorLogout();
          }
        } catch (error) {
          await errorLogout();
        }
      }
    }
  } else {
    if (routesWhiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      await errorLogout();
    }
  }
  document.title = getPageTitle(to.meta.title);
});

router.afterEach((to,from) => {
  if (progressBar) nprogress.done();
});
