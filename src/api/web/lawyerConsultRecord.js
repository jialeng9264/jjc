/**
 * 咨询信息表
 * @author 孙志阳
 * @date 2021-11-08
 */
import { Iget, Ipost } from "@/api/common";

const url = "jjc/api/web/lawyerConsultRecord/";
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
