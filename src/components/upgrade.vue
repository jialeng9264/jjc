<template>
  <div>
    <div class="govip" v-if="code == 405">
      <el-dialog :visible.sync="goup" :close-on-click-modal="false">
        <button
          @click="
            goup = false;
            $router.push('/member');
          "
         class="govip_btn">
          购买高级会员
        </button>
      </el-dialog>
    </div>
    <div class="goup" v-else-if="code == 406">
      <el-dialog :visible.sync="goup" :close-on-click-modal="false">
        <button
          @click="
            goup = false;
            $router.push('/member');
          "
          class="goup_btn"
        >
          立即升级
        </button>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "upgrade",
  data() {
    return {
      goup: false,
      code: "",
    };
  },
  created() {
    this.$baseEventBus.$on("upgrade", (flag) => {
      this.goup = flag || true;
    });
    this.permission();
  },
  methods: {
    permission() {
      if (this.$store.state.user.vip == 1) {
        this.code = 405;
        return this.code;
      } else if (this.$store.state.user.vip == 2) {
        this.code = 406;
        return this.code;
      }
    },
  },
};
</script>

<style scoped lang="less">
.govip {
  /deep/ .el-dialog {
    width: 340px;
    height: 395px;
    box-shadow: none;
    background: url("~@/assets/img/public/govip.png") no-repeat;
    position: relative;
    .el-dialog__headerbtn {
      position: absolute;
      right: 20px;
      padding: 0;
      background: 0 0;
      border: none;
      outline: 0;
      cursor: pointer;
      font-size: 20px;
    }
    .govip_btn {
      width: 230px;
      height: 38px;
      font-size: 20px;
      background-color: #fe705a;
      position: absolute;
      bottom: 45px;
      left: 55px;
      border-radius: 20px;
      color: #fff;
      letter-spacing: 3px;
      cursor: pointer;
    }
  }
}
.goup {
  /deep/ .el-dialog {
    width: 340px;
    height: 395px;
    box-shadow: none;
    background: url("~@/assets/img/public/goup.png") no-repeat;
    position: relative;
    .el-dialog__headerbtn {
      position: absolute;
      right: 20px;
      padding: 0;
      background: 0 0;
      border: none;
      outline: 0;
      cursor: pointer;
      font-size: 20px;
    }
    .goup_btn {
      width: 230px;
      height: 38px;
      font-size: 20px;
      background-color: #fe705a;
      position: absolute;
      bottom: 45px;
      left: 55px;
      border-radius: 20px;
      color: #fff;
      letter-spacing: 3px;
      cursor: pointer;
    }
  }
}
</style>
