<template>
  <div>
    <div class="wdsc">
      <div class="wdsc_title clearfix">
        <div class="wdsc_title_l fl">
          <img src="~@/assets/img/user/wdsc.png" alt="" />
          <span>我的收藏</span>
        </div>
        <div class="wdsc_title_r fr">
          <el-input placeholder="项目名称" prefix-icon="el-icon-search" v-model="query.titleLike" @keyup.enter.native="handleSearch"></el-input>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
        </div>
      </div>
      <div class="wdsc_c">
        <el-skeleton :rows="6" animated :loading="loading">
          <ul v-if="total > 0">
            <li v-for="(item, index) in tableData" :key="index">
              <div class="wdsc_c_l fl" @click="handleClick(item.sym, item.refUuid)">
                <p>
                  <span class="neirong">【{{ item.type }}】 {{ item.title }}</span>
                </p>
                <p>
                  <span v-if="item.city || item.dq">{{ item.city ? item.city : item.dq }}</span>
                  <span v-if="item.cgr || item.yzdw">
                    招标人名称：<span>{{ item.cgr ? item.cgr : item.yzdw }}</span>
                  </span>
                  发布时间：<span>{{ $baseDayjs(item.time).format("YYYY-MM-DD") }}</span>
                </p>
              </div>
              <div class="wdsc_c_r fr">
                <el-button size="small" round icon="el-icon-star-on" @click="handleConCollect(item.refUuid)">取消收藏 </el-button>
              </div>
            </li>
          </ul>
          <ul v-else>
            <el-empty :image-size="200"></el-empty>
          </ul>
        </el-skeleton>
      </div>
      <div v-if="total > 0" class="fenye">
        <pagination :autoScroll="false" :page.sync="query.page" :limit="query.limit" :total="total" @pagination="pageList"></pagination>
      </div>
    </div>
  </div>
</template>

<script>
import pagination from "@/components/pagination/index";
import { pageList, remove } from "@/api/user/collect";

export default {
  components: { pagination },
  data() {
    return {
      query: {
        page: 1,
        limit: 13,
        titleLike: "",
        desc: "createdTime",
      },
      total: 0,
      tableData: [],
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
        this.total = data.total;
      }
      this.loading = false;
    },
    async handleConCollect(refUuid) {
      const { code, msg } = await remove({ refUuid: refUuid });
      if (code === 200) {
        this.$baseMessage(msg, "success");
      } else {
        this.$baseMessage(msg, "error");
      }
      this.pageList();
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
      }
    },
  },
};
</script>

<style lang="less">
.wdsc {
  .el-input {
    width: 400px;
  }
}
</style>
<style lang="less" scoped>
.wdsc {
  border: 1px solid transparent;
}

.wdsc_title {
  width: 870px;
  height: 40px;
  margin: 0 auto;
  margin-top: 20px;

  .wdsc_title_l {
    width: 200px;
    height: 100%;
    font-size: 21px;
    line-height: 35px;
    letter-spacing: 2px;
    color: rgb(45, 83, 156);
  }
  .wdsc_title_r {
    .el-button {
      margin-left: 10px;
    }
  }
}

.wdsc_c {
  width: 870px;
  height: 560px;
  margin: 0 auto;
  margin-top: 15px;

  ul {
    width: 100%;
    height: 100%;

    li {
      width: 100%;
      height: 60px;
      line-height: 29px;
      font-size: 14px;
      padding-top: 5px;
      padding-bottom: 5px;
      cursor: pointer;
      border-bottom: 1px solid #ecf5fc;

      .wdsc_c_l {
        width: 80%;

        p {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        p:last-child {
          font-size: 13px;

          span {
            margin-right: 30px;
          }
        }
      }

      .wdsc_c_r {
        margin-top: 10px;
      }

      .neirong {
        width: 500px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    li:not(:first-child) {
      margin-top: 10px;
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
