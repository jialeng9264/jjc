<template>
  <div>
    <div class="zzgx">
      <div class="zzgx_title clearfix">
        <div class="zzgx_title_l fl">
          <img src="~@/assets/img/user/zzzs.png" alt="" />
          <span>资质共享</span>
        </div>
        <div class="zzgx_title_r fr">
          <el-button type="warning" @click="handleEdit('')">新增</el-button>
          <div class="add_zz_alert">
            <el-dialog :visible.sync="dialogVisible" :close-on-click-modal="false">
              <div class="add_zz_title">新增资质</div>
              <div class="add_zz_input">
                <el-row>
                  <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                    <el-col :span="12">
                      <el-form-item label="企业名称" prop="qyName">
                        <el-input v-model="form.qyName" placeholder="请输入企业名称"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="信用代码" prop="uscc">
                        <el-input
                          v-model="form.uscc"
                          placeholder="请输入统一社会信用代码"
                          :readonly="form.uuid == ''"
                          maxlength="18"
                          show-word-limit
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="注册地址" prop="province">
                        <el-cascader
                          style="width: 100%"
                          ref="address"
                          v-model="address"
                          :options="addressOptions"
                          :props="{ expandTrigger: 'hover', value: 'label' }"
                          @change="changeAddress"
                        ></el-cascader>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="注册资金" prop="registrationCapital">
                        <el-input type="number" v-model="form.registrationCapital">
                          <template slot="append">万元</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="成立时间" prop="established">
                        <el-date-picker v-model="form.established" type="date" placeholder="选择成立时间" value-format="yyyy-MM-dd"> </el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="联系方式" prop="phone">
                        <el-input v-model="form.phone"></el-input>
                      </el-form-item>
                    </el-col>
                    <!--                    <el-col :span="12">
                      <el-form-item label="证书名称" prop="name">
                        <el-input v-model="form.name"></el-input>
                      </el-form-item>
                    </el-col>-->
                    <el-col :span="24">
                      <el-form-item label="证书等级" prop="grade">
                        <el-cascader
                          style="width: 100%"
                          ref="cascader"
                          v-model="grades"
                          :options="gradeOption"
                          :props="{ expandTrigger: 'hover' }"
                          @change="changeGrade"
                        ></el-cascader>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="资质证书" prop="img">
                        <div class="attachment">
                          <input v-show="false" type="file" accept="image/*" @change="tirggerFile($event)" ref="img" />
                          <div @click="openImg('img')" style="width: 100%; height: 100%">
                            <span v-if="form.img === ''"></span>
                            <img style="height: 100%; width: 100%" v-if="form.img !== ''" :src="form.img" />
                          </div>
                        </div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="营业执照" prop="yyzzImg">
                        <div class="attachment">
                          <input v-show="false" type="file" accept="image/*" @change="tirggerFile($event)" ref="yyzzImg" />
                          <div @click="openImg('yyzzImg')" style="width: 100%; height: 100%">
                            <span v-if="form.yyzzImg === ''"></span>
                            <img style="height: 100%; width: 100%" v-if="form.yyzzImg !== ''" :src="form.yyzzImg" />
                          </div>
                        </div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="委托书" prop="wtsImg">
                        <div class="attachment">
                          <input v-show="false" type="file" accept="image/*" @change="tirggerFile($event)" ref="wtsImg" />
                          <div @click="openImg('wtsImg')" style="width: 100%; height: 100%">
                            <span v-if="form.wtsImg === ''"></span>
                            <img style="height: 100%; width: 100%" v-if="form.wtsImg !== ''" :src="form.wtsImg" />
                          </div>
                        </div>
                      </el-form-item>
                    </el-col>
                    <el-col v-if="form.status == 3" :span="12">
                      <el-form-item label="未通过原因">
                        {{ form.description }}
                      </el-form-item>
                    </el-col>
                    <el-col :span="24" :offset="7">
                      <el-form-item>
                        <el-button type="primary" @click="handleSubmit">提 交</el-button>
                        <el-button @click="dialogVisible = false">取 消</el-button>
                      </el-form-item>
                    </el-col>
                  </el-form>
                </el-row>
              </div>
            </el-dialog>
          </div>
        </div>
      </div>
      <div class="zzgx_c">
        <el-table :data="tableData" :loading="listLoading" border style="width: 100%">
          <el-table-column prop="qyName" label="企业名称" min-width="40"></el-table-column>
          <el-table-column prop="gradeName" label="证书等级" min-width="40"> </el-table-column>
          <el-table-column label="证书" min-width="15">
            <template #default="{ row }">
              <el-image :preview-src-list="[row.img]" :src="row.img" style="width: 40px; height: 40px">
                <div class="image-slot" slot="error">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </template>
          </el-table-column>
          <el-table-column align="center" label="资质共享" min-width="18" prop="status">
            <template #default="{ row }">
              <div v-if="row.status == 2">待审核</div>
              <div v-else-if="row.status == 3">审核未通过</div>
              <el-select v-else-if="row.status != 2" v-model="row.status" placeholder="请选择资质状态" @change="changeStatus(row)">
                <el-option label="是" value="1"> </el-option>
                <el-option label="否" value="0"> </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="20">
            <template #default="{ row }">
              <el-button v-if="row.status != 2" type="text" @click="handleEdit(row.uuid)">编辑</el-button>
              <el-button type="text" @click="handleDelete(row.uuid)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="fenye">
        <pagination :autoScroll="false" :page.sync="query.page" :limit="query.limit" :total="total" @pagination="pageList"> </pagination>
      </div>
    </div>
  </div>
