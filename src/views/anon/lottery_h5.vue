<template>
  <div>
    <div class="all">
      <div class="logo">
        <img src="~@/assets/img/lottery_national_day/logo.png" alt="" />
      </div>
      <div class="title1">迎国庆抽奖啦</div>
      <div class="title2">幸运大转盘 好礼转不停</div>
      <div class="lottery">
        <div class="lottery_c">
          <div class="lottery_con">
            <img class="dish" src="~@/assets/img/lottery/turntable.png" :style="{ transform: rotate_deg, transition: rotate_transition }" />
            <img class="pointer" src="~@/assets/img/lottery/pointer.png" @click="start" />
          </div>
        </div>
      </div>
      <div class="record">
        <div class="list">
          <vue-seamless-scroll v-if="lists.length > 3" :data="lists" class="warp" :class-option="classOption">
            <ul>
              <li v-for="(item, index) in lists" :key="index">
                <span>{{ item.phone }}</span>
                <span>{{ item.winName }}</span>
              </li>
            </ul>
          </vue-seamless-scroll>
          <ul v-else>
            <li v-for="(item, index) in lists" :key="index">
              <span>{{ item.phone }}</span>
              <span>{{ item.winName }}</span>
            </li>
          </ul>
        </div>
        <div class="btn" @click="look">查看我的奖品</div>
      </div>
      <div class="rule">
        <div class="rule_btn">活动规则</div>
        <div class="rule_c">
          <ul>
            <li>1、活动时间：2022年10日1日 至 2022年10月7日</li>
            <li>2、每位用户只有一次抽奖机会</li>
            <li>3、活动过程中，如出现违规作弊行为，将根据规则取消用户一切奖励</li>
            <li>4、请保持手机畅通，工作人员将在活动结束后，2个工作日内联系您发放奖品</li>
            <li>5、本活动最终解释权归本单位所有</li>
          </ul>
        </div>
      </div>
      <!-- <div class="rule">
        <div class="rule_btn">奖品发放</div>
        <div class="rule_c">
          <ul>
            <li>1、活动时间：2022年10日1日-2022年10月7日</li>
            <li>2、每位用户只有一次抽奖机会</li>
            <li>3、活动过程中，如出现违规作弊行为，将根据规则取消用户一切奖励</li>
            <li>4、请保持手机畅通，工作人员将在活动结束后，2个工作日内联系您发放奖品</li>
            <li>5、本活动最终解释权归本单位所有</li>
          </ul>
        </div>
      </div> -->
    </div>

    <el-dialog :visible.sync="gift" center class="gift" :show-close="false" :close-on-click-modal="false">
      <div class="gift_c">
        <p class="gift_txt"><span class="wid">奖品：</span>{{ lottery.winName }}</p>
        <p class="gift_txt"><span class="wid">中奖时间：</span>{{ $baseDayjs(lottery.winTime).format("YYYY-MM-DD HH:mm:ss") }}</p>
        <div class="information_c_none" v-if="lottery.status === '1'">
          <p class="gift_txt"><span class="wid">联系人：</span>{{ lottery.contactPerson }}</p>
          <p class="gift_txt"><span class="wid">联系电话：</span>{{ lottery.contactNumber }}</p>
          <p class="gift_txt"><span class="wid">联系地址：</span>{{ lottery.address }}</p>
          <div class="btn btns" @click="gift = false">关闭</div>
        </div>
        <div class="information_c" v-else>
          <i class="el-icon-circle-close ico" @click="gift = false"></i>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="6.5rem" class="demo-ruleForm">
            <el-form-item label="联系人：" prop="contactPerson">
              <el-input v-model="ruleForm.contactPerson"></el-input>
            </el-form-item>
            <el-form-item label="联系电话：" prop="contactNumber">
              <el-input v-model="ruleForm.contactNumber"></el-input>
            </el-form-item>
            <el-form-item label="联系地址：" prop="address">
              <el-input type="textarea" v-model="ruleForm.address"></el-input>
            </el-form-item>
          </el-form>
          <div class="btn" @click="submit">提交</div>
        </div>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="notwin" center class="notwin" :show-close="false" :close-on-click-modal="false">
      <div class="notwin_c">
        <p class="tit">您未中奖</p>
        <p class="txt">很遗憾未中奖 感谢您的参与</p>
        <div class="sure" @click="nowin">确认</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { lottery, get, list, login, save } from "@/api/other/prizeWin.js";
import vueSeamlessScroll from "vue-seamless-scroll";
import { validatorPhone } from "@/utils/validator";
import remConfig from "@/utils/rem";
import { tokenName } from "@/config/settings";
import Toast from "vant/lib/toast";
import "vant/lib/toast/style";
remConfig();

