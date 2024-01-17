<template>
  <div>
    <div class="banner">
      <img src="~@/assets/img/member/banner.jpg" alt="" />
    </div>
    <div class="tit">
      <p class="text">多种服务套餐 总有一款适合你</p>
      <div class="tit_c">
        <ul>
          <li>
            <div class="title">普通会员</div>
            <div class="cont_one">
              <span class="ling">0元</span>
              <span class="free">免费体验</span>
            </div>
          </li>
          <li>
            <div class="gaoji" :class="user.vip == 2 ? 'open' : ''">
              <img src="~@/assets/img/member/jian.png" alt="" />
              <span>高级会员</span>
            </div>
            <div class="cont">
              <p class="money">
                <span class="small">￥</span>
                <span class="big">{{ vip2 }}</span>
                <span class="small">/年</span>
              </p>
              <p class="discount">
                <span class="line">{{ vip2 / 0.8 }}</span>
                <span>限时八折</span>
              </p>
              <button v-if="user.vip < 2" @click="clickKt(2)">立即开通</button>
              <button v-if="user.vip == 2" :class="user.vip == 2 ? 'opened' : ''">已开通</button>
              <button v-if="user.vip == 3">无需开通</button>
            </div>
          </li>
          <li>
            <div class="gaoji" :class="user.vip == 3 ? 'open' : ''">
              <span>VIP会员</span>
            </div>
            <div class="cont">
              <p class="money">
                <span class="small">￥</span>
                <span class="big">{{ vip3 }}</span>
                <span class="small">/年</span>
              </p>
              <p class="discount">
                <span class="line">{{ vip3 / 0.8 }}</span>
                <span>限时八折</span>
              </p>
              <button v-if="user.vip < 3" @click="clickKt(3)">
                {{ user.vip == 2 ? "立即升级" : "立即开通" }}
              </button>
              <button v-if="user.vip == 3" :class="user.vip == 3 ? 'opened' : ''">已开通</button>
            </div>
          </li>
          <li>
            <div class="gaoji">
              <span>定制服务</span>
            </div>
            <div class="cont_one">
              <span class="ling">按需定制</span>
              <span class="free">按次购买</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="detailed">
      <p class="text">详细权益对比</p>
      <div class="tables">
        <table width="100%" cellpadding="0" cellspacing="0" style="table-layout: fixed">
          <thead>
            <tr>
              <th>服务分类</th>
              <th>服务项目</th>
              <th>普通会员</th>
              <th>高级会员</th>
              <th>VIP会员</th>
              <th>定制服务</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td rowspan="6" class="col">工程建设</td>
              <td class="col">立项未招标项目信息</td>
              <td>可查看10次</td>
              <td><img src="~@/assets/img/member/yes.png" alt="" /></td>
              <td><img src="~@/assets/img/member/yes.png" alt="" /></td>
              <td></td>
            </tr>
            <tr>
              <td class="col">招标计划公告</td>
              <td>可查看10次</td>
              <td><img src="~@/assets/img/member/yes.png" alt="" /></td>
              <td><img src="~@/assets/img/member/yes.png" alt="" /></td>
              <td></td>
            </tr>
            <tr>
              <td class="col">招标公告</td>
              <td>可查看10次</td>
              <td><img src="~@/assets/img/member/yes.png" alt="" /></td>
              <td><img src="~@/assets/img/member/yes.png" alt="" /></td>
              <td></td>
            </tr>
            <tr>
              <td class="col">变更公告</td>
              <td>可查看10次</td>
              <td><img src="~@/assets/img/member/yes.png" alt="" /></td>
              <td><img src="~@/assets/img/member/yes.png" alt="" /></td>
              <td></td>
            </tr>
            <tr>
              <td class="col">中标候选人公示</td>
              <td>可查看10次</td>
              <td><img src="~@/assets/img/member/yes.png" alt="" /></td>
              <td><img src="~@/assets/img/member/yes.png" alt="" /></td>
              <td></td>
            </tr>
            <tr>
              <td class="col">中标结果公告</td>
              <td>可查看10次</td>
              <td><img src="~@/assets/img/member/yes.png" alt="" /></td>
              <td><img src="~@/assets/img/member/yes.png" alt="" /></td>
              <td></td>
            </tr>

            <tr>
              <td rowspan="5" class="col">政府采购</td>
              <td class="col">招标公告</td>
              <td>可查看10次</td>
              <td><img src="~@/assets/img/member/yes.png" alt="" /></td>
              <td><img src="~@/assets/img/member/yes.png" alt="" /></td>
              <td></td>
            </tr>
            <tr>
              <td class="col">变更公告</td>
              <td>可查看10次</td>
              <td><img src="~@/assets/img/member/yes.png" alt="" /></td>
              <td><img src="~@/assets/img/member/yes.png" alt="" /></td>
              <td></td>
            </tr>
            <tr>
              <td class="col">中标结果公示</td>
              <td>可查看10次</td>
              <td><img src="~@/assets/img/member/yes.png" alt="" /></td>
              <td><img src="~@/assets/img/member/yes.png" alt="" /></td>
              <td></td>
            </tr>
            <tr>
              <td class="col">单一来源公示</td>
              <td>可查看10次</td>
              <td><img src="~@/assets/img/member/yes.png" alt="" /></td>
              <td><img src="~@/assets/img/member/yes.png" alt="" /></td>
              <td></td>
            </tr>
            <tr>
              <td class="col">公告信息收藏</td>
              <td>不可收藏<img class="no" src="~@/assets/img/member/no.png" alt="" /></td>
              <td><img src="~@/assets/img/member/yes.png" alt="" /></td>
              <td><img src="~@/assets/img/member/yes.png" alt="" /></td>
              <td></td>
            </tr>

            <tr>
              <td rowspan="4" class="col red">标书服务</td>
              <td class="col red">造价咨询</td>
              <td>无<img class="no" src="~@/assets/img/member/no.png" alt="" /></td>
              <td>面议</td>
              <td>面议</td>
              <td>面议</td>
            </tr>
            <tr>
              <td class="col red">各类标书代写</td>
              <td>无优惠<img class="no" src="~@/assets/img/member/no.png" alt="" /></td>
              <td>面议</td>
              <td>面议</td>
              <td>面议</td>
            </tr>
            <tr>
              <td class="col red">标书废标项检查</td>
              <td>无<img class="no" src="~@/assets/img/member/no.png" alt="" /></td>
              <td>2次</td>
              <td>4次</td>
              <td>300/次<button @click="connect">购买</button></td>
            </tr>
            <tr>
              <td class="col red">清标服务</td>
              <td>无<img class="no" src="~@/assets/img/member/no.png" alt="" /></td>
              <td>2次</td>
              <td>4次</td>
              <td>500/次<button @click="connect">购买</button></td>
            </tr>

            <tr>
              <td rowspan="11" class="col">企业功能服务</td>
              <td class="col">查企业业绩</td>
              <td>可查询10次</td>
              <td><img src="~@/assets/img/member/yes.png" alt="" /></td>
              <td><img src="~@/assets/img/member/yes.png" alt="" /></td>
              <td></td>
            </tr>
            <tr>
              <td class="col">查企业信用</td>
              <td>可查询10次</td>
              <td><img src="~@/assets/img/member/yes.png" alt="" /></td>
              <td><img src="~@/assets/img/member/yes.png" alt="" /></td>
              <td></td>
            </tr>
            <tr>
              <td class="col">查项目经理</td>
              <td>可查询10次</td>
              <td><img src="~@/assets/img/member/yes.png" alt="" /></td>
              <td><img src="~@/assets/img/member/yes.png" alt="" /></td>
              <td></td>
            </tr>
            <tr>
              <td class="col">查资质信息</td>
              <td>可查询10次</td>
              <td><img src="~@/assets/img/member/yes.png" alt="" /></td>
              <td><img src="~@/assets/img/member/yes.png" alt="" /></td>
              <td></td>
            </tr>
            <tr>
              <td class="col">行业论坛咨询</td>
              <td>可查看不可新建</td>
              <td><img src="~@/assets/img/member/yes.png" alt="" /></td>
              <td><img src="~@/assets/img/member/yes.png" alt="" /></td>
              <td></td>
            </tr>
            <tr>
              <td class="col red">投标文件范文下载</td>
              <td>不可下载<img class="no" src="~@/assets/img/member/no.png" alt="" /></td>
              <td>2次</td>
              <td>4次</td>
              <td>200/次<button @click="connect">购买</button></td>
            </tr>
            <tr>
              <td class="col red">法律咨询</td>
              <td>无<img class="no" src="~@/assets/img/member/no.png" alt="" /></td>
              <td>2次</td>
              <td>4次</td>
              <td></td>
            </tr>
            <tr>
              <td class="col red">CA办理优惠</td>
              <td>无<img class="no" src="~@/assets/img/member/no.png" alt="" /></td>
              <td>9.5折</td>
              <td>9折</td>
              <td></td>
            </tr>
            <tr>
              <td class="col red">电子投标保函优惠</td>
              <td>无<img class="no" src="~@/assets/img/member/no.png" alt="" /></td>
              <td>9.5折</td>
              <td>9折</td>
              <td></td>
            </tr>
            <tr>
              <td class="col">项目分包</td>
              <td>不可新建分包信息</td>
              <td>可新建、不可查看</td>
              <td><img src="~@/assets/img/member/yes.png" alt="" /></td>
              <td></td>
            </tr>
            <tr>
              <td class="col">定制推送项目/公告</td>
              <td>可设置，推送10次</td>
              <td><img src="~@/assets/img/member/yes.png" alt="" /></td>
              <td><img src="~@/assets/img/member/yes.png" alt="" /></td>
              <td></td>
            </tr>

            <tr>
              <td rowspan="2" class="col">最新行业资讯法规</td>
              <td class="col">新闻资讯</td>
              <td><img src="~@/assets/img/member/yes.png" alt="" /></td>
              <td><img src="~@/assets/img/member/yes.png" alt="" /></td>
              <td><img src="~@/assets/img/member/yes.png" alt="" /></td>
              <td></td>
            </tr>
            <tr>
              <td class="col">行业法规</td>
              <td><img src="~@/assets/img/member/yes.png" alt="" /></td>
              <td><img src="~@/assets/img/member/yes.png" alt="" /></td>
              <td><img src="~@/assets/img/member/yes.png" alt="" /></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- alert -->
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
    connect() {
      this.$baseEventBus.$emit("connect", true);
    },
  },
};
</script>

<style lang="less" scoped>
@import url("~@/assets/css/member/index.less");
.red {
  color: #f56c6c;
  font-weight: bold;
}
.no {
  margin-left: 5px;
}
</style>
