/**
 * 推送设置表
 * @author 孙志阳
 * @date 2021-10-12
 */
import { Iadd, Iget, Iupdate } from "@/api/common";

const url = "jjc/api/user/pushSettings/";
const Api = {
  getByUser: url + "getByUser",
  update: url + "update",
  updateWxStatus: url + "updateWxStatus",
  updateExcelStatus: url + "updateExcelStatus",
  add: url + "add",
};

export function getByUser(data) {
  return Iget(Api.getByUser, data);
}

export function update(data) {
  return Iupdate(Api.update, data);
}

export function updateWxStatus(data) {
  return Iupdate(Api.updateWxStatus, data);
}

export function updateExcelStatus(data) {
  return Iupdate(Api.updateExcelStatus, data);
}

export function add(data) {
  return Iadd(Api.add, data);
}