</template>

<script>
import grade from "@/data/grade2.json";
import area from "@/data/area.json";
import pagination from "@/components/pagination/index";
import { pageList, update, remove, add, getByUuid } from "@/api/user/qualification";
import { upload } from "@/api/file/upload";
import { validatorPhone, validatorUSCC } from "@/utils/validator";

export default {
  components: { pagination },
  data() {
    return {
      query: {
        page: 1,
        limit: 7,
        titleLike: "",
        desc: "created_time",
      },
      total: 0,
      tableData: [],
      listLoading: false,
      loading: false,
      // 新增资质
      dialogVisible: false,
      form: {
        uuid: "",
        name: "",
        uscc: "",
        qyName: "",
        province: "",
        city: "",
        registrationCapital: "",
        established: undefined,
        phone: undefined,
        status: "1",
        grade: "",
        gradeName: "",
        img: "",
        yyzzImg: "",
        wtsImg: "",
      },
      rules: {
        uscc: [{ required: true, validator: validatorUSCC, trigger: "blur" }],
        qyName: [{ required: true, message: "请输入企业名称", trigger: "blur" }],
        name: [{ required: true, message: "请输入资质名称", trigger: "blur" }],
        grade: [{ required: true, message: "请输入资质等级", trigger: "blur" }],
        province: [{ required: true, message: "请选择注册地", trigger: "blur" }],
        registrationCapital: [{ required: true, message: "请选择注册资金", trigger: "blur" }],
        established: [{ required: true, message: "请选择成立时间", trigger: "blur" }],
        phone: [{ required: true, validator: validatorPhone, trigger: "blur" }],
        img: [{ required: true, message: "请上传资质证书", trigger: "blur" }],
        yyzzImg: [{ required: true, message: "请上传营业执照", trigger: "blur" }],
        wtsImg: [{ required: true, message: "请上传委托书", trigger: "blur" }],
      },
      gradeOption: grade,
      grades: [],
      addressOptions: area,
      address: [],
      imgType: "",
    };
  },
  created() {
    this.handleSearch();
  },
  computed: {
    userUuid() {
      return this.$store.getters["user/user"].uuid;
    },
    user() {
      return this.$store.getters["user/user"];
    },
    vip() {
      return this.$store.getters["user/vip"];
    },
  },
  methods: {
    handleSearch() {
      this.query.page = 1;
      this.pageList();
    },
    async pageList() {
      this.query.userUuid = this.userUuid;
      this.listLoading = true;
      const { code, data } = await pageList(this.query);
      if (code === 200) {
        this.tableData = data.records;
        this.total = data.total;
      }
      this.listLoading = false;
    },
    // 新增资质弹框
    handleEdit(uuid) {
      if (this.vip < 2) {
        //   this.$baseAlert("您当前的会员等级不支持次操作，请您升级VIP服务");
        this.$baseEventBus.$emit("upgrade", true);
        return;
      }
      if (uuid) {
        getByUuid({ uuid }).then((res) => {
          const { code, msg, data } = res;
          if (code === 200) {
            this.grades = data.grade && data.grade.split(",");
            this.address = [];
            this.address.push(data.province);
            if (data.city) {
              this.address.push(data.city);
            }
            data.established = this.$baseDayjs(data.established).format("YYYY-MM-DD")
            this.form = data;
          } else {
            this.$baseMessage(msg, "error");
          }
        });
      } else {
        this.form = {
          userUuid: this.userUuid,
          name: "",
          uscc: "",
          qyName: "",
          province: "",
          city: "",
          registrationCapital: "",
          established: undefined,
          phone: undefined,
          status: "1",
          grade: "",
          gradeLevel: "",
          gradeName: "",
          img: "",
          yyzzImg: "",
          wtsImg: "",
        };
        this.grades = [];
        this.address = [];
      }
      this.dialogVisible = true;
    },
    changeAddress(data) {
      if (data.length === 1) {
        this.form.province = data[0];
        this.form.city = null;
      } else if (data.length === 2) {
        this.form.province = data[0];
        this.form.city = data[1];
      }
    },
    changeGrade(data) {
      const nodes = this.$refs["cascader"].getCheckedNodes()[0];
      const parentName = nodes.parent && nodes.parent.data && nodes.parent.data.label;
      const name = nodes.data && nodes.data.label;
      this.form.gradeName = parentName + "_" + name;
      this.form.grade = data.join(",");
      this.form.gradeLevel = nodes.value;
    },
    // 提交资质共享信息
    handleSubmit() {
      this.$refs["form"].validate(async (valid) => {
        if (valid) {
          let result;
          this.form.status = 2;
          if (this.form.uuid) {
            result = await update(this.form);
          } else {
            result = await add(this.form);
          }
          const { code, msg } = result;
          if (code === 200) {
            this.pageList();
            this.$baseMessage("提交资质信息成功，等待客服进行审核", "success");
            this.dialogVisible = false;
          } else {
            this.$baseMessage(msg, "error");
          }
        }
      });
    },
    async changeStatus(row) {
      const { code, msg } = await update(row);
      if (code === 200) {
        this.$baseMessage(msg, "success");
      } else {
        this.$baseMessage(msg, "error");
      }
    },
    handleDelete(uuid) {
      this.$baseConfirm("确定删除该资质信息吗？", null, async () => {
        const { code, msg } = await remove({
          uuids: uuid,
        });
        if (code === 200) {
          this.pageList();
        }
        this.$baseAlert(msg);
      });
    },
    openImg(imgType) {
      this.imgType = imgType;
      this.$refs[imgType].click();
    },
    async tirggerFile(event) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      const { code, msg, data } = await upload(formData);
      if (code === 200) {
        this.$nextTick(() => {
          this.form[this.imgType] = data;
        });
      } else {
        this.$baseMessage(msg, "error");
      }
    },
  },
};
</script>