export default {
  components: {
    vueSeamlessScroll,
  },
  data() {
    return {
      userUuid: "",
      lists: [],
      circleList: [], //原点设置
      cat: 60, //总共6个扇形区域，每个区域约60度
      isAllowClick: true, //是否能够点击
      rotate_deg: 0, //指针旋转的角度
      rotate_transition: "transform 3s ease-in-out", //初始化选中的过度属性控制
      classOption: {
        step: 1,
        limitMoveNum: 3, // 开启无缝滚动的数据量(默认5)
        hoverStop: false, // 是否开启鼠标悬停stop
      },
      gift: false,
      notwin: false,
      lottery: {},
      ruleForm: {
        contactPerson: "",
        contactNumber: "",
        address: "",
      },
      rules: {
        contactPerson: [{ required: true, message: "请输入联系人姓名", trigger: "blur" }],
        contactNumber: [{ required: true, validator: validatorPhone, trigger: "blur" }],
        address: [{ required: true, message: "请输入联系地址", trigger: "blur" }],
      },
      token: [],
    };
  },
  created() {
    this.userUuid = this.$route.query.uid;
    if (this.userUuid) {
      this.login();
    } else {
      Toast("请您先登录后在进行抽奖");
    }
  },
  beforeDestroy() {
    this.$store.dispatch("user/resetAccessToken");
  },
  methods: {
    async login() {
      const { code, data } = await login({ userUuid: this.userUuid, category: "国庆节抽奖活动" });
      if (code === 200) {
        this.$store.commit("user/setAccessToken", data[tokenName]);
        this.listPrize();
      }
    },
    async listPrize() {
      const { code, data } = await list({ category: "国庆节抽奖活动" });
      if (code === 200) {
        this.lists = data;
      }
    },
    async look() {
      if (!this.isAllowClick) {
        Toast("请您等待抽奖完毕");
        return;
      }
      const { code, data } = await get();
      if (code == 200) {
        this.lottery = data;
      } else {
        Toast("请您先参与抽奖");
        return;
      }
      if (this.lottery.winName == "谢谢参与") {
        this.notwin = true;
      } else {
        this.gift = true;
      }
    },
    async get() {
      const { code, data } = await get();
      if (code === 200) {
        this.lottery = data;
      }
    },
    nowin() {
      this.notwin = false;
      this.rotate_transition = "transform 0s ease-in-out";
      this.rotate_deg = "rotate(0deg)";
    },
    async submit() {
      this.$refs["ruleForm"].validate(async (valid) => {
        if (valid) {
          const { code, msg } = await save(this.ruleForm);
          if (code === 200) {
            this.gift = false;
            Toast({
              message: "提交成功",
              icon: "success",
              duration: 3000,
            });
            this.lottery.status = "1";
            await this.get();
          } else {
            Toast(msg);
          }
        }
      });
    },
    start() {
      if (!this.isAllowClick) return;
      if (this.lottery && this.lottery.uuid) {
        Toast("您已参与过抽奖，请您点击我的奖品进行查看");
        return;
      }
      this.isAllowClick = false;
      this.rotate_transition = "transform 0s linear";
      this.rotate_deg = "rotate(0deg)";
      this.rotate_transition = "transform 10s linear";
      var rand_circle = 10;
      var deg = rand_circle * 360; //将要旋转的度数  由于是顺时针的转动方向需要用360度来减
      this.rotate_deg = "rotate(" + deg + "deg)";
      let win = {};
      let time_count = 1;
      let inter = setInterval(() => {
        if (time_count >= 5 && time_count <= rand_circle && win.angle) {
          clearInterval(inter);
          this.rotate_transition = "transform " + time_count + "s ease-out";
          deg = time_count * 360 + 3 * 360 - win.angle;
          this.rotate_deg = "rotate(" + deg + "deg)";
          setTimeout(() => {
            this.isAllowClick = true;
            this.look();
            this.listPrize();
          }, time_count * 1000);
        } else if (time_count > rand_circle + 2) {
          clearInterval(inter);
        }
        time_count = time_count + 1;
      }, 1000);
      lottery({ category: "国庆节抽奖活动", device: "APP" })
        .then((res) => {
          if (res.code === 200) {
            win = res.data;
          } else {
            Toast(res.msg);
            this.rotate_transition = "transform 0s ease-in-out";
            this.rotate_deg = "rotate(0deg)";
            this.isAllowClick = true;
            clearInterval(inter);
            this.get();
          }
        })
        .catch(() => {
          Toast.fail("网络异常，请稍后再试");
          this.rotate_transition = "transform 0s ease-in-out";
          this.rotate_deg = "rotate(0deg)";
          this.isAllowClick = true;
          clearInterval(inter);
        });
    },
  },
};
</script>

<style lang="less" scoped>
@import url("~@/assets/css/reset.css");
@import url("~@/assets/css/anon/lottery_h5.less");
</style>
