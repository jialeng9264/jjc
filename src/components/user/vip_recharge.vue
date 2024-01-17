<template>
  <div>
    <div class="vip">
      <div class="vip_recharge" v-if="vip == 20">
        <div class="vip_c">
          <h3>投标宝盒VIP</h3>
          <span>公告信息提醒、开评标消息提醒、 企业查询、企业信息变更提醒、 查询企业所有投标项目、中标项目、 查项目经理、查企业资质 </span>
          <p>
            ￥<span>{{ price }}</span
            >/年
          </p>
          <div
            class="opennow"
            @click="
              vip = 21;
              opennow();
            "
          >
            立即开通
          </div>
        </div>
        <div class="agree">
          <el-radio v-model="radio" label="1">支付即同意《会员服务协议》，如有疑问请<a href="">点我咨询</a></el-radio>
        </div>
      </div>
      <div class="to_pay" v-else-if="vip == 21">
        <div class="to_pay_steps">
          <el-steps :space="200" :active="1" finish-status="success" align-center>
            <el-step title="订单支付"></el-step>
            <el-step title="支付完成"></el-step>
          </el-steps>
        </div>
        <p>
          应付金额：<span>{{ price }}</span
          >元
        </p>
        <div class="pay_list">
          <ul>
            <li>
              <img src="~@/assets/img/user/wx_pay.png" alt="" />
              <p><img src="~@/assets/img/user/wx_pay_s.png" alt="" /> 微信支付</p>
            </li>
            <li>
              <img src="~@/assets/img/user/zfb_pay.png" alt="" />
              <p>
                <img src="~@/assets/img/user/zfb_pay_s.png" alt="" />
                支付宝支付
              </p>
            </li>
            <li>
              <img src="~@/assets/img/user/yl_pay.png" alt="" />
              <p>
                <img src="~@/assets/img/user/yl_pay_s.png" alt="" />
                <a href="#" @click="vip = 22">线下转账</a>
              </p>
            </li>
          </ul>
        </div>
      </div>

      <div class="offline" v-else>
        <p>
          应付金额：<span>{{ price }} </span>元
        </p>
        <div class="offline_c">
          <div class="offline_bank">
            <img src="~@/assets/img/user/zsyh.png" alt="" />
            <div class="khyh fl">
              <p>开户名称：河北巨望电子科技有限公司</p>
              <p>开户银行：中国建设银行股份有限公司石家庄槐安东路支行</p>
              <p>账&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;户：13050161533600000748</p>
            </div>
          </div>
          <div class="offline_directions">
            <p>线下支付说明</p>
            <ul>
              <li><span>转账时请备注开通VIP服务的手机号</span>，如忘记备注请联系客服，提供证明信息。</li>
              <li>请在转账完成后，点击"我已完成转账"按钮，可在个人中心-购买记录查看开通状态。</li>
              <li>客服会在次日12点前为您开通相关服务，如果次日12点后未开通，请在此与客服联系确认。</li>
              <li>线下支付成功，可以到个人中心-购买记录开具发票。</li>
            </ul>
          </div>
          <div class="offline_pay">
            <div class="offline_pay_l fl">
              转账账户：
              <el-input v-model="ruleForm.bankAccounts"></el-input>
              <br />
              转账备注：
              <el-input v-model="ruleForm.description"></el-input>
            </div>
            <div class="offline_pay_r fr">
              <span>上传付款凭证：</span>
              <div class="upload_img fl">
                <input v-show="false" type="file" accept="image/*" @change="tirggerFile($event)" ref="input" />
                <div @click="openImg" style="width: 100%; height: 100%">
                  <span v-if="ruleForm.certificate == ''"></span>
                  <img style="height: 100%; width: 100%" v-if="ruleForm.certificate != ''" :src="ruleForm.certificate" />
                </div>
              </div>
            </div>
            <el-button type="warning" round @click="submitXxOrder">下一步</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { add } from "@/api/pay/xx.js";
import { upload } from "@/api/file/upload";
export default {
  props: ["price", "vip_msg"],
  data() {
    return {
      isShowvip: true,
      radio: "0",
      index: 1,
      vip: 22,
      isSelectFile: false,
      ruleForm: {
        bankAccounts: "",
        description: "",
        certificate: "",
      },
    };
  },
  computed: {
    user() {
      return this.$store.getters["user/user"];
    },
  },
  methods: {
    opennow() {
      if (this.radio === 0) {
        alert("请阅读并同意我们的服务条款");
        this.vip = 20;
      } else {
        this.vip = 21;
      }
    },
    async tirggerFile(event) {
      const file = event.target.files[0];
      const fromData = new FormData();
      fromData.append("file", file);
      const { code, msg, data } = await upload(fromData);
      if (code === 200) {
        this.ruleForm.certificate = data;
      } else {
        this.$baseMessage(msg, "error");
      }
    },
    openImg() {
      this.$refs.input.click();
    },
    async submitXxOrder() {
      if (!this.ruleForm.bankAccounts) {
        this.$baseMessage("请输入转账账号", "warning");
        return;
      }
      if (!this.ruleForm.certificate) {
        this.$baseMessage("请上传付款凭证", "warning");
        return;
      }

      const { code, msg } = await add(this.ruleForm);
      if (code == 200) {
        this.$alert("您的线下转账记录已提交，请等待客服审核，如有其他问题，请联系客服。", "温馨提示", {
          confirmButtonText: "确定",
          callback: (action) => {
            this.$parent.$parent.rechargeVisible = false;
          },
        });
      }
    },
  },
};
</script>

<style lang="less">
.offline_pay_l .el-input {
  margin-top: 10px;
}
.offline_pay_r .el-upload {
  float: right;
}
.offline_c .el-button {
  float: right;
  margin-top: 10px;
  margin-right: 10%;
}
</style>
<style lang="less" scoped>
.vip {
  border: 1px solid transparent;
}
@import url("~@/assets/css/user/vip.less");
</style>
