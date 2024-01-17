/**
 * 文章评论表
 * @author 孙志阳
 * @date 2021-9-30
 */
import { Iget, Iadd, Iremove } from "@/api/common";

const url = "jjc/api/web/articleReview/";
const Api = {
  pageList: url + "pageList",
  getByUuid: url + "getByUuid",
  meCollect: url + "meCollect",
  update: url + "update",
  add: url + "add",
  delete: url + "delete",
};

export function pageList(data) {
  return Iget(Api.pageList, data);
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
