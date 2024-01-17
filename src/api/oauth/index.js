import { Iget } from "@/api/common";

const url = "oauth/";
const Api = {
  wxRender: url + "wx/render",
  getData: url + "wx/getData",
};

export function wxRender(data) {
  return Iget(Api.wxRender, data);
}

export function getData(data) {
    return Iget(Api.getData, data);
  }
  