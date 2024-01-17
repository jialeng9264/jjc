/**
 * 推送公告消息表
 * @author 孙志阳
 * @date 2021-10-12
 */
import { Iget, Iupdate } from "@/api/common";

const url = "jjc/api/user/pushGgRecord/";
const Api = {
  pageList: url + "pageList",
  read: url + "read",
};

export function pageList(data) {
  return Iget(Api.pageList, data);
}

export function read(data) {
  return Iupdate(Api.read, data);
}
