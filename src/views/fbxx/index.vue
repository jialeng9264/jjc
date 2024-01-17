<template>
  <div>
    <div class="all">
      <findswiper></findswiper>

      <div class="breadcrumb">
        <img src="~@/assets/img/public/dw.png" alt="" />
        <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height: 23px">
          <el-breadcrumb-item>当前位置</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>分包信息</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div class="fbxx_c">
        <div class="tab clearfix">
          <ul>
            <li v-for="(item, index) in fbxxTab" :key="index" @click="clickTab(item, index)" :class="{ active: num === index }">
              {{ item }}
            </li>
          </ul>
          <el-input placeholder="分包标题" prefix-icon="el-icon-search" v-model="query.titleLike" @keyup.enter.native="handleSearch"></el-input>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
        </div>

        <div class="tab_c">
          <div class="tab_c_cg">
            <el-skeleton :rows="6" animated :loading="loading">
              <ul v-if="total > 0">
                <li v-for="(item, index) in dataList" :key="index" @click="handleJump(item.uuid)">
                  <img src="~@/assets/img/public/xd.png" alt="" />
                  <span class="content" :title="item.title">{{ item.title }}</span>
                  <span class="fr">
                    发布时间：
                    <span class="time">{{ $baseDayjs(item.time).format("YYYY-MM-DD") }}</span>
                  </span>
                </li>
              </ul>
              <ul v-else>
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
      <div class="goup">
        <el-dialog :visible.sync="goup" :close-on-click-modal="false">
          <button
            @click="
              goup = false;
              $router.push({ name: 'user/index', params: { activeName: 'vip' } });
            "
          >
            立即升级
          </button>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import findswiper from "@/components/findswiper";
import pagination from "@/components/pagination/index";
import { pageList } from "@/api/user/subcontract";

export default {
  components: {
    findswiper,
    pagination,
  },
  data() {
    return {
      fbxxTab: ["分包信息"],
      num: 0,
      query: { titleLike: "", category: "", page: 1, limit: 10, desc: "time", status: "1" },
      total: 0,
      dataList: [],
      loading: false,
      goup: false,
    };
  },
  created() {
    this.clickTab("", 0);
  },
  methods: {
    clickTab(category, index) {
      this.num = index;
      this.handleSearch();
    },
    handleSearch() {
      this.query.page = 1;
      this.pageList();
    },
    async pageList() {
      this.loading = true;
      const { code, msg, data } = await pageList(this.query);
      if (code === 200) {
        this.dataList = data.records;
        this.total = data.total;
      } else {
        // TODO 加入图片
        this.goup = true;
        this.query.page = 1;
        // this.$baseAlert(msg);
      }
      this.loading = false;
    },
    handleJump(uuid) {
      const routeData = this.$router.resolve({
        path: "/common/ggInfo",
        query: { type: "fbxx", uuid },
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
@import url("~@/assets/css/fbxx/fbxx.less");
</style>
