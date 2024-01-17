<template>
  <div>
    <div class="all">
      <findswiper></findswiper>

      <div class="breadcrumb">
        <img src="~@/assets/img/public/dw.png" alt="" />
        <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height: 23px">
          <el-breadcrumb-item>当前位置</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>行业论坛</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div class="forum">
        <div class="forum_title">
          <div class="tab">
            <span @click="num = 1" :class="{ active: num === 1 }">行业论坛</span>
            <el-divider direction="vertical"></el-divider>
            <span @click="num = 2" :class="{ active: num === 2 }">意见征集</span>
          </div>
          <el-input
            v-if="num === 1"
            placeholder="搜索相关论坛话题"
            suffix-icon="el-icon-search"
            v-model="query.titleLike"
            @keyup.enter.native="handleSearch"
          ></el-input>
          <el-button v-if="num === 1" type="primary" round class="fr" @click="handleSearch"><i class="el-icon-search"></i> 查询 </el-button>
          <el-button v-if="num === 1" type="primary" :disabled="vip < 2" round class="fr" @click="handleAddArticle">
            <i class="el-icon-plus"></i> 新增
          </el-button>
        </div>
        <div class="forum_c" v-show="num === 1">
          <div class="container clearfix">
            <div class="con_l fl">
              <el-skeleton :rows="6" animated :loading="loading">
                <ul v-if="total > 0">
                  <li v-for="(item, index) in articleData" :key="index">
                    <img src="~@/assets/img/hylt/doing.png" class="doing" v-if="item.status === '1'" />
                    <img src="~@/assets/img/hylt/close.png" class="close" v-else />
                    <div class="platform">
                      <!-- 头像 终止 -->
                      <div class="caption">
                        <div>
                          <el-avatar :size="60" :src="item.avatar" class="fl"></el-avatar>
                          <div class="name fl">
                            <p>{{ item.name }}</p>
                            <p>{{ $baseDayjs(item.createdTime).format("YYYY-MM-DD HH:mm:ss") }}</p>
                          </div>
                        </div>
                        <div class="stop">
                          <el-button v-if="item.userUuid === userUuid && item.status === '1'" type="info" round @click="terminate(item)">
                            终止论坛
                          </el-button>
                        </div>
                      </div>

                      <div class="cont clearfix">
                        <!-- title -->
                        <div class="neirong" :style="clidkstyle">
                          <p class="title">{{ item.title }}</p>
                        </div>
                        <div class="pinglun">
                          <div v-if="forumLike(item.uuid)" class="fr" @click="clickLike(item, '-')">
                            <img src="~@/assets/img/hylt/likes.png" alt="" /> <span>{{ item.pq }}</span>
                          </div>
                          <div v-else class="fr" @click="clickLike(item, '+')">
                            <img src="~@/assets/img/hylt/like.png" alt="" /> <span>{{ item.pq }}</span>
                          </div>
                          <div class="fr">
                            <img src="~@/assets/img/hylt/message.png" /> <span>{{ item.rv }}</span>
                          </div>
                        </div>
                        <p
                          @click="
                            box = `height:auto;overflow:auto`;
                            handleReview(item.uuid);
                          "
                          class="show"
                          v-show="overflow"
                          :style="fix"
                          v-if="item.uuid !== uuid"
                        >
                          查看文章内容
                          <i style="color: #5c5c5c" class="el-icon-arrow-down"></i>
                        </p>
                        <p v-else @click="uuid = ''" class="show2">
                          关闭文章内容
                          <i style="color: #5c5c5c" class="el-icon-arrow-up"></i>
                        </p>
                        <div class="box fr" :style="box">
                          <div v-if="item.uuid === uuid && title_show">
                            <p v-html="item.content"></p>
                            <div class="pinglun_list" v-show="item.uuid === uuid && boxshow">
                              <div v-if="item.status === '1'" class="comment">
                                <div class="fl">
                                  <el-avatar :size="40" :src="item.avatar" class=""></el-avatar>
                                </div>
                                <div class="con fl">
                                  <el-input placeholder="发表您的评论" v-model="reviewForm.content"></el-input>
                                </div>
                                <div class="btn fr" @click="handleComment(item)">
                                  <el-button type="warning" round>评论</el-button>
                                </div>
                              </div>
                              <ul v-if="reviewData.length > 0">
                                <li v-for="(item, c_index) in reviewData" :key="c_index" class="one">
                                  <el-avatar :size="40" :src="item.avatar" class="fl"></el-avatar>
                                  <div class="detail fl">
                                    <span v-html="item.name + ':'" class="list_name"></span>
                                    <span v-html="item.content" class="list_content"></span>
                                  </div>
                                  <span class="list_time fr">{{ $baseDayjs(item.createdTime).format("YYYY-MM-DD") }}</span>
                                </li>
                              </ul>
                              <el-empty v-else :image-size="150" description="暂无评论"></el-empty>
                              <div class="fenye">
                                <pagination
                                  :autoScroll="false"
                                  :page.sync="reviewQuery.page"
                                  :limit="reviewQuery.limit"
                                  :total="reviewTotal"
                                  @pagination="reviewPageList(item.uuid)"
                                ></pagination>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
                <ul v-else-if="total === 0">
                  <el-card>
                    <div class="nodate">
                      <div class="nodate_item">
                        <img src="~@/assets/img/public/nodate.jpg" alt="" />
                      </div>
                    </div>
                  </el-card>
                </ul>
              </el-skeleton>
              <div v-if="total > 0" class="fenye">
                <pagination :autoScroll="false" :page.sync="query.page" :limit="query.limit" :total="total" @pagination="pageList"></pagination>
              </div>
              <!--新增文章弹窗-->
              <el-dialog :visible.sync="articleDialog" title="新增论坛文章" width="1200px" center>
                <el-form ref="articleForm" :model="articleForm" :rules="articleRules">
                  <el-form-item title="文章标题" prop="title">
                    <el-input v-model="articleForm.title" placeholder="请输入文章标题" maxlength="300" show-word-limit></el-input>
                  </el-form-item>
                  <el-form-item title="文章内容" prop="title">
                    <tinymce-editor ref="editor" style="padding: 20px 0" v-model="articleForm.content" :height="500"></tinymce-editor>
                  </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="onArticle">确认发布</el-button>
                  <el-button @click="articleDialog = false">取 消</el-button>
                </span>
              </el-dialog>
            </div>

            <!-- 热门论坛排行 -->
            <div class="con_r fr">
              <div class="rank">
                <p>热门论坛排行>></p>
                <ul>
                  <li v-for="(item, index) in articleList" :key="index">
                    <span>{{ index + 1 }} </span>{{ item.title }}
                  </li>
                </ul>
                <!--                <div class="huan">
                  <span>
                    <i class="el-icon-refresh">换一批</i>
                  </span>
                </div>-->
              </div>
            </div>
          </div>
        </div>

        <div class="opinion" v-show="num === 2">
          <el-form ref="form" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="标题" prop="title">
              <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="内容" prop="content">
              <el-input type="textarea" v-model="form.content"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button round type="warning" @click="onSubmit">提交留言</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>

      <login ref="login"></login>
    </div>
  </div>
