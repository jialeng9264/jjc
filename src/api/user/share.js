/**
 * 分享链接
 * @author 孙志阳
 * @date 2022-03-08
 */
 import { Ipost } from "@/api/common";

 const url = "jjc/api/user/share/";
 const Api = {
    add: url + "add",
 };
 
 export function add(data) {
   return Ipost(Api.add, data);
 }
 