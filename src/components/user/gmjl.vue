<template>
  <div>
    <div class="gmjl">
      <div class="gmjl_c" v-if="isShowdiv">
        <p>购买记录</p>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="outTradeNo" align="center" label="订单号"> </el-table-column>
          <el-table-column prop="tradeCategory" align="center" label="会员套餐" width="100"> </el-table-column>
          <el-table-column prop="tradeType" align="center" label="交易方式" width="100"> </el-table-column>
          <el-table-column prop="payerTotal" align="center" label="交易金额(元)" width="120"> </el-table-column>
          <el-table-column prop="createdTime" align="center" label="创建日期">
            <template #default="{ row }">
              {{ $baseDayjs(row.createdTime).format("YYYY-MM-DD HH:mm:ss") }}
            </template>
          </el-table-column>
          <el-table-column label="发票申请" align="center">
            <template #default="{ row }">
              <button v-if="row.status == 0" @click="ljsq(row)">立即申请</button>
              <button v-if="row.status == 1">已开具</button>
              <button v-if="row.status == 2">开具中</button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="fpsq" v-else>
        <div class="fpsq_title">
          <img src="~@/assets/img/user/fpsq.png" alt="" />
          <span>发票申请</span>
        </div>
        <div class="fpsq_c">
          <el-form :label-position="labelPosition" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
            <el-form-item label="发票类型" prop="billCategory">
              <el-radio v-model="ruleForm.billCategory" label="普票">普票</el-radio>
              <el-radio v-model="ruleForm.billCategory" label="专票">专票</el-radio>
            </el-form-item>
            <el-form-item label="公司名称" prop="billOrgName">
              <el-input v-model="ruleForm.billOrgName"></el-input>
            </el-form-item>
            <el-form-item label="企业信用代码" prop="billUscc">
              <el-input v-model="ruleForm.billUscc"></el-input>
            </el-form-item>
            <el-form-item label="税号" prop="billTaxNo">
              <el-input v-model="ruleForm.billTaxNo"></el-input>
            </el-form-item>
            <el-form-item label="开户账号" prop="billAccount">
              <el-input v-model="ruleForm.billAccount"></el-input>
            </el-form-item>
            <el-form-item label="开户行" prop="billAccountBank">
              <el-input v-model="ruleForm.billAccountBank"></el-input>
            </el-form-item>
            <el-form-item label="联系人" prop="billContact">
              <el-input v-model="ruleForm.billContact"></el-input>
            </el-form-item>
            <el-form-item label="联系方式" prop="billContactPhone">
              <el-input v-model="ruleForm.billContactPhone"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="billEmail">
              <el-input v-model="ruleForm.billEmail"></el-input>
            </el-form-item>
            <el-form-item label="邮寄地址" prop="address">
              <el-input v-model="ruleForm.address"></el-input>
            </el-form-item>
            <el-form-item v-if="ruleForm.billCategory === '专票'" label="一般纳税人证明" prop="billProve">
              <div class="attachment">
                <input v-show="false" type="file" accept="image/*" @change="tirggerFile($event)" ref="wtsImg" />
                <div @click="openImg('wtsImg')" style="width: 100%; height: 100%">
                  <span v-if="ruleForm.billProve === ''"></span>
                  <img style="height: 100%; width: 100%" v-if="ruleForm.billProve !== ''" :src="ruleForm.billProve" />
                </div>
              </div>
            </el-form-item>
          </el-form>
          <div class="submit" @click="submit">提交</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { pageList, bill } from "@/api/pay/record.js";
