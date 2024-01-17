Math.easeInOutQuad = function (t, b, c, d) {
  t /= d / 2;
  if (t < 1) {
    return (c / 2) * t * t + b;
  }
  t--;
  return (-c / 2) * (t * (t - 2) - 1) + b;
};

// requestAnimationFrame 用于智能动画的 http://goo.gl/sx5sts
var requestAnimFrame = (function () {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();

/**
 * 因为很难检测滚动元素，所以只需将它们全部移动即可
 * @param {number} amount
 */
function move(amount) {
  document.documentElement.scrollTop = amount;
  document.body.parentNode.scrollTop = amount;
  document.body.scrollTop = amount;
}

function position() {
  return document.documentElement.scrollTop || document.body.parentNode.scrollTop || document.body.scrollTop;
}

/**
 * @param {number} to
 * @param {number} duration
 * @param {Function} callback
 */
export function scrollTo(to, duration, callback) {
  const start = position();
  const change = to - start;
  const increment = 20;
  let currentTime = 0;
  duration = typeof duration === "undefined" ? 500 : duration;
  var animateScroll = function () {
    // 增加时间
    currentTime += increment;
    // 用二次进出缓动函数求值
    var val = Math.easeInOutQuad(currentTime, start, change, duration);
    // 移动 document.body
    move(val);
    // 做动画，除非结束
    if (currentTime < duration) {
      requestAnimFrame(animateScroll);
    } else {
      if (callback && typeof callback === "function") {
        // 动画完成后，让回调
        callback();
      }
    }
  };
  animateScroll();
}
