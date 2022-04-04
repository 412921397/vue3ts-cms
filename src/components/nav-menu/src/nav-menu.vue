<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="~@/assets/img/logo.svg" alt="" />
      <span v-if="!collapse" class="title">VUE3+TS</span>
    </div>
    <el-menu
      :default-active="defaultValue"
      class="el-menu-vertical"
      :collapse="collapse"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
    >
      <template v-for="item in userMenus" :key="item.id">
        <!-- 二级菜单  -->
        <template v-if="item.type === 1">
          <!-- 二级菜单可展开 -->
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon v-if="item.icon && item.name === '系统总览'">
                <Monitor :class="item.icon" />
              </el-icon>
              <el-icon v-if="item.icon && item.name === '系统管理'">
                <Setting :class="item.icon" />
              </el-icon>
              <el-icon v-if="item.icon && item.name === '商品中心'">
                <Goods :class="item.icon" />
              </el-icon>
              <el-icon v-if="item.icon && item.name === '随便聊聊'">
                <ChatLineRound :class="item.icon" />
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <!-- 遍历里面的item -->
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item :index="subitem.id + ''" @click="handleMenuItemClick(subitem)">
                <el-icon v-if="subitem.icon" :class="subitem.icon"></el-icon>
                <span>{{ subitem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <!-- 一级菜单 -->
        <template v-else-if="item.type === 2">
          <el-menu-item>
            <el-icon v-if="item.icon" :class="item.icon"></el-icon>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults, computed, ref } from "vue";
import { useStore } from "@/store";
import { useRouter, useRoute } from "vue-router";

import { pathMapToMenu } from "@/utils/map-menus";
/** 父组件传值 */
const props = withDefaults(defineProps<{ collapse: boolean }>(), { collapse: false });
/** vuex */
const stroe = useStore();
/** 路由菜单 */
const userMenus = computed(() => stroe.state.login.userMenus);
/** 获取当前路由的路径 */
const router = useRouter();
const route = useRoute();
const currentPath = route.path;

/** 获取当前需要展示的导航 */
const menu = pathMapToMenu(userMenus.value, currentPath);
const defaultValue = ref(menu.id + "");

const handleMenuItemClick = (subitem: any) => {
  // console.log(subitem, "subitem");
  router.push({ path: subitem.url ?? "/not-found" });
};
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #001529;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }

  .el-menu {
    border-right: none;
  }

  // 目录
  .el-submenu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  ::v-deep .el-submenu__title {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
