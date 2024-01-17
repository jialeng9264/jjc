import { Ipost, Iget } from "@/api/common";

// 微信支付 - 扫码支付
const url = "jjc/api/pay/wx/";
const Api = {
  createOrder: url + "native/createOrder",
  orderQuery: url + "orderQuery",
};

//下单 - 生成二维码
export function createOrder(data) {
  return Ipost(Api.createOrder, data);
}

export function orderQuery(data) {
  return Iget(Api.orderQuery, data);
}
