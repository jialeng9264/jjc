<template>
  <div>
    <div class="box" v-show="isshow">
      <div class="header">
        <div class="text">投标宝盒河北专区</div>
        <div class="btn">
          <img src="~@/assets/img/public/chat_small.png" alt="" @click="small" />
          <img src="~@/assets/img/public/chat_close.png" alt="" @click="close" />
        </div>
      </div>
      <div class="content">
        <div class="con">
          <div class="inner">
            <!-- 对话内容 -->
            <div class="chatdiv">
              <!-- 初始 -->
              <div class="firstmsg">
                <span>xxx正在与您对话</span>
                <div class="time-start">10:58</div>
              </div>
              <!-- 对话左 -->
              <div class="msg-wrapper inMsg">
                <div class="titleTag">
                  <span class="nameTag">熊老师</span>
                  <span class="createTime">02-11 10:59:57</span>
                </div>
                <div class="msg">决定，您看电话、微信哪个方便呢？</div>
              </div>
              <!-- 对话右 -->
              <div class="msg-wrapper outMsg">
                <div class="titleTag">
                  <span class="nameTag">您</span>
                  <span class="createTime">02-11 13:56:18</span>
                </div>
                <div class="msg">13246497964</div>
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
        <div class="message">
          <div class="message_c">
            <textarea name="" id="message" placeholder="请输入..."></textarea>
          </div>
        </div>
        <div class="send">发送</div>
      </div>
    </div>
    <div class="small" v-show="isSmall">
      <div class="header">
        <div class="text">投标宝盒河北专区</div>
        <div class="btn">
          <img src="~@/assets/img/public/chat_big.png" alt="" @click="big" />
          <img src="~@/assets/img/public/chat_close.png" alt="" @click="close_small" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isshow: true,
      isSmall: false,
      smileShow: false,
    };
  },
  methods: {
    small() {
      this.isshow = false;
      this.isSmall = true;
    },
    big() {
      this.isSmall = false;
      this.isshow = true;
    },
    close() {
      this.isshow = false;
    },
    close_small() {
      this.isSmall = false;
    },
    smileClick() {
      this.smileShow = !this.smileShow;
    },
  },
};
</script>

<style lang="less" scoped>
.box {
  width: 362px;
  height: 470px;
  position: fixed;
  inset: 249px 0px auto 1155px;
  z-index: 2147483601;
  box-shadow: 0px 0px 10px 0 #333;
}
.header {
  width: 100%;
  height: 45px;
  line-height: 45px;
  padding: 0 10px;
  box-sizing: border-box;
  background-color: #2c8bcc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .text {
    width: 280px;
    height: 100%;
    color: #fff;
  }
  .btn {
    width: 60px;
    height: 100%;
    cursor: pointer;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}
.content {
  width: 100%;
  height: 425px;
  .con {
    // width: 100%;
    height: 300px;
    padding-left: 5px;
    overflow-y: auto;
    overflow-x: hidden;
    background-color: #fff;
    .inner {
      width: 100%;
      height: 100%;
      background-color: transparent;
      overflow: hidden;
      position: relative;
      .chatdiv {
        height: 100%;
        overflow-y: auto;
        overflow-x: hidden;
        .firstmsg {
          height: 24px;
          line-height: 24px;
          border-bottom: 1px solid #bbb;
          margin: 4px 10px;
          color: #000;
          font-weight: bold;
          font-size: 12px;
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
          font-size: 12px;
        }
        .inMsg,
        .outMsg {
          padding-left: 10px;
          clear: both;
          margin-top: 4px;
          margin-right: 5px;
          word-break: break-all;
          word-wrap: break-word;
        }
        .titleTag {
          line-height: 20px;
          color: #4a4949;
          font-weight: bold;
        }
        .createTime {
          font-size: 12px;
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
  .message {
    width: 100%;
    height: 70px;
    background: #fff;
    .message_c {
      height: 60px;
      padding: 5px 15px;
      background: #fff;
      #message {
        display: block;
        width: 100%;
        height: 60px;
        overflow: auto;
        resize: none;
        border: none;
        background: #fff;
      }
    }
  }
  .send {
    width: 100%;
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    color: #fff;
    text-align: center;
    cursor: pointer;
    background-color: #2c8bcc;
  }
}

.small {
  width: 362px;
  height: 40px;
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: 2147483601;
  background-color: #2c8bcc;
}
</style>