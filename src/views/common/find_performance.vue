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

      <div class="bulletin">
        <div class="bulletin_c">
          <div class="top">
            <el-form ref="form" :model="query" label-width="70px" @submit.native.prevent>
              <el-form-item label="企业名称">
                <el-input
                  placeholder="请输入企业名称进行查询"
                  prefix-icon="el-icon-search"
                  v-model="query.nameLike"
                  @keyup.enter.native="handleSearch"
                ></el-input>
              </el-form-item>
              <el-button type="primary" @click="handleSearch">查询</el-button>
            </el-form>
          </div>
          <el-skeleton :rows="6" animated :loading="listLoading">
            <ul v-if="total > 0">
              <li v-for="(item, index) in tableData" :key="index" @click="handleJump(item)">
                <div class="img">
                  <span>{{ item.name.substring(0, 2) }}</span>
                  <span>{{ item.name.substring(2, 4) }}</span>
                </div>
                <div class="content" :title="item.name">
                  <p>{{ item.name }}</p>
                  <p>统一社会信用代码：{{ item.uscc }}</p>
                </div>
              </li>
            </ul>
            <ul v-else>
              <div class="nodate" v-if="noname">
                <div class="nodate_item">
                  <img src="~@/assets/img/public/noname.png" alt="" />
                </div>
              </div>
              <div class="nodate" v-else>
                <div v-if="proCode == 200" class="nodate_item">
                  <img src="~@/assets/img/public/nodate.jpg" alt="" />
                  <el-button type="primary" @click="centerDialogVisible = true"> 您可新增该公司 </el-button>
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
          <pagination :autoScroll="false" :page.sync="query.page" :limit="query.limit" :total="total" @pagination="pageList"> </pagination>
        </div>
      </div>
    </div>

    <el-dialog title="请输入您要查询的公司全称" :visible.sync="centerDialogVisible" width="30%" center>
      <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="公司名称:" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
        </el-form>
        <p class="redname">请输入您要查询的公司全称</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleraddorg">查询</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import findswiper from "@/components/findswiper";
import { simplList as pageList, addOrg } from "@/api/user/org";
import pagination from "@/components/pagination";

export default {
  components: { pagination, findswiper },
  data() {
    return {
      query: {
        page: 1,
        limit: 10,
        nameLike: "",
      },
      total: 0,
      tableData: [],
      listLoading: false,
      loading: false,
      proCode: 200,
      noname: true,
      centerDialogVisible: false,
      ruleForm: {
        name: "",
      },
      rules: {
        name: [{ required: true, message: "请输入公司名称", trigger: "blur" }],
      },
    };
  },
  created() {
    const searchKey = sessionStorage.getItem("searchKey");
    if (searchKey) {
      this.query.nameLike = searchKey;
      this.noname = false;
      sessionStorage.removeItem("searchKey");
      this.pageList();
    } else {
      this.noname = true;
    }

    const zhbdw = sessionStorage.getItem("zhbdw");
    if (zhbdw) {
      this.query.nameLike = zhbdw;
      this.noname = false;
      sessionStorage.removeItem("zhbdw");
      this.pageList();
    } else {
      this.noname = true;
    }
  },
  methods: {
    handleSearch() {
      if (!this.query.nameLike) {
        this.noname = true;
        this.$message({
          message: "请输入要查询的企业名称",
          type: "warning",
        });
        return;
      }
      this.query.page = 1;
      this.pageList();
    },
    async pageList() {
      const { code, msg, data } = await pageList(this.query);
      this.proCode = code;
      if (code == 200) {
        this.tableData = data.records;
        this.total = data.total;
        this.noname = false;
      } else if(code == 405){
        this.noname = false;
        this.$baseEventBus.$emit("upgrade", true);
      }else if(code == 406){
        this.noname = false;
        this.$baseEventBus.$emit("upgrade", true);
      }else{
        this.noname = true;
      }
    },
    handleJump(item) {
      const routeData = this.$router.resolve({
        path: "/common/cedit",
        query: { uscc: item.uscc },
      });
      window.open(routeData.href, "_blank");
    },
    handleraddorg() {
      addOrg(this.ruleForm).then((res) => {
        if (res.code == 200) {
          this.handleJump(res.data);
          this.centerDialogVisible = false;
          this.ruleForm = {};
          this.pageList();
        } else {
          this.$baseAlert(res.msg);
        }
      });
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
@import url("~@/assets/css/common/find_performance.less");
</style>
