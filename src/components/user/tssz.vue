<template>
  <div>
    <div class="tssz">
      <div class="tssz_title">
        <img src="~@/assets/img/user/xxtssz.png" alt="" />
        <span>消息推送设置</span>
      </div>
      <div class="tssz_c">
        <el-button type="primary">推送状态：{{ description() }}</el-button>
        <el-button :type="form.status === '0' ? 'primary' : 'info'" @click="handleClick('0')">不推送</el-button>
        <el-button :type="form.status === '1' ? 'primary' : 'info'" @click="handleClick('1')">实时推送</el-button>
        <el-button :type="form.status === '2' ? 'primary' : 'info'" @click="handleClick('2')">自定义推送</el-button>
        <br />
        <div v-show="form.status === '2'">
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选 </el-checkbox>
          <div></div>
          <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="city in cities" :label="city" :key="city">{{ city }}</el-checkbox>
          </el-checkbox-group>
        </div>
        <el-time-picker
          v-show="form.status === '2'"
          v-model="form.time"
          :picker-options="{
            selectableRange: '00:00:00 - 23:59:59',
          }"
          value-format="HH:mm:ss"
          placeholder="选择具体时间"
          @change="save"
        >
        </el-time-picker>
      </div>

      <div class="wdgz_focus" v-if="vip == 3">
        <div class="keyword">
          <el-divider content-position="left">每周一推送上周 采购意向Excel</el-divider>
          <el-switch v-model="form.excelStatus" active-text="开启周一推送" inactive-text="关闭周一推送" active-value="1" inactive-value="0" @change="changeExcelStatus"> </el-switch>
        </div>
      </div>
      <div class="wdgz_focus">
        <div class="keyword">
          <el-divider content-position="left">关键字推送</el-divider>
          <el-tag effect="dark" type="primary">关键字标题：</el-tag>
          <el-tag v-for="(item, index) in gjzAct" :key="'1' + index" closable effect="dark" type="warning" @close="removeGjz(item)">
            {{ item.hy }}
          </el-tag>
          <br />
          <el-form label-width="140px">
            <el-form-item label="新增关键字标签：">
              <el-input
                placeholder="请输入关键字内容（单条添加）"
                v-model="gjz"
                show-word-limit
                maxlength="5"
                @keyup.enter.native="addGjz"
              ></el-input>
              <el-button type="primary" @click="addGjz">确认</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="yi">
          <el-divider content-position="left">已关注行业</el-divider>
          <el-tag effect="dark" type="primary">工程建设：</el-tag>

          <el-tag v-for="(item, index) in gcjsAct" :key="'1' + index" closable effect="dark" type="warning" @close="handleClose('gcjs', item)">
            {{ item.hy }}
          </el-tag>
          <br />
          <el-tag effect="dark" type="primary">政府采购：</el-tag>
          <el-tag v-for="(item, index) in zfcgAct" :key="'2' + index" closable effect="dark" type="warning" @close="handleClose('zfcg', item)">
            {{ item.hy }}
          </el-tag>
        </div>
        <div class="wei">
          <el-divider content-position="left">未关注行业</el-divider>
          <el-tag effect="dark" type="primary">工程建设：</el-tag>
          <el-tag v-for="(item, index) in gcjsData" :key="'3' + index" effect="dark" type="info" @click="handleClickHy('gcjs', item)">
            {{ item.hy }}
          </el-tag>
          <br />
          <el-tag effect="dark" type="primary">政府采购：</el-tag>
          <el-tag v-for="(item, index) in zfcgData" :key="'4' + index" effect="dark" type="info" @click="handleClickHy('zfcg', item)">
            {{ item.hy }}
          </el-tag>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import hyJson from "@/data/hy.json";
import { listByUser, add as addFollow, remove } from "@/api/user/follow";
import { getByUser, add, update, updateWxStatus, updateExcelStatus } from "@/api/user/pushSettings";

