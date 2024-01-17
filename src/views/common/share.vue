<template>
  <div>
    <div class="all">
      <div class="img"><img src="~@/assets/img/logo/logo_png.png" alt="" /></div>
      <div v-if="form.title" class="zbgg_c">
        <h2>{{ form.title }}</h2>
        <div class="gray">
          <div>
            <span>发布时间：{{ $baseDayjs(form.time).format("YYYY-MM-DD") }}</span>
          </div>
        </div>
        <div class="zbgg_content" v-html="form.content"></div>
      </div>
      <div class="mask" v-show="mask">
        <div class="mask_c">
          <div class="tit">温馨提示</div>
          <div class="txt">分享内容已失效</div>
          <div class="btn" @click="close">确认</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 政府采购
import { get as zbggByUuid } from "@/api/zfcg/zbgg";
import { get as gzggByUuid } from "@/api/zfcg/gzgg";
import { get as zhbggByUuid } from "@/api/zfcg/zhbgg";
import { get as fbggByUuid } from "@/api/zfcg/fbgg";
import { get as dylyByUuid } from "@/api/zfcg/dyly";
// 建设工程
import { get as gcZbggByUuid } from "@/api/gcjs/zbgg";
import { get as gcZbjhggByUuid } from "@/api/gcjs/zbjhgg";
import { get as gcBgggByUuid } from "@/api/gcjs/bggg";
import { get as gcZbhxrgsByUuid } from "@/api/gcjs/zbhxrgs";
import { get as gcZhongbggByUuid } from "@/api/gcjs/zhongbgg";
// 依法非招标
import { get as fZbggByUuid } from "@/api/f/zbgg";
import { get as fBgggByUuid } from "@/api/f/bggg";
import { get as fZbhxrgsByUuid } from "@/api/f/zbhxrgs";
import { get as fZhbggByUuid } from "@/api/f/zhongbgg";
// 分包信息
import { get as subByUuid } from "@/api/user/subcontract";
import remConfig from "@/utils/rem";
remConfig();

