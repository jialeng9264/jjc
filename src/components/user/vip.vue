<template>
  <div>
    <div class="wdzy">
      <div class="wdzy_c">
        <div class="tab">
          <ul>
            <li class="gray">服务分类</li>
            <li class="gray">服务项</li>
            <li class="orange">
              <p>普通会员</p>
              <p>介绍</p>
            </li>
            <li class="orange">
              <p>高级会员</p>
              <p>介绍</p>
            </li>
            <li class="orange">
              <p>VIP会员</p>
              <p>介绍</p>
            </li>
          </ul>
        </div>

        <div class="title">
          <ul>
            <li></li>
            <li>
              <p>
                <span class="new">{{ vip2 }}</span>
                <span class="old">{{ vip2 / 0.8 }}</span>
              </p>
              <button v-if="user.vip < 2" @click="clickKt(2)">立即开通</button>
              <button v-if="user.vip == 2" :class="user.vip == 2 ? 'opened' : ''">已开通</button>
              <button v-if="user.vip == 3">无需开通</button>
            </li>
            <li>
              <p>
                <span class="new">{{ vip3 }}</span>
                <span class="old">{{ vip3 / 0.8 }}</span>
              </p>
              <button v-if="user.vip < 3" @click="clickKt(3)">
                {{ user.vip == 2 ? "立即升级" : "立即开通" }}
              </button>
              <button v-if="user.vip == 3" :class="user.vip == 3 ? 'opened' : ''">已开通</button>
            </li>
          </ul>
        </div>

        <div class="table">
          <table>
            <tbody>
              <tr>
                <td rowspan="5" class="white">工程建设</td>
                <td>立项未招标项目信息</td>
                <td>可查看二次</td>
                <td>不限查看次数</td>
                <td>不限查看次数</td>
              </tr>
              <tr>
                <td>招标公告</td>
                <td>可查看二次</td>
                <td>不限查看次数</td>
                <td>不限查看次数</td>
              </tr>
              <tr>
                <td>变更公告</td>
                <td>可查看二次</td>
                <td>不限查看次数</td>
                <td>不限查看次数</td>
              </tr>
              <tr>
                <td>中标候选人公示</td>
                <td>可查看二次</td>
                <td>不限查看次数</td>
                <td>不限查看次数</td>
              </tr>
              <tr>
                <td>中标结果公告</td>
                <td>可查看二次</td>
                <td>不限查看次数</td>
                <td>不限查看次数</td>
              </tr>

              <tr>
                <td rowspan="5" class="white">政府采购</td>
                <td>招标公告</td>
                <td>可查看二次</td>
                <td>不限查看次数</td>
                <td>不限查看次数</td>
              </tr>
              <tr>
                <td>变更公告</td>
                <td>可查看二次</td>
                <td>不限查看次数</td>
                <td>不限查看次数</td>
              </tr>
              <tr>
                <td>中标结果公示</td>
                <td>可查看二次</td>
                <td>不限查看次数</td>
                <td>不限查看次数</td>
              </tr>
              <tr>
                <td>单一来源公示</td>
                <td>可查看二次</td>
                <td>不限查看次数</td>
                <td>不限查看次数</td>
              </tr>
              <tr>
                <td>公告信息收藏</td>
                <td>不可收藏</td>
                <td>可收藏</td>
                <td>可收藏</td>
              </tr>

              <tr>
                <td rowspan="3" class="white">标书服务</td>
                <td>各类标书代写</td>
                <td>无优惠</td>
                <td>面议</td>
                <td>面议</td>
              </tr>
              <tr>
                <td>标书废标项检查</td>
                <td>无</td>
                <td>2次</td>
                <td>4次</td>
              </tr>
              <tr>
                <td>清标服务</td>
                <td>无</td>
                <td>2次</td>
                <td>4次</td>
              </tr>

              <tr>
                <td rowspan="10" class="white">企业功能服务</td>
                <td>查询项目经理</td>
                <td>可查询10次</td>
                <td>不限查看次数</td>
                <td>不限查看次数</td>
              </tr>
              <tr>
                <td>查询业绩</td>
                <td>可查询10次</td>
                <td>不限查看次数</td>
                <td>不限查看次数</td>
              </tr>
              <tr>
                <td>查询资质条件</td>
                <td>可查询10次</td>
                <td>不限查看次数</td>
                <td>不限查看次数</td>
              </tr>
              <tr>
                <!-- <td>资质共享</td>
                <td>不能新增</td>
                <td>可查看共享证书</td>
                <td>可查看共享证书</td> -->
              </tr>
              <tr>
                <td>行业论坛咨询</td>
                <td>可查看不可新建</td>
                <td>不限查看次数</td>
                <td>不限查看次数</td>
              </tr>
              <tr>
                <td>法律咨询</td>
                <td>无</td>
                <td>2次</td>
                <td>4次</td>
              </tr>
              <tr>
                <td>CA办理优惠</td>
                <td>无优惠</td>
                <td>9.5折</td>
                <td>9折</td>
              </tr>
              <tr>
                <td>电子投标保函优惠</td>
                <td>无优惠</td>
                <td>9.5折</td>
                <td>9折</td>
              </tr>
              <tr>
                <td>项目分包</td>
                <td>不可新建分包信息</td>
                <td>可新建、不可查看</td>
                <td>不限查看次数</td>
              </tr>
              <tr>
                <td>推送设置</td>
                <td>可设置，推送10次</td>
                <td>可设置</td>
                <td>可设置</td>
              </tr>

              <tr>
                <td rowspan="2" class="white">最新行业资讯法规</td>
                <td>新闻资讯</td>
                <td>不限制</td>
                <td>不限制</td>
                <td>不限制</td>
              </tr>
              <tr>
                <td>行业法规</td>
                <td>不限制</td>
                <td>不限制</td>
                <td>不限制</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="alert">
          <el-dialog title="立即充值" :visible.sync="centerDialogVisible" center>
            <div class="con">
              <div class="pic">
                <el-avatar :size="50" :src="user.avatar"></el-avatar>
                <span class="name">{{ user.userName }}</span>
                购买 &nbsp;&nbsp;
                <span class="">{{ vipMsg }}</span>
              </div>
              <div class="open">
                <div class="open_c">
                  <p class="">{{ vipMsg }}</p>
                  <div class="line"></div>
                  <p>
                    {{ price }}
                    <span>元/年</span>
                  </p>
                </div>
                <img src="@/assets/img/user/orange.png" alt="" />
              </div>
              <p class="pay_money">
                应付金额：<span>{{ price }}元</span>
              </p>
              <p class="to_look">
                <img src="@/assets/img/user/to_look.png" alt="" />
                <strong>支付方式</strong>&nbsp;&nbsp; 订单支付成功之后，需要开票的用户请前往
                <span>个人中心-购买记录</span>
              </p>
              <div class="pay_list">
                <ul>
                  <li @click="pay = 1" :class="pay == 1 ? 'active' : ''">
                    <div class="pay_list_con">
                      <img src="@/assets/img/login/wx.png" alt="" />
                      <span>微信支付</span>
                    </div>
                    <img v-show="pay == 1" src="@/assets/img/user/blue.png" alt="" class="blue" />
                  </li>
                  <li @click="pay = 2" :class="pay == 2 ? 'active' : ''">
                    <div class="pay_list_con">
                      <img src="@/assets/img/user/zfb.png" alt="" />
                      <span>支付宝支付</span>
                    </div>
                    <img v-show="pay == 2" src="@/assets/img/user/blue.png" alt="" class="blue" />
                  </li>
                  <li @click="pay = 3" :class="pay == 3 ? 'active' : ''">
                    <div class="pay_list_con">
                      <img src="@/assets/img/user/yl.png" alt="" />
                      <span>线下转账支付</span>
                    </div>
                    <img v-show="pay == 3" src="@/assets/img/user/blue.png" alt="" class="blue" />
                  </li>
                </ul>
              </div>
              <div class="btn" @click="nextPay">{{ pay == 3 ? "下一步" : "立即开通" }}</div>
            </div>
          </el-dialog>
          <el-dialog title="线下转账支付" :visible.sync="rechargeVisible" center>
            <recharge :price="price"></recharge>
          </el-dialog>

          <el-dialog :title="title" :visible.sync="payVisible" center class="wxpay">
            <div v-loading="loading">
              <div class="wxpay_img">
                <img :src="qrCode" alt="" style="height: 250px; width: 250px" />
              </div>
              <div class="wxpay_txt">
                {{ descr }}
              </div>
            </div>
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import recharge from "@/components/user/vip_recharge";
import { createOrder, orderQuery as wxOrderQuery } from "@/api/pay/wx";
import { existAudit } from "@/api/pay/xx";
import { pc, orderQuery } from "@/api/pay/zfb";

