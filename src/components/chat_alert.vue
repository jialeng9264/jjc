<template>
  <div>
    <div class="box" ref="box">
      <div class="header" ref="header">
        <img src="~@/assets/img/logo/logo_png.png" alt="" @click="toindex" />
        <!-- <img src="~@/assets/img/logo/logo_png.png" alt="" @click="toindex" /> -->
        <div class="closer" @click="close">关闭</div>
      </div>
      <div class="neck" ref="neck"></div>
      <!-- 聊天 -->
      <div class="stage">
        <div class="inner">
          <!-- 对话内容 -->
          <div class="chatdiv" ref="chatdiv">
            <!-- 初始 -->
            <div class="firstmsg">
              <span>{{ form.kfName }}正在与您对话</span>
              <div class="time-start">{{ $baseDayjs(new Date()).format("HH:mm") }}</div>
            </div>
            <div v-for="item in list" :key="item.id">
              <!-- 对话左 -->
              <div v-if="item.type == '2'" class="msg-wrapper inMsg">
                <div class="titleTag">
                  <span class="nameTag">{{ form.kfName }}</span>
                  <span class="createTime">{{ $baseDayjs(item.time).format("MM-DD HH:mm:ss") }}</span>
                </div>
                <div class="msg"><span v-html="item.content"></span></div>
              </div>
              <!-- 对话右 -->
              <div v-if="item.type == '1'" class="msg-wrapper outMsg">
                <div class="titleTag">
                  <span class="nameTag">您</span>
                  <span class="createTime">{{ $baseDayjs(item.time).format("MM-DD HH:mm:ss") }}</span>
                </div>
                <div class="msg"><span v-html="item.content"></span></div>
              </div>
            </div>
          </div>
          <!-- 表情 -->
          <div class="smile" v-show="smileShow">
            <table>
              <tbody>
                <tr>
                  <td v-for="item in 33" :key="item.index">
                    <a class="em" :class="'em' + item"></a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <!-- 内容 -->
      <div class="inputer" ref="inputer">
        <div class="message">
          <ul>
            <li>
              <a href="#" class="send" @click="send">发送</a>
            </li>
          </ul>
          <div class="content">
            <textarea name="" id="message" @focus="clearwd" v-model="form.content" placeholder="请输入..." @keyup.enter="send"></textarea>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import tio from "@/utils/tiows.js";
