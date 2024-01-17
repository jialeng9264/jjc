<template>
  <div>
    <div class="navigation">
      <div class="logo fl" @click="$router.push('/')">
        <img src="~@/assets/img/logo/logo_png.png" alt="" />
      </div>

      <div class="navigation-sub fl">
        <ul>
          <li v-for="(item, index) in menuLists" :key="index" :to="item.link">
            <router-link
              :to="{
                name: item.link
              }"
              active-class="active"
            >
              <img :src="item.url" alt="" />
              <img :src="item.pic" class="pic" />
              {{ item.title }}
            </router-link>
          </li>
        </ul>
      </div>
      <div v-if="hasToken" class="user_information fr">
        <div class="block" @click="toindex"><el-avatar :size="55" :src="avatar"></el-avatar></div>
        <el-dropdown @command="handleClick">
          <span class="el-dropdown-link" @click="$router.push('/user/index')">{{ name }}</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="1">首页</el-dropdown-item>
            <el-dropdown-item command="2">个人中心</el-dropdown-item>
            <el-dropdown-item command="3">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div v-else class="register-login fr">
        <div class="register-login_c">
          <span class="register" @click="register">注册</span>
          |
          <span class="login" @click="login">登录</span>
        </div>
      </div>
    </div>
    <login ref="login"></login>
  </div>
</template>

<script>
import store from "@/store";
import login from "@/components/login";
export default {
  components: {
    login,
  },
  data() {
    return {
      menuLists: [
        {
          title: "首页",
          link: "home",
        },
        {
          title: "公示公告",
          link: "zbxm",
          pic: require("@/assets/img/header/hot.png"),
        },
        {
          title: "资质共享",
          link: "zzgx",
        },
        {
          title: "分包信息",
          link: "fbxx",
        },
        {
          title: "最新资讯",
          link: "zxzx",
          pic: require("@/assets/img/header/new.png"),
        },
        {
          title: "行业论坛",
          link: "hylt",
        },
        {
          url: require("@/assets/img/header/vip.png"),
          title: "加入VIP会员",
          link: "member",
        },
      ],
      activeIndex: 0,
      loading: false,
      form: {
        type: "2",
        userName: "cs",
        password: "1",
      },
      // 头像
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
    };
  },
  created() {
    this.buildActive(this.$route);
  },
  computed: {
    hasToken() {
      return store.getters["user/accessToken"];
    },
    name() {
      return store.getters["user/userName"];
    },
    avatar() {
      return store.getters["user/avatar"];
    },
  },
  methods: {
    changeIndex(index) {
      this.activeIndex = index;
    },
    register() {
      this.$router.replace("/anon/register");
    },
    login() {
      this.$refs.login.dialogVisible = true;
    },
    toindex(){
      this.$router.push("/user/index");
    },
    handleClick(command) {
      switch (command) {
        case "1":
          this.$router.push("/home");
          break;
        case "2":
          this.$router.push("/user/index");
          break;
        case "3":
          this.$baseConfirm(`确定要退出【${this.$baseTitle}】系统吗？`, "温馨提示", () => {
            store.dispatch("user/logout");
            this.$router.push("/");
          });
          break;
      }
    },
    buildActive(val) {
      this.menuLists.map((item, index) => {
        if (val.path && val.path.indexOf(item.link) !== -1) {
          this.activeIndex = index;
        }
      });
    },
  },
  watch: {
    $route(val) {
      this.buildActive(val);
    },
  },
};
</script>

<style lang="less">
.user_information {
  .block {
    width: 55px;
    height: 55px;
    cursor: pointer;
    margin-top: 2.5px;
  }
  .el-dropdown {
    max-width: 140px;
    margin-left: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.el-dropdown-link {
  cursor: pointer;
}
.el-dropdown-menu {
  width: 120px;
  text-align: center;
  .el-dropdown-menu__item {
    font-size: 16px;
  }
}
</style>

<style lang="less" scoped>
@import url("~@/assets/css/header.less");
</style>
