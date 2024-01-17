/**
 * 律师信息表
 * @author 孙志阳
 * @date 2021-11-08
 */
import { Iget } from "@/api/common";

const url = "jjc/api/web/lawyer/";
const Api = {
  list: url + "list",
};

export function list(data) {
  return Iget(Api.list, data);
}
