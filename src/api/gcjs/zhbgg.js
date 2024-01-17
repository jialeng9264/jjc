/**
 * 中标公告查询
 * @author 孙志阳
 * @date 2021-10-12
 */

import { Iget } from "@/api/common";

const url = "jjc/api/pc/zhbgg/";
const Api = {
  pageList: url + "pageList",
  listZbdw: url + "listZbdw",
  get: url + "get",
  listByBd: url + "listByBd",
};

export function pageList(data) {
  return Iget(Api.pageList, data);
}

export function listZbdw(data) {
  return Iget(Api.listZbdw, data);
}

export function get(data) {
  return Iget(Api.get, data);
}

export function listByBd(data) {
  return Iget(Api.listByBd, data);
}
