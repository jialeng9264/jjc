/**
 * @author   孙志阳
 * @date     2020-08-09
 * @description 通用js方法
 */
import instance from "@/utils/request";

import { baseURL } from "@/config/settings";

/**
 * 日期格式化
 * @param time 时间
 * @param type 格式化类型 1.年-月-日，2.时:分:秒，3.年-月-日 时:分，默认：年-月-日 时:分:秒
 * @param pattern 格式时间格式
 * @return 格式化后的时间
 */
export function parseTime(time, type, pattern) {
  if (arguments.length === 0 || !time) {
    return null;
  }
  let format = pattern || "{y}-{m}-{d} {h}:{i}:{s}";
  type = type || 0;
  if (!pattern) {
    switch (type) {
      case 1:
        format = "{y}-{m}-{d}";
        break;
      case 2:
        format = "{h}:{i}:{s}";
        break;
      case 3:
        format = "{y}-{m}-{d} {h}:{i}";
        break;
    }
  }
  let date;
  if (typeof time === "object") {
    date = time;
  } else {
    if (typeof time === "string") {
      time = new Date(time.replace(/-/g, "/").replace(/[TZ]/g, " ").trim());
    } else if (typeof time === "number" && time.toString().length === 10) {
      time = time * 1000;
    }
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };
  return format.replace(/{([ymdhisa])+}/g, (result, key) => {
    let value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === "a") {
      return ["日", "一", "二", "三", "四", "五", "六"][value];
    }
    if (result.length > 0 && value < 10) {
      value = "0" + value;
    }
    return value || 0;
  });
}

/**
 * @description 表单重置
 * @param refName 表单名称
 */
export function resetForm(refName) {
  if (this.$refs[refName]) {
    this.$refs[refName].resetFields();
  }
}

/**
 * @description 表单验证
 * @param refName 表单名称
 * @return 是否验证通过
 */
export function valiForm(refName) {
  let _valid = false;
  this.$refs[refName].validate((valid) => {
    _valid = valid;
  });
  return _valid;
}

/**
 * @description 添加日期范围
 * @param params 表单名称
 * @param dateRange 时间区间
 * @return 表单中添加 startTime和endTime
 */
export function addDateRange(params, dateRange) {
  let search = params;
  search.startTime = "";
  search.endTime = "";
  if (null != dateRange && "" != dateRange) {
    search.startTime = dateRange[0];
    search.endTime = dateRange[1];
  }
  return search;
}

/**
 * 从数据字典中获取select 下拉选项
 * @param dictKey 字典标识
 * @return options
 */
export function selectOptions(dictKey) {
  return instance({
    url: "common/dict/options",
    type: "get",
    params: { dictKey: dictKey },
  });
}

/**
 * @description 回显数据字典
 * @param datas 数据
 * @param value 回显值
 * @return string
 */
export function selectDictName(datas, value) {
  let actions = [];
  Object.keys(datas).map((key) => {
    if (datas[key].dictValue === "" + value) {
      actions.push(datas[key].dictName);
      return false;
    }
  });
  return actions.join("");
}

/**
 * 通用下载方法
 */
export function download(url) {
  window.open(baseURL +url);
}

/**
 * 拼接好的文件地址
 * @param url
 */
export function fileUrl(url) {
  return baseURL + "common/" + encodeURI(url);
}

/**
 * 格式化文件大小
 * @param value
 * @return string
 */
export function renderSize(value) {
  if (null === value || value === "") {
    return "0 Bytes";
  }
  const unitArr = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  let index,
    srcsize = parseFloat(value);
  index = Math.floor(Math.log(srcsize) / Math.log(1024));
  let size = srcsize / Math.pow(1024, index);
  //  保留的小数位数
  size = size.toFixed(2);
  return size + unitArr[index];
}

/**
 * 字符串格式化(%s )
 * @param str 需要格式的字符串
 * @return {*|string}
 */
export function sprintf(str) {
  let args = arguments,
    flag = true,
    i = 1;
  str = str.replace(/%s/g, function () {
    let arg = args[i++];
    if (typeof arg === "undefined") {
      flag = false;
      return "";
    }
    return arg;
  });
  return flag ? str : "";
}

/**
 * 转换字符串，undefined,null等转化为""
 * @param str 需转换的字符串
 * @return ""
 */
export function praseStrEmpty(str) {
  if (!str || str === "undefined" || str === "null") {
    return "";
  }
  return str;
}

/**
 * @author   孙志阳
 * @date     2020-08-31
 * @description 获取百分比宽度
 */
export function width() {}
