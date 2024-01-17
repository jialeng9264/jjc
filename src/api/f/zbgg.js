import { Iget } from "@/api/common";

// 依法非招标招标公告地址
const url = "jjc/api/pc/f/zbgg/";
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
