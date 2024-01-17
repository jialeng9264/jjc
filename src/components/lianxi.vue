<template>
  <div class="lianxi">
    <el-dialog :visible.sync="lianxi" :close-on-click-modal="false">
      <i class="el-icon-close" @click="lianxi = false"></i>
      <button @click="lianxi = false">确认</button>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "lianxi",
  data() {
    return {
      lianxi: false,
    };
  },
  created() {
    this.$baseEventBus.$on("lianxi", (flag) => {
      this.lianxi = flag || true;
    });
  },
};
</script>

<style scoped lang="less">
.lianxi {
  /deep/ .el-dialog {
    width: 600px;
    height: 376px;
    box-shadow: none;
    background: url("~@/assets/img/public/links.png") no-repeat;
    background-size: 100% 100%;
    position: relative;
    .el-dialog__headerbtn {
      display: none;
    }
    i {
      width: 20px;
      height: 20px;
      background-color: rgb(254, 203, 187);
      border-radius: 50%;
      line-height: 20px;
      text-align: center;
      position: absolute;
      top: 20px;
      right: 30px;
      color: #fff;
      cursor: pointer;
    }
    button {
      width: 390px;
      height: 35px;
      font-size: 20px;
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translate(-50%);
      border-radius: 20px;
      color: #fff;
      letter-spacing: 3px;
      cursor: pointer;
      background-color: rgb(252, 83, 31);
    }
  }
}
</style>
