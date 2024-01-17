import { Ipost, Iget } from "@/api/common";

// 线下支付
const url = "jjc/api/pay/xxOrder/";
const Api = {
  existAudit: url + "existAudit",
  add: url + "add",
};

export function add(data) {
  return Ipost(Api.add, data);
}

// 是否存在待审核记录
export function existAudit(data) {
  return Iget(Api.existAudit, data);
}
