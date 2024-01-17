import request from "@/utils/request";

const url = "jjc/api/cms/news/";
const Api = {
  pageList: url + "pageList",
  getByUuid: url + "getByUuid",
};

export function pageList(data) {
  return request({
    url: Api.pageList,
    method: "get",
    params: data,
  });
}

export function getByUuid(data) {
  return request({
    url: Api.getByUuid,
    method: "get",
    params: data,
  });
}