export default {
  data() {
    return {
      form: {},
      type: "",
      uuid: "",
      uid: "",
      collectForm: {},
      loading: false,
      title: "",
      mask: false,
    };
  },
  created() {
    const { type, uuid, uid } = this.$route.query;
    if (uuid && type) {
      this.type = type;
      this.uuid = uuid;
      this.uid = uid;
      this.getByUuid(type, uuid);
    } else {
      this.$router.push("/404");
    }
  },
  computed: {},
  methods: {
    async getByUuid(type, uuid) {
      this.loading = true;
      let result;
      const query = {
        uuid: uuid,
        type: type,
        uid: this.uid,
      };
      switch (type) {
        case "gcZbgg":
          result = await gcZbggByUuid(query);
          this.collectForm = {
            category: "工程建设",
            type: "招标公告",
            applyTo: "pc_gcjs_zbgg",
            sym: type,
          };
          break;
        case "gcZbjhgg":
          result = await gcZbjhggByUuid({ uuid });
          this.category = "工程建设";
          this.collectForm = {
            category: "工程建设",
            type: "招标计划公告",
            applyTo: "pc_gcjs_zbjhgg",
            sym: type,
          };
          break;
        case "gcBggg":
          result = await gcBgggByUuid(query);
          this.collectForm = {
            category: "工程建设",
            type: "变更公告",
            applyTo: "pc_gcjs_bggg",
            sym: type,
          };
          break;
        case "gcZbhxrgs":
          result = await gcZbhxrgsByUuid(query);
          this.collectForm = {
            category: "工程建设",
            type: "中标候选人公示",
            applyTo: "pc_gcjs_zbhxrgs",
            sym: type,
          };
          break;
        case "gcZhongbgg":
          result = await gcZhongbggByUuid(query);
          this.collectForm = {
            category: "工程建设",
            type: "中标公告",
            applyTo: "pc_gcjs_zhongbgg",
            sym: type,
          };
          break;
        case "fZbgg":
          result = await fZbggByUuid(query);
          this.collectForm = {
            category: "依法非招标",
            type: "招标公告",
            applyTo: "pc_f_zbgg",
            sym: type,
          };
          break;
        case "fBggg":
          result = await fBgggByUuid(query);
          this.collectForm = {
            category: "依法非招标",
            type: "变更公告",
            applyTo: "pc_f_bggg",
            sym: type,
          };
          break;
        case "fZbhxrgs":
          result = await fZbhxrgsByUuid(query);
          this.collectForm = {
            category: "依法非招标",
            type: "中标候选人公示",
            applyTo: "pc_f_zbhxrgs",
            sym: type,
          };
          break;
        case "fZhbgg":
          result = await fZhbggByUuid(query);
          this.collectForm = {
            category: "依法非招标",
            type: "中标公告",
            applyTo: "pc_f_zhbgg",
            sym: type,
          };
          break;
        case "zbgg":
          result = await zbggByUuid(query);
          this.collectForm = {
            category: "政府采购",
            type: "采购/预审公告",
            applyTo: "pc_zfcg_zbgg",
            sym: type,
          };
          break;
        case "gzgg":
          result = await gzggByUuid(query);
          this.collectForm = {
            category: "政府采购",
            type: "更正公告",
            applyTo: "pc_zfcg_gzgg",
            sym: type,
          };
          break;
        case "zhbgg":
          result = await zhbggByUuid(query);
          this.collectForm = {
            category: "政府采购",
            type: "中标(成交)结果公告",
            applyTo: "pc_zfcg_zhbgg",
            sym: type,
          };
          break;
        case "fbgg":
          result = await fbggByUuid(query);
          this.collectForm = {
            category: "政府采购",
            type: "废标公告",
            applyTo: "pc_zfcg_fbgg",
            sym: type,
          };
          break;
        case "dyly":
          result = await dylyByUuid(query);
          this.collectForm = {
            category: "政府采购",
            type: "单一来源",
            applyTo: "pc_zfcg_dyly",
            sym: type,
          };
          break;
        case "fbxx":
          result = await subByUuid(query);
          this.collectForm = {
            category: "分包信息",
            type: "分包信息",
            applyTo: "jjc_subcontract",
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
          this.mask = true;
        }
      }
      this.loading = false;
    },
    isWeiXin() {
      var ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
      } else {
        return false;
      }
    },
    close() {
        var userAgent = navigator.userAgent;
        if (this.isWeiXin()) {
          window.WeixinJSBridge.call("closeWindow");
        }
        if (userAgent.indexOf("Firefox") != -1 || userAgent.indexOf("Chrome") != -1) {
          window.close();
        } else {
          window.close();
        }
    },
  },
};
</script>

<style lang="less" scoped>
@import url("~@/assets/css/reset.css");
.all {
  min-height: 100vh;
  background-color: #f5f5f5;
  overflow: hidden;
  position: relative;
  font-size: 14px;
}
.mask {
  width: 17rem;
  height: 18rem;
  background: url("~@/assets/img/public/tips.png");
  background-size: 100% 100%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .mask_c {
    width: 100%;
    height: 100%;
    position: relative;
    .tit {
      width: 100%;
      font-size: 1.4rem;
      position: absolute;
      bottom: 7rem;
      text-align: center;
    }
    .txt {
      width: 100%;
      font-size: 1.1rem;
      color: #848484;
      position: absolute;
      bottom: 5rem;
      text-align: center;
    }
    .btn {
      width: 76%;
      height: 2.8rem;
      font-size: 1.3rem;
      color: #ffffff;
      line-height: 2.8rem;
      text-align: center;
      letter-spacing: 0.2rem;
      position: absolute;
      bottom: 1.3rem;
      left: 50%;
      transform: translate(-50%);
      border-radius: 20px;
      background-image: linear-gradient(#b3a7ff, #8876fe);
    }
  }
}
.img {
  text-align: center;
  margin-top: 1rem;
}
.zbgg_c {
  padding: 1.25rem 0.625rem;
  h2 {
    font-size: 1.25rem;
    text-align: center;
    padding: 0 0.625rem 0.625rem;
  }
  .gray {
    text-align: center;
    margin: 0.625rem 0;
  }
}
</style>