import { upload } from "@/api/file/upload";
import { validatorUSCC, validatorPhone, validatorEmail } from "@/utils/validator";
export default {
  data() {
    return {
      // 购买记录
      tableData: [],
      total: 0,
      // 购买记录 立即申请切换
      isShowdiv: true,
      labelPosition: "right",
      uuid: "",
      row: {},
      // 申请发票
      ruleForm: {
        billCategory: "普票",
        billOrgName: "",
        billUscc: "",
        billAccount: "",
        billAccountBank: "",
        billContact: "",
        billContactPhone: "",
        billEmail: "",
        billProve: "",
      },
      // 申请发票验证
      rules: {
        billCategory: [{ required: true, message: "请选择发票类型", trigger: "blur" }],
        billOrgName: [{ required: true, message: "请输入公司名称", trigger: "blur" }],
        billUscc: [{ required: true, validator: validatorUSCC, trigger: "blur" }],
        billAccount: [{ required: true, message: "请输入开户账号", trigger: "blur" }],
        billAccountBank: [{ required: true, message: "请输入开户行", trigger: "blur" }],
        billContact: [{ required: true, message: "请输入联系人", trigger: "blur" }],
        billContactPhone: [{ required: true, validator: validatorPhone, trigger: "blur" }],
        billEmail: [{ required: true, validator: validatorEmail, trigger: "blur" }],
        billProve: [{ required: true, message: "请上传一般纳税人证明", trigger: "blur" }],
      },
    };
  },
  created() {
    this.pageList();
  },
  methods: {
    pageList() {
      pageList({
        desc: "id",
      }).then((res) => {
        this.tableData = res.data.records;
        this.total = res.data.total;
      });
    },
    // 立即申请切换
    ljsq(row) {
      this.isShowdiv = false;
      this.uuid = row.uuid;
      this.row = row;
      this.ruleForm = {
        billCategory: "普票",
        billOrgName: "",
        billUscc: "",
        billAccount: "",
        billAccountBank: "",
        billContact: "",
        billContactPhone: "",
        billEmail: "",
        billProve: "",
      };
    },
    submit() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          this.ruleForm.uuid = this.uuid;
          bill(this.ruleForm).then((res) => {
            const { code, msg } = res;
            if (code == 200) {
              this.isShowdiv = true;
              this.row.status = "2";
              this.$baseAlert(msg);
            }
          });
        } else {
          return false;
        }
      });
    },
    openImg(imgType) {
      this.imgType = imgType;
      this.$refs[imgType].click();
    },
    async tirggerFile(event) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      const { code, msg, data } = await upload(formData);
      if (code === 200) {
        this.$nextTick(() => {
          console.log(data);
          this.ruleForm.billProve = data;
        });
      } else {
        this.$baseMessage(msg, "error");
      }
    },
  },
};
</script>

<style lang="less">
.gmjl {
  button {
    width: 80px;
    height: 20px;
    line-height: 20px;
    border-radius: 15px;
    padding: 0;
    margin: 0 auto;
    color: #fff;
    cursor: pointer;
    background: linear-gradient(to right, rgb(14, 197, 179), rgb(3, 147, 200));
  }
}
.fpsq_c .el-form-item {
  margin-bottom: 18px;
}
</style>
<style lang="less" scoped>
.gmjl {
  border: 1px solid transparent;
}
.gmjl_c {
  width: 100%;
  height: auto;
  padding: 15px 20px 30px;
  p {
    font-size: 21px;
    margin-bottom: 20px;
    letter-spacing: 2px;
    color: rgb(45, 83, 156);
  }
}
.fpsq_title {
  width: 200px;
  height: 18px;
  font-size: 21px;
  letter-spacing: 2px;
  color: rgb(45, 83, 156);
  margin-top: 20px;
  margin-left: 30px;
}
.fpsq_c {
  width: 780px;
  height: auto;
  margin: 0 auto;
  margin-top: 30px;
  .attachment {
    width: 50%;
    height: 150px;
    border: 1px solid rgb(220, 223, 230);
  }
}
.submit {
  width: 120px;
  height: 35px;
  line-height: 35px;
  text-align: center;
  margin: 0 auto;
  margin-bottom: 20px;
  border-radius: 15px;
  color: #fff;
  letter-spacing: 5px;
  cursor: pointer;
  background: linear-gradient(to right, rgb(255, 102, 70), rgb(255, 28, 21));
}
</style>
