import { ref } from "vue";
import PageModal from "@/components/page-modal/src/page-modal.vue";

type CallbackFn = (item?: any) => void;

export function usePageModal(newCb?: CallbackFn, editCb?: CallbackFn) {
  const pageModalRef = ref<InstanceType<typeof PageModal>>();
  const defaultInfo = ref({});
  /** 新建用户 */
  const handleNewData = () => {
    defaultInfo.value = {};
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true;
    }
    newCb && newCb();
  };
  /** 编辑用户 */
  const handleEditData = (item: any) => {
    defaultInfo.value = { ...item };
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true;
    }
    editCb && editCb(item);
  };

  return [pageModalRef, defaultInfo, handleNewData, handleEditData];
}
