<template>
  <div>
    <div class="all">
      <findswiper></findswiper>
      <div class="breadcrumb">
        <img src="~@/assets/img/public/dw.png" alt="" />
        <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height: 23px">
          <el-breadcrumb-item>当前位置</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>信息详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div v-if="form.title" class="zbgg_c">
        <h2>{{ form.title }}</h2>
        <div class="gray">
          <div>
            <span>发布时间：{{ $baseDayjs(form.time).format("YYYY-MM-DD") }}</span>
          </div>
          <!-- <span>信息来源：{{ form.source ? form.source : "投标宝盒" }}</span> -->
          <div>
            <span v-if="meCollect" class="add" @click="handleConCollect"><i class="el-icon-star-on"></i>取消收藏</span>
            <span v-else class="add" @click="handleAddCollect"><i class="el-icon-star-off"></i>添加收藏</span>
            <span @click="share"><i class="el-icon-share">分享</i></span>
          </div>
        </div>
        <!-- <div v-if="category === '工程建设'">
          <el-button @click="gcZbByBd">招标公告</el-button>
          <el-button @click="gcBgByBd">变更公告</el-button>
          <el-button @click="gcZhbgsByBd">中标公示公告</el-button>
          <el-button @click="gcZhbByBd">中标公告</el-button>
        </div>
        <div v-else-if="category === '政府采购'">
          <el-button @click="zbByBd">招标公告</el-button>
          <el-button @click="gzByBd">变更公告</el-button>
          <el-button @click="zhbByBd">中标公告</el-button>
          <el-button @click="fbByBd">废标公告</el-button>
        </div> -->
        <div class="zbgg_content" v-html="form.content"></div>
      </div>
      <div v-else class="mask">
        <!-- <el-skeleton :rows="6" animated :loading="loading"> </el-skeleton> -->
        <div class="relative">
          <div class="cont"></div>
        </div>
      </div>
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

    <el-dialog title="温馨提示" :visible.sync="wx_share" center class="share">
      <img :src="shareQrCode" alt="" />
      <span>请使用微信扫码查看并分享</span>
    </el-dialog>
  </div>
</template>

<script>
import findswiper from "@/components/findswiper";

// 政府采购
import { getByUuid as zbggByUuid, listByBd as zbByBd } from "@/api/zfcg/zbgg";
import { getByUuid as gzggByUuid, listByBd as gzByBd } from "@/api/zfcg/gzgg";
import { getByUuid as zhbggByUuid, listByBd as zhbByBd } from "@/api/zfcg/zhbgg";
import { getByUuid as fbggByUuid, listByBd as fbByBd } from "@/api/zfcg/fbgg";
import { getByUuid as dylyByUuid } from "@/api/zfcg/dyly";
// 建设工程
import { getByUuid as gcZbggByUuid, listByBd as gcZbByBd } from "@/api/gcjs/zbgg";
import { getByUuid as gcZbjhggByUuid, listByBd as gcZbjhByBd } from "@/api/gcjs/zbjhgg";
import { getByUuid as gcBgggByUuid, listByBd as gcBgByBd } from "@/api/gcjs/bggg";
import { getByUuid as gcZbhxrgsByUuid, listByBd as gcZhbgsByBd } from "@/api/gcjs/zbhxrgs";
import { getByUuid as gcZhongbggByUuid, listByBd as gcZhbByBd } from "@/api/gcjs/zhongbgg";
// 依法非招标
import { getByUuid as fZbggByUuid } from "@/api/f/zbgg";
import { getByUuid as fBgggByUuid } from "@/api/f/bggg";
import { getByUuid as fZbhxrgsByUuid } from "@/api/f/zbhxrgs";
import { getByUuid as fZhbggByUuid } from "@/api/f/zhongbgg";
// 分包信息
import { getByUuid as subByUuid } from "@/api/user/subcontract";
// 收藏表
import { add, meCollect, remove } from "@/api/user/collect";
// 浏览记录
import { add as brAdd } from "@/api/user/browsingRecords";

// 支付
import { createOrder, orderQuery as wxOrderQuery } from "@/api/pay/wx";
import { pc, orderQuery } from "@/api/pay/zfb";
// 分享
import { add as shareAdd } from "@/api/user/share.js";

