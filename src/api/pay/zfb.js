import { Ipost, Iget } from "@/api/common";

// 支付宝支付
const url = "jjc/api/pay/zfb/";
const Api = {
  pc: url + "pc",
  orderQuery: url + "orderQuery",
};

//下单 - 生成二维码
export function pc(data) {
  return Ipost(Api.pc, data);
}

export function orderQuery(data) {
  return Iget(Api.orderQuery, data);
}
