import { Ipost } from "@/api/common";

const url = "/jjc/api/user/sms/";
export const Api = {
  send: url + "send", // 发送短信
};

export function send(data) {
  return Ipost(Api.send, data);
}
