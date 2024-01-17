import Vue from "vue";
import axios from "axios";
import {
  baseURL,
  contentType,
  debounce,
  invalidCode,
  noPermissionCode,
  kickCode,
  requestTimeout,
  hiddenCode,
  notFound,
  successCode,
  expireCode,
  title,
  tokenName,
} from "@/config/settings";
import store from "@/store";
import qs from "qs";

let loadingInstance;

/**
 * @description 判断当前url是否需要加loading
 * @param {*} config
 * @returns
 */
const needLoading = (config) => {
  let status = false;
  debounce.forEach((item) => {
    if (Vue.prototype.$baseLodash.includes(config.url, item)) {
      status = true;
    }
  });
  return !status;
};

/**
 * @description 处理code异常
 * @param {*} code
 * @param {*} msg
 */
const handleCode = (code, msg) => {
  switch (code) {
    case invalidCode:
      Vue.prototype.$baseConfirm("登录状态已过期，您可以继续留在该页面，或者重新登录", "系统提示", () => {
        store.dispatch("user/resetAccessToken").then(() => {
          location.reload();
        });
      });
      break;
    case noPermissionCode:
      Vue.prototype.$baseMessage(msg || "您没有该权限，请联系管理员授权!", "Error");
      break;
    case kickCode:
      Vue.prototype.$baseConfirm("您的账号在异地登录，如不是您本人登录，请您尽快修改密码", "系统提示", () => {
        store.dispatch("user/resetAccessToken").then(() => {
          location.reload();
        });
      });
      break;
    case hiddenCode:
    case notFound:
      break;
    case expireCode:
      break;
    default:
      console.error(msg || `后端接口${code}异常`);
      break;
  }
};

const instance = axios.create({
  baseURL,
  timeout: requestTimeout,
  headers: {
    "Content-Type": contentType,
  },
});

instance.interceptors.request.use(
  (config) => {
    if (store.getters["user/accessToken"]) {
      config.headers[tokenName] = store.getters["user/accessToken"];
    }
    //这里会过滤所有为空、0、false的key，如果不需要请自行注释
    /*if (config.data) {
      config.data = Vue.prototype.$baseLodash.pickBy(config.data, Vue.prototype.$baseLodash.identity);
    }*/
    if (contentType === "application/x-www-form-urlencoded") {
      if (config.data) {
        //  将 object 转成 字符串
        config.data = qs.stringify(config.data);
      }
    }
    if (config.method === "get") {
      const url = config.url;
      url.indexOf("?") === -1 ? (config.url = url + "?_=" + new Date().getMilliseconds()) : (config.url = url + "&_=" + new Date().getMilliseconds());
    }

    if (needLoading(config)) {
      loadingInstance = Vue.prototype.$baseColorfullLoading();
    }
    return config;
  },
  (error) => {
    return Promise.reject(error).catch(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    if (loadingInstance) {
      loadingInstance.close();
    }
    const { status, data, config } = response;
    const { code, msg } = data;
    if (code === successCode) {
      try {
        const rData = Vue.prototype.$JSE(data.data);
        try {
          data.data = JSON.parse(rData);
        } catch (e) {
          data.data = rData;
        }
      } catch (e) {
        return data;
      }
      return data;
    } else {
      handleCode(code, msg);
      console.log(title + "请求异常拦截:" + JSON.stringify({ url: config.url, code, msg }) || "Error");
      return data;
    }
  },
  (error) => {
    if (loadingInstance) {
      loadingInstance.close();
    }
    /*网络连接过程异常处理*/
    const { response, message } = error;
    if (error.response && error.response.data) {
      const { status, data } = response;
      handleCode(status, data.msg || message);
      return { code: status };
    } else {
      let { message } = error;
      if (message === "Network Error") {
        message = "后端接口连接异常";
      }
      if (message.includes("timeout")) {
        message = "后端接口请求超时";
      }
      if (message.includes("Request failed with status code")) {
        const code = message.substr(message.length - 3);
        message = "后端接口" + code + "异常";
      }
      Vue.prototype.$baseMessage(message || `后端接口未知异常`, "error");
      return {
        code: 500,
      };
    }
  }
);
export default instance;