import ImHandler from "@/utils/imHandler";
import { uuid } from "@/utils/index.js";
import { pageList, add } from "@/api/im/message.js";
let _tio;
export default {
  data() {
    return {
      smileShow: false,
      khUuid: "",
      form: {},
      list: [],
      wd: 0,
    };
  },
  created() {
    let tempUuid = localStorage.getItem("tempUuid");
    if (!tempUuid) {
      if (this.user && this.user.uuid) {
        tempUuid = this.user.uuid;
      } else {
        tempUuid = uuid(10);
      }
      localStorage.setItem("tempUuid", tempUuid);
    }
    this.khUuid = tempUuid;
    this.init();
  },
  mounted() {
    window.onresize = () => {
      this.getChatdivHeight();
    };
  },
  computed: {
    user() {
      return this.$store.getters["user/user"];
    },
  },
  methods: {
    clearwd() {
      this.wd = 0;
      document.title = "投标宝盒河北专区-聊天";
    },
    toindex() {
      let routeData = this.$router.resolve({
        path: "/",
      });
      window.open(routeData.href, "_blank");
    },
    getChatdivHeight() {
      const boxAllHeight = window.innerHeight;
      const headerH = this.$refs.header.clientHeight;
      const neckH = this.$refs.neck.clientHeight;
      let chatdivH = this.$refs.chatdiv.clientHeight;
      // const toolH = this.$refs.tool.clientHeight;
      const inputerH = this.$refs.inputer.clientHeight;
      chatdivH = boxAllHeight - (headerH + neckH + inputerH) - 10;
      this.$refs.chatdiv.style.height = chatdivH + "px";
    },
    // 初始化会话
    init() {
      const _this = this;
      const imHandler = new ImHandler();
      if (this.user && this.user.uuid) {
        _tio = new tio.ws("userUuid=" + this.khUuid + "&name=" + this.user.userName, imHandler);
      } else {
        _tio = new tio.ws("userUuid=" + this.khUuid, imHandler);
      }
      _tio.connect();
      imHandler.onopen = (event) => {
        _this.pageList();
      };
      imHandler.onmessage = (event) => {
        const data = JSON.parse(event.data);
        const type = data.type;
        switch (type) {
          case "1":
          case "2":
            if (!_this.list || !_this.list.unshift) {
              _this.list = [];
            }
            _this.list.unshift(data);
            if (type == "2") {
              _this.wd = _this.wd + 1;
              document.title = "收到新消息...";
            }
            break;
          case "99":
            data.type = 1;
            _this.form = data;
            break;
        }
      };
    },
    async pageList() {
      const { code, data } = await pageList({
        khUuid: this.khUuid,
      });
      if (code === 200) {
        this.list = data;
      }
    },
    async send() {
      if (!this.form.content) {
        this.$baseMessage("请输入您的咨询内容", "warning");
        return;
      }
      const { code, data } = await add(this.form);
      if (code === 200) {
        _tio.send(
          JSON.stringify({
            action: "chat",
            message: data,
          })
        );
        // this.list.push(data);
        this.form.content = "";
      }
    },
    close() {
      if (confirm("您正在对话中，您确定离开吗？")) {
        window.location.href = "about:blank";
        window.close();
      }
    },
    smileClick() {
      this.smileShow = !this.smileShow;
    },
  },
};
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  height: 66px;
  position: relative;
  left: 0;
  top: 0;
  z-index: 10001;
  background: #fff;
  cursor: pointer;
  img {
    margin-top: 3px;
  }
  .closer {
    height: 30px;
    line-height: 30px;
    font-size: 15px;
    color: #777877;
    text-align: center;
    float: right;
    background: url("~@/assets/img/public/close_gray.png") left center no-repeat;
    padding-left: 26px;
    margin-top: 0px;
    margin-right: 10px;
  }
}
.neck {
  width: 100%;
  height: 4px;
  font-size: 1px;
  background-color: #2c8bcc !important;
}
.stage {
  width: 100%;
  height: auto;
  background-color: #fff;
  background-position: 0 -405px;
  background-repeat: repeat-x;
  border: 1px solid #ccc;
  .inner {
    width: 100%;
    height: 100%;
    position: relative;
    background-color: transparent;
    overflow: hidden;
    .chatdiv {
      height: 309px;
      overflow-y: auto;
      overflow-x: hidden;
      .firstmsg {
        height: 24px;
        color: #000;
        line-height: 24px;
        font-size: 16px;
        font-weight: bold;
        margin: 4px 10px;
        border-bottom: 1px solid #bbb;
        display: flex;
        justify-content: space-between;
      }
      // 对话
      .inMsg {
        color: blue;
      }
      .outMsg {
        color: black;
      }
      .msg-wrapper {
        font-size: 14px;
      }
      .inMsg,
      .outMsg {
        padding-left: 10px;
        clear: both;
        margin-top: 4px;
        margin-right: 5px;
        margin-bottom: 4px;
        word-break: break-all;
        word-wrap: break-word;
      }
      .titleTag {
        line-height: 22px;
        color: #4a4949;
        font-weight: bold;
      }
      .createTime {
        line-height: 22px;
        font-size: 14px;
        margin-left: 5px;
      }
      .inMsg .msg {
        color: #0d66d4;
      }
      .outMsg .msg {
        color: #c2272d;
      }
    }
    .smile {
      width: 310px;
      height: 95px;
      background: #ccc;
      position: absolute;
      left: 0;
      bottom: 0;
      overflow-x: hidden;
      overflow-y: auto;
      table,
      table tr td {
        border: 1px solid #cccccc;
      }
      table {
        width: 100%;
        height: 100%;
        border-collapse: collapse;
        tr {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
        }
        td {
          background: #f1f1f1;
          text-align: center;
          cursor: pointer;
        }
        .em {
          width: 25px;
          height: 25px;
          display: inline-block;
          background: url("~@/assets/img/public/em_all.png") no-repeat;
          background-size: 25px auto;
        }
        .em1 {
          background-position: 0 0px;
        }
        .em2 {
          background-position: 0 -25px;
        }
        .em3 {
          background-position: 0 -50px;
        }
        .em4 {
          background-position: 0 -75px;
        }
        .em5 {
          background-position: 0 -100px;
        }
        .em6 {
          background-position: 0 -125px;
        }
        .em7 {
          background-position: 0 -150px;
        }
        .em8 {
          background-position: 0 -175px;
        }
        .em9 {
          background-position: 0 -200px;
        }
        .em10 {
          background-position: 0 -225px;
        }
        .em11 {
          background-position: 0 -250px;
        }
        .em12 {
          background-position: 0 -275px;
        }
        .em13 {
          background-position: 0 -300px;
        }
        .em14 {
          background-position: 0 -325px;
        }
        .em15 {
          background-position: 0 -350px;
        }
        .em16 {
          background-position: 0 -375px;
        }
        .em17 {
          background-position: 0 -400px;
        }
        .em18 {
          background-position: 0 -425px;
        }
        .em19 {
          background-position: 0 -450px;
        }
        .em20 {
          background-position: 0 -475px;
        }
        .em21 {
          background-position: 0 -500px;
        }
        .em22 {
          background-position: 0 -525px;
        }
        .em23 {
          background-position: 0 -550px;
        }
        .em24 {
          background-position: 0 -575px;
        }
        .em25 {
          background-position: 0 -600px;
        }
        .em26 {
          background-position: 0 -625px;
        }
        .em27 {
          background-position: 0 -650px;
        }
        .em28 {
          background-position: 0 -675px;
        }
        .em29 {
          background-position: 0 -700px;
        }
        .em30 {
          background-position: 0 -725px;
        }
        .em31 {
          background-position: 0 -750px;
        }
        .em32 {
          background-position: 0 -775px;
        }
        .em33 {
          background-position: 0 -800px;
        }
      }
    }
  }
}