</template>

<script>
import { validatorPhone, validatorEmail } from "@/utils/validator";
import login from "@/components/login";
import findswiper from "@/components/findswiper";
import pagination from "@/components/pagination/index";
import TinymceEditor from "@/components/tinymce";
import { pageList, updateStatus, add as articleAdd, like, listTop } from "@/api/web/forumArticle";
import { pageList as reviewPageList, add as reviewAdd } from "@/api/web/articleReview";
import { add as messageAdd } from "@/api/web/message";
import { list } from "@/api/web/forumLike";

export default {
  components: {
    findswiper,
    pagination,
    login,
    TinymceEditor,
  },
  data() {
    return {
      loading: false,
      num: 1,
      articleData: [],
      articleList: [],
      reviewData: [],
      uuid: "",
      overflow: true,
      clidkstyle: "",
      box: "",
      fix: "",
      open: true,
      title_show: false,
      boxshow: false,
      total: -1,
      query: {
        page: 1,
        limit: 10,
        desc: "status,id",
      },
      reviewQuery: {
        page: 1,
        limit: 10,
      },
      reviewTotal: 0,
      // 文章
      articleDialog: false,
      articleForm: {},
      articleRules: {
        title: [{ required: true, message: "请输入文章标题", trigger: "blur" }],
        content: [{ required: true, message: "请输入文章内容", trigger: "blur" }],
      },
      articleLike: [],
      // 评论
      reviewForm: {
        content: "",
      },
      // 意见征集

      form: {
        title: "",
        content: "",
        phone: "",
        email: "",
        status: "0",
      },
      rules: {
        title: [{ required: true, message: "请输入您的留言标题", trigger: "blur" }],
        content: [{ required: true, message: "请输入您的留言内容", trigger: "blur" }],
        phone: [{ required: true, validator: validatorPhone, trigger: "blur" }],
        email: [{ required: true, validator: validatorEmail, trigger: "blur" }],
      },
    };
  },
  created() {
    this.pageList();
    this.listTop();
    this.list();
  },
  computed: {
    userInfo() {
      return this.$store.getters["user/user"];
    },
    userUuid() {
      return this.userInfo.uuid;
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
      this.loading = true;
      const { code, data } = await pageList(this.query);
      if (code === 200) {
        this.articleData = data.records;
        this.total = data.total;
      } else {
        this.total = 0;
      }
      this.loading = false;
    },
    async list() {
      const { code, data } = await list();
      if (code === 200) {
        this.articleLike = data.map((item) => item.refUuid);
      }
    },
    forumLike(uuid) {
      return this.articleLike.includes(uuid);
    },
    async listTop() {
      const { code, data } = await listTop();
      if (code === 200) {
        this.articleList = data;
      }
    },
    // 新增文章
    handleAddArticle() {
      //TODO 提示升级会员
      if (this.vip < 2) {
        this.$baseAlert("您当前的会员等级不支持次操作，请您升级VIP服务");
        return;
      }
      if (this.userInfo && this.userInfo.uuid) {
        this.articleDialog = true;
        this.articleForm = {
          userUuid: this.userInfo.uuid,
          name: this.userInfo.name,
          avatar: this.userInfo.avatar,
          status: "1",
        };
      } else {
        this.$refs.login.dialogVisible = true;
      }
    },
    onArticle() {
      this.$refs["articleForm"].validate(async (valid) => {
        if (valid) {
          const { code, msg } = await articleAdd(this.articleForm);
          if (code === 200) {
            this.pageList();
            this.articleDialog = false;
          }
          this.$baseMessage(msg);
        }
      });
    },
    async clickLike(item, status) {
      const { code, msg } = await like({
        status,
        column: "pq",
        refUuid: item.uuid,
      });
      if (code === 200) {
        if ("+" === status) {
          item.pq = item.pq + 1;
          this.articleLike.push(item.uuid);
        } else {
          item.pq = item.pq - 1;
          this.articleLike = this.articleLike.filter((i) => i !== item.uuid);
        }
      } else {
        this.$baseMessage(msg, "warning");
      }
    },
    // 查看评论
    async handleReview(uuid) {
      if (this.uuid !== uuid) {
        this.boxshow = true;
        this.title_show = true;
      } else if (this.uuid === uuid && !this.boxshow && !this.title_show) {
        this.boxshow = true;
        this.title_show = true;
      } else if (this.boxshow && this.title_show) {
        this.boxshow = false;
        this.title_show = false;
      }
      if (!this.reviewQuery.uuid || this.reviewQuery.uuid !== uuid) {
        this.reviewQuery.page = 1;
      }
      this.reviewPageList(uuid);
    },
    async reviewPageList(uuid) {
      this.reviewQuery.articleUuid = uuid;
      const { code, data } = await reviewPageList(this.reviewQuery);
      if (code === 200) {
        this.reviewData = data.records;
        this.reviewTotal = data.total;
        this.uuid = uuid;
      }
    },
    // 评论
    handleComment(item) {
      this.reviewForm.articleUuid = item.uuid;
      this.reviewForm.type = "1";
      this.onReview();
      this.reviewForm.content = "";
    },
    // 提交评论
    async onReview() {
      if (this.reviewForm.content) {
        if (this.userInfo && this.userInfo.uuid) {
          this.reviewForm.userUuid = this.userUuid;
          this.reviewForm.name = this.userInfo.name;
          this.reviewForm.avatar = this.userInfo.avatar;
        } else {
          this.reviewForm.name = "佚名";
        }
        const { code, msg } = await reviewAdd(this.reviewForm);
        if (code === 200) {
          this.uuid = "";
          await this.handleReview(this.reviewForm.articleUuid);
          this.articleData.forEach((item) => {
            if (item.uuid === this.reviewForm.articleUuid) {
              item.rv = item.rv + 1;
            }
          });
          this.$baseMessage(msg, "success");
        }
      } else {
        this.$baseMessage("请输入您的评论", "warning");
      }
    },
    // 终止论坛
    terminate(item) {
      this.$baseConfirm("您确定要终止该论坛吗？终止后不可重新开启！", null, async () => {
        const { code, msg } = await updateStatus({
          uuid: item.uuid,
          status: "0",
        });
        if (code === 200) {
          item.status = "0";
        }
        this.$baseMessage(msg);
      });
    },
    // 提交留言
    onSubmit() {
      this.$refs["form"].validate(async (valid) => {
        if (valid) {
          const { msg } = await messageAdd(this.form);
          this.$baseAlert(msg);
          this.form = {};
        }
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
@import url("~@/assets/css/hylt/hylt.less");
</style>
