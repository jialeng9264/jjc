<template>
  <!-- 登录弹框 -->
  <div class="login_alert">
    <el-dialog :visible.sync="dialogVisible" width="655px" height="390px">
      <div class="login_bg fl"></div>
      <div class="login_c fr">
        <div class="logo">
          <img src="~@/assets/img/logo/logo.png" alt="" />
        </div>
        <div class="title">
          <span @click="cur = 0" :class="{ blue: cur === 0 }">密码登录</span>
          <el-divider direction="vertical"></el-divider>
          <span @click="cur = 1" :class="{ blue: cur === 1 }">验证码登录</span>
        </div>
        <div class="login_input">
          <div class="password_c" v-show="cur === 0">
            <el-form ref="password_form" :model="password_form" :rules="rules">
              <el-form-item prop="userName">
                <el-input prefix-icon="el-icon-mobile-phone" v-model="password_form.userName" placeholder="请输入用户名"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  type="password"
                  prefix-icon="el-icon-lock"
                  v-model="password_form.password"
                  placeholder="请输入密码"
                  @keyup.enter.native="passwordLogin"
                ></el-input>
              </el-form-item>
            </el-form>
            <div class="login_btn" @click="passwordLogin">登录</div>
          </div>
          <div class="verification_c" v-show="cur === 1">
            <el-form ref="verification_form" :model="verification_form" :rules="rules">
              <el-form-item prop="phone">
                <el-input prefix-icon="el-icon-mobile-phone" v-model="verification_form.phone" placeholder="请输入手机号"></el-input>
              </el-form-item>
              <el-form-item prop="code">
                <el-input
                  prefix-icon="el-icon-message"
                  v-model="verification_form.code"
                  placeholder="输入短信验证码"
                  style="width: 58%"
                  @keyup.enter.native="verificationLogin"
                ></el-input>
                <el-button class="obtain fr" :disabled="codeButton" @click="sendSmsCode">{{ codeButtonText }}</el-button>
              </el-form-item>
            </el-form>
            <div class="login_btn" @click="verificationLogin">登录</div>
          </div>
        </div>
        <div class="no">
          <span>
            <span>没有账号？</span>
            <a href="#" @click="register">立即注册</a>
          </span>
          <span>
            <a href="#" @click="forget">忘记密码</a>
          </span>
        </div>
        <div class="other">
          <span>其他方式登录</span>
          <img src="~@/assets/img/login/wx.png" @click="wx" />
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import store from "@/store";
import { validatorPhone, validatorPWD } from "@/utils/validator";
import { isPhone } from "@/utils/validate";
import { send } from "@/api/common/common";
export default {
  data() {
    return {
      cur: 0,
      codeButtonText: "获取验证码",
      time: 60,
      password_form: {
        type: "2",
        userName: "",
        password: "",
      },
      verification_form: {
        type: "1",
        phone: "",
        code: "",
      },
      rules: {
        phone: [{ required: true, validator: validatorPhone, trigger: "blur" }],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        userName: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, validator: validatorPWD, trigger: "blur" }],
      },

      dialogVisible: false,
      loading: false,
    };
  },
  computed: {
    codeButton() {
      const form = this.verification_form;
      return !(form.phone && isPhone(form.phone) && this.time === 60);
    },
    hasToken() {
      return store.getters["user/accessToken"];
    },
    name() {
      return store.getters["user/userName"];
    },
  },
  methods: {
    wx() {
      const iWidth = 650;
      const iHeight = 500;
      var iTop = (window.screen.height - 30 - iHeight) / 2;
      var iLeft = (window.screen.width - 10 - iWidth) / 2;
      const win = window.open(
        "http://www.tbbh.com.cn/admin/oauth/wx/render",
        "_blank",
        "height=" + iHeight + ",width=" + iWidth + ",top=" + iTop + ",left=" + iLeft + ""
      );
      const inter = setInterval(() => {
        if (localStorage.getItem("wx_status")) {
          if (win) {
            win.close();
            clearInterval(inter);
          }
          if (localStorage.getItem("wx_status") == 204) {
            this.$router.push("/anon/register");
            this.dialogVisible = false;
            localStorage.removeItem("wx_status");
          } else {
            this.$store
              .dispatch("user/wxpc_login", localStorage.getItem("wx_code"))
              .then((result) => {
                if (result.code === 200) {
                  this.$router.push({ path: "/" });
                  this.dialogVisible = false;
                }
                this.loading = false;
                localStorage.removeItem("wx_status");
              })
              .catch(() => {
                this.loading = false;
                localStorage.removeItem("wx_status");
              });
          }
        }
      }, 1000);
    },
    changeIndex(index) {
      this.activeIndex = index;
    },
    register() {
      this.$router.replace("/anon/register");
      this.dialogVisible = false;
    },
    forget() {
      this.$router.replace("/anon/forget");
      this.dialogVisible = false;
    },
    login() {
      this.dialogVisible = true;
    },
    passwordLogin() {
      this.$refs["password_form"].validate(async (valid) => {
        if (valid) {
          const loginBody = this.$baseLodash.cloneDeep(this.password_form);
          this.$store
            .dispatch("user/login", loginBody)
            .then((result) => {
              if (result.code === 200) {
                this.$router.push({ path: "/" });
                this.dialogVisible = false;
              }
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        }
      });
    },
    async sendSmsCode() {
      const { code, msg } = await send({
        phone: this.verification_form.phone,
        type: "2",
      });
      if (code === 200) {
        this.$baseMessage(msg, "success");
        let timer = setInterval(() => {
          if (this.time >= 0) {
            this.time--;
            this.codeButtonText = "重新获取(" + this.time + "s)";
          } else {
            this.codeButtonText = "获取验证码";
            clearInterval(timer);
            this.time = 60;
          }
        }, 1000);
      } else {
        this.$baseAlert(msg);
      }
    },
    verificationLogin() {
      this.$refs["verification_form"].validate(async (valid) => {
        if (valid) {
          const loginBody = this.$baseLodash.cloneDeep(this.verification_form);
          this.$store
            .dispatch("user/login", loginBody)
            .then((result) => {
              if (result.code === 200) {
                this.$router.push({ path: "/" });
                this.dialogVisible = false;
              }
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        }
      });
    },
  },
};
</script>

<style lang="less">
.user_information {
  .block {
    width: 55px;
    height: 55px;
    cursor: pointer;
  }
}
.el-dropdown-link {
  cursor: pointer;
}
.el-dropdown-menu {
  width: 120px;
  text-align: center;
  .el-dropdown-menu__item {
    font-size: 16px;
  }
}

.login_alert {
  .el-dialog {
    width: 655px;
    height: 390px;
    border-radius: 10px;
  }

  .el-dialog__header {
    padding: 0;
  }

  .el-dialog__body {
    padding: 0;
  }

  .el-dialog__headerbtn {
    position: absolute;
    top: 8px;
    right: 8px;
  }

  .el-button {
    width: 110px;
    height: 40px;
    margin: 0 auto;
  }
}
</style>

<style lang="less" scoped>
.blue {
  color: #018bd6;
}
@import url("~@/assets/css/header.less");
</style>
