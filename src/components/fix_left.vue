<template>
  <div>
    <div class="fixed" :style="styleobj">
      <img src="~@/assets/img/public/fixed_left.png" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    styleobj() {
      return {
        width: this.$store.state.user.kuan + "px",
      };
    },
  },
};
</script>

<style lang="less" scoped>
.fixed {
  width: 220px;
  height: 125px;
  position: fixed;
  left: 5px;
  top: 20%;
  z-index: 359;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
