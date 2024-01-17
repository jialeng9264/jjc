/**
 * 标书制作
 * @author 孙志阳
 * @date 2021-10-14
 */
import { Ipost } from "@/api/common";

const url = "jjc/api/user/tenderMake/";
const Api = {
  add: url + "add",
};

export function add(data) {
  return Ipost(Api.add, data);
}
