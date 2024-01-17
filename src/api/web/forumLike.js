/**
 * 论坛文章点赞表
 * @author 孙志阳
 * @date 2021-9-30
 */
import { Iget } from "@/api/common";

const url = "jjc/api/web/forumLike/";
const Api = {
  list: url + "list",
};

export function list(data) {
  return Iget(Api.list, data);
}
