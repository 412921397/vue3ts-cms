import { createApp } from "vue";
import { globalRegister } from "./global";
import { registerElementIcon } from "./global/icon/index";
import "normalize.css";
import "./assets/css/index.less";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import { setupStore } from "@/store";

const app = createApp(App);
// 按需引入注册element-plus/其他
app.use(globalRegister);
app.use(registerElementIcon);
app.use(store);
/** 页面刷新不丢失stroe数据 */
setupStore();
app.use(router);

app.mount("#app");

// console.log(process.env);
// console.log(process.env.VUE_APP_BASE_URL);
// console.log(process.env.VUE_APP_BASE_NAME);
