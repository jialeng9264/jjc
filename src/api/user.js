/**
 * @author   孙志阳
 * @date     2020-08-15
 * @description  用户操作
 */
import { Ipost, Iget, Iremove, Iupdate } from "@/api/common";

const url = "jjc/api/user/user/";
const Api = {
  login: url + "login",
  wxPclogin: url + "wxPcLogin",
  register: url + "register",
  getInfo: url + "getInfo",
  resetPwd: url + "resetPwd",
  retrievePwd: url + "retrievePwd",
  logout: url + "logout",
  update: url + "update",
  bindWxId: url + "bindWxId",
  deleteWxId: url + "deleteWxId",
};

/**
 * 用户登录
 * @param data
 */
export async function login(data) {
  return Ipost(Api.login, data);
}
/**
 * 用户微信PC登录
 * @param data
 */
 export async function wxPclogin(data) {
  return Ipost(Api.wxPclogin, data);
}
/**
 * 获取用户信息
 * @param accessToken 令牌
 */
export function getInfo(accessToken) {
  return Iget(Api.getInfo, { accessToken });
}

export function resetPwd(data) {
  return Iupdate(Api.resetPwd, data);
}

export function retrievePwd(data) {
  return Iupdate(Api.retrievePwd, data);
}

export function update(data) {
  return Iupdate(Api.update, data);
}

/**
 * 退出登录
 */
export function logout() {
  return Iremove(Api.logout);
}

export function register(data) {
  return Ipost(Api.register, data);
}


export function deleteWxId(data) {
  return Iremove(Api.deleteWxId,data);
}

export function bindWxId(data) {
  return Iupdate(Api.bindWxId, data);
}
