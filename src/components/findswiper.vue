<template>
  <div>
    <!-- 轮播 -->
    <div class="swiper-container">
      <img src="~@/assets/img/public/findswiper_bg.jpg" alt="" />
    </div>

    <!-- 查 -->
    <div class="find">
      <ul>
        <li v-for="(item, index) in finditem" :key="item.index" :class="currentClass(index)" @click="currentInfo(index)">
          <span>{{ item.name }}</span>
        </li>
      </ul>
      <div class="search">
        <img src="~@/assets/img/public/magnifier.png" alt="" />
        <input v-model="searchKey" type="text" placeholder="请输入项目名称、企业名称、项目经理、招标采购意向等信息查询" @keyup.enter="handleSearch" />
        <button class="fr" @click="handleSearch">搜索</button>
      </div>
    </div>
    <div class="white"></div>
  </div>
</template>

<script>
import "swiper/swiper-bundle.css";

export default {
  name: "findswiper",
  props: {
    index: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      currentNumber: this.index,
      finditem: [{ name: "查公告" }, { name: "查项目经理" }, { name: "查企业" },{name: "查招标采购意向"}],
      searchKey: "",
    };
  },
  components: {},
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
  },
  methods: {
    // 查 切换
    currentInfo(index) {
      this.currentNumber = index;
    },
    // 查 切换
    currentClass(index) {
      return [this.currentNumber === index ? "blue" : ""];
    },
    handleSearch() {
      sessionStorage.setItem("searchKey", this.searchKey);
      let routeData;
      switch (this.currentNumber) {
        case 0:
          routeData = this.$router.resolve({
            path: "/common/find_bulletin",
          });
          break;
        case 1:
          routeData = this.$router.resolve({
            path: "/common/find_manager",
          });
          break;
        case 2:
          routeData = this.$router.resolve({
            path: "/common/find_performance",
          });
          break;
        case 3:
          routeData = this.$router.resolve({
            path: "/common/find_intention",
          });
          break;
      }
      window.open(routeData.href, "_blank");
    },
  },
};
</script>

<style lang="less" scoped>
@import url("~@/assets/css/findswiper.less");
</style>
