/**
 * @author   孙志阳
 * @date     2021年2月25日
 * @description 区域管理
 */
import { IpageList, IgetById, Iadd, Iupdate, Iremove, Imove, ItreeList, ItreeOptions } from "@/api/common";

const url = "/common/area/";

export const Api = {
  pageList: url + "pageList",
  getById: url + "getById",
  remove: url + "delete",
  add: url + "add",
  update: url + "update",
  move: url + "move",
  treeList: url + "treeList",
  treeOptions: url + "treeOptions",
};

/**
 * @author   孙志阳
 * @date
 * @description 获取分页列表数据
 */
export async function pageList(data) {
  return IpageList(Api.pageList, data);
}

/**
 * @author   孙志阳
 * @date
 * @description 获取详细信息
 */
export function getById(data) {
  return IgetById(Api.getById, data);
}

/**
 * @author   孙志阳
 * @date
 * @description 删除信息
 */
export function remove(data) {
  return Iremove(Api.remove, data);
}

/**
 * @author   孙志阳
 * @date
 * @description 增加信息
 */
export function add(data) {
  return Iadd(Api.add, data);
}

/**
 * @author   孙志阳
 * @date
 * @description 更新信息
 */
export function update(data) {
  return Iupdate(Api.update, data);
}

/**
 * @author   孙志阳
 * @date     2020-09-15
 * @description 树形区域数据列表
 */
export function treeList(data) {
  return ItreeList(Api.treeList, data);
}

/**
 * @author   孙志阳
 * @date     2020-09-15
 * @description 树形结构的选项列表
 */
export function treeOptions(data) {
  return ItreeOptions(Api.treeOptions, data);
}

export function move(data) {
  return Imove(Api.move, data);
}
