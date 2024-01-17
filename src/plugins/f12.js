import { shieldF12 } from "@/config/settings";

if (shieldF12) {
  const h = window.innerHeight;
  const w = window.innerWidth;
  document.onkeydown = function (event) {
    if (event && event.code === "F12") {
      event.returnValue = false;
    }
    if (event.ctrlKey && event.shiftKey && event.code === "KeyI") {
      event.returnValue = false;
    }
  };
  //判断浏览器的可视高度和可视宽度是否有改变，如有改变则关闭本页面
  window.onresize = function () {
    if (h !== window.innerHeight || w !== window.innerWidth) {
      window.close();
      window.location = "about:blank";
    }
  };

  document.oncontextmenu = function (event) {
    try {
      const the = event.target;
      return (the.tagName === "INPUT" && the.type.toLowerCase() === "text") || the.tagName === "TEXTAREA";
    } catch (e) {
      return false;
    }
  };
}
