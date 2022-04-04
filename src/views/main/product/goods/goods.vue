<template>
  <div class="goods">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    />
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="goods"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    >
      <template #image="scope">
        <div class="demo-image__preview">
          <el-image
            style="width: 60px; height: 60px"
            :src="scope.row.imgUrl"
            :preview-src-list="[scope.row.imgUrl]"
            :initial-index="4"
            fit="cover"
            preview-teleported
          >
          </el-image>
        </div>
      </template>
      <template #status="{ row }">
        <el-button plain size="small" :type="row.status === 1 ? 'success' : 'danger'">
          {{ row.status === 1 ? "启用" : "禁用" }}
        </el-button>
      </template>
    </page-content>
    <page-modal
      ref="pageModalRef"
      pageName="goods"
      :modalConfig="modalConfig"
      :defaultInfo="defaultInfo"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PageSearch from "@/components/page-search/src/page-search.vue";
import PageContent from "@/components/page-content/src/page-content.vue";
import PageModal from "@/components/page-modal/src/page-modal.vue";

import { searchFormConfig } from "./config/search.config";
import { contentTableConfig } from "./config/content.config";
import { modalConfig } from "./config/modal.config";

import { usePageSearch } from "@/hooks/use-page-search";
import { usePageModal } from "@/hooks/use-page-modal";

export default defineComponent({
  components: { PageSearch, PageContent, PageModal },
  name: "goods",
  setup() {
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch();
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] = usePageModal(
      undefined,
      undefined
    );

    return {
      searchFormConfig,
      contentTableConfig,
      pageContentRef,
      modalConfig,
      pageModalRef,
      defaultInfo,
      handleNewData,
      handleEditData,
      handleResetClick,
      handleQueryClick
    };
  }
});
</script>

<style scoped>
.demo-image__error .image-slot {
  font-size: 30px;
}
.demo-image__error .image-slot .el-icon {
  font-size: 30px;
}
.demo-image__error .el-image {
  width: 100%;
  height: 200px;
}
</style>
