<template>
  <div>
    <div class="all">
      <div class="message">
        <div class="message_l fl">
          <div class="logo">
            <h2>个人中心</h2>
          </div>
          <div class="message_list">
            <ul>
              <li v-for="(item, index) in tabs" :key="index" @click="activeName = item.name" :class="{ active: activeName === item.name }">
                <img :src="item.url" alt="" />
                {{ item.label }}
              </li>
            </ul>
          </div>
        </div>
        <div class="message_r fr">
          <div class="xinxi clearfix">
            <div class="xinxi_c fl">
              <el-avatar :size="100" :src="user.avatar"></el-avatar>
              <div class="xinxi_name" ref="xinxi">
                <p>上午好，{{ user.userName }}</p>
                <p v-if="user.uscc">所属企业：{{ user.name }}</p>
                <div v-if="user.vip > 1" @click="clickInv">
                  专属邀请码：<span style="color: red; letter-spacing: 5px">{{ user.invitationCode }}</span>
                  <span>(点击复制)</span>
                </div>
              </div>
            </div>
            <div class="xinxi_center fl" v-if="user.vip > 1">
              <p>会员等级：{{ user.vip === 2 ? "高级会员" : user.vip === 3 ? "VIP会员" : "" }}</p>
              <p v-if="user.vipEndTime">会员到期时间：{{ $baseDayjs(user.vipEndTime).format("YYYY-MM-DD") }}</p>
            </div>
            <div class="edit fr" @click="edit">编辑个人信息</div>
          </div>
          <div v-if="user.vip > 1" class="invitationCode">
            <p>使用您的邀请码注册的用户，开通高级会员后奖励50元，开通VIP会员奖励100元</p>
          </div>
          <div class="message_list_content">
            <div v-for="(item, index) in tabs" :key="index">
              <component v-if="item.name === activeName" :is="item.component" :name="item.name"></component>
            </div>
          </div>
        </div>
      </div>
      <info ref="info"></info>
    </div>
  </div>
</template>

<script>
import info from "@/components/user/info";
import handleClipboard from "@/utils/clipboard";

const wdzy = () => import("@/components/user/wdzy");
const vip = () => import("@/components/user/vip");
const gmjl = () => import("@/components/user/gmjl");
// const wdgz = () => import("@/components/user/wdgz");
// const wdsc = () => import("@/components/user/wdsc");
// const lljl = () => import("@/components/user/lljl");
const xgmm = () => import("@/components/user/xgmm");
const tssz = () => import("@/components/user/tssz");
// const yhgl = () => import("@/components/user/yhgl");
const fbxx = () => import("@/components/user/fbxx");
const zzgx = () => import("@/components/user/zzgx");
const flzx = () => import("@/components/user/flzx");

export default {
  components: {
    info,
  },
  data() {
    return {
      // 菜单
      tabs: [
        {
          label: "我的主页",
          name: "wdzy",
          component: wdzy,
          url: require("@/assets/img/user/wdzy_icon.png"),
        },
        // {
        //   label: "VIP充值",
        //   name: "vip",
        //   component: vip,
        //   url: require("@/assets/img/user/vipcz_icon.png"),
        // },
        {
          label: "购买记录",
          name: "gmjl",
          component: gmjl,
          url: require("@/assets/img/user/gmjl_icon.png"),
        },
        // {
        //   label: "我的关注",
        //   name: "wdgz",
        //   component: wdgz,
        //   url: require("@/assets/img/user/wdgz_icon.png"),
        // },
        // {
        //   label: "我的收藏",
        //   name: "wdsc",
        //   component: wdsc,
        //   url: require("@/assets/img/user/wdsc_icon.png"),
        // },
        // {
        //   label: "浏览记录",
        //   name: "lljl",
        //   component: lljl,
        //   url: require("@/assets/img/user/lljl_icon.png"),
        // },
        {
          label: "修改密码",
          name: "xgmm",
          component: xgmm,
          url: require("@/assets/img/user/xgmm_icon.png"),
        },
        {
          label: "推送设置",
          name: "tssz",
          component: tssz,
          url: require("@/assets/img/user/tssz_icon.png"),
        },
        {
          label: "分包信息",
          name: "fbxx",
          component: fbxx,
          url: require("@/assets/img/user/fbxx_icon.png"),
        },
        {
          label: "资质共享",
          name: "zzgx",
          component: zzgx,
          url: require("@/assets/img/user/zzgx_icon.png"),
        },
        {
          label: "法律咨询",
          name: "flzx",
          component: flzx,
          url: require("@/assets/img/user/flzx_icon.png"),
        },
      ],
      activeName: "wdzy",
    };
  },
  computed: {
    user() {
      return this.$store.getters["user/user"];
    },
  },
  mounted() {
    const activeName = this.$route.params.activeName;
    if (activeName) {
      this.activeName = activeName;
    } else {
      this.activeName = "wdzy";
    }
    const xinxi = this.$refs.xinxi.children;
    if (xinxi.length == 3) {
      this.$refs.xinxi.classList.add("three");
    }
  },
  methods: {
    edit() {
      this.$refs.info.dialogVisible = true;
    },
    clickInv(event) {
      handleClipboard(this.user.invitationCode, event);
    },
  },
};
</script>
<style lang="less">
.wdgz_focus {
  .el-button {
    margin-top: 10px;
  }

  .el-tag {
    margin-top: 10px;
  }
}

.xinxi_c {
  .el-avatar {
    float: left;
  }
}
</style>
<style lang="less" scoped>
@import url("~@/assets/css/user/user.less");
</style>
