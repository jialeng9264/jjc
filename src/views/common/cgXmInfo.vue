<template>
  <div>
    <div class="wfbgg">
      <el-dialog title="项目信息" :visible.sync="dialogShow" @close="closeDialog" width="70%">
        <span>项目基本信息</span>
        <el-table :data="tableData" border>
          <el-table-column prop="code" label="项目代码" align="center"></el-table-column>
          <el-table-column prop="title" label="项目名称" align="center"></el-table-column>
          <el-table-column prop="category" label="项目类别" align="center"></el-table-column>
          <el-table-column prop="frdw" label="项目法人单位" align="center"></el-table-column>
        </el-table>

        <span>审批事项公示信息</span>
        <el-table :data="tableData" border>
          <el-table-column prop="spbm" label="审批部门" align="center"> </el-table-column>
          <el-table-column prop="spsx" label="审批事项" align="center"> </el-table-column>
          <el-table-column prop="spjg" label="审批结果" align="center"> </el-table-column>
          <el-table-column prop="sprq" label="审批日期" align="center"> </el-table-column>
          <el-table-column prop="spwh" label="审批文号" align="center"> </el-table-column>
        </el-table>
        <!-- <span v-if="tableData_jg.length > 0">
          <span>相关办理结果</span>
          <el-table :data="tableData_jg" border>
            <el-table-column prop="spbm" label="审批部门" align="center"> </el-table-column>
            <el-table-column prop="spsx" label="审批事项" align="center"> </el-table-column>
            <el-table-column prop="spjg" label="审批结果" align="center"> </el-table-column>
            <el-table-column prop="sprq" label="审批日期" align="center"> </el-table-column>
            <el-table-column prop="spwh" label="审批文号" align="center"> </el-table-column>
          </el-table>
        </span> -->
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getByUuid } from "@/api/zfcg/xm";
import { add as brAdd } from "@/api/user/browsingRecords";

export default {
  data() {
    return {
      tableData: [],
      tableData_jg: [],
      dialogShow: false,
      uuid: "",
    };
  },
  watch: {
    dialogShow(n) {
      if (n) {
        this.getByUuid();
      }
    },
  },
  methods: {
    async getByUuid() {
      if (this.uuid) {
        const { code, data } = await getByUuid({
          uuid: this.uuid,
        });
        if (code === 200) {
          this.tableData = [];
          this.tableData.push(data);
          this.tableData_jg = data.list;
          this.handleBR(data);
        } else {
          this.closeDialog();
        }
      } else {
        this.closeDialog();
      }
    },
    async handleBR(data) {
      brAdd({
        refUuid: data.uuid,
        title: data.title,
        time: data.time,
        category: "政府采购",
        type: "立项项目",
        sym: "cgXm",
      });
    },
    closeDialog() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="less">
.wfbgg {
  .el-dialog {
    width: 1000px;
    height: 400px;
    border-radius: 0;

    .el-dialog__headerbtn .el-dialog__close {
      color: #fff;
    }

    .el-dialog__title {
      color: #fff;
      padding-left: 20px;
    }

    .el-dialog__header {
      background-color: rgb(69, 113, 184);
    }
  }

  .el-table .el-table__cell {
    padding: 2px 0;
  }
}
</style>

<style lang="less" scoped>
.el-dialog span {
  display: inline-block;
  color: #333;
  font-size: 20px;
}

.el-table {
  height: 80px;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
