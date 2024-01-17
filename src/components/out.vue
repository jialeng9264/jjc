<template>
  <div>
    <div class="out">
      <el-dialog title="温馨提示" :visible.sync="out" style="margin-top: 15vh" :close-on-click-modal="false">
        <span>您好，您的免费次数已用完！</span>
        <button
          @click="
            out = false;
            $router.push({ name: 'user/index', params: { activeName: 'vip' } });
          "
        >
          加入会员
        </button>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "out",
  data() {
    return {
      out: false,
    };
  },
  created() {
    this.$baseEventBus.$on("out", (flag) => {
      this.out = flag || true;
    });
  },
};
</script>

<style scoped>
button {
  width: 95px;
  height: 35px;
  font-size: 14px;
  background-color: #3991d8;
  position: absolute;
  bottom: 15px;
  left: 67px;
  border-radius: 8px;
  color: #fff;
  letter-spacing: 3px;
  cursor: pointer;
}
</style>
<style lang="less" scoped>
.out {
  /deep/ .el-dialog {
    width: 403px;
    height: 170px;
    box-shadow: none;
    background: url("~@/assets/img/public/out.png") no-repeat;
    position: relative;
    .el-dialog__header {
      padding-top: 10px;

      .el-dialog__title {
        color: rgb(71, 153, 219);
      }
    }
    .el-dialog__body {
      font-size: 17px;
      padding-top: 20px;
    }
    .el-dialog__headerbtn{
      top: 10px;
    }
  }
}
</style>
