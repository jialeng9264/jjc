/**
 * @author   孙志阳
 * @date     2020-08-15
 * @description 数据字典
 */
import { ItreeList, IgetById, Iadd, Iupdate, Iremove, Imove, ItreeOptions, Ioptions } from "@/api/common";

const url = "/common/dict/";

const Api = {
  treeList: url + "treeList",
  getById: url + "getById",
  remove: url + "delete",
  add: url + "add",
  update: url + "update",
  move: url + "move",
  treeOptions: url + "treeOptions",
  options: url + "options",
};

export async function treeList(data) {
  return ItreeList(Api.treeList, data);
}

export function getById(data) {
  return IgetById(Api.getById, data);
}

export function remove(data) {
  return Iremove(Api.remove, data);
}

export function add(data) {
  return Iadd(Api.add, data);
}

export function update(data) {
  return Iupdate(Api.update, data);
}

export function move(data) {
  return Imove(Api.move, data);
}

export async function treeOptions(data) {
  return ItreeOptions(Api.treeOptions, treeOptions);
}

export async function options(data) {
  return Ioptions(Api.options, data);
}
