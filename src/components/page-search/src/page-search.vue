<template>
  <div class="page-search">
    <hy-form v-bind="searchFormConfig" v-model="formData" ref="formRef">
      <template #header>
        <div class="header"><span>我是头部</span></div>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button icon="RefreshRight" size="small" @click="handleResetClick">重置</el-button>
          <el-button type="primary" size="small" icon="Search" @click="handleQueryClick">
            搜索
          </el-button>
        </div>
      </template>
    </hy-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import HyForm from "@/base-ui/form";

export default defineComponent({
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    }
  },
  components: { HyForm },
  emits: ["resetBtnClick", "queryBtnClick"],
  setup(props, { emit }) {
    const formRef = ref<InstanceType<typeof HyForm>>();
    /** 双向绑定的属性应该是由配置文件的field来决定 */
    const formItems = props.searchFormConfig?.formItems ?? [];
    /** 1.优化一: formData中的属性应该动态来决定 */
    const formOriginData: any = {};
    for (const item of formItems) {
      formOriginData[item.field] = "";
    }
    const formData = ref(formOriginData);

    /** 重置按钮 */
    const handleResetClick = () => {
      // for (const key in formOriginData) {
      //   formData.value[`${key}`] = formOriginData[key];
      // }
      /** 清空输入框 */
      formData.value = formOriginData;
      emit("resetBtnClick");
    };
    /** 搜索 */
    const handleQueryClick = () => {
      console.log(formRef.value, "formData.value");
      emit("queryBtnClick", formData.value);
    };

    return { formData, handleResetClick, handleQueryClick, formRef };
  }
});
</script>

<style scoped lang="less">
.page-search {
  .header {
    color: red;
  }
  .handle-btns {
    text-align: right;
    padding: 0 50px 20px 0;
  }
}
</style>
