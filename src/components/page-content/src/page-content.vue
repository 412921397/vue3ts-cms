<template>
  <div class="page-content">
    <hy-table
      :listData="dataList"
      :listCount="dataCount"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
    >
      <!-- 1.header中的插槽 -->
      <template #headerHandler>
        <el-button v-if="isCreate" type="primary" size="small" @click="handleNewClick">
          {{ contentTableConfig.buttonName ? contentTableConfig.buttonName : "新建用户" }}
        </el-button>
      </template>
      <!-- 2.列中的插槽 -->
      <template #createAt="{ row }">
        <span>{{ $filters.formatTime(row.createAt) }}</span>
      </template>
      <template #updateAt="{ row }">
        <span>{{ $filters.formatTime(row.updateAt) }}</span>
      </template>
      <template #handler="{ row }">
        <el-button
          v-if="isUpdate"
          size="small"
          type="text"
          icon="Edit"
          @click="handleEditClick(row)"
        >
          编辑
        </el-button>
        <el-button
          v-if="isDelete"
          size="small"
          type="text"
          icon="delete"
          style="color: red"
          @click="handleDeleteClick(row)"
        >
          删除
        </el-button>
      </template>
      <!-- 在page-content中动态插入自定义的插槽 -->
      <template v-for="item in otherPropSlots" :key="item.prop" #[item.slotName]="scope">
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </hy-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from "vue";
import { useStore } from "@/store";
import { usePermission } from "@/hooks/use-permission";

import HyTable from "@/base-ui/table/src/table.vue";

export default defineComponent({
  components: { HyTable },
  props: {
    contentTableConfig: {
      type: Object,
      require: true
    },
    pageName: {
      type: String,
      require: true
    }
  },
  emits: ["newBtnClick", "editBtnClick"],
  setup(props, { emit }) {
    const store = useStore();

    /** 获取用户权限 */
    const isCreate = usePermission(props.pageName as string, "create");
    const isUpdate = usePermission(props.pageName as string, "update");
    const isDelete = usePermission(props.pageName as string, "delete");
    const isQuery = usePermission(props.pageName as string, "query");

    /** 分页 */
    const pageInfo = ref({ currentPage: 1, pageSize: 10 });
    watch(pageInfo, () => getPageData());
    /**  */

    /** 请求表格的数据 */
    const getPageData = (queryInfo: any = {}) => {
      if (!isQuery) return;
      store.dispatch("system/getPageListAction", {
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      });
    };
    getPageData();

    /** 获取当前的的表格数据 */
    const dataList = computed(() => store.getters[`system/pageListData`](props.pageName));
    /** 获取表格总数据 */
    const dataCount = computed(() => store.getters[`system/pageListCount`](props.pageName));

    /** 自定义其他的动态插槽名称 */
    const otherPropSlots = props.contentTableConfig?.propList.filter((item: any) => {
      if (item.slotName === "createAt") return false;
      if (item.slotName === "updateAt") return false;
      if (item.slotName === "handler") return false;
      return true;
    });

    /** 删除/编辑/新建操作 */
    const handleDeleteClick = (item: any) => {
      store.dispatch("system/deletePageDataAction", {
        pageName: props.pageName,
        id: item.id
      });
    };

    const handleNewClick = () => {
      emit("newBtnClick");
    };

    const handleEditClick = (item: any) => {
      emit("editBtnClick", item);
    };

    return {
      dataList,
      getPageData,
      dataCount,
      pageInfo,
      otherPropSlots,
      isCreate,
      isUpdate,
      isDelete,
      isQuery,
      handleDeleteClick,
      handleNewClick,
      handleEditClick
    };
  }
});
</script>

<style scoped lang="less"></style>
