import { Ipost, Iget } from "@/api/common";

const url = "api/im/message/";
const Api = {
  pageList: url + "pageList",
  add: url + "add",
};

export function pageList(data) {
  return Iget(Api.pageList, data);
}

export function add(data) {
  return Ipost(Api.add, data);
}
