<template>
  <div class="breadcrumb">
    <el-breadcrumb separator="/">
      <template v-for="item in breadcrumbs" :key="item.name">
        <el-breadcrumb-item :to="{ path: item.path }">{{ item.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts" setup>
import { withDefaults, defineProps, PropType } from "vue";
import { IBreadcrumb } from "../types";

// export default defineComponent({
//   props: {
//     breadcrumbs: {
//       type: Array as PropType<IBreadcrumb[]>,
//       default: () => []
//     }
//   },
//   setup() {
//     return {};
//   }
// });
const props = withDefaults(
  defineProps<{
    breadcrumbs: PropType<IBreadcrumb[]>;
  }>(),
  {
    breadcrumbs: () => []
  }
);
</script>

<style scoped lang="less"></style>
