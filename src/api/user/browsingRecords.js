/**
 * 浏览记录
 * @author 孙志阳
 * @date 2021-9-30
 */
import { Iget, Iadd, Iremove } from "@/api/common";

const url = "jjc/api/user/browsingRecords/";
const Api = {
  pageList: url + "pageList",
  delete: url + "delete",
  add: url + "add",
  clear: url + "clear",
};

export function pageList(data) {
  return Iget(Api.pageList, data);
}

export function add(data) {
  return Iadd(Api.add, data);
}

export function remove(data) {
  return Iremove(Api.delete, data);
}

export function clear(data) {
  return Iremove(Api.clear, data);
}