export default {
  components: {
    findswiper,
  },
  data() {
    return {
      form: {},
      type: "",
      uuid: "",
      bdcode: "",
      meCollect: false,
      collectForm: {},
      loading: false,
      // 积分标识
      integralUuid: "",
      // 支付展示
      payVisible: false,
      payActive: 1,
      title: "",
      descr: "",
      qrCode: "",
      zfSuccess: false,
      wxQ: "",
      zfbQ: "",
      // 分享
      wx_share: false,
      shareQrCode: "",
      // 展示其他公告
      category: "",
    };
  },
  created() {
    const { type, uuid } = this.$route.query;
    if (uuid && type) {
      this.getByUuid(type, uuid);
      this.type = type;
      this.uuid = uuid;
    } else {
      this.$router.push("/404");
    }
  },
  beforeDestroy() {
    if (this.wxQ) {
      clearInterval(this.wxQ);
    }
    if (this.zfbQ) {
      clearInterval(this.zfbQ);
    }
  },
  computed: {},
  methods: {
    async getByUuid(type, uuid) {
      this.loading = true;
      let result;
      switch (type) {
        case "gcZbgg":
          result = await gcZbggByUuid({ uuid });
          this.category = "工程建设";
          this.collectForm = {
            category: "工程建设",
            type: "招标公告",
            applyTo: "pc_gcjs_zbgg",
            sym: type,
          };
          break;
        case "gcZbjhgg":
          result = await gcZbjhggByUuid({ uuid });
          this.category = "工程建设";
          this.collectForm = {
            category: "工程建设",
            type: "招标计划公告",
            applyTo: "pc_gcjs_zbjhgg",
            sym: type,
          };
          break;
        case "gcBggg":
          result = await gcBgggByUuid({ uuid });
          this.category = "工程建设";
          this.collectForm = {
            category: "工程建设",
            type: "变更公告",
            applyTo: "pc_gcjs_bggg",
            sym: type,
          };
          break;
        case "gcZbhxrgs":
          result = await gcZbhxrgsByUuid({ uuid });
          this.category = "工程建设";
          this.collectForm = {
            category: "工程建设",
            type: "中标候选人公示",
            applyTo: "pc_gcjs_zbhxrgs",
            sym: type,
          };
          break;
        case "gcZhongbgg":
          result = await gcZhongbggByUuid({ uuid });
          this.category = "工程建设";
          this.collectForm = {
            category: "工程建设",
            type: "中标公告",
            applyTo: "pc_gcjs_zhongbgg",
            sym: type,
          };
          break;
        case "fZbgg":
          result = await fZbggByUuid({ uuid });
          this.collectForm = {
            category: "依法非招标",
            type: "招标公告",
            applyTo: "pc_f_zbgg",
            sym: type,
          };
          break;
        case "fBggg":
          result = await fBgggByUuid({ uuid });
          this.collectForm = {
            category: "依法非招标",
            type: "变更公告",
            applyTo: "pc_f_bggg",
            sym: type,
          };
          break;
        case "fZbhxrgs":
          result = await fZbhxrgsByUuid({ uuid });
          this.collectForm = {
            category: "依法非招标",
            type: "中标候选人公示",
            applyTo: "pc_f_zbhxrgs",
            sym: type,
          };
          break;
        case "fZhbgg":
          result = await fZhbggByUuid({ uuid });
          this.collectForm = {
            category: "依法非招标",
            type: "中标公告",
            applyTo: "pc_f_zhbgg",
            sym: type,
          };
          break;
        case "zbgg":
          result = await zbggByUuid({ uuid });
          this.category = "政府采购";
          this.collectForm = {
            category: "政府采购",
            type: "采购/预审公告",
            applyTo: "pc_zfcg_zbgg",
            sym: type,
          };
          break;
        case "gzgg":
          result = await gzggByUuid({ uuid });
          this.category = "政府采购";
          this.collectForm = {
            category: "政府采购",
            type: "更正公告",
            applyTo: "pc_zfcg_gzgg",
            sym: type,
          };
          break;
        case "zhbgg":
          result = await zhbggByUuid({ uuid });
          this.category = "政府采购";
          this.collectForm = {
            category: "政府采购",
            type: "中标(成交)结果公告",
            applyTo: "pc_zfcg_zhbgg",
            sym: type,
          };
          break;
        case "fbgg":
          result = await fbggByUuid({ uuid });
          this.category = "政府采购";
          this.collectForm = {
            category: "政府采购",
            type: "废标公告",
            applyTo: "pc_zfcg_fbgg",
            sym: type,
          };
          break;
        case "dyly":
          result = await dylyByUuid({ uuid });
          this.collectForm = {
            category: "政府采购",
            type: "单一来源",
            applyTo: "pc_zfcg_dyly",
            sym: type,
          };
          break;
        case "fbxx":
          result = await subByUuid({ uuid });
          this.collectForm = {
            category: "分包信息",
            type: "分包信息",
            applyTo: "jjc_subcontract",
            sym: type,
          };
          break;
        default:
          this.$baseAlert("请求参数错误", "系统提示", () => {
            this.$router.push("/404");
          });
          break;
      }
      if (result) {
        const { code, msg, data } = result;
        if (code === 200) {
          if (data.uuid) {
            this.form = data;
            console.log(data)
            if (data.bdcode) {
              this.bdcode = data.bdcode;
            } else if (data.bdcodes) {
              this.bdcode = data.bdcodes;
            }
            await this.handleMeCollect();
            this.handleBR();
          } else {
            this.$router.push("/404");
          }
        } else if (code === 408) {
          this.integralUuid = data;
          this.showPay();
          // TODO 提示购买单条费用，请求微信获取支付二维码
        } else {
          // TODO 加入图片
          this.$baseEventBus.$emit("out", true);
          // this.$baseAlert(msg);
        }
      }
      this.loading = false;
    },
    async zbByBd() {
      const { code, data } = await zbByBd({ bdcode: this.bdcode });
      console.log(data);
    },
    async zhbByBd() {
      const { code, data } = await zhbByBd({ bdcode: this.bdcode });
      console.log(data);
    },
    async gzByBd() {
      const { code, data } = await gzByBd({ bdcode: this.bdcode });
      console.log(data);
    },
    async fbByBd() {
      const { code, data } = await fbByBd({ bdcode: this.bdcode });
      console.log(data);
    },
    async gcZbByBd() {
      const { code, data } = await gcZbByBd({ bdcodes: this.bdcode });
      console.log(data);
    },
    async gcBgByBd() {
      const { code, data } = await gcBgByBd({ bdcodes: this.bdcode });
      console.log(data);
    },
    async gcZhbgsByBd() {
      const { code, data } = await gcZhbgsByBd({ bdcodes: this.bdcode });
      console.log(data);
    },
    async gcZhbByBd() {
      const { code, data } = await gcZhbByBd({ bdcodes: this.bdcode });
      console.log(data);
    },
    async handleAddCollect() {
      const formData = this.form;
      this.collectForm.refUuid = formData.uuid;
      this.collectForm.title = formData.title;
      this.collectForm.time = formData.time;
      const { code, msg } = await add(this.collectForm);
      if (code === 200) {
        this.meCollect = true;
        this.$baseMessage(msg, "success");
      } else {
        this.$baseAlert(msg);
      }
    },
    async handleConCollect() {
      const { code, msg } = await remove({ refUuid: this.uuid });
      if (code === 200) {
        this.meCollect = false;
        this.$baseMessage(msg, "success");
      } else {
        this.$baseAlert(msg);
      }
    },
    async handleMeCollect() {
      const { code, data } = await meCollect({
        refUuid: this.uuid,
      });
      if (code === 200) {
        this.meCollect = data.meCount;
        if (this.zfSuccess && !this.meCollect) {
          this.handleAddCollect();
        }
      }
    },
    async handleBR() {
      const data = this.form;
      brAdd({
        refUuid: data.uuid,
        title: data.title,
        time: data.time,
        category: this.collectForm.category,
        type: this.collectForm.type,
        sym: this.collectForm.sym,
      });
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
            this.zfSuccess = true;
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
            this.zfSuccess = true;
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
    async share() {
      const { code, data } = await shareAdd({
        useSym: this.type,
        refUuid: this.uuid,
      });
      if (code === 200) {
        this.shareQrCode = data.qrCode;
        this.wx_share = true;
      }
    },
  },
};
</script>

<style lang="less">
.el-breadcrumb {
  .el-breadcrumb__item:last-child .el-breadcrumb__inner {
    color: red;
  }
}
</style>
<style lang="less" scoped>
@import url("~@/assets/css/common/ggInfo.less");
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
.share {
  /deep/ .el-dialog {
    width: 450px;
    height: 400px;
  }
  img {
    width: 280px;
    height: 280px;
  }
  /deep/ .el-dialog__body {
    height: 320px;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    span {
      font-size: 16px;
    }
  }
}
</style>
