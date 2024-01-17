import { Iget } from "@/api/common";

// 项目地址
const url = "jjc/api/pc/xm/";
const Api = {
  pageList: url + "pageList",
  get: url + "get",
};

export function pageList(data) {
  return Iget(Api.pageList, data);
}


export function get(data) {
  return Iget(Api.get, data);
}