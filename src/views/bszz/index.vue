<template>
  <div>
    <div class="all">
      <swiper ref="mySwiper" :options="swiperOption">
        <swiper-slide v-for="img in pics" :key="img.index">
          <img :src="img.url" alt="" />
        </swiper-slide>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
      <div class="bszz">
        <div class="bszz_content">
          <div class="bszz_l">
            <div class="title">
              <span class="aft">标书制作</span>
            </div>
            <el-form ref="form" :model="form" :rules="rules" label-width="80px">
              <el-form-item label="文件类型" prop="type">
                <el-select v-model="form.type">
                  <el-option label="招标文件" value="招标文件"></el-option>
                  <el-option label="投标文件" value="投标文件"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="公司名称" prop="name">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="姓名" prop="userName">
                <el-input v-model="form.userName"></el-input>
              </el-form-item>
              <el-form-item label="联系方式" prop="phone">
                <el-input v-model="form.phone"></el-input>
              </el-form-item>
              <el-form-item label="要求" prop="content">
                <el-input type="textarea" v-model="form.content"></el-input>
              </el-form-item>
            </el-form>
            <div class="submit" @click="onSubmit()">提交</div>
          </div>
          <div class="bszz_r">
            <div class="title">
              <span class="aft">投标文件范文下载</span>
            </div>
            <div class="file_c">
              <ul>
                <li v-for="(item, index) in fwxzList" :key="index" @click="connect">
                  <span class="file_name">{{ item }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/swiper-bundle.css";
import { add } from "@/api/user/tenderMake";
import { validatorPhone } from "@/utils/validator";

export default {
  components: {
    swiper,
    swiperSlide,
  },
  data() {
    return {
      pics: [
        {
          url: require("@/assets/img/banner/banner-3.jpg"),
          link: "/fenbaoxinxi",
        },
        {
          url: require("@/assets/img/banner/banner-1.jpg"),
          link: "/zhaobiaoxiangmu",
        },
        {
          url: require("@/assets/img/banner/banner-2.jpg"),
          link: "/ziyuangongxiang",
        },
        {
          url: require("@/assets/img/banner/banner-4.jpg"),
          link: "/zuixinzixun",
        },
      ],
      swiperOption: {
        loop: true,
        loopFillGroupWithBlank: true,
        autoplay: {
          delay: 4000,
          stopOnLastSlide: false,
          disableOnInteraction: false,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true, //允许分页点击跳转
        },
      },
      form: {
        type: "投标文件",
        name: "",
        userName: "",
        phone: "",
        content: "",
        status: "0",
      },
      rules: {
        type: [{ required: true, message: "请选择标书类型", trigger: "blur" }],
        name: [{ required: true, message: "请填写企业名称", trigger: "blur" }],
        userName: [{ required: true, message: "请填写用户名称", trigger: "blur" }],
        phone: [{ required: true, validator: validatorPhone, trigger: "blur" }],
        content: [{ required: true, message: "请填写制作要求", trigger: "blur" }],
      },
      // 范文下载
      fwxzList: [
        "规划",
        "勘察",
        "设计",
        "造价",
        "项目管理",
        "施工",
        "机械设备",
        "医疗器械",
        "建筑材料",
        "药品",
        "化工材料及其制品",
        "勘查与调查",
        "公共咨询",
        "交通运输",
        "租赁",
        "金融",
        "节能服务",
        "高新技术",
        "其他",
      ],
      ratio: 0,
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
  },
  created() {
    this.$nextTick(() => {
      window.addEventListener("resize", () => {
        //监听浏览器窗口大小改变
        //浏览器变化执行动作
        function ChangeRatio() {
          var ratio = 0;
          var screen = window.screen;
          var ua = navigator.userAgent.toLowerCase();
          if (window.devicePixelRatio !== undefined) {
            ratio = window.devicePixelRatio;
          } else if (~ua.indexOf("msie")) {
            if (screen.deviceXDPI && screen.logicalXDPI) {
              ratio = screen.deviceXDPI / screen.logicalXDPI;
            }
          } else if (window.outerWidth !== undefined && window.innerWidth !== undefined) {
            ratio = window.outerWidth / window.innerWidth;
          }
          if (ratio) {
            ratio = Math.round(ratio * 100);
          }
          return ratio;
        }
        this.ratio = ChangeRatio();
        if (this.ratio >= "113" || this.ratio >= "125") {
          this.$store.state.user.kuan = 0;
        } else {
          this.$store.state.user.kuan = 220;
        }
      });
    });
  },
  methods: {
    onSubmit() {
      this.$refs["form"].validate(async (valid) => {
        if (valid) {
          const { code, msg } = await add(this.form);
          this.$baseAlert(msg, null, () => {
            if (code === 200) { 
              this.form = {
                type: "投标文件",
                name: "",
                userName: "",
                phone: "",
                content: "",
                status: "0",
              };
            }
          });
        }
      });
    },
    connect() {
      this.$baseEventBus.$emit("connect", true);
    },
  },
};
</script>

<style lang="less" scoped>
@import url("~@/assets/css/bszz/bszz.less");
</style>
