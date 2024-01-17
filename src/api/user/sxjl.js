/**
 * 企业信息
 * @author 孙志阳
 * @date 2021-10-12
 */
 import { Iget } from "@/api/common";

 const url = "jjc/api/user/org/sxjl/";
 const Api = {
   pageList: url + "pageList",
   listHome: url + "listHome",
 };
 
 export function pageList(data) {
   return Iget(Api.pageList, data);
 }
 
 export function listHome(data) {
   return Iget(Api.listHome, data);
 }
 