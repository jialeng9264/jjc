<template>
  <div class="connect">
    <el-dialog :visible.sync="connect" :close-on-click-modal="false">
      <p>请您联系【173-3119-1677】为您服务</p>
      <button @click="connect = false">确认</button>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "connect",
  data() {
    return {
      connect: false,
    };
  },
  created() {
    this.$baseEventBus.$on("connect", (flag) => {
      this.connect = flag || true;
    });
  },
};
</script>

<style scoped lang="less">
.connect {
  /deep/ .el-dialog {
    width: 360px;
    height: 450px;
    box-shadow: none;
    background: url("~@/assets/img/public/link.png") no-repeat;
    background-size: 100% 100%;
    position: relative;
    .el-dialog__headerbtn {
      display: none;
    }
    p {
      width: 100%;
      margin-top: 250px;
      line-height: 20px;
      font-size: 16px;
      text-align: center;
    }
    button {
      width: 250px;
      height: 35px;
      font-size: 20px;
      position: absolute;
      bottom: 40px;
      left: 55px;
      border-radius: 20px;
      color: #fff;
      letter-spacing: 3px;
      cursor: pointer;
      background-image: linear-gradient(to right, #44b3fd, #7053f0);
    }
  }
}
</style>
