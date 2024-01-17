import { Iget } from "@/api/common";

// 工程建设中标候选人公示地址
const url = "jjc/api/pc/gcjs/zbhxrgs/";
const Api = {
  pageList: url + "pageList",
  getByUuid: url + "getByUuid",
  get: url + "get",
  listByBd: url + "listByBd",
};

export function pageList(data) {
  return Iget(Api.pageList, data);
}

export function getByUuid(data) {
  return Iget(Api.getByUuid, data);
}

export function get(data) {
  return Iget(Api.get, data);
}

export function listByBd(data) {
  return Iget(Api.listByBd, data);
}
