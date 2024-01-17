<template>
  <div>
    <div class="wdgz">
      <div class="wdgz_title clearfix">
        <div class="wdgz_title_l fl">
          <img src="~@/assets/img/user/wdgz.png" alt="" />
          <span>我的关注</span>
        </div>
        <div class="wdgz_title_r fr">
          <el-input placeholder="项目/公告名称" prefix-icon="el-icon-search" v-model="query.titleLike" @keyup.enter.native="handleSearch"></el-input>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
        </div>
      </div>

      <div class="wdgz_c">
        <el-skeleton :rows="6" animated :loading="loading">
          <ul v-if="total > 0">
            <li v-for="(item, index) in ggList" :key="index" @click="handleJump(item)">
              <p class="neirong" :title="item.title">
                <img :src="item.readStatus === '1' ? read : noread" />
                <span :class="item.readStatus === '1' ? 'read' : 'noread'">【{{ item.category + "-" + item.type }}】</span>
                {{ item.title }}
              </p>
              <!-- <br /> -->
              <p class="address">
                {{ item.hyCode === "GJZ" ? "关键字" : "行业" }}： <span>{{ item.hy }}</span>
                <span>{{ $baseDayjs(item.time).format("YYYY-MM-DD") }}</span>
              </p>
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
    <gcXmInfo ref="gcXmInfo"></gcXmInfo>
  </div>
</template>

<script>
import pagination from "@/components/pagination";
import { pageList, read } from "@/api/user/pushGgRecord";
import gcXmInfo from "@/views/common/gcXmInfo";

export default {
  components: { pagination, gcXmInfo },
  data() {
    return {
      query: {
        titleLike: "",
        page: 1,
        limit: 10,
        desc: "time,createdTime",
      },
      ggList: [],
      total: 0,
      loading: false,
      read: require("@/assets/img/user/read.png"),
      noread: require("@/assets/img/user/noread.png"),
    };
  },
  created() {
    this.pageList();
  },
  computed: {
    userUuid() {
      return this.$store.getters["user/user"].uuid;
    },
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
        this.ggList = data.records;
        this.total = data.total;
      }
      this.loading = false;
    },
    async handleJump(item) {
      if (item.readStatus !== "1") {
        read({ uuid: item.uuid });
        item.readStatus = "1";
      }
      switch (item.sym) {
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
              query: { type: item.sym, uuid: item.refUuid },
            });
            window.open(routeData.href, "_blank");
          }
          break;
        case "xm":
          {
            const routeData = this.$router.resolve({
              path: "/common/xmInfo",
              query: { type: item.sym, uuid: item.refUuid },
            });
            window.open(routeData.href, "_blank");
          }
          break;
        case "gcXm":
          this.$refs.gcXmInfo.uuid = item.refUuid;
          this.$refs.gcXmInfo.dialogShow = true;
          break;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.wdgz {
  border: 1px solid transparent;
  .el-input {
    width: 400px;
  }
}
.wdgz_title {
  width: 870px;
  height: 40px;
  margin: 0 auto;
  margin-top: 20px;
  .wdgz_title_l {
    width: 200px;
    height: 100%;
    font-size: 21px;
    line-height: 35px;
    letter-spacing: 2px;
    color: rgb(45, 83, 156);
  }
  .wdgz_title_r {
    .el-button {
      margin-left: 10px;
    }
  }
}

.wdgz_focus {
  width: 870px;
  margin: 0 auto;
  margin-top: 30px;
  .yi,
  .wei {
    width: 50%;
  }
  .el-button {
    margin-top: 10px;
  }

  .el-tag {
    margin-top: 10px;
  }

  .el-tag:not(:first-child) {
    margin-left: 12px;
  }
}

.wdgz_c {
  width: 870px;
  margin: 0 auto;
  margin-top: 15px;
  ul {
    width: 100%;
    height: 100%;

    li {
      width: 100%;
      height: 60px;
      display: flex;
      /* line-height: 35px; */
      font-size: 14px;
      margin-bottom: 5px;
      cursor: pointer;
      border-bottom: 1px solid #ecf5fc;
      flex-direction: column;
      justify-content: space-between;

      &:before,
      &:after {
        content: "";
        display: block;
      }

      .neirong {
        width: 96%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: flex;
        align-items: center;
        img {
          vertical-align: middle;
        }
      }
      .address {
        color: #7d7b7b;
      }

      .read {
        color: rgb(3, 138, 204);
      }
      .noread {
        color: #d81e06;
      }

      .address span:nth-child(1) {
        margin-right: 30px;
      }

      .address span:nth-child(2) {
        margin-right: 30px;
      }

      .address span:nth-child(3) {
        margin-right: 30px;
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
