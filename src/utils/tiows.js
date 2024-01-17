const ws_protocol = "ws"; // ws 或 wss
const ip = "www.tbbh.com.cn";
const port = 9752;

const heartbeatTimeout = 1000 * 60; // 心跳超时时间，单位：毫秒
const reconnectInterval = 10000; // 重连间隔时间，单位：毫秒

const binaryType = "blob"; // 'blob' or 'arraybuffer';//arraybuffer是字节

let tio;
if (typeof tio == "undefined") {
  tio = {}; 
}
tio.ws = {};

/**
 * @param {*} paramStr 加在ws url后面的请求参数，形如：name=张三&id=12
 * @param {*} handler
 */
tio.ws = function (paramStr, handler) {
  this.url = ws_protocol + "://" + ip + ":" + port;

  if (paramStr) {
    this.url += "?" + paramStr;
    this.reconnectUrl = this.url + "&";
  } else {
    this.reconnectUrl = this.url + "?";
  }
  this.reconnectUrl += "tiows_reconnect=true";

  this.handler = handler;
  this.heartbeatTimeout = heartbeatTimeout;
  this.reconnectInterval = reconnectInterval;

  this.lastInteractionTime = function () {
    if (arguments.length === 1) {
      this.lastInteractionTimeValue = arguments[0];
    }
    return this.lastInteractionTimeValue;
  };

  this.heartbeatSendInterval = heartbeatTimeout / 2;

  this.connect = function (isReconnect) {
    let _url = this.url;
    if (isReconnect) {
      _url = this.reconnectUrl;
    }
    const ws = new WebSocket(_url);
    this.ws = ws;

    ws.binaryType = binaryType; // 'arraybuffer'; // 'blob' or 'arraybuffer';//arraybuffer是字节
    const self = this;
    ws.onopen = function (event) {
      self.handler.onopen.call(self.handler, event, ws);
      self.lastInteractionTime(new Date().getTime());

      self.pingIntervalId = setInterval(function () {
        self.ping(self);
      }, self.heartbeatSendInterval);
    };
    ws.onmessage = function (event) {
      self.handler.onmessage.call(self.handler, event, ws);
      self.lastInteractionTime(new Date().getTime());
    };
    ws.onclose = function (event) {
      clearInterval(self.pingIntervalId); // clear send heartbeat task
      try {
        self.handler.onclose.call(self.handler, event, ws);
      // eslint-disable-next-line no-empty
      } catch (error) {}

      self.reconnect(event);
    };
    ws.onerror = function (event) {
      self.handler.onerror.call(self.handler, event, ws);
    };

    return ws;
  };

  this.reconnect = function () {
    const self = this;
    setTimeout(function () {
      self.ws = self.connect(true);
    }, self.reconnectInterval);
  };

  this.ping = function () {
    const iv = new Date().getTime() - this.lastInteractionTime(); // 已经多久没发消息了
    // 单位：秒
    if (this.heartbeatSendInterval + iv >= this.heartbeatTimeout) {
      this.handler.ping(this.ws);
    }
  };

  this.send = function (data) {
    this.ws.send(data);
  };
};

export default tio;