/**
 * 关注表
 * @author 孙志阳
 * @date 2021-10-12
 */
import { Iadd, Iget, Iremove } from "@/api/common";

const url = "jjc/api/user/follow/";
const Api = {
  pageList: url + "pageList",
  listByUser: url + "listByUser",
  add: url + "add",
  delete: url + "delete",
};

export function pageList(data) {
  return Iget(Api.pageList, data);
}

export function listByUser(data) {
  return Iget(Api.listByUser, data);
}

export function remove(data) {
  return Iremove(Api.delete, data);
}

export function add(data) {
  return Iadd(Api.add, data);
}