<style lang="less">
.zzgx_c {
  .el-table .el-table__cell {
    text-align: center;
  }
}
.add_zz_alert {
  .el-dialog {
    width: 50%;
    border-radius: 0;
    .el-dialog__headerbtn .el-dialog__close {
      color: #fff;
    }
    .el-dialog__header {
      padding: 0;
    }
    .el-dialog__body {
      padding: 0;
    }
    .el-input {
      width: 100%;
    }
    .el-dialog__footer {
      text-align: center;
    }
  }
}
.zzgx_title {
  width: 870px;
  height: 40px;
  margin: 0 auto;
  .zzgx_title_l {
    width: 200px;
    height: 100%;
    font-size: 21px;
    line-height: 35px;
    letter-spacing: 2px;
    color: rgb(45, 83, 156);
  }
}
.zzgx_c {
  width: 870px;
  margin: 0 auto;
  margin-top: 20px;
}
.add_zz_title {
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  color: #fff;
  font-size: 22px;
  background-color: rgb(69, 113, 184);
}
.add_zz_input {
  margin: 10px;
  margin-top: 10px;
  .attachment {
    width: 100%;
    height: 200px;
    border: 1px solid rgb(220, 223, 230);
  }
}
.fenye {
  width: 100%;
  text-align: center;
  margin-top: 30px;
  margin-bottom: 20px;
}
</style>
<style lang="less" scoped>
.zzgx {
  padding: 15px 20px 30px;
  border: 1px solid transparent;
}
</style>
