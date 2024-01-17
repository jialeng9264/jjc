/**
 * @author   孙志阳
 * @date     2021年2月23日
 * @description 通用的请求
 */

import request from "@/utils/request";

/**
 * 自定义 get 方法
 * @param url 地址
 * @param data 查询参数
 */
export function Iget(url, data) {
  return request({
    url,
    method: "get",
    params: data,
  });
}

/**
 * 自定义 post 方法
 * @param url 地址
 * @param data 查询参数
 */
export function Ipost(url, data) {
  return request({
    url,
    method: "post",
    data,
  });
}

/**
 * 分页列表数据
 * @param url 地址
 * @param data 查询参数
 */
export function IpageList(url, data) {
  return request({
    url,
    method: "get",
    params: data,
  });
}

/**
 * 树形列表数据
 * @param data 查询参数
 * @returns {AxiosPromise<any>}
 */
export async function ItreeList(url, data) {
  return request({
    url,
    method: "get",
    params: data,
  });
}

/**
 * 分页列表数据
 * @param url 地址
 * @param data
 */
export function IgetById(url, data) {
  return request({
    url,
    method: "get",
    params: data,
  });
}

/**
 * 删除数据
 * @param url 地址
 * @param data 删除条件
 * @returns {AxiosPromise}
 */
export function Iremove(url, data) {
  return request({
    url,
    method: "delete",
    data,
  });
}

/**
 * 新增数据
 * @param url 地址
 * @param data 新增数据
 * @returns {AxiosPromise}
 */
export function Iadd(url, data) {
  return request({
    url,
    method: "post",
    data,
  });
}

/**
 * 更新数据
 * @param url 地址
 * @param data 更新数据
 * @returns {AxiosPromise}
 */
export function Iupdate(url, data) {
  return request({
    url,
    method: "put",
    data,
  });
}

/**
 * 排序数据
 * @param url 地址
 * @param data 排序条件
 * @returns {AxiosPromise}
 */
export function Imove(url, data) {
  return request({
    url,
    method: "put",
    data,
  });
}

/**
 * 树形选择项
 * @param url 地址
 * @param data 筛选条件
 * @returns {AxiosPromise<any>}
 * @constructor
 */
export async function ItreeOptions(url, data) {
  return request({
    url,
    method: "get",
    params: data,
  });
}

/**
 * 下拉选择项
 * @param url 地址
 * @param data 筛选条件
 * @returns {AxiosPromise<any>}
 * @constructor
 */
export async function Ioptions(url, data) {
  return request({
    url,
    method: "get",
    params: data,
  });
}
