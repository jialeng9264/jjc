<template>
  <div>
    <div class="all">
      <findswiper></findswiper>

      <div class="breadcrumb">
        <img src="~@/assets/img/public/dw.png" alt="" />
        <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height: 23px">
          <el-breadcrumb-item>当前位置</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>查公告</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div class="bulletin">
        <div class="bulletin_c">
          <div class="top">
            <el-form ref="form" :model="query" label-width="100px" @submit.native.prevent>
              <el-form-item label="公告标题" placeholder="可同时查询多个关键词，用空格隔开，如：石家庄 环境">
                <el-input
                  placeholder="可同时查询多个关键词，用空格隔开，如：石家庄 环境"
                  v-model="query.titleIn"
                  @keyup.enter.native="handleSearch"
                ></el-input>
              </el-form-item>
              <el-button type="primary" @click="handleSearch">查询</el-button>
            </el-form>
          </div>
          <el-skeleton :rows="6" animated :loading="loading">
            <ul v-if="total > 0">
              <li v-for="(item, index) in tableData" :key="index" @click="handleJump(item)">
                <img src="~@/assets/img/public/xd.png" alt="" />
                <div class="content">
                  <p>
                    <span class="title" :title="item.title">
                      【{{ item.type }}】
                      <span v-html="item.title"></span>
                    </span>
                    <span class="fr">发布时间：{{ $baseDayjs(item.time).format("YYYY-MM-DD") }}</span>
                  </p>
                </div>
              </li>
            </ul>
            <ul v-else>
              <div class="nodate">
                <div v-if="proCode == 200" class="nodate_item">
                  <img src="~@/assets/img/public/nodate.jpg" alt="" />
                </div>
                <div v-else-if="proCode == 405" class="nodate_item">
                  <img src="~@/assets/img/public/update.jpg" alt="" />
                  <el-button type="warning" @click="$router.push('/member');"> 升级高级会员 </el-button>
                </div>
                <div v-else-if="proCode == 406" class="nodate_item">
                  <img src="~@/assets/img/public/update.jpg" alt="" />
                  <el-button type="warning" @click="$router.push('/member');"> 升级VIP会员 </el-button>
                </div>
              </div>
            </ul>
          </el-skeleton>
        </div>
        <div v-if="total > 0" class="fenye">
          <pagination :autoScroll="false" :page.sync="query.page" :limit="query.limit" :total="total" @pagination="pageList"></pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import findswiper from "@/components/findswiper";
import pagination from "@/components/pagination";
import { pageList } from "@/api/gcjs/allG";

export default {
  components: {
    findswiper,
    pagination,
  },
  data() {
    return {
      query: {
        page: 1,
        limit: 14,
        titleIn: "",
        desc: "time",
      },
      total: 0,
      tableData: [],
      loading: false,
      proCode: 200,
    };
  },
  created() {
    const searchKey = sessionStorage.getItem("searchKey");
    if (searchKey) {
      this.query.titleIn = searchKey;
      sessionStorage.removeItem("searchKey");
    }
    this.pageList();
  },
  methods: {
    handleSearch() {
      if (!this.query.titleIn) {
        this.$message({
          message: "请输入要查询的公告标题",
          type: "warning",
        });
        return;
      }
      this.query.page = 1;
      this.pageList();
    },
    async pageList() {
      this.loading = true;
      const { code, msg, data } = await pageList(this.query);
      this.proCode = code;
      if (code === 200) {
        this.total = data.total;
        this.tableData = data.records;
      } else {
        // TODO 加入图片
        this.$baseEventBus.$emit("upgrade", true);
        // this.$baseAlert(msg);
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
          case "废标公告":
            type = "fbgg";
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
.top {
  .el-form-item:last-child {
    margin-left: 20px;
  }
}
.el-breadcrumb {
  .el-breadcrumb__item:last-child .el-breadcrumb__inner {
    color: red;
  }
}
</style>
<style lang="less" scoped>
@import url("~@/assets/css/common/find_bulletin.less");
</style>
