/**
 * 所有公告查询
 * @author 孙志阳
 * @date 2021-10-12
 */

import { Iget } from "@/api/common";

const url = "jjc/api/pc/allG/";
const Api = {
  pageList: url + "pageList",
};

export function pageList(data) {
  return Iget(Api.pageList, data);
}
