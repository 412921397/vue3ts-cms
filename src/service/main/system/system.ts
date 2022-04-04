import hyRequest from "../../index";

import { IDataType } from "../../types";

/** 用户管理 */
export function getPageListData(url: string, queryInfo: any) {
  return hyRequest.post<IDataType>({
    url: url,
    data: queryInfo
  });
}

/** 需要的数据格式 url: /users/id , 删除数据 */
export function deletePageData(url: string) {
  return hyRequest.delete<IDataType>({
    url: url
  });
}

/** 创建用户 */
export function createPageData(url: string, newData: any) {
  return hyRequest.post<IDataType>({
    url: url,
    data: newData
  });
}

/** 编辑用户 */
export function editPageData(url: string, editData: any) {
  return hyRequest.patch<IDataType>({
    url: url,
    data: editData
  });
}
