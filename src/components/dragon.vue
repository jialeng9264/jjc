<template>
  <div>
    <div v-if="open" class="fixed">
      <div class="lottery" v-show="close">
        <p class="p p1">迎国庆</p>
        <p class="p p2">幸运大抽奖啦</p>
        <p class="p p3">参与就有机会中奖</p>
        <div class="btn" @click="lottery">
          <span>我要参与</span>
          <i class="el-icon-thumb"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      close: true,
    };
  },
  computed: {
    open() {
      return this.$baseDayjs(new Date()).format("YYYY-MM-DD") < "2022-10-08";
    },
  },
  methods: {
    lottery_close() {
      this.close = false;
    },
    lottery() {
      this.$router.push("/anon/lottery");
    },
  },
};
</script>

<style lang="less" scoped>
.fixed {
  position: fixed;
  left: 5px;
  top: 40%;
  z-index: 359;
  cursor: pointer;
  .lottery {
    width: 250px;
    height: 230px;
    position: relative;
    left: -20px;
    background: url("~@/assets/img/lottery_national_day/lottery.png") no-repeat;
    background-size: 100% 100%;
    color: #fff;
    text-align: center;
    .p {
      position: absolute;
    }
    .p1 {
      font-size: 24px;
      font-weight: 600;
      letter-spacing: 3px;
      top: 72px;
      left: 53%;
      transform: translate(-50%);
    }
    .p2 {
      font-size: 17px;
      font-weight: 600;
      letter-spacing: 3px;
      top: 103px;
      left: 52%;
      transform: translate(-48%);
    }
    .p3 {
      font-size: 12px;
      letter-spacing: 1px;
      top: 175px;
      left: 52%;
      transform: translate(-48%);
    }
    .btn {
      width: 115px;
      height: 35px;
      position: absolute;
      top: 128px;
      left: 53%;
      transform: translate(-50%);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      font-weight: 600;
      font-weight: 600;
      letter-spacing: 3px;
      border-radius: 8px;
      box-shadow: 0px 4px 0px 1px #f15a26;
      background: linear-gradient(to right, #f9ca3a, #f7941f);
    }
  }
}
</style>
