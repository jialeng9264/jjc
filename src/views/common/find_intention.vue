<template>
  <div>
    <div class="all">
      <findswiper :index="3"></findswiper>

      <div class="breadcrumb">
        <img src="~@/assets/img/public/dw.png" alt="" />
        <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height: 23px">
          <el-breadcrumb-item>当前位置</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>查招标采购意向</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div class="bulletin">
        <div class="bulletin_c">
          <div class="top">
            <el-form ref="form" :model="query" label-width="130px" @submit.native.prevent>
              <el-form-item label="招标采购意向标题">
                <el-input v-model="query.titleLike" @keyup.enter.native="handleSearch" placeholder="请输入招标采购意向标题进行查询"></el-input>
              </el-form-item>
              <el-button type="primary" @click="handleSearch">查询</el-button>
            </el-form>
          </div>
          <el-skeleton :rows="6" animated :loading="loading">
            <ul v-if="total > 0">
              <li v-for="(item, index) in tableData" :key="index" @click="handleJump(item)">
                <img src="~@/assets/img/public/xd.png" alt="" />
                <div class="content" :title="item.title">
                  <p>
                    <span class="title">
                      【{{ item.code ? "招标" : "采购" }}意向】
                      <span v-html="item.title"></span>
                    </span>
                    <span class="fr">发布时间：{{ $baseDayjs(item.time).format("YYYY-MM-DD") }}</span>
                  </p>
                </div>
              </li>
            </ul>
            <ul v-else>
              <div class="nodate">
                <div v-if="proCode == 405" class="nodate_item">
                  <img src="~@/assets/img/public/update.jpg" alt="">
                  <el-button type="warning" @click="$router.push('/member');">
                  升级高级会员
                </el-button>
                </div>
                <div v-if="proCode == 406" class="nodate_item">
                  <img src="~@/assets/img/public/update.jpg" alt="">
                  <el-button type="warning" @click="$router.push('/member');">
                  升级VIP会员
                </el-button>
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
    <gcXmInfo ref="gcXmInfo"></gcXmInfo>
  </div>
</template>

<script>
import gcXmInfo from "@/views/common/gcXmInfo";
import findswiper from "@/components/findswiper";
import pagination from "@/components/pagination";
import { pageList } from "@/api/f/xm";

export default {
  components: {
    findswiper,
    pagination,
    gcXmInfo,
  },
  data() {
    return {
      query: {
        page: 1,
        limit: 14,
        titleLike: "",
        desc: "time,createdTime",
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
      this.query.titleLike = searchKey;
      sessionStorage.removeItem("searchKey");
    }
    this.pageList();
  },
  methods: {
    handleSearch() {
      if (!this.query.nameLike) {
        this.$message({
          message: "请输入要查询的招标采购意向标题",
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
        this.query.page = 1;
        this.$baseEventBus.$emit("upgrade", true);
        // this.$baseAlert(msg);
      }
      this.loading = false;
    },
    handleJump(item) {
      if (item.code) {
        this.$refs.gcXmInfo.uuid = item.uuid;
        this.$refs.gcXmInfo.dialogShow = true;
      } else {
        const routeData = this.$router.resolve({
          path: "/common/xmInfo",
          query: { type: "xm", uuid: item.uuid },
        });
        window.open(routeData.href, "_blank");
      }
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
@import url("~@/assets/css/common/find_intention.less");
</style>
