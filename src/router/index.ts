import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

import localCache from "@/utils/cache";
import { firstMenu } from "@/utils/map-menus";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/main"
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login/login.vue")
  },
  {
    path: "/main",
    name: "main",
    component: () => import("../views/main/main.vue")
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notFound",
    component: () => import("../views/not-found/not-found.vue")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to) => {
  /** 判断当前路径下是否是已登录 */
  if (to.path !== "/login") {
    const token = localCache.getCache("token");
    if (!token) return "/login";
  }

  // console.log(router.getRoutes());
  // console.log(to); // 即将要跳转的对象

  if (to.path.indexOf("/main") !== -1) {
    if (to.name === "notFound") to.name = "user";
  }

  if (to.path === "/main") {
    return firstMenu.url;
  }
});

export default router;
