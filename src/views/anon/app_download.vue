<template>
  <div>
    <div class="bg">
      <!-- <img src="~@/assets/img/lottery_national_day/publicity.jpg" alt=""> -->
    </div>
  </div>
</template>

<script>
import remConfig from "@/utils/rem";
remConfig();

export default {
  data() {
    return {
    };
  },
  methods: {
  },
};
</script>

<style lang="less" scoped>
@import url("~@/assets/css/reset.css");
.bg{
  width: 100%;
  height: 100vh;
  background: url('~@/assets/img/lottery_national_day/publicity.jpg') no-repeat;
  background-size: 100% 100%;
}
</style>