export default {
  components: { recharge },
  data() {
    return {
      vip2: 1920,
      vip3: 2880,
      index: 1,
      centerDialogVisible: false,
      rechargeVisible: false,
      payVisible: false,
      pay: 1,
      price: 1920,
      vipMsg: "高级会员",
      title: "",
      descr: "",
      loading: false,
      qrCode: "",
      wxQ: "",
      zfbQ: "",
    };
  },
  computed: {
    user() {
      return this.$store.getters["user/user"];
    },
  },
  beforeDestroy() {
    if (this.wxQ) {
      clearInterval(this.wxQ);
    }
    if (this.zfbQ) {
      clearInterval(this.zfbQ);
    }
  },
  methods: {
    clickKt(index) {
      this.index = index;
      if (this.index == 2) {
        this.price = this.vip2;
        this.vipMsg = "高级会员";
      } else if (index == 3) {
        if (this.user.vip == 2) {
          this.price = this.vip3 - this.vip2;
          this.vipMsg = "升级至VIP会员";
        } else {
          this.price = this.vip3;
          this.vipMsg = "VIP会员";
        }
      }
      this.centerDialogVisible = true;
    },
    nextPay() {
      this.centerDialogVisible = false;
      if (this.pay == 1) {
        this.loading = true;
        createOrder({
          VIP: this.index,
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
      } else if (this.pay == 2) {
        pc({
          VIP: this.index,
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
      } else if (this.pay == 3) {
        existAudit().then((res) => {
          if (res.code == 200 && !res.data.exist) {
            this.rechargeVisible = true;
          } else {
            this.$baseAlert("您的线下转账记录已提交，请勿重复提交，如有问题请联系客服。");
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
        orderQuery().then((res) => {
          if (res.code == 200) {
            if (_this.zfbQ) {
              clearInterval(_this.zfbQ);
            }
            this.$store.dispatch("user/getInfo");
            this.$baseAlert("您已成功支付。", "", () => {});
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
        wxOrderQuery().then((res) => {
          if (res.code == 200) {
            if (_this.wxQ) {
              clearInterval(_this.wxQ);
            }
            this.$store.dispatch("user/getInfo");
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
  },
};
</script>

<style lang="less" scoped>
.wdzy {
  border: 1px solid transparent;
}

.wdzy_c {
  width: 950px;
  margin: 0 auto;
  margin-top: 30px;

  .tab {
    width: 100%;
    height: 86px;

    ul {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-between;

      li {
        width: 186px;
        height: 100%;
      }

      .gray {
        width: 180px;
        height: 100%;
        text-align: center;
        line-height: 86px;
        font-size: 21px;
        color: rgb(159, 159, 159);
        background-color: rgb(246, 246, 246);
      }

      .orange {
        color: #ffffff;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        p:first-child {
          font-size: 22px;
        }
      }

      li:nth-child(3) {
        background-color: rgb(248, 203, 182);
      }

      li:nth-child(4) {
        background-color: rgb(244, 175, 144);
      }

      li:nth-child(5) {
        background-color: rgb(245, 143, 94);
      }
    }
  }

  .title {
    width: 100%;
    height: 86px;
    margin-top: 20px;

    ul {
      width: 574px;
      height: 100%;
      float: right;
      display: flex;
      justify-content: space-between;

      li {
        width: 186px;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;

        &:before,
        &:after {
          content: "";
          display: block;
        }

        p {
          width: 50%;
          display: flex;
          align-items: center;
          justify-content: space-between;

          &:before,
          &:after {
            content: "";
            display: block;
          }

          .new {
            font-size: 22px;
            color: rgb(201, 68, 37);
          }

          .old {
            text-decoration: line-through;
          }
        }

        button {
          width: 130px;
          height: 32px;
          text-align: center;
          line-height: 32px;
          border-radius: 16px;
          color: #ffffff;
          cursor: pointer;
          background-color: rgb(255, 83, 1);
        }
        .opened {
          background-color: #1da7f3 !important;
        }
      }
    }
  }

  .table {
    width: 100%;
    margin-bottom: 20px;

    table,
    table tr th,
    table tr td {
      border: 1px solid #f2efef;
    }

    table {
      width: 100%;
      text-align: center;
      margin-top: 10px;
      border-collapse: collapse;
      tr td:last-child {
        width: 188px;
      }
      tr td:nth-child(4) {
        width: 190px;
      }
      tr td:nth-child(3) {
        width: 190px;
      }
      td {
        height: 38px;
      }

      tr:nth-child(even) {
        background-color: rgb(246, 246, 246);
      }

      .white {
        background-color: #fff;
      }
    }
  }

  .alert {
    /deep/ .el-dialog {
      width: 850px;
      overflow: hidden;
      margin-top: 10vh !important;

      .el-dialog__header {
        background-color: rgb(64, 158, 255);

        .el-dialog__title {
          color: #ffffff;
        }

        .el-icon-close {
          color: #fff;
        }
      }

      .el-dialog__body {
        padding: 0;
      }

      .con {
        width: 736px;
        margin: 0 auto;
        margin-top: 15px;

        .pic {
          width: 100%;
          height: 50px;
          font-size: 16px;
          display: flex;
          align-items: center;

          .el-avatar {
            margin-right: 10px;
          }

          .name {
            margin-right: 10px;
          }
        }

        .open {
          width: 328px;
          height: 160px;
          margin: 0 auto;
          margin-top: 10px;
          border-radius: 14px;
          border: 2px solid #fe6f0f;
          display: flex;
          align-items: center;
          justify-content: space-around;
          position: relative;

          .open_c {
            width: 260px;
            height: 100px;
            color: rgb(255, 109, 15);
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: space-between;

            &:before,
            &:after {
              content: "";
              display: block;
            }

            p:first-child {
              font-size: 20px;
            }

            p:last-child {
              font-size: 25px;
              color: rgb(255, 112, 16);

              span {
                font-weight: 100;
                font-size: 17px;
              }
            }

            .line {
              width: 100%;
              height: 2px;
              background: linear-gradient(to right, rgba(255, 163, 104, 0.2) 0%, rgba(255, 163, 104) 50%, rgba(255, 163, 104, 0.2) 100%);
            }
          }

          img {
            position: absolute;
            bottom: -1px;
            right: -1px;
          }
        }

        .pay_money {
          width: 100%;
          text-align: center;
          margin: 0 auto;
          margin-top: 30px;
          font-size: 18px;

          span {
            color: rgb(255, 114, 15);
          }
        }

        .to_look {
          width: 100%;
          margin-top: 30px;
          display: flex;
          align-items: center;

          img {
            width: 25px;
            margin-right: 10px;
          }

          span {
            color: rgb(64, 159, 253);
          }
        }

        .pay_list {
          width: 660px;
          height: 70px;
          margin: 0 auto;
          margin-top: 40px;

          ul {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: space-between;

            li {
              width: 208px;
              height: 100%;
              border-radius: 14px;
              border: 2px solid rgb(225, 225, 225);
              position: relative;
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: space-between;

              &:before,
              &:after {
                content: "";
                display: block;
              }

              .pay_list_con {
                width: 140px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: space-between;

                &:before,
                &:after {
                  content: "";
                  display: block;
                }

                img {
                  width: 40px;
                  height: 40px;
                }
              }

              .blue {
                position: absolute;
                bottom: -1px;
                right: -1px;
              }
            }

            .active {
              border-color: rgb(65, 100, 230);
            }
          }
        }

        .btn {
          width: 160px;
          height: 32px;
          text-align: center;
          line-height: 32px;
          color: #ffffff;
          border-radius: 16px;
          margin: 0 auto;
          margin-top: 30px;
          margin-bottom: 30px;
          cursor: pointer;
          background-color: rgb(64, 158, 255);
        }
      }
    }
  }
}
.wxpay {
  .wxpay_img {
    width: 100%;
    height: 250px;
    margin-top: 20px;
    display: flex;
    justify-content: space-around;
  }
  .wxpay_txt {
    text-align: center;
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 20px;
  }
}
</style>
