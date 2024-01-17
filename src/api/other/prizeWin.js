import { Iget, Iupdate } from "@/api/common";

const url = "api/other/prize/win/";
const Api = {
  open: url + "open",
  login: url + "login",
  listPrize: url + "listPrize",
  list: url + "list",
  get: url + "get",
  lottery: url + "lottery",
  save: url + "save",
};

/**
 * 是否打开抽奖提示
 */
export function open(data) {
  return Iget(Api.open, data)
}

/**
 *  先登录在抽奖
 */
export function login(data) {
  return Iupdate(Api.login, data);
}

/**
 * 获取奖品
 */
export function listPrize(data) {
  return Iget(Api.listPrize, data);
}

/**
 * 获取中奖列表
 */
export function list(data) {
  return Iget(Api.list, data);
}

/**
 * 获取中奖信息
 */
export function get() {
  return Iget(Api.get);
}
/**
 * 进行抽奖
 * @param category  国庆节抽奖活动
 * @param device 设备标识
 * @returns 抽奖结果
 */
export function lottery(data) {
  return Iupdate(Api.lottery, data);
}

/**
 * 保存联系人
 * @param contactPerson  联系人姓名
 * @param contactNumber 联系电话
 * @param address 邮寄地址
 */
export function save(data) {
  return Iupdate(Api.save, data);
}
