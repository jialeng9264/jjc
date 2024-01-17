/**
 * @author   孙志阳
 * @date     2021年2月23日
 * @description 附件管理
 */
import { IpageList, IgetById, Iadd, Iupdate, Iremove, Imove } from "@/api/common";
import { Iget } from "../common";
import { baseURL } from "@/config/settings";

const url = "/common/attachment/";

export const Api = {
  pageList: url + "pageList",
  getById: url + "getById",
  remove: url + "delete",
  add: url + "add",
  update: url + "update",
  move: url + "move",
  upload: baseURL + "common/attachment/upload",
  download: url + "download",
};

export function pageList(data) {
  return IpageList(Api.pageList, data);
}

export function getById(data) {
  return IgetById(Api.getById, data);
}

export function add(data) {
  return Iadd(Api.add, data);
}

export function update(data) {
  return Iupdate(Api.update, data);
}

export function remove(data) {
  return Iremove(Api.remove, data);
}

export function move(data) {
  return Imove(Api.move, data);
}

export function download(data) {
  return Iget(Api.download, data);
}
