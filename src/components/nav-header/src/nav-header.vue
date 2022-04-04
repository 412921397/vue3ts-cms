<template>
  <div class="nav-header">
    <el-icon class="fold-menu" @click="handleFoldClick">
      <template v-if="isFold">
        <fold />
      </template>
      <template v-else>
        <expand />
      </template>
    </el-icon>
    <div class="content">
      <hy-breadcrumb :breadcrumbs="breadcrumbs" />
      <user-info />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, defineEmits } from "vue";
import userInfo from "./user-info.vue";
import HyBreadcrumb from "@/base-ui/breadcrumb/src/breadcrumb.vue";

import { useStore } from "@/store";
import { useRoute } from "vue-router";
import { pathMapBreadcrumbs } from "@/utils/map-menus";
/** 子传父 */
const emit = defineEmits(["foldChange"]);
/** 面包屑状态 */
const isFold = ref(false);
const handleFoldClick = () => {
  isFold.value = !isFold.value;
  emit("foldChange", isFold.value);
};

const store = useStore();
const breadcrumbs = computed(() => {
  const userMenus = store.state.login.userMenus;
  const route = useRoute();
  const currentPath = route.path;
  return pathMapBreadcrumbs(userMenus, currentPath);
});
</script>

<style scoped lang="less">
.nav-header {
  width: 100%;
  display: flex;
  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }
  .content {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
  }
}
</style>
