import Vue from "vue";
import axios from "axios";
import { baseURL, invalidCode, noPermissionCode, requestTimeout, successCode, title, tokenName } from "@/config/settings";
import store from "@/store";

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
    default:
      Vue.prototype.$baseMessage(msg || `后端接口${code}异常`, "Error");
      break;
  }
};

const upload = axios.create({
  baseURL,
  timeout: requestTimeout,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

upload.interceptors.request.use(
  (config) => {
    if (store.getters["user/accessToken"]) {
      config.headers[tokenName] = store.getters["user/accessToken"];
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

upload.interceptors.response.use(
  (response) => {
    const { data, config } = response;
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
        console.log(e);
        return data;
      }
      return data;
    } else {
      handleCode(code, msg);
      Promise.reject(title + "请求异常拦截:" + JSON.stringify({ url: config.url, code, msg }) || "Error").then(() => {});
      return data;
    }
  },
  (error) => {
    /*网络连接过程异常处理*/
    const { response, message } = error;
    if (error.response && error.response.data) {
      const { status, data } = response;
      handleCode(status, data.msg || message);
      return Promise.reject(error);
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
      Promise.reject(error).then(() => {});
      return 500;
    }
  }
);
export default upload;
