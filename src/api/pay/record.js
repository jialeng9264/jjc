import { Iupdate, Iget } from "@/api/common";

// 购买记录
const url = "jjc/api/pay/record/";
const Api = {
  pageList: url + "pageList",
  bill: url + "bill",
};

export function pageList(data) {
  return Iget(Api.pageList, data);
}

export function bill(data) {
  return Iupdate(Api.bill, data);
}
