<template>
  <div>
    <div class="all">
      <findswiper></findswiper>

      <div class="breadcrumb">
        <img src="~@/assets/img/public/dw.png" alt="" />
        <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height: 23px">
          <el-breadcrumb-item>当前位置</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>最新资讯</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div class="fbxx_c">
        <div class="tab clearfix">
          <ul>
            <li v-for="(item, index) in fbxxTab" :key="index" @click="clickTab(item, index)" :class="{ active: num === index }">
              {{ item }}
            </li>
          </ul>
          <el-input placeholder="资讯标题" prefix-icon="el-icon-search" v-model="query.titleLike" @keyup.enter.native="handleSearch"></el-input>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
        </div>

        <div class="tab_c">
          <div class="tab_c_cg">
            <el-skeleton :rows="6" animated :loading="loading">
              <ul v-if="total > 0">
                <li v-for="(item, index) in dataList" :key="index" @click="handleJump(item.uuid)">
                  <img src="~@/assets/img/public/xd.png" alt="" />
                  <span class="content" :title="item.title">【{{ item.colTitle }}】{{ item.title }}</span>
                  <span class="fr">
                    发布时间：
                    <span class="time">{{ $baseDayjs(item.publishTime).format("YYYY-MM-DD") }}</span>
                  </span>
                </li>
              </ul>
              <ul v-else-if="total === 0">
                <div class="nodate">
                  <div class="nodate_item">
                    <img src="~@/assets/img/public/nodate.jpg" alt="" />
                  </div>
                </div>
              </ul>
            </el-skeleton>
            <div v-if="total > 0" class="fenye">
              <pagination :autoScroll="false" :page.sync="query.page" :limit="query.limit" :total="total" @pagination="pageList"> </pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import findswiper from "@/components/findswiper";
import pagination from "@/components/pagination/index";
import { pageList } from "@/api/cms/news";

export default {
  components: {
    findswiper,
    pagination,
  },
  data() {
    return {
      fbxxTab: ["最新资讯"],
      num: 0,
      query: { titleLike: "", colSymIn: "", page: 1, limit: 10, desc: "publish_time" },
      loading: false,
      total: -1,
      dataList: [],
    };
  },
  created() {
    this.clickTab("最新资讯,行业法规", 0);
  },
  methods: {
    clickTab(category, index) {
      this.num = index;
      this.query.colSymIn = category;
      this.handleSearch();
    },
    handleSearch() {
      this.query.page = 1;
      this.pageList();
    },
    async pageList() {
      this.loading = true;
      const { code, data } = await pageList(this.query);
      if (code === 200) {
        this.dataList = data.records;
        this.total = data.total;
      } else {
        this.total = 0;
      }
      this.loading = false;
    },
    handleJump(uuid) {
      const routeData = this.$router.resolve({
        path: "/anon/info",
        query: { type: "news", uuid },
      });
      window.open(routeData.href, "_blank");
    },
  },
};
</script>
<style lang="less">
.el-breadcrumb {
  .el-breadcrumb__item:last-child .el-breadcrumb__inner {
    color: red;
  }
}
</style>
<style lang="less" scoped>
@import url("~@/assets/css/zxzx/zxzx.less");
</style>