.tool {
  width: 100%;
  height: 25px;
  background-color: #fff;
  border-top: 1px solid #ccc;
  border-bottom: 1px dashed #ccc;
  .tool_c {
    width: 50px;
    height: 100%;
    margin-left: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    img {
      width: 18px;
      height: 18px;
      cursor: pointer;
    }
    input {
      width: 18px;
      height: 18px;
      position: absolute;
      left: 32px;
      opacity: 0;
      font-size: 0;
      cursor: pointer;
    }
  }
}

.inputer {
  width: 100%;
  height: 100px;
  background-color: #fff;
  border: 1px solid #ccc;
  .message {
    width: 100%;
    height: 100%;
    position: relative;
    background-color: transparent;
    overflow: hidden;
    ul {
      width: 95px;
      height: 35px;
      position: absolute;
      right: 10px;
      top: 30px;
      li {
        height: 100%;
        line-height: 100%;
        float: left;
        .send {
          width: 95px;
          height: 35px;
          display: block;
          line-height: 35px;
          text-align: center;
          font-size: 17px;
          color: #fff;
          font-weight: bold;
          background-color: #2c8bcc !important;
        }
      }
    }
    .content {
      height: 100%;
      margin-right: 140px;
      overflow: hidden;
      textarea {
        width: 100%;
        height: 100%;
        margin-top: 10px;
        margin-bottom: 10px;
        overflow-x: hidden;
        overflow-y: auto;
        border: none;
        padding-left: 20px;
      }
    }
  }
}
</style>
