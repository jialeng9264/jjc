<template>
  <div>
    <div class="fbxx">
      <div class="fbxx_title">
        <img src="~@/assets/img/user/fbxx.png" alt="" />
        <span>分包信息</span>
        <el-button type="primary" @click="onAdd">新增</el-button>
      </div>
      <div class="fbxx_c">
        <ul v-if="total > 0">
          <li v-for="(item, index) in tableData" :key="index" @click="handleJump(item.uuid)">
            <img src="~@/assets/img/public/xd.png" alt="" />
            <span class="neirong">{{ item.title }}</span>
            <span class="fr">{{ $baseDayjs(item.time).format("YYYY-MM-DD") }}</span>
          </li>
        </ul>
        <ul v-else>
          <el-empty :image-size="200"></el-empty>
        </ul>
      </div>
      <div v-if="total > 0" class="fenye">
        <pagination :autoScroll="false" :page.sync="query.page" :limit="query.limit" :total="total" @pagination="pageList"></pagination>
      </div>
    </div>
    <el-dialog title="新增分包信息" :visible.sync="visible" :close-on-click-modal="false" width="1200px" center>
      <el-row>
        <el-form :model="form" :rules="rules" class="layui-row" label-width="100px" ref="form">
          <el-col :span="24">
            <el-form-item label="分包标题" prop="title">
              <el-input v-model="form.title" type="textarea" maxlength="300" show-word-limit placeholder="请输入分包信息标题"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="分包内容" prop="content">
              <tinymce-editor ref="editor" style="padding: 20px 0" v-model="form.content" :height="500"></tinymce-editor>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleSave">保 存</el-button>
        <el-button @click="visible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import pagination from "@/components/pagination/index";
import { pageList, add } from "@/api/user/subcontract";
import TinymceEditor from "@/components/tinymce";

export default {
  components: { pagination, TinymceEditor },
  data() {
    return {
      query: {
        page: 1,
        limit: 10,
        titleLike: "",
        desc: "time",
      },
      total: 0,
      tableData: [],
      visible: false,
      form: {
        status: "1",
      },
      rules: {
        userUuid: [{ required: true, trigger: "blur", message: "请填写用户标识" }],
        title: [{ required: true, trigger: "blur", message: "请填写分包信息标题" }],
        content: [{ required: true, trigger: "blur", message: "请填写分包信息内容" }],
        category: [{ required: true, trigger: "blur", message: "请选择分包信息类型" }],
        time: [{ required: true, trigger: "blur", message: "请选择分包信息发布时间" }],
        status: [{ required: true, trigger: "blur", message: "请选择分包信息状态" }],
      },
    };
  },
  created() {
    this.handleSearch();
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
    handleSearch() {
      this.query.page = 1;
      this.pageList();
    },
    async pageList() {
      this.query.userUuid = this.userUuid;
      const { code, data } = await pageList(this.query);
      if (code === 200) {
        this.tableData = data.records;
        this.total = data.total;
      }
    },
    handleJump(uuid) {
      const routeData = this.$router.resolve({
        path: "/common/ggInfo",
        query: { type: "fbxx", uuid },
      });
      window.open(routeData.href, "_blank");
    },
    onAdd() {
      //TODO 提示升级会员
      if (this.vip < 2) {
        //   this.$baseAlert("您当前的会员等级不支持次操作，请您升级VIP服务");
        this.$baseEventBus.$emit("upgrade", true);
        return;
      }
      this.form = {
        status: "1",
      };
      this.visible = true;
    },
    handleSave() {
      this.$refs["form"].validate(async (valid) => {
        if (valid) {
          const { code, msg } = await add(this.form);
          if (code === 200) {
            this.$baseMessage(msg, "success");
            this.visible = false;
            this.pageList();
          } else {
            this.$baseAlert(msg);
          }
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.fbxx {
  padding: 15px 20px 30px;
  border: 1px solid transparent;
}
.fbxx_title {
  width: 210px;
  height: 40px;
  font-size: 21px;
  letter-spacing: 2px;
  color: rgb(45, 83, 156);
  .el-button {
    margin-left: 15px;
  }
}

.fbxx_c {
  width: 845px;
  margin: 0 auto;
  margin-top: 20px;
  ul li {
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    overflow: hidden;
    cursor: pointer;
    border-bottom: 1px solid rgb(236, 245, 252);

    img {
      margin-bottom: 12.5px;
    }

    .neirong {
      display: inline-block;
      width: 690px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-left: 20px;
    }
  }
}

.fenye {
  width: 100%;
  text-align: center;
  margin-top: 30px;
  margin-bottom: 20px;
}
</style>
