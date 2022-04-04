<template>
  <div class="table">
    <div class="header">
      <slot name="header">
        <div class="title">{{ title }}</div>
        <div class="handler">
          <slot name="headerHandler"></slot>
        </div>
      </slot>
    </div>
    <el-table
      :data="listData"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
      v-bind="childrenProps"
    >
      <el-table-column v-if="showSelectColumn" type="selection" align="center" width="60" />
      <el-table-column v-if="showIndexColumn" type="index" label="序号" align="center" width="80" />
      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="center" show-overflow-tooltip>
          <template #default="scope">
            <slot :row="scope.row" :name="propItem.slotName">{{ scope.row[propItem.prop] }}</slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer" v-if="showFooter">
      <slot name="footer">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.currentPage"
          :page-sizes="[10, 20, 30]"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listCount"
        >
        </el-pagination>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    /** 总数据 */
    listCount: {
      type: Number,
      default: 0
    },
    /** 显示的表格顶部名字 */
    title: {
      type: String,
      default: ""
    },
    /** 表格数据 */
    listData: {
      type: Array,
      required: true
    },
    /** 具体对应的字段数据 */
    propList: {
      type: Array,
      default: () => []
    },
    /** 是否展示序号 */
    showIndexColumn: {
      type: Boolean,
      default: false
    },
    /** 是否显示选框 */
    showSelectColumn: {
      type: Boolean,
      default: false
    },
    /** 页码信息 */
    page: {
      type: Object,
      default: () => ({ currentPage: 0, pageSize: 10 })
    },
    /** 跳转的路由url */
    childrenProps: {
      type: Object,
      default: () => ({})
    },
    /** 是否显示底部 */
    showFooter: {
      type: Boolean,
      default: true
    }
  },
  emits: ["selectionChange", "update:page"],
  setup(props, { emit }) {
    /** 勾选框 */
    const handleSelectionChange = (value: any) => {
      emit("selectionChange", value);
    };
    /** 修改当前页码 */
    const handleCurrentChange = (currentPage: number) => {
      emit("update:page", { ...props.page, currentPage });
    };
    /** 修改页码 */
    const handleSizeChange = (pageSize: number) => {
      emit("update:page", { ...props.page, pageSize });
    };

    return { handleSelectionChange, handleCurrentChange, handleSizeChange };
  }
});
</script>

<style scoped lang="less">
.header {
  display: flex;
  height: 45px;
  padding: 0 5px;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: 20px;
    font-weight: 700;
  }

  .handler {
    align-items: center;
  }
}

.footer {
  margin-top: 15px;
  display: flex;
  justify-content: flex-end;
  .el-pagination {
    text-align: right;
  }
}
</style>
