<template>
  <div>
    <div class="all">
      <findswiper></findswiper>
      <div class="breadcrumb">
        <img src="~@/assets/img/public/dw.png" alt="" />
        <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height: 23px">
          <el-breadcrumb-item>当前位置</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>资质共享</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div class="find_qualification">
        <div class="find_top">
          <!-- <div class="find_top_title">查资质</div> -->
          <div class="find_top_c">
            <div class="condition">
              <el-form ref="form" :model="query" label-width="100x">
                <el-form-item label="选择地区：">
                  <div class="area clearfix">
                    <ul class="one">
                      <li :class="{ active: query.province === '' }" @click="provinceClick('')">不限</li>
                      <li
                        v-for="(item, index) in addressOptions"
                        :key="index"
                        :class="{ active: query.province === item.label }"
                        @click="provinceClick(item)"
                      >
                        {{ item.label }}
                      </li>
                    </ul>
                    <!-- <br> -->
                    <ul>
                      <li :class="{ active: query.city === '' }" @click="cityClick('')">不限</li>
                      <li
                        v-for="(item, index) in addressChildren"
                        :key="index"
                        :class="{ active: query.city === item.label }"
                        @click="cityClick(item)"
                      >
                        {{ item.label }}
                      </li>
                    </ul>
                  </div>
                </el-form-item>

                <el-form-item label="资质等级：" class="zizhi">
                  <div v-for="(item, index) in form.dynamicItem" :key="index" class="zhi">
                    <el-cascader
                      ref="cascader"
                      :options="gradeOption"
                      :props="{ expandTrigger: 'hover', value: 'id' }"
                      @change="changeGrade"
                      clearable
                    ></el-cascader>
                    <i class="el-icon-remove-outline" @click="deleteItem(index)"></i>
                  </div>
                  <el-button type="primary" @click="add" class="add"><i class="el-icon-plus"></i> 增加条件</el-button>
                </el-form-item>
                <el-form-item label="选择条件：" class="select">
                  <el-radio v-model="query.gradeNameInOrAnd" label="or">符合任意条件</el-radio>
                  <el-radio v-model="query.gradeNameInOrAnd" label="and">符合所有条件</el-radio>
                </el-form-item>
                <el-form-item label="企业名称：">
                  <el-input v-model="query.qyNameLike" @keyup.enter.native="handleSearch"></el-input>
                  <el-button type="primary" @click="handleSearch">查询</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>

        <div class="company_details">
          <el-skeleton :rows="6" animated :loading="loading">
            <ul v-if="total > 0">
              <li v-for="(item, index) in dataList" :key="index" @click="dialogVisible = true">
                <div class="detail">
                  <div class="mingcheng" :title="item.name">{{ item.name }}</div>
                  <div>注册地址：{{ (item.province ? item.province : "未知") + "-" + (item.city ? item.city : "未知") }}</div>
                  <div>注册资金：{{ item.registrationCapital }}万元</div>
                  <div>成立时间：{{ item.established ? $baseDayjs(item.established).format("YYYY-MM-DD") : "" }}</div>
                  <div>资质：{{ item.gradeName.split(",").length }}</div>
                </div>
                <div class="zizhi">
                  <span v-for="(itemC, indexC) in item.gradeName.split(',').slice(0, 3)" :key="indexC">
                    {{ itemC }}
                  </span>
                  <a v-if="item.gradeName.split(',').length > 3" @click.stop="boxshow = !boxshow">更多<i class="el-icon-d-arrow-right"></i></a>
                </div>
                <transition name="draw">
                  <div class="pinglun_list" v-show="boxshow">
                    <div v-for="(itemC, indexC) in item.gradeName.split(',').slice(3)" :key="indexC">
                      {{ itemC }}
                    </div>
                  </div>
                </transition>
              </li>
            </ul>
            <div v-else>
              <div class="nodate">
                <div class="nodate_item">
                  <img src="~@/assets/img/public/nodate.jpg" alt="" />
                </div>
              </div>
            </div>
          </el-skeleton>
        </div>
        <div v-if="total > 0" class="fenye">
          <pagination :autoScroll="false" :page.sync="query.page" :limit="query.limit" :total="total" @pagination="pageList"></pagination>
        </div>
      </div>

      <div class="alert">
        <el-dialog :visible.sync="dialogVisible" style="margin-top: 15vh">
          <i class="el-icon-circle-close" @click="dialogVisible = false"></i>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import area from "@/data/area.json";
import grade from "@/data/grade.json";
import findswiper from "@/components/findswiper";
import pagination from "@/components/pagination/index";
import { pageList } from "@/api/user/org";

export default {
  components: {
    findswiper,
    pagination,
  },
  data() {
    return {
      currentIndex: 0,
      query: {
        page: 1,
        limit: 10,
        status: "1",
        qyNameLike: "",
        grade: "",
        noList: 0,
        province: "",
        city: "",
        gradeNameInOrAnd: "or",
      },
      total: 0,
      loading: false,
      dataList: [],
      gradeOption: grade,
      addressOptions: area,
      addressChildren: [],
      boxshow: false,
      form: {
        dynamicItem: [{}],
      },
      radio: "1",
      dialogVisible: false,
    };
  },
  created() {
    this.handleSearch();
  },
  methods: {
    add() {
      this.form.dynamicItem.push({});
    },
    deleteItem(index) {
      this.form.dynamicItem.splice(index, 1);
      this.$nextTick(() => {
        this.changeGrade();
      });
    },
    provinceClick(item) {
      if (item) {
        this.query.province = item.label;
        this.addressChildren = item.children;
      } else {
        this.query.province = "";
        this.addressChildren = [];
      }
      this.query.city = "";
    },
    cityClick(item) {
      if (item) {
        this.query.city = item.label;
      } else {
        this.query.city = "";
      }
    },
    changeGrade() {
      const cascader = this.$refs["cascader"];
      if (cascader.length > 0) {
        let gradeLevelType = [];
        let gradeLevelValue = [];
        let gradeNameLike = [];
        for (let index in cascader) {
          const node = cascader[index].getCheckedNodes()[0];
          if (node) {
            gradeLevelType.push(node.data.type);
            gradeLevelValue.push(node.data.value);
            gradeNameLike.push(node.parent.label);
          }
        }
        this.query.gradeLevelType = gradeLevelType.join(",");
        this.query.gradeLevelValue = gradeLevelValue.join(",");
        this.query.gradeNameLike = gradeNameLike.join(",");
      } else {
        this.query.gradeLevelType = null;
        this.query.gradeLevelValue = null;
        this.query.gradeNameLike = null;
      }
    },
    handleSearch() {
      this.query.page = 1;
      this.pageList();
    },
    async pageList() {
      this.loading = true;
      if (this.query.gradeLevelValue) {
        this.query.noList = 1;
      }
      const { code, msg, data } = await pageList(this.query);
      if (code === 200) {
        this.dataList = data.records;
        this.total = data.total;
      } else {
        this.query.page = 1;
        this.$baseEventBus.$emit("upgrade", true);
        //this.$baseAlert(msg);
      }
      this.loading = false;
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

.condition {
  .el-input {
    width: 480px;
  }

  .el-select {
    width: 221px;
  }

  .el-form-item__label {
    color: #333;
  }

  .el-button {
    margin-left: 10px;
  }
}
</style>

<style lang="less" scoped>
@import url("~@/assets/css/zzgx/zzgx.less");
</style>
