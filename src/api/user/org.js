/**
 * 企业信息
 * @author 孙志阳
 * @date 2021-10-12
 */
import { Iget, Ipost } from "@/api/common";

const url = "jjc/api/user/org/";
const Api = {
  pageList: url + "pageList",
  listHome: url + "listHome",
  getByUscc: url + "getByUscc",
  simplList: url + "simplList",
  updateXy: url + "updateXy",
  addOrg: url + "addOrg",
};

export function pageList(data) {
  return Iget(Api.pageList, data);
}

export function listHome(data) {
  return Iget(Api.listHome, data);
}

export function getByUscc(data) {
  return Iget(Api.getByUscc, data);
}

export function simplList(data) {
  return Iget(Api.simplList, data);
}

export function updateXy(data) {
  return Iget(Api.updateXy, data);
}
export function addOrg(data) {
  return Ipost(Api.addOrg, data);
}
