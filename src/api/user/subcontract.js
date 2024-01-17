/**
 * 分包信息
 * @author 孙志阳
 * @date 2021-9-28
 */
import { Iadd, Iget, Iremove, Iupdate } from "@/api/common";

const url = "jjc/api/user/subcontract/";
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

//根据分包信息唯一标识获取分包信息
export function getByUuid(data) {
  return Iget(Api.getByUuid, data);
}

export function get(data) {
  return Iget(Api.get, data);
}

//删除分包信息
export function remove(data) {
  return Iremove(Api.delete, data);
}

//新增分包信息
export function add(data) {
  return Iadd(Api.add, data);
}

//更新分包信息
export function update(data) {
  return Iupdate(Api.update, data);
}