const cityOptions = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
export default {
  data() {
    return {
      time: "每天",
      form: {
        status: "0",
      },
      checkedCities: [],
      cities: cityOptions,
      isIndeterminate: true,
      checkAll: true,
      gjz: "",
      gjzAct: [],
      gcjsAct: [],
      zfcgAct: [],
      gcjsData: [],
      zfcgData: [
        {
          hy: "工程",
          hyCode: "A",
        },
        {
          hy: "货物",
          hyCode: "B",
        },
        {
          hy: "服务",
          hyCode: "C",
        },
      ],
    };
  },
  created() {
    this.gcjsData = this.$baseLodash.cloneDeep(hyJson);
    this.getByUser();
    this.listByUser();
  },
  computed: {
    userUuid() {
      return this.$store.getters["user/user"].uuid;
    },
    vip() {
      return this.$store.getters["user/vip"];
    },
  },
  methods: {
    async listByUser() {
      const { code, data } = await listByUser();
      if (code === 200) {
        this.gcjsAct = data.filter((item) => item.category === "gcjs");
        this.zfcgAct = data.filter((item) => item.category === "zfcg");
        this.gjzAct = data.filter((item) => item.category === "gjz");
        this.gcjsAct = this.$baseLodash.orderBy(this.gcjsAct, "hyCode");
        this.zfcgAct = this.$baseLodash.orderBy(this.zfcgAct, "hyCode");
        this.gcjsAct.forEach((item) => {
          this.gcjsData.splice(
            this.gcjsData.findIndex((i) => i.hyCode === item.hyCode),
            1
          );
        });
        this.zfcgAct.forEach((item) => {
          this.zfcgData.splice(
            this.zfcgData.findIndex((i) => i.hyCode === item.hyCode),
            1
          );
        });
      }
    },
    addGjz() {
      // if (this.vip < 3) {
      //   //   this.$baseAlert("您当前的会员等级不支持次操作，请您升级VIP服务");
      //   this.$baseEventBus.$emit("upgrade", true);
      //   return;
      // }
      const item = {
        category: "gjz",
        hy: this.gjz,
      };
      const add = this.addFollow(item);
      add.then((res) => {
        if (!res) {
          return;
        }
        this.gjz = "";
        this.gjzAct.push(item);
      });
    },
    async removeGjz(item) {
      const remove = await this.remove(item);
      if (!remove) {
        return;
      }
      this.gjzAct.splice(
        this.gjzAct.findIndex((i) => i.hy === item.hy),
        1
      );
    },
    handleClickHy(category, item) {
      // if (this.vip < 3) {
      //   //   this.$baseAlert("您当前的会员等级不支持次操作，请您升级VIP服务");
      //   this.$baseEventBus.$emit("upgrade", true);
      //   return;
      // }
      item.category = category;
      const add = this.addFollow(item);
      add.then((res) => {
        if (!res) {
          return;
        }
        if (category === "gcjs") {
          this.gcjsAct.push(item);
          this.gcjsAct = this.$baseLodash.orderBy(this.gcjsAct, "hyCode");
          this.gcjsData.splice(
            this.gcjsData.findIndex((i) => i.hyCode === item.hyCode),
            1
          );
        } else {
          this.zfcgAct.push(item);
          this.zfcgAct = this.$baseLodash.orderBy(this.zfcgAct, "hyCode");
          this.zfcgData.splice(
            this.zfcgData.findIndex((i) => i.hyCode === item.hyCode),
            1
          );
        }
      });
    },
    async handleClose(category, item) {
      const remove = await this.remove(item);
      if (!remove) {
        return;
      }
      if (category === "gcjs") {
        this.gcjsAct.splice(
          this.gcjsAct.findIndex((i) => i.hyCode === item.hyCode),
          1
        );
        this.gcjsData.push(item);
        this.gcjsData = this.$baseLodash.orderBy(this.gcjsData, "hyCode");
      } else {
        this.zfcgAct.splice(
          this.zfcgAct.findIndex((i) => i.hyCode === item.hyCode),
          1
        );
        this.zfcgData.push(item);
        this.zfcgData = this.$baseLodash.orderBy(this.zfcgData, "hyCode");
      }
    },
    async addFollow(item) {
      const { code, msg, data } = await addFollow(item);
      if (code === 200) {
        item.uuid = data;
      } else {
        this.$baseMessage(msg, "error");
        return false;
      }
      return true;
    },
    async remove(item) {
      const { code, msg } = await remove({
        uuid: item.uuid,
      });
      if (code !== 200) {
        this.$baseMessage(msg, "error");
        return false;
      }
      return true;
    },
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      this.save();
    },
    async getByUser() {
      const { data } = await getByUser();
      if (data == null) {
        this.form = {
          userUuid: this.userUuid,
          time: "",
          status: "0",
        };
      } else {
        data.time = data.time ? this.$baseDayjs(data.time).format("HH:mm:ss") : "10:00";
        this.form = data;
        const weekss = data.weeks ? data.weeks.split(",") : [];
        this.checkedCities = [];
        weekss.forEach((item) => {
          switch (item) {
            case "1":
              this.checkedCities.push("周一");
              break;
            case "2":
              this.checkedCities.push("周二");
              break;
            case "3":
              this.checkedCities.push("周三");
              break;
            case "4":
              this.checkedCities.push("周四");
              break;
            case "5":
              this.checkedCities.push("周五");
              break;
            case "6":
              this.checkedCities.push("周六");
              break;
            case "7":
              this.checkedCities.push("周日");
              break;
          }
        });
      }
    },
    handleClick(status) {
      this.form.status = status;
      this.save();
    },
    async save() {
      // if (this.vip < 3) {
      //   //   this.$baseAlert("您当前的会员等级不支持次操作，请您升级VIP服务");
      //   this.$baseEventBus.$emit("upgrade", true);
      //   return;
      // }
      let result;
      if (this.form.status === "2") {
        if (this.checkedCities.length === 0) {
          this.$baseMessage("请您选择推送周期", "error");
          return;
        }
        if (!this.form.time) {
          this.$baseMessage("请您选择推送时间", "error");
          return;
        }
      }
      let weekss = [];
      this.checkedCities.forEach((item) => {
        switch (item) {
          case "周一":
            weekss.push("1");
            break;
          case "周二":
            weekss.push("2");
            break;
          case "周三":
            weekss.push("3");
            break;
          case "周四":
            weekss.push("4");
            break;
          case "周五":
            weekss.push("5");
            break;
          case "周六":
            weekss.push("6");
            break;
          case "周日":
            weekss.push("7");
            break;
        }
      });
      weekss.sort();
      this.form.weeks = weekss.join(",");

      if (this.form.uuid) {
        result = await update(this.form);
      } else {
        result = await add(this.form);
      }
      const { code, msg } = result;
      if (code === 200) {
        this.getByUser();
        this.$baseMessage(msg, "success");
      } else {
        this.$baseMessage(msg, "error");
      }
    },
    description() {
      if (this.form.status === "0") {
        return "不推送";
      } else if (this.form.status === "1") {
        return "实时推送";
      } else {
        if (this.checkedCities.length === this.cities.length) {
          return "周一至周日" + " " + this.form.time;
        }
        return this.checkedCities + " " + this.form.time;
      }
    },
    changeStatus() {
      // if (this.vip < 3) {
      //   //   this.$baseAlert("您当前的会员等级不支持次操作，请您升级VIP服务");
      //   this.$baseEventBus.$emit("upgrade", true);
      //   return;
      // }
      if (this.form.uuid) {
        updateWxStatus({
          uuid: this.form.uuid,
          wxStatus: this.form.wxStatus,
        });
      }
    },
    changeExcelStatus() {
      updateExcelStatus({
        uuid: this.form.uuid,
        wxStatus: this.form.excelStatus,
      }).then((res) => {
        this.$baseMessage(res.msg);
      });
    },
  },
};
</script>

<style lang="less">
.tssz_c {
  .el-button:not(:first-child) {
    margin-left: 10px;
  }

  .el-dropdown {
    margin-left: 10px;
  }
}

.wdgz_focus {
  .el-button {
    margin-top: 10px;
  }

  .el-tag {
    margin-top: 10px;
  }

  .el-tag:not(:first-child) {
    margin-left: 12px;
  }
}
</style>
<style lang="less" scoped>
.tssz {
  padding: 15px 20px 30px;
  border: 1px solid transparent;
}

.wdgz_focus {
  width: 870px;
  margin: 0 auto;
  margin-top: 30px;
  margin-bottom: 20px;
}

.tssz_title {
  width: 200px;
  height: 25px;
  font-size: 21px;
  letter-spacing: 2px;
  color: #2d539c;
}

.tssz_c {
  height: auto;
  margin-left: 30px;
  margin-top: 30px;

  .el-checkbox {
    margin-top: 20px;
  }

  .el-time-select {
    margin-top: 20px;
  }
}

.keyword .el-form {
  margin-top: 15px;

  .el-input {
    width: 270px;
    float: left;
  }

  .el-button {
    float: left;
    margin-top: 0;
    margin-left: 20px;
  }
}
</style>
