<template>
  <div>
    <div class="all">
      <findswiper></findswiper>
      <div class="breadcrumb">
        <img src="~@/assets/img/public/dw.png" alt="" />
        <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height: 23px">
          <el-breadcrumb-item>当前位置</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>公示公告</el-breadcrumb-item>
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
                <span>工程建设</span>
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
            <el-submenu index="2">
              <template slot="title">
                <span>政府采购</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="2-0" @click="handleClickMenu(2, '')">
                  <i class="el-icon-office-building"></i>
                  不限
                </el-menu-item>
                <el-menu-item index="2-1" @click="handleClickMenu(2, 'A')">
                  <i class="el-icon-office-building"></i>
                  工程
                </el-menu-item>
                <el-menu-item index="2-2" @click="handleClickMenu(2, 'B')">
                  <i class="el-icon-office-building"></i>
                  货物
                </el-menu-item>
                <el-menu-item index="2-3" @click="handleClickMenu(2, 'C')">
                  <i class="el-icon-office-building"></i>
                  服务
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </div>
        <div class="zbxm_r fr">
          <div>
            <div class="tab clearfix">
              <ul v-if="type === 1">
                <li v-for="(item, index) in gcjsTab" :key="index" @click="clickGcjsTab(index)" :class="{ active: activeNum === index }">
                  {{ item }}
                </li>
              </ul>
              <ul v-else>
                <li v-for="(item, index) in zfcgTab" :key="index" @click="clickZfcgTab(index)" :class="{ active: activeNum === index }">
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
                      @keyup.enter.native="handleSearch"
                    ></el-input>
                  </div>
                </el-tooltip>
                <el-button type="primary" @click="handleSearch">搜索</el-button>
              </div>
            </div>

            <div class="tab_c">
              <div class="tab_c_cg">
                <ul v-if="total > 0">
                  <li v-for="(item, index) in dataList" :key="index" @click="handleJump(item.uuid, item.type)">
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
// 政府采购
import { pageList as zbggPageList } from "@/api/zfcg/zbgg";
import { pageList as gzggPageList } from "@/api/zfcg/gzgg";
import { pageList as zhbggPageList } from "@/api/zfcg/zhbgg";
import { pageList as dylyPageList } from "@/api/zfcg/dyly";
// 建设工程
import { pageList as gcZbggPageList } from "@/api/gcjs/zbgg";
import { pageList as gcZbjhggPageList } from "@/api/gcjs/zbjhgg";
import { pageList as gcBgggPageList } from "@/api/gcjs/bggg";
import { pageList as gcZbhxrgsPageList } from "@/api/gcjs/zbhxrgs";
import { pageList as gcZhongbggPageList } from "@/api/gcjs/zhongbgg";

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
      gcjsTab: ["招标计划公告", "招标公告", "变更公告", "中标候选人公示", "中标结果公告"],
      //政府采购Tab
      zfcgTab: ["采购/预审公告", "更正公告", "中标结果公告", "单一来源"],
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
    this.clickGcjsTab(0);
  },
  methods: {
    clickGcjsTab(index) {
      this.activeNum = index;
      this.query.page = 1;
      this.handleSearch();
    },
    clickZfcgTab(index) {
      this.activeNum = index;
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
            result = await gcZbjhggPageList(this.query);
            break;
          case 1:
            result = await gcZbggPageList(this.query);
            break;
          case 2:
            result = await gcBgggPageList(this.query);
            break;
          case 3:
            result = await gcZbhxrgsPageList(this.query);
            break;
          case 4:
            result = await gcZhongbggPageList(this.query);
            break;
        }
      } else {
        switch (this.activeNum) {
          case 0:
            result = await zbggPageList(this.query);
            break;
          case 1:
            result = await gzggPageList(this.query);
            break;
          case 2:
            result = await zhbggPageList(this.query);
            break;
          case 3:
            result = await dylyPageList(this.query);
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
    handleJump(uuid, category) {
      let type;
      if (this.type === 1) {
        switch (this.activeNum) {
          case 0:
            type = "gcZbjhgg";
            break;
          case 1:
            type = "gcZbgg";
            break;
          case 2:
            type = "gcBggg";
            break;
          case 3:
            type = "gcZbhxrgs";
            break;
          case 4:
            type = "gcZhongbgg";
            break;
        }
      } else {
        switch (this.activeNum) {
          case 0:
            type = "zbgg";
            break;
          case 1:
            type = "gzgg";
            break;
          case 2:
            if (category === "废标公告") {
              type = "fbgg";
            } else {
              type = "zhbgg";
            }
            break;
          case 3:
            type = "dyly";
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
