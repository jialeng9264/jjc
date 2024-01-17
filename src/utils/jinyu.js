import { loadingText, messageDuration, title, baseURL } from "@/config/settings";
import * as lodash from "lodash";
import { Loading, Message, MessageBox, Notification } from "element-ui";
import store from "@/store";
import { getAccessToken } from "@/utils/accessToken";
import dayjs from "dayjs";
import { $decryption,$decryption2 } from "./sm2";
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

const accessToken = store.getters["user/accessToken"];

// eslint-disable-next-line no-unused-vars
const install = (Vue, opts = {}) => {
  /**
   * 全局访问令牌
   * @returns {*|string}
   */
  Vue.prototype.$baseAccessToken = () => {
    return accessToken || getAccessToken();
  };

  /**
   * 全局地址
   */
  Vue.prototype.$baseUrl = (() => {
    return baseURL;
  })();
  /**
   * 全局标题
   * @type {string}
   */
  Vue.prototype.$baseTitle = (() => {
    return title;
  })();
  /**
   * 全局加载层
   * @param text 提示内容
   * @returns
   */
  Vue.prototype.$baseLoading = (text) => {
    let loading;
    loading = Loading.service({
      lock: false,
      text: text || loadingText,
      background: "hsla(0,0%,100%,.8)",
    });
    return loading;
  };

  /* 全局多彩加载层 */
  Vue.prototype.$baseColorfullLoading = (index, text) => {
    let loading;
    loading = Loading.service({
      lock: false,
      text: text || loadingText,
      spinner: "dots-loader",
      background: "hsla(0,0%,100%,.8)",
    });
    return loading;
  };

  /**
   * 全局Message
   * @param message 提示内容
   * @param type 状态 （,success,warning,error）
   */
  Vue.prototype.$baseMessage = (message, type) => {
    Message({
      offset: 60,
      showClose: true,
      message: message,
      type: type,
      dangerouslyUseHTMLString: true,
      duration: messageDuration,
    });
  };

  /**
   * 全局Alert
   * @param content 提示内容
   * @param title 标题
   * @param callback 回调函数
   */
  Vue.prototype.$baseAlert = (content, title, callback) => {
    MessageBox.alert(content, title || "温馨提示", {
      confirmButtonText: "确定",
      dangerouslyUseHTMLString: true,
      callback: (action) => {
        if (callback) {
          callback();
        }
      },
    });
  };

  /**
   *
   * @param content 询问内容
   * @param title 标题
   * @param callback1 确定的回调函数
   * @param callback2 取消的回调函数
   */
  Vue.prototype.$baseConfirm = (content, title, callback1, callback2) => {
    MessageBox.confirm(content, title || "温馨提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      closeOnClickModal: false,
      type: "warning",
    })
      .then(() => {
        if (callback1) {
          callback1();
        }
      })
      .catch(() => {
        if (callback2) {
          callback2();
        }
      });
  };

  /**
   * 全局Notification
   * @param message 提示内容
   * @param title 标题
   * @param type 通知类型（success, warning, info, error）
   * @param position 位置（top-right、top-left、bottom-right、bottom-left）
   */
  Vue.prototype.$baseNotify = (message, title, type, position) => {
    Notification({
      title: title,
      message: message,
      position: position || "top-right",
      type: type || "success",
      duration: messageDuration,
    });
  };

  /* 全局lodash */
  Vue.prototype.$baseLodash = lodash;

  /* 全局事件总线 */
  Vue.prototype.$baseEventBus = new Vue();

  /** 全局时间js */
  Vue.prototype.$baseDayjs = dayjs;

  Vue.prototype.$JSE = (data) => {
    const result = $decryption(data);
    return result;
  };
  Vue.prototype.$JSE2 = $decryption2;
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default install;
