<template>
  <div>
    <findswiper></findswiper>
    <div class="register_c">
      <div class="register_title">
        <div class="register_title_l fl">
          <img src="~@/assets/img/login/xyhzc.png" alt="" />
          新用户注册
        </div>
        <div class="register_title_r fr" @click="$router.push('/anon/login')">使用已有账号登录</div>
      </div>
      <div class="register">
        <el-form ref="form" :rules="rules" :model="form" label-width="100px">
          <el-form-item label="用户名称:" prop="userName">
            <el-input v-model="form.userName"></el-input>
          </el-form-item>
          <!-- <el-form-item label="公司名称:" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item> -->
          <el-form-item label="密码:" prop="password">
            <el-input type="password" v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item label="手机号:" prop="phone">
            <el-input v-model="form.phone"></el-input>
            <el-button round :disabled="codeButton" type="primary" @click="sendSmsCode" style="margin-left: 10px">{{ codeButtonText }}</el-button>
          </el-form-item>
          <el-form-item label="验证码:" prop="code">
            <el-input v-model="form.code"></el-input>
          </el-form-item>
          <el-form-item label="邀请码:" prop="registrationCode">
            <el-input v-model="form.registrationCode" placeholder="请输入邀请码，非必填"></el-input>
          </el-form-item>
          <el-form-item label="" prop="checked">
            <el-checkbox v-model="form.checked">注册即代表同意<router-link to="/anon/agreement">《投标宝盒服务协议》</router-link></el-checkbox>
          </el-form-item>
        </el-form>
        <div class="submit" @click="submitRegister">注册</div>
      </div>
    </div>
  </div>
</template>

<script>
import findswiper from "@/components/findswiper";
import { validatorPhone, validatorPWD, validatorBoolean } from "@/utils/validator";
import { isPhone } from "@/utils/validate";
import { send } from "@/api/common/common";
import { register } from "@/api/user";
import { getData } from "@/api/oauth";

export default {
  components: {
    findswiper,
  },
  data() {
    return {
      // 短信按钮倒计时
      codeButtonText: "获取验证码",
      time: 60,
      form: {
        userName: "",
        name: "",
        password: "",
        phone: "",
        code: "",
        checked: false,
      },
      rules: {
        name: [{ required: true, message: "请输入您的单位名称", trigger: "blur" }],
        userName: [{ required: true, message: "请输入您的用户名", trigger: "blur" }],
        phone: [{ required: true, validator: validatorPhone, message: "请输入正确的手机号", trigger: "blur" }],
        password: [{ required: true, validator: validatorPWD, trigger: "blur" }],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        checked: [{ required: true, message: "请您阅读并同意投标宝盒服务条款", validator: validatorBoolean, trigger: "blur" }],
      },
    };
  },
  computed: {
    codeButton() {
      const form = this.form;
      return !(form.phone && isPhone(form.phone) && this.time === 60);
    },
  },
  created() {
    if (localStorage.getItem("wx_code")) {
      this.getwxData();
    }
  },
  methods: {
    async getwxData() {
      const { code, data } = await getData({
        code: localStorage.getItem("wx_code"),
      });
      if (code == 200) {
        this.form.wxId = data.token.unionId;
        this.form.avatar = data.avatar;
        this.form.userName = data.nickname;
        this.form.name = data.nickname;
      }
    },
    async sendSmsCode() {
      const { code, msg } = await send({
        phone: this.form.phone,
        type: "1",
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
    submitRegister() {
      const _this = this;
      this.$refs["form"].validate(async (valid) => {
        
        if (valid) {
          const { code, msg } = await register(_this.form);
          if (code === 200) {
              _this.$baseConfirm("注册成功，是否跳转到登录页面", null, () => {
              _this.$router.push({ path: "/anon/login" });
            });
          } else {
            _this.$baseAlert(msg);
          }
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import url("~@/assets/css/anon/register.less");
</style>
