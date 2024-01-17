import Vue from "vue";
import { getInfo, login, logout, wxPclogin } from "@/api/user";
import { getAccessToken, removeAccessToken, setAccessToken } from "@/utils/accessToken";
import { resetRouter } from "@/router";
import { title, tokenName } from "@/config/settings";
import store from "@/store";

const state = {
  accessToken: getAccessToken(),
  userName: "",
  avatar: "",
  name: "",
  user: {},
  vip: 1,
  kuan: 220
};
const getters = {
  accessToken: (state) => state.accessToken,
  userName: (state) => state.userName,
  avatar: (state) => state.avatar,
  name: (state) => state.name,
  user: (state) => state.user,
  vip: (state) => state.vip,
};
const mutations = {
  setAccessToken(state, accessToken) {
    state.accessToken = accessToken;
    setAccessToken(accessToken);
  },
  setUserName(state, userName) {
    state.userName = userName;
  },
  setAvatar(state, avatar) {
    state.avatar = avatar;
  },
  setName(state, name) {
    state.name = name;
  },
  setUser(state, user) {
    state.user = user;
  },
  setVip(state, vip) {
    state.vip = vip;
  },
};
const actions = {
  setAvatar({ commit }, avatar) {
    commit("setAvatar", avatar);
  },
  setName({ commit }, name) {
    commit("setName", name);
  },
  setUser({ commit }, user) {
    commit("setUser", user);
  },
  async login({ commit }, userInfo) {
    userInfo.device = "PC";
    const result = await login(userInfo);
    const { code, msg, data } = result;
    if (code !== 200) {
      Vue.prototype.$baseAlert(msg, "系统提示");
      return result;
    }
    const accessToken = data[tokenName];
    let name = data.name;
    if (!accessToken) {
      Vue.prototype.$baseMessage("验证Token失败，请确认登录平台!", "error");
      return;
    }
    if (!name) {
      name = "";
    } else {
      name += "，";
    }
    commit("setAccessToken", accessToken);

    const hour = new Date().getHours();
    const thisTime = hour < 8 ? "早上好" : hour <= 11 ? "上午好" : hour <= 13 ? "中午好" : hour < 18 ? "下午好" : "晚上好";
    Vue.prototype.$baseNotify(`欢迎登录${title}`, `${name}${thisTime}！`);
    await store.dispatch("user/getInfo");
    return result;
  },
  async wxpc_login({ commit }, wx_code) {
    const result = await wxPclogin({ code: wx_code });
    const { code, msg, data } = result;
    if (code !== 200) {
      Vue.prototype.$baseAlert(msg, "系统提示");
      return result;
    }
    const accessToken = data[tokenName];
    let name = data.name;
    if (!accessToken) {
      Vue.prototype.$baseMessage("验证Token失败，请确认登录平台!", "error");
      return;
    }
    if (!name) {
      name = "";
    } else {
      name += "，";
    }
    commit("setAccessToken", accessToken);

    const hour = new Date().getHours();
    const thisTime = hour < 8 ? "早上好" : hour <= 11 ? "上午好" : hour <= 13 ? "中午好" : hour < 18 ? "下午好" : "晚上好";
    Vue.prototype.$baseNotify(`欢迎登录${title}`, `${name}${thisTime}！`);
    await store.dispatch("user/getInfo");
    return result;
  },
  async getInfo({ commit, state }) {
    const result = await getInfo(state.accessToken);
    const { data } = result;
    if (!data) {
      Vue.prototype.$baseMessage("验证失败，请重新登录...", "error");
      return false;
    }
    let { userName, name, avatar, uuid, vip } = data;
    if (userName && uuid && vip) {
      commit("setUserName", userName);
      commit("setAvatar", avatar);
      commit("setName", name);
      commit("setUser", data);
      commit("setVip", vip);
      return result;
    } else {
      Vue.prototype.$baseMessage("获取用户信息接口异常", "error");
      return false;
    }
  },
  async logout({ commit, dispatch }) {
    logout(state.accessToken);
    await store.dispatch("user/resetAccessToken");
    resetRouter();
  },
  //重置token
  resetAccessToken({ commit }) {
    commit("setAccessToken", "");
    commit("setUserName", "");
    commit("setAvatar", "");
    commit("setName", "");
    commit("setUser", {});
    removeAccessToken();
  },
};
export default { state, getters, mutations, actions };
