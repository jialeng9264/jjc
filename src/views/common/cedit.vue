<template>
  <div>
    <div class="all">
      <findswiper :index="2"> </findswiper>

      <div class="breadcrumb">
        <img src="~@/assets/img/public/dw.png" alt="" />
        <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height: 23px">
          <el-breadcrumb-item>当前位置</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>查企业</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div class="company">
        <div class="company_l">
          <h2>{{ usccCon.name }}</h2>
          <h4>统一社会信用代码：{{ usccCon.uscc }}</h4>
        </div>
        <div class="company_r">
          <div v-if="usccCon.xyTime">信用更新时间：{{ $baseDayjs(usccCon.xyTime).format("YYYY-MM-DD") }}</div>
          <div>
            <el-button type="primary" size="small" @click="update">更新</el-button>
          </div>
        </div>
      </div>

      <div class="bulletin">
        <div class="bulletin_top">
          <div class="mt">
            <span>基础信息</span>
          </div>
          <div class="resulttab">
            <el-descriptions class="margin-top" :column="2" border>
              <el-descriptions-item>
                <template slot="label">法定代表人/负责人/执行事务合伙人</template>
                {{ usccCon.legalPerson }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">企业类型 </template>
                {{ usccCon.enttype }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label"> 成立日期 </template>
                {{ $baseDayjs(usccCon.established).format("YYYY-MM-DD") }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label"> 地址 </template>
                {{ usccCon.address }}
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </div>
      </div>

      <div class="tabs">
        <div class="tab">
          <ul>
            <li v-for="(item, index) in list" :key="index" :class="[index === numm && 'active']" @click="tabclick(index)">
              <img :src="index === numm ? item.activeImg : item.img" alt="" />
              <span>{{ item.tit }}</span>
              <em class="num">{{ num(index) }}</em>
            </li>
          </ul>
        </div>
        <div class="tab_c">
          <!-- 中标次数 -->
          <div class="tab_content" v-show="numm === 0">
            <el-table v-if="total > 0" :data="zbcs" border header-align="center" style="width: 100%">
              <el-table-column prop="zhbdw" label="中标单位：" align="center"> </el-table-column>
              <el-table-column prop="title" label="公告标题" show-overflow-tooltip align="center"> </el-table-column>
              <el-table-column prop="xmjl" label="项目经理名称：" align="center" width="120px"> </el-table-column>
              <el-table-column prop="zhbje" label="中标金额：" show-overflow-tooltip align="center" width="130px"> </el-table-column>
              <el-table-column prop="time" label="中标时间：" align="center" width="120px"> </el-table-column>
              <el-table-column label="操作" align="center" width="100px">
                <template slot-scope="scope" align="center">
                  <el-button @click="handleJump(scope.row)" type="text">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="nodate" v-if="total <= 0">
              <div v-if="proCode == 200" class="nodate_item">
                <img src="~@/assets/img/public/nodate.jpg" alt="" />
              </div>
              <div v-else-if="proCode == 405" class="nodate_item">
                <img src="~@/assets/img/public/update.jpg" alt="" />
                <el-button type="warning" @click="$router.push('/member')"> 升级高级会员 </el-button>
              </div>
              <div v-else-if="proCode == 406" class="nodate_item">
                <img src="~@/assets/img/public/update.jpg" alt="" />
                <el-button type="warning" @click="$router.push('/member')"> 升级VIP会员 </el-button>
              </div>
            </div>
          </div>
          <!-- 项目经理 -->
          <div class="tab_content" v-show="numm === 1">
            <el-table v-if="total > 0" :data="xmjl" border header-align="center" style="width: 100%">
              <el-table-column prop="name" label="项目经理名称" align="center"> </el-table-column>
              <el-table-column prop="zhbCount" label="中标次数" show-overflow-tooltip align="center" width="130px"> </el-table-column>
              <el-table-column prop="zhbTime" label="最后中标时间" align="center" width="200px"> </el-table-column>
              <el-table-column label="操作" align="center" width="150px">
                <template slot-scope="scope" align="center">
                  <el-button @click="handleJumpXmjl(scope.row)" type="text">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="nodate" v-if="total <= 0">
              <div v-if="proCode == 200" class="nodate_item">
                <img src="~@/assets/img/public/nodate.jpg" alt="" />
              </div>
              <div v-else-if="proCode == 405" class="nodate_item">
                <img src="~@/assets/img/public/update.jpg" alt="" />
                <el-button type="warning" @click="$router.push('/member')"> 升级高级会员 </el-button>
              </div>
              <div v-else-if="proCode == 406" class="nodate_item">
                <img src="~@/assets/img/public/update.jpg" alt="" />
                <el-button type="warning" @click="$router.push('/member')"> 升级VIP会员 </el-button>
              </div>
            </div>
          </div>
          <!-- 行政处罚 -->
          <div class="tab_content" v-show="numm === 2">
            <el-descriptions class="margin-top" :column="1" border v-for="(item, index) in xzcf" :key="index">
              <el-descriptions-item>
                <template slot="label"> 统一社会信用代码 </template>
                {{ item.uscc }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label"> 企业名称 </template>
                {{ item.name }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label"> 处罚机构 </template>
                {{ item.cfCfjg }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label"> 处罚机构代码 </template>
                {{ item.cfCfjgdm }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label"> 处罚类别 </template>
                {{ item.cfCflb }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label"> 处罚决定日期 </template>
                {{ $baseDayjs(item.cfJdrq).format("YYYY-MM-DD") }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label"> 处罚内容 </template>
                {{ item.cfNr }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label"> 处罚罚款（万元） </template>
                {{ item.cfNrFk }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label"> 没收违法财务（万元） </template>
                {{ item.cfNrWfff }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label"> 暂扣吊销 </template>
                {{ item.cfNrZkdx }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label"> 处罚机关 </template>
                {{ item.cfSjly }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label"> 处罚机关统一社会信用代码 </template>
                {{ item.cfSjlydm }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label"> 处罚事实 </template>
                {{ item.cfSy }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label"> 违法行为 </template>
                {{ item.cfWfxw }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label"> 处罚文书号 </template>
                {{ item.cfWsh }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label"> 处罚依据 </template>
                {{ item.cfYj }}
              </el-descriptions-item>
            </el-descriptions>
            <div class="nodate" v-if="total <= 0">
              <div class="nodate_item">
                <img src="~@/assets/img/public/nodate.jpg" alt="" />
              </div>
            </div>
          </div>
          <!-- 失信惩戒 -->
          <div class="tab_content" v-show="numm === 3">
            <el-descriptions class="margin-top" :column="1" border v-for="(item, index) in sxcj" :key="index">
              <el-descriptions-item>
                <template slot="label"> 省份 </template>
                {{ item.areaName }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label"> 身份证号码/组织机构代码 </template>
                {{ item.cardnumber }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label"> 身份类型 </template>
                {{ item.cardtype }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label"> 案号 </template>
                {{ item.caseCode }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label"> 执行法院 </template>
                {{ item.courtName }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label"> 失信被执行人行为具体情形 </template>
                {{ item.disreputTypeName }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label"> 生效法律文书确定的义务 </template>
                {{ item.duty }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label"> 执行依据文号 </template>
                {{ item.gistCid }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label"> 做出执行依据单位 </template>
                {{ item.gistUnit }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label"> 失信被执行人姓名/名称 </template>
                {{ item.iname }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label"> 被执行人的履行情况 </template>
                {{ item.performance }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label"> 已履行部分 </template>
                {{ item.performedPart }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label"> 未履行部分 </template>
                {{ item.unperformPart }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label"> 发布时间 </template>
                {{ $baseDayjs(item.publishDate).format("YYYY-MM-DD") }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label"> 立案时间 </template>
                {{ $baseDayjs(item.regDate).format("YYYY-MM-DD") }}
              </el-descriptions-item>
            </el-descriptions>
            <div class="nodate" v-if="total <= 0">
              <div class="nodate_item">
                <img src="~@/assets/img/public/nodate.jpg" alt="" />
              </div>
            </div>
          </div>
          <!-- 重点关注 -->
          <div class="tab_content" v-show="numm === 4">
            <el-descriptions class="margin-top" :column="1" border v-for="(item, index) in zdgz" :key="index">
              <el-descriptions-item>
                <template slot="label"> 企业名称 </template>
                {{ item.entname }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label"> 统一社会信用代码 </template>
                {{ item.uniscid }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label"> 法定代表人 </template>
                {{ item.lerep }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label"> 主体身份代码 </template>
                {{ item.pripid }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label"> 注册号 </template>
                {{ item.regno }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label"> 列入经营异常名录原因类型名称 </template>
                {{ item.specausename }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label"> 设立日期 </template>
                {{ $baseDayjs(item.abntime).format("YYYY-MM-DD") }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label"> 列入决定机关名称 </template>
                {{ item.decorgname }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label"> 数据来源 </template>
                {{ item.dataSource }}
              </el-descriptions-item>
            </el-descriptions>
            <div class="nodate" v-if="total <= 0">
              <div class="nodate_item">
                <img src="~@/assets/img/public/nodate.jpg" alt="" />
              </div>
            </div>
          </div>
          <!-- 行政许可 -->
          <div class="tab_content" v-show="numm === 5">
            <el-descriptions class="margin-top" :column="1" border v-for="(item, index) in xzxk" :key="index">
              <el-descriptions-item>
                <template slot="label"> 统一社会信用代码 </template>
                {{ item.uscc }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label"> 企业名称 </template>
                {{ item.name }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label"> 行政许可决定文书号 </template>
                {{ item.xkWsh }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label"> 行政许可决定文书名称 </template>
                {{ item.xkXkws }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label"> 许可证书名称 </template>
                {{ item.xkXkzs }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label"> 许可类别 </template>
                {{ item.xkXklb }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label"> 许可编号 </template>
                {{ item.xkXkbh }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label"> 决定日期 </template>
                {{ $baseDayjs(item.xkJdrq).format("YYYY-MM-DD") }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label"> 有效期开始 </template>
                {{ $baseDayjs(item.xkYxqz).format("YYYY-MM-DD") }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label"> 有效期结束 </template>
                {{ $baseDayjs(item.xkYxqzi).format("YYYY-MM-DD") }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label"> 许可内容 </template>
                {{ item.xkNr }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label"> 许可机关 </template>
                {{ item.xkXkjg }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label"> 行政许可统一社会信用代码 </template>
                {{ item.xkXkjgdm }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label"> 数据来源 </template>
                {{ item.xkXkjgdm }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label"> 数据来源统一社会信用代码 </template>
                {{ item.xkLydwdm }}
              </el-descriptions-item>
            </el-descriptions>
            <div class="nodate" v-if="total <= 0">
              <div class="nodate_item">
                <img src="~@/assets/img/public/nodate.jpg" alt="" />
              </div>
            </div>
          </div>
          <!-- 守信激励 -->
          <div class="tab_content" v-show="numm === 6">
            <el-descriptions class="margin-top" :column="1" border v-for="(item, index) in sxjl" :key="index">
              <el-descriptions-item>
                <template slot="label"> 纳税人名称 </template>
                {{ item.nsrmc }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label"> 纳税人识别号 </template>
                {{ item.nsrsbh }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label"> 评价年度 </template>
                {{ item.pjnd }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label"> 统一社会信用代码 </template>
                {{ item.tyshxydm }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label"> 数据来源 </template>
                {{ item.dataSource }}
              </el-descriptions-item>
            </el-descriptions>
            <div class="nodate" v-if="total <= 0">
              <div class="nodate_item">
                <img src="~@/assets/img/public/nodate.jpg" alt="" />
              </div>
            </div>
          </div>
          
        </div>

        <div class="fenye">
          <pagination :autoScroll="false" :page.sync="query.page" :limit="query.limit" :total="total" @pagination="tabclick(numm, 1)"> </pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import findswiper from "@/components/findswiper";
import pagination from "@/components/pagination/index";
import { getByUscc as getByUsccPageList } from "@/api/user/org";
import { updateXy } from "@/api/user/org";
import { listZbdw as zbcsPageList } from "@/api/gcjs/zhbgg";
import { pageList as xzxkPageList } from "@/api/user/xzxk";
import { pageList as xzcfPageList } from "@/api/user/xzcf";
import { pageList as sxjlPageList } from "@/api/user/sxjl";
import { pageList as sxcjPageList } from "@/api/user/sxcj";
import { pageList as zdgzPageList } from "@/api/user/zdgz";
import { pageList as xmjlPageList } from "@/api/user/projectManager.js";
export default {
  components: { findswiper, pagination },
  data() {
    return {
      query: {
        titleIn: "",
        page: 1,
        limit: 10,
      },
      total: 0,
      list: [
        { img: require("@/assets/img/cedit/tab0.png"), activeImg: require("@/assets/img/cedit/tab0-hover.png"), tit: "中标次数" },
        { img: require("@/assets/img/cedit/tab6.png"), activeImg: require("@/assets/img/cedit/tab6-hover.png"), tit: "项目经理" },
        { img: require("@/assets/img/cedit/tab2.png"), activeImg: require("@/assets/img/cedit/tab2-hover.png"), tit: "行政处罚" },
        { img: require("@/assets/img/cedit/tab4.png"), activeImg: require("@/assets/img/cedit/tab4-hover.png"), tit: "失信惩戒" },
        { img: require("@/assets/img/cedit/tab5.png"), activeImg: require("@/assets/img/cedit/tab5-hover.png"), tit: "重点关注" },
        { img: require("@/assets/img/cedit/tab1.png"), activeImg: require("@/assets/img/cedit/tab1-hover.png"), tit: "行政许可" },
        { img: require("@/assets/img/cedit/tab3.png"), activeImg: require("@/assets/img/cedit/tab3-hover.png"), tit: "守信激励" },
        // { img: require("@/assets/img/cedit/tab6.png"), activeImg: require("@/assets/img/cedit/tab6-hover.png"), tit: "资质/资格" },
        // { img: require("@/assets/img/cedit/tab7.png"), activeImg: require("@/assets/img/cedit/tab7-hover.png"), tit: "风险提示" },
        // { img: require("@/assets/img/cedit/tab8.png"), activeImg: require("@/assets/img/cedit/tab8-hover.png"), tit: "其他" },
      ],
      numm: 0,
      usccCon: {},
      xzxk: [],
      xzcf: [],
      sxjl: [],
      sxcj: [],
      zdgz: [],
      zbcs: [],
      xmjl: [],
      uscc: "",
      proCode: "",
      zbcsCount: 0,
      xzxkCount: 0,
      xzcfCount: 0,
      sxjlCount: 0,
      sxcjCount: 0,
      zdgzCount: 0,
      xmjlCount: 0,
    };
  },
  created() {
    this.uscc = this.$route.query.uscc;
    this.query.uscc = this.$route.query.uscc;
    this.getByUsccPageList();
  },
  methods: {
    tabclick(index, num) {
      this.numm = index;
      if (!num) {
        this.query.page = 1;
      }
      switch (index) {
        case 0:
          this.zbcsPageList();
          break;
        case 1:
          this.xmjlPageList();
          break;
        case 2:
          this.xzcfPageList();
          break;
        case 3:
          this.sxcjPageList();
          break;
        case 4:
          this.zdgzPageList();
          break;
        case 5: 
          this.xzxkPageList();
          break;
        case 6:
          this.sxjlPageList();
          break;
      }
    },
    async update() {
      this.$message({
        message: "信用正在更新中，请稍后..",
        type: "success",
      });
      const { code, data } = await updateXy({ uscc: this.usccCon.uscc, name: this.usccCon.name });
      if (code == 200) {
        this.getByUsccPageList();
        this.$message({
          message: "信用信息更新完毕",
          type: "success",
        });
      }
    },
    num(index) {
      switch (index) {
        case 0:
          return this.zbcsCount;
        case 1:
          return this.xmjlCount;
        case 2:
          return this.xzcfCount;
        case 3:
          return this.sxcjCount;
        case 4:
          return this.zdgzCount;
        case 5:
          return this.xzxkCount;
        case 6:
          return this.sxjlCount;
      }
    },
    async getByUsccPageList() {
      const { code, data } = await getByUsccPageList({
        uscc: this.uscc,
      });
      if (code == 200) {
        this.usccCon = data.org;
        this.zbcsCount = data.zbcsCount;
        this.xzcfCount = data.xzcfCount;
        this.sxcjCount = data.sxcjCount;
        this.zdgzCount = data.zdgzCount;
        this.xzxkCount = data.xzxkCount;
        this.sxjlCount = data.sxjlCount;
        this.xmjlCount = data.xmjlCount;
        this.tabclick(0);
      }
    },
    async zbcsPageList() {
      if (!this.usccCon.name) {
        return;
      }
      this.query.zhbdw = this.usccCon.name;
      const { code, data } = await zbcsPageList(this.query);
      this.proCode = code;
      if (code === 200) {
        this.zbcs = data.records;
        this.total = data.total;
        this.zbcsCount = data.total;
      } else {
        this.total = 0;
      }
    },
    async xzxkPageList() {
      const { code, data } = await xzxkPageList(this.query);
      if (code == 200) {
        this.xzxk = data.records;
        this.total = data.total;
      } else {
        this.total = 0;
      }
    },
    async xzcfPageList() {
      const { code, data } = await xzcfPageList(this.query);
      if (code == 200) {
        this.xzcf = data.records;
        this.total = data.total;
      } else {
        this.total = 0;
      }
    },
    async sxjlPageList() {
      const { code, data } = await sxjlPageList(this.query);
      if (code == 200) {
        this.sxjl = data.records;
        this.total = data.total;
      } else {
        this.total = 0;
      }
    },
    async sxcjPageList() {
      const { code, data } = await sxcjPageList(this.query);
      if (code == 200) {
        this.sxcj = data.records;
        this.total = data.total;
      } else {
        this.total = 0;
      }
    },
    async zdgzPageList() {
      const { code, data } = await zdgzPageList(this.query);
      if (code == 200) {
        this.zdgz = data.records;
        this.total = data.total;
      } else {
        this.total = 0;
      }
    },
    async xmjlPageList() {
      this.query.qyName = this.usccCon.name;
      const { code, data } = await xmjlPageList(this.query);
      if (code == 200) {
        this.xmjl = data.records;
        this.total = data.total;
      } else {
        this.total = 0;
      }
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
    handleJumpXmjl(item) {
      const routeData = this.$router.resolve({
        path: "/common/find_manager_info",
        query: {
          qyName: item.qyName,
          name: item.name,
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
@import url("~@/assets/css/common/cedit.less");
.resulttab {
  /deep/ .el-descriptions-item__label {
    max-width: 180px;
    color: #000;
    background-color: rgb(229, 229, 229);
  }
}
.tab_content {
  /deep/ .el-descriptions-item__label {
    width: 230px;
    color: #000;
    background-color: rgb(229, 229, 229);
  }
}
</style>
