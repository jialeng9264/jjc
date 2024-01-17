<template>
  <div class="footer">
    <div class="connect">
      联系我们
      <ul>
        <li>
          <img src="~@/assets/img/footer/tel.png" alt="" />
          <span>电话：173-3119-1677</span>
        </li>
        <!-- <li>
          <img src="~@/assets/img/footer/wxgzh.png" alt="" />
          <span>电话：173-3119-1677</span>
        </li>
        <li>
          <img src="~@/assets/img/footer/yx.png" alt="" />
          <span>电话：173-3119-1677</span>
        </li> -->
      </ul>
    </div>
    <div class="link">
      <div class="link_c">
        <div class="site_link">
          <span>站内链接</span>
          <ul>
            <li v-for="(item, index) in menuLists" :key="index">
              <router-link
                :to="{
                  name: item.link,
                  params: { activeName: 'vip' },
                }"
              >
                {{ item.title }}
              </router-link>
            </li>
          </ul>
        </div>
        <div class="links">
          <span>友情链接</span>
          <ul>
            <li v-for="(item, index) in links" :key="index" @click="handleLink(item)">{{ item.name }}</li>
          </ul>
        </div>
      </div>
      <div class="download_app">
        <p>手机APP下载</p>
        <div class="app_c">
          <div class="app">
            <img src="~@/assets/img/app/android.png" alt="" />
            <span>投标宝盒安卓版</span>
          </div>
          <div class="app">
            <img src="~@/assets/img/app/ios.png" alt="" />
            <span>投标宝盒IOS版</span>
          </div>
        </div>
      </div>
    </div>

    <div class="company_name">
      <span>单位名称：河北巨望电子科技有限公司版权所有</span>
    </div>
    <div class="company">
      <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank">网站cp备案号：冀ICP备2022002572号</a>
    </div>
    <div class="company company2">
      <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=13010402002227">
        <img src="~@/assets/img/footer/jinghui.png" />
        <span>冀公网安备： 13010402002227号</span>
      </a>
    </div>
  </div>
</template>

<script>
import { pageList } from "@/api/cms/link";

export default {
  data() {
    return {
      links: [],
      menuLists: [
        {
          title: "首页",
          link: "home",
        },
        {
          title: "公示公告",
          link: "zbxm",
        },
        {
          title: "资质共享",
          link: "zzgx",
        },
        {
          title: "分包信息",
          link: "fbxx",
        },
        {
          title: "最新资讯",
          link: "zxzx",
        },
        {
          title: "行业论坛",
          link: "hylt",
        },
        {
          title: "加入VIP会员",
          link: "user/index",
        },
      ],
    };
  },
  created() {
    this.pageList();
  },
  methods: {
    pageList() {
      pageList({
        category: "友情链接",
      }).then((res) => {
        this.links = res.data;
      });
    },
    handleLink(item) {
      window.open(item.url, item.open_type);
    },
  },
};
</script>

<style lang="less" scoped>
@import url("~@/assets/css/footer.less");
</style>
