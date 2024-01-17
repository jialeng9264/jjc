/**
 * 论坛文章表
 * @author 孙志阳
 * @date 2021-9-30
 */
import { Iadd, Iget, Iremove, Iupdate } from "@/api/common";

const url = "jjc/api/web/forumArticle/";
const Api = {
  pageList: url + "pageList",
  getByUuid: url + "getByUuid",
  meCollect: url + "meCollect",
  update: url + "update",
  add: url + "add",
  delete: url + "delete",
  updateStatus: url + "updateStatus",
  like: url + "like",
  listTop: url + "listTop",
};

export function pageList(data) {
  return Iget(Api.pageList, data);
}

export function listTop(data) {
  return Iget(Api.listTop, data);
}

export function getByUuid(data) {
  return Iget(Api.getByUuid, data);
}

export function meCollect(data) {
  return Iget(Api.meCollect, data);
}

export function remove(data) {
  return Iremove(Api.delete, data);
}

export function add(data) {
  return Iadd(Api.add, data);
}

export function updateStatus(data) {
  return Iupdate(Api.updateStatus, data);
}

export function like(data) {
  return Iupdate(Api.like, data);
}
