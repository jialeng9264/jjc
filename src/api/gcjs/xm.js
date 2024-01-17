import { Iget } from "@/api/common";

// 工程建设项目地址
const url = "jjc/api/pc/gcjs/xm/";
const Api = {
  pageList: url + "pageList",
  getByUuid: url + "getByUuid",
  get: url + "get",
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