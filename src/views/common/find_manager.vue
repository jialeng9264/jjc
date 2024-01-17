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
        <div class="bulletin_c">
          <div class="top">
            <el-form ref="form" :model="query" label-width="70px" @submit.native.prevent>
              <el-form-item label="项目经理">
                <el-input v-model="query.nameLike" @keyup.enter.native="handleSearch" placeholder="请输入项目经理名称进行查询"></el-input>
              </el-form-item>
              <el-button type="primary" @click="handleSearch">查询</el-button>
            </el-form>
          </div>

          <el-skeleton :rows="6" animated :loading="loading">
            <ul v-if="total > 0">
              <li v-for="(item, index) in tableData" :key="index" @click="handleJump(item.name, item.qyName)">
                <img src="~@/assets/img/public/xd.png" alt="" />
                <div class="content">
                  <span :title="item.qyName">单位：{{ item.qyName }}</span>
                  <span>
                    姓名：<i>{{ item.name }}</i>
                  </span>
                  <span>中标数：{{ item.zhbCount }}</span>
                  <span>最近中标日期：{{ $baseDayjs(item.zhbTime).format("YYYY-MM-DD") }}</span>
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
import { pageList } from "@/api/user/projectManager";
import pagination from "@/components/pagination";
import findswiper from "@/components/findswiper";

export default {
  components: { pagination, findswiper },
  data() {
    return {
      query: {
        page: 1,
        limit: 15,
        desc: "zhb_time",
        nameLike: "",
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
      this.query.nameLike = searchKey;
      sessionStorage.removeItem("searchKey");
    }
    this.pageList();
  },
  methods: {
    handleSearch() {
      if (!this.query.nameLike) {
        this.$message({
          message: "请输入要查询的项目经理名称",
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
        this.tableData = data.records;
        this.total = data.total;
      } else {
        // TODO 加入图片
        this.query.page = 1;
        this.$baseEventBus.$emit("upgrade", true);
        // this.$baseAlert(msg);
      }
      this.loading = false;
    },
    handleJump(name, qyName) {
      const routeData = this.$router.resolve({
        path: "/common/find_manager_info",
        query: {
          qyName: qyName,
          name: name,
        },
      });
      window.open(routeData.href, "_blank");
    },
  },
};
</script>

<style lang="less">
.top {
  .el-form-item:last-child {
    margin-left: 30px;
  }
}

.el-breadcrumb {
  .el-breadcrumb__item:last-child .el-breadcrumb__inner {
    color: red;
  }
}
</style>
<style lang="less" scoped>
@import url("~@/assets/css/common/find_manager.less");
</style>
