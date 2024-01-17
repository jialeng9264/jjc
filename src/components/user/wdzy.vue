<template>
  <div>
    <div class="wdzy">
      <div class="wdzy_c">
        <div class="title">
          <ul>
            <li v-for="(item, index) in tabs" :key="index" @click="activeName = item.name" :class="{ active: activeName === item.name }">
              {{ item.label }}
            </li>
          </ul>
        </div>
        <div class="con">
          <div class="con_c" v-for="(item, index) in tabs" :key="index">
            <keep-alive>
              <component v-if="item.name === activeName" :is="item.component" :name="item.name"></component>
            </keep-alive>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const wdgz = () => import("@/components/user/wdgz");
const wdsc = () => import("@/components/user/wdsc");
const lljl = () => import("@/components/user/lljl");
export default {
  data() {
    return {
      activeName: "wdgz",
      tabs: [
        {
          label: "我的关注",
          name: "wdgz",
          component: wdgz,
        },
        {
          label: "我的收藏",
          name: "wdsc",
          component: wdsc,
        },
        {
          label: "浏览记录",
          name: "lljl",
          component: lljl,
        },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.wdzy {
  background-color: rgb(245, 245, 245);
  border: 1px solid transparent;
}
.title {
  width: 100%;
  height: 68px;
  background-color: #fff;
  ul {
    width: 310px;
    height: 100%;
    margin-left: 60px;
    display: flex;
    justify-content: space-between;
    li {
      width: 73px;
      height: 68px;
      font-size: 17px;
      text-align: center;
      line-height: 68px;
      cursor: pointer;
      color: rgb(97, 97, 97);
    }
    .active {
      color: #409eff;
      border-bottom: 2px solid rgb(66, 158, 255);
    }
  }
}
.con {
  margin-top: 10px;
  padding: 15px 20px 30px;
  background-color: #fff;
}
</style>