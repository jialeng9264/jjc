<template>
  <div>
    <div class="fix">
      <ul>
        <li @mouseenter="rexian_img_show" @mouseleave="rexian_img_hidden">
          <img src="~@/assets/img/fixed/yc_tel.png" alt="" />
          <span>电话<br />热线</span>
          <div class="rexian" v-if="img_show">173-3119-1677</div>
        </li>
        <li @click="$router.push('/bszz')">
          <img src="~@/assets/img/fixed/yc_bs.png" alt="" />
          <span>标书<br />制作</span>
        </li>
        <li @click="lianxi">
          <img src="~@/assets/img/fixed/yc_bh.png" alt="" />
          <span>保函<br />办理</span>
        </li>
        <li @click="lianxi">
          <img src="~@/assets/img/fixed/yc_qb.png" alt="" />
          <span>辅助<br />清标</span>
        </li>
        <li @click="ask">
          <img src="~@/assets/img/fixed/yc_chat.png" alt="" />
          <span>在线咨询</span>
        </li>
        <li @click="backtop">
          <img src="~@/assets/img/fixed/yc_top.png" alt="" />
          <span>返回<br />顶部</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
let win;
export default {
  data() {
    return {
      img_show: false,
    };
  },
  methods: {
    ask() {
      if (win) {
        win.close();
      }
      let routeData = this.$router.resolve({
        path: "/components/chat_alert",
      });
      win = window.open(routeData.href, "_blank", "width=650,height=500");
    },
    backtop() {
      var timer = setInterval(function () {
        let osTop = document.documentElement.scrollTop || document.body.scrollTop;
        let ispeed = Math.floor(-osTop / 5);
        document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed;
        this.isTop = true;
        if (osTop === 0) {
          clearInterval(timer);
        }
      }, 30);
    },
    rexian_img_show() {
      this.img_show = true;
    },
    rexian_img_hidden() {
      this.img_show = false;
    },
    lianxi() {
      this.$baseEventBus.$emit("lianxi", true);
    },
  },
};
</script>

<style lang="less" scoped>
.fix {
  width: 56px;
  background-color: #fff;
  position: fixed;
  right: 2%;
  top: 22%;
  box-shadow: 0 0 4px 0px #bfbdbd;
  z-index: 359;

  ul {
    width: 100%;
    height: 100%;

    li {
      width: 100%;
      height: 80px;
      padding-top: 10px;
      text-align: center;
      cursor: pointer;
      font-size: 12px;
      border-bottom: 1px solid rgb(227, 227, 227);

      span {
        display: inline-block;
        width: 34px;
        height: 34px;
      }
    }

    li:last-child {
      color: rgb(240, 115, 95);
      background: linear-gradient(rgb(255, 249, 241), rgb(248, 179, 163));
      border-bottom: none;
    }
  }

  li:first-child {
    position: relative;
  }

  .rexian {
    width: 130px;
    height: 24px;
    text-align: center;
    line-height: 24px;
    color: #fff;
    background-color: rgb(239, 113, 90);
    position: absolute;
    top: 28px;
    right: 65px;
  }
}
</style>
