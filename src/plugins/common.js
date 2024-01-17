import Vue from "vue";
import { parseTime, addDateRange, download, renderSize, resetForm, fileUrl } from "@/utils/common";

// 全局方法挂载
Vue.prototype.$parseTime = parseTime;
Vue.prototype.$addDateRange = addDateRange;
Vue.prototype.$download = download;
Vue.prototype.$renderSize = renderSize;
Vue.prototype.$resetForm = resetForm;
Vue.prototype.$fileUrl = fileUrl;
