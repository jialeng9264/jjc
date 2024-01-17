import request from "@/utils/request";

const url = "jjc/api/cms/download/";
const Api = {
  pageList: url + "pageList"
};

export function pageList(data) {
  return request({
    url: Api.pageList,
    method: "get",
    params: data,
  });
}

