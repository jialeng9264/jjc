/**
 * @author   孙志阳
 * @date     2020-08-15
 * @description 获取公钥
 */
import request from "@/utils/request";

export function getPublicKey() {
  return request({
    url: "/auth/publicKey",
    method: "get",
  });
}
