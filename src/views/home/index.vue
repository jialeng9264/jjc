<template>
  <div class="all">
   <div class="service">
      <div class="service_c">
        <ul>
          <li @click="to(index)" v-for="(item, index) in list" :key="index">
            <div class="service_c_img">
              <img :src="item.pic" alt="" />
            </div>
            <div class="serveice_c_tiele">
              <h3>{{ item.service_tit }}</h3>
              <p>{{ item.descr }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- 查 -->
    <div class="find">
      <ul>
        <li v-for="(item, index) in finditem" :key="item.index" :class="currentClass(index)" @click="currentNumber = index">
          <span>{{ item.name }}</span>
        </li>
      </ul>
      <div class="search">
        <img src="~@/assets/img/public/magnifier.png" alt="" />
        <input v-model="searchKey" type="text" placeholder="请输入项目名称、企业名称、项目经理、招标采购意向等信息查询" @keyup.enter="handleSearch" />
        <button class="fr" @click="handleSearch">搜索</button>
      </div>
    </div>

    <!-- 招标项目信息 -->
    <h1 class="zbxmxx">招标采购综合信息</h1>

    <div class="bidding_project">
      <div class="bidding_project_content">
        <div class="gcjs">
          <div class="xinxi">
            <div class="xinxi_title">
              <span class="aft">工程建设</span>
              <span @click="$router.push('/zbxm/zbxm')">更多>></span>
            </div>
            <div class="xinxi_content">
              <div class="title">已立项未公告项目信息</div>
              <div class="con">
                <ul>
                  <li v-for="(item, index) in gcjsXm" :key="index" @click="handleShowXm(item.uuid)">
                    <div class="cont">
                      <p :title="item.title">{{ item.title }}</p>
                      <p>{{ $baseDayjs(item.sprq).format("YYYY-MM-DD") }}</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="gonggao">
            <div class="gonggao_title">
              <span @click="$router.push('/zbxm')">更多>></span>
            </div>
            <div class="gonggao_content">
              <div class="title">已发布招标公告信息</div>
              <el-tabs type="border-card" v-model="gcjsGgActive" @tab-click="gcjsGgTabClick">
                <el-tab-pane v-for="(tab, index) in gcjsGgTab" :key="index" :label="tab" :name="tab">
                  <ul v-show="index === 0">
                    <li v-for="(item, index) in gcjsZbjhgg" :key="index" @click="handleJump('gcZbjhgg', item.uuid)">
                      <img src="~@/assets/img/index/zuixin.png" alt="" />
                      <span class="neirong" :title="item.title">【{{ tab }}】{{ item.title }}</span>
                      <span>{{ $baseDayjs(item.time).format("YYYY-MM-DD") }}</span>
                    </li>
                  </ul>
                  <ul v-show="index === 1">
                    <li v-for="(item, index) in gcjsZbgg" :key="index" @click="handleJump('gcZbgg', item.uuid)">
                      <img src="~@/assets/img/index/zuixin.png" alt="" />
                      <span class="neirong" :title="item.title">【{{ tab }}】{{ item.title }}</span>
                      <span>{{ $baseDayjs(item.time).format("YYYY-MM-DD") }}</span>
                    </li>
                  </ul>
                  <ul v-show="index === 2">
                    <li v-for="(item, index) in gcjsBggg" :key="index" @click="handleJump('gcBggg', item.uuid)">
                      <img src="~@/assets/img/index/zuixin.png" alt="" />
                      <span class="neirong" :title="item.title">【{{ tab }}】{{ item.title }}</span>
                      <span>{{ $baseDayjs(item.time).format("YYYY-MM-DD") }}</span>
                    </li>
                  </ul>
                  <ul v-show="index === 3">
                    <li v-for="(item, index) in gcjsZbhxrgs" :key="index" @click="handleJump('gcZbhxrgs', item.uuid)">
                      <img src="~@/assets/img/index/zuixin.png" alt="" />
                      <span class="neirong" :title="item.title">【{{ tab }}】{{ item.title }}</span>
                      <span>{{ $baseDayjs(item.time).format("YYYY-MM-DD") }}</span>
                    </li>
                  </ul>
                  <ul v-show="index === 4">
                    <li v-for="(item, index) in gcjsZhongbgg" :key="index" @click="handleJump('gcZhongbgg', item.uuid)">
                      <img src="~@/assets/img/index/zuixin.png" alt="" />
                      <span class="neirong" :title="item.title">【{{ tab }}】{{ item.title }}</span>
                      <span>{{ $baseDayjs(item.time).format("YYYY-MM-DD") }}</span>
                    </li>
                  </ul>
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
        </div>

        <div class="gcjs">
          <div class="xinxi">
            <div class="xinxi_title">
              <span class="aft">政府采购</span>
              <span @click="$router.push('/zbxm/zbxm')">更多>></span>
            </div>
            <div class="xinxi_content">
              <div class="title">政府采购意向项目信息</div>
              <div class="con">
                <ul>
                  <li v-for="(item, index) in zfcgXm" :key="index" @click="handleJumpXm('xm', item.uuid)">
                    <div class="cont">
                      <p :title="item.title">{{ item.title }}</p>
                      <p>{{ $baseDayjs(item.time).format("YYYY-MM-DD") }}</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="gonggao">
            <div class="gonggao_title">
              <span @click="$router.push('/zbxm')">更多>></span>
            </div>
            <div class="gonggao_content small">
              <div class="title">已发布政府采购公告信息</div>
              <el-tabs type="border-card" @tab-click="zfcgGgTabClick">
                <el-tab-pane v-for="(tab, index) in zfcgGgTab" :key="index" :label="tab">
                  <ul v-show="index === 0">
                    <li v-for="(item, index) in zfcgZbgg" :key="index" @click="handleJump('zbgg', item.uuid)">
                      <img src="~@/assets/img/index/zuixin.png" alt="" />
                      <span class="neirong" :title="item.title">【{{ tab }}】{{ item.title }}</span>
                      <span class="fr">{{ $baseDayjs(item.time).format("YYYY-MM-DD") }}</span>
                    </li>
                  </ul>
                  <ul v-show="index === 1">
                    <li v-for="(item, index) in zfcgGzgg" :key="index" @click="handleJump('gzgg', item.uuid)">
                      <img src="~@/assets/img/index/zuixin.png" alt="" />
                      <span class="neirong" :title="item.title">【{{ tab }}】{{ item.title }}</span>
                      <span class="fr">{{ $baseDayjs(item.time).format("YYYY-MM-DD") }}</span>
                    </li>
                  </ul>
                  <ul v-show="index === 2">
                    <li v-for="(item, index) in zfcgZhbgg" :key="index" @click="handleJump('zhbgg', item.uuid, item.type)">
                      <img src="~@/assets/img/index/zuixin.png" alt="" />
                      <span class="neirong" :title="item.title">【{{ item.type }}】{{ item.title }}</span>
                      <span class="fr">{{ $baseDayjs(item.time).format("YYYY-MM-DD") }}</span>
                    </li>
                  </ul>
                  <ul v-show="index === 3">
                    <li v-for="(item, index) in zfcgDyly" :key="index" @click="handleJump('dyly', item.uuid)">
                      <img src="~@/assets/img/index/zuixin.png" alt="" />
                      <span class="neirong" :title="item.title">【{{ tab }}】{{ item.title }}</span>
                      <span class="fr">{{ $baseDayjs(item.time).format("YYYY-MM-DD") }}</span>
                    </li>
                  </ul>
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 轮播 -->
    <div class="loop">
      <swiper ref="mySwiper" :options="swiperOption" class="loop_c">
        <swiper-slide v-for="img in adver" :key="img.index">
          <img :src="img.url" alt="" @click="handleLogin" />
        </swiper-slide>
      </swiper>

      <!-- 依法非招标项目 -->
      <!-- <div class="fyfzbxm">
        <h1>依法非招标项目</h1>
        <span class="fr" @click="handleJumpYffzb()">
          更多
          <img src="~@/assets/img/index/more.png" alt="" />
        </span>
      </div>
      <div class="no_bidding_project">
        <div class="no_bidding_project_name">
          <ul>
            <li v-for="(item, index) in fGgTab" :key="index" @click="fGgTabClick(index)" :class="{ active: numm === index }">{{ item }}</li>
          </ul>
        </div>
        <div class="no_bidding_project_content">
          <div v-show="numm === 0" class="zbgg">
            <ul>
              <li v-for="(item, index) in fZbgg" :key="index" @click="handleJump('fZbgg', item.uuid)">
                <img src="~@/assets/img/index/zuixin.png" alt="" />
                <span class="neirong" :title="item.title">【{{ item.type }}】{{ item.title }}</span>
                <span class="fr">{{ $baseDayjs(item.time).format("YYYY-MM-DD") }}</span>
              </li>
            </ul>
          </div>
          <div v-show="numm === 1" class="bggg">
            <ul>
              <li v-for="(item, index) in fBggg" :key="index" @click="handleJump('fBggg', item.uuid)">
                <img src="~@/assets/img/index/zuixin.png" alt="" />
                <span class="neirong" :title="item.title">【{{ item.type }}】{{ item.title }}</span>
                <span class="fr">{{ $baseDayjs(item.time).format("YYYY-MM-DD") }}</span>
              </li>
            </ul>
          </div>
          <div v-show="numm === 2" class="zbhxrgs">
            <ul>
              <li v-for="(item, index) in fZbhxrgs" :key="index" @click="handleJump('fZbhxrgs', item.uuid)">
                <img src="~@/assets/img/index/zuixin.png" alt="" />
                <span class="neirong" :title="item.title">【{{ item.type }}】{{ item.title }}</span>
                <span class="fr">{{ $baseDayjs(item.time).format("YYYY-MM-DD") }}</span>
              </li>
            </ul>
          </div>
          <div v-show="numm === 3" class="zbjggs">
            <ul>
              <li v-for="(item, index) in fZhongbgg" :key="index" @click="handleJump('fZhbgg', item.uuid)">
                <img src="~@/assets/img/index/zuixin.png" alt="" />
                <span class="neirong" :title="item.title">【{{ item.type }}】{{ item.title }}</span>
                <span class="fr">{{ $baseDayjs(item.time).format("YYYY-MM-DD") }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div> -->
    </div>

    <!-- 分包信息 -->
    <div class="fbxx">
      <div class="fbxx_title">
        <h1>分包信息（总承包单位自行发布，风险自担）</h1>
      </div>
      <div class="fbxx_content">
        <ul>
          <li v-for="(item, index) in subcontract" :key="index" @click="handleJump('fbxx', item.uuid)">
            <div class="fbxx_content_c">
              <!--              <span class="fbxx_content_c_t">【{{ item.category }}】</span>-->
              <span :title="item.title">{{ item.title }}</span>
            </div>
            <div class="fbxx_content_time fr">
              <span>{{ $baseDayjs(item.time).format("YYYY-MM-DD") }}</span>
            </div>
            <img src="~@/assets/img/index/big_hot.png" alt="" />
          </li>
        </ul>
      </div>
      <div class="see_more" @click="$router.push('/fbxx')">
        查看更多信息
        <img src="~@/assets/img/index/more_white.png" alt="" />
      </div>
    </div>

    <!-- 资质共享 -->
    <div class="zzgx">
      <div class="zzgx_c">
        <h1>法律服务</h1>
        <img src="@/assets/img/index/zixun.jpg" @click="flzx" class="flzx" />
        <div class="give">
          <h1>资质共享</h1>
          <div class="hqzzxq">
            <img src="~@/assets/img/index/tel.png" alt="" />
            173-3119-1677 获取资质详情
          </div>
        </div>
        <vue-seamless-scroll
          :data="qualification"
          :class-option="{
            direction: 3,
            limitMoveNum: 4,
          }"
          class="seamless-warp2"
        >
          <ul class="item">
            <li v-for="(item, index) in qualification" :key="index">
              <img src="~@/assets/img/index/zztp.jpg" :onerror="onerrorZz" alt="" />
              <p>{{ item.name }}</p>
            </li>
          </ul>
        </vue-seamless-scroll>
      </div>
    </div>

    <!-- 中标课堂/范文下载 -->
    <div class="zb">
      <div class="zb_c">
        <!-- 视频 -->
        <div class="video">
          <div class="title">
            <span class="aft">中标课堂</span>
            <!-- <span @click="video_more">更多>></span> -->
          </div>
          <div class="video_c">
            <img src="~@/assets/img/index/please_wait.jpg" alt="" />
          </div>
          <!-- <div class="video_c" v-if="zbktList.length">
            <swiper ref="mySwiper" :options="swiperOptions">
              <swiper-slide v-for="(item, index) in zbktList" :key="index">
                <div class="video">
                  <video :src="$baseUrl + item.fileUrl" controls ref="movie"></video>
                  <span class="video_name">{{ item.title }}</span>
                </div>
              </swiper-slide>
              <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
          </div> -->
        </div>
        <!-- 文件 -->
        <div class="file">
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

    <!-- 投标服务 -->
    <div class="tbfw">
      <h1>投标服务</h1>
      <div class="yellow" @click="$router.push('/bszz')">
        <img src="~@/assets/img/banner/loop-3.jpg" alt="" />
      </div>
    </div>

    <!-- 最新行业资讯法规 -->
    <div class="zxhyzxfg">
      <div class="zxhyzxfg_c clearfix">
        <h1>最新行业资讯法规</h1>
        <div class="regulations">
          <div class="regulations_l fl">
            <ul>
              <li v-for="(item, index) in newsInfo.slice(0, 2)" :key="index" @click="handleJumpNews('news', item.uuid)">
                <el-image :src="item.img">
                  <div slot="error" class="image-slot">
                    <img v-show="index == 0" src="~@/assets/img/index/regulations_img.jpg" alt="" />
                    <img v-show="index == 1" src="~@/assets/img/index/regulations_img2.jpg" alt="" />
                  </div>
                </el-image>

                <div class="regulations_l_c" :title="item.title">{{ item.title }}</div>
                <span> {{ item.source }} {{ $baseDayjs(item.publishTime).format("YYYY-MM-DD") }}</span>
                <span class="regulations_l_top">{{ $baseDayjs(item.publishTime).format("MM/DD") }}</span>
              </li>
            </ul>
          </div>
          <div class="regulations_r fr">
            <ul>
              <li v-for="(item, index) in newsInfo.slice(2)" :key="index" @click="handleJumpNews('news', item.uuid)">
                <span>
                  <div class="regulations_r_time">{{ $baseDayjs(item.publishTime).format("YYYY-MM-DD") }}</div>
                  <div class="regulations_r_c fr beyond_eip" :title="item.title">{{ item.title }}</div>
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div class="more_qualification" @click="$router.push('/zxzx')">
          更多行业资讯法规
          <img src="~@/assets/img/index/more_white.png" alt="" />
        </div>
      </div>
    </div>

    <!-- VIP会员服务范围 -->
    <h1 style="text-align:center">VIP会员服务范围</h1>
    <div class="top">

      <div class="top_c">
        <ul>
          <li v-for="(item, index) in list" :key="index" @mouseenter="enterFun(index)" @mouseleave="leaveFun(index)">
            <img :src="item.img" alt="" />
            <p>{{ item.tit }}</p>
            <div class="hid" v-show="show && leav == index">
              <div class="hid_t">
                <div class="cont">{{ item.descr }}</div>
                <button @click="to(index)">{{ item.btn }}</button>
              </div>
              <div class="hid_b">
                {{ item.entitle }}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <gcXmInfo ref="gcXmInfo"></gcXmInfo>
    <!-- <cgXmInfo ref="cgXmInfo"></cgXmInfo> -->
    <login ref="login"></login>

    <!-- <div class="container" v-show="isShow">
      <div class="picture">
        <i class="el-icon-circle-close" @click="close"></i>
        <img src="~@/assets/img/index/loop.png" alt="" @click="$router.push('/anon/login')" />
      </div>
    </div> -->
    <div class="containers" v-show="isShow">
      <div class="picture">
        <i class="el-icon-circle-close" @click="close"></i>
        <img src="~@/assets/img/index/loop2.png" alt="" @click="$router.push('/anon/login')" />
      </div>
    </div>
    <!-- <div v-if="open" class="container_lottery" v-show="isShow_lottery">
      <div class="picture">
        <i class="el-icon-circle-close close_lottery" @click="close_lottery"></i>
        <p class="p p1">迎国庆</p>
        <p class="p p2">幸运大抽奖啦</p>
        <p class="p p3">参与就有机会中奖哦！</p>
        <div class="btn" @click="lottery">
          <span>我要参与</span>
          <i class="el-icon-thumb"></i>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import "swiper/swiper-bundle.css";
import VueSeamlessScroll from "vue-seamless-scroll";
import gcXmInfo from "@/views/common/gcXmInfo";
// import cgXmInfo from "@/views/common/cgXmInfo";
import login from "@/components/login";
// 政府采购
import { pageList as xmPageList } from "@/api/zfcg/xm";
import { pageList as zbggPageList } from "@/api/zfcg/zbgg";
import { pageList as gzggPageList } from "@/api/zfcg/gzgg";
import { pageList as zhbggPageList } from "@/api/zfcg/zhbgg";
import { pageList as dylyPageList } from "@/api/zfcg/dyly";
// 建设工程
import { pageList as gcXmPageList } from "@/api/gcjs/xm";
import { pageList as gcZbggPageList } from "@/api/gcjs/zbgg";
import { pageList as gcZbjhggPageList } from "@/api/gcjs/zbjhgg";
import { pageList as gcBgggPageList } from "@/api/gcjs/bggg";
import { pageList as gcZbhxrgsPageList } from "@/api/gcjs/zbhxrgs";
import { pageList as gcZhongbggPageList } from "@/api/gcjs/zhongbgg";
// 依法非招标
import { pageList as fZbggPageList } from "@/api/f/zbgg";
import { pageList as fBgggPageList } from "@/api/f/bggg";
import { pageList as fZbhxrgsPageList } from "@/api/f/zbhxrgs";
import { pageList as fZhbggPageList } from "@/api/f/zhongbgg";
// 分包信息
import { pageList as scPageList } from "@/api/user/subcontract";
// 资质信息
import { listHome as qualiPageList } from "@/api/user/org";
import axios from "axios";
// 新闻信息
import { pageList as newsPageList } from "@/api/cms/news";
import { pageList as linkPageList } from "@/api/cms/link";
import { pageList as downPageList } from "@/api/cms/download.js";

export default {
  components: { gcXmInfo, login, VueSeamlessScroll },
  data() {
    return {
      list: [
        {
          img: require("@/assets/img/index/top01.png"),
          tit: "实时推送行业公告消息",
          entitle: "实时推送\n行业公告消息",
          btn: "推送设置",
          service_tit: "1.实时推送行业公告消息",
          pic: require("@/assets/img/index/fw1.png"),
          descr: "个性化项目定制，立项/招标采购意向项目、已发公告项目，在线查看实时推送项目信息",
        },
        {
          img: require("@/assets/img/index/top05.png"),
          tit: "精准查询",
          entitle: "精准查询",
          btn: "查询公告",
          service_tit: "2.精准查询",
          pic: require("@/assets/img/index/fw5.png"),
          descr: "精准查询采购意向、招标公告、项目经理、企业业绩、企业信用和行政处罚等",
        },
        {
          img: require("@/assets/img/index/top03.png"),
          tit: "标书检查及清标服务",
          entitle: "标书检查及清标服务",
          btn: "联系我们",
          service_tit: "3.标书检查及清标服务",
          pic: require("@/assets/img/index/fw3.png"),
          descr: "检查电子标书签章数、签字数，避免错签漏签问题，针对电子标书多项、漏项、不平衡报价、雷同性等情况分析，投标路上为您保驾护航",
        },
        {
          img: require("@/assets/img/index/top02.png"),
          tit: "投标文件范文下载 \n 专业制作各类标书",
          entitle: "投标文件范文下载 \n 专业制作各类标书",
          btn: "标书制作/范文下载",
          service_tit: "4.投标文件范文下载 \n 专业制作各类标书",
          pic: require("@/assets/img/index/fw2.png"),
          descr: "提供各类投标文件范文下载，各类标书咨询，一对一服务、价格优、服务好、拒绝废标、助您一次就中标！",
        },
        {
          img: require("@/assets/img/index/top06.png"),
          tit: "法律咨询服务",
          entitle: "法律咨询服务",
          btn: "法律咨询",
          service_tit: "5.法律咨询服务",
          pic: require("@/assets/img/index/fw6.png"),
          descr: "可在线咨询，提供专业团队、经验丰富、高效服务、让您更放心",
        },

        {
          img: require("@/assets/img/index/top07.png"),
          tit: "造价咨询服务",
          entitle: "造价咨询服务",
          btn: "联系我们",
          service_tit: "6.造价咨询服务",
          pic: require("@/assets/img/index/fw7.png"),
          descr: "提供投标工程量清单咨询、编制和审核等优质服务",
        },
        {
          img: require("@/assets/img/index/top08.png"),
          tit: "资质共享服务",
          entitle: "资质共享服务",
          btn: "资质共享",
          service_tit: "7.资质共享服务",
          pic: require("@/assets/img/index/fw8.png"),
          descr: "提供安全可靠全方面资质共享窗口，可共享本企业资质和查询相关企业资质，让您投标不在为找不到资质而发愁",
        },
        {
          img: require("@/assets/img/index/top09.png"),
          tit: "电子保函/CA办理优惠",
          entitle: "电子保函/CA办理优惠",
          btn: "联系我们",
          service_tit: "8.电子保函/CA办理优惠",
          pic: require("@/assets/img/index/fw9.png"),
          descr: "加入会员办理CA、保函业务，可享受*折优惠",
        },
        {
          img: require("@/assets/img/index/top10.png"),
          tit: "各类建设工程资质办理",
          entitle: "各类建设工程资质办理",
          btn: "联系我们",
          service_tit: "9.办理各类建设工程资质",
          pic: require("@/assets/img/index/fw10.png"),
          descr: "协助办理各类建设工程企业资质，人员证书，建造师，造价师，协助办理各类中高级职称证书，“八大员”证书",
        },
        {
          img: require("@/assets/img/index/top04.png"),
          tit: "业内咨询讨论",
          entitle: "业内咨询讨论",
          btn: "进入论坛",
          service_tit: "10.业内咨询讨论",
          pic: require("@/assets/img/index/fw4.png"),
          descr: "提供免费服务，针对行业疑问集思广益，共同探讨，为您排忧解难",
        },
      ],
      show: false,
      leav: 0,
      // 轮播
      pics: [],
      // 首页轮播配置
      swiperOption: {
        loop: true,
        loopFillGroupWithBlank: true,
        autoplay: true,
      },
      // 中标课堂轮播配置
      swiperOptions: {
        loop: true,
        loopFillGroupWithBlank: true,
        autoplay: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true, //允许分页点击跳转
        },
      },
      currentNumber: 0,
      // 查找item名称
      finditem: [{ name: "查公告" }, { name: "查项目经理" }, { name: "查企业" }, { name: "查招标采购意向" }],
      searchKey: "",
      // 广告位
      adver: [
        {
          url: require("@/assets/img/banner/loop-1.jpg"),
          link: "/zhaobiaoxiangmu",
        },
        {
          url: require("@/assets/img/banner/loop-2.jpg"),
          link: "/ziyuangongxiang",
        },
      ],
      // 依法非招标项目下标
      numm: 0,
      // 招标项目政府采购信息数据
      zfcgGgTab: ["采购/资格预审公告", "更正公告", "中标(成交)结果公告", "单一来源"],
      zfcgXm: [],
      zfcgZbgg: [],
      zfcgGzgg: [],
      zfcgZhbgg: [],
      zfcgDyly: [],
      // 招标项目建设工程信息数据
      gcjsGgActive: '招标公告',
      gcjsGgTab: ["计划公告", "招标公告", "变更公告", "候选人公示", "中标公告"],
      gcjsXm: [],
      gcjsZbgg: [],
      gcjsBggg: [],
      gcjsZbhxrgs: [],
      gcjsZhongbgg: [],
      gcjsZbjhgg: [],
      // 依法非招标信息数据
      fGgTab: ["招标公告", "变更公告", "中标候选人公示", "中标结果公告"],
      fZbgg: [],
      fBggg: [],
      fZbhxrgs: [],
      fZhongbgg: [],
      // 分包信息
      subcontract: [],
      // 资质信息
      qualification: [],
      // 信息
      newsInfo: [],
      isShow: false,
      isShow_lottery: false,
      onerrorZz: "this.src='" + require("../../assets/img/index/zztp.jpg") + "'",
      // 中标课堂
      zbktList: [],
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
    };
  },
  created() {
    const showBanner = sessionStorage.getItem("showBanner");
    if (!showBanner && !this.accessToken) {
      this.isShow = true;
      // this.isShow_lottery = true;
      sessionStorage.setItem("showBanner", "1");
    }
    // if (!showBanner) {
    //   this.isShow_lottery = true;
    //   sessionStorage.setItem("showBanner", "1");
    // }
    this.picsList();
    this.xmPageList();
    this.zbggPageList();
    this.gcXmPageList();
    this.gcZbggPageList();
    // this.fZbggPageList();
    this.scPageList();
    this.qualiPageList();
    this.newsPageList();
    this.newslinkPage();
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
    accessToken() {
      return this.$store.getters["user/accessToken"];
    },
    open() {
      return this.$baseDayjs(new Date()).format("YYYY-MM-DD") < "2022-10-08";
    },
  },
  methods: {
    to(index) {
      if (!this.accessToken) {
        this.$refs.login.dialogVisible = true;
        return;
      }
      switch (index) {
        case 0:
          this.$router.push({ name: "user/index", params: { activeName: "tssz" } });
          break;
        case 1:
          this.$router.push({ name: "common/find_bulletin" });
          break;
        case 4:
          this.$router.push({ name: "user/index", params: { activeName: "flzx" } });
          break;
        case 6:
          this.$router.push("/zzgx");
          break;
        case 3:
          this.$router.push("/bszz");
          break;
        case 9:
          this.$router.push("/hylt");
          break;
        case 2:
        case 5:
        case 7:
        case 8:
          this.$baseEventBus.$emit("lianxi", true);
          break;
      }
    },
    enterFun(index) {
      this.show = true;
      this.leav = index;
    },
    leaveFun(index) {
      this.show = false;
      this.leav = index;
    },
    flzx() {
      if (!this.accessToken) {
        this.$refs.login.dialogVisible = true;
      } else {
        this.$router.push({ name: "user/index", params: { activeName: "flzx" } });
      }
    },
    handleSearch() {
      if (this.accessToken) {
        sessionStorage.setItem("searchKey", this.searchKey);
        let routeData;
        switch (this.currentNumber) {
          case 0:
            routeData = this.$router.resolve({
              path: "/common/find_bulletin",
            });
            break;
          case 1:
            routeData = this.$router.resolve({
              path: "/common/find_manager",
            });
            break;
          case 2:
            routeData = this.$router.resolve({
              path: "/common/find_performance",
            });
            break;
          case 3:
            routeData = this.$router.resolve({
              path: "/common/find_intention",
            });
            break;
        }
        window.open(routeData.href, "_blank");
      } else {
        this.$refs.login.dialogVisible = true;
      }
    },
    currentClass(index) {
      return [this.currentNumber === index ? "blue" : ""];
    },
    close() {
      this.isShow = false;
    },
    close_lottery() {
      this.isShow_lottery = false;
    },
    lottery() {
      if (!this.accessToken) {
        this.$router.push("/anon/login");
      } else {
        this.$router.push("/anon/lottery");
        this.isShow_lottery = false;
      }
    },
    // 政府采购公告切换
    zfcgGgTabClick(tab) {
      const index = tab.index;
      switch (index) {
        case "0":
          this.zbggPageList();
          break;
        case "1":
          this.gzggPageList();
          break;
        case "2":
          this.zhbggPageList();
          break;
        case "3":
          this.dylyPageList();
          break;
      }
    },
    // 工程建设公告切换
    gcjsGgTabClick(tab) {
      const index = tab.index;
      switch (index) {
        case "0":
          this.gcZbjhggPageList();
          break;
        case "1":
          this.gcZbggPageList();
          break;
        case "2":
          this.gcBgggPageList();
          break;
        case "3":
          this.gcZbhxrgsPageList();
          break;
        case "4":
          this.gcZhongbggPageList();
          break;
      }
    },
    // 依法非招标公告切换
    fGgTabClick(index) {
      this.numm = index;
      switch (index) {
        case 0:
          this.fZbggPageList();
          break;
        case 1:
          this.fBgggPageList();
          break;
        case 2:
          this.fZbhxrgsPageList();
          break;
        case 3:
          this.fZhbggPageList();
          break;
      }
    },
    handleJumpYffzb() {
      const routeData = this.$router.resolve({
        path: "/zbxm/yffzb",
      });
      window.open(routeData.href, "_blank");
    },
    // 政府采购项目意向
    async xmPageList() {
      const { code, data } = await xmPageList({
        limit: 8,
      });
      if (code === 200) {
        this.zfcgXm = data.records;
      }
    },
    // 政府采购招标公告列表
    async zbggPageList() {
      const { code, data } = await zbggPageList({
        limit: 8,
      });
      if (code === 200) {
        this.zfcgZbgg = data.records;
      }
    },
    // 政府采购更正公告列表
    async gzggPageList() {
      const { code, data } = await gzggPageList({
        limit: 8,
      });
      if (code === 200) {
        this.zfcgGzgg = data.records;
      }
    },
    // 政府采购中标公告列表
    async zhbggPageList() {
      const { code, data } = await zhbggPageList({
        limit: 8,
      });
      if (code === 200) {
        this.zfcgZhbgg = data.records;
      }
    },
    // 政府采购单一来源列表
    async dylyPageList() {
      const { code, data } = await dylyPageList({
        limit: 8,
      });
      if (code === 200) {
        this.zfcgDyly = data.records;
      }
    },
    // 建设工程项目意向
    async gcXmPageList() {
      const { code, data } = await gcXmPageList({
        limit: 8,
      });
      if (code === 200) {
        this.gcjsXm = data.records;
      }
    },
    // 建设工程招标公告
    async gcZbggPageList() {
      const { code, data } = await gcZbggPageList({
        limit: 8,
      });
      if (code === 200) {
        this.gcjsZbgg = data.records;
      }
    },
    // 建设工程招标计划公告
    async gcZbjhggPageList() {
      const { code, data } = await gcZbjhggPageList({
        limit: 8,
      });
      if (code === 200) {
        this.gcjsZbjhgg = data.records;
      }
    },
    // 建设工程变更公告
    async gcBgggPageList() {
      const { code, data } = await gcBgggPageList({
        limit: 8,
      });
      if (code === 200) {
        this.gcjsBggg = data.records;
      }
    },
    // 建设工程中标候选人公示
    async gcZbhxrgsPageList() {
      const { code, data } = await gcZbhxrgsPageList({
        limit: 8,
      });
      if (code === 200) {
        this.gcjsZbhxrgs = data.records;
      }
    },
    // 建设工程中标公告
    async gcZhongbggPageList() {
      const { code, data } = await gcZhongbggPageList({
        limit: 8,
      });
      if (code === 200) {
        this.gcjsZhongbgg = data.records;
      }
    },
    // 依法非招标招标公告
    async fZbggPageList() {
      const { code, data } = await fZbggPageList({
        limit: 10,
      });
      if (code === 200) {
        this.fZbgg = data.records;
      }
    },
    // 依法非招标变更公告
    async fBgggPageList() {
      const { code, data } = await fBgggPageList({
        limit: 10,
      });
      if (code === 200) {
        this.fBggg = data.records;
      }
    },
    // 依法非招标中标候选人公示
    async fZbhxrgsPageList() {
      const { code, data } = await fZbhxrgsPageList({
        limit: 10,
      });
      if (code === 200) {
        this.fZbhxrgs = data.records;
      }
    },
    // 依法非招标中标公告
    async fZhbggPageList() {
      const { code, data } = await fZhbggPageList({
        limit: 10,
      });
      if (code === 200) {
        this.fZhongbgg = data.records;
      }
    },
    // 分包信息列表
    async scPageList() {
      const { code, data } = await scPageList({
        limit: 6,
        desc: "time",
        status: "1",
      });
      if (code === 200) {
        this.subcontract = data.records;
      }
    },
    // 资质信息列表
    async qualiPageList() {
      const { code, data } = await qualiPageList({
        limit: 10,
        desc: "id",
        noList: 0,
      });
      if (code === 200) {
        this.qualification = data.records;
      }
    },
    // 新闻信息列表
    async newsPageList() {
      const { code, data } = await newsPageList({
        limit: 7,
        colSymIn: "最新资讯,行业法规",
        desc: "publish_time",
      });
      if (code === 200) {
        this.newsInfo = data.records;
      }
    },
    async newslinkPage() {
      const { code, data } = await downPageList({
        limit: 2,
        colSymIn: "ZBKT",
        desc: "id",
      });
      if (code === 200) {
        this.zbktList = data.records;
      }
    },
    // 首页轮播
    async picsList() {
      const { code, data } = await linkPageList({
        category: "首页轮播",
      });
      if (code === 200) {
        this.pics = data;
      }
    },
    handleJump(type, uuid, category) {
      if (category === "废标公告") {
        type = "fbgg";
      }
      if (this.accessToken) {
        const routeData = this.$router.resolve({
          path: "/common/ggInfo",
          query: { type, uuid },
        });
        window.open(routeData.href, "_blank");
      } else {
        this.$refs.login.dialogVisible = true;
      }
    },
    handleJumpXm(type, uuid) {
      if (this.accessToken) {
        const routeData = this.$router.resolve({
          path: "/common/xmInfo",
          query: { type, uuid },
        });
        window.open(routeData.href, "_blank");
      } else {
        this.$refs.login.dialogVisible = true;
      }
    },
    handleJumpNews(type, uuid) {
      if (this.accessToken) {
        const routeData = this.$router.resolve({
          path: "/anon/info",
          query: { type, uuid },
        });
        window.open(routeData.href, "_blank");
      } else {
        this.$refs.login.dialogVisible = true;
      }
    },
    // 显示工程项目信息
    handleShowXm(uuid) {
      if (this.accessToken) {
        this.$refs.gcXmInfo.uuid = uuid;
        this.$refs.gcXmInfo.dialogShow = true;
      } else {
        this.$refs.login.dialogVisible = true;
      }
    },
    handleLogin() {
      if (!this.accessToken) {
        this.$refs.login.dialogVisible = true;
      }
    },
    video_more() {
      this.$router.push({ name: "winning", params: { num: 0 } });
    },
    clickService(index) {
      if (!this.accessToken) {
        this.$refs.login.dialogVisible = true;
        return;
      }
      let url = "";
      let query = {};
      switch (index) {
        case 1: // 行业推送
          this.$router.push({ name: "user/index", params: { activeName: "tssz" } });
          break;
        case 2: // 标识检查及清标
          this.$baseEventBus.$emit("lianxi", true);
          break;
        case 3: //精准查询
          this.$baseEventBus.$emit("lianxi", true);
          // this.$router.push({ name: "user/index", params: { activeName: "vip" } });
          break;
        case 4: // 标书制作
          url = "bszz";
          break;
        case 5: // 法律咨询
          this.$router.push({ name: "user/index", params: { activeName: "flzx" } });
          break;
        case 6: //造价服务
          this.$baseEventBus.$emit("lianxi", true);
          break;
        case 7: // 资质共享
          url = "zzgx";
          break;
        case 8: // 保函/ca
          this.$baseEventBus.$emit("lianxi", true);
          break;
        case 9:
          this.$baseEventBus.$emit("lianxi", true);
          break;
        case 10:
          url = "hylt";
          break;
      }
      if (url) {
        const routeData = this.$router.resolve({
          path: url,
          query: query,
        });
        window.open(routeData.href, "_blank");
      }
    },
    connect() {
      this.$baseEventBus.$emit("connect", true);
    },
  },
  watch: {
    $route(val) {
      this.pics.map((item, index) => {
        if (val.path.indexOf(item.link) !== -1) {
          this.activeIndex = index;
        }
      });
    },
  },
  mounted() {
    window.addEventListener("scroll", this.scrollToTop);
    // var that = this;
    // setTimeout(() => {
    //   if (this.zbktList.length <= 1) {
    //     that.swiperOptions.loop = false;
    //     that.swiperOptions.autoplay = false;
    //     that.$refs.mySwiper.swiper.autoplay.stop();
    //   }
    //   const movie = that.$refs.movie;
    //   for (var index = 0; index < movie.length; index++) {
    //     movie[index].addEventListener("play", () => {
    //       that.swiperOptions.loop = false;
    //       that.swiperOptions.autoplay = false;
    //       that.$refs.mySwiper.swiper.autoplay.stop();
    //     });
    //     movie[index].addEventListener("pause", () => {
    //       that.swiperOptions.loop = true;
    //       that.swiperOptions.autoplay = true;
    //       that.$refs.mySwiper.swiper.autoplay.start();
    //     });
    //     movie[index].addEventListener("ended", () => {
    //       that.swiperOptions.loop = true;
    //       that.swiperOptions.autoplay = true;
    //       that.$refs.mySwiper.swiper.autoplay.start();
    //     });
    //   }
    // }, 2000);
  },
};
</script>

<style lang="less" scoped>
@import url("~@/assets/css/index/index.less");

/deep/ .el-tabs__item {
  padding: 0 14px;
}
</style>
