import request from "@/utils/upload";

export async function upload(data) {
  return request({
    url: "common/file/upload",
    method: "post",
    data,
  });
}
