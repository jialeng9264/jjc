import { storage, tokenTableName } from "@/config/settings";

/**
 * @author: 孙志阳
 * @date:   2020-07-18
 * @description: 获取访问令牌
 */
export function getAccessToken() {
  if (storage) {
    if ("localStorage" === storage) {
      return localStorage.getItem(tokenTableName);
    } else if ("sessionStorage" === storage) {
      return sessionStorage.getItem(tokenTableName);
    } else {
      return localStorage.getItem(tokenTableName);
    }
  } else {
    return localStorage.getItem(tokenTableName);
  }
}

/**
 * @description 存储accessToken
 * @param accessToken
 * @returns {void|*}
 */
export function setAccessToken(accessToken) {
  if (storage) {
    if ("localStorage" === storage) {
      return localStorage.setItem(tokenTableName, accessToken);
    } else if ("sessionStorage" === storage) {
      return sessionStorage.setItem(tokenTableName, accessToken);
    } else {
      return localStorage.setItem(tokenTableName, accessToken);
    }
  } else {
    return localStorage.setItem(tokenTableName, accessToken);
  }
}

/**
 * @description 移除accessToken
 * @returns {void|Promise<void>}
 */
export function removeAccessToken() {
  if (storage) {
    if ("localStorage" === storage) {
      return localStorage.removeItem(tokenTableName);
    } else if ("sessionStorage" === storage) {
      return sessionStorage.clear();
    } else {
      return localStorage.removeItem(tokenTableName);
    }
  } else {
    return localStorage.removeItem(tokenTableName);
  }
}
