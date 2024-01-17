<template>
  <div>
    <div class="wfbgg">
      <el-dialog title="项目信息" :visible.sync="dialogShow" @close="closeDialog" width="70%" align="center">
        <el-skeleton :rows="6" animated :loading="loading">
          <span class="tit">项目基本信息</span>
          <el-descriptions direction="vertical" border :column="4" class="center">
            <el-descriptions-item label="项目代码" label-class-name="my-label"> {{ form.code }}</el-descriptions-item>
            <el-descriptions-item label="项目名称" label-class-name="my-label"> {{ form.title }}</el-descriptions-item>
            <el-descriptions-item label="项目类别" label-class-name="my-label"> {{ form.category }}</el-descriptions-item>
            <el-descriptions-item label="项目法人单位" label-class-name="my-label"> {{ form.frdw }}</el-descriptions-item>
          </el-descriptions>
          <el-descriptions v-if="form.address" border :column="2">
            <el-descriptions-item label="项目地址" label-class-name="my-label"> {{ form.address }}</el-descriptions-item>
            <el-descriptions-item label="资金来源" label-class-name="my-label"> {{ form.zjly }}</el-descriptions-item>
            <el-descriptions-item label="项目规模" label-class-name="my-label"> {{ form.xmgm }}</el-descriptions-item>
          </el-descriptions>

          <span class="mes tit">审批事项公示信息</span>
          <el-descriptions direction="vertical" border :column="5" class="center">
            <el-descriptions-item label="审批部门" label-class-name="my-label"> {{ form.spbm }}</el-descriptions-item>
            <el-descriptions-item label="审批事项" label-class-name="my-label"> {{ form.spsx }}</el-descriptions-item>
            <el-descriptions-item label="审批结果" label-class-name="my-label"> {{ form.spjg }}</el-descriptions-item>
            <el-descriptions-item label="审批日期" label-class-name="my-label">
              {{ $baseDayjs(form.sprq).format("YYYY-MM-DD") }}</el-descriptions-item
            >
            <el-descriptions-item label="审批文号" label-class-name="my-label"> {{ form.spwh }}</el-descriptions-item>
          </el-descriptions>

          <div v-if="tableData_jg.length > 0">
            <span class="mes tit">相关办理结果</span>
            <el-table :data="tableData_jg" size="medium" border>
              <el-table-column prop="spbm" label="审批部门" align="center"> </el-table-column>
              <el-table-column prop="spsx" label="审批事项" align="center"> </el-table-column>
              <el-table-column prop="spjg" label="审批结果" align="center"> </el-table-column>
              <el-table-column prop="sprq" label="审批日期" align="center"> </el-table-column>
              <el-table-column prop="spwh" label="审批文号" align="center"> </el-table-column>
            </el-table>
          </div>
        </el-skeleton>
      </el-dialog>
    </div>

    <el-dialog :visible.sync="payVisible" width="800px" height="462px" center class="wxpay">
      <div slot="title" class="header-title">
        <img src="~@/assets/img/public/wxpay_tit.png" alt="" />
        <span>温馨提示</span>
      </div>
      <div v-loading="loading" class="loading">
        <div class="wxpay_img">
          <img :src="qrCode" alt="" />
          <span>{{ descr }}</span>
        </div>
        <div class="wxpay_txt">
          <p>您当前权限不足！</p>
          <p>扫码充值查看整条完整信息</p>
          <p>或<span>充值成为VIP会员</span><button @click="tovip">成为VIP</button></p>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getByUuid } from "@/api/gcjs/xm";
import { add as brAdd } from "@/api/user/browsingRecords";

// 支付
import { createOrder, orderQuery as wxOrderQuery } from "@/api/pay/wx";
import { pc, orderQuery } from "@/api/pay/zfb";

