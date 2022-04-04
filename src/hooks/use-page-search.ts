import { ref } from "vue";
import PageContent from "@/components/page-content";

export function usePageSearch() {
  /** 给当前元素绑定的ref，调取当前元素的方法 */
  const pageContentRef = ref<InstanceType<typeof PageContent>>();
  /** 重置之后的查询 */
  const handleResetClick = () => {
    pageContentRef.value?.getPageData();
  };
  /** 查询表格数据 */
  const handleQueryClick = (queryInfo: any) => {
    pageContentRef.value?.getPageData(queryInfo);
  };

  return [pageContentRef, handleResetClick, handleQueryClick];
}
