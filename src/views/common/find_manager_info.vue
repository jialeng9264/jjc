<template>
  <div>
    <div class="all">
      <findswiper :index="1"></findswiper>

      <div class="breadcrumb">
        <img src="~@/assets/img/public/dw.png" alt="" />
        <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height: 23px">
          <el-breadcrumb-item>当前位置</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>查项目经理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div class="bulletin">
        <el-button type="danger" class="close" @click="close()">关闭本页</el-button>
        <div class="bulletin_c">
          <div class="top">
            <ul>
              <li>
                <span>姓名</span>
                <span class="name">{{ query.xmjl }}</span>
              </li>
              <li>
                <span>公司名称</span>
                <span class="name">{{ query.zhbdw }}</span>
                <el-button type="primary" @click="see" class="see">查看公司信息</el-button>
              </li>
            </ul>
          </div>
          <div class="zbxm">中标项目</div>

          <el-skeleton :rows="6" animated :loading="loading">
            <ul v-if="total > 0">
              <li v-for="(item, index) in tableData" :key="index" @click="handleJump(item)">
                <img src="~@/assets/img/public/xd.png" alt="" />
                <div class="content" :title="item.title">
                  <p v-html="item.title"></p>
                  <p>
                    <span>项目经理名称：{{ item.xmjl }}</span>
                    <span>中标金额：{{ item.zhbje }}</span>
                    <span>中标时间：{{ $baseDayjs(item.time).format("YYYY-MM-DD") }}</span>
                  </p>
                </div>
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
        </div>
        <div class="fenye">
          <pagination :autoScroll="false" :page.sync="query.page" :limit="query.limit" :total="total" @pagination="pageList"></pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { pageList } from "@/api/gcjs/zhbgg";
import pagination from "@/components/pagination";
import findswiper from "@/components/findswiper";

export default {
  components: { findswiper, pagination },
  data() {
    return {
      query: {
        page: 1,
        limit: 8,
        desc: "createdTime",
        xmjl: "",
        zhbdw: "",
      },
      total: 0,
      tableData: [],
      loading: false,
    };
  },
  created() {
    const { name, qyName } = this.$route.query;
    this.query.xmjl = name;
    this.query.zhbdw = qyName;
    this.pageList();
  },
  methods: {
    close() {
      window.location.href = "about:blank";
      window.close();
    },
    see() {
      sessionStorage.setItem("zhbdw", this.query.zhbdw);
      this.$router.push('/common/find_performance')
    },
    async pageList() {
      this.loading = true;
      const { code, data } = await pageList(this.query);
      if (code === 200) {
        this.tableData = data.records;
        this.total = data.total;
      }
      this.loading = false;
    },
    handleJump(item) {
      let type = "";
      if (item.category === "工程建设") {
        switch (item.type) {
          case "招标公告":
            type = "gcZbgg";
            break;
          case "变更公告":
            type = "gcBggg";
            break;
          case "中标候选人公示":
            type = "gcZbhxrgs";
            break;
          case "中标公告":
            type = "gcZhongbgg";
            break;
        }
      } else if (item.category === "依法非招标") {
        switch (item.type) {
          case "招标公告":
            type = "fZbgg";
            break;
          case "变更公告":
            type = "fBggg";
            break;
          case "中标候选人公示":
            type = "fZbhxrgs";
            break;
          case "中标公告":
            type = "fZhbgg";
            break;
        }
      } else {
        switch (item.type) {
          case "采购/预审公告":
            type = "zbgg";
            break;
          case "更正公告":
            type = "gzgg";
            break;
          case "中标(成交)结果公告":
            type = "zhbgg";
            break;
          case "单一来源":
            type = "dyly";
            break;
        }
      }
      const routeData = this.$router.resolve({
        path: "/common/ggInfo",
        query: { type, uuid: item.uuid },
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
@import url("~@/assets/css/common/find_manager_info.less");
</style>
