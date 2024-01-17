<template>
  <div>
    <div class="all">
      <findswiper></findswiper>
      <div class="breadcrumb">
        <img src="~@/assets/img/public/dw.png" alt="" />
        <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height: 23px">
          <el-breadcrumb-item>当前位置</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>信息详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="zbgg_c">
        <h2>{{ form.title }}</h2>
        <div class="gray">
          <span>发布时间：{{ form.publishTime ? $baseDayjs(form.publishTime).format("YYYY-MM-DD") : "" }}</span>
          <!-- <span>信息来源：{{ form.source ? form.source : "投标宝盒" }}</span> -->
        </div>
        <div class="zbgg_content" v-html="form.content"></div>
      </div>
    </div>
  </div>
</template>

<script>
import findswiper from "@/components/findswiper";
// 信息服务
import { getByUuid as newsByUuid } from "@/api/cms/news";

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
      let result;
      switch (type) {
        case "news":
          result = await newsByUuid({ uuid });
          this.collectForm = {
            category: "最新资讯",
            type: "最新资讯",
            applyTo: "cms_news",
            sym: type,
          };
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
          } else {
            this.$router.push("/404");
          }
        } else {
          this.$baseEventBus.$emit("upgrade", true);
          //this.$baseAlert(msg);
        }
      }
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
@import url("~@/assets/css/anon/info.less");
</style>
