<template>
  <div>
    <div class="xgmm">
      <div class="xgmm_title">
        <img src="~@/assets/img/user/xgmm.png" alt="" />
        <span>修改密码</span>
      </div>
      <div class="xgmm_c">
        <el-form :model="form" status-icon :rules="rules" ref="form" label-width="80px">
          <el-form-item label="手机号:" prop="phone">
            <el-input v-model="form.phone" autocomplete="off" readonly></el-input>
            <el-button :disabled="codeButton" type="primary" @click="sendSmsCode" class="fr">{{ codeButtonText }}</el-button>
          </el-form-item>
          <el-form-item label="验证码:" prop="code">
            <el-input v-model.trim="form.code" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="form.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="confirm('form')">修改密码</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { resetPwd } from "@/api/user";
import { send } from "@/api/common/common";
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
      // 短信按钮倒计时
      codeButtonText: "获取验证码",
      time: 60,
      // 修改密码
      form: {
        password: "",
        checkPass: "",
        phone: "",
        code: "",
      },
      // 修改密码验证
      rules: {
        phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        password: [{ required: true, validator: validatorPWD, trigger: "blur" }],
        checkPass: [{ required: true, validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  created() {
    _this = this;
    this.form.phone = this.phone.replace(/(\d{3})\d*(\d{4})/, "$1****$2");
  },
  computed: {
    codeButton() {
      const form = this.form;
      return !(this.time === 60);
    },
    phone() {
      return this.$store.getters["user/user"].phone;
    },
  },
  methods: {
    async sendSmsCode() {
      const { code, msg } = await send({
        phone: this.phone,
        type: "3",
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
    // 修改密码
    confirm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const { msg } = await resetPwd({
            code: this.form.code,
            phone: this.phone,
            password: this.form.password,
          });
          this.$baseAlert(msg);
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.xgmm {
  padding: 15px 20px 30px;
  border: 1px solid transparent;
}
.xgmm_title {
  width: 200px;
  height: 25px;
  font-size: 21px;
  letter-spacing: 2px;
  color: rgb(45, 83, 156);
}
.xgmm_c {
  width: 510px;
  height: auto;
  margin-left: 50px;
  margin-top: 30px;
  .el-input {
    width: 300px;
  }
}
</style>
