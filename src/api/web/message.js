/**
 * 留言
 * @author 孙志阳
 * @date 2021-10-11
 */
import { Iadd } from "@/api/common";

const url = "jjc/api/web/message/";
const Api = {
  add: url + "add",
};
export function add(data) {
  return Iadd(Api.add, data);
}
