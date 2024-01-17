<template>
  <div>
    <div class="all">
      <findswiper></findswiper>
      <div class="breadcrumb">
        <img src="~@/assets/img/public/dw.png" alt="" />
        <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height: 23px">
          <el-breadcrumb-item>当前位置</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>依法非招标公示公告</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="zbxm">
        <div class="zbxm_l fl">
          <el-menu
            :default-openeds="openeds"
            default-active="0-1"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-submenu index="1">
              <template slot="title">
                <span>依法非招标</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="0-1" @click="handleClickMenu(1, '')">
                  <i class="el-icon-office-building"></i>
                  不限
                </el-menu-item>
                <el-menu-item v-for="(item, index) in hy" :key="index" :index="'1-' + index" @click="handleClickMenu(1, item.hyCode)">
                  <i class="el-icon-office-building"></i>
                  {{ item.hy }}
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </div>
        <div class="zbxm_r fr">
          <div>
            <div class="tab clearfix">
              <ul>
                <li v-for="(item, index) in fTab" :key="index" @click="clickFTab(index)" :class="{ active: activeNum === index }">
                  {{ item }}
                </li>
              </ul>
              <div class="search">
                <el-tooltip class="item" effect="dark" content="可同时查询多个关键词，用空格隔开，如：石家庄 环境" placement="top">
                  <div>
                    <el-input
                      placeholder="可同时查询多个关键词，用空格隔开，如：石家庄 环境"
                      prefix-icon="el-icon-search"
                      v-model="query.titleIn"
                    ></el-input>
                  </div>
                </el-tooltip>
                <el-button type="primary" @click="handleSearch">搜索</el-button>
              </div>
            </div>

            <div class="tab_c">
              <div class="tab_c_cg">
                <ul v-if="total > 0">
                  <li v-for="(item, index) in dataList" :key="index" @click="handleJump(item.uuid)">
                    <img src="~@/assets/img/public/xd.png" alt="" />
                    <span class="content" :title="item.title">【{{ item.type }}】<span v-html="item.title"></span></span>
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
                <div class="fenye">
                  <pagination :autoScroll="false" :page.sync="query.page" :limit="query.limit" :total="total" @pagination="pageList"> </pagination>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import hy from "@/data/hy.json";
import findswiper from "@/components/findswiper";
import pagination from "@/components/pagination/index";
// 依法非招标
import { pageList as fZbggPageList } from "@/api/f/zbgg";
import { pageList as fBgggPageList } from "@/api/f/bggg";
import { pageList as fZbhxrgsPageList } from "@/api/f/zbhxrgs";
import { pageList as fZhongbggPageList } from "@/api/f/zhongbgg";

export default {
  components: {
    findswiper,
    pagination,
  },
  data() {
    return {
      openeds: ["1"],
      // 1：工程建设,2:政府采购
      type: 1,
      //建设工程tab
      fTab: ["招标公告", "变更公告", "中标候选人公示", "中标结果公告"],
      activeNum: 0,
      query: {
        titleIn: "",
        page: 1,
        limit: 20,
      },
      total: 0,
      dataList: [],
      hy: hy,
    };
  },
  created() {
    this.clickFTab(0);
  },
  methods: {
    clickFTab(index) {
      this.activeNum = index;
      this.query.page = 1;
      this.handleSearch();
    },
    handleClickMenu(type, hyCodePre) {
      this.type = type;
      this.query.hyCodePre = hyCodePre;
      this.handleSearch();
    },
    handleSearch() {
      this.query.page = 1;
      this.pageList();
    },
    async pageList() {
      let result;
      if (this.type === 1) {
        switch (this.activeNum) {
          case 0:
            result = await fZbggPageList(this.query);
            break;
          case 1:
            result = await fBgggPageList(this.query);
            break;
          case 2:
            result = await fZbhxrgsPageList(this.query);
            break;
          case 3:
            result = await fZhongbggPageList(this.query);
            break;
        }
      }
      if (result) {
        const { code, data } = result;
        if (code === 200) {
          this.dataList = data.records;
          this.total = data.total;
        }
      }
    },
    handleJump(uuid) {
      let type;
      if (this.type === 1) {
        switch (this.activeNum) {
          case 0:
            type = "fZbgg";
            break;
          case 1:
            type = "fBggg";
            break;
          case 2:
            type = "fZbhxrgs";
            break;
          case 3:
            type = "fZhbgg";
            break;
        }
      }
      const routeData = this.$router.resolve({
        path: "/common/ggInfo",
        query: { type, uuid },
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
@import url("~@/assets/css/zbxm/index.less");
</style>
