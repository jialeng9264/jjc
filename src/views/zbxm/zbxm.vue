<template>
  <div>
    <findswiper></findswiper>

    <div class="breadcrumb">
      <img src="~@/assets/img/public/dw.png" alt="" />
      <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height: 23px">
        <el-breadcrumb-item>当前位置</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>立项未公告/政府采购项目</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="fbxx_c">
      <div class="tab clearfix">
        <ul>
          <li v-for="(item, index) in fbxxTab" :key="index" @click="clickTab(index)" :class="{ active: num === index }">
            {{ item }}
          </li>
        </ul>
        <el-input placeholder="项目标题" prefix-icon="el-icon-search" v-model="query.titleLike"></el-input>
        <el-button type="primary" @click="handleSearch">搜索</el-button>
      </div>

      <div class="tab_c">
        <div class="tab_c_cg">
          <ul v-if="total > 0">
            <li v-for="(item, index) in dataList" :key="index" @click="handleJump(item.uuid)">
              <img src="~@/assets/img/public/xd.png" alt="" />
              <span class="content" :title="item.title">
                【{{ num === 0 ? "政府采购意向项目" : "已立项未公告项目" }}】
                <span v-html="item.title"></span>
              </span>
              <span class="fr">
                {{ num === 0 ? "发布时间：" : "审批日期：" }}
                <span class="time">
                  {{ item.time ? $baseDayjs(item.time).format("YYYY-MM-DD") : item.sprq ? $baseDayjs(item.sprq).format("YYYY-MM-DD") : "暂无" }}
                </span>
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
          <div class="fenye">
            <pagination :autoScroll="false" :page.sync="query.page" :limit="query.limit" :total="total" @pagination="pageList"> </pagination>
          </div>
        </div>
      </div>
    </div>
    <gcXmInfo ref="gcXmInfo"></gcXmInfo>
  </div>
</template>

<script>
import findswiper from "@/components/findswiper";
import pagination from "@/components/pagination/index";
import gcXmInfo from "@/views/common/gcXmInfo";

import { pageList as xmPageList } from "@/api/zfcg/xm";
import { pageList as gcXmPageList } from "@/api/gcjs/xm";

export default {
  components: {
    findswiper,
    pagination,
    gcXmInfo,
  },
  data() {
    return {
      fbxxTab: ["政府采购意向项目", "已立项未公告项目"],
      num: 0,
      query: { titleLike: "", page: 1, limit: 10 },
      total: 0,
      dataList: [],
    };
  },
  created() {
    this.clickTab(0);
  },
  methods: {
    clickTab(index) {
      this.num = index;
      this.handleSearch();
    },
    handleSearch() {
      this.query.page = 1;
      this.pageList();
    },
    async pageList() {
      let result;
      if (this.num === 0) {
        result = await xmPageList(this.query);
      } else {
        result = await gcXmPageList(this.query);
      }
      const { code, data } = result;
      if (code === 200) {
        this.dataList = data.records;
        this.total = data.total;
      }
    },
    handleJump(uuid) {
      if (this.num === 0) {
        const routeData = this.$router.resolve({
          path: "/common/xmInfo",
          query: { type: "xm", uuid },
        });
        window.open(routeData.href, "_blank");
      } else {
        this.$refs.gcXmInfo.uuid = uuid;
        this.$refs.gcXmInfo.dialogShow = true;
      }
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
@import url("~@/assets/css/zbxm/zbxm.less");
</style>