export default {
  data() {
    return {
      form: {},
      tableData_jg: [],
      dialogShow: false,
      uuid: "",
      loading: false,
      // 积分标识
      integralUuid: "",
      // 支付展示
      type: "gcXm",
      payVisible: false,
      payActive: 1,
      title: "",
      descr: "",
      qrCode: "",
      wxQ: "",
      zfbQ: "",
    };
  },
  watch: {
    dialogShow(n) {
      if (n) {
        this.getByUuid();
      }
    },
  },
  beforeDestroy() {},
  methods: {
    async getByUuid() {
      this.loading = true;
      if (this.uuid) {
        const { code, data } = await getByUuid({
          uuid: this.uuid,
        });
        if (code === 200) {
          this.form = data;
          this.tableData_jg = data.list;
          this.handleBR(data);
        } else if (code === 408) {
          this.integralUuid = data;
          this.showPay();
          // TODO 提示购买单条费用，请求微信获取支付二维码
        }
        this.loading = false;
      } else {
        this.closeDialog();
      }
    },
    async handleBR(data) {
      brAdd({
        refUuid: data.uuid,
        title: data.title,
        time: data.time,
        category: "建设工程",
        type: "立项项目",
        sym: "gcXm",
      });
    },
    closeDialog() {
      this.$emit("close");
      this.form = {};
      if (this.wxQ) {
        clearInterval(this.wxQ);
      }
      if (this.zfbQ) {
        clearInterval(this.zfbQ);
      }
    },
    showPay() {
      if (this.payActive == 1) {
        this.loading = true;
        createOrder({
          type: this.type,
          integralUuid: this.integralUuid,
        }).then((res) => {
          this.title = "微信二维码支付";
          this.descr = "请使用微信“扫一扫”完成付款";
          this.payVisible = true;
          this.loading = false;
          if (res.code == 200) {
            this.qrCode = "data:image/png;base64," + res.data;
            this.wxQuery();
          }
        });
      } else if (this.payActive == 2) {
        pc({
          type: this.type,
          integralUuid: this.integralUuid,
        }).then((res) => {
          if (res.code === 200) {
            var w = window.open();
            w.document.open();
            w.document.write(res.data);
            w.document.close();
            this.zfbQuery();
            // this.title = "支付宝二维码支付";
            // this.descr = "请使用支付宝“扫一扫”完成付款";
            // this.payVisible = true;
            // this.loading = false;
            // if (res.code == 200) {
            //   this.qrCode = res.data;
            //   this.zfbQuery();
            // }
          }
        });
      }
    },
    zfbQuery() {
      const _this = this;
      if (_this.zfbQ) {
        clearInterval(_this.zfbQ);
      }
      this.zfbQ = setInterval(() => {
        orderQuery({
          integralUuid: this.integralUuid,
        }).then((res) => {
          if (res.code == 200) {
            if (this.zfbQ) {
              clearInterval(this.zfbQ);
            }
            this.getByUuid(_this.type, _this.uuid);
            this.$baseAlert("您已成功支付。");
          } else if (res.code == 404) {
            if (_this.zfbQ) {
              clearInterval(_this.zfbQ);
            }
          }
        });
      }, 5000);
    },
    wxQuery() {
      const _this = this;
      if (_this.wxQ) {
        clearInterval(_this.wxQ);
      }
      this.wxQ = setInterval(() => {
        wxOrderQuery({
          integralUuid: this.integralUuid,
        }).then((res) => {
          if (res.code == 200) {
            if (_this.wxQ) {
              clearInterval(_this.wxQ);
            }
            this.getByUuid(_this.type, _this.uuid);
            this.$baseAlert("您已成功支付。");
            this.payVisible = false;
          } else if (res.code == 404) {
            if (_this.wxQ) {
              clearInterval(_this.wxQ);
            }
          }
        });
      }, 5000);
    },
    tovip() {
      this.$router.push({ name: "member" });
    },
  },
};
</script>

<style lang="less">
.wfbgg {
  .el-dialog {
    width: 1000px;
    border-radius: 0;

    .el-dialog__headerbtn .el-dialog__close {
      color: #fff;
    }

    .el-dialog__title {
      color: #fff;
      padding-left: 20px;
    }

    .el-dialog__header {
      background-color: rgb(69, 113, 184);
    }

    .my-label {
      min-width: 110px;
      text-align: center;
      color: #000;
      font-weight: 600;
    }

    .tit {
      display: inline-block;
      margin-bottom: 20px;
    }

    .center .el-descriptions-item__content {
      text-align: center;
    }

    .mes {
      display: inline-block;
      margin-top: 20px;
    }
  }

  .el-table {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
  }

  .el-table .el-table__cell {
    padding: 2px 0;
  }
}
</style>

<style lang="less" scoped>
@import url("~@/assets/css/common/gcXmInfo.less");
.wxpay {
  /deep/ .el-dialog {
    height: 462px;
  }
  /deep/ .el-dialog__header {
    height: 115px;
    padding-bottom: 0;
    .el-dialog__close {
      color: #333;
      font-size: 20px;
    }
  }
  /deep/ .el-dialog__body {
    height: 347px;
    padding: 33px 55px 63px 55px;
  }
  .header-title {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    border-bottom: 3px solid #e0e0e0;
    img {
      margin-right: 15px;
    }
  }
  .loading {
    display: flex;
    justify-content: space-between;
    .wxpay_img {
      width: 240px;
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
        width: 240px;
      }
      span {
        font-size: 14px;
      }
    }
    .wxpay_txt {
      width: 430px;
      font-size: 24px;
      text-align: left;
      padding: 30px 0 36px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      &:before,
      &:after {
        content: "";
        display: block;
      }
      span {
        color: #fa6402;
        font-size: 24px;
      }
      button {
        width: 148px;
        height: 50px;
        text-align: center;
        color: #ffffff;
        border-radius: 10px;
        margin-left: 10px;
        cursor: pointer;
        background-color: #007aff;
      }
    }
  }
}
</style>
