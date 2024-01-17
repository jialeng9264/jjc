/* 公共引入,勿随意修改,修改时需经过确认 */
import Vue from "vue";
import "default-passive-events";
import "normalize.css/normalize.css";
import "@/styles/index.scss";
import "./element";
//import "./support";
import "@/router/permission";
import "./f12";
import jinyu from "@/utils/jinyu";
import "./common";
import "./swiper";

Vue.use(jinyu);
