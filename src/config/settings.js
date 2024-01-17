/**
 * @author 孙志阳
 * @date   2020年7月19日
 * @description 全局变量配置
 */
module.exports = {
  // 组件尺寸，分为large、default、small 、mini
  size: "default",
  // 开发以及部署时的URL
  publicPath: process.env.BASE_URL,
  // 生产环境构建文件的目录名
  outputDir: "dist",
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: "static",
  // 开发环境每次保存时是否输出为eslint编译警告
  lintOnSave: true,
  // 进行编译的依赖
  transpileDependencies: [/[\\/]node_modules[\\/]_?(sm-crypto)(.*)/],
  //参与者
  dependencies: ["sunzhiyang", "xuecongcong", "sunjinyu"],
  // 默认的接口地址
  baseURL: process.env.VUE_APP_BASE_API,
  //标题
  title: "投标宝盒河北专区",
  //简写
  abbreviation: "投标宝盒",
  //开发环境端口号
  devPort: "8082",
  //版本号
  version: process.env.VUE_APP_VERSION,
  //版权
  copyright: process.env.VUE_APP_AUTHOR,
  //作者
  author: process.env.VUE_APP_AUTHOR,
  //是否显示顶部进度条
  progressBar: true,
  // 路由模式，可选值为 history 或 hash
  routerMode: "history",
  //不经过token校验的路由
  routesWhiteList: [
    "/anon/login",
    "/anon/register",
    "/anon/info",
    "/anon/forget",
    "/anon/agreement",
    "/anon/privacy",
    "/anon/lottery_h5",
    "/anon/app_download",
    "/zxzx",
    "/hylt",
    "/home",
    "/404",
    "/401",
    "/components/chat_alert",
    "/components/wx_alert",
    "/common/share",
  ],
  //加载时显示文字
  loadingText: "正在加载中...",
  //token名称
  tokenName: "JJC-Token",
  //token在localStorage、sessionStorage、cookie存储的key的名称
  tokenTableName: "JJC-Token",
  //token存储位置localStorage sessionStorage cookie
  storage: "localStorage",
  //token失效回退到登录页时是否记录本次的路由
  recordRoute: true,
  //不显示时设置false
  logo: "/favicon.ico",
  //配后端数据的接收方式application/json;charset=UTF-8或者application/x-www-form-urlencoded;charset=UTF-8
  contentType: "application/x-www-form-urlencoded",
  //是否依据mock数据生成webstorm HTTP Request请求文件
  httpRequestFile: true,
  //消息框消失时间
  messageDuration: 3000,
  //最长请求时间
  requestTimeout: 0,
  //操作正常code
  successCode: 200,
  //登录失效 code
  invalidCode: 401,
  //踢出 code
  kickCode: 402,
  //无权限code
  noPermissionCode: 403,
  // 不提示错误信息
  hiddenCode: 204,
  notFound: 404,
  expireCode: 407,
  //是否关闭F12
  shieldF12: false,
  //否只保持一个子菜单的展开
  uniqueOpened: true,
  //不需要加loading层的请求
  debounce: [
    "browsingRecords/add",
    "collect/meCollect",
    "pay/zfb/orderQuery",
    "pay/wx/orderQuery",
    "im/message/pageList",
    "org/updateXy",
    "/other/prize",
  ],
  //npm run build时是否自动生成7z压缩包
  build7z: true,
  privateKeySM2: "cb0292d354f974d99eb77e8729322137b3d685251cf55d95e0edbfcfc5e059db",
  privateKeySM4: "7250055b2112db8eb3d4b9b9cc280af2",
};
