<template>
  <div>
    <div class="all">
      <findswiper></findswiper>

      <div class="breadcrumb">
        <img src="~@/assets/img/public/dw.png" alt="" />
        <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height: 23px">
          <el-breadcrumb-item>当前位置</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>中标课堂</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div class="fbxx_c">
        <div class="tab clearfix">
          <ul>
            <li v-for="(item, index) in fbxxTab" :key="index" @click="clickTab(item.val, index)" :class="{ active: num === index }">
              {{ item.name }}
            </li>
          </ul>
          <el-input placeholder="资讯标题" prefix-icon="el-icon-search" v-model="query.titleLike" @keyup.enter.native="handleSearch"></el-input>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
        </div>

        <div class="tab_c">
          <div class="tab_c_cg">
            <el-skeleton :rows="6" animated :loading="loading">
              <ul v-if="total > 0">
                <li v-for="(item, index) in dataList" :key="index" @click="handleJump(item)">
                  <img src="~@/assets/img/public/xd.png" alt="" />
                  <span class="content" :title="item.title">{{ item.title }}</span>
                  <span class="fr">
                    发布时间：
                    <span class="time">{{ $baseDayjs(item.createdTime).format("YYYY-MM-DD") }}</span>
                  </span>
                </li>
              </ul>
              <ul v-else-if="total === 0">
                <el-empty :image-size="200"></el-empty>
              </ul>
            </el-skeleton>
            <div v-if="total > 0" class="fenye">
              <pagination :autoScroll="false" :page.sync="query.page" :limit="query.limit" :total="total" @pagination="pageList"> </pagination>
            </div>
          </div>
        </div>
      </div>
    </div>

    <el-dialog :visible.sync="dialogVisible" width="680px" heigth="400px" top="15vh" :close-on-click-modal="false">
      <video :src="src" autoplay controls></video>
    </el-dialog>
  </div>
</template>

<script>
import findswiper from "@/components/findswiper";
import pagination from "@/components/pagination/index";
import { pageList as downPageList } from "@/api/cms/download.js";
export default {
  components: {
    findswiper,
    pagination,
  },
  data() {
    return {
      fbxxTab: [
        { name: "中标课堂", val: "ZBKT" },
      ],
      num: 0,
      query: { titleLike: "", colSymIn: "", page: 1, limit: 10, desc: "id" },
      loading: false,
      total: -1,
      dataList: [],
      src: "",
      dialogVisible: false,
    };
  },
  created() {
    this.clickTab("ZBKT", 0);
    this.pageList();
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
      this.query.titleLike = ""
    },
    async pageList() {
      let result;
      result = await downPageList(this.query);
      if (result) {
        const { code, data } = result;
        if (code === 200) {
          this.dataList = data.records;
          this.total = data.total;
        }
      }
    },
    handleJump(item) {
        this.dialogVisible = true;
        this.src = this.$baseUrl + item.fileUrl;
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
.el-dialog {
  .el-dialog__body {
    video {
      width: 100%;
    }
  }
}
</style>
<style lang="less" scoped>
@import url("~@/assets/css/winning/index.less");
</style>
