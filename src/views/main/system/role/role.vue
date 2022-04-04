<template>
  <div class="role">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    />
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="role"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    />
    <div>
      <page-modal
        ref="pageModalRef"
        pageName="role"
        :modalConfig="modalConfig"
        :defaultInfo="defaultInfo"
        :otherInfo="otherInfo"
      >
        <el-tree
          ref="elTreeRef"
          :data="menus"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleCheckChange"
        >
        </el-tree>
      </page-modal>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, nextTick } from "vue";
import { useStore } from "@/store";
import { menuMapLeafKeys } from "@/utils/map-menus";

import { ElTree } from "element-plus/lib/components";
import PageSearch from "@/components/page-search/src/page-search.vue";
import PageContent from "@/components/page-content/src/page-content.vue";
import PageModal from "@/components/page-modal/src/page-modal.vue";

import { searchFormConfig } from "./config/search.config";
import { contentTableConfig } from "./config/content.config";
import { modalConfig } from "./config/modal.config";

import { usePageSearch } from "@/hooks/use-page-search";
import { usePageModal } from "@/hooks/use-page-modal";

export default defineComponent({
  name: "role",
  components: { PageContent, PageSearch, PageModal },
  setup() {
    /** 搜索hooks */
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch();
    /** 1.处理pageModal的hook */
    const elTreeRef = ref<InstanceType<typeof ElTree>>();
    const editCallback = (item: any) => {
      const leafKeys = menuMapLeafKeys(item.menuList);
      /** 下一帧函数 */
      nextTick(() => {
        // console.log(elTreeRef.value);
        elTreeRef.value?.setCheckedKeys(leafKeys, false);
      });
    };
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] = usePageModal(
      undefined,
      editCallback
    );

    const store = useStore();
    const menus = computed(() => store.state.entireMenu);
    const otherInfo = ref({});
    const handleCheckChange = (data1: any, data2: any) => {
      console.log(data1, "data2:", data2);
      const checkedKeys = data2.checkedKeys;
      const halfCheckedKeys = data2.halfCheckedKeys;
      const menuList = [...checkedKeys, ...halfCheckedKeys];
      otherInfo.value = { menuList };
    };

    return {
      searchFormConfig,
      contentTableConfig,
      modalConfig,
      pageContentRef,
      pageModalRef,
      defaultInfo,
      handleNewData,
      handleEditData,
      menus,
      handleResetClick,
      handleQueryClick,
      handleCheckChange,
      elTreeRef,
      otherInfo
    };
  }
});
</script>

<style scoped lang="less">
.menu-tree {
  margin-left: 25px;
}
</style>
