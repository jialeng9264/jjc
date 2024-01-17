<template>
  <div>
    <transition>
      <div class="join" v-show="isShut">
        <i class="el-icon-circle-close" @click="shut"></i>
        <img src="~@/assets/img/index/join.png" alt="" @click="clickImg" />
      </div>
    </transition>

    <div class="go_vip" v-show="!isShut">
      <img src="~@/assets/img/index/go_vip.png" alt="" @click="shut" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShut: true,
    };
  },
  created() {
    if (this.accessToken) {
      const isShut = sessionStorage.getItem("isShut");
      if (isShut) {
        this.isShut = isShut === "true";
      } else {
        this.isShut = true;
      }
    } else {
      this.isShut = true;
    }
  },
  computed: {
    accessToken() {
      return this.$store.getters["user/accessToken"];
    },
    user() {
      return this.$store.getters["user/user"];
    },
  },
  methods: {
    shut() {
      this.isShut = !this.isShut;
      sessionStorage.setItem("isShut", this.isShut);
    },
    clickImg() {
      if (!this.accessToken) {
        this.$router.push("/anon/login");
      } else if (this.user.vip != 3) {
        this.$router.push("/member");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.join {
  width: 100%;
  height: 110px;
  position: fixed;
  bottom: 0;
  z-index: 32;
  font-size: 35px;
  cursor: pointer;
  i {
    color: #fff;
    position: absolute;
    right: 3%;
    top: 35%;
  }
  img {
    width: 100%;
    height: 100%;
  }
}

.go_vip {
  position: fixed;
  bottom: 0px;
  left: 5px;
  z-index: 42;
  cursor: pointer;
  img {
    width: 170px;
  }
}
.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translateZ(100%);
}
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}
</style>
