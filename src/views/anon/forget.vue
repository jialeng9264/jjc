<template>
  <div>
    <div class="forget">
      <div class="title">
        <h1>找回密码</h1>
        <el-steps :active="forget" align-center>
          <el-step title="验证身份"></el-step>
          <el-step title="设置新密码"></el-step>
          <el-step title="修改完成"></el-step>
        </el-steps>
      </div>
      <div class="message" v-if="forget === 1">
        <div class="message_c">
          <h3>验证身份</h3>
          <el-form ref="form" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="code">
              <el-input v-model="form.code" placeholder="请输入验证码"></el-input>
              <el-button class="fr" round :disabled="codeButton" @click="sendSmsCode">{{ codeButtonText }}</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="setup" v-else-if="forget === 2">
        <div class="setup_c">
          <h3>设置新密码</h3>
          <el-form ref="form" :model="form" status-icon :rules="rules" label-width="80px">
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input type="password" v-model="form.checkPass" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="finish" v-else>
        <div class="finish_c">
          <img src="~@/assets/img/login/sure.png" alt="" />
          <span>修改完成</span>
        </div>
        <div class="sure">
          <el-button type="primary" @click="$router.push('/anon/login')">登录</el-button>
        </div>
      </div>
      <div class="next">
        <el-button v-if="forget > 1 && forget < 3" type="primary" @click="pre">上一步</el-button>
        <el-button v-if="forget < 3" type="primary" @click="next()">下一步</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { validatorPhone } from "@/utils/validator";
import { isPhone } from "@/utils/validate";
import { send } from "@/api/common/common";
import { retrievePwd } from "@/api/user";
import { validatorPWD } from "@/utils/validator";

let _this;

const validatePass2 = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请再次输入密码"));
  } else if (value !== _this.form.password) {
    callback(new Error("两次输入密码不一致!"));
  } else {
    callback();
  }
};

export default {
  data() {
    return {
      active: 1,
      forget: 1,
      codeButtonText: "获取验证码",
      time: 60,
      // 填写信息
      form: {
        phone: "",
        code: "",
        password: "",
        checkPass: "",
      },
      rules: {
        phone: [{ required: true, validator: validatorPhone, trigger: "blur" }],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        password: [{ required: true, validator: validatorPWD, trigger: "blur" }],
        checkPass: [{ required: true, validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  created() {
    _this = this;
  },
  computed: {
    codeButton() {
      const form = this.form;
      return !(form.phone && isPhone(form.phone) && this.time === 60);
    },
  },
  methods: {
    next() {
      this.$refs["form"].validate(async (valid) => {
        if (valid) {
          if (this.forget === 2) {
            const { code, msg } = await retrievePwd(this.form);
            if (code !== 200) {
              this.$baseAlert(msg);
              return;
            }
          }
          this.forget++;
        }
      });
    },
    pre() {
      this.forget--;
    },
    async sendSmsCode() {
      const { code, msg } = await send({
        phone: this.form.phone,
        type: "4",
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
  },
};
</script>

<style lang="less">
.message,
.verify,
.setup {
  .el-input__inner {
    border-radius: 20px;
  }
}
</style>
<style lang="less" scoped>
@import url("~@/assets/css/anon/forget.less");
</style>
