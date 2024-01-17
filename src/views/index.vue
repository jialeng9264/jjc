<template>
  <div id="app">
    <!-- <v-header></v-header> -->
    <router-view></router-view>
    <!-- <fix></fix>
    <join></join> -->
    <!-- <v-footer></v-footer> -->
    <!-- <upgrade></upgrade>
    <out></out>
    <lianxi></lianxi>
    <miniChat></miniChat>
    <connect></connect>
    <fixLeft></fixLeft>
    <dragon></dragon> -->
  </div>
</template>

<script>
import header from "@/components/header";
import footer from "@/components/footer";
//import { treeList } from "@/api/common/dict";
import fix from "@/components/fix";
import join from "@/components/join";
import upgrade from "@/components/upgrade";
import out from "@/components/out";
import lianxi from "@/components/lianxi";
import miniChat from "@/components/miniChat";
import connect from "@/components/connect";
import fixLeft from "@/components/fix_left";
import dragon from "@/components/dragon";

export default {
  name: "App",
  components: {
    // "v-header": header,
    // "v-footer": footer,
    // fix,
    // join,
    // upgrade,
    // out,
    // lianxi,
    // miniChat,
    // connect,
    // fixLeft,
    // dragon
  },

};
</script>
<style></style>
