/**
 * 项目经理
 * @author 孙志阳
 * @date 2021-10-14
 */
import { Iget } from "@/api/common";

const url = "jjc/api/user/projectManager/";
const Api = {
  pageList: url + "pageList",
  pageListQyName: url + "pageListQyName",
};

export function pageList(data) {
  return Iget(Api.pageList, data);
}

export function pageListQyName(data) {
  return Iget(Api.pageListQyName, data);
}
