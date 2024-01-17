<template>
  <div>
    <div class="lljl">
      <div class="lljl_title clearfix">
        <div class="lljl_title_l fl">
          <img src="~@/assets/img/user/lljl.png" alt="" />
          <span>浏览记录</span>
        </div>
        <div class="lljl_title_r fr">
          <el-input placeholder="标题名称" prefix-icon="el-icon-search" v-model="query.titleLike" @keyup.enter.native="handleSearch"> </el-input>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
        </div>
      </div>
      <div class="lljl_c">
        <el-skeleton :rows="6" animated :loading="loading">
          <ul v-if="total > 0">
            <li v-for="(item, index) in tableData" :key="index" @click="handleClick(item.sym, item.refUuid)">
              <span class="neirong">
                <span class="se">【{{ item.type }}】</span>
                {{ item.title }}
              </span>
              <span class="fr">浏览时间：{{ $baseDayjs(item.updatedTime).format("YYYY-MM-DD HH:mm:ss") }}</span>
            </li>
          </ul>
          <ul v-else>
            <el-empty :image-size="200"></el-empty>
          </ul>
        </el-skeleton>
      </div>
      <div v-if="total > 0" class="fenye">
        <pagination :autoScroll="false" :page.sync="query.page" :limit="query.limit" :total="total" @pagination="pageList"> </pagination>
      </div>
    </div>

    <gcXmInfo ref="gcXmInfo"></gcXmInfo>
  </div>
</template>

<script>
import pagination from "@/components/pagination/index";
import { pageList } from "@/api/user/browsingRecords";
import gcXmInfo from "@/views/common/gcXmInfo";

export default {
  components: { pagination, gcXmInfo },
  data() {
    return {
      query: {
        page: 1,
        limit: 13,
        titleLike: "",
        desc: "created_time",
      },
      total: 0,
      tableData: [],
      gcXmUuid: "",
      loading: false,
    };
  },
  created() {
    this.handleSearch();
  },
  methods: {
    handleSearch() {
      this.query.page = 1;
      this.pageList();
    },
    async pageList() {
      this.loading = true;
      const { code, data } = await pageList(this.query);
      if (code === 200) {
        this.tableData = data.records;
        this.total = data.total > 300 ? 300 : data.total;
      }
      this.loading = false;
    },
    handleClick(sym, refUuid) {
      switch (sym) {
        case "gcZbgg":
        case "gcZbjhgg":
        case "gcBggg":
        case "gcZbhxrgs":
        case "gcZhongbgg":
        case "fZbgg":
        case "fBggg":
        case "fZbhxrgs":
        case "fZhbgg":
        case "zbgg":
        case "gzgg":
        case "zhbgg":
        case "fbgg":
        case "dyly":
        case "fbxx":
          {
            const routeData = this.$router.resolve({
              path: "/common/ggInfo",
              query: { type: sym, uuid: refUuid },
            });
            window.open(routeData.href, "_blank");
          }
          break;
        case "xm":
          {
            const routeData = this.$router.resolve({
              path: "/common/xmInfo",
              query: { type: sym, uuid: refUuid },
            });
            window.open(routeData.href, "_blank");
          }
          break;
        case "gcXm":
          this.$refs.gcXmInfo.uuid = refUuid;
          this.$refs.gcXmInfo.dialogShow = true;
          break;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.lljl {
  border: 1px solid transparent;
  .el-input {
    width: 400px;
  }
}
.lljl_title {
  width: 870px;
  height: 40px;
  margin: 0 auto;
  margin-top: 20px;
  .lljl_title_l {
    width: 200px;
    height: 100%;
    font-size: 21px;
    line-height: 35px;
    letter-spacing: 2px;
    color: rgb(45, 83, 156);
  }
  .lljl_title_r {
    .el-button {
      margin-left: 10px;
    }
  }
}
.lljl_c {
  width: 870px;
  height: 560px;
  margin: 0 auto;
  margin-top: 15px;
  ul {
    width: 100%;
    height: 100%;
    li {
      width: 100%;
      height: 40px;
      line-height: 40px;
      cursor: pointer;
      border-bottom: 1px solid rgb(236, 245, 252);
      .neirong {
        display: inline-block;
        width: 600px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        .se {
          color: rgb(3, 138, 204);
        }
      }
    }
  }
}
.fenye {
  width: 100%;
  text-align: center;
  margin-top: 30px;
  margin-bottom: 20px;
}
</style>
