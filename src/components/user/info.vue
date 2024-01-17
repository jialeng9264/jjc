<template>
  <div>
    <div class="bianji">
      <el-dialog :visible.sync="dialogVisible" width="30%">
        <div class="bianji_title">
          <el-divider>修改个人信息</el-divider>
        </div>
        <div class="bianji_c">
          <el-form ref="form" :model="form" :rules="rules" label-width="90px">
            <el-form-item label="头像:" prop="avatar">
              <input v-show="false" type="file" accept="image/*" @change="tirggerFile($event)" ref="input" />
              <span @click="openImg"> <el-avatar :size="60" :src="form.avatar"></el-avatar></span>
            </el-form-item>
            <el-form-item label="用户名称:" prop="userName">
              <el-input v-model="form.userName"></el-input>
            </el-form-item>
            <!-- <el-form-item v-if="userInfo.uscc" label="企业名称:" prop="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item> -->
            <el-form-item label="微信:" class="wx">
              <p class="bindwx" ref="bindwx">
                <template v-if="userInfo.wxId">
                  <span @click="deletewx" class="jbWx">解绑微信</span>
                </template>
                <span v-else @click="bindwx" class="bdWx">去绑定</span>
              </p>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handleSubmit">确 定</el-button>
          <el-button @click="dialogVisible = false">关 闭</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { upload } from "@/api/file/upload";
import { update } from "@/api/user";
import { bindWxId, deleteWxId } from "@/api/user";
import { getData } from "@/api/oauth";
export default {
  data() {
    return {
      dialogVisible: false,
      form: { avatar: "/upload/2022-04-25/707c6e5d-e5be-4989-a01a-cd8cd03c29c6.png" },
      rules: {
        name: [{ required: true, message: "请输入企业名称", trigger: "blur" }],
        userName: [{ required: true, message: "请输入用户名称", trigger: "blur" }],
        avatar: [{ required: true, message: "请上传用户头像", trigger: "blur" }],
      },
    };
  },
  computed: {
    userInfo() {
      return this.$store.getters["user/user"];
    },
  },
  created() {
    this.form = this.$baseLodash.cloneDeep(this.userInfo);
  },
  methods: {
    handleSubmit() {
      this.$refs["form"].validate(async (valid) => {
        if (valid) {
          const { code, msg } = await update(this.form);
          if (code === 200) {
            this.$baseMessage(msg, "success");
            await this.$store.dispatch("user/getInfo");
            this.dialogVisible = false;
          } else {
            this.$baseAlert(msg);
          }
        }
      });
    },
    openImg() {
      this.$refs.input.click();
    },
    async tirggerFile(event) {
      const file = event.target.files[0];
      const fromData = new FormData();
      fromData.append("file", file);
      const { code, msg, data } = await upload(fromData);
      if (code === 200) {
        this.form.avatar = data;
      } else {
        this.$baseMessage(msg, "error");
      }
    },
    bindwx() {
      if (this.$store.getters["user/user"].wxId) {
        this.$baseAlert("您已经绑定过微信，如需更换，请先解绑");
        return;
      }
      const iWidth = 650;
      const iHeight = 500;
      var iTop = (window.screen.height - 30 - iHeight) / 2;
      var iLeft = (window.screen.width - 10 - iWidth) / 2;
      const win = window.open(
        "http://www.tbbh.com.cn/admin/oauth/wx/render",
        "_blank",
        "height=" + iHeight + ",width=" + iWidth + ",top=" + iTop + ",left=" + iLeft + ""
      );
      const inter = setInterval(async () => {
        if (localStorage.getItem("wx_status")) {
          if (win) {
            win.close();
            clearInterval(inter);
          }
          if (localStorage.getItem("wx_status") == 200) {
            this.$baseAlert("您的微信已绑定过其他账号，如需更换，请先解绑");
          } else if (localStorage.getItem("wx_status") == 204) {
            const { code, data } = await getData({
              code: localStorage.getItem("wx_code"),
            });
            if (code == 200) {
              const result = await bindWxId({ wxId: data.token.unionId });
              const { code, msg } = result;
              if (code == 200) {
                this.$baseAlert(msg, "系统提示");
                this.bind = false;
              }
              await this.$store.dispatch("user/getInfo");
            }
          }
          localStorage.removeItem("wx_status");
        }
      }, 1000);
    },
    async deletewx() {
      const result = await deleteWxId({ wxId: this.$store.getters["user/user"].wxId });
      const { code, msg } = result;
      if (code == 200) {
        this.$baseAlert(msg, "系统提示");
        this.bind = true;
      } else {
        this.$baseAlert("您还未绑定微信");
      }
      await this.$store.dispatch("user/getInfo");
    },
  },
};
</script>

<style lang="less">
.bianji {
  .el-dialog__body {
    padding: 0;
  }
  .el-form-item__content {
    line-height: 0;
  }
  .el-dialog__footer {
    text-align: center;
  }
}
</style>

<style lang="less" scoped>
.bianji_title {
  width: 66%;
  margin: 0 auto;
}
.bianji_c {
  width: 280px;
  margin: 0 auto;
  margin-top: 30px;
  .wx {
    line-height: 40px;
    .bindwx {
      height: 100%;
      line-height: 40px;
      .dis {
        display: flex;
        flex-direction: column;
      }
      span {
        cursor: pointer;
      }
      .bdWx {
        color: #409eff;
      }
      .jbWx {
        color: #f56c6c;
      }
    }
  }
}
</style>
