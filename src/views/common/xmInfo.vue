<template>
  <div>
    <div class="all">
      <findswiper></findswiper>
      <div class="breadcrumb">
        <img src="~@/assets/img/public/dw.png" alt="" />
        <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height: 23px">
          <el-breadcrumb-item>当前位置</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>立项/采购项目</el-breadcrumb-item>
          <el-breadcrumb-item>项目详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div v-if="form.title" class="zbgg_c" :style="sliderStyle">
        <h2>{{ form.title }}</h2>
        <div class="gray">
          <span>发布时间：{{ $baseDayjs(form.time).format("YYYY-MM-DD") }}</span>
          <span>采购人：{{ form.cgr }}</span>
          <span v-if="meCollect" class="add fr" @click="handleConCollect"><i class="el-icon-star-on"></i>取消收藏</span>
          <span v-else class="add fr" @click="handleAddCollect"><i class="el-icon-star-off"></i>添加收藏</span>
        </div>
        <div class="zbgg_content" v-html="form.content"></div>
      </div>

      <div v-else class="mask">
        <!-- <el-skeleton :rows="6" animated :loading="loading"> </el-skeleton> -->
        <div class="relative">
          <div class="cont"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import findswiper from "@/components/findswiper";

// 政府采购
import { getByUuid as xmByUuid } from "@/api/zfcg/xm";
// 浏览记录
import { add as brAdd } from "@/api/user/browsingRecords";

// 收藏表
import { add, meCollect, remove } from "@/api/user/collect";

export default {
  components: {
    findswiper,
  },
  data() {
    return {
      form: {},
      uuid: "",
      meCollect: false,
      collectForm: {},
      loading: false,
    };
  },
  created() {
    const { type, uuid } = this.$route.query;
    if (uuid && type) {
      this.getByUuid(type, uuid);
      this.uuid = uuid;
    } else {
      this.$router.push("/404");
    }
  },
  methods: {
    async getByUuid(type, uuid) {
      this.loading = true;
      let result;
      switch (type) {
        case "xm":
          this.collectForm = {
            category: "政府采购",
            type: "采购意向项目",
            applyTo: "pc_zfcg_xm",
            sym: type,
          };
          result = await xmByUuid({ uuid });
          break;
        default:
          this.$baseAlert("请求参数错误", "系统提示", () => {
            this.$router.push("/404");
          });
          break;
      }
      if (result) {
        const { code, msg, data } = result;
        if (code === 200) {
          if (data.uuid) {
            this.form = data;
            await this.handleMeCollect();
            this.handleBR();
          } else {
            this.$router.push("/404");
          }
        } else {
          this.$baseEventBus.$emit("out", true);
          // this.$baseAlert(msg);
        }
      }
      this.loading = false;
    },
    async handleAddCollect() {
      const formData = this.form;
      this.collectForm.refUuid = formData.uuid;
      this.collectForm.title = formData.title;
      this.collectForm.time = formData.time;
      const { code, msg } = await add(this.collectForm);
      if (code === 200) {
        this.meCollect = true;
        this.$baseMessage(msg, "success");
      } else {
        // TODO 加入图片
        this.$baseAlert(msg);
      }
    },
    async handleConCollect() {
      const { code, msg } = await remove({ refUuid: this.uuid });
      if (code === 200) {
        this.meCollect = false;
        this.$baseMessage(msg, "success");
      } else {
        
        this.$baseAlert(msg);
      }
    },
    async handleMeCollect() {
      const { code, data } = await meCollect({
        refUuid: this.uuid,
      });
      if (code === 200) {
        this.meCollect = data.meCount;
      }
    },
    async handleBR() {
      const data = this.form;
      brAdd({
        refUuid: data.uuid,
        title: data.title,
        time: data.time,
        category: this.collectForm.category,
        type: this.collectForm.type,
        sym: this.collectForm.sym,
      });
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
@import url("~@/assets/css/common/xmInfo.less");
</style>
