/**
 * 资质信息
 * @author 孙志阳
 * @date 2021-9-28
 */
import { Iget, Iadd, Iremove, Iupdate } from "@/api/common";

const url = "jjc/api/user/qualification/";
const Api = {
  pageList: url + "pageList",
  getByUuid: url + "getByUuid",
  delete: url + "delete",
  add: url + "add",
  update: url + "update",
};

export function pageList(data) {
  return Iget(Api.pageList, data);
}

//根据资质信息唯一标识获取资质信息
export function getByUuid(data) {
  return Iget(Api.getByUuid, data);
}

//删除资质信息
export function remove(data) {
  return Iremove(Api.delete, data);
}

//新增资质信息
export function add(data) {
  return Iadd(Api.add, data);
}

//更新资质信息
export function update(data) {
  return Iupdate(Api.update, data);
}
