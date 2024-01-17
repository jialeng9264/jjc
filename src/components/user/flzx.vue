<template>
  <div>
    <div class="flzx">
      <div v-if="vip > 1" class="flzx_c">
        <ul>
          <li v-for="(item, index) in listData" :key="index">
            <el-divider></el-divider>
            <div class="introduce clearfix">
              <div class="introduce_l fl">
                <img :src="item.pic" alt="" />
              </div>
              <div class="introduce_r fr">
                <div class="full">
                  <span>姓名：{{ item.name }}</span>
                  <div>
                    <el-button size="small" type="warning" @click="checkInfoDetail(item)">查看个人详细简历</el-button>
                  </div>
                </div>
                <div class="con">
                  <p class="gongling">{{ item.gongling }}</p>
                  <p class="dizhi">{{ item.dizhi }}</p>
                  <p class="zhuan">专业领域：</p>
                  <p class="ye">{{ item.ye }}</p>
                  <div class="consult">
                    <el-button size="small" type="primary" class="fl" @click="handleConsult(item)">
                      <i class="el-icon-chat-dot-round"></i> 咨询
                    </el-button>
                    <el-button size="small" type="primary" class="fr" @click="handleSelect(item)"><i class="el-icon-view"></i> 查看 </el-button>
                  </div>
                </div>
              </div>
            </div>
            <div class="detail">
              <el-dialog :visible.sync="mes" width="40%" center>
                <p slot="title" class="title">{{ clickItem.name }}律师个人简介</p>
                <p class="message">{{ clickItem.message }}</p>
                <p class="zhuan">专业领域：</p>
                <p class="ye">{{ item.ye }}</p>
                <p class="zhuan">工作经验：</p>
                <p class="experience">{{ clickItem.detail }}</p>
                <p class="zhuan">{{ clickItem.obtained }}</p>
                <div v-html="clickItem.li" class="honor"></div>
                <div class="close">
                  <el-button type="primary" @click="mes = false">点击关闭</el-button>
                </div>
              </el-dialog>
            </div>
          </li>
        </ul>
      </div>
      <div v-else class="mask">
        <div class="relative"></div>
      </div>
    </div>

    <div class="open">
      <el-dialog title="请输入您的问题" :visible.sync="open" width="40%" center>
        <el-form ref="form" :model="form" :rules="rules">
          <el-form-item prop="userDescr">
            <el-input autosize type="textarea" v-model="form.userDescr" style="height: 300px"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="open = false">取 消</el-button>
          <el-button type="primary" @click="handleSubmit">提 交</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="alert">
      <el-dialog center title="咨询列表" :visible.sync="alert" width="50%">
        <el-table :data="tableData" border>
          <el-table-column align="center" label="咨询时间" min-width="80" prop="createdTime">
            <template #default="{ row }">
              {{ $baseDayjs(row.createdTime).format("YYYY-MM-DD HH:mm:ss") }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="咨询状态" min-width="60" prop="status">
            <template #default="{ row }">
              <el-tag :type="row.status === '1' ? 'success' : 'warning'" effect="dark">
                {{ row.status === "1" ? "已回复" : "待回复" }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" min-width="60" prop="id">
            <template #default="{ row }">
              <el-button type="primary" @click="handleEdit(row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </div>
    <div class="look">
      <el-dialog center :visible.sync="detailsVisible" width="86%">
        <el-form>
          <div class="look_c">
            <div class="answer fl">
              <h3>咨询问题</h3>
              <el-form-item>{{ details.userDescr }}</el-form-item>
            </div>
            <div class="questions fr">
              <h3>回复问题</h3>
              <el-form-item prop="lawyerDescr">
                <span v-html="details.lawyerDescr"></span>
              </el-form-item>
            </div>
          </div>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="detailsVisible = false">关 闭</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { list } from "@/api/web/lawyer";
import { pageList, add } from "@/api/web/lawyerConsultRecord";

export default {
  name: "flzx",
  data() {
    return {
      listData: [
        {
          uuid: "619b60a49c7ee999a926e805",
          name: "成立辉",
          pic: require("@/assets/img/user/people-1.png"),
          gongling: "工龄：从事律师工作11年",
          dizhi: "北京市盈科（石家庄）律师事务所律师，中共党员、研究生学历，河北经贸大学国际法学硕士，具有法学和计算机双重专业背景",
          ye: "擅长民商事诉讼、招投标、建设工程、企业法律顾问和知识产权法律业务",
          message: "成立辉律师，盈科律师事务所律师，中共党员、研究生学历，河北经贸大学国际法学硕士，具有法学和计算机双重专业背景，从事律师工作11年。",
          detail:
            "服务的客户包括：河北师范大学、石家庄国大集团有限责任公司、中国移动通信集团河北有限公司、河北医科大学第一医院、石家庄洛杉奇食品有限公司、欧派家居集团股份有限公司、四川剑南春酒厂股份有限公司、中国平安保险（集团）股份有限公司等。",
          obtained: "所获荣誉：",
          li: `
          1.盈科律师事务所2019年度优秀律师；<br> <br>
          2.盈科律师事务所2019年法律服务产品大赛华北区优秀奖；<br><br>
          3.2018年度石家庄市优秀律师；<br><br>
          4.2018年度北京市盈科（石家庄）律师事务所优秀合伙人律师；<br><br>
          5.2017年度石家庄市优秀律师；<br><br>
          6.2015年度河北恒利律师事务所优秀律师；<br><br>
          7.2014年度河北恒利律师事务所优秀律师。
          `,
        },
        {
          uuid: "619b60c69c7ee999a926e808",
          name: "封振国",
          pic: require("@/assets/img/user/people-2.png"),
          // gongling:"从事律师工作11年",
          dizhi:
            "毕业于河北经贸大学，法学本科，中华全国律师协会会员，先后执业于河北俱时律师事务所、北京盈科（石家庄）律师事务所，合伙人律师。荣获石家庄市律师协会2019年度、2020年度优秀律师。",
          ye: "擅长建设工程、招投标、刑事辩护、刑事合规。",
          message:
            "封振国律师，毕业于河北经贸大学，法学本科，中华全国律师协会会员，先后执业于河北俱时律师事务所、北京盈科（石家庄）律师事务所，合伙人律师。荣获石家庄市律师协会2019年度、2020年度优秀律师。",
          detail:
            "2005年通过司法考试即进入律师行业，执业期间办理了大量疑难民商事案件。先后为中华书局、人民卫生出版社、华夏银行股份有限公司石家庄分行、平安银行股份有限公司石家庄分行、河北蓝天建筑科技有限公司、河北兄弟伊兰食品科技有限公司等企业提供常年法律顾问或专项法律服务。",
          obtained: "所获荣誉：",
          li: "石家庄市律师协会2019年度、2020年度优秀律师。",
        },
        {
          uuid: "619b60e59c7ee999a926e80b",
          name: "韩兵",
          pic: require("@/assets/img/user/people-3.png"),
          // gongling:"从事律师工作11年",
          dizhi:
            "北京市盈科（石家庄）律师事务所合伙人律师，曾获得河北省优秀律师称号。自2015年起专注于劳动法律的研究与实践工作，并承办了大量的劳动纠纷仲裁与调解案件，积累了丰富的实战经验。",
          ye: "擅长招投标法律服务、刑事辩护、劳动争议纠纷、企业常年法律顾问。",
          message:
            "韩兵律师，北京市盈科（石家庄）律师事务所合伙人律师，曾获得河北省优秀律师称号。自2015年起专注于劳动法律的研究与实践工作，并承办了大量的劳动纠纷仲裁与调解案件，积累了丰富的实战经验",
          detail:
            "曾先后担任河北搜才人力资源有限公司、河北方胜人力资源服务有限公司、河北菲斯克人力资源服务有限公司、河北启航劳动服务有限公司、河北兄弟伊兰食品科技股份有限公司等多家公司的法律顾问，并很好的完成了顾问单位的工作，为企业经营防范了法律风险。",
          li: "",
        },
        {
          uuid: "619b605e9c7ee999a926e802",
          name: "刘凯",
          pic: require("@/assets/img/user/people-4.png"),
          gongling: "从事律师工作13年",
          dizhi: "北京市盈科（石家庄）律师事务所合伙人律师，毕业于河北师范大学法政学院，获法学学士学位。同时具有注册税务师资格。",
          ye: "擅长经济纠纷案件诉讼代理，特别是建设工程相关的民商事案件。",
          message:
            "刘凯律师，北京市盈科（石家庄）律师事务所合伙人律师，从事律师工作13年。毕业于河北师范大学法政学院，获法学学士学位。同时具有注册税务师资格。",
          detail:
            "刘律师自2007年从事律师工作。执业以来，担任多家企业法律顾问，代理了大量民商事案件，最大限度的维护了当事人的合法权益。执业过程中，曾为河北顺丰速递有限公司、中电投石家庄高新热电有限公司等多家企业提供法律培训。",
          li: "",
        },
      ],
      clickItem: {},
      mes: false,
      open: false,
      alert: false,
      lawyer: {},
      form: {
        userDescr: "",
      },
      rules: {
        userDescr: [{ required: true, message: "请输入您的问题", trigger: "blur" }],
      },
      tableData: [],
      total: "",
      queryForm: {
        desc: "created_time",
      },
      details: {},
      detailsVisible: false,
    };
  },
  created() {},
  computed: {
    userInfo() {
      return this.$store.getters["user/user"];
    },
    vip() {
      return this.userInfo.vip;
    },
  },
  methods: {
    // async list() {
    //   const { code, data } = await list();
    //   if (code === 200) {
    //     this.listData = data;
    //   }
    // },
    handleConsult(item) {
      if (this.vip < 2) {
        this.$baseEventBus.$emit("upgrade", true);
        return;
      }
      this.form.userDescr = "";
      this.lawyer = item;
      this.open = true;
    },
    checkInfoDetail(item) {
      this.mes = true;
      this.clickItem = item;
    },
    handleSubmit() {
      const _this = this;
      _this.$refs["form"].validate((valid) => {
        if (valid) {
          _this.$baseConfirm("您确定提交该问题吗？", null, async () => {
            _this.form.userName = _this.userInfo.name;
            _this.form.userAvatar = _this.userInfo.avatar;
            _this.form.status = "0";
            _this.form.lawyerUuid = _this.lawyer.uuid;
            _this.form.lawyerName = _this.lawyer.name;
            _this.form.lawyerAvatar = _this.lawyer.avatar;
            const { msg } = await add(_this.form);
            _this.$baseAlert(msg);
            _this.open = false;
          });
        }
      });
    },
    async handleSelect(item) {
      if (this.vip < 2) {
        this.$baseEventBus.$emit("upgrade", true);
        return;
      }
      this.lawyer = item;
      this.alert = true;
      this.queryForm.userUuid = this.userInfo.uuid;
      this.queryForm.lawyerUuid = this.lawyer.uuid;
      const { code, data } = await pageList(this.queryForm);
      if (code === 200) {
        this.tableData = data.records;
        this.total = data.total;
      }
    },
    handleEdit(item) {
      this.details = item;
      this.detailsVisible = true;
    },
  },
};
</script>

<style lang="less" scoped>
.flzx {
  width: 968px;
  height: 1276px;
  border: 1px solid transparent;
  position: relative;
}

.flzx_c {
  width: 968px;
  height: 1276px;

  ul {
    width: 870px;
    height: 100%;
    margin-left: 35px;

    li {
      width: 100%;
    }

    .introduce {
      width: 100%;
      height: auto;
    }

    .introduce_l {
      width: 255px;
      height: 230px;
      text-align: center;
      margin-bottom: 20px;
      outline: 1px solid rgb(245, 245, 245);

      img {
        width: 100%;
        height: 100%;
      }
    }

    .introduce_r {
      width: 540px;
      height: 250px;
      margin-bottom: 20px;
      font-size: 16px;

      .full {
        width: 100%;
        height: 40px;
        line-height: 40px;
        display: flex;
        justify-content: space-between;
      }

      .con {
        margin-top: 10px;
        height: 200px;
        position: relative;

        .gongling {
          font-size: 14px;
        }

        .dizhi {
          margin-top: 5px;
          text-indent: 2em;
          line-height: 1.5;
        }

        .zhuan {
          margin-top: 5px;
          font-weight: 600;
        }

        .ye {
          margin-top: 5px;
          text-indent: 2em;
          line-height: 1.5;
        }

        .consult {
          width: 160px;
          height: 40px;
          margin: 0 auto;
          margin-top: 40px;
        }
      }
    }

    .detail {
      /deep/ .el-dialog__body {
        text-align: left;
      }
      .title {
        font-size: 19px;
        font-weight: 600;
      }

      .message {
        text-indent: 2em;
        line-height: 1.5;
      }

      .zhuan {
        margin-top: 5px;
        font-weight: 600;
      }

      .ye {
        margin-top: 5px;
        text-indent: 2em;
        line-height: 1.5;
      }

      .experience {
        text-indent: 2em;
        margin-top: 5px;
        line-height: 1.5;
      }

      .honor {
        margin-left: 20px;
        margin-top: 10px;
      }

      .close {
        text-align: center;
        margin-top: 20px;
      }
    }
  }
}

.mask {
  width: 100%;
  height: 1276px;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;

  .relative {
    width: 100%;
    height: 1276px;
    background-image: url("~@/assets/img/user/vague.jpg");
    background-position: center 0;
    background-repeat: no-repeat;
  }
}

.open {
  /deep/ .el-dialog {
    height: 500px;
  }

  /deep/ .el-textarea {
    textarea {
      width: 100%;
      height: 300px !important;
      resize: none;
      overflow: auto;
    }
  }
}

.alert {
  /deep/ .el-dialog {
    max-height: 500px;
    overflow: auto;
  }
}

.look {
  /deep/ .el-dialog {
    height: 600px;
    margin-top: 10vh !important;
    overflow: auto;
  }

  .look_c {
    width: 100%;
    height: 440px;
  }

  .answer,
  .questions {
    width: 48%;
    height: 100%;

    h3 {
      text-align: center;
      font-weight: 700;
    }

    /deep/ .el-form-item {
      height: 96%;
      outline: 1px solid #e0cece;
      overflow: auto;
      margin-top: 10px;
    }
  }

  /deep/ .el-form-item img {
    max-width: 100% !important;
    max-height: 100% !important;
  }
}
</style>
