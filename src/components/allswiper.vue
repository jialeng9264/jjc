<template>
  <div>
    <div class="wrapper">
      <swiper ref="mySwiper" :options="swiperOptions">
        <swiper-slide v-for="(item, i) in picList" :key="i"><img :src="item.src" /></swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
  </div>
</template>
<script>
export default {
  name: "allswiper", // 此处不能用Swiper作为name，否则报错
  data() {
    return {
      swiperOptions: {
        pagination: ".swiper-pagination", // 轮播图的点
        loop: true, // 循环
      },
      picList: [
        { id: 0, src: "https://gtms01.alicdn.com/tps/i1/T1Ww_JFEpdXXcZd9sr-640-200.png" },
        { id: 1, src: "https://gw.alicdn.com/imgextra/i3/149/O1CN01wekXPw1CyHZ23AC4R_!!149-0-lubanu.jpg" },
      ],
    };
  },
};
</script>
<style lang="less" scoped>
.swiper-slide img {
  width: 100%;
}
</style>
