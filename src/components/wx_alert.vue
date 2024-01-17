<template>
  <div></div>
</template>

<script>
export default {
  created() {
    localStorage.setItem("wx_status", this.$route.query.status);
    localStorage.setItem("wx_code", this.$route.query.code);
    window.opener = null;
    window.open("about:blank", "_top").close();
  },
};
</script>

<style></style>
