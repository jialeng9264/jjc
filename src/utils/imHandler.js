const IMHandler = function () {
  this.onopen = function (event, ws) {};

  /**
   * 收到服务器发来的消息
   * @param {*} event
   * @param {*} ws
   */
  this.onmessage = function (event, ws) {};

  this.onclose = function (e, ws) {
    // error(e, ws)
  };

  this.onerror = function (e, ws) {
    // error(e, ws)
  };

  /**
   * 发送心跳，本框架会自动定时调用该方法，请在该方法中发送心跳
   * @param {*} ws
   */
  this.ping = function (ws) {
    ws.send("心跳内容");
  };
};
export default IMHandler;
